// ==UserScript==
// @name            الى العربيه (Travian translated) مترجم ترافيان
// @AHMEDOSAMA1.5@HOTMAIL.COM      translated
// @description    من النرويجية - العربية
// @version 3.5.1
// @include        http://*.travian.no/*
// ==/UserScript==

//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}";
cssStyle += "h1{font-family:arial;font-size:190%;}";
cssStyle += ".p1 label{float:right;}";
cssStyle += "#ltbw0{right:284px;}";
GM_addStyle(cssStyle);

var loc=window.location.href; // the current page href
var keys, str;
var lang_from = new Array();
var lang_hu = new Array();
var lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/ );

//alert('fos');

if(!lang) {
  lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop();
} else {
  lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
}

switch(lang){
case '.no':
//*/
lang_from[0]   = 'Карта деревни';

break;
}
lang_hu[0]   = 'خريطة القرية';

//lang_


var textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var titlenodes = document.evaluate(
    "//area[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    str = node.data;
    for (keys in lang_from) {
			  if (str == lang_from[keys]){
          str = str.replace(lang_from[keys],lang_hu[keys]);
        }
    }
    node.data = str;
}

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    str = node.data;
    for (keys in lang_from) {
          str = str.replace(lang_from[keys],lang_hu[keys]);
    }
    node.data = str;
}


for (var i = 0; i < titlenodes.snapshotLength; i++) {
    node = titlenodes.snapshotItem(i);
    str = node.getAttribute("title");
    //alert(str);
    for (keys in lang_from) {
        if (str == lang_from[keys]){
          str = str.replace(lang_from[keys],lang_hu[keys]);
        }
    }
    node.setAttribute("title",str);
}

for (var i = 0; i < titlenodes.snapshotLength; i++) {
    node = titlenodes.snapshotItem(i);
    str = node.getAttribute("title");
    //alert(str);
    for (keys in lang_from) {
          str = str.replace(lang_from[keys],lang_hu[keys]);
    }
    node.setAttribute("title",str);
}
