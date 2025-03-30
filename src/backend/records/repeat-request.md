---
title: 防止重复提交请求
icon: code
order: 3
author: Mr.T
# 设置写作时间
date: 2023-05-01
category:
  - Spring
tag:
  - Spring 系列
  - records
footer: 要有一双发现美的眼睛
copyright: 无版权
---
# 防止重复提交请求

防止请求重复提交在互联网项目开发中是非常重要的，这主要是因为它可以减少对服务器的压力，避免数据冗余和数据冲突等问题。如果请求重复提交，可能会导致以下问题：

1. 服务器压力增大：如果多个请求同时提交，服务器需要同时处理这些请求，这会增加服务器的负担，导致服务器响应变慢或者崩溃。
2. 数据冗余：如果请求重复提交，那么服务器将会多次处理同一份数据，导致数据冗余，增加数据库的维护成本。
3. 数据冲突：如果请求重复提交，那么服务器将会处理多份数据，可能会导致数据冲突，导致数据的不一致性和错误。
4. 用户体验不佳：如果请求重复提交，那么用户可能需要重新提交请求，这会导致用户体验不佳，降低用户的满意度和使用率。

因此，为了保证互联网项目的正常运行和用户体验，我们需要防止请求重复提交，可以通过验证码、cookie、session等技术手段来实现。这些技术可以帮助我们检测和识别请求是否重复提交，并进行相应的处理，从而保证互联网项目的稳定运行和用户体验的良好。

## 代码模板

逻辑主要是拦截到来的请求，通过用开发者实现的isRepeatSubmit方法进行逻辑判断，来决定是否允许用户继续访问，这是对拦截器的抽象，不仅仅是判断重复提交，关于拦截校验的其实也可以用到这个Component的

```java
@Component
public abstract class RepeatSubmitInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();
            RepeatSubmit annotation = method.getAnnotation(RepeatSubmit.class);
            if (annotation != null) {
                if (this.isRepeatSubmit(request, annotation)) {
                    R r = R.error(annotation.message());
                    ServletUtils.renderString(response, JSON.toJSONString(r));
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

    /**
     * 验证是否重复提交由子类实现具体的防重复提交的规则
     *
     * @param request
     * @return
     * @throws Exception
     */
    public abstract boolean isRepeatSubmit(HttpServletRequest request, RepeatSubmit annotation);
}

```


以下是关于拦截重复请求的代码模板

```java
@Component
public class SameUrlDataInterceptor extends RepeatSubmitInterceptor
{
    public final String REPEAT_PARAMS = "repeatParams";

    public final String REPEAT_TIME = "repeatTime";

    // 令牌自定义标识
    @Value("${token.header}")
    private String header;

    @Autowired
    private RedisCache redisCache;

    @SuppressWarnings("unchecked")
    @Override
    public boolean isRepeatSubmit(HttpServletRequest request, RepeatSubmit annotation)
    {
        String nowParams = "";
        if (request instanceof RepeatedlyRequestWrapper)
        {
            RepeatedlyRequestWrapper repeatedlyRequest = (RepeatedlyRequestWrapper) request;
            nowParams = HttpHelper.getBodyString(repeatedlyRequest);
        }

        // body参数为空，获取Parameter的数据
        if (StringUtils.isEmpty(nowParams))
        {
            nowParams = JSON.toJSONString(request.getParameterMap());
        }
        Map<String, Object> nowDataMap = new HashMap<String, Object>();
        nowDataMap.put(REPEAT_PARAMS, nowParams);
        nowDataMap.put(REPEAT_TIME, System.currentTimeMillis());

        // 请求地址（作为存放cache的key值）
        String url = request.getRequestURI();

        // 唯一值（没有消息头则使用请求地址）
        String submitKey = StringUtils.trimToEmpty(request.getHeader(header));

        // 唯一标识（指定key + url + 消息头）
        String cacheRepeatKey = CacheConstants.REPEAT_SUBMIT_KEY + url + submitKey;

        Object sessionObj = redisCache.getCacheObject(cacheRepeatKey);
        if (sessionObj != null)
        {
            Map<String, Object> sessionMap = (Map<String, Object>) sessionObj;
            if (sessionMap.containsKey(url))
            {
                Map<String, Object> preDataMap = (Map<String, Object>) sessionMap.get(url);
                if (compareParams(nowDataMap, preDataMap) && compareTime(nowDataMap, preDataMap, annotation.interval()))
                {
                    return true;
                }
            }
        }
        Map<String, Object> cacheMap = new HashMap<String, Object>();
        cacheMap.put(url, nowDataMap);
        redisCache.setCacheObject(cacheRepeatKey, cacheMap, annotation.interval(), TimeUnit.MILLISECONDS);
        return false;
    }

    /**
     * 判断参数是否相同
     */
    private boolean compareParams(Map<String, Object> nowMap, Map<String, Object> preMap)
    {
        String nowParams = (String) nowMap.get(REPEAT_PARAMS);
        String preParams = (String) preMap.get(REPEAT_PARAMS);
        return nowParams.equals(preParams);
    }

    /**
     * 判断两次间隔时间
     */
    private boolean compareTime(Map<String, Object> nowMap, Map<String, Object> preMap, int interval)
    {
        long time1 = (Long) nowMap.get(REPEAT_TIME);
        long time2 = (Long) preMap.get(REPEAT_TIME);
        if ((time1 - time2) < interval)
        {
            return true;
        }
        return false;
    }
}

```
