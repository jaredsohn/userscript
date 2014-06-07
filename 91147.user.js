// ==UserScript==
// @name           	Netflix Instant Queue Tab
// @description    	Adds a tab to the navigation bar linking directly to your Instant Queue.
// @include        	http://www.netflix.com/*
// @include         http://movies.netflix.com/*
// @author			Matthew Ammann
// @version		   	1.2
// @date 			8/21/11
// ==/UserScript==
	
var instantQ = document.createElement("li");
instantQ.innerHTML = '<a href="http://movies.netflix.com/Queue?qtype=ED" title="Instant Queue"><span>Instant Queue</span></a>';
instantQ.id = "instantQTab";
instantQ.setAttribute("class", "nav-item")
instantQ.setAttribute("id", "instantQTab")

var navBar = document.getElementById("top-nav");
var navMenu = document.getElementById("top-nav").getElementsByTagName("ul")[0];
var navRecs = document.getElementById("nav-recs");
var navKids = document.getElementById("nav-kids");
var navQ = document.getElementById("nav-queue");
var qs = document.location.search;

navQ.innerHTML = '<a href="http://movies.netflix.com/Queue?qtype=DD" title="DVD Queue"><span>DVD Queue</span></a>'

//This determines which queue is active and which tab to "highlight" based on the Query String
if(qs == "?qtype=ED")
{
	navQ.setAttribute("class", "nav-item");	
	instantQ.className = "nav-item nav-item-current";
}

navMenu.insertBefore(instantQ, navRecs);


//Change "Suggestions For You" to "Suggestions"
navRecs.getElementsByTagName("span")[0].innerHTML = '<span class="icon-star"></span> Suggestions';

//Removes "Just For Kids" tab
navKids.parentNode.removeChild(navKids);
