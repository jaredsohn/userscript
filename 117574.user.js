// ==UserScript==
// @name       eRepublik Org Dissolve page Remover
// @namespace  http://euslp.com
// @version    1.0
// @description  Makes life easier
// @include    http://www.erepublik.com/*/organizations/dissolve
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready( function() {
	var o = $('.new_owner');

	o.removeClass('new_owner');

	o.html('<h3 class="new_owner h3">Organization Script by s0beit</h3><a href="http://www.erepublik.com/en/citizen/profile/1869832">' + 
               '<img src="http://static.erepublik.com/uploads/avatars/Citizens/2009/09/04/3a10d41bb2f31e40dab5c0c2f359eb48.jpg" style="width:45px;height:45px;image-rendering:optimizeQuality;-ms-interpolation-mode:bicubic;padding:1px;border:1px solid #ccc;margin-left:560px;margin-top:14px;float:left;" />' + 
	'<strong style="float:left;font-size:12px;margin-left:10px;margin-top:30px;color:#333">Send me money! Rawr!</strong></a>');
	
	$('#content').html( '<div id="dissolve"><div class="steps">' + $('.steps').html() + '</div></div>' );
	
	$('.user_level').remove();
});