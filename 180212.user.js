// ==UserScript==
// @name       EDH Updates
// @namespace  http://www.eatingdisorderhope.com/
// @version    0.9
// @description  Updates for EDH
// @match      http://www.eatingdisorderhope.com/*
// @require    http://code.jquery.com/jquery-latest.min.js
// @copyright  2013, EDH
// ==/UserScript==

/*::::::::::::::PLUGINS:::::::::::::::*/
//Get contents of full elt jQuery
jQuery.fn.outerHTML = function() {
  return jQuery('<li />').append(this.eq(0).clone()).html();
};

function hasNumbers(t)
{
return /\d/.test(t);
}
/*::::::::::::::PLUGINS:::::::::::::::*/

(function ($) {
$( "html" ).find( "*" ).each(function () {
	if ($(this).css('textDecoration') == "underline") {
		if ( $(this).attr('href') == undefined ) {
			$(this).css('textDecoration', 'none');
		}
	}
});

//Therapist Specialists
if (document.location.href == "http://www.eatingdisorderhope.com/treatment-for-eating-disorders/therapists-specialists") {

	$('#content_box').css('background','#ffffff');
	$('.single-page #content').css('width','73.7em');
	$('#inner-page-sidebar-1').remove();

	var specLib = $('h3 a[href$="http://www.eatingdisorderhope.com/treatment-for-eating-disorders/therapists-specialists/featured"]').parent().outerHTML();
	specLib = specLib.replace(/&nbsp;/g, '');

	$('h3 a[href$="http://www.eatingdisorderhope.com/treatment-for-eating-disorders/therapists-specialists/featured"]').parent().remove();
	$(".format_text p:nth-child(3)").after(specLib);
	$('h3 a[href$="http://www.eatingdisorderhope.com/treatment-for-eating-disorders/therapists-specialists/featured"]').addClass("redMessage");
	$('h3 a[href$="http://www.eatingdisorderhope.com/about/advertise/therapist-memberships"]').addClass("pLinkSell");
}
}(jQuery));