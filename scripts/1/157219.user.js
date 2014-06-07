// ==UserScript==
// @name           (dm) Wallbase.cc Link Grabber
// @namespace      wallbaselinkgrabber
// @description    Fetch and parse direct image links and create link ontop of thumbnail. Also create clickable button to generate a list of all image links for the viewed page.
// @version        1.0.9
// @lastupdated    2014-04-17
// @match          *://wallbase.cc/search*
// @match          *://wallbase.cc/random*
// @match          *://wallbase.cc/tags*
// @match          *://wallbase.cc/toplist*
// @grant          GM_log
// @grant          GM_xmlHttpRequest
// ==/UserScript==

/*
 * Known issue(s):
 * none as of yet
 */

/* **************************
 * Global Var's
 * **************************
 */
var debug = false;
// var debug = true;

//mobile debug:
var mobileDebug = false;

var GM_log;
if (typeof GM_log === 'undefined') { GM_log = function(data) { console.log(data); }; };

/*
 * xHttp object
 *     variables:
 *        maxreq        - maximum number of async requests to do
 *        runcon        - number of running connections
 *        interval    - interval holder
 *        links        - array() object used to help with triggering
 *                        new connections for asyncLoad
 *    functions:
 *
 *        startInterval - starts the interval loop
 *            accepts args: (heartbeat_function, interval)
 *            heartbeat_function = function called on each trigger pulse
 *            interval = integer of ms between interval triggers
 *
 *        stopInterval() - stops the interval loop
 *            no args
 *
 *        load - synchronous xmlHttpRequest
 *            only handles simple "GET"
 *            accepts args: (string url)
 *
 *        asyncLoad    - asynchronous xmlHttpRequest
 *            accepts args: (string url or associative array of options,
 *                    function callback, optional args)
 *                url = url string to load
 *                if object can have params like GM_xmlHttpRequest ex:
 *                {url:String, method:String, headers:{associative array},
 *                    data:String, onload:Function, onerror:Function,
 *                    onreadystatechange:Function}
 *                onload, onerror, onreadystatechange are called with
 *                    function(xmlHttpRequest event object, objparams,
 *                        callback, extra_args);
 *
 *                See below in asyncLoad definition comment for more
 *                    information.
 *
 *                function = callback function called as
 *                    callback(xhtr, string url, optional args)
 *                    do not specify a callback if using an onload above
 *
 *                optional args = single variable passed verbatim to
 *                    the callback function
 *
 *        default_heartbeat
 *            default heartbeat function
 *
 *        default_next_url
 *            default routine to handle next url fetch
 *
 *         default_callback_xhtr
 *             a default callback to use when retrieving a request
 */
