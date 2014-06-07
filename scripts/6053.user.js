// ==UserScript==
// @name          Bookmark Every Digg
// @description	  Adds bookmark links next to all digg entries to the most popular bookmarking sites(del.icio.us, furl etc.)
// @namespace     http://www.openjs.com/
// @include       http://digg.com/*
// @include       http://www.digg.com/*

//by Binny V A (http://www.openjs.com/)
// ==/UserScript==

(function() {
	var all_h3 = document.getElementsByTagName('h3');
	var h3 = new Array();
	for(var i=0; i<all_h3.length; i++) {
		if(all_h3[i].id.toString().match(/^title/)) {//The title of all post have an id like 'title0', 'title1' etc.
			h3.push(all_h3[i]);
		}
	}
	
	//Define all the social bookmarking sites here.
	var bookmarkers = [{
		name	: 'del.icio.us',
		favicon	: 'http://del.icio.us/favicon.ico',
		url		: 'http://del.icio.us/binnyva?v=2&noui=yes&jump=close&url=%URL%&title=%TITLE%&extended=%DESC%&tags=%TAGS%',
		width	: 700,
		height	: 250
	},{
		name	: 'Furl',
		favicon	: 'http://www.furl.net/i/favicon.gif',
		url		: 'http://www.furl.net/storeIt.jsp?t=%TITLE%&u=%URL%&r='+encodeURIComponent('http://www.digg.com')+'&c=%DESC%&keywords=%TAGS%',
		width	: 475,
		height	: 540
	},{
		name	: 'Ma.gnolia',
		favicon	: 'http://ma.gnolia.com/favicon.ico',
		url		: 'http://ma.gnolia.com/bookmarklet/popup/add?url=%URL%&title=%TITLE%&description=%DESC%&tags=%TAGS%',
		width	: 570,
		height	: 680
	}];
	
	
	for(var i=0; heading=h3[i], i<h3.length; i++) {
		//Get all data
		var link = heading.getElementsByTagName('a')[0];
		var url = link.href;
		var title = link.firstChild.nodeValue;
		var entry = heading.parentNode;
		var desc = entry.getElementsByTagName("p")[1].firstChild.nodeValue;
		
		if(entry.getElementsByTagName('span')[0].getElementsByTagName("a")[0]) {
			var tag = entry.getElementsByTagName('span')[0].getElementsByTagName("a")[0].firstChild.nodeValue; //Get the topic
		} else { //If it is a video file, an extra span will be added.
			var tag = entry.getElementsByTagName('span')[1].getElementsByTagName("a")[0].firstChild.nodeValue; //Get the topic
		}
		tag = tag.toLowerCase();
		
		//Create links
		for(var j=0; cur_book=bookmarkers[j], j<bookmarkers.length; j++) {
			var space = document.createTextNode(' ');
			var bookie = document.createElement('a');
			var bookmark_url = cur_book['url'].replace('%TITLE%',encodeURIComponent(title));
			bookmark_url = bookmark_url.replace('%URL%',encodeURIComponent(url));
			bookmark_url = bookmark_url.replace('%DESC%',encodeURIComponent(desc));
			bookmark_url = bookmark_url.replace('%TAGS%',encodeURIComponent(tag));

			bookie.setAttribute('href','javascript:var popup_'+i+'_'+j+'=window.open("'+bookmark_url+'","popup_'+i+'_'+j+'","width='+cur_book.width+',height='+cur_book.height+',resizable=yes");');
			var icon = document.createElement('img');
			icon.setAttribute('src',cur_book.favicon);
			icon.setAttribute('alt',cur_book.name);
			
			bookie.appendChild(icon);
			heading.appendChild(space);
			heading.appendChild(bookie);
		}
	}
})();
