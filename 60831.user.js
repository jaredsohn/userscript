// ==UserScript==
// @name           Delicious Link Tooltop
// @namespace      GPM
// @description    Shows Delicious info for the target page in a tooltip when you hover over a link.
// @include        *
// @exclude        http://facebook.com/*
// @exclude        https://facebook.com/*
// @exclude        http://*.facebook.com/*
// @exclude        https://*.facebook.com/*
// @exclude        http://images.google.*/*
// @exclude        http://*.google.*/images?*
// ==/UserScript==
// Some older browsers may need JSON, but this link is broken:
// @require        http://json.org/json2.js



// == Config ==

var showTooltips      = true;    // Make little info boxes pop up when you hover over a link.
var lookupCurrentPage = true;    // Display count for this page shown in top-right corner.
var annotateAllLinks  = false;   // Lookup every link on the page (almost), and display its count in a blue box after the link.
                                 // Delicious may occasionally block this for spamming (temporarily).

var enableJSONPonHTTPS = false;  // JSONP only works on https pages in Chrome if the user confirms each page.  This is a hassle so it is disabled by default.

var maxCacheSize = 2400;                 // Global cache limit for Greasemonkey/GM_setValue.
var maxCacheSizeForLocalStorage = 1000;  // Per-site cache limit for Chrome/localStorage.

var showProgress = true;   // Highlights each link in yellow while we are making a delicious request on it.  Messy but informative if lookup fails!
var logRequests  = false;
var logResponses = true;
var displayCleanupInTitle = true;   // To debug if (display when) the cleanup is lagging your browser.



/* == Changelog ==

 2012-02-20  Prevented interfering with top bar of Google.

 2012-02-05  Added enableJSONPonHTTPS.  If you turn it on in Chrome, you will
             need to answer the browser's "Load Insecure Content?" popup.
             (Do this only if you trust Delicious.com!)  Visit github to test.

             Does not affect Firefox.  Greasemonkey's GM_xmlhttpRequest still
             works fine on https pages.

 2012-01-31  Noticed that lookups are not working on https pages.  Surprised I
             hadn't seen this before.

 2012-01-30  Uploaded new version to userscripts.org.

 2011-11-??  I think I fixed lookup bugs by generating the md5sum here (big lib).
             Earlier versions without the md5sum may still be usable!

*/



// TODO: Move this to its own script!!
if (this.GM_addStyle) { GM_addStyle("a:visited { color: #440066; }"); }



//// NOTES for Delicious Network Add:
// GET http://delicious.com/settings/networkadd?networkadd=EHKNIGHT&.crumb=7FsAGAcj8szIc7Pt_37ua1qsjMM-
// GET http://delicious.com/network?add=EHKNIGHT
// GET http://delicious.com/EHKNIGHT?networkaction=1
//// When user hits OK:
// POST http://delicious.com/settings/networkadd?.crumb=7FsAGAcj8szIc7Pt_37ua1qsjMM-&jump=%2FEHKNIGHT%3Fnetworkaction%3D1&network-action-ok=&networkadd=EHKNIGHT
// redirects to: http://delicious.com/EHKNIGHT?networkaddconfirm=EHKNIGHT

// TODO: Don't annotate images, duplicates of last, or anything on delicious.com

//// Some old stats:
// Cleanup of cache size 2048 took 27 seconds in Firefox 4.
// Cleanup of cache size 1024 took 6.7 seconds in Firefox 4.
// In Chrome 512 means my cache cleanup takes 2-5 seconds.




// log = (unsafeWindow.console && unsafeWindow.console.log) ? unsafeWindow.console.log : GM_log;
// log = GM_log;
function log(x,y,z) {
	if (this.GM_log) {
		GM_log(x,y,z);
	} else if (this.console && console.log) {
		console.log(x,y,z);
	}
	window.status = ""+x+" "+y+" "+z;
}


/*
// == Silly scrolling logger == //
var scrollText = "";

function showScroller() {
	window.status = scrollText.substring(0,240).replace(/\s/,' ','g');
}

function animateScroller() {
	showScroller();
	if (scrollText.length > 0)
		setTimeout(animateScroller,200);
	scrollText = scrollText.substring(10);
}

var oldLog = log;
log = function(x) {
	oldLog(x);
	if (scrollText == "") // if not, there is probably already a timeout running
		setTimeout(animateScroller,2000);
	scrollText = scrollText + "     " + x;
	showScroller();
};
*/



// == Notes == //

// DONE: Rename script "Get Link Meta" or "Get Delicious Info for Links" or
// "Delicious Link Tooltip" with an accidental typo then upload it.

// Some code adapted from Hover Links userscript.
// Thanks to: http://delicious.com/developers
// The delicious JSON url we use is:
//   http://feeds.delicious.com/v2/json/urlinfo?url=http://www.google.co.uk/

// DONE: Since bookmarklets can't make CD-XHR, we could use a JSONP proxy like:
//   http://hwi.ath.cx/json_plus_p?url=http://feeds.delicious.com/... ?

// DONE: onclick should cancel the lookup (user has followed link, no need to query)

// DONE: If the XHR request calls callback *after* we have done mouseout, link still
// appears.  Related problem if two requests are being made and neither has run
// callback yet.  Recommend setting/unsetting/checking var targettingLink =
// null or elem;  Or maybe we can use stillFocused.

// DONE: We prevent a second XHR being made if one is already running for a
// given link, by saving the "working..." string in the dataCache.

// DONE: Give all tags an automatic color by hash, but not too vivid.  May help
// us to track common tags.

// TODO: Many Mediawiki sites are configured to show a tooltip for external
// links, and this can conflict with our tooltip!
// We could try to stop this in all cases, by doing evt.preventDefault() on all
// mouseovers/outs, but that is a bit strong.
// At least a fix for the Mediawiki problem would make us (me) happy.
// Tried 100x larger zIndex but no success.
// Maybe it's the browser's display of the alt or title property.

// DONE: Activate for links added to the document later.  Should add a
// DOMNodeInserted event listener.  Or maybe neater, add listeners to the top
// of the doc, but have them only activate on A elements.

// I made some of the info in the tooltip into links, but to access them we
// have to allow mouseover the tooltip without it disappearing.  I tried to
// implement that but things haven't been 100% smooth since...

// DONE: Sometimes if we move quickly over to the link, no tooltip will appear.
// DONE: The tooltip should appear wherever we last mousemoved-ed over the
// link, (current cursor pos) rather than where we mouseover-ed (entered it).
// HMMM it seems to me that this is happening when we mouseover the <EM> part
// of a Google result but works fine on the non-EM parts.  So maybe we should
// be using capture?

// DONE: The right-floating popBar/Cont is working for Chrome and Konq, but not FF!
// Forget CSS float, I used a TABLE and all works fine.  :)
// TODO: Tidy up the aftermath.
// Unfortunately the table appears to override our popWidth, but maybe we don't
// need/want that anymore anyway.

// TODO: Automatic annotation's decision about which links to scan could be improved.
// e.g. some search ? links could be checked if they are short.  Some same-host links
// we may also want to checked.  But some URLs we definitely won't want to, e.g. if
// they appear to contain a (large) session ID.

// TODO BUG: The addition of the blue number "flag" by annotateAllLinks will
// often cause parts of the page to grow, breaking the intended CSS layout.  We
// should seek to mitigate this.
//
// Proposal: If flag is being added in the middle of some text, then expand the
// text by adding it inline.  But if flag is being added at the end (last
// child) of a layout element, then instead float it above the element to avoid
// changing the size of the container.  This will require determination of the
// real offset of the element.  Note the link may be inside a <b> which we must
// step outside to determine whether it is at the end of a container or not.



