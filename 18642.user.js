// ==UserScript==
// @name           Ragalahari.com - Direct audio links to Download
// @namespace      http://www.jawaji.com
// @description    This script will unearth the links to download audio files from http://www.ragalahari.com/newreleases.asp
// @include        http://www.ragalahari.com/*newreleasesdetail.asp*
// @include        http://www.ragalahari.com/jukeboxv3/playsongs.asp*
// ==/UserScript==

window.addEventListener("load", function(e) 
{
	if (location.href.indexOf('newreleasesdetail.asp') != -1) {
		var regRag = /(\'(\d+\,)+\d+\')/
		var result = regRag.exec(document.body.innerHTML);
		//alert(result.length);
		if (result.length > 0)
			location.href='http://www.ragalahari.com/jukeboxv3/playsongs.asp?id=' + result[0].replace(/\'/g, '');
	} else {
		var items = document.body.innerHTML.split('http');
		if (items.length > 0) {
			var sBody = '<center><h1>Right click and select "Save link as" to download the file</h1>';
			for(var i=1;i<items.length;i++){
				sBody += '<br /><a href="http'+items[i]+'" target="_blank">'+URLDecode(items[i].split('?Title=')[1])+'</a>'
			}
			sBody += '</center>'
			document.body.innerHTML = sBody;
		}
	}
},false);

// Source: http://www.albionresearch.com/misc/urlencode.php
// Slightly modified to suit my needs
function URLDecode(encoded){
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2) 
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape(encoded.substr(i,3));
				i += 3;
			} else {
				plaintext += "%";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} // while
   return plaintext.replace(/\^/g, '; ');
}
