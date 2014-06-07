// ==UserScript==
// @name          Google & Komikaze
// @include       http://google.*/*
// @include       http://www.google.*/*
// @include       http://www.google.com.tr/*
// @description	  Adds the comic strip of the day from komikaze.net to the bottom of Google pages.
// ==/UserScript== 

// The code below is inspired from Garfield's website.

 if( !location.pathname.match( /^\/($|webhp)/ ) ||
    !location.hostname.match( /\bgoogle\.[a-z.]{1,10}$/i ) )
  return; // don't hook on to Google Reader, for instance.

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.komikaze.net/',
	onload: function(responseDetails) {
		
		var komikaze = responseDetails.responseText;
		imgloc = komikaze.match(/\/komikaze\/karikaturler\/\d*_.*.jpg/);

		var f = document.getElementsByTagName("form");
		var b = document.getElementsByTagName("br");
		b[b.length-1].style.display=b[b.length-2].style.display="none";
		i = document.createElement("img");
		i.src="http://www.komikaze.net"+imgloc;
		i.vspace="14";
		f[0].appendChild(i);

    }
});


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.komikaze.net/sitebocugu.asp',
	onload: function(responseDetails) {
		
		var komikaze = responseDetails.responseText;
		imgloc = komikaze.match(/\/sitebocugu\/karikaturler\/\d*_.*.jpg/);

		var f = document.getElementsByTagName("form");
		var b = document.getElementsByTagName("br");
		b[b.length-1].style.display=b[b.length-2].style.display="none";
		i = document.createElement("img");
		i.src="http://www.komikaze.net"+imgloc;
		i.vspace="14";
		f[0].appendChild(i);

    }
});

