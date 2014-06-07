// WebBlock v0.5
// (c) 2005, Clem
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          WebBlock
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   Block the browsing of every webpage for some seconds. Add the website you're allowed to browse in the exclude list so webblock won't popup!
// @include       *
// @exclude       http://www.mycompany.com/*
// @exclude       *.css
// @exclude       *.txt
// @exclude       *.js
// ==/UserScript==

(function () {
    var mintime = 3000;
    var wb_text = "You shouldn't be here! Go back working!";
    var timer = new Date();
    var overlay = document.createElement( "div" );
	overlay.setAttribute( "id", "wbReadScreen" ) 
	overlay.style.position = "absolute";
	overlay.style.backgroundColor = "white";
	overlay.style.color = "black";
	overlay.style.left = "5px";
	//overlay.style.width = (window.innerWidth-25) + "px";
    overlay.style.right = "5px";
    overlay.style.top = "5px";
    overlay.style.height = (window.innerHeight-10) + "px";
    //overlay.style.bottom = "5px";
    overlay.style.visibility = "visible";
    overlay.style.zIndex = "1000";
   
    overlay.innerHTML = "<div style='height: 10%; width: 90%;position: absolute; left: 5%; top: 45%;text-align:center;float : none;'><span style='line-height:40px;font-weight:bold;font-size:30px;font-family: verdana,helvetica,arial,sans-serif;color:black;'>"+wb_text+"</span><div id=\"wbTimer\" style='font-size:12px;font-family: verdana,helvetica,arial,sans-serif;color:black;'>x</div></div>";
	
	overlay.addEventListener( "click", wb_killwebblock, false );	
	document.body.appendChild( overlay );
    
	setTimeout(wb_timer,10);
	function wb_killwebblock( e )
	{
	    if ((new Date()).getTime() - timer.getTime()>mintime){
		  var overlay = document.getElementById( "wbReadScreen" );
		  overlay.style.visibility = "hidden";
		}
	}
	
	function wb_timer()
	{
		
		  var overlay = document.getElementById( "wbTimer" );
		  var x = Math.max(mintime-((new Date()).getTime() - timer.getTime()),0)/1000;
		  if (x != 0) {
		    overlay.innerHTML = x.toFixed(2) + " seconds...";
		    setTimeout(wb_timer,28);
		  } else
		    overlay.innerHTML = "Click to view!";
	}
})();