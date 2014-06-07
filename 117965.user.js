// ==UserScript==
// @name           Pyha Ajax User Rating
// @namespace      http://pyha.ru
// @description    Now - rating will be ajaxes.
// @include        http://pyha.ru/forum/*
// @include        http://www.pyha.ru/forum/*
// - v2.0
// - 14 Nov 2011
// - Ivan
// ==/UserScript==

function jWait() {
	if (/opera|chrome/ig.test(navigator.userAgent)) {
		if (typeof window.jQuery == 'undefined') {
			window.setTimeout(jWait, 100);
		} else {
			var jq = window.jQuery;
			ratingAjax(jq);
		}
	} else {
		if (typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(jWait, 100);
		} else {
			var jq = unsafeWindow.jQuery;
			ratingAjax(jq);
		}
	}
}
	
function ratingAjax(jq) {
	jq("a:contains('[+]'), a:contains('[-]')").each(function() {
		var ratePlus = (jq(this).text() == "[+]");
		jq(this).attr("title", ((ratePlus) ? "Нравится" : "Не нравится"));
		jq(this).hover(function() {
			jq(this).css("color", ((ratePlus) ? "#003300" : "#cc0000"));
		}, function() {
			jq(this).css("color", "#476C8E");
		}).click(function() {
			var href = jq(this).attr("href");
			var reply = prompt("Комментарий:", "+");
			var pDiv = jq(this).parent();
			pDiv.find("a:contains('[+]'), a:contains('[-]')").css("display", "none");
			var pDivCode = pDiv.html();
			var matches = /(\u041a\u0430\u0440\u043c\u0430.\s)((-)?\d+)/g.exec(pDivCode);
			jq.post(href.replace("http://pyha.ru", ""), {Description: reply});
			pDiv.fadeOut(500).html(
				pDivCode.replace(
					matches[0], matches[1] 
						+ ((ratePlus) 
						? (matches[2]*1 + 1) 
						: (matches[2]*1 - 1))
				).replace(
					"|", ""
				)
			).fadeIn(500);
			return false;
		});
	});
}

jWait();