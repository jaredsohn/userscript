// ==UserScript==
// @name           Learn@UW Content Is Now Usable
// @include        https://*.courses.wisconsin.edu/d2l/lms/content/home.d2l*
// @include        https://*.courses.wisconsin.edu/d2l/lms/content/viewer/view.d2l*
// ==/UserScript==

//Get rid of all the excess bullshit
//Open links in new window, skipping first iframe
function modifyToc()
{
	var a = document.getElementsByTagName("a");	

	for (var i=0;i<a.length;i++){
		a[i].href = a[i].href.replace("viewer/main_frame.d2l", "viewer/view.d2l");
		a[i].target = "_blank";
	};

	var d = document.getElementById("d_content_l_p");
	d.style.display = "none";
}

//go straight to the fucking page, skipping final iframe
function skipViewer()
{
	var frame = document.getElementById("frContentFile");
	top.location.href = frame.src;
}

if(document.title.match(/^Table of Contents/g))
	modifyToc();
else
	skipViewer();