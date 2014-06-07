// ==UserScript==
// @name           FWZ: IDC last.fm
// @namespace      ???
// @include        http://www.forumwarz.com/idc
// ==/UserScript==

lastfm_user = "";//set this as what your username on last.fm is

function get_lastfm(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://ws.audioscrobbler.com/1.0/user/"+lastfm_user+"/recenttracks.rss",
		onload: function(response) {
			parser=new DOMParser();
			xml=parser.parseFromString(response.responseText,"application/xml");
			add_text("is currently listening to: " + xml.getElementsByTagName('title')[1].textContent.replace(/ \W /," - "));
		}
	});
}

function add_text(line) {
	document.getElementById("boring_stuff").value = line;
	document.getElementById("lastfm_button").click();
}

var where, newElement;
where = document.getElementById('idc_form');
if (where) {
    newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "lastfm_button");
	newElement.setAttribute("onclick", "javascript: submitform()");
	newElement.setAttribute("type", "button");
	newElement.setAttribute("style", "visibility:hidden");
	newElement.innerHTML  = '<script type="text/javascript">function submitform(){if(document.forms[0].onsubmit()){document.forms[0].submit();}}</script>';
    where.parentNode.insertBefore(newElement, where.nextSibling);
	
	newElement = document.createElement('input');
	newElement.setAttribute("value", "Now Playing");
	newElement.setAttribute("id", "now_playing");
	newElement.setAttribute("type", "button");
	newElement.addEventListener('click', get_lastfm, false)
    where.parentNode.insertBefore(newElement, where.nextSibling);
}