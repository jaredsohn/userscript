// ==UserScript==
// @name BGer
// @description improve BGer display
// @include http://*.bger.ch*
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
// font
addGlobalStyle('body {font-size:17px;line-height:1.65em!important;font-family:sans-serif!important;color:#1F1F1F;background-color:#fff;}');
addGlobalStyle('* {font-family:sans-serif!important;}');
// table
addGlobalStyle('table, td, td a {border:none;font-size:16px!important;padding-right:8px;padding-left:8px}');
addGlobalStyle('ol li a {font-size:17px!important;}');
// divs
addGlobalStyle('.main {width:1200px;}');
addGlobalStyle('.middle {width:700px;}');
addGlobalStyle('.right {margin-left:90px;}');
addGlobalStyle('.content, .box_top_line, .box_bottom_line, .box_top_2ndline, .box_bottom_2ndline {border:none!important;}');
addGlobalStyle('#highlight_index, #highlight_references, #highlight_navigation, #searchtip {font-family:Segoe UI!important;font-size:12px;background-color:#fff; width:200px; line-height:18px;}');
addGlobalStyle('#regeste {background-color:#F2F2F2;padding:12px;}');
addGlobalStyle('#highlight_index, #copyright {display:none;}');
// styles
addGlobalStyle('.pagebreak {font-family:Segoe UI!important; font-size:14px;color:#474747;margin-top:16px; margin-bottom:2px;}');
addGlobalStyle('.artref, .bgeref_id {font-weight:normal;foont-style:italic;}');
addGlobalStyle('a {color:#2B4F81!important; text-decoration:none!important;}');
addGlobalStyle('.artref {color:#00611C!important; background-color:#F0FFF0;}');
addGlobalStyle('a.bgeref_id {color:#2B4F81!important; background-color:#F0F8FF;}');
addGlobalStyle('a:hover {color:#2B4F81!important; background-color:#C6E2FF;}');
addGlobalStyle('.noprint {display:none;}');
addGlobalStyle('.big, .small {font-family:Segoe UI!important;font-family:sans-serif; font-size:15px;}');
addGlobalStyle('li {background-color:#fff;padding:5px;}');
addGlobalStyle('.court {font-family:Segoe UI!important;font-size:13px;color:#454545}');
addGlobalStyle('.published_info {font-family:Seegoe UI!important;font-size:12px;color:#A9A9A9;float:right;margin-right:55px;font-weight:bold;}');
addGlobalStyle('.paraatf, {margin-top:3px;text-indent:50px;}'); addGlobalStyle('div.para {width:650px;margin-left:20px;}');
addGlobalStyle('.para {font-size:19px;padding-left:40px}');
addGlobalStyle('.paraatf {margin-top:12px!important;text-indent:20px}');
