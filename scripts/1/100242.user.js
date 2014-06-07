// ==UserScript==
// @name           ECSHOP (wholesale-dress.net) OOS checker
// @namespace      http://userscripts.org/users/127699
// @description    Check goods for OOS
// @include        http://www.wholesale-dress.net/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var checked = new Array()

function ajaxoos(gid, val) {
if (typeof checked[gid] == 'undefined') {
	checked[gid] = 1;
	$.ajax({
		type: "get",
		url: "function/goods_status.php",
		cache: false,
		data: "goods_id=" + gid,
		success: function(h) {
			if (h.length < 80) {
				$(val).parent().parent().css('background-color', 'rgb(255, 255, 80)');
				//$(val).parent().parent().hide();
			}
		}
	});
}
}

function checkallgoods() {
$('a[href^="javascript:addToCart2"]').each(function (i, val) {
	var gid = this.href.match(/addToCart2\((\d+)\)/);
	if (gid != null) { ajaxoos(gid[1], val); };
});
$('a[href$=".html"]').each(function (i, val) {
	var gid = this.href.match(/g(\d+)\.html$/);
	if (gid != null) { ajaxoos(gid[1], val); };
});
$('a[href^="exchange.php?id="]').each(function (i, val) {
	var gid = this.href.match(/\?id\=(\d+)/);	
	if (gid != null) { ajaxoos(gid[1], val); };
});
}

checkallgoods();