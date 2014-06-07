// ==UserScript==
// @id            TB_CSS_Reload
// @name          Tieba CSS_Reload 
// @version       1.0
// @author        jebwizoscar
// @description   Reload CSS 4 Tieba
// @include       http://tieba.baidu.com/*
// @resource      myCustomCss http://dirg.tk/temp.css
// ==/UserScript==
GM_addStyle (GM_getResourceText ("myCustomCss") );