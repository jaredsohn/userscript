// ==UserScript==
// @name          MediaFire Auto-Download
// @version       2.5
// @namespace     zack0zack@gmail.com
// @description   MediaFire Auto-Download
// @include	  http://www.mediafire.com/download.php?* 
// @include	  http://www.mediafire.com/*
// @exclude	  http://www.mediafire.com/?sharekey=*
// @copyright     zack0zack@gmail.com
// ==/UserScript==


window.addEventListener("load",function() {
  window.setTimeout(function(){ 
	var div = document.getElementsByTagName('div');

	for( var i = 0; i < div.length; i++ ){
	  if ( div[i].id.length == 32 ) {
		if ( div[i].style.cssText == "display: block;") {
			document.location.href = div[i].firstChild.href;
			break;
		}
	  }
	}

  }, 3000);
},true)
