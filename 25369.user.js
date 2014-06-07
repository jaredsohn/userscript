
// ==UserScript==
// @name Movie Search
// @namespace	http://adamv.com/greases/
// @description 	The Movie Dude scriptinin düzenlenmiş halidir.
// @include	http://adamv.com/dev/grease/moviedude/
// @include	http://adamv.dev/dev/grease/moviedude/
// @include	http://imdb.com/title/*
// @include	http://*.imdb.com/title/*
// @include	http://netflix.com/Movie/*
// @include	http://www.netflix.com/Movie/*
// @include	http://beyazperde.mynet.com*
// @include http://blockbuster.co.uk/*
// @include http://www.beyazperde.mynet.com*
// @include	http://movies.yahoo.com/*
// @include	http://www.rottentomatoes.com/m/*
// @include	http://rogerebert.suntimes.com/*
// @include	http://amazon.com/*
// @include	http://*.amazon.com/*
// @include	http://amazon.ca/*
// @include	http://opensubtitles.com/*
// @include	http://www.opensubtitles.com/*
// @include	http://*.amazon.co.uk/*
// @include	http://allmovie.com/*
// @include	http://*.allmovie.com/*
// @include	http://www.greencine.com/webCatalog?*
// @include	http://www.metacritic.com/tv/*
// @include	http://www.metacritic.com/video/*
// @include	http://www.metacritic.com/film/*
// @include http://www.filmaffinity.com/*
// @include http://www.intelliflix.com/*
// @include http://www.flixster.com/*
// @include http://www.hbo.com/apps/schedule/*
// @include http://www.sho.com/site/schedules/*
// @include http://www.slantmagazine.com/film/*
// @include http://www.slantmagazine.com/tv/*
// @include http://www.slantmagazine.com/dvd/*
// @include http://www.movietome.com/*
// @include http://www.fandango.com/*
// @include http://www.scifi.com/sfw/screen/*
// @include http://criticker.com/*
// @include http://sozluk.sourtimes.org/show.asp*
// @include http://*.allocine.fr/*
// @include	http://*.zip.ca/browse/title.aspx?*
// @include http://www.moviestar.ie/films/*
// @include http://*.quickflix.com.au/*/viewmovie/*
// @include http://www.apple.com/trailers/*
// ==/UserScript==

