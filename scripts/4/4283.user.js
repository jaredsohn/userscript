// ==UserScript==
// @name          Google & Dilbert
// @namespace     http://www.devdive.com/
// @include       http://www.google.*/
// @include       http://google.*/
// @include       http://www.google.*/webhp*
// @include       http://google.*/webhp*
// @description	  Adds the comic strip of the day from Dilbert.com to Google's homepage, 
//                just below the Search and I'm feeling lucky buttons.
// ==/UserScript==

if( !location.pathname.match( /^\/($|webhp)/ ) ||
    !location.hostname.match( /\bgoogle\.[a-z.]{1,10}$/i ) )
  return; // don't hook on to Google Reader, for instance.
 
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.dilbert.com/',
	onload: function(responseDetails) {
		var dilbcode = responseDetails.responseText;
		imgloc = dilbcode.match(/\/comics\/dilbert\/archive\/images\/dilbert\d+.gif/);
		var f = document.getElementsByTagName("form");
		var b = document.getElementsByTagName("br");
		b[b.length-1].style.display=b[b.length-2].style.display="none";
		i = document.createElement("img");
		i.src="http://www.dilbert.com"+imgloc;
		i.vspace="14";
		f[0].appendChild(i);		
    }
});