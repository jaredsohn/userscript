// ==UserScript==
// @name          Geograph Images
// @version       2.8
// @description   (v2.8 23/08/2013) Adds nearby Geograph images to a cache page.  Update for geocaching.com update on 21/08/12.
// @namespace     http://benchmarks.org.uk/geographimages/
// @copyright     2011+, Gary Player <dev@benchmarks.org.uk>
// @license       Released under the GPL http://www.gnu.org/copyleft/gpl.html
// @attribution   ld_* functions kindly supplied by Lil Devil http://www.lildevil.org/greasemonkey/
// @attribution   Pop-up menu code based on https://www.userscripts.org/scripts/show/6773 by Eyal Soha
// @attribution   Storage class ideas from http://www.latunyi.com/
// @include	      http*://*.geocaching.com/geocache/*
// @include       http*://*.geocaching.com/seek/cache*
// ==/UserScript==

// This is a script for Firefox, Google Chrome, Opera and Safari browsers,
// Firefox requires the Greasemonkey extension to be installed (see http://greasemonkey.mozdev.org/)
// Safari requires the NinjaKit for Safari extension to be installed (see http://d.hatena.ne.jp/os0x/20100612/1276330696/)

(function(){
// script details for version check
var SCRIPT_NAME = 'Geographimages';
var SCRIPT_VERSION = '2.8';
var VERSION_LIST_XDR = 'http://benchmarks.org.uk/greasemonkey/versions.txt';
var VERSION_LIST_NO_XDR = 'http://www.geocaching.com/seek/log.aspx?LUID=026bbac0-130d-49bb-9eee-626b3f873e96';

// items set by menu options - opera users will need to manually change these
var imagesPerRow = 3;
var defaultRowsToShow = 1;

// constants
var mapId1 = 'ctl00_ContentBody_uxlrgMap';
var mapId2 = 'uxlrgMap';
var lnkConvId = 'ctl00_ContentBody_lnkConversions';
var navigationMenuId = 'Navigation';
var fancyboxRelId = "fancybox[geothumbs]"; // allows images to be treated as part of geothumbs script
var geographDivTableId = 'geographDivTableId';
var closedImg = '../images/arrow_close.gif';
var openedImg = '../images/arrow_open.gif';
var searchDist = 2; // 2km search distance
var searchMaxImages = 30; // max number of images to return
var fancyBoxAnchorClass = 'geothumbs_fbac'; //anchor class to use for all anchors to images - fancybox is applied to these
var geographResponseId = 'geographResponse'; //id of div holding response
var geographResponseIdAtt = 'response'; //div attribute holding response
var geographResponseEvt = 'geographResponseEvt'; //response event type

// css styles
var optionsStyle =
'.gi_overlay { background:#f6f6f6; border:3px double #666666;}' +
'.gi_overlayContainer { display:none; position:absolute; top:0; right:0; bottom:0; left:0; }' +
'#gi_options { width:700px; padding:10px; margin:20px auto 0; }' +
'#gi_options .gi_optionsHeading { font-weight:bold; }' +
'#gi_overlayShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.6; }' +
'.gi_important { font-weight:bold; }' +
'.gi_selection { position:absolute; left:18em; }' +
'.gi_checkbox { margin-top:0.1em;}' +
'.gi_value { margin-left:0.25em;}' +
'.gi_option { line-height:200%; position:relative; left:2em;}'
;

var style =
'#geographImagesTable { width:100%; border-collapse: collapse; border:1px solid #D7D7D7; table-layout: auto; }' +
'.geographImageCell { width:120px; border: 0px none; padding: 10px 8px 10px 8px; }' +
'.geographImage { display: block; margin-left: auto; margin-right: auto; }' +
'.geographTitleCell { width:1400px; padding-right:8px; line-height: 1.2;}' +
'.geographTitleLink { text-decoration: none; }' +
'.geographDescription { font-size: smaller; }' +
'.geographDescriptionLink { color: #666666; }' +
'#geographHeadingLinkId { text-decoration: none; font-weight: bold; color: black !important; }' +
'#geographMoreId { font-size: smaller; position: relative; bottom:0.5pt;}' +
'#geographHeadingRightId { float:right; position: relative; bottom:0px;}' +
'#geographIconLinkId { float:left; } ' +
'#geographLicenseId { color: #666666; }' +
'#caption #description { font-weight: normal; }' +
'#imageData #imageDetails { width: 80%; }' +
'.geothumbs_fbac { position:relative; }' +
'.geothumbs_fbac #title { width:80%; text-align:left; }'+
'.geothumbs_fbac #links { float:right; height:2em; margin-left:auto; padding-left:2em; }'+
'.geothumbs_fbac #links a { color:#000000; font-weight: normal; }' +
'.geothumbs_fbac #links a:hover { color:#FF6600; }' +
'.geothumbs_fbac #imageCount { position:absolute; right:0px; bottom:0px; padding-left:4em; }'+
'.geothumbs_fbac #description { font-weight: normal; }';

var backgroundColour = '#000'; // Fancybox background colour

// storage key prefix so we don't clash with other users of localStorage
var storageKeyPrefix = 'bmorguk/gi/';

//data store
var ds;

//geograph images options
var options = new Options();

//geothumbs options
var gtOptions = new GTOptions();

// variables
var extWindow; // window access
var numDescriptionCharsPerImage = 0; // calculated number of description chars to display
var geographLink = "";
var geographHomePage = "";
var geographPhotoPageUrl = "";
var geographGridrefPageUrl = "";
var geographApiUrl = "";
var lat = 0;
var lon = 0;
var geographData; // holds data returned by geograph
var unshownIndex = 0; // the first unshown geograph image
var collapsed = false; // image table initially shown

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// Lil Devils cross browser logger
function ld_log(str) {
	if ((typeof(GM_log) != 'undefined') && isFirefox) {
		GM_log(str);
		return;
	}
	try {
		console.log(str);
	} catch (err) {}
}

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
					ld_log(scriptName + ': Updater: response unrecognized');
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
	catch (err) { ld_log(scriptName + ': ' + err);}
}


// sets the geograph urls for this lat lon
function setGeographUrls()
{
	if (inBritainAndIreland())
	{
		geographLink = 'geograph.org.uk';
		geographHomePage = 'http://www.geograph.org.uk/';
		geographApiUrl = 'http://api.geograph.org.uk/api';
		geographPhotoPageUrl = 'http://www.geograph.org.uk/photo/';
		geographGridrefPageUrl = 'http://www.geograph.org.uk/gridref/';
	}
	else if (inChannelIslands())
	{
		geographLink = 'channel-islands.geographs.org';
		geographHomePage = 'http://channel-islands.geographs.org/';
		geographApiUrl = 'http://channel-islands.geographs.org/api';
		geographPhotoPageUrl = 'http://channel-islands.geographs.org/photo/';
		geographGridrefPageUrl = 'http://channel-islands.geographs.org/gridref/';
	}
	else if (inGermany())
	{
		geographLink = 'geo-en.hlipp.de';
		geographHomePage = 'http://geo-en.hlipp.de/';
		geographApiUrl = 'http://geo-en.hlipp.de/restapi.php/api';
		geographPhotoPageUrl = 'http://geo-en.hlipp.de/photo/';
		geographGridrefPageUrl = 'http://geo-en.hlipp.de/gridref/';
	}
}

// add css styles
function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head)
    {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
    }
}

