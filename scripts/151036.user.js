// ==UserScript==
// @name          Facebook autoColourizer
// @author	  Shirish Chandra Srivastava
// @description	  Facebook auto-colourizer coloors the facebook scheme according to the person's profile picture.The orignal userscript is by justin ormont<Facebook Auto-Colorizer v2.7>,I have done some changes and improved it ,so that it works on the new Facebook
// @version    42
// @copyright  (c) 2009 Justin Ormont.  All rights reserved.Edited by SCS
// @include       https://www.facebook.com/*
// @include       https://login.facebook.com/*
// @include       https://ssl.facebook.com/*
// @include       https://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       https://www.facebook.tld/*
// @include       https://www.facebook.tld/*
// @include       https://login.facebook.tld/*
// @include       https://*.facebook.tld/*
// @include       https://*.facebook.tld/*
// @run-at        document-end
// ==/UserScript==

//
// THis userscript is orignally the idea of Justin ormont his release version was vr 2.7<Facebook Auto-Colorizer> 
// I have just done some changes so that it works on the new Facebook
// 
// BTW
// This userscript is for greasemonkey for Firefox <I have not tried it yet on Greasemonkey for other browsrs>
// IMPORTANT for this userscript to work you must have firefox with greasemonkey 
// And greasemonkey must be Enabled HA Ha Ha
// I was not able to decide the script version number so I kept it 42{answer to the universe}
// Modified on: Friday,Oct 26 ,2012
//
//
 thisScriptVersion = new Array(2,9,5);
//startingColorArray = new Array(10);
//finalColorArray = new Array(10);
//fadedColorArray = new Array(10);

var timers = new Array();
var timerRecord = "";
var timersOff = true;
var AjaxInserters = new Array(4);
var lastDocUrl = "";
var currentImgDom = "";
var colorPaletteAjaxInFlight = "";
var fadeTimer = null;

//ClearCache();

//if (navigator.userAgent.indexOf('Opera') >= 0) {
//	GM_log = window.opera.postError;
//	// Still need a working GM_xml...
//}

(function()
 {
 try {	
 if (CheckForFrames()) return;
 }
 catch(err) { Log(err); }
 
 var now = new Date();
 try { 
 //if (typeof GetItem('lastCheckedForVersion','undefined') != 'undefined' && GetItem('lastCheckedForVersion')) var lastCheckedForVersion = GetItem('lastCheckedForVersion');
 if (GetItem('lastCheckedForVersion') != null && GetItem('lastCheckedForVersion')) var lastCheckedForVersion = GetItem('lastCheckedForVersion');
 else lastCheckedForVersion = 0;   
 }
 catch(err) { lastCheckedForVersion = 0; }
 //alert("Time diff: " + now.getTime() + " " + lastCheckedForVersion + " " + (now.getTime() - lastCheckedForVersion))
 if ((now.getTime() - lastCheckedForVersion) > 43200000) CheckForUpdate(); //check at most every 12 hours
 
 InitialPageSetup();
 
 var photoUrl = lookForPhotoUrl();
 
 //try{ApplyColorSchemeFromLastPage(true)}
 //catch(err){}
 
 Log("Auto-Colorizer started.");
 
 if (photoUrl != null) {
	 if (colorPaletteAjaxInFlight != photoUrl) {
		 // Global variable
		 colorPaletteAjaxInFlight = photoUrl;
		 lookInCacheThenGetColors(photoUrl, true, true);
	 } 
 }
 
 //TakeScreenShot();
 
 setInterval(function() {ReplaceSilhouette();}, 10000);
 
 //ScrambleText(document.body, 0);
 //setTimeout(function() {ScrambleText(document.body, 0)}, 1000);
 
 //Log("LocalStorage = " + TestLocalStore());
 
 //PreCacheAllImagesOnPage();
 
 
 //alert("Time spent in InsertCSS = " + typeof(oldTime) + typeof(currentDate.getTime())));  
 
 SetFlagsForBrowser();
 
 })();

function CheckForFrames() {
	// Check if we are in a frame, and exit if so.
	if (parent != self && getApparentUrl().indexOf('AutoColorizer')==-1 && getApparentUrl().indexOf('Auto-Colorizer')==-1) { 
		//Log("Executing in a frame: " + location);
		return true; 
	}
	return false
}

function SetFlagsForBrowser() {
	
	var browser = GetBrowserVersion();
	
	//alert("browser = " + JSON.stringify(browser));
	
	
	if (((browser.application == 'Chrome') && (browser.version >= 10)) ||
		((browser.application == 'Firefox') && (browser.version >= 4))){
		
	}
	
}

function GetBrowserVersion() {
	//Log("GetBrowserVersion 1");

	if (typeof GetBrowserVersion.browser != 'undefined') return GetBrowserVersion.browser;
	
	var browser = {'application': '', 'version': '', 'versionString': '', 'os': '', 'os': '', 'language': '' };
	
	
	browser.language = navigator.language;
	
	
	 
	if (navigator.userAgent.indexOf('Chrome') != -1) browser.application = 'Chrome';
	else if (navigator.vendor.indexOf('Apple') != -1) browser.application = 'Safari';
	else if (navigator.userAgent.indexOf('Firefox') != -1) browser.application = 'Firefox';
	else if (navigator.userAgent.indexOf('MSIE') != -1) browser.application = 'Internet Explorer';
	else if (window.opera.indexOf('Opera') != -1) browser.application = 'Opera';
	
	//Log("GetBrowserVersion 2");

	if (navigator.platform.indexOf('Win') != -1) browser.os = 'Windows';
	else if (navigator.platform.indexOf('Mac') != -1) browser.os = 'Mac';	
	else if (navigator.platform.indexOf('Linux') != -1) browser.os = 'Linux';
	else if (navigator.userAgent.indexOf('iPhone') != -1) browser.os = 'iPhone';
	
	//Log("GetBrowserVersion 3");

	
	if (browser.application == 'Chrome') { browser.versionString = navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome/')+7); if (browser.versionString.indexOf(' ') != -1) browser.versionString = browser.versionString.substring(0,browser.versionString.indexOf(' ')); }
	else if (browser.application == 'Safari')  { browser.versionString = navigator.userAgent.substring(navigator.userAgent.indexOf('Version/')+8); if (browser.versionString.indexOf(' ') != -1) browser.versionString = browser.versionString.substring(0,browser.versionString.indexOf(' ')); }
	else if (browser.application == 'Internet Explorer')  { browser.versionString = navigator.userAgent.substring(navigator.userAgent.indexOf('MSIE')+4); if (browser.versionString.indexOf(' ') != -1) browser.versionString = browser.versionString.substring(0,browser.versionString.indexOf(' ')); }
	else if (browser.application == 'Firefox')  { browser.versionString = navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox/')+8); if (browser.versionString.indexOf(' ') != -1) browser.versionString = browser.versionString.substring(0,browser.versionString.indexOf(' ')); }

	//Log("GetBrowserVersion 4");

	
	browser.version = parseFloat(browser.versionString);
	
	GetBrowserVersion.browser = browser;
	
	//Log("GetBrowserVersion 5");
	
	return browser;

}


function OnPageChange() {
	lastDocUrl = getApparentUrl();	// This is a global variable.
	//Log("Apparent Path name = " + getApparentUrlPathName());
	//Log("Apparent Url = " + getApparentUrl());
	//ReplaceUIRoundedImage(true);

	lookForPhotoUrl();
	AjaxUpdaterFunction();
	
	if (getApparentUrl().indexOf('/home.php')>-1) PreCacheChangedProfilePics();
	if ((getApparentUrl().indexOf('/album.php?')>-1) || (getApparentUrl().indexOf('/photo_search.php?')>-1)) PreCacheAlbumPics();
	if (getApparentUrl().indexOf('/photo.php?')>-1) PreCacheNextPhoto();
	
	setTimeout(ReplaceSilhouette, 1000);	
}

function getApparentUrl() {
	var url;
	

	
	if (window == null) throw("Error: In getApparentUrl(), window is null.");
	if (window.location == null) throw("Error: In getApparentUrl(), window.location is null.");
	if (window.location.hash == null) throw("Error: In getApparentUrl(), window.location.hash is null.");
	if (window.location.hash.length == null) throw("Error: In getApparentUrl(), window.location.hash.location is null.");
	
	if (window.location.hash.length > 0) {
		if (window.location.hash.substring(1).substring(0,2) == '!/') return window.location.protocol + '//' + location.host + window.location.hash.substring(2) + window.location.search;
		else return window.location.protocol + '//' + location.host + window.location.hash.substring(1) + window.location.search;
	}
	else return window.location.href + window.location.search;
}

function getApparentUrlPathName() {
	if (window.location.hash.length > 0) {
		if (window.location.hash.substring(1).substring(0,2) == '!/') return window.location.hash.substring(2) + window.location.search;
		else return window.location.hash.substring(1) + window.location.search;
	}
	else return window.location.pathname + window.location.search;
}

function lookInCacheThenGetColors(photoUrl, applyColors, doFade) {
	
	if (typeof photoUrl == 'undefined') return;  // bail-out
	
	if (typeof photoUrl != 'undefined') cacheType = UrlToCacheType(photoUrl);
	else cacheType = "";
	
	
	/*
	 if (typeof photoUrl == 'undefined') {  //no images found on page 
	 try{ApplyColorSchemeFromLastPage()}
	 catch(err){}
	 return; 
	 }
	 */
	
	var splitUrl = photoUrl.split("/");
	var fileName = splitUrl[splitUrl.length - 1];
	
	
	StartTimer("Retrieve From Cache");
	colorArray = RetrieveFromCache(fileName, cacheType);
	RecordTimer("Retrieve From Cache");
	
	//alert("colorArray = " + colorArray);
	
	
	try {
		
		
		if (colorArray != null) {
			Log("Cache Hit: photoUrl=" + photoUrl + ".");
			if (applyColors != false) {
				
				// Make sure an older color scheme doesn't get applied.  This can happen if the responses are returned out of order.
				// This is not perfect though.  A user can move forward in an album and then back quickly and the incorrect color scheme will be applied.
				window.document.body.setAttribute('responseNumber', GetQueryNumber());
				
				//Log("window.document.body.getAttribute('responseNumber') = " + window.document.body.getAttribute('responseNumber'));
				
				StartTimer("InsertCSS");
				if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', colorArray.join('*'));
				window.document.body.setAttribute('finalColorArray', colorArray.join('*'));
				
				
				
				try {
					//if (doFade == true)	fadeBetweenTwoColorSchemes(/*currentFadePercent*/ 0,/*fadeStep*/ 0.01,/*endingFadePercent*/ 1.0,/*delay*/ 5);  
					if (doFade == true)	fadeBetweenTwoColorSchemes(/*fadeStartTime*/ null,/*fadeDuration*/ 350);  
					else InsertCSS(colorArray, "");
				}
				catch(err) {
					InsertCSS(colorArray, "");
				}
				
				RecordTimer("InsertCSS");
			}
			
			StartTimer("preCache");
			var preCached = AttemptToPreCacheForNextPage();  // note the return that's a few lines below
			RecordTimer("preCache");
			
			GetColors("http://facebook.com", true, doFade);
			
			return;  //    <--- Note return.
		}
		else {
			Log("Cache MISS: photoUrl=" + photoUrl + ".");
			
			/*Applies color scheme from last viewed page until the new color scheme comes in. */
			try{
				// ApplyColorSchemeFromLastPage(true);  // if enabled, seems to always goto the color scheme from the last page before loading the current.
				StartTimer("preCache");
				AttemptToPreCacheForNextPage();
				RecordTimer("preCache");
			}
			catch(err) {}
		}
		
	}
	catch(err) { Log("Error: " + err.description); }
	
	//  alert('not cached');
	failedBlackAttempts = 0;
	GetColors(photoUrl, true, doFade);
	
}	

function InitialPageSetup() {
	
	lastDocUrl = getApparentUrl();
	
	AddScript();
	setTimeout(WatchForAJAXPageChanges,1000);	// run later so it reduces multiple server checks.
	
	try { window.onhashchange = function() { OnPageChange(); }; } catch(error) {}
	
	CheckForTemporaryStoredVariables();
	try { AddToApplicationsList(); } catch(error) {}
	
	EnableColorForAlbumPics();
	
	if (getApparentUrl().indexOf('/home.php')>-1) PreCacheChangedProfilePics();
	if ((getApparentUrl().indexOf('/album.php?')>-1) || (getApparentUrl().indexOf('/photo_search.php?')>-1)) PreCacheAlbumPics();
	// if ((getApparentUrl().indexOf('social_graph')>-1) && (getApparentUrl().indexOf('149827058392671')>-1)) AddInviteButton();
	if ((parent != self) && (getApparentUrlPathName().indexOf('/AutoColorizer?Color')==0) && (IsLoggedInToFB() == true) && (IsJustInstalled() == true)) DoFirstInstall();
	if ((parent == self) && (IsLoggedInToFB() == true) && (IsJustInstalled() == true)) AppendUserColorSetter();
	
	//	Log("(parent != self) = " + (parent != self));
	//	Log("(getApparentUrlPathName().indexOf('/AutoColorizer?Color')==0) = " + (getApparentUrlPathName().indexOf('/AutoColorizer?Color')==0));
	//	Log("(IsLoggedInToFB() == true) = " + (IsLoggedInToFB() == true));
	//	Log("(IsJustInstalled() == true) = " + (IsJustInstalled() == true));
	//	Log("getApparentUrlPathName() == " + getApparentUrlPathName());
	
}

function CacheTypeToCacheName(cacheType) {
	if (cacheType == "photoStream") return "cachedPhotoStreamColors";
	if (cacheType == "profilePic")  return "cachedPageColors";
	if (cacheType == "photoGroupEvent")  return "cachedGroupColors";
	if (cacheType == "photoVideoThumb")  return "cachedVideoColors";
	return "cachedOtherColors";	
}

function UrlToCacheType(url) {
	if (url == null) return "unknown";  
	if (url.indexOf('/object')>-1) return "photoGroupEvent";		// Image from group or event.
	if ((url.indexOf('://photos-')>-1) || (url.indexOf('://s-hphotos')>-1) || (url.indexOf('://sphotos.')>-1) || (url.indexOf('://fbcdn-photos-')>-1)) return "photoStream";		// Image from photo set.
	if ((url.indexOf('://profile.')>-1) || (url.indexOf('://fbcdn-profile-')>-1)) return "profilePic";		// Image from profile picture.
	if ((url.indexOf('://vthumb.')>-1) || (url.indexOf('://fbcdn-vthumb-')>-1)) return "photoVideoThumb";	// Image from thumbnail of  videos.
	return "unknown";
}

function RetrieveFromCache(fileName, cacheType) {
	//return RandomColorArray("tri fade");
	
	cacheName = CacheTypeToCacheName(cacheType);
	
	var splitFileName = fileName.split("/");
	var fileName = splitFileName[splitFileName.length - 1];
	
	//alert("Attempting to retreive from cacheName: " + cacheName);
	
	try { var cachedPageColors = GetItem(cacheName); }
	catch(err) { Log("Error: Can not read from cache.\n\nabout:config key was reset; Restart firefox."); }
	//var cachedPageColors = GetItem(cacheName);
	
	
	if (typeof cachedPageColors != 'undefined' && cachedPageColors) {
		
		var cachedPageColorsSplit = cachedPageColors.split(',');
		
		
		//alert("Num of Cached: " + cachedPageColorsSplit.length);
		
		var foundInCached = false;
		for (var i=0; i<cachedPageColorsSplit.length; i++) {
			var temp = cachedPageColorsSplit[i].split('-');
			if (fileName == temp[0]) {
				//Log("Found [" + fileName + "] in the cache.");
				
				var colorArray = temp[1].split('*');
				var foundInCached = true;
				
				//alert('Record #' + i + ': ' + fileName + ' : ' + temp[1]);
				
				//move found cached record to end of record set
				for (var x=i; x<cachedPageColorsSplit.length - 1; x++) {
					var holder = cachedPageColorsSplit[x];  
					cachedPageColorsSplit[x] = cachedPageColorsSplit[x+1];
					cachedPageColorsSplit[x+1] = holder;
					if (x > 1000) { Log('Auto-Colorizer Error: Endless Loop'); return null; }
				}
				StoreItem(cacheName,cachedPageColorsSplit.join(','));
				
				return colorArray;
			}
		}
	}
	
	//Log("Didn't find [" + fileName + "] in the cache.");
	
		
	return null;
}


function ClearCache() {
	StoreItem("cachedPhotoStreamColors","");
	StoreItem("cachedPageColors","");
	StoreItem("cachedGroupColors","");
	StoreItem("cachedVideoColors","");
}

function StoreItem(name, valueString) {
	if ((typeof GM_setValue != 'undefined') && (typeof GM_setValue.toString != 'undefined') && (GM_setValue.toString().toLowerCase().indexOf('not supported') == -1)) { GM_setValue(name, valueString); return 1; }
	if (typeof localStorage != 'undefined') { localStorage.setItem(name,valueString); return 1; }
	return 0;
}

function GetItem(name, defaultValue) {
	if ((typeof GM_getValue != 'undefined') && (typeof GM_getValue.toString != 'undefined') && (GM_getValue.toString().toLowerCase().indexOf('not supported') == -1)) { return GM_getValue(name, defaultValue); }
	if (typeof localStorage != 'undefined') { return localStorage.getItem(name) || defaultValue; }
	return defaultValue;
}

function DeleteItem(name) {
	/* untested */
	if ((typeof GM_deleteValue != 'undefined') && (typeof GM_deleteValue.toString != 'undefined') && (GM_deleteValue.toString().toLowerCase().indexOf('not supported') == -1)) { GM_deleteValue(name); return 1; }
	if (typeof localStorage != 'undefined') { localStorage.removeItem(name); return 1; }
	return 0;
}

function Log(valueString) {
	if (typeof GM_log != 'undefined') { GM_log(valueString); return 1; }
	if ((typeof console != 'undefined') && (typeof console.log != 'undefined')) { console.log(valueString); return 1; }
	return 0;
}

function ApplyColorSchemeFromLastPage(doFade) {
	var cachedPageColors = GetItem('cachedPageColors');
	//if (typeof cachedPageColors != 'undefined' && cachedPageColors) {
	if (cachedPageColors != null && cachedPageColors) {
		var cachedPageColorsSplit = cachedPageColors.split(',');
		var temp = cachedPageColorsSplit[cachedPageColorsSplit.length-1].split('-');
		try{
			var colorArray = temp[1].split('*');
			startingColorArray = colorArray;      
			
			//InsertCSS(colorArray, "");
			
			try {
				// The default here is a blue scheme to start the fade from.
				if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', "#00006F*#052A59*#002973*#253E5C*#3475C3*#637D9C*#B0B3C1*#C6CDF2*#F9FAFA*#FFFFFF");
				window.document.body.setAttribute('finalColorArray', colorArray.join('*'));
			}
			catch(err) { Log("Error: " + err.description); }
			
			try {
				//if (doFade == true)	fadeBetweenTwoColorSchemes(/*currentFadePercent*/ 0,/*fadeStep*/ 0.01,/*endingFadePercent*/ 1.0,/*delay*/ 5);  
				if (doFade == true)	fadeBetweenTwoColorSchemes(/*fadeStartTime*/ null,/*fadeDuration*/ 350);  
				else InsertCSS(colorArray, "");
			}
			catch(err) {
				InsertCSS(colorArray, "");
			}
			
			
		}
		catch(err) {}
	}
}

function CheckTextColor(domNode, parentBackgroundColor, parentForegroundColor, currentDepth) {
	// May be faster to not track all the bg colors in the stack.  When hit textNode, check if parent has a background, if so use it, else look at it's parent and so on.  Likely faster this way.
	
	if (currentDepth >= 30) return 0;
	var changedNodes = 0;
	var currentBackgroundColor;
	var currentForegroundColor;
	var previousStyle;
	var newClassName;
	var newStyleText = "";
	if (typeof domNode.style != 'undefined') {
		try{ currentBackgroundColor = document.defaultView.getComputedStyle(domNode, "").backgroundColor; } catch(err){}
		try{ currentForegroundColor = document.defaultView.getComputedStyle(domNode, "").color; } catch(err){}
	}
	
	//Log("typeof currentBackgroundColor=" + (typeof currentBackgroundColor));
	
	if (typeof currentBackgroundColor == 'undefined' || currentBackgroundColor == '' || currentBackgroundColor == 'transparent' || currentBackgroundColor == 'rgba(0, 0, 0, 0)') currentBackgroundColor = parentBackgroundColor;
	if (typeof currentForegroundColor == 'undefined' || currentForegroundColor == '' || currentForegroundColor == 'transparent' || currentForegroundColor == 'rgba(0, 0, 0, 0)') currentForegroundColor = parentForegroundColor;
	
	//Log("currentDepth=" + currentDepth + ", currentBackgroundColor=" + currentBackgroundColor + ", parentBackgroundColor=" + parentBackgroundColor + ", currentForegroundColor=" + currentForegroundColor + ", parentForegroundColor=" + parentForegroundColor + ", nodeType=" + domNode.nodeType );
	
	if (domNode.nodeType == 3 /*|| (domNode.type == "submit" && domNode.type == "comment")*/) { // A text node
		//Log("Before: currentDepth=" + currentDepth + ", currentBackgroundColor=" + currentBackgroundColor + ", currentForegroundColor=" + currentForegroundColor + ", nodeType=" + domNode.nodeType );
		if (IsRGB(currentForegroundColor)) currentForegroundColor = RGBToHex(currentForegroundColor);
		if (IsRGB(currentBackgroundColor)) currentBackgroundColor = RGBToHex(currentBackgroundColor);
		//Log("After: currentDepth=" + currentDepth + ", currentBackgroundColor=" + currentBackgroundColor + ", currentForegroundColor=" + currentForegroundColor + ", nodeType=" + domNode.nodeType );
		
		try {
			var foregroundColorNew = ForceContrastDirect(currentForegroundColor, currentBackgroundColor, 1.25);
			if (currentForegroundColor != foregroundColorNew) { 
				//Log("currentForegroundColor=" + currentForegroundColor + ", foregroundColorNew=" + foregroundColorNew);
				//domNode.parentNode.style.color = "#ff00ff"; //foregroundColorNew;
				//if (domNode.style) domNode.style.cssText += "; color: #FF00FF !important;";
				//else domNode.parentNode.style.cssText += "; color: #FFFF00 !important;";
				
				newClassName = "";
				
				if (domNode.parentNode.className.indexOf("tweak_contrast_") != -1) {
					var classNames = domNode.parentNode.className.split(" ");
					for(var i in classNames) {
						if (classNames[i].indexOf("tweak_contrast_") == 0) {
							newClassName = classNames[i];
							break;
						}
					}
				}
				
				if (newClassName == "") {
					newClassName = "tweak_contrast_" + Math.round(Math.random()*4294967296);
					domNode.parentNode.className += " " + newClassName;
				}
				
				//Log("domNode.parentNode.className=" + domNode.parentNode.className);
				newStyleText += "." + newClassName + " {color: " + foregroundColorNew + " !important;} "
				
				changedNodes++;
			}
		}
		catch(err) { Log("Error: " + err.description); }
		
	}
	
	if (domNode.hasChildNodes) {
		//Log("len = " + domNode.childNodes.length);
		for (var i in domNode.childNodes) {
			//if (currentDepth > 1) Log("currentDepth=" + currentDepth + ", ChildNode");
			
			newStyleText += CheckTextColor(domNode.childNodes[i], currentBackgroundColor, currentForegroundColor, currentDepth + 1);
		}
	}
	
	return newStyleText;
}

function AddInviteButton() {
	setTimeout(SelectAll, 5000);
}

function SelectAll() {
	elms=document.getElementById('friends').getElementsByTagName('li');
	for(var fid in elms){if(typeof elms[fid] ==='object'){fs.click(elms[fid]);}}
}


// The 'isScrambled' part makes the assumption that more than just a textnode will change; it assumes the parent node of a text node gets replaced when the
// textnode is replaced.  The 'isScrambled' part makes the text not change multiple times.
// Should get the window tite also.
function ScrambleText(domNode, currentDepth) {
	lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
	upper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	
	if (currentDepth >= 30) return 0;
	if (domNode.nodeName == "SCRIPT") return 0;
	
	
	if (domNode.nodeType == 3 && domNode.parentNode && domNode.parentNode.getAttribute('isScrambled') != 'true' ) { /* A text node */
		var newStr = "";
		var str = domNode.nodeValue;
		var rand;
		var chr;
		
		for (i in str) {
			chr = str.charAt(i);
			if (chr >= 'A' && chr <= 'Z') newStr += upper[Math.floor(Math.random()*26)];
			else if (chr == " ") newStr += " ";
			else {
				switch(chr)
				{
					case '@':
					case ' ':
					case '':
					case '“':
					case '”':
					case '\n':
					case '\t':
					case '.':
					case ',':
					case '?':
					case '!':
					case '-':
					case '|':
					case '(':
					case ')':
					case '/':
						newStr += chr;
						break;
					case null:
						break;
					default:
						newStr += lower[Math.floor(Math.random()*26)];
				}	
			}
			
		}
		
		domNode.nodeValue = newStr;
	}
	
	if (domNode.hasChildNodes) {
		for (var i in domNode.childNodes) ScrambleText(domNode.childNodes[i], currentDepth + 1);
	}
	
	if (domNode.parentNode) domNode.parentNode.setAttribute('isScrambled','true');
	
}


function InsertCSSOld(colorArray) {
	//ViewPallet(colorArray);
	
	StartTimer("Set Style Old"); 
	
	//alert("typeof " + typeof(colorarray));
	
	GM_addStyle("div.profilebox { background:" + colorArray[9] + "; }");
	GM_addStyle(".profileheader h2 {color:" + colorArray[0] + ";}");
	GM_addStyle("#header { background:" + colorArray[5] + "; }"); 
	GM_addStyle("div.profileheader { background:" + colorArray[6] + "; border-top: solid 1px " + colorArray[4] + "; }");
	GM_addStyle("#content { background:" + colorArray[8] + "; }");
	//GM_addStyle("body.profile { background:" + colorArray[8] + "; }");  // enable to reduce some background color
	GM_addStyle("body { background:" + colorArray[7] + "; }");
	GM_addStyle(".info { color: " + colorArray[1] + "; background: " + colorArray[10] + "; }");
	GM_addStyle("h4 { color:" + colorArray[0] + "; }");
	GM_addStyle("A:link { color:" + colorArray[1] + "; }");
	GM_addStyle("A:hover { color:" + colorArray[3] + "; }");
	GM_addStyle("A:visited { color:" + colorArray[2] + "; }");
	GM_addStyle("input.inputtext { border:1px solid " + colorArray[6] + "; background:" + colorArray[10] + "; color:" + colorArray[5] + "; }");
	GM_addStyle(".wallpost .info .header { color: " + colorArray[1] + "; background: " + colorArray[7] + "; border-top: solid 1px " + colorArray[3] + "; border-bottom: dashed 1px " + colorArray[7] + "; }");
	
	//search specific: also wall post textarea, but the text color doesn't work.
	GM_addStyle("textarea { border:1px solid " + colorArray[6] + "; color: " + colorArray[1] + "; background:" + colorArray[9] + "; }"); 
	
	//photo specific
	GM_addStyle("div.photonav { background:" + colorArray[8] + "; }");
	GM_addStyle("#comment { background:" + colorArray[4] + "; }");
	
    /* START changes due to the addition of "Mini-Feed" */
	// The text color of dates in the mini-feed.
	GM_addStyle(".minifeed .date_divider  { color:" + colorArray[6] + "; border-bottom: solid 1px " + MixTwoHexColors(colorArray[6],colorArray[4],.5) + ";}");
	
	GM_addStyle(".inside_the_box { background:" + colorArray[9] + "; }");
	GM_addStyle(".box_head { background:" + colorArray[6] + "; }");
	GM_addStyle(".when_open .flex_header, .flex_open .box_head { border-top: solid 1px " + colorArray[3] + "; " + "background-image: url('https://mywebspace.wisc.edu/ormont/web/facebook/flex_arrow_open.png')" + "; }");
	
	GM_addStyle(".flex_shut .box_head { background-image: url('https://mywebspace.wisc.edu/ormont/web/facebook/flex_arrow_close.png'); }");
	
	GM_addStyle(".box_subhead { background:" + MixTwoHexColors(colorArray[6],colorArray[9],.5) + "; border-top: solid 1px " + MixTwoHexColors(colorArray[6],colorArray[9],.25) + ";" + "}");
	GM_addStyle(".box_head h2  { color:" + colorArray[3] + "; }");
    /* END changes due to the addition of "Mini-Feed" */
	
	
	//global group specific
	GM_addStyle(".profile .withedit { background: " + colorArray[7] + "; color: " + colorArray[3] + "; border-top: solid 1px " + colorArray[4] + "; }");
	
	
	//The top facebook bar
	//GM_addStyle("#navigator { background: " + IncreaseSaturation(colorArray[5],100) + "; background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/pageheaderbg-lighten.png); }");
	GM_addStyle("#navigator { background: " + IncreaseSaturation(colorArray[5],100) + "; background-image: ; }");
	
	GM_addStyle("#sidebar a.go_home { background: " + IncreaseSaturation(colorArray[5],100) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/facebook_logo_trans.png) no-repeat top left; }");
	
	GM_addStyle("#sidebar a.go_home:hover {background: " + IncreaseSaturation(colorArray[5],100) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/facebook_logo_trans.png) no-repeat bottom left; }");
	
	//alert(colorArray[0] + ", " + colorArray[9]);
	
	RecordTimer("Set Style Old");	
}

