// Facebook Advertisment Killer
// Because we all hate adverts

// Written by Michael Ott (AKA That Web Guy)

// -----------------------------------------------------------

// There's nothing too fancy going on here. Just injecting some CSS
// to hide the divisions that contain the adverts, and a few CSS
// enhancements. The Facebook developers were kind enough to limit
// all advertsing to just a few ID's and classes, so hiding the ads
// was a no-brainer.

// ==UserScript==
// @name           Özel Facebook
// @author         http://msnkopatforum.tk
// @version        1.0 (beta)
// @namespace      http://localhost
// @description    Reklam Kaldırıcı ve efekt verici 
// @include        *facebook.com/*
// ==/UserScript==
// That Web Guy	   http://thatwebguyblog.com


function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Throwing in a div with text just to remind users they are using this script
var logo = document.createElement("div");
logo.innerHTML = '<div class="notice">.</div>';
document.body.insertBefore(logo, document.body.firstChild);

// Hiding the adverts
addCSS(	'body {margin-top:-13px !important;}'+
		'#pagelet_adbox {display:none !important;}'+
		'#sidebar_ads {visibility:hidden !important;}'+
		'.ego_column {visibility:hidden !important;}'+
		// OK so I would have prefered to just use display:none on the last 2 divs, but doing so thew the rest of the design into disarray.
		
		
// Making things pretty, and slightly more usable (debatable)
		'img {border:solid 2px #fff !important; -moz-border-radius:6px !important; -webkit-border-radius:6px !important; -moz-box-shadow: 2px 2px 7px #ccc !important; -webkit-box-shadow: 2px 2px 7px #ccc !important;}'+
		'.UIMediaItem_Wrapper {border:none !important; padding:10px !important;}'+
		'.UIMediaItem_Wrapper img {-moz-box-shadow:3px 3px 7px #ccc !important; -webkit-box-shadow:3px 3px 7px #ccc !important;}'+
		'.uiPhotoThumb {border:none !important; padding:10px !important;}'+
		'.UIStoryAttachment_BlockQuote {border-left:solid 2px #ffcc33 !important; position:relative !important; left:15px !important;}'+
		'.UIIntentionalStory {padding:13px 0 10px 65px !important; margin-bottom:0 !important;}'+
		'.UIIntentionalStory:hover, .UIRecentActivity_Stream:hover {background:#f3f3f3 !important; -moz-border-radius:8px !important; -webkit-border-radius:8px !important}'+
		'.UIIntentionalStory:hover .uiUfi {background:#fff !important;}'+
		'.UIIntentionalStory:hover .ufiItem {background:#fff !important;}'+
		'.pvm:hover {background:#f3f3f3 !important; -moz-border-radius:8px !important; -webkit-border-radius:8px !important}'+
		'.pvm:hover .uiUfi {background:#fff !important;}'+
		'.pvm:hover .ufiItem {background:#fff !important;}'+
		'.textBox {-moz-border-radius:5px !important; -webkit-border-radius:5px !important; -moz-box-shadow:inset 3px 3px 4px #dcdcdc !important; -webkit-box-shadow:inset 3px 3px 4px #dcdcdc !important;}'+
		'.UIComposer_InputArea {-moz-border-radius:5px !important; -webkit-border-radius:5px !important; -moz-box-shadow:inset 3px 3px 4px #d1d1d1 !important; -webkit-box-shadow:inset 3px 3px 4px #d1d1d1 !important; background:#f7f7f7 !important;}'+
		'.UIComposer_InputShadow {border:none !important; background:none !important;}'+
		'.Mentions_Input {background:none !important;}'+
		'.UIComposer_TextArea {background:none !important;}'+

// Styling for the div that contains the 'Özel Facebook 1.0 (beta)' notice
		'.notice {z-index:99999 !important; color:#fff !important; margin:0 auto !important; width:140px !important; position:relative !important; top:33px !important; left:100px !important; margin:0 auto !important; font-size:11px !important;}'
);