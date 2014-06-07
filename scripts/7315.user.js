// GoogleJS for Greasemonkey
// Version 0.1
// Last updated: 28 Jan 07

// ==UserScript==
// @name          GoogleJS 0.1
// @description   Changes the appearance of Google
// @include       http://google.tld/
// @include       http://www.google.tld/
// @include       http://*.google.tld/
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
// --Body background--
addGlobalStyle('body { background: #346583 url(http://img260.imageshack.us/img260/3645/backrx4.jpg) ! important; }');
addGlobalStyle('body { background-repeat: repeat-x ! important; }')

// --Font colours--
addGlobalStyle('body { color: #FFFFFF ! important; }')

// --Link colours--
addGlobalStyle('a:link { color: #000066; text-decoration: none ! important; }')
addGlobalStyle('a:visited { text-decoration: none; color: #FFFFFF ! important; }')
addGlobalStyle('a:hover { text-decoration: underline; color: #FFFFFF ! important; }')
addGlobalStyle('a:active { text-decoration: none; color: #000066 ! important; }')

// --Input box/Buttons--
	//Button
addGlobalStyle('.input.btn { color:#ffffff; font-size:84%; font-weight:bold; background-color:#346583; border:1px solid #000 ! important; }')
	//Search
addGlobalStyle('input { color:#ffffff; font-weight:bold; background-color:#346583; border:1px solid ! important; }')

// --Header bar-- (Do not remove)
var logo = document.createElement("div");
logo.innerHTML = '<div align="center"><div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #346583; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    'GoogleJS Version 0.1-UK | Copyright (c) 2007 | Userscript by <a href="http://www.invinta.com">Invinta</a>' +
    '</p></div></div>';
document.body.insertBefore(logo, document.body.firstChild);

// --GoogleJS Logo--

var newLogoURL = "http://img157.imageshack.us/img157/4753/googleev3.png";
var newSearchURL = "http://img157.imageshack.us/img157/4753/googleev3.png";

window.getElementsByAttribute = function(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}

var logos = getElementsByAttribute(document.body, "img", "src", "/intl/en_uk/images/logo.gif");
if(logos != "") {
	logos[0].src = newLogoURL;
} else {
	logos = getElementsByAttribute(document.body, "img", "src", "/intl/en/logos/Logo_50wht.gif");
	if(logos != "") {	logos[0].src = newSearchURL; }
}