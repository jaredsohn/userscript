// ==UserScript==
// @name       BM Warning Killer
// @version    1
// @description  Gets rid of the obnoxious redirection safety warning
// @match      *basilmarket.com/bye.php?u=*
// ==/UserScript==
document.getElementsByTagName("html")[0].parentNode.removeChild(document.getElementsByTagName("html")[0])
window.location.replace(document.URL.replace(/[^=]+=/,"http://").replace(/^(https?:\/\/)+/,"$1"))