function InsertCSS(colorArray, tweaks) {
	
	//InsertCSSOld(colorArray);
	
	//if (tweaks != "") Log("tweaks=" + tweaks);
	
	var head = document.getElementsByTagName("head")[0];
	var styleNode = document.createElement("style");
	
	
	//var styleText = "body{background-color:blue;}";
	
	var styleText =	" \
	a{cursor:pointer;color:" + ForceContrast(colorArray[6],MixTwoHexColors(colorArray[8], colorArray[9], 0.5) ,.15) + ";} \
	div.profilebox { background:" + colorArray[9] + "; }; \
	.profileheader h2 {color:" + colorArray[0] + ";}; \
	#header { background:" + colorArray[5] + "; }\n \
	div.profileheader { background:" + colorArray[6] + "; border-top: solid 1px " + colorArray[4] + "; }\n \
	#XXXcontent { background:" + colorArray[8] + "; } \
	/* body.profile { background:" + colorArray[8] + "; }  enable to reduce some background color */ \n \
	body { background-color:" + colorArray[7] + "; }\
	.info { color: " + colorArray[1] + "; background: " + colorArray[10] + "; }\
	h4 { color:" + colorArray[0] + "; }\
	A:link { color:" + colorArray[1] + "; }\
	A:hover { color:" + colorArray[3] + "; }\
	A:visited { color:" + colorArray[2] + "; }  \
	input.inputtext { background:" + colorArray[10] + "; color:" + colorArray[5] + "; } \
	.uiSearchInput { border: 1px solid " + colorArray[7] + "; border-top-color: " + colorArray[7] + "; } \
	#navSearch .uiTypeahead, #navSearch .uiTypeahead .wrap {border-color: " + colorArray[7] + ";} \
	.wallpost .info .header { color: " + colorArray[1] + "; background: " + colorArray[7] + "; border-top: solid 1px " + colorArray[3] + "; border-bottom: dashed 1px " + colorArray[7] + "; } \
	.profileTable .label { color: " + colorArray[3] + "; } \
	\
	/* search specific: also wall post textarea, but the text color doesn't work. */ \
	textarea { border:1px solid " + ForceContrast(colorArray[6], colorArray[8], 0.05) + "; color: " + ForceContrast(colorArray[1], colorArray[8], 0.15) + "; background:" + colorArray[8] + "; }  \
	.DOMControl_placeholder{color:" + ForceContrast(colorArray[6], colorArray[8], 0.15) + "} \
	\
	/* photo specific */ \
	div.photonav { background:" + colorArray[8] + "; }\
	#comment { background:" + colorArray[9] + "; }\
	#photoinalbum { background:" + MixTwoHexColors(colorArray[4], colorArray[6], 0.6) + "; border-left:solid 1px " + MixTwoHexColors(colorArray[3], colorArray[6], 0.5) + "; color: " + ForceContrast(colorArray[4], MixTwoHexColors(colorArray[4], colorArray[6], 0.6), 0.15) + "; }\
	#phototags em{color:" + ForceContrast(colorArray[3], colorArray[4], 0.12) + ";}\
	#phototags a{color:" + ForceContrast(colorArray[5], colorArray[4], 0.12) + ";}\
	#phototags{color:" + ForceContrast(colorArray[2], colorArray[4], 0.15) + ";}\
	.photocaption_text{color:" + ForceContrast(colorArray[2], colorArray[4], 0.15) + ";}\
	.photo_metadata{ background:" + colorArray[4] + "; }\
	.UIActionLinks_bottom, .UIActionLinks_left, .UIActionLinks_right {color: " + ForceContrast(colorArray[3], colorArray[4], 0.15) + ";} \
	#photoborder{background:" + MixTwoHexColors(colorArray[4], colorArray[6], 0.5) + ";border-bottom:1px solid " + colorArray[6] + ";border-top:1px solid " + colorArray[6] + ";}\
	#photoactions a{color:" + ForceContrast(colorArray[3], colorArray[4], 0.15) + ";border-bottom:1px solid " + MixTwoHexColors(colorArray[2], colorArray[7], 0.5) +"}\
	button.as_link{color:" + ForceContrast(colorArray[2], colorArray[4], 0.15) + ";}\
	.comment_link{color:" + ForceContrast(colorArray[2], colorArray[4], 0.15) + " !important;}\
	.ego_page .UIStandardFrame_Content {background-color: " + HexColorToRGBA(colorArray[7], 0.5) + ";} \
	\
	/* START changes due to the addition of Mini-Feed */ \
	/* The text color of dates in the mini-feed. */ \
	.minifeed .date_divider  { color:" +  ForceContrast(colorArray[6], colorArray[9], 0.15) + "; border-bottom: solid 1px " + MixTwoHexColors(colorArray[6],colorArray[4],.5) + ";} \
	\
	.inside_the_box { background:" + colorArray[9] + "; } \
	.box_head { background:" + colorArray[6] + "; } \
	.when_open .flex_header, .flex_open .box_head { border-top: solid 1px " + colorArray[3] + "; " + "background-image: url('https://mywebspace.wisc.edu/ormont/web/facebook/flex_arrow_open.png')" + "; } \
	\
	.flex_shut .box_head { background-image: url('https://mywebspace.wisc.edu/ormont/web/facebook/flex_arrow_close.png'); } \
	\
	.box_subhead { background:" + MixTwoHexColors(colorArray[7], colorArray[9], 0.5) + "; border-top: solid 1px " + MixTwoHexColors(colorArray[6], colorArray[9], 0.25) + ";" + "} \
	.box_head h2  { color:" + ForceContrast(colorArray[3], colorArray[6], 0.15) + "; } \
	/* END changes due to the addition of Mini-Feed */ \
	\
	\
	/* global group specific */  \
	.profile .header {  background: " + colorArray[6] + "; border-top: solid 1px " + colorArray[5] + "; } /* these colors may need to/should be changed */ \
	.profile .header h2 {  color: " + ForceContrast(colorArray[3], colorArray[6], 0.12) + "; } \
	\
	.profile .withedit { background: " + colorArray[7] + "; color: " + colorArray[3] + "; border-top: solid 1px " + colorArray[4] + "; } \
	\
	\
	#navigator { background: " + IncreaseSaturation(colorArray[5],100) + "; background-image: ; } \
	\
	#sidebar a.go_home { background: " + IncreaseSaturation(colorArray[5],100) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/facebook_logo_trans.png) no-repeat top left ! important ; } \
	\
	#sidebar a.go_home:hover {background: " + IncreaseSaturation(colorArray[5],100) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/facebook_logo_trans.png) no-repeat bottom left ! important ;}\
	\
	/* App request - request for premission */ \
	\
	div.uiInterstitialWithStripes { background-color:  " + colorArray[9] + "; } \
	.UIStandardFrame_Content { background-color:  " + colorArray[9] + "; } \
	\
	/* Non-friend profile preview specific */ \
	.public_listing .info_column {background-color: " + colorArray[9] + ";} \
	.public_listing h1.name {background-color: " + colorArray[8] + "} \
	"; 
	
	
	// if (typeof GetItem('clearChatBar') != 'undefined' && GetItem('clearChatBar')) var clearChatBar = GetItem('clearChatBar');
	if (GetItem('clearChatBar') != null && GetItem('clearChatBar')) var clearChatBar = GetItem('clearChatBar');
	else var clearChatBar = "colorgel";
	
	if (clearChatBar == "") clearChatBar = "colorgel";
	
	/* chat bar specific */ 
	
	
	if (clearChatBar == "clear") {
		styleText += "#presence_bar{background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
		#presence_popin_bar{background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;}  \
		#presence.full #presence_ui{border-left:1px solid " + colorArray[3] + "; background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
		\
		#presence_ui{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;! important;} \
		#presence .presence_bar_button{color:" + ForceContrast(colorArray[2], colorArray[6], 0.12) + ";border-left:1px solid " + colorArray[3] + ";border-right:1px solid " + colorArray[6] + ";} \
		\
		#presence_error_bar{border-right:1px solid " + colorArray[3] + ";background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);}  \
		\
		.fbDock, .fbDockWrapperLeft .lNubContainer, .fbDockWrapperRight .rNubContainer { background-color: rgba(244, 244, 244, 0.75); background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);} \
		";
	}
	else if (clearChatBar == "colorgel") {  /* HexColorToRGBA(colorArray[6],0.5) */
		styleText += "#presence_bar{background: " + HexColorToRGBA(colorArray[6],0.5) + "  repeat-x top left;} \
		#presence_popin_bar{background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;}  \
		#presence.full #presence_ui{border-left:1px solid " + colorArray[3] + "; background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
		\
		#presence_ui{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;! important;} \
		#presence .presence_bar_button{color:" + ForceContrast(colorArray[2], colorArray[6], 0.12) + ";border-left:1px solid " + colorArray[3] + ";border-right:1px solid " + colorArray[6] + ";} \
		\
		#presence_error_bar{border-right:1px solid " + colorArray[3] + ";background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);}  \
		\
		.fbDock, .fbDockWrapperLeft .lNubContainer, .fbDockWrapperRight .rNubContainer { background: " + HexColorToRGBA(colorArray[8], 0.75) + ";} \
		";
	}
	else {
		styleText += "#presence_bar{background: " + colorArray[6] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
		#presence #chat_status_control_tab{border-right:1px solid " + colorArray[3] + ";} \
		#presence_popin_bar{background: " + colorArray[6] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;}  \
		#presence.full #presence_ui{border-left:1px solid " + colorArray[3] + "; background: " + colorArray[6] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
		\
		#presence .presence_bar_button{color:" + ForceContrast(colorArray[2], colorArray[6], 0.12) + ";border-left:1px solid " + colorArray[3] + ";border-right:1px solid " + colorArray[6] + ";} \
		\
		#presence_error_bar{border-right:1px solid " + colorArray[3] + ";background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);}  \
		\
		";
	}
	
	styleText += "#presence_bar .presence_menu_opts h2{background-color:" + colorArray[3] + ";color:#fff;border:1px solid " + ForceContrast(MixTwoHexColors(colorArray[2], colorArray[3], 0.5),colorArray[3], 0.15) + ";border-bottom:1px solid " + colorArray[3] + ";} \
	#presence_bar .presence_menu_opts h2 .presence_minimize{background-color:" + ForceContrast(MixTwoHexColors(colorArray[3], colorArray[8], 0.5), colorArray[3], 0.15) + ";} \
	#presence.fbx_bar .presence_section, #presence.fbx_bar #chat .tab_handle, #presence.fbx_bar #presence_gk_tab, #presence.fbx_bar #presence_translations_tab{background:" + HexColorToRGBA(colorArray[5],0.5) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/apfsevhg_trans.png) 0 0 repeat-x;border:1px solid " + colorArray[3] + ";border-bottom:0;border-right-width:0;font-weight:bold;margin-top:0} \
	#presence .presence_bar_button .inner_button{border-top:1px solid transparent;} \
	" ; 
	
	
	/* New profile layout specific */  /* todo: colorArray[5] is under used. */
	styleText += "#fb_menubar{background: " + colorArray[2] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/fb_menubar_gray-trans2.png) } \
	#fb_menubar #fb_menubar_logo a span{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/fb_menubar_logo_gray-trans.png) } \
	.fb95_preview_bar{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/fb95_preview_bar-gray_trans.png) repeat-x 0px 0px;width:auto;margin:0px;height:24px;padding:0px 10px 0px 10px;} \
	#menubar_container{background:" + MixTwoHexColors(colorArray[2],colorArray[4],.5) + ";} \
	\
	/*.minifeedwall .story_body{background:" + colorArray[9] + "; }*/ \
	.minifeedwall .story{background:" + colorArray[9] + "; } \
	.minifeedwall .border .story_body, .minifeedwall .extra_top_border{border-top:1px solid " + ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5), colorArray[8], 0.20) + ";} \
	.minifeedwall .border .story_body .from_friend_story_content_container{border-top:1px solid " + ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5), colorArray[8], 0.20) + ";padding-top:12px;} \
	.minifeedwall .date_divider_label{background:" + colorArray[8] + " ;display:block;float:left;margin-top:-8px;min-width:50px;padding:2px 7px 0 0;} \
	.minifeedwall .date_divider{color:" +  ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5) , colorArray[8], 0.20) + ";font-weight:bold;font-size:9px;border-bottom:solid 1px " + ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5) , colorArray[8], 0.20) + ";margin:2px 0px 10px;padding:2px 7px 0px 0px;} \
	.minifeedwall .story .story_time{color:" + MixTwoHexColors(colorArray[4], colorArray[8], 0.5) + "} \
	#profile_top_bar{background:" + colorArray[4] + ";} \
	#profile_name{color:" + ForceContrast(colorArray[3], colorArray[4], 0.20) + "} \
	\
	#feedwall_with_composer{background:" + colorArray[8] + ";} \
	#left_column {background:" + colorArray[8] + ";} \
	\
	.profile .profile_color_bar{background:" + MixTwoHexColors(colorArray[2],colorArray[4],.5) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/fb95_preview_bar-gray_trans.png) repeat-x bottom left;} \
	\
	.commentable_item .wallpost{background:" + MixTwoHexColors(colorArray[7], colorArray[9], 0.5) + ";border-bottom:1px solid " + colorArray[7] + ";clear:left;float:none;overflow:hidden;margin-bottom:2px;padding:6px 4px 6px 6px;} \
	.commentable_item .comment_box{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/box_bg-trans.png) no-repeat left 1px;clear:both;font-size:11px;padding:7px 0 0;overflow:hidden;} \
	\
	/* .profile .right_column_container{background:" + colorArray[9] + ";} */ \
	/* .profile_two_columns .right_column{background:" + "#FF0000" + ";} */ \
	.profile .right_column{background:" + colorArray[8] + ";} \
	\
	.profile dl.info dt{background:" + MixTwoHexColors(colorArray[8],colorArray[6],0.35) + ";color:" + colorArray[2] + ";float:left;clear:left;} \
	\
	.profile .top_bar ul.tabs li{background: " + MixTwoHexColors(colorArray[8],colorArray[4],0.5) + ";} \
	.profile .top_bar ul.tabs li a:hover.tab_link{background-color: " + MixTwoHexColors(colorArray[8],colorArray[4],0.75) + ";border-color:" + MixTwoHexColors(colorArray[4],"#000000",0.3) + ";color:#fff;text-decoration:none;} \
	.profile .top_bar ul.tabs li a.tab_link{ border-color:" + ForceContrast(MixTwoHexColors(MixTwoHexColors(colorArray[8],colorArray[4],0.5), "#FFFFFF", 0.25),MixTwoHexColors(colorArray[8],colorArray[4],0.5),0.10) + ";} \
	.profile .top_bar ul.tabs li a.tab_link{ color: " + ForceContrast(colorArray[3], MixTwoHexColors(colorArray[8],colorArray[4],0.5), 0.15) + ";} \
	#pageNav a:hover, #pageNav a:focus, #pageNav a:active { background-color: " + MixTwoHexColors(colorArray[8],colorArray[4],0.75) + "; color: " + ForceContrast("#FFFFFF", MixTwoHexColors(colorArray[8],colorArray[4],0.75), 0.15) + "; } \
	#pageNav a { color: " + ForceContrast("#FFFFFF", colorArray[5], 0.15) + "; } \
	.home_main_item{background:" + MixTwoHexColors(colorArray[5],"#FFFFFF",0.5) + ";} \
	.feed_item{background-color:" + MixTwoHexColors(colorArray[5],"#FFFFFF",0.75) + ";} \
	\
	#navAccount ul a, #navAccount ul .logoutButton input { color: " + ForceContrast(colorArray[4], "#FFFFFF", 0.15) + "; } \
	#navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active, #navAccount .logoutButton:hover input, #navAccount .logoutButton input:active, #navAccount .logoutButton input:focus {background: " + colorArray[4] + "; border-bottom: 1px solid " + MixTwoHexColors(colorArray[8],colorArray[4],0.75) + "; border-top: 1px solid " + MixTwoHexColors(colorArray[8],colorArray[4],0.75) + "; color: " + ForceContrast("#FFFFFF", colorArray[4], 0.15) + "; } \
	#navAccount ul{border:1px solid " + MixTwoHexColors(colorArray[4], colorArray[2], 0.50) + ";border-bottom:2px solid " + colorArray[4] + ";} \
	#navAccount.openToggler, .no_js #navAccount:hover { border: solid " + MixTwoHexColors(colorArray[4], colorArray[2], 0.50) + "; } \
	\
	#feedwall_with_composer .pager_next{background:" + MixTwoHexColors(colorArray[8], colorArray[6], 0.2) + ";margin-top:8px;border-top:1px solid #D8DFEA;padding:3px 7px 4px 0;} \
	\
	#pagefooter{background:" + MixTwoHexColors(colorArray[7],colorArray[9],0.25) + "; border-top:solid 1px " + MixTwoHexColors(colorArray[3],colorArray[7],0.25) + ";} \
	#pagefooter .copyright{color:" + ForceContrast(colorArray[3], MixTwoHexColors(colorArray[7],colorArray[9],0.25), 0.20) + ";} \
	\
	.profile .top_bar .mobile_status{color:" + ForceContrast(colorArray[3], colorArray[4], 0.15) + ";} \
	.profile .top_bar .mobile_status a{color:" + ForceContrast(colorArray[5], colorArray[4], 0.15) + ";}  \
	.profile .top_bar .status_source{color:" + ForceContrast("#999999", colorArray[4], 0.15) + ";} \
	.profile .top_bar .status_source a{color:" + ForceContrast(colorArray[5], colorArray[4], 0.15) + "} \
	.profile .top_bar .mobile_status .profile_empty_status a{color:" + ForceContrast(colorArray[5], colorArray[4], 0.15) + "} \
	.profile .top_bar .mobile_status small{color:" + ForceContrast(colorArray[6], colorArray[4], 0.15) + ";} \
	.profile .top_bar .mobile_status small a{color:" + ForceContrast(colorArray[5], colorArray[4], 0.15) + "}	\
	.profile .left_column .mobile_status small{color:" + ForceContrast("#999999", colorArray[4], 0.15) + ";} /* colorArray[4] wrong for the left column? */ \
	.profile .left_column .mobile_status #status_text{color:" + ForceContrast("#000000", colorArray[4], 0.15) + "} /* colorArray[4] wrong for the left column? */ \
	\
	.ego_column{background:" + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	.ego_column a {color:" + ForceContrast(colorArray[2],MixTwoHexColors(colorArray[7],colorArray[8],0.25),0.12) + ";} \
	.uiHeaderTopAndBottomBorder { border-bottom: 1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.5) + "; border-top: 1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.3) + ";} \
	.uiHeaderTopAndBottomBorder { background-color: " + MixTwoHexColors(MixTwoHexColors(colorArray[6],colorArray[8],0.50),colorArray[7],0.5) + "; color: " + ForceContrast(colorArray[2], MixTwoHexColors(MixTwoHexColors(colorArray[6],colorArray[8],0.50),colorArray[7],0.5), 0.15) + " !important;} \
	div.fbEmuEgoUnit{border-top:1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.7) + ";} \
	#adcolumn_advertise{background:" + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	#adcolumn_more_ads{background:" + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	#sidebar_ads .adcolumn{border-left:solid " + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	.admarket_ad{background-color:" + MixTwoHexColors(colorArray[7],colorArray[8],0.75) + ";border:1px solid #ccc;} \
	.sponsors{background-color:" + MixTwoHexColors(colorArray[7],colorArray[8],0.75) + ";} \
	.social_ad_advert h2{color:" + ForceContrast(MixTwoHexColors(colorArray[5],MixTwoHexColors(colorArray[7],colorArray[8],0.75),0.25), MixTwoHexColors(colorArray[7],colorArray[8],0.75), 0.15)  + ";} \
	/*.ad_story .social_ad_advert{background-color:" + MixTwoHexColors(colorArray[7],colorArray[8],0.75) + ";} */ \
	.admarket_fluff_ad{background:" + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	.admarket_fluff_ad{border-top:1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.5) + ";} \
	#sidebar_ads .UIEMUASFrame, #sidebar_ads .UIEmuASIFrame{border-top:1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.5) + "}\
	#sidebar_ads .admarket_ad{border-top:1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.5) + "}\
	#sidebar_ads .adcolumn_wrapper{border-left:1px solid " + MixTwoHexColors(colorArray[5],colorArray[8],0.5) + "}\
	.fbEmuEgo .action {color: " + ForceContrast(MixTwoHexColors(colorArray[5],colorArray[3],0.5), MixTwoHexColors(colorArray[7],colorArray[8],0.25), 0.10) + "} \
	.fbEmu .adInfo a.identity {color: " + ForceContrast(MixTwoHexColors(colorArray[5],colorArray[3],0.7), MixTwoHexColors(colorArray[7],colorArray[8],0.25), 0.10) + ";}\
	.fbEmuEgo .action .fbEmuContext .fbEmuLink {color: " + ForceContrast(MixTwoHexColors(colorArray[5],colorArray[3],0.2), MixTwoHexColors(colorArray[7],colorArray[8],0.25), 0.10) + ";} \
	\
	.XXXXXstory_content{background:#FF0000;} \
	.XXXXXstory_body{background:#FF0000;} \
	.XXXXXsize_2{background:#FF0000;} \
	.XXXXXfrom_friend_story{background:#FF0000;} \
	.XXXXXwall_story{background:#FF0000;} \
	.XXXXXstory_content{background:#FF0000;} \
	.XXXXXstory_media{background:#FF0000;} \
	.XXXXXtag_story_box{background:#FF0000;}  \
	\
	.minifeedwall .from_friend_story .from_friend{background:" + colorArray[9] + " url(/images/comments/quote_nub_blue.gif) no-repeat 52px 8px;} \
	.minifeedwall .from_friend_story .story_content{border-bottom:1px solid " + MixTwoHexColors(colorArray[8],colorArray[9],0.75) + ";} \
	.minifeedwall .from_friend_story .story_content{background:" + MixTwoHexColors(colorArray[8],colorArray[9],0.75) + ";} \
	.app_actor_image { border-left: solid 2px " + colorArray[7] + " ;} \
	.profile .box h3.box_header{background:" + colorArray[6] + ";border-top:1px solid "+ colorArray[2] + ";} \
	.profile .box_column{border-top:1px solid " + colorArray[5] + ";border-right:0px solid #d8dfea;} \
	.profile .box {border-top: 1px solid " + MixTwoHexColors(colorArray[6],colorArray[8],0.5) + ";} \
	\
	#profile_composer .composer_tabs ul li.selected .composer_tab_arrow{background:transparent url('https://mywebspace.wisc.edu/ormont/web/facebook/composer_tab_selected_arrow-trans.png') no-repeat bottom center;display:block;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded{background:transparent url('https://mywebspace.wisc.edu/ormont/web/facebook/composer_tab_selected-trans.png') left top no-repeat;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded_tr{background-position:top right;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded_bl{background-position:bottom left;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded_br{background-position:bottom right;} \
	\
	td.pop_content h2.dialog_title{background:" + colorArray[2] + ";border:1px solid #3b5998;color:white;font-size:14px;font-weight:bold;margin:0px;} \
	\
	.HomeTabs .HomeTabs_tab a{padding:5px 9px;margin:4px 1px 0px;background-color:" + colorArray[9] + ";} \
	.HomeTabs .HomeTabs_tab a:hover{background-color:" + colorArray[2] + ";border-bottom:1px solid #435f9c;} \
	.HomeTabs .Tabset_selected a, \
	.HomeTabs .Tabset_selected a:hover{background-color:#fff;color:#000;border:1px solid #d8dfea;border-bottom:1px solid #fff;padding:4px 9px;font-size:13px;margin:2px 1px -1px 0;height:15px;position:relative;} \
	#newsfeed_tabs_wrapper{background:" +  MixTwoHexColors(colorArray[7], colorArray[9], 0.5) + ";} \
	.home_main_tabs #newsfeed_tabs_wrapper .newsfeed_plus a{background:" + colorArray[9] + " url(/images/white_dropdown_closed.gif) 8px 9px no-repeat;margin:4px 1px 0 1px;} \
	.home_main_tabs #newsfeed_tabs_wrapper .newsfeed_plus a:hover, \
	.home_main_tabs #newsfeed_tabs_wrapper .HomeFeed_selected a{background:" + colorArray[2] + " url(/images/white_dropdown_open.gif) 8px 9px no-repeat;}	 \
	\
	.one_liner .header_title_wrapper a{font-weight:normal;color:" + colorArray[4] + ";} \
	.bumper{color:" + colorArray[8] + ";background:" + colorArray[8] + ";} \
	.commentable_item .show_all_link{background:" + MixTwoHexColors(colorArray[8], colorArray[9], 0.25) + ";border-bottom:1px solid " + colorArray[7] + ";} \
	.commentable_item .wallpost{background:" + MixTwoHexColors(colorArray[8], colorArray[9], 0.5) + ";border-bottom:1px solid " + colorArray[7] + ";} \
	\
	div.profile_visibility_text{color:" + ForceContrast(colorArray[4], colorArray[6], 0.15) + ";}\
	\
	\
	/* Friends Page Specific */ \
	.fp.my_friends #content{background:" + colorArray[7] + ";} \
	.fp.other_friends #content{background:" + colorArray[7] + ";} \
	#fpgc{width:100%;border:1px solid transparent;background:" + colorArray[7] + ";}   /* Purposefully changeing from color border to transparent */ \
	#friends_left_cell{border-right:1px solid " + colorArray[7] + ";} \
	.fmp{background:" + colorArray[5] + ";} \
	.fmp .fsummary{background:" + MixTwoHexColors(colorArray[6],colorArray[9],0.5) + ";} \
	.fmp .footer_bar{background:" + MixTwoHexColors(colorArray[6],colorArray[9],0.5) + ";} \
	.ffriends{background:" + colorArray[9] + ";} \
	.ffriend{border-bottom:solid 1px " + colorArray[5] + ";} \
	";
	
	/* New homepage layout specific */  /* todo: colorArray[5] is under used. */
	styleText += " \
	.UIRoundedImage{background-color:" + ForceContrast(MixTwoHexColors(colorArray[6],colorArray[9],0.5),"#FFFFFF",0.05) + ";}  /* All rounded images, mostly for the silhouettes. */  \
	\
	/* Left Column */ \
	#xxxhome_filter_list{background:" + MixTwoHexColors(colorArray[9], colorArray[8],0.5) + ";} \
	/* .UIFilterList_List{background:" + MixTwoHexColors(colorArray[8], colorArray[7],0.5) + ";} */ \
	.UIMutableFilterList_Toggle{border-top:1px solid " + colorArray[5] + ";color:" + colorArray[3] + ";} \
	/* .UIMutableFilterList_Toggle{background:" + MixTwoHexColors(colorArray[8], colorArray[7],0.5) + ";} */ \
	.UIFilterList_Item a{border-bottom:1px solid " + colorArray[5] + ";color:#333333;} \
	.UIFilterList_Item a{background-color:" + MixTwoHexColors(colorArray[9], colorArray[8],0.5) + ";} \
	.UIFilterList_Item a:hover{background-color:" + MixTwoHexColors(colorArray[8], colorArray[6],0.5) + ";} \
	.UIFilterList_Selected a{color:" + ForceContrast(MixTwoHexColors(colorArray[8], colorArray[9],0.5),colorArray[4],0.20) + ";} \
	.UIFilterList_Selected a{background-color:transparent;} \
	.UIFilterList_Selected{background:" + colorArray[4] + ";} \
	.UIFilterList_Selected .UIFilterList_ItemRight{background:" + colorArray[4] + ";} \
	.XXXUIFilterList_Selected{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/UIFilterList_Selected_ltr-trans.png) no-repeat top left;} \
	.XXXUIFilterList_Selected .UIFilterList_ItemRight{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/UIFilterList_Selected_ltr-trans.png)  bottom left no-repeat;} \
	.UIFilterList_FirstItem{border-top:1px solid " + colorArray[4] + ";} \
	\
	/* Middle Column */ \
	#home_stream{background:" + MixTwoHexColors(colorArray[8], colorArray[7],0.5) + ";} \
	.UIIntentionalStory{border-top:1px solid " + colorArray[5] + "; background-color:" + colorArray[9] + ";} \
	.profileInfoTable th.label{color: " + ForceContrast(MixTwoHexColors(colorArray[7], colorArray[8], 0.5), colorArray[8], 0.15) + ";} \
	.uiAttachmentDesc, .uiStreamPassive, .uiStreamSource, .uiStreamSource a {color: " + ForceContrast(colorArray[3], MixTwoHexColors(colorArray[8], colorArray[7],0.5)) + ";} \
	.uiStreamMessage .actorName a, .uiStreamMessage .passiveName a{color: " + ForceContrast(colorArray[3], MixTwoHexColors(colorArray[8], colorArray[7],0.5)) + ";} \
	.uiStream .uiAttachmentDesc, .uiStream .uiStreamPassive{color: " + ForceContrast(colorArray[6], MixTwoHexColors(colorArray[8], colorArray[7],0.5), 0.15) + ";} \
	.uiTextSubtitle{color: " + ForceContrast(colorArray[3], MixTwoHexColors(colorArray[7],colorArray[9],0.25), 0.10) + ";} \
	.uiListLight {border-color: " + ForceContrast(MixTwoHexColors(colorArray[8], colorArray[7],0.1), MixTwoHexColors(colorArray[8], colorArray[7],0.5), 0.10) + ";} \
	.uiComposerHideContent .uiComposerMessageBox, .uiComposerHideInput .uiComposerMessageBox {background-color: transparent;} \
	.uiComposerMessageBox {background-color: " + MixTwoHexColors(colorArray[5],colorArray[9],0.25) + "; border-color: " + colorArray[5] + ";} \
	.uiComposerHideMessageBox .attachmentFrame, .uiComposerHideInput .attachmentFrame  { border-color: " + colorArray[5] + ";} \
	.uiComposerTopBorder { border-top-color: " + MixTwoHexColors(colorArray[6],colorArray[9],0.25) + "; } \
	.fbTabGrid .borderItem { border-right-color: " + colorArray[6] + " !important; } \
	.attachmentForm { background: " + colorArray[8] + "; } \
	.fbTabGridItem .title { color: " + ForceContrast(colorArray[6],colorArray[8],0.12) + " !important; } \
	.fluidInputCell { background-color: #FFFFFF; } \
	\
	/* Right Column */ \
	#home_sidebar{background:" + MixTwoHexColors(colorArray[8], colorArray[7],0.5) + ";} \
	.UIHomeBox_Title{color:" + colorArray[4] + ";} \
	.UIHomeBox_Top{border-bottom:1px solid " + colorArray[5] + ";} \
	.UIHomeBox_Top{background:" + MixTwoHexColors(colorArray[9], colorArray[7],0.5) + ";} \
	.UIHotStory{border-top:1px solid  " + colorArray[6] + ";} \
	.UIHotStory{background:" + colorArray[9] + ";} \
	.UIUpcoming{background:" + colorArray[9] + ";} \
	.fcg {color: " + ForceContrast(colorArray[8], colorArray[9], 0.20) + ";} \
	.UIMediaItem_Photo .UIMediaItem_PhotoFrame{border:3px solid " + colorArray[9] + ";} \
	/* Other Stuff */ \
	.UIRecentActivityStory{background:" + colorArray[9] + "} \
	.UIRecentActivity_Stream .UIRecentActivity_Header{color:" + ForceContrast(colorArray[5], colorArray[8], 0.15) + ";} \
	.UIStoryAttachment_Caption{color:" + ForceContrast(colorArray[6], colorArray[9], 0.15) + ";} \
	.UIStoryAttachment_Copy{color:" + ForceContrast(colorArray[7], colorArray[9], 0.15) + ";} \
	\
	span.action_links_bottom{color:" + ForceContrast(MixTwoHexColors("#999999", colorArray[5],0.5), colorArray[7], 0.15) + ";} /* The 'Added July 14' on the bottom of photos */ \
	\
	/* Icons */ \
	.spritemap_icons{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/74mnzfmd_trans.png);} \
	.share_and_hide .share_a{background:white url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	.s_and_h_big .share_a{background:white url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat right -274px;} \
	.share_and_hide .x_to_hide{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -844px -65px} \
	.share_and_hide .x_to_hide:hover{background:#3B5998 url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -868px -65px} \
	div.tokenizer .token:hover span.x_hover{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -842px -64px;} \
	.commentable_item .comment_box_nub{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -930px -69px;} \
	.commentable_item .comment_box .x_to_hide{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -844px -64px;} \
	.UIMentor .ImageBlock_Hide{display:block;width:11px;height:13px;padding:0;margin:1px 2px 0 6px;text-indent:-5000px;background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -869px -65px} \
	a.emu_x{display:block;height:13px;width:11px;background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -869px -65px;text-indent:-5000px} \
	.friend_grid .friend_grid_col .fg_action_hide{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -869px -65px} \
	.pymk #pymk .friend_grid_col .fg_action_hide h5 a{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -869px -65px} \
	a.UIEmuFrame_x{;background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -869px -65px;} \
	.inputsearch{background:#fff url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat left 4px;} \
	\
	#buddy_list .buddy_list_typeahead #buddy_list_typeahead_input{background:white url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat left 4px;} \
	#buddy_list_panel a.panel_item .panel_icon{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	#buddy_list_panel .flyout a .menu_icon{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	.buddy_list .switch a{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	#chat_next_tab span{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	#chat_tab_bar .tab_handle.highlight{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	#chat_tab_bar .tab_count{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	#chat_tab_bar .tab_button_div .tab_name .tab_availability{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -715px -101px} \
	#chat #chat_tab_bar .tab_handle.disabled .tab_button_div .tab_x{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) -870px -68px} \
	#chat_tab_bar .chat_header .header_buttons .minimize{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -711px -58px} \
	#chat_tab_bar .chat_header .header_buttons .close{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -843px -63px} \
	#chat_tab_bar img.chat_info_pic{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -480px -166px} \
	#chat_tab_bar .chat_window .chat_input_div .chat_input_border{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -590px -120px;} \
	#chat_tab_bar .chat_window .chat_input{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat 4px -166px;} \
	#fb_menubar_logo .fb_logo_img{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -480px -66px} \
	.fb_menu_dropdown .account small{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -606px -66px} \
	.fb_menu_dropdown .apps small{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -670px -66px} \
	.fb_menu_dropdown .privacy small{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -638px -66px} \
	.fb_menu_dropdown .help small{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -859px -102px} \
	#fb_menubar_core .fb_menu_count_holder .in_start{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -250px -101px;} \
	#fb_menubar_core .fb_menu_count_holder .in_end{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -332px -101px;} \
	#presence_bar #presence_notifications_count strong{background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png);} \
	#presence #buddy_list_tab .buddy_icon{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat scroll -631px -101px;} \
	#presence.buddy_list_hidden #buddy_list_tab .buddy_icon{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat scroll -647px -101px} \
	#universal_search #universal_search_input #q{background:white url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat 0 -65px} \
	#universal_search #universal_search_submit label span{background:#6d84b4 url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -429px -65px;} \
	#universal_search #universal_search_submit label:active span{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -449px -65px} \
	\
	.double_arrow img{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat -5px -56px} \
	\
	.UIIntentionalStory_Tagged{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat;} \
	.UIStoryAttachment_Tags .UIStoryAttachment_Label{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/a657viny_trans.png) no-repeat left -395px;} \
	\
	\
	.UINestedFilterList_Item{background:" + colorArray[9] + "; } \
	.UINestedFilterList_Item{border-bottom:1px solid " + MixTwoHexColors(colorArray[3], colorArray[9], 0.1) + ";}\
	.UINestedFilterList_Selected .UINestedFilterList_Item_Link, .UINestedFilterList_Selected .UINestedFilterList_Item_Link:hover, .UINestedFilterList_SubItem_Selected .UINestedFilterList_SubItem_Link{background:" + MixTwoHexColors(colorArray[7], colorArray[9], 0.5) + "; border-color:" + MixTwoHexColors(colorArray[8], colorArray[7], 0.5) + "} \
	.UINestedFilterList_Item_Link:hover, .UINestedFilterList_SubItem_Link:hover, .UINestedFilterList_SubSelected .UINestedFilterList_Item_Link:hover, .UINestedFilterList_CollapseLink:hover{background:" + MixTwoHexColors(colorArray[6], colorArray[7], 0.5) + "; border-color:" + MixTwoHexColors(colorArray[5], colorArray[7], 0.5) + "} \
	.UINestedFilterList_Item_Link, .UINestedFilterList_SubItem_Link{border:1px solid " + MixTwoHexColors(colorArray[9], colorArray[7], 0.5) + "} \
	\
	.commentable_item .ufi_section{background-color:" + colorArray[8] + ";border-bottom:1px solid " + colorArray[7] + ";} \
	.lightblue_box{background-color:" + colorArray[6] + ";border:1px solid " + MixTwoHexColors(colorArray[6], colorArray[4], 0.5) + "} \
	\
	\
	/* Messages & Inbox */ \
	.GBThreadMessageRow_Date{color:" + ForceContrast(colorArray[3], colorArray[7], 0.15) + ";}\
	.gigaboxx_composer_message_label{color:" + ForceContrast(colorArray[4], colorArray[7], 0.15) + ";}\
	\
	/* Facebook Redesign of Feb 2010 */ \
	#headNavOut{background-color:" + colorArray[5] + ";border:1px solid " + colorArray[2] + ";border-bottom:0} \
	#headNav{background-color:" + colorArray[5] + ";border:1px solid " + colorArray[2] + ";border-bottom:0;} \
	#blueBar{background-color:" + HexColorToRGBA(colorArray[3],0.95) + ";} \
	#pageLogo a{background:" + colorArray[3] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png) no-repeat -21px 0;} \
	#pageLogo a:hover,#pageLogo a:focus,#pageLogo a:active{background:" + colorArray[2] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png) no-repeat -21px 0;} \
	\
	#jewelCase .jewel{border:0px solid " + colorArray[3] + "; border-bottom: 0px;} \
	.jewelToggler:active, .jewelToggler:focus,.jewelToggler:hover{background-color:" + MixTwoHexColors(colorArray[2], colorArray[5], 0.5) + ";} \
	/*#navSearch{background-color:#fff;border:1px solid " + colorArray[2] + ";} */ \
	.jewelNew .jewelCount span{background-color:" + ForceContrast(ForceContrast(colorArray[4], colorArray[3], 0.10), "#FFFFFF", 0.15) + ";border-color:" + ForceContrast(ForceContrast(colorArray[4], colorArray[3], 0.10), "#FFFFFF", 0.15) + "} \
	.jewelToggler{background:no-repeat url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);} \
	\
	#jewelMail {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -78px -73px;background-repeat: no-repeat;} \
	#jewelMail:hover, #jewelMail:focus, #jewelMail:active {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -105px -73px;background-repeat: no-repeat;} \
	.jewelNew #jewelMail {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -51px -73px;background-repeat: no-repeat;} \
	\
	#jewelRequest {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -78px -105px;background-repeat: no-repeat;} \
	#jewelRequest:hover, #jewelRequest:focus, #jewelRequest:active { background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png); background-position: -105px -105px; background-repeat: no-repeat;} \
	.jewelNew #jewelRequest {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -51px -105px;background-repeat: no-repeat;} \
	\
	#jewelNotif {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -78px -137px;background-repeat: no-repeat;} \
	#jewelNotif:hover, #jewelNotif:focus, #jewelNotif:active {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png); background-position: -105px -137px; background-repeat: no-repeat;} \
	.jewelNew #jewelNotif {background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/ez3x5cuc_trans.png);background-position: -51px -137px;background-repeat: no-repeat;} \
	\
	#contentCol{background-color:" + colorArray[9] + ";padding-top:15px} \
	.UIThumbPagerControl_Button { background-color: " + ForceContrast(ForceContrast(colorArray[8], colorArray[9], 0.12), "#FFFFFF", 0.12) + "; } \
	#chat_tab_bar .chat_header{background:" + colorArray[2] + ";border:1px solid " + colorArray[2] + ";border-bottom:1px solid " + colorArray[4] + ";cursor:pointer} \
	#leftCol{background:" + colorArray[8] + ";} \
	.uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {background-color: " + MixTwoHexColors(colorArray[7],colorArray[8],0.3) + ";} \
	.GigaboxxContent{background:" + colorArray[8] + ";} \
	#mainContainer .ThreadListWrapper{background:" + colorArray[9] + ";} \
	.ThreadList{background:" + colorArray[9] + ";} \
	.GBThreadRow{background:" + colorArray[9] + ";border-top:1px solid " + colorArray[5] + ";height:56px;overflow:hidden;position:relative} \
	.GBThreadRow .line{color:" + ForceContrast(ForceContrast(ForceContrast(colorArray[4], "#FFFFFF", 0.15), colorArray[8], 0.15), colorArray[9], 0.15) + ";} \
	.GBThreadRow .unread{background:" + colorArray[8] + ";} \
	.uiSideNav .selected .item, .uiSideNav ul .selected .subitem, .uiSideNav .selected .item:hover, .uiSideNav ul .selected .subitem:hover{background:" + colorArray[7] + ";} \
	.profile .profile_info .item .item_content{background:" + colorArray[9] + ";} \
	.profile .profile_info .item{border:solid 1px " + MixTwoHexColors(MixTwoHexColors(colorArray[6], colorArray[9], 0.3), colorArray[8], 0.20) + ";} \
	.profile .box .box_header{background:" + colorArray[6] + ";border-top:1px solid " + colorArray[5] + ";} \
	.profile .box h4.box_header{background:" + MixTwoHexColors(colorArray[6], colorArray[8], 0.50) + ";border-bottom:1px solid " + colorArray[5] + ";} \
	.profile_actions a.profile_action {border-bottom: 1px solid " + MixTwoHexColors(colorArray[6], colorArray[8], 0.50) + ";} \
	.toggle_tabs li a.selected{margin-left:-1px;background: " + colorArray[5] + ";border:1px solid " + colorArray[2] + ";border-left:1px solid " + colorArray[2] + ";border-right:1px solid " + colorArray[2] + ";border-bottom:1px solid " + MixTwoHexColors(colorArray[2], colorArray[9], 0.5) + ";color:" + ForceContrast("#FFFFFF", colorArray[5], 0.15) + "} \
	#footerContainer{background:" + MixTwoHexColors(colorArray[7],colorArray[9],0.25) + ";} \
	#pageFooter a{color: " + MixTwoHexColors(colorArray[3],colorArray[7],0.25) + ";} \
	#contentCurve{background-color:transparent;border-bottom:1px solid " + MixTwoHexColors(colorArray[3],colorArray[7],0.25) + ";} \
	.uiSideNavCount .countValue{color:" + ForceContrast(colorArray[2], colorArray[7], 0.15) + "} \
	.uiSideNavCount{background-color:" + colorArray[7] + ";color:" + ForceContrast(colorArray[2], colorArray[7], 0.15) + ";-webkit-border-radius:2px;-moz-border-radius:2px;padding:0 4px;font-weight:bold} \
	.uiUfi .ufiItem{background-color:" + MixTwoHexColors(colorArray[9], colorArray[7], 0.25) + ";border-bottom:1px solid " + MixTwoHexColors(colorArray[7], MixTwoHexColors(colorArray[8], colorArray[7],0.5), 0.5) + ";} \
	.uiLinkButton input{color: " + ForceContrast(colorArray[6], MixTwoHexColors(colorArray[9], colorArray[7], 0.25), 0.15) + ";} \
	\
	/* Event pages */ \
	.UIProfileBox_Header{background:" + colorArray[6] + ";border-top:1px solid " + colorArray[5] + ";} \
	.UIProfileBox_SubHeader{background:" + MixTwoHexColors(colorArray[6], colorArray[8], 0.50) + ";border-bottom:1px solid " + MixTwoHexColors(colorArray[5], colorArray[8], 0.50) + ";color:#444;} \
	.UITwoColumnLayout_Content{background:" + colorArray[8] + ";} \
	.UITwoColumnLayout_NarrowContent{background:" + colorArray[8] + ";} \
	.UIProfileBox_Content{background:" + colorArray[9] + ";} \
	#event .event_profile_information{background:" + colorArray[9] + ";} \
	.event_profile_title{border-bottom:1px solid " + colorArray[4] + ";} \
	#footerContainer{border-top:1px solid " + MixTwoHexColors(colorArray[6], colorArray[8], 0.50) + ";} \
	\
	/* FB Popups */ \
	#fb_multi_friend_selector.showborder{border:10px solid " + colorArray[6] + " !important;} \
	.showborder #fb_multi_friend_selector_wrapper{border:1px solid " + colorArray[3] + " !important;} \
	.pop_content .dialog_body{border-bottom:1px solid " + colorArray[6] + " !important;} \
	.pop_container_advanced {background: " + HexColorToRGBA(MixTwoHexColors(colorArray[2], colorArray[4], 0.50),0.7) + "; } \
	.pop_content h2.dialog_title {background: " + colorArray[3]  + "; border: 1px " +  ForceContrast(colorArray[2], colorArray[3], 0.15) + " ; color: " +  ForceContrast(colorArray[9], MixTwoHexColors(colorArray[2], colorArray[3], 0.75), 0.15) + ";} \
	\
	/* Buttons */ \
	.inputbutton, .inputsubmit{border-width:1px;border-color:" + MixTwoHexColors(colorArray[3], "#FFFFFF", 0.50) + " " + MixTwoHexColors(colorArray[3], "#000000", 0.50) + " " + MixTwoHexColors(colorArray[3], "#000000", 0.50) + " " + MixTwoHexColors(colorArray[3], "#FFFFFF", 0.50) + ";background-color:" + colorArray[3] + ";color:" + ForceContrast(colorArray[8], colorArray[3], 0.15) + ";} \
	.inputsubmit_disabled{background-color:#999;border-bottom:1px solid #000;border-right:1px solid #666;color:#fff} \
	.inputaux{background:#f0f0f0;border-color:#e7e7e7 #666 #666 #e7e7e7;color:#000} \
	.inputaux_disabled{color:#999} \
	\
	/* Hover Card */ \
	.hovercard .stage{background:" + colorArray[9] + " !important;border:1px solid " + colorArray[3] + " !important;border-bottom:2px solid " + colorArray[2] + " !important;} \
	.hovercard .fcg{color:" +  ForceContrast(colorArray[5], colorArray[9], 0.15) + " !important;} \
	.hovercard .fcb{color:" +  ForceContrast(colorArray[2], colorArray[9], 0.15) + " !important;} \
	.hovercard .uiTextSubtitle{color:" +  ForceContrast(colorArray[5], colorArray[9], 0.15) + " !important;} \
	\
	/* Stand-in Profile Image Replacement */ \
	.profileImageUnknownFemale50x50, .profileImageUnknownFemale200x126{background:" + ForceContrast(MixTwoHexColors(colorArray[6],colorArray[9],0.5),"#FFFFFF",0.10) + ";} \
	.profileImageUnknownMale50x50, .profileImageUnknownMale100x63, .profileImageUnknownMale200x126{background:" + ForceContrast(MixTwoHexColors(colorArray[6],colorArray[9],0.7),"#FFFFFF",0.10) + ";} \
	.profileImageUnknownNoGender50x50, .profileImageUnknownNoGender100x63, .profileImageUnknownNoGender200x126{background:" + ForceContrast(MixTwoHexColors(colorArray[6],colorArray[9],0.6),"#FFFFFF",0.10) + ";} \
	.profileImageUnknownGadget50x50, .profileImageUnknownGadget200x126, .profileImageUnknownGadget100x63, .profileImageUnknownMiscPNG100x63, .profileImageUnknownNoMiscPNG200x126{background:" + ForceContrast(MixTwoHexColors(colorArray[4],colorArray[9],0.6),"#FFFFFF",0.10) + ";} \
	\
	\
	.profileImageUnknownFemale200x126_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-graduate-female-swirl.png) !important}; \
	.profileImageUnknownFemale50x50_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female.png) !important;} \
	\
	.profileImageUnknownMale50x50_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png) !important;} \
	.profileImageUnknownMale100x63_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-male-swirl.png) !important;} \
	.profileImageUnknownMale200x126_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png) !important;} \
	\
	.profileImageUnknownFemale50x50_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female.png ) !important;} \
	.profileImageUnknownFemale100x63_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-female-swirl.png) !important;} \
	.profileImageUnknownFemale200x126_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-female-swirl.png) !important;} \
	\
	.profileImageUnknownGadget100x63_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget-swirl.png) !important;} \
	.profileImageUnknownGadget200x126_BackgroundImage{background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png) !important;} \
	\
	/* Image Stage */ \
	.fbPhotoTheater .stageBackdrop { background: " + HexColorToRGBA(colorArray[2],0.75) + "; border-color: " + HexColorToRGBA(colorArray[1],0.5) + ";} \
	.fbPhotoTheater { background: rgba(0, 0, 0, 0); } \
	.fbPhotoTheater .next, .fbPhotoTheater .prev {	opacity: 0.5; } \
	.fbPhotoTheater .photoInfo{background: " + HexColorToRGBA(colorArray[9],0.75) + ";border:solid " + HexColorToRGBA(colorArray[1],0.5) + ";border-width:3px 1px;height:125px} \
	.fbPhotosTheaterActions, .fbPhotoCaption, .fbPhotoTheaterTitle, .fbPhotosTaglistTag {background: " + HexColorToRGBA(colorArray[9], 0.5 /* this is in addition to the 0.75 below it */) + ";} \
	.fbPhotoCaption{color:" + ForceContrast(colorArray[3], colorArray[9], 0.15) + ";} \
	.UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right, .feedback_toggle_link .feedback_show_link,.feedback_toggle_link .feedback_hide_link,.UIActionLinks .comment_link,.UIActionLinks .comment_link input { color: " + ForceContrast(colorArray[6], colorArray[9], 0.15) + "; } \
	.xxxfbPhotoTheater .UIActionLinks .UIActionLinks_bottom { color: " + ForceContrast(colorArray[7], colorArray[9], 0.12) + "; } \
	\
	.UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks .comment_link input { color: " + ForceContrast(colorArray[5], colorArray[9], 0.12) + "; } \
	\
	\
	";
	
	//div[@id='box_app_2356318349']/h3[1][@class='box_header']
	//div[@id='box_app_2356318349']
	//div[@id='box_app_2392950137']/h3[1][@class='box_header']
	//div[@id='box_app_2407511955']/h3[1][@class='box_header']
	//div[@id='minifeed_936505']/div[2][@class='story_body size_2 from_friend_story wall_story']/div[1][@class='from_friend']/a[1]
	//div[@id='minifeed_934970']/div[2][@class='story_body size_2 from_friend_story wall_story']/div[1][@class='from_friend']/a[1]/img[1][@class='app_actor_image']
	//div[@id='minifeed_46872142']/div[2][@class='story_body size_2 from_friend_story']/div[2][@class='story_content tag_story_box from_friend_story']
	//div[@id='minifeed_22319738']/div[2][@class='story_body size_2 from_friend_story wall_story']/div[2][@class='story_content story_media']
	//div[@id='minifeed_46872142']/div[2][@class='story_body size_2 from_friend_story']/div[2][@class='story_content tag_story_box from_friend_story']
	//div[@id='minifeed_22319738']/div[2][@class='story_body size_2 from_friend_story wall_story']
	
	styleText += tweaks;
	
	styleNode.appendChild(document.createTextNode(styleText));
	
	
	if (document.getElementById('colorCSS') == null) { head.appendChild(styleNode); }
	else {
		document.getElementById('colorCSS').parentNode.removeChild(document.getElementById('colorCSS'));
		head.appendChild(styleNode); 
		//document.getElementById('colorCSS').parentNode.replaceChild(styleNode,document.getElementById('colorCSS'));
	}
	
	styleNode.setAttribute('id', 'colorCSS');
	
	
	FixTabButtons("background:" + MixTwoHexColors(colorArray[8],colorArray[4],0.5) + " !important;");
	
	
	
	// ReplaceSilhouette((ForceContrast(MixTwoHexColors(colorArray[6],colorArray[9],0.5),"#FFFFFF",0.05)));  // .UIRoundedImage also effects some silhouettes.
	
	//ReplaceUIRoundedImage(false);
	
	//HighlightColors(colorArray, currentImgDom);
	
	
	//ViewPallet(colorArray);
	
}


function FixTabButtons(style) {
	return;
	
	try {
		document.getElementById('profile_tabs');
		
		var myListItems = document.getElementsByTagName('li');
		
		for (var i=0; i<myListItems.length; i++) {
			myListItems[i].style += (" " + style);
		}
		
		
		// .profile .top_bar ul.tabs li{background:" + MixTwoHexColors(colorArray[8],colorArray[4],0.5) + " !important;} \
		
	}
	catch(err) {
		
	}
	
}

function ReplaceSilhouette(hexColor) {
	//Log("Start: ReplaceSilhouette()");
	
	const ImageReplaceLookupTable = {
		// https://s-static.ak.facebook.com/rsrc.php/yP/r/0Zs-zWf93sl.png 50x50   gadget
		// https://s-static.ak.facebook.com/rsrc.php/y7/r/9F47WDBi33G.png 75x75   gadget
		// https://s-static.ak.facebook.com/rsrc.php/yP/r/0Zs-zWf93sl.png 62x52   gadget  NO REPLACEMENT IMG YET
		// https://s-static.ak.facebook.com/rsrc.php/y4/r/GylKztrlHCg.png 200x126 gadget
		
		// https://s-static.ak.facebook.com/rsrc.php/yy/r/v8doHqXa0TN.png 50x50   female student
		// https://s-static.ak.facebook.com/rsrc.php/ym/r/wh4xTXo3Vvh.png 100x63  female student
		// https://s-static.ak.facebook.com/rsrc.php/y6/r/TZM02FnUo5g.png 200x126 female student
		
		// https://s-static.ak.facebook.com/rsrc.php/yo/r/UlIqmHJn-SK.gif 50x50   male
		// https://s-static.ak.facebook.com/rsrc.php/yL/r/HsTZSDw4avx.gif 200x126 male
		
		// https://s-static.ak.facebook.com/rsrc.php/y9/r/IB7NOFmPw2a.gif 50x50   female
		// https://s-static.ak.facebook.com/rsrc.php/yp/r/yDnr5YfbJCH.gif 200x126 female
		
		// https://s-static.ak.facebook.com/rsrc.php/ym/r/t6iv9Q7G_NF.png 50x50   suitcase
		// https://s-static.ak.facebook.com/rsrc.php/yA/r/1nEpHbsWZ1l.png 100x63  suitcase
		
		// 
		
		// https://s-static.ak.facebook.com/rsrc.php/y7/r/9F47WDBi33G.png 75x75   gadget
		'9F47WDBi33G.png' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-gadget.png", addClassName: "profileImageUnknownGadget50x50" },
		// https://s-static.ak.facebook.com/rsrc.php/yP/r/0Zs-zWf93sl.png 62x52   gadget  
		// '9F47WDBi33G.png' : { newImage: "", addClassName: "" },
		// https://s-static.ak.facebook.com/rsrc.php/y4/r/GylKztrlHCg.png 200x126 gadget
		'GylKztrlHCg.png' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png", addClassName: "profileImageUnknownGadget200x126" },
		
		
		// https://s-static.ak.facebook.com/rsrc.php/yy/r/v8doHqXa0TN.png 50x50   female graduate
		//'v8doHqXa0TN.png' : { newImage: "", addClassName: ""}, 
		// https://s-static.ak.facebook.com/rsrc.php/ym/r/wh4xTXo3Vvh.png 100x63  female graduate
		//'wh4xTXo3Vvh.png' : { newImage: "", addClassName: ""}, 
		// https://s-static.ak.facebook.com/rsrc.php/y6/r/TZM02FnUo5g.png 200x126 female graduate
		'TZM02FnUo5g.png' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-graduate-female-swirl.png", addClassName: "profileImageUnknownFemale200x126"}, 
		
		// https://s-static.ak.facebook.com/rsrc.php/yo/r/UlIqmHJn-SK.gif 50x50   male
		'UlIqmHJn-SK.gif' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png", addClassName: "profileImageUnknownMale50x50"},
		// https://s-static.ak.facebook.com/rsrc.php/yL/r/HsTZSDw4avx.gif 200x126 male
		'HsTZSDw4avx.gif' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png", addClassName: "profileImageUnknownMale200x126"}, 
		
		// https://s-static.ak.facebook.com/rsrc.php/y9/r/IB7NOFmPw2a.gif 50x50   female
		'IB7NOFmPw2a.gif' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female.png", addClassName: "profileImageUnknownFemale50x50"}, 
		// https://s-static.ak.facebook.com/rsrc.php/yp/r/yDnr5YfbJCH.gif 200x126 female
		'yDnr5YfbJCH.gif' : { newImage: "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-female-swirl.png", addClassName: "profileImageUnknownFemale200x126"}, 
		
		
		// https://s-static.ak.facebook.com/rsrc.php/ym/r/t6iv9Q7G_NF.png 50x50   suitcase
		//'t6iv9Q7G_NF.png' : { newImage: "", addClassName: ""}, 
		// https://s-static.ak.facebook.com/rsrc.php/yA/r/1nEpHbsWZ1l.png 100x63  suitcase
		//'1nEpHbsWZ1l.png' : { newImage: "", addClassName: ""}, 
		
		
	}
	
	
	try {
		//Log("Here 1");
		
		// My Unknown Person Picture Place Holders
		// https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png          // 50x50   male
		// https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male-swirl.png    // 50x50   male swirl
		// https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male-surround.png // 50x50   male reversed_alpha
		// https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-male.png          // 100x63  male
		// https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-male-swirl.png    // 100x63  male swirl
		// https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male.png          // 200x126 male
		// https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png    // 200x126 male swirl
		
		// https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female.png          // 50x50   female
		// https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female-swirl.png    // 50x50   female swirl
		// https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female-surround.png // 50x50   female reversed_alpha
		// https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-female.png          // 100x63  female
		// https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-female-swirl.png    // 100x63  female swirl
		// https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-female.png          // 200x126 female
		// https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-female-swirl.png    // 200x126 female swirl
		
		
		// FB's Unknown 'Like' Page Picture Place Holders:
		// https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget.png       // 100x63  gadget
		// https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget-swirl.png // 100x63  gadget swirl
		// https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget.png       // 200x126 gadget
		// https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png // 200x126 gadget swirl
		
		// ---------------------------------------------
		
		// FB's Unknown Person Picture Place Holders:
		// http://static.ak.fbcdn.net/rsrc.php/z9/r/IB7NOFmPw2a.gif // 50x50 female
		// http://static.ak.fbcdn.net/rsrc.php/zo/r/UlIqmHJn-SK.gif // 50x50 male
		// http://static.ak.fbcdn.net/rsrc.php/zp/r/yDnr5YfbJCH.gif // 200x126 female
		// http://static.ak.fbcdn.net/rsrc.php/zL/r/HsTZSDw4avx.gif // 200x126 male
		
		// FB's Unknown 'Like' Page Picture Place Holders:
		// http://static.ak.fbcdn.net/rsrc.php/zS/r/SakaC0tDjfm.png // 50x50   gizmo
		// http://static.ak.fbcdn.net/rsrc.php/zT/r/LKW-XRdGm6b.png // 100x63  gizmo
		// http://static.ak.fbcdn.net/rsrc.php/z4/r/GylKztrlHCg.png // 200x126 gizmo
		// http://static.ak.fbcdn.net/rsrc.php/ze/r/8wgzbb7VZxD.png // 50x50   male
		
		var myImages = document.getElementsByTagName('img');
		
		var height=0;
		var width=0;
		
		var addClassName;
		var newImage;
		var className;
		var replaceBackgroundInstead;
		var replacementObject;
		var oldImageUrl;
		
		for (var i=0; i<myImages.length; i++) {
	
			
			className = myImages[i].className;
			
			if (className.indexOf('ReplaceSilhouetteProcessed')>-1) continue; // This image was already processed in a previous run.
			
			addClassName = "";
			newImage = "";
			replaceBackgroundInstead = false;
			
			
			if ((className.indexOf('UIProfileImage')>-1) || (className.indexOf('uiProfilePhoto')>-1)|| (myImages[i].id == "profile_pic") || (className.indexOf('cropped img')>-1)) {
				//Log("Here 3");

				/*
				switch(myImages[i].src.substr(-4)) {
					case '.gif': // Normal users have .gif replacements.
						
						//Log("About to replace GIF (" + myImages[i].src + "), className=(" + className + ").");
						
						switch(myImages[i].src.substr(-15)) {
								
							case 'IB7NOFmPw2a.gif': // 50x50 female
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female.png";
								addClassName = "profileImageUnknownFemale50x50";
								//myImages[i].setAttribute('style',"background: " + hexColor + ";");
								break;
								
							case 'UlIqmHJn-SK.gif': // 50x50 male
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png";
								addClassName = "profileImageUnknownMale50x50";
								break;
								
							case 'yDnr5YfbJCH.gif': // 200x126 female 
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-female-swirl.png";
								addClassName = "profileImageUnknownFemale200x126";
								break;
								
							case 'HsTZSDw4avx.gif': // 200x126 male
								myImages[i].src = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png";
								addClassName = "profileImageUnknownMale200x126";
								break;
								
							default: // Exact image unknown, gender unknown.
								
								width = myImages[i].width;
								height = myImages[i].height;
								
								if (width == 50 && height == 50) {
									newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png";
									addClassName = "profileImageUnknownNoGender50x50";
								}
								else if (width == 200 && height == 126) {
									newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png";
									addClassName = "profileImageUnknownNoGender200x126";
								}
								else if (width == 100 && height == 63) {
									newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-male-swirl.png";
									addClassName = "profileImageUnknownNoGender100x63";
								}
								
								
						}
						
						//Log("Replaced GIF w/ (" + myImages[i].src + "), className=(" + className + ").");
						
						break;
						
					case '.png': // 'Like' pages use png as the unknown image placeholder.
						
						//Log("About to replace PNG (" + myImages[i].src + "), className=(" + className + ").");
						
						switch(myImages[i].src.substr(-15)) {
								
								
							case '8wgzbb7VZxD.png': // 50x50 male
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png";
								addClassName = "profileImageUnknownMale50x50";
								break;
								
							case 'SakaC0tDjfm.png': // 50x50 gadget
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-gadget.png";
								addClassName = "profileImageUnknownGadget50x50";
								break;
								
							case 'LKW-XRdGm6b.png': // 100x63 gadget
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget.png";
								addClassName = "profileImageUnknownGadget100x63";
								//myImages[i].setAttribute('style',"background: " + hexColor + ";");
								break;
								
							case 'GylKztrlHCg.png': // 200x126 gadget
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png";
								addClassName = "profileImageUnknownGadget200x126";
								//myImages[i].setAttribute('style',"background: " + hexColor + ";");
								break;
								
							case 'wKzxVIyhLs6.png': // 200x126 male 'like' page
								newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png";
								addClassName = "profileImageUnknownMale200x126";
								//myImages[i].setAttribute('style',"background: " + hexColor + ";");
								break;
								
							default: // Exact image unknown
								
								width = myImages[i].width;
								height = myImages[i].height;
								
								if (width == 100 && height == 63) {
									newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget.png";
									addClassName = "profileImageUnknownMiscPNG100x63";
								}
								else if (width == 200 && height == 126) {
									newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png";
									addClassName = "profileImageUnknownNoMiscPNG200x126";
								}
								
						}
						
						
						//Log("Replaced PNG w/ (" + myImages[i].src + "), className=(" + className + ").");
						break;
						
					default:
						// Do nothing if not .gif or .png.
				}
				 */
				
				//replacementObject = LookupReplacementImage(myImages[i]);
				
				if (className.indexOf('cropped img')>-1) {
					//Log("Here 3.1");

					replaceBackgroundInstead = true;
					oldImageUrl = document.defaultView.getComputedStyle(myImages[i], "").backgroundImage.substr(5);
					Log("oldImageUrl backgroundImage = " + oldImageUrl);
				}
				else {
					//Log("Here 3.2");

					oldImageUrl = myImages[i].src;
				}
				
				try {
					//Log("Here 4");
					replacementObject = ImageReplaceLookupTable[oldImageUrl.substr(-15)];
					//Log("Here 5");
				}
				catch(err) { Log("Error in ReplaceSilhouette()->Lookup: " + err); }
					
				if (replacementObject) {
					//Log("Here 6");
					if (replacementObject['addClassName']) addClassName = replacementObject['addClassName'];
					if (replacementObject['newImage']) newImage = replacementObject['newImage'];
					//Log("Here 7");
				}
				
				
				if (replaceBackgroundInstead == true) {
					newImage = ""; // The image will go in the background.  It's added to the style.
					addClassName += addClassName + " " + addClassName + "_BackgroundImage";
				}
				
					
				if (newImage && newImage != "") {
					if (replaceBackgroundInstead == true) myImages[i].style += " background-image: url(" + newImage + ");";
					else myImages[i].src = newImage;
				}
				
				if (addClassName && addClassName != "") {
					if (className.indexOf(addClassName) == -1) myImages[i].className += (" " + addClassName);
					//Log("myImages[i].className = " + myImages[i].className);
				}
				
				//if (newImage == "") Log("Not replaceing " + oldImageUrl);
				
			}
			//else Log("Not replaced due to ClassName or ID.  ClassName = " + className);
			
			if (className.indexOf('ReplaceSilhouetteProcessed') == -1) myImages[i].className += (" ReplaceSilhouetteProcessed");
		}
	}
	catch(err) {
		Log("Error in ReplaceSilhouette(): " + err);
	}
}

function LookupReplacementImage(imgDOM) {
	var newImage = "";
	var addClassName = "";
	var replaceBackgroundInstead = false;
	
	switch(imgDOM.src.substr(-4)) {
		case '.gif': // Normal users have .gif replacements.
			
			//Log("About to replace GIF (" + myImages[i].src + "), className=(" + className + ").");
			
			switch(imgDOM.src.substr(-15)) {
					
				case 'IB7NOFmPw2a.gif': // 50x50 female
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-female.png";
					addClassName = "profileImageUnknownFemale50x50";
					//myImages[i].setAttribute('style',"background: " + hexColor + ";");
					break;
					
				case 'UlIqmHJn-SK.gif': // 50x50 male
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png";
					addClassName = "profileImageUnknownMale50x50";
					break;
					
				case 'yDnr5YfbJCH.gif': // 200x126 female 
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-female-swirl.png";
					addClassName = "profileImageUnknownFemale200x126";
					break;
					
				case 'HsTZSDw4avx.gif': // 200x126 male
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png";
					addClassName = "profileImageUnknownMale200x126";
					break;
					
				default: // Exact image unknown, gender unknown.
					
					width = imgDOM.width;
					height = imgDOM.height;
					
					if (width == 50 && height == 50) {
						newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png";
						addClassName = "profileImageUnknownNoGender50x50";
					}
					else if (width == 200 && height == 126) {
						newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png";
						addClassName = "profileImageUnknownNoGender200x126";
					}
					else if (width == 100 && height == 63) {
						newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-male-swirl.png";
						addClassName = "profileImageUnknownNoGender100x63";
					}
					
					
			}
			
			//Log("Replaced GIF w/ (" + myImages[i].src + "), className=(" + className + ").");
			
			break;
			
		case '.png': // 'Like' pages use png as the unknown image placeholder.
			
			//Log("About to replace PNG (" + myImages[i].src + "), className=(" + className + ").");
			
			switch(imgDOM.src.substr(-15)) {
					
					
				case '8wgzbb7VZxD.png': // 50x50 male
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-male.png";
					addClassName = "profileImageUnknownMale50x50";
					break;
					
				case 'SakaC0tDjfm.png': // 50x50 gadget
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-gadget.png";
					addClassName = "profileImageUnknownGadget50x50";
					break;
					
				case 'LKW-XRdGm6b.png': // 100x63 gadget
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget.png";
					addClassName = "profileImageUnknownGadget100x63";
					//myImages[i].setAttribute('style',"background: " + hexColor + ";");
					break;
					
				case 'GylKztrlHCg.png': // 200x126 gadget
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png";
					addClassName = "profileImageUnknownGadget200x126";
					//myImages[i].setAttribute('style',"background: " + hexColor + ";");
					break;
					
				case 'wKzxVIyhLs6.png': // 200x126 male 'like' page
					newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-male-swirl.png";
					addClassName = "profileImageUnknownMale200x126";
					//myImages[i].setAttribute('style',"background: " + hexColor + ";");
					break;
					
				default: // Exact image unknown
					
					width = imgDOM.width;
					height = imgDOM.height;
					
					if (width == 100 && height == 63) {
						newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-gadget.png";
						addClassName = "profileImageUnknownMiscPNG100x63";
					}
					else if (width == 200 && height == 126) {
						newImage = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-gadget-swirl.png";
						addClassName = "profileImageUnknownNoMiscPNG200x126";
					}
					
			}
			
			
			//Log("Replaced PNG w/ (" + myImages[i].src + "), className=(" + className + ").");
			break;
			
		default:
			// Do nothing if not .gif or .png.
	}	
	
	return { 'newImage': newImage, 'addClassName': addClassName, 'replaceBackgroundInstead': replaceBackgroundInstead };
}

function ReplaceUIRoundedImage(newImagesOnly) {
	
	try {
		//hexColor = "#ff0000";
		//var img = new Image();
		//img.src = "/images/ui/UIRoundedImage.png";
		//var canvas = document.createElement('canvas');	
		//canvas.className = "UIRoundedImage_CornersSprite";
		//var ctx = canvas.getContext('2d');
		//canvas.width = img.width;
		//canvas.height = img.height;
		//ctx.drawImage(img,0,0,img.width,img.height);
		////alert(canvas.toDataURL());
		//ctx.globalAlpha = 1;
		//ctx.globalCompositeOperation = "source-in";	
		//ctx.fillStyle = HexColorToRGBA(hexColor,1);
		//ctx.fillRect(0,0,canvas.width,canvas.height);
		
		
		//Log("Start ReplaceUIRoundedImage()");
		
		var tempDom;
		
		try {
			if (newImagesOnly == false) {
				
				// Replace previously colored canvases
				var Elements = document.getElementsByTagName('canvas');
				var ImgLen = Elements.length;
				
				//Log("ImgLen = " + ImgLen);
				
				for (var i = 0; i < ImgLen-1; i++){
					//Log("Outside: Running thru canvas, i = " + i);
					
					if (Elements[i].className == "UIRoundedImage_CornersSprite") {
						//Log("Inside: Running thru canvas, i = " + i);
						
						var color = "";
						var tempDom = Elements[i].parentNode; //.parentNode.parentNode;
						while(color == "" || color == "transparent") {
							tempDom = tempDom.parentNode;
							try{ color = window.getComputedStyle(tempDom,null).backgroundColor; } catch(err) {}
						}
						
						//color = HexColorToRGBA("#FF0000",1);
						
						var img = new Image();
						img.src = "/images/ui/UIRoundedImage.png";
						var canvas = document.createElement('canvas');	
						canvas.className = "UIRoundedImage_CornersSprite";
						
						var ctx = canvas.getContext('2d');
						canvas.width = img.width;
						canvas.height = img.height;
						ctx.drawImage(img,0,0,img.width,img.height);
						
						ctx.globalAlpha = 1;
						ctx.globalCompositeOperation = "source-in";	
						ctx.fillStyle = color; //HexColorToRGBA(hexColor,1);
						//ctx.fillStyle = HexColorToRGBA(hexColor,1);
						ctx.fillRect(0,0,canvas.width,canvas.height);
						//document.body.appendChild(canvas);
						Elements[i].parentNode.replaceChild(canvas,Elements[i]);
					}
				}
			}
		}
		catch(err) {
			Log("Error in canvas ReplaceUIRoundedImage(): " + err);
		}
		
		try {
			Elements = document.getElementsByTagName('img');
			ImgLen = Elements.length;
			for (var i = 0; i < ImgLen-1; i++){
				if (Elements[i].src.indexOf("UIRoundedImage.png")>-1) {
					
					var color = "";
					var tempDom = Elements[i].parentNode; // .parentNode.parentNode;
					while(color == "" || color == "transparent") {
						tempDom = tempDom.parentNode;
						try{ color = window.getComputedStyle(tempDom,null).backgroundColor; } catch(err) {}
					}
					
					
					var img = new Image();
					img.src = "/images/ui/UIRoundedImage.png";
					var canvas = document.createElement('canvas');	
					canvas.className = "UIRoundedImage_CornersSprite";
					
					var ctx = canvas.getContext('2d');
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img,0,0,img.width,img.height);
					
					ctx.globalAlpha = 1;
					ctx.globalCompositeOperation = "source-in";	
					ctx.fillStyle = color; //HexColorToRGBA(hexColor,1);
					//ctx.fillStyle = HexColorToRGBA(hexColor,1);
					ctx.fillRect(0,0,canvas.width,canvas.height);
					//document.body.appendChild(canvas);
					Elements[i].parentNode.replaceChild(canvas,Elements[i]);
				}
			}
		}
		catch(err) {
			Log("Error in img ReplaceUIRoundedImage(): " + err);
		}
		
		//Log("End ReplaceUIRoundedImage()");
	}
	catch(err) {
		Log("Error in ReplaceUIRoundedImage(): " + err);
	}
}

function HighlightColors(colorArray, ImgDom) {	// Doesn't work due to cross-domain issues.
	// Highlight colors on images that were used to color the page.
	
	var canvas = document.createElement("canvas");
	var canvasContext = canvas.getContext("2d");
	
	
	var i;
	var j;
	var k;
	
	canvas.width = ImgDom.width;
	canvas.height = ImgDom.height;
	
	
	canvasContext.drawImage(ImgDom, 0, 0);
	
	
	//canvasContext.drawImage("http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v297/109/100/8611250/n8611250_44467048_9037.jpg", 0, 0);
	
	
	
	var colorArrayR = new Array(10);
	var colorArrayG = new Array(10);
	var colorArrayB = new Array(10);
	
	for (k=0; k<colorArray.length; k++)
	{
		colorArrayR[k] = parseInt(colorArray[k].substr(1,2), 16)/255;
		colorArrayG[k] = parseInt(colorArray[k].substr(3,2), 16)/255;
		colorArrayB[k] = parseInt(colorArray[k].substr(5,2), 16)/255;
	}
	
	var closestDist = new Array(260100,260100,260100,260100,260100,260100,260100,260100,260100,260100);	// Max possible distance.
	var closestX = new Array(10);
	var closestY = new Array(10);
	
	var tempDist = 1E9;
	
	var imageData=canvasContext.getImageData(0,0, canvas.width, canvas.height); // can fail if image is on a different domain name.
	
	for (i=0; i<imageData.height; i++)
	{
		for (j=0; j<imageData.width; j++)
		{
			var index=(i*4)*imageData.width+(j*4);
			
			for (k=0; k<colorArray.length; k++)
			{
				
				tempDist = (imageData.data[index] - colorArrayR[k])*(imageData.data[index] - colorArrayR[k]);
				tempDist += (imageData.data[index+1] - colorArrayG[k])*(imageData.data[index+1] - colorArrayG[k]);
				tempDist += (imageData.data[index+2] - colorArrayB[k])*(imageData.data[index+2] - colorArrayB[k]);
				
				
				//imageDataFinal.data[index+3]+=imageData.data[index+3];	  // alpha	 
				
				if (tempDist < closestDist[k]) {
					closestDist[k] = tempDist;
					closestX = j;
					closestY = i;
				}
			}
			
		}
	}
	
	alert(closestX);
	
	for (k=0; k<colorArray.length; k++)
	{
		canvasContext.beginPath();
		canvasContext.arc(closestX[k], closestY[k], 5,	0, 2*Math.PI, false);
		ctx.stroke();
	}
	
	ImgDom.src = canvas.toDataURL();
	
	//var image = new Image();
	//image.src = canvas.toDataURL();
	//document.body.appendChild(image);
	
	
	
	return canvas.toDataURL();
}

function ViewPallet(colorArray) {
	
	
	//divNode.innerHTML = "<table><tr><td bgcolor=" + colorArray[0] + ">" + colorArray[0] + "</td><td bgcolor=" + colorArray[1] + ">" + colorArray[1] + "</td><td bgcolor=" + colorArray[2] + ">" + colorArray[2] + "</td><td bgcolor=" + colorArray[3] + ">" + colorArray[3] + "</td><td bgcolor=" + colorArray[4] + ">" + colorArray[4] + "</td></tr>" +
	//"<tr><td bgcolor=" + colorArray[5] + ">" + colorArray[5] + "</td><td bgcolor=" + colorArray[6] + ">" + colorArray[6] + "</td><td bgcolor=" + colorArray[7] + ">" + colorArray[7] + "</td><td bgcolor=" + colorArray[8] + ">" + colorArray[8] + "</td><td bgcolor=" + colorArray[9] + ">" + colorArray[9] + "</td></tr></table>";
	
	if (document.getElementById('viewPallet') == null) {
		var divNode = document.createElement('div');
		var text = "<table width=100% cellspacing=10></table>";
		divNode.innerHTML = text;
		
		document.body.appendChild(divNode);
		divNode.setAttribute('id', 'viewPallet');
	}
	else {
		
		//
		//		text = document.getElementById('viewPallet').firstChild.innerHTML
		//		text += "<tr>";
		//		for (k=0; k<colorArray.length; k++)
		//		{
		//			text += "<td height=25 bgcolor=" + colorArray[k] + " style='color: " + ForceContrast("#000000", colorArray[k], .35) + "; font-size:75%;'>" + colorArray[k] + "</td>";
		//		}
		//		text += "</tr>";
		//		
		//		document.getElementById('viewPallet').firstChild.innerHTML = text
		
		var tableDOM = document.getElementById('viewPallet').firstChild;
		
		var trDOM = document.createElement('tr');
		
		var text = "";
		
		for (k=0; k<colorArray.length; k++)
		{
			tdDOM = document.createElement('td');
			tdDOM.setAttribute('height',25);
			tdDOM.setAttribute('bgcolor',colorArray[k]);
			//tdDOM.setAttribute('style',"'color: " + ForceContrast("#000000", colorArray[k], .35) + "; font-size:75%;'");
			tdDOM.innerHTML = "&nbsp;";
			trDOM.appendChild(tdDOM);
			
			if (k <= 8) {
				tdDOM = document.createElement('td');
				tdDOM.setAttribute('height',25);
				tdDOM.setAttribute('bgcolor', MixTwoHexColors(colorArray[k],colorArray[k+1],0.5) );
				//tdDOM.setAttribute('style',"'color: " + ForceContrast("#000000", colorArray[k], .35) + "; font-size:75%;'");
				tdDOM.innerHTML = "&nbsp;";
				trDOM.appendChild(tdDOM);
			}
		}
		
		
		//tableDOM.appendChild(trDOM);
		
		tableDOM.insertBefore(trDOM,tableDOM.firstChild) 
		
		if (tableDOM.childNodes.length > 5) tableDOM.removeChild(tableDOM.lastChild);
		
	}
	
	
	
	//if (document.getElementById('viewPallet') == null) { head.appendChild(styleNode); }
	//else document.getElementById('viewPallet').parentNode.replaceChild(styleNode,document.getElementById('viewPallet'));
	
	
	
}

function GetSaturation(hexColor) {
	
	var red = parseInt(hexColor.substr(1,2), 16)/255;
	var green = parseInt(hexColor.substr(3,2), 16)/255;
	var blue = parseInt(hexColor.substr(5,2), 16)/255;
	
	
	var max = Math.max(red,green,blue);  
	var min = Math.min(red,green,blue);
	/*	
	 var hue = 221;  
	 
	 if (red == max) hue = 60*(green-blue)/(max-min);
	 if (green == max) hue = 60*(blue-red)/(max-min)+120;
	 if (blue == max) hue = 60*(red-green)/(max-min)+240; 
	 
	 if (max == min) hue = 0;
	 
	 if (hue > 360) hue = hue - 360;
	 if (hue < 0) hue = hue + 360;
	 
	 */
	
	//  if ((max + min)/2 < 0.5) var saturation=(max-min)/(max+min) * (100-increasePercent) + increasePercent;
	//  if ((max + min)/2 >=0.5) var saturation=(max-min)/(2.0-max-min) * (100-increasePercent) + increasePercent;
	
	
	var saturation = (1-min/max)*100;
	
	//alert("saturation: " + Math.floor(saturation) );
	
	
	return Math.floor(saturation);
	
}

function GetContrast(hexColor1, hexColor2) {
	/* Contrast should generally be around 500 for background & foreground */
	// This is based on w3 standards: http://www.w3.org/TR/AERT#color-contrast
	
	var red1 = parseInt(hexColor1.substr(1,2), 16)/255;
	var green1 = parseInt(hexColor1.substr(3,2), 16)/255;
	var blue1 = parseInt(hexColor1.substr(5,2), 16)/255;
	
	var red2 = parseInt(hexColor2.substr(1,2), 16)/255;
	var green2 = parseInt(hexColor2.substr(3,2), 16)/255;
	var blue2 = parseInt(hexColor2.substr(5,2), 16)/255;
	
	return (Math.max(red1,red2) - Math.min(red1,red2)) + (Math.max(blue1,blue2) - Math.min(blue1,blue2)) + (Math.max(green1,green2) - Math.min(green1,green2));
}


function GetBrightness(hexColor) {
	// Returns: 0 to 1 for brightness.
	var red = parseInt(hexColor.substr(1,2), 16)/255;
	var green = parseInt(hexColor.substr(3,2), 16)/255;
	var blue = parseInt(hexColor.substr(5,2), 16)/255;
	
	return (red*299 + green*587 + blue*114)/1000;
}


function GetLuminance(hexColor) {
	// Relative Luminance as defined by the w3: http://www.w3.org/TR/WCAG20/#relativeluminancedef
	// hexColor: #000000 to #FFFFFF
	//
	// Returns: 0 to 1 for relative luminance.
	
	var red = parseInt(hexColor.substr(1,2), 16)/255;
	var green = parseInt(hexColor.substr(3,2), 16)/255;
	var blue = parseInt(hexColor.substr(5,2), 16)/255;
	
	// This part is relative Luminance.
	if (red   <= 0.03928) red   = red / 12.92; else red   = Math.pow(((red + 0.055)/1.055),2.4); 
	if (green <= 0.03928) green = green/12.92; else green = Math.pow(((green+0.055)/1.055),2.4); 
	if (blue  <= 0.03928) blue  = blue /12.92; else blue  = Math.pow(((blue +0.055)/1.055),2.4); 
	
	return 0.2126 * red + 0.7152 * green + 0.0722 * blue 
}

function GetLuminanceRatio(hexColor1, hexColor2) {
	/* Luminance ratio between foreground and background should be 5:1 */
	// Returns: 1 to 21 (commonly written 1:1 to 21:1).
	
	var lum1 = GetLuminance(hexColor1);
	var lum2 = GetLuminance(hexColor2);
	if (lum1 >= lum2) return ((lum1 + 0.05) / (lum2 + 0.05));
	else return ((lum2 + 0.05) / (lum1 + 0.05));
}


function ForceContrast(hexColor1, hexColor2, contrastMinimum) {
	// hexColor1: #000000 to #FFFFFF
	// hexColor2: #000000 to #FFFFFF
	// contrastMinimum: 0 to 1.
	//
	// returns: #000000 to #FFFFFF
	//Log("In ForceContrast(): contrastMinimum=" + contrastMinimum + ".");
	//Log("In ForceContrast(): Going to call ForceContrastDirect(" + hexColor1 + ", " + hexColor2 + ", " + (Math.pow(contrastMinimum,2)*23+1) + ")."); 
	return ForceContrastDirect(hexColor1, hexColor2, Math.pow(contrastMinimum,2)*23 + 1);
	
	contrastMinimum = Math.max(Math.min(contrastMinimum, 255), 0);
	
	var brightness1 = GetBrightness(hexColor1);
	var brightness2 = GetBrightness(hexColor2);
	
	var brightnessDiff = Math.abs(brightness1 - brightness2);
	
	//alert("brightnessDiff = " + brightnessDiff);
	
	//alert("colors = " + hexColor1 + " " + hexColor2);
	
	var mixColor;
	
	if (brightness1 == brightness2 && brightness1 > 0.5) mixColor = "#000000";
	else if (brightness1 == brightness2 && brightness1 <= 0.5) mixColor = "#FFFFFF";
	else if (brightness1 >= brightness2 && (1 - brightness2) < contrastMinimum) mixColor = "#FFFFFF";
	else if (brightness1 >= brightness2 && (1 - brightness2) >= contrastMinimum) mixColor = "#000000";	
	else if (brightness1 < brightness2 && brightness2 < contrastMinimum) mixColor = "#FFFFFF";
	else if (brightness1 < brightness2 && brightness2 >= contrastMinimum) mixColor = "#000000";
	else { 
		Log("In ForceContrast(): This case should not be hit. hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum + "."); 
		mixColor = "#FFFFFF"; 
	}
	
	var newHexColor1 = hexColor1;
	
	var i = 0;
	while (brightnessDiff < contrastMinimum) {
		i = i+1;
		if (i > 10) { 
			RecordTimer("ForceContrast"); 
			Log("In ForceContrast(): Could not find a suitable color. hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum + "."); 
			return newHexColor1; 
		}
		
		brightness1 = GetBrightness(newHexColor1);
		brightnessDiff = Math.abs(brightness1 - brightness2);
		
		hexColor1 = MixTwoHexColors(newHexColor1, mixColor, 0.005 + 2*Math.abs(contrastMinimum - brightnessDiff)); // The part in the 'abs' just makes it converge faster. 
		//alert("brightness = " + brightness1 + " " + brightness2 + "\nratio = " + brightnessDiff + "\ni = " + i + "\nhexColor1 = " + hexColor1);
	}
	
	return hexColor1;
	
}



function ForceContrastXXX(hexColor1, hexColor2, contrastMinimum) {
	//return hexColor1;
	/* If the colors are too close to each other, move color1 away from color2 */
	
	//contrastMinimum = (contrastMinimum-1)/2+1;
	
	
	//Log("Starting ForceContrastXXX(): hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum);
	
	var luminance1 = GetLuminance(hexColor1);
	var luminance2 = GetLuminance(hexColor2);
	
	//Log("luminance1 = " + luminance1 + ", luminance2 = " + luminance2);
	
	var luminanceRatio1 = ((luminance1+0.05)/(luminance2+0.05));
	var luminanceRatio2 = ((luminance2+0.05)/(luminance1+0.05));
	
	
	//Log("luminanceRatio1 = " + luminanceRatio1 + ", luminanceRatio2 = " + luminanceRatio2 + ", contrastMinimum = " + contrastMinimum);
	
	//alert("colors = " + hexColor1 + " " + hexColor2);
	
	var newHexColor1 = hexColor1;
	var i = 0;
	while (luminanceRatio1 < contrastMinimum && luminanceRatio2 < contrastMinimum) {
		i = i+1;
		if (i > 20) { 
			Log("In ForceContrastXXX(): Could not find a suitable color. newHexColor1=" + newHexColor1 + ", hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum + ", luminanceRatios=" + luminanceRatio1 + "," + luminanceRatio2 + ", luminance = " + luminance1 + "," + luminance2 + "."); 
			//Log("Returning: " + newHexColor1);
			return newHexColor1; 
		}
		
		
		luminance1 = GetLuminance(newHexColor1);
		
		luminanceRatio1 = ((luminance1+0.05)/(luminance2+0.05));
		luminanceRatio2 = ((luminance2+0.05)/(luminance1+0.05));
		
		//Log("luminance = " + luminance1 + "," + luminance2);
		
		//Log("i=" + i + ", hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum + ", luminanceRatios=" + luminanceRatio1 + "," + luminanceRatio2);
		
		
		//Log("forcing contrast");
		if (luminanceRatio1 > 1) {
			/* Color one is brighter */
			newHexColor1 = MixTwoHexColors(newHexColor1, "#FFFFFF", 0.1*(i-1) + 1-Math.pow(1-Math.abs(contrastMinimum-luminanceRatio1)/24,3) );
			//Log("here 1");
		}
		else if (luminanceRatio1 < 1) {
			/* Color one is darker */
			newHexColor1 = MixTwoHexColors(newHexColor1, "#000000", 0.1*(i-1) + 1-Math.pow(1-Math.abs(contrastMinimum-luminanceRatio2)/24,3) );
			//Log("here 2");
		}
		else {
			if (newHexColor1 == hexColor2) {
				//Log("here 3");
				if (newHexColor1.toUpperCase() == "#FFFFFF") hexColor1 = "#AAAAAA";
				else if (newHexColor1 == "#000000") newHexColor1 = "#111111";
				else {
					if (luminance1 < 0.5) newHexColor1 = MixTwoHexColors(newHexColor1, "#FFFFFF", 0.1); 
					else newHexColor1 = MixTwoHexColors(newHexColor1, "#000000", 0.1);
				}
			}
			else {
				//Log("here 4");
				preHexColor1 = newHexColor1;
				//Log("before hexColor1 = " + newHexColor1);
				newHexColor1 = MixTwoHexColors(newHexColor1, "#FFFFFF", 0.1);  //this line could be better
				//Log("after hexColor1 = " + newHexColor1);
				if (preHexColor1 == newHexColor1) return newHexColor1;
			}
		}
		
	}
	
	//Log("Returning: " + newHexColor1);
	
	return newHexColor1;
	
}

function AppendUserColorSetter() {
	// Not working yet.
	if (document.getElementById("ColorSetter") != null) return; // Already appended.
	var test = document.createElement('div');
	test.innerHTML = "<iframe class='hidden_elem' id='ColorSetter' style='display:none;' src='/AutoColorizer?ColorSetterTab'></iframe>";
	document.body.appendChild(test);
	Log("Appended");
}

function ForceContrastDirect(hexColor1, hexColor2, contrastMinimum) {
	//return hexColor1;
	/* If the colors are too close to each other, move color1 away from color2 */
	
	//Log("Starting ForceContrastDirect(): hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum);
	
	var luminance1 = GetLuminance(hexColor1);
	var luminance2 = GetLuminance(hexColor2);
	
	if (((luminance1+0.05)/(luminance2+0.05)) >= contrastMinimum || ((luminance2+0.05)/(luminance1+0.05)) >= contrastMinimum) return hexColor1;
	
	//Log("luminance1 = " + luminance1 + ", luminance2 = " + luminance2);
	
	var luminanceRatio1 = ((luminance1+0.05)/(luminance2+0.05));
	var luminanceRatio2 = ((luminance2+0.05)/(luminance1+0.05));
	
	//Log("luminanceRatio1 = " + luminanceRatio1 + ", luminanceRatio2 = " + luminanceRatio2 + ", contrastMinimum = " + contrastMinimum);
	
	// These are the two solution to: solve[z = ((x+0.05)/(y+0.05)), {x, y}].
	var neededLuminance1a = (luminance2*contrastMinimum) + (contrastMinimum/20) - (1/20);
	var neededLuminance1b = (20*luminance2 - contrastMinimum + 1) / (20*contrastMinimum) ;
	
	var neededLuminance1aIsAttainable = true; var neededLuminance1bIsAttainable = true;
	if (neededLuminance1a > 1 || neededLuminance1a < 0) {
		//Log("neededLuminance1a (" + neededLuminance1a + ") is not attainable.");
		neededLuminance1aIsAttainable = false;
	}
	if (neededLuminance1b > 1 || neededLuminance1b < 0) {
		//Log("neededLuminance1b (" + neededLuminance1b + ") is not attainable.");
		neededLuminance1bIsAttainable = false;
	}
	
	if (neededLuminance1aIsAttainable == false && neededLuminance1bIsAttainable == false) {
		// Since neither is attainable, pick black or white depending on which is further away from hexColor2.
		// 0.179129 is the break even point for (1+0.05)/(x+0.05) = (x+0.05)/(0+0.05).
		
		// Log("There's no good way out. Returning " + (luminance2 >= 0.179129?"#000000.":"#FFFFFF."));
		if (luminance2 >= 0.179129) return "#000000";
		else return "#FFFFFF";
	}
	
	//Log("neededLuminance1a = " + neededLuminance1a + ", " + "neededLuminance1b = " + neededLuminance1b);
	
	
	neededLuminance1a = (neededLuminance1aIsAttainable?neededLuminance1a:neededLuminance1b);
	neededLuminance1b = (neededLuminance1bIsAttainable?neededLuminance1b:neededLuminance1a);
	
	var brighterLum = (neededLuminance1a > neededLuminance1b?neededLuminance1a:neededLuminance1b);
	var darkerLum = (neededLuminance1a > neededLuminance1b?neededLuminance1b:neededLuminance1a);
	
	//Log("brighterLum = " + brighterLum + ", " + "darkerLum = " + darkerLum);
	
	var luminanceToAchieve;
	
	if (luminance1 > luminance2) {
		// Would like to get brighter to succeed.
		luminanceToAchieve = brighterLum;
		//Log("I would like to get brigher.");
		
	}
	else {
		// Would like to get darker to succeed.
		luminanceToAchieve = darkerLum;
		//Log("I would like to get darker.");
	}
	
	var gettingBrighter = (luminanceToAchieve > luminance1?true:false);
	
	//Log("I need to get " + (gettingBrighter?"brighter.":"darker."));
	
	//Log("luminanceRatio1 = " + luminanceRatio1 + ", luminanceRatio2 = " + luminanceRatio2 + ", contrastMinimum = " + contrastMinimum);
	
	//alert("colors = " + hexColor1 + " " + hexColor2);
	
	var newHexColor1 = hexColor1;
	var i = 0;
	while ((luminance1 >= luminanceToAchieve && gettingBrighter == false) || (luminance1 <= luminanceToAchieve && gettingBrighter == true)) {
		i = i+1;
		if (i > 20) { 
			// Log("In ForceContrastDirect(): Could not find a suitable color. newHexColor1=" + newHexColor1 + ", hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum + ", luminance = " + luminance1 + "," + luminance2 + "."); 
			//Log("Returning: " + newHexColor1);
			return newHexColor1; 
		}
		
		
		luminance1 = GetLuminance(newHexColor1);
		
		//Log("i = " + i + ", luminanceToAchieve = " + luminanceToAchieve + ", luminance1 = " + luminance1);
		
		
		//Log("luminance = " + luminance1 + "," + luminance2);
		
		//var luminanceRatio1 = ((luminance1+0.05)/(luminance2+0.05));
		//var luminanceRatio2 = ((luminance2+0.05)/(luminance1+0.05));
		//Log("i=" + i + ", hexColor1=" + hexColor1 + ", hexColor2=" + hexColor2 + ", contrastMinimum=" + contrastMinimum + ", luminanceRatios=" + ((luminance1+0.05)/(luminance2+0.05)) + "," + ((luminance2+0.05)/(luminance1+0.05)));
		
		//Log("forcing contrast");
		if (gettingBrighter) {
			/* Color one is brighter */
			newHexColor1 = MixTwoHexColors(newHexColor1, "#FFFFFF",  0.1*(i-1) + 1-Math.pow(1-Math.abs(luminanceToAchieve-luminance1),2) );
			//Log("here 1");
		}
		else {
			/* Color one is darker */
			newHexColor1 = MixTwoHexColors(newHexColor1, "#000000", 0.1*(i-1) + 1-Math.pow(1-Math.abs(luminanceToAchieve-luminance1),2) );
			//Log("here 2");
		}
		
		
	}
	
	//Log("Returning: " + newHexColor1);
	
	return newHexColor1;
	
}


function IncreaseSaturation(hexColor,increasePercent) {
	if (increasePercent < 0) increasePercent = 0;  
	if (increasePercent > 100) increasePercent = 100;  //saturating math...hehe
	
	
	var red = parseInt(hexColor.substr(1,2), 16)/255;
	var green = parseInt(hexColor.substr(3,2), 16)/255;
	var blue = parseInt(hexColor.substr(5,2), 16)/255;
	
	
	var max = Math.max(red,green,blue);  
	var min = Math.min(red,green,blue);
	
	var hue = 221;  
	
	if (red == max) hue = 60*(green-blue)/(max-min);
	if (green == max) hue = 60*(blue-red)/(max-min)+120;
	if (blue == max) hue = 60*(red-green)/(max-min)+240; 
	
	if (max == min) hue = 0;
	
	if (hue > 360) hue = hue - 360;
	if (hue < 0) hue = hue + 360;
	
	
	
	//if ((max + min)/2 < 0.5) var saturation = (max-min)/(max+min) * (100-increasePercent) + increasePercent;
	//if ((max + min)/2 >=0.5) var saturation = (max-min)/(2.0-max-min) * (100-increasePercent) + increasePercent;
	
	
	
	var saturation = (1-min/max)*100;
	
	
	
	//alert("saturation: " + Math.floor(saturation) + " hue: " + Math.floor(hue) + " lightness: " + Math.floor((max + min)*50));
	
	
	//if (saturation < 40) return "hsl(219,42%,40%)";  //make sure no off gray -> bright color
	if (saturation < 40) return "hsl(" + Math.floor(hue) + "," + Math.floor(saturation) + "%," + Math.floor((max + min)*50) + "%)";  //make sure no off gray -> bright color
	
	saturation = saturation * (100-increasePercent) + increasePercent;
	
	//  alert((max-min)*50);
	//  alert("hsl(" + Math.floor(hue) + "," + Math.floor(saturation) + "%,50%)");
	return "hsl(" + Math.floor(hue) + "," + Math.floor(saturation) + "%," + Math.floor((max + min)*50) + "%)";
	
	/*
	 if (blue == max) blue=255*increasePercent/100 + blue*(1-increasePercent/100);
	 else if (red == max) red=255*increasePercent/100 + red*(1-increasePercent/100);
	 else if (green == max) green=255*increasePercent/100 + green*(1-increasePercent/100);
	 
	 if (red == min) red=red*(1-increasePercent/100);
	 else if (green == min) green=green*(1-increasePercent/100);
	 else if (blue == min) blue=blue*(1-increasePercent/100);    
	 return "rgb(" + Math.floor(red) + "," + Math.floor(green) + "," + Math.floor(blue) + ")";
	 */
	
	
	
}

function HexColorToRGBA(hexColor, alpha) {
	var red = parseInt(hexColor.substr(1,2), 16);
	var green =  parseInt(hexColor.substr(3,2), 16);
	var blue =  parseInt(hexColor.substr(5,2), 16);
	
	alpha = Math.min(Math.max(alpha, 0), 1);
	
	return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}


function AverageTwoHexColorsToRGB(hexColor1,hexColor2) {
	var red = Math.floor((parseInt(hexColor1.substr(1,2), 16) + parseInt(hexColor2.substr(1,2), 16))/2);
	var green =  Math.floor((parseInt(hexColor1.substr(3,2), 16) + parseInt(hexColor2.substr(3,2), 16))/2);
	var blue =  Math.floor((parseInt(hexColor1.substr(5,2), 16) + parseInt(hexColor2.substr(5,2), 16))/2);
	
	return "rgb(" + red + "," + green + "," + blue + ")";
}


function MixTwoHexColors(hexColor1,hexColor2,percentColor2)
{
	// ex: var hexFade = MixTwoHexColors("#F1CD00","#12C011",.75);
	
	if (percentColor2 > 1) percentColor2 = 1;
	if (percentColor2 < 0) percentColor2 = 0;
	
	var red = Math.floor((1-percentColor2)*parseInt(hexColor1.substr(1,2), 16) + percentColor2*parseInt(hexColor2.substr(1,2), 16));
	var green =  Math.floor((1-percentColor2)*parseInt(hexColor1.substr(3,2), 16) + percentColor2*parseInt(hexColor2.substr(3,2), 16));
	var blue =  Math.floor((1-percentColor2)*parseInt(hexColor1.substr(5,2), 16) + percentColor2*parseInt(hexColor2.substr(5,2), 16));
	
	/*if (red > 1) red = 1;
	 if (blue > 1) blue = 1;
	 if (green > 1) green = 1;
	 
	 if (red < 0) red = 0;
	 if (blue < 0) blue = 0;
	 if (green < 0) green = 0;*/
	
	return "#" + decimalToHex(red) + decimalToHex(green) + decimalToHex(blue);
	
}


function decimalToHex(decimalValue)  /* works for 0 to 255 */
{
	var high = Math.floor(decimalValue/16);
	var low = Math.round((decimalValue/16 - Math.floor(decimalValue/16))*16);
	
	
	if (high>9) high = String.fromCharCode(high-10+65);
	if (low>9) low = String.fromCharCode(low-10+65);
	
	
	return "" + high + "" + low;
}


//function fadeBetweenTwoColorSchemes(currentFadePercent,fadeStep,endingFadePercent,delay)  
function fadeBetweenTwoColorSchemes(fadeStartTime, fadeDuration)
{
	//alert('fadeBetweenTwoColorSchemes(currentFadePercent=' + currentFadePercent + ', fadeStep=' + fadeStep + ', endingFadePercent=' + endingFadePercent + ', delay=' + delay + ')');
	
	var currentTime = new Date();	// Used to set initial start time on the first run, and delta time on every other run.
	
	if (fadeStartTime == null) {  // fadeStartTime will be null on first run, so set it to current time.
		fadeStartTime = currentTime.getTime();
		//alert("set fade time");
	}
	
	//var currentFadePercent = currentFadePercent + fadeStep;
	var currentFadePercent = (currentTime - fadeStartTime)/fadeDuration + 0.2; // The 0.2 is the initial fade amount.
	
	//if (currentFadePercent > endingFadePercent) currentFadePercent = endingFadePercent;
	if (currentFadePercent > 1.0) currentFadePercent = 1.0;
	
	
	
	var finalColorArray = window.document.body.getAttribute('finalColorArray').split('*');
	var startingColorArray = window.document.body.getAttribute('startingColorArray').split('*');
	
	//var finalColorArray = ("#FF0000*#00FF00*#0000FF*#FF00FF*#FFFF00*00FFFF*#000000*#77FF00*#FF7700*#FF0077*").split('*');
	//var finalColorArray = ("#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*").split('*');
	//var finalColorArray = ("#000000*#000000*#000000*#000000*#000000*#000000*#000000*#000000*#000000*#000000*").split('*');
	//var finalColorArray = ("#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*#FFFFFF*").split('*');
	//var finalColorArray = ("#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*#EEEEEE*").split('*');
	//var finalColorArray = ("#EEEEEE*#EDEDED*#EFEFEF*#ECECEC*#EBEBEB*#EAEAEA*#E9E9E9*#E8E8E8*#E7E7E7*#E6E6E6*").split('*');
	//var finalColorArray = ("#101010*#101010*#101010*#101010*#101010*#101010*#101010*#101010*#101010*#101010*").split('*');
	//var finalColorArray = ("#815A2B*#815A2B*#815A2B*#815A2B*#815A2B*#815A2B*#815A2B*#815A2B*#815A2B*#815A2B*").split('*');
	//var finalColorArray = ("#333333*#333333*#333333*#333333*#333333*#333333*#333333*#333333*#333333*#333333*").split('*');
	//var finalColorArray = ("#AA3333*#AA3333*#AA3333*#AA3333*#AA3333*#AA3333*#AA3333*#AA3333*#AA3333*#AA3333*").split('*');
	
	//var finalColorArray = [RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor()];
	
	//var startingColorArray = ("#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*").split('*');
	
	
	//alert("Start: " + startingColorArray.join(', '));
	//alert("Final: " + finalColorArray.join(', '));
	
	var fadedColorArray = new Array(10);
	
	fadedColorArray[0] = MixTwoHexColors(startingColorArray[0],finalColorArray[0],currentFadePercent);
	fadedColorArray[1] = MixTwoHexColors(startingColorArray[1],finalColorArray[1],currentFadePercent);
	fadedColorArray[2] = MixTwoHexColors(startingColorArray[2],finalColorArray[2],currentFadePercent);
	fadedColorArray[3] = MixTwoHexColors(startingColorArray[3],finalColorArray[3],currentFadePercent);
	fadedColorArray[4] = MixTwoHexColors(startingColorArray[4],finalColorArray[4],currentFadePercent);
	fadedColorArray[5] = MixTwoHexColors(startingColorArray[5],finalColorArray[5],currentFadePercent);
	fadedColorArray[6] = MixTwoHexColors(startingColorArray[6],finalColorArray[6],currentFadePercent);
	fadedColorArray[7] = MixTwoHexColors(startingColorArray[7],finalColorArray[7],currentFadePercent);
	fadedColorArray[8] = MixTwoHexColors(startingColorArray[8],finalColorArray[8],currentFadePercent);
	fadedColorArray[9] = MixTwoHexColors(startingColorArray[9],finalColorArray[9],currentFadePercent);
	
	
	//alert("Faded: " + fadedColorArray.join(', ')); 
	
	
	//startTime = new Date();
	InsertCSS(fadedColorArray, "");
	//currentTime = new Date();
	//var timeTaken = (currentTime.getTime() - startTime.getTime());
	
	
	//if (currentFadePercent < endingFadePercent) /*fadeTimer =*/ setTimeout(fadeBetweenTwoColorSchemes, delay - timeTaken, currentFadePercent, fadeStep, endingFadePercent, delay);
	//else {
	//	window.document.body.setAttribute('startingColorArray',window.document.body.getAttribute('finalColorArray'));
	//	//alert("Fade done");
	//}
	
	
	
	
	
	if (currentFadePercent < 1.0) {
		if (typeof(fadeTimer) != 'undefined') clearTimeout(fadeTimer);
		fadeTimer = setTimeout(fadeBetweenTwoColorSchemes, /* zero delay till run again */ 0, fadeStartTime, fadeDuration);  
		//GetBackgroundImages(finalColorArray);
		
		Log("currentFadePercent = " + currentFadePercent);
		
	}
	else {
		window.document.body.setAttribute('startingColorArray',window.document.body.getAttribute('finalColorArray'));
		Log("Fade done");
		
		//Log("CheckTextColor(document.body, " + fadedColorArray[6] + ", " + fadedColorArray[2] + ", " + 0 + ");");
		
		
		if ( GetLuminanceRatio(fadedColorArray[0], fadedColorArray[9]) < 3) {
			Log("Contrast possibly too low, running CheckTextColor(document.body, " + fadedColorArray[6] + ", " + fadedColorArray[2] + ", " + 0 + ");");
			if (typeof(checkTextColorTimer) != 'undefined') clearTimeout(checkTextColorTimer);
			checkTextColorTimer = setTimeout(function() {InsertCSS(fadedColorArray, CheckTextColor(document.body, fadedColorArray[6], fadedColorArray[2], 0))}, 1000);
			
		}
		
		//var changedNodes = CheckTextColor(document.body, fadedColorArray[6], fadedColorArray[2], 0);
		//Log("changedNodes = " + changedNodes);
		
		//if (changedNodes > 0) alert("changedNodes = " + changedNodes);
		
		// Run one last time (to get elements that failed to load before we colored.
		//if ((currentTime - fadeStartTime)/fadeDuration < 2)	setTimeout(fadeBetweenTwoColorSchemes, /* delay till run again */ 1000, fadeStartTime, fadeDuration);  
	}
}

var checkTextColorTimer;

function ConnectionHelper() {
	Log("Start: ConnectionHelper();");
	if ((document.getElementById("profile_connect") != null) && (document.getElementById("profile_connect").firstChild != null)) { ClickOnLink(document.getElementById("profile_connect").firstChild); PingUrl('http://corral.wail.wisc.edu/connection.xml'); Log("Connecting"); }
	else { 
		Log("No Connection."); 
		try{Log("(document.getElementById('profile_connect') != null) = " + (document.getElementById("profile_connect") != null));} catch(err){}
		try{Log("(document.getElementById('profile_connect').firstChild != null) = " + (document.getElementById("profile_connect").firstChild != null));} catch(err){}
		
		try {
			var entries = document.getElementById("pagelet_left_column").getElementsByTagName('a');
			
			for (var i = 0; i < entries.length; i++) {
				if (entries[i].innerHTML == "Unlike") return;
			}
		}
		catch(err){}
		
		// Retry.
		setTimeout(ConnectionHelper, 500);
	}
}

function UnConnectionHelper() {
	var entries = document.getElementById("pagelet_left_column").getElementsByTagName('a');
	
	for (var i = 0; i < entries.length; i++) {
		if (entries[i].innerHTML == "Unlike") ClickOnLink(entries[i]); // This will click ANY "Unlike" link on the left.
	}
}

function ShareHelper(submit) {
	var entries = document.getElementById("pagelet_left_column").getElementsByTagName('a');
	
	for (var i = 0; i < entries.length; i++) {
		if (entries[i].innerHTML == "Suggest to Friends") { ClickOnLink(entries[i]); ShareHelperSelectAll(submit); return; } /* This will click ANY suggest link on the left. */
	}
	
	// Retry.
	setTimeout(ShareHelper, submit, 500);
}

function ShareHelperSelectAll(submit) {
	if (document.getElementById("all_friends") == null) setTimeout(ShareHelperSelectAll, submit, 500);
	else { 
		var innerToggleButtonHtml = "<div><a href=\"javascript:if((typeof(shareAllToggle) == 'undefined') || (shareAllToggle == false)) {fs.unselect_all(); shareAllToggle = true; this.innerHTML = 'select none';} else {fs.select_all(); shareAllToggle=false; this.innerHTML='Select all'; }\">Select All</a></div>";
		fs.select_all(); if (submit == true) SocialGraphManager.submitDialog("sgm_invite_form", "\/ajax\/social_graph\/invite_dialog.php"); 
	}
}

function ClickOnLink(domLinkNode) {
	var cancelled;
	if (document.createEvent) {
		var newEvent = document.createEvent("MouseEvents");
		newEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		cancelled = !domLinkNode.dispatchEvent(newEvent);
	}
	else if (domLinkNode.fireEvent) cancelled = !domLinkNode.fireEvent("onclick");
	else cancelled = false;
	
	if (!cancelled) window.location = domLinkNode.href;
}

function RandomHexColor() {
	return "#" + decimalToHex(Math.round(Math.random()*255)) + decimalToHex(Math.round(Math.random()*255)) + decimalToHex(Math.round(Math.random()*255));
}

function RandomColorArray(method) {
	switch(method)
	{
			
		case "half random":
			var colorArray=[RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor()];
			colorArray[1] = MixTwoHexColors(colorArray[0], colorArray[2], 0.5);
			colorArray[3] = MixTwoHexColors(colorArray[2], colorArray[4], 0.5);
			colorArray[5] = MixTwoHexColors(colorArray[4], colorArray[6], 0.5);
			colorArray[7] = MixTwoHexColors(colorArray[6], colorArray[8], 0.5);
			colorArray[9] = MixTwoHexColors(colorArray[8], colorArray[9], 0.5);
			return colorArray;
			break;
			
		case "dual fade":
			var hexColor1 = RandomHexColor();
			var hexColor2 = RandomHexColor();
			return [hexColor1, 
					MixTwoHexColors(hexColor1, hexColor2, 1/9), 
					MixTwoHexColors(hexColor1, hexColor2, 2/9), 
					MixTwoHexColors(hexColor1, hexColor2, 3/9), 
					MixTwoHexColors(hexColor1, hexColor2, 4/9), 
					MixTwoHexColors(hexColor1, hexColor2, 5/9), 
					MixTwoHexColors(hexColor1, hexColor2, 6/9), 
					MixTwoHexColors(hexColor1, hexColor2, 7/9), 
					MixTwoHexColors(hexColor1, hexColor2, 8/9), 
					hexColor2] 
			
		case "tri fade":
			var hexColor1 = RandomHexColor();
			var hexColor2 = RandomHexColor();
			var hexColor3 = RandomHexColor();
			return [hexColor1, 
					MixTwoHexColors(hexColor1, hexColor2, 1/5), 
					MixTwoHexColors(hexColor1, hexColor2, 2/5), 
					MixTwoHexColors(hexColor1, hexColor2, 3/5), 
					MixTwoHexColors(hexColor1, hexColor2, 4/5),
					hexColor2,
					MixTwoHexColors(hexColor2, hexColor3, 1/4), 
					MixTwoHexColors(hexColor2, hexColor3, 2/4), 
					MixTwoHexColors(hexColor2, hexColor3, 3/4), 
					hexColor3];
			
		case "quad fade":
			var hexColor1 = RandomHexColor();
			var hexColor2 = RandomHexColor();
			var hexColor3 = RandomHexColor();
			var hexColor4 = RandomHexColor();
			return [hexColor1, 
					MixTwoHexColors(hexColor1, hexColor2, 1/4), 
					MixTwoHexColors(hexColor1, hexColor2, 2/4), 
					MixTwoHexColors(hexColor1, hexColor2, 3/4), 
					hexColor2,
					hexColor3,
					MixTwoHexColors(hexColor3, hexColor4, 1/4), 
					MixTwoHexColors(hexColor3, hexColor4, 2/4), 
					MixTwoHexColors(hexColor3, hexColor4, 3/4), 
					hexColor4];
			
		case "pure random":
			return [RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor()];
			break;
			
		default:
			return [RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor(), RandomHexColor()];
			break;
	}
	
}

function CheckForUpdate() {
	
	//alert("Checking for update");
	
	var versionOnServer = new Array(0,0,0);
	
	var updateUrls=new Array();
	
	updateUrls[0] = "http://www.ormont.net/version.xml";
	updateUrls[1] = "https://mywebspace.wisc.edu/ormont/web/facebook/version.xml";
	updateUrls[2] = "https://pages.cs.wisc.edu/~ormont/facebook/version.xml";
	
	//var updateUrl = updateUrls[Math.round(Math.random()*(updateUrls.length-1))];
	var updateUrl = updateUrls[Math.floor(Math.random()*(updateUrls.length))];
	
	
	
	AjaxGet({
			method: 'GET',
			url: updateUrl,
			headers: {
			//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml'
			}, 
			onerror:  function(responseDetails) {
			Log("Error in AjaxGet() from CheckForUpdate().");
			Log([
				 "status = " + responseDetails.status,
				 "statusTest = " + responseDetails.statusText,
				 "readyState = " + responseDetails.readyState,
				 "responseHeaders = " + responseDetails.responseHeaders,
				 "responseText = " + responseDetails.responseText,
				 "finalUrl = " + responseDetails.finalUrl,
				 "responseXML = " + responseDetails.responseXML
				 ].join("\n"));
			},
			onload: function(responseDetails) {
			Log([
				 "status = " + responseDetails.status,
				 "statusTest = " + responseDetails.statusText,
				 "readyState = " + responseDetails.readyState,
				 "responseHeaders = " + responseDetails.responseHeaders,
				 "responseText = " + responseDetails.responseText,
				 "finalUrl = " + responseDetails.finalUrl,
				 "responseXML = " + responseDetails.responseXML
				 ].join("\n"));
			
			
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		    var entries = dom.getElementsByTagName('version');
			
			var versionOnServerDOM;
			var changes;
			var link;
			for (var i = 0; i < entries.length; i++) {
			versionOnServerDOM = entries[i].getElementsByTagName('versionsegment');
			changes = entries[i].getElementsByTagName('changes');
			link = entries[i].getElementsByTagName('link');
			}
			
			
			if (entries.length == 0) return;  //no version tag found.        
			
			for(var k = 0; (k < versionOnServerDOM.length); k++) versionOnServer[k] = versionOnServerDOM[k].textContent;
			
			try { 
			//if (typeof GetItem('lastNotifiedVersion') != 'undefined' && GetItem('lastNotifiedVersion')) lastNotifiedVersion = GetItem('lastNotifiedVersion').split(",");
			if (GetItem('lastNotifiedVersion') != null && GetItem('lastNotifiedVersion')) lastNotifiedVersion = GetItem('lastNotifiedVersion').split(",");
			else lastNotifiedVersion = new Array(0,0,0);
			}
			catch(err) { lastNotifiedVersion = new Array(0,0,0); }
			
			
			var alreadyNotifedOfNewVersion = 1;
			for(var j = 0; j < lastNotifiedVersion.length; j++) if (lastNotifiedVersion[j] != versionOnServer[j]) alreadyNotifedOfNewVersion = 0;
			
			if (alreadyNotifedOfNewVersion == 1) return;
			
			//alert("Version on server = " + versionOnServer.join(".") + ", Running Version = " + thisScriptVersion.join("."));
			for(var j = 0; j < versionOnServer.length; j++) {
			if ((thisScriptVersion[j] < versionOnServer[j]) || ((typeof thisScriptVersion[j] == 'undefined') && (typeof versionOnServer[j] != 'undefined'))) {
			if(confirm("A new version of Auto-Colorizer for Facebook was released.\n\n" + changes[0].textContent + "\n\nNotice appears only once per version." + "\n\nGo to Install Page?")) {
			window.location = link[0].textContent;
			return;
			}
			else {
			try { StoreItem('lastNotifiedVersion',versionOnServer.join(',')); }
			catch(err) { Log("Error: Can not write to version key.\n\nabout:config key was reset; Restart firefox."); }
			SetLastCheckedForVersionVariable();
			return;
			}
			}
			
			if (thisScriptVersion[j] > versionOnServer[j]) {
			//alert("no update needed, thanks for beta testing the new version.");
			SetLastCheckedForVersionVariable();
			return;
			}
			}
			
			//alert("no update needed");
			SetLastCheckedForVersionVariable();
			}
			});
	
	try{AppendUserColorSetter();}catch(err){};
}


function AttemptToPreCacheForNextPage() {
	return;  // this is currently not working. (and causing alot of bad images urls)
	
	if (getApparentUrl().indexOf('/photo.php?') == -1) return false;
	try{ 
		var documentSrc=document.body.innerHTML;
		var nextImageOnload = "";
		documentSrcSplit = documentSrc.split('"');
		for (i in documentSrcSplit) {
			if (documentSrcSplit[i].indexOf('(new Image()).src=')>-1) nextImageOnload = documentSrcSplit[i];
		} 
		var nextImage = nextImageOnload.split("'")[1];
		nextImage = nextImage.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
		
		
		nextImage = nextImage.replace('http://ttatic.ak','http://static.ak');
		nextImage = nextImage.replace('https://tecure','https://secure');
		nextImage = nextImage.replace('.net/tafe_image.php?','.net/safe_image.php?');
		nextImage = nextImage.replace('.com/tafe_image.php?','.com/safe_image.php?');
		
		if (nextImage.toLowerCase().indexOf('/hphotos-')>-1) {
			nextImage = nextImage.replace('_s.jpg','_t.jpg');
			nextImage = nextImage.replace('_q.jpg','_t.jpg');
			nextImage = nextImage.replace('_l.jpg','_t.jpg');
			nextImage = nextImage.replace('_a.jpg','_t.jpg');	
			nextImage = nextImage.replace('_n.jpg','_t.jpg');
		}
		
		
		
		StartTimer("Look for PreCache in Cache");
		if (RetrieveFromCache(nextImage, UrlToCacheType(nextImage)) == null) GetColors(nextImage, false);
		RecordTimer("Look for PreCache in Cache");
		
		
		//alert("nextImage = " + nextImage);
		return true;
	}
	catch(err){return false;}
}

function PreCacheChangedProfilePics() {	
	
	
	StartTimer("PreCache Changed Profile Pics");
	var entries = document.getElementsByTagName('div');
	
	var numEntries = entries.length;
	
	
	for (i = 0; i < numEntries; i++) {
		if (entries[i].className == 'clearfix pictures_container') {
			myImages = entries[i].getElementsByTagName('img');
			var numImages = myImages.length;
			
			for (j = 0; j < numImages; j++) {
				var nextImage = (myImages[j].src).split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
				
				nextImage = nextImage.replace('http://ttatic.ak','http://static.ak');
				nextImage = nextImage.replace('https://tecure','https://secure');
				nextImage = nextImage.replace('.net/tafe_image.php?','.net/safe_image.php?');
				nextImage = nextImage.replace('.com/tafe_image.php?','.com/safe_image.php?');
				
				if (nextImage.toLowerCase().indexOf('/hphotos-')>-1) {
					nextImage = nextImage.replace('_s.jpg','_t.jpg');
					nextImage = nextImage.replace('_q.jpg','_t.jpg');
					nextImage = nextImage.replace('_l.jpg','_t.jpg');
					nextImage = nextImage.replace('_a.jpg','_t.jpg');	
					nextImage = nextImage.replace('_n.jpg','_t.jpg');
				}
				
				
				/* Todo: check the the image is not already cached */
				StartTimer("Look for PreCache Profile Pics in Cache");
				if (RetrieveFromCache(nextImage, UrlToCacheType(nextImage)) == null) GetColors(nextImage, false);
				RecordTimer("Look for PreCache Profile Pics in Cache");
			}
			
		}
	}
	RecordTimer("PreCache Changed Profile Pics");
}


function PreCacheAllImagesOnPage() {	
	StartTimer("PreCache All Images on Page");
	
	myImages = document.getElementsByTagName('img');
	var numImages = myImages.length;
	
	for (j = 0; j < numImages; j++) {
		var nextImage = (myImages[j].src).split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
		nextImage = nextImage.replace('http://ttatic.ak','http://static.ak');
		nextImage = nextImage.replace('.net/tafe_image.php?','.net/safe_image.php?');
		nextImage = nextImage.replace('.com/tafe_image.php?','.com/safe_image.php?');
		nextImage = nextImage.replace('https://tecure','https://secure');
		
		if (nextImage.toLowerCase().indexOf('/hphotos-')>-1) {
			nextImage = nextImage.replace('_s.jpg','_t.jpg');
			nextImage = nextImage.replace('_q.jpg','_t.jpg');
			nextImage = nextImage.replace('_l.jpg','_t.jpg');
			nextImage = nextImage.replace('_a.jpg','_t.jpg');	
			nextImage = nextImage.replace('_n.jpg','_t.jpg');
		}
		
		/* Todo: check the the image is not already cached */
		StartTimer("Look for PreCache Profile Pics in Cache");
		if (RetrieveFromCache(nextImage, UrlToCacheType(nextImage)) == null) GetColors(nextImage, false);
		RecordTimer("Look for PreCache Profile Pics in Cache");
	}
	
	
	
	RecordTimer("PreCache All Images on Page");
}


function AddToApplicationsList() {
	return;
	
	StartTimer("Add To Applications List");
	
	var textNode = document.createTextNode("Auto-Colorizer");
	var link = document.createElement('a');
	link.setAttribute('href', "javascript:" + ShowDialog + ";ShowDialog(); return false;");
	link.appendChild(textNode);
	
	var listItem = document.createElement('li');
	listItem.appendChild(link);
	
	var pageNav = document.getElementById("pageNav");
	
	pageNav.insertBefore(listItem, pageNav.firstChild.nextSibling.nextSibling);
	
	RecordTimer("Add To Applications List");
}

function AddToApplicationsListOld() {
	StartTimer("Add To Applications List");
	var presenceBar = document.getElementById("application_icon_garden_root");
	//alert(expandBar.previousSibling.lastChild.lastChild.innerHTML)
	
	var textNode = document.createTextNode("Auto-Colorizer");
	
	var link = document.createElement('a');
	link.setAttribute('href', 'http://www.facebook.com/share.php?u=http%3A%2F%2Fuserscripts%2Eorg%2Fscripts%2Fshow%2F3626&t=Facebook+Auto%2DColorizer%3A+Adds+an+awesome+color+scheme+to+every+facebook+page+based+on+you+friend%27s+photo%2E');
	link.setAttribute('class', 'link_title');
	link.setAttribute('onmousedown', 'new track_moveable(this.parentNode, this);');
	link.setAttribute('style',"background-image: url(https://mywebspace.wisc.edu/ormont/web/facebook/color_logo_16x16.png);");
	link.setAttribute('href', "javascript:" + ShowDialog + ";ShowDialog(); ");
	
	presenceBar.removeChild(presenceBar.lastChild);
	
	var newApplicationIcon = presenceBar.lastChild.cloneNode(true); 
	newApplicationIcon.firstChild.firstChild.setAttribute('href', "javascript:" + ShowDialog + ";ShowDialog(); ");
	
	newApplicationIcon.firstChild.firstChild.firstChild.setAttribute('src', 'https://mywebspace.wisc.edu/ormont/web/facebook/color_logo_16x16.png');
	
	newApplicationIcon.setAttribute('id',"application_icon_garden_2388801018");
	newApplicationIcon.firstChild.firstChild.setAttribute('onmouseover', "applicationDock.MouseOutIconGarden(2388801018);");
	newApplicationIcon.firstChild.firstChild.setAttribute('onmouseoout', "applicationDock.mouseOverIconGarden(2388801018);");
	newApplicationIcon.firstChild.firstChild.setAttribute('id', "application_icon_garden_link_2388801018");
	newApplicationIcon.firstChild.firstChild.firstChild.nextSibling.firstChild.nodeValue = 'Auto-Colorizer';
	
	presenceBar.appendChild(newApplicationIcon);
	
	
	//alert(typeof(stringX));
	//alert(stringX);
	
	//link.setAttribute('onclick', ShowDialog + ";ShowDialog(); return false;");
	//link.setAttribute('href', "javascript:alert('here');");
	/*
	 onloadRegister(
	 function() {
	 window.applicationDock = new ApplicationDock({"6802152230":{"name":"Page Manager","href":"http:\/\/www.facebook.com\/business\/dashboard\/?ref=sb","icon":"http:\/\/photos-g.ak.facebook.com\/photos-ak-sf2p\/v43\/146\/6802152230\/app_4_6802152230_487.gif","class":"ads_and_pages_manager_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/ads_and_pages.gif?2:66945","order":1},"2345053339":{"name":"Developer","href":"http:\/\/www.facebook.com\/developers?ref=sb","icon":"http:\/\/photos-d.ak.facebook.com\/photos-ak-sf2p\/v43\/55\/2345053339\/app_4_2345053339_6541.gif","class":"developer_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/developer.gif?2:66945","order":2},"2344061033":{"name":"Events","href":"http:\/\/www.facebook.com\/events.php?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/event.gif?2:39263","class":"events_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/event.gif?2:25796","order":3},"2305272732":{"name":"Photos","href":"http:\/\/www.facebook.com\/photos\/?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/photo.gif?2:39263","class":"photos_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/photo.gif?2:25796","order":4},"2483740875":{"name":"Picasa","href":"http:\/\/apps.facebook.com\/picasauploader\/","icon":"http:\/\/photos-d.ak.facebook.com\/photos-ak-sf2p\/v43\/147\/2483740875\/app_4_2483740875_1579.gif","new_icon":"http:\/\/photos-d.ak.facebook.com\/photos-ak-sf2p\/v43\/147\/2483740875\/app_2_2483740875_1165.gif","order":5},"2388801017":{"name":"X Big Photo","href":"http:\/\/apps.facebook.com\/bigphoto\/","icon":"http:\/\/photos-b.ak.facebook.com\/photos-ak-sf2p\/v43\/29\/2388801017\/app_4_2388801017_3102.gifXXXX","new_icon":"http:\/\/photos-b.ak.facebook.com\/photos-ak-sf2p\/v43\/29\/2388801017\/app_2_2388801017_2842.gif","order":6},"2420156218":{"name":"Map Friends","href":"http:\/\/apps.facebook.com\/mapfriends\/","icon":"http:\/\/photos-c.ak.facebook.com\/photos-ak-sf2p\/v43\/130\/2420156218\/app_4_2420156218_2567.gif","new_icon":"http:\/\/photos-c.ak.facebook.com\/photos-ak-sf2p\/v43\/130\/2420156218\/app_2_2420156218_2157.gif","order":7},"2386512837":{"name":"Gifts","href":"http:\/\/www.facebook.com\/giftshop.php?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/gift.gif?2:117008","class":"giftbox_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/gift.gif?2:32236","order":8},"2427603417":{"name":"Bumper Sticker","href":"http:\/\/apps.facebook.com\/bumpersticker\/recently_popular_stickers\/list\/1","icon":"http:\/\/photos-b.ak.facebook.com\/photos-ak-sf2p\/v43\/225\/2427603417\/app_4_2427603417_4654.gif","new_icon":"http:\/\/photos-b.ak.facebook.com\/photos-ak-sf2p\/v43\/225\/2427603417\/app_2_2427603417_4268.gif","order":9},"2361831622":{"name":"Groups","href":"http:\/\/www.facebook.com\/groups.php?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/group.gif?2:39263","class":"groups_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/group.gif?2:25796","order":10},"2328908412":{"name":"Marketplace","href":"http:\/\/www.facebook.com\/marketplace\/?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/marketplace.gif?2:42238","class":"classifieds_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/marketplace.gif?2:41989","order":11},"2915120374":{"name":"Mobile","href":"http:\/\/www.facebook.com\/mobile\/?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/mobile.gif?2:103919","class":"mobile_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/mobile_app.gif?2:44077","order":12},"2392950137":{"name":"Video","href":"http:\/\/www.facebook.com\/video\/?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/motion.gif?2:49123","class":"video_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/motion.gif?2:49123","order":13},"2347471856":{"name":"Notes","href":"http:\/\/www.facebook.com\/notes.php?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/note.gif?2:39263","class":"notes_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/note.gif?2:25796","order":14},"2309869772":{"name":"Posted Items","href":"http:\/\/www.facebook.com\/posted.php?ref=sb","icon":"http:\/\/static.ak.fbcdn.net\/images\/app_icons\/post.gif?2:39263","class":"posted_app_link","new_icon":"http:\/\/static.ak.fbcdn.net\/images\/icons\/post.gif?2:26575","order":15}}, {});
	 }
	 );
	 
	 '<div class="icon_garden_inner"><a id="',this._getApplicationIconGardenLinkId(appID),'"',' onmouseover="applicationDock.mouseOverIconGarden(',appID,');
	 "',' onmouseout="applicationDock.MouseOutIconGarden(',appID,');
	 "',' href="',appInfo['href'],'">','<img src="',appInfo['new_icon'],'" />','<div class="titletip">','<strong>',htmlize(appInfo['name']),'</strong>','</div>','</a>','</div>'];
	 
	 _renderApplicationIconGardenItem:function(appID){
	 var appInfo=this.applications[appID];
	 var markupArr=['<div class="icon_garden_inner">',
	 '<a id="',
	 this._getApplicationIconGardenLinkId(appID),
	 '"',
	 ' onmouseover="applicationDock.mouseOverIconGarden(',appID,');
	 "',' onmouseout="applicationDock.MouseOutIconGarden(',appID,');
	 "',
	 ' href="',
	 appInfo['href'],
	 '">',
	 '<img src="',
	 appInfo['new_icon'],
	 '" />',
	 '<div class="titletip">',
	 '<strong>',
	 htmlize(appInfo['name']),
	 '</strong>',
	 '</div>',
	 '</a>',
	 '</div>'];
	 return markupArr.join('');
	 }
	 
	 ,mouseOverIconGarden:function(appID){if(shown(this.menuWrapper)){return;}
	 */
	
	/*
	 link.setAttribute('onmouseover', 
	 "var fbAutoColorizerDialog = new pop_dialog(); \
	 fbAutoColorizerDialog.show_dialog('<div class=dialog_loading>'+tx('sh01')+'</div>'); \
	 getDialog = new Ajax(); \
	 getDialog.onDone = function(ajax_obj,responceText){ \
	 alert(responceText); \
	 } \
	 " );
	 */
	
	//alert(ShowDialog);
	
	/*
	 var divInside = document.createElement('div');
	 divInside.setAttribute('class', 'container');
	 divInside.setAttribute('ID', '2437461801');
	 
	 var divOutside = document.createElement('div');
	 divOutside.setAttribute('class', 'list_item');	
	 
	 link.appendChild(textNode);
	 divInside.appendChild(link);
	 divOutside.appendChild(divInside);
	 expandBar.previousSibling.lastChild.appendChild(divOutside);
	 */
	RecordTimer("Add To Applications List");
}

function IsInChatBar(ImgNode) {
	// Note: "profile_status clearfix" is the class of the parient's parient of a photo in the chat bar. 
	if (ImgNode.getAttribute("class") == "chat_info_pic") return true;
	
	
	return (ImgNode.parentNode.parentNode.getAttribute("class") == "profile_status clearfix");
}


function ShowDialog() {
	// So it seems pop_dialog() doesn't work anymore.
	
	var fbAutoColorizerDialog = new pop_dialog(); 
	fbAutoColorizerDialog.show_dialog('<div class=dialog_loading>'+tx('sh01')+'</div>'); 
	//fbAutoColorizerDialog.make_modal();
	//fbAutoColorizerDialog.fade_out(1000);
	
	//fbAutoColorizerDialog.show_choice("hello2","how are you?",tx('pk01'),function(){}, tx('sh02'),function(){});
	
	//fbAutoColorizerDialog.show_message("Facebook Auto-Colorizer", "This is work in progress.");
	
	
	var content = "<table><tbody><tr><td class='label'><img src='https://mywebspace.wisc.edu/ormont/web/facebook/color_logo_16x16.png' height='64' width='64'></td><td class='label' width='64'><br></td><td class='label'><p align='right'>\
	<a href='http://www.facebook.com/share.php?u=http://userscripts.org/scripts/show/3626&amp;t=Facebook+Auto-Colorizer:+Adds+an+awesome+color+scheme+to+every+facebook+page+based+on+you+friend%27s+photo.'>\
	<img src='http://static.ak.facebook.com/images/share/facebook_share_icon.gif'><img src='http://wisc.facebook.com/images/share_options/share_button_ff_mac.gif'></a><br>\
	<br><a href='http://userscripts.org/scripts/show/3626'>Facebook Auto-Colorizer Install Page</a><br><br><a href='http://wisc.facebook.com/inbox/?compose&amp;id=8638838'>Send Author a Message</a>\
	<br><br>[future: Simple Color Controls]<br>Chat bar: \
	<input type=radio name=clearChatBar onclick="
	+ "'document.cookie = \"clearChatBar=colored; expires=\\\"Fri, 11 Apr 2011 18:30:19 GMT\\\"; path=/\"'"
	+ ">  \
	Colored \
	<input type=radio name=clearChatBar onclick="
	+ "'document.cookie = \"clearChatBar=clear; expires=\\\"Fri, 11 Apr 2011 18:30:19 GMT\\\"; path=/\"'"
	+ ">  \
	Clear \
	<input type=radio name=clearChatBar onclick="
	+ "'document.cookie = \"clearChatBar=colorgel; expires=\\\"Fri, 11 Apr 2011 18:30:19 GMT\\\"; path=/\"'"
	+ ">  \
	Color Gel</p>\
	<br><center>\
	<form name='_xclick' action='https://www.paypal.com/us/cgi-bin/webscr' method='post'>\
	<input type='hidden' name='cmd' value='_xclick'>\
	<input type='hidden' name='business' value='autocolorizer@gmail.com '>\
	<input type='hidden' name='item_name' value='Thanks for adding color!'>\
	<input type='hidden' name='currency_code' value='USD'>\
	Amount <input type='' name='amount' value='$15.00'>\
	<input type='image' src='http://www.paypal.com/en_US/i/btn/btn_donate_LG.gif' border='0' name='submit' alt='Make payments with PayPal - it's fast, free and secure!'>\
	</form></center>\
	\
	</td></tr></tbody></table>";
	
	fbAutoColorizerDialog.show_message("Facebook Auto-Colorizer", content);
	document.getElementById('dialog_button1').addEventListener("click", function() {window.location.href=window.location.href}, false);
	/*	
	 var entries = document.getElementsByTagName('div');
	 var numEntries = entries.length;
	 
	 var dialogBody = "";
	 for (i = 0; i < numEntries; i++) {
	 if (entries[i].className == 'dialog_body') {
	 dialogBody = entries[i];
	 }
	 }
	 
	 if (typeof(dialogBody) == "string") return;  //Can't find the dialog box body div tag.
	 
	 var div = document.createElement('div');
	 
	 
	 div.innerHTML = content;	
	 
	 dialogBody.replaceChild(div, dialogBody.firstChild);
	 */
	
	return;
	
	
}



function CheckForTemporaryStoredVariables() {
	
	//alert("GetStorage('clearChatBar') == " + GetStorage('clearChatBar'));
	var clearChatBar = GetStorageCookie('clearChatBar');
	if (clearChatBar != null && clearChatBar != "") {
		//alert("Found clearChatBar = " + clearChatBar)
		if ((clearChatBar == "clear") || (clearChatBar == "colored") || (clearChatBar == "colorgel")) {
			//alert("Settings clearChatBar = " + clearChatBar); 
			try { StoreItem('clearChatBar',clearChatBar); } 
			catch(err) { alert("Error: Can not write to storage.\n\nabout:config key was reset; Restart firefox."); }
		}
		DeleteStorage("clearChatBar");
	}
}

function AddScript() {
	return;
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = 'https://mywebspace.wisc.edu/ormont/web/facebook/facebookautocolorizer.user.js';
	headID.appendChild(newScript);
}

function AjaxUpdaterFunction(){
	if (window.document.body != null) {
		if (window.document.body.getAttribute('oldPhotoUrl') == window.document.body.getAttribute('photoUrl')) {
			
			var photoUrl = window.document.body.getAttribute('photoUrl');
			
			window.document.body.setAttribute('photoUrl','');
			
			// alert("photoUrl = " + photoUrl);
			
			//AjaxGet({                     
			//  method: 'GET',
			//  url: 'http://pages.cs.wisc.edu/~ormont/cgi-bin/facebook/color-pallette.pl?url=' + photoUrl + '&ver=' + thisScriptVersion.join("."),
			//  headers: {
			//	  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			//	  'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
			//  },
			//  onload: function(responseDetails) { WorkOnXMLResponse(responseDetails, photoUrl, true, true); }
			//});
			
			
			if (colorPaletteAjaxInFlight != photoUrl) {
				// Global variable
				colorPaletteAjaxInFlight = photoUrl;
				lookInCacheThenGetColors(photoUrl, true, true);
			} 
		}
	}
	//else throw("window.document.body == null");
}

function pageChangeWatcher() {
	if (lastDocUrl != getApparentUrl()) {
		OnPageChange();
	}	
}

function AjaxWatcherFunction(){
	
	lookForPhotoUrl();
	AjaxUpdaterFunction();
}


function WatchForAJAXPageChanges() {
	//updater = window.setInterval(AjaxUpdaterFunction, 15);
	watcher = window.setInterval(AjaxWatcherFunction, 1000);
	pageChangeWatcherTimer = window.setInterval(pageChangeWatcher, 50);
}


// Note: won't work for a base64 encoded image.
function getBackgroundImageUrlFromStyle(domNode) {
	var computedStyle = document.defaultView.getComputedStyle(domNode, "");
	if (computedStyle == null) return "";
	var url = computedStyle.backgroundImage;
	if (url.indexOf('url("')>-1) url = url.slice(5,-2); /* Remove url("...") for firefox */
	if (url.indexOf('url(')>-1) url = url.slice(4,-1); /* Remove url(...) for chrome */
	return url;
}

function lookForPhotoUrl() {
	StartTimer("Looking for image");
	
	var photoUrl;
	var url; 
	
	var logFound = false; //true;
	
	//look specifically for a popup window search
	try {
		url = document.getElementById('pop_content').getElementsByTagName('img')[0].src;
		if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || /*url.toLowerCase().indexOf('.gif')>-1 ||*/ url.toLowerCase().indexOf('.png')>-1) {
			photoUrl = url;
			if (logFound == true) Log("Found image: Popup window search [" + photoUrl + "]");
		}
	}
	catch(err){}
	
	
	
	//look specifically for a photo album image
	if ((typeof photoUrl == 'undefined') && (getApparentUrl().indexOf('/photo.php?')>-1)) {
		try {
			if (window.document.body != null) {
				url = document.getElementById('myphoto').src;
				if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
					photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
					currentImgDom = document.getElementById('myphoto');
					if (logFound == true) Log("Found image: Photo album image [" + photoUrl + "]");
				}
			}
		}
		catch(err) {
			//Log("Could not find photo using: document.getElementById('myphoto')");
		}
	}
	
	
	//look specifically for a popup box when you mouse over small images of people & pages (HovercardOverlay)
	if (typeof photoUrl == 'undefined') {
		try {
			if (window.document.body != null) {
				var myChildren = window.document.body.childNodes;
				var numEntries = myChildren.length;
				for (i = 0; i < numEntries; i++) {
					if ((myChildren[i].className != null) && (myChildren[i].className.indexOf('HovercardOverlay') >-1)) {
						var myImages = myChildren[i].getElementsByTagName('img');
						if (myImages.length > 0) {
							
							// url = document.defaultView.getComputedStyle(myImages[0], "").backgroundImage;
							// if (url.indexOf('url("')>-1) url = url.slice(5,-2); /* Remove url("...") fore firefox */
							// if (url.indexOf('url(')>-1) url = url.slice(4,-1); /* Remove url(...) for chrome */
							
							url = getBackgroundImageUrlFromStyle(myImages[0]);
							
							if ((url.toLowerCase().indexOf(".svg")>-1) && (url.indexOf("safe_image.php")>-1) && (url.indexOf("upload.wikimedia.org")>-1)) {
								if (url.indexOf("?")>-1) url = url + "&newextension=.png";
								else url = url + "?newextension=.png";
							}
							
							if ((url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || /*url.toLowerCase().indexOf('.gif')>-1 ||*/ url.toLowerCase().indexOf('.png')>-1) && (url.indexOf('platform.ak.facebook.com')==-1) && (url.indexOf('static.ak.facebook.com')==-1)) {
								photoUrl = url;
								currentImgDom = myImages;
								i = numEntries;  /* Break from the loop. */
								if (logFound == true) Log("Found image: Popup box when you mouse over small images [" + photoUrl + "]");
							}
						}
					}
				}
				
			}
		}
		catch(err) {
			Log("Error in searching for Hovercard Overlay: " + err);
		}
	}
	
	
	
	//look specifically for the album theater.
	if (typeof photoUrl == 'undefined') {
		try {
			if ((window.document.body != null) && (document.getElementById('fbPhotoTheater') != null)) {
				var myImages = document.getElementById('fbPhotoTheater').getElementsByTagName('img');
				
				var numEntries = myImages.length;
				for (i = 0; i < numEntries; i++) {
					url = myImages[i].src;
					if ((url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.XXXgif')>-1 || url.toLowerCase().indexOf('.XXXpng')>-1) && (url.indexOf('UIRoundedImage.png')==-1) && (url.indexOf('platform.ak.facebook.com')==-1)) {
						photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
						currentImgDom = myImages[i];
						i = numEntries;  // Break from the loop.
						if (logFound == true) Log("Found image: Album theater [" + photoUrl + "]");
					}
				}
			}
		}
		catch(err) {
			//Log("Error in searching for album theater image: " + err);
		}
	}
	
	
	//look specifically for a photo album image
	if ((typeof photoUrl == 'undefined') && (getApparentUrl().indexOf('/photo.php?')>-1)) {
		try {
			if (window.document.body != null) {
				if (document.getElementById('myphoto') != null) {
					url = document.getElementById('myphoto').src;
					if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
						photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
						currentImgDom = document.getElementById('myphoto');
						if (logFound == true) Log("Found image: Photo album image [" + photoUrl + "]");

					}
				}
			}
		}
		catch(err) {
			//Log("Could not find photo using: document.getElementById('myphoto')");
		}
	}
	
	//look specifically for a group image
	if ((typeof photoUrl == 'undefined') && (getApparentUrl().indexOf('/group.php?')>-1) || getApparentUrl().indexOf('?sk=group_')>-1) {
		try {
			if (window.document.body != null) {
				try {
					url = document.getElementById('pagelet_group_header').getElementsByTagName('img')[0].src;
				}
				catch(err) {
					Log("Error getting group image.");
					url = "";
				}
				
				if (url.toLowerCase().indexOf('facebook.com')==-1 && (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || /*url.toLowerCase().indexOf('.gif')>-1 ||*/ url.toLowerCase().indexOf('.png')>-1)) {
					photoUrl = url;
					currentImgDom = document.getElementById('profileimage').getElementsByTagName('img')[0];
				}
				
				// An image wasn't found or was a silhouette image.
				if (typeof photoUrl == 'undefined') {
					// Load first image in the center area.  It should be the first user's photo. 
					
					var entries = document.getElementById('contentArea').getElementsByTagName('img');
					var numEntries = entries.length;
					for (i = 0; i < numEntries; i++) {
						url = entries[i].src;
						if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || /*url.toLowerCase().indexOf('.gif')>-1 ||*/ url.toLowerCase().indexOf('.png')>-1) {
							photoUrl = url;
							if (logFound == true) Log("Found image: Group image 1 [" + photoUrl + "]");
						}
					}
				}
			}
		}
		catch(err) {
			//Log("Could not find photo using: document.getElementById('myphoto')");
		}
	}
	
	
	//look specifically for a event photo
	if ((typeof photoUrl == 'undefined') && (getApparentUrl().indexOf('/event.php')>-1)) {
		try {
			if (window.document.body != null) {
				url = document.getElementById('leftColContainer').getElementsByTagName('img')[0].src;
				if ((url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 /*|| url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1*/) && (url.indexOf('UIRoundedImage.png')==-1) && (url.indexOf('platform.ak.facebook.com')==-1)) {
					photoUrl = url;
					currentImgDom = document.getElementById('leftColContainer').getElementsByTagName('img')[0];
					if (logFound == true) Log("Found image: Event photo [" + photoUrl + "]");
				}
			}
		}
		catch(err) {
			//Log("Could not find photo using: document.getElementById('home_stream').getElementsByTagName('img')[0].src");
		}
	}
	
	//look specifically for the top image on the home page.
	if ((typeof photoUrl == 'undefined') /*&& (getApparentUrl().indexOf('/home.php')>-1) forgot about the facebook.com/ case */) {
		try {
			if (window.document.body != null) {
				var myDom = document.getElementById('home_stream');
				if (myDom != null) {
					var myImages = myDom.getElementsByTagName('img');
					var numEntries = myImages.length;
					for (i = 0; i < numEntries; i++) {
						url = myImages[i].src;
						if ((url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.XXXgif')>-1 || url.toLowerCase().indexOf('.png')>-1) && (url.indexOf('UIRoundedImage.png')==-1) && (url.indexOf('platform.ak.facebook.com')==-1)) {
							photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
							currentImgDom = myImages[i];
							i = numEntries;  // Break from the loop.
							if (logFound == true) Log("Found image: Top image on the home page [" + photoUrl + "]");
						}
					}
				}
			}
		}
		catch(err) {
			Log("Could not find photo using: document.getElementById('home_stream').getElementsByTagName('img')[0].src");
		}
	}
	
	
	//look specifically for a video page photo
	if ((typeof photoUrl == 'undefined') && (getApparentUrl().indexOf('/video.php?')>-1)) {
		try {
			if (window.document.body != null) {
				var myDom = document.getElementById('player');
				if (myDom != null) {
					var entries = myDom.getElementsByTagName('embed');
					if (entries.length > 0) {
						var embedVideoDom = entries[0];
						if (embedVideoDom != null) {
							var flashvars = embedVideoDom.getAttribute("flashvars");
							if (flashvars != null) {
								var flashvarsArray = flashvars.split('&');
								var numEntries = flashvarsArray.length;
								for (i = 0; i < numEntries; i++) {
									if(flashvarsArray[i].indexOf('thumb_url=')>-1) {
										photoUrl = unescape(flashvarsArray[i].slice(10)).split('_b.jpg').join('_q.jpg');
										currentImgDom = embedVideoDom;
										i = numEntries; // break out of for loop
										if (logFound == true) Log("Found image: Video page photo [" + photoUrl + "]");
									}
									
								}
								
							}
						}
						
					}
				}
			}
		}
		catch(err) {
			//Log("Error in searching for video page photo: " + err);
		}
	}
	
	
	//look specifically for a profile photo
	if ((typeof photoUrl == 'undefined') && (window.document.body != null)) {
		try {
			var profilePic = document.getElementById('profile_pic');
			if (profilePic != null) { 
				url = profilePic.src;
				if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
					if (url.indexOf('silhouette')==-1) {
						photoUrl = url;
						currentImgDom = profilePic;
						if (logFound == true) Log("Found image: Profile photo [" + photoUrl + "]");
					}
				}
			}
		}
		catch(err) {
			Log("Error in finding profile photo: " + err);
		}
	}
	
	
	//look specifically for a page photo
	if ((typeof photoUrl == 'undefined') && (window.document.body != null)) {
		try {
			var profileDiv =  document.getElementById('pagelet_profile_picture');
			if (profileDiv != null) {
				var entries = profileDiv.getElementsByTagName('img');
				if (entries.length > 0) {
					
					var profilePic = entries[0];
					
					url = profilePic.src;
					if ((url.toLowerCase().indexOf(".svg")>-1) && (url.indexOf("safe_image.php")>-1) && (url.indexOf("upload.wikimedia.org")>-1)) {
						if (url.indexOf("?")>-1) url = url + "&newextension=.png";
						else url = url + "?newextension=.png";
					}
					
					if ((url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1)  && (url.indexOf('static.ak.facebook.com')==-1)) {
						if (url.indexOf('silhouette')==-1) {
							photoUrl = url;
							currentImgDom = profilePic;
							if (logFound == true) Log("Found image: Page photo [" + photoUrl + "]");
						}
					}
				
				}
			}
		}
		catch(err) {
			Log("Error in finding page photo: " + err);
		}
	}
	
	
	//look specifically for a share.php selected photo (!!! doesn't work !!!)
	if (false && getApparentUrl().indexOf('/share.php?')>-1) {
		if (typeof photoUrl == 'undefined') {
			try {
				var entries = document.getElementsByTagName('div');
				var numEntries = entries.length;
				for (i = 0; i < numEntries; i++) {
					if (entries[i].className == 'thumbnail thumbnail_selected') {
						// NEED TO GET URL HERE!!!
						//url = ??????;
						if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
							photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
							//currentImgDom = ???
							if (logFound == true) Log("Found image: share.php photo [" + photoUrl + "]");
						}
						//alert("Found share pic: " + photoUrl);
						//Log("here 0.5");
					}
				}
			}
			catch(err) {}
		}
	}
	
	
	myImages = document.getElementsByTagName('img');
	
	//look specifically for a group image
	if (typeof photoUrl == 'undefined') {
		if (getApparentUrl().indexOf('/group.php?')>-1) {
			for (var i=0; i<myImages.length; i++) {
				url = myImages[i].src;
				if (((url.indexOf('/object/')>-1)) && (url.indexOf('t_default.jpg')==-1)) {
					if (typeof photoUrl == 'undefined') {
						if (!IsInChatBar(myImages[i])) {
							if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
								photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
								currentImgDom = myImages[i];
								if (logFound == true) Log("Found image: Group image 2 [" + photoUrl + "]");
							}
						}
					}
				}
			}
		}
	}
	
	//look specifically for a user image on a profile page
	if (typeof photoUrl == 'undefined') {
		if (getApparentUrl().indexOf('/profile.php?')>-1 || getApparentUrl().indexOf('/s.php?')>-1) {
			for (var i=0; i<myImages.length; i++) {
				url = myImages[i].src;
				//Log("here 1.5: " + url);
				if (((url.indexOf('http://profile.')>-1)) && (url.indexOf('t_default.jpg')==-1)) {
					if (typeof photoUrl == 'undefined') {
						if (!IsInChatBar(myImages[i])) {
							if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
								photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
								currentImgDom = myImages[i];
								
								photoUrl = undefined;
								if (logFound == true) Log("Found image: Profile page [" + photoUrl + "]");
							}
						}
					}
				}
			}
		}
	}
	
	//look for a group or event image
	if (typeof photoUrl == 'undefined') {
		for (var i=0; i<myImages.length; i++) {
			url = myImages[i].src;
			
			if (((url.indexOf('/gpic/')>-1) || (url.indexOf('/ppic/')>-1) || (url.indexOf('/object')>-1)) && (url.indexOf('t_default.jpg')==-1) && (url.indexOf('/object/')==-1)) {
				if (typeof photoUrl == 'undefined') {
					if (!IsInChatBar(myImages[i])) { 
						if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
							photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
							currentImgDom = myImages[i];
							if (logFound == true) Log("Found image: Group or event image [" + photoUrl + "]");
						}
					}
				}
			}
		}
	}
	
	
	
	//look for a user image
	if (typeof photoUrl == 'undefined') {
		try {
			var jewelCaseDOMnode = document.getElementById('jewelCase');
			for (var i=0; i<myImages.length; i++) {
				url = myImages[i].src;
				if (((url.indexOf('http://photos-')>-1) || (url.indexOf('http://profile.')>-1)  || (url.indexOf('https://fbcdn-profile-')>-1) || (url.indexOf('http://photos.')>-1) || (url.indexOf('http://pe-')>-1) || (url.indexOf('http://vthumb.')>-1)) && (url.indexOf('/app_')==-1)) {
					
					if (typeof photoUrl == 'undefined') {
						if (!IsInChatBar(myImages[i])) {
							if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
								var badImage = false;
								var temp = myImages[i];
								
								while ((temp.parentNode != document) && (badImage == false)) { if (temp == jewelCaseDOMnode) badImage = true; temp = temp.parentNode; }
								
								if (badImage == false) {
									photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
									currentImgDom = myImages[i];
									if (logFound == true) Log("Found image: User image [" + photoUrl + "]");
								}
								//else Log("here 4 -- blocked: " + url);
							}
							
						}
					}
				}
			}
		}
		catch(err) {
			Log("Error in looking for a user image: " + err);
		}
	}
	
	
	//look for a external image, normally on 'like' pages
	if (typeof photoUrl == 'undefined') {
		try {
			for (var i=0; i<myImages.length; i++) {
				url = myImages[i].src;
				
				if ((url.toLowerCase().indexOf(".svg")>-1) && (url.indexOf("safe_image.php")>-1) && (url.indexOf("upload.wikimedia.org")>-1)) {
					if (url.indexOf("?")>-1) url = url + "&newextension=.png";
					else url = url + "?newextension=.png";
				}
				
				if ((url.indexOf('http://external.ak.fbcdn.net/safe_image.php?')>-1) || (url.indexOf('https://external.ak.fbcdn.net/safe_image.php?')>-1) || (url.indexOf('https://www.facebook.com/safe_image.php?')>-1) || (url.indexOf('http://www.facebook.com/safe_image.php?')>-1) )  {
					//          http://external.ak.fbcdn.net/safe_image.php?d=7834fbc76f4012743c7218ee7a0baccf&w=200&h=600&url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F67%2FSuzanne_Malveaux_080221-N-4965F-068.JPEG%2F720px-Suzanne_Malveaux_080221-N-4965F-068.JPEG
					// example: http://external.ak.fbcdn.net/safe_image.php?d=7834fbc76f4012743c7218ee7a0baccf&w=200&h=600&url=http://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Suzanne_Malveaux_080221-N-4965F-068.JPEG/720px-Suzanne_Malveaux_080221-N-4965F-068.JPEG
					//    from: http://www.facebook.com/pages/Suzanne-Malveaux/109321025752609
					if (typeof photoUrl == 'undefined') {
						if (!IsInChatBar(myImages[i])) {
							if ((url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) && (url.indexOf('static.ak.facebook.com')==-1)) {
								photoUrl = url; //.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
								currentImgDom = myImages[i];
								if (logFound == true) Log("Found image: External image [" + photoUrl + "]");
							}
						}
					}
				}
			}
		}
		catch(err) {
			Log("Error in looking for external image: " + err);
		}
	}
	
	
	
	RecordTimer("Looking for image");
	
	//if (typeof photoUrl == 'undefined') alert("photoUrl = " + undefined);
	//else alert("photoUrl = " + photoUrl);
	
	
	//if (!((photoUrl.toLowerCase().indexOf('.jpg')>-1 || photoUrl.toLowerCase().indexOf('.gif')>-1 || photoUrl.toLowerCase().indexOf('.png')>-1))) {
	//Todo: remove this check
	
	//alert("hmm... " + photoUrl);
	//}
	
	if (typeof photoUrl != 'undefined') {
		photoUrl = photoUrl.replace('http://ttatic.ak','http://static.ak');
		photoUrl = photoUrl.replace('https://t-hphotos-','https://s-hphotos-');
		photoUrl = photoUrl.replace('https://tecure','https://secure');
		photoUrl = photoUrl.replace('.net/tafe_image.php?','.net/safe_image.php?');
		photoUrl = photoUrl.replace('.com/tafe_image.php?','.com/safe_image.php?');
		
		photoUrl = photoUrl.replace('_s.jpg','_t.jpg');
		photoUrl = photoUrl.replace('_q.jpg','_t.jpg');
		photoUrl = photoUrl.replace('_l.jpg','_t.jpg');
		photoUrl = photoUrl.replace('_a.jpg','_t.jpg');	
		photoUrl = photoUrl.replace('_n.jpg','_t.jpg');
	
	}
	
	if (typeof photoUrl != 'undefined') {
		if (photoUrl != window.document.body.getAttribute('oldPhotoUrl')) {
			//Log("photoUrl changed from '" + window.document.body.getAttribute('oldPhotoUrl') + "' to '" + photoUrl + "'.");
			window.document.body.setAttribute('photoUrl',photoUrl);
			window.document.body.setAttribute('oldPhotoUrl',photoUrl);
		}
	}
	
	if (typeof photoUrl != 'undefined') return photoUrl;
	else return null;
}

