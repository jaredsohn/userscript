// ==UserScript==
// @name       YOUTUBE autoHD
// @version    1
// @description  enter something useful
// @match      https://www.youtube.com/watch*
// @copyright  2013+, Handsman (Hans Strausl)
// ==/UserScript==
function HDres() {
var currenturl = document.URL;
var add = currenturl.indexOf("&hd=1");
if (add===-1) {
window.location.href += "&hd=1";
   
}
}
document.onLoad = HDres();