// == Config == //

var max_width = 300;
var getWebsiteInfoOnly = false;   // Shows info for target website, not target page.
var bg_color = "#EAEAEA";
var warn_color = "#FF4444";
var border_color = "#AAAAAA";
var font_color = "#000000";
var font_face = ""; // "tahoma";
var font_size = "11px";



// == Library functions == //

function hsv2rgbString(h,s,v) {
	// hsv input values range 0 - 1, rgb output values range 0 - 255
	// Adapted from http://www.easyrgb.com/math.html
	var red, green, blue;
	if(s == 0) {
		red = green = blue = Math.round(v*255);
	} else {
		// h should be < 1
		var var_h = h * 6;
		if (var_h == 6) var_h = 0; // TODO: get offset if h<0 or h>1
		var var_i = Math.floor( var_h );
		var var_1 = v*(1-s);
		var var_2 = v*(1-s*(var_h-var_i));
		var var_3 = v*(1-s*(1-(var_h-var_i)));
		if (var_i==0) {
			red = v; 
			green = var_3; 
			blue = var_1;
		} else if(var_i==1) {
			red = var_2;
			green = v;
			blue = var_1;
		} else if(var_i==2) {
			red = var_1;
			green = v;
			blue = var_3
		} else if(var_i==3) {
			red = var_1;
			green = var_2;
			blue = v;
		} else if (var_i==4) {
			red = var_3;
			green = var_1;
			blue = v;
		} else {
			red = v;
			green = var_1;
			blue = var_2
		}
		red = Math.round(red * 255);
		green = Math.round(green * 255);
		blue = Math.round(blue * 255);
	}
	return "rgb("+red+","+green+","+blue+")";
}

function getHash(str) {
	var sum = 0;
	for (var i=0;i<str.length;i++) {
		sum = sum + (253*i)*(str.charCodeAt(i));
		sum = sum % 100000;
	}
	return sum;
}

function startsWith(bigStr,smallStr) {
	return (smallStr === (""+bigStr).substring(0,smallStr.length));
}

function unescapeHTML(htmlString) {
	var tmpDiv = document.createElement("DIV");
	tmpDiv.innerHTML = htmlString;
	return tmpDiv.textContent;
}

function getCanonicalUrl(url) {
	if (url.substring(0,1)=="/") {
		url = document.location.protocol + "://" + document.location.domain + "/" + url;
	}
	if (!url.match("://")) {
		// Surely wrong: url = document.location.path + "/" + url;
		// Also fail imo: url = document.location.protocol + "://" + document.location.domain + document.location.pathname + "/" + url;
		url = document.location.href.match("^[^?]*/") + url;
	}
	return url;
}

function getHostnameOfUrl(url) {
	return url.split('/')[2];
	// return url.match(/[^:]*:[/][/][^/]*[/]/)[0];
}

function addCommasToNumber(num) {
	var str = (num+"").split(".");
	dec=str[1]||"";
	num=str[0].replace(/(\d)(?=(\d{3})+\b)/g,"$1,");
	return (dec) ? num+'.'+dec : num;
}

function boldTextElement(txt) {
	var span = document.createElement("SPAN");
	try {
		span.appendChild(document.createTextNode(txt));
	} catch (e) {
		log("Problem rendering "+typeof txt+" to textnode: "+txt);
	}
	span.style.fontWeight = 'bold';
	span.style.fontSize = '1.1em';
	return span;
}

function trimString(str) {
	return str.replace(/(^\s*|\s*$)/g,'');
}

// log( "trim1", '' === trimString('   a b c    ') );

// Not checking the element we were passed, but all its children
// BUG: Intended to detect 1 image, but will allow N images.
function isImageAndWhitespace(elem) {
	for (var i=0;i<elem.childNodes.length;i++) {
		var b = elem.childNodes[i];
		var isImage = (b.tagName == "IMG");
		var isEmptyText = (b.nodeType==3 && trimString(b.textContent)=="");
		if (!isImage && !isEmptyText) {
			return false;
		}
	}
	return true;
}



// == Chrome compatibility layer == //

if (typeof GM_log == 'undefined') {
	GM_log = function(data) {
		if (this.console && console.log) {
			console.log(data);
		}
		window.status = ""+data;
	};
}

// We always replace Google Chrome's GM_xmlhttpRequest because it is not cross-site.
var needToJSONP = !this.GM_xmlhttpRequest || window.navigator.vendor.match(/Google/);

var allowedToJSONP = ( document.location.protocol === "https:" ? enableJSONPonHTTPS : true );

// allowedToJSONP can be overridden by loading this script twice.
var secondRun = ( window.DLT_loaded ? true : (window.DLT_loaded=true) && false );
// It was still failing in Chrome even when "load insecure content" was enabled!

