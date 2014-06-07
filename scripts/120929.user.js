// ==UserScript==
// @name GOD DAMN FACEBOOK INTEGRATION
// @include http://*
// @include http://*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
//GOD DAMN FACEBOOK INTEGRATION
AddStyle ("#fb_sliver {display:none !important;}");
AddStyle ("#opted_out {display:none !important;}");
//wibiya SHITBAR
AddStyle ("#wibiyaToolbar {display:none !important;}");
AddStyle ("#wibiya_toolbar_wrapper {display:none !important;}");
AddStyle ("#wibiya_toolbar_holder {display:none !important;}");
AddStyle ("#wibiya_toolbar_side_Left {display:none !important;}");
AddStyle ("#wibiya_toolbar_holder_middle {display:none !important;}");
AddStyle ("#wibiya_toolbar_holder_middle_bg {display:none !important;}");
//meebo's stupid ass toolbar
AddStyle ("#bar {display:none !important;}");
AddStyle ("#meebo-iframe {display:none !important;}");
AddStyle ("#meebo {display:none !important;}");
AddStyle ("#meebo-0 {display:none !important;}");
AddStyle (".meebo-0{display:none !important;}");
AddStyle (".meebo-shareButton{display:none !important;}");
AddStyle (".meebo-iconButton{display:none !important;}");
AddStyle ("#meebo-canvas-6 {display:none !important;}");
//google search instant preview bullshit
AddStyle ("#vspd {display:none !important;}");
AddStyle ("#botstuff {display:none !important;}");
AddStyle (".g w0 {display:none !important;}");
AddStyle (".vsc vso {display:none !important;}");
//+1 button
AddStyle (".esw eswd {display:none !important;}");
AddStyle (".eswd {display:none !important;}");
AddStyle (".a-dc-D3 {display:none !important;}");
//MSNBC toolbar
AddStyle ("#tbc{display:none !important;}");
//Wikipedia rating
AddStyle ("#mw-articlefeedback {display:none !important;}");
//youtube WE FOUND SOME BULLSHIT YOU FUCKING HATE
//AddStyle (".yt-alert{display:none !important;}");
//AddStyle (".yt-alert-promo{display:none !important;}");
//AddStyle (".yt-alert-content{display:none !important;}");
//AddStyle (".yt-rounded{display:none !important;}");
//Generic twitshit fucknuts
AddStyle ("#tweet-button {display:none !important;}");
//Google Minus
AddStyle ("#plusone {display:none !important;}");
AddStyle (".gbil esw eswd {display:none !important;}");