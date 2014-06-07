// ==UserScript==
// @name        MUCH Improved Flickr Show All Sizes
// @namespace   Tony Hash
// @description Adds a box in the photo details section of each photo page, with links for each size. Each link links directly to the source image and not it's 'Photo / All sizes' page. Inspired by the userscript from Jason Tank/Druidic titled 'Flickr: Show All Sizes' but rewritten to utilize the already loaded YUI library that Flickr uses, globally exposed config parameters and the Flickr API. This results in an exponential performance increase since there is no need to load the jQuery library, no need to screen-scrape and parse each individual image page.
// @version     v0.6.8.3
// @match       *://*.flickr.com/photos/*
// @match       *://*.flickr.com/search/*
// ==/UserScript==
//


// v0.6.8.3 - 03/22/2014
//			- Temporarily disabled Gallery photo info functionality - bug in a YUI module/FF browser v28
//
// v0.6.8.2 - 03/13/2014
//			- Small bug in the initial fix, still a hack, need to find a better solution
//
// v0.6.8.1 - 03/12/2014
//			- Fixed All-Sizes, Flickr made some changes: window.ROUTES changed & relocated. Used a crude hack for now.
//
// v0.6.8 - 03/09/2014
//			- Fixed gallery date formatting
//			- Added More link to gallery info popup - links to photo's Meta info page
//
// v0.6.7.1 - 03/03/2014
//			- Fixed a Flickr change in ROUTES object - now ROUTES.routes
//
// v0.6.7 - 03/02/2014
//			- Fixed buttons showing up again
//			- Created a close button for the gallery info popup
//
// v0.6.5.1 - 02/29/2014
//			- Fixed buttons showing up twice when toggling between 2 images quickly
//			- Added WIDTH & HEIGHT to button text
//			- Added 1 additional buttons style option
//				- Set in the Greasemonkey "User Script Commands..." menu (requires page reload)
//
// v0.6.5 - 02/29/2014
//			- Reverted back to buttons instead of menu
//
// v0.6.2.1 - 02/28/2014
//			- Quick patch to fix a Flickr code change
//
// v0.6.1 - 02/24/2014
//			- Fixed Photo Page vs Gallery Page detection logic
//
// v0.6.0 - 02/23/2014
//			- Major update: New All-Sizes menu (drop down), located on the photo page's upper left side
//			- Added a photo time taken/posted meta-info box to the gallery page
//				- To use: In a gallery, hover over an image tile, an info box will popup from the bottom, double-click it

// Log truncated, see link for more info: http://userscripts.org/scripts/show/168642

var whyYouEye,
	isOpenInNewWin = GM_getValue('openInNewWin') || false,
	isAutoOpenLargest = GM_getValue('autoOpenLargest') || false,
	allSZBtnsStyle = GM_getValue('allSZBtnsStyle') || 0,
	instReloadWin = " \n\nRELOAD this page for your settings to take effect.",
	strReloadPage = "Flickr All Sizes: \n\nSizes will open in {winState} window and the settigs will be saved in your browser. "+instReloadWin,
	strAutoOpen = "Flickr All Sizes: \n\nLargest image size auto open is now {autoState}. "+instReloadWin,
	setGMParam = function(key, val, Y, method){
		setTimeout(function(){
			GM_setValue(key, val);
			Y.fire('AllSizes:OptionChange', {key: key, val: val, method: method});
		}, 0);
	},
	getGMParam = function(key, Y){
		return new Y.Promise(function(resolve, reject){
			setTimeout(function(){
				resolve(GM_getValue(key));
			}, 0);
		});
	},
	noop = function(){},
	topLargest = 3,
	pollCount = 0,
	utils = {
		objExist: function(obj, objStr){
			if (!obj || !objStr){return false;};
			var args = objStr.split('.');

			for (var i = 0; i < args.length; i++)
			{	
				if (!obj.hasOwnProperty(args[i]))
				{
					return false;
				}
				obj = obj[args[i]];
			}

			return true;
		}
	};


GM_registerMenuCommand('Flickr All Sizes: Open in NEW Window', function(cmd){
	setGMParam('openInNewWin', true, whyYouEye, 'gm');
});

GM_registerMenuCommand('Flickr All Sizes: Open in SAME Window', function(cmd){
	setGMParam('openInNewWin', false, whyYouEye, 'gm');
});

GM_registerMenuCommand('-----------------------------------------', noop);

