// ==UserScript==
// @version     0.02
// @author      dvasella
// @name        simplenote 
// @namespace   simplenote
// @description simplenote 
// @include    *simple-note.appspot.com/*


// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Fonts
addGlobalStyle(' body, html {font-size:22px;background-image:none;background-color:#FEFDF9}');
addGlobalStyle(' *{font-family: sans-serif;text-shadow:none!important}');


// structure
addGlobalStyle(' .sidebar {width:450px}');
addGlobalStyle(' .tagbar, .note {left:451px}');
addGlobalStyle(' .wrapper {left:0%;right:0%}');
addGlobalStyle('  .app {left:0px;right:0px}'); 
addGlobalStyle('  .note {padding:20px 35px}'); 
addGlobalStyle('  .wrapper, .app {top:0%;bottom:0%}'); 
addGlobalStyle('  .header {right:15%}'); 

//header color
addGlobalStyle('  .header a, .header .button, .footer a, .footer .button {color:#484848}'); 

// move tag menu to the right (b/c of lost space to the left)
addGlobalStyle('  .sideview .popover .menu {margin:0}'); 


// background colors
addGlobalStyle(' .toolbar, .tagbar, .sidebar, .note, .notes, .wrapper, .app, .sideview, ul.sideview {background-color:#FEFDF9}');

// borders
addGlobalStyle(' .sidebar {border-right: 1px solid #878787!important}');

// searchfield
addGlobalStyle(' .searchfield {border-radius:1px}');
addGlobalStyle(' .toolbar .left-tools .tbutton {left:80px}');
addGlobalStyle(' .tbutton, .tagmenu.button span, .header .button span {opacity:0.4!important}');

// hide ads
addGlobalStyle(' .notes li#fusion_ad  {display:none}');

// Notes
addGlobalStyle(' .note #txtarea, .note #historytxt {font-family:"Inconsolata", "Consolas", monospace; font-size:20px!important;line-height:24px!important; color:#000}');
addGlobalStyle(' .note-preview-title {font-size:14px!important}');
addGlobalStyle(' .notes li .note-preview-title {width:300px!important;font-weight:normal}');
addGlobalStyle(' .sidebar {font-size:12px}');
addGlobalStyle(' .notes li:hover { background-color: #E3E3E3; background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none;border-bottom-color: #999; }');
addGlobalStyle(' .notes li.selected {text-shadow:none;background-color:#757575; background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none}');

// Statusmessage
addGlobalStyle(' .statusbar #statusmsg, .statusbar #criticalmsg  {color:#DE7E61}');

//buttons
addGlobalStyle(' ul.as-selections li.as-selection-item {color:#124A68;background-color:#F4E7B4!important;background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none;border:none}');
addGlobalStyle(' ul.as-selections li.as-selection-item:hover {color:#124A68;background-color:#F4E7B4!important;background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none;border:none}');
addGlobalStyle(' .right-side-menu .sn-rocker-option {font-size:14px;left:450px}');
addGlobalStyle(' .button:hover, .button:focus,.button.over {background:none!important;border: none!important;color:#634A03!important}');


// tag list
addGlobalStyle(' .popover .menu .taglist {max-height: 650px; }');

// site layout
addGlobalStyle(' .wrapper {border-radius:0;background-color:#fff!important;background-image:none!important;box-shadow:none}');
addGlobalStyle(' .app  {border-radius:0;background-color:#transparent!important;background-image:none!important;box-shadow:none}');

// Markdown formatted notes
addGlobalStyle(' .note #static_content h1, #published_content.markdown h1 {font-size:23px;font-weight:bold;margin:50px 0px 30px 0px!important;border-bottom:1px solid #666664;counter-reset: h2 0;counter-increment: h1 1;}');
addGlobalStyle(' .note #static_content h1:before, #published_content.markdown h1:before { counter-increment: 1; content: "" counter(h1, decimal) ". ";  }');

addGlobalStyle(' .note #static_content h2, #published_content.markdown h2 {font-size:20px;font-weight:bold;margin:40px 0px 22px 0px!important;border-bottom:1px solid #666664;counter-increment: h2 1;counter-reset: h3 0;}');
addGlobalStyle(' .note #static_content h2:before, #published_content.markdown h2:before {counter-increment: 1; content: counter(h1)"."counter(h2, decimal) ". "; }');

addGlobalStyle(' .note #static_content h3, #published_content.markdown h3 {font-size:18px;font-weight:normal;font-style:italic;border-bottom:1px dotted #666664;margin:30px 0px 22px 0px!important;counter-increment: h3 1;counter-reset: h4 0;}');
addGlobalStyle(' .note #static_content h3:before, #published_content.markdown h3:before {counter-increment: 1; content: counter(h1)"."counter(h2)"."counter(h3, decimal) ". "; }');

addGlobalStyle(' .note #static_content h4, #published_content.markdown h4 {font-size:18px;font-weight:normal;font-style:italic;border:none;margin:20px 0px 18px 0px!important;counter-increment: h4 1}');
addGlobalStyle(' .note #static_content h4:before, #published_content.markdown h4:before {counter-increment: 1; content: counter(h1)"."counter(h2)"."counter(h3)"."counter(h4, decimal) ". "; }');

addGlobalStyle(' .note #static_content h5, #published_content.markdown h5 {font-size:16px;font-weight:normal;font-style:italic;border:none;margin:18px 0px 14px 0px!important;counter-increment: h5 1}');
addGlobalStyle(' .note #static_content h5:before, #published_content.markdown h5:before {counter-increment: 1; content: counter(h1)"."counter(h2)"."counter(h3)"."counter(h4)"."counter(h5, decimal) ". "; }');

addGlobalStyle(' .note a {text-decoration:none;font-weight:normal;border:none}');

addGlobalStyle(' .note #static_content {font-size:18px;font-weight:normal;margin-top:4px;margin-bottom:4px}');
addGlobalStyle(' .note #static_content ul {list-style-type:disc!important;margin-left:30px}');
addGlobalStyle(' .note #static_content ul li ul li {list-style-type:circle!important;margin-left:10px!important}');

addGlobalStyle(' blockquote {font-style:italic;line-height:23px;border:none!important;background-color:#F2F1ED;width:75%;padding:12px 12px 4px 12px!important;margin:10px 0px 5px 0px!important}');

// Markdown formatted notes title color

addGlobalStyle(' .note #static_content h1,.note #static_content h2,.note #static_content h3, .note #static_content h4, .note #static_content h5 {width:60%}');
addGlobalStyle(' .note #static_content h1{background-color:#FFF2E7}');
addGlobalStyle(' .note #static_content h2{background-color:#FFFCE7}');

// hide stuff
addGlobalStyle(' h1.logo, ul.footer {display:none}');