//runs the specified javascript in page scope. optionally delete it afterwards.
function runPageScopeScript(s, remove)
{
	// create script
	var script = document.createElement("script");
	script.textContent = s;
	node = document.body.appendChild(script);

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

	val=parseInt(getId(options.getInitialNumberOfRowsId()).value, 10);
	if (val > 15) {val = 15;}
	else if (val < 0) {val = 1;}
	options.setInitialNumberOfRows(val);
}

//show popup overlay
function showPopUpOverlay(content)
{
	// add shadow
	getId('gi_overlayShadow').style.zIndex = '1000';
	getId('gi_overlayShadow').style.display = 'block';

	// show pop-up
	getId('gi_overlayContainer').innerHTML = content;
	getId('gi_overlayContainer').style.zIndex = '1001';
	getId('gi_overlayContainer').style.display = 'block';

	window.scroll(0,0);
}

// hide popup overlay
function hidePopup()
{
	getId('gi_overlayContainer').style.display = 'none';
	getId('gi_overlayShadow').style.display = 'none';
}

//pops up the Geograph Images Options page
function showOptions()
{
	// opera needs a <br> before the inputs to correct the vertical alignment
	var fix = (typeof opera != "undefined") ? '<br>' : '';

	showPopUpOverlay(
		'<div id="gi_options" class="gi_overlay" style="position:relative; left:0px; top:0px;">'+
		'<div style="font-size:150%; text-align: center; width:550px; float:left">'+
		'<span class="gi_important"><a href="http://benchmarks.org.uk/greasemonkey/geographimages.php">Geograph Images Options</a></span> </div>'+
		'<div style="font-size:smaller; float:right">Version: '+SCRIPT_VERSION+'<br><a href="#" id="GICheckForUpdate">Check for new version</a></div><br><br>'+
		'<hr>'+ fix +
		'<span class="gi_option">Thumbnails per row</span><span class="gi_selection">'+
		'<input name="gi_imagesPerRow" id="gi_imagesPerRow2" value="2" type="radio"><label for="gi_imagesPerRow">2 </label>'+
		'<input name="gi_imagesPerRow" id="gi_imagesPerRow3" value="3" type="radio"><label for="gi_imagesPerRow">3 </label>'+
		'<input name="gi_imagesPerRow" id="gi_imagesPerRow4" value="4" type="radio"><label for="gi_imagesPerRow">4 </label>'+
		'<input name="gi_imagesPerRow" id="gi_imagesPerRow5" value="5" type="radio"><label for="gi_imagesPerRow">5 </label></span><br>'+

		'<span class="gi_option">Initial number of rows </span><span class="gi_selection gi_value">'+
		'<input id="gi_initialNumberOfRows" maxlength="3" size="3" type="text"><label for="gi_initialNumberOfRows"></label></span><br>'+

		'<br><hr><div style="text-align: right;"><input id="GIQuitButton" value="&nbsp;Quit&nbsp;" type="button">&nbsp; &nbsp;<input id="GISaveButton" value="Save" type="button">&nbsp; &nbsp;<input id="GISaveAndRefreshButton" value="Save and Refresh Page" type="button"></div>'+
		'</div>');

	// set options page with current settings
	getId(options.getImagesPerRowId()+options.getImagesPerRow()).checked = 'checked';
	getId(options.getInitialNumberOfRowsId()).value = options.getInitialNumberOfRows();

	// add event handlers
	onClick('GIQuitButton', function() { hidePopup(); });
	onClick('GISaveButton', function() { hidePopup(); saveOptions();});
	onClick('GISaveAndRefreshButton', function() { hidePopup(); saveOptions(); document.location.reload();});
	onClick('GICheckForUpdate', function() { ld_checkForUpdate(SCRIPT_NAME, SCRIPT_VERSION, true); });
}