var icons = {
	allmovie : "data:image/gif;base64,R0lGODlhEAAQAKIAAJPH5S%2BPyQx7v1yq2f3%2B%2F7%2Fg8%2B32%2FN3t%2BCH5BAAAAAAALAAAAAAQABAAAANJKLrcriA8FwiYrZCDVzAEIXXDEV4dAIDH%2BAyXSQwYQANhMQXFEOAEA80xKKhWp4dtMQi1Gr8GaMb49SSBksFQ0HkCLrDY1WkkAAA7",
	bb_us: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALKSURBVHjajFNLaxNRFP7uI5mkMWn6pNZ3Ka3tVpEqCgoVN27cuHDlShB3%2FgD9OQoi7orgQlBExG60INKW1j6saRObZJrMTO7cucczMUIFFw6cOWfuPee73%2FnOHXH1fAavn9%2BEMWOIOjEyGQ9KKYRhAJfE8HJ5KO3h89IqpieHAVVERjnPmdqwc95Rjf96BISQ6bvM8RAgx6XMnhXOTv4FQN23ZFN5ITN9gugMF04zlZmpiYFjWdWeEVQ%2FDhMUhQ1KZANohs1B6lmI3KhWmBHCTCHxZ3OifVLI5hCFzSLIoKByjOMxkyyIEkCXIPRwqJ2hc%2FDXXgjaH8kmPuACppLwZhmkhiDz00gBKF13HfYxf1tQZw%2BIY9JxRMVkd31ElhVcHEH0zwOZccBssO1xInuZ%2B62DHuQ9lkGPQZYnuj1r52Ci%2FaStrSi4rIQu8np9ASIzClG8yCBVwDsGWbzAcYXj0wy6AyFLcOEmVDOAWPhgvix%2Bitemhmh8cKy%2FLHUMcWQOcvQuH%2BwgZR6U9t5eAh0swtXfwFVfwu2%2FiwVz62cbYCs9up198PjhiXtUOglnudf8LBB9BcVpvw3WwHGax1YArIMjEaRjZHXA2agX%2BlVdyDYodxY4%2BAhqvWeqfSzBJKivwGRYxNiwZyDHmthQpgDx9UsFff%2FOibkrs615y1girvFUTzF13k4nY3YgreHYcf9NiKjJVRamI2z3Il2ephu3rkXPKPG0NRbw3%2FKk0lOIT2SKrbjTasQHDd%2F6fgvNle9uZ2PX1RoBtrsAW1u2Giw3AlFUpajtqLbvKpVqsrO8mWyvV9zeJsdrFbfrh6i3DbW3a1Tnc1pcalIA9WE12X3yKnq69ZPCxZVk81uV9n7Uk4YfoMlEQs7ppMk9rWzPJ%2BlaOgXVmwLfEhzpJfwpOFyUxq5XmPRiEt0r9ns2%2BR6YPVTkDhn96z%2F9JcAAPT9yR2OXfZIAAAAASUVORK5CYII%3D",
	blockbuster: 'data:image/gif;base64,R0lGODlhEAAQAKIAACMiNunXmvXRY9u4aGVJIKOFSRAibXF0fCH5BAAAAAAALAAAAAAQABAAAANjaLp7zgoQd2S4gJ0y7ijEIASZclyCGAyhIBBLyxYjQQsFI7JhALqDkmEgKtB4gZGQs0sRWgGYIrTbcUaVDIDIcxmBNgPg+rS6VgFTkeMjXN6mVOpCGIMAQq6xDtHUhX2BggYJADs=',
	ebert:
'data:image/gif;base64,R0lGODlhEAAQAKIAALCLa6g2NXggHMGjfqhpVdHHls2/kYFOPiH5BAAAAAAALAAAAAAQABAAAANbGKrUdCLKBYwt1gAp1MAXWAwTAVrAkBVEFHxXS6ykYmCYq2ZQsBqHIMwCmWWOx0IPWWg6m8sjYEqdRm+kzmLRuWVcqYG4N1R2ncAOQLQxXWqBmYjZWhiRt40iAQA7',
	moviestar: 'data:image/gif;base64,R0lGODlhEAAQANUAAJOYxXm85ixFmE9YoWW25Vy05G255qClzIWr17u%2F29bY6YWLvm%2BCunZ%2Bt57N7EFLmmpxrzM%2BknSg0nmczjhirD5QnqzH41Sy42aw4EJeqCo5kVeLxkSBwq6y1FdvsY2kzqK73DNSoZe94FBgpmRvrnaNwZiv1cnM4lprrOTl8UltskV0uFxlqPHy%2BLnZ76rR7Eyv4iYxi%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAaUwJdQaGEwTK6k0jV8gTQx1uKzTDZLsZhCRnK8ls1K7CGTpVCItIj5ckyyi7Ksw6oPJpJRdnBoyf8tYjENfn%2BGLAJZLIWGZQAxHlljW40KMQIBiZIJjS0xEgEYGZIAjTIDAQEGBipZpWUnhQcbBgQEK64yLRBZDQkHFAQFBRRZEAkRkpIhBTDOWclZzjBZHBfT2NnYQQA7',

	noFavicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGHSURBVHjaYvz%2F%2Fz8DIyOjDAMDgzgQMzPgB6%2BA%2BBFQzz%2BYAEAAMYAMAALjHz9%2BfPj9%2B%2FffP3%2F%2B%2FMeGgfL%2Fp0yZMhGoVgGImUD6QBgggGAGmIE0f%2Fny5f%2FXr1%2Fh%2BOPHj%2F%2Ffv3%2F%2F%2F%2BXLl2BDnj9%2F%2Fn%2Fq1KkohgAE4GiOUQCAQhCA8u9%2Fgq7YFASGkx8dwkVfHj8DLtydSCZ9u6uZUXcHACA%2FqaogBr4AYoQaYApUcPLv379wr%2F379w%2FsOqA4A9BQBkFBQZTAYGFhMQdSpwECiAVZkImJCRSgcDbIQGZmZgY2NjYGoEvAhoIMFBMTg%2BsBCCAUA2CaYWyQZmQ%2BzEBkABBALPjiDNkQEBuEYQEHAwABxEIg3sGakL2GDgACiImBCADTDHINyDBkABBAOF2A7FRoagUHIjoACCCCXkA2CN12EAAIIBZ8zobZjA8ABBCyAf%2BhiQprtKKBf1DX%2FQcIIFB6Bmn8B4zj7zAJAgCk9huQBidbgABihDpTFpqdiYoVqOZXQL2PAQIMAIeX65Ph3kulAAAAAElFTkSuQmCC'
};

var site_columns = 5;

