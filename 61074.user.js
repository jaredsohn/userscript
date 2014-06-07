// ==UserScript==
// @name           zippy zippyshare
// @namespace      #aVg
// @description    A zippyshare  userscript.
// @include        http://*zippyshare.com/*file.html
// @version        0.1.1
// ==/UserScript==
(function() {
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A)}
var dl = $("right"), main =  single("//div[@class='boczki6']");
remove(dl);
main.parentNode.replaceChild(dl, main);
location.href = unsafeWindow.foken;
})();