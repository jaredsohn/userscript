// ==UserScript==
// @name          23hq more about this
// @namespace     http://voiddonothing.eu/scripts/gm
// @description   Shows more about a photo in a tooltip
// @copyright     2009, nownextlater at gmail dot com (http://www.23hq.com/nownextlater)
// @license       Artistic License 2.0; http://www.perlfoundation.org/artistic_license_2_0
// @version       0.9-p1
// @include       http://*23hq.com/*
// @exclude       http://*23hq.com/*/meta
// @exclude       http://*23hq.com/services/*
// @exclude       http://*23hq.com/*/uploader
// ==/UserScript==

// ---------------------------------------------------------------------------
//
// This is '23hq more about this ...', a Greasemonkey user script.
//
// You need Greasemonkey 0.8 or later:
// 	https://addons.mozilla.org/firefox/748/
//
// ---------------------------------------------------------------------------

// History:
// v0.9, 	23apr2009	initial release
// v0.9-p1,	27apr2009	update LICENSES array, and add special case for
//				license id 100 ("Public Domain"),
//				improved error handling (see [A]),
//				changed from UTC to local time,
//				fixed known problem [D]

// Known Problems:
// [A] private photos produce error and therefore invalid tooltip data
//     Note: not to be fixed
// [B] moving mouse pointer into tooltip does trigger a reload
// [C] tooltip does not work some times in case a photo has notes,
//     in case of an 'drawNotes is not defined' error it does work (go figure)
//     Workaround: hover over the 'More about this photo' link instead
// [D] does not work on subscription page (fixed, v0.9-p1))
// [E] output in English only

// ToDo:
// [1] done - v0.9-p1
// [2] make it always work in cases photo has notes
// [3] check if update for itself is available
// [4] make it work (again) on flickr

// Nice to have:
// [1] Support as many languages as 23hq
// [2] Integrate meta data directly (back) into photo page on user choice
//     and at user selected location

// References:
// [0]  http://userscripts.org/scripts/show/47296
// [1]  http://www.23hq.com/doc/api/
// [2]  http://www.flickr.com/services/api/
// [3]  http://www.flickr.com/services/api/auth.spec.html
// [4]  http://www.23hq.com/doc/api/auth
// [5]  To reset all your 23hq API permissions visit:
//      http://www.23hq.com/services/auth/reset
// [6]  http://tech.groups.yahoo.com/group/yws-flickr/
// [7]  http://www.flickr.com/services/api/flickr.interestingness.getList.html
// [8]  http://www.23hq.com/forums/message-view?message_id=4209782
// [9]  http://www.23hq.com/forums/message-view?message_id=4223788
// [10] http://www.flickr.com/groups/flickrhacks/discuss/72157594148402197/

var a,i,m,id;
var mId = 0;
var body; // document.body
var hideTooltipTimeout  = 0;
var metaDataRetrieveDelay = 0;

const REST_Endpoint_URL = "http://www.23hq.com/services/rest/";
const API_KEY = "23hq-topsecretkey-of-voiddonothing";

function prepareTooltip()
	{
	GM_addStyle(
		"#tooltip {background-color: #111111; min-height: 1px; min-width: 1px; max-width: 220px; z-index: 100; position: absolute; border: 2px solid white; padding: 5px;  -moz-border-radius: 5px; opacity: 0.75;} .tooltipheader {font-weight: bold; line-height: 150%; color: white; text-align: right} .tooltipvalue {font-weight: normal; line-height: 150%; color: white; text-align: left} #tooltip > a {font-size: 75%; color: white;}"
		); // GM_addStyle
	} // function prepareTooltip

function hideTooltip(photo)
	{
	var tt = document.getElementById('tooltip')
	if (tt)
	      	{
		body.removeChild(tt);
		window.clearTimeout(metaDataRetrieveDelay);
		window.clearTimeout(hideTooltipTimeout);
		}
	} // function hideTooltip

function moveTooltip(newPos)
	{
	var X = newPos.pageX;
	var Y = newPos.pageY;
	if (document.getElementById('tooltip'))
		{
		document.getElementById('tooltip').setAttribute('style',
			'left:' + (X + 20) + 'px; top:' + (Y - 50) + 'px');
		}
	} // function moveTooltip

