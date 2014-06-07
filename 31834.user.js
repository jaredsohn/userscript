// ==UserScript==
// @name           festzeit.ch scripte alles in einem by Plex
// @namespace      festzeit.ch underage
// @include        http://www.festzeit.ch/*
// ==/UserScript==

var all_links=document.getElementsByTagName("a");

function get(url, cb, cur_object) {
	GM_xmlhttpRequest({
	 method: "GET",
	 url: url,
	 onload: function(xhr) { cb(xhr.responseText, cur_object); }
	});
}

function set_alter(text, cur_object) {
	var ui=text.split(';');
	alter=ui[6].split('.')[0];
	cur_object.innerHTML+='('+alter+')';
	if(alter<1) {
		cur_object.style.color='red';
	}
}

for(var i=0; i< all_links.length; i++) {
	var link=all_links[i].href;

	Ergebnis = link.match(/member.php\?user=(.*)/);

	if(Ergebnis!=null) {
		var uid=Ergebnis[1];
		get('http://www.festzeit.ch/usrnfo.php?id='+uid, set_alter, all_links[i]);
	}
}

// ==UserScript==
// @name           festzeit.ch speed up infobox
// @namespace      festzeit.ch speed up infobox
// @include        http://www.festzeit.ch/*
// ==/UserScript==

unsafeWindow.fzusershow = function() {
	if(this){
		userelm=this;
	}	

	curn++;

	startload=userelm;
	curn++;
	setTimeout('loadinfo('+curn+')',50);
};


// ==UserScript==
// @name           festzeit.ch forward to profile after message
// @namespace      festzeit.ch forward to profile after message
// @include        http://www.festzeit.ch/memmsg.php*
// ==/UserScript==


var all_divs=document.getElementsByTagName("div");

for(var i=0; i< all_divs.length; i++)
	if(all_divs[i].innerHTML=="Deine Nachricht wurde abgeschickt!")
		document.location.href="http://www.festzeit.ch/member.php";

// ==UserScript==
// @name           festzeit.ch hide nametags by default
// @namespace      festzeit.ch hide nametags by default
// @include        http://www.festzeit.ch/viewpic.php*
// ==/UserScript==

unsafeWindow.togglent();