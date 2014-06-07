// ==UserScript==
// @name           eRepublik Resource Donation Helper
// @namespace      erepdonationhelper
// @include        http://www.erepublik.com/*/donate/items*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @version 1.0
// ==/UserScript==

$('.padded.goleft').append(" - &nbsp;");
$('<div style="color: #53B3D3; cursor:pointer;">Donate all</div>').insertAfter('.padded.goleft').click(function() {
	var av = parseInt($('#available_items').val());
	av -= $('.inventory.sort.largepadded li').length;
	$('.inventory.sort[id*=small] li').each(function() {
		var ele = $(this).clone(true);
		$(this).remove();
		//GM_log(ele);
		//GM_log($('.inventory.sort[id*=big] li').length);
		$('.inventory.sort.largepadded').append(ele);
		av--;
		if (av == 0)
			return false;
	});
});
