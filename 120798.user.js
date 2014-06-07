// ==UserScript==
// @name           Facebook Wide
// @description    View Facebook at the full width of your browser
// @author         anggiet skyland
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=7981358aef708e92eeadd4422aed9e5e&r=PG&s=64&default=identicon
// @require        http://sizzlemctwizzle.com/updater.php?id=98350&days=1&show
// @include        *facebook.com/*
// @exclude        *apps.facebook.com/*
// @version        v.4.1
// ==/UserScript==

GM_addStyle(
'#globalContainer, .uiUfi, #headerArea, .fbProfileByline {width:100% !important;}' + 
'#content {margin-left:15px !important;}' + 
'#pageHead {width:auto; margin-left:15px !important;}' + 
'#contentArea {width:auto !important; float:left; margin-right:300px !important;}' + 
'#headerArea + div + #contentArea {top: 80px;}' +
'#contentCol {position:relative !important;}' + 
'#headerArea {width:auto !important; margin-right:300px !important;}' + 
'#rightCol {position:absolute !important; top:15px; right:0;}' + 
'#pageFooter {display:none;}' + 
'.uiSideNav .hidden {display:block !important;}' + 
'#pagelet_apps_nav .navMoreLess {display:none !important;}' + 
'.fbEmuEgoUnitFirst, .fbEmuEgoUnit {display:none !important;}' + 
'#help_center_header {width:auto !important; margin-right:240px !important;}' + 
'#contentUnfriends {width:auto !important; float:left; margin-right:300px !important;}' + 
'#appbox {display:block !important;}'
);