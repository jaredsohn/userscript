// ==UserScript==
// @name           Hide Scour navigation
// @description    Hide navigation elements from Scour.com website (top bar, points, feedback sidebar, footer). Now looks good, even on small screens. Also removes ads from top of search results and bottom frame when opening links (thanks to Nasty, the Villain).
// @include        http*://scour.com/*
// @include        http*://www.scour.com/*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	var cssMain = 'div#topbar, div#topcornerfeedback, div#footer, div.scour_points_container, div#featuredads {display:none; !important}';
	
	addGlobalStyle(cssMain);

	unsafeWindow.doVoteFrame = function doVoteFrame(index, url, title, domain)
	{
	  $('#viewresultformtitle').val(title);
	  $('#viewresultformurl').val(url);
	  $('#viewresultformquery').val(searcher.search_query);
	  $('#viewresultform').get(0).action = url;
	  
	  document.getElementById('viewresultform').submit();
	  return false;
	}

})()