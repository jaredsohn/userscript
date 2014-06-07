// ==UserScript==
// @name          SearchCool
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

	searchenginearray[0] = new Array('Baidu', 'wd', 'baidu.', 'http://www.baidu.com/s?wd=--keywords--', 1, 'http://www.baidu.com/favicon.ico');
	searchenginearray[1] = new Array('Google', 'q', 'google.', 'http://www.google.com.hk/search?q=--keywords--', 1, 'http://www.google.com.hk/favicon.ico');
	searchenginearray[2] = new Array('SOSO', 'w', 'soso.', 'http://www.soso.com/q?w=--keywords--', 1, 'http://www.soso.com/favicon.ico');
	searchenginearray[3] = new Array('Taobao', 'q', 'taobao.', 'http://s8.taobao.com/search?q=--keywords--&pid=mm_13684037_0_0', 1, 'http://www.taobao.com/favicon.ico');
	searchenginearray[4] = new Array('jingdong', 'keyword', '360buy.', 'http://search.360buy.com/Search?keyword=--keywords--&enc=utf-8', 1, 'http://www.360buy.com/favicon.ico');
	searchenginearray[5] = new Array('xunlei', 'q', 'xunlei.', 'http://www.google.com/cse?cx=017965786629098322741%3Axaaco1_hyga&q=--keywords--', 1, 'http://www.xunlei.com/favicon.ico');
	
	
	

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

						linkstyle = "text-align: left; white-space: nowrap; text-decoration: none; background:  url('" + searchenginearray[i][5] + "') #FFF 1px center no-repeat; margin: 0 10px 3px 10px; padding: 3px 8px 3px 20px; display: block; color: #00c; font-size: 90%;";
					
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
                li.setAttribute("href","http://userscripts.org/scripts/show/138892");
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