GM_registerMenuCommand('Flickr All Sizes: Auto Open Largest Size ON', function(cmd){
	GM_setValue('autoOpenLargest', true);
	alert(strAutoOpen.replace('{autoState}','ON'));
});

GM_registerMenuCommand('Flickr All Sizes: Auto Open Largest Size OFF', function(cmd){
	GM_setValue('autoOpenLargest', false);
	alert(strAutoOpen.replace('{autoState}','OFF'));
});

GM_registerMenuCommand('-----------------------------------------', noop);

GM_registerMenuCommand('Flickr All Sizes: Button Style: Default', function(cmd){
	GM_setValue('allSZBtnsStyle', 0);
	alert(instReloadWin);
});

GM_registerMenuCommand('Flickr All Sizes: Button Style: Tags Style', function(cmd){
	GM_setValue('allSZBtnsStyle', 1);
	alert(instReloadWin);
});

(function(uwin, win){
	var d = uwin.document,
		openInNewWin = isOpenInNewWin,
		autoOpenLargest = isAutoOpenLargest,
		beforeContainerNode = 'body',
		mainContainerId = 'gmFlickrShowAllSizes',
		mainContainerSel = '#'+mainContainerId,
		menuSizes,
		menuTitle = 'All Sizes',
		menuId = mainContainerId+'-menu',
		menuIdSel = '#'+menuId;

	if (!uwin.console || !console.firebug) {
		var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	    uwin.console = {};
	    for (var i = 0; i < names.length; ++i){uwin.console[names[i]] = function(){};}
	}

	//uwin.YUI_config.flickr.log_level.client = 'debug';

	var injectCSS = function(Y, css){
		var m = mainContainerSel,
			strCSS = [
			[// Main
				m,' {margin: 0.7em;padding: 10px;font-size:13px;}',
				m,' h4 {margin: 0 0 0.5em 0;}',
				m,' a {padding: 0.4em 0.8em;margin: 0 0.4em 0.4em 0;-webkit-transition: all 0.5s ease-in;-moz-transition: all 0.5s ease-in;transition: all 0.5s ease-in;}',
				m,'.aSZStyle1 a {border: 1px solid rgba(255, 255, 255, 0.6);background-color: transparent;border-radius: 5px;}',
				m,' a.hidden {font-size: 0;border:none !important;width:0;height:0;-webkit-transition: all 0.5s ease-in;-moz-transition: all 0.5s ease-in;transition: all 0.5s ease-in;}',
				m,' span.hidden {display: none;}',
				m,' .allSZOpts {margin: 0.4em 0 0 0;}',
				m,' .allSZOpts label {margin: 0 1em 0 0;}',
				m,' .allSizesShowHidden {text-decoration: underline;border: none !important;}'
			],
			[// Gallery Item Info Box
				'.photo-display-item .allSZInfo {position:absolute;top:6px;right:10px;z-index:999;background-color: #fff;text-align: left;display: block;padding: 1em 1em 0 1em;border-radius: 4px;border: 1px solid rgba(0,0,0,0.3);}',
				'.photo-display-item .allSZInfo dl dt{font-weight:bold;display:block;height: 1.4em;}',
				'.photo-display-item .allSZInfo dl dd{display: inline-block;height: 1em;}',
				'.photo-display-item .allSZInfo dl dd + dt{padding-top: 10px;}',
				'.photo-display-item .allSZInfo div {height: 2.4em;line-height: 2.4em;text-align: right;}',
				'.photo-display-item .allSZInfo .close {color:#999;display:inline-block;font-size:1.6em;font-weight:bold;height:1em;line-height:0.9em;position:absolute;right:0;text-align:center;top:0;width:1em;border-radius:50%}',
				'.photo-display-item .allSZInfo .close:hover {color:#fff;}'
			]
		];		
		css = css || 0;
		Y.one('head').append('<style>'+strCSS[css].join('')+'</style>');
	};

	var bindOptsEvents = function(Y){
		var sideContent = Y.one('#content');

		sideContent.delegate('click', function(e){
			var param = e.target.get('id'),
				val = e.target.get('checked');
			setGMParam(param, val, Y, 'user');
		}, '.allSZOptsChk');

		sideContent.delegate('click', function(e){
			e.preventDefault();
			Y.all('.all-sizes-button').removeClass('hidden');
			Y.one('.allSizesTitleHelper').addClass('hidden');
		}, '.allSizesShowHidden');

		Y.on('AllSizes:OpenInNewWin', function(opts){
			var target = (opts.val)?'_blank':'_self';
			Y.all('.all-sizes-button').setAttribute('target', target);
			if (opts.method !== 'user')
			{
				Y.one('#openInNewWin').set('checked', opts.val);
			}
		});

		Y.on('AllSizes:OptionChange', function(opts){
			if (opts.key === 'openInNewWin')
			{
				Y.fire('AllSizes:OpenInNewWin', opts);
			}
		});
	};

	var getBtnClsAttr = function(){
		var clsAttr = "";
		switch (allSZBtnsStyle)
		{
			case 1:
				clsAttr = ' class="aSZStyle1"';
				break;
		}

		return clsAttr;
	};

	var setSizesHTML = function(szHTML, total, Y){
		var opts = [
				'<div class="allSZOpts pure-form">',
				'<label for="openInNewWin"><input id="openInNewWin" class="allSZOptsChk" type="checkbox"',(openInNewWin && ' checked="checked"'),'> Open New Window</label>',
				'<label for="autoOpenLargest"><input id="autoOpenLargest" class="allSZOptsChk" type="checkbox"',(autoOpenLargest && ' checked="checked"'),'> Auto Open Largest</label>',
				'</div>'
			].join(''),
			topSz = (topLargest)?' <span class="allSizesTitleHelper">(largest '+topLargest+' of '+total+') <a href="#" class="allSizesShowHidden">Show All</a></span>':'';
			html = [
				'<div class="view clear-float">',
				'<div id="',mainContainerId,'"'+ getBtnClsAttr() +'><h4>All Sizes',topSz,'</h4>',
				szHTML,opts,
				'</div></div>'
			].join(''),
			sidePnl = Y.one('.sidebar-panel-fixed');

		if (!sidePnl.one(mainContainerSel))
		{
			sidePnl.append(html);
		}
	};

	var orderSizesByHeight = function(sizes){
		var sz = [], szLen, total, result = {};

		for (var obj in sizes)
		{
			sz.push(sizes[obj]);
		}

		result.total = szLen = sz.length;

		sz.sort(function(a, b){
			return parseInt(a.height, 10) > parseInt(b.height, 10);
		});

		if (topLargest && !!parseInt(topLargest,10) && sz.length >= topLargest)
		{
			for (var i = szLen - 1; i >= 0; i--)
			{
				if (i < szLen-topLargest)
				{
					var modSz = sz[i];
					modSz.hidden = true;
					sz[i] = modSz;
				}
			}
		}

		result.sizes = sz;

		return result;
	};

	var processSizes = function(pid, sizes, proto, Y){
		var szObj = orderSizesByHeight(sizes),
			sz = szObj.sizes,
			szLen = sz.length,
			html = [], h, l, s, w, hid;

		if (autoOpenLargest)
		{
			if (szLen > 0)
			{
				window.location.href = proto+':'+sz[szLen-1].url;
			}
		}

		for (var i = szLen - 1; i >= 0; i--)
		{
			h = sz[i].height;
			w = sz[i].width;
			l = [w, h].join('x');
			s = sz[i].url;

			hid = (!!sz[i].hidden)?' hidden':'';
			html.push('<a class="all-sizes-button pure-button pure-button-primary'+hid+'" href="'+s+'" title="'+w+'x'+h+'"'+(openInNewWin && ' target="_blank"')+'>'+l+'</a>');
		}

		setSizesHTML(html.join(''), szObj.total, Y);
	};

	var initYUI = function(){
		uwin.YUI({classNamePrefix: 'pure'}).use('client-app', 'photo-page-view', 'photo-models', function(Y){
			var photoId,
				getPhotoId = function(){
					var rx = /(\d{8,24})/g,
						pth = uwin.location.pathname.replace(/\d+@N\d+/,'').replace(/([a-zA-Z]+)/g,''),
						pid = rx.exec(pth) || [];
					
					// TODO: Hack till I find a better way to get photoid
					// I keep digging and digging... can't believe Flickr didn't make an easy way to 
					// detect the PhotoID via prop or method. If someone knows, please email me!
					photoId = parseInt(pid[pid.length-1], 10);
													
					return photoId;
				},
				photoModelsCB = function(e){
					var isvid = e.getValue('isVideo'),
						sizes = e.getValue('sizes'),
						proto = uwin.appContext.normalizedProtocol,
						html = [];

					if (!isvid)
					{
						html = processSizes(photoId, sizes, proto, Y);
					}

					return html;
				};

			whyYouEye = Y;
			getPhotoId();
			injectCSS(Y);
			bindOptsEvents(Y);

			// Triggered when 'page'/route changes
			Y.Global.after('history:change', function(e){
				getPhotoId();

				// TODO:This shouldn not be in a settimeout; need to find sidebar 'finish load' event!
				setTimeout(function(){
					uwin.appContext.getModel('photo-models', photoId).then(photoModelsCB);
				}, 1000);
			});

			uwin.appContext.getModel('photo-models', photoId).then(photoModelsCB);
			
		});
	};

	var initGalleryPage = function(){
		uwin.YUI().use('gallery-flickr-api', 'datatype-date', 'datatype-number', function(Y){
			var api = uwin.F.config.flickrAPI,
				dtFmt = "%m/%d/%Y %I:%M %p",
				photoUrlPath = ['data', 'photo', 'urls', 'url', '0', '_content'];
			injectCSS(Y, 1);

			Y.one('#main').on('dblclick', function(e){
				var item = e.target.ancestor('.photo-display-item'),
					tagName = String(e.target.get('tagName').toUpperCase || '').toUpperCase();

				if (item && tagName !== "A")
				{
					api.photo_id = item.getAttribute('data-photo-id');
					
					Y.flickrAPI.callMethod('flickr.photos.getInfo', api, {
						success: function(response){
							var taken = Y.Date.parse(String(response.data.photo.dates.taken).replace(/-/g,'/')),
								posted = Y.Date.parse(Y.Number.parse(response.data.photo.dates.posted)*1000),
								takenFmtd = Y.Date.format(taken, {format:dtFmt}),
								postedFmtd = Y.Date.format(posted, {format:dtFmt}),
								urlPath = Y.Object.getValue(response, photoUrlPath),
								metaMore = (urlPath) ? '<div><a href="'+urlPath+'meta">More...</a><div>':'',
								html = [
									'<div class="allSZInfo"><a class="close" href="" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false;">&times;</a><dl><dt>Taken</dt><dd>',
									takenFmtd,
									'</dd><dt>Posted</dt><dd>',
									postedFmtd,
									'</dd></dd></dl>',
									metaMore,
									'</div>'
								],
								dom = Y.Node.create(html.join(''));
								
							item.all('dl').remove(true);
							item.append(dom);
						}
					});
					
				}
			}, '.meta');
		});
	};

	var pollAppContext = function(){
		console.log("Polling appContext global object...");
		if (pollCount > 80){return;};

		if (typeof unsafeWindow.YUI == "undefined" || typeof unsafeWindow['appContext'] == "undefined")
		{
			++pollCount;
			window.setTimeout(pollAppContext, 50);
		}
		else
		{
			initYUI();
		}
	};

	var isPhotoPage = function(){
		// var mtype = document.querySelector('meta[property="og:type"]');
		// return (mtype && mtype.getAttribute('content') === 'flickr_photos:photo');
		return utils.objExist(uwin, 'YUI_config.flickr.routes.routes');
	};

	var getPagesAllSizesData = function(){
		var allSizesScript = document.querySelectorAll("script[type='text/javascript']"),
			regex = new RegExp("(modelExport:)(.*?]})(,)", 'm'), html, data, photoObj, ordered;

		if (allSizesScript && allSizesScript.length > 1)
		{
			allSizesScript = allSizesScript[1];
			if (allSizesScript.innerHTML && allSizesScript.innerHTML.length > 0)
			{
				html = allSizesScript.innerHTML;
				if (html.indexOf('modelExport:') > -1)
				{
					data = regex.exec(html);
					if (!!data && !!data['length'] && data.length > 1)
					{
						try
						{
							photoObj = JSON.parse(data[2]);
							ordered = orderSizesByHeight(photoObj["photo-models"][0].sizes, 3);
							osz = ordered.sizes;
							win.location.href = win.location.protocol+osz[osz.length-1].url;
						}
						catch (e)
						{
							// It didnt work, just show the sizes
							getPagesAllSizesData();
						}
					}
				}
			}
		}
	};

	if (isPhotoPage())
	{
		if (autoOpenLargest)
		{
			getPagesAllSizesData();
		}
		else
		{
			pollAppContext();
		}
	}
	else
	{
		//initGalleryPage();
	}
})(unsafeWindow, window);
