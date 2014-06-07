// ==UserScript==// @name           Workflowy / 2
// @description    improve Workflowy display 
// @include        https://workflowy.*

// ==/UserScript==
function addGlobalStyle(css) {    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}

//Global
addGlobalStyle('body {background-color:#F4F4F4;color:#000;font-size:14px;}');
addGlobalStyle('#visible {border:none;background-color:#fff;min-height:500px;margin-bottom:50px;margin-top:50px;padding-bottom:20px;padding-top:40px;width:800px}');
addGlobalStyle('#workflowy {min-height:500px}');
addGlobalStyle('*{font-family: "Segoe UI", Verdana, sans-serif!important;}');


//hide 
addGlobalStyle('.corner, .edge, #share_buttons, #bottomLinks, #siteSlogan {display:none!important;}');


// fonts CSS geändert

//addGlobalStyle('.selected > .children > .project > .children > .project, .twoLevelsDownEditor.nameEditor{}');
addGlobalStyle('.project .selected > div.children  { padding-top: 4px}');

color:
addGlobalStyle('.selected > .children > .project > .children .project > .children .project {font-size:13px;color:#494949; }')
addGlobalStyle('.selected > .children > .project > .children > .project, .twoLevelsDownEditor.nameEditor{font-size: 13px;color:#494949}')



addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea{line-height: 28px;line-height:38px;padding-top:5px}')


addGlobalStyle('.selected.project > .name {margin-top:12px;font-size: 22px');
addGlobalStyle('.selectedEditor > textarea{font-size: 22px}');

//addGlobalStyle('.name > .content{}');

addGlobalStyle('.selected .project > .name > .content, .nameEditor > textarea{ }');

//addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea{line-height: 20px;}');
addGlobalStyle('.selected {border:none;}');

addGlobalStyle('.parent > .name > .content, .parent > .name {font-size:11px;color:#000;opacity:0.8}');


addGlobalStyle('#site_message {top:20px}');



//notes
addGlobalStyle('.noted > .notes > .content, .noteEditor > textarea, .selected > .notes > .content, .selected > .notes > .content.editing, .selectedEditor.noteEditor > textarea {color:#282828;font-size: 12px; padding-top:4px;text-transform:none;letter-spacing:0;font-style:italic;line-height:20px!important;opacity:0.7}');
addGlobalStyle('  .noted > .notes > .content {margin-left:40px;width:80%;line-height:20px!important;opacity:0.7}');

//Tags
addGlobalStyle('.contentTag{color:#045A90!important;background-color:#F3FBFF}');
addGlobalStyle('.contentTagText {text-decoration:none!important;}');
addGlobalStyle('.contentTagClickable {background-color:#004A78!important;}');
addGlobalStyle('  .content.editing .contentTag {color:transparent!important;}');


addGlobalStyle(' .project > .name #controls #expandButton, #expandButton .expandMinus {opacity:0.9;font-weight:bold;font-size:22px}');




addGlobalStyle('#controls #move {opacity:0.6;}');

 
//Links
addGlobalStyle('.content .contentLink, .nameAnimated .contentLink {text-decoration:none!important;color:#028500;background-color:#F8FFF8}');

//Bullet
addGlobalStyle('.bullet {opacity:0.8;font-size:1.3em}');



// color of bullets w/o subtasks
addGlobalStyle(' .project.task > .name > .bullet, .project.open > .name > .bullet{background-color:transparent;color:#979797; }');
addGlobalStyle(' .bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover, .project.shared > .name > .bullet:hover{background-color:transparent;color:#000 }');
// color of bullets w/ subtasks
addGlobalStyle(' .bullet{background-color:transparent; color:#1F579B;}');
//color of shared bullets
addGlobalStyle(' .project.shared > .name > .bullet{background-color:transparent; color:#A207AA;}');


//addGlobalStyle('.bullet:hover, .project.task > .name > .bullet:hover, .project.open > .name > .bullet:hover {background-color:#D7DCE8}');
//addGlobalStyle('.saveButton, .saveButton_saved {color:#fff}');

addGlobalStyle('.parentArrow:before {content:">";font-size:10px}');

//addGlobalStyle('a.bullet{color:transparent;');
//addGlobalStyle('a.bullet:before{font-size:15px;vertical-align:top;left:0px;color:#000;font-family:"Courier New", "Courier", serif!important}');
//addGlobalStyle('a.bullet:before{ content: "-"}');

//Controls
addGlobalStyle(' #controlsLeft {opacity:0.6}');

addGlobalStyle(' div#addButton {display:none;opacity:0.4;font-size:11px;margin-top:20px}');

addGlobalStyle(' #controls #expandButton {text-align:right;left:35px;}');


addGlobalStyle(' div.redo-button, div.undo-button {display:none}');
addGlobalStyle('    #controlsLeft #moreControls a.export, #controlsLeft #moreControls a.delete {display:block}');

// search
addGlobalStyle(' #searchForm {top:9px;color:#000;}');
addGlobalStyle(' #searchBox {color:#000;border:none;border-radius:2px;background-color:#fff;padding:4px 6px;font-size:14px;width:220px}');

// header
addGlobalStyle(' #header {background-color:#F4F4F4;border:none;box-shadow:none;height:50px;opacity:0.9}');

//buttons
addGlobalStyle('#buttonBar,  .saveButton, .showCompletedButton {font-size:11px; margin-top:5px;border-radius:2px;border:none;margin-left:5px;height:20px;padding:6px 2px 0px 2px}');
//addGlobalStyle('#buttonBar .open, #buttonBar:hover {background-color:#808080;border:none}');

//logo
addGlobalStyle(' #logo, .pro_member #logo {width:30px;margin-top:15px;margin-left:30px;margin-right:0;background-image:url(http://www.level2trainingandseminars.com/images/blue-dot.png);repeat:no-repeat}');

 //highlight
addGlobalStyle('.moving > .highlight, .highlighted > .highlight {background:#F0F4F8}')
addGlobalStyle('.selected {border:none}')

//footer
addGlobalStyle('#footer {border:none}')

//margins
addGlobalStyle(' .selected > .children > .project .project {margin-left:30px}');
addGlobalStyle(' .selected > .children > .project {margin-top:15px}');
addGlobalStyle('  .children .project {margin-top:1px}');
addGlobalStyle(' .children {border-left:1px solid #F5F5F5}');