// Google Reader Fixes
// Author: Tam Nguyen (http://tambnguyen.com/)
// Last updated: 2012-08-09
//
// Check http://userscripts.org/scripts/show/116931 for any updates/discussions of the script.
//
// Script Update Checker: http://userscripts.org/scripts/show/20145
//
// ---------------------------------------------
//
// ==UserScript==
// @name			Google Reader Fixes
// @namespace		GRF
// @description		Fix Google Reader's recent layout changes. Widen navigation, Create more padding between feeds, Bring back title link and content link colors to be blue, Increase font size for unread count, Add borders for each box, Lessen white spaces on top and on bottom, Remove +1 link
// @version			3.2.5
// @include			http://www.google.*/reader/view/*
// @include			https://www.google.*/reader/view/*
// @homepage		http://userscripts.org/scripts/show/116931
// @updateURL		https://userscripts.org/scripts/source/116931.meta.js
// @icon			http://s3.amazonaws.com/uso_ss/icon/116931/large.png
// ==/UserScript==

function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

// ***********************************************************************************
// ** Begin Section Customization ****************************************************

// Get rid of white spaces under 'Feed settings...' menu, default enable
GM_addStyle(".goog-menuitem { border: none; padding: 2px 15px 2px 25px !important; }");

// Remove the giant red "G+ Share" button, default enable
GM_addStyle(".sharebox { background: none !important; padding-left: 0 !important; }");

// Selected item on navigation has blue background, default enable
blue = ".tree-link-selected .unread-count { color: white !important; } a.tree-link-selected .name { color: white !important; } .tree-link-selected { background-color: #627AAD !important; }";

// Bring the star to the left of the entry's title link, default enable
GM_addStyle(".entry-icons-placeholder, .entry .search-result .entry-icons, .entry entry-icons { position: absolute; top: 0 !important; left: 0 !important; float: left; margin: 0 6px 0 0 !important; } .entry .entry-icons, .search-result .entry-icons { width: 15px; margin-left: 0; } .entry-title-link { padding-left: 20px; } ");

// Show 'People you follow', default hide
//GM_addStyle("#lhn-friends { display: block !important; } #lhn-friends .name-text { padding-left: 20px !important; } .friend-tree-comments-icon  { display: none; } .lhn-section-footer { font-size: 1em; margin: 0 0 0 23px !important; border-bottom: none !important; } ");

// Show blue title and status holder, default hide
//GM_addStyle("#title-and-status-holder { background-color: #EBEFF9 !important; } #viewer-header-container, #viewer-header { background-color: #C2CFF1; } ");

// Hide '+1' button under each article, default hide
GM_addStyle(".item-plusone { display: none !important; }");

// Hide 'Explore' on navigation, default unhide
//GM_addStyle("#lhn-recommendations { display: none !important; }");

// ** End Section Customization ******************************************************
// ***********************************************************************************

