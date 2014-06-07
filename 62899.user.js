// ==UserScript==
// @name           pasaKche forever
// @namespace      avoid cache
// @description    It avoid the use of the "proxy-cache", forcing him to look for the pages that we request in the real servant and improving the speed appreciably in some cases.
// @include        *
// ==/UserScript==

/* COMPLETE DESCRIPTION
	Some months ago the telephony operators put into operation a service of "proxy-cache" by means of which are saved traffic of data, serving copies of pages Web memorized in the servant instead of serving the most recent version in the same one after the users petition.  

	pasaKche forever to in fact avoid the use of this proxy, always forcing him to look for the pages that we request in the original servant, what always allows to have the most up-to-date version in the same one.

	In some cases he/she even can that you experience an appreciable improvement in the speed of load of certain pages, since you save yourself some steps.

	In honour of pasaKche so this software don't work in Firefox anymore. The original software can be found here: http://www.internautas.org/html/1110.html
*/

/*
* This script simply adds a line in the header similar to: 
* <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
*/
var myElement = document.createElement("meta");
myElement.http-equiv = "Cache-Control";
myElement.content = "no-cache";
myElement.mustrevalidate;
document.documentElement.getElementsByTagName("head")[0].appendChild(myElement);


// Other possibilities to use:
// <meta http-equiv="Expires" content="0">
// <meta http-equiv="Last-Modified" content="0">
// <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
// <meta http-equiv="Pragma" content="no-cache">
// Whatever of them work correctly. You have to put one of them between the labels <HEAD> and </HEAD>.