function TakeScreenShot() {
	chrome.tabs.captureVisibleTab(null, null, ProcessScreenShot);	
}

function ProcessScreenShot(dataUrl) {
	Log("dataUrl = ");
	Log(dataUrl);
}

function SetStorageCookie(key,value) {
	//globalStorage[''][key] = value;
	
	// Global storage doesn't work with greasemonkey, so using cookies....
	var date = new Date();
	date.setTime(date.getTime()+120);
	document.cookie = key+"="+value+"; expires="+date.toGMTString()+"; path=/";
}

function GetStorageCookie(key) {
	//return globalStorage[''][key];
	
	try {  
		// Global storage doesn't work with greasemonkey, so using cookies....
		var nameEQ = key + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	catch(err) { /* Do Nothing */; }
	
}

function DeleteStorageCookie(key) {
	//globalStorage[document.location.host || ".localdomain"][key] = null;
	
	// Global storage doesn't work with greasemonkey, so using cookies....
	document.cookie = key+"=; expires=-1; path=/";
}



function EnableColorForAlbumPics() {
	return; // Don't think this work any more.
	
	StartTimer("Enable Color For Album Pics");
	
	if (document.getElementById("photonav_next")) {
		document.getElementById("photonav_next").addEventListener("click", AjaxWatcherFunction, false); 
		//document.getElementById("photonav_next").addEventListener("click", AjaxUpdaterFunction, false); 
		AjaxInserters[0] = setInterval('document.getElementById("photonav_next").addEventListener("click", ' + AjaxWatcherFunction + ', false)', 1000 );
		//AjaxInserters[1] = setInterval('document.getElementById("photonav_next").addEventListener("click", ' + AjaxUpdaterFunction + ', false)', 1000 );
		
		//setTimeout('document.getElementById("photonav_next").onclick = ""', 1 );		// Disabled when I got AJAX change watcher running for albums -jwo 01-04-08
		//setInterval('document.getElementById("photonav_next").onclick = ""', 1000 );	// Disabled when I got AJAX change watcher running for albums -jwo 01-04-08
	}
	if (document.getElementById("photonav_prev")) {
		document.getElementById("photonav_prev").addEventListener("click", AjaxWatcherFunction, false); 
		//document.getElementById("photonav_prev").addEventListener("click", AjaxUpdaterFunction, false); 
		AjaxInserters[2] = setInterval('document.getElementById("photonav_prev").addEventListener("click", ' + AjaxWatcherFunction + ', false)', 1000 );
		//AjaxInserters[3] = setInterval('document.getElementById("photonav_prev").addEventListener("click", ' + AjaxUpdaterFunction + ', false)', 1000 );
		
		//setTimeout('document.getElementById("photonav_prev").onclick = ""', 1 );		// Disabled when I got AJAX change watcher running for albums -jwo 01-04-08
		//setInterval('document.getElementById("photonav_prev").onclick = ""', 1000 );	// Disabled when I got AJAX change watcher running for albums -jwo 01-04-08
	}
	
	RecordTimer("Enable Color For Album Pics");
}

function PreCacheAlbumPics() {
	StartTimer("PreCache Album Pics");
	var entries = document.getElementsByTagName('div');
	var numEntries = entries.length;
	
	var myImages = document.getElementsByTagName('img');
	for (var i=0; i<myImages.length; i++) {
		url = myImages[i].src;
		if (url.indexOf('http://photos-')>-1) {
			
			if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
				photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
				
				photoUrl = photoUrl.replace('http://ttatic.ak','http://static.ak');
				photoUrl = photoUrl.replace('https://t-hphotos-','https://s-hphotos-');
				photoUrl = photoUrl.replace('https://tecure','https://secure');
				photoUrl = photoUrl.replace('.net/tafe_image.php?','.net/safe_image.php?');
				photoUrl = photoUrl.replace('.com/tafe_image.php?','.com/safe_image.php?');
				
				if (photoUrl.toLowerCase().indexOf('/hphotos-')>-1) {
					photoUrl = photoUrl.replace('_s.jpg','_t.jpg');
					photoUrl = photoUrl.replace('_q.jpg','_t.jpg');
					photoUrl = photoUrl.replace('_l.jpg','_t.jpg');
					photoUrl = photoUrl.replace('_a.jpg','_t.jpg');	
					photoUrl = photoUrl.replace('_n.jpg','_t.jpg');
				}
				
				
				StartTimer("Look for PreCache Album Pics in Cache");
				if (RetrieveFromCache(photoUrl, UrlToCacheType(photoUrl)) == null) GetColors(photoUrl, false, false);
				RecordTimer("Look for PreCache Album Pics in Cache");
				
			}
			
		}
	}
	RecordTimer("PreCache Album Pics");
}