// adds to the GI menu
function addGeographImagesOptionsMenu()
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

		// add geographimages sub menu to specified menu id
		var liText = '<a href="#" title="Geograph Images Options" id="geographImagesOptions">Geograph Images Options</a>';
		var optionsSubMenu = getId(optionsMenuId).nextElementSibling;
		var li = document.createElement('li');
		li.innerHTML = liText;
		optionsSubMenu.appendChild(li);

		// add event listener - this is done via setTimeout to fix a problem when the
		// gc_little_helper script is run after this script.  when not set via a
		// setTimeout and gc_little_helper runs after this script gc_little_helper
		// updates the menu by adding a form which appears to remove this onClick
		// handler.  when set via setTimeout the event handler remains in place!!
	    setTimeout(function(){onClick('geographImagesOptions', showOptions);},0);

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
    	ld_log(err);
    }

}

// Geothumbs Options class
function GTOptions()
{
	// set up geothumbs data store access
	var gt_ds = new DataStore('local');
	gt_ds.setKeyPrefix('bmorguk/gt/');

	// Fancybox background darkness (in percent)
	var backgroundDarkness = {id:'backgroundDarkness', defval:25};

	// Disable fancy box pop-ups
	var disablePopUps = {id:'disablePopUps', defval:false};

	////////////// methods //////////////
	this.getBackgroundDarkness = function(){return gt_ds.get(backgroundDarkness.id, backgroundDarkness.defval);};
	this.getDisablePopUps = function(){return gt_ds.get(disablePopUps.id, disablePopUps.defval);};
}

