// ==UserScript==
// @name RayFileDDE
// @description RayFile direct download enabler for Opera and FF
// @author OndraSter
// @include http://*.rayfile.com/*
// ==/UserScript==


if(location.hostname.indexOf('rayfile.com') != -1 ) {
	document.addEventListener(
	  'load',
	  function (e) {
		if (typeof window.showDownload == "function")
		{
			filesize=1;
			showDownload();
			
		}
		}, 
		false
	);
}