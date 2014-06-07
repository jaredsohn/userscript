// ==UserScript==
// @name           (dm) Deviant Art Gallery Ripper (old slowmode)
// @namespace      DeviantRipperSlow
// @description    Click button and generate a list of direct image link urls for all images for a users gallery.
// @version        1.1.11
// @lastupdated    2014-04-17
// @match          *://*.deviantart.com/*
// @exclude        *://*.deviantart.com/journal/*
// @exclude        *://*.deviantart.com/prints/*
// @exclude        *://justsitback.deviantart.com/*
// @exclude        *://groups.deviantart.com/*
// @exclude        *://shop.deviantart.com/*
// @exclude        *://chat.deviantart.com/*
// @exclude        *://today.deviantart.com/*
// @exclude        *://forum.deviantart.com/*
// @exclude        *://portfolio.deviantart.com/*
// @exclude        *://www.deviantart.com/account/*
// @exclude        *://www.deviantart.com/journals/*
// @exclude        *://www.deviantart.com/correspondence/*
// @exclude        *://www.deviantart.com/critiques/*
// @exclude        *://www.deviantart.com/messages/*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// ==/UserScript==

/*
 * Known issue: Scanning browse pages with google chrome fails
 * 		because chrome does not allow cross site xmlHttp requests.
 * 		This is by design and I don't know of any workaround.
 * 		Button displays appropriate message and is disabled.
 * 		see http://www.chromium.org/developers/design-documents/user-scripts
 * 		this might have been worked around by DA changing their server settings for origins
 * 
 * 		When browsing a search/gallery and clicking a thumbnail to load full image
 * 		on HTML5 browsers the GET button disappears. This is because DA hides
 * 		the panel holding the button. Refreshing the page while viewing the single
 * 		image will redraw the GET button allowing you to grab all images in the
 * 		single image artist's gallery.
 *
 * 
 */

// Clicking the button will make script locate first page of user gallery 
// (if viewing image page) then parse out each image in gallery and then 
// get direct image links for the gallery. If looking at index page of 
// thumbnails it will start at current page and work deeper. 


//*************************
// Global Var's
var ScriptDebug = false;
var SuperVerbose = false;

var GM_log; if (typeof GM_log  === 'undefined') { GM_log = function (str) { console.log(str); }; }

function DebugLog (str) {
	pages.debugLogText = pages.debugLogText + str + "\r\n";
	if (ScriptDebug === true) {
		if (arguments.length === 1) { GM_log(str); }
		else { GM_log(arguments); }
	}
}

