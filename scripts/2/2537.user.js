// ==UserScript==
// @name        Slashdot: skin by Pertinax
// @namespace   
// @description I took "Slashdot: italics swap, topics skin" one step further and just went ahead and redid the entire front page. I like it a lot and I may go deeper into the site.
// @include     http://slashdot.org/*
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

// left column
var links_title = "#000000";
var links_title_bg = "#cccccc";
var links_title_border_bot = "#aaaaaa";
var links_content_bg = "#cccccc";
var links_link = "#004400";

// right column
var slashbox_title = "#000000";
var slashbox_title_bg = links_title_bg;
var slashbox_title_border_bot = links_title_border_bot;
var slashbox_content_bg = links_content_bg;
var slashbox_link = links_link;

// article
var col_primary = "#006666";
var details_text = "#cae6e6";
var details_link = "#e6e6ca";
var image_bg = "#ffffff";// changing this will probably reveal aliasing
var intro_bg = "#b2cccc";
var intro_border1 = "#004747";
var intro_border2 = "#008585";
var intro_text = "#555555";
var intro_quote = "#000000";
var intro_link = "#414C1C";

// article links (read more, etc)
var storylinks_bg = "#004d4d";
var storylinks_text = details_text;
var storylinks_link = details_link;
var col_fade1 = "#006666";
var col_fade2 = "#002828";


addGlobalStyle(

"div #links div.block { background-color: "+links_content_bg+"; }"+
"div #links .title { color: "+links_title+"; text-align: center; position: relative; left: 5%; width: 90%; border-bottom: 3px solid "+links_title_border_bot+";background: "+links_title_bg+"; }"+
"div #links .content { font-size: 11px; background: "+links_content_bg+"; }"+
"div #links a { color: "+links_link+"; text-decoration: none; }"+
"div #links a:hover { color: "+links_link+"; text-decoration: underline; }"+
"div #links a:visited { color: "+links_link+"; text-decoration: none; }"+
"div #links .title a { color: "+links_title+"; text-decoration: none; }"+
"div #links .title a:hover { color: "+links_title+"; text-decoration: underline; }"+
"div #links .title a:visited { color: "+links_title+"; text-decoration: none; }"+
"div #links .title h4 { font-weight: bold; font-size: 12px; font-family: sans-serif; color: "+links_title+"; }"+

"#slashboxes div.block { font-size: 14px; border: 3px solid "+slashbox_title_bg+"; background: "+slashbox_content_bg+"; }"+
"#slashboxes div.title { color: "+slashbox_title+"; text-align: center; position: relative; left: 5%; width: 90%; border-bottom: 3px solid "+slashbox_title_border_bot+"; background: "+slashbox_title_bg+"; }"+
"#slashboxes div.title h4 { font-weight: bold; font-size: 12px; font-family: sans-serif; color: "+slashbox_title+"; }"+
"#slashboxes div.title a { color: "+slashbox_title+"; text-decoration: none; }"+
"#slashboxes div.title a:hover { color: "+slashbox_title+"; text-decoration: underline; }"+
"#slashboxes div.title a:visited { color: "+slashbox_title+"; text-decoration: none; }"+
"#slashboxes a { color: "+slashbox_link+"; text-decoration: none; }"+
"#slashboxes a:hover { color: "+slashbox_link+"; text-decoration: underline; }"+
"#slashboxes a:visited { color: "+slashbox_link+"; text-decoration: none; }"+

".article { background-color: "+col_primary+"; }"+
".article div.generaltitle div.title { background: "+col_primary+" url('//images.slashdot.org/slc.gif') top left no-repeat; }"+
".article .body { background-color: "+col_primary+"; }"+
".article .details { color: "+details_text+"; font-size: 14px; background: "+col_primary+"; padding: 0px 0px 0px 20px; }"+
".article .details a { text-decoration: none; color: "+details_link+"; }"+
".article .details a:hover { text-decoration: underline; color: "+details_link+"; }"+
".article .details a:visited { text-decoration: none; color: "+details_link+"; }"+
".article .intro { border-right: 2px solid "+intro_border2+"; border-top: 2px solid "+intro_border2+"; border-left: 2px solid "+intro_border1+"; border-top: 2px solid "+intro_border1+"; position: relative; left: 1%; background-color: "+intro_bg+"; width: 95%; padding: 10px; color: #"+intro_text+"; font-style: italic; line-height: 110%; }" +
".article .intro a { color: "+intro_link+"; text-decoration: none; }" +
".article .intro a:hover { text-decoration: underline; }" +
".article .intro i { color: #000000; font-style: normal; }" +

"div.storylinks { font-size: 14px; color: "+storylinks_text+"; border-top: 10px solid "+col_fade1+"; border-bottom: 5px solid "+col_fade2+"; padding: 3px; position: relative; top: -17px; background-color: "+storylinks_bg+"; }"+
"div.storylinks a { text-decoration: none; color: "+storylinks_link+"; }"+
"div.storylinks a:hover { text-decoration: underline; }"+
"div.storylinks a:visited { text-decoration: none; color: "+storylinks_link+"; }"+
"div.storylinks div { padding: 3px; }"+
"div.storylinks div ul { padding: 3px; }"+
""

);
