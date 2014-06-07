// ==UserScript==
// @name           Centerfire Systems Inline Large Images
// @namespace      http://jobson.us
// @description    Shows all large images inline in product view.
// @include        http://www.centerfiresystems.com/*
// @require        https://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// http://www.centerfiresystems.com/images/view.aspx?productId=2607&index=0

function cfImg() {
		if (!$('td.prod-detail-lt div a[onclick]')) return;
		var imgURL = 'http://www.centerfiresystems.com' + $('td.prod-detail-lt div a[onclick]').parent().html().match(/open\('(.+?)'/)[1] +'&index=0';
		$('td.prod-detail-lt div a[onclick]').parent().remove();
		
		$('table.prod-detail tbody').append('<tr><td class="prod-detail-bt" id="fullImages" align="center" colspan="2"></td></tr>');
		
		imageLoader(imgURL);
}
cfImg();



function imageLoader(url) {
	if (url=='') return;
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			var nextURL = ($(response.responseText).find('a#hypMoveNext').attr('href')) ? 'http://www.centerfiresystems.com/images/' + $(response.responseText).find('a#hypMoveNext').attr('href') : '';
			var img = 'http://www.centerfiresystems.com/' + $(response.responseText).find('img#displayImage').attr('src');
			
			$('td#fullImages').append($(response.responseText).find('img#displayImage'));
			
			imageLoader(nextURL);
		}
	});
}
