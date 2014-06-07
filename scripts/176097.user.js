// ==UserScript==// @name     Workflowy Paper
// @description    improve Workflowy display 
// @include        https://workflowy.*
// @grant       none

// ==/UserScript==
function addGlobalStyle(css) {    var head, style; 
    head = document.getElementsByTagName('head')[0]; 
    if (!head) { return;  }
    style = document.createElement('style'); 
    style.type = 'text/css'; 
    style.innerHTML = css; 
    head.appendChild(style); }
    
  
// GENERAL SETTINGS

// colors and fonts
addGlobalStyle(' *{font-family: sans-serif !important; }'); 
addGlobalStyle('body {margin:0 !important; padding: 0 !important; font-size: 178x;  line-height: 1.20;background-color: #eee}'); 
addGlobalStyle('body, html, #visible, {color: #0A0A0A;  font-size:18px}'); 
addGlobalStyle('#pageContainer{margin: 0 !important; padding: 0 !important}'); 

//margins and padding
addGlobalStyle('.page {width:860px; max-width:860px; min-height:360px !important; padding:15px 45px 80px 50px; background-color: #fff}'); 
addGlobalStyle('.mainTreeRoot {min-height:360px !important;}'); 

// search highlight
addGlobalStyle('.content .contentMatch { background-color: #FBFFCF !important;  text-decoration:inherit; }'); 

// borders
addGlobalStyle('#visible, .page  {border:none}'); 

// selection
addGlobalStyle('body::selection {        background: #DFDFDF;  /* Safari */}'); 
addGlobalStyle('::-moz-selection {background: #DFDFDF;  /* Firefox */}'); 

// HEADER AND FOOTER

// move menu to the left
addGlobalStyle(' #header {opacity:1; padding:12px 0 0 10px; background-color:transparent; border:none; box-shadow:none; height:35px; float:left;  display:block; width:120px; min-width:120px; white-space:normal; height:300px; text-align:left}'); 

// search bar
addGlobalStyle(' #searchForm {color:#696969;  display:block;  margin-bottom:16px;  -moz-border-radius: 0px; margin-left:8px}'); 
addGlobalStyle(' #searchBox {font-family: color:#696969;  border:none; background-color:transparent !important; padding:5px 20px; font-size:20px; width:170px; display:block;  -webkit-border-radius: 0px;  -khtml-border-radius: 0px;  border-radius: 0px;}'); 
addGlobalStyle(' #searchBox  {background-image: url("http://static.tumblr.com/thpaaos/3JQklzbvh/search.png"); background-repeat:no-repeat; background-position: 0% 50%}'); 
addGlobalStyle(' #searchPrompt {display:none}'); 

//buttons
addGlobalStyle('.saveButton, .showCompletedButton, #buttonBar {color:#707070; background-color:transparent;  border:none!important;  float:left!important; font-size:12px!important;  width:auto; margin-left:5px; height:18px; padding:2px 2px 0px 2px}'); 
addGlobalStyle('.saveButton, .showCompletedButton {color:#707070; text-align:left; font-size:12px!important}'); 
addGlobalStyle('.showCompletedButton:hover {background-color:transparent}'); 
addGlobalStyle(' #buttonBar {display:none}'); 
addGlobalStyle('#buttonBar .open, #buttonBar:hover {border:none; font-size:12px!important}'); 
addGlobalStyle('.menu-button {background-color:transparent }'); 
addGlobalStyle(' #savedViewHUDButton {margin-left:6px; margin-top:12px; border-radius:0px; background-size:17px 17px;}'); 

//settings panel
addGlobalStyle('.menu-options {position:relative}'); 

//Controls
addGlobalStyle(' div.addButton, div.redo-button, div.undo-button {display:none}'); 
addGlobalStyle(' #controls #expandButton { text-align:right; left:25px; }'); 
addGlobalStyle(' #controlsLeft #moreControls a.export, #controlsLeft #moreControls a.delete {display:block}'); 

//logo & site messages
addGlobalStyle(' #message, #dropdownMessages { display:none}'); 
//addGlobalStyle(' #message { background-color: #ECF1F5 !important; border:none;  margin-left:30px; color:#B7B7B7;font-size:10px}'); 
addGlobalStyle(' #logo, .pro_member #logo {background-position:0 12px; height:30px; display:none}'); 
addGlobalStyle(' #site_message {z-index:99; position: 0px 30px}'); 

//highlight
addGlobalStyle('.moving > .highlight, .highlighted > .highlight {background:#F8F8F0; opacity:0.2; border-radius:0px}')

//footer
addGlobalStyle('#footer {border:none}')

// controls left (hovering over bullet)
addGlobalStyle(' #controlsLeft {background: #545454;  opacity:0.7;  border-radius:0px; border-color: #545454; display:none; }')
addGlobalStyle(' #controlsLeft a {border:none;  color:#fff}')
addGlobalStyle(' #controlsLeft > .handle {display:none; background: #545454;  border-radius:0px; border-color: #545454;  }')
addGlobalStyle(' #controlsLeft hr{display:none}'); 
addGlobalStyle(' #controlsLeft #moreControls a.export,#controlsLeft #moreControls a.duplicate,#controlsLeft #moreControls a.delete {   display:block!important}')
addGlobalStyle('  #controlsLeft .more {display:none !important}'); 

// HIDE CLUTTER

addGlobalStyle('.siteSlogan, .footer, #helpButton, #bottomLinks, #searchCancel {display:none !important}'); 

// CONTENTS

