// ==UserScript==
// @name       Feedly: Darker Theme
// @namespace  http://feedly.darker.versteeg.co.za/
// @version    0.1.10
// @description  A theme darker than the dark theme, the item list is also darkend as is the tabs holder
// @match      https://www.feedly.com/home*
// @match      http://www.feedly.com/home*
// @copyright  2013+, Schalk Versteeg
// ==/UserScript==


function addStyle(cssString) { 
    var head = document.getElementsByTagName('head')[0]; 
    //return unless head; 
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 

var css = '';

//Global Font to Arial
//css += ".home, .home #feedlyTabs .label, .home h1, .home .inlineFrame .u100entry .title, .home .u0Entry .title, .entryBody h2, .entryBody h2 a  { font-family: arial,sans-serif !important; }";
css += "body { font-family: arial,sans-serif !important; }"


//Feedly Darker Theme
css += "#feedlyTabsHolder .nonEmpty {font-weight: bold; }";
css += ".pageActionBar,.u0Entry .condensedTools,.u0entry .quicklisthandle{background-color:#505050 !important;}";
css += "#feedlyTabsHolder .nonEmpty ,#who, #who .actions {color: rgba( 255, 255, 255, 0.65 ) !important;}";
css += ".entryHeader { border-bottom: 1px solid #ECECEA !important;}";
css += "#feedlyPart0.area{background-color:#000 !important; color:#aaa !important;}";
css += ".u0Entry .title,.u0Entry .sourcetitle a  {color:#aaa !important;}";
css += ".u0Entry:nth-child(2n){background-color:#111 !important;}";
css += ".u0Entry:hover {background-color: #222 !important;}";
css += "#feedlyTabsHolder:hover {background-color: #0D0D0D !important;color:#707070 !important;}";
css += ".tab:hover {background-color: #000 !important;}";
css += ".feedIndex.target:hover {color: #A0A0A0;font-weight: bold;}";
css += ".u0Entry {border-color: #444 !important;border-left:none !important;border-right: none !important;}";
css += "#feedlyTitleBar,#floatingBar h1 {color: #AAA !important;}";
css += "#floatingBar {background-color: #333 !important;}";
css += "#floatingBar h1 {border-bottom:none !important;}";
css += "*.action {color: #82BD1A !important;}";
css += "#feedlytabs:hover::scrollbar-thumb {background-color: rgba( 255,255,255, 0.15) !important;}";
css += "BODY.home {background: rgba(0, 0, 0, 0.95) !important;}";
css += ".u0Entry .title.read {color: rgba(255, 255, 255, 0.36) !important;}";
css += "#feedlyTabsHolder {opacity:1 !important;}";



css += ".u0Entry .condensedTools {background-color: #505050;}";


css += ".content,.inlineframe .u100Entry .title {font-family:opendyslexic,arial,sans-serif !important; color:#1f0909 !important;}";
css += ".tagged .tagLabel {color: rgba(0,0,0,0.36) !important;font-weight: bolder;}";
css += ".tagLabel:hover {color: rgba(0,0,0,1) !important;}";
//css += ".inlineFrame,.content,.entryHeader, .wikiWidget{ background-color:#f3f2ee!important;}";
css += ".inlineFrame,.content,.entryHeader,.entryHolder,.gplus, .wikiWidget,.inlineFrame .selectedEntry,.toBeTagged,.viewerIcon{ background-color:#f3f2ee!important;}";
css += ".toBeTaggged{font-weight: 900;}";

addStyle(css);