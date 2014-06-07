// ==UserScript==
// @name           LR WS
// @namespace      /tmp
// @include        http://www.legitreviews.com/*
// @include        http://legitreviews.com/*
// ==/UserScript==

minwidth='960'
maxwidth='1440'


// DIV injection
x=document.getElementById('content')
left=document.createElement("div")	// create div
right=document.createElement("div")
left.setAttribute('id','content-background-left')	// set id
right.setAttribute('id','content-background-right')
x.appendChild(left)	//insert div
x.appendChild(right)

//function to inject csshacks
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


    // =content section
addGlobalStyle('#content { position: relative; width: 90%; margin-left: auto; margin-right: auto; min-width: '+minwidth+'px; max-width: '+maxwidth+'px; background: none; background-color: #939183; min-height: 1600px !important;}')

    // The background image is split in two and the middle dynamically sized and filled in via the browser
addGlobalStyle('#content-background-left {position: absolute; width: 10px; top: 32px; background: transparent url("http://www.legitreviews.com/images/new/mc_bg_left.gif") repeat-y; min-height: 1600px; height: 100% !important;}')
addGlobalStyle('#content-background-right {position: absolute; left: -10px; margin-left: 100%; width: 10px; top: 32px; background: transparent url("http://www.legitreviews.com/images/new/mc_bg_right.gif") repeat-y; min-height: 1600px; height: 100% !important;}')

    // main-content area
addGlobalStyle('#main-content { position: relative; border: 1px solid #524e3a; margin-left: 184px; margin-right: 184px !important; width: auto; left: 0px;}')