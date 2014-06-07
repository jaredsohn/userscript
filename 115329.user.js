// Copyright 2012 Roque Pinel.
//
// This file is part of Netflix InstantQueue Fix GM.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ==UserScript==
// @name          Netflix InstantQueue Fix GM
// @namespace     http://pinel.cc
// @description   Add Instant Queue support to Netflix outside US.
// @version 2.3
// @icon http://pinel.cc/files/NetFlixInstantQueueFix/NetFlixInstantQueueFix_32.png
// @match       http://*.netflix.com/*
// @match       https://*.netflix.com/*
// @run-at document-end
// ==/UserScript==

function getId()
{
	var id = null;

// http://movies.netflix.com/AddToQueue?movieid=70155610&amp;qtype=ED&amp;trkid=4343997&amp;authURL=1335790173591.RH30M8dkCfmxNM%2F4n6jkXGA7OsU%3D&amp;section=WATCHNOW

	var as = document.evaluate(
		'//a[@class="readMore mdpLink"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(as.snapshotLength)
	{
		var a = as.snapshotItem(0);
		id = a.href.match(/\/(\d*)\?/);
	}
	else
	{
		var divI = document.evaluate(
			'//div[@class="displayPagePlayable " or @class="displayPagePlayable vertical" or @class="displayPagePlayable hasText vertical"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		if(divI.snapshotLength)
		{
			var div = divI.snapshotItem(0);

			if (div)
				id = div.innerHTML.match(/movieid=(\d*)/);
		}
	}

	return (id && id.length > 1) ? id[1] : null;
}

function getTrkid()
{
	var trkid = null;

	var as = document.evaluate(
		'//a[@class="readMore mdpLink"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(as.snapshotLength)
	{
		var a = as.snapshotItem(0);
		trkid = a.href.match(/trkid=(\d*)/);
	}
	else
	{
		var divI = document.evaluate(
			'//div[@class="displayPagePlayable " or @class="displayPagePlayable vertical" or @class="displayPagePlayable hasText vertical"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		if(divI.snapshotLength)
		{
			var div = divI.snapshotItem(0);

			if (div)
				trkid = div.innerHTML.match(/trkid=(\d*)/);
		}
	}

	return (trkid && trkid.length > 1) ? trkid[1] : null;
}

function getAuthURL()
{
	var authURL = null;

	var as = document.evaluate(
		'//a[contains(@href, "https://account.netflix.com/Logout")]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(as.snapshotLength)
	{
		var a = as.snapshotItem(0);
		authURL = a.href.match(/authURL=(.*)/);
	}

	return (authURL && authURL.length > 1) ? authURL[1] : null;
}

function changeBobMovie()
{
	var as = document.evaluate(
		'//a[@a="NetflixInstantQueueFix"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	// if the link wasn't already added
	if (as.snapshotLength)
	{
		//console.log('[NetFlix InstantQueue Fix] Bob Shot button already exists.');
		return;
	}

	var divs = document.evaluate(
		'//div[contains(@class, "bobMovieActions")]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(!divs.snapshotLength)
		return;

	var bobMovieActions = divs.snapshotItem(0);

	var id = getId();
	var trkid = getTrkid();
	var authURL = getAuthURL();

	// if we have all the information needed and the link wasn't already added
	if (id && trkid && authURL && bobMovieActions)
	{
		var addURL = 'http://movies.netflix.com/AddToQueue?movieid=' + id + '&qtype=INSTANT&trkid=' + trkid + '&authURL=' + authURL + '&section=WATCHNOW';

		var addItemString = '<span class="btnWrap mltBtn mltBtn-s186"><a data-vid="'
			+ id + '" class="btn btn-186 addlk btn-ED-186 btn-rent btn-ED-rent" href="'
			+ addURL + '" id="NetflixInstantQueueFix"><span class="inr ">Instant Queue</span></a></span>';

		bobMovieActions.innerHTML = addItemString;
	}
}

function onMouseEnterBoxShot()
{
	// workaround to wait until we have the information
	window.setTimeout(function(){changeBobMovie();}, 1000);
}

function addButtonBoxShot()
{
	//console.log('[NetFlix InstantQueue Fix] Adding event to BoxShot.');

	var spans, span;
	spans = document.evaluate( 
		'//span[@class="boxShot boxShot-166 hoverPlay bobbable"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(!spans.snapshotLength)
		return;

	for(var i = 0; i < spans.snapshotLength; i++)
	{
		span = spans.snapshotItem(i);
		span.addEventListener('mouseover', function(event){onMouseEnterBoxShot();}, false);
	}
}

function addButtonMoviesAndSeries()
{
	var as = document.evaluate(
		'//a[@a="NetflixInstantQueueFix"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	// if the link wasn't already added
	if (as.snapshotLength)
	{
		//console.log('[NetFlix InstantQueue Fix] Button already exists.');
		return;
	}

	//console.log('[NetFlix InstantQueue Fix] Adding button to page.');

	var spans = document.evaluate(
		'//span[@class="btnWrap mltBtn mltBtn-s60"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(!spans.snapshotLength)
	{
		//console.log('[NetFlix InstantQueue Fix] Cannot find place to add the button.');
		return;
	}

	var btnWrap = spans.snapshotItem(0);

	var id = getId();
	var trkid = getTrkid();
	var authURL = getAuthURL();

	// if we have all the information needed
	if (id && trkid && authURL && btnWrap)
	{
		var addURL = 'http://movies.netflix.com/AddToQueue?movieid=' + id + '&qtype=ED&trkid=' + trkid + '&authURL=' + authURL + '&section=WATCHNOW';

		var addItemString = '<a class="btn btn-60 addlk btn-ED-60 btn-rent btn-ED-rent" data-vid="" href='
			+ addURL + '" id="NetflixInstantQueueFix"><span class="inr">Add to Instant Queue</span></a>';

		btnWrap.innerHTML = btnWrap.innerHTML + addItemString;
	}
}

function addNavigationButton()
{
	var nav = null;

	var elements = document.getElementsByTagName('ul');

	var element;
	for (var i = 0; (element = elements[i]) != null; i++)
	{
		var className = element.className;
		if (className && (className.indexOf('navigation') || className.indexOf('nav-menu')))
		{
			nav = element;
			break;
		}
	}

	if (nav)
	{
		var isButtonAdded = false;

		for (var i = 0; (element = nav.childNodes[i]) != null; i++)
		{
			if (element.id && element.id == 'nav-queue')
			{
				isButtonAdded = true;
				break;
			}
		}

		if (isButtonAdded)
		{
			console.log('[NetFlix InstantQueue Fix] Instant Queue already exists.');
		}
		else
		{
			//console.log('[NetFlix InstantQueue Fix] Adding Instant Queue to the navigation.');

			var navQueue = document.createElement('li');

			navQueue.id = 'nav-queue';
			navQueue.className = 'nav-item';
			navQueue.innerHTML = '<span class="i-b content"><a title="Instant Queue" href="http://movies.netflix.com/Queue?qtype=ED"><span>Instant Queue</span></a></span><span class="i-b shim"></span>';

			nav.appendChild(navQueue);

//			var navSuggestions = document.createElement('li');

//			navSuggestions.id = 'nav-suggestions';
//			navSuggestions.className = 'nav-item';
//			navSuggestions.innerHTML = '<span class="i-b content"><a title="Suggestions" href="http://movies.netflix.com/RecommendationsHome?lnkctr=mh2rh"><span>Suggestions</span></a></span><span class="i-b shim"></span>';

//			nav.appendChild(navSuggestions);

			var navAdditions = document.createElement('li');

			navAdditions.id = 'nav-additions';
			navAdditions.className = 'nav-item';
			navAdditions.innerHTML = '<span class="i-b content"><a title="Additions" href="http://movies.netflix.com/WiRecentAdditions"><span>Additions</span></a></span><span class="i-b shim"></span>';

			nav.appendChild(navAdditions);
		}
	}
	else
	{
		console.log('[NetFlix InstantQueue Fix] No navigation.');
	}
}

function addButtonSearchResultAndMoreLike()
{
	var divs = document.evaluate(
		'//div[@class="actions clearfix"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(!divs.snapshotLength)
		return;

	//console.log('[NetFlix InstantQueue Fix] Adding button for search result and more like.');

	var authURL = getAuthURL();

	for (var i = 0; i < divs.snapshotLength; i++)
	{
		var div = divs.snapshotItem(i);

		var id = null;
		var trkid = null;

		var vars = div.innerHTML.match(/id=\".(\d*)_(\d*)_\d_\d\"/);

		if (vars && vars.length == 3)
		{
			id = vars[1];
			trkid = vars[2];
		}

		if (id && trkid && authURL && div)
		{
			var addURL = 'http://movies.netflix.com/AddToQueue?movieid=' + id + '&qtype=ED&trkid=' + trkid + '&authURL=' + authURL + '&section=WATCHNOW';

			var addItemString = '<span class="btnWrap mltBtn mltBtn-s186" onmouseover="inlevent(this, event)"> <a class="btn btn-186 addlk btn-ED-186 btn-rent btn-ED-rent" data-vid="' + id + '" href=' + addURL + '" id="NetflixInstantQueueFix"><span class="inr">Instant Queue</span></a></span>';

			div.innerHTML = div.innerHTML + addItemString;
		}
	}
}

function addButtonRecommendations()
{
	var as;
	as = document.evaluate(
		'//a[@class="btn btn-40 watchlk btn-play btn-def "]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(!as.snapshotLength)
		return;

	//console.log('[NetFlix InstantQueue Fix] Adding button for recommendations');

	var authURL = getAuthURL();
	var trkid = null;

	for (var i = 0; i < as.snapshotLength; i++)
	{
		var a = as.snapshotItem(i);

		var id = a.href.match(/movieid=(\d*)/);
		id = (id && id.length > 1) ? id[1] : null;

		if (trkid == null)
		{
			trkid = a.href.match(/trkid=(\d*)/);
			trkid = (trkid && trkid.length > 1) ? trkid[1] : null;
		}

		var btnWrap = a.parentNode;

		if (id && trkid && authURL && btnWrap)
		{
			var addURL = 'http://movies.netflix.com/AddToQueue?movieid=' + id + '&qtype=ED&trkid=' + trkid + '&authURL=' + authURL + '&section=WATCHNOW';

			var addItemString = '<a class="btn btn-40 addlk btn-ED-40 btn-rent btn-ED-rent btn-flyc" data-vid="" href='
				+ addURL + '" id="NetflixInstantQueueFix"><span class="inr">Add to Instant Queue</span></a>';

			btnWrap.innerHTML = btnWrap.innerHTML + addItemString;
		}
	}
}

(function()
{
	//console.log('[NetFlix InstantQueue Fix] Loading...');

	addNavigationButton();

	addButtonBoxShot();

	addButtonMoviesAndSeries();

	addButtonSearchResultAndMoreLike();

	addButtonRecommendations();

	//console.log('[NetFlix InstantQueue Fix] Loaded');
})();


// EOF