//recurse var used for thumbnail pages mainly. if set to non true and button
//clicked on single page it doesn't really do anything useful.
var pages = {
	debugLog:	document.createElement('textarea'),
	debugLogText: '',
	tableFailed: document.createElement('table'),
    isChrome:	/Chrome/i.test(navigator.userAgent),
    isFireFox:	/Firefox/i.test(navigator.userAgent),
	loggedIn: false,
	recurse: true,	// recurse into lower gallery pages
ignorePages: {
		/*
		used in button generation function. If any return true button is not generated.
		place items here that are not easily matched to @exclude meta header
		make expression trigger to true for it to ignore page, false to act normal.
		*/
		ProfileTab:		(document.querySelector('li.active > a[gpage_name="userpage"]')) ? true : false
	},
abort_links: false,	// flag to abort link grabbing
	Current: 0,		// current counter reused for image and gallery parsing
	TotalImages: 0,	// total counter used for image parsing
	URLs: [],		// holder for url html list
	URLbox: document.createElement('textarea'),
	GalleryData: {},// holds thumbnail image target info
	GalleryTemplate: function () {
		this.isFetched 	= false;	// if page was fetched set during ScanImage
		this.Failed		= null;		// flag if page failed to find a image link
		this.error		= '';		// error value to show on list
		this.url 		= null;		// url of image page set during ScanGallery
		this.id 		= null;		// id of image set during ScanImage
		this.ddl		= null;		// ddl link to image file set by ScanImage
		this.title		= null;		// title of the image for failure display
		this.xhttp		= null;		// xHttpRequest result holder
	},
	GalleryPages: [], // list of urls to thumbnail pages needed to fetch
	ToParse: [],	// list of urls of single image pages that need to be parsed for DDL
	fetchStatus: 0,	// status id for script checking status:
					// 0 = not started, 1 = getting indexes
					// 2 = getting image DDL, 3 = finished everything
					// 4 = displayed urls (finished or aborted)
	xmlHttp_Counter: {
		MAXREQ:  4,
		runCon:  0,
		interval: null
	}, // end xmlHttp_Counter
	btn: {			// button holder
		btnID : null,
		debugToggleCheck : function (eventID) {
			DebugLog('debugToggleCheck()');
			// if shift cause script reset
			if ((eventID.shiftKey === true) && (eventID.altKey === false) && (eventID.ctrlKey === false)) {
				DebugLog('*** Resetting script status. ***');
				pages.ToParse = [];
				pages.fetchStatus = 0;
				pages.GalleryPages = [];
				pages.xmlHttp_Counter.runCon = 0;
				pages.URLs = [];
				pages.Current = 0;
				pages.TotalImages = 0;
				pages.GalleryData = {};
				pages.abort_links = false;

				clearInterval(pages.xmlHttp_Counter.interval);
				pages.xmlHttp_Counter.interval = null;

				pages.debugLogText = '';
				pages.debugLog.style['display'] = 'none';
				pages.debugLog.value = '';
				pages.URLbox.style['display'] = 'none';
				pages.URLbox.innerHTML = '';
				pages.tableFailed.style['display'] = 'none';
				pages.tableFailed.innerHTML = '';

				pages.btn.btnID.value = 'Get URLs for Gallery';
				pages.btn.btnID.removeEventListener('click', pages.btn.AbortLinkChecking, false);
				pages.btn.btnID.addEventListener('click', pages.btn.GetLinks, false);
			}
			
			// if control+alt toggle debug display
			if ((eventID.altKey === true) && (eventID.ctrlKey === true)) {
				DebugLog('debug log toggle current: ' + pages.debugLog.style['display']);
				switch (pages.debugLog.style['display'])
				{
					case '':
						pages.debugLog.style['display'] = 'none';
						//pages.debugLog.value = '';
						break;
					case 'none':
						pages.debugLog.value = pages.debugLogText;
						pages.debugLog.style['display'] = '';
						break;
				}
			}
		},
		// button click abort function
		AbortLinkChecking : function (eventID) {
			// ignore click if holding control+alt in order to trigger debug log view
			if ((eventID.altKey === true) || (eventID.ctrlKey === true) || (eventID.shiftKey === true)) { return; }

			pages.abort_links = true;
			DebugLog('AbortLinkChecking()');
			pages.btn.btnID.removeEventListener('click', pages.btn.AbortLinkChecking, false);
			pages.btn.btnID.value = 'Aborted: ' + pages.btn.btnID.value;
			DebugLog('FetchStatus: ' + pages.fetchStatus);
			if (pages.fetchStatus > 1) pages.DoneDisplayUrlList();
			pages.GalleryPages = [];
			pages.ToParse = [];

		}, // end AbortLinkChecking

		// creates the click button for our page
		GenerateButton : function () {
			DebugLog('Call: GenerateButton()');
			var new_button;
			var btnLoc;
			var ignores;
			
			// Check if page is in the ignore list
			for (ignores in pages.ignorePages) {
				DebugLog('Checking ignore flag of ' + ignores + ' : ' + pages.ignorePages[ignores]);
				if (pages.ignorePages[ignores] === true) {
					DebugLog('We should ignore this page. No button creation.');
					// get out if we hit a page match
					return;
				}
			}
			pages.loggedIn = (document.querySelector('td#oh-menu-deviant > a.oh-l > span > span.username')) ? true : false;
			DebugLog('User is logged in: ' + pages.loggedIn);
			

			pages.URLbox.style['display'] = 'none';
			document.body.insertBefore(pages.URLbox, document.body.firstChild);
			pages.tableFailed.style['display'] = 'none';
			document.body.insertBefore(pages.tableFailed, document.body.firstChild);

			pages.debugLog.style['display'] = 'none';
			pages.debugLog.rows = 15;
			pages.debugLog.style['width'] = '100%';
			document.body.insertBefore(pages.debugLog, document.body.firstChild);


			new_button = document.createElement('input');
			new_button.type = 'button';
			new_button.value = 'Get URLs for Gallery';
			new_button.setAttribute('onsubmit', 'return false;');
			new_button.addEventListener('click', pages.btn.debugToggleCheck, false);
			
			/*
			 * use individual selector OR's to get target by preference instead of first
			 * dom object availability
			 *
			 * alternate: btnLoc = document.querySelector('#gmi-ResViewContainer, #gmi-GalleryEditor, #output');
			 */
			btnLoc = 
				document.querySelector('#gmi-ResViewContainer') || 
				document.querySelector('#gmi-GalleryEditor') || 
				document.querySelector('#output');
			
			if (btnLoc) {
				btnLoc.insertBefore(new_button, btnLoc.firstChild);
				new_button.addEventListener('click', pages.btn.GetLinks, false);
			}
			else {
				new_button.value = 'Root Thumbnail Page?';
				document.body.insertBefore(new_button, document.body.firstChild);	
			}
			
			// Disable button on base domain if using chrome due to same origin complications
			/* DA seems to have changed server settings to fix same origin
			 * issues from www.deviantart.com and other subdomains commented
			 * for testing. will re-enable if problems show up.
			 * actually seems to have been Chrome whose behavior changed. If script is loaded
			 * as an extension it is allowed to violate same origin rules. If pasted into the
			 * developer console it errors out same origin failures.
			 if (document.location.hostname === 'www.deviantart.com' && pages.isChrome === true) {
				new_button.value = 'Script will fail on root www.deviantart.com';
				new_button.disabled = true;
			}
			*/
			DebugLog('Created Button:');
			DebugLog(new_button);
			return new_button;
		}, // end GenerateButton

		// called when button is clicked to start grabbing thumnail pages
		GetLinks : function (eventID) {
			// ignore click if holding control+alt in order to trigger debug log view
			if ((eventID.altKey === true) || (eventID.ctrlKey === true) || (eventID.shiftKey === true)) { return; }
			DebugLog('Call: GetLinks()');
			var galleryLink = document;
			var a_gallery;
			
			pages.btn.btnID.removeEventListener('click', pages.btn.GetLinks, false);
			pages.btn.btnID.addEventListener('click', pages.btn.AbortLinkChecking, false);
			if (!checkers.isThumbnailGallery(galleryLink)) {
				DebugLog('Current page is not a gallery trying to find it.');
				// find the gallery thumbnail link
				a_gallery = document.querySelector('a[onclick*="gallery"]');
				
				if (a_gallery) { galleryLink = a_gallery.href; }
				if (!galleryLink) { throw 'Error finding upper gallery'; }
				GM_log(galleryLink);
			}
			else {
				galleryLink = document.location.href;
			}
			pages.GalleryPages.push(galleryLink);
			DebugLog(pages.GalleryPages);
			pages.fetchStatus = 1;
			pages.xmlHttp_Counter.interval = setInterval(heartBeats.LoadGalleries, 50);
		} // end GetLinks
		
	}, // end btn
	DoneDisplayUrlList : function () {
		DebugLog('Call: DoneDisplayUrlList()');
		if (pages.fetchStatus > 3) return;
		var urlList;
		urlList = pages.URLbox;
		urlList.rows = 15;
		//urlList.cols = 140;
		urlList.style['width'] = '100%';
		urlList.innerHTML = pages.URLs.join('\r\n');
		urlList.style['display'] = '';
		pages.fetchStatus = 4;
		if (pages.TotalImages !== pages.URLs.length) {
			pages.btn.btnID.value = 'Some pages failed to find links (found ' + pages.URLs.length + ' of ' + pages.TotalImages + ')';
			pages.ShowFailedUrlList();
		}
		else {
			pages.btn.btnID.value = 'Displaying (found ' + pages.URLs.length + ' of ' + pages.TotalImages + ')';
		}
	}, // end DoneDisplayUrlList
	ShowFailedUrlList : function () {
		DebugLog('Call: ShowFailedUrlList()');
		var counter;
		var failedURLs;
		var tableFailed, tableInner;
		tableFailed = pages.tableFailed;
		tableFailed.width = '100%';
		tableFailed.border = '2 px';
		tableInner = '';
		
		for (counter in pages.GalleryData) {
			if (pages.GalleryData[counter].Failed === true) {
				tableInner = tableInner + 
					'<a href="' + pages.GalleryData[counter].url + '">' +
						pages.GalleryData[counter].title + '</a> ' +
						pages.GalleryData[counter].error +
					'<br/>';
				DebugLog(pages.GalleryData[counter]);
			}
		}
		tableInner = '<tbody><tr><td>' + 
			'<b>Failed Pages:</b>' + '</td></tr><tr><td>' + 
			tableInner + 
			'</td></tr></tbody>';
		tableFailed.innerHTML = tableInner;
		tableFailed.style['display'] = '';
	}, // end ShowFailedUrlList
	/* 	function Get_URL_CB(url_link, callback, GalleryIndex)
		multithreaded url fetching routine
		url_link	:	downloads contect from this url
		callback	:	function to call once content is downloaded
		 	called as callback(DOM object, GalleryIndex)
		 	DOM object containing newly downloaded page content
		GalleryIndex:	identifier of the image # to reference pages.GalleryPage
		gets url contents and puts in an on the fly div
		then calls routine "callback" with div object
	 */
	Get_URL_CB	: function (url_link, callback, GalleryIndex) {
		DebugLog('Call: Get_URL_CB(' + url_link + '): index: ' + GalleryIndex);
		pages.xmlHttp_Counter.runCon += 1;
		try {
			var http_req = new XMLHttpRequest();
			http_req.onreadystatechange = function(xHttpRequest) {
				//if (GalleryIndex) { pages.GalleryData[GalleryIndex].xhttp = xHttpRequest; }
				DebugLog('args', arguments);
				DebugLog('xmlhttpRequest readystate_change: ' + xHttpRequest.target.readyState + ' ' + url_link);
				if (xHttpRequest.target.readyState == 4) {
					if (xHttpRequest.target.status == 200) {
						DebugLog('xmlhttpRequest response: ' + xHttpRequest.target.readyState + ' ' + xHttpRequest.target.status + ' ' + url_link);
						if (checkers.isAborted()) return;
						if (ScriptDebug && SuperVerbose) { DebugLog('Response: ' + xHttpRequest.target.responseText); }
						DebugLog('Got 200 OK: ' + url_link);
						var xmlDoc = document.createElement('div');
						xmlDoc.innerHTML = xHttpRequest.target.responseText;
						callback(xmlDoc, GalleryIndex);
						while (xmlDoc.firstChild) {
							xmlDoc.removeChild(xmlDoc.firstChild);
						}
						xmlDoc = null;
					}
					else {
						DebugLog('xmlhttpRequest status error: ' + xHttpRequest.target.status + '. If 0, Probably using chrome and errored on cross-domain issue.');
						if (xHttpRequest.target.status === 0) { pages.GalleryData[GalleryIndex].error = 'Cross Domain Block'; }
						// call the callback so we decrement the fetch counter and try another
						callback(document.createElement('div'), GalleryIndex);
					}
					pages.xmlHttp_Counter.runCon -= 1;
				}
			};
			http_req.open('GET', url_link, true);
			http_req.send('');
		}
		catch (err) {
			//nothing to do really
			pages.xmlHttp_Counter.runCon -= 1;
			DebugLog('Error occured: ' + err.message);
		}
	}, // end Get_URL_CB
	/* 	function GM_Get_URL_CB(url_link, callback, GalleryIndex)
		multithreaded url fetching routine
		url_link	:	downloads contect from this url
		callback	:	function to call once content is downloaded
		 	called as callback(DOM object, GalleryIndex)
		 	DOM object containing newly downloaded page content
		GalleryIndex:	identifier of the image # to reference pages.GalleryPage
		gets url contents and puts in an on the fly div
		then calls routine "callback" with div object

	 	grease monkey specific url fetching routine
		needs to be used in firefox when handling
		search thumbnail pages to get around the
		same origin limitations. can be used in
		google chrome as converted userscript but
		still has same origin restriction so will fail
		on search pages.
	 */
	GM_Get_URL_CB : function (url_link, callback, GalleryIndex) {
		DebugLog('Call: GM_Get_URL_CB(' + url_link + '): index: ' + GalleryIndex);
		pages.xmlHttp_Counter.runCon += 1;
		try {
			GM_xmlhttpRequest({
				method:'GET',
				url:url_link,
				onload:function(xHttpRequest) {
					//if (GalleryIndex) { pages.GalleryData[GalleryIndex].xhttp = xHttpRequest; }
					DebugLog('GM_xmlhttpRequest onload: ' + xHttpRequest.readyState + ' ' + url_link);
					if (checkers.isAborted()) return;
					if (xHttpRequest.readyState == 4) {
						if (xHttpRequest.status == 200) {
							DebugLog('xmlhttpRequest response: ' + xHttpRequest.readyState + ' ' + xHttpRequest.status + ' ' + url_link);
							if (checkers.isAborted()) return;
							if (ScriptDebug && SuperVerbose) { GM_log('Response: ' + xHttpRequest.responseText); }
							DebugLog('Got 200 OK: ' + url_link);
							var xmlDoc = document.createElement('div');
							xmlDoc.innerHTML = xHttpRequest.responseText;
							callback(xmlDoc, GalleryIndex);
							while (xmlDoc.firstChild) {
								xmlDoc.removeChild(xmlDoc.firstChild);
							}
							xmlDoc = null;
						}
						else {
							DebugLog('xmlhttpRequest status error: ' + xHttpRequest.status + '. If 0, Probably using chrome and errored on cross-domain issue.');
							if (xHttpRequest.status === 0) { pages.GalleryData[GalleryIndex].error = 'Cross Domain Block'; }
							// call the callback so we decrement the fetch counter and try another
							callback(document.createElement('div'), GalleryIndex);
						}
						pages.xmlHttp_Counter.runCon -= 1;
					}
				}
			});
		}
		catch (err) {
			//nothing to do really
			pages.xmlHttp_Counter.runCon -= 1;
			DebugLog('Error occured: ' + err.message);
		}
	} // end GM_Get_URL_CB
}; // end pages var

	
//if (pages.isChrome) pages.Get_URL_CB = GM_Get_URL_CB;
if (pages.isFireFox === true) { pages.Get_URL_CB = pages.GM_Get_URL_CB; }