if (needToJSONP && (allowedToJSONP || secondRun)) {

// This performs a direct JSONP request from Delicious, circumventing cross-site issues with GM_xhR and XMLHR.
// BUG: Chrome complains if this runs while we are on an https page, and more sites are switching to https!
// OLD BUG: Since Delicious last changed format, they started providing responses with e.g. ... "total_posts": 2L, ...  This 'L' does not parse in Javascript!  It throws "identifier starts immediately after numeric literal" in Firefox, and "Unexpected token ILLEGAL" in Chromium.
// OLD BUG: Interestingly, the "L" does NOT appear if we make a non-callback request through the xhrasjson proxy, or indeed the same callback request direct in Firefox's location bar.  Perhaps we can avoid the "L" by requesting the right content/mime-type in the script tag?
// Jan 2012 - Has the L gone away?  Script seems to be working fine now!
	// GM_log("[DLT] Using Delicious JSONP");
	GM_xmlhttpRequest = function(details) {
		// Insert a callback into the root window, anonymised by a random key.
		var callbackName = "dlt_jsonp_callback_" + parseInt(Math.random()*987654321);
		// Where should we place the callback?  Chrome Userscripts need to obtain unsafeWindow.
		var target = window;
		var weAreInUserscriptScope = (typeof GM_log != 'undefined');
		if (window.navigator.vendor.match(/Google/) && weAreInUserscriptScope) {
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
			target = unsafeWindow;
		}
		var script = document.createElement("script");
		var callbackFunction = function(dataObj) {
			var responseDetails = {};
			responseDetails.responseText = JSON.stringify(dataObj);
			try {
				details.onload(responseDetails);
			} catch (e) {
				// GM_log("[DLT] Problem running details.onload: "+e);
				GM_log("[DLT] Problem running details.onload ("+details.onload+"): "+e);
			}
			// Cleanup artifacts: script and callback function
			delete target[callbackName];
			// document.getElementsByTagName("head")[0].removeChild(script);
			document.body.removeChild(script);
		};
		target[callbackName] = callbackFunction;
		// Request a JSONP response from delicious, which should return some javascript to call the callback.
		script.type = "text/javascript";
		script.src = details.url + "?callback="+callbackName;
		// GM_log("[DLT] Requesting script "+script.src);
		// GM_log("[DLT] Adding "+script+" to "+document.body);
		// document.getElementsByTagName("head")[0].appendChild(script);
		document.body.appendChild(script);
	};

	/*
	//// GM_xhR alternative through a JSONP Proxy
	//// Get your proxy here (for node.js): http://hwi.ath.cx/javascript/xhr_via_json/
	GM_log("[DLT] Attempting to use GM_xhr JSONP proxy ...");
	GM_xmlhttpRequest = function(details) {
		var proxyHost = "hwi.ath.cx:8124";
		// We don't want to send functions to the proxy, so we remove them from the details object.
		var onloadCallback = details.onload;
		var onerrorCallback = details.onerror;
		var onreadystatechangeCallback = details.onreadystatechange;
		delete details.onload;
		delete details.onerror;
		delete details.onreadystatechange;
		// Insert a callback into the root window, anonymised by a random key.
		var callbackName = "xss_xhr_via_jsonp_callback_" + parseInt(Math.random()*987654321);
		var callbackFunction = function(responseDetails) {
			if (onreadystatechangeCallback) {
				responseDetails.readyState = 4;
				onreadystatechangeCallback(responseDetails);
			}
			if (onloadCallback) {
				onloadCallback(responseDetails);
			}
		};
		var weAreInUserscriptScope = (typeof GM_log != 'undefined');
		if (!window.navigator.vendor.match(/Google/) || !weAreInUserscriptScope) {
			// This works fine in Firefox GM, or in Chrome's content scope.
			window[callbackName] = callbackFunction;
		} else {
			// But the window seen from Chrome's userscript scope is sandboxed,
			// and many updates are not shared between scopes.
			// So we must get Chrome's unsafeWindow (the real content window).
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
			// And place the callback in that.
			unsafeWindow[callbackName] = callbackFunction;
		}
		// Request an XHR response from the proxy, which should return some javascript to call the callback.
		var reqStrung = JSON.stringify(details);
		var params = "details="+encodeURIComponent(reqStrung)+"&callback="+callbackName;
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://" + proxyHost + "/xhrasjson?" + params;
		document.getElementsByTagName("head")[0].appendChild(script);
		// The callback should run on a successful response.  But we need to handle errors too.
		// script.onload = function(e) { GM_log("[DLT] Script has loaded."); };
		script.onerror = function(e) {
			var responseDetails = {};
			responseDetails.status = 12345;
			if (onreadystatechangeCallback) {
				responseDetails.readyState = 4;
				onreadystatechangeCallback(responseDetails); // This gets called even on error, right?
			}
			if (onerrorCallback) {
				onerrorCallback(responseDetails);
			}
			throw new Error("Failed to get JSONed XHR response from "+proxyHost+" - the server may be down.");
		};
	};
	*/

} else if (needToJSONP && !allowedToJSONP) {
   GM_log("[DLT] Not attempting to Delicious since we are on https page.");
	return;   // may throw error ;)
}

if (typeof GM_addStyle == 'undefined') {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};
}

if (typeof GM_openInTab == 'undefined') {
	GM_openInTab = function(url) {
		return window.open(url, "_blank");
	};
}

if (typeof GM_registerMenuCommand == 'undefined') {
	GM_registerMenuCommand = function(name, funk) {
		// TODO
	};
}

// DONE: It would be more appropriate to use globalStorage if it is available.
// TODO: But then to be strictly GM-compatible, it should also separate keys by script namespace and name and number!

// This throws an error in FF4 GM: GM_setValue.toString().indexOf("not supported")>=0

if (typeof GM_setValue === 'undefined' || window.navigator.vendor.match(/Google/)) {

	/*
	var storage = this.globalStorage || this.localStorage || this.sessionStorage;
	var name = "some unlabeled";
	*/

	// Removed "globalStorage" storage because in FF4 it offers it but errors when we try to use it.
	// Chrome doesn't offer it ATM.
	var storageTypes = ["localStorage","sessionStorage"];
	var storage,name;
	for (var i=0;i<storageTypes.length;i++) {
		if (this[storageTypes[i]]) {
			storage = this[storageTypes[i]];
			name = storageTypes[i];
			break;
		}
	}

	if (storage) {
		try {
			storage.length; storage.getItem("dummy");
		} catch (e) {
			alert("Tried to use "+name+" but it failed on us!");
			storage = null;
		}
	}

	if (storage) {

		/*
		var allStorages = [this.globalStorage,this.localStorage,this.sessionStorage];
		var names = ["Global","Local","Session"];
		var i = (allStorages.indexOf ? allStorages.indexOf(storage) : 0);
		var name = (i >= 0 ? names[i] : "unknown");
		*/

		GM_log("[DLT] Implementing GM_get/setValue using "+name+" storage.");

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			storage.setItem(name, value);
		};

		GM_getValue = function(name, defaultValue) {
			var value = storage.getItem(name);
			// GM_log("[DLT] GM_get("+name+")");
			// GM_log("[DLT]   gave: "+value);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		};

		GM_deleteValue = function(name) {
			storage.removeItem(name);
		};

		GM_listValues = function() {
			var list = [];
			for (var i=0;i<storage.length;i++) {
				var key = storage.key(i);
				list.push(key);
				// CUSTOM: Only list those values relevant to this plugin!
				// This is not needed since we do it later anyway, in case we have
				// a dodgy implementation of GM_listValues from elsewhere!
				// if (startsWith(key,"CachedResponse")) {
					// list.push(key);
				// }
			}
			GM_log("[DLT] localstorage is holding "+storage.length+" records, "+list.length+" of which are DLT cached responses.");
			return list;
		};

		// Reduce cache size since with localStorage we will have many
		// site-specific caches, not just one!
		if (!document.location.host.match(/wikipedia/)) {
			maxCacheSize = maxCacheSizeForLocalStorage; // per domain
		} else {
			// Wikipedia has many links, so we won't reduce his cachesize.
			// In fact we will make an exception for wikipedia, and double the cache size!
			maxCacheSize *= 2;
			// This assumes localStorage is more capable than Greasemonkey's data
			// store (otherwise we should increase GM's max), or we are accepting
			// the cleanup overhead for the benefit of a large cache on Wikipedia.
		}

	} else {
		GM_log("[DLT] Warning: Could not implement GM_get/setValue.");
		GM_setValue = function(){};
		GM_getValue = function(key,def){ return def; };
		GM_deleteValue = function(){};
		GM_listValues = function() { return []; };
	}

}

// I don't know a need for this at the moment.  My browsers either give me
// get/set/list or nothing at all.
// If we are adding this into a userscript after data already exists, we might
// find some of the existing names through GM_getValue.
// TODO: UNTESTED!
if (typeof GM_listValues == 'undefined') {
	GM_log("[DLT] Implementing GM_listValues using intercepts.");
	var original_GM_setValue = GM_setValue;
	var original_GM_deleteValue = GM_deleteValue;
	GM_setValue = function(name, value) {
		original_GM_setValue(name,value);
		var values = JSON.parse(GM_getValue("#_LISTVALUES") || "{}");
		values[name] = true;
		original_GM_setValue("#_LISTVALUES",JSON.stringify(values));
	};
	GM_deleteValue = function(name) {
		original_GM_deleteValue(name);
		var values = JSON.parse(GM_getValue("#_LISTVALUES") || "{}");
		delete values[name];
		original_GM_setValue("#_LISTVALUES",JSON.stringify(values));
	};
	GM_listValues = function() {
		var values = JSON.parse(GM_getValue("#_LISTVALUES") || "{}");
		var list = [];
		for (var key in values) {
			list.push(key);
		}
		GM_log("[DLT] GM_listValues is holding "+list.length+" records.");
		return list;
	};
}

