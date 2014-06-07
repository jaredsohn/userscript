// ==UserScript==// @name     Workflowy Serif Light
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


////////////////////////////////
// general settings
////////////////////////////////

// colors and fonts

addGlobalStyle(' *{font-family: "Cambria", serif !important; }'); 
addGlobalStyle('body {margin-bottom:280px}'); 
addGlobalStyle('body, html, #visible, .page {color:#4A4B4B;  background-color: #FBFBFB; font-size:17px }'); 

//margins and padding

addGlobalStyle('.page {width:960px; max-width:960px}'); 

// search highlight

addGlobalStyle('.content .contentMatch { background-color: #FDFEAE !important;  text-decoration:inherit; }'); 

// borders

addGlobalStyle('#visible, .page  {border:none}'); 

// selection
addGlobalStyle('body::selection {        background: #DFDFDF;  /* Safari */}'); 
addGlobalStyle('::-moz-selection {background: #DFDFDF;  /* Firefox */}'); 

////////////////////////////////
// header and footer
////////////////////////////////

// move menu to the left

addGlobalStyle(' #header {opacity:0.8; padding:12px 20px; background-color:transparent; border:none; box-shadow:none; height:35px; float:left;  display:block; width:150px; min-width:100px; white-space:normal; height:300px; text-align:left}'); 

// search bar

addGlobalStyle(' #searchForm {top:20px;  color:#696969;  display:block;  margin-bottom:40px;  -moz-border-radius: 0px; }'); 
addGlobalStyle(' #searchBox {font-family: color:#696969;  border:none; background-color:#E1E1E1; padding:5px 7px; font-size:15px; width:170px; display:block;  -webkit-border-radius: 0px;  -khtml-border-radius: 0px;  border-radius: 0px}'); 
addGlobalStyle(' #searchPrompt {display:none}'); 

//buttons

addGlobalStyle('.saveButton, .showCompletedButton, #buttonBar {color:#A79F89;  background-color:transparent;  border:none!important;  float:left!important; font-size:13px!important;  width:auto; margin-left:5px; height:17px; padding:2px 2px 0px 2px}'); 
addGlobalStyle('.saveButton, .showCompletedButton {color:#A79F89; margin-bottom:20px; text-align:left; font-size:13px!important; opacity:0.9; }'); 
addGlobalStyle('.showCompletedButton:hover {background-color:transparent}'); 
addGlobalStyle('  #buttonBar {display:none}'); 
addGlobalStyle('#buttonBar .open, #buttonBar:hover {border:none; font-size:13px!important}'); 
addGlobalStyle('.menu-button {background-color:transparent }'); 

//settings panel

addGlobalStyle('.menu-options {position:relative}'); 

//Controls

addGlobalStyle(' div.addButton, div.redo-button, div.undo-button {display:none}'); 
addGlobalStyle(' #controls #expandButton { text-align:right; left:25px; }'); 
addGlobalStyle('    #controlsLeft #moreControls a.export, #controlsLeft #moreControls a.delete {display:block}'); 

//logo & site messages

addGlobalStyle(' #message {background-color:#4d4d4d;  border:none;  margin-left:30px; color:#B7B7B7}'); 
addGlobalStyle(' #logo, .pro_member #logo {background-position:0 12px; height:30px; display:none}'); 
addGlobalStyle(' #site_message {z-index:99; position: 0px 30px}'); 

//highlight

addGlobalStyle('.moving > .highlight, .highlighted > .highlight {background:#F8F8F0; opacity:0.2}')

//footer

addGlobalStyle('#footer {border:none}')

// controls left (hovering over bullet)

addGlobalStyle(' #controlsLeft {background: #6F6E62;  opacity:0.5;  border:1px solid #6F6E62;  border-top-left-radius:4px; -moz-border-radius-topleft:4px; border-bottom-left-radius:4px; 	-moz-border-radius-bottomleft:4px; border-bottom-right-radius:4px; -moz-border-radius-bottomright:4px;  display:none; }')
addGlobalStyle(' #controlsLeft a {border:none;  color:#D8D8C8}')
addGlobalStyle(' #controlsLeft > .handle {background: #6F6E62;  border:none; -moz-border-radius-bottomright:4px; 	border-top-right-radius:4px;  -moz-border-radius-topright:4px;  }')
addGlobalStyle(' #controlsLeft hr{opacity:0.2 !important}'); 
addGlobalStyle(' #controlsLeft #moreControls a.export,#controlsLeft #moreControls a.duplicate,#controlsLeft #moreControls a.delete {   display:block!important}')
addGlobalStyle('  #controlsLeft .more {display:none !important}'); 


////////////////////////////////
// hide stuff
////////////////////////////////

addGlobalStyle('.siteSlogan, a.bottomLink, .footer, #helpButton {display:none}'); 

