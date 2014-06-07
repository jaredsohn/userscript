// ==UserScript==

// @name           AddDeltaTab

// @namespace      addtab@kwierso.com

// @description    Adds a tab to Delta

// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*

// ==/UserScript==

(function()
{

	//title for new tab's header
	var tabtitle = "RTSE";
	//link for tab's header
	var titlelink = "/forum/viewTopic.php?id=2184252";
	
	//tab dropdown entries
		//use relative links to stay with this subdomain! (prevents the switching of your theme)
		//external links work as well!
	var item1 = "Bad Threads";
	var item1link = "/forum/viewTopic.php?id=2198434";
	var item2 = "Design Comments";
	var item2link = "/forum/viewTopic.php?id=2218277";
	var item3 = "Site Feature Suggestions";
	var item3link = "/forum/viewTopic.php?id=2218874";
	var item4 = "Delta Bugs";
	var item4link = "/forum/viewTopic.php?id=2216849";
	var item5 = "Site Bugs";
	var item5link = "/forum/viewTopic.php?id=2216684";
	
	
	//DON'T TOUCH ANYTHING BELOW THIS LINE!!!
	//--------------------------------------------------------------------------------------------------------------------------//
	
	//cuts off the end of the list of tabs, allowing us to directly insert  our new tab
	var tabs = document.getElementById("sddm");
	var arr = tabs.innerHTML.split("");
	var idx = tabs.innerHTML.length-5;
	arr.splice(idx,5);
	tabs.innerHTML = arr.join("");
	
	
	//remove the "href="+titlelink+" portion if you wish for the tab header to do nothing.
	tabs.innerHTML += "<li><a class='tabRoot' id='mlink7' href="+titlelink+" onmouseover='mopen(\"7\");' onmouseout='mclosetime();'>"+tabtitle+"</a>"+
			"<div id='m7' class='hold' style='border: 0pt none ; background: transparent none repeat scroll 0% 0%; padding-top: 0px; z-index: 210; width: 150px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; outline-color: -moz-use-text-color; outline-style: none; outline-width: 0pt;' onmouseover='mcancelclosetime()'>"+
			"<div style='visibility: inherit; position: static; z-index: 220;' onmouseover='mcancelclosetime()' onmouseout='mclosetime()'>"+
			
			//here's where we put our dropdown items into the tab
				//if you really want more items, just add variables up above named as "item4" and "item4link", 
				//and then copy/paste one of the following lines, changing the digits to match your new dropdown item
			"<a href="+item1link+">"+item1+"</a>"+
			"<a href="+item2link+">"+item2+"</a>"+
			"<a href="+item3link+">"+item3+"</a>"+
			"<a href="+item4link+">"+item4+"</a>"+
			"<a href="+item5link+">"+item5+"</a>"+
		
			//close out the list item
			"<span class='redBar'></span>"+
			"</div>"+
			"</div>"+
			"</li></ul>";
	
}
)();