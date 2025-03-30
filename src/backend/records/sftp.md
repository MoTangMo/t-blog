---
title: Springboot 整合Sftp服务操作文件
icon: code
order: 3
author: Mr.T
# 设置写作时间
date: 2023-07-01
category:
  - Spring
tag:
  - Spring 系列
  - records
footer: 要有一双发现美的眼睛
copyright: 无版权
---
# Springboot 整合Sftp服务操作文件

在项目开发过程中，尤其是后台管理系统的构建中，文件的上传与下载功能是不可或缺的一部分。作为一名Java开发者，我们幸运地拥有Springboot这一强大框架，它为我们提供了与Sftp服务无缝整合的便捷途径。接下来，让我们共同探索Springboot如何高效地整合Sftp服务，以实现文件传输的高效管理。

## 引入依赖

```java

       <!-- SFTP -->
        <dependency>
            <groupId>com.jcraft</groupId>
            <artifactId>jsch</artifactId>
            <version>0.1.55</version>
        </dependency>
 maven dependency
```


## 配置SFTP信息

这个配置并不是jsch带有的，而是我们自定义的

```yaml

# SFTP 服务器配置
sftp:
  protocol: sftp
  server:
    host: xxx
    port: 22
    username: xxx 
    password: xxx
    base-directory: xxx yml配置
```


## 创建SFTP 连接Client

在这里主要是为了方便我们操作SFTP服务，所以将服务的连接的相关方法放在这里了

```java
@Slf4j
@Component
public class SftpClient {

    @Value("${sftp.protocol}")
    private String protocol;

    @Value("${sftp.server.host}")
    private String host;

    @Value("${sftp.server.port}")
    private String port;

    @Value("${sftp.server.username}")
    private String username;

    @Value("${sftp.server.password}")
    private String password;

    
    /** 
    * @Description: 创建SFTP连接
    * @Param:
    * @return:
    * @Author: tangzhaofeng
    * @Date: 8/1/2024
    */
    public ChannelSftp createSftp() throws JSchException {
        JSch jsch = new JSch();
        Session session = createSession(jsch, host, username, Integer.valueOf(port));
        session.setPassword(password);
        session.setConfig("StrictHostKeyChecking", "no");
        // 默认情况下，JSch库本身并没有会话超时时间。
        // 设置会话超时时间 单位：毫秒
        session.setTimeout(30000);
        session.connect();
        Channel channel = session.openChannel(protocol);
        channel.connect();
        return (ChannelSftp) channel;

    }


    /**
     * 创建 Session
     */
    public Session createSession(JSch jsch, String host, String username, Integer port) throws JSchException {
        Session session = null;

        if (port <= 0) {
            session = jsch.getSession(username, host);
        } else {
            session = jsch.getSession(username, host, port);
        }

        if (session == null) {
            throw new RuntimeException(host + "session is null");
        }

        return session;
    }

    /**
     * 关闭连接
     */
    public void disconnect(ChannelSftp sftp) {
        try {
            if (sftp != null) {
                if (sftp.isConnected()) {
                    sftp.disconnect();
                } else if (sftp.isClosed()) {
                    log.error("sftp 连接已关闭");
                }
                if (sftp.getSession() != null) {
                    sftp.getSession().disconnect();
                }
            }
        } catch (JSchException e) {
            log.error("sftp 断开连接失败，原因：{}", e.getMessage(), e);
        }
    }

    /**
    * @Description: 上传文件
    * @Param:
    * @return:
    * @Date: 8/1/2024
    */
   public void upload( MultipartFile file)  {
        // 上传文件
        ChannelSftp sftp = null;
        try (InputStream in = file.getInputStream()) {
            // 开启sftp连接
            sftp = createSftp();
            // 上传文件
            sftp.put(in, "/"+baseDirectory+"/" + file.getOriginalFilename());
        } catch (SftpException | JSchException | IOException e) {
            log.error("File Upload Error -> " , e);
            throw new RuntimeException("File Upload Error");
        }  finally {
            // 关闭sftp
            disconnect(sftp);
        }
    }

   
}
```
