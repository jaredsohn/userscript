// ==UserScript==
// @name		  Definitive Google Auto Pager
// @namespace	  	  http://ma.la/
// @author	  	  ma.la <timpo@ma.la>
// @include	  	  http://www.google.*/search*
// @description	  	  Autoloads for next page of Google search results.
// @source	  	  http://userscripts.org/scripts/show/8430
// @identifier	  	  http://userscripts.org/scripts/source/8430.user.js
// @date	  	  26-04-2007
// @version	  	  1.05 modified by Pawel Kubisz <http://7.8.9g.pl>
// ==/UserScript==


// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html


//:::::::CHANGELOG:::::::
// ver 0.1 @ 2005-06-23
//  experimental release
//
// ver 0.2 @ 2005-06-23
//  double click to start.
//
// ver 0.3 @ 2005-12-02 - modified by beerboy <http://beerboy.org/>
//  convert XMLHttpRequest to GM_xmlhttpRequest.
//
// ver 0.4 @ 2006-01-17 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - Disable "Double Click enable/disable function".
//  - Change all-links-target to _blank.
//  - Add "New Loading" effect.
//
// ver 0.5 @ 2006-09-02 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - fixed unloading-bug when the google-result contains sponsor.
//
// ver 0.6 @ 2006-10-15 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - fixed method of search 'Next href'.
//  - add 'End' text when search result was terminated.
//
// ver 0.7 @ 2006-11-15 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - Apply new Google HTML Result.
//
// ver 0.8 @ 2006-12-05 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - Add Hatena Bookmark Count function by following script.
//	   http://d.hatena.ne.jp/kusigahama/20051207#p1
//	   http://ukgk.g.hatena.ne.jp/faerie/
//
// ver 0.9 @ 2007.01.03 - modified by Paul Irish <http://userscripts.org/people/47>
//  - Removed Hatena bookmark count and target="_blank" functionality
//
// ver 1.0 @ 2007.01.04 - modified by fazibear <http://fazibear.prv.pl#javascript_en>
//  - Wait message changed.
//  - New content appear before footer, and wait message.
//
// ver 1.01 @ 2007.04.11 - modified by Pawel Kubisz <http://7.8.9g.pl>
// - reverted dblclick initial functionality
// - changed way of appending next results content
// - simplified and accelarated appendSearchResult with XPath formulas
//
// ver 1.02 @ 2007.04.26 - updated by Pawel Kubisz <http://7.8.9g.pl>
// - changed the formula of storageContainer
//
// ver 1.03 @ 2007.04.26 - modified by Pawel Kubisz <http://7.8.9g.pl>
// - added script autoupdate feature
//
// ver 1.04 @ 2007.05.01 - modified by Pawel Kubisz <http://7.8.9g.pl>
// - added domains counter
//
// ver 1.05 @ 2007.05.01 - fixed by Pawel Kubisz <http://7.8.9g.pl>
// - fixed small bug reported by KosciaK


