// ==UserScript==
// @name           Youtube fmt = 5
// @namespace      http://pareca.com
// @description    Embed fmt=5 (lowest quality) to Youtube URL 
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var url = document.location.href; 
var arr = url.split('&');
var flag = 0;

for(var i=0; i<arr.length; i++){
	if(arr[i] == 'fmt=5'){		
		flag = 1;
	}
}

if(flag == 0){
	window.location = url + '&fmt=5';
}





