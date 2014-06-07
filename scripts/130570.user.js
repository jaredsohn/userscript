// ==UserScript==
// @name           SHOW zingmeid
// @namespace      http://userscripts.org/users/102135
// @description    SHOW zingmeid
// @include        http://me.zing.vn/pi/*
// ==/UserScript==
var idx1, idx2;
idx1 = document.body.innerHTML.indexOf('ownerId: \"');
if (idx1 > -1)
{
	var zingmeid = '';
	idx2 = document.body.innerHTML.indexOf('\",', idx1);
	if (idx2 > -1)
	{
		zingmeid = document.body.innerHTML.substring(idx1+10, idx2);
		document.body.innerHTML = document.body.innerHTML.replace('Họ Tên:', 
		'<b>ZingID</b>:</span><span class=\"bcr\"><b>' + zingmeid + '</b>&nbsp;</span><span class=\"bcl\">Họ Tên:');
	}
}