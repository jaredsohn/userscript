// ==UserScript==
// @name         Geocaching Thumbnails
// @version      7.0
// @description  (v7.0 09/12/2013) Changes the default picture icons on cache pages to image thumbnails. Update to allow operation with GC Little Helper v10.6, new gallery images per row option, improved handling of small images, improved handling of spoilers, fixed View Log bug.
// @namespace    http://benchmarks.org.uk/geothumbs/
// @copyright    2010+, Gary Player <dev@benchmarks.org.uk>
// @license	     Released under the GPL http://www.gnu.org/copyleft/gpl.html
// @attribution  ld_* functions kindly supplied by Lil Devil http://www.lildevil.org/greasemonkey/
// @attribution  Pop-up menu code based on https://www.userscripts.org/scripts/show/6773 by Eyal Soha
// @attribution  Storage class ideas from http://www.latunyi.com/
// @attribution  XML to JSON conversion from http://davidwalsh.name/convert-xml-json
// @include	     http*://*.geocaching.com/seek/cache*
// @include	     http*://*.geocaching.com/geocache/*
// @include	     http*://*.geocaching.com/seek/gallery*
// @include	     http*://*.geocaching.com/profile/*
// ==/UserScript==

// This is a script for Firefox, Google Chrome, Opera and Safari browsers,
// Firefox requires the Greasemonkey extension to be installed (see http://greasemonkey.mozdev.org/)

(function(){
// script details for version check
var SCRIPT_NAME = 'Geothumbs';
var SCRIPT_VERSION = '7.0';
var VERSION_LIST_XDR = 'http://benchmarks.org.uk/greasemonkey/versions.txt';
var VERSION_LIST_NO_XDR = 'http://www.geocaching.com/seek/log.aspx?LUID=026bbac0-130d-49bb-9eee-626b3f873e96';

// existing cache page ids
var cacheOwnerId = 'ctl00_ContentBody_CacheOwner';
var findTextId = 'ctl00_ContentBody_uxFindLinksHeader';
var mapId1 = 'ctl00_ContentBody_uxlrgMap';
var mapId2 = 'uxlrgMap';
var imagesId = 'ctl00_ContentBody_Images';
var navigationMenuId = 'Navigation';
var contentMainId = 'ctl00_divContentMain';
var cacheLogsTableId = 'cache_logs_table';
var gclhCacheLogsTableId = 'cache_logs_table2';
var logbookAllLogsTableId = 'AllLogs';
var logbookPersonalLogsTableId = 'PersonalLogs';
var galleryImagesId = 'GalleryImages';
var cacheGalleryTableId = 'ctl00_ContentBody_GalleryItems_DataListGallery';
var ownerGalleryTableId = 'ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery';

// number of images loaded by default by gc.com
var GC_DEFAULT_LOGS_TO_LOAD = 25;

// spoiler vars
var spoilerPattern = /(spoiler|spioler|spolier|It'?s here)/i;
var notSpoilerPattern = /not a (spoiler|spioler|spolier)/i;
var spoilerThumb = 'http://benchmarks.org.uk/greasemonkey/geothumbs/images/spoiler_100.jpg';
var spoilerLarge = 'http://benchmarks.org.uk/greasemonkey/geothumbs/images/spoiler_380.jpg';

//Change to true to cause owner image table to span the full page width
var ownerImagesSpanPage = false;

// rel id to use for all anchors to images - for when we want one gallery / cross log image navigation
var fancyboxRelId = 'fancybox[geothumbs]';

// rel id to use for logbook personal log images
var fancyboxPersonalRelId = 'fancybox[geothumbsPersonalLog]';

// fancybox background colour
var backgroundColour = '#000000';

// anchor class to use for all anchors to images - fancybox is applied to these
var fancyBoxAnchorClass = 'geothumbs_fbac';

// storage key prefix so we don't clash with other users of localStorage
var storageKeyPrefix = 'bmorguk/gt/';

// data store
var ds;

// geothumbs options
var options = new Options();

// keeps a count of the number of images converted to thumbnails
var imagesProcessed = 0;

// string of rss gallery images
var rssGalleryItems = '';

// div id for unshown images
var unshownImagesId = 'gt_unshownImages';

// css styles
var optionsStyle =
'.gt_overlay { background:#f6f6f6; border:3px double #666666;}' +
'.gt_overlayContainer { display:none; position:absolute; top:0; right:0; bottom:0; left:0; }' +
'#gt_options { width:700px; padding:10px; margin:20px auto 0; }' +
'#gt_options .gt_optionsHeading { font-weight:bold; }' +
'#gt_overlayShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.6; }' +
'.gt_important { font-weight:bold; }' +
'.gt_selection { position:absolute; left:20em; }' +
'.gt_checkbox { margin-top:0.1em;}' +
'.gt_value { margin-left:0.25em;}' +
'.gt_option { line-height:200%; position:relative; left:2em;}'
;

var style =
'#geothumbsOwnerImagesTable { width:100%; border:1px solid #D7D7D7; table-layout: auto; }' +
'#geothumbsLogImagesTable { width:98%; border:1px solid #D7D7D7; table-layout: auto; margin-left:10px; margin-top:10px; }' +
'.geothumbsImageCell { width: 100px ! important; height: 98px; background-color: #ffffff !important; border: 0px none !important; padding: 0 8px 0 8px !important; }' +
'.geothumbsImage { display: block; margin-left: auto; margin-right: auto; margin-bottom: 0 !important; padding: 8px 0;}' +
'.geothumbsTitleCell { width:1200px ! important; padding-right:8px; background-color: #ffffff !important; border: 0px none !important; line-height: 1.2; }' +
'.geothumbsTitleCell a { text-decoration: none; }' +
'.geothumbsDescription { font-size: smaller; } ' +
'.geothumbs_fbac { position:relative; }' +
'.geothumbs_fbac #title { width:80%; text-align:left; }' +
'.geothumbs_fbac #links { float:right; height:2em; margin-left:auto; padding-left:2em; }' +
'.geothumbs_fbac #links a { color:#000000; font-weight: normal; }' +
'.geothumbs_fbac #links a:hover { color:#FF6600; }' +
'.geothumbs_fbac #imageCount { position:absolute; right:0px; bottom:0px; padding-left:4em; }' +
'.geothumbs_fbac #description { font-weight: normal; }' +

// ensure minimum fancybox window size and centralise it without unnecessary movement when moving between images
'#fancybox-wrap { left: 0 !important; margin: auto !important; min-width: 400px !important; right: 0 !important; }'+
'#fancybox-content { margin: 0 auto; }' +
'#fancybox-title { min-width: 380px!important }'
;

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//Logging
var enableLogging = false;
var haveConsole = (typeof console !== 'undefined' && typeof console.log !== 'undefined');
if (!haveConsole || !enableLogging) {console.log = function() {/* no logging */};}

// Data store
function DataStore(type)
{
	var keyPrefix = "";

	var storage = (type == 'session') ? sessionStorage : localStorage;
	if (!storage) {	throw 'Error: '+type+'Storage not available'; }

	this.getStorageType = function() { return (storage == sessionStorage) ? 'session' : 'local'; };

	this.setKeyPrefix = function(prefix)
	{
		keyPrefix = prefix;
	};

	this.set = function(key, value)
	{
		this.setWithPrefix(keyPrefix, key, value);
	};

	this.setWithPrefix = function(prefix, key, value)
	{
		var val = JSON.stringify(value);
		storage.setItem(prefix+key, val);
	};

	this.get = function(key, def)
	{
		return this.getWithPrefix(keyPrefix, key, def);
	};

	this.getWithPrefix = function(prefix, key, def)
	{
		var val;
		try
		{
			val = storage.getItem(prefix+key);
			val = JSON.parse(val);
			if (val == null) { val = def; }
		}
		catch (err) { val = def; }

		return val;
	};

	this.has = function(key)
	{
		var val = this.get(key, null);
		return (val != null && val != undefined);
	};

	this.remove = function(key)	{ storage.removeItem(key); };

	this.clear = function() { storage.clear(); };
}

//Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].length) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

// Lil Devils (modified) cross browser compatible xmlhttpRequest
function ld_xmlhttpRequest(request)
{
	var xmlhttp, prop;

	if ( request.gm && typeof(GM_xmlhttpRequest) != 'undefined' )
	{
		GM_xmlhttpRequest(request);
	}
	else
	{
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			var responseState = {	responseXML		: '',
									responseText	: '',
									readyState		: xmlhttp.readyState,
									responseHeaders	: '',
									status			: 0,
									statusText		: ''
								};
			if (xmlhttp.readyState == 4) {
				responseState = {	responseXML		: xmlhttp.responseXML,
									responseText	: xmlhttp.responseText,
									readyState		: xmlhttp.readyState,
									responseHeaders	: xmlhttp.getAllResponseHeaders(),
									status			: xmlhttp.status,
									statusText		: xmlhttp.statusText
								};
			}

			if (request['onreadystatechange']) {
				request['onreadystatechange'](responseState);
			}
			if (xmlhttp.readyState == 4) {
				if (request['onload'] && xmlhttp.status >= 200 && xmlhttp.status < 300) {
					request['onload'](responseState);
				}
				if (request['onerror'] && (xmlhttp.status < 200 || xmlhttp.status >= 300)) {
					request['onerror'](responseState);
				}
			}
		};
		try {
			//cannot do cross domain
			xmlhttp.open(request.method, request.url);
		} catch(e) {
			if(request['onerror']) {
				//simulate a real error
				request['onerror']({responseXML		: '',
									responseText	: '',
									readyState		: 4,
									responseHeaders	: '',
									status			: 403,
									statusText		: 'Forbidden'
									});
			}
			return;
		}
		if (request.headers) {
			for (prop in request.headers) {
				xmlhttp.setRequestHeader(prop, request.headers[prop]);
			}
		}
		xmlhttp.send((typeof(request.data) != 'undefined') ? request.data : null);
	}
}

// Lil Devils Script update checker
function ld_checkForUpdate(scriptName, scriptVersion, forceCheck)
{
	try {
		var useGM = true;
		var checkURL = VERSION_LIST_XDR;
		if (!isFirefox) {
			// Chrome and Opera don't support cross-domain xmlhttpRequests
			useGM = false;
			checkURL = VERSION_LIST_NO_XDR;
		}

		// avoid a flood of dialogs e.g. when opening a browser with multiple tabs open
		var now = new Date().getTime();
		var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
		var lastStart = ds.get('Update_Start', null);
		ds.set('Update_Start', now.toString());
		if (!forceCheck && lastStart && (now - lastStart) < DOSpreventionTime) { return; }

		// time to check yet?
		var oneDay = 24 * 60 * 60 * 1000;
		var lastChecked = ds.get('Update_Last', null);
		var checkDays = ds.get('Update_Days', 1);
		if (!forceCheck && lastChecked && (now - lastChecked) < (oneDay * checkDays)) {	return;	}

		ld_xmlhttpRequest({
			gm: useGM,
			method: 'GET',
			url: checkURL,
			headers: { 'User-Agent' : scriptName + ' v' + scriptVersion + ' auto updater' },
			onload: function(result) {
				var matches,
					regex = new RegExp('[\\s\\>]' + scriptName +
										'\\s+v([\\d\\.]+)\\s+(\\d+)\\s+(.+?)[\\<\\s]', 'i');
				if (!(matches = regex.exec(result.responseText))) {
					console.log(scriptName + ': Updater: response unrecognized');
					return;
				}

				var theOtherVersion = matches[1];
				ds.set('Update_Days', +matches[2]);
				var theOtherURL = matches[3];

				if (theOtherVersion.replace(/\./g, '') <= scriptVersion.replace(/\./g, ''))
				{
					 // no updates or older version

					if (forceCheck)
					{
						window.alert('Your version of ' + scriptName +
								' is up to date.\n\n');
					}
					return;
				}

				if (theOtherURL.indexOf('http') !== 0) { theOtherURL = 'http://' + theOtherURL; }

				if (window.confirm(	scriptName +
									' has been updated.\n\n' +
									'The new version is ' + theOtherVersion +
									'\nYou are currently using version ' + scriptVersion +
									'\n\nClick OK for instructions on how to upgrade.'))
				{
					document.location = theOtherURL;	// open in same window to avoid popup blockers
				}
			}
		});
		ds.set('Update_Last', new Date().getTime().toString());
	}
	catch (err) { console.log(scriptName + ': ' + err);}
}

// returns true if we are running in the specified page
function isPage(page)
{
	var sPath = document.location.pathname.toLowerCase();
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

	return sPage==page;
}

// gets all elements of the specified tag with the specified regexp class name
function getElementByTagAndClass(referenceNode, tag, classNamePattern)
{
	var i;
	var collection = [];
	var found = 0;
	var tags = referenceNode.getElementsByTagName(tag);

	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className.match(classNamePattern))
		{
			collection[found++] = tags[i];
		}
	}
	return collection;
}

