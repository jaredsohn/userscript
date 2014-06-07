// ==UserScript==
	// @name				Sans-serif default
	// @namespace		http://userscripts.org
	// @description		Changes Arial, Verdana, Tahoma, other sans-serif fonts to user's default sans-serif font
	// @include			*
	// @author			Pete Farmer <pfarmer at collaboros.com>
// ==/UserScript==

//	Updated 11-Jul-08 so that fonts that aren't as bothersome (to me) are excluded from the changes


var elementList = document.getElementsByTagName('*');
	for (var i = elementList.length - 1; i >= 0; i--) {
		var elementItem = elementList[i];
		var style = getComputedStyle(elementItem, '');
		elementItem.style.fontFamily = style.fontFamily.replace(/arial/i, 'sans-serif');
		elementItem.style.fontFamily = style.fontFamily.replace(/MS Shell dlg/i, 'sans-serif');
		elementItem.style.fontFamily = style.fontFamily.replace(/verdana/i, 'sans-serif');
		elementItem.style.fontFamily = style.fontFamily.replace(/tahoma/i, 'sans-serif');

//  Uncomment the following lines if you want to check for and replace additional fonts

//		elementItem.style.fontFamily = style.fontFamily.replace(/geneva/i, 'sans-serif');
//		elementItem.style.fontFamily = style.fontFamily.replace(/helvetica neue/i, 'sans-serif');
//		elementItem.style.fontFamily = style.fontFamily.replace(/helvetica/i, 'sans-serif');
//		elementItem.style.fontFamily = style.fontFamily.replace(/lucida grande/i, 'sans-serif');
//		elementItem.style.fontFamily = style.fontFamily.replace(/lucida sans/i, 'sans-serif');

	}