// Not everyone has JSON!  Here is a cheap and insecure fallback.
if (!this.JSON) {
	GM_log("[DLT] Implementing JSON using uneval/eval (insecure!).");
	this.JSON = {
		parse: function(str) {
			return eval(str);
		},
		stringify: function(obj) {
			return uneval(str);
		},
	};
}

/*
// Chrome also has no uneval, which forced me to change all eval/unevals to
// JSON.parse/stringify, which was a good thing.  :)
// Problem is, my stored data in Firefox was in uneval format, not JSON...
// This wrapper ensures we can parse both types of stored string (new JSON, old uneval).
function JSON_parse(str) {
	var result;
	try {
		result = JSON.parse(str);
	} catch (e) {
		// Parse Error?  Must be an old record!
		GM_log("[DLT] Difficulty parsing \""+str+"\" with JSON - trying uneval.  e="+e);
		try {
			result = eval(str);
		} catch (e2) {
			GM_log("[DLT] Could not parse: \""+str+"\".  e2="+e2);
			result = null;
		}
	}
	return result;
}
*/
// DONE: drop this a couple of month into 2011.  if i haven't fixed those old records by then, I never will!  (If I do hit one again, the error will be thrown again.)
function JSON_parse(str) {
	return JSON.parse(str);
}



// == Delicious lookup service, and cache == //

var dataCache = ({});

var delay = 1000; // slow down the lookupSpeed if we are making many queries

function doLookup(lookupURL,onSuccess,onFailFn) {
	// lookupSpeed = 3000 + 5000*Math.random(); // Do not poll Delicious again for 3-8 seconds
	// lookupSpeed = 1200 + delay;
	// if (delay < 9000)
		// delay += 120;
	delay = delay * 1.08;
	lookupSpeed = delay;
	if (logRequests) {
		log("Requesting info for: "+lookupURL);
	}

	// We can use https here, but it is slower.
	// var jsonUrl = 'http://feeds.delicious.com/v2/json/urlinfo?url=' + encodeURIComponent(lookupURL);
	//// In 2010 this feed URL changed, requiring "?callback" rather than "&callback"
	// In Chrome using https gave an error.  In Firefox (real GM_xmlhttpRequest), Delicious did not respond!
	// Conclusion: keep using http, and click "load insecure content" in Chrome.  :)
	var s = document.location.protocol == "https:" ? "s" : "";
	// var s = "";
	var jsonUrl = 'http'+s+'://feeds.delicious.com/v2/json/urlinfo/' + hex_md5(lookupURL);
	GM_xmlhttpRequest({
		method: "GET",
		url: jsonUrl,
		headers: {
			"Accept":"text/json"
		},
		onload: responseHandler
	});

	function responseHandler(response) {

		if (logResponses) {
			log(("Delicious responded: "+response.responseText+" to "+lookupURL).substring(0,180));
		}
		var resultObj;
		try {
			resultObj = JSON.parse(response.responseText); // older browsers might need to @require json2.js
		} catch (e) {
			log("Failed to parse responseText with JSON: "+response.responseText);
			// resultObj = eval(response.responseText); // INSECURE!
		}
		// The data we want is usually the first element in the array
		if (resultObj && resultObj[0] && resultObj[0].total_posts) {
			resultObj = resultObj[0];
		}
		// We should save a record, even if Delicious had no info, so we
		// won't request a lookup on the same URL.
		// Sometimes Delicious returns "[]" which gets evaled as an Object but
		// one we cannot write to (uneval does not reflect our changes).
		if (resultObj==null || JSON.stringify(resultObj)=="[]") {
			resultObj = {};
		}
		// Overwrite "working..." with the good or failed result
		dataCache[lookupURL] = resultObj;
		dataCache[lookupURL].cacheCount = 0;
		dataCache[lookupURL].lastUsed = new Date().getTime();
		GM_setValue("CachedResponse"+lookupURL,JSON.stringify(dataCache[lookupURL]));
		// log("Set data: "+GM_getValue("CachedResponse"+lookupURL));
		if (resultObj.total_posts) {
			onSuccess(resultObj,lookupURL);
		} else {
			if (onFailFn) {
				onFailFn();
			} else {
				GM_log("[DLT] No result from Delicious, and no onFailFn.");
			}
		}

	}

	// TODO: The GM_xmlhttpRequest should also include an
	// onreadystatechange function to catch any failed requests.
}

function isEmptyObject(o) {
	for (var prop in o) {
		if (prop=="cacheCount" || prop=="lastUsed")
			continue; // do not count as counted properties!
		return false;
	}
	return true;
}

function tryLookup(subjectUrl,onSuccess,onFailure) {
	// Is this record already in our runtime cache?
	if (dataCache[subjectUrl] == null) {
		// If not, try to load it from our persistent cache.
		dataCache[subjectUrl] = JSON_parse(GM_getValue("CachedResponse"+subjectUrl,"null"));
	}
	if (dataCache[subjectUrl] != null) {
		// Having an empty record in the cache is considered a "failure" (to allow for double lookups)
		if (isEmptyObject(dataCache[subjectUrl])) {
			onFailure(dataCache[subjectUrl],subjectUrl);
			return;
		}
		dataCache[subjectUrl].cacheCount++;
		dataCache[subjectUrl].lastUsed = new Date().getTime();
		// I'm paranoid that setValue takes time to complete!  I guess we could just put it after.
		setTimeout(function(){
			GM_setValue("CachedResponse"+subjectUrl,JSON.stringify(dataCache[subjectUrl]));
		},20);
		onSuccess(dataCache[subjectUrl],subjectUrl);
	} else {
		dataCache[subjectUrl] = "working...";
		doLookup(subjectUrl,onSuccess,onFailure);
	}
}

function age(cachedRecord) {
	if (!cachedRecord || cachedRecord.lastUsed == null) {
		// log("Error: record has no date! "+uneval(cachedRecord));
		return 30;
	} else {
		var ageInMilliseconds = (new Date().getTime() - cachedRecord.lastUsed);
		// var ageInMonths = ageInMilliseconds / 86400000 / 30;
		var ageInDays = ageInMilliseconds / 86400000;
		// Avoid division by zero on current time, and future times
		if (ageInDays <= 0.01)
			ageInDays = 0.01;
		return ageInDays;
	}
}

