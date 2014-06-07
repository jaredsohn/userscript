// ==UserScript==
// @name        theappl bypass
// @namespace   http://theappl.bypass
// @description theappl 무료다운

// @version     1
// ==/UserScript==

var domain=window.location.host;
var path = window.location.pathname;
var url = window.location.href;
var unsafeWindow=this['unsafeWindow']||window;
 var parameters = (url.slice(url.indexOf('?'),url.length))

if(/theappl\.com/i.test(domain) && /download\.popup\.skin\.php/i.test(path)){
window.onload = function(){
document.getElementsByTagName('div')[1].innerHTML = '<div style="font-size:32pt;padding:100px;padding-top:30px;"><a href="http://fileserv.theappl.com/freedown.php'+parameters+'">다운로드</a></div>';
}


}
