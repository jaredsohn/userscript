// ==UserScript==
// @name        Panoramio Original Image Link
// @namespace   http://www.panoramio.com/user/209256
// @description Add the Original image link in the author line rights and it is not necessery to use Panoramio Photo Explorer
// @include     http://www.panoramio.com/photo/*
// @author		Jirka Bulant
// @date		2012-06-05
// @version     1.0
// @license		MIT License
// @icon		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAMAAADWg4HyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJxQTFRFGEb//P3/6u7/VHb/Bjj/S2//9vj/8PP/IU3/usj/UXT/Y4L/ydT/fpj/3uX/q7z/JFD/kKb/P2X/M1z/J1L/DD3/KVT/jaT/0tv/ZoX/n7L/kaf/Dz//lqv/aYf/LVf/Qmj/b4z/MFn/5+z/pbf/zNb/AjX/wM3/k6n/G0n/2+L/h5//AzX/Hkv/eJP/e5X/tMP/PGP/ADP/////mTCi+wAAADR0Uk5T////////////////////////////////////////////////////////////////////AEtXImUAAAC6SURBVHja7NRHEoMwDAVQU0Oo6T0hvVf5/ncLE2G2+iyZyV+/8ViyZKXxqL9toPVxu1/B9kweal9EfcxaEREpyPphQclFbKtHv9iy3W2Z0kS016Ck1JbsQRlKM8GehhWlm2Czp1cdvJFrWxvriDa9G/sRbcJwEVJHstaF7VRngWTf5QXi4v0k6zDNgb2wXbZdwI6ZujZgB2Vrgd2MzdiwJSAPC7eJhu0xxe1I4zaqYec17LKhf/VXgAEANfZmHZnh6HkAAAAASUVORK5CYII=
// ==/UserScript==

(function () {
	var div = document.getElementById("author");
	if (div) {
		var a = document.createElement('a');
		a.style.cssFloat = "right";
		a.style.marginLeft = "10px";
		a.href = document.getElementById("main-photo").href.replace(/photo_explorer.[^&]+&with_photo_id=(\d+).*/, "photos\/1920x1280\/$1.jpg")
		a.appendChild(document.createTextNode('Original'));
		div.appendChild(a);
	}
}());
