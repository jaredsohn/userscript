// ==UserScript==
// @name Google
// @description improve Google display
// @include http://*.google.*
// @include https://*.google.*
// ==/UserScript==
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
// Styles
addGlobalStyle('* {font-family: sans-serif!important}');
addGlobalStyle('.s{color:#3D3D3D}');
addGlobalStyle('a, a:visited, #gsr a:active, a.fl:active, .fl a:active, .gl a:active {text-decoration:none;color:#2150A6!important}');
addGlobalStyle('a:hover{color:#26466D;background-color:#C6E2FF;}');
addGlobalStyle('a:hover{text-decoration:none!important;color:#26466D;background-color:#C6E2FF;}');
addGlobalStyle('.a, cite, cite a:link, cite a:visited, .cite, .cite:link, #mbEnd cite b, #tads cite b, #tadsb cite b, #tadsto cite b, #ans > i, .bc a:link {font-size:0.8em;margin:8px 0 8px 0}');
addGlobalStyle('h3.r {margin-top:28px!important;font-size:1.2em!important;line-height:1.5em!important');
//addGlobalStyle('#botstuff {font-size:11px!important;padding:10px 0 3px 30px!important;background-color:#ededed!important;');
//addGlobalStyle('.med {font-size:13px!important;color:#454545!important');
//addGlobalStyle('.brs_col{font-size:13px!important;font-weight:normal!important');
addGlobalStyle('#botstuff {display:none;');
// Google Custom Search
addGlobalStyle('div.gsc-wrapper {margin-top:50px!important;');
addGlobalStyle('  .gs-title {font-size:1.2em!important;line-height:1.8em!important; height:1.8em!important; text-decoration:none!important; margin-bottom:0.6em!important');
addGlobalStyle('div.gs-webResult gs-result {width:50em!important;');
addGlobalStyle('.gs-snippet {font-size:1.1em!important;margin-bottom:8px!important');
//addGlobalStyle('.gs-fileFormat{display:none!important;');
// structure
addGlobalStyle('#cnt #center_col, #cnt #foot, #cnt .ab_center_col{width:700px!important;}');
// hide ads and results prview in Google
addGlobalStyle('#taw, #nycp, #nyccur, #nyc, div.vspib, #bottomads, div.so, div.gsc-adBlock, div#adBlock {display:none;}');
addGlobalStyle('#mbEnd {display:none;}');
addGlobalStyle('#fll, #bfl{display:none;}');
addGlobalStyle('#navcnt{margin-bottom:5em!important;}');
addGlobalStyle('.adC {display:none;}');
 
addGlobalStyle('a.fi {font-weight:bold!important;}');
addGlobalStyle('#center_col, #foot{margin-left:250px!important;}');
 
// hide parts of search result
addGlobalStyle('#gbpwm_2 {display:none;}');
addGlobalStyle('.csb, .ss, .play_icon, .mini_play_icon, .micon, .licon, .close_btn, #tbp, .mbi, .inline_close_btn {background-image:url(http://www.oratorienchorsg.ch/images/spacer_white.gif)!important;}');
// Evernote results
addGlobalStyle('#evernoteResultStatsMessage{background-color:#F5F5F5!important;background-image:none!important;padding-left:15px!important}');
//addGlobalStyle('evernoteResultStatsMessage, .evernoteResultStatsLargeText, .evernoteResultStatsLargeText a, .evernoteResultStatsCount a,.evernoteResultStatsCount{color:#2150A6!important;}');
// Gmail colors
addGlobalStyle('.TO .n0, .TO, .n0, a.k1, a.k1:link, a.k1:visited, a.k1:active, .mitem a, #lc a, #lr_lang_1de a, #qdr_h a, .tbt a, .tbpd a, #ms a, a#tbpi {color:#222222!important;}');
