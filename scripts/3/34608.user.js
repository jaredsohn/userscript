// ==UserScript==
// @name           Potato Counter Solver
// @description    The popular neopets.com game is easily solved with xpath!
// @namespace      #
// @include        http://*neopets.tld/medieval/potatocounter*
// @version        0.2
// ==/UserScript==
document.evaluate("//input[@name='guess']",document,null,9,null).singleNodeValue.value=document.evaluate("count(/html/body/div/div[3]/table/tbody/tr/td[2]/table/tbody/tr/td/img)",document,null,1,null).numberValue