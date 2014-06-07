// ==UserScript==
// @name Change Global Font
// @namespace http://userscripts.org/users/23652
// @description Changes Arial, Verdana, Tahoma, other sans-serif fonts to user's default sans-serif font, or enter a font of your own
// @include *
// @copyright PeteFarmer_JoeSimmons

// by Pete Farmer and Tenfold <pfarmer@collaboros.com> <TheTenfold@gmail.com>
// ==/UserScript==

// Updated 11-Jul-08 so that fonts that aren't as bothersome (to me) are excluded from the changes
// UserScript command to switch to any font added by Tenfold (Joe Simmons)
// UserScript command to show which font is being used by Tenfold (Joe Simmons)
// Used Pete Farmer's script to make a great update

var elementList, i, elementItem, style, userFont;

function capitalizeMe(obj) {
return obj.substring(0,1).toUpperCase() + obj.substring(1,obj.length);
}

userFont = GM_getValue('gmGlobalFont', 'sans-serif');

elementList = document.evaluate("//*",document,null,6,null);

	for (i=elementList.snapshotLength - 1; i>=0; i--) {
		elementItem = elementList.snapshotItem(i);
		style = getComputedStyle(elementItem, '');
		elementItem.style.fontFamily = userFont;
	}
	
GM_registerMenuCommand('Change Font', function() {
GM_setValue('gmGlobalFont', prompt('Which font would you like to use?'));
window.location.reload();
});

GM_registerMenuCommand('Current Font', function() {
alert('Your current font is ' + capitalizeMe(userFont));
});