// ==UserScript==
// @name           Google Search for WordPress.com support forums
// @namespace      torstenlandsiedel.de
// @description    Adds a Google Search Button in the WordPress.com Support Forums 
// @include        http://*.forums.wordpress.com/*
// @grant          none
// @version  	   0.1.3
// @updateURL      https://userscripts.org/scripts/source/99406.meta.js
// @downloadURL    https://userscripts.org/scripts/source/99406.user.js
// ==/UserScript==


/* Settings */
var newwindow = false; // Click on button opens a new window or not
var GoogleSearch = "Search with Google"; // insert here translation for your language

// Which language is the blog?
var domain = window.location.host;
var language = domain.substring(0, domain.indexOf('.')); 

/* css definitions */
var newcss = "#front-search input.inputButton { margin: 0 0 0 5px !important; padding-bottom: 24px !important; cursor: pointer; } "

/* css function */
function addGlobalStyle(css) //add the new CSS function
{
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) { return; }
	style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}

// Add CSS to global site
addGlobalStyle(newcss);


function OpenGoogleSearch() {
  Search = encodeURIComponent(document.forms.namedItem('front-search').elements.namedItem('q').value);
  if (newwindow == true) { GoogleWindow = window.open("http://www.google.de/#q=" + Search + "+site%3A" + language + ".forums.wordpress.com",  "_blank"); }
    else { GoogleWindow = window.open("http://www.google.de/#q=" + Search + "+site%3A" + language + ".forums.wordpress.com",  "_self"); }
  GoogleWindow.focus();
}

	// create Google Button
	var googlesearch = document.createElement('input');
	googlesearch.className = 'inputButton';
	googlesearch.setAttribute('type', 'button');
	googlesearch.setAttribute('value', GoogleSearch);
	googlesearch.addEventListener('click', OpenGoogleSearch, true); 
		
	// insert google button
	var ForumForm = document.getElementById('front-search').getElementsByTagName('p')[0];
	ForumForm.appendChild(googlesearch);