// ==UserScript==
// @name       Feedly: Compactor
// @namespace  http://feedly.compactor.versteeg.co.za/
// @version    0.2.06
// @description  Feedly Item View Compactor
// @match      https://www.feedly.com/home*
// @match      http://www.feedly.com/home*
// @copyright  2013+, Schalk Versteeg
// ==/UserScript==

function getElement(name){
	return document.getElementsByTagName(name)[0];
}

function nukeImportantOnElement(elementName,newStyle){
	var element = getElement(elementName); 
    element.style.cssText +=newStyle;
}

function addStyle(cssString) { 
    var head = getElement("head"); 
    //return unless head; 
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 
var htmlCss = '';
//htmlCss += "overflow: hidden !important;";
nukeImportantOnElement("html",htmlCss);


var css = '';

//css += "#feedlyCenter {overflow-y: scroll;margin-right: -30px;max-height: 100%;padding-right: 20px;overflow-x: auto;}";
//Global Font to Arial
//css += ".home, .home #feedlyTabs .label, .home h1, .home .inlineFrame .u100entry .title, .home .u0Entry .title, .entryBody h2, .entryBody h2 a  { font-family: arial,sans-serif !important; }";
css += "body { font-family: arial,sans-serif !important; }"
//css += "html,body { overflow-y: hidden !important; }"
//css += "html,body{right: -20px; padding-right: 40px;}";
css += "#feedlyPart0.area{max-height:100% !important;}";


//TabsHolder

css += "#feedlyTabsHolder {width: 34px !important;margin-top:35px !important;padding-top:5px !important;transition: width 0.4s !important;}";
//css += "#feedlyTabsHolder #feedlyTabs {opacity: 0!important;}";
css += "#feedlyFrame, #feedlyPage, #mainArea{width:100% !important; min-width:450px; margin-left: 0px !important; margin-right: 0px !important;}";
css += ".picturePicture #feedlyTabs div {margin-bottom: 0px !important;}";

//fulscreen Hover etc...
css+= "#mainBar {margin-left: 34px !important;}"
css+= "#feedlyTabsHolder {background-image: url(http://s3.feedly.com/production/14.0/images/icon-feedly.png );background-position: 4px 17px;background-repeat: no-repeat;background-size: 24px;opacity: 1;}";
css += "#feedlyTabsHolder:hover {width:280px !important; z-index:5; }";
css += "#feedlyTabsHolder:hover #feedlyTabs {opacity: 1!important;}";
css += "#feedlyTabsHolder:hover {opacity:1 !important;}";
css += "#feedlyTabsHolder:hover {background-color: #FFFFFF !important;}";
css += "#taglist div,.picturePicture #feedlyTabs div {margin-top: 0px !important;}";
css += "#feedlyTabs{padding-left: 34px !important;}";

//Search
css += "#storeHolder { margin-left:0px !important; margin-top : 2px !important;left:0px !important;}";
css += "#storeShowcase { display:none !important;}";
css += "#storeHolder.picturePicture { margin-left:34px !important;}";

//headerHeight
css += "#systemBar {display: none !important;}";
css += "#feedlyPageHeader {margin-top: 0px !important; margin-left: 28px !important;}";
css += "#floatingBar .pageactionbar{margin-right: 100px !important;}";
css += "#floatingBar h1 {line-height: 21px !important;font-size: 18px !important;}";
css += "#floatingBar {width:100% !important;}";
css += "#section0 div.label div { height: 5px !important;}";
css += ".pageActionBar{border-radius: 14px;}"

//dateHeaderHeight (added Indenting)
css += "h2 {margin-top: 7px !important; margin-bottom: 0px !important;}";

//listItemCompactor
css += ".u0Entry, .u0Entry .quicklistHandle {height: 20px !important;}";
css += ".u0Entry .condensedTools{margin-top: -4px !important;}"
css += ".u0Entry .quicklistHandle {width: 20px !important;margin-left: 0px !important;}";
css += ".u0Entry .sourceInfo {padding-top:2px !important;height: 20px !important;}";
css += ".u0Entry .condensedTools  {padding-top:0px !important;margin-top: -4px; !important;}";
css += ".u0Entry .lastModified {padding-top:0px !important;line-height: 20px !important;}";
css += ".u0Entry .likeInfo {margin-top: -8px !important;line-height: 20px  !important;}";
css += ".u0Entry .title,.u0Entry .sourcetitle a   {line-height: 20px !important;}";
css += ".u0Entry .sourcetitle a,.u0Entry .nbrrecommendations  {font-size: 10px !important;line-height: 20px !important;}";
css += '.u0Entry .sourcetitle a:before {content: "[";}';
css += '.u0Entry .sourcetitle a:after {content: "]";}';
css += "#feedlyPart0.area{padding-left: 0px !important;padding-bottom:0px !important; border: none !important;max-height:100% !important; min-height:100% !important;}";
css += "#feedlyPart{padding-left:0px !important; padding-right: 0px !important;}";
css += ".u0Entry {padding-left: 0px !important;margin-left: 0px !important;}";

//hide unWanted areas
css += "#aboutArea,.bigMarkAsReadButton{display :none !important;}";




//openItemCompactorinlineFrame 
css += ".frameActionsTop {height: 10px !important; !important;font-size: 5px !important; line-height: 10px ; margin-top: -15px !important;}";
css += ".inlineframe .u100Entry .title {margin-bottom:2px !important; font-weight: 700 !important;font-size: 18px !important; line-height: 22px !important; padding-right: 192px !important;}";
css += ".inlineFrame .entryBody img {float:none !important;}";
css += ".condensed .inlineFrame {padding: 10px !important; margin-left: 0px !important;}";
css += ".inlineFrame .u100Entry {min-height: 0px !important;}";
css += ".topWikiWidget {min-width: 192px; float:right !important; margin-top: -45px !important; border-bottom: 0px !important; padding-bottom: 0px !important;margin-bottom: 0px !important;}";
css += ".abZone {margin: 0px !important; padding: 0px !important;}";
css += ".viewerIcon { margin-left: 0px  !important;}";
css += ".entryBody { margin-top: 0px !important; margin-left: auto; margin-right: auto;}";
css += ".inlineFrame { min-height: 0px !important;}";
css += ".wikiWidgetAction { padding-left: 1px !important; padding-right: 1px !important;}";
css += ".wikiWidgetAction.wikiWidgetShare { padding-left: 0px !important; padding-right: 0px !important;}";

css += ".preferencesPanel { padding-left: 29px !important;}";

css += ".toBeTagged { padding-right: 4px !important;}";
css += ".inlineFrame .entryBody img {margin-left: auto !important;margin-right: auto !important;}";

addStyle(css);