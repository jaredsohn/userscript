// ==UserScript==
// @name           UrbanDead Plain Looking
// @namespace      http://userscripts.org/scripts/show/47893
// @description    Makes UrbanDead display very plainly
// @version        Version 0.1a
// @include        http://www.urbandead.com/*
// @include        http://urbandead.com/*
// @exclude        http://wiki.urbandead.com/*
// ==/UserScript==

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle("a {color: #0000FF ! important ;}");
addStyle("a.plink {color: #0000FF;}");
addStyle("body {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle("h1 {background: #DDDDDD ! important; padding:2px; border:2px solid #000000;}");
addStyle("h2 {background: #DDDDDD ! important; padding:2px; border:2px solid #000000;}");
addStyle("input.m {color: #000000 !important;}");
addStyle("input.sum {background: #FFFFFF ! important; color: #000000 ! important}");
addStyle("i.ls {color: #FFFFFF !important;}");
addStyle("i.lsfe {color: #FFFFFF !important;}");
addStyle("li.buy {color: #FFFFFF !important;}");
addStyle("span.m {padding: 2px ! important;}");
addStyle(".a {background: #EEEEEE ! important; color: #000000 ! important; line-height:15px;}");
addStyle(".apw {background: #DDDDDD ! important;}");
addStyle(".cac {background: #EEEEEE  ! important; color: #000000 !important; border:2px outset #000000;}");
addStyle(".cps {background-color:#FFFFFF ; color:#000000;}");
addStyle(".fe {background: #DDDDDD ! important; color: #000000 ! important;}");
addStyle(".fnews {background: #DDDDDD ! important; color: #000000 ! important; border:2px solid #000000; padding:6px;}");
addStyle(".gt {background: #DDDDDD ! important; color: #000000 ! important; padding:4px; border:1px solid #000000;}");
addStyle(".gp {background: #DDDDDD ! important; padding:8px; border:1px solid #000000;}");
addStyle(".lob {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle(".sb {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle(".spref {background: #DDDDDD ! important; border:1px solid #000000;}"); //profile page
addStyle(".slim {background: #EEEEEE ! important; border:1px solid #000000;}");
addStyle(".y {background: #FFFFFF ! important; color: #000000 ! important; padding:2px;}");
addStyle("td.gp table tr td {border-bottom-style: none ! important;}"); //make "Urban Dead Item Combiner, Organizer and Sorter" formating match our theme

// Writes CSS to the document
writeStyle(css);