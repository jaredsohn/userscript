// ==UserScript==
// @name           MicroStock.ru Find Кeyword Fixer
// @version        1.0
// @namespace      lionsoft
// @homepage       http://aelitsoft.com
// @include        http://www.microstock.ru/cgi-bin/keywords.cgi
// @description    Fixes the incorrect image source in result page
// ==/UserScript==



var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
 
function letsJQuery() {

  var images = $('img[src^="http://www.istockphoto.comhttp"]').attr('src', 
    function() 
    {
  	return 'http:' + this.src.substr('http://www.istockphoto.comhttp'.length);
    });


}
