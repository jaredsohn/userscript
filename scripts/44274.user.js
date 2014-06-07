// ==UserScript==
// @name	facebook square-cut edition (It's hip to be square)
// @namespace	Max Friedrich Hartmann
// @description	If you don't like facebooks new rounded corners this could help you out. Removes rounded corners from contact thumbs, status update box, menu bar, filter list and stream filter tabs. Optional sponsor/ad-removal by uncommenting 2nd to last line.
// @date	2009-27-04
// @version	1.9
// @match  	http://facebook.com/*
// @match  	http://www.facebook.com/*
// @match  	http://login.facebook.com/*
// @match  	https://www.facebook.com/*
// @match  	https://facebook.com/*
// @match  	https://login.facebook.com/*
// @include  	http://facebook.com/*
// @include  	http://www.facebook.com/*
// @include  	http://login.facebook.com/*
// @include  	https://www.facebook.com/*
// @include  	https://facebook.com/*
// @include  	https://login.facebook.com/*
// ==/UserScript==

GM_addStyle(
// Fixes rounded corners of contact image thumbs
'.UIRoundedImage_CornersSprite { display: none !important }' +
// Fixes rounded corners of status box
'.UIRoundedBox_Corner.UIRoundedBox_TL { background-image: none; background-color: #f2f2f2; border-left: solid 1px #b4b4b4}' +
'.UIRoundedBox_Corner.UIRoundedBox_TR { background-image: none; background-color: #f2f2f2; border-top: solid 1px #b4b4b4; border-right: solid 1px #b4b4b4}' +
'.UIRoundedBox_Corner.UIRoundedBox_BL { background-image: none; background-color: #f2f2f2; border-bottom: solid 1px #b4b4b4}' +
'.UIRoundedBox_Corner.UIRoundedBox_BR { background-image: none; background-color: #f2f2f2}' +
'.UIRoundedBox_Side.UIRoundedBox_LS { background-image: none; }' +
'.UIRoundedBox_Side.UIRoundedBox_RS { background-image: none; }' +
// Fixes rounded corners of status bar
'#fb_menubar { background-image: none; background-color: #3b5998; border: solid 1px #254588 width:940px}' +
// Fixes rounded corners of highlighted filter list item
'.UIFilterList_Selected { background-image: none; background-color: #7e97c2; border: solid 1px #476ea9 }' +
'.UIObject_SelectedItem .UIFilterList_ItemRight { background-image: none; background-color: #7e97c2; }' +
'.UIFilterList .UIObject_SelectedItem { background-image: none; background-color: #7e97c2; border: solid 1px #476ea9; }' +
'.UIFilterList_Item .UIFilterList_ItemLink { border-bottom: none; }' +

//Fixes stream filter tabs
'.Tabset_selected .bl, .Tabset_selected .br, .Tabset_selected .tr, .Tabset_selected .tl { background-image: none !important; background-color: #6d84b4 !important }' +
'.Tabset_selected .bl { border: solid 1px #5b74aa; border-top: solid 1px #43609d; border-bottom: solid 1px #637bae}'
);

GM_addStyle(
// hides sponsored and sidebar ads
// activate by editing out the 2 comment slashes in the next line
//'#home_sponsor_nile, #ssponsor { display: none !important }' 
);