//END Global Var's

DebugLog('Current URL loaded from: ' + document.location.href);

pages.btn.btnID = pages.btn.GenerateButton();

var parsers = {
	FindThumbnailContainer : function (docbase) {
		return docbase.querySelector(
			// regular gallery
			'div[gmi-pager_id="gallery_pager"], ' +
			//'div#gmi-ResourceStream, ' + 
			//'div.stream-fh-grid, ' +
			//'div.browse2-results, ' + 
			//'div.results-page-thumb, ' +

			// channels
			'div#channelContent, ' +
			
			// critique's page
			//'div#critique-fullpage-page, ' +

			// daily deviations
			'div#dailyDevs, ' +

			// personal favorites and gallery
			// uses global regular gallery
			//'div#gmi-EditableResourceStream, ' +

			// more like this search results
			// generic browse
			'div#browse-results'
			//'div.browse-results-page > div.page-results'
			);
	},
	/* 	GetImageLinksOnGalleryPage(docbase, GalleryURL)
		requires docbase: DOM Object to scan
		requires GalleryURL: String containing url of page that is being scanned
	 */
	GetImageLinksOnGalleryPage : function (docbase, GalleryURL) {
		DebugLog('Call: GetImageLinksOnGalleryPage(' + GalleryURL + ')');
		var image_links;
		var thumb_count;
		var newdocbase;
		var GalleryIndex;
		
		// look for thumbnail container
		DebugLog('Searching for thumbnail container on: ' + GalleryURL);
		newdocbase = parsers.FindThumbnailContainer(docbase);
		if (newdocbase) {
			image_links = newdocbase.querySelectorAll('a[class*="thumb"]');
		}
		else {
			throw 'Error finding thumbnail window.';
		}
		
		if (!image_links) {
			// no thumbnails found so stop searching pages
			// this happens if you scan browse pages and it runs over the 1000 image limit
			if (docbase.querySelector('div.browse-no-results')) {
				pages.recurse = false;
			}
			return;
		}
		thumb_count = image_links.length;
		for (image_counter = 0; image_counter < thumb_count; image_counter += 1) {
			DebugLog('image_counter=' + image_counter + '; ' +
				'thumb_count=' + thumb_count + '; ' + 
				image_links[image_counter].href);
				
			pages.TotalImages += 1;
			GalleryIndex = pages.TotalImages;
			// DebugLog('Push parse: ' + GalleryIndex + ' ' + image_links[image_counter].href);
			pages.ToParse.push([GalleryIndex, image_links[image_counter].href]);
			pages.GalleryData[GalleryIndex] = new pages.GalleryTemplate;
			pages.GalleryData[GalleryIndex].url = image_links[image_counter].href;
			pages.GalleryData[GalleryIndex].ImageID = 'NotLoaded-' + pages.GalleryData[GalleryIndex].url.split('/').pop();
			pages.GalleryData[GalleryIndex].title = pages.GalleryData[GalleryIndex].ImageID;
			pages.GalleryData[GalleryIndex].Failed = true;
			// DebugLog(pages.GalleryData[GalleryIndex]);
		}
		if (ScriptDebug && SuperVerbose) { GM_log(pages); }
	}, // end GetImageLinksOnGalleryPage

	/* 	GetNextGalleryPageLink(docbase)
		requires docbase: DOM Object
		returns string of url for next page
	 */	
	GetNextGalleryPageLink : function (docbase) {
		DebugLog('Call: GetNextGalleryPageLink()');
		var newdocbase;
		var rtn_val;
		// test for prev-next-links - works on browse pages
		DebugLog('Looking for pagination container');
		newdocbase = docbase.querySelector('div#prev-next-links, div#gallery_pager, div.pagination');
		
		DebugLog('Looking for next button');
		if (newdocbase) rtn_val = newdocbase.querySelector('li.next > a, a.load_more');

		if (rtn_val) {
			DebugLog('NextGallery: ' + rtn_val.href);
			return rtn_val.href;
		}
		else return false;
	} // end GetNextGalleryPageLink
}; // end parsers