function showTooltip(photo)
	{
	// show more ...
	aboutThis = photo.src ? photo.src : photo.href;
	//GM_log("showTooltip (\"" + aboutThis + "\")");

	body = document.getElementsByTagName('body')[0];

	// if exist, remove old tooltip
	if (document.getElementById('tooltip')) {
		body.removeChild(document.getElementById('tooltip'));
		window.clearTimeout(hideTooltipTimeout);
	}

	// add tooltip
	var tooltip = body.appendChild(document.createElement('div'));
	tooltip.setAttribute('id', 'tooltip');

	// fill tooltip with dummy data (for now)
	var tttable = tooltip.appendChild(document.createElement('table'));
	var tttbody = tttable.appendChild(document.createElement('tbody'));

	// 'Date Taken' row
	var tttr1 = tttable.appendChild(document.createElement('tr'));
	var ttth1 = tttr1.appendChild(document.createElement('th'));
	ttth1.setAttribute('class', 'tooltipheader');
	ttth1.setAttribute('noWrap', 'true');
	ttth1.appendChild(document.createTextNode('Date Taken: '));
	var tttd1 = tttr1.appendChild(document.createElement('td'));
	tttd1.setAttribute('class', 'tooltipvalue');
	tttd1.setAttribute('id', 'tt-taken');
	var it1 = tttd1.appendChild(document.createElement('i'));
	it1.appendChild(document.createTextNode('loading...'));
	
	// 'Date Uploaded' row
	var tttr2 = tttable.appendChild(document.createElement('tr'));
	var ttth2 = tttr2.appendChild(document.createElement('th'));
	ttth2.setAttribute('class', 'tooltipheader');
	ttth2.setAttribute('noWrap', 'true');
	ttth2.appendChild(document.createTextNode('Date Uploaded: '));
	var tttd2 = tttr2.appendChild(document.createElement('td'));
	tttd2.setAttribute('class', 'tooltipvalue');
	tttd2.setAttribute('id', 'tt-uploaded');
	var it2 = it1.cloneNode(true);
	tttd2.appendChild(it2);

	// 'Times Viewed' row
	var tttr3 = tttable.appendChild(document.createElement('tr'));
	var ttth3 = tttr3.appendChild(document.createElement('th'));
	ttth3.setAttribute('class', 'tooltipheader');
	ttth3.setAttribute('noWrap', 'true');
	ttth3.appendChild(document.createTextNode('Times Viewed: '));
	var tttd3 = tttr3.appendChild(document.createElement('td'));
	tttd3.setAttribute('class', 'tooltipvalue');
	tttd3.setAttribute('id', 'tt-viewed');
	var it3 = it1.cloneNode(true);
	tttd3.appendChild(it3);

	// 'Ranking' row
	var tttr4 = tttable.appendChild(document.createElement('tr'));
	var ttth4 = tttr4.appendChild(document.createElement('th'));
	ttth4.setAttribute('class', 'tooltipheader');
	ttth4.setAttribute('noWrap', 'true');
	ttth4.appendChild(document.createTextNode('Ranking: '));
	var tttd4 = tttr4.appendChild(document.createElement('td'));
	tttd4.setAttribute('class', 'tooltipvalue');
	tttd4.setAttribute('id', 'tt-rank');
	var it4 = it1.cloneNode(true);
	tttd4.appendChild(it4);

	// 'Favorite' row
	var tttr5 = tttable.appendChild(document.createElement('tr'));
	var ttth5 = tttr5.appendChild(document.createElement('th'));
	ttth5.setAttribute('class', 'tooltipheader');
	ttth5.appendChild(document.createTextNode('Favorite of: '));
	var tttd5 = tttr5.appendChild(document.createElement('td'));
	tttd5.setAttribute('class', 'tooltipvalue');
	tttd5.setAttribute('id', 'tt-faved');
	var it5 = it1.cloneNode(true);
	tttd5.appendChild(it5);

	// 'License' row
	var tttr6 = tttable.appendChild(document.createElement('tr'));
	var ttth6 = tttr6.appendChild(document.createElement('th'));
	ttth6.setAttribute('class', 'tooltipheader');
	ttth6.setAttribute('noWrap', 'true');
	ttth6.appendChild(document.createTextNode('License: '));
	var tttd6 = tttr6.appendChild(document.createElement('td'));
	tttd6.setAttribute('class', 'tooltipvalue');
	tttd6.setAttribute('id', 'tt-lic');
	var it6 = it1.cloneNode(true);
	tttd6.appendChild(it6);

	// on your mark..! set..! go!
	var ttmark = tooltip.appendChild(document.createElement('div'));
	ttmark.setAttribute('align', 'right');
	var pi = ttmark.appendChild(document.createTextNode('\u03C0'));

	// avoid unnecessary traffic by requesting photo meta data only if
	// tooltip shown longer than a second
	metaDataRetrieveDelay = window.setTimeout(function()
		{retrieveMetaData(aboutThis)}, 1000);

	// after 60 seconds automatically hide tooltip
	hideTooltipTimeout = window.setTimeout(function() {hideTooltip()}, 60000);
	} // function showTooltip

