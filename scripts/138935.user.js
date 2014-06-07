// ==UserScript==
// @id             tapuz maavaron
// @name           skip tapuz maavaron
// @version        1.0
// @namespace      
// @author         Ohad Cohen
// @description    skip tapuz maavaron page
// @include        http://www.tapuz.co.il/*
// @run-at         document-end
// ==/UserScript==
var link=document.getElementById("ctl00_ContentPlaceHolderMain_SkipLink");
if(link)
    link.click();