var callbacks = {
	/* 	function callback_ScanPages(docbase)
		called when gallery page html is loaded so we can parse images out and set next page
	 */
	ScanGallery : function (docbase, GalleryURL) {
		DebugLog('Call: ScanGallery(' + GalleryURL + ')');
		pages.Current += 1;
		pages.btn.btnID.value = 'Loading gallery page ' + pages.Current;
		parsers.GetImageLinksOnGalleryPage(docbase, GalleryURL);
		if (pages.recurse === true) {
			nextPage = parsers.GetNextGalleryPageLink(docbase);
			if (nextPage) pages.GalleryPages.push(nextPage);
		}
	}, // end ScanGallery

	// callback routine when getting an image page to parse out the DDL link.
	ScanImage : function (docbase, GalleryIndex) {
		DebugLog('Call: ScanImage(' + docbase + ', ' + GalleryIndex + ')');
		if (SuperVerbose) { DebugLog("docbase code: \n" + docbase.innerHTML); }
		var dlbutton;
		var fullimage;
		var title;
		var ImageID;
		
		pages.Current += 1;
		pages.btn.btnID.value = 'Loading image page ' + pages.Current + ' of ' + pages.TotalImages;
		DebugLog('Loading image page ' + pages.Current + ' of ' + pages.TotalImages);
		
		ImageID = docbase.querySelector('*[gmi-id]');
		if (!ImageID) { ImageID = 'FailedID-' + pages.GalleryData[GalleryIndex].url.split('/').pop(); }
		else { ImageID = ImageID.getAttribute('gmi-id'); }
		//if (ImageID) { ImageID = ImageID.getAttribute('gmi-id'); }
		DebugLog('ImageID: ' + ImageID);

		pages.GalleryData[GalleryIndex].id = ImageID;
		pages.GalleryData[GalleryIndex].isFetched = true;
		
		title = docbase.querySelector('meta[name="og:title"], meta[name="title"]');
		if (title) { title = title.getAttribute('content'); }
		pages.GalleryData[GalleryIndex].title = title || ImageID;
		
		if (pages.GalleryData[GalleryIndex].error !== '') {
			if (pages.Current === pages.TotalImages) { pages.DoneDisplayUrlList(); }
			return;
		}

		/* 
		 * download examples:
		 * PSD: http://nacartist.deviantart.com/art/Spawn-49939649
		 * TXT: http://portallover7.deviantart.com/art/The-Blueberry-Curse-356444433
		 * HTML:http://the-writing-pony.deviantart.com/art/Txt-Me-L8r-322792681
		 * SWF: http://phitus.deviantart.com/art/Don-t-Text-and-Drive-180886790
		 * 
		 */
		
		dlbutton = docbase.querySelector('a#download-button, a.dev-page-download');
		
		if (dlbutton) {
			pages.GalleryData[GalleryIndex].ddl = dlbutton.href;
			pages.URLs.push(dlbutton.href);
		}
		else {
			fullimage = docbase.querySelector('img[name="gmi-ResViewSizer_fullimg"], img.dev-content-full');
			if (fullimage) {
				pages.GalleryData[GalleryIndex].ddl = fullimage.href;
				pages.URLs.push(fullimage.src);
			} else {
				// no image found, check for mature filter
				if (docbase.querySelector('div#filter-warning')) {
					pages.GalleryData[GalleryIndex].error = 'Mature content filter.';
				}
				// no mature filter so set generic no image error. probably a text page for a poem or something.
				else {
					pages.GalleryData[GalleryIndex].error = 'No download or large image found.';
				}
				
				// check if we're done loading since the throw below will prevent a
				if (pages.Current === pages.TotalImages) { pages.DoneDisplayUrlList(); }
				throw pages.GalleryData[GalleryIndex].error + ' (' + pages.GalleryData[GalleryIndex].url + ')';
			}
		}
		pages.GalleryData[GalleryIndex].Failed = false;
		if (pages.Current == pages.TotalImages) { pages.DoneDisplayUrlList(); }
	} // end ScanImage
}; // end callbacks

