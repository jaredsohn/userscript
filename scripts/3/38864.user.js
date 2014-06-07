// ==UserScript==
// @name           Ajaxify Sinfest
// @namespace      http://frz.cc/userscripts
// @description   Preloads next and previous sinfest strips when browsing the archive for faster reading
// @include        http://www.sinfest.net/archive_page.php?comicID=*
// ==/UserScript==

function $x(xpath, root) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root || doc, null, 0, null ), result = [];
  while(next = got.iterateNext())
    result.push(next);
  return result;
}

function findURL(page) {
   	 var start = (page.indexOf('<img src="http://sinfest.net/comikaze/')) + 10;
   	 var end = page.indexOf('" alt=', start);
   	 return page.substr(start, end-start);
}

function getLink(direction) {
	var img = $x ('//img[@src="' + direction + '"]');
	if (img.length > 0) {
		if (img[0].parentNode.nodeName != "A") { // strip 1 - not in a link |:!
			var a = document.createElement("a");
			a.setAttribute('href', '');
			img[0].parentNode.replaceChild(a, img[0]);
			a.appendChild(img[0]);
		}
		return img[0].parentNode;
	} else {
		return false;
	}
}

function updateURLs(force) {
	if (strip == 1) {
		preva.setAttribute('style', 'cursor:default');
		prevstripurl = (baseurl + strip);
	} else {
		preva.setAttribute('style', '');
		prevstripurl = (baseurl + (strip - 1));
	}
	nextstripurl = (baseurl + (strip + 1));
	nexta.setAttribute('href', nextstripurl);
	preva.setAttribute('href', prevstripurl);
	if (future["title"]) {
		nexta.setAttribute('title', future["title"]);
	} else {
		nexta.setAttribute('title', '');
	}
	if (past["title"]) {
		preva.setAttribute('title', past["title"]);
	} else {
		preva.setAttribute('title', '');
	}
	if (force) {
		goNext();
	}
}

function hookListeners() {
	nexta.addEventListener('click', function (ev) {
		goNext();
		ev.preventDefault();
	}, true);
	preva.addEventListener('click', function (ev) {
		goPrev();
		ev.preventDefault();
	}, true);
}

function goNext() {
	goSomewhere (future, nextstripurl, strip + 1);
}

function goPrev() {
	goSomewhere (past, prevstripurl, strip - 1);
}

function goSomewhere(nav, turl, newstrip) {
	if (nav["prefetch"].src != "" && nav["title"]) {
		ajaxMove(newstrip, nav);
	} else {
		window.location.href = turl;
	}
}


function ajaxMove(to, nav) {
	if (!nav["prefetch"].complete) {
		comic.src = '';
	}
	var newtitle = nav["title"];
	var loadingAni = ['/', '-', '\\', '|'];
	var curStep = 0;
	var loaded = false;
	
	var loadWait = function() {
		if (!loaded) {
			comictitle.nodeValue = newtitle + " (Loading: " + loadingAni[curStep] + ')';
			curStep = (curStep + 1) % loadingAni.length;
		}
	};
	loadWait();
	var interval = window.setInterval(loadWait, 250);
	
	var listener = comic.addEventListener('load',
		function (ev) {
			loaded = true;
			window.clearInterval(interval);
			comictitle.nodeValue = newtitle;
			comic.removeEventListener('load', listener, true);
		}, true);
	comic.src = nav["prefetch"].src;
	strip = to;
	window.location.href = orgurl + "#" + strip;
	updateURLs();
	if (prefetchNext) {
		getNextStrip(future, nextstripurl, false);
	}
	if (prefetchPrev) {
		getNextStrip(past, prevstripurl, false);
	}

}

function getNextStrip(direction, nurl, myanchornumber) {
	direction["prefetch"].setAttribute('src', '');
	direction["title"] = false;
	GM_xmlhttpRequest({
		method:"GET",
		url:nurl,
		onload:function(response) {
			var t = response.responseText
			var nextcomicurl = findURL(t);
			direction["prefetch"].setAttribute('src', nextcomicurl);
			var startTitle= t.indexOf('<font fact="Fixedsys">');
			startTitle = t.indexOf('<br>', startTitle) + 4;
			direction["title"] = t.substr(startTitle, t.indexOf('</font>', startTitle) - startTitle);
			if (myanchornumber) {
				updateURLs(true);
			} else {
				updateURLs(false);
			}
		}
	});
}

function Navigation(title, prefetch) {
	this.title = title;
	this.prefetch = prefetch;
}

document.addEventListener('keydown', function(ev) {
	var keycode = ev.which;
	if(keycode == 37){ // display previous image
		goPrev();
	} else if(keycode == 39){ // display next image
		goNext();
	}	
}, true);

var findnum = /=([0-9]+)/;
findnum.exec(window.location.search);
var strip = Number(RegExp.$1);
var baseurl = "http://sinfest.net/archive_page.php?comicID=";

var orgurl = window.location.href;
var anchor = orgurl.indexOf('#');
var anchornumber = false;
if (anchor != -1) {
	anchornumber = Number(orgurl.substr(anchor + 1));
	orgurl = orgurl.substr(0, anchor);
	strip = anchornumber - 1;
}

var prefetchNext = GM_getValue("prefetch.next", true);
GM_setValue("prefetch.next", prefetchNext);
var prefetchPrev = GM_getValue("prefetch.previous", true);
GM_setValue("prefetch.previous", prefetchPrev);

var nextstripurl;
var prevstripurl;

var nexta = getLink("images/next_a.gif");
var preva = getLink("images/prev_a.gif");
var firsta = getLink("images/first_a.gif");
firsta.setAttribute('href', baseurl + 1);

var comic = $x('//p/img')[0];
var comictitle = $x('//tr/td/p/b/font')[0];
comictitle = comictitle.firstChild.nextSibling.nextSibling;

var nextimg = document.createElement("img");
nextimg.setAttribute("style", "display: none");
var previmg = document.createElement("img");
previmg.setAttribute("style", "display: none");

nexta.parentNode.appendChild(nextimg);

var future = new Navigation(false, nextimg);
var past = new Navigation(false, previmg);

updateURLs();
hookListeners();
if (prefetchNext || anchornumber) {
	getNextStrip(future, nextstripurl, anchornumber);
}
if (prefetchPrev) {
	getNextStrip(past, prevstripurl, false);
}
