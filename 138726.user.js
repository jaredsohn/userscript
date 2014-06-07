// ==UserScript==
// @name           1channel.ch enhancer
// @description embed player directly into page. 
// @version       1.0
// @include        http://www.1channel.ch/tv*
// ==/UserScript==

$(document).ready(function() { var url = $(".movie_version:has(img[title=Verified Link]) .movie_version_link a")[0].href; var cuturl = url.substring(url.indexOf("url="), url.length); var base64url = cuturl.substring(cuturl.indexOf("=") + 1, cuturl.indexOf("&")); var properurl = window.atob(base64url).replace("/file", "/embed");
$(".choose_tabs").prepend("<iframe id='player' src='"+ properurl +"' width='600' height='360' frameborder='0' scrolling='no'></iframe>"); });