var heartBeats = {
	// heartbeat while loading galleries
	LoadGalleries : function () {
		if ((pages.xmlHttp_Counter.runCon < pages.xmlHttp_Counter.MAXREQ) && (pages.GalleryPages.length)) {
			DebugLog("HeartBeat LoadGalleries()\n" + 
				'running connections: (' + pages.xmlHttp_Counter.runCon + ') ' +
				'max running (' + pages.xmlHttp_Counter.MAXREQ + ')');
			
			checkers.NextGallery();
		}
		if ((pages.GalleryPages.length == 0) && (pages.xmlHttp_Counter.runCon == 0)) {
			DebugLog('Stopping heartbeat out of galleries to check.');
			clearInterval(pages.xmlHttp_Counter.interval);
			pages.btn.btnID.value = 'Finished loading galleries (' + pages.Current + ')';
			pages.Current = 0;
			pages.fetchStatus = 2;
			pages.xmlHttp_Counter.interval = setInterval(heartBeats.LoadImages, 50);
		}
	}, // end LoadGalleries

	// heartbeat while loading images
	LoadImages : function () {
		if ((pages.xmlHttp_Counter.runCon < pages.xmlHttp_Counter.MAXREQ) && (pages.ToParse.length)) {
			DebugLog("HeartBeat LoadImages()\n" + 
				'running connections: (' + pages.xmlHttp_Counter.runCon + ') ' +
				'max running (' + pages.xmlHttp_Counter.MAXREQ + ')');
			
			checkers.NextImage();
		}
		if ((pages.ToParse.length == 0) && (pages.xmlHttp_Counter.runCon == 0)) {
			DebugLog('Stopping heartbeat out of images to load.');
			pages.fetchStatus = 3;
			clearInterval(pages.xmlHttp_Counter.interval);
		}
	} // end LoadImages
}; // end heartBeats

