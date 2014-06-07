// ==UserScript==
// @id             imgstyler
// @name           imgstyler
// @version        120109
// @namespace      
// @author         Maija
// @description    add your own stylesheet to image preview pages in Firefox
// @homepage       http://userscripts.org/users/maija
// @include        *
// @run-at         document-start
// ==/UserScript==

/* 	if you want to be more selective about when the page loads then use the following @include instead.
	But remember to remove // @include        *
	
// @include        /.*((apng|bmp|gif|jpg|jpeg|png|tiff)|(data:image/.*))/i

	what style's do you want?
		- set the background color
		- un/comment the style option
*/

var el = document.evaluate('.//meta[@name="viewport"]', document.head, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (el){

var background = '#fff';

//	no img shadow, for the good old days ;)
var style = 'body {background-color:'+ background +';} img {box-shadow:none;}';

//	img shadow, img centered
//var style = 'body {background-color:'+ background +';} img {box-shadow:2px 2px 4px rgba(0,0,0,0.5); margin:0 auto;}';

//	no img shadow, img centered
//var style = 'body {background-color:'+ background +';} img {box-shadow:none; margin:0 auto;}';

//	a little over the top, but it has potential..
//var style = 'html {height:105%; background:-moz-linear-gradient(top, rgba(252,255,244,1) 0%, rgba(223,229,215,1) 40%, rgba(159,165,155,1) 100%);} body {background-color:transparent;} img {margin:0 auto; background: #fff; border: 1px solid #ababab; box-shadow:3px 3px 9px rgba(0, 0, 0, 0.5); padding:3px;}';


GM_addStyle(style);
}