// returns the required node name sibling of the startNode
function getSibling(startNode, findNodeName)
{
	var foundNode = null;
	var node = startNode;

	findNodeName = findNodeName.toUpperCase();
	while ((node = node.nextSibling) && !foundNode)
	{
		if (node.nodeName == findNodeName)
		{
			foundNode = node;
		}
	}
	return foundNode;
}

// add css styles
function addGlobalStyle(css)
{
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// runs the specified javascript in page scope. optionally delete it afterwards.
function runPageScopeScript(s, remove)
{
	// create script
	var script = document.createElement("script");
	script.textContent = s;
	node = document.head.appendChild(script);

	// delete it
	if (remove)
		node.parentNode.removeChild(node);
}

//returns the element with the specified id
function getId(id)
{
	return document.getElementById(id);
}

// adds a click handler to the specified id
function onClick(id,func)
{
	getId(id).addEventListener('click',func,false);
}

// adds a change handler to the specified id
function onChange(id,func)
{
	getId(id).addEventListener('change',func,false);
}

// returns a collection of elements with the specified name
function getName(name)
{
	return document.getElementsByName(name);
}

// returns the checked value for a checked input or a checked radio input
function getCheckedInputValue(collection)
{
	var i;
	var val = "";
	if (collection)
	{
		var len = collection.length;
		if (len == undefined)
		{
			if (collection.checked) {val = collection.value;}
		}
		else
		{
			for (i = 0; i < len; i++)
			{
				if(collection[i].checked)
				{
					val = collection[i].value;
					break;
				}
			}
		}
	}
	return val;
}

//saves the options set in the pop-up options page
function saveOptions()
{
	var val;

	val=parseInt(getCheckedInputValue(getName(options.getImagesPerRowId())), 10);
	options.setImagesPerRow(val);

	val=getCheckedInputValue(getName(options.getImageSizeId()));
	options.setImageSize(val);

	val=getId(options.getShowDescriptionsId()).checked;
	options.setShowDescriptions(val);

	val=getId(options.getShowSpoilersId()).checked;
	options.setShowSpoilers(val);

	val=getId(options.getShowOwnerImagesId()).checked;
	options.setShowOwnerImages(val);

	val=getCheckedInputValue(getName(options.getImgNavId()));
	options.setImgNav(val);

	val=parseInt(getId(options.getBackgroundDarknessId()).value, 10);
	if (val > 100) {val = 100;}
	else if (val < 0) {val = 0;}
	options.setBackgroundDarkness(val);

	val=getId(options.getDisablePopUpsId()).checked;
	options.setDisablePopUps(val);

	val=parseInt(getId(options.getMaxLogsToLoadId()).value, 10);
	// rounds up to the nearest multiple of 25
	if (val > 100) {val = 100;}
	else if (val < GC_DEFAULT_LOGS_TO_LOAD) {val = GC_DEFAULT_LOGS_TO_LOAD;}
	val = Math.ceil(val/25)*25;
	options.setMaxLogsToLoad(val);

	val=getId(options.getEnhanceGalleryId()).checked;
	options.setEnhanceGallery(val);

	val=parseInt(getCheckedInputValue(getName(options.getGalleryColumnsId())), 10);
	options.setGalleryColumns(val);

	val=getId(options.getLargeGalleryImagesId()).checked;
	options.setLargeGalleryImages(val);
}

//show popup overlay
function showPopUpOverlay(content)
{
	// add shadow
	getId('gt_overlayShadow').style.zIndex = '1000';
	getId('gt_overlayShadow').style.display = 'block';

	// show pop-up
	getId('gt_overlayContainer').innerHTML = content;
	getId('gt_overlayContainer').style.zIndex = '1001';
	getId('gt_overlayContainer').style.display = 'block';

	window.scroll(0,0);
}

// hide popup overlay
function hidePopup()
{
	getId('gt_overlayContainer').style.display = 'none';
	getId('gt_overlayShadow').style.display = 'none';
}

//pops up the geothumbs options page
function showOptions()
{
	showPopUpOverlay(
		'<div id="gt_options" class="gt_overlay" style="position:relative; left:0px; top:0px;"><div style="font-size:150%; text-align: center; width:550px; float:left"><span class="gt_important"><a href="http://benchmarks.org.uk/greasemonkey/geothumbs.php">Geothumbs</a> Options</span> </div><div style="font-size:smaller; float:right">Version: '+SCRIPT_VERSION+'<br><a href="#" id="GTCheckForUpdate">Check for new version</a> </div> <br><br>'+
		'<hr>'+
		'<span class="gt_optionsHeading">Thumbnail Options</span><br>'+
		'<span class="gt_option">Thumbnails per row</span><span class="gt_selection">'+
		'<input name="gt_imagesPerRow" id="gt_imagesPerRow2" value="2" type="radio"><label for="gt_imagesPerRow">2 </label>'+
		'<input name="gt_imagesPerRow" id="gt_imagesPerRow3" value="3" type="radio"><label for="gt_imagesPerRow">3 </label>'+
		'<input name="gt_imagesPerRow" id="gt_imagesPerRow4" value="4" type="radio"><label for="gt_imagesPerRow">4 </label>'+
		'<input name="gt_imagesPerRow" id="gt_imagesPerRow5" value="5" type="radio"><label for="gt_imagesPerRow">5 </label></span><br>'+

		'<span class="gt_option">Thumbnail size</span><span class="gt_selection">'+
		'<input name="gt_imageSize" id="gt_imageSizeSmall" value="Small" type="radio"><label for="gt_imageSize">Normal </label>'+
		'<input name="gt_imageSize" id="gt_imageSizeLarge" value="Large" type="radio"><label for="gt_imageSize">Large</label></span><br>'+

		'<span class="gt_option">Show image descriptions</span><span class="gt_selection gt_checkbox">'+
		'<input id="gt_showDescriptions" type="checkbox"></span><br>'+

		'<span class="gt_option">Show spoiler thumbnails</span><span class="gt_selection gt_checkbox">'+
		'<input id="gt_showSpoilers" type="checkbox"></span><br>'+

		'<span class="gt_option">Show cache owner thumbnails</span><span class="gt_selection gt_checkbox">'+
		'<input id="gt_showOwnerImages" type="checkbox"></span><br>'+

		'<br>'+
		'<span class="gt_optionsHeading">Pop-up Image Options</span><br>'+
		'<span class="gt_option">Navigation </span><span class="gt_selection">'+
		'<input name="gt_imgNav" id="gt_imgNavCrosslog" value="Crosslog" type="radio"><label for="gt_imgNav">Cross log </label>'+
		'<input name="gt_imgNav" id="gt_imgNavWithinLog" value="WithinLog" type="radio"><label for="gt_imgNav">Current log only</label></span><br>'+

		'<span class="gt_option">Background darkness %</span><span class="gt_selection gt_value">'+
		'<input id="gt_backgroundDarkness" maxlength="3" size="3" type="text"><label for="gt_backgroundDarkness"></label></span><br>'+

		'<span class="gt_option">Disable pop-ups </span><span class="gt_selection gt_checkbox">'+
		'<input id="gt_disablePopUps" type="checkbox"></span><br>'+

		'<br>'+
		'<span class="gt_optionsHeading">Cache Page Options</span><br>'+
		'<span class="gt_option">Number of logs to load</span><span class="gt_selection gt_value">'+
		'<input id="gt_maxLogsToLoad" size="4" type="text"><label for="gt_maxLogsToLoad"></label></span><br>'+

		'<br>'+
		'<span class="gt_optionsHeading">Gallery Page Options</span><br>'+
		'<span class="gt_option">Enhance gallery</span><span class="gt_selection gt_checkbox">'+
		'<input id="gt_enhanceGallery" type="checkbox"></span><br>'+

		'<span class="gt_option">Images per row</span><span class="gt_selection">'+
		'<input name="gt_galleryColumns" id="gt_galleryColumns2" value="2" type="radio"><label for="gt_galleryColumns">2 </label>'+
		'<input name="gt_galleryColumns" id="gt_galleryColumns3" value="3" type="radio"><label for="gt_galleryColumns">3 </label>'+
		'<input name="gt_galleryColumns" id="gt_galleryColumns4" value="4" type="radio"><label for="gt_galleryColumns">4 </label>'+
		'<input name="gt_galleryColumns" id="gt_galleryColumns5" value="5" type="radio"><label for="gt_galleryColumns">5 </label>'+
		'</span><br>'+

		'<span class="gt_option">Large Images</span><span class="gt_selection gt_checkbox">'+
		'<input id="gt_largeGalleryImages" type="checkbox"></span><br>'+

		'<br><hr><div style="text-align: right;"><input id="GTQuitButton" value="&nbsp;Quit&nbsp;" type="button">&nbsp; &nbsp;<input id="GTSaveButton" value="Save" type="button">&nbsp; &nbsp;<input id="GTSaveAndRefreshButton" value="Save and Refresh Page" type="button"></div>'+
		'</div>');

	// set options page with current settings
	getId(options.getImagesPerRowId()+options.getImagesPerRow()).checked = 'checked';
	getId(options.getImageSizeId()+options.getImageSize()).checked = 'checked';
	if (options.getShowDescriptions()) { getId(options.getShowDescriptionsId()).checked = 'checked'; }
	if (options.getShowSpoilers()) { getId(options.getShowSpoilersId()).checked = 'checked'; }
	if (options.getShowOwnerImages()) { getId(options.getShowOwnerImagesId()).checked = 'checked'; }
	getId(options.getMaxLogsToLoadId()).value = options.getMaxLogsToLoad();
	getId(options.getImgNavId()+options.getImgNav()).checked = 'checked';
	getId(options.getBackgroundDarknessId()).value = options.getBackgroundDarkness();
	if (options.getDisablePopUps()) { getId(options.getDisablePopUpsId()).checked = 'checked'; }
	if (options.getEnhanceGallery()) { getId(options.getEnhanceGalleryId()).checked = 'checked'; }
	getId(options.getGalleryColumnsId()+options.getGalleryColumns()).checked = 'checked';
	if (options.getLargeGalleryImages()) { getId(options.getLargeGalleryImagesId()).checked = 'checked'; }

	// add event handlers
	onClick('GTQuitButton', function() { hidePopup(); });
	onClick('GTSaveButton', function() { hidePopup(); saveOptions();});
	onClick('GTSaveAndRefreshButton', function() { hidePopup(); saveOptions(); document.location.reload();});
	onClick('GTCheckForUpdate', function() { ld_checkForUpdate(SCRIPT_NAME, SCRIPT_VERSION, true); });
}

// adds to the GT menu
function addGeothumbsOptionsMenu()
{
	try
	{
		var optionsMenuId = 'extensionsOptionsMenu';

	    // add Options menu if it doesn't already exist
	    if (!document.getElementById(optionsMenuId))
	    {
		    var optionsMenuText = '<a href="#" title="Options" id="'+optionsMenuId+'">Options \u25bc</a><ul class="SubMenu" style="visibility: hidden;"></ul>';
	        var li = document.createElement('li');
	        li.innerHTML = optionsMenuText;
	        document.getElementById(navigationMenuId).firstElementChild.firstElementChild.appendChild(li);
	    }

		// add geothumbs sub menu
		var liText = '<a href="#" title="Geothumbs Options" id="geothumbsOptions">Geothumbs Options</a>';
		var optionsSubMenu = getId(optionsMenuId).nextElementSibling;
		var li = document.createElement('li');
		li.innerHTML = liText;
		optionsSubMenu.appendChild(li);

		// add event listener - this is done via setTimeout to fix a problem when the
		// gc_little_helper script is run after this script.  when not set via a
		// setTimeout and gc_little_helper runs after this script gc_little_helper
		// updates the menu by adding a form which appears to remove this onClick
		// handler.  when set via setTimeout the event handler remains in place!!
	    setTimeout(function(){onClick('geothumbsOptions', showOptions);},0);

	    // correct submenu pop-up for all browsers - function taken from cache page
	    function correctSubMenuPopUp()
	    {
	        $(function () {
	            $('ul.Menu li').hover(
	                function () { $(this).addClass('hover');
	                    $('ul:first', this).css('visibility', 'visible'); },
	                function () {
	                    $(this).removeClass('hover');
	                    $('ul:first', this).css('visibility', 'hidden'); } );}
	        );
	    };

	    // run submenu pop-up correction script in page scope
	    runPageScopeScript("(" + correctSubMenuPopUp.toString() + ")();");
    }
    catch(err)
    {
    	// continue if we have a problem setting up the menu
    	// console.log("Error adding geothumbs menu: "+err);
    }
}

// geothumbs options class
function Options()
{
	// prefix for pop-up geothumbs options page
	var idPrefix = 'gt_';

	// Number of images per row
	var imagesPerRow = {id:'imagesPerRow', defval:2};

	// Image sizes - 'small' (100px wide) images or 'large' (300px wide) images
	var imageSize = {id:'imageSize', defval:'Small'};

	// Show owner images (true to show)
	var showOwnerImages = {id:'showOwnerImages', defval:true};

	// Show descriptions with thumbnails (true to show)
	var showDescriptions = {id:'showDescriptions', defval:true};

	// Show spoilers (true to show)
	var showSpoilers = {id:'showSpoilers', defval:false};

	// Maximum number of logs to load per scroll
	var maxLogsToLoad = {id:'maxLogsToLoad', defval:GC_DEFAULT_LOGS_TO_LOAD};

	// Cross log image navigation or restricted log only navigation
	var imgNav = {id:'imgNav', defval: 'Crosslog'};

	// Fancybox background darkness (in percent)
	var backgroundDarkness = {id:'backgroundDarkness', defval:25};

	// Disable fancy box pop-ups
	var disablePopUps = {id:'disablePopUps', defval:false};

	// Enable gallery page enhancement
	var enhanceGallery = {id:'enhanceGallery', defval:true};

	// Number of gallery image columns
	var galleryColumns = {id:'galleryColumns', defval:4};

	// Large gallery images
	var largeGalleryImages = {id:'largeGalleryImages', defval:false};

	////////////// methods //////////////

	this.getImagesPerRow = function(){return ds.get(imagesPerRow.id, imagesPerRow.defval);};
	this.getImagesPerRowId = function(){return idPrefix+imagesPerRow.id;};
	this.setImagesPerRow = function(v){ds.set(imagesPerRow.id, v);};

	this.getImageSize = function(){return ds.get(imageSize.id, imageSize.defval);};
	this.getImageSizeId = function(){return idPrefix+imageSize.id;};
	this.setImageSize = function(v){ds.set(imageSize.id, v);};

	this.getOwnerImageSize = function(){return this.getImageSize() == 'Small' ? 100 : 300; };

	this.getShowOwnerImages = function(){return ds.get(showOwnerImages.id, showOwnerImages.defval);};
	this.getShowOwnerImagesId = function(){return idPrefix+showOwnerImages.id;};
	this.setShowOwnerImages = function(v){ds.set(showOwnerImages.id, v);};

	this.getShowDescriptions = function(){return ds.get(showDescriptions.id, showDescriptions.defval);};
	this.getShowDescriptionsId = function(){return idPrefix+showDescriptions.id;};
	this.setShowDescriptions = function(v){ds.set(showDescriptions.id, v);};

	this.getShowSpoilers = function(){return ds.get(showSpoilers.id, showSpoilers.defval);};
	this.getShowSpoilersId = function(){return idPrefix+showSpoilers.id;};
	this.setShowSpoilers = function(v){ds.set(showSpoilers.id, v);};

	this.getImgNav = function(){return ds.get(imgNav.id, imgNav.defval);};
	this.getImgNavId = function(){return idPrefix+imgNav.id;};
	this.setImgNav = function(v){ds.set(imgNav.id, v);};

	this.getBackgroundDarkness = function(){return ds.get(backgroundDarkness.id, backgroundDarkness.defval);};
	this.getBackgroundDarknessId = function(){return idPrefix+backgroundDarkness.id;};
	this.setBackgroundDarkness = function(v){ds.set(backgroundDarkness.id, v);};

	this.getMaxLogsToLoad = function(){return ds.get(maxLogsToLoad.id, maxLogsToLoad.defval);};
	this.getMaxLogsToLoadId = function(){return idPrefix+maxLogsToLoad.id;};
	this.setMaxLogsToLoad = function(v){ds.set(maxLogsToLoad.id, v);};

	this.getDisablePopUps = function(){return ds.get(disablePopUps.id, disablePopUps.defval);};
	this.getDisablePopUpsId = function(){return idPrefix+disablePopUps.id;};
	this.setDisablePopUps = function(v){ds.set(disablePopUps.id, v);};

	this.getEnhanceGallery = function(){return ds.get(enhanceGallery.id, enhanceGallery.defval);};
	this.getEnhanceGalleryId = function(){return idPrefix+enhanceGallery.id;};
	this.setEnhanceGallery = function(v){ds.set(enhanceGallery.id, v);};

	this.getGalleryColumns = function(){return ds.get(galleryColumns.id, galleryColumns.defval);};
	this.getGalleryColumnsId = function(){return idPrefix+galleryColumns.id;};
	this.setGalleryColumns = function(v){ds.set(galleryColumns.id, v);};

	this.getLargeGalleryImages = function(){return ds.get(largeGalleryImages.id, largeGalleryImages.defval);};
	this.getLargeGalleryImagesId = function(){return idPrefix+largeGalleryImages.id;};
	this.setLargeGalleryImages = function(v){ds.set(largeGalleryImages.id, v);};
}

function createPopUpOverlay()
{
	//add overlay div
	var overlayDiv = document.createElement('div');
	overlayDiv.id = 'gt_overlayContainer';
	overlayDiv.className = 'gt_overlayContainer';
	document.body.appendChild(overlayDiv);

	// add overlay shadow div
	var shadowDiv = document.createElement('div');
	shadowDiv.id = 'gt_overlayShadow';
	document.body.appendChild(shadowDiv);
}

///////////////////////// main functions //////////////////////////////

// removes leading and trailing spaces, quotes and jpg extensions from received title
function tidyTitle(title)
{
	var m;

	// remove leading and trailing spaces and jpg extensions
	title = title.replace(/^[\s]*/, "").replace(/[\s]*$/, "").replace(/\.jpg$/i, "");

	// remove leading and matching trailing double quotes
	m = title.match(/^[\"](.*)[\"]$/);
	if (m) {title = m[1];}

	// remove leading and matching trailing single quotes
	m = title.match(/^['](.*)[']$/);
	if (m) {title = m[1];}

	// remove any leading and trailing spaces
	title = title.replace(/^[\s]*/, "").replace(/[\s]*$/, "");

	// convert IMG_ to Photo
	if (title.substr(0,4)==='IMG_') {title = 'Photo';}

	return title;
}

// returns true if we want to see spoilers or the title indicates the image isn't a spoiler
// as determined by the spoiler regexp
function showImage(title)
{
	var show = true;

	if (title)
	{
		show = (options.getShowSpoilers() ||
				title.match(notSpoilerPattern) ||
				!title.match(spoilerPattern));
	}

	return show;
}

// creates title for img tag
function createImgTagTitle(title, description)
{
	var descPart = '';

	if ((title == '')||(title.substr(0,4)=='IMG_')) {title = 'Photo';}
	if (description != '') {descPart = ' - ' + description;}

	return title + descPart;
}

// creates title for anchor tag
function createAnchorTagTitle(title, description, owner, log, logDate, largePictureLink)
{
	var lbStyleViewLogLink;
	var fbStyleViewLogLink;
	var taken;
	var aTitle;
	var descPart;
	var titlePart = ((typeof title == "undefined") || title == '' || title.substr(0,4)=='IMG_') ? 'Photo' : '"' + title + '"';
	var takenPart = (logDate == '' || logDate == null) ? '' : ' on ' + logDate;
	var ownerPart = (owner == '' || owner == null) ? '' : ' by ' + owner;

	// remove blank descriptions as they cause fancy box formatting problems
	if (description == null)
		descPart = '&nbsp;';
	else
	{
		description = description.replace(/^\s+/, '');
        descPart = (description == '') ? '&nbsp;' : description;
	}

	if (log == '' || log == null)
	{
		lbStyleViewLogLink = '';
		fbStyleViewLogLink = '';
	}
	else
	{
		lbStyleViewLogLink = '<a href="' + log + '" target="_blank">View Log</a>&nbsp;';
		fbStyleViewLogLink = '<a href="' + log + '" target="_blank" class="white_link">View Log</a>&nbsp;';
	}

	var largePictureText = showImage(titlePart) ? 'Original Image' : 'View Spoiler';

	// our lightbox style
	aTitle = '<div id="links">' +
				lbStyleViewLogLink +
				'&nbsp;<a href="' + largePictureLink + '" target="_blank" >' + largePictureText + '</a>' +
			'</div>' +
			'<div id="title">' +
				titlePart + ownerPart + takenPart + '<br>' +
				'<span id="description">' + descPart + '</span>' +
			'</div>';
	return aTitle;
}

//processes cache owner images
function processCacheOwnerImages()
{
	// get sub-directory containing images
	var imageSubDir = (options.getImageSize() == "Small") ? 'thumb' : 'display';

	var ownerImages;
	var numImages = 0;

	// get owner name
	var ownerId = getId(cacheOwnerId);
	var ownerName = (ownerId) ? ownerId.lastChild.textContent : document.title.replace(/^.*created by /, "");

	// see if there are any owner images
	var cpImgs = getElementByTagAndClass(document, "ul",/CachePageImages/)[0];
	if (cpImgs)
	{
		// found owner images section - get the images
		ownerImages = cpImgs.getElementsByTagName("a");
		if (ownerImages) {numImages = ownerImages.length;}
	}

	// only process if we have some owner images
	if (numImages != 0)
	{
		// create a table for our title row and image rows
		var t = document.createElement('table');
		t.id = 'geothumbsOwnerImagesTable';

		// force new row
		var imagesPerRow = options.getImagesPerRow();
		var col = imagesPerRow;

		// for each owner image
		var i;
		for (i = 0; i < numImages; i++)
		{
			// process the non-edit image anchors
			if (ownerImages[i].textContent != "Edit")
			{
				// create a new row if required
				var imageRow;
				if (col == imagesPerRow)
				{
					// create an image row
					imageRow = t.insertRow(-1);

					col = 0;
				}

				// create a copy of the original anchor to modify - the original
				// is going to be removed later when the original row is removed
				var imageAnchor = ownerImages[i].cloneNode(true);

				// get anchor details
				var pictureTitle = imageAnchor.textContent;

				// set large and thumb image urls - the match is required to fix gc.bug which incorrectly inserts a rogue /display in the path
				var parts = imageAnchor.href.match(/(.*cache).*\/(.*)/);
				var baseDir = parts[1];
				var jpgImage = parts[2];
				var largePicture = baseDir + '/' + jpgImage;
				var thumbPicture = baseDir + '/' + imageSubDir + '/' + jpgImage;

				// ensure that thumbnail points to the large image - fixes gc.com bug
				imageAnchor.href = largePicture;

				// clean up the picture title
				pictureTitle = tidyTitle(pictureTitle);

				if (options.getImgNav() == 'Crosslog')
				{
					// set same rel id to give one fancybox gallery
					imageAnchor.rel = fancyboxRelId;
				}

				// set same anchor class so we can apply fancybox to all image anchors
				imageAnchor.className = fancyBoxAnchorClass;

				// look for a description (in text node after first <br> after anchor)
				var description = "";
				var node = getSibling(ownerImages[i], "span");
				if (node)
				{
					if (node.className == "description")
					{
						description = node.textContent;
						// remove description is it's just whitespace
						description = description.replace(/^[\s]*/, "");
					}
				}

				// create anchor title - this is used by fancybox
				imageAnchor.title = createAnchorTagTitle(pictureTitle, description, ownerName, '', '', largePicture);

				// create image
				var img = document.createElement('img');
				img.title = createImgTagTitle(pictureTitle, description);
				img.alt = pictureTitle;

				// set image style
				img.className = 'geothumbsImage';

				// change camera image to picture unless we want to hide spoilers
				if (showImage(pictureTitle))
				{
					img.src = thumbPicture;
				}
				else
				{
					imageAnchor.href = spoilerLarge;
					img.src = spoilerThumb;
					img.title = pictureTitle; // do not show description
					img.alt = pictureTitle;
				}

				// remove the non image anchor text
				imageAnchor.removeChild(imageAnchor.lastChild);

				// add the image to the anchor
				imageAnchor.appendChild(img);

				// create a new cell in the row and add the anchor
				var imageCell = imageRow.insertCell(-1);
				imageCell.className = 'geothumbsImageCell';
				imageCell.appendChild(imageAnchor);

				// create new anchor for text link to image or edit image page
				var textAnchor;
				if ((ownerImages[i + 1]) && (ownerImages[i + 1].textContent == "Edit"))
				{
					// use existing edit image anchor and modify title
					textAnchor = ownerImages[i + 1].cloneNode(true);

					// fix bug in anchor link (remove erroneous '.')
					textAnchor.href = textAnchor.href.replace(/\.image/, "image");

					pictureTitle = pictureTitle + " [Edit]";
				}
				else
				{
					// new anchor for link to image
					textAnchor = document.createElement('a');
					textAnchor.href = largePicture;
				}

				// append text for spoilers
				if (!showImage(pictureTitle))
				{
					pictureTitle = 'View Spoiler: ' + pictureTitle;
				}
				textAnchor.textContent = pictureTitle;
				textAnchor.title = pictureTitle; // sets tooltip
				textAnchor.target='_blank';

				// add a cell for the anchor and add the anchor
				var textCell = imageRow.insertCell(-1);
				textCell.className = 'geothumbsTitleCell';
				textCell.appendChild(textAnchor);

				// add description if required
				if (options.getShowDescriptions())
				{
					textCell.appendChild(document.createElement('br'));
					var span = document.createElement('span');
					span.className = 'geothumbsDescription';
					textCell.appendChild(span);
					span.appendChild(document.createTextNode(description));
				}

				col++;
			}
		}

		// create replacement div with new image table
		var div = document.createElement('div');
		div.id = imagesId;

		// add heading and table to div
		var strong = document.createElement('strong');
		strong.textContent = "Owner Images";
		div.appendChild(strong);
		div.appendChild(t);

		// position images before map if map exists (user has logged in).  try old and new div ids.
		var mapDiv = getId(mapId1);
		if (!mapDiv) { mapDiv = getId(mapId2); }

		if (mapDiv)
		{
			// when running under Opera the page javascript has already run
			// and enclosed the div in an anchor.  move mapDiv up to this
			// anchor so we insert before the anchor
			if (mapDiv.parentNode.nodeName == 'A') { mapDiv = mapDiv.parentNode; }

			// place images inside an enclosing para to match existing page style
			var p = document.createElement('p');
			p.appendChild(div);
			mapDiv.parentNode.insertBefore(p, mapDiv);
		}
		else
		{
			// no map (user has not logged in) so position images before find section
			var findDiv = getId(findTextId);
			if (findDiv)
			{
				// add trailing br to put space between images and find section
				div.appendChild(document.createElement('br'));
				findDiv.parentNode.insertBefore(div, findDiv);
			}
		}

		// remove original unenhanced images
		cpImgs.parentNode.removeChild(cpImgs);
	}
}

// updates fancy box in the main page (if required)
function updatePageScopeFancyBox()
{
	// only update images with fancy box if we want to use it
	if (!options.getDisablePopUps())
	{
		function updateFancyBox(fbAnchorClass, opacity, colour)
		{
			// title formatter for fancybox
			function formatFancyBoxTitle(title, currentArray, currentIndex, currentOpts) {
				currentIndex += 1;
				return '<div class="'+fbAnchorClass+'">' + (title && title.length ? '<b>' + title + '</b>' : '' ) +
					   '<div id="imageCount">Image ' + currentIndex + ' of ' + currentArray.length + '</div>';
			}

			if (typeof $ !== 'undefined')
			{
				// add our lightbox format to all anchors/images
				$('.'+fbAnchorClass).fancybox({
					'margin'		 : 60, // increase as default margin overflows bottom of window for tall images
					'changeFade'	 : 100,
					'speedIn'		 : 200,
					'speedOut'		 : 200,
					'changeSpeed'	 : 150,
					'titlePosition'  : 'inside',
					'overlayOpacity' : opacity,
					'overlayColor'	 : colour,
					'titleFormat'	 : formatFancyBoxTitle
				});
			}
		}

		// create string version of updateFancyBox call to run in page scope and then run it
		var call='updateFancyBox("'+fancyBoxAnchorClass+'",'+options.getBackgroundDarkness()/100+',"'+backgroundColour+'");';
		runPageScopeScript(updateFancyBox.toString() + call, true);
	}
}

// process a single log
function processLog(logRow, relTag)
{
	console.log("processLog: ",logRow);

	// get sub-directory containing images
	var imageSubDir = (options.getImageSize() == "Small") ? 'thumb' : 'display';

	// get owner name from first anchor in the owner paragraph - do not use just
	// textContent of paragraph as GClh might have add extra content
	var ownerPara = getElementByTagAndClass(logRow, "*",/logOwnerProfileName/)[0];
	var owner = ownerPara.getElementsByTagName('a')[0].textContent;

	var logDate = getElementByTagAndClass(logRow, "span",/LogDate/)[0].textContent;

	// get image table
	var it = getElementByTagAndClass(logRow, "table",/LogImagesTable/)[0];

	// process the images for this log
	if (it)
	{
		// create new image table
		var newIt = document.createElement("table");
	    var newItBody = document.createElement("tbody");
	    newIt.appendChild(newItBody);

		// set style (remove coloured border and increase size)
		newIt.style.cssText = '';
		newIt.id = 'geothumbsLogImagesTable';

		var textCell = null;
		var imagesPerRow = options.getImagesPerRow();

		// force new row
		var col = imagesPerRow;

		// get all the image anchors
		var anchors = it.getElementsByTagName('a');

		// process each image anchor
		var noAnchors = anchors.length;
		var j;
		for (j = 0; j < noAnchors; j++)
		{
			// create a new row if required
			var imageRow;
			if (col == imagesPerRow)
			{
				// add row
				imageRow = newIt.insertRow(-1);
				col = 0;
			}

			// create a copy of the original anchor to modify - the original
			// is going to be removed later when the original row is removed
			var imageAnchor = anchors[j].cloneNode(true);

			// get anchor details
			var pictureTitle = imageAnchor.textContent;
			var anchorTitle = imageAnchor.getAttribute('data-title'); // contains title for fancybox

			// set large and thumb image urls - the match is required to fix gc.bug which incorrectly inserts a rogue /display in the path
			var parts = imageAnchor.href.match(/(.*cache\/log).*\/(.*)/);
			var baseDir = parts[1];
			var jpgImage = parts[2];
			var largePicture = baseDir + '/' + jpgImage;
			var thumbPicture = baseDir + '/' + imageSubDir + '/' + jpgImage;

			// ensure that thumbnail points to the large image - fixes gc.com bug
			imageAnchor.href = largePicture;

			// clean up picture title
			pictureTitle = tidyTitle(pictureTitle);

			// extract log and possible description from title
			var log = "";
			var description = "";
			parts = anchorTitle.match(/(log.aspx.*?IID=[0-9a-z\-]+)/);
			if (parts)
			{
				// set log page link
				log = '../seek/'+parts[1];
				parts = anchorTitle.match(/LogImgDescription">(.*?)</);
				if (parts) { description = parts[1]; }
			}

			if (relTag != '')
			{
				// set same rel id to give one fancybox gallery
				imageAnchor.rel = relTag;
			}

			// set same anchor class so we can apply fancybox to all image anchors
			imageAnchor.className = fancyBoxAnchorClass;

			// create anchor title - this is used by fancybox
			imageAnchor.title = createAnchorTagTitle(pictureTitle, description, owner, log, logDate, largePicture);

			// clean up the image tooltip
			var img = imageAnchor.firstElementChild;
			img.title = createImgTagTitle(pictureTitle, description);
			img.alt = pictureTitle;

			// set image style
			img.className = 'geothumbsImage';

			// change default photo.png image to thumbnail unless we want to hide spoilers!
			if (showImage(pictureTitle))
			{
				// use our thumbnail image
				img.src = thumbPicture;
			}
			else
			{
				imageAnchor.href = spoilerLarge;
				img.src = spoilerThumb;
				img.title = pictureTitle; // do not show description
				img.alt = pictureTitle;
			}
			// remove the non image anchor text
			imageAnchor.removeChild(imageAnchor.lastElementChild);

			// create a new cell for the image in the row and add the anchor
			var imageCell = imageRow.insertCell(-1);
			imageCell.className = 'geothumbsImageCell';
			imageCell.appendChild(imageAnchor);

			// create new anchor for text link to image
			var textAnchor = document.createElement('a');
			textAnchor.href = largePicture;

			// append text for spoilers
			if (!showImage(pictureTitle))
			{
				pictureTitle = 'View Spoiler: ' + pictureTitle;
			}
			textAnchor.title = pictureTitle; // sets tooltip
			textAnchor.textContent = pictureTitle;
			textAnchor.target='_blank';

			// create a new cell in the row and add the new anchor
			textCell = imageRow.insertCell(-1);
			textCell.className = 'geothumbsTitleCell';
			textCell.appendChild(textAnchor);

			// add description if required
			if (options.getShowDescriptions())
			{
				textCell.appendChild(document.createElement('br'));
				var span = document.createElement('span');
				span.className = 'geothumbsDescription';
				textCell.appendChild(span);
				span.appendChild(document.createTextNode(description));
			}

			col++;
			imagesProcessed++;
		}

		// span last cell if more than one row and row not fully populated
		// this ensures table background colour fills last row
		if ((noAnchors > imagesPerRow) && (col != imagesPerRow))
		{
			textCell.colSpan = (imagesPerRow - col) * 2 + 1;
		}

		// replace existing image table with new one
		it.parentNode.replaceChild(newIt, it);

		// update fancy box
		updatePageScopeFancyBox();
	}
}

//used to process initially loaded cache log images
function processCacheLogImages(tableId, handler)
{
	var t = getId(tableId);
	if (t)
	{
		//get every table row containing a log
		var logRows = getElementByTagAndClass(t, 'tr', 'log-row');

		// for each log row
		for (var row=0; row < logRows.length; row++)
		{
			handler(tableId, logRows[row]);
		}

		// update fancy box
		updatePageScopeFancyBox();
	}
}

//installs a new callLogLoad handler with a user specified number of logs to load
function update_callLogLoad(ps)
{
	var newPageSize = ps;
	var orig_callLogLoad = callLogLoad;

	// start from first page
	currentPageIdx = 1;

	// remove inital(?) logs.  try to detect when gc correct their spelling mistake!
	if (typeof initalLogs == "undefined") { initialLogs.data = []; }
	else { initalLogs.data = []; }

	// insert our handler
	callLogLoad = new_callLogLoad;

	// run it to get the initial logs
    isBusy = true;
    $tfoot.show();
	callLogLoad(true);

    function new_callLogLoad(hideFooter)
    {
    	// set new pageSize and call the original loader
    	pageSize = newPageSize;
    	orig_callLogLoad(hideFooter);
    }
}

function reformatTable(tableId, columns)
{
	var it = getId(tableId);

	// only reformat if current size is different to what we want
	if (it.rows[0].cells.length != columns)
	{
		// get all table cells
		var cells = it.getElementsByTagName('td');

		// copy table (not including rows/cells)
		var newTable = it.cloneNode(false);

		var row = 0;
		var col = 0;
		var len = cells.length;
		for (var c = 0; c < len; c++)
		{
			if (col==0) { row = newTable.insertRow(-1);	}

			// copy source cell to new table location
			cell = row.insertCell(-1);
			clone = cells[c].cloneNode(true);
			row.replaceChild(clone,cell);

			col++;
			if (col>=columns) { col = 0; }
		}

		// replace original table
		it.parentNode.replaceChild(newTable,it);
	}
}


// process the gallery images
function processGallery(table)
{
	reformatTable(table, options.getGalleryColumns());

	// get image table - must do this after reformat
	var it = getId(table);

	if (it)
	{
		// get sub-directory containing images
		var imageSubDir = (options.getLargeGalleryImages()) ? 'display' : 'thumb';

		// increase page width for large images
		if (options.getLargeGalleryImages())
		{
			var tw = 1250/4 * options.getGalleryColumns();
			if (tw < 790) tw = 790;
			it.style.width = tw+'px';
			//it.style.tableLayout="fixed";

			// size is + 160 for advert on right
			getElementByTagAndClass(getId("Content"), 'div', /container/)[0].style.width = (tw+160)+'px';
			getId(contentMainId).style.width = tw+'px';

			// update outline for owner gallery
			pt = getId('ProfileTabs');
			if (pt) pt.style.width = (tw+20)+'px';
		}

		// get all the image anchors
		var anchors = it.getElementsByTagName('a');

		// process each image anchor
		var noAnchors = anchors.length;
		var j;
		for (j = 0; j < noAnchors; j++)
		{
			var imageAnchor = anchors[j];

			// get anchor details
			var anchorTitle = imageAnchor.getAttribute('data-title'); // contains title for fancybox

			var parts = anchorTitle.match(/LogImgTitle.*?>(.*?)<\//);
			var pictureTitle = parts[1];

			// set large and thumb image urls
			var parts = imageAnchor.href.match(/(.*)\/(.*)/);
			var baseDir = parts[1];
			var jpgImage = parts[2];
			var largePicture = baseDir + '/' + jpgImage;
			var thumbPicture = baseDir + '/' + imageSubDir + '/' + jpgImage;

			// ensure that thumbnail points to the large image - fixes gc.com bug
			imageAnchor.href = largePicture;

			// clean up picture title
			pictureTitle = tidyTitle(pictureTitle);

			// extract log and possible description from title
			var log = "";
			var description = "";
			parts = anchorTitle.match(/(http.*?IID=[0-9a-z\-]+)/);
			if (parts)
			{
				// set log page link
				log = parts[1];
				parts = anchorTitle.match(/LogImgDescription">(.*?)</);
				if (parts) { description = parts[1]; }
			}

			// always allow traversal of gallery pages
			// set same rel id to give one fancybox gallery
			imageAnchor.rel = fancyboxRelId;


			// set same anchor class so we can apply fancybox to all image anchors
			imageAnchor.className = fancyBoxAnchorClass;

			// create anchor title - this is used by fancybox
			imageAnchor.title = createAnchorTagTitle(pictureTitle, description, '', log, '', largePicture);

			// add image tooltip
			var img = imageAnchor.firstElementChild;
			img.title = createImgTagTitle(pictureTitle, description);
			img.alt = pictureTitle;

			// uncomment this to use specified thumbnail size - note that larger
			// thumbnails overflow the page width
			img.src=thumbPicture;
			img.style.maxWidth='300px';
			img.style.maxHeight='225px';
			img.style.width='';  // ensure any existing width and height is removed
			img.style.height='';
		}

		// update fancy box
		updatePageScopeFancyBox();
	}
}

//adds links for unshown images to allow fancy box to access them
function addUnshownImages(rssGalleryItems)
{
	if (typeof(rssGalleryItems) != "undefined")
	{
		var unshownImagesDiv;

		// replace current unshown images div if it exists so with an
		// empty one to populate with the latest unshown images
		var d = getId(unshownImagesId);
		if (d) { d.parentNode.removeChild(d); }
		unshownImagesDiv = document.createElement('div');
		unshownImagesDiv.id = unshownImagesId;

		var c = getId(contentMainId);
		if (c)
		{
			c.appendChild(unshownImagesDiv);

			// get list of images that are linked to (this method will include
			// the spoiler images that are not actually displayed)
			var pattern = /^http:\/\/img.*\/(.*)$/;
			var links = document.getElementsByTagName('a');
			var images = '';
			var s = '';
			var m = '';
			for (var i=0;i<links.length;i++)
			{
				s = links[i].href;
				m = s.match(pattern);
				if (m) images += m[1];
			}

			// go through all rss gallery images and add unshown ones
			for (var i=0;i<rssGalleryItems.length;i++)
			{
				var item = rssGalleryItems[i];
				var largePicture = item.link['#text'];
				var m = largePicture.match(pattern);
				if (m)
				{
					// found a url matching image
					if (images.indexOf(m[1]) == -1)
					{
						// image isn't already displayed
						var pictureTitle = item.title['#text'];
						var description = item.description['#text'];
						var owner = null;
						var log = null;
						var logDate = null;

						var imageAnchor = document.createElement('a');

						// change image to spoiler if we don't want to see spoilers
						if (showImage(pictureTitle))
							imageAnchor.href = largePicture;
						else
							imageAnchor.href = spoilerLarge;

						// set same rel id to give one fancybox gallery
						imageAnchor.rel = fancyboxRelId;

						// set same anchor class so we can apply fancybox to all image anchors
						imageAnchor.className = fancyBoxAnchorClass;

						// create anchor title - this is used by fancybox
						imageAnchor.title = createAnchorTagTitle(pictureTitle, description, owner, log, logDate, largePicture);

						// add link to image after the logs
						unshownImagesDiv.appendChild(imageAnchor);
					}
				}
			}
			// add new images to fancy box
			updatePageScopeFancyBox();
		}
	}
}

// returns rss page url - throws exception if no gallery
function getRssPage()
{
	var s;
	var guid = "";

	// use page url or gallery id for guid
	if (document.location.href.indexOf('guid=') != -1)
		s = document.location.href;
	else
		s = getId(galleryImagesId).href;

	if (s)
	{
		// extract guid
		var parts = s.match(/(.*)guid=(.*)/);
		if (parts) guid = parts[2];
	}

	if (guid=="") throw "No gallery images";
	return 	"../datastore/rss_galleryimages.ashx?guid=" + guid;
}

// gets all gallery images from rss feed and adds the links to them on to the page
function getRssGalleryImages()
{
	try	{
		ld_xmlhttpRequest({
			gm: false,
			method: 'GET',
			url: getRssPage(),
			onload: function(response)
			{
				// convert xml to object
				var j = xmlToJson(response.responseXML);

				// store the list of items (image details)
				rssGalleryItems = j.rss.channel.item;

				addUnshownImages(rssGalleryItems);
			}
		});
	}
	catch (err)
	{ // no gallery
	}
}


// add event handler to listen for new 'log-row' class rows being added to the specified table
// calls handler(table, row) when row is added
function insertNewRowListener(table, handler)
{
	try
	{
		// ideally want to use 'cache_logs_table' but it fails in chrome for the initial logs (this comment applies to main cache page only)
		getId(table).addEventListener(
			'DOMNodeInserted',
			function(event)
			{
			    if (event.target.className=='log-row')
			    {
			    	handler(table, event.target);
			    }
			},
			false);
	}
	catch (err)
	{
		// ignore error
		console.log("Error adding row listener: "+err);
	}
}


// handler for cache page logs with cross log enabled
function crossLogHandler(table, row)
{
    if ( typeof crossLogHandler.timer == 'undefined' ) {
    	crossLogHandler.timer = null;
    }

	processLog(row, fancyboxRelId);

	// restart timer as a row has been added when no more rows are added
	// the timer will expire and we can update the unshown images
	if (crossLogHandler.timer) { clearTimeout(crossLogHandler.timer); }
	crossLogHandler.timer = setTimeout(function () {
			addUnshownImages(rssGalleryItems);
		}, 1000);
}

// handler for cache page logs with cross log disabled
function noCrossLogHandler(table, row)
{
	processLog(row, '');  // relTag of '' means leave rel tag as is
}

// handler for logbook personal log
function personalLogHandler(table, row)
{
	processLog(row, fancyboxPersonalRelId);
}


///////////////////////////// main /////////////////////////////////

// set up data store access
ds = new DataStore('local');
ds.setKeyPrefix(storageKeyPrefix);

// provide access to currently selected options
options = new Options();

// see if there's an update available
ld_checkForUpdate(SCRIPT_NAME, SCRIPT_VERSION, false);

// perform option menu related actions
addGeothumbsOptionsMenu();
addGlobalStyle(optionsStyle);
createPopUpOverlay();

// add a GM menu if firefox
if (isFirefox) { GM_registerMenuCommand('Geothumbs Options', showOptions); }

// perform image related actions
addGlobalStyle(style);

// set log handler
handler = (options.getImgNav() == 'Crosslog') ? crossLogHandler : noCrossLogHandler;

// determine if we are on the main cache page
var sPath = document.location.pathname.toLowerCase();
var isCachePage = (sPath.substr(0,10) == '/geocache/') ? true : false;

// main cache page actions
if (isCachePage)
{
	// be gentle on gc.com - only use our custom loaded if user wants to load
	// more than the default number of images
	if (options.getMaxLogsToLoad() == GC_DEFAULT_LOGS_TO_LOAD)
	{
		// process all rows on the page
		processCacheLogImages(cacheLogsTableId, handler);
	}
	else
	{
		//replace existing image table with an empty one (this isn't actually needed for
		//firefox as we have loaded our callLogLoad() handler before the table is
		//dynamically created.  chrome however runs the script after the initial
		//table has been created
		emptyBody = document.createElement('tbody');
		table = getId(cacheLogsTableId);
		if (table)
		{
			body = table.getElementsByTagName('tbody')[0];
			table.replaceChild(emptyBody, body);

			//install new callLogLoad function
			runPageScopeScript(update_callLogLoad.toString() + 'update_callLogLoad('+options.getMaxLogsToLoad()+')', false);
		}
	}

	//detect dynamic addition of rows
	insertNewRowListener(cacheLogsTableId, handler);

	//workaround for gclh script that loads logs into 'cache_logs_table2' instead of the existing 'cache_logs_table' !!
	//listen for addition of gclh table and if added add our row listener
	getId('cache_logs_container').addEventListener(
			'DOMNodeInserted',
			function(event) { if (event.target.id==gclhCacheLogsTableId)
								{
									console.log('DOMNodeInserted ', event.target.id);
									var n = getId(cacheLogsTableId);
									if (n) n.parentNode.removeChild(n);
									insertNewRowListener(gclhCacheLogsTableId, handler); }
								},
			false);

	// owner images
	if (options.getShowOwnerImages())
	{
		processCacheOwnerImages();
		updatePageScopeFancyBox();
	}

	// if cross log nav then add the unshown images
	if (options.getImgNav() == 'Crosslog')
	{
		// get remaining gallery images from rss feed
		getRssGalleryImages();
	}
}
else if (isPage('cache_logbook.aspx'))
{
	// logbook page actions

	// process the all logs table - only needed for browsers that run the script after the page is ready (opera)
	processCacheLogImages(logbookAllLogsTableId, handler);

	// process the table containing the users logs - this uses a separate handler
	// to only allow the images in this table to be traversed  - only needed for browsers that run the (opera)
	// script after the page is ready
	processCacheLogImages(logbookPersonalLogsTableId, personalLogHandler);

	// detect dynamic addition of rows
	insertNewRowListener(logbookAllLogsTableId, handler);

	//detect dynamic addition of rows - no cross log
	insertNewRowListener(logbookPersonalLogsTableId, personalLogHandler);

	// if cross log nav then add the unshown images
	if (options.getImgNav() == 'Crosslog')
	{
		getRssGalleryImages();
	}

}
else if (isPage('gallery.aspx'))
{
	// cache gallery page actions
	if (options.getEnhanceGallery())
	{
		processGallery(cacheGalleryTableId);

		// get remaining gallery images from rss feed
		getRssGalleryImages();
	}
}
else if (isPage('log.aspx'))
{
	// placeholder for future
}
else
{
	// user profile page - process owner gallery page (if found)
	if (options.getEnhanceGallery())
	{
		processGallery(ownerGalleryTableId);
	}
}

})();