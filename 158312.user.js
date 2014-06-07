// ==UserScript==
// @name           Textarea Adjuster
// @namespace      textarea_adjuster
// @description    Allows for the textarea size to be adjusted for multiple websites. Support for Reddit, Youtube, vBulletin, MyBB, phpBB more to be added.
// @include        http*
// @copyright      groen
// @version        0.2
// ==/UserScript==
//
// Support for, Reddit, Youtube, vBulletin, MyBB, phpBB
//
// Set Variables Width and Height, rows and cols.
var tawidth = "640px";
var taheight = "400px";
// It looks like width and height values override the rows and cols.
var tarows = "20";
var tacols = "5";

////////////////////////////////////////////////
// No need to modify anything past this point // 
////////////////////////////////////////////////

var iObjects = document.getElementsByTagName('textarea');
var iObjectsLen = iObjects.length;
     
for (var i = 0; i < iObjectsLen; i++)
{
    var iOr = iObjects[i];
	if (iOr.name == 'text' || iOr.name == 'message' || iOr.id == 'vB_Editor_QR_textarea' || iOr.id == 'vB_Editor_001_textarea' || iOr.id == 'message') {
	iOr.rows = tarows;
	iOr.cols = tacols;
	iOr.style.width = tawidth;
	iOr.style.height = taheight;
	iOr.style.display = 'block';
	}
	//alert(iOr.id);
}