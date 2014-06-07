// version 0.1 BETA!
// 2007-06-25
// Copyright (c) 2007, Chris Hardy
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Biffy Board Script
// @namespace     http://www.chrisntr.co.uk/biffy/
// @description   Biffy Board script - to make it look better.
// @include       http://www.biffyclyro.com/community/forum/*
// ==/UserScript==

document.getElementsByTagName("body")[0].style.background = "#26261e";
/*var img1 = document.getElementsByTagName("img");
for (var n = 1; n < img1.length; n++)
    {
      if (img1[n].getAttribute("src").indexOf("biffyclyro.com "))
       {
            img1[n].style.display= "none";
    }

    }
*/
var div1 = document.getElementsByTagName("div");
for (var n = 0; n < div1.length; n++)
    {
    if (div1[n].hasAttribute("style"))
    {
        if (div1[n].getAttribute("style").indexOf("overflow-x") >= 0)
    	{
                    div1[n].style.display= "none";
        }
        if (div1[n].getAttribute("style").indexOf("border-bottom") >= 0)
    	{
                    div1[n].style.borderBottom= "0px";
        }
    }
}

var div1 = document.getElementsByTagName("div");
for (var n = 0; n < div1.length; n++)
    {
    if (div1[n].hasAttribute("class"))
    {
        if (div1[n].getAttribute("class").indexOf("right") >= 0)
    	{

                    div1[n].style.display= "none";
        }
    }
}