function PreCacheNextPhoto() {
	
	/*
		
	var scriptNode = document.createElement("script");
	var imageUrls = new Array();
	
	try{
		var p = PhotoTheater.position;
		var i=1;
		for (i=p+1;i<=p+6;i++)
		{
			imageUrls.push(PhotoTheater.cache.image[i].url);
		}
	} catch(err) {}
	
	*/
	
	var scriptNode = document.createElement("script");
	
	//scriptNode.innerText = "window.document.body.setAttribute('nextPhoto',PhotoTheater.cache.image[PhotoTheater.position + 1].url); window.document.body.setAttribute('nextPhotoParsed','false'); document.getElementById('photoTheaterNextScript').parentNode.removeChild(document.getElementById('photoTheaterNextScript'));";
	
	scriptNode.setAttribute('id', 'photoTheaterNextScript');
	var scrt = "if (typeof PhotoTheater != 'undefined') { var imageUrls = new Array();var p = PhotoTheater.position; var t = PhotoTheater.total;var i=1; for (i=p-4;i<=p+4;i++){try{if (i != 0 && i>=1 && i<=t+1) imageUrls.push(PhotoTheater.cache.image[i].url);} catch(err) {};};  window.document.body.setAttribute('nextPhoto',imageUrls.join(' ')); window.document.body.setAttribute('nextPhotoParsed','false'); } document.getElementById('photoTheaterNextScript').parentNode.removeChild(document.getElementById('photoTheaterNextScript'));";
	var textNode = document.createTextNode(scrt);
	scriptNode.appendChild(textNode);
	scriptNode.type = 'text/javascript';
	document.head.appendChild(scriptNode); 
	
	setTimeout(
		function() {
			if (window.document.body.getAttribute('nextPhotoParsed') == 'false') {
			
			   var imageUrls = window.document.body.getAttribute('nextPhoto').split(' ');
			   
			   //Log("imageUrls = " + imageUrls);
			   
			   for (i in imageUrls) {
			   
					var url = imageUrls[i];
					
					if (url.toLowerCase().indexOf('.jpg')>-1 || url.toLowerCase().indexOf('.jpeg')>-1 || url.toLowerCase().indexOf('.gif')>-1 || url.toLowerCase().indexOf('.png')>-1) {
						photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
						
						photoUrl = photoUrl.replace('http://ttatic.ak','http://static.ak');
						photoUrl = photoUrl.replace('https://t-hphotos-','https://s-hphotos-');
						photoUrl = photoUrl.replace('https://tecure','https://secure');
						photoUrl = photoUrl.replace('.net/tafe_image.php?','.net/safe_image.php?');
						photoUrl = photoUrl.replace('.com/tafe_image.php?','.com/safe_image.php?');

						photoUrl = photoUrl.replace('_s.jpg','_t.jpg');
						photoUrl = photoUrl.replace('_q.jpg','_t.jpg');
						photoUrl = photoUrl.replace('_l.jpg','_t.jpg');
						photoUrl = photoUrl.replace('_a.jpg','_t.jpg');	
						photoUrl = photoUrl.replace('_n.jpg','_t.jpg');
					
						
						StartTimer("Look for PreCache Album Pic in Cache");
						if (RetrieveFromCache(photoUrl, UrlToCacheType(photoUrl)) == null) {
							GetColors(photoUrl, false, false);
							Log("Precached next photo: " + photoUrl);
						} //else Log("Already precached next photo: " + photoUrl);
						RecordTimer("Look for PreCache Album Pic in Cache");
						
					}
				}
				window.document.body.setAttribute('nextPhotoParsed','true');
			} else Log("Missed event for PreCacheNextPhoto().");
		}, 1000
	);
						  
}


