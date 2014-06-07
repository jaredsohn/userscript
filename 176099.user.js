// ==UserScript==
// @version     0.02
// @author      dvasella
// @name        simplenote 
// @namespace   simplenote
// @description simplenote 
// @grant none
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
addGlobalStyle(' body, html {font-size:20px;background-image:none;background-color:#eeeeee}');
addGlobalStyle(' *{font-family: sans-serif !important;text-shadow:none!important}');

// structure
addGlobalStyle(' .sidebar {width:370px}');
addGlobalStyle(' .tagbar, .note {left:451px}');
addGlobalStyle(' .wrapper {left:0%;right:0%}');
addGlobalStyle('  .app {left:0px;right:0px}'); 
addGlobalStyle('  .note {padding:20px 20px 20px 20px !important}'); 
addGlobalStyle('  .wrapper, .app {top:0%;bottom:0%}'); 
addGlobalStyle('  .header {right:15%}'); 

// selection
addGlobalStyle('body::selection {background: #DFDFDF;  /* Safari */}'); 
addGlobalStyle('::-moz-selection {background: #DFDFDF;  /* Firefox */}'); 

// clean up
addGlobalStyle('  li .tagmenu .button, .sidebar {background-image:none !important; background:none !important');
addGlobalStyle('  ul.notes {margin-top:20px !important');
addGlobalStyle('  ul.as-selections li.as-original input.as-prompt {color:#616161}'); 
addGlobalStyle('  .notes li.selected.pinned .note-preview-title, .notes li.selected.shared .note-preview-line-1, .notes li.selected.published .note-preview-line-1, .notes li.selected.unread .note-preview-line-1 {background-position: 0px 2px}'); 

//header color
addGlobalStyle('  .header a, .header .button, .footer a, .footer .button {color:#363636}'); 

// move tag menu to the right (b/c of lost space to the left)
addGlobalStyle('  .sideview .popover .menu {margin:0}'); 

// background colors
addGlobalStyle(' .toolbar, .tagbar, .sidebar, .notes, .wrapper, .app, .sideview, ul.sideview {background-color:#eeeeee}');
addGlobalStyle(' div.note {padding: 30px !important;background-color:#fff; border-right:230px solid #eeeeee; border-bottom:100px solid #eee; border-top:30px solid #eee}');
addGlobalStyle(' #txtarea {background-color:#ffffff!important;font-family: sans-serif !important}');

// borders
addGlobalStyle(' .sidebar {border-right: none}');
addGlobalStyle(' .toolbar {border:none}');
addGlobalStyle(' ul.sideview {border:none !important}');

// searchfield
addGlobalStyle(' .searchfield {border-radius:1px; background-color:#fafafa; border:none !important; font-size:15px; padding:2px 3px 2px 26px; height:28px}');
addGlobalStyle(' .toolbar .left-tools .tbutton {left:80px}');
addGlobalStyle(' .tbutton, .tagmenu.button span, .header .button span {opacity:0.4!important; background-color:none}');

// hide ads
addGlobalStyle(' .notes li#fusion_ad  {display:none}');

// Notes
addGlobalStyle(' .note #txtarea, .note #historytxt { font-size:20px!important;line-height:24px!important; color:#000}');
addGlobalStyle(' .note-preview-title {font-size:17px!important; color: #5C99D6; font-weight:bold}');
addGlobalStyle(' .notes li .note-preview-title {width:280px!important;font-weight:normal; color:#000}');
addGlobalStyle(' .sidebar {font-size:13px}');
addGlobalStyle(' .notes li {border:none; padding:5px}');
addGlobalStyle(' .notes li:hover { background-color: #eee; background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none;border-bottom-color: #999; }');
addGlobalStyle(' .notes li.selected {text-shadow:none;background-color:#eee; background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none; border:none}');
addGlobalStyle(' .notes li.selected .note-preview-title, .notes li.selected .note-preview-line {color: #5C99D6; font-weight:bold}');
addGlobalStyle(' .note-preview-line {display:none}');
addGlobalStyle(' #txtarea p{margin-top:12px}');
addGlobalStyle(' .notes li .note-preview-date, .notes li.selected .note-preview-date {display:none; color:#A3A3A3; font-size:14px}');

// fancy box
addGlobalStyle('#fancybox-wrap {}');
addGlobalStyle('#fancybox-content, #fancybox-bg-n {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-ne {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-e {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-se {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-s {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-sw {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-w {background-image: none!important; background-color:#eee}');
addGlobalStyle('#fancybox-bg-nw {background-image: none!important; background-color:#eee}');

// Statusmessage
addGlobalStyle(' .statusbar #statusmsg, .statusbar #criticalmsg  {font-size:13px; color:#DE7E61}');

