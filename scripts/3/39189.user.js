// ==UserScript==
// @name           RT Re-Direct
// @namespace      http://jwvmods.com/blog
// @include        *.roosterteeth.com/*
// @version        1.1
// ==/UserScript==

//Start Site Var's
var rt = "www";
var rvb = "rvb";
var ah = "ah";
//End Site Var's

//Get Current Location
var l = document.URL;

//Choose Preferred Site (Default Set to RT)
var p = rt;
//Stop Choosing Preferred Site?

//Stuff You Shouldn't Edit (FYI)
var splitUrl = l.split(".");

if(splitUrl[0] != "http://" + p && splitUrl[0] != "https://" + p){
    document.location.href = document.URL.replace(document.domain, p + ".roosterteeth.com");
}