////////////////////////////////
// contents
////////////////////////////////

// margins

addGlobalStyle(' .selected > .children > .project .project {margin-left:20px}'); 
//addGlobalStyle(' .selected > .children > .project {margin-top:13px}'); 
//addGlobalStyle(' .children .project {margin-top:3px}'); 
addGlobalStyle(' .children {border-left:1px dotted #DCDCDC}'); 

// Title

addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea, .selectedEditor > textarea {line-height: 34px; padding-top:12px; font-size:26px }'); 

// Parent Nav

addGlobalStyle('.parent > .name > .content { color:#686868;  font-size:13px; line-height:19px; padding:0; margin:0; display:inline-block}'); 
addGlobalStyle(' .selected {border:none !important}'); 
addGlobalStyle('.parent > .name {margin:0; padding:0}'); 
addGlobalStyle('.parent > .name > .content .parentArrow:before {content:">"; font-size:10px}'); 

// all children

addGlobalStyle('.children > .project {margin-top:4px;  line-height:22px}'); 

// 1st child 

addGlobalStyle('.selected > .children >  .project {margin-top:15px;  line-height:23px}'); 

// 2nd child 

addGlobalStyle('.selected > .children >  .project > .children >  .project {margin-top:12px;  margin-left:40px;  line-height:23px}'); 

// subsequent children 

addGlobalStyle('.selected > .children >  .project > .children >  .project > .children .project {margin-top:5px; margin-left:40px;  line-height:23px; }'); 
addGlobalStyle('.selected > .children > .project > .children > .project, .twoLevelsDownEditor.nameEditor{line-height:23px;  font-size:16px}'); 

// Notes

addGlobalStyle('.noted > .notes > .content { color:#686868;  margin:3px 0 0 25px;  padding-left:0px;  font-size:14px;  white-space:pre-wrap; height:23px; min-height:23px; overflow:hidden; line-height:18px; '); 
addGlobalStyle('.noteEditor > textarea, .selectedEditor.noteEditor > textarea  { color:#686868;  font-size:14px!important;  line-height:18px!important;  } '); 
addGlobalStyle('.noted > .notes > .content.editing, .selected .notes, .page.searching .notes.matches > .content {padding-left:0;  font-size:14px;  white-space:pre-wrap; height:auto; overflow:visible; } '); 
addGlobalStyle('.open > .notes{max-height:none} '); 
addGlobalStyle('.noted > .notes {color:#878787 !important;  display:block;  margin:3px 0 0 0px; } '); 
//addGlobalStyle('.selected > .notes {padding-top:4px;  } '); 
addGlobalStyle('.selected > .notes > .content, .selected > .notes > .content.editing {height:auto !important;  border:none!important} '); 

//always show full notes content
addGlobalStyle('DIV.notes DIV.content {height: auto !important;  overflow: visible !important} '); 

// background of selected projects when hovered over bullet or move handle
addGlobalStyle(' .moving > .highlight, .highlighted.moveHovered > .highlight,   .moving > .highlight, .highlighted > .highlight {background: #C1C1C1}'); 


////////////////////////////////
// bullets
////////////////////////////////

// bullet color
addGlobalStyle('.bullet {color:#ACA590; font-size:15px!important; line-height:14px; height:15px; width:14px; text-indent:4px !important} '); 

// hover color
addGlobalStyle('.bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover, .project.addedShared > .name > .bullet:hover {    background-color: #AFAFAF; }'); 

// shared bullet halo color
addGlobalStyle('.project.shared > .name > .bullet {background-color: #F4ADE0; }'); 
addGlobalStyle('.project.shared > .name > .bullet:hover {background-color: #E6A2D3; }'); 

// bullet w/ children halo color
addGlobalStyle('.bullet {background-color:#E1E1E1; } '); 


// Tags
addGlobalStyle(' .content .contentTag {color:#EBEBEB}'); 
addGlobalStyle(' .content .contentTag:hover {color:#EBEBEB }'); 
addGlobalStyle('.contentTag, .content .contentTagText  {padding-right:4px; font-style:normal;  color: #067BE1; background-color:#EBEBEB !important; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px;font-size:14px ; line-height:19px; padding-top:0;  text-decoration:none }'); 
addGlobalStyle('.contentTag:hover, .contentTagText:hover { text-decoration:none!important }'); 
addGlobalStyle('.content.editing .contentTag {visibility: hidden}'); 


// Links

addGlobalStyle('.content .contentLink, .nameAnimated .contentLink { padding-left:3px; padding-right:3px; text-decoration:none!important; color:#223C5C;  font-size:12px;  background-color:#F0F3FA !important; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px;}'); 
addGlobalStyle('.content .contentLink:hover, .nameAnimated .contentLink:hover { color:#313131;  text-decoration:none!important;  background-color: #DCE6F4}'); 
