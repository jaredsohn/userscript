// ==UserScript==
// @name          SearchJump Music
// @namespace     Chris4
// @description	  Search for music straight from Google, Bing and Yahoo using Spotify, Grooveshark, Last.FM and more.
// @version       1.0
// @include       *
// ==/UserScript==

// A modification of Dave Child's "SearchJump" and yuguang's "SearchJump Improved".

// searchenginearray elements
// ---------------------------------
// searchenginearray[i][0] - Search engine name
// searchenginearray[i][1] - Querystring variable key for keywords entered
// searchenginearray[i][2] - URL portion identifying search from this engine
// searchenginearray[i][3] - Search URL ("--keywords--" to be replaced by searched-for keywords)
// searchenginearray[i][4] - Whether to show this engine in list or not
// searchenginearray[i][5] - Search engine favicon

(function() {

	var searchenginearray = new Array();
	var lg = new Array();

	// Search engines
	
	searchenginearray[0] = new Array('Google', 'q', 'google.', 'http://www.google.com/search?q=--keywords--', 0, 'http://www.google.com/favicon.ico');
	searchenginearray[1] = new Array('Yahoo', 'p', 'search.yahoo.', 'http://search.yahoo.com/search?p=--keywords--', 0, 'http://www.yahoo.com/favicon.ico');
	searchenginearray[2] = new Array('Bing', 'q', 'bing.', 'http://www.bing.com/search?q=--keywords--', 0, 'http://www.bing.com/favicon.ico');
	searchenginearray[3] = new Array('Ask', 'q', 'ask.', 'http://web.ask.com/web?q=--keywords--', 0, 'http://www.ask.com/favicon.ico');
	
	// Music services
	
    searchenginearray[4] = new Array('Spotify', 'spotify', 'spotify.', 'http://open.spotify.com/search/--keywords--', 1, 'http://www.spotify.com/favicon.ico');
    searchenginearray[5] = new Array('Grooveshark', 'query', 'grooveshark.', 'http://listen.grooveshark.com/#/search/songs/?query=--keywords--', 1, 'http://www.grooveshark.com/favicon.ico');	
	searchenginearray[6] = new Array('iLike', 'q', 'ilike.', 'http://www.ilike.com/artist/search?artist_qp=--keywords--', 1, 'http://www.ilike.com/favicon.ico');	
	searchenginearray[7] = new Array('Last.fm', 'q', 'last.fm', 'http://www.last.fm/search?q=--keywords--', 1, 'http://www.last.fm/favicon.ico');
	
	searchenginearray.sort();

	var r = escape(document.referrer);
	var u = escape(document.location.href);
    var b = document.getElementById("searchSideBar");
	var d = document.location.host;
	var q = document.location.search;
	var e = -1;
	var t = '';

	var toggle = 'left';
	var togglew;

	var keywords = '';
	var qvar;

	var linkstyle = '';
		var footerlinkstyle = "text-align: left; white-space: nowrap; text-decoration: none; background: #fff; margin: 0 10px 3px 10px; padding: 3px 8px 3px 8px; display: block; color: #00c; font-size: 80%;";

	for (i = 0; i < searchenginearray.length; i++) {
		t = searchenginearray[i][2];
		if (d.indexOf(t) != -1) {
			e = i;
		}
	}

	q = q.slice(1);

	if ((q.length > 0) && (e != -1)) {
		// There's a querystring and it's a search referral
		var qspairs = q.split('&');
		for (k = 0; k < qspairs.length; k++) {
			qvar = qspairs[k].split('=');
			if (qvar[0] == searchenginearray[e][1]) {
				qvar[0] = '';
				keywords = qvar.join('=').slice(1);
			}
		}
	}

    function make_boxes() {
        if ((!b) && (keywords != '')) {
            b = document.createElement("div");
            b.setAttribute("id","searchSideBar");
            b.setAttribute("style","position: fixed; top: 150px; right: 0; padding: 8px 0 0 0; background: #F0F7F9; border: 1px solid #c5cCd9; border-right: 0; width: 115px; font-family: Trebuchet MS, sans-serif; overflow: hidden;");

                for (i = 0; i < searchenginearray.length; i++) {

                    if (searchenginearray[i][4] == 1) {

                        linkstyle = "text-align: left; white-space: nowrap; text-decoration: none; background:  url('" + searchenginearray[i][5] + "') #FFF 1px center no-repeat; margin: 0 10px 3px 10px; padding: 3px 8px 3px 20px; display: block; color: #00c; font-size: 100%; background-color:#F0F7F9; outline: none; -moz-outline-style: none;";
						
						
                    
                        lg[i] = document.createElement("a")
                        lg[i].setAttribute("href", searchenginearray[i][3].replace('--keywords--', keywords));
                        lg[i].setAttribute("onClick","window.open(this.href,'newwin'); return false;");
                        lg[i].setAttribute("style", linkstyle);
                        addtext(lg[i], searchenginearray[i][0]);
                        b.appendChild(lg[i]);

                    }

                }

			footerstyle = "white-space: nowrap; text-decoration: none; margin: 0 10px 3px 10px; padding: 0px; display: block; color: #ababab; font-size: 80%; background-color:#F0F7F9; outline: none; -moz-outline-style: none;";
			
			lc = document.createElement("a")
			lc.setAttribute("href","#");
			lc.setAttribute("onClick","return false;");
			lc.setAttribute("style", footerstyle);
			addtext(lc, 'Hide \u00BB');
			b.appendChild(lc);
			lc.style.textAlign = 'right';
				
			document.body.appendChild(b);
			lc.addEventListener("click", toggle_box, false);
			return true;
        }
    }

	function toggle_box() {
		// Toggle tells you which way the box was last moved
		togglew = eval(b.style.width.replace(/px/,""));
		if (toggle == 'right') {
			for (i = togglew; i < 150; i++) {
				b.style.width = (i) + 'px';
			}
			toggle = 'left';
		} else {
			for (i = togglew; i > 5; i--) {
				b.style.width = (i) + 'px';
			}
			toggle = 'right';
		}
	}


	function go() {
		make_boxes();
	}

	function addtext(obj, text) {
		var content = document.createTextNode(text);
		obj.appendChild(content)
	}

	function addEvent(objObject, strEventName, fnHandler) { 
		// DOM-compliant way to add an event listener 
		if (objObject.addEventListener) 
			objObject.addEventListener(strEventName, fnHandler, false); 
		// IE/windows way to add an event listener 
		else if (objObject.attachEvent) 
			objObject.attachEvent("on" + strEventName, fnHandler); 
	}
	
	window.addEventListener("load", go(), false);

})();