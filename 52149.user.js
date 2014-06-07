// ==UserScript==
// @name           Hide Prison Struggle Banner
// @namespace      www.prisonstruggle.com
// @description    Hides the prison struggle banner
// @include        http://www.prisonstruggle.com/*
// ==/UserScript==

document.getElementById('header-image').setAttribute ("style","height:0px;");
document.getElementById('content').setAttribute ("style","positioning: absolute; top: 0px;");