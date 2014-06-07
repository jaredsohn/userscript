// ==UserScript==
// @name           (dm) Deviant Art Gallery Ripper
// @namespace      DeviantRipper
// @description    Click button and generate a list of direct image link urls for all images for a users gallery.
// @version        1.0.16
// @lastupdated    2014-04-15
// @match          *://*.deviantart.com/*
// @exclude        *://justsitback.deviantart.com/*
// @match          http://backend.deviantart.com/rss.xml*
// ==/UserScript==

/*
 Known issue: -Due to the way DA's backend rss feed works, the script 
will not provide download links for alternate file types. For example 
SWF, TXT, PSD. Because of how DA feeds rss it also does not always have 
the largest "full size" url. On such it may incorrectly give a url to a 
thumbnail picture instead. If this is important to you, use my alternate 
script deemed the "slow" version at 
http://userscripts.org/scripts/show/175992 


    Documentation needed. 

 */

var GM_log; if (typeof GM_log  === 'undefined') { GM_log = function (str) { console.log(str); }; }

var debug = false;
//var debug = true;

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
            var link_data = xHttpInstance.links.shift().toString();
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
        if (xHttpInstance.interval !== null) { xHttpInstance.stopInterval(); }
        
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
                    if (objparams['headers'].hasOwnProperty(headkey)) {
                        if (typeof headkey === 'string') {
                            if (typeof objparams['headers'][headkey]
                                    === 'string') {
                                http_req.setRequestHeader(headkey, 
                                        objparams['headers'][headkey]);
                            }
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
                method: method,
                url: url,
                headers: objparams['headers'],
                onload: default_onload,
                onerror: default_onerror,
                onreadystatechange: default_onreadystatechange
            });

        } else {
            http_req.onerror = default_onerror;
            http_req.onreadystatechange = default_onreadystatechange;
            http_req.onload = default_onload;
            
            http_req.send(send_data);
        }
    };
}

