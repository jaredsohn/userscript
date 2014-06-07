// ==UserScript==
// @name           DarkTotse
// @namespace      none
// @description    DarkTotse
// @include        http://www.totse.com/*
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


addGlobalStyle("body{background: url('http://i12.tinypic.com/7xmrvo0.jpg'); ! important;}");

addGlobalStyle("a:active { color: #000000; text-decoration: none;} a:visited {color: #008080;} a:link {color: #008080;} a:hover {color: #ffffff; text-decoration: underline;}");

addGlobalStyle(".alt1, .alt1Active{background: #222222;color: #bababa;} .alt2, .alt2Active{background: #333333;color: #bababa;}");

addGlobalStyle(".page{background: #3c3c3c;color: #ffffff;}");

addGlobalStyle(".tborder{background: #E8EFF4;border: 1px solid #FFFFFF;}.tcat{background: #222222;color: #008080;}.tcat a:link, .tcat_alink{color: #ffffff;}.tcat a:visited, .tcat_avisited{color: #ffffff;}.tcat a:hover, .tcat a:active, .tcat_ahover{color: #FFFF66;text-decoration: underline;}.thead{background: #363434;	color: #008080;	font: bold 11px Verdana, Lucida, Arial, Helvetica, sans-serif;}.thead a:link, .thead_alink{	color: #008080;}.thead a:visited, .thead_avisited{color: #008080;}.thead a:hover, .thead a:active, .thead_ahover{color: #FFFF00;}.tfoot{background: #008080;color: #E0E0F6;font-size: 10px;}.tfoot a:link, .tfoot_alink{	color: #E0E0F6;}.tfoot a:visited, .tfoot_avisited{color: #E0E0F6;}.tfoot a:hover, .tfoot a:active, .tfoot_ahover{color: #FFFF66;}");

addGlobalStyle(".vbmenu_control{background: #222222;color: #008080;}.vbmenu_control a:link, .vbmenu_control_alink{color: #008080;}.vbmenu_control a:visited, .vbmenu_control_avisited{color: #008080;}.vbmenu_control a:hover, .vbmenu_control a:active, .vbmenu_control_ahover{color: #000000;}.vbmenu_popup{background: #ffffff;	color: #000000;}.vbmenu_option{	background: #464c47;color: #000000;}.vbmenu_option a:link, .vbmenu_option_alink{color: #d0d0d0;}.vbmenu_option a:visited, .vbmenu_option_avisited{color: #d0d0d0;}.vbmenu_option a:hover, .vbmenu_option a:active, .vbmenu_option_ahover{color: #FFFFFF;}.vbmenu_hilite{	background: #8A949E;	color: #ffffff;}.vbmenu_hilite a:link, .vbmenu_hilite_alink{color: #ffffff;text-decoration: none;}.vbmenu_hilite a:visited, .vbmenu_hilite_avisited{color: #FFFFFF;}.vbmenu_hilite a:hover, .vbmenu_hilite a:active, .vbmenu_hilite_ahover{color: #FFFFFF;}");

addGlobalStyle("a.navtop {color: #000000;font-weight: bold; margin-bottom: 1px; margin-top: 1px;text-align: right;}a.navtop:hover {color: #ffffff;}a.navtop:active {color: #000000;}");

addGlobalStyle("a.sinactive {color: #ffffff;}a.sinactive:hover {color: #000000;}.hottop {color: #FFFFFF;}a.hottop {color: #FFFFFF;}a.hottop:hover {color: #FFFFC0;}.hottext {color: #FFFFFF;}a.hottext {color: #FFFFFF;}a.hottext:hover {color: #FFFFC0;}");

function do_platypus_script() {
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/\/images\/t3\/0rm.jpg/,'http://i8.tinypic.com/8g8c68p.png',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/\/images\/t3\/0.gif/,'http://i8.tinypic.com/8g8c68p.png',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/\/images\/t3\/0cm.jpg/,'http://i8.tinypic.com/8g8c68p.png',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/\/images\/t3\/0cm.jpg/,'http://i8.tinypic.com/8g8c68p.png',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[4]/TD[2]/DIV[1]/DIV[1]/DIV[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<img title="Reply" src="images\/buttons\/reply.gif" alt="Reply" border="0">/,'<big><big>Post Reply</big></big>',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[4]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<img title="Reply With Quote" src="images\/buttons\/quote.gif" alt="Reply With Quote" border="0">/g,'Quote',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[4]/TD[2]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<img title="Post New Thread" src="images\/buttons\/newthread.gif" alt="Post New Thread" border="0">/,'<big><big>New Thread</big></big>',null);}; // Ends do_platypus_scriptwindow.addEventListener("load", function() { do_platypus_script() }, false);var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");function do_modify_html_it(doc, element, match_re, replace_string) {    match_re = new RegExp(match_re);    if (element.innerHTML) {element.innerHTML = element.innerHTML.replace(match_re, replace_string);    };};function platypus_do(win, func_name, o, other, other2, other3) {    var func = eval(func_name);    var doc = null;    if (func == null) return;    if (!o) {Warning(platypusplatypuscouldntfi1+func_name+platypusthisusuallyhappens);    };    doc = win.document;    func(doc, o, other, other2, other3);};//.user.js
