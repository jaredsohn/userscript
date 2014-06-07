// ==UserScript==
// @name           google_blck
// @author         Christopher Wood ("http://www.google.com/profiles/alterjaz")
// @namespace      http://userscripts.org/scripts/69424
// @include        http://www.*google.com/*
// ==/UserScript==
var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf("#ssb")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf("#tbp")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf("#mbEnd")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf("#rhsline")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf(".gb1")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf(".gb3")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

var mysheet=document.styleSheets[0]
var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules
mysheet.crossdelete=mysheet.deleteRule? mysheet.deleteRule : mysheet.removeRule
for (i=0; i<myrules.length; i++){
if(myrules[i].selectorText.toLowerCase().indexOf(".gb4")!=-1){
mysheet.crossdelete(i)
i-- //decrement i by 1, since deleting a rule collapses the array by 1
}
}

function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}


function addGlobalStylehead(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalStylediv(css) {
    var div, style;
    head = document.getElementsByName('div')[0];
    if (!div) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStylehead('body {background-color: #000; color:#FFF; } a:link {color:#858585;}');
addGlobalStylediv('background-color: #000; color:#FFF;');

x = 'body {background-color: #000 !important; background-position:center; font-family:segoe ui !important; font-style: normal !important; color: #FFF;}';
x += 'a{color:#FFF}';
x += 'a:link(color:#FFF;}';
x += 'a:hover{color:#900 !important;}';
x += 'span.a{color:#FFF !important; bottom-border:1px solid;}';
x += 'table{background-color: #000 !important; bottom-border: 1px;}';
x += 'div{color:#fff;}';
x += 'td,.n a,.n a:visited{color:#FFF !important;}';
x += '#modules .yui-b, #modules,.yui-gb, #gbar, #guser, span { background-color: #000 !important;}';
x += '.w_ind, .tld{ color:#000 !important;}';
x += '#footer_promos {display: none !important;}';
x += 'th {color: #FFF !important;}';
x += '.bb{border-bottom:1px solid #FFF}';
x += '.bt{border-top:1px solid #FFF}';

GM_addStyle(x);
