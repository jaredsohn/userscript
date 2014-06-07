// ==UserScript==
// @name           Remove Facebook Clutter.
// @namespace      Andrew Hinton
// @description    FaceBook. Changes font and image size, removes Highlights and the stories filter.
// @date           2009-03-14
// @version        2.0
// @include       https://www.facebook.*
// @include       http://www.facebook.*
// ==/UserScript==
//(With special thanks to Daniel Leinerud)

GM_addStyle(
'.home .UIIntentionalStream .UIIntentionalStory_Message  { display: block; padding-bottom: 0px; font-size:11px;}' +
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
'.UIHomeBox { font-size:10px; }' +
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