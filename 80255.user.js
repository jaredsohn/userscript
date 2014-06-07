// ==UserScript==
// @name           ActiveSearch
// @author		   Julijan Andjelic
// @namespace      www.anketta.info
// @description    aren't you annoyed by the way youtube search works? everytime you want to search your current video playback stops...well - not anymore!
// @include        *youtube.com/watch?v=*
// ==/UserScript==

//we wait for the window to load before we touch anything
window.addEventListener('load', function() {

	//first we add a new element where our search results will be listed
	//a good place for that is just above related videos
	document.getElementById('watch-sidebar').innerHTML='<div id="active-search"></div>'+document.getElementById('watch-sidebar').innerHTML;
	var ourSearch=document.getElementById('active-search');
	ourSearch.style.paddingLeft='15px';
	
	
	//okay now, let's tell the search button what to do and what not to do
	var searchButton=document.getElementsByClassName('search-button')[0];
	
	searchButton.innerHTML='ASearch';
	searchButton.removeAttribute('onclick');
	searchButton.addEventListener('click',activeSearch,false);
	
	//we shall do the same for enter-key search which is more likely to happen anyway
	//fortunately, youtube search uses a clasic form to submit your search, so we can just disable it
	document.getElementsByClassName('search-form')[0].addEventListener('submit', function(e) {e.stopPropagation(); e.preventDefault(); checkKey(e);}, false);
	
	//now lets bind an onkeyup event to the search box
	document.getElementById('masthead-search-term').addEventListener('keyup', checkKey, false);
	

}, false);


function activeSearch() {
	var searchTerm=encodeURIComponent(document.getElementById('masthead-search-term').value).replace('%20','+');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.youtube.com/results?search_query='+searchTerm,
		onload: function(data) {
			var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
			doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
			html.innerHTML = data.responseText;
			doc.appendChild(html);
			
			document.getElementById('active-search').innerHTML='<input type="button" value="Hide search results" onclick="document.getElementById(\'active-search\').innerHTML=\'\';" class="master-sprite yt-uix-button yt-uix-tooltip">&nbsp;<input type="button" value="Show video descriptions" onclick="if (actSearchDesc) {hideDescriptions(); actSearchDesc=0;} else {showDescriptions(); actSearchDesc=1;} return false;" class="master-sprite yt-uix-button yt-uix-tooltip" id="desc-toggle"><br><br>'+doc.getElementById('video_grid').innerHTML;
			
			//we will remove the video descriptions since long descriptions would make the search results look messy
			hideDescriptions();
			//add some padding to each video result
			for (i in document.getElementById('active-search').getElementsByClassName('video-entry')) {
				document.getElementById('active-search').getElementsByClassName('video-entry')[i].style.paddingBottom='15px';
			}
		}
	});
}

unsafeWindow.showDescriptions=showDescriptions;
unsafeWindow.hideDescriptions=hideDescriptions;

function hideDescriptions() {
	for (i in document.getElementById('active-search').getElementsByClassName('video-description')) {
		document.getElementById('active-search').getElementsByClassName('video-description')[i].style.display='none';
	}
	document.getElementById('desc-toggle').value='Show video descriptions';
}

function showDescriptions() {
	for (i in document.getElementById('active-search').getElementsByClassName('video-description')) {
		document.getElementById('active-search').getElementsByClassName('video-description')[i].style.display='block';
	}
	document.getElementById('desc-toggle').value='Hide video descriptions';
}

function checkKey(e) {
	if (e.which==13) {activeSearch();}
}

unsafeWindow.actSearchDesc=GM_getValue('desc_visible',0);
