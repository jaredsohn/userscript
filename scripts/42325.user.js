// ==UserScript==
// @name          Facebook Auto-Colorizer
// @version       v2.3.2
// @author	  Justin Ormont
// @namespace     http://wisc.facebook.com/message.php?id=8638838
// @description	  Colorizes facebook based on the user's photo.
// @include       http://*.facebook.com/*
// ==/UserScript==

//
// (c) 2008 Justin Ormont.  All rights reserved.
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
//

thisScriptVersion = new Array(2,3,1);
//startingColorArray = new Array(10);
//finalColorArray = new Array(10);
//fadedColorArray = new Array(10);

var timers = new Array();
var timerRecord = "";
var timersOff = true;
var AjaxInserters = new Array(4);
var lastDocUrl = "";

(function()
{
 	CheckForFrames();

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


	//alert("Time spent in InsertCSS = " + typeof(oldTime) + typeof(currentDate.getTime())));  

	
})();

function CheckForFrames() {
	// Check if we are in a frame, and exit if so.
	if (top.location != location) { 
		GM_log("Executing in a frame: " + location);
		return; 
	}
}

function OnPageChange() {
	lastDocUrl = getApparentUrl();	// This is a global variable.
	
	lookForPhotoUrl();
	AjaxUpdaterFunction();
	
	if (getApparentUrl().indexOf('/home.php?')>-1) PreCacheChangedProfilePics();
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
	//ViewPallet(colorArray);
	
	//InsertCSSOld(colorArray);
	
	var head = document.getElementsByTagName("head")[0];
	var styleNode = document.createElement("style");
	

	//var styleText = "body{background-color:blue;}";
	
	var styleText =	" \
		div.profilebox { background:" + colorArray[9] + "; }; \
		.profileheader h2 {color:" + colorArray[0] + ";}; \
		#header { background:" + colorArray[5] + "; }\n \
		div.profileheader { background:" + colorArray[6] + "; border-top: solid 1px " + colorArray[4] + "; }\n \
		#content { background:" + colorArray[8] + "; }\n \
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
		\
	/* photo specific */ \
		div.photonav { background:" + colorArray[8] + "; }\
		#comment { background:" + colorArray[9] + "; }\
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
		.box_subhead { background:" + MixTwoHexColors(colorArray[6],colorArray[9],.5) + "; border-top: solid 1px " + MixTwoHexColors(colorArray[6],colorArray[9],.25) + ";" + "} \
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
	    "; 
	
	
	if (typeof GM_getValue('clearChatBar','') != 'undefined') var clearChatBar = GM_getValue('clearChatBar','');
	else var clearChatBar = "colorgel";
	
	if (clearChatBar == "") clearChatBar = "colorgel";
	
	/* chat bar specific */ 
	
	
		if (clearChatBar == "clear") {
			styleText += "#presence_bar{background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
			#presence_popin_bar{background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;}  \
			#presence.full #presence_ui{margin-left:15px;margin-right:15px;border-left:1px solid " + colorArray[3] + "; background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
			\
			#presence_ui{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;margin-left:15px;margin-right:15px;position:relative;overflow:visible ! important;} \
			#presence .presence_bar_button{padding:5px 6px;height:17px;color:" + ForceContrast(colorArray[2], colorArray[6], 0.12) + ";cursor:pointer;margin-top:-2px;border-left:1px solid " + colorArray[3] + ";border-right:1px solid " + colorArray[6] + ";} \
			\
			#presence_error_bar{border-right:1px solid " + colorArray[3] + ";margin-right:15px;padding:6px 6px 0;background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);}  \
			" 
		}
		else if (clearChatBar == "colorgel") {  /* HexColorToRGBA(colorArray[6],0.5) */
			styleText += "#presence_bar{background: " + HexColorToRGBA(colorArray[6],0.5) + "  repeat-x top left;} \
			#presence_popin_bar{background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;}  \
			#presence.full #presence_ui{margin-left:15px;margin-right:15px;border-left:1px solid " + colorArray[3] + "; background: url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
			\
			#presence_ui{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;margin-left:15px;margin-right:15px;position:relative;overflow:visible ! important;} \
			#presence .presence_bar_button{padding:5px 6px;height:17px;color:" + ForceContrast(colorArray[2], colorArray[6], 0.12) + ";cursor:pointer;margin-top:-2px;border-left:1px solid " + colorArray[3] + ";border-right:1px solid " + colorArray[6] + ";} \
			\
			#presence_error_bar{border-right:1px solid " + colorArray[3] + ";margin-right:15px;padding:6px 6px 0;background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);}  \
			" 
		}
		else {
			styleText += "#presence_bar{background: " + colorArray[6] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
			#presence #chat_status_control_tab{border-right:1px solid " + colorArray[3] + ";} \
			#presence_popin_bar{background: " + colorArray[6] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;}  \
			#presence.full #presence_ui{margin-left:15px;margin-right:15px;border-left:1px solid " + colorArray[3] + "; background: " + colorArray[6] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png) repeat-x top left;} \
			\
			#presence .presence_bar_button{padding:5px 6px;height:17px;color:" + ForceContrast(colorArray[2], colorArray[6], 0.12) + ";cursor:pointer;margin-top:-2px;border-left:1px solid " + colorArray[3] + ";border-right:1px solid " + colorArray[6] + ";} \
			\
			#presence_error_bar{border-right:1px solid " + colorArray[3] + ";margin-right:15px;padding:6px 6px 0;background-image:url(https://mywebspace.wisc.edu/ormont/web/facebook/chat_bar_bg.png);}  \
			\
			"	
		}


	/* New profile layout specific */  /* todo: colorArray[5] is under used. */
	styleText += "#fb_menubar{background: " + colorArray[2] + " url(https://mywebspace.wisc.edu/ormont/web/facebook/fb_menubar_gray-trans2.png) } \
	#fb_menubar #fb_menubar_logo a span{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/fb_menubar_logo_gray-trans.png) } \
	.fb95_preview_bar{background:transparent url(https://mywebspace.wisc.edu/ormont/web/facebook/fb95_preview_bar-gray_trans.png) repeat-x 0px 0px;width:auto;margin:0px;height:24px;padding:0px 10px 0px 10px;} \
	\
	/*.minifeedwall .story_body{background:" + colorArray[9] + "; }*/ \
	.minifeedwall .story{background:" + colorArray[9] + "; } \
	.minifeedwall .border .story_body, .minifeedwall .extra_top_border{border-top:1px solid " + ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5), colorArray[8], 0.20) + ";} \
	.minifeedwall .border .story_body .from_friend_story_content_container{border-top:1px solid " + ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5), colorArray[8], 0.20) + ";padding-top:12px;} \
	.minifeedwall .date_divider_label{background:" + colorArray[8] + " ;display:block;float:left;margin-top:-8px;min-width:50px;padding:2px 7px 0 0;} \
	.minifeedwall .date_divider{color:" +  ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5) , colorArray[8], 0.20) + ";font-weight:bold;font-size:9px;border-bottom:solid 1px " + ForceContrast(MixTwoHexColors(colorArray[4], colorArray[8], 0.5) , colorArray[8], 0.20) + ";margin:2px 0px 10px;padding:2px 7px 0px 0px;} \
	#profile_top_bar{background:" + colorArray[4] + ";} \
	\
	#feedwall_with_composer{background:" + colorArray[8] + ";} \
	#left_column {background:" + colorArray[8] + ";} \
	\
	.profile .profile_color_bar{background:" + MixTwoHexColors(colorArray[2],colorArray[4],.5) + " url(https://mywebspace.wisc.edu/ormont/web/facebook/fb95_preview_bar-gray_trans.png) repeat-x bottom left;padding-top:50px;} \
	\
	.commentable_item .wallpost{background:" + MixTwoHexColors(colorArray[7], colorArray[9], 0.5) + ";border-bottom:1px solid " + colorArray[7] + ";clear:left;float:none;overflow:hidden;margin-bottom:2px;padding:6px 4px 6px 6px;} \
	.commentable_item .comment_box{background:url(https://mywebspace.wisc.edu/ormont/web/facebook/box_bg-trans.png) no-repeat left 1px;clear:both;font-size:11px;padding:7px 0 0;overflow:hidden;} \
	\
	.profile .right_column_container{background:" + colorArray[9] + ";} \
	\
	.profile dl.info dt{background:" + MixTwoHexColors(colorArray[8],colorArray[6],0.5) + ";color:" + colorArray[2] + ";float:left;clear:left;} \
	\
	.profile .top_bar ul.tabs li{background:" + MixTwoHexColors(colorArray[8],colorArray[4],0.5) + ";float:left;margin:0 2px 0 0;overflow:hidden;list-style-type:none;max-width:107px;position:relative;} \
	.profile .top_bar ul.tabs li a:hover.tab_link{background-color:" + MixTwoHexColors(colorArray[8],colorArray[4],0.75) + ";border-color:" + MixTwoHexColors(colorArray[4],"#000000",0.3) + ";color:#fff;text-decoration:none;} \
	\
	#feedwall_with_composer .pager_next{background:" + MixTwoHexColors(colorArray[8], colorArray[6], 0.2) + ";margin-top:8px;border-top:1px solid #D8DFEA;padding:3px 7px 4px 0;} \
	\
	#pagefooter{background:" + MixTwoHexColors(colorArray[7],colorArray[9],0.25) + " url() no-repeat top center;margin:0px auto;margin-top:-80px;position:relative;width:964px;} \
	#pagefooter .pagefooter_topborder{background:transparent url() no-repeat bottom center;padding:1px;} \
	\
	.profile .top_bar .mobile_status{color:" + ForceContrast(colorArray[3], colorArray[4], 0.12) + ";display:inline;font-size:13px;font-weight:normal;margin-left:5px;} \
	.profile .top_bar .mobile_status a{color:#FF0000;} \
	\
	#adcolumn_advertise{background:" + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	#adcolumn_more_ads{background:" + MixTwoHexColors(colorArray[7],colorArray[8],0.25) + ";} \
	.admarket_ad{background-color:" + MixTwoHexColors(colorArray[7],colorArray[8],0.75) + ";border:1px solid #ccc;margin:5px 0px;padding-bottom:10px;width:147px;} \
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
	.profile .box h3.box_header{background:" + colorArray[6] + ";border-top:1px solid "+ colorArray[2] + ";font-size:13px;margin:0px;padding:5px 8px;position:relative;} \
	.profile .box_column{border-top:1px solid " + colorArray[5] + ";border-right:1px solid #d8dfea;} \
	\
	#profile_composer .composer_tabs ul li.selected .composer_tab_arrow{background:transparent url('https://mywebspace.wisc.edu/ormont/web/facebook/composer_tab_selected_arrow-trans.png') no-repeat bottom center;display:block;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded{background:transparent url('https://mywebspace.wisc.edu/ormont/web/facebook/composer_tab_selected-trans.png') left top no-repeat;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded_tr{background-position:top right;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded_bl{background-position:bottom left;} \
	#profile_composer .composer_tabs ul li.selected .composer_tab_rounded_br{background-position:bottom right;} \
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

	styleNode.appendChild(document.createTextNode(styleText));
	head.appendChild(styleNode);
	
	ReplaceSilhouette((ForceContrast(MixTwoHexColors(colorArray[6],colorArray[9],0.5),"#FFFFFF",0.05)));
	
	
	
}


function ReplaceSilhouette(hexColor) {
	try {
		var myImages = document.getElementsByTagName('img');
		
		for (var i=0; i<myImages.length; i++) {
			if (myImages[i].src.indexOf('/q_silhouette.gif')>-1) {
				myImages[i].src = "https://mywebspace.wisc.edu/ormont/web/facebook/q_silhouette-trans-white-head.png";
				myImages[i].setAttribute('style',"background: " + hexColor + ";");
			}
			
			if (myImages[i].src.indexOf('/s_silhouette.jpg')>-1) {
				myImages[i].src = "https://mywebspace.wisc.edu/ormont/web/facebook/s_silhouette-trans-white-head-swirl.png";
				myImages[i].setAttribute('style',"background: " + hexColor + ";");
			}
			
			if (myImages[i].src.indexOf('/d_silhouette.gif')>-1) {
				myImages[i].src = "https://mywebspace.wisc.edu/ormont/web/facebook/l_silhouette-trans-white-head-swirl.png";
				myImages[i].setAttribute('style',"background: " + hexColor + ";");
			}
			
		}
	}
	catch(err) {
		
	}
}

function ViewPallet(colorArray) {
	document.write("<table><tr><td bgcolor=" + colorArray[0] + ">" + colorArray[0] + "</td><td bgcolor=" + colorArray[1] + ">" + colorArray[1] + "</td><td bgcolor=" + colorArray[2] + ">" + colorArray[2] + "</td><td bgcolor=" + colorArray[3] + ">" + colorArray[3] + "</td><td bgcolor=" + colorArray[4] + ">" + colorArray[4] + "</td></tr>");
	document.write("<tr><td bgcolor=" + colorArray[5] + ">" + colorArray[5] + "</td><td bgcolor=" + colorArray[6] + ">" + colorArray[6] + "</td><td bgcolor=" + colorArray[7] + ">" + colorArray[7] + "</td><td bgcolor=" + colorArray[8] + ">" + colorArray[8] + "</td><td bgcolor=" + colorArray[9] + ">" + colorArray[9] + "</td></tr></table>");
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
	var red1 = parseInt(hexColor1.substr(1,2), 16)/255;
	var green1 = parseInt(hexColor1.substr(3,2), 16)/255;
	var blue1 = parseInt(hexColor1.substr(5,2), 16)/255;
	
	var red2 = parseInt(hexColor2.substr(1,2), 16)/255;
	var green2 = parseInt(hexColor2.substr(3,2), 16)/255;
	var blue2 = parseInt(hexColor2.substr(5,2), 16)/255;
	
	return (Math.max(red1,red2) - Math.min(red1,red2)) + (Math.max(blue1,blue2) - Math.min(blue1,blue2)) + (Math.max(green1,green2) - Math.min(green1,green2));
}


function GetBrightness(hexColor) {
	/* Contrast should generally be around 500 for background & foreground */
	var red = parseInt(hexColor.substr(1,2), 16)/255;
	var green = parseInt(hexColor.substr(3,2), 16)/255;
	var blue = parseInt(hexColor.substr(5,2), 16)/255;

	return (red*299 + green*587 + blue*114)/1000;
}


function GetLuminance(hexColor) {
	/* Luminance ratio between foreground and background should be 5:1 */
	var red = parseInt(hexColor.substr(1,2), 16)/255;
	var green = parseInt(hexColor.substr(3,2), 16)/255;
	var blue = parseInt(hexColor.substr(5,2), 16)/255;

	if (red <= 0.03928) red = red/12.92;
	else red = ((red+0.055)/1.055)^2.4; 


	if (green <= 0.03928) green = green/12.92;
	else green = ((green+0.055)/1.055)^2.4; 


	if (blue <= 0.03928) blue = blue/12.92;
	else blue = ((blue+0.055)/1.055)^2.4; 

   return 0.2126 * red + 0.7152 * green + 0.0722 * blue 
}



function ForceContrast(hexColor1, hexColor2, contrastMinimum) {
//return hexColor1;
		
	var brightness1 = GetBrightness(hexColor1);
	var brightness2 = GetBrightness(hexColor2);

	var brightnessDiff = Math.abs(brightness1 - brightness2);

	//alert("brightnessDiff = " + brightnessDiff);

	//alert("colors = " + hexColor1 + " " + hexColor2);
	
	var i = 0;
	
	if (brightness1 == brightness2 && brightness1 > 0.5) var mixColor = "#000000";
	else if (brightness1 == brightness2 && brightness1 <= 0.5) var mixColor = "#FFFFFF";
	else if (brightness1 >= brightness2 && (1 - brightness2) < contrastMinimum) var mixColor = "#FFFFFF";
	else if (brightness1 >= brightness2 && (1 - brightness2) >= contrastMinimum) var mixColor = "#000000";	
	else if (brightness1 < brightness2 && brightness2 < contrastMinimum) var mixColor = "#FFFFFF";
	else if (brightness1 < brightness2 && brightness2 >= contrastMinimum) var mixColor = "#000000";


	while (brightnessDiff < contrastMinimum) {
		i = i+1;
		if (i > 10) { RecordTimer("ForceContrast"); return hexColor1; }
		
		var brightness1 = GetBrightness(hexColor1);
		var brightnessDiff = Math.abs(brightness1 - brightness2);
		
		hexColor1 = MixTwoHexColors(hexColor1, mixColor, 0.005 + 2*Math.abs(contrastMinimum - brightnessDiff)); // The part in th 'abs' just make it converge faster. 
		//alert("brightness = " + brightness1 + " " + brightness2 + "\nratio = " + brightnessDiff + "\ni = " + i + "\nhexColor1 = " + hexColor1);
	}
	
	return hexColor1;

}


function ForceContrastXXX(hexColor1, hexColor2, contrastMinimum) {
	//return hexColor1;
	/* If the colors are too close to each other, move color1 away from color2 */
	var luminance1 = GetLuminance(hexColor1);
	var luminance2 = GetLuminance(hexColor2);

	var luminanceRatio1 = ((luminance1+0.5)/(luminance2+0.5));
	var luminanceRatio2 = ((luminance2+0.5)/(luminance1+0.5));

	alert("luminanceRatio1 = " + luminanceRatio1);

	//alert("colors = " + hexColor1 + " " + hexColor2);
	
	
	var i = 0;
	
	while (luminanceRatio1 < contrastMinimum && luminanceRatio2 < contrastMinimum) {
		i = i+1;
		if (i > 5) return hexColor1;
		
		var luminance1 = GetLuminance(hexColor1);
		var luminance2 = GetLuminance(hexColor2);

		var luminanceRatio1 = ((luminance1+0.5)/(luminance2+0.5));
		var luminanceRatio2 = ((luminance2+0.5)/(luminance1+0.5));
		
		alert("luminance = " + luminance1 + " " + luminance2);
			
		alert("forcing contrast");
		if (luminanceRatio1 < 1) {
			/* Color one is brighter */
			hexColor1 = MixTwoHexColors(hexColor1, "#FFFFFF", 0.1);
			alert("here 1");
		}
		else if (luminanceRatio1 > 1) {
			/* Color one is darker */
			hexColor1 = MixTwoHexColors(hexColor1, "#000000", 0.1);
			alert("here 2");
		}
		else {
			if (hexColor1 == hexColor2) {
				alert("here 3");
				if (hexColor1.toUpperCase() == "#FFFFFF") hexColor1 = "#AAAAAA";
				else if (hexColor1 == "#000000") hexColor1 = "#111111";
				else {
					if (luminance1 > 1.5) hexColor1 = MixTwoHexColors(hexColor1, "#FFFFFF", 0.1); 
					else hexColor1 = MixTwoHexColors(hexColor1, "#000000", 0.1);
				}
			}
			else {
				alert("here 4");
				preHexColor1 = hexColor1;
				alert("before hexColor1 = " + hexColor1);
				hexColor1 = MixTwoHexColors(hexColor1, "#FFFFFF", 0.1);  //this line could be better
				alert("after hexColor1 = " + hexColor1);
				if (preHexColor1 == hexColor1) return hexColor1;
			}
		}
		
	}
	
	return hexColor1;

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
		
	if (saturation < 40) return "hsl(219,42%,40%)";  //make sure no off gray -> bright color
	
	//saturation = saturation * (100-increasePercent) + increasePercent;
	
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
	var currentFadePercent = (currentTime - fadeStartTime)/fadeDuration;
	
	//if (currentFadePercent > endingFadePercent) currentFadePercent = endingFadePercent;
	if (currentFadePercent > 1.0) currentFadePercent = 1.0;
	
	//var finalColorArray = ("#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*").split('*');
	//var startingColorArray = ("#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*#FF0000*").split('*');
	
	
	var finalColorArray = window.document.body.getAttribute('finalColorArray').split('*');
	var startingColorArray = window.document.body.getAttribute('startingColorArray').split('*');
	
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
	InsertCSS(fadedColorArray);
	//currentTime = new Date();
	//var timeTaken = (currentTime.getTime() - startTime.getTime());
	
	
	//if (currentFadePercent < endingFadePercent) /*fadeTimer =*/ setTimeout(fadeBetweenTwoColorSchemes, delay - timeTaken, currentFadePercent, fadeStep, endingFadePercent, delay);
	//else {
	//	window.document.body.setAttribute('startingColorArray',window.document.body.getAttribute('finalColorArray'));
	//	//alert("Fade done");
	//}
	
	if (currentFadePercent < 1.0) setTimeout(fadeBetweenTwoColorSchemes, /* zero delay till run again */ 0, fadeStartTime, fadeDuration);  
	else {
		window.document.body.setAttribute('startingColorArray',window.document.body.getAttribute('finalColorArray'));
		//alert("Fade done");
	}
}


function CheckForUpdate() {
	
	//alert("Checking for update");
	
	var versionOnServer = new Array(0,0,0);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://mywebspace.wisc.edu/ormont/web/facebook/version.xml',
		headers: {
			//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
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
				if (typeof GM_getValue('lastNotifiedVersion','') != 'undefined') lastNotifiedVersion = GM_getValue('lastNotifiedVersion','').split(",");
				else lastNotifiedVersion = new Array(0,0,0);
			}
			catch(err) { lastNotifiedVersion = new Array(0,0,0); }
			
			
			var alreadyNotifedOfNewVersion = 1;
			for(var j = 0; j < lastNotifiedVersion.length; j++) if (lastNotifiedVersion[j] != versionOnServer[j]) alreadyNotifedOfNewVersion = 0;
			
			if (alreadyNotifedOfNewVersion == 1) return;

			//alert("Version on server = " + versionOnServer.join(".") + ", Running Version = " + thisScriptVersion.join("."));
			for(var j = 0; j < versionOnServer.length; j++) {
				if ((thisScriptVersion[j] < versionOnServer[j]) || ((typeof thisScriptVersion[j] == 'undefined') && (typeof versionOnServer[j] != 'undefined'))) {
					if(confirm("A new version of Facebook Auto-Colorizer was released.\n\n" + changes[0].textContent + "\n\nNotice appears only once per version." + "\n\nGo to Install Page?")) {
						window.location = link[0].textContent;
						return;
					}
					else {
						try { GM_setValue('lastNotifiedVersion',versionOnServer.join(',')); }
						catch(err) { alert("Error: Can not write to version key.\n\nabout:config key was reset; Restart firefox."); }
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
}


function AttemptToPreCacheForNextPage() {
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
				
				/* Todo: check the the image is not already cached */
				StartTimer("Look for PreCache Profile Pics in Cache");
				if (RetrieveFromCache(nextImage, UrlToCacheType(nextImage)) == null) GetColors(nextImage, false);
				RecordTimer("Look for PreCache Profile Pics in Cache");
			}
			
		}
	}
	RecordTimer("PreCache Changed Profile Pics");
}


function AddToApplicationsList() {
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
	var clearChatBar = GetStorage('clearChatBar');
	if (clearChatBar != null && clearChatBar != "") {
		//alert("Found clearChatBar = " + clearChatBar)
		if ((clearChatBar == "clear") || (clearChatBar == "colored") || (clearChatBar == "colorgel")) {
			//alert("Settings clearChatBar = " + clearChatBar); 
			try { GM_setValue('clearChatBar',clearChatBar); } 
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
			
			
			//GM_xmlhttpRequest({                     
			//  method: 'GET',
			//  url: 'http://pages.cs.wisc.edu/~ormont/cgi-bin/facebook/color-pallette.pl?url=' + photoUrl + '&ver=' + thisScriptVersion.join("."),
			//  headers: {
			//	  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			//	  'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
			//  },
			//  onload: function(responseDetails) { WorkOnXMLResponse(responseDetails, photoUrl, true, true); }
			//});
			lookInCacheThenGetColors(photoUrl, true, true);
		}
	}
	//else throw("window.document.body == null");
}

function AjaxWatcherFunction(){
	if (lastDocUrl != getApparentUrl()) {
		OnPageChange();
	}
	
	lookForPhotoUrl();
	AjaxUpdaterFunction();
}


function WatchForAJAXPageChanges() {
	//updater = window.setInterval(AjaxUpdaterFunction, 15);
	watcher = window.setInterval(AjaxWatcherFunction, 15);
}


function lookForPhotoUrl() {
	StartTimer("Looking for image");
	myImages = document.getElementsByTagName('img');
	
	var photoUrl;
	
	//look specifically for a photo album image
	if (getApparentUrl().indexOf('/photo.php?')>-1) {
		try {
			if (window.document.body != null) photoUrl = document.getElementById('myphoto').src.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
		}
		catch(err) {
			//GM_log("Could not find photo using: document.getElementById('myphoto')");
		}
	}
	
	//look specifically for a profile photo
	if ((typeof photoUrl == 'undefined') && (window.document.body != null)) {
		try {
			photoUrl = document.getElementById('profile_pic').src.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
			if (photoUrl.indexOf('silhouette')>-1) photoUrl = undefined;  // Dis-allow silhouettes from being the main image in a profile.
		}
		catch(err) {
			
		}
	}
	
	
	//look specifically for a share.php selected photo (!!! doesn't work !!!)
	if (getApparentUrl().indexOf('/share.php?')>-1) {
		if (typeof photoUrl == 'undefined') {
			//try {
				var entries = document.getElementsByTagName('div');
				var numEntries = entries.length;
				for (i = 0; i < numEntries; i++) if (entries[i].className == 'thumbnail thumbnail_selected') {
					photoUrl = entries[i].getElementsByTagName('img')[0].src;
					//alert("Found share pic: " + photoUrl);
				}
			//}
			//catch(err) {}
		}
	}
	
	
	//look specifically for a group image
	if (typeof photoUrl == 'undefined') {
		if (getApparentUrl().indexOf('/group.php?')>-1) {
			for (var i=0; i<myImages.length; i++) {
				url = myImages[i].src;
				if (((url.indexOf('/object/')>-1)) && (url.indexOf('t_default.jpg')==-1)) {
					if (typeof photoUrl == 'undefined') {
						if (!IsInChatBar(myImages[i])) photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
						//alert("here 1");
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
				if (((url.indexOf('http://profile.')>-1)) && (url.indexOf('t_default.jpg')==-1)) {
					if (typeof photoUrl == 'undefined') {
						if (!IsInChatBar(myImages[i])) photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
						//alert("here 2");
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
					if (!IsInChatBar(myImages[i])) photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
					//alert("here 3");
				}
			}
		}
	}
	
	//look for a user image
	if (typeof photoUrl == 'undefined') {
		for (var i=0; i<myImages.length; i++) {
			url = myImages[i].src;
			if (((url.indexOf('http://photos-')>-1) || (url.indexOf('http://profile.')>-1)  || (url.indexOf('http://photos.')>-1) || (url.indexOf('http://pe-')>-1) || (url.indexOf('http://vthumb.')>-1)) && (url.indexOf('/app_')==-1)) {
				
				if (typeof photoUrl == 'undefined') {
					if (!IsInChatBar(myImages[i])) photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
					//alert("here 4");
				}
			}
		}
	}
	RecordTimer("Looking for image");
	
	//if (typeof photoUrl == 'undefined') alert("photoUrl = " + undefined);
	//else alert("photoUrl = " + photoUrl);
	
	if (typeof photoUrl != 'undefined') {
		if (photoUrl != window.document.body.getAttribute('oldPhotoUrl')) {
			//alert("photoUrl changed from '" + window.document.body.getAttribute('oldPhotoUrl') + "' to '" + photoUrl + "'.");
			window.document.body.setAttribute('photoUrl',photoUrl);
			window.document.body.setAttribute('oldPhotoUrl',photoUrl);
		}
	}
	
	if (typeof photoUrl != 'undefined') return photoUrl;
	else return null;
}

function SetStorage(key,value) {
	//globalStorage[''][key] = value;
	
	// Global storage doesn't work with greasemonkey, so using cookies....
	var date = new Date();
	date.setTime(date.getTime()+120);
	document.cookie = key+"="+value+"; expires="+date.toGMTString()+"; path=/";
}

function GetStorage(key) {
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

function DeleteStorage(key) {
	//globalStorage[document.location.host || ".localdomain"][key] = null;

	// Global storage doesn't work with greasemonkey, so using cookies....
	document.cookie = key+"=; expires=-1; path=/";
}



function EnableColorForAlbumPics() {
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
		
			photoUrl = url.split('/n').join('/t').split('/s').join('/t').split('/q').join('/t');
			
			StartTimer("Look for PreCache Album Pics in Cache");
			if (RetrieveFromCache(photoUrl, UrlToCacheType(photoUrl)) == null) GetColors(photoUrl, false, false);
			RecordTimer("Look for PreCache Album Pics in Cache");
		
		}
	}
	RecordTimer("PreCache Album Pics");
}

function SetLastCheckedForVersionVariable() {
	var now = new Date();
	try { GM_setValue('lastCheckedForVersion',"" + now.getTime()); } //make sure it's a string as firefox can't store a 42bit integer
	catch(err) { alert("Error: Can not write to version key.\n\nabout:config key was reset; Restart firefox."); }
	return;
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
			currentTime = new Date();
			return (currentTime.getTime() - timers[timerName].getTime());
		}
	}
}


function GetColors(photoUrl, applyColors, doFade) {  //  (applyColors = true) means get color scheme & apply it immediately 
	StartTimer("Server Access");			 //  (applyColors = false) means only precache color scheme for that picture
		
	GM_xmlhttpRequest({                     
		method: 'GET',
		url: 'http://corral.wail.wisc.edu/cgi-bin/OtherProjects/color-pallette.pl?url=' + photoUrl + '&ver=' + thisScriptVersion.join("."),
		/*url: 'http://pages.cs.wisc.edu/~ormont/cgi-bin/facebook/color-pallette.pl?url=' + photoUrl + '&ver=' + thisScriptVersion.join("."),*/
		headers: {
			//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
		},
		onload: function(responseDetails) { WorkOnXMLResponse(responseDetails, photoUrl, applyColors, doFade); }
	});
}



function WorkOnXMLResponse(responseDetails, photoUrl, applyColors, doFade) {
	//alert(responseDetails.responseText);
	
	//alert("WorkOnXMLResponse(responseDetails=" + responseDetails + ", photoUrl=" + photoUrl + ", applyColors=" + applyColors + ", doFade=" + doFade + ")");
	
	var colorStringArray=responseDetails.responseText.split("#");
	
	var colorArray = new Array(10);
	
	var parser = new DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
	var entries = dom.getElementsByTagName('color');
	
	for(var k = 0; (k < entries.length); k++) colorArray[k] = "#" + entries[k].textContent;
	
	//added 4-17-06 to make sure it doesn't pull an all black color scheme
	if ((colorArray[9] == "#000000" && colorArray[0] == "#000000") || colorArray[0] == "" || colorArray.join('') == "") {
		failedBlackAttempts++;
		if (failedBlackAttempts < 5) {
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
		GM_LOG("colorArray = " + colorArray.join('*'));
		return 1;
	}
	RecordTimer("Sort by brightness");
	
	
	StartTimer("Add to cache");

	cacheType = UrlToCacheType(photoUrl);
	
	var splitUrl = photoUrl.split("/");
	var filename=splitUrl[splitUrl.length - 1];
	
	//alert("cache type: " + cacheType);
	cacheName = CacheTypeToCacheName(cacheType);
	
	
	try { cachedPageColors = GM_getValue(cacheName,''); }
	catch(err) { /*Die silently*/ alert("Error: Can not read from cache.\n\nabout:config key was reset; Restart firefox."); }
	
	
	
	if ((typeof cachedPageColors == 'undefined') || (cachedPageColors.length == 0)) GM_setValue(cacheName,filename + '-' + colorArray.join('*'));
	else {
		var cachedPageColorsSplit = cachedPageColors.split(',');
		
		if (cachedPageColorsSplit.length + 1 >= 190) {
			//  alert("Num of Cached: " + cachedPageColorsSplit.length);
			//  alert('old records: ' + cachedPageColorsSplit.join('\n'));
			
			for(x = 0; x < cachedPageColorsSplit.length - 1; x++) {
				cachedPageColorsSplit[x] = cachedPageColorsSplit[x + 1];
			}
			cachedPageColorsSplit[cachedPageColorsSplit.length - 1] = filename + '-' + colorArray.join('*');
			//  alert('new records: ' + cachedPageColorsSplit.join('\n'));
			GM_setValue(cacheName,cachedPageColorsSplit.join(','));
		}
		else GM_setValue(cacheName,cachedPageColors + "," + filename + '-' + colorArray.join('*'));
	}
	RecordTimer("Add to cache");			
	
	
	RecordTimer("Server Access");
	
			
	if (applyColors != false) {
		StartTimer("InsertCSS");
		
		//if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', colorArray.join('*'));
		
		if (window.document.body.getAttribute('startingColorArray') == null) window.document.body.setAttribute('startingColorArray', "#00006F*#052A59*#002973*#253E5C*#3475C3*#637D9C*#B0B3C1*#C6CDF2*#F9FAFA*#FFFFFF");
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
	}
	
	//alert("Loaded '" + photoUrl + "' and applyColors=" + applyColors + ".");
	
	return 0;
}
