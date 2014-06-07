// ==UserScript==
// @name           GameTracker.com IP to Steam
// @version        1.0
// @namespace      www.gametracker.com
// @author         YousifUCV
// @description    Converts IPs in the search results to clickable links to Steam games.
// @include        http*.gametracker.com/server_info/*
// @include        http*.gametracker.com/search/*
// ==/UserScript==

/** Acknowledgments:
Replaces bgr's outdated script.
Some lines are built on bgr's script.
**/

if(document.URL.match(/gametracker\.com\/search\//i)) { //If its a search page

	var a = document.querySelectorAll("td.c08");

	for( i = 0; i < a.length; i++ ) {
		if (!((typeof(a[i].childNodes[2].innerHTML) == 'undefined'))) { //This if statement makes sure the Heading cell, "IP:Port", doesn't get edited. 
			a[i].innerHTML = "<a href=\"steam://connect/" + a[i].childNodes[1].innerHTML + a[i].childNodes[2].innerHTML + "\">" + a[i].childNodes[1].innerHTML + a[i].childNodes[2].innerHTML + "</a>";	
		}
	}
	
} else { //If its a server info page

	var ip = document.URL.match(/\d+\.\d+\.\d+\.\d+:\d+/); //Extracts the server address from the URL
	var a = document.querySelectorAll("span.blocknewheadercnt");
	
	var header = a[0].childNodes[2].data;  //The information from the header I'm targeting.
	var info = header.match(/[^0-9\.\s:-].+[^\n]/);  //Extracting whats after the hyphen.
	a[0].childNodes[2].data = "";  //Removing the information, to be replaced.
	
	var iplink = document.createElement('a');  //Creating the link element to the ip
	iplink.setAttribute('href', "steam://connect/" + ip);  //Attaching the URL
	a[0].appendChild(iplink);  //Appending the element to the bar area
	
	var iptext = document.createTextNode(ip);
	var servertext = document.createTextNode( " - " + info);
	a[0].childNodes[5].appendChild(iptext);	
	a[0].appendChild(servertext);
	
}