function retrieveMetaData(url)
	{
	// retrieved once from 23hq using 'flickr.photos.licenses.getInfo' API
	// to save traffic - needs update if changed by 23hq
	const LICENSES = [
		"\xa9 All Rights Reserved",		// id = 0
		"Attribution-NonCommercial-ShareAlike",	// 1
		"Attribution-NonCommercial",		// 2
		"Attribution-NonCommercial-NoDerivs",	// 3
		"Attribution",				// 4
		"Attribution-ShareAlike",		// 5
		"Attribution-NoDerivs",			// not used by 23hq
		"Public Domain"				// 100
		];

	var m = url.match(RegExp("/(photo|23666)/(\\d+)"));
	if (!m) return;
	//GM_log("retrieveMetaData: photo_id = " + m[2]);

	GM_xmlhttpRequest({
		method : "GET",
		url : [REST_Endpoint_URL,
			"?method=",   "flickr.photos.getInfo",
			"&api_key=",  API_KEY,
			"&photo_id=", m[2]
			].join(""),
		headers : {
			"Accept":"text/xml,application/xml,application/rdf+xml",
			},
		onload : function (req) {
			if (200 == req.status)
				{
				var rsp = new XML(req.responseText.replace(/^<\?xml.+?\?>/, ''));
				//GM_log("rsp = " + rsp);

				if ('ok' == rsp.@stat)
					{
					// replace dummy data with real values

					// 'Date Taken' row
					var tttd1 = document.getElementById('tt-taken');
					if (tttd1)
						{
						var it1 = tttd1.firstChild;
						tttd1.replaceChild(document.createTextNode(
							rsp.photo.dates.@taken
							), it1);
						}
					// 'Date Uploaded' row
					var dateUploaded = new Date();
					dateUploaded.setTime(rsp.photo.dates.@posted + "000");
					var monthUploaded = dateUploaded.getMonth();
					monthUploaded++;
					if (monthUploaded < 10) monthUploaded = "0" + monthUploaded;
					var dayUploaded = dateUploaded.getDate();
					if (dayUploaded < 10) dayUploaded = "0" + dayUploaded;
					var hourUploaded = dateUploaded.getHours();
					if (hourUploaded < 10) hourUploaded = "0" + hourUploaded;
					var minuteUploaded = dateUploaded.getMinutes();
					if (minuteUploaded < 10) minuteUploaded = "0" + minuteUploaded;
					var secondUploaded = dateUploaded.getSeconds();
					if (secondUploaded < 10) secondUploaded = "0" + secondUploaded;
					var tttd2 = document.getElementById('tt-uploaded');
					if (tttd2)
						{
						var it2 = tttd2.firstChild;
						tttd2.replaceChild(document.createTextNode(
							dateUploaded.getFullYear() + "-" +
							monthUploaded + "-" + dayUploaded +
							" " + hourUploaded + ":" +
							minuteUploaded + ":" + secondUploaded
							), it2);
						}
					// 'Times Viewed' row
					var tttd3 = document.getElementById('tt-viewed');
					if (tttd3)
						{
						var it3 = tttd3.firstChild;
						tttd3.replaceChild(document.createTextNode(
							rsp.photo.@views
							), it3);
						}

					// 'Ranking' row
					var tttd4 = document.getElementById('tt-rank');
					if (tttd4)
						{
						var it4 = tttd4.firstChild;
						tttd4.replaceChild(document.createTextNode(
							rsp.photo.@ranking + " points"
							), it4);
						}

					// 'Favorite' row - see below

					// 'License' row
					var licenseID = (Number(rsp.photo.@license) > 7) ?
						7 : Number(rsp.photo.@license);
					var tttd6 = document.getElementById('tt-lic');
					if (tttd6)
						{
						var it6 = tttd6.firstChild;
						tttd6.replaceChild(document.createTextNode(
							LICENSES[licenseID]
							), it6);
						}
					}
				else
					{
					var tt = document.getElementById('tooltip')
					if (tt)
					      	{
						var tttable = tt.firstChild;
						tt.replaceChild(
							document.createElement('div'),
							tttable);
						tttable = tt.firstChild;
						tttable.setAttribute('class', 'tooltipvalue');
						tttable.setAttribute('align', 'right');
						tttable.appendChild(
							document.createTextNode('Unsupported: private photo')
							);
						hideTooltipTimeout = window.setTimeout(
							function() {hideTooltip()}, 3000);
						}
					}
				}
			else
				{
				GM_log("Server request failed: [" + req.status +
				      "] " + req.statusText
				      );
				}
			},

		onerror : function (req) {
			}
	}); // GM_xmlhttpRequest

	GM_xmlhttpRequest({
		method : "GET",
		url : [REST_Endpoint_URL,
			"?method=",   "flickr.photos.getFavorites",
			"&api_key=",  API_KEY,
			"&photo_id=", m[2]
			].join(""),
		headers : {
			"Accept":"text/xml,application/xml,application/rdf+xml",
			},
		onload : function (req) {
			if (200 == req.status)
				{
				var rsp = new XML(req.responseText.replace(/^<\?xml.+?\?>/, ''));
				//GM_log("rsp = " + rsp);

				// replace dummy data with real values

				var ttfavedValue = "unknown";
				if ('ok' == rsp.@stat)
					{
					ttfavedValue = rsp.photo.@total;
					}
				// 'Favorite' row
				var tttd5 = document.getElementById('tt-faved');
				if (tttd5)
					{
					var it5 = tttd5.firstChild;
					tttd5.replaceChild(
						document.createTextNode(ttfavedValue),
						it5
						);
					}
				}
			},
		onerror : function (req) {
			}
	}); // GM_xmlhttpRequest

	} // function retrieveMetaData

