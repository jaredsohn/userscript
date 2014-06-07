// ==UserScript==
// @name           Facebook No Ads / No Junk
// @version        0.2
// @description    Simple hide some facebook block that boring me.
// @namespace      da_mine
// @author         Bzrk666
// @include        http://apps.facebook.com*
// @include        http://www.facebook.com*
// ==/UserScript==

// just the blaclist
var black_list = new Array(
	'sidebar_ads', // ads on the right in apps.facebook.com
	'pagelet_pymkbox', // Suggestion
	'pagelet_adbox', // facebook ads
	'pagelet_connectbox' // rest in peace :p
	);

// for each block
for(block in black_list)
{
	var bloc_hide = document.getElementById(black_list[block]);
	if(bloc_hide != null){
		// I hid it... it's hard, don't you ?
		bloc_hide.setAttribute('style', 'display:none');
	}
}

// ads on profile
document.getElementById('pagelet_ads').setAttribute('style', 'visibility:hidden');