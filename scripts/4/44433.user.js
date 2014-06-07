// ==UserScript==

// @name           Bare minimum Facebook

// @author         TomBell

// @namespace      http://userscripts.org/scripts/show/44271

// @description    Removes filters column on left, removes highlight column on right, changes the width of the main column.  Also gets rid of whether or not people "like" something.

// @include        http://*.facebook.com/*

// @include       http://facebook.*/*

// @include       http://www.facebook.*/*

// ==/UserScript==




GM_addStyle(
//corners fix from Bring The Old Facebook Back by Emiliano Chirchiano
'.UIRoundedBox_Corner.UIRoundedBox_TL { background-image: none; background-color: #f2f2f2; border-left: solid 1px #b4b4b4}' +
'.UIRoundedBox_Corner.UIRoundedBox_TR { background-image: none; background-color: #f2f2f2; border-top: solid 1px #b4b4b4; border-right: solid 1px #b4b4b4}' +
'.UIRoundedBox_Corner.UIRoundedBox_BL { background-image: none; background-color: #f2f2f2; border-bottom: solid 1px #b4b4b4}' +
'.UIRoundedBox_Corner.UIRoundedBox_BR { background-image: none; background-color: #f2f2f2}' +
'.UIRoundedBox_Side.UIRoundedBox_LS { background-image: none; }' +
'.UIRoundedBox_Side.UIRoundedBox_RS { background-image: none; }' +
'#fb_menubar { background-image: none; background-color: #3b5998; border: solid 1px #254588 width:940px}' +
'.UIFilterList_Selected { background-image: none; background-color: #7e97c2; border: solid 1px #476ea9 }' +
'.UIFilterList_Selected .UIFilterList_ItemRight { background-image: none; background-color: #7e97c2; }' +
//

'#home_filter_list { display:none !important; }' +
'#home_sidebar { display:none !important; }' +
'.UIComposer_Prompt { display:none !important; }' +
'#home_left_column { width:auto !important; }' +
'#home_stream { width:auto !important; }' +
'.UIIntentionalStory_Message { width:auto !important; }' +
'.wallpost { width:auto !important; }' +
'.wallcontent { width:auto !important; }' +
'.walltext { width:auto !important; }' +
'.show_all_link { width:auto !important; }' +
'textarea { width:98% !important; }' +
'.like_box { display:none !important; }' +
'.UIRoundedImage_Corners { display:none !important; }' +
'#pagefooter { width:auto !important; }' +
'#menubar_container { width:auto !important; }' +
'#fb_menubar { width:100% !important; }' +
'.UIFullPage_Container { width:auto !important; }' +
'.comments_add_box_image { display:none !important; }' +
'.chat_input { width:198px !important; }'
);