// Page Star
addGlobalStyle(' .pageStar.starred, .pageStar { background-size:14px 14px;)}'); 
addGlobalStyle(' #savedViewHUD {background-color: #8C8C8C; opacity:1 !important}'); 
addGlobalStyle(' .savedViewPage.selectedSavedViewPage {box-shadow:none; border-color: #dedede; background-color: #FFFFD2}'); 
addGlobalStyle('.savedViewPage {box-shadow:none; border-color:#dedede; background-color: #fff; -webkit-border-radius: 0px; -moz-border-radius: 0px; border-radius: 0px;}'); 
addGlobalStyle('.savedViewPageFader {display:none}'); 

// Title
addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea, .selectedEditor > textarea {line-height: 32px;font-size:25px !important}'); 
addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea  {padding-top:12px; padding-bottom:12px}'); 

// Parent Nav
addGlobalStyle('.parent { line-height:19px !important}'); 
addGlobalStyle('.parent > .name > .content { color:#7A7A7A;  font-size:14px; line-height:19px !important; padding:0; margin:0; display:inline-block}'); 
addGlobalStyle(' .selected {border:none !important}'); 
addGlobalStyle('.parent > .name {margin:0; padding:0}'); 
addGlobalStyle('.parentArrow:before {content:"|"; padding:0}'); 
addGlobalStyle('.parentArrow {font-weight:bold !important; line-height: 19px; padding:0; font-size:10px}'); 

// all children
addGlobalStyle('.children > .project {font-size:18px !important; margin-top:0px !important}'); 
addGlobalStyle('.selected .project > .name > .content, .nameEditor > textarea {line-height:18px; font-size:18px !important}'); 
addGlobalStyle(' .selected > .children > .project .project {margin-left:18px}'); 
addGlobalStyle(' .children {border-left:none}'); 

// 1st child 
addGlobalStyle('.selected > .children >  .project, .selected > .children > .project .editor textarea {margin-top:2px; line-height:18px; color: #1C1C1C}'); 

// 2nd child 
addGlobalStyle('.selected > .children >  .project > .children >  .project {font-weight:normal !important; margin-top:0px;  margin-left:20px;  line-height:18px; color: #1C1C1C}'); 

// subsequent children 
addGlobalStyle('.selected > .children >  .project > .children >  .project > .children .project {margin-top:0px; margin-left:20px;  line-height:18px; color; #1C1C1C}'); 
addGlobalStyle('.selected > .children > .project > .children > .project, .twoLevelsDownEditor.nameEditor {line-height:23px;  font-size:18px; color: #1C1C1C}'); 

// Notes
addGlobalStyle('.noted > .notes > .content {top:0 !important; color: #7D7D7D;  margin:2px 0 0 25px;  padding-left:0px;  font-size:15px;  white-space:pre-wrap; height:21px; min-height:21px; overflow:hidden; line-height:18px; '); 
addGlobalStyle('.noteEditor > textarea, .selectedEditor.noteEditor > textarea  {top:0 !important; color: #7D7D7D;  font-size:15px!important;  line-height:18px!important;  } '); 
addGlobalStyle('.noted > .notes > .content.editing, .selected .notes, .page.searching .notes.matches > .content {top:0 !important;padding-left:0;  font-size:15px;  white-space:pre-wrap; height:auto; overflow:visible; } '); 
addGlobalStyle('.open > .notes{max-height:none} '); 
addGlobalStyle('.noted > .notes {color: #7D7D7D !important;  display:block;  margin:2px 0 0 0px; } '); 
//addGlobalStyle('.selected > .notes {padding-top:4px;  } '); 
addGlobalStyle('.selected > .notes > .content, .selected > .notes > .content.editing {height:auto !important;  border:none!important} '); 

// show full notes content
addGlobalStyle('DIV.notes DIV.content {height: auto !important;  overflow: visible !important} '); 

// background of selected projects when hovered over bullet or move handle
addGlobalStyle(' .moving > .highlight, .highlighted.moveHovered > .highlight,   .moving > .highlight, .highlighted > .highlight {background: #C1C1C1}'); 

// BULLETS

// bullet color
addGlobalStyle('.bullet {font-family: sans-serif !important; font-size:22px; color:#696969; line-height:16px; text-indent:4px !important} '); 

// hover color
addGlobalStyle('.bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover, .project.addedShared > .name > .bullet:hover {background-color: #AFAFAF; }'); 

// shared bullet halo color
addGlobalStyle('.project.shared > .name > .bullet {background-color: #C3DEF8; }'); 
addGlobalStyle('.project.shared > .name > .bullet:hover {background-color: #A4BAD1; }'); 

// bullet w/ children halo color
addGlobalStyle('.bullet {background-color:#efefef; } '); 

// Tags
addGlobalStyle(' .content .contentTag {color: #B34242 !important}'); 
addGlobalStyle(' .content .contentTag:hover {color:#B34242 !important }'); 
addGlobalStyle('.contentTag, .content .contentTagText  {font-style:normal;  color: #B34242; padding-top:0;  text-decoration:none }'); 
addGlobalStyle('.contentTag:hover, .contentTagText:hover { text-decoration:none!important }'); 
addGlobalStyle('.content.editing .contentTag {visibility: hidden}'); 

// Links
addGlobalStyle('.content .contentLink, .nameAnimated .contentLink {text-decoration:none!important; color: #4F7DAB; padding-top:0;  }'); 
addGlobalStyle('.content .contentLink:hover, .nameAnimated .contentLink:hover { text-decoration:underline !important}'); 
