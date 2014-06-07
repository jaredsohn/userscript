// ==UserScript==
// @name cracked.com sidebar
// @include http://cracked.com/*
// @include http://*.cracked.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle ("#trendingNow {display:none !important;}");
AddStyle ("#fb-friends-recent-activity {display:none !important;}");
AddStyle (".Module GenericModule {display:none !important;}");
AddStyle ("#follow_me {display:none !important;}");
AddStyle ("#cracked_partners {display:none !important;}");
AddStyle ("#Series {display:none !important;}");
AddStyle ("#Ad300 {display:none !important;}");
AddStyle (".AdUnit {display:none !important;}");
AddStyle ("#flashback_header {display:none !important;}");
AddStyle (".slide FLC {display:none !important;}");
AddStyle ("#NewsletterAndSearch{display:none !important;}");
AddStyle ("#Comments {display:none !important;}");
AddStyle ("#Footer {display:none !important;}");
AddStyle ("#PrimaryContent {width: 100% !important;}");
AddStyle ("#Module GenericModule {display:none !important;}");
AddStyle ("#SecondaryContent {float:none !important; display: inline !important}");
AddStyle ("#Account {display:none !important;}");
AddStyle ("#FooterLinks {display:none !important;}");
AddStyle ("#Articles {Width: 100% !important;}");
AddStyle ("#NewArticles {display:none; !important;}");
AddStyle ("#shadow-and-friends {display:none !important;}");
AddStyle (".list {width: 100% !important;}");
AddStyle ("#shadowLeft {display:none !important;}");
AddStyle ("#shadowRight {display:none !important;}");
AddStyle ("#shadowLeft {display:none !important;}");
AddStyle ("#Recommended {text-align:center !important; margin:0 auto !important;}");
AddStyle ("#Tombstone {display:none !important;}");
AddStyle ("#Columnists {width: 100% !important;}");
AddStyle (".GenericRRModule {clear: none !important;}");
AddStyle ("p {font-family: verdana !important;margin: 0 auto !important;width: 950px !important;font-size: 16px !important;}");
AddStyle (".subheading {font-family: verdana !important; text-align: center !important;}");

AddStyle ("#fb-fanbox{display: none !important;}");
AddStyle (".flashback{float: right !important;}");
