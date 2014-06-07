// ==UserScript==
// @name           Runescape Facebook: Cleaner
// @namespace      http://userscripts.org/scripts/show/103559
// @description    Hides Facebook sections
// @include        http://*.runescape.com/*
// @include        https://*.runescape.com/*
// ==/UserScript==

adId = [
'PlayFacebook',
'FBbutton',
'FBbuttonLink'
];


Tags = document.getElementsByTagName('*');
for(i=0; i<Tags.length; i++){
	tagId = Tags[i].id;
	for(count=0; count<adId.length; count++){
		if (tagId == adId[count])
			Tags[i].style.display = 'none';
	}
}