// -- Site definitions
var Sites = {
	allocine: {
		name: "AlloCiné",
		icon: "http://www.allocine.fr/favicon.ico",
		link: "http://www.allocine.fr/recherche/?rub=0&motcle={search}",
		scanURL: "allocine.fr",
		xpath: "//table//h1/b"
	},

	allmovie: {
		name: "All Movie",
		icon: icons.allmovie,
		form: ["http://www.allmovie.com/cg/avg.dll", {p: "avg", sql: "*", opt1:"12"}],
		scanURL:"allmovie.com",
		xpath: "//*[@class='title']"
	},

	am_us: {
		name: "Amazon (US)",
		xpath: "//b[@class='sans']",
		icon: "http://www.amazon.com/favicon.ico",
		link: "http://www.amazon.com/s/?url=search-alias%3Ddvd&field-keywords={search}",
		scanURL:"amazon.com",

		validPage: function(pageTitle){return (pageTitle.indexOfAny(["DVD:", "movie info:"]) > -1);}
	},

	am_uk: {
		name: "Amazon (UK)",
		xpath: "//b[@class='sans']",
		icon: "http://www.amazon.co.uk/favicon.ico",
		link: "http://www.amazon.co.uk/s/?url=search-alias%3Ddvd&field-keywords={search}",
		scanURL:"amazon.co.uk",

		validPage: function(pageTitle){return (pageTitle.indexOfAny(["DVD", "movie info:"]) > -1);}
	},

	am_ca: {
		name: "Amazon (CA)",
		xpath: "//b[@class='sans']",
		icon: "http://www.amazon.ca/favicon.ico",
		link: "http://www.amazon.ca/s/?url=search-alias%3Ddvd&field-keywords={search}",
		scanURL:"amazon.ca",

		validPage: function(pageTitle){return (pageTitle.indexOfAny(["DVD", "movie info:"]) > -1);}
	},

	apple: {
		name: "Apple Trailers",
		icon: "http://www.apple.com/favicon.ico",
		link: "http://www.apple.com/search/downloads/?q={search}",
		scanURL: "apple.com",
		xpath: "//*[@class='details']//h1",
	},

	eksi: {
		name: "EksiSozluk",
		link: "http://sozluk.sourtimes.org/show.asp?t={search}",
		xpath: "//*[@class='title']",
		icon: "http://sozluk.sourtimes.org/favicon.ico",
		scanURL: "sozluk.sourtimes.org"
	},

	bp: {
		name: "BeyazPerde",
		xpath: "//*[@class='baslik_filmadi32']",
		link: "http://beyazperde.mynet.com/arama.asp?kat=film&keyword={search}&sira=isima",
		icon: "http://img2.mynet.com/myneticon.gif",
		scanURL:"beyazperde.mynet.com",
	
	},

	bb_uk: {
		name: "Blockbuster (UK)",
		xpath: "//table//div[@class='roundedYellow']/h2/div",
		link: "http://www.blockbuster.co.uk/{search}/0/basic.aspx",
		icon: icons.blockbuster,
		scanURL:"blockbuster.co.uk",
	},

	cdcovers: {
		name: "Cdcovers",
		link: "http://www.cdcovers.cc/search/all/{search}",
		icon: "http://www.cdcovers.cc/favicon.ico",
	//	scanURL: "cdcovers.cc"
	},

	covertarget: {
		name: "CoverTarget",
		link: "http://www.covertarget.com/s2.php?search={search}&cat=1",
		icon: "http://www.covertarget.com/favicon.ico",
	//	scanURL: "covertarget.com"
	},

	criticker: {
		name: "Criticker",
		xpath: "//div[@id='fi_info_filmname']",
		link: "http://criticker.com/?st=all&h={search}&g=Go",
		icon: "http://www.criticker.com/favicon.ico",
		scanURL: "criticker.com",
	},

	ebert: {
		name: "Ebert",
		xpath: "//span[@class='moviename']",
		icon: icons.ebert,
		scanURL:"rogerebert.suntimes.com",
		form: ["http://rogerebert.suntimes.com/apps/pbcs.dll/classifieds?category=search3", {
				Class: "60", Type: "",
				FromDate: "19150101", ToDate: "20051231",
				Start: 1,
				SortOrder: "AltTitle",
				Genre: "",
				GenreMultiSearch: "",
				RatingMultiSearch: "",
				MPAASearch: "",
				SearchType: "1",
				qrender: "", Partial: "", q: "*"}],
	},

	fandango: {
		name: "Fandango",
		link: "http://www.fandango.com/GlobalSearch.aspx?tab=Movies&q={search}&repos=Movies",
		scanURL: "fandango.com",
		icon: "http://www.fandango.com/favicon.ico",
		xpath: "//*[@class='sIFR-alternate']",
		insertBreak: false,

		getWhereToInsert: function(titleNode){
			var parent = document.getElementById('content');
			var where = document.createElement('div');
			parent.insertBefore(where, parent.firstChild);
			return where;
		},

		getTitleFromTitleNode: function(titleNode){
			return $T(titleNode.firstChild);
		},
	},

	filmaff: {
		name: "FilmAffinity",
		link: "http://www.filmaffinity.com/en/search.php?stype=title&stext={search}",
		scanURL: "filmaffinity.com",
		icon: "http://www.filmaffinity.com/favicon.ico",
		},

	flixster: {
		name: "Flixster",
		link: "http://www.flixster.com/movies.do?movieAction=doMovieSearch&search={search}",
		scanURL: "flixster.com",
		icon: "http://www.flixster.com/favicon.ico",
		xpath: "//*[@class='profile_mbox_header profile_mbox_title']",

		prepareToInsert: function(titleNode){
			titleNode.style.height = "auto";
		}
	},

	freecovers: {
		name: "FreeCovers",
		link: "http://www.freecovers.net/search.php?search={search}&cat=1",
		icon: "http://www.freecovers.net/favicon.ico",
		scanURL: "freecovers.net",
	},

	google_movies: {
		name: "Google Movies",
		link: "http://www.google.com/search?hl=en&q=%22{search}%22+rapidshare.com%2Ffiles",
		icon: "http://www.google.com/favicon.ico",
	},

	greencine: {
		name: "GreenCine",
		xpath: "//*[@class='header1']",
		icon: "http://www.greencine.com/central/files/niftydrupalclean_favicon.ico",
		form: ["http://www.greencine.com/catalogQuickSearch", {SEARCH_STRING: "*"}],
		scanURL:"greencine.com",
	},

	hbo: {
		name: "HBO Schedule",
		xpath: "//td[@class='rightnav-subhead']",
		scanURL: "hbo.com"
	},

	imdb: {
		name: "IMDb",
		link: "http://imdb.com/find?q={search};tt=on;nm=on;mx=20",
		icon: "http://imdb.com/favicon.ico",
		scanURL:"imdb.com",
		xpath: "//*[@id='tn15title']",

		validPage: function(pageTitle){return (pageTitle.indexOfAny(["(VG)"]) == -1);},

		getTitleFromTitleNode: function(titleNode){
			var smallNode = selectNode('.//small', titleNode);
			if (smallNode != null)
			{
				var a = selectNode(".//a", titleNode);
				if (a != null)
					return $T(a);
			}

			return $T(titleNode);
		}
	},

	intelliflix: {
		name: "Intelliflix",
		xpath: "//td/font/font/b",
		link: "http://www.intelliflix.com/movie_search.dvd?source=simple&search_field=Keyword&search_text={search}&genre=0",
		icon: "http://www.intelliflix.com/favicon.ico",
		scanURL: "intelliflix.com",
	},

	metacritic: {
		name: "Metacritic",
		xpath: "//*[@id='rightcolumn']/h1",
		icon: "http://www.metacritic.com/favicon.ico",
		link: "http://www.metacritic.com/search/process?sb=0&tfs=all&ts={search}&ty=0",
		scanURL:"metacritic.com",

		processTitleNode: function(titleNode){
			var node = document.createElement("span");
			node.innerHTML = titleNode.firstChild.nodeValue;
			titleNode.replaceChild(node, titleNode.firstChild);
			return node;
		},
	},

	moviestar: {
		name: "Moviestar",
		link: "http://www.moviestar.ie/index.php?action=films/search&filter_search_for={search}",
		scanURL: "moviestar.ie",
		xpath: "//*[@class='movie_title']",
		icon: icons.moviestar,
	},

	movietome: {
		name: "MovieTome",
		icon: "http://www.movietome.com/favicon.ico",
		link: "http://www.movietome.com/search/index.php?qs={search}&tag=searchtop%3Bbutton",
		scanURL: "movietome.com",
		xpath: "//div[@id='content_head']/h1/a",

		getWhereToInsert: function(titleNode){
			return document.getElementById("eyebrow");
		},
	},

	netflix: {
		name: "NetFlix",
		xpath: "//div[@class='title']",
		link: "http://www.netflix.com/Search?v1={search}",
		icon: "http://cdn.nflximg.com/us/icons/nficon.ico",
		scanURL:"netflix.com",
	},

	opensub: {
		name: "OpenSubtitles",
		link: "http://www.opensubtitles.com/en/search2/sublanguageid-all/moviename-{search}",
		xpath: "//h1[@class='MovieTitle']",
		icon: "http://static.opensubtitles.org/favicon.ico",
		scanURL: "opensubtitles.com",
	},

	rotten: {
		name: "Rotten Tomatoes",
		xpath: "//h1/div[@id='container']",
		link: "http://www.rottentomatoes.com/search/full_search.php?search={search}",
		icon: "http://www.rottentomatoes.com/favicon.ico",
		scanURL:"rottentomatoes.com",
	},

	scifiweekly: {
		name: "Sci Fi Weekly",
		link: "http://search.scifi.com/search?q={search}&btnG=Search&ie=&site=sfw&output=xml_no_dtd&client=sfw&lr=&proxystylesheet=sfw&oe=",
		xpath: "//span[@class='title']",
		scanURL: "scifi.com",
		icon: "http://www.scifi.com/favicon.ico",
		getTitle: function(movieName){
			foreach(["Unrated DVD", "DVD"], function(suffix){
				if (movieName.endsWith(suffix)){
					movieName = movieName.removeSuffix(suffix).trim();
					return true;
				}
			});

			// Strip off "Season-####..." from the name, to make external searches work better.
			var re = new RegExp("Season-.*(Premiere|DVD)$");
			movieName = movieName.replace(re, "");

			return movieName;
		}
	},

	sho: {
		name: "Showtime Schedule",
		xpath: "//*[@class='movietitle']",
		scanURL: "sho.com"
	},

	slant: {
		name: "Slant Magazine",
		xpath: "//div[@class='review_title']",
		scanURL: "slantmagazine.com",
		icon: "http://www.slantmagazine.com/favicon.ico"
	},

	walmart: {
		name: "Wal*Mart",
		link: "http://www.walmart.com/catalog/search-ng.gsp?search_constraint=4096&search_query={search}",
		icon: "http://www.walmart.com/favicon.ico",
		scanURL: "walmart.com",
		xpath: "//*[@class='title']",
	},

	wikipedia: {
		name: "Wikipedia",
		link: "http://en.wikipedia.org/wiki/Special:Search?search={search}&go=Go",
		icon: "http://en.wikipedia.org/favicon.ico",
		xpath: "//*[@class='title']",
	},

	yahoo: {
		name: "Yahoo",
		xpath: "//td/h1/strong|//td/big/b",
		link: "http://movies.yahoo.com/mv/search?p={search}",
		icon: "http://www.yahoo.com/favicon.ico",
		scanURL:"movies.yahoo.com",
	},

	youtube: {
		name: "YouTube",
		link: "http://www.youtube.com/results?search_query={search}&search=Search",
		icon: "http://www.youtube.com/favicon.ico",
		scanURL: "youtube.com"
	},

	zip_ca: {
		name: "Zip.ca",
		link: "http://www.zip.ca/browse/search.aspx?f=wc({seach})~t(-1)&j=1",
		scanURL: "zip.ca",
		xpath: "//h3[@id='bc_WaveTitle']",
	},
};