function linkTooltipToElement(element)
	{
	element.addEventListener('mouseover',
		function(){showTooltip(this)} ,false);
	element.addEventListener('mousemove',
		function(evt){moveTooltip(evt)} ,false);
	element.addEventListener('mouseout',
		function(){hideTooltip(this)} ,false);
	} // function linkTooltipToElement

// find all ("own" and foreign) 23hq photo images on display
function findPhotoImages()
	{
	for (i=0; a=document.images[i]; i++)
		{
		m = a.src.match(RegExp("/(photo|23666)/(\\d+)"));
		if (m)
			{
			id = m[2];
			if (mId && mId === id)
				{
				// ToDo: check for notes (see: [2])

				// engage tooltip
				linkTooltipToElement(a);
				}
			else if (0 != id)
				{
				// engage tooltip
				linkTooltipToElement(a);
				a.setAttribute('title','');
				}
			} // if (m)
		} // for-loop
	} // findPhotoImages

// ///////////////////////////////////////////////////////////////////////////
//	main function
// ///////////////////////////////////////////////////////////////////////////

//GM_log(document.URL);

// prepare tooltip
prepareTooltip();

// check if actual document is subscription page (based on document url)
if (document.URL.match(RegExp("/subscriptions")))
	{
	// extend original 23hq function 'completeLoadSubscription'
	var origCompleteLoadSubscription = unsafeWindow.completeLoadSubscription;
	unsafeWindow.completeLoadSubscription = function() {
		// find all 23hq photo images now on display
		findPhotoImages();
		return origCompleteLoadSubscription();
		};
	}
else
	{
	// check if actual document is a photo page (based on document url)
	var d = document.URL.match(RegExp("/photo/(\\d+)"));
	if (d)
		{
		mId = d[1];
		// search page for link to photos meta data
		for (i=0; a=document.links[i]; i++)
			{
			m = a.href.match(RegExp("/meta$"));
			if (m)
				{
				// engage tooltip
				linkTooltipToElement(a);
				break; // for-loop
				}
			} // for-loop
		}
	
	// find all ("own" and foreign) 23hq photo images on display
	findPhotoImages();
	}

