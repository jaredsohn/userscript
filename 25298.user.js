// ==UserScript==
// @name           Kohanaphp.pl - no orange theme
// @namespace      http://forum.kohanaphp.pl/
// @description    change style on forum.kohanaphp.pl 
// @include        http://forum.kohanaphp.pl/
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

addGlobalStyle(
'a:link { color: #476C8E; text-decoration: none; }' +
'a:visited { color: #476C8E; text-decoration: none; }' +
'a:hover { text-decoration: underline; }' +
'.nav, .nav:link, .nav:visited { color: #000000; text-decoration: none; }' +
'a.nav:hover { color: #cc3333; text-decoration: underline; }' +
'table { empty-cells: show; }' +
'body, td, th , tr { color: #000000; font-size: small; font-family: verdana, sans-serif; }' +
'body { background-color: #E5E5E8; margin: 0px; padding: 12px 30px 4px 30px; }' +
'input, textarea, button { color: #000000; font-family: verdana, sans-serif; }' +
'input, button { font-size: 90%; }' +
'textarea { font-size: 100%; color: #000000; font-family: verdana, sans-serif; }' +
'input.check { }' +
'select { font-size: 90%; font-weight: normal; color: #000000; font-family: verdana, sans-serif; }' +
'hr, .hrcolor { height: 1px; border: 0; color: #666666; background-color: #666666; }' +
'a img { border: 0; }' +
'.quote { color: #000000; background-color: #D7DAEC; border: 1px solid #000000; margin: 1px; padding: 1px; font-size: x-small; line-height: 1.4em; }' +
'.code { color: #000000; background-color: #dddddd; font-family: "courier new", "times new roman", monospace; font-size: x-small; line-height: 1.3em; border: 1px solid #000000; margin: 1px auto 1px auto; padding: 1px; width: 99%; white-space: nowrap; overflow: auto; max-height: 24em; }' +
'.quoteheader, .codeheader { color: #000000; text-decoration: none; font-style: normal; font-weight: bold; font-size: x-small; line-height: 1.2em; }' +
'.help { cursor: help; }' +
'.meaction { color: red; }' +
'.editor { width: 96%; }' +
'.highlight { background-color: yellow; font-weight: bold; color: black; }' +
'.windowbg { color: #000000; background-color: #ECEDF3; }' +
'.windowbg2 { color: #000000; background-color: #F6F6F6; }' +
'.windowbg3 { color: #000000; background-color: #E0E1E8; }' +
'.calendar_today { background-color: #FFFFFF; }' +
'.titlebg, tr.titlebg th, tr.titlebg td, .titlebg2, tr.titlebg2 th, tr.titlebg2 td { color: black; font-style: normal; background: url(images/titlebg.jpg) #E9F0F6 repeat-x; border-bottom: solid 1px #9BAEBF; border-top: solid 1px #FFFFFF; padding-left: 10px; padding-right: 10px; }' +
'.titlebg, .titlebg a:link, .titlebg a:visited { font-weight: bold; color: black; font-style: normal; }' +
'.titlebg a:hover { color: #404040; }' +
'.titlebg2 a:link, .titlebg2 a:visited { color: black; font-style: normal; text-decoration: underline; }' +
'.titlebg2 a:hover { text-decoration: underline; }' +
'.catbg , tr.catbg td , .catbg3 , tr.catbg3 td { background: url(images/catbg.jpg) #88A6C0 repeat-x; color: #ffffff; padding-left: 10px; padding-right: 10px; }' +
'.catbg2 , tr.catbg2 td { background: url(images/catbg2.jpg) #A1BFD9 repeat-x; color: #ffffff; padding-left: 10px; padding-right: 10px; }' +
'.catbg, .catbg2, .catbg3 { border-bottom: solid 1px #375576; }' +
'.catbg, .catbg2 { font-weight: bold; }' +
'.catbg3, tr.catbg3 td, .catbg3 a:link, .catbg3 a:visited { font-size: 95%; color: white; text-decoration: none; }' +
'.catbg a:link, .catbg a:visited , .catbg2 a:link, .catbg2 a:visited { color: white; text-decoration: none; }' +
'.catbg a:hover, .catbg2 a:hover, .catbg3 a:hover { color: #e0e0ff; }' +
'.bordercolor { background-color: #ADADAD; padding: 0px; }' +
'.tborder { padding: 1px; border: 1px solid #696969; background-color: #FFFFFF; }' +
'.smalltext { font-size: x-small; font-family: verdana, sans-serif; }' +
'.middletext { font-size: 90%; }' +
'.normaltext { font-size: small; }' +
'.largetext { font-size: large; }' +
'.post, .personalmessage { width: 100%; overflow: auto; line-height: 1.3em; }' +
'.signature { width: 100%; overflow: auto; padding-bottom: 3px; line-height: 1.3em; }' +
'.error { color: red; }' +
'.maintab_first, .maintab_back, .maintab_last, .maintab_active_first, .maintab_active_back, .maintab_active_last { color: white; text-transform: uppercase; vertical-align: top; }' +
'.maintab_back, .maintab_active_back { color: white; text-decoration: none; font-size:  9px; vertical-align: top; padding: 2px 6px 6px 6px; font-family: tahoma, sans-serif; }' +
'.maintab_first { background: url(images/maintab_first.gif) left bottom no-repeat; width: 10px; }' +
'.maintab_back { background: url(images/maintab_back.gif) left bottom repeat-x; }' +
'.maintab_last { background: url(images/maintab_last.gif) left bottom no-repeat; width: 8px; }' +
'.maintab_active_first { background: url(images/maintab_active_first.gif) left bottom no-repeat; width: 6px; }' +
'.maintab_active_back { background: url(images/maintab_active_back.gif) left bottom repeat-x; }' +
'.maintab_active_last { background: url(images/maintab_active_last.gif) left bottom no-repeat; width: 8px; }' +
'.maintab_back a:link , .maintab_back a:visited, .maintab_active_back a:link , .maintab_active_back a:visited { color: white; text-decoration: none; }' +
'.maintab_back a:hover, .maintab_active_back a:hover { color: #e0e0ff; text-decoration: none; }' +
'.mirrortab_first, .mirrortab_back, .mirrortab_last, .mirrortab_active_first, .mirrortab_active_back, .mirrortab_active_last { color: white; text-transform: uppercase; vertical-align: top; }' +
'.mirrortab_back, .mirrortab_active_back { color: white; text-decoration: none; font-size: 9px; vertical-align: bottom; padding: 6px 6px 2px 6px; font-family: tahoma, sans-serif; }' +
'.mirrortab_first { background: url(images/mirrortab_first.gif) no-repeat; width: 10px; }' +
'.mirrortab_back { background: url(images/mirrortab_back.gif) repeat-x; }' +
'.mirrortab_last { background: url(images/mirrortab_last.gif) no-repeat; width: 6px; }' +
'.mirrortab_active_first { background: url(images/mirrortab_active_first.gif) no-repeat; width: 6px; }' +
'.mirrortab_active_back { background: url(images/mirrortab_active_back.gif) repeat-x; }' +
'.mirrortab_active_last { background: url(images/mirrortab_active_last.gif) no-repeat; width: 8px; }' +
'.mirrortab_back a:link , .mirrortab_back a:visited, .mirrortab_active_back a:link , .mirrortab_active_back a:visited { color: white; text-decoration: none; }' +
'.mirrortab_back a:hover, .mirrortab_active_back a:hover { color: #e0e0ff; text-decoration: none; }' +
'#ajax_in_progress { background: #32CD32; color: white; text-align: center; font-weight: bold; font-size: 18pt; padding: 3px; width: 100%; position: fixed; top: 0; left: 0; }' 
); 
// ChangeLog
// 2008-04-16 - 0.1
//
