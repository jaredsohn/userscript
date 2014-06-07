// ==UserScript==
// @name       sms-track
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://sms-track.ru/stat/US-RU
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013+
// ==/UserScript==

$(document).ready(function() 
{
	$('div').find('[h="CG087003*****US"]').parent().css('background-color','#d1ffb2');
});