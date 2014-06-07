// ==UserScript==// @name     Workflowy Dark
// @description    improve Workflowy display 
// @include        https://workflowy.*
// @grant       none

// ==/UserScript==
function addGlobalStyle(css) {    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}




////////////////////////////////
// general settings
////////////////////////////////

// colors and fonts

addGlobalStyle(' *{font-family: sans-serif!important}');
addGlobalStyle('body, html, #visible, .page {color:#BEBEBE;background-color:#3C3C3C;font-size:16px}');

addGlobalStyle('body::selection {background:#121212}');
addGlobalStyle('::-moz-selection {background:#121212}');

//margins and padding

addGlobalStyle('.page {width:900px;max-width:900px;margin-left:300px!important}');

// search highlight

addGlobalStyle('.content .contentMatch { background-color: #979797 !important; text-decoration:inherit;}');


// borders

addGlobalStyle('#visible, .page  {border:none}');

////////////////////////////////
// header and footer
////////////////////////////////

// move menu to the left

addGlobalStyle(' #header {padding:12px 20px;background-color:transparent;border:none;box-shadow:none;height:35px;float:left; display:block;width:150px;min-width:100px;white-space:normal;height:300px;text-align:left}');

// search bar

addGlobalStyle(' #searchForm {top:9px;color:#A9A9A9;display:block;margin-bottom:40px}');
addGlobalStyle(' #searchBox {color:#C0C0C0;border:none;background-color:#656565;padding:5px 7px;font-size:15px;width:170px;display:block}');
addGlobalStyle(' #searchPrompt {display:none}');

//buttons

addGlobalStyle('.saveButton, .showCompletedButton, #buttonBar {font-family: sans-serif; background-color:transparent;border-bottom:none!important;border-left:none!important;border-right:none!important;float:left!important;font-size:14px!important; width:auto;margin-left:5px;height:16px;padding:2px 2px 0px 2px}');
addGlobalStyle('.saveButton, .showCompletedButton {margin-bottom:20px;text-align:left;font-size:12px!important;opacity:0.9}');
addGlobalStyle('  #buttonBar {display:none}');
addGlobalStyle('#buttonBar .open, #buttonBar:hover {border:none;font-size:14px!important}');
addGlobalStyle('.menu-button {background-color:#fafafa}');

//settings panel

addGlobalStyle('.menu-options {position:relative}');

//Controls

addGlobalStyle(' div.addButton, div.redo-button, div.undo-button {display:none}');
addGlobalStyle(' #controls #expandButton {text-align:right;left:25px;}');
addGlobalStyle('    #controlsLeft #moreControls a.export, #controlsLeft #moreControls a.delete {display:block}');

//logo & site messages

addGlobalStyle(' #logo, .pro_member #logo {background-position:0 12px;height:30px}');
addGlobalStyle(' #site_message {z-index:99;position: 0px 30px}');

//highlight

addGlobalStyle('.moving > .highlight, .highlighted > .highlight {background:#F0F4F8;opacity:0.5}')

//footer

addGlobalStyle('#footer {border:none}')

// controls left (hovering over bullet)

addGlobalStyle(' #controlsLeft {background: #616161; opacity:0.7; border:1px solid #6E6E6E; border-top-left-radius:4px;-moz-border-radius-topleft:4px;border-bottom-left-radius:4px;	-moz-border-radius-bottomleft:4px;border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px; display:none;}')
addGlobalStyle(' #controlsLeft a {border:none; color:#b7b7b7}')
addGlobalStyle(' #controlsLeft > .handle {background: #616161; border:none;-moz-border-radius-bottomright:4px;	border-top-right-radius:4px; -moz-border-radius-topright:4px; }')
addGlobalStyle(' #controlsLeft hr{opacity:0.2 !important}');
addGlobalStyle(' #controlsLeft #moreControls a.export,#controlsLeft #moreControls a.duplicate,#controlsLeft #moreControls a.delete {   display:block!important}')
addGlobalStyle('  #controlsLeft .more {display:none !important}');


////////////////////////////////
// hide stuff
////////////////////////////////

addGlobalStyle('.siteSlogan, a.bottomLink, .footer {display:none}');

////////////////////////////////
// contents
////////////////////////////////

// margins

