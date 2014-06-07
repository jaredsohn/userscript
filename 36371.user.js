	// ==UserScript==
	// @name Hotlinker for Google Images
	// @description Redirects directly to hi-rez picture instead of opening 2 frames after clicing on preview
	// @include http://images.google.*/imgres*
	// ==/UserScript==
	if(location.href.indexOf("&frame=small")==-1){
	var re = /=(http.*?)&/;
	var arr=re.exec(decodeURIComponent(location.href));
	location.href=arr[1];
	}