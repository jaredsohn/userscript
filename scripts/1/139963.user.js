// ==UserScript==// @name           Better workflowy / 2
// @description    removes all that is unnecessary  
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
addGlobalStyle('body {background-color:#Ffffff;color:#000;}');
addGlobalStyle('#visible {border:none;background-color:#fff;min-height:500px;margin-bottom:50px;margin-top:0px;padding-bottom:0px;padding-top:0px;width:800px}');
addGlobalStyle('#workflowy {min-height:500px}');



//hide 
addGlobalStyle('.corner, .edge, #share_buttons, #bottomLinks, #siteSlogan, #buttonBar, #saveButton.button.saved, #saveButton_saveNow, #saveButton_saving, #saveButton_saved, .proPitch, .getMoreSpaceButton, .showCompletedButton, .progressBarContainer, .siteSlogan {display:none!important;}');




//addGlobalStyle('.name > .content{}');

addGlobalStyle('.selected .project > .name > .content, .nameEditor > textarea{ }');

//addGlobalStyle('.selected > .name > .content, .selectedEditor.nameEditor > textarea{line-height: 20px;}');
addGlobalStyle('.selected {border:none;}');

addGlobalStyle('.parent > .name > .content, .parent > .name {font-size:12px;color:#000;opacity:0.8}');


addGlobalStyle('#site_message {top:10px}');




//Tags
addGlobalStyle('.contentTag{color:#3CB5B5!important;background-color:#ffffff}');
addGlobalStyle('.contentTagText {text-decoration:none!important;}');
addGlobalStyle('.contentTagClickable {background-color:#004A78!important;}');
addGlobalStyle('  .content.editing .contentTag {color:transparent!important;}');




addGlobalStyle('#controls #move {opacity:0.6;}');

 
//Links
addGlobalStyle('.content .contentLink, .nameAnimated .contentLink {text-decoration:none!important;color:#028500;background-color:#F8FFF8}');

//addGlobalStyle('.saveButton, .saveButton_saved {color:#fff}');

addGlobalStyle('.parentArrow:before {content:">";font-size:10px}');

//addGlobalStyle('a.bullet{color:transparent;');
//addGlobalStyle('a.bullet:before{vertical-align:top;left:0px;color:#000; !important}');
//addGlobalStyle('a.bullet:before{ content: "-"}');





// header
addGlobalStyle(' #header {background:#fff;border-bottom:0px solid #ffffff}')
addGlobalStyle('#searchBox {border: 1px solid #fff}')


//logo
addGlobalStyle(' #logo, .pro_member #logo {width:0px;margin-top:0px;margin-left:0px;margin-right:0;background-image:url(http://wwxw.level2trainingandseminars.com/images/blue-dot.png);repeat:no-repeat}');

 //highlight
addGlobalStyle('.moving > .highlight, .highlighted > .highlight {background:#F0F4F8}')
addGlobalStyle('.selected {border:none}')

//footer
addGlobalStyle('#footer {border:none}')

