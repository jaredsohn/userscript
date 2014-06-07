// ==UserScript==
// @name          SearchJump
// @description	  Allows you to jump quickly between search results on different engines.
// ==/UserScript==


// Modifications
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

	searchenginearray[0] = new Array('Google', 'q', 'google.', 'http://www.google.com/search?q=--keywords--', 1, 'http://www.google.co.uk/favicon.ico');
	searchenginearray[1] = new Array('Google UK', 'q', 'google.', 'http://www.google.co.uk/search?q=--keywords--', 1, 'http://www.google.co.uk/favicon.ico');
	searchenginearray[2] = new Array('Yahoo', 'p', 'search.yahoo.', 'http://search.yahoo.com/search?p=--keywords--', 1, 'http://www.yahoo.com/favicon.ico');
	searchenginearray[3] = new Array('Yahoo UK', 'p', 'search.yahoo.', 'http://search.yahoo.co.uk/search?p=--keywords--', 1, 'http://www.yahoo.com/favicon.ico');
	searchenginearray[4] = new Array('MSN', 'q', 'search.msn.', 'http://search.msn.com/results.aspx?q=--keywords--&amp;FORM=QBHP', 1, 'http://search.msn.com/favicon.ico');
	searchenginearray[5] = new Array('MSN UK', 'q', 'search.msn.', 'http://search.msn.co.uk/results.aspx?q=--keywords--&amp;FORM=QBHP', 1, 'http://search.msn.com/favicon.ico');
	searchenginearray[6] = new Array('Ask', 'ask', 'ask.', 'http://web.ask.com/web?q=--keywords--&amp;qsrc=0&amp;o=0', 0, 'http://www.ask.com/favicon.ico');
	searchenginearray[7] = new Array('Ask', 'q', 'ask.', 'http://web.ask.com/web?q=--keywords--&amp;qsrc=0&amp;o=0', 1, 'http://www.ask.com/favicon.ico');
	searchenginearray[8] = new Array('Yahoo Directory', 'p', 'search.yahoo.', 'http://search.yahoo.com/search/dir?p=--keywords--', 1, 'http://www.yahoo.com/favicon.ico');
	searchenginearray[9] = new Array('DMOZ', 'search', 'dmoz.org', 'http://search.dmoz.org/cgi-bin/search?search=--keywords--', 1, 'http://dmoz.org/favicon.ico');
	searchenginearray[10] = new Array('AllTheWeb', 'q', 'alltheweb.co', 'http://www.alltheweb.com/search?cat=web&q=--keywords--', 1, 'http://www.alltheweb.com/favicon.ico');
	searchenginearray[11] = new Array('AltaVista', 'q', 'altavista.co', 'http://www.altavista.com/web/results?itag=ody&q=--keywords--', 1, 'http://www.altavista.com/favicon.ico');
	searchenginearray[12] = new Array('LookSmart', 'qt', 'search.looksmart.', 'http://search.looksmart.com/p/search?free=1&qt=--keywords--', 1, 'http://search.looksmart.com/favicon.ico');
	searchenginearray[13] = new Array('Lycos', 'query', 'lycos.co', 'http://search.lycos.com/default.asp?loc=searchbox&tab=web&query=--keywords--', 1, 'http://www.lycos.com/favicon.ico');

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
            b.setAttribute("style","position: fixed; bottom: 20px; right: 0; padding: 10px 0; background: #eee; border: 1px solid #ccc; border-right: 0; width: 150px; overflow: hidden;");

				for (i = 0; i < searchenginearray.length; i++) {

					if (searchenginearray[i][4] == 1) {

						linkstyle = "text-align: left; white-space: nowrap; text-decoration: none; background:  url('" + searchenginearray[i][5] + "') #FFF 1px center no-repeat; margin: 0 10px 3px 10px; padding: 3px 8px 3px 20px; display: block; color: #00c; font-size: 80%;";
					
						lg[i] = document.createElement("a")
						lg[i].setAttribute("href", searchenginearray[i][3].replace('--keywords--', keywords));
						lg[i].setAttribute("style", linkstyle);
						addtext(lg[i], searchenginearray[i][0]);
						b.appendChild(lg[i]);

					}

				}

                ls = document.createElement("span")
                ls.setAttribute("style", "text-decoration: none; margin: 0 10px 3px 10px; padding: 3px 8px 3px 8px; display: block; color: #ddf; font-size: 80%; overflow: hidden;");
				addtext(ls, " ");
                b.appendChild(ls);

                li = document.createElement("a")
                li.setAttribute("href","http://www.ilovejackdaniels.com/user-scripts/search-jump-user-script/");
                li.setAttribute("style", footerlinkstyle);
				addtext(li, "Info / Updates");
                b.appendChild(li);

                lc = document.createElement("a")
                lc.setAttribute("style", footerlinkstyle);
                lc.setAttribute("href","#");
                lc.setAttribute("onClick","return false;");
				addtext(lc, 'Hide \u00BB');
                b.appendChild(lc);
				lc.style.textAlign = 'right';

            document.body.appendChild(b);
			b.addEventListener("click", toggle_box, false);
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