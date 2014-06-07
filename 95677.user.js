// ==UserScript==
// @name	Ondertitel.com insta-dload
// @description	Opens downloadlink without showing detailed information of the subtitle.
// @include	http://ondertitel.com/?type=*&trefwoord=*&p=zoek
// @version	1
// @author	Martijn Lentink
// ==/UserScript==

for(i=0; i < document.getElementsByTagName("a").length; i++) {if(document.getElementsByTagName("a")[i].href.indexOf("info")>-1){document.getElementsByTagName("a")[i].addEventListener("click", Show, false); document.getElementsByTagName("a")[i].setAttribute("onclick","return false");}}

function Show(e)
{
GM_xmlhttpRequest({
    method: 'GET',
    url: e.currentTarget,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		document.location.href=responseDetails.responseText.substring(responseDetails.responseText.indexOf('<span style="text-transform: capitalize;"><a href="')+'<span style="text-transform: capitalize;"><a href="'.length, responseDetails.responseText.indexOf('"><b>Download</b></a></span>'));
    }
});
}