function SetLastCheckedForVersionVariable() {
	var now = new Date();
	try { StoreItem('lastCheckedForVersion',"" + now.getTime()); } //make sure it's a string as firefox can't store a 42bit integer
	catch(err) { Log("Error: Can not write to version key.\n\nabout:config key was reset; Restart firefox."); }
	return;
}

function IsJustInstalled() {
	if (TestStorage() == false) return false; // This disables function incase there is no storage for variables.
	
	var installDate = 0;
	try { 
		//if (typeof GetItem('installDate') != 'undefined' && GetItem('installDate')) var installDate = GetItem('installDate');
		if (GetItem('installDate') != null && GetItem('installDate')) var installDate = GetItem('installDate');
		else installDate = 0;   
	}
	catch(err) { installDate = 0; }
	
	if (installDate == 0) { Log("Just Installed"); return true; }
	else return false;
}

function TestLocalStore() {
	var rand = Math.random()*4294967296;
	var goodTests = 0;
	try {StoreItem('localStoreTest', rand);} catch(err) {}
	try {if (localStorage.getItem('localStoreTest') == rand) goodTests++;} catch(err) {}
	try {localStorage.removeItem('localStoreTest');} catch(err) {}
	try {if (localStorage.getItem('localStoreTest') == null) goodTests++;} catch(err) {}
	
	if (goodTests == 2) return true; // All tests were successful.
	else return false; // Not all tests were successful.
}

