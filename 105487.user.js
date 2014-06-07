// ==UserScript==
// @name           YouTube-Header Floating
// @namespace      PVPcTutorials
// @author         Simon
// @include        http://www.youtube.*/*
// @description    Lets the YouTube-Header (with logo, searchbox etc.) float
// @version        1.0.3
// ==/UserScript==


   
    document.getElementById("masthead-container").style.backgroundColor = "#FFFFFF" ;
    document.getElementById("masthead-container").style.marginLeft = "-50%";
    document.getElementById("masthead-container").style.position = "fixed";
    document.getElementById("masthead-container").style.zIndex = "5000";
    document.getElementById("masthead-container").style.left = "50%";
    document.getElementById("masthead-container").style.top = "0";
    document.getElementById("masthead-container").style.width = "100%";
    document.getElementById("masthead-container").style.border = "1px #333333";
    document.getElementById("content-container").style.position = "relative";
    document.getElementById("content-container").style.top = "60px";
    document.getElementById("content-container").style.marginLeft = "0px"; 
    document.getElementById("masthead-container").style.left = "50%";
    
    
    
    