function cleanupCache() {
	if (typeof GM_listValues === 'undefined') {
		log("Cannot cleanupCache - GM_listValues() is unavaiable.");
	} else {

		if (displayCleanupInTitle) {
			var oldTitle = ""+document.title;
			document.title = "[Cleaning cache..]";
		}

		log("Starting cleanupCache ...");
		var startTime = new Date().getTime();

		var fullCacheList = GM_listValues();
		if (typeof fullCacheList.length != 'number') {
			log("Unable to cleanup cache, since fullCacheList has no length!");
			log("fullCacheList =",fullCacheList);
		}

		var realMaxThreshold = maxCacheSize*1.10;

		if (fullCacheList.length < realMaxThreshold) {
			// Before we even trim, if we are below the thresold, we know we won't cleanup.
			// So we can just skip it all!
			fullCacheList = [];
		}

		// Trim the list down to only those entries relevant to this plugin.
		// (Slow but neccessary when we are using localStorage.)
		var cacheList = [];
		for (var i=0;i<fullCacheList.length;i++) {
			var crURL = fullCacheList[i];
			if (startsWith(crURL,"CachedResponse")) {
				cacheList.push(crURL);
			}
		}
		fullCacheList = null; // So GC can act soon if it wishes

		/*
		cacheList = fullCacheList;   // Let's hope it's a real sortable Array!
		*/

		if (cacheList.length < realMaxThreshold) {

			log("Skipping cleanup until overflowed by 10%.");
			// The process below is damn heavy.
			// So we don't want to do it to clean up only 5 records!
			// maxCacheSize should more accurately be called minCacheSize ;)

		} else {

			log("There are "+cacheList.length+" items in the cache.");

			if (displayCleanupInTitle) {
				document.title = "[Cleaning cache...]";
			}

			// Rather casual method: Keep deleting records at random until we meet
			// our max cache size.
			/*
			while (cacheList.length > 512) {
				var i = parseInt(Math.random() * cacheList.length);
				// log("Deleting "+cacheList[i]+" length is currently "+cacheList.length);
				GM_deleteValue(cacheList[i]);
				// delete cacheList[i];
				cacheList[i] = cacheList[cacheList.length-1];
				cacheList.length--;
			}
			*/

			function getScoreFor(crURL) {
				var url = crURL.replace(/^CachedResponse/,'');
				if (dataCache[url] == null) {
					dataCache[url] = JSON_parse(GM_getValue(crURL,"null"));
				}
				if (dataCache[url] == null) {
					log("Warning! Empty cache entry for "+url);
					dataCache[url] = {};
				}
				// All cached urls have a minimum score of 2.
				// log("Generating score form cacheCount="+dataCache[url].cacheCount+" and age="+age(dataCache[url]));
				var thisScore = (dataCache[url].cacheCount+2) / age(dataCache[url]);
				if (isNaN(thisScore)) // e.g. if dataCache[url] == null
					thisScore = 0.00001;
				return thisScore;
			}

			// Inefficient method: find the least valuable entry, remove it, then
			// repeat.
			/*
			// Delete the oldest and least-used, keep new/popular entries
			function cleanupOne() {
				if (cacheList.length > maxCacheSize) {
					var poorestScore = 99999;
					var poorestScorer = null;
					for (var i=0;i<cacheList.length;i++) {
						if (Math.random() < 0.25) // Only really scan quarter the record set
							continue; // so we sometimes keep new (cacheCount=0) records
						var crURL = cacheList[i]; // e.g. "CachedResponsehttp://..."
						thisScore = getScoreFor(crURL);
						if (!poorestScorer || thisScore < poorestScore) {
							poorestScore = thisScore;
							poorestScorer = crURL;
							poorestScorerIndex = i;
						}
					}
					if (poorestScorer == null) {
						log("Found nothing to cleanup.");
						return false;
					}
					var url = poorestScorer.replace(/^CachedResponse/,'');
					// log("Cleaning up "+poorestScorer+" with "+ ( dataCache[url] ? "age="+age(dataCache[url])+" and count="+dataCache[url].cacheCount : "score="+poorestScore ) +" and uneval="+uneval(dataCache[url]) );
					log("Cleaning up "+poorestScorer+" with count="+dataCache[url].cacheCount+" and age="+(""+age(dataCache[url])).substring(0,6));
					GM_deleteValue(poorestScorer);
					// cacheList = GM_listValues();
					cacheList[poorestScorerIndex] = cacheList[cacheList.length-1];
					cacheList.length--;

					setTimeout(cleanupOne,100);
				} else {
					if (displayCleanupInTitle) {
						if (oldTitle === "")
							oldTitle = " ";   // If we try to set "", Chrome does nothing
						document.title = oldTitle;
					}
					log("Cleanup took "+(new Date().getTime() - startTime)/1000+" seconds.");
				}
			}

			setTimeout(cleanupOne,100);
			*/

			// Better scalable method: Find all the low scorers in one pass:
			// Disadvantage: not run on a timer!

			if (displayCleanupInTitle) {
				document.title = "[Cleaning cache....]";
			}

			function compare(crURLA, crURLB) {
				return getScoreFor(crURLA) - getScoreFor(crURLB);
			}

			var sortedList = cacheList.sort(compare);

			if (displayCleanupInTitle) {
				document.title = "[Cleaning cache....]";
			}

			/*
			GM_log("[DLT] Score for 0 = "+getScoreFor(sortedList[0]));
			GM_log("[DLT] Score for 10 = "+getScoreFor(sortedList[10]));
			GM_log("[DLT] Score for 100 = "+getScoreFor(sortedList[100]));
			*/

			if (sortedList.length > maxCacheSize) {
				GM_log("[DLT] Removing "+(sortedList.length-maxCacheSize)+" records.");
			}

			// sortedList.slice(maxCacheSize)
			for (var i=maxCacheSize; i<sortedList.length; i++) {
				var crURL = sortedList[i]; // e.g. "CachedResponsehttp://..."
				var poorestScorer = crURL;
				var url = crURL.replace(/^CachedResponse/,'');
				// log("Cleaning up "+poorestScorer+" with count="+dataCache[url].cacheCount+" and age="+(""+age(dataCache[url])).substring(0,6));
				GM_deleteValue(poorestScorer);
			}

			log("Cleanup took "+(new Date().getTime() - startTime)/1000+" seconds.");

		}

		if (displayCleanupInTitle) {
			if (oldTitle === "")
				oldTitle = document.location.href;   // If we set "" or " ", Chrome does nothing!
			document.title = oldTitle;
		}

	}
}





// == Link tooltip (popup on rollover) == //

var timer;
var stillFocused;
var tooltipDiv;

var rolledOverTooltip = false;

// A different version of tryLookup, which will try to lookup the hostname if the initial URL failed.
function initiateDoubleLookup(lookupURL,onSuccess) {
	function onFailure() {
		var hostUrl = "http://"+getHostnameOfUrl(lookupURL)+"/";
		if (hostUrl != lookupURL) {
			lookupURL = hostUrl;
			tryLookup(lookupURL,onSuccess,function(){log("Both URL and host lookup failed for "+hostUrl+"");});
		}
	}
	tryLookup(lookupURL,onSuccess,onFailure);
}

function positionTooltip(evt) {
	if (tooltipDiv) {
		var posx = evt.clientX + window.pageXOffset;
		var posy = evt.clientY + window.pageYOffset;

		tooltipDiv.style.right = '';
		tooltipDiv.style.left = (posx + 15) + "px";
		tooltipDiv.style.top = (posy + 12) + "px";

		if (tooltipDiv.clientWidth > max_width) {
			tooltipDiv.style.width = max_width + "px";
		}

		var scrollbarWidth = 20;
		// If the cursor is so low in the window that the tooltip would appear
		// off the bottom, then we move it to above the cursor
		if (parseInt(tooltipDiv.style.top) + tooltipDiv.clientHeight + scrollbarWidth > window.innerHeight + window.pageYOffset) {
			tooltipDiv.style.top = (posy - 7 - tooltipDiv.clientHeight) + "px";
		}
		// Similar for the right-hand-side, but beware the browser might have
		// reduced clientWidth in an attempt to make everything fit, so instead
		// we use divWidth.
		var divWidth = ( tooltipDiv.clientWidth > max_width ? tooltipDiv.clientWidth : max_width ) + 20;
		if (parseInt(tooltipDiv.style.left) + divWidth + scrollbarWidth > window.innerWidth + window.pageXOffset) {
			// tooltipDiv.style.left = (posx - 15 - divWidth) + "px";
			tooltipDiv.style.left = '';
			tooltipDiv.style.right = (window.innerWidth - posx + 5) + "px";
			// tooltipDiv.style.width = divWidth;
			if (tooltipDiv.clientWidth > max_width) {
				tooltipDiv.style.width = max_width + "px";
			}
			// TODO: Can move the tooltip too far left, if it is naturally narrow.
		}
		// The +scrollbarWidth deals with the case when there is a scrollbar
		// which we don't want to be hidden behind!
		// TODO: To prevent the flashing of scrollbar (visible in Konq, invisible
		// but slow in FF), we should use desiredWidth/Height to check the
		// situation before setting bad left/top in the first place.
		// This does still occasionally occur, but seems to go away after the
		// first move-to-left.
	}
}