function TestStorage() {
	var rand = "" + Math.random()*4294967296;
	var goodTests = 0;
	try {StoreItem('localStoreTest', rand);} catch(err) {}
	try {if (GetItem('localStoreTest', null) == rand) goodTests++;} catch(err) {}
	try {DeleteItem('localStoreTest');} catch(err) {}
	try {if (GetItem('localStoreTest', 1) == 1) goodTests++;} catch(err) {}
	try {if (GetItem('localStoreTest') == null) goodTests++;} catch(err) {}
	try {if (GetItem('localStoreTest', null) == null) goodTests++;} catch(err) {}
	
	if (goodTests == 4) return true; // All tests were successful.
	else return false; // Not all tests were successful.
}

function DoFirstInstall() {
	try{
		Log("This is the first install.");
		
		try{
			setTimeout(ConnectionHelper, 500);
			//setTimeout(ShareHelper, true, 1000);
		} catch(err){}
		
		SetInstallDate();
		
		AjaxGet({                     
				method: 'GET',
				url: 'http://corral.wail.wisc.edu/install.xml',
				headers: {
				//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'
				},
				overrideMimeType:'text/plain; charset=x-user-defined',
				onerror:  function(responseDetails) {
				Log("Error in AjaxGet() from DoFirstInstall().");
				Log([
					 "status = " + responseDetails.status,
					 "statusTest = " + responseDetails.statusText,
					 "readyState = " + responseDetails.readyState,
					 "responseHeaders = " + responseDetails.responseHeaders,
					 "responseText = " + responseDetails.responseText,
					 "finalUrl = " + responseDetails.finalUrl,
					 "responseXML = " + responseDetails.responseXML
					 ].join("\n"));
				},
				onload: function(responseDetails) {
				// ToDo: Write setup functions.
				}
				});
	}
	catch(err){}
}