GM_addStyle(" \
#viewer-top-controls-container { overflow: hidden !important; height: 30px; } \
#viewer-header-container { border: none; } \
#logo-section + #lhn-add-subscription-section { height: 35px !important; } \
#gbx3, #gbx4, #gbz, #gbg, .gbesi#gb #gbx3, .gbesi#gb #gbx4, .gbes#gbx3, .gbes#gbx4 { height: 24px !important; } \
.gbt { line-height: 23px !important; } \
#gbq1 .gbmai, #logo-section + #lhn-add-subscription-section #lhn-add-subscription, .gbes#gbmail, .gbesi#gb #gbmail { top: 15px; } \
#gbx1, #gbx2, .gbes#gb, .gbesi#gb, .gbes#gbx1, .gbes#gbx2, .gbesi#gb #gbx1, .gbesi#gb #gbx2, .gbes#gbx1, .gbes#gbx2, .gbesi#gb #gbx1, .gbesi#gb #gbx2 { height: 45px !important; top: 25px !important; } \
#gbq1.gbto #gbz, #gbq1.gbto #gbs, .gbesi #gbq1.gbto #gbz, .gbesi #gbq1.gbto #gbs, .gbes #gbq1.gbto #gbz, .gbes #gbq1.gbto #gbs { top: 45px !important; } \
#logo-section, #nav #logo-section { border: none; height: 25px !important; line-height: 25px !important; } \
#gbq2, #gbv, .gbes#gbv, .gbes#gbn, .gbes#gbq2, .gbes#gbq3, .gbesi#gb #gbv, .gbesi#gb #gbn, .gbesi#gb #gbq2, .gbesi#gb #gbq3, #gbu { padding-top: 7px !important; } \
#gb, .gbem#gb, .gbemi#gb, .gbes#gb, .gbesi#gb, #gb, .gbem#gb, .gbemi#gb { height: 75px !important; } \
#gbqlw { padding-top: 2px; height: auto !important; } \
#gbql { background: url(//ssl.gstatic.com/gb/images/j_f11bbae9.png) no-repeat !important; background-position: 0 -186px !important; height: 37px !important; width: 95px !important; } \
\
.email-entry-table .field-name { text-align: left !important; } \
.entry-body { max-width: 700px;} \
.cards .entry, .search-result { padding: 8px 0; margin: 0 !important; } \
.entry .entry-actions, .action-area { padding-left: 30px !important; } \
#entries.cards .card-content { padding: 10px 15px !important; } \
#entries.cards .entry { margin-bottom: 0 !important; } \
#viewer-header, #viewer-container { overflow: hidden !important; margin-bottom: 33px !important; } \
::-webkit-scrollbar-thumb { min-height: 70px !important; } \
.entry-title { max-width: 700px !important;  } \
.goog-flat-menu-button { height: 27px !important; } \
.entry-secondary-snippet { margin: 1em 0; } \
.entry-title-go-to { margin-left: 6px !important; } \
.search .search-result { padding: 10px; } \
.search-result .entry-main a.entry-original { float: left !important; } \
.jfk-button-primary, .jfk-button-action, .gbqfb { background: #3b5998; border-color: #3b5998; } \
#title-and-status-holder { background-color: #F1F1F1; z-index: 2; width: 100%; border-bottom: #aaa solid 2px; top: 122px; position: fixed; -moz-box-shadow: 2px 5px 6px -3px #aaa; box-shadow: 2px 5px 6px -3px #aaa; -webkit-box-shadow: 2px 5px 6px -3px #aaa; } \
#nav { width: 270px; } \
#entries { padding-right: 15px; border: none !important; } \
.samedir { background-color: white !important; margin-top: 5px; } \
.cards { border-top: none !important; } \
#chrome-title { padding-left: 5px; color: black; font-size: 20px; } \
#chrome-title a { color: #0000CC; font-size: 20px; } \
#current-entry .card, .card, .search .search-result { border: 2px solid #3b5998; } \
#current-entry .entry-title-link { color: #dd4b39 !important; } \
.read a.entry-title-link { color: #737AB0 !important; } \
a.entry-title-link { color: #0000CC !important; } \
.unread-count { font-size: 100%; font-weight: bold; color: black !important; } \
a.tree-link-selected .name { color: red !important; } \
.tree-link-selected { border-left: 3px solid red !important; background-color: #eee !important; }\
.entry-main { overflow: hidden !important; } \
::-webkit-scrollbar { width: 22px; } \
.lhn-section-primary { padding-bottom: 0 !important; line-height: 16px; } \
.folder .name-text, #reading-list-selector .label { max-width: 165px !important; } \
\
.folder .folder .name-text { max-width: 160px !important; } \
.folder .folder .name-text.folder-name-text { max-width: 170px !important; } \
.folder .folder > ul .icon { padding-right: 5px; width: 17px !important; } \
.folder .folder > a > .icon { margin-left: 16px !important; margin-top: 2px !important; } \
.folder .folder .folder-toggle { margin-left: auto !important; margin-top: 2px !important; } \
#sub-tree-header { font-size: 1.1em; } \
#recommendations-tree-container { padding-bottom: 5px; } \
#recommendations-tree .lhn-section-primary { height: auto !important; } \
#recommendations-tree .sub-name, #recommendations-tree .lhn-section-secondary .folder-name-text { padding: 0 !important; } \
.expanded .folder-icon { background-position: -47px -15px !important; width: 17px !important; height: 17px !important; } \
.collapsed .folder-icon { background-position: -47px 0 !important; width: 17px !important; height: 17px !important;  } \
.folder-icon { -moz-opacity: 1 !important; filter: alpha(opacity=50) !important; opacity: 1 !important; } \
.read .card, .read .search-result { border: #ccc solid 2px; background: transparent; } \
.card, .search-result { margin-left: 5px; padding-right: 8px; -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; -webkit-box-shadow: 3px 3px 3px #ccc; -moz-box-shadow: 3px 3px 3px #ccc; box-shadow: 3px 3px 3px #ccc; } \
#viewer-header, #lhn-add-subscription-section, #top-bar { height: 45px; overflow: hidden; } \
#reading-list-unread-count { margin-top: 1px; line-height: 15px; } \
.section-minimize { top: 0; } \
#scrollable-sections-holder { border-right: #EBEBEB solid 1px; } \
#search { padding: 10px 0; } \
.card-bottom { margin-left: -14px; margin-right: -9px; } \
.entry .star { height: 12px; margin-right: -3px; } \
");
if (blue !== "") {GM_addStyle(blue);}
// BEGIN Opera
if(navigator.userAgent.search(/opera/i)>-1){GM_addStyle(" #gbx3, #gbx4, #gbz, #gbg, .gbesi#gb #gbx3, .gbesi#gb #gbx4, .gbes#gbx3, .gbes#gbx4, #gb, .gbem#gb, .gbemi#gb, .gbes#gb, .gbesi#gb, #gb, .gbem#gb, .gbemi#gb { height: 28px !important; } ");}
// END Opera
var SUC_script_num = 116931;
try{function updateCheck(a){if(a||parseInt(GM_getValue("SUC_last_update","0"))+864e5<=(new Date).getTime()){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SUC_script_num+".meta.js?"+(new Date).getTime(),headers:{"Cache-Control":"no-cache"},onload:function(b){var c,d,e,f;e=b.responseText;GM_setValue("SUC_last_update",(new Date).getTime()+"");d=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(e)[1]);c=parseInt(GM_getValue("SUC_current_version","-1"));if(c!=-1){f=/@name\s*(.*?)\s*$/m.exec(e)[1];GM_setValue("SUC_target_script_name",f);if(d>c){if(confirm('There is an update available for the Greasemonkey script "'+f+'."\nWould you like to go to the install page now?')){GM_openInTab("http://userscripts.org/scripts/show/"+SUC_script_num);GM_setValue("SUC_current_version",d)}}else if(a){alert('No update is available for "'+f+'."')}}else{GM_setValue("SUC_current_version",d+"")}}})}catch(b){if(a){alert("An error occurred while checking for updates:\n"+b)}}}}GM_registerMenuCommand(GM_getValue("SUC_target_script_name","???")+" - Manual Update Check",function(){updateCheck(true)});updateCheck(false)}catch(err){}