function XHttp() {
	var xHttpInstance = this;
	this.maxreq = 4;
	this.runcon = 0;
	this.interval = null;
	this.links = [];
	
	this.default_heartbeat = function () {
		if ((xHttpInstance.runcon < xHttpInstance.maxreq) &&
			(xHttpInstance.links.length > 0)) {
			// do something here when you have an opening to get more stuff
			xHttpInstance.default_next_url();
		}
		if ((xHttpInstance.links.length === 0) &&
			(xHttpInstance.runcon === 0)) {
			// do something here when out of things to
			xHttpInstance.stopInterval();
		}
	};
	this.default_next_url = function () {
		if (xHttpInstance.links.length > 0) {
			var link_data = xHttpInstance.links.shift();
			xHttpInstance.asyncLoad(link_data,
				xHttpInstance.default_callback_xhtr);
		}
	};
	this.default_callback_xhtr = function (xhtr, strURL, args) {
		// do something with the result
		// xhtr is the xmlHttpRequest object
		// common values are:
		// xhtr.responseText
		// xhtr.responseXml
		// xhtr.readyState
		// xhtr.status
		
		if (xhtr.status === 404) {
			// do something when 404 not found
			// like:
			alert("Page wasn't found at: " + strURL + "\n" +
				xhtr.status + " " + xhtr.statusText);
		} else if (xhtr.status === 200) {
			// do something when 200 ok
			// like:
			alert(xhtr.responseText);
		} else {
			// do other stuff with other codes
			alert("Site returned: " + xhtr.status + " '" +
				xhtr.statusText + "' for: \n" + strURL);
		}
	};
	/*
	 * startInterval (heartbeat_function, heartbeat_pulse)
	 *    accepts:
	 *        heartbeat_function: function reference to call on each heartbeat
	 *            pulse
	 *        heartbeat_pulse: integer
	 *
	 */
	this.startInterval = function (heartbeat_function, heartbeat_pulse) {
		var pulse_rate;
		var heartbeat_func;
		// check for and stop existing interval
		if (xHttpInstance.interval !== null) {
			xHttpInstance.stopInterval();
		}
		
		if (typeof heartbeat_pulse === 'undefined') {
			pulse_rate = 100;
		} else {
			pulse_rate = heartbeat_pulse;
			if (isNaN(pulse_rate)) { // validate its an actual number
				throw "startInterval given invalid pulse rate :" +
				heartbeat_pulse;
			}
		}
		if (typeof heartbeat_function === 'undefined') {
			heartbeat_func = xHttpInstance.default_heartbeat;
		} else {
			heartbeat_func = heartbeat_function;
		}
		
		if (!heartbeat_func instanceof Function) {
			throw "startInterval given incorrect heartbeat function argument.";
		}
		/* end error checking */
		xHttpInstance.interval = setInterval(heartbeat_func, pulse_rate);
	};
	
	/*
	 * stopInterval ()
	 *
	 * stops the xHttp interval loop.
	 */
	this.stopInterval = function () {
		clearInterval(xHttpInstance.interval);
		xHttpInstance.interval = null;
	};
	
	/*
	 * load (strURL)
	 *
	 * synchronus XMLHttpRequest load with simple parameter request.
	 * Returns text value of get request or false.
	 */
	this.load = function (strURL) {
		//if (debug) { GM_log("Getting url: " + strURL); }
		var xhtr = new XMLHttpRequest();
		xhtr.open("GET", strURL, false);
		xhtr.send();
		if (xhtr.readyState === 4 && xhtr.status === 200) {
			return xhtr.responseText;
		} else {
			return false;
		}
	};
	/*
	 * asyncLoad(objparams, callback, extra_args)
	 *
	 * multithreaded url fetching routine
	 * gets url contents and sends to callback function
	 *
	 * if objparams is passed as a string function assumes
	 * simple get request with objparams being a url string.
	 *
	 * otherwise:
	 * objparams object properties imitates grease monkey
	 * GM_xmlHttpRequest function.
	 *
	 * method -    a string, the HTTP method to use on this request.
	 *         Generally GET, but can be any HTTP verb, including POST,
	 *         PUT, and DELETE.
	 *
	 * url - a string, the URL to use on this request. Required.
	 *
	 * headers - an associative array of HTTP headers to include on
	 *         this request. Optional, defaults to an empty array. Example:
	 *         headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	 *            'Accept': 'application/atom+xml,application/xml,text/xml'}
	 *
	 * data - a string, the body of the HTTP request. Optional, defaults
	 *         to an empty string. If you are simulating posting a form
	 *         (method == 'POST'), you must include a Content-type of
	 *         'application/x-www-form-urlencoded' in the headers field,
	 *         and include the URL-encoded form data in the data field.
	 *
	 * onreadystatechange - a function object, the callback function to be
	 *         called repeatedly while the request is in progress.
	 *
	 * onerror - a function object, the callback function to be called
	 *         if an error occurs while processing the request.
	 *
	 * onload - a function object, the callback function to be called when
	 *         the request has finished successfully.
	 *         ** DO NOT ** specify a callback function if using onload.
	 *         onload will take precedence and fire instead of callback.
	 *         onload will pass the callback value to its called function
	 *         if you want to use the values in some way. See definition
	 *         below for the default_onload.
	 */
	
	this.asyncLoad = function (objparams, callback, extra_args) {
		//if (debug) GM_log("Async Getting url : " + url);
		
		// local function Variables
		var url = "";
		var method;
		var default_method = "GET";
		var send_data = "";
		var http_req = new XMLHttpRequest();
		var xHttpPtr = xHttpInstance;
		var headkey;
		var useGMxml = false;
		
		var onerror_wrapper = null;
		var onload_wrapper = null;
		var onreadystatechange_wrapper = null;
		// end local function variables
		
		var default_onerror = function (args) {
			/*
			 * do something here when there's errors.
			 */
			var target;
			if (args.target) {
				target = args.target;
			} else {
				target = args;
			}
			xHttpInstance.runcon -= 1;
			if (onerror_wrapper !== null) {
				onerror_wrapper(target, objparams, callback, extra_args);
			}
		};
		
		var default_onreadystatechange = function (args) {
			var target;
			if (args.target) {
				target = args.target;
			} else {
				target = args;
			}
			if (onreadystatechange_wrapper !== null) {
				onreadystatechange_wrapper(target, objparams,
					callback, extra_args);
			}
		};
		
		var default_onload = function (args) {
			//            if (debug) {
			//    GM_log("xmlHttpRequest response: " +
			//            args.readyState + " " + args.status + " " +
			//            url);
			//            }
			var target;
			if (args.target) {
				target = args.target;
			} else {
				target = args;
			}
			xHttpPtr.runcon -= 1;
			if (onload_wrapper !== null) {
				onload_wrapper(target, objparams, callback, extra_args);
			} else {
				callback(target, url, extra_args);
			}
		};
		
		if (typeof objparams !== 'object') {
			if (typeof objparams === 'string') {
				url = objparams;
				method = default_method;
				http_req.open(method, url, true);
			} else {
				throw "asyncLoad error: parameters not object or string";
			}
		} else {
			
			// check url parameter value
			if (typeof objparams['url'] !== 'string') {
				throw "asyncLoad error: missing url parameter.";
			} else {
				// make sure its not blank
				url = objparams['url'];
				if (url === '') {
					throw "asyncLoad error: url parameter is empty string.";
				}
			}
			
			// check if we specified method
			if (typeof objparams['method'] === 'string') {
				method = objparams['method'];
			} else {
				method = default_method;
			}
			
			// open xmlHttpRequest so we can properly set headers
			http_req.open(method, url, true);
			
			// check if we specified any custom headers and have some sort
			// of validation of the data. Just ignores non strings.
			if (typeof objparams['headers'] === 'object') {
				for (headkey in objparams['headers']) {
					if (typeof headkey === 'string') {
						if (typeof objparams['headers'][headkey]
							 === 'string') {
							http_req.setRequestHeader(headkey,
								objparams['headers'][headkey]);
						}
					}
				}
			}
			
			if (typeof objparams['data'] === 'string') {
				send_data = objparams['data'];
			}
			
			if (typeof objparams['onreadystatechange'] === 'function') {
				onreadystatechange_wrapper = objparams['onreadystatechange'];
			}
			
			if (typeof objparams['onerror'] === 'function') {
				onerror_wrapper = objparams['onerror'];
			}
			
			if (typeof objparams['onload'] === 'function') {
				onload_wrapper = objparams['onload'];
			}
			
			if (objparams['useGMxml']) {
				useGMxml = true;
			}
			
		}
		
		if (typeof callback !== 'function' &&
			typeof onload_wrapper !== 'function') {
			throw "asyncLoad error: no callback or onload function passed.";
		}
		
		xHttpPtr.runcon += 1;
		
		if (useGMxml) {
			GM_xmlhttpRequest({
				method : method,
				url : url,
				headers : objparams['headers'],
				onload : default_onload,
				onerror : default_onerror,
				onreadystatechange : default_onreadystatechange
			});
			
		} else {
			http_req.onerror = default_onerror;
			http_req.onreadystatechange = default_onreadystatechange;
			http_req.onload = default_onload;
			
			http_req.send(send_data);
		}
	};
}
var xHttp = new XHttp();