function PingUrl(url) {
	
	try{
		
		AjaxGet({                     
				method: 'GET',
				url: url,
				headers: {
				//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'
				},
				overrideMimeType:'text/plain; charset=x-user-defined',
				onerror:  function(responseDetails) {
				Log([
					 "status = " + responseDetails.status,
					 "statusTest = " + responseDetails.statusText,
					 "readyState = " + responseDetails.readyState,
					 "responseHeaders = " + responseDetails.responseHeaders,
					 "responseText = " + responseDetails.responseText,
					 "finalUrl = " + responseDetails.finalUrl,
					 "responseXML = " + responseDetails.responseXML
					 ].join("\n"));
				},
				onload: function(responseDetails) {
				// Nothing
				}
				});
	}
	
	catch(err){}
	
}

function SetInstallDate() {
	var now = new Date();
	try { StoreItem('installDate',"" + now.getTime()); } //make sure it's a string as firefox can't store a 42bit integer
	catch(err) { Log("Error: Can not write to version key.\n\nabout:config key was reset; Restart firefox."); }
	return;
}

function IsLoggedInToFB() {
	/* Check a few different ways incase some fail to work in the future. */
	try{ if ((document.getElementById("blueBar") != null) && (document.getElementById("blueBar").className == "loggedOut")) return false; }catch(err){}
	try{ if (document.body.className.indexOf('UIPage_LoggedOut')>-1) return false; }catch(err){}
	try{ if ((document.getElementById("login_form") != null) && (document.getElementById("login_form").action.indexOf('login.facebook.com')>-1)) return false; }catch(err){}
	//Log("User is logged in.");
	return true;
}

