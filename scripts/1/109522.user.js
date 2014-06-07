// ==UserScript==
// @name           	Go Directly To User Detail on SFDC
// @author			Eugene Niemand
// @namespace      	https://*.salesforce.com/*
// @include        	https://*.salesforce.com/*
// @version			1.1
// @description    	Redirects directly to User Detail instead of new Chatter User Profile on salesforce.com
// ==/UserScript==

function addJQuery(callback) {	
	if (window.location.toString().indexOf("salesforce.com/sfc") == -1) 
	{		
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
}

function AppendURL() {
	$("a[href^='/0056']").not("a[href$='edirect=1']").each( function() 
		{
			var href = $(this).attr("href");
			if (href.indexOf("?") != -1)
				$(this).attr("href", href + "&noredirect=1") 
			else
				$(this).attr("href", href + "?noredirect=1") 
		} );		
}

addJQuery(AppendURL);