function showResultsTooltip(resultObj,subjectUrl,evt) {
	// if (stillFocused == link) {
	// log("Displaying results for "+subjectUrl+": "+uneval(resultObj));
	hideTooltip();

	tooltipDiv = document.createElement("div");
	tooltipDiv.id = "DLTtooltip";
	// tooltipDiv.setAttribute("style", "background:" + bg_color + ";border:1px solid " + border_color + ";padding:2px;color:" + font_color + ";font-family:" + font_face + ";font-size:" + font_size + ";position:absolute;z-index:100000;")
	tooltipDiv.style.backgroundColor = bg_color;
	tooltipDiv.style.border = "1px solid "+border_color;
	tooltipDiv.style.padding = '6px';
	tooltipDiv.style.color = font_color;
	tooltipDiv.style.fontFamily = font_face;
	tooltipDiv.style.fontSize = font_size;
	tooltipDiv.style.position = "absolute";
	tooltipDiv.style.zIndex = 100000;
	tooltipDiv.style.textAlign = 'left';
	tooltipDiv.style.lineHeight = '';

	tooltipDiv.addEventListener('mouseover',function(evt){
			rolledOverTooltip = true;
	},false);

	tooltipDiv.addEventListener('mouseout',function(evt){
			hideTooltipMomentarily();
	},false);

	// Sometimes Delicious returns a result with nothing but the hash and
	// total_posts=1.  These days I am getting this more often than
	// resultObj==null, but it is about as informative, so:
	if (resultObj && resultObj.total_posts==1 /*&& resultObj.hash*/ &&
			resultObj.url=="" && resultObj.title=="" &&
			resultObj.top_tags.length==0) {
		GM_log("[DLT] Got boring response: "+JSON.stringify(resultObj));
		resultObj = null;
	}
	// However I think this may be due to the fact that there are *private*
	// bookmarks for the URL.  If so, Delicious is a little bit naughty in
	// admitting that they even exist in its database!
	// TODO: Test this theory!

	if (resultObj && resultObj.total_posts) {

		if (unescapeHTML(resultObj.url) != subjectUrl) {
			var warningSpan = document.createElement("SPAN");
			if (unescapeHTML(resultObj.url) == getHostnameOfUrl(subjectUrl)) {
				warningSpan.appendChild(document.createTextNode("Results for website"));
			} else {
				// Sometimes Delicious returns a different URL from the one requested.
				// So far this has always seemed fine to me, either adding or
				// removing index.html, or changing a few irrelevant CGI params.
				// TODO/CONSIDER: So maybe the warning colors/message are not needed?
				// Hmm no there is an example where it's not fine.  The "Shopping"
				// link along the top of Google's search results page.  It's
				// actually just a bunch of CGI parameters.  But Delicious drops
				// all the parameters and gives me the results for the top domain
				// page (http://www.google.com/).  This is not the link I wanted
				// info for, so the warnings are needed!
				warningSpan.appendChild(document.createTextNode("Results for: "+resultObj.url));
			}
			warningSpan.style.backgroundColor = warn_color; // TODO: Oddly this does not get applied in Konqueror!
			warningSpan.style.color = 'white';
			warningSpan.style.padding = '3px 6px';
			warningSpan.style.fontWeight = 'bold';
			tooltipDiv.appendChild(warningSpan);
			tooltipDiv.appendChild(document.createElement('BR'));
		}

		var titleCont = document.createElement("TD");
		titleCont.style.backgroundColor = bg_color;

		// titleCont.appendChild(document.createTextNode("Title: "));
		// titleCont.appendChild(boldTextElement(resultObj.title));
		// titleCont.appendChild(document.createElement('BR'));
		//// The title can contain HTML-encoded chars, so we must decode/present accordingly
		// titleCont.innerHTML += "<B style='font-size:1.1em;'>" + resultObj.title + "</B><BR>";

		var titleElem = boldTextElement(unescapeHTML(resultObj.title));

		// Make it a link?
		var link = document.createElement("A");
		link.href = 'http://delicious.com/url/view?url='+encodeURIComponent(resultObj.url)+'&show=notes_only';
		link.target = "_blank";
		link.style.paddingRight = '8px';
		link.appendChild(titleElem);
		titleElem = link;

		titleCont.appendChild(titleElem);
		//// For some reason Firefox refuses to notice the addition of this
		//// style, so we do it with a CSS class instead.
		// titleCont.className = 'dlttLeft';

		// titleCont.appendChild(document.createTextNode("Popularity: "));
		// titleCont.appendChild(boldTextElement(""+resultObj.total_posts));
		// var popWidth = Math.log(3 + parseInt(resultObj.total_posts))*30;
		var popWidth = Math.log(Number(resultObj.total_posts)/40)*max_width/8;
		if (!popWidth || popWidth<=10) popWidth = 10;
		if (popWidth>max_width) popWidth = max_width;
		var popBar = document.createElement('A');
		popBar.href = link.href;

		popBar.style.backgroundColor = getColorForCount(resultObj.total_posts);
		popBar.style.color = 'white';
		popBar.style.width = popWidth+'px';
		popBar.style.margin = '2px 0px 2px 0px';
		popBar.style.padding = '3px 8px 2px 8px';
		popBar.style.textAlign = 'right';
		popBar.style.textDecoration = 'none'; // do not underline popularity (although it is a link)
		// popBar.appendChild(document.createTextNode(" "));
		// popBar.style.float = 'right'; //// Ahhh apparently .float was renamed .cssFloat or .styleFloat for IE
		popBar.appendChild(boldTextElement(addCommasToNumber(resultObj.total_posts)));

		var popBarCont = document.createElement("TD");
		popBarCont.appendChild(popBar);
		// popBarCont.style.float = 'right';
		// popBarCont.className = 'dlttRight';
		// popBarCont.style.position = 'fixed';
		// popBarCont.style.right = '0px';
		popBarCont.style.textAlign = 'right';
		// popBarCont.align = 'right';
		popBarCont.align = 'right';

		// titleCont.appendChild(popBarCont);

		var topTable = document.createElement("TABLE");
		topTable.width = '100%';
		var topRow = document.createElement("TR");
		topTable.appendChild(topRow);
		topRow.appendChild(titleCont);
		topRow.appendChild(popBarCont);
		tooltipDiv.appendChild(topTable);
		topTable.style.backgroundColor = bg_color;
		/*
		titleCont.style.float = 'left';
		popBarCont.style.float = 'right';
		tooltipDiv.appendChild(titleCont);
		tooltipDiv.appendChild(popBarCont);
		tooltipDiv.style.overflow = 'auto'; // Fix floating problems?
		*/

		/* top_tags is a hashtable, it has no .length */
		if (resultObj.top_tags /* && resultObj.top_tags.length>0 */ ) {

			// tooltipDiv.appendChild(document.createElement("BR"));

			var tagsCont = document.createElement("P");
			tagsCont.style.marginTop = '4px';
			tagsCont.style.marginBottom = '1px';
			// tagsCont.style.float = 'right';
			var tagsDiv = document.createElement("DIV");
			tagsDiv.style.textAlign = 'right';

			/*
			//// Simple list
			var tags = "";
			for (var tag in resultObj.top_tags) {
				tags += (tags==""?"":", ") + tag;
			}
			tagsDiv.appendChild(document.createTextNode("Tags: "+tags+""));
			*/

			//// List with colored tags
			var first = true;
			for (var tag in resultObj.top_tags) {
				if (!first)
					tagsDiv.appendChild(document.createTextNode(", "));
				first = false;

				var tagSpan = document.createElement("SPAN");

				tagSpan.appendChild(document.createTextNode(tag));
				tagSpan.style.color = hsv2rgbString( (getHash(tag)%256)/256, 1.0, 0.5 );

				// Make it a link?
				var link = document.createElement("A");
				link.href = "http://delicious.com/tag/"+tag;
				link.target = "_blank";
				link.title = resultObj.top_tags[tag];
				link.style.textDecoration = 'none'; // do not underline tags
				link.appendChild(tagSpan);
				tagSpan = link;

				tagsCont.appendChild(tagsDiv);

				tagsDiv.appendChild(tagSpan);

			}

			tooltipDiv.appendChild(tagsCont);

		}

	} else {
		tooltipDiv.appendChild(document.createTextNode("No info for "+subjectUrl));
	}
	document.body.appendChild(tooltipDiv);
	positionTooltip(evt);
	// log("tooltipDiv.innerHTML = "+tooltipDiv.innerHTML);
}

