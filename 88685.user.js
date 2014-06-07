// ==UserScript==
// @name           Auto Check-in For xiami.com
// @description    Auto Check-in For xiami.com.
// @version        0.1
// @author         sfufoet(http://blog.loland.net/)
// @include        http://www.xiami.com/
// ==/UserScript==

var $, jQuery;
loading();

function loading()
{
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);

}

function init()
{
	$ = jQuery = unsafeWindow.jQuery;
	$(document).ready(function() {
		if(!$('#check_in').hasClass("checked")){
			$('#check_in').trigger('click');}
	});
}