var regExpImageUrl = /wallbase\.cc\/wallpaper/i;

var tools = {
	thumbPanel : null,
	xhtrHeartbeat : 100, // heartbeat pulse rate for xmlHttpRequest stuff
	ddlboxbtn : true, // flag to make button for DDL links
	validatedImageCount : 0, // counter of how many images have been validated
	totalImageCount : 0, // counter of how many images have been found
	ddlbutton : null, // object holder for clickable button for generating
	updateCounter : false, // flag for updating the counter while in idle loop.
	// the textbox of urls for all images on page
	LinkObject : function () { // Link object used for instantiating our link array
		this.DIVNode = null;
		this.origAnchorNode = null;
		this.origImageNode = null;
		this.newAnchorNode = null;
		this.imagePage = null;
		this.imageID = null;
		this.memberID = null;
		this.isValidated = false;
	},
	textbox : null, // textbox object initialized first time button is clicked
	urlList : [], // running urlList updated every time a link is found
	pageLinks : {},
	observer : null
};

if (mobileDebug === true) {
	var debug = true;
	tools.mobileDebugWindow = document.createElement("textarea");
	tools.mobileDebugWindow.rows = 20;
	tools.mobileDebugWindow.cols = 80;
	document.body.insertBefore(tools.mobileDebugWindow, document.body.firstChild);
	GM_log = function(data) {
		var oldData = tools.mobileDebugWindow.innerHTML;
		tools.mobileDebugWindow.innerHTML = oldData + data + "\r\n";
	};
}

