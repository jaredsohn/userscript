// ==UserScript==
// @name           InternetHaber.com - Foto Galeri - AD skipper
// @version        1.0
// @date           16.01.2013
// @author         Volkan K.
// @namespace      http://userscripts.org/users/volkan
// @description    skip that shit in internethaber fotogaleri
// @include        http://www.internethaber.com/*foto*
// ==/UserScript==

var need_confirmation=0; // 0 for no confirmation, 1 for confirmation required

//alert('DEBUG! include tag is OK!');

var re1 = /ad=1/;
if ( window.location.href && !(window.location.href.match(re1)) ){

	var linkler = document.getElementsByTagName('a');
	var re2 = /ad=1/;

	lastcanceladdress='';
	for (var i = 0; i < linkler.length; i++) {
		if (linkler[i] && linkler[i].href.match(re2) && (lastcanceladdress!=linkler[i].href))
		{
			//alert('DEBUG MESSAGE!'+ "\r\n\r\n" + 'i=' + i + "\r\n" + 'i.href=' + linkler[i].href);
			
			var response=true;
			if (need_confirmation) {
				var response=confirm("Reklami gecmek ve asagidaki adrese gitmek icin Tamama basin:" + "\r\n\r\n" + linkler[i].href);
			}
			if (response==true)
			{
				//alert("You pressed OK!");
			
				window.location=linkler[i].href;
				break;
			}
			else
			{
				//alert("You pressed Cancel!");
				lastcanceladdress=linkler[i].href;
			} 
		}
	}
	
}
