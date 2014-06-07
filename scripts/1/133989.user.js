// ==UserScript==// @name           Workflowy Beaufyier II
// @description    improve Workflowy display 
// @include        https://workflowy.*
// @include        http://workflowy.*

// ==/UserScript==
function addGlobalStyle(css) {    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}


//Global
addGlobalStyle('body {background-color:#fdfdfd;color:#1C1C1C;font-size:18px;line-height:22px}');
addGlobalStyle('#visible {border:none;background-color:#fdfdfd;min-height:500px;margin-bottom:50px;margin-top:50px;padding-bottom:18px;padding-top:40px;width:1000px}');
addGlobalStyle('#workflowy {min-height:500px}');
addGlobalStyle('*{font-family:  "Segoe UI", sans-serif!important;}');
addGlobalStyle('.page {width:900px;border:none;background-color:#fdfdfd;margin-top:40px}');

//margins
addGlobalStyle(' .selected > .children > .project .project {margin-left:30px}');
addGlobalStyle(' .selected > .children > .project {margin-top:15px}');
addGlobalStyle('  .children .project {margin-top:1px}');
addGlobalStyle(' .children {border-left:1px solid #fdfdfd}');

// Site messages and blurbs
addGlobalStyle('.siteSlogan, a.bottomLink, .footer, div#dropdownMessages {display:none}');
addGlobalStyle('#site_message{top:50px;z-index:100}');

// Children
addGlobalStyle('.selected > .children > .project > .children > .project, .twoLevelsDownEditor.nameEditor{font-size: 15px;line-height:18px}');
addGlobalStyle('.selected > .children > .project { padding-top: 12px}');
addGlobalStyle('.selected > .children > .project > .children .project {padding-top: 5px}');

// Notes
addGlobalStyle(' .noted > .notes > .content{#color:1C1C1;opacity:0.8;font-style:italic;padding-left:50px;font-size:14px;line-height:18px;min-height:20px; height:20px;padding-top:2px}');
addGlobalStyle(' .noteEditor > textarea{font-style:italic;padding-left:50px;font-size:14px;line-height:18px;padding-top:2px}');

// Title of currently displayed note
addGlobalStyle('.name > .content{    min-height: 22px;}');
addGlobalStyle('.selected > .name > .content {font-size:24px;min-height: 30px;padding-top:20px;border-bottom:3px solid #464646;padding-bottom:5px}');
addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea{line-height: 28px;padding-top:30px}');

//Parent (list navigation)
addGlobalStyle('.parent > .name {opacity:1;font-size:14px;line-height:14px!important;padding-top:0;margin-top:0}');
addGlobalStyle('.parentArrow:before {content:">";font-size:12px}');

//Tags
addGlobalStyle('.contentTag{color:#1572AB!important}');
addGlobalStyle('.contentTagText {text-decoration:none!important;}');
addGlobalStyle('.contentTagClickable {background-color:#004A78!important;}');
addGlobalStyle('  .content.editing .contentTag {color:transparent!important;}');

//Expand button, list handles
addGlobalStyle(' .project > .name #controls #expandButton, #expandButton .expandMinus {opacity:0.9;font-weight:bold;}');
addGlobalStyle('#controls #move {opacity:0.8;}');

 //Links
addGlobalStyle('.content .contentLink, .nameAnimated .contentLink {text-decoration:none!important;color:#0AA308}');

//BULLETS

// change bullet marker to long dash for bullets w/o subitens
addGlobalStyle(' .project.task > .name > .bullet, .project.open > .name > .bullet{background-color:transparent;color:transparent; background-image: url("http://www.davidvasella.ch/storage/ld_of_black_1.png")}');
addGlobalStyle(' .bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover, .project.shared > .name > .bullet:hover{color:transparent}');

// change dashes of bullets w/ subitems
addGlobalStyle(' .bullet{background-color:transparent; color:transparent;background-image: url("http://www.davidvasella.ch/storage/ld_of_blue_1.png"); }');

// change dashes of bullets for shared items
addGlobalStyle(' .project.shared > .name > .bullet{background-color:transparent; color:transparent;background-image: url("http://www.davidvasella.ch/storage/ld_of_shared.png");}');

//change bullet position
addGlobalStyle('.bullet {font-size:1.5em;list-style-type: none;background-repeat:no-repeat;  background-position: -3px 10px}');

addGlobalStyle('.bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover {background-color:transparent;color:transparent}');
//addGlobalStyle('.saveButton, .saveButton_saved {color:#fff}');


//Controls and buttons
addGlobalStyle(' #controlsLeft {opacity:0.8}');
addGlobalStyle(' div#addButton {display:none;opacity:0.6;font-size:14px;margin-top:18px}');
addGlobalStyle(' #controls #expandButton {text-align:right;left:25px;}');
addGlobalStyle(' div.redo-button, div.undo-button {display:none}');
addGlobalStyle('    #controlsLeft #moreControls a.export, #controlsLeft #moreControls a.delete {display:block}');
addGlobalStyle('#buttonBar,  .saveButton, .showCompletedButton {background-color:#fdfdfd;border:none;float:right;font-size:13px; display:block;margin-top:5px;border-radius:2px;border:none;margin-left:5px;height:18px;padding:6px 2px 0px 2px}');

// search
addGlobalStyle(' #searchForm {top:9px;color:#000;}');
addGlobalStyle(' #searchBox {color:#000;border:none;border-radius:2px;background-color:#F4F4F4;padding:4px 6px;font-size:14px;width:218px}');

// header
addGlobalStyle(' #header {padding:20px 10px;background-color:#fdfdfd;border:none;box-shadow:none;height:50px;opacity:0.9}');


//adjust logo position
addGlobalStyle(' #logo, .pro_member #logo {background-position:0 12px;height:30px}');

 //highlight
addGlobalStyle('.moving > .highlight, .highlighted > .highlight {background:#F0F4F8}')
addGlobalStyle('.selected {border:none}')

//footer
addGlobalStyle('#footer {border:none}')