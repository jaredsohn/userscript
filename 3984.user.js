// ==UserScript==// @name          Google Navigator// @namespace     http://pragmaticprose.com/// @description	 Version 1.2.7 Navigate google results using keyboard.  Currently Web, Images, Groups and News pages are supported.  Press H for more help.// @include       http://google.*// @include       http://www.google.*// @include       http://groups.google.*// @include       http://images.google.*// @include       http://news.google.*//@exclude      http://www.google.com/firefox*
// ==/UserScript==
// Notes:// V 1.2.0 Added scrolling to center screen on highlighted search item// V 1.2.5 Added J & K key for moving down and up through items (ala vi)//              Also excluded http://www.google.com/firefox* from this script// V 1.2.6 Fixed next and previous on Google Groups//	       Fixed the s key to not type s in search input when pressing s to set focus to the search box// V 1.2.7 Added support for the 't' key which will open the currently highlighted link in a new tab
//based on http://userscripts.org/scripts/show/3673

const NORMAL_KLASS = "g";
const HOVER_KLASS = "ghover";
const HOVER_CSS = ".ghover {margin-top: 1em;margin-bottom: 1em;font-weight:bold;padding:10px;-moz-border-radius: 10px;-moz-opacity:0.9;background-color:#fad163;}";
const KEY_LEFT = 37;
const KEY_UP = 38;const KEY_RIGHT = 39;const KEY_DOWN = 40;
const KEY_ENTER = 13;const KEY_D = 68;
const KEY_G = 71;const KEY_H = 72;const KEY_I = 73;const KEY_J = 74;const KEY_K = 75;const KEY_M = 77;const KEY_N = 78;const KEY_R = 82;const KEY_S = 83;const KEY_T = 84;const KEY_U = 85;const KEY_W = 87;const ST_WEB = "www.google.com";const ST_GROUP = "groups.google.com";const ST_IMAGE = "images.google.com";const ST_NEWS = "news.google.com";(function () {
	GM_log('VERSION 1.2.7');	function getSearchType() {					if (window.location.host == ST_WEB) {			return ST_WEB;		} else		if (window.location.host == ST_GROUP) {			return ST_GROUP;		}		if (window.location.host == ST_IMAGE) {			return ST_IMAGE;		}		if (window.location.host == ST_NEWS) {			return ST_NEWS;		}			}		var searchType = getSearchType();	//GM_log (searchType);	var navNodes = document.evaluate("//td[@class='b']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		// try to get the links of all the search types		var webSearchPath = document.evaluate("//a[@class='q' and @id='t0a']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);			//GM_log('webSearchPath: ' + webSearchPath);				var imageSearchPath = document.evaluate("//a[@class='q' and @id='t1a']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);			//GM_log ('imageSearchPath: ' + imageSearchPath);		var groupSearchPath = document.evaluate("//a[@class='q' and @id='t2a']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);			//GM_log('groupSearchPath: ' + groupSearchPath);		var newsSearchPath = document.evaluate("//a[@class='q' and @id='t4a']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);			//GM_log('newsSearchPath: ' + newsSearchPath);		// try to find the "Did you mean:" phrase...	if (searchType == ST_WEB || searchType == ST_IMAGE) {		try {			var didYouMeanPath = document.evaluate("//p[font[@class and @color]]", document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).childNodes[1];		}		catch (e) { }	} else	if (searchType == ST_GROUP) {		try {			var didYouMeanPath = document.evaluate("//font[@size='-0' and @color='#aa0000']", document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).childNodes[1];		}		catch (e) {}	} else	if (searchType == ST_NEWS) {		try {			var didYouMeanPath = document.evaluate("//p[font[@color='#cc0000']]", document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).childNodes[1];			}		catch (e) {}	}		//GM_log('didYouMeanPath: ' + didYouMeanPath);		var navImages = null;		var quickNodes = document.evaluate("//a[@class='q']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		var next = null;	var prev = null;		if (searchType == ST_GROUP) {		// the layout for http://groups.google.com is different so we have to use some ugly xpath to grab the previous and next buttons		var nextNodes = document.evaluate("id('bottom_marker')/tbody/tr/td[2]/div/table/tbody/tr/td[13]/a", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		next = nextNodes.snapshotItem(0).getAttribute ("href");				try {		var prevNodes = document.evaluate("id('bottom_marker')/tbody/tr/td[2]/div/table/tbody/tr/td[2]/a", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		prev = prevNodes.snapshotItem(0).getAttribute ("href");		} catch (ex) {			GM_log(ex.message);		}					}	else {		if (navNodes.snapshotLength == 2) {				prev = navNodes.snapshotItem(0).firstChild.getAttribute ("href");				next = navNodes.snapshotItem(1).firstChild.getAttribute ("href");		} else if (navNodes.snapshotLength == 1) {				next = navNodes.snapshotItem(0).firstChild.getAttribute ("href");		}	}	GM_log('Group Next HREF = ' + next);	GM_log('Group Prev HREF = ' + prev);		var nodes;	var results = new Array();	if (searchType == ST_WEB) {		nodes = document.evaluate("//p[@class='g']", document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		for (var i = 0; i < nodes.snapshotLength; i++) {			results.push (nodes.snapshotItem (i));		}
	} else	if (searchType == ST_GROUP) {		nodes = document.evaluate("//td[@style='width: 38em;']", document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		for (var i = 0; i < nodes.snapshotLength; i++) {			results.push (nodes.snapshotItem (i));		}	} else	if (searchType == ST_IMAGE) {		nodes = document.evaluate("//td[@width = '23%' and @valign='bottom']", document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		for (var i = 0; i < nodes.snapshotLength; i++) {			results.push (nodes.snapshotItem (i));		}	} else	if (searchType == ST_NEWS) {		try {		nodes = document.evaluate("//table[@width = '75%' and @valign='top']", document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		for (var i = 0; i < nodes.snapshotLength; i++) {			results.push (nodes.snapshotItem (i));		}		}		catch (e) {			alert('error: ' + e.message);		}	}		var index = -1;

	var searchField;
	if (document.layers)
		document.captureEvents(Event.FOCUS | Event.BLUR);

	var txtboxes = document.evaluate("//input[@type='text']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < txtboxes.snapshotLength; i++) {
		var txtbox = txtboxes.snapshotItem (i);
		if (i == 0)
			searchField = txtbox;

		txtbox.addEventListener ('focus', function () { document.removeEventListener ('keydown', keypress_handler, true); }, true);
		txtbox.addEventListener ('blur', function () { document.addEventListener ('keydown', keypress_handler, true); }, true);
	}
		function getDim(el){
		for (var lx=0,ly=0;el!=null;
			lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
		return {x:lx,y:ly}
	}
	function highlight (pos) {
		for (var i = 0; i < results.length; i++)
			if (pos == i) {
				results [i].className = HOVER_KLASS;				var halfScreen = (window.innerHeight / 2);				var y = getDim(results[i]).y - halfScreen;				window.scroll(0, y);			}
			else
				results [i].className = NORMAL_KLASS;
	}	function keypress_handler (e) {		GM_log('key: ' + e.charCode);		switch (e.which) {
		case (KEY_UP):		case (KEY_K):
			if (index <= 0)
				index = results.length - 1;
			else
				index--;
			highlight (index);
			break;		case (KEY_J):
		case KEY_DOWN:
			if (index >= results.length - 1)
				index = 0;
			else
				index++;
			highlight (index);
			break;
		case KEY_ENTER:
			if (index == -1)
				return false;
			if (searchType == ST_WEB) {
				document.location = results[index].firstChild.nextSibling.getAttribute ("href");			} else			if (searchType == ST_GROUP) {				document.location = results[index].childNodes[1].firstChild.getAttribute("href");			} else			if (searchType == ST_IMAGE) {				document.location = results[index].firstChild.getAttribute("href");			}			if (searchType == ST_NEWS) {				alert(results[index].firstChild.firstChild.firstChild.firstChild.getAttribute("href"));				document.location = results[index].firstChild.firstChild.firstChild.firstChild.getAttribute("href");			}
			break;		case KEY_T:			GM_log("handle t");
			if (index == -1)
				return false;
			if (searchType == ST_WEB) {
				GM_openInTab( results[index].firstChild.nextSibling.getAttribute ("href") );			} else			if (searchType == ST_GROUP) {				GM_openInTab( results[index].childNodes[1].firstChild.getAttribute("href") );			} else			if (searchType == ST_IMAGE) {				GM_openInTab( results[index].firstChild.getAttribute("href") );			}			if (searchType == ST_NEWS) {				GM_log(results[index].firstChild.firstChild.firstChild.firstChild.getAttribute("href"));				GM_openInTab( results[index].firstChild.firstChild.firstChild.firstChild.getAttribute("href") );			}
			break;		case KEY_D:
			if (didYouMeanPath != null) {				document.location = didYouMeanPath;			} 
			break;
		case KEY_G:
			if (groupSearchPath != null) {				document.location = groupSearchPath;			} 
			break;		case KEY_H:			var helpString = 'Shortcut Keys: \n\				D:  "Did you mean" link (if present)\n\				G:  Google Groups Search \n\				H:  This help message \n\				I:  Image Search \n\				J:  Cycle down through search results \n\				K: Cycle up through search results \n\				N:  News Search \n\				S:  Set Focus to the search field \n\				T:  Open currently highlighted link in new tab \n\				W:  Web Search \n\				Right Arrow: Next Page \n\				Left Arrow:  Previous Page \n\				Up Arrow:  Cycle up through search results \n\				Down Arrow: Cycle down through search results \n\				';
			alert(helpString);						 
			break;		case KEY_I:
			if (imageSearchPath != null) {				document.location = imageSearchPath;			} 
			break;		case KEY_N:
			if (newsSearchPath != null) {				document.location = newsSearchPath;			} 
			break;		case KEY_S:			GM_log('stop s from showing up in search box');
			searchField.focus ();			e.returnValue = false; 			e.preventDefault(); 			break;		case KEY_W:
			if (webSearchPath != null) {				document.location = webSearchPath;			}			 
			break;		case KEY_RIGHT:			document.location = next;			break;		case KEY_LEFT:			if (prev != null) {				document.location = prev;			}			break;
		}
		return false;	}

	document.addEventListener ('keydown', keypress_handler, true);

	var style = document.createElement ("style");	document.body.appendChild (style);	var ss = document.styleSheets [document.styleSheets.length - 1];	ss.insertRule (HOVER_CSS, 0);	GM_log('ready');
}) ();