var UserSites = {};

/*
	The Movie Dude

	1.7.9
	16 Mar 2008, 10:05am

	Developed 2005-8 by Adam Vandenberg
	Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
*/
// #region Class support
// Adds items from props to obj.
function _extend(obj, props){
	for(var key in props){obj[key]=props[key];}
}
// #endregion

// #region String support
_extend(String.prototype,{
	important: function(){ return this.replace(";", " !important;");},
	trim: function() { return this.replace(/^\s+|\s+$/g, ""); },
	template: function(vars){
		return this.replace(
			/\{(\w*)\}/g,
			function(match,submatch,index){return vars[submatch];});
	 },
	endsWith: function(suffix){
		var lastIndex = this.lastIndexOf(suffix);
		return (-1 < lastIndex) && (lastIndex == (this.length-suffix.length));
	},
	removeSuffix: function(suffix){
		return (this.endsWith(suffix))? this.substring(0, this.length-suffix.length) : this;
	},
	after: function(s){
		var index = this.indexOf(s);
		var length = s.length || 1;
		return (-1<index) ? this.substring(index+length) : this;
	},
	indexOfAny: function(charsOrStringList){
		var index=-1;
		var s = this;
		foreach(charsOrStringList, function(token){
			index = s.indexOf(token);
			if (-1 < index) return true;
		});
		return index;
	},
	escapeHTML: function(){
		return this
			.replace(/&/g, "&amp;")
			.replace(/\"/g, "&quot;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}
});
// #endregion

// #region Collection support
function foreach(stuff, f){ for(var i=0; i < stuff.length; i++) if (f(stuff[i])) return; }
function foreach_dict(stuff, f){ for(var name in stuff) if ( f(name, stuff[name]) ) return; }
function collect(f, stuff) {
	var list = [];
	foreach(stuff, function(item){list.push(f(item))});
	return list;
}
//#endregion

// #region DOM & Events support
function $(o) {
	if (typeof(o) == "string") return document.getElementById(o)
	else return o;
}

function hide(id){
	var e = $(id);
	if (e) e.style.display = "none";
}

function addEvent(elementID, eventName, handler, capture){
	var e = $(elementID);
	if (e) e.addEventListener(eventName, handler, capture);
}

// Extract the text from the given DOM node.
function $T(node) {
	var aNode = $(node);
	if (aNode == null) return "";

	function extract(n){
		var s = "";
		if (n.nodeType == 3){
			s+= n.nodeValue;
		}

		foreach(n.childNodes, function(child){
			s += extract(child);
		});
		return s;
	}

	return extract(aNode).trim();
}
// #endregion

//#region Xpath Support
function selectNode(selector, rootElement){ return xpath(selector, rootElement, null, true); }
function xpath(selector, rootElement, f_each, firstOnly){
	var results = document.evaluate(
		selector, rootElement || document, null,
		XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

	// If we have a callback function, run it on the results
	if (f_each != null){
		while(result = results.iterateNext()) { f_each(result); }
		return;
	}

	// If we're only getting the first result, do that
	if (firstOnly){ return results.iterateNext(); }
}
//#endregion

function stringify(){
	var q = [], output = [];
	foreach(arguments, function(item){q.unshift(item);});

	var item = null;
	while (q.length > 0){
		item = q.pop();

		if (typeof(item) == "function")
			q.unshift(item());
		else if ((typeof(item) != "string") && (item.length != null))
			foreach(item, function(item){q.unshift(item);});
		else if (item != null)
			output.push(item.toString());
	}
	return output.join("");
}
function Maker(label){
	return function(){
		var s =  "<"+label+">"+stringify(arguments)+"</"+label+">";
		return s; } }

var Html = {};
foreach(['table','tr','td'], function(item){Html[item]=Maker(item);})

function rowify(row /* array of cells */){
	return Html.tr(collect(Html.td, row));  }

function Table(rows){ return Html.table(collect(rowify,rows)); }

Html.Select = function (name, selectedValue, options){
	var s = '<select id="{name}">'.template({name: name});
	foreach(options, function(option){
		var selected = (option[0] == selectedValue)?' selected="selected"':"";
		s += '<option value="{value}"{selected}>{caption}</option>'.template({value: option[0], caption: option[1], selected: selected});
	});
	s += "</select>";
	return s;
}

function addCSS(){
	for(var i=0;i<arguments.length;i++) GM_addStyle(arguments[i]);
}

function addImportantCSS(){
	for(var i=0;i<arguments.length;i++) GM_addStyle(arguments[i].important);
}

function NameValue(n,v){ return ' {n}="{v}"'.template({n:n,v:v}); }
function FormValue(n,v){ return '<input type="hidden" name="{n}" value="{v}" />'.template({n:n,v:v}); }

/// Creates new Site objects.
function Site(definition, key){
	_extend(this, definition);
	this.id = key;
}

_extend(Site.prototype, {
	icon: icons.noFavicon,
	insertBreak: true,
	validPage: function(pageTitle){return true;},

	canLinkTo: function(){
		return (this.form != null || this.link != null);
	},

	GetForm: function(movieTitle){
		if (this.form == null)
			return '';

		var s = '<form method="post" style="display:none;" action="{action}" id="_md_{id}_search">'.
			template ({
				action: this.form[0],
				id: this.id
			});

		foreach_dict(this.form[1], function(k,v){s += FormValue(k, v=="*" ? movieTitle : v);} );
		s += "</form>";
		return s;
	},

	GetLink: function(movieTitle){
		var link = this.link.template( {
				search: encodeURIComponent(movieTitle),
				form: "javascript:document.forms['_md_"+this.id+"_search'].submit()"
			} );

		var html = this.LinkTemplate.template( {
			href: link,
			name: this.name.replace(/\s/, "&nbsp;"),
			icon: this.icon
		});

		return html;
	},

	GetHTML: function(movieTitle){
		var html = '';
		if (this.form != null && this.link==null)
			this.link = "{form}";

		if (this.link!=null)
			html += this.GetLink(movieTitle);

		if (this.form != null)
			html += this.GetForm(movieTitle);

		return html;
	},

	processTitleNode: function(titleNode){return titleNode;},

	prepareToInsert: function(titleNode){},

	getWhereToInsert: function(titleNode){return titleNode;},

	getTitleFromTitleNode: function(titleNode){return $T(titleNode);},
});

function setPreference(event){GM_setValue(this.value, this.checked);}

function removeBrackets(movieName){
	do {
		var bracketIndex = movieName.indexOfAny("([");
		if (-1 < bracketIndex) movieName = movieName.substring(0,bracketIndex).trim();
	} while (bracketIndex != -1)

	return movieName;
}

function removeSuffix(movieName){
	foreach([" - Criterion Collection", " - Used", " - The Complete Collections"], function(suffix){
		if (movieName.endsWith(suffix)){
			movieName = movieName.removeSuffix(suffix).trim();
			return true;
		}
	});

	return movieName;
}

function GetSitePref(siteID){
	var siteName = Sites[siteID].name;
	var checked = (GM_getValue(siteID, true)) ? " checked='checked'" : "";

	return ( "&nbsp;<input type='checkbox' name='_md_pref' id='_md_pref_{siteID}' value='{siteID}'{checked} /> <label for='_md_pref_{siteID}'><img src='{icon}' width='16' height='16' border='0' /> {siteName}</label>".template({siteID: siteID, checked: checked, siteName: siteName, icon: Sites[siteID].icon}));
}

function GetNewPreferenceRow(totalRows, rowNumber){
	var row = [];

	for(var col=0; col < 4; col++){
		var realIndex = col*totalRows+rowNumber;

		if (realIndex < site_names.length){
			row.push(GetSitePref(site_names[realIndex]))
		} else {
			row.push("");
		}
	}

	return row;
}

function CreatePreferencesPanel(prefs_div){
	prefs_div.innerHTML="";

	var s = "<div class='_md_centered'><div id='_md_wrapper'><div id='_md_title'><b>Movie Search </b> <a href='http://adamv.com/dev/grease/moviedude'>Home Page</a> &bull; <a href='mailto:Movie.Dude.Script@gmail.com'>Contact</a> &bull; <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=paypal@adamv.com&amount=&return=&item_name=Buy+Me+a+Beer'>Buy Me a Beer</a></div></div></div>";

	s += "<hr id='header-shadow'><div id='_md_wrapper2'>";

	s += "<b>Display as:</b> ";
	s += Html.Select("_md_display_type", GM_getValue("linkStyle", "0"),
		[["0", "Icon &amp; Text"],["1", "Text &amp; Icon"],["2", "Icons only"],["3","Text only"]]);

	s += '<br />';

	var linkStyle = GM_getValue("linkStyle", "0");


	var table = [];
	var number_of_rows = Math.ceil(site_names.length / 4);
	for(var row=0; row < number_of_rows; row++){
		table.push(GetNewPreferenceRow(number_of_rows, row));
	}

	table_html = Table(table);
	table_html = table_html.replace("<table>", "<table id='_md_link_table'><caption>Show links to these sites:</caption>");

	s += table_html;
	s += "<br /><div id='_md_version'>Version 1.7.9</div><button id='_md_close'>Close &amp; Refresh</button></div>"
	s += "<hr id='footer-break'></div>"
	prefs_div.innerHTML = s;
	document.body.appendChild(prefs_div);

	AddPreferencePanelEvents(prefs_div);
}

function AddPreferencePanelEvents(prefs_div){
	addEvent("_md_close", "click", function (e){
		hide("_md_prefs");

		var md_links = $('_md_links');
		md_links.parentNode.removeChild(md_links);
		LinkEmUp();
	});

	addEvent("_md_display_type", "change", function(e){
		var select = $("_md_display_type");
		GM_setValue("linkStyle", select.options[select.selectedIndex].value);
	});

	xpath("//input[@name='_md_pref']", prefs_div, function(box){
		addEvent(box, "click", setPreference);
	});
}

function ShowPreferences(){
	var prefs = $("_md_prefs");
	if(!prefs){
		prefs = document.createElement("div")
		prefs.id = "_md_prefs";

		CreatePreferencesPanel(prefs);
	}

	prefs.style.display="";
}

function getSiteBeingViewed(){
	var whichSite = null;
	foreach_dict(Sites, function(key, site){
		if ( -1 < location.host.indexOf(site.scanURL)){
			whichSite = site;
			return true;
		}
	});

	return (whichSite && whichSite.validPage(document.title)) ? whichSite : null;
}

// -- Main code
function LinkEmUp(){
	// Convert site definitions to site objects.
	foreach_dict(Sites, function(key, def){
		Sites[key] = new Site(def, key);
	});

	// Add any user supplied sites.
	foreach_dict(UserSites, function(key, def){
		Sites[key] = new Site(def, key);
	});

	var whichSite = getSiteBeingViewed();
	if (whichSite == null) return;

	var LinkTemplates = [
	'&nbsp;&nbsp;&nbsp;&nbsp;<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" />{name}</a>',
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a>&nbsp;<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a> ',
	];
/*
 	LinkTemplates = [
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a>&nbsp;<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'<a href="{href}" title="{name}"><img src="{icon}" width="16" height="16" border="0" /></a> ',
	'&bull;&nbsp;<a href="{href}" title="{name}">{name}</a> ',
	];
*/
	Site.prototype.LinkTemplate = LinkTemplates[parseInt(GM_getValue("linkStyle", "0"))];

	var movieName = "";
	var titleNode = null;

	if (whichSite.xpath)
	{
		titleNode = selectNode(whichSite.xpath);
		if (titleNode != null) {
			titleNode = whichSite.processTitleNode(titleNode);

			movieName = whichSite.getTitleFromTitleNode(titleNode);
		}
		else return; // abort if the xpath gave us nothing
	}
	else
	{
		movieName = document.title;
		titleNode = document.createElement("div");
		document.body.insertBefore(titleNode, document.body.firstChild);
	}

	if (whichSite.getTitle)
		movieName = whichSite.getTitle(movieName);

	movieName = removeBrackets(movieName);
	movieName = removeSuffix(movieName);
	movieName = movieName.trim();

	var s = "<a id='_md_config' class='_md_config' title='Configure Movie Search'>Movie Search</a>: ";

	foreach_dict(Sites, function(key, site){
		if ((site == whichSite) || !GM_getValue(site.id, true))
			return false;

		s += site.GetHTML(movieName);
	});

	whichSite.prepareToInsert(titleNode);

	var insertBreak = (!whichSite.insertBreak) ? "" : "<br />";

	var whereToInsert = whichSite.getWhereToInsert(titleNode);

	whereToInsert.innerHTML += ( "<span id='_md_links'>" + insertBreak + s + "</span>");
	addEvent("_md_prefs_link", "click", ShowPreferences);
	addEvent("_md_config", "click", ShowPreferences);
}

function runHomepageCode(){
	if ( -1 == location.pathname.indexOf('/dev/grease/moviedude/'))
			return false;

	var your_version = $('your-version');
	if (your_version != null){
		your_version.innerHTML = "(You have version 1.7.9.)"
	}

	return true;
}

addCSS("#_md_prefs { 	z-index: 1000; 	color: #444; 	background-color: #f8f4e8;  	position: fixed; 	bottom: auto; 	left: 0; 	right: 0; 	top: 0; 	color: black; 	font: normal 11px sans-serif;  	border-bottom: 2px #055458 solid; }  #_md_version { 	background-color: transparent; 	float: right; 	color: black; 	font-size: 10px; }  hr#footer-break { 	clear: both; 	padding: 24px 0 0 0; 	margin: 0; 	border: none; 	background: #f7e6ab url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAAPUlEQVR42izGsQHDAAzDMJr%2FH9oDMnSwpQ7pBPB9PkKE2MZphJOe5IS1jbDSc7q25%2FBK1iG2K%2BT%2FSCvDbwBfPCu3pfivSQAAAABJRU5ErkJggg%3D%3D) repeat-x left top; }  #_md_title { 	color: white; 	margin: 0; 	padding: 5px 0; }  ._md_centered { 	background-color: #055458; }  #_md_title .version { padding-right: 1em;}  #_md_title a { 	color: #8DC5C7; 	text-decoration: none; 	font-style: italic; }  #_md_title b { margin-right: 3em; }  #_md_links, #_md_prefs, #_md_links a {font-size:10pt;font-weight:normal;text-transform: none;}  #_md_prefs_link {cursor: pointer;}  a._md_config { 	text-transform: none; 	text-decoration: none; 	cursor: pointer; }  a._md_config:hover { background: #336699; color: white; cursor: pointer;}  #_md_prefs, #_md_prefs caption { 	font-family: Georgia, serif; 	font-size: 14px; }  #_md_prefs td { 	font-family: Helvetica, Arial; 	font-size: 12px; }  div#_md_wrapper { 	padding-bottom: 0.4em; 	margin: 0px auto; 	width: 700px; }  div#_md_wrapper2 { 	padding-bottom: 0.4em; 	margin: 0px auto; 	width: 700px; 	background-color: #f8f4e8; }  #_md_prefs button { 	border: 1px solid #0080cc; 	color: #333; 	cursor: pointer; 	background: #FFF; }  #_md_link_table td { 	padding-left: 1em; }  #_md_prefs caption { 	padding: 1em 0 0.5em 0; 	text-align: left; 	font-weight: bold; }  hr#header-shadow { 	padding: 24px 0 0 0; 	margin: 0; 	border: none; 	background: #f8f4e8 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAAOklEQVR42izIsRHEQAyAQEDqvxH35RYc3gd%2FEcz2vU8cQtM6FJTu%2F9t0Oty64QSbFmw016Zj1wv6DQBlzgkFTlSeZgAAAABJRU5ErkJggg%3D%3D) repeat-x left top; }");

GM_registerMenuCommand("Movie Dude Settings...", ShowPreferences);

var site_names = [];

if(!runHomepageCode())
{
	LinkEmUp();
	foreach_dict(Sites, function(key,value){if (value.canLinkTo()) site_names.push(key);});
}