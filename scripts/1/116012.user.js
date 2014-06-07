// ==UserScript==
// @id             BibliaBlack
// @name           Biblia Dark Colour Scheme
// @version        1.2
// @namespace      http://*biblia.com/*
// @author         Nicholas van Oudtshoorn
// @description    Re-style biblia easier on the eyes
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==
var bbEl = document.createElement('li');
bbEl.innerHTML = "<span id='togglelink' style='cursor:pointer; margin-top: -4px !important; padding: 0 4px;'>Switch Theme</span>";
var newseparator = document.createElement('li');
newseparator.setAttribute("class", "separator");
newseparator.innerHTML = "•";

var firstseparator = document.getElementsByClassName('separator')[0];
var rightlinks = firstseparator.parentNode;
rightlinks.insertBefore(bbEl, firstseparator);
rightlinks.insertBefore(newseparator, bbEl);


var bbSEl = document.createElement('style');
bbSEl.id = "bibliablack";
 bbSEl.innerHTML = "";
var headID = document.getElementsByTagName("head")[0];
headID.appendChild(bbSEl);

bbEl.addEventListener('click', function() {    

  var styleEl = document.getElementById('bibliablack');
  if (styleEl.innerHTML == "") {
    localStorage['bibliacolourscheme']='dark';
    styleEl.innerHTML = ".resource-content {border-top: 1px solid #000} .fullscreen .card .face{left:0px}#content-container,#two-pane-reading-container{background:transparent!important}.panel-menu .menu-option:hover{background-color:#f25a1e}#toggler{background:#F25A1E !important}.table-of-contents .tree-area > ul > li {border-bottom: 1px solid #2a2a2a}.table-of-contents .tree-area  a{color:rgba(255,255,255,.8)}.table-of-contents .tree-area > ul > li > a{color: white}.table-of-contents,.resource-content,.resource-info,.library-content,#library-container{background:#383838 !important;color:#fff !important;text-shadow:0 0 4px #000, 0 0 1px #000}.resource-content a,.resource-content a:visited,.resource-content a:hover,.bibleref,.superscript{color:skyblue !important}#selected-header,.ui-widget-header,.toolbar,body{background: -webkit-gradient(linear,left top,left bottom,from(#383838),to(#2a2a2a));background: -moz-linear-gradient(top,#383838,#2a2a2a)}.toolbar .toolbar-cover-section.active{background: -webkit-gradient(linear,left top,left bottom,from(#2a2a2a),to(#383838));background:-moz-linear-gradient(top,#2a2a2a,#383838)}.toolbar input,.resource-picker-dropdown input{background-color:#919191;border:1px solid black}.resource-picker-results .resource-picker-item-authors{color:rgba(255,255,255,.8)}.resource-picker-results .resource-picker-item-caption{color:white}.resource-picker-dropdown li.item:hover, .resource-picker-dropdown li.item.selected{background:#f25a1e}.resource-picker-dropdown,.resource-picker-features,.resource-picker-toolbar,.panel-menu,#library-sort-panel{background: -webkit-gradient(linear,left top,left bottom,from(#383838),to(#2a2a2a));background:-moz-linear-gradient(top,#383838,#2a2a2a);color:#eee}.dropdown{border:1px solid #000}.panel-menu .font-resize .small-font a,.panel-menu .font-resize .large-font a,.toolbar .resource-picker-button{color:#eee}.toolbar .resource-picker-button:hover,.toolbar .resource-picker-button:active{color:#fff; text-shadow:0 0 3px #fff}.panel-menu .menu-separator{background-color:#000}#content-pane-left,.toolbar .toolbar-cover-section{border-right:1px solid #000}.shadow{-moz-box-shadow:0 0 6px #000;-webkit-box-shadow:0 0 6px #000;box-shadow:0 0 6px #000}.resource-content .words-of-christ{color:#f44 !important}.arrow{background:none}.arrow:after{content: '▾';color:white;bottom:0px;right:0px;position:absolute;font-size:9px;font-family:sans-serif}div.history-back, div.history-forward{background:none}.history-forward:hover,.history-back:hover{text-shadow: 0 0 4px #fff, 0 0 1px #fff}.history-forward.unavailable:hover,.history-back.unavailable:hover{text-shadow: 0 0 4px #888, 0 0 1px #888}.history-back:after{content: '⇦';color:#fff;font-size:1.4em;}.history-back.unavailable:after{content: '⇦';color:#888;font-size:1.4em}.history-forward:after{content: '⇨';color:#fff;font-size:1.4em}.history-forward.unavailable:after{content: '⇨';color:#888;font-size:1.4em}.resource-info-show{background:none}.resource-info-show:after{content: 'ℹ';color: #fff;font-size: 14px;}.resource-info-show:hover{text-shadow: 0 0 4px #fff, 0 0 1px #fff}.x-close,.x-flip{background:none}.x-close:hover,.x-flip:hover{text-shadow: 0 0 4px #fff, 0 0 1px #fff}.x-close,.x-flip:after{margin-left:-5px;margin-top:-10px;font-weight:bold;content:'ⓧ';color:#fff;font-size:14px}.menu-check{background:none;width:0px;height:0px;margin-right:10px;}.selected .menu-check:after{content:'✔';margin-left:-5px;color:#fff}#sidebar-panes{background-color:#383838}.sidebar-section{border-bottom: 1px solid #000;background-color:#2a2a2a}.sidebar-section.expanded{background-color:#383838}.expander-title{color:#fff !important}a, a:visited, a:active, a:focus{color:skyblue}#selected-header{color:#fff;border-top:1px solid #fff}.corner-ad{background-color:#2a2a2a !important;color:#fff}#sidebar .corner-ad .sidebar-section{background-color:transparent;border-top: 1px solid #000}.search-fade-above{background:none !important}.sidebar-search{background-color:#2a2a2a; border-bottom:1px solid #000}#sidebar .ui-tabs-nav > li a {background-color: transparent}a.search-result,a.search-result:visited,a.search-result:hover {color:#999}.sidebar-label,.search-result .result-resource {color:#fff}.search-result .result-title{color:skyblue}.filtered-resource-count{color:#ccc !important}.toolbar .toolbar-cover-section:hover{text-shadow: 0 0 6px #fff,0 0 2px #fff}.toolbar .toolbar-cover-section img:hover{box-shadow: 0 0 6px 2px #fff}.library-heading{color:#fff}.library-list-item{background:-webkit-gradient(linear,left top,right top,from(rgba(255, 255, 255, 0)),to(rgba(255, 265, 255, .1)))!important;background:-moz-linear-gradient(left, rgba(255,255,255,0),rgba(255,255,255,.1)) !important}.library-item-title{color:#fff !important}.library-list-item:hover{border-radius:5px;background:rgba(255,255,255,.5) !important} div[id^='ascrail'] div {background-color:#F25A1E !important;border-color:#000 !important;}";
  } else {
    localStorage['bibliacolourscheme']='default';
    styleEl.innerHTML = "";
  }
  
}, false);

if (localStorage['bibliacolourscheme'] == "dark") {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  bbEl.dispatchEvent(evt);
} 
