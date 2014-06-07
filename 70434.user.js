	// ==UserScript==
	// @name           	reddit logo
	// @namespace      	reddit
	// @description    	Add a title ("mouse-over text") to the reddit logo for the most recent entry in /r/logo -- hopefully making it easier to discern the theme of the logo
	// @include        	http://www.reddit.com/*
	// @author			BauerUK
	// @url				http://reddit.com/user/BauerUK
	// ==/UserScript==
		
	
	var URL_JSON_LOGOSUBREDDIT		= "http://www.reddit.com/r/logo/.json";
	
	
	var redditLogo = document.getElementById("header-img");
	var redditLogoURL = redditLogo.getAttribute("src");
	
	// probably some custom sub-reddit logo
	if(redditLogoURL != "http://static.reddit.com/reddit.com.header.png") { return; }
	
	jsonRequest = new ajaxRequest();
	jsonRequest.open("GET", URL_JSON_LOGOSUBREDDIT, false);
	jsonRequest.send(null);
	
	jsonData = jsonRequest.responseText;
	var results = eval ("(" + jsonData + ")");

	lastLogoTitle = results.data.children[0].data.title;
	redditLogo.setAttribute("title", lastLogoTitle);
	
	/* 
	http://www.javascriptkit.com/dhtmltutors/ajaxgetpost.shtml 
	*/
	function ajaxRequest() {
		
		var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		
		if (window.ActiveXObject) {
			for (var i=0; i<activexmodes.length; i++){
				try { return new ActiveXObject(activexmodes[i]); } catch(e) {}
			}
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else {
			return false;
		}
		
	}