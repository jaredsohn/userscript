// ==UserScript==
// @name           Google Maps -> Kansalaisen Karttapaikka
// @namespace     http://kino.wippiespace.com/
// @description    Creates a link on a google maps page to open a same location in Kansalaisen Karttapaikka
// @include        http://local.google.com/*
// @include        http://maps.google.com/*
// @include        http://maps.google.fi/*
// @include        *.google.fi/maps*

// ==/UserScript==
// Based on a script by Josh Inge http://inge.org.uk/
// Author: Jukka Alander at gmail com
// Updated: 22.1.2011

(function() {
    
    function addGeoLink() {
	
        var target = document.getElementById('view_rss');
		
        if (target) {

			var kpaik = document.createElement("a");
			kpaik.id = "kpaik_linkki";
			kpaik.title = "Tuplaklikkaa oikeaan kohtaan ennen linkin käyttöä, toimii vain suomen alueella.";
			kpaik.href = "javascript: void(url = gApplication.getPageUrl()); if( url.search('&ll=') != -1 ) { url2 = url.slice(url.search('&ll=')+4); url = url2.slice(0,url2.search('&')); document.location = 'http://kansalaisen.karttapaikka.fi/kartanhaku/koordinaattihaku.html?srsName=EPSG%3A4258&y=' + url.replace(',','&x=');}";
			kpaik.innerHTML = "<span class=\"link-text\">Kansalaisen karttapaikka</span>&nbsp;";

			var separatornode = document.createElement("span");
			separatornode.innerHTML = "<img itelisätty class=\"bar-icon-divider bar-divider\" src=\"http://maps.gstatic.com/mapfiles/transparent.png\">";
			
			target.parentNode.insertBefore(kpaik, target);
			target.parentNode.insertBefore(separatornode, target);

		}
		
    }

    addGeoLink();
	
})();