/* **************************
 *  END Global Var's
 * **************************
 */

/*
 * Event triggered when you click the ddl button,
 * generates textbox at top of window if one doesn't
 * exist, or reuses it and updates the url's if there's
 * more on the stack.
 */
function btn_DDLdump() {
	if (debug) {
		GM_log("Call: " + arguments.callee.name + "()");
	}
	var image;
	if (!tools.textbox) {
		tools.textbox = document.createElement("textarea");
		tools.textbox.rows = 20;
		tools.textbox.cols = 80;
		document.body.insertBefore(tools.textbox, document.body.firstChild);
	}
	tools.urlList = [];
	for (image in tools.pageLinks) {
		/*
		 * If manga page loop the manga urls
		 */
		if (tools.pageLinks[image].isValidated) {
			tools.urlList.push(tools.pageLinks[image].newAnchorNode.href);
		}
	}
	
	tools.textbox.innerHTML = tools.urlList.join('\r\n');
}

/*
 * Create clickable DDL button object that
 * we later inject into the page.
 */
function btn_Setupddlbutton() {
	if (debug) {
		GM_log("Call: " + arguments.callee.name + "()");
	}
	if (!tools || tools.ddlbutton) {
		return;
	}
	tools.ddlbutton = document.createElement('input');
	tools.ddlbutton.type = "button";
	tools.ddlbutton.value = "Get All DDL [" + tools.totalImageCount + "]?";
	tools.ddlbutton.setAttribute("onsubmit", "return false;");
	tools.ddlbutton.addEventListener("click", btn_DDLdump, false);
}

/*
 * Make button to get all DDL to a text window
 */