function StartTimer(timerName) {
	Timer(timerName, true);
}


function ReadTimer(timerName) {
	alert("  " + timerName + " took " + Timer(timerName, false) + " ms.");
}


function RecordTimer(timerName) {
	timerRecord = timerRecord + "  " + timerName + " took " + Timer(timerName, false) + " ms.\n";  
	
	if (typeof(timersOff) == 'undefined') timersOff = false;
	if (timersOff != true) {
		if (typeof(printTimer) != 'undefined') clearTimeout(printTimer);
		printTimer = setTimeout('alert(unescape("' + escape("Timers:\n" + timerRecord) + '"));',3000)
	}
}


function PrintRecordTimer() {
	if (typeof(timersOff) == 'undefined') timersOff = false;
	if (timersOff != true) {
		alert("Timers:\n" + timerRecord);  
	}
}


function Timer(timerName, startTimer) {
	//timers = new Array();
	if (typeof(timersOff) == 'undefined') timersOff = false;
	if (timersOff != true) {
		if (startTimer == true) { 
			timers[timerName] = new Date(); 
			return -1;
		}
		else {
			var currentTime = new Date(); // change to 'var' 2010-11-16
			return (currentTime.getTime() - timers[timerName].getTime());
		}
	}
}



function CombineImages(images, colors)
{
	var canvas = document.createElement("canvas");
	var canvasContext = canvas.getContext("2d");
	
	canvas.width = images[0].width;
	canvas.height = images[0].height;
	
	//alert("canvas.width=" + canvas.width + " canvas.height = " + canvas.height);
	
	var imageDataFinal = canvasContext.getImageData(0,0, canvas.width, canvas.height);
			
	var canvases = new Array(5);
	for (k=0; k<5; k++){
			
		}
			
	for (k=0; k<5; k++){
		var colorRed = parseInt(colors[k].substr(1,2), 16)/255;
		var colorGreen = parseInt(colors[k].substr(3,2), 16)/255;
		var colorBlue = parseInt(colors[k].substr(5,2), 16)/255;
		
		canvasContext.drawImage(images[k],0,0);
		
		canvasContext.fillStyle = "rgba(200,100,100,0.3)";
		canvasContext.fillRect(-30, -30, 60, 60);
		
		//alert("canvas.toDataURL() = " + canvas.toDataURL());
		
		var image = new Image();
		image.src = canvas.toDataURL();
		document.body.appendChild(image);
		
		var imageData = canvasContext.getImageData(0,0, canvas.width, canvas.height); // can fail if image is on a different domain name.
		
		alert("imageData = " + imageData);
		
		for (i = 0; i<imageData.height; i++)
		{
			for (j = 0; j<imageData.width; j++)
			{
				var index = (i*4)*imageData.width+(j*4);
				imageDataFinal.data[index]+=colorRed*imageData.data[index];	  
				imageDataFinal.data[index+1]+=colorGreen*imageData.data[index+1];
				imageDataFinal.data[index+2]+=colorBlue*imageData.data[index+2];
				imageDataFinal.data[index+3]+=imageData.data[index+3];	  // alpha	  
			}
		}
	}
	
	
	canvasContext.putImageData(imageDataFinal,0,0,0,0, imageDataFinal.width, imageDataFinal.height);
	// canvasContext.drawIMage(imageData,0,0);//,0,0, imageData.width, imageData.height);  
	
	if (true)
	{  
		//var myDiv=document.createElement("div");  
		//myDiv.appendChild(canvas);
		//images[0].parentNode.appendChild(canvas);//, image);
		
	}
	return canvas.toDataURL();
}

var combineImagesCount = 0;
var combineImages = new Array(5);
var combineColors = new Array(5);
function WailTillAllLoad(image, color, index) {
	if (typeof (combineImages[index]) == 'undefined' ) combineImagesCount++;
	combineImages[index] = image;
	combineColors[index] = color;
	
	if (combineImagesCount == 5) {
		var toDataURL = CombineImages(combineImages, combineColors);

	var head = document.getElementsByTagName("head")[0];
	var styleNode = document.createElement("style");
		styleText = "body { background-image: url(" + toDataURL + "); }";
	styleNode.appendChild(document.createTextNode(styleText));
		head.appendChild(styleNode); 
		
		//alert(toDataURL);
	}
}

function GetBackgroundImages(colorArray) {
	GetBackgroundImage('https://mywebspace.wisc.edu/ormont/web/facebook/canvas1.png', colorArray[0], 0);
	GetBackgroundImage('https://mywebspace.wisc.edu/ormont/web/facebook/canvas2.png', colorArray[1], 1);
	GetBackgroundImage('https://mywebspace.wisc.edu/ormont/web/facebook/canvas3.png', colorArray[2], 2);
	GetBackgroundImage('https://mywebspace.wisc.edu/ormont/web/facebook/canvas4.png', colorArray[3], 3);
	GetBackgroundImage('https://mywebspace.wisc.edu/ormont/web/facebook/canvas5.png', colorArray[4], 4);
	}
	
function GetBackgroundImage(imageUrl, hexColor, index) {
	GM_xmlhttpRequest({                     
			method: 'GET',
			url: imageUrl,
			headers: {
			//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
			},
			overrideMimeType:'text/plain; charset=x-user-defined',
			onerror:  function(responseDetails) {
			GM_log("Error in GM_xmlhttpRequest() from GetBackgroundImage().");
			GM_log([
				 "status = " + responseDetails.status,
				 "statusTest = " + responseDetails.statusText,
				 "readyState = " + responseDetails.readyState,
				 "responseHeaders = " + responseDetails.responseHeaders,
				 "responseText = " + responseDetails.responseText,
				 "finalUrl = " + responseDetails.finalUrl,
				 "responseXML = " + responseDetails.responseXML
				 ].join("\n"));
			},
			onload: function(responseDetails) { 
			var image = new Image();
			image.src = "data:image/png;base64," + Base64.encode(responseDetails.responseText);
			
			//document.body.appendChild(image);
			WailTillAllLoad(image, hexColor, index);
			}
			});
}


function GetQueryNumber() {
	var queryNumber = window.document.body.getAttribute('queryNumber');
	if (queryNumber == null) queryNumber = 0; else queryNumber++;
	window.document.body.setAttribute('queryNumber', queryNumber);
	return queryNumber;
}

function GetColors(photoUrl, applyColors, doFade) {  //  (applyColors = true) means get color scheme & apply it immediately. also sends to server to up the color query's priority.
	StartTimer("Server Access");					 //  (applyColors = false) means only precache color scheme for that picture
	
	var isCached = (photoUrl == "http://facebook.com");
	
	var nonce = Math.round(Math.random()*4294967296);
	
	if (isCached == true) var urlToGet = 'http://corral.wail.wisc.edu/cgi-bin/OtherProjects/color-cached.pl' + '?ver=' + thisScriptVersion.join(".") + '&lowpriority=' + !applyColors + '&nonce=' + nonce;
	else var urlToGet = 'http://corral.wail.wisc.edu/cgi-bin/OtherProjects/color-pallette.pl?url=' + photoUrl.split('&').join('%26') + '&ver=' + thisScriptVersion.join(".") + '&lowpriority=' + !applyColors;
	//else var urlToGet = 'http://corral.wail.wisc.edu/Palette2?url=' + photoUrl.split('&').join('%26') + '&ver=' + thisScriptVersion.join(".") + '&lowpriority=' + !applyColors;
	//else var urlToGet = 'http://corral.wail.wisc.edu/rocks?url=' + photoUrl.split('&').join('%26') + '&ver=' + thisScriptVersion.join(".");
	
	var queryNumber =  GetQueryNumber();
	
	
	//AjaxGet({  
	AjaxGet({
			method: 'GET',
			url: urlToGet,
			headers: {
			//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'
			},
			onerror:  function(responseDetails) {
			Log("Error in AjaxGet() from GetColors().");
			Log([
				 "status = " + responseDetails.status,
				 "statusTest = " + responseDetails.statusText,
				 "readyState = " + responseDetails.readyState,
				 "responseHeaders = " + responseDetails.responseHeaders,
				 "responseText = " + responseDetails.responseText,
				 "finalUrl = " + responseDetails.finalUrl,
				 "responseXML = " + responseDetails.responseXML
				 ].join("\n"));
			},
			onload: function(responseDetails) { if (isCached) return; WorkOnXMLResponse(responseDetails, photoUrl, applyColors, doFade, queryNumber); }
			});
	
	
	
}

function AjaxGet(settings) {
	if ((typeof GM_xmlhttpRequest != 'undefined') && (GM_xmlhttpRequest.toString) && (GM_xmlhttpRequest.toString().toLowerCase().indexOf('not supported') == -1)) GM_xmlhttpRequest(settings);
	else if ((typeof XMLHttpRequest != 'undefined') && (XMLHttpRequest.toString().toLowerCase().indexOf('not supported') == -1)) GM_xmlhttpRequestEmulator(settings);
	else Log("GM_xmlhttpRequest is not supported.");
}

function GM_xmlhttpRequestEmulator(settings) {
	// Doesn't use settings['onreadystatechange'], even if it's specified;
	// Ignores http request headers
	
	if (settings['method'] == null) Log("Error: method is null in call to GM_xmlhttpRequestEmulator().");
	if (settings['url'] == null) Log("Error: url is null in call to GM_xmlhttpRequestEmulator().");
	
	var client = new XMLHttpRequest();
	client.onreadystatechange=function() { 
		if (client.readyState==4) {
			if ((client.status>=200) && (client.status<300) && (settings['onload'])) settings.onload(client);
			if (((client.status<200) || (client.status>=300)) && (settings['onerror'])) settings.onerror(client); /* not sure if this could get hit */
		}
	}
	client.onerror=function() { if (settings['onerror']) { settings.onerror(client); } }
	
	//Log("settings['method'] = " + settings['method'] + ". settings['url']) = " + settings['url'] + ".");
	
	client.open(settings['method'], settings['url']);
	client.send(null);
}


var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
		
        while (i < input.length) {
			
            chr1 = input.charCodeAt(i++) & 0xff;
            chr2 = input.charCodeAt(i++) & 0xff;
            chr3 = input.charCodeAt(i++) & 0xff;
			
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
			
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
			
        }
        return output;
    }
}

function WorkOnXMLResponse(responseDetails, photoUrl, applyColors, doFade, queryNumber) {
	//alert(responseDetails.responseText);
	
	//alert("WorkOnXMLResponse(responseDetails=" + responseDetails + ", photoUrl=" + photoUrl + ", applyColors=" + applyColors + ", doFade=" + doFade + ")");
	
	if (photoUrl == "http://facebook.com") return;
	
	// Check to see if we have already applied a newer color scheme.  This can happen if the responses are returned out of order.
	// This is not perfect though.  A user can move forward in an album and then back quickly and the incorrect color scheme will be applied.
	if (window.document.body.getAttribute('responseNumber') > queryNumber) {
		applyColors = false; // Note (null > some_positive_int) is always false.
		//Log("Note: In WorkOnXMLResponse(): Color scheme returned out of order.");
	}
	window.document.body.setAttribute('responseNumber', queryNumber);
	
	var colorStringArray=responseDetails.responseText.split("#");
	
	var colorArray = new Array(10);
	
	var parser = new DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
	var entries = dom.getElementsByTagName('color');
	
	var status = dom.getElementsByTagName('status')[0].textContent;
	
	var message = dom.getElementsByTagName('message')[0].textContent;
	
	
	//document.body.appendChild(document.createTextNode(message + " : " + photoUrl));
	//document.body.appendChild(document.createElement('br'));
	
	
	if (status == "fail") return 1;  // Bail-out if an error message is returned.
	
	//	alert(message);
	
	for(var k = 0; (k < entries.length); k++) colorArray[k] = "#" + entries[k].textContent;
	
	//added to make sure it doesn't pull an all black color scheme
	if ((colorArray[9] == "#000000" && colorArray[0] == "#000000") || colorArray[0] == "" || colorArray.join('') == "") {
		failedBlackAttempts++;
		if (failedBlackAttempts < 2) {
			//  alert("failedBlackAttempts: " + failedBlackAttempts);
			GetColors(photoUrl, applyColors, doFade);
			return 1;
		}
		//  else alert("Failed to get colors");
		return 1;
	}
	
	StartTimer("Sort by brightness");
	//sort by brightness
	
	try{
		var x, y, holder, brightness1, brightness2;
		for(x = 0; x < colorArray.length; x++) {
			for(y = 0; y < (colorArray.length-1); y++) {
				brightness1 = (parseInt(colorArray[y].substr(1,2), 16) + parseInt(colorArray[y].substr(3,2), 16) + parseInt(colorArray[y].substr(5,2), 16));
				brightness2 = (parseInt(colorArray[y+1].substr(1,2), 16) + parseInt(colorArray[y+1].substr(3,2), 16) + parseInt(colorArray[y+1].substr(5,2), 16));
				
				if(brightness1 > brightness2) {
					holder = colorArray[y+1];
					colorArray[y+1] = colorArray[y];
					colorArray[y] = holder;
				}
			}
		}
	}
	catch(err) {
		// There is an error that keeps coming up of about "colorArray[y] is undefined".
		Log("colorArray = " + colorArray.join('*'));
		return 1;
	}
	RecordTimer("Sort by brightness");
	
	
	StartTimer("Add to cache");
	
	cacheType = UrlToCacheType(photoUrl);
	
	var splitUrl = photoUrl.split("/");
	var filename=splitUrl[splitUrl.length - 1];
	
	//alert("cache type: " + cacheType);
	cacheName = CacheTypeToCacheName(cacheType);
	
	
	try { cachedPageColors = GetItem(cacheName); }
	catch(err) { /*Die silently*/ Log("Error: Can not read from cache.\n\nabout:config key was reset; Restart firefox."); }
	
	
	
	if ((typeof cachedPageColors == 'undefined') || (!cachedPageColors) || (cachedPageColors.length == 0)) StoreItem(cacheName,filename + '-' + colorArray.join('*'));
	else {
		var cachedPageColorsSplit = cachedPageColors.split(',');
		
		//alert("cachedPageColorsSplit.length = " + cachedPageColorsSplit.length);
		
		if (cachedPageColorsSplit.length + 1 >= 190) {
			//  alert("Num of Cached: " + cachedPageColorsSplit.length);
			//  alert('old records: ' + cachedPageColorsSplit.join('\n'));
			
			for(x = 0; x < cachedPageColorsSplit.length - 1; x++) {
				cachedPageColorsSplit[x] = cachedPageColorsSplit[x + 1];
			}
			cachedPageColorsSplit[cachedPageColorsSplit.length - 1] = filename + '-' + colorArray.join('*');
			//  alert('new records: ' + cachedPageColorsSplit.join('\n'));
			StoreItem(cacheName,cachedPageColorsSplit.join(','));
		}
		else StoreItem(cacheName,cachedPageColors + "," + filename + '-' + colorArray.join('*'));
	}
	Log("Added [" + filename + "] to the cache.");
	
	RecordTimer("Add to cache");			
	
	
	RecordTimer("Server Access");
	
	
	if (applyColors != false) {
		StartTimer("InsertCSS");
		
		//if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', colorArray.join('*'));
		
		try {
			// The default here is a blue scheme to start the fade from.
			if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', "#00006F*#052A59*#002973*#253E5C*#3475C3*#637D9C*#B0B3C1*#C6CDF2*#F9FAFA*#FFFFFF");
			window.document.body.setAttribute('finalColorArray', colorArray.join('*'));
		}
		catch(err) { Log("Error: " + err.description); }
		
		try {
			//if (doFade == true)	fadeBetweenTwoColorSchemes(/*currentFadePercent*/ 0,/*fadeStep*/ 0.01,/*endingFadePercent*/ 1.0,/*delay*/ 5);  
			if (doFade == true)	{ fadeBetweenTwoColorSchemes(/*fadeStartTime*/ null,/*fadeDuration*/ 350); }  
			else InsertCSS(colorArray, "");
		}
		catch(err) {
			InsertCSS(colorArray, "");
		}
		RecordTimer("InsertCSS");
	}
	
	
	
	//alert("Loaded '" + photoUrl + "' and applyColors=" + applyColors + ".");
	
	return 0;
}


function RGBToRGBA(rgbColor, alpha) { // !!Untested!!
	if (rgbColor.match(/^\s*rgba\s*\(/)) return rgbColor; // Check for RGBA instead of RGB  
	var parts = rgbColor.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/);
	alpha = Math.min(Math.max(alpha, 0), 1);
	return "rgba(" + parts[1] + "," + parts[2] + "," + parts[3] + "," + alpha + ")";				   
}

function RGBToHex(rgbColor) {
	if (rgbColor.match(/^\s*rgba\s*\(/)) return RGBAToHexDropAlpha(rgbColor); // Check for RGBA instead of RGB
	var parts = rgbColor.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/);
	if (parts[1] < 0 || parts[1] > 255 || parts[2] < 0 || parts[2] > 255 || parts[3] < 0 || parts[3] > 255) return null; 
	return "#" + decimalToHex(parts[1]) + decimalToHex(parts[2]) + decimalToHex(parts[3]);
}

function RGBAToHexDropAlpha(rgbaColor) { 
	if (rgbColor.match(/^\s*rgb\s*\(/)) return RGBToHex(rgbaColor); // Check for RGB instead of RGBA
	var parts = rgbColor.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+),\s*(\d+)\s*/);
	if (parts[1] < 0 || parts[1] > 255 || parts[2] < 0 || parts[2] > 255 || parts[3] < 0 || parts[3] > 255) return null; 
	return "#" + decimalToHex(parts[1]) + decimalToHex(parts[2]) + decimalToHex(parts[3]);  // parts[4] is the alpha
}

function IsRGB(rgbColor) {
	if (/^\s*rgb\s*\(/.test(rgbColor)) return true;
	return false;
}s