//buttons
addGlobalStyle(' ul.as-selections li.as-original input {font-size:14px}');
addGlobalStyle(' ul.as-selections li.as-selection-item {font-size:14px; padding:1px 3px; margin-right:4px;color:#fff;background-color:#477DB3!important;background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none;border:none}');
addGlobalStyle(' ul.as-selections li.as-selection-item:hover {color:#fff;background-color:#4F719A!important;background-image:none;background: -webkit-gradient: none;background: -webkit-linear-gradient:none;background: -moz-linear-gradient:none;border:none}');
addGlobalStyle(' .right-side-menu .sn-rocker-option {font-size:14px;left:450px; border: none!important}');
addGlobalStyle(' .button:hover, .button:focus,.button.over {background:none!important;border: none!important;color:#634A03!important}');
addGlobalStyle(' .right-side-menu .sn-rocker-option {background:none!important; color: #484848!important}');
addGlobalStyle(' .right-side-menu .sn-rocker-option:first-child {border:none; background-color:#e89004; border-radius:1px !important}');
addGlobalStyle(' .right-side-menu .sn-rocker-option.active, .right-side-menu .sn-rocker-option:active, .right-side-menu .sn-rocker-option.active:focus, .right-side-menu .sn-rocker-option.active:hover{border:none !important; background-color:#e89004!important}');
addGlobalStyle(' .right-side-menu .sn-rocker-option:last-child {border:none; background-color:#e89004; border-radius:3px !important}');

// tag list
addGlobalStyle(' .tagmenu.button, .tagmenu.button:active, .tagmenu.button.open, .version-restore:active, .version-restore.open {background:none; border:none; opacity:1}');
addGlobalStyle(' .tagmenu.button:active span, .tagmenu.button.open span {background-position: 0px 3px !important}');
addGlobalStyle(' .popover .menu {box-shadow:none; background-image: none; border:none; background-color: #919191; color: #fff; border-radius:0px}');
addGlobalStyle(' .popover .menu:after, .popover .menu h4   {background-image: none; border:none; background-color: #919191; color: #fff}');
addGlobalStyle(' .tagmenu.button:active, .tagmenu.button.open, .version-restore:active, .version-restore.open, .popover .menu li a, .tagmenu .menu li a.allcount, .tagmenu .menu li a.count {border:none; background: #919191; color: #fff}');
addGlobalStyle(' .ie8 .popover .menu {background-position: 0px 3px !important}');
addGlobalStyle(' .popover .menu .taglist {max-height: 650px; }');

// tag suggestions
// addGlobalStyle(' li.as-result-item.active, ul.as-list {background:none !important; border:none !important;}');

// site layout
addGlobalStyle(' .wrapper {border-radius:0;background-color:#FCFCF9!important;background-image:none!important;box-shadow:none}');
addGlobalStyle(' .app  {border-radius:0;background-color:#transparent!important;background-image:none!important;box-shadow:none}');

// Markdown formatted notes
addGlobalStyle(' h1, h2, h3, h4, h5, h6 {font-family: sans-serif!important}');
addGlobalStyle(' .note #static_content h1, #published_content.markdown h1 {font-size:23px;font-weight:bold;margin:50px 0px 30px 0px!important;counter-reset: h2 0;counter-increment: h1 1;}');
addGlobalStyle(' .note #static_content h1:before, #published_content.markdown h1:before { counter-increment: 1; content: "" counter(h1, decimal) ". ";  }');
addGlobalStyle(' .note #static_content h2, #published_content.markdown h2 {font-size:20px;font-weight:bold;margin:40px 0px 22px 0px!important;counter-increment: h2 1;counter-reset: h3 0;}');
addGlobalStyle(' .note #static_content h2:before, #published_content.markdown h2:before {counter-increment: 1; content: counter(h1)"."counter(h2, decimal) ". "; }');
addGlobalStyle(' .note #static_content h3, #published_content.markdown h3 {font-size:18px;font-weight:normal;font-style:italic;margin:30px 0px 22px 0px!important;counter-increment: h3 1;counter-reset: h4 0;}');
addGlobalStyle(' .note #static_content h3:before, #published_content.markdown h3:before {counter-increment: 1; content: counter(h1)"."counter(h2)"."counter(h3, decimal) ". "; }');
addGlobalStyle(' .note #static_content h4, #published_content.markdown h4 {font-size:18px;font-weight:normal;font-style:italic;border:none;margin:20px 0px 18px 0px!important;counter-increment: h4 1}');
addGlobalStyle(' .note #static_content h4:before, #published_content.markdown h4:before {counter-increment: 1; content: counter(h1)"."counter(h2)"."counter(h3)"."counter(h4, decimal) ". "; }');
addGlobalStyle(' .note #static_content h5, #published_content.markdown h5 {font-size:16px;font-weight:normal;font-style:italic;border:none;margin:18px 0px 14px 0px!important;counter-increment: h5 1}');
addGlobalStyle(' .note #static_content h5:before, #published_content.markdown h5:before {counter-increment: 1; content: counter(h1)"."counter(h2)"."counter(h3)"."counter(h4)"."counter(h5, decimal) ". "; }');
addGlobalStyle(' .note a {text-decoration:none;font-weight:normal;border:none}');
addGlobalStyle(' .note #static_content {font-size:18px;font-weight:normal;margin-top:4px;margin-bottom:4px}');
addGlobalStyle(' .note #static_content ul {list-style-type:disc!important;margin-left:30px}');
addGlobalStyle(' .note #static_content ul li ul li {list-style-type:circle!important;margin-left:10px!important}');

addGlobalStyle(' blockquote {font-style:italic;line-height:22px;border:none!important;background-color:#F2F1ED;width:75%;padding:12px 12px 4px 12px!important;margin:10px 0px 5px 0px!important}');

// hide stuff
addGlobalStyle(' h1.logo, ul.footer {display:none}');