addGlobalStyle(' .selected > .children > .project .project {margin-left:20px}');
//addGlobalStyle(' .selected > .children > .project {margin-top:8px}');
//addGlobalStyle(' .children .project {margin-top:1px}');
addGlobalStyle(' .children {border-left:1px dotted #535353}');

// Title

addGlobalStyle('.selected > .name > .content {margin-top:15px}');
//addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea{line-height: 30px;padding-top:12px;font-size:22px}');

// Parent Nav

addGlobalStyle('.parent > .name > .content {font-size:13px;line-height:20px;padding-top:0;}');
addGlobalStyle(' .selected {border:none !important}');
addGlobalStyle('.parent > .name {margin:0}');
addGlobalStyle('.parentArrow:before {content:">";font-size:12px}');

// all children

addGlobalStyle('.children > .project {margin-top:3px}');
//addGlobalStyle('.selected .project > .name > .content, .nameEditor > textarea {line-height: 26px;text-decoration:underline!important}');

// 1st child 

addGlobalStyle('.selected > .children >  .project {margin-top:12px;}');

// 2nd child 

addGlobalStyle('.selected > .children >  .project > .children >  .project {margin-top:8px;margin-left:40px}');

// subsequent children 

addGlobalStyle('.selected > .children >  .project > .children >  .project > .children .project {margin-top:3px;margin-left:40px}');
addGlobalStyle('.selected > .children > .project > .children > .project, .twoLevelsDownEditor.nameEditor{font-size: 14px;line-height:20px}');

// Notes

addGlobalStyle('.noted > .notes > .content {margin:9px 0 0 20px;padding-left:12px;border-left:4px solid #505050;font-size:14px;white-space:pre-wrap;height:23px;min-height:23px;overflow:hidden;line-height:20px;color: #888888');
addGlobalStyle('.noteEditor > textarea, .selectedEditor.noteEditor > textarea  {padding-left:16px!important;font-size:14px!important;line-height:20px!important;color: #888888; } ');
addGlobalStyle('.notes {display:none;position:relative;{padding-left:12px } ');
addGlobalStyle('.noted > .notes > .content.editing, .selected .notes, .page.searching .notes.matches > .content{padding-left:12px;font-size:14px;line-height:20px;height:auto;overflow:visible;} ');
addGlobalStyle('.open > .notes{max-height:none} ');
addGlobalStyle('.noted > .notes{color::#848484 !important;display:block; margin:0px 0px 0px 25px;} ');
addGlobalStyle('.selected > .notes {margin:5px 0 10px 0;padding-top:4px; } ');
addGlobalStyle('.selected > .notes > .content, .selected > .notes > .content.editing{height:auto !important; border:none!important;padding-left:12px ! important} ');

//always show full notes content
addGlobalStyle('DIV.notes DIV.content {height: auto !important; overflow: visible !important} ');

// background of selected projects when hovered over bullet or move handle

addGlobalStyle(' .moving > .highlight, .highlighted.moveHovered > .highlight,   .moving > .highlight, .highlighted > .highlight {background: #575757}');

////////////////////////////////
// bullets
////////////////////////////////

// bullet color
addGlobalStyle('.bullet {color:#A7A7A7;font-size:18px!important;line-height:12px;height:15px;width:15px;text-indent:4px !important} ');

// hover color
addGlobalStyle('.bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover, .project.addedShared > .name > .bullet:hover {background-color: #7C7C7C;}');

// shared bullet halo color
addGlobalStyle('.project.shared > .name > .bullet {background-color: #4E4467;}');

// bullet w/ children halo color
addGlobalStyle('.bullet {background-color:#505050;} ');

// Tags

addGlobalStyle('.contentTag {font-weight:normal;color:#CA7373!important; font-size:13px !important; padding: 1px 5px 1px 3px!important; white-space: nowrap !important;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px !important; }');
addGlobalStyle('.content.editing .contentTag {visibility: hidden}');
addGlobalStyle('.content .contentTagText {text-decoration: none !important;border-bottom:1px dotted #CA7373}');

// Links

addGlobalStyle('.content .contentLink, .nameAnimated .contentLink {text-decoration:none!important;color:#6490B0;font-size:12px !important');
addGlobalStyle('.content .contentLink:hover, .nameAnimated .contentLink:hover {background-color:#41505F;color:#74A1C2');