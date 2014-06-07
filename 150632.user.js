// ==UserScript==
// @name        redeem_gc
// @namespace   nick
// @include     https://www.amazon.com/*
// @version     1
// ==/UserScript==

function chk_result(doc, code, codes, resp) {
	var html;
	var s;
	code = '<a target="_blank" href="https://www.amazon.com/gp/css/gc/payment/redeem-gc-balance?applytoaccount=Apply%20to%20Your%20Account&claimCode=' + code + '">' + code + '</a>';

	if (resp.responseText)
		html = resp.responseText;
	else if (resp.length)
		html = resp;

	console.log(html);
	var current = jQuery('div.gcRedemptionArea h3 span.gcBalanceAmt', html).text().trim();
	s = jQuery('div.gcMM.gcMMError', html).text().trim().replace(/\s+/g, ' ');
	if (s && s.match('We had a problem redeeming your gift card')) {
		jQuery('tbody', doc).append('<tr style="color:red"><td>' + code + '</td><td>错误卡号</td><td>' + current + '</td></tr>');
		return do_redeem_gc(doc, codes);
	}

	if (s && s.match("You have already redeemed this gift card")) {
		jQuery('tbody', doc).append('<tr style="color:orange"><td>' + code + '</td><td>重复充值</td><td>' + current + '</td></tr>');
		return do_redeem_gc(doc, codes);
	}

	s = jQuery('form.gcThankYou h2', html).text().trim();
	if (s && s.match(/Send a thank you message for this gift card/g)) {
		jQuery('tbody', doc).append('<tr style="color:green"><td>' + code + '</td><td>充值成功</td><td>' + current + '</td></tr>');
		return do_redeem_gc(doc, codes);
	}

	jQuery('tbody', doc).append('<tr style="color:red"><td>' + code + '</td><td>未知错误</td><td>' + current + '</td></tr>');
	return do_redeem_gc(doc, codes);
}

function do_redeem_gc(doc, codes) {
	var code = codes.pop();
	if (!code) {
//		jQuery('tbody', doc).append('</tbody></table><hr />');
		jQuery('body', doc).append('<span style="font-size:24px">充值完毕</span>');
		doc.close();
		return;
	}

	var url = 'https://www.amazon.com/gp/css/gc/payment/redeem-gc-balance?applytoaccount=Apply%20to%20Your%20Account&claimCode=' + code;
	console.log(url);
	jQuery.ajax({
	        url : url,
	        success : function(resp) {
		        chk_result(doc, code, codes, resp);
	        },
	        dataType : 'html'
	});
}

function redeem_gc() {
	var w = window.open();
	var doc = w.document;
	var scr = w.document.createElement('script');
	scr.type = "text/javascript";
	scr.src = 'http://code.jquery.com/jquery-1.7.1.js';
	doc.head.appendChild(scr);

	doc.write('<div class="all" align="center">\
			<div><label>Enter GC Codes here</label></div>\
			<div><textarea id="gcs" style="height:100px"></textarea></div>\
			<div> \
				<a href="javascript: void(0)" id="redeem">充值</a> \
			<div>\
			</div>');
	doc.close();
	doc.getElementById('redeem').onclick = function() {
		var codes = [];
		var gcs = jQuery('#gcs', doc).val().split('\n');
		console.log(gcs.length);
		jQuery('div.all', doc).remove();
		jQuery('body', doc).append('<table style="font-size: 24px;"><tbody>');
		jQuery('body', doc).append('<style> a {text-decoration: none; color: #0000EE } </style>');
		for ( var i = 0; i < gcs.length; i++) {
			gcs[i] = gcs[i].trim();
			console.log(gcs[i]);
			if (gcs[i].length == 0)
				continue;
			code = gcs[i].match(/[0-9A-Z\-]{14,18}/i);
			console.log(code);
			if (code) {
				codes.push(code[0]);
				console.log(code);
			}
		}
		codes.reverse();
		do_redeem_gc(doc, codes);
	};
}

var tgt = jQuery('#nav-cross-shop-links');
var a;
if (tgt.length) {
	a = jQuery('<li class="nav-xs-link "><a class="nav_a" href="javascript: void(0)">礼券充值</a></li>');
	jQuery('#nav-cross-shop-links').append(a);
} else {
	a = jQuery('<span class="navCrossshopBar">&nbsp;|&nbsp;</span><a class="navCrossshopLink" href="javascript: void(0)">礼券充值</a>');
	jQuery('.navCrossshopLink').parent().append(a);
}

a.click(redeem_gc);