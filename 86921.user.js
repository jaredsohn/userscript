// Fitter Facebook
// Written by Michael Ott
// http://michaelott.id.au/

// -----------------------------------------------------------

// There's nothing too fancy going on here. Just injecting some CSS
// to hide the adverts, and added a few UI enhancements.

// ==UserScript==
// @name           Fitter Facebook
// @author         http://thatwebguyblog.com
// @version        1.3
// @namespace      http://localhost
// @description    Hides Facebook Adverts, adds a little CSS3 bling and simple UI enhancements
// @include        *facebook.com/*
// ==/UserScript==
// That Web Guy	   http://michaelott.id.au/


function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Hiding the adverts
addCSS(	'#pagelet_adbox {display:none !important;}'+
		'#sidebar_ads {visibility:hidden !important;}'+
		'.ego_column {visibility:hidden !important;}'+
		
		
// Making things pretty, and slightly more usable (debatable)
// Note that some of these are legacy - but keeping them does no harm.
		
		'.UIMediaItem_Wrapper {border:none !important; padding:10px !important;}'+
		'.UIMediaItem_Wrapper img {-moz-box-shadow:3px 3px 7px #ccc !important; -webkit-box-shadow:3px 3px 7px #ccc !important;}'+
		'.uiPhotoThumb {border:none !important; padding:10px !important;}'+
		'.UIStoryAttachment_BlockQuote {border-left:solid 2px #ffcc33 !important; position:relative !important; left:15px !important;}'+
		'.UIIntentionalStory {padding:13px 0 10px 65px !important; margin-bottom:0 !important;}'+
		'.UIIntentionalStory:hover, .UIRecentActivity_Stream:hover {background:#f3f3f3 !important; -moz-border-radius:8px !important; -webkit-border-radius:8px !important}'+
		'.UIIntentionalStory:hover .uiUfi {background:#fff !important;}'+
		'.UIIntentionalStory:hover .ufiItem {background:#fff !important;}'+
		'.textBox {padding:5px !important; min-height:25px !important; color:#0091d4 !important;}'+
		'.ufiItem {padding:8px !important;}'+
		'.uiUfiLike {background:#a9bff4 !important;}'+
		'#pagelet_rhc_footer {display:none !important;}'+
		'DIV.pas LI.uiFacepileItem.uiListItem.uiListHorizontalItemBorder.uiListHorizontalItem.chatMobile img, DIV.pas .uiProfilePhoto.uiProfilePhotoMedium.img {width:50px !important; height:50px !important; margin:0 5px 5px 0 !important; opacity:0.4;}'+
		'LI.uiFacepileItem.uiListItem.uiListHorizontalItemBorder.uiListHorizontalItem.chatOnline img, IMG.uiProfilePhoto.uiProfilePhotoMedium.img {opacity:1;}'+
		'DIV.chatStatus {display:none !important;}'+
		'TEXTAREA.uiTextareaAutogrow.input {padding:5px !important;}'+
		'LI.item {border-bottom:solid 1px #c7d8f8 !important;border-top:solid 1px #fff !important;}'+
		'LI.item.active {background:#c7d8f8 !important; color#fff !important;border-top:solid 1px #fff !important;}'+
		'.fbChatSidebar.fixed_always {-moz-box-shadow:0 0 20px #bbc5db; box-shadow:0 0 20px #bbc5db; border:none !important; border-left:solid 5px #fff !important;}'+
		'.uiPhotoThumb {box-shadow:0 0 10px #eee !important;-moz-box-shadow:0 0 10px #eee;}'+
		'.shareRedesignContainer {box-shadow:0 0 10px #eee !important;-moz-box-shadow:0 0 10px #eee; border:solid 5px #fff !important; padding:2px 5px 2px 0 !important;}'+
		'#leftCol {background:#f1f1f1 !important;}'+
		'DIV#pagelet_welcome_box {padding:0 0 0 10px !important;}'+	
		'FORM#navSearch.lfloat {margin:1px 0 0 5px !important;}'+
		'H1#pageLogo {}'+
		'#leftCol DIV.navHeader {background:#a9bff4 !important; padding:8px 0 8px 10px !important; color:#fff !important; width:172px !important; margin:0 0 0 -2px !important;}'+
		'#leftCol A.item.clearfix {border:none !important;}'+
		'#leftCol DIV.navHeader a {color:#fff !important;}'+
		'A.item.clearfix.sortableItem {border:none !important;padding-top:3px !important; padding-bottom:3px !important;}'+
		'SPAN.count.uiSideNavCount {background:#fd9b00 !important; color:#fff !important;border-radius:15px}'+
		'.uiTextareaAutogrow.input.mentionsTextarea.textInput {padding:5px !important;min-height:30px !important; color:#0091d4 !important;}'+
		'.UIComposer_InputArea {-moz-border-radius:5px !important; -webkit-border-radius:5px !important; -moz-box-shadow:inset 3px 3px 4px #d1d1d1 !important; -webkit-box-shadow:inset 3px 3px 4px #d1d1d1 !important; background:#f7f7f7 !important;}'+
		'.UIComposer_InputShadow {border:none !important; background:none !important;}'+
// Using Base64 to for encoding	the FF logo image
		'DIV#pageHead.clearfix {background:#3b5998 url(data:image/png;base64,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) no-repeat 574px 7px !important;}'+
		'.Mentions_Input {background:none !important;}'+
		'.UIComposer_TextArea {background:none !important;}'
);