var deviantRipper = {
        isChrome : /chrome/i.test(navigator.userAgent),
        isFireFox : /firefox/i.test(navigator.userAgent),
        abort_links : false,
        useGMxml : false,      // flag to use GM_xmlHttpRequest instead of XMLHttpRequst
        xml_link_data : [],    // array holder for xlm page links
        pages : {
            //recurse var used for thumbnail pages mainly. if set to 0 and button
            //clicked on single page it doesn't really do anything useful.
            recurse: true,     // recuse into lower gallery pages
            current: 0,        // current counter reused for image and gallery parsing
            total: 0,          // total counter used for image parsing
            urls: [],          // holder for url html list
            toparse: [],       // list of urls of single image pages that need to be parsed for DDL
            textbox: null,     // textbox holder
            fetchStatus: 0     // status id for script checking status:
            // 0 = not started, 1 = getting indexes
            // 2 = getting image DDL, 3 = finished everything
            // 4 = displayed urls (finished or aborted)
        },

        /*
         * display_url_list()
         * 
         * function called when we're all done and we want to
         * display the list of url's we got.
         */
        display_url_list : function () {
            var docNamespace = 'http://www.w3.org/1999/xhtml';
			var counter;
			var tmpStr;
            if (debug) { GM_log("Call: display_url_list()"); }
            if (debug) { GM_log(deviantRipper); }
            if (deviantRipper.pages.fetchStatus > 3) { return; }
            deviantRipper.pages.textbox = 
                document.createElementNS(docNamespace, "textarea");
            deviantRipper.pages.textbox.style.width = '100%';
			for (counter = 0; counter < deviantRipper.pages.urls.length; counter += 1) {
	            if (debug) { GM_log("Fixing " + deviantRipper.pages.urls[counter]); }
				if (deviantRipper.pages.urls[counter].indexOf('http://th') > -1) {
					tmpStr = deviantRipper.pages.urls[counter].replace('http://th', 'http://fc').replace('/PRE/', '/');
					deviantRipper.pages.urls[counter] = tmpStr;
				}
			}
			deviantRipper.pages.textbox.innerHTML = 
                deviantRipper.pages.urls.join('\r\n');
            document.body.insertBefore(deviantRipper.pages.textbox,
                    document.body.firstChild);
            deviantRipper.pages.fetchStatus = 4;
        },

        /*
         * init()
         * 
         * Called as first function execution upon script load.
         * Sets up the xmlHttpRequest helpers and generates click button.
         */
        init : function () {
            // Check whether we're on backend
            deviantRipper.xml_xHttp = new XHttp();
            
            if (debug) { GM_log("init() isChrome: " + deviantRipper.isChrome + " isFireFox: " + deviantRipper.isFireFox); }
            if (deviantRipper.isFireFox === true) {
                deviantRipper.useGMxml = true;
            }
            
            if (/backend/i.test(location.hostname) === true) { 
                if (/rss\.xml/i.test(location.href) === true) {
                    // test if we're in iframe if not then get out
                    if (window === parent) { return; }
                    
                    deviantRipper.pages.btnID = deviantRipper.btn.generateXMLButton();
                    deviantRipper.btn.startXML(document.location.href);
                }
            } else {
                deviantRipper.pages.btnID = deviantRipper.btn.generateButton();
            }
        },

        checker: {
            /*
             * isThumbnailGallery (doc)
             * 
             * return true if page seems to be a gallery index
             * or false if it looks like its a single image page
             * detection is looking for the comments by the artist
             * usually found on the single image page
             */ 
            isThumbnailGallery : function (doc) {
                if (debug) { GM_log("Call: isThumbnailGallery()"); }
                return (doc.getElementById("artist-comments")) ? false : true;
            },

            /*
             * isAborted ()
             * 
             * check if we clicked the button to abort script
             * if we did it requires a page reload to start again
             *  
             */
            isAborted : function () {
                if (debug) { GM_log("isAborted(): " + deviantRipper.abort_links); }
                if (deviantRipper.abort_links === true) {
                    deviantRipper.pages.btnID.value = 'Aborted: ' + deviantRipper.pages.btnID.value;
                    if (debug) { GM_log("FetchStatus: " + deviantRipper.pages.fetchStatus); }
                    if (deviantRipper.pages.fetchStatus > 1) { deviantRipper.display_url_list(); }
                    deviantRipper.xml_link_data = [];
                    deviantRipper.pages.toparse = [];
                    return true;
                } else {
                    return false;
                }
            },

            /*
             * next_xml ()
             * 
             * get our next gallery page from our stack,
             * increment our fetching counter, and fetch page
             */
            next_xml : function () {
                var link_uri;
                
                if (debug) { GM_log("Call: next_xml()"); }
                if (deviantRipper.checker.isAborted()) {
                    return false;
                }
                if (deviantRipper.xml_link_data.length > 0) {
                    link_uri = deviantRipper.xml_link_data.shift().toString();
                    if (debug) { GM_log("Shifted: " + link_uri + "\ntypeof: " + typeof link_uri); }
                    
                    if (deviantRipper.useGMxml) {
                        if (debug) {
                            GM_log("Using GreaseMonkey GM_xmlHttpRequest.");
                        }
                        deviantRipper.xml_xHttp.asyncLoad({
                            url: link_uri,
                            useGMxml: true,
                            onload: deviantRipper.callback.scan_xml_dom
                        });
                    } else {
                        deviantRipper.xml_xHttp.asyncLoad(link_uri, deviantRipper.callback.scan_xml_dom);
                    }

                }
            }
        }, // end checker
        
        parser: {
            /*
             * image_links_xml (docbase)
             * 
             * function called after we load a gallery index page,
             * "docbase" references the document of the index page
             * so we can start looking for thumbnails in order to
             * get the single image page links.
             */
            image_links_xml : function (docbase) {
                if (debug) { GM_log("Call: image_links_xml()"); }
                var items = [];
                var hifi = null;
                var lofi = null;
				var thumbnail = [];
				var thumbnails = null;
                var content = [];
                var counter = 0;
                var locounter = 0;

                items = docbase.getElementsByTagNameNS('*', 'item');
                if (items.length < 1) {
                    deviantRipper.pages.recurse = false;
                    return;
                }

                for (counter = 0; counter < items.length; counter += 1) {
                    content = items[counter].getElementsByTagNameNS('*', 'content');
					thumbnails = items[counter].getElementsByTagNameNS('*', 'thumbnail');
					thumbnail = null;

                    if (thumbnails.length > 0) {
						// grab last thumbnail item and use it incase we don't find any content lines
						thumbnail = thumbnails[thumbnails.length - 1].getAttribute('url');
                    }
					
                    for (locounter = 0; locounter < content.length; locounter += 1) {
                        if (content[locounter].getAttribute('medium') === 'image') { lofi = content[locounter].getAttribute('url'); }
                        if (content[locounter].getAttribute('medium') === 'document') { hifi = content[locounter].getAttribute('url'); }
                    }
                    
                    switch (true) {
                    	case (hifi !== null):
                    		// found a hifi image
	                    	if (debug) { GM_log("Hifi: " + hifi); }
	                    	deviantRipper.pages.urls.push(hifi);
	                    	break; 
	                    case (lofi !== null):
	                    	// found a lofi image
	                    	if (debug) { GM_log("Lofi: " + lofi); }
	                    	deviantRipper.pages.urls.push(lofi);
	                    	break;
	                    case (thumbnail !== null):
	                    	// found something atleast
	                    	if (debug) { GM_log("thumbnail: " + thumbnail); }
	                    	deviantRipper.pages.urls.push(thumbnail);
	                    	break;
	                    default:
	                    	// didn't find anything
	                    	break;
                    }
                
                }
                if (debug) { GM_log([counter, length, deviantRipper.pages.urls.length]); }
            },
            

            /*
             * next_xml_page_link (docbase)
             * 
             * Function called after loading xml page looking for next
             */
            next_xml_page_link : function (docbase) {
                if (debug) { GM_log("Call: next_xml_page_link()"); }
                if (debug) { GM_log(docbase); }
                var rtn_val;
//                var links;
//                var counter, length;
//                links = docbase.getElementsByTagNameNS('http://www.w3.org/2005/Atom', 'link');
//                for (counter = 0, length = links.length;
//                        counter < length; 
//                        counter += 1) {
//                    if (links[counter].getAttribute('rel').toString() === "next") {
//                        rtn_val = links[counter];
//                        break;
//                    }
//                }
                rtn_val = docbase.querySelector('link[rel="next"]');
                if (rtn_val) {
                    rtn_val = rtn_val.getAttribute('href');
                    if (debug) { GM_log("NextXML page: " + rtn_val); }
                    return rtn_val;
                } else { 
                    return false; 
                }
            }
            

        }, // end parser
        
        callback: {

            /*
             * scan_xml_dom (HTML_Data, url, args)
             * 
             * called when gallery page html is loaded
             * so we can parse images out and set next page
             */
            scan_xml_dom : function (HTML_Data, url, args) {
                if (debug) { GM_log("Call: scan_xml_dom()"); }
                var html_dom;
                var nextPage;
                var parser;
                
                html_dom = HTML_Data.responseXML;
                if (!html_dom) {
                    if (HTML_Data.responseText !== "") {
                        parser = new DOMParser();
                        html_dom = parser.parseFromString(HTML_Data.responseText, "text/xml");
                    } else {
                        throw "There was an error parsing XML from: " + url;
                    }
                }
                
                // parse and add images on page to fetch stack
                deviantRipper.parser.image_links_xml(html_dom);

                deviantRipper.pages.current += 1;
                deviantRipper.pages.btnID.value = "Loading xml page " + 
                    deviantRipper.pages.current + 
                    "(" + deviantRipper.pages.urls.length + ")";
                
                if (deviantRipper.pages.recurse) {
                    nextPage = deviantRipper.parser.next_xml_page_link(html_dom);
                    if (nextPage) { deviantRipper.xml_link_data.push(nextPage.toString()); }
                }
                
            }
            
        }, // end callback
        
        btn: {
            /*
             * getLinks ()
             * 
             * onclick function triggered when the
             * button we injected is clicked to get
             * our direct links.
             */
            getLinks : function () {
                if (debug) { GM_log("Call: getLinks()"); }
                var iframeLoader;
                var feedbutton;
                var docNamespace = 'http://www.w3.org/1999/xhtml';
             
                deviantRipper.pages.btnID.removeEventListener("click", deviantRipper.btn.getLinks, false);
                feedbutton = document.querySelector('link[type="application/rss+xml"]');
                if (!feedbutton) {
                    throw "No feed button on this page.";
                }
                
                if (deviantRipper.isChrome === true) {
                    deviantRipper.pages.btnID.parentNode.removeChild(
                        deviantRipper.pages.btnID
                    );
                  
                    iframeLoader = document.createElementNS(
                        docNamespace,
                        'iframe'
                    );
                    iframeLoader.src = feedbutton.href;
                    iframeLoader.style.width = '100%';
                    iframeLoader.style.height = '100px';
                    document.body.insertBefore(
                        iframeLoader, 
                        document.body.firstChild
                    );
                } else {
                    deviantRipper.btn.startXML(feedbutton.href);
                }
                
            },

            /*
             * startXML ()
             * 
             * started from init() to start grabbing XML pages
             * starting with current loaded one. Script assumes
             * we loaded from an iframe.
             */
            startXML : function (galleryLink) {
                if (debug) { GM_log("Call: startXML(" + arguments[0] + ")"); }
                deviantRipper.pages.btnID.addEventListener('click', deviantRipper.btn.abortLinkChecking, false);
                deviantRipper.xml_link_data.push(galleryLink.toString());
                deviantRipper.pages.fetchStatus = 1;
                deviantRipper.xml_xHttp.startInterval(deviantRipper.heartbeat.load_xml, 50);
            },

            /*
             * abortLinkChecking ()
             * 
             * onclick triggered when button is clicked
             * while we're getting links.
             */
            abortLinkChecking : function () {
                deviantRipper.abort_links = true;
                GM_log("abortLinkChecking()");
                deviantRipper.pages.btnID.removeEventListener('click', deviantRipper.abortLinkChecking, false);
            },

            /*
             * generateButton()
             * 
             * creates the click button for our page
             */
            generateButton : function () {
                if (debug) { GM_log("Call: generateButton()"); }
                var new_button;
                var btnLoc;

                new_button = document.createElement("input");
                new_button.type = "button";
                new_button.value = "Get URLs for Gallery";
                new_button.setAttribute("onsubmit", "return false;");

                // var btnLoc = document.getElementById("gmi-GalleryEditor");
                btnLoc = document.getElementById("output");
                if (btnLoc) {
                    btnLoc.insertBefore(new_button, btnLoc.firstChild);
                    new_button.addEventListener("click", deviantRipper.btn.getLinks, false);
                } else {
                    new_button.value = "Root Thumbnail Page?";
                    document.body.insertBefore(new_button, document.body.firstChild);    
                }
                return new_button;
            },
            
            /*
             * generateXMLButton()
             * 
             * creates the click button for our page
             */
            generateXMLButton : function () {
                if (debug) { GM_log("Call: generateXMLButton()"); }
                var new_button;
                var docNamespace = 'http://www.w3.org/1999/xhtml';
                var replacedRootNode = document.createElement('clearinghouse');
                
                // empty out the current document view.
                if (deviantRipper.isChrome === true) {
                    while (document.documentElement.firstChild) {
                        replacedRootNode.appendChild(
                            document.documentElement.firstChild
                        );
                    }
                } else if (deviantRipper.isFireFox === true) {
                    while (document.body.firstChild) {
                        replacedRootNode.appendChild(
                            document.body.firstChild
                        );
                    }
                }

                if (document.body === null) {
                    document.body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body'); 
                    document.documentElement.appendChild(document.body);
                }

                new_button = document.createElementNS(docNamespace, 'input');
                new_button.type = "button";
                new_button.value = "Loading...";
                new_button.setAttribute("onsubmit", "return false;");
                document.body.appendChild(new_button);
                new_button.addEventListener('click', deviantRipper.btn.abortLinkChecking, false);
                
                return new_button;
            }
        }, // end btn
        
        heartbeat: {
            
            /*
             * load_xml ()
             * 
             * heartbeat loop while loading gallerie indices
             */
            load_xml : function () {
                var runcon = deviantRipper.xml_xHttp.runcon;
                var maxreq = deviantRipper.xml_xHttp.maxreq;
                var length = deviantRipper.xml_link_data.length;
                if ((runcon < maxreq) && (length > 0)) {
                    if (debug) { GM_log("heartbeat load_xml()\nrunning connections: (" + runcon + ') max running (' + maxreq + ')'); }
                    deviantRipper.checker.next_xml();
                }
                if ((length === 0) && (runcon === 0)) {
                    if (debug) { GM_log("Stopping heartbeat out of xml pages to pull."); }
                    deviantRipper.xml_xHttp.stopInterval();
                    
                    deviantRipper.pages.total = deviantRipper.pages.toparse.length;
                    deviantRipper.pages.fetchStatus = 3;
                    deviantRipper.xml_xHttp.startInterval(deviantRipper.heartbeat.xml_finisher, 50);
                }
            },
            
            /*
             * xml_finisher ()
             * 
             * watches for xml to finish loading then displays the urls.
             */
            xml_finisher : function () {
                var runcon = deviantRipper.xml_xHttp.runcon;
                var length = deviantRipper.xml_link_data.length;
                if ((length === 0) && (runcon === 0)) {
                    if (debug) { GM_log("Stopping heartbeat xml_finisher."); }
                    deviantRipper.xml_xHttp.stopInterval();
                    
                    deviantRipper.display_url_list();
                }
            }
        } // end heartbeat

    };

if (debug) { GM_log("Current URL loaded from: " + document.location.href); }
//start the dirty stuff
deviantRipper.init();
