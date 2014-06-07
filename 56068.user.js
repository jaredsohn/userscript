
// ==UserScript==
// @name           NUMA Favorite Authors
// @namespace      http://userscripts.org/scripts/show/56068
// @description    Highlights maps made by authors you favorite, and has a page where you can view maps by only those authors. Keeps you updated when your favorite authors make new maps.
// @include        http://www.nmaps.net/*
// ==/UserScript==


// These two values are the highlighted version of the element backgrounds
sectionbg = "http://i27.tinypic.com/2nl8vf7.png";
sectionattribsbg = "http://i26.tinypic.com/1iy4bn.png";

// Prefix I use to distinguish the authors from the other values I set
fav_prefix = "favorite_";

// Regular expressions that'd probably be better to just put where they're used as they're mostly used just once
// These are location matches
re_author = /"\/user\/(.+?)"/;
re_browse = /http:\/\/www.nmaps.net\/browse.*/
re_map = /http:\/\/www.nmaps.net\/\d+/
re_profile = /http:\/\/www.nmaps.net\/user\/.*/
re_favoritepage = /http:\/\/www.nmaps.net\/browse\?q=(\$|%24)favorite_authors/
re_favuserlevels = /http:\/\/www.nmaps.net\/userlevels\?q=(\$|%24)favorite_authors/
re_userlevels = /http:\/\/www.nmaps.net\/userlevels\?q=.*/
re_urlstart = /&start=(\d+)/i
// These are for getting information from the pages
re_sections = /<div class="section">(.+?<\/div>.*?<div class="clear"><\/div>)/g
re_locationid = /href="\/(\d+)"/

// Get the user's name. Used to check whether to put the 'fav updates' notification or not, and for measuring how the top bar should be adjusted for it.
user = '';
try { user = document.getElementById("userinfo").getElementsByTagName("a")[0].innerHTML; }
catch (err) {}
if ( user == 'Log In' ) { user = 0; }

// Just initiates the favorite author maps' array, and an easily changed number of maps to take from each.
cmaps = new Array();
mapcount = 3;

// Nice function I pulled from the 'net, clears all of a given value from an array. I use it for 'undefined'.
Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {         
			this.splice(i, 1);
			i--;
		}
	}
  return this;
};

// Map comparer, sorts highest to lowest.
function sortMap(a, b) {
	ida = a.match(re_locationid)[1];
	idb = b.match(re_locationid)[1];
	return idb - ida;
}

// The following functions I pulled from the net for an Opera version of the GM functions, but renamed them and coded the listKeys (equivalent to GM_listValues()) myself.
function setValue(cookieName, cookieValue, lifeTime) {
	if( !cookieName ) { return; }
	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
}

function getValue(cookieName, oDefault) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) {
			try {
				eval('var footm = '+unescape( oneCookie[1] ));
			} catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
}

function listKeys() {
	retjar = new Array();
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		retjar.push(oneCookie[0]);
	}
	return retjar;
}

function deleteKey( oKey ) {
	setValue( oKey, '', 'delete' );
}


// checkPage... Probably should be renamed, but what it does is go through the page and highlight sections accordingly, putting toggle icons and such.
function checkPage(){
	replaceActiveAuthors();
	
	if ( location.href.match(re_browse) ) { // User's on the map listing page
		maps = document.getElementsByClassName("section");
		
		for (i = 0; i < maps.length; i++) {
			if ( maps[i].childNodes.length > 5 ) {
			target = maps[i].getElementsByClassName("formtable")[0].getElementsByTagName("td")[0];
			author = re_author.exec(target.innerHTML)[1];
			
			correctHighlight(author, maps[i]);
			addFavToggle(author, target); }
		}
	} else if ( location.href.match(re_map) ) { // User's on a single map page
		map = document.getElementsByClassName("section")[0];
		target = map.getElementsByClassName("formtable")[0].getElementsByTagName("td")[0];
		author = re_author.exec(target.innerHTML)[1];
		
		correctHighlight(author, map);
		addFavToggle(author, target);
	} else if ( location.href.match(re_profile) ) { // User's on a profile page
		section = document.getElementsByClassName("section")[0];
		target = section.getElementsByTagName("h2")[0];
		author = unescape(location.href.match("http://www.nmaps.net/user/(.+?)(/edit)?$")[1]);

		if ( location.href.match("http://www.nmaps.net/user/" + user + "$") ) { // User's on his own profile page
			clinktar = document.getElementsByClassName("attribs")[0];
			if ( clinktar.getElementsByTagName('a').length == 1 ) {
			clink = document.createElement('a');
			clink.href = "javascript:";
			clink.addEventListener("click", clearFavorites, false);
			clink.innerHTML = '<br />';
			clink.appendChild(document.createTextNode("Clear Favorite Authors"));
			
			clinktar.appendChild(clink); }

			formtable = document.getElementsByClassName("formtable")[0];
			ntr = document.createElement('tr');

			list = listKeys();
			for ( i = 0; i < list.length; i++ ) {
				if ( list[i].substr(0, fav_prefix.length) != fav_prefix ) {
					list.splice(i, 1);
					i--;
				} else {
					name = list[i].substr(fav_prefix.length);
					list[i] = '<a href="/user/' + name + '">' + name + '</a>'; 
				}
			}

			names = list.join(', ');

			ntr.innerHTML = '<th>Favorite Authors:</th><td>' + names + '</td>';
			formtable.getElementsByTagName('tbody')[0].appendChild(ntr);
		}
		
		correctHighlight(author, section);
		addFavToggle(author, target, true);
	}
}

