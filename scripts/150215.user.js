// ==UserScript==
// @name       ActiveInbox Large Status Buttons
// @namespace  http://www.dvdmon.com/
// @version    1.2.1
// @description  Increases size and brightness of status buttons on the top menu bar for ActiveInbox
// @include      http://mail.google.com/*
// @include      https://mail.google.com/*
// @include      http://*.mail.google.com/*
// @include      https://*.mail.google.com/*
// @match      http://mail.google.com/*
// @match      https://mail.google.com/*
// @match      http://*.mail.google.com/*
// @match      https://*.mail.google.com/*
// ==/UserScript==

  



function multilineString(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

var css = multilineString(function() {/*!


#gtdi-rb .gtdi-rb-row-main-item, #gtdi-rb .gtdi-rb-todo-dropdown {
height:2em !important;
}


.gtdi-rb-row-main-item .gtdi-count, .gtdi-rb-row-main-item .gtdi-circlecount {
border-radius: 3px;
border: 2px solid black;
display: inline-block;
font-size: 25px;
font-weight: bold;
padding: .05em .2em;
margin: -.1em .001em .001em .001em;
line-height: 24px;
}


div[gtdi-rbtododropdown-item-id="action"] .gtdi-count  {
border-color: black;
background: #E077E0;
color: #A7219C
}
 

div[gtdi-rbtododropdown-item-id="next_action"] .gtdi-count  {
border-color: yellow;
background: red;
color: white;
}


div[gtdi-rbtododropdown-item-id="waiting_on"] .gtdi-count  {
border-color: #00A0D3;
background: #93B9EB;
color: #DDEAEC;
} 


div[gtdi-rbtododropdown-item-id="some_day"] .gtdi-count  {
border-color: #CCC;
background: #D6E5F8;
color: #A8D3DB;
}


div[gtdi-rbtododropdown-item-id="deadline/Today"] .gtdi-count  {
border-color: black;
background: #F5FF00;
color: black;
}


div[gtdi-rbtododropdown-item-id="deadline/Tomorrow"] .gtdi-count  {
border-color: black;
background: orange;
color: black;
}


div[gtdi-rbtododropdown-item-id="deadline/NextQuarter"] .gtdi-count  {
border-color: #51CE0A;
background: #03EC6A;
color: #98B115;
}


div[gtdi-rbtododropdown-item-id="deadline/OverdueRecent"] .gtdi-count  {
border-color: #FFB800;
background: #E60000;
color: yellow;
}


div[gtdi-rbtododropdown-item-id="deadline/OverdueOlder"] .gtdi-count  {
border-color: red;
background: brown;
color: #EFEFEF;
}


div[gtdi-rbtododropdown-item-id="deadline/OverdueOlderStill"] .gtdi-count  {
border-color: red;
background: black;
color: #EFEFEF;
}


div[gtdi-rbtododropdown-item-id="activeall"] .gtdi-count  {
border-color: black;
background: white;
color: black;
}




span.gtdi-count-zero {
border-color: #DDD !important;
background: #E7E7E7 !important;
color: #C5C5C5 !important;
font-size: 1em !important;
font-weight: normal !important;
line-height: 1em !important;
}


.gtdi-notesviewer-noteeditor {
background-color: yellow !important;
}

.gtdi-notesviewer {
background-color: yellow !important;
font-weight:bold;
}

.gtdi-hab-row-notes-content {
background-color: yellow !important;
border: solid black 1px !important;
border-left: 0 !important;

}

.gtdi-hab-row-notes-title {
background-color: yellow !important;
border: solid black 1px !important;
border-right: 0 !important;
padding-left:5px !important;
padding-bottom:8px !important;
font-size:.9em !important;
}

.gtdi-notes {

    border: solid black 1px !important;
    background-color: yellow !important;
    color: #666 !important;
    font-weight: bold !important;
}

*/}); 
//alert(css);

var head = document.getElementsByTagName("head")[0];
var style = document.createElement('style');
style.rel = "stylesheet";
style.type = "text/css";
style.innerHTML = css;
head.appendChild(style);
 	