// Geograph Images Options class
function Options()
{
	// prefix for pop-up Geograph Images Options page
	var idPrefix = 'gi_';

	// Number of images per row
	var imagesPerRow = {id:'imagesPerRow', defval:2};

	// Initial number of rows
	var initialNumberOfRows = {id:'initialNumberOfRows', defval:2};

	////////////// methods //////////////

	this.getImagesPerRow = function(){return ds.get(imagesPerRow.id, imagesPerRow.defval);};
	this.getImagesPerRowId = function(){return idPrefix+imagesPerRow.id;};
	this.setImagesPerRow = function(v){ds.set(imagesPerRow.id, v);};

	this.getInitialNumberOfRows = function(){return ds.get(initialNumberOfRows.id, initialNumberOfRows.defval);};
	this.getInitialNumberOfRowsId = function(){return idPrefix+initialNumberOfRows.id;};
	this.setInitialNumberOfRows = function(v){ds.set(initialNumberOfRows.id, v);};
}

function createPopUpOverlay()
{
	//add overlay div
	var overlayDiv = document.createElement('div');
	overlayDiv.id = 'gi_overlayContainer';
	overlayDiv.className = 'gi_overlayContainer';
	document.body.appendChild(overlayDiv);

	// add overlay shadow div
	var shadowDiv = document.createElement('div');
	shadowDiv.id = 'gi_overlayShadow';
	document.body.appendChild(shadowDiv);
}

// insert newNode after referenceNode
function insertAfter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// returns a string shortened to the nearest word boundary less than the specified length
function shortenString(str,n)
{
	  if(str.length > n)
	  {
		  var s = str.substr(0, n);
		  var ls = s.lastIndexOf(' ');
		  str = s.substr(0,ls);
	  }
	  return str;
}

