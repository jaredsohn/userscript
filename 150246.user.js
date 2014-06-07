// ==UserScript==
// @name        Panoramio Map Links
// @namespace   http://www.panoramio.com/user/209256
// @description Changes links on thumbnails (preview area) to the Original image link
// @include     http://www.panoramio.com/map/*
// @grant		none
// @author		Jirka Bulant
// @date		2012-10-16
// @version     1.0
// @license		MIT License
// @icon		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAMAAADWg4HyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJxQTFRFGEb//P3/6u7/VHb/Bjj/S2//9vj/8PP/IU3/usj/UXT/Y4L/ydT/fpj/3uX/q7z/JFD/kKb/P2X/M1z/J1L/DD3/KVT/jaT/0tv/ZoX/n7L/kaf/Dz//lqv/aYf/LVf/Qmj/b4z/MFn/5+z/pbf/zNb/AjX/wM3/k6n/G0n/2+L/h5//AzX/Hkv/eJP/e5X/tMP/PGP/ADP/////mTCi+wAAADR0Uk5T////////////////////////////////////////////////////////////////////AEtXImUAAAC6SURBVHja7NRHEoMwDAVQU0Oo6T0hvVf5/ncLE2G2+iyZyV+/8ViyZKXxqL9toPVxu1/B9kweal9EfcxaEREpyPphQclFbKtHv9iy3W2Z0kS016Ck1JbsQRlKM8GehhWlm2Czp1cdvJFrWxvriDa9G/sRbcJwEVJHstaF7VRngWTf5QXi4v0k6zDNgb2wXbZdwI6ZujZgB2Vrgd2MzdiwJSAPC7eJhu0xxe1I4zaqYec17LKhf/VXgAEANfZmHZnh6HkAAAAASUVORK5CYII=
// ==/UserScript==

if (!document.getElementById("obnovit")) {
	var o = document.getElementById("tab_checkbox_area");
	var t = document.createElement('input');
	t.className = "";
	t.type = "button";
	t.title = "after reload all thumbnails push the button to change links to original images";
	t.value = "change links";
	t.id = "obnovit";
	t.setAttribute("onclick", "var x = document.getElementsByClassName('preview_thumb_area');for (var i = 0; i < x.length; ++i) {var a = x[i].getElementsByTagName('a')[0];if (a.href.match(/\\d$/)) {a.href = a.href.replace(/[^\\d]+(\\d+)/, '/photos/1920x1280/$1.jpg');a.target = '_blank';}}");
	o.appendChild(t);
};