// Old: These functions make use of the scope vars link and subjectUrl.
// Note: These functions make use of the scope var dataCache.

function createTooltip(evt) {

	hideTooltip();

	var link = evt.target;

	lastMoveEvent = evt;

	stillFocused = link;

	// Links we do not want to act on:
	if (link.href.match(/^javascript:/))
		return;
	if (document.location.hostname == link.hostname
			&& document.location.pathname == link.pathname)
		return;   // Either a link to self, or a # link to an anchor in self

	var subjectUrl = getCanonicalUrl(link.href);
	// Remove any #anchor from the url
	subjectUrl = ""+subjectUrl.match(/^[^#]*/);

	if (dataCache[subjectUrl] == "working...") {
		return;  // We can't do anything useful here.  We must wait for the XHR to respond.
	}

	var waitTime = ( dataCache[subjectUrl] != null ? 300 : 2000 );

	timer = setTimeout(
			function(){
				if (stillFocused==link) {
					initiateDoubleLookup(subjectUrl,function(foundResults,foundUrl) {
						showResultsTooltip(foundResults,subjectUrl,lastMoveEvent || evt);
					});
				}
			},waitTime);


}

function hideTooltipMomentarily() {
	rolledOverTooltip = false;
	stillFocused = null;
	setTimeout(function(){
			if (stillFocused == null && !rolledOverTooltip)
				hideTooltip();
	},200);
}

function hideTooltip() {
	stillFocused = null;
	if (timer) {
		clearTimeout(timer);
		timer = null;
	}
	// TODO: iff we are mousingoff the link, we should delay before closing, to see if the user is mousing onto the tooltip, and if so not hide.
	if (tooltipDiv) {
		if (tooltipDiv.parentNode) {
			tooltipDiv.parentNode.removeChild(tooltipDiv);
		}
		tooltipDiv = null;
	}
	rolledOverTooltip = false;
}

function initialiseTooltipListeners() {

	// GM_addStyle(".dlttLeft { float: left; }");
	// GM_addStyle(".dlttRight { float: right; }");

	/*
	for (var i=0; i<document.links.length; i++) {
		var link = document.links[i];
		link.addEventListener("mouseover",createTooltip,false);
		link.addEventListener("mouseout",hideTooltip,false);
		// TODO: We should only really enable the mousemove/out/down events when we have done a mouseover!
		link.addEventListener("mousemove",positionTooltip,false);
		// If user clicks either button on the link, then we hide it
		link.addEventListener("mousedown",hideTooltip,true);
	}
	*/

	// A better event listener, which will respond to links added to the DOM later.
	// DONE: One problem with this method.  If we mouseover a //A/EM then the event
	// doesn't fire!
	// DONE: I guess we better look up the tree at our parentNodes for the A, and maybe
	// even change/fake the evt.target to point to the A!

	// DONE: New bug with the new global event listener.  Now we can't mouseover
	// the tooltip any more.  :s
	// Maybe the problem here is the As inside the tooltip.  But why wasn't that a
	// problem before? :o
	// Solved with checkParentsForId().

	// TODO: One bug with this method is that when moving in or out of the SPAN
	// inside the A, a mouseout then a mouseover get fired on the A.  This is
	// slightly hard to fix, how to we know whether the mouseout should be fired or
	// not?

	// var linksOnly = function(evt) { return (evt && evt.target && evt.target.tagName == "A"); };

	function checkParentsForId(node,id) {
		while (node) {
			if (node.id == id)
				return true;
			node = node.parentNode;
		}
		return false;
	}

	var linksOnly = function(evt) {
		var node = evt.target;
		// We don't want to act on links inside the tooltip
		if (checkParentsForId(node,"DLTtooltip"))
			return null;
		while (node) {
			// We do not want to count e.g. <A name="..."> links!
			if (node.tagName == "A" && node.href)
				return node;
			node = node.parentNode;
		}
		return node;
	};

	addGlobalConditionalEventListener("mouseover",createTooltip,linksOnly);
	addGlobalConditionalEventListener("mouseout",hideTooltipMomentarily,linksOnly);
	// TODO: We should only really enable the mousemove/out/down events when we have done a mouseover!
	// addGlobalConditionalEventListener("mousemove",positionTooltip,linksOnly);
	addGlobalConditionalEventListener("mousemove",function(evt){if (evt.target == stillFocused) { lastMoveEvent=evt; } },linksOnly);
	// If user clicks either button on the link, then we hide it
	addGlobalConditionalEventListener("mousedown",hideTooltip,linksOnly);

	function addGlobalConditionalEventListener(evType,handlerFn,whereToFireFn) {
		document.body.addEventListener(evType,function(evt){
				// if (conditionFn(evt)) {
				var finalTarget = whereToFireFn(evt);
				if (finalTarget) {
					var fakeEvt = ({});
					// Maybe better to do a for (var prop in evt) to construct fakeEvt?
					// Hmm no that acts weird, only showing properties for evt which I
					// have already read!
					// OK then let's just set the ones we know we need:
					fakeEvt.target = finalTarget;
					fakeEvt.clientX = evt.clientX;
					fakeEvt.clientY = evt.clientY;
					/* if (evType != "mousemove") {
						log("Performing "+evType+" on "+fakeEvt.target);
					} */
					return handlerFn(fakeEvt);
				}
		},true);
	}

}



// == Initialise Tooltips == //

if (showTooltips) {
	initialiseTooltipListeners();
}



// == Initialise current-page auto-lookup == //

function getColorForCount(tot) {

	/*
	//// Colorful version (light cyan to dull dark blue)
	var thru = Math.log(Number(tot)/40)/8;
	// popBar.style.backgroundColor = 'rgb(128,'+parseInt(127+128*thru)+','+parseInt(255-128*thru)+')';
	// var hue = 2/3 - 1/3*thru;   // blue -> cyan -> green
	// var hue = thru/3;        // red -> yellow -> green
	// var saturation = 0.4;
	// var variance = 0.9;
	var hue = 1.8/3;
	var saturation = 0.6+0.3*thru;
	var variance = 0.9-0.4*thru;
	return hsv2rgbString(hue, saturation, variance);
	*/

	//// One-hue version, faint light to strong dark blue.
	var greatness = Math.min(1.0,Math.log(tot) / Math.log(10000));
	var saturation = 40 + 60*greatness;
	var brightness = 70 - 30*greatness;
	// scoreSpan.style.backgroundColor = hsv2rgbString(2/3,0.3+0.5*greatness,0.8);
	return "hsl(240,"+saturation+"%,"+brightness+"%)";

}

function createScoreSpan(resultObj) {
	var scoreSpan = document.createElement("span");
	if (resultObj.total_posts) {
		var text = addCommasToNumber(resultObj.total_posts);
		scoreSpan.appendChild(boldTextElement(text));
		scoreSpan.style.backgroundColor = getColorForCount(resultObj.total_posts);
	}
	scoreSpan.style.color = 'white';
	scoreSpan.style.fontWeight = 'bold';
	if (resultObj.top_tags) {
		var tagArray = [];
		for (var tag in resultObj.top_tags) {
			tagArray.push(tag);
		}
		// Not needed - they are already sorted
		tagArray.sort( function(a,b) {
				return resultObj.top_tags[a] < resultObj.top_tags[b];
		});
		scoreSpan.title = tagArray.join(", ");
		// scoreSpan.title = "Popularity: "+addCommasToNumber(resultObj.total_posts) + " Tags: "+tagArray.join(", ");
		// scoreSpan.title = addCommasToNumber(resultObj.total_posts)+" "+tagArray.join(", ");
	}
	return scoreSpan;
}

if (lookupCurrentPage) {
	try {
		tryLookup(document.location.href,function(resultObj,subjectUrl,evt){
			if (resultObj.total_posts) {
				var lc_div = createScoreSpan(resultObj);
				lc_div.style.position = 'fixed';
				lc_div.style.top = '20px';
				lc_div.style.right = '20px';
				lc_div.style.padding = '4px';
				lc_div.style.fontSize = '2.0em';
				lc_div.style.zIndex = 1209;
				document.body.appendChild(lc_div);
			}
		},function(){
			/* Do nothing on failure. */
		});
	} catch (e) {
		log("DLT On "+document.location);
		log("DLT trying current page lookup, caught exception: "+e);
		log(e);
	}
}



// == Initialise all-links auto-lookup == //

var lookupSpeed = 50;
var lastHref = null;

function addLabel(link) {
	var url = link.href;
	var sameAsLast = (url == lastHref);
	var sameHost = (link.host==document.location.host);
	var badHost = (link.host=="webcache.googleusercontent.com") || (link.host.match(".google.com"));
	var goodUrl = startsWith(url,"http://") || startsWith(url,"https://") || url.indexOf(":")==-1; // skip any "about:config" or "javascript:blah" links
	var hasHash = (url.indexOf("#") >= 0);
	var samePage = (url.split("#")[0] == document.location.href.split("#")[0]);
	// Some links are just too common to spam Deliciouos for all of them.
	// e.g. searches maybe not, but page 3 of the search result no!
	var isGoogleSearch = ( url.indexOf("/search?")>-1 || url.indexOf("/setprefs?")>-1 );
	var isCommonSearch = ( url.indexOf('?q=')>=0 || url.indexOf('&q=')>=0 );
	var isSearch = isCommonSearch || isGoogleSearch;
	if (isCommonSearch) {
		// GM_log("[DLT] Skipping due to ?q= or &q= in "+url);
	}
	var isImage = false; // isImageAndWhitespace(link);
	var isBlacklisted = url.match(/fbcdn.net\//) || url.match(/facebook.com\//);
	var causesDivGrowthOnGoogle = link.parentNode.className=='gbt' || link.className=='gbzt';
	if (sameAsLast || badHost || isSearch || samePage || isImage || isBlacklisted || causesDivGrowthOnGoogle) {
		return;
	}
	if (url && goodUrl) { // && !sameHost

		function addAnnotationLabel(resultObj,subjectUrl,evt){
			// log("Adding annotation for "+url+" with result "+JSON.stringify(resultObj));
			if (resultObj && resultObj.total_posts) {
				var newDiv = createScoreSpan(resultObj);
				var text = " " + (resultObj && addCommasToNumber(resultObj.total_posts)) + " ";
				// BUG TODO: Sometimes the left or right space gets ignored, because we are in a span, and it merges with outer text
				newDiv.textContent = text;
				newDiv.style.marginLeft = '0.2em';
				newDiv.style.marginRight = '0.4em';
				newDiv.style.padding = '0.1em 0.2em 0.1em 0.2em';
				// newDiv.style.padding = '0';
				newDiv.style.verticalAlign = "middle";
				// newDiv.style.verticalAlign = "super";
				// newDiv.style.marginTop = '-1.5em'; // For "super", sometimes works.
				// newDiv.style.marginBottom = '-1.5em'; // Try to not make our parent line grow taller
				newDiv.style.opacity = 0.7;
				// newDiv.style.fontSize = parseInt((greatness+0.1)*10)/10 + 'em';
				newDiv.style.fontSize = '0.6em';
				// newDiv.style.paddingBottom = "0.2em";
				// newDiv.firstChild.style.backgroundColor = "hsv("+2/3+","+greatness+",0.8)";
				link.parentNode.insertBefore(newDiv,link.nextSibling);
				// link.parentNode.appendChild(newDiv);
				// newDiv.addEventListener('mouseover',function(evt){ showResultsTooltip(resultObj,subjectUrl,evt); },false);
				// newDiv.addEventListener('mouseout',hideTooltipMomentarily,false);
			}
			resetColor();
		}

		var resetColor;
		if (showProgress) {
			var oldbgcol = link.style.backgroundColor;
			link.style.backgroundColor = '#ffff44';
			resetColor = function() {
				// log("Resetting color of "+link);
				link.style.backgroundColor = oldbgcol;
			};
		} else {
			resetColor = function() { };
		}

		lastHref = url;

		tryLookup(url,addAnnotationLabel,resetColor);

	}
}

// Let's not auto-annotate links on delicious pages - it is likely to be redundant information!
if (annotateAllLinks && document.location.host != "www.delicious.com") {
	(function(){
		var links = document.getElementsByTagName("A");
		var i = 0;
		function doOne() {
			if (i < links.length) {
				addLabel(links[i]);
				i++;
				if (lookupSpeed <= 50 && Math.random()<0.8) {
					doOne();
				} else {
					setTimeout(doOne,lookupSpeed);
					lookupSpeed = 20;
				}
			} else {
				log("Considered "+i+" links on "+document.location+" for annotation with Delicious labels.");
			}
		}
		doOne();
	})();
}



// == Cleanup old cached data == //

if (Math.random() < 0.1) {
	setTimeout(cleanupCache,1000 * (120+120*Math.random()));
	// 3 minutes +/- 1 minute, to avoid e.g. overlap when opening many pages at the same moment
}



/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