// convert awkward html entities
function convertHtmlEntity(h)
{
	if (h)
	{
		// convert &#8470; into No
		h = h.replace(/&#8470;/g,'No ');
	}
	return h;
}

// tidies a geograph description by:
// 1. removing newlines
// 2. converting geograph links to html links
// 3. converting http strings to html links
function tidyDescription(d)
{
	if (d)
	{
		// convert /r /n to space
		d = d.replace(/(\\[rn])+/g,' ');

		// convert http strings to an html link
		d = d.replace(/(https?:\/\/?[a-z0-9_$!&%?,#@'\/.*+;:=~-]+)/gi,'<a class="geographDescriptionLink" href="$1" target="_blank">link</a>');

		// convert geograph format photo links to html links
		d = d.replace(/\[+(\d+)\]+/g,'<a class="geographDescriptionLink" href="'+geographPhotoPageUrl+'$1" target="_blank">link</a>');

		// convert geograph format gridref links to html links
		d = d.replace(/\[+([a-z]{1,3}\d+)\]+/gi,'<a class="geographDescriptionLink" href="'+geographGridrefPageUrl+'$1" target="_blank">link</a>');

		// ensure trailing '.'
		d = d.replace(/\.\s*$/, '') + '.';
	}
	return d;
}

// get lat lon from page
function getLatLon()
{
	// get lat lon coordinates
	var lnkConv = document.getElementById(lnkConvId);
	if (lnkConv)
	{
		var ll = lnkConv.href.match(/-?\d+\.?\d*/g);
		lat = ll[0];
		lon = ll[1];
	}
}

// returns true if lat lon is in britain or ireland
function inBritainAndIreland()
{
	if (lat > 49.7 && lat < 61 && lon > -12.2 && lon < 2)
		return true;
	else
		return false;
}

// returns true if lat lon is in the channel islands
function inChannelIslands()
{
	if (lat > 49.1 && lat < 49.8 && lon > -2.8 && lon < 1.8)
	{
		return true;
	}
	else
		return false;
}

//returns true if lat lon is in germany
function inGermany()
{
	if (lat > 47.25 && lat < 55.1 && lon > 5.8 && lon < 15.05)
		return true;
	else
		return false;
}

// returns true if geograph covers the lat lon
function isCoveredByGeograph()
{
	if (inBritainAndIreland() || inChannelIslands() || inGermany())
		return true;
	else
		return false;
}

// get geograph api url - distance in km
function getApiUrl(distance, maxImages)
{
	return geographApiUrl+'/Latlong/'+distance+'km/'+lat+','+lon+'/geocache?output=json&perpage='+maxImages+'&callback=?';
}

// title formatter for fancybox
function formatFancyBoxTitle(title, currentArray, currentIndex, currentOpts) {
	return '<div class="'+fancyBoxAnchorClass+'">' + (title && title.length ? '<b>' + title + '</b>' : '' ) +
	       '<div id="imageCount">Image ' + (currentIndex + 1) + ' of ' + currentArray.length + '</div>';
}

// creates title for anchor tag
function createAnchorTagTitle(title, description, owner, geographPage, takenDate, largePictureLink)
{
	var descPart;
	var lbStyleViewLogLink;
	var taken;
	var title;

	if (description == '')
		descPart = '&nbsp;';
	else
		descPart = description;

	if (geographPage == '')
	{
		lbStyleViewLogLink = '';
		taken = '';
	}
	else
	{
		lbStyleViewLogLink = '<a href="' + geographPage + '" target="_blank">Geograph Page</a>&nbsp;';
		taken = ' on ' + takenDate;
	}

	// lightbox style
	title = '<div id="links">' +
				lbStyleViewLogLink +
				"<a href=\"javascript:pp(\'" + largePictureLink + "\');\">Print Picture</a>" +
			'</div>' +

			'<div id="title">' +
				'"' + title + '"' +
				' by ' + owner + taken + '<br>' +
				'<span id="description">' + descPart + '</span>' +
			'</div>';
	return title;
}

//updates fancy box in the main page (if required)
function updatePageScopeFancyBox()
{
	// only update images with fancy box if we want to use it
	if (!gtOptions.getDisablePopUps())
	{
		function updateFancyBox(fbAnchorClass, opacity, colour)
		{
			// title formatter for fancybox
			function formatFancyBoxTitle(title, currentArray, currentIndex, currentOpts) {
				currentIndex += 1;
				return '<div class="'+fbAnchorClass+'">' + (title && title.length ? '<b>' + title + '</b>' : '' ) +
					   '<div id="imageCount">Image ' + currentIndex + ' of ' + currentArray.length + '</div>';
			}

			// add our lightbox format to all anchors/images
			$('.'+fbAnchorClass).fancybox({
				'speedIn'		 : 200,
				'speedOut'		 : 200,
				'changeSpeed'	 : 150,
				'titlePosition'  : 'inside',
				'overlayOpacity' : opacity,
				'overlayColor'	 : colour,
				'titleFormat'	 : formatFancyBoxTitle
			});
		}

		// create string version of updateFancyBox call to run in page scope and then run it
		var call='updateFancyBox("'+fancyBoxAnchorClass+'",'+gtOptions.getBackgroundDarkness()/100+',"'+backgroundColour+'");';
		runPageScopeScript(updateFancyBox.toString() + call, true);
	}
}

// add a geograph image to the specified cell
function addImage(cell, item)
{
	var thumbnail = item.thumbnail;
	var image = item.image;
	var title = item.title;
 	var description = item.comment;
	var author = item.realname;
	var gridimage_id = item.gridimage_id;
	var imagetaken = item.imagetaken;
	var distance = item.dist;

	// create anchor and set the fancybox rel id
	var a = document.createElement('a');
	a.rel = fancyboxRelId;

	// format the distance info
	var distanceStr = Math.floor(distance) + 'm away';

	// create the author license
	var licence='&copy; ' + author + ' and licensed for reuse under this ' +
				'<a id="geographLicenseId" href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">Licence</a>.';

	// initialise fancybox and image title tag descriptions
	var fancyboxDescription = '<span id="description">';
	var imageTitleDescription = '';

	// add description if there is one
	if (description && description != '')
	{
		// create a tidied description for the fancybox
		var tDesc = tidyDescription(description);

		// add distance to tidied description
		fancyboxDescription = fancyboxDescription + tDesc + '<br>';

		// remove any trailing '. ' from image pop-up description
		imageTitleDescription = ' - ' + description.replace(/\.\s*$/,'');
	}

	// add distance and licence (only for fancybox)
	fancyboxDescription = fancyboxDescription + licence +  '<br>' + distanceStr + '</span>';
	imageTitleDescription = imageTitleDescription + ' - ' + distanceStr;

	// link to geograph page
	var geographPage = geographPhotoPageUrl + gridimage_id;

	// create anchor title - this is used by fancybox
	a.title = createAnchorTagTitle(title, fancyboxDescription, author, geographPage, imagetaken, image);
	a.href = image;

	// create thumbnail image
	// var thumb = new Image();
	var thumb = document.createElement('img'); // fix for bug in Chrome. new Image() should work.

	thumb.src = thumbnail;
	thumb.className = 'geographImage';

	// create the image tooltip
	thumb.title = title + ' by ' + author + imageTitleDescription;
	thumb.alt = title;

	// add thumbnail to anchor
	a.appendChild(thumb);

	// add anchor to cell
	cell.appendChild(a);

	// set same anchor class so we can apply fancybox to all image anchors
	a.className = fancyBoxAnchorClass;


}

// add a geograph title to the specified cell
function addTitle(cell, item)
{
	var title = item.title;
	var description = item.comment;
	var geographPageUrl = geographPhotoPageUrl + item.gridimage_id;

	// create new anchor for text link to geograph page
	var textAnchor = document.createElement('a');
	textAnchor.className = 'geographTitleLink';
	textAnchor.href = geographPageUrl;
	textAnchor.target = '_blank';
	textAnchor.title = title; // sets tooltip
	textAnchor.textContent = title;

	// add anchor to cell
	cell.appendChild(textAnchor);// add description if required

	// add description if one exists
	if (description && (description != ""))
	{
		// shorten description length to allowed amount
		var cDesc = shortenString(description, numDescriptionCharsPerImage);

		// add continuation string if shortened
		if (cDesc.length != description.length)
		{
			cDesc = cDesc + " ...";
		}

		// tidy description
		var tDesc = tidyDescription(cDesc);

		// add description to title
		cell.appendChild(document.createElement('br'));
		var span = document.createElement('span');

		span.className = 'geographDescription';
		cell.appendChild(span);
		span.innerHTML = tDesc;
	}
}

// add geograph details (image and title) to the specified row
function addGeographImageDetails(r, item)
{
	// add new image cell
	var cell = r.insertCell(-1);
	cell.className = 'geographImageCell';
	addImage(cell, item);

	// add a new title cell
	cell = r.insertCell(-1);
	cell.className = 'geographTitleCell';
	addTitle(cell, item);
}

// add row of images to table
function addRowOfImages()
{
	var t = document.getElementById('geographImagesTable');

	// add table row
	var r = t.insertRow(-1);
	r.className = 'geographImagesRow';

	// set number of images to load
	var toShow = geographData.length - unshownIndex;

	if (toShow > options.getImagesPerRow())
		numToLoad = options.getImagesPerRow();
	else
		numToLoad = toShow;

	var i = unshownIndex;
	var endIndex = i + numToLoad;
	while ( i < endIndex )
	{
		// get geograph metadata
		var item = geographData[i];

		// and add the details to the current row
		addGeographImageDetails(r, item);
		i++;
	}

	unshownIndex = i;

	// hide 'more' link when all images are shown
	if (unshownIndex >= geographData.length)
	{
		var gmid = document.getElementById('geographMoreId');
		gmid.style.visibility = 'hidden';
	}

	// add our lightbox format to all anchors/images
	updatePageScopeFancyBox();
}

// sort function to sort by distance field
function distanceSortFn(a, b)
{
	return (a.dist - b.dist);
}

// constants for distance calculation
var DEG_TO_RAD = 0.017453292519943295769236907684886;
var RADIUS = 6371000;

// returns distance in metres between two coordinates
function distanceBetweenCoords(lat1, lon1, lat2, lon2)
{
	var dLat = (lat2-lat1) * DEG_TO_RAD;
	var dLon = (lon2-lon1) * DEG_TO_RAD;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.cos(lat1 * DEG_TO_RAD) * Math.cos(lat2 * DEG_TO_RAD) *
	        Math.sin(dLon/2) * Math.sin(dLon/2);
	var d = RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return d;
}

// processes the data returned by geograph
function processGeographResponse(d)
{
	// set local attribute for access by all
	geographData = d;

	// process results (if there are any)
	var i = geographData.length;
	if (i)
	{
		while (--i >= 0)
		{
			// add distance field to data
			var item = geographData[i];
			var llat = item.wgs84_lat;
			var llon = item.wgs84_long;
			item.dist = distanceBetweenCoords(lat, lon, llat, llon);

			// change awkward html entities
			item.title = convertHtmlEntity(item.title);
			item.comment = convertHtmlEntity(item.comment);

			// convert dates to dd-mm-yyyy
			item.imagetaken = item.imagetaken.replace(/(\d+)\-(\d+)\-(\d+)/,"$3-$2-$1");
		}

		// sort results by distance from origin
		geographData.sort(distanceSortFn);

		// create geograph div section
		var gDiv = document.createElement('div');
		gDiv.id = 'geographDiv';

		// create header span
		var hdrSpan = document.createElement('span');
		hdrSpan.id = 'geographHeader';
		hdrSpan.innerHTML =
		'<a id="geographHeadingLinkId" href="' + geographHomePage + '" title="Go to ' + geographLink + '" target="_blank">Geograph Images</a> ' +
		'<span id="geographMoreId"> (<a href="#" onClick="return false;" id="geographMoreLinkId">more</a>)</span>' +
		'<span id="geographHeadingRightId">' +
			'<a id="geographIconLinkId" href="' + geographHomePage + '" title="Go to ' + geographLink + '" target="_blank"><img src="' + geographHomePage + 'favicon.ico"></a>' +
		'</span>';

		// add header span to geograph div
		gDiv.appendChild(hdrSpan);

		// add new table div id and sub div (required by scriptaculous Effect) for collapsible section
		var tDiv = document.createElement('div');
		tDiv.id = geographDivTableId;
		gDiv.appendChild(tDiv);
		var div = document.createElement('div');
		tDiv.appendChild(div);

		// create images table
		var t = document.createElement('table');
		t.id = 'geographImagesTable';
		var tb = document.createElement('tbody');
		t.appendChild(tb);

		// add table to sub div
		div.appendChild(t);

		// position geograph div before map (this should exist as we're only called if we're logged in and have coordinates)
		// try old and new div ids.
		var mapDiv = document.getElementById(mapId1);
		if (!mapDiv)
			mapDiv = document.getElementById(mapId2);

		if (mapDiv)
		{
			// this is run after the page javascript has already run
			// and enclosed the div in an anchor.  move mapDiv up to this
			// anchor so we insert before the anchor
			if (mapDiv.parentNode.nodeName == 'A')
			{
				mapDiv = mapDiv.parentNode;
			}

			mapDiv.parentNode.insertBefore(gDiv, mapDiv);

			// show the initial rows of images
			var i = options.getInitialNumberOfRows();
			while (i-- > 0)
			{
				addRowOfImages();
			}
		}

		// attach eventlistener to 'more' link
		onClick('geographMoreLinkId',addRowOfImages);
	}
}

// determines how many description characters can be displayed
function calcNumDescChars()
{
	var w = window.innerWidth; // page width
	var i = options.getImagesPerRow();
	var r = (w/1024);
	var c = Math.floor(120 * (-2*r*r+9*r-6) * (0.2*i*i-1.6*i+3.4));
	if (c > 450)
	{
		c = 450;
	}
	else if (c < 10)
	{
		c = 10;
	}

	return c;
}

// get geograph images and call callback function
function getGeographImages(dist, maxImages, callback)
{
	// create dom location to store geograph response
	var element = document.createElement('div');
	element.setAttribute("id", geographResponseId);
	document.documentElement.appendChild(element);

	// listen for the response and process it
	document.addEventListener(geographResponseEvt,
	    function(evt)
	    {
	    	var response = JSON.parse(evt.target.getAttribute(geographResponseIdAtt));
	    	callback(response);
	    },
	    true);

	// create link for geograph request
	var apiLink = getApiUrl(dist, maxImages);

	// run page scope script to request json from geograph, add the response
	// to the dom and raise an event to process the response
	sc = 'jQuery.getJSON("' + apiLink + '", function(response){'+
			'var element = document.getElementById("'+geographResponseId+'");'+
			'json=JSON.stringify(response);'+
			'element.setAttribute("'+geographResponseIdAtt+'", json);'+
			'var evt = document.createEvent(\'Events\');'+
			'evt.initEvent("'+geographResponseEvt+'", true, false);'+
			'element.dispatchEvent(evt);})';
	runPageScopeScript(sc, true);
}

///////////////////////////// main /////////////////////////////////

// set up data store access
ds = new DataStore('local');
ds.setKeyPrefix(storageKeyPrefix);

// see if there's an update available
ld_checkForUpdate(SCRIPT_NAME, SCRIPT_VERSION, false);

// get cache location
getLatLon();

if (isCoveredByGeograph())
{
	// provide access to currently selected options
	options = new Options();

	// provide access to currently selected geothumbs options
	gtOptions = new GTOptions();

	// perform option menu related actions
	addGeographImagesOptionsMenu();
	addGlobalStyle(optionsStyle);
	createPopUpOverlay();

	// add a GM menu if firefox
	if (isFirefox) { GM_registerMenuCommand('Geograph Images Options', showOptions); }

	// perform image related actions
	addGlobalStyle(style);

	// calculate max size of description
	numDescriptionCharsPerImage = calcNumDescChars();

	// set the required server and paths
	setGeographUrls();

	// get list of geograph images and call processGeographResponse()
	getGeographImages(searchDist, searchMaxImages, processGeographResponse);
}

})();