(function(){
	var base = "http://"+location.host+"/search";
	var startNr;
	var itemsQuantity;
	var storageContainer;
	var resultsCount;
	var query;
	var loadingElemID = 'navbar';
	var Enable = -1;
	var currVer = '1.05';

	var Remain = {
		valueOf : function() {
			var sc = document.body.scrollTop;
			var total = (document.body.scrollHeight - document.body.clientHeight);
			var remain = total - sc;
			return total - sc;
		}
	};

	var watch_scroll = function() {
		var self = arguments.callee;
		if (Remain < 500 && Enable == 1) {
			do_request();
		}
		setTimeout(self,100);
	};

	var appendSearchResult = function() {
		var isNextExist = document.evaluate("//div[@id='googleResult']//div[@id='nn']", document, null, 9, null).singleNodeValue;
		var list = document.evaluate("//div[@id='googleResult']//div[@class='g']", document, null, 6, null);
		for (var i = 0; i < list.snapshotLength; i++)
		{
			var item = list.snapshotItem(i);
			if (!item.getAttribute('style')) {
				resultsCount += 1;
				addCounter(item, resultsCount);
			}
			storageContainer.appendChild(item);
		}

		if (!!isNextExist) {
			startNr += itemsQuantity;
		} else {
			insertEndText();
		}
		document.body.removeChild(document.getElementById('googleResult'));
	};


	var addCounter = function(it, rc) {
		var nr = rc + ". ";
		it.insertBefore(document.createTextNode(nr), it.firstChild);
	};

	var insertEndText = function() {
		var elem = document.createElement("div");
		elem.innerHTML = "end of the search results";
		with (elem.style) {
			padding = "0.3em";
			marginBottom = "5em";
			background = "#00E";
			color = "#F00";
			fontWeight = "bold";
			textDecoration = "blink";
		};
		document.body.appendChild(elem);
	};

	var insertLoadingText = function() {
		var wait = document.getElementById(loadingElemID);
		if(wait){
			wait.innerHTML = '<div style="margin: 0 auto; width: 176px; height: 63px; background-image: url(http://www.google.com/reader/ui/1368647008-loading.gif)"><p style="margin: 0; padding: 20px 0 0 15px; font-weight: bold; font-size: 130%; color: rgb(34, 34, 34);">Loading</p></div>';
		}
	}

	var do_request = function(){
		if (this.requested == startNr) return;

		this.requested = startNr;
		document.getElementById(loadingElemID).style.display = 'block';
		GM_xmlhttpRequest({
			method:"GET",
			url:base + query.replace(/start=\d+/,"start=" + startNr),
			onload:function(details)
			{
				document.getElementById(loadingElemID).style.display = 'none';
				var googleResult = document.body.appendChild(document.createElement('div'));
				googleResult.innerHTML = details.responseText;
				googleResult.style.display = 'none';
				googleResult.id = 'googleResult';
				appendSearchResult();
			}
		});
	};

	var init_autopager = function(){
		if(document.getElementById('nn'))
		{
			autoUpdateFromUserscriptsDotOrg({
				name: 'Definitive Google Auto Pager',
				url: 'http://userscripts.org/scripts/source/8430.user.js',
				version: currVer,
			});
			query = document.getElementById('nn').parentNode.search;
			startNr = (query.match(/start=(\d+)/))[1] - 0;
			storageContainer = document.evaluate('//div[@id="res"]/div[not(@id) and not(@style)]', document, null, 9, null).singleNodeValue;
			resultsCount = document.evaluate("count(//div[contains(@class, 'g') and not(@style)])", document, null, 1, null).numberValue;
			var tmp = query.match(/num=(\d+)/);
			itemsQuantity = tmp ? (tmp[1] - 0) : 10;
		}
	};

	var dblClickEvents = function(){
		if (window.location.href.indexOf(base) != -1)
		{
			Enable *= -1;
			init_autopager();
			insertLoadingText();
			watch_scroll();
		}
	};
	
	var autoUpdateFromUserscriptsDotOrg = function (SCRIPT){
		try {
			if (!GM_getValue) return;
			var DoS_PREVENTION_TIME = 2 * 60 * 1000;
			var isSomeoneChecking = GM_getValue('CHECKING', null);
			var now = new Date().getTime();
			GM_setValue('CHECKING', now.toString());
			if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
			
			// check daily
			var ONE_DAY = 24 * 60 * 60 * 1000;
			var lastChecked = GM_getValue('LAST_CHECKED', null);
			if (lastChecked && (now - lastChecked) < ONE_DAY) return;
			
			GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
			onload: function(result) {
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
				var theOtherVersion = parseFloat(RegExp.$1);
				if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site
				if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
					GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
				}
			}
			});
			GM_setValue('LAST_CHECKED', now.toString());
		} catch (ex) { }
	}

// init
	document.body.addEventListener('dblclick', dblClickEvents, false);
	//init counter
	var res = document.evaluate("//div[@id='res']//div[contains(@class,'g') and not(@style)]", document, null, 6, null);
	for (var i = 0; i < res.snapshotLength; i++) addCounter(res.snapshotItem(i), i+1);

})();