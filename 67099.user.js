// ==UserScript==
// @name		  MediaFire Cleanup
// @namespace	  
// @description   Remove annoying embeded ads, banners, and all that garbage to make the DDL interface simpler.
// @version       0.1
// @require  http://usocheckup.dune.net/67099.js?maxage=5
// @include       http://*mediafire*
// @exclude	   
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
// End Release Notes

// Remove flash ads in iframe
(function() {
	var div = document.getElementsByTagName('iframe');
	var attribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			attribs = div[i].getAttribute('name');
			if(attribs == "iframe_linkto2"){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	}
)();
// Remove popup banners, etc
var removeContent = new Array();
removeContent.push( document.getElementById('remove_ads_button1') ); 
removeContent.push( document.getElementById('catfish_div') );
removeContent.push( document.getElementsByClassName('footer')[0] );
removeContent.push( document.getElementsByClassName('download_banner_container')[0] );
for ( var i = 0 ; i < removeContent.length ; i++ ){
	if ( removeContent[i] && removeContent[i].parentNode && removeContent[i].parentNode.removeChild ) {
		removeContent[i].style.display = 'none';
		removeContent[i].parentNode.removeChild(removeContent[i]);
	}
}