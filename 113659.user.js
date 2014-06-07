// ==UserScript==
// @name          Hide +You button on google
// @namespace     http://userscripts.org/users/406375
// @description   Just as name says, it hides annoying +You button
// @include       http://google.com/*
// @include       http://*.google.com/*
// @include       https://google.com/*
// @include       https://*.google.com/*
// ==/UserScript==

var aryClassElements = new Array();
function getElementsByClassName( strClassName, obj ) {
    if ( obj.className == strClassName ) {
        aryClassElements[aryClassElements.length] = obj;
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i] );
}
getElementsByClassName("gbt", document.body);
aryClassElements[0].style.display = "none";
// there is no arrow anymore
// document.getElementById("hplogoa").style.display = "none";
document.getElementById('gbprw').style.display = "none";
document.getElementById('gbzw').style.marginLeft = 0;