var checkers = {
	// checkers.isThumbnailGallery (doc)
		// return true if page seems to be a gallery
		// or false if it looks like its a single image page
		// detection is looking for the comments by the artist
		// usually found on the single image page
	isThumbnailGallery : function (docbase) {
		var rtnval;
		DebugLog('Call: isThumbnailGallery()');
		rtnval = (parsers.FindThumbnailContainer(docbase)) ? true : false;
		DebugLog('return ' + rtnval);
		return rtnval;
	}, // end isThumbnailGallery

	// get our next gallery page from our stack
	NextGallery : function () {
		var link_info;
		DebugLog('Call: NextGallery()');
		if (checkers.isAborted()) return;
		if (pages.GalleryPages.length) {
			link_info = pages.GalleryPages.shift();
			pages.Get_URL_CB(link_info, callbacks.ScanGallery, link_info);
		}
	}, // end NextGallery

	// get the next image page from our stack
	NextImage : function () {
		var link_info;
		DebugLog('Call: NextImage()');
		if (checkers.isAborted()) return;
		if (pages.ToParse) {
			// pull image page url and index off the stack
			// index 0 is the page #, index 1 is the url
			link_info = pages.ToParse.shift();
			pages.Get_URL_CB(link_info[1], callbacks.ScanImage, link_info[0]);
		}
	}, // end NextImage

	// function checkers.isAborted ()
	// check if we clicked the button to abort script
	// if we did it requires a page reload to start again
	isAborted : function () {
		DebugLog('checkers.isAborted(): ' + pages.abort_links);
		if (pages.abort_links) {
			return true;
		}
		return false;
	} // end isAborted
}; // end checkers

