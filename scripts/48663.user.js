// ==UserScript==
// @name           widensmackjeevesform
// @namespace      wsjf@kwierso.com
// @description    asdf
// @include        http://www.smackjeeves.com/*
// ==/UserScript==

(function(){
    var formParent = document.forms.namedItem("search");
    formParent.getElementsByTagName("input")[1].style.width = '60px';
})();