function btn_Makeddlbutton() {
	if (debug) {
		GM_log("Call: " + arguments.callee.name + "()");
	}
	
	var new_li = document.createElement('li');
	new_li.appendChild(tools.ddlbutton);
	
	var btnLoc = tools.thumbPanel.firstElementChild;
	
	switch (btnLoc.nodeName) {
	case "LI":
		btnLoc.parentNode.appendChild(new_li, btnLoc);
		break;
	case "DIV":
		btnLoc.appendChild(tools.ddlbutton, btnLoc);
		break;
	case "P":
		btnLoc.parentNode.insertBefore(tools.ddlbutton, btnLoc);
		break;
	}
}

/*
 * addDDLinks (event)
 *
 * Adds direct image links above image.
 * "event" is either empty or a start node
 * usually passed when triggered by the
 * DOMNode Insert listener. Searches through
 * DOM tree starting with the "event" node
 * point or document base if event empty.
 */
function addDDLinks(event) {
	if (debug) {
		GM_log("Call: " + arguments.callee.name + "()");
	}
	if (debug) {
		GM_log(event);
	}
	var img_counter;
	
	// if event is passed this is on a Dom insert
	if (event) {
		// Check for node type/name
		if (event.target.nodeName === "DIV") {
			try {
				if (event.target.id.indexOf("thumb") < 0) {
					return;
				}
			} catch (err) {
				return;
			}
		}
	} else {
		// this is if no event is passed (initial load)
		event = {
			target : tools.thumbPanel || document
		};
		//event = { target : document }; // if called without args set event to document
	}
	if (event.target.nodeType === 3) {
		return;
	} // ignore text node
	
	var imgs = event.target.querySelectorAll(".file");
	if (!imgs) {
		return;
	}
	
	var imgs_length = imgs.length;
	for (img_counter = 0; img_counter < imgs_length; img_counter += 1) {
		imgsParent = imgs[img_counter].parentNode;
		if (regExpImageUrl.test(imgsParent.href)) {
			if (debug) {
				GM_log("Found image: " + imgsParent.href);
			}
			
			var imgRef = imgsParent.href;
			
			var imageID = imgRef.replace(/.*wallpaper\//i, '');
			
			var newDIV = document.createElement('div');
			newDIV.id = 'div_' + imageID;
			
			var newLineBreak = document.createElement("br");
			
			var tmpLinkObject = new tools.LinkObject();
			
			tmpLinkObject.DIVNode = newDIV;
			tmpLinkObject.origAnchorNode = imgs[img_counter];
			tmpLinkObject.origImageNode = imgs[img_counter];
			tmpLinkObject.newAnchorNode = document.createElement("a");
			tmpLinkObject.newAnchorNode.target = "_blank";
			tmpLinkObject.newAnchorNode.innerHTML = "Validating";
			tmpLinkObject.imagePage = imgsParent.href;
			tmpLinkObject.imageID = imageID;
			tmpLinkObject.memberID = null;
			tmpLinkObject.isValidated = false;
			
			newDIV.appendChild(tmpLinkObject.newAnchorNode);
			newDIV.appendChild(newLineBreak);
			tmpLinkObject.newAnchorNode.className = "directimglink";
			
			tmpLinkObject.origAnchorNode.parentNode.insertBefore(newDIV, tmpLinkObject.origAnchorNode);
			tools.pageLinks[tmpLinkObject.imageID] = tmpLinkObject;
			tools.totalImageCount += 1;
			
			xHttp.links.push(tmpLinkObject.imageID);
			
		}
		
	}
	
	if (debug) {
		GM_log('Total images so far: ' + tools.totalImageCount);
	}
}

/*
 * callback_UpdateLink (xmlDoc, imageID)
 *
 * Function called by callback_xhtr after creating a
 * DOM node tree.
 */
function callback_UpdateLink(xmlDoc, imageID) {
	if (debug) {
		GM_log(["Call: ", arguments.callee.name, "(", arguments, ")"]);
	}
	if (debug) {
		GM_log(xmlDoc);
	}
	
	var tmpLinkObject = tools.pageLinks[imageID];
	
	image = xmlDoc.querySelector('.wall');
	if (image) { image = image.src; }
	if (debug) {
		GM_log("Found image: " + image);
	}
	
	tmpLinkObject.newAnchorNode.href = image;
	tmpLinkObject.newAnchorNode.innerHTML = "Direct Link " + tmpLinkObject.newAnchorNode.pathname.split("/").pop();
	tools.validatedImageCount += 1;
	tmpLinkObject.isValidated = true;
	
	return;
}

/*
 * callback_xhtr (xhtr, strURL, args)
 *
 * Function called by the callback of xHttp.asyncLoad.
 * Generates a DOM node tree from the fetched HTML code,
 * then passes to the update function.
 */
function callback_xhtr(xhtr, strURL, args) {
	/*
	 * fauxDocument(htmlStr)
	 *
	 * Generates an on the fly document DOM object,
	 * with optional htmlStr as body html code.
	 *
	 * usage example:
	 *
	 *     myDoc = new fauxDocument('<a href="some ref">some text<img src="some source"/></a>');
	 *  myDoc = new fauxDocument(someStringVarWithHTMLcode);
	 */
	function FauxDocument(htmlStr) {
		var htmlDoc = document.createElement('div');
		if (typeof(htmlStr) === 'string') {
			htmlDoc.innerHTML = htmlStr;
		}
		return htmlDoc;
	}
	// if (debug) { GM_log('Response: ' + xhtr.responseText); }
	var xmlDoc = new FauxDocument(xhtr.responseText);
	callback_UpdateLink(xmlDoc, args);
}

function check_NextLink() {
	if (xHttp.links.length) {
		var imageID = xHttp.links.shift();
		xHttp.asyncLoad(tools.pageLinks[imageID].imagePage, callback_xhtr, imageID);
	}
}

function heartbeat_LinkValidator() {
	var counter = tools.totalImageCount + "/" + tools.validatedImageCount;
	
	if ((xHttp.runcon < xHttp.maxreq) && (xHttp.links.length)) {
		tools.ddlbutton.value = "Test [" + counter + "]";
		tools.updateCounter = true;
		check_NextLink();
	}
	if ((xHttp.links.length === 0) && (xHttp.runcon === 0)) {
		if (tools.updateCounter === true) {
			tools.ddlbutton.value = "Get [" + counter + "]";
			tools.updateCounter = false;
		}
	}
}

/*
 * function event_observer (mutations)
 *        function triggered on dom events
 *        probably needs some debugging
 */
function event_observer(mutations) {
	var nodeList,
	nodeCount,
	nodeCounter;
	mutations.forEach(function (mutation) {
		nodeList = mutation.addedNodes;
		nodeCount = nodeList.length;
		for (nodeCounter = 0; nodeCounter < nodeCount; nodeCounter += 1) {
			if (debug) {
				GM_log(nodeList[nodeCounter]);
			}
			addDDLinks({
				target : nodeList[nodeCounter]
			});
		}
	});
}

function main() {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.OMutationObserver || window.MozMutationObserver;
	tools.thumbPanel = document.querySelector("#thumbs");
	if (!tools.thumbPanel) {
		return;
	}
	btn_Setupddlbutton();
	if (tools.ddlboxbtn) {
		btn_Makeddlbutton();
	}
	addDDLinks();
	
	if (MutationObserver) {
		/*
		 * Register an event listener for dom nodes incase
		 * we use a paginator so as we add more thumbnails
		 * to the current view we add on links and add to
		 * our url stack.
		 */
		tools.observer = new MutationObserver(event_observer);
		
		// pass in the target node, as well as the observer options
		tools.observer.observe(tools.thumbPanel, {
			childList : true
		});
	} else {
		tools.thumbPanel.addEventListener("DOMNodeInserted", addDDLinks, true);
	}
	
}
xHttp.startInterval(heartbeat_LinkValidator, tools.xhtrHeartbeat);
main();
