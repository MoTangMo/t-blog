import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "E:/mynote/t-blog/node_modules/@vuepress/helper/lib/client/index.js";

import { useScriptTag } from "E:/mynote/t-blog/node_modules/@vueuse/core/index.mjs";
import FontIcon from "E:/mynote/t-blog/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "E:/mynote/t-blog/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "E:/mynote/t-blog/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";

import "E:/mynote/t-blog/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/brands.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
  rootComponents: [

  ],
});
