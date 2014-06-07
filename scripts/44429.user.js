// ==UserScript==
// @name           Bring The Old Facebook Back
// @namespace      Emiliano Chirchiano
// @description    FaceBook. Changes font and image size, removes Highlights and the stories filter, removes rounded corners..
// @date           2009-03-19
// @version        1.11
// @include       https://www.facebook.*
// @include       http://www.facebook.*
// ==/UserScript==
//(With special thanks to Daniel Leinerud and Andrew Hinton)

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
'.UIFilterList_Selected .UIFilterList_ItemRight { background-image: none; background-color: #7e97c2; }' +

// fix width profile column
'.profile .right_column_container{margin:auto;width:600px;padding:0px;}'+
'#home_left_column {width:600px}'+
'#home_filter_list {display:none}'+



//remove clutter
'.UIIntentionalStory_Message {font-size:11px;}' +
'.home .UIIntentionalStream .UIIntentionalStory_Message { display: block; padding-bottom: 0px; font-size:11px;}' +
'div.UIIntentionalStory_Body { min-height:35px; padding:0 0 0 50px;}' +
'.commentable_item .comment_add_row { padding-bottom:1px; }' +
'.UIRoundedImage_LARGE .UIRoundedImage_Image { height:40px; width:40px; }' +
'.UIRoundedImage_Corners { display:none; }' +
'.UIRoundedImage_LARGE { height:40px; width:40px; }' +
'.UIHotStory .UIMediaItem_Wrapper img{ width:40px !important; }' +
'.UIMediaItem_Photo .UIMediaItem_PhotoFrame { width:40px !important; }' +
'.UIMediaItem_ImageLink .UIMediaItem_Photo a:hover .UIMediaItem_Wrapper, .UIMediaItem_Photo a:hover .UIMediaItem_PhotoBorder { width:40px !important; }' +
'.UIMediaItem_ImageLink { display:none; }' +
'.UIHotStory .UIMediaItem_ImageBackground { width:40px !important; height:30px !important; }' +
'.UIHotStory_Media { width:55px !important; }' +
'UIRoundedBox_GrayDarkTopBackground .UIRoundedBox_Box .UIRoundedBox_TR, .UIRoundedBox_GrayBlueTopBackground .UIRoundedBox_Box .UIRoundedBox_TR { padding:0 0 0 0; }' +
'.UIComposer_Prompt { font-size:11px !important; }' +
'.UIFilterList_Item a { font-size:9px; padding:8px 9px 3px 25px; height:14px; }' +
'.UIHomeBox { font-size:11px; }' +
'.profile_sidebar_ads { display:none !important; }' +
'.admarket_fluff_ad { display:none !important; }' +
'.adcolumn { display:none !important; }' +
'.sidebar_ads { display:none !important; }' +
'.sponsors { display:none !important; }' +
'.profile_sidebar_ads { display:none !important; }' +
'.adcolumn_wrapper { display:none !important; }' +
'.admarket_fluff_ad { display:none !important; }' +
'.adcolumn_header { display:none !important; }' +
'div#sidebar_ads { display:none !important; }' +
'div#sid { display:none !important; }' +
'.ad_story { display:none !important; }' +
'.UIHotStream { display:none !important; }' +
'.UIFilterList { display:none !important; }' 
  

);