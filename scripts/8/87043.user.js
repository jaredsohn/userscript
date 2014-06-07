// ==UserScript==
// @name           Convert Google Reader Translate Link To Original
// @namespace      Convert Google Reader Translate Link To Original
// @description    Convert Google Reader Translate Link To Original
// @include        http://translate.google.com/translate*
// ==/UserScript==

window.location.href = this.location.href.replace("http://translate.google.com/translate?sl=en&tl=zh-CN&u=","").replace("http://translate.google.com/translate?sl=auto&tl=zh&u=","");