// replacePage is the browse?q=$favorite_authors page handler. Starts up and does a request for each author, then when they're all collected, lists.
function replacePage() {
	emptysection = document.getElementsByClassName("emptysection")[0];
	placeholder = document.getElementsByClassName("section")[0];
	container = placeholder.parentNode;
	placeholder.style.display = 'none';
	
	page = "";
	setValue("requests_left", 0);
	list = listKeys();
	for ( i = 0; i < list.length; i++ ) {
		if ( list[i].substr(0, fav_prefix.length) != fav_prefix ) {
			list.splice(i, 1);
			i--;
		}
	}
	
	setValue("requests_left", list.length);
	
	loading = document.createElement('div');
	loading.className = 'emptysection';
	loading_h2 = document.createElement("h2");
	loading_h2.innerHTML = "Loading " + list.length + " author" + ((list.length - 1) ? "s" : "") + "...";
	if ( list.length == 0 ) { loading_h2.innerHTML = "No Favorite Authors"; }

	loading.appendChild(loading_h2);
	container.insertBefore(loading, placeholder);

	setValue("pending_authors", 0); 
	for (n = 0; n < list.length; n++) {
	name = list[n].substr(9,list[n].length);
	
	rp_httprequest = new XMLHttpRequest;
	rp_httprequest.onload = function(e) {
		setValue("requests_left", getValue("requests_left") - 1);
		loading_h2.innerHTML = "Loading " + getValue("requests_left") + " author" + ((getValue("requests_left") - 1) ? "s" : "") + "...";
		if (this.status == 200) { 
		page = this.responseText;
		author = page.match(/author:(.+?)"/)[1];
		latest = page.match(/\/(\d+)"/)[1];
		setFavorited(author, latest);
		
		str = page.replace(/\n/g,' ');
		
		presults = str.match(re_sections);
		if ( presults != null ) {
		for (i = 0; i < presults.length; i++) {
			cs = presults[i].substr(21,presults[i].length)
			cmaps[cmaps.length+1] = cs;
		} } }
		if ( getValue("requests_left") <= 0 ) { 
			cmaps.clean(undefined);
			cmaps = cmaps.sort(sortMap);
			cstart = location.href.match(re_urlstart);
			if ( cstart ) { cstart = parseInt(cstart[1]); } else { cstart = 0 };
			listFavoriteAuthors();
			
			container.removeChild(loading);
			checkPage(); 
		}
	};
	rp_httprequest.open("GET", "http://www.nmaps.net/browse?count=" + mapcount + "&q=author:" + name, true);
	rp_httprequest.send(null);}
}

function replaceUserLevels() {
	page = "";
	setValue("requests_left", 0);
	list = listKeys();
	for ( i = 0; i < list.length; i++ ) {
		if ( list[i].substr(0, fav_prefix.length) != fav_prefix ) {
			list.splice(i, 1);
			i--;
		}
	}
	
	setValue("requests_left", list.length);
	
	loading = document.createElement('div');
	loading.innerHTML = "Loading " + list.length + " author" + ((list.length - 1) ? "s" : "") + "...";
	if ( list.length == 0 ) { loading.innerHTML = "No Favorite Authors"; }

	document.body.appendChild(loading);

	setValue("pending_authors", 0); 
	for (n = 0; n < list.length; n++) {
	name = list[n].substr(9,list[n].length);
	
	rp_httprequest = new XMLHttpRequest;
	rp_httprequest.onload = function(e) {
		setValue("requests_left", getValue("requests_left") - 1);
		loading.innerHTML = "Loading " + getValue("requests_left") + " author" + ((getValue("requests_left") - 1) ? "s" : "") + "...";
		if (this.status == 200) { 
		page = this.responseText;

		maps = page.split("\n");
	
		for (i=0;i<maps.length;i++) {
			cmaps[cmaps.length+1] = maps[i];
		}
		}
		if ( getValue("requests_left") <= 0 ) { 
			cmaps.clean(undefined);
			page=cmaps.join("\n");

			pdata = document.createElement("div");
			pdata.innerHTML = '<pre style="word-wrap: break-word; white-space: pre-wrap;">' + page.replace("\n\n", "\n").replace("<", "&lt;").replace(">", "&gt;") + '</pre>';
			document.body.removeChild(loading);
			document.body.appendChild(pdata);			
		}
	};
	rp_httprequest.open("GET", "http://www.nmaps.net/userlevels?count=" + mapcount + "&q=author:" + name, true);
	rp_httprequest.send(null);}
}

// listFavoriteAuthors clears all of the sections (except for one, which it uses to place the favorite authors' maps) and replaces the page with up to 10 maps
function listFavoriteAuthors(){
	sections = document.getElementsByClassName("section");
	for ( i = 0; i < sections.length; i++ ) {
		if ( sections[i] != placeholder ) {
			container.removeChild(sections[i]); 
			i--; } }
	sections = document.getElementsByClassName("section");

	for ( i = cstart; ( i < (10+cstart) && i < cmaps.length ); i++ ) {
		ns = document.createElement('div');
		ns.innerHTML = cmaps[i];
		ns.className = 'section';
		
		container.insertBefore(ns, placeholder);
	}
	
	bp = document.getElementById("browseprev");
	bp.innerHTML = "";
	if ( cstart > 0 ) {
		plink = document.createElement('a');
		plink.href = "javascript:";
		plink.addEventListener("click", scrollFunction(-10), false);
		plink.innerHTML = "Previous 10";
		
		bp.appendChild(plink);
	}
	
	bn = document.getElementById("browsenext");
	bn.innerHTML = "";
	if ( (cstart + 10) < cmaps.length ) {
		nlink = document.createElement('a');
		nlink.href = "javascript:";
		nlink.addEventListener("click", scrollFunction(10), false);
		nlink.innerHTML = "Next 10";
		
		bn.appendChild(nlink);
	}
}

// Called when clicking "next" or "previous" at the bottom of the favorite authors page.
function scrollFunction(value){
	return function() {
		cstart += value;
		listFavoriteAuthors();
		self.scrollTo(0,0);
		checkPage();
	}
}

// Replaces the 'Active Authors' link with a link to the favorite authors page.
function replaceActiveAuthors() {
	links = document.getElementById("subsections").getElementsByTagName('a');
	for ( i=0; i < links.length; i++ ) {
		if ( links[i].innerHTML == "Active Authors" ) {
			if ( location.href.match(re_favoritepage) ) { links[i].className = 'selected'; }
			links[i].innerHTML = "Favorite Authors";
			links[i].href = "/browse?q=$favorite_authors";
			break;
		}
	}
}

// Clears any previously placed toggles, and puts a new toggle button.
function addFavToggle(author, target, profile) {
	link = document.createElement('a');
	link.href = "javascript:";
	link.addEventListener("click", toggleFavorited(author), false);
	link.style.paddingRight = '0px';
	
	pl = target.getElementsByTagName('a');
	(profile) ? po = 0 : po = 1;
	if ( pl.length > po ) { target.removeChild(pl[0]); }
			
	if ( getFavorited(author) ) {
		link.className = "remtag";
	} else {
		link.className = "addtag";
	}
	target.innerHTML += " ";
	target.insertBefore(link, target.firstChild);
}


// The actual function that toggles between favorited or not.
function toggleFavorited(author) {
	if ( getFavorited(author) ) {
		return function () {
			setFavorited(author, false);
			checkPage();
		}
	} else {
		return function () {
			setFavorited(author, 1);
			checkPage();
		}
	}
}

// Higher method of setting a favorited value. If the value is 'false' it deletes the key instead.
function setFavorited(author, value) {
	if ( value ) { setValue(fav_prefix + author.toLowerCase(), value);
	} else { 
		if ( getFavorited(author) == -1 ) { setValue("pending_authors", getValue("pending_authors") - 1); }
		deleteKey(fav_prefix + author.toLowerCase()); 
	}
}

// Higher method of getting a favorited author. 
function getFavorited(author) {
	return getValue(fav_prefix + author.toLowerCase());
}

// A single function to call that's easier to use than checking each time to correctly highlight the given section
function correctHighlight(author, target) {
	if ( getFavorited(author) ) {
		highlightSection(target);
	} else {
		unhighlightSection(target);
	}
}

// Sets the CSS style of the given section, and changes the accompanying 'attribs'
function highlightSection(section) {
	section.style.backgroundImage = "url(" + sectionbg + ")"; 
	if (location.href.match("http://www.nmaps.net/browse*")) { 
		section.getElementsByTagName("table")[0].style.backgroundImage = "url(" + sectionattribsbg + ")"; 
	} else {
		if ( section.getElementsByClassName("attribs")[0] ) {
			section.getElementsByClassName("attribs")[0].style.backgroundImage = "url(" + sectionattribsbg + ")"; 
		}
	}
}

// Returns the CSS style of the given section back to the original NUMA style
function unhighlightSection(section) {
	section.style.backgroundImage = "url('/static/sectionbg.png')"; 
	if (location.href.match("http://www.nmaps.net/browse*")) { 
		section.getElementsByTagName("table")[0].style.backgroundImage = "url('/static/sectionattribsbg.png')";
	} else {
		if ( section.getElementsByClassName("attribs")[0] ) {
			section.getElementsByClassName("attribs")[0].style.backgroundImage = "url('/static/sectionattribsbg.png')"; 
		}
	}
}

// Removs all variables from the cookie
function clearFavorites() {
	list = listKeys();
	for (i = 0; i < list.length; i++) {
		deleteKey(list[i]);
	}
	checkPage();
}

// ... I'll explain this later.
function updatePendingAuthors() {
	cpa = getValue("pending_authors");
	pa_span = document.getElementById("pendingauthors");
	if ( pa_span == null ) {
		userinfo = document.getElementById("userinfo");	
		sep = userinfo.getElementsByTagName("img")[1];
		if ( user.length > 8 ) { userinfo.style.paddingLeft = '20px'; }
		if ( user.length > 10 ) { userinfo.style.paddingLeft = '10px'; }
		
		seps = userinfo.getElementsByTagName("img");
		for ( i in seps ) {
try { seps[i].style.margin = ( ( user.length > 7 ) ? "0 1px 0 1px" : "0 4px 0 4px" ); }
catch (err) { }
		}
		
		pa_span = document.createElement("span");
		pa_span.id = "pendingauthors";
		sep.parentNode.insertBefore(sep.cloneNode(true), sep);
		sep.parentNode.insertBefore(pa_span, sep);
	}
	if ( cpa ) {
		pa_span.innerHTML = " <a href = '/browse?q=$favorite_authors'>" + cpa + " fav. update" + ((cpa - 1) ? "s" : "") + "</a> ";
	} else {
		pa_span.innerHTML = " No fav. updates ";
	}
}

// This, too...
function checkFavoriteAuthors() {
	if ( user == 0 ) { return; }

	updatePendingAuthors();
	
	cdate = new Date();
	cdate_seconds = cdate.getTime()/1000
	last_request = getValue("last_request");
	if ( last_request == undefined ) { last_request = 0; }
	if ( last_request > (cdate_seconds - 300) ) { return; }
	setValue("last_request", parseInt(cdate_seconds));
	
	list = listKeys();
	for ( i = 0; i < list.length; i++) {
		if ( list[i].substr(0, fav_prefix.length) != fav_prefix ) {
			list.splice(i, 1);
			i--;
		}
	}
			
	
	for (i in list) {
		name = list[i].substr(9,list[i].length);
		if ( getFavorited(name) != -1 ) {
		cfa_httprequest = new XMLHttpRequest;
		cfa_httprequest.onload = function(e) {
			page = this.responseText;
			page = page.replace(/\n/g, '');
			author = page.match(/author:(.+?)"/)[1];
			latest = page.match(/.net\/(\d+)"/)[1];
			current = getFavorited(author);
			if ( latest > current ) { 
				ppa = getValue("pending_authors");
				if ( ppa == undefined ) { ppa = 0; }
				setValue("pending_authors", ppa + 1); 
				setFavorited(author, -1);
				updatePendingAuthors()
			}
		}
		cfa_httprequest.open("GET", "http://www.nmaps.net/browse.rss?count=1&q=author:" + name, true);
		cfa_httprequest.send(null);
		}
	}
}

// Run the main functions
if ( location.href.match(re_userlevels) ) { if ( location.href.match(re_favuserlevels) ) replaceUserLevels(); }
else {
	if ( location.href.match(re_favoritepage) ) { replacePage(); }
	checkPage();
	checkFavoriteAuthors();
}
