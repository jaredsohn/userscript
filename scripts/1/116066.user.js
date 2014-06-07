// ==UserScript==
// @name Wikipedia_v2
// @description    Cleaner and larger font. Auto-hide banners.
// @namespace http://www.greasespot.net/
// @include http://*.wikipedia.org/*
// @include http://processors.wiki.ti.com/*
// @include http://omappedia.org/*
// @include http://wiki.mobileread.com/*
// @updateURL      https://userscripts.org/scripts/source/116066.meta.js
// @downloadURL    https://userscripts.org/scripts/source/116066.user.js
// @version         1.0
// ==/UserScript==

var css = "p {font:14px Calibri,sans-serif;} " + 
          "a {font:14px Calibri,sans-serif;} " +  
          "h1 {font:14px Calibri,sans-serif;} " +  
          "h2 {font:14px Calibri,sans-serif;} " +  
          "li {font-size:110%;} " + 
          "tr {font-size:110%;} " + 
          "td {font-size:100%;} " + //100 since p increases font wherever required
          "td {font-family:Calibri,sans-serif;} " +
          "th {font-size:115%;} " + //100 since p increases font wherever required
          "th {font-family:Calibri,sans-serif;} " +
          "h1 {font-family:Calibri,sans-serif;} " +
          "h2 {font-family:Calibri,sans-serif;} " +
          "h3 {font-family:Calibri,sans-serif;} " +
          "h4 {font-family:Calibri,sans-serif;} " +
          "h5 {font-family:Calibri,sans-serif;} " +
          "div {font-size:103%;} " + //Will increase h1-h5
          "div {font-family:Calibri,sans-serif;} " +
          "li {font-size:115%;} " + 
          "li {font-family:Calibri,sans-serif;} ";  
          "body {font:14px Calibri,sans-serif;} ";  
function removeElement(baseId, childId) {
  var base = document.getElementById(baseId);
  if(base)
  {
    var child = document.getElementById(childId);
    if(child)
      base.removeChild(child);
  }
}

var css = 
          "body                      {font-family:Cambria,sans-serif;text-align:justify;} " +
          "body #bodyContent         {font-size:110%;} " +
          //"body #right-border        {margin-left:0px;margin-right:5em;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeF4FwTEBAAAAgjD7FzESWfjYdgwEoAJ4lTsaxgAAAABJRU5ErkJggg==);} " +
          //"body #right-border        {background-position: 100% 0%; background-repeat: repeat-y;} " +
          //"body #p-personal          {position:absolute;right:5em;top:0em;} " +
          "body #p-personal          {margin-right:5em;} " +
          "body #content             {background-color:#F3F3F3; margin-left:5em;margin-right:5em;} " +
          "body #mw-page-base        {margin-left:5em;margin-right:5em;height:5em;} " + 
          "body #mw-page-base        {background-position: 0% 32%; } " + //top-fade
          "body #content             {background-image:none; background-position: 0% 0%; background-repeat: no-repeat;} " +//remove def left-ver-bar 
          //"body #content             {border-style:solid; border-width:1px;border-color:#a7d7f9;} " +//contains left-ver-bar 
          "body #content             {border-style:solid; border-width:1px;border-color:#a7f7f9;} " +//contains left-ver-bar 
          "body #footer              {background-image:none; background-position: 0% 0%; background-repeat: no-repeat;} " +//remove def bot-hor-bar  
          "body #footer              {margin-left:5em;margin-right:5em;} " + 

          "body #mw-panel            {opacity:0; -moz-transition: all 400ms ease-in-out; -webkit-transition: all 400ms ease-in-out; background-color: #ffffff; width:5em; border-style:none;} "+
          "body #mw-panel:hover      {opacity:1;width:10em; border-style:solid; border-width:1px; border-left-style:none; border-color:#a7d7f9;} " +

          "body #mw-head-base        {background-color:#F6F6F6; height:0.1em; margin-left:5em; margin-right:5em;} " +
          "body #mw-head-base        {background-image:none; background-position: 0% 100%; background-repeat: no-repeat;} " +//remove def top-hor-bar 

          //"body #left-navigation     {position:absolute;left:5em;top:1em;} " +
          "body #left-navigation        {opacity:0; -moz-transition: all 400ms ease-in-out; -webkit-transition: all 400ms ease-in-out; margin-left:-5em; top:-1em;} " +
          "body #left-navigation:hover  {opacity:1; margin-left:-5em;top:1em;height:3.5em;} " +

          //"body #right-navigation    {position:absolute;right:5em;top:-1.5em;} " +
          "body #right-navigation       {opacity:0; -moz-transition: all 400ms ease-in-out; -webkit-transition: all 400ms ease-in-out; margin-right:5em; margin-top:-1em;} " +
          "body #right-navigation:hover {opacity:1; margin-right:5em; margin-top:1em; height:3.5em;} " +

          "body #mw-head             {opacity:0; -moz-transition: all 400ms ease-in-out; -webkit-transition: all 400ms ease-in-out; background-color: #ffffff; height:0.2em;} " +
          "body #mw-head:hover       {opacity:1; height:1.5em;border-style:solid; border-width:1px; border-top-style:none; border-color:#a7d7f9;} " +

          "body #firstHeading        {font-size:200%;} " +  
          "body #p-logo              {width: 5em;} " +  
          "body #p-logo a            {width: 5em; background-size: contain;} " +  
          "table.wikitable           {font-size:90%;} " +
          "table.infobox             {font-size:90%;} " ;
          
GM_addStyle(css);
var logo = document.getElementById('p-logo');
logo.setAttribute("style", "background-color: #ffffff;");


var sp1 = document.createElement("div");
// give it an id attribute called 'newSpan'
sp1.setAttribute("id", "right-border");

// Clone org content
var sp1_content = document.getElementById('content').cloneNode(true);
sp1_content.setAttribute("style", "margin-right:1px;padding-bottom:16px; padding-top:16px;");

//Remove org content
var org_content = document.getElementById('content');

// apply that content to the new element
sp1.appendChild(sp1_content);
var sp2 = document.getElementById("content");
var parentDiv = sp2.parentNode;
// insert the new element into the DOM before sp2
 