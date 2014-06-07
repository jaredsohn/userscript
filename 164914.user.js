// ==UserScript==
// @name        trakt calendar subtitles
// @namespace   kra
// @include     *trakt.tv/calendar*
// @version     1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var srticon = "data:image/gif;base64,R0lGODlhDgAOANUwAOHkD/7+/tDeGHK/RH7DPrvXIfv6+/b29t3e3vz8/Pb29fLz86TPLPHx8P39/ejp6enq6/z7++7v7+/w8Pj496TQK+Lj4pDJNvv7++zs7Pf395DINebm5fn5+f39/u3t7dna2ubn5+Pk5O7oCevr69/g3/P09OLkD/Ly8f7//u7oCtDeF8HBwTY2Nnx8fP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAOAA4AAAZuQJdwOIQZja6Xcpl0HWFJEMISIiVfTuSrJHp8GsRjkgORLA6slrqlzUxMFIynNRiwoS+UopMIvFoEBHdJGgYOSy0bF4MvEX6IDBWMKYhqBQVrV4gCKyucKy1JLKOjLQAnAABsREQtKiN3T7JqR0EAOw==";

check = document.getElementById("calendar-layout");
banners = check.getElementsByTagName("option")[0];
grid = check.getElementsByTagName("option")[1];
episodes = check.getElementsByTagName("option")[2];

if (banners.hasAttribute('selected') || grid.hasAttribute('selected')){

var links = document.links;

    for (i = 0; i < links.length; i++) { 

	   if (links[i].href.indexOf("/show/") != -1){
	
	        container = links[i].href;
	        splt = container.split("/");
	        show = splt[4].replace(/-/g,' ');
	        episode = links[i].getElementsByClassName("on-tonight")[0].innerHTML;
			
			srtbg = document.createElement("div");
			srtbg.className ='srtbg';
			
			srtsearch = document.createElement("a");
			srtsearch.href = 'http://www.addic7ed.com/search.php?search=' + show +' '+ episode;
			srtsearch.setAttribute("target","_blank");
			srtsearch.innerHTML = "<img title='Search For Subtitles' src=" + srticon + " border='0'>";
			
			srtbg.appendChild(srtsearch);
			links[i].appendChild(srtbg);
			
	   }
    }	
}

if (banners.hasAttribute('selected')){
addGlobalStyle('.srtbg { padding: 26px 232px 0 5px; opacity: 0.05; float:left !important; margin-left: -255px; margin-top: 12px;  }');
addGlobalStyle('.srtbg:hover { opacity: 0.95; }');
}

if (grid.hasAttribute('selected')){
addGlobalStyle('.srtbg { padding: 52px 100px 0 5px; opacity: 0.05; float:left !important; margin-top: -74px; }');
addGlobalStyle('.srtbg:hover { opacity: 0.95; }');
}

if (episodes.hasAttribute('selected')){

addGlobalStyle('.episodesrtbg { padding: 104px 198px 3px 5px; opacity: 0.05; float:left !important; margin-top: -122px; }');
addGlobalStyle('.episodesrtbg img { width:14px !important; height:14px !important; }');
addGlobalStyle('.episodesrtbg:hover { opacity: 0.95; }');
addGlobalStyle('.on.on-tonight { width: 100px !important; margin-left: 110px !important; }');

    	var episodescalendar = document.evaluate('//div[contains(@class,"episodes-listing-episode")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		function getfullname(link)
	{
	        
	        scren = link.getElementsByTagName("a")[1];
	        show = link.getElementsByTagName("a")[2].innerHTML;
	        episode = link.getElementsByTagName("span")[0].innerHTML;
	
			episodesrtbg = document.createElement("div");
			episodesrtbg.className ='episodesrtbg';
			
			episodesrtsearch = document.createElement("a");
			episodesrtsearch.href = 'http://www.addic7ed.com/search.php?search=' + show +' '+ episode;
			episodesrtsearch.setAttribute("target","_blank");
			episodesrtsearch.innerHTML = "<img title='Search For Subtitles' src=" + srticon + " border='0'>";
					
			episodesrtbg.appendChild(episodesrtsearch);
			scren.appendChild(episodesrtbg);
	}
		
		for (var i=0; i<episodescalendar.snapshotLength; i++)
		getfullname(episodescalendar.snapshotItem(i));
}