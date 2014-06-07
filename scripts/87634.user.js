// ==UserScript==
// @name         IMDB Interface Streamline
// @author       Arundor
// @namespace    http://arundor.does.not.have.a.website/
// @description  Makes IMBD's new interface easier to use.  Makes information about the content of the movie more prominent and ad stuff less prominent.
// @include      http://*imdb.com/title/*
// @include      http://*imdb.com/name/*
// ==/UserScript==

/*
Last edited August 24, 2012

Changes:
	August 24, 2012
	- Removed yet another ad from the top of the page.
	
	May 25, 2012
	- Fixed issue where the border surrounding the Photos section would not get moved along with the photos.
	- Fixed issue where NoScript users would see a shadow around the FAQ, Reviews and Message Board sections.
	
	May 22, 2012
	- The "People who liked this also liked" section is now moved down to the page to be after the "Details" section.
	- Removes the Amazon ad below the movie poster.
*/

//I am an amateur script writer.  What you see here is not necessarily the best way to achieve what has been done.

//Remove ad sidebar.
var sidebar1 = document.getElementById('maindetails_sidebar_top');
if (sidebar1) {
	sidebar1.style.display = 'none';
}
var sidebar2 = document.getElementById('maindetails_sidebar_bottom');
if (sidebar2) {
	sidebar2.style.display = 'none';
}

//Remove top ad.
var top_ad = document.getElementById('supertab');
if (top_ad) {
	top_ad.style.display = 'none';
}

//Remove additional top ads. This section new on August 24, 2012.
var top_rhs = document.getElementsByClassName('top-rhs')[0];
if (top_rhs) {
	top_rhs.style.display = 'none';
}

//Remove bottom ads.
var bottom_ad1 = document.getElementById('bottom_ad_wrapper');
if (bottom_ad1) {
	bottom_ad1.style.display = 'none';
}
var bottom_ad2 = document.getElementById('amazon-affiliates');
if (bottom_ad2) {
	bottom_ad2.style.display = 'none';
}

//Remove Amazon ad.
//This section is new on May 22, 2012.
var amazon_ad = document.getElementsByClassName('watch-bar')[0];
if (amazon_ad) {
	//The amazon ad can only be located by class name instead of id, so the search
	//is just to make sure that this code modifies the right section of the page,
	//in case imdb changes their layout in the future and re-uses that class name.
	if (amazon_ad.innerHTML.search(/class="watch-first-option only-option"/) != -1) {
		amazon_ad.style.display = 'none';
	}
}

//Increase width of main content section.
var main1 = document.getElementById('maindetails_center_top');
var main2 = document.getElementById('maindetails_center_bottom');
if (main1 && main2) {
	main1.style.width = '95%';
	main2.style.width = '95%';
}

//For NoScript users the FAQ section and everything below is too wide. Decrease the width to fix this.
//On the main movie pages this section is displayed inside an iframe (only if javascript is disabled) so this block of the script actually runs on the iframe source.
//This section updated on May 25, 2012.
var iframe_root = document.getElementsByClassName('redesign iframe')[0];
if (iframe_root) {
	iframe_root.style.width = '95%';
	iframe_root.style.marginLeft = '0px';
	iframe_root.style.boxShadow = '0 0 0 #ffffff'
}

var main_content = document.getElementById('maindetails_center_bottom');

//Move the Quick Links from the sidebar (which is now hidden) to the main content section.
var links = sidebar2.getElementsByClassName('aux-content-widget-3 links')[0];
if (links && main_content) {
	//If a clone is used then the links don't work for some reason, so instead the original is moved directly.
	//For some reason this doesn't work for some users so I should look for a better way to do this.
	main_content.insertBefore(links, main_content.firstChild);
}

