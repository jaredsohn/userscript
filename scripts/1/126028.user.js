// ==UserScript==
// @name           optionsXpress
// @namespace      spanishgringo.yahoo
// @description    Removes Ad Bar and optimizes optionsXpress space in new beta
// @include        https://*.optionsxpress.com/OXNetTools/Chains
// @author         Ding Li
// @homepage       http://localhost
// ==/UserScript==

var x = document.getElementById("header");
try{
var y = x.parentNode;
y.removeChild(x);
}catch(e){
unsafeWindow.console.log("optionsXpress header error");
}