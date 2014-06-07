// ==UserScript==
// @name	Ziddu JPG viewer
// @author	Angle
// @version	2010-03-28
// @include	http://www.ziddu.com/download/*.jpg.html
// @include	http://www.ziddu.com/gallery/*.jpg.html
// ==/UserScript==

if (window.location.href.match(/ziddu\.com\/download/))
	window.location = window.location.href.replace(/ziddu\.com\/download\//i, "ziddu.com/gallery/");

if (window.location.href.match(/ziddu\.com\/gallery/)) {
	file = document.getElementById("file").value;
	tid = document.getElementById("tid").value;
//	vlfid = document.getElementById("vlfid").value;
//	window.location = "http://www.ziddu.com/viewlarge.php?file=" + file + "&tid=" + tid + "&vlfid=" + vlfid;
	window.location = "http://www.ziddu.com/view1.php?file=" + file + "&tid=" + tid;
}