if (main_content) {
	var url = parent.document.URL;

	if (url.indexOf('imdb.com/title') != -1) {
		//This section deals only with movie pages, as opposed to actor pages.
		//Get references to each of the main sections.
		var related_videos;
		var cast;
		var storyline;
		var details;
		var did_you_know;
		
		//Currently only some of these references are actually used but the structure of the script made it easy enough to get them all, so they're here in case I need them for future versions.
		var sections = main_content.getElementsByClassName('article');
		if (sections) {
			for (var i=0; i<sections.length; i++) {
				var heading = sections[i].getElementsByTagName('h2')[0];
				if (heading) {
					if (heading.innerHTML == 'Related Videos') { related_videos = sections[i]; }
					else if (heading.innerHTML == 'Cast') { cast = sections[i]; }
					else if (heading.innerHTML == 'Storyline') { storyline = sections[i]; }
					else if (heading.innerHTML == 'Details') { details = sections[i]; }
					else if (heading.innerHTML == 'Did You Know?') { did_you_know = sections[i]; }
				}
			}
		}
		
		//Move the photos to below 'Details'.
		var photos = document.getElementsByClassName('mediastrip_container')[0];
		if (photos) {
			//For some reason IMDB has two different formats for the Photos section, using one format for some movies and another format for other movies.
			//If the class of the parent node is 'article' it means the photos are surrounded by a border, so this section moves the border along with the photos.
			if (photos.parentNode.getAttribute('class') == 'article') {
				photos = photos.parentNode;
			}
			main_content.insertBefore(photos.cloneNode(true), did_you_know);
			photos.style.display = 'none';
		}
		
		//Move 'Related Videos' to be below 'Details'.
		if (related_videos && details) {
			main_content.insertBefore(related_videos.cloneNode(true), did_you_know);
			related_videos.style.display = 'none';
		}
		
		//Move 'People who liked this also liked' to be below 'Details'.
		//This section is new on May 22, 2012.
		var title_recs = document.getElementById('title_recs');
		if (title_recs) {
			var recommendations = title_recs.parentNode;
			main_content.insertBefore(recommendations, did_you_know);
		}
	}

	if (url.indexOf('imdb.com/name') != -1) {
		//This section deals only with actor pages, as opposed to movie pages.
		//Get references to each of the main sections.
		var known_for;
		var related_videos;
		var filmography;
		var personal_details;
		var did_you_know;
		
		var sections = main_content.getElementsByClassName('article');
		if (sections) {
			for (var i=0; i<sections.length; i++) {
				var heading = sections[i].getElementsByTagName('h2')[0];
				if (heading) {
					if (heading.innerHTML == 'Known For') { known_for = sections[i]; }
					else if (heading.innerHTML == 'Related Videos') { related_videos = sections[i]; }
					else if (heading.innerHTML == 'Filmography') { filmography = sections[i]; }
					else if (heading.innerHTML == 'Personal Details') { personal_details = sections[i]; }
					else if (heading.innerHTML == 'Did You Know?') { did_you_know = sections[i]; }
				}
			}
		}
		
		//Find the 'Projects In Development' section if it exists.
		var projects_in_development;
		var sidebar_sections = sidebar2.getElementsByClassName('aux-content-widget-2');
		if (sidebar_sections) {
			for (var i=0; i<sidebar_sections.length; i++) {
				var heading = sidebar_sections[i].getElementsByTagName('h3')[0];
				if (heading) {
					if (heading.innerHTML.indexOf('Projects In Development') != -1) {
						projects_in_development = sidebar_sections[i];
					}
				}
			}
			
			//Put a copy of the 'Projects in Development' section under 'Filmography'.
			if (projects_in_development) {
				main_content.insertBefore(projects_in_development.cloneNode(true), related_videos);
			}
		}
		
		//Move the photos to below 'Filmography'.
		var photos = document.getElementsByClassName('mediastrip_container')[0];
		if (photos) {
			main_content.insertBefore(photos.cloneNode(true), related_videos);
			photos.style.display = 'none';
		}
		
		//Move the 'Known For' section to be below 'Filmography'.
		if (known_for && filmography) {
			main_content.insertBefore(known_for.cloneNode(true), related_videos);
			known_for.style.display = 'none';
		}
	}
}
