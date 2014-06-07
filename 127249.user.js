// ==UserScript==
// @name          Bildlader fuer Meta-Preisvergleich 
// @namespace     mpv
// @include       http://meta-preisvergleich.de/i.htm*
// @description   Ist notwendig zum Anzeigen der Bilder in Ergebnissen von Benutzerskripten
// @icon          http://meta-preisvergleich.de/icon.gif
// ==/UserScript==

// this script is mainly based on the image loader by slepp: http://de.pastebin.ca/1425789

/*
http://meta-preisvergleich.de/i.htm?alt=fernseher&src=http://www.kneller-gifs.de/animationen/f/a_fernseher17.gif

*/

var altsrc = unsafeWindow.location.search;

alt = "";
if ( r = /alt=([\s\S]*?)&src=/gim.exec(altsrc) ) {
	alt = r[1];
	//alt = decodeURI(alt);
	alt = unescape(alt);
}//if
src = altsrc.replace(/\?alt=[\s\S]*?&src=/gim, '');
 
GM_xmlhttpRequest({
		method: 'GET',
		url: src, // URL to image
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload: function(xhr)
		{
				var data = data_string(xhr.responseText);
			   
				// We can now do what we like with the data, E.g.
				var base64_data = btoa(data); // Encode to base64 string
			   
				// We can then turn the Base64 string into a image using Data URL's ( http://en.wikipedia.org/wiki/Data_URI_scheme )
				var data_url = 'data:' + mime_from_data(data) + ';base64,' + base64_data; // Make the data url
			   
				var image = new Image();
				image.src = data_url;
				image.width = 60;
				image.setAttribute('alt', alt);
				image.setAttribute('title', alt);
				image.setAttribute('onload', 'is()');
				
				document.getElementsByTagName("center")[0].appendChild(image); // Put image centered to page

				return;
		}
});


function mime_from_data(data) // Simple function that checks for JPG, GIF and PNG from image data. Otherwise returns false.
{
        if('GIF'==data.substr(0,3))return 'image/gif';
        else if('PNG'==data.substr(1,3))return 'image/png';
        else if('JFIF'==data.substr(6,4))return 'image/jpg';
        return false;
};
function data_string(data) // Generates the binary data string from character / multibyte data
{
        var data_string='';
        for(var i=0,il=data.length;i<il;i++)data_string+=String.fromCharCode(data[i].charCodeAt(0)&0xff);
        return data_string;
};
