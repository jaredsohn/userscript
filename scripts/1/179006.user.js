// ==UserScript==
// @name        GM_xmlhttpRequest - Asynchronous Sequential Method
// @namespace   http://userscripts.org/users/23652
// @description Uses a queueing method to asynchronously load multiple URLs sequentially with an optional delay timer between
// @include     *
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==



/* --------------------------- INFORMATION ----------------------------------------------------------------------


	## IMPORTANT INFORMATION ##

		- You may pass the arguments in any order

		- None of the arguments are strictly required
            if you call it with no arguments, it will attempt
            to load what's currently in the queue

        - Each call of xhrAs.run() is separate,
            so if you do xhrAs.run( [urls], fn )
            then you do xhrAs.run( [moreUrls] )
            it will not re-use the first function you passed it
            you must explicitly pass it a function each time
            the same is true for the delay parameter

---------------------------------------------

	## SYNTAX ##

		- If you pass it an array, it should contain a list of URLs
				- e.g., xhrAs.run( ['url1', 'url2', 'url3' ] );

        - If you pass it a string, it should be a URL

		- If you pass it a function, it will run that function for every url that you passed it
			If you do not pass it a function, it will run an empty function, meaning there is basically no callback

		- If you pass it a number, it will use that as the delay between requests
			If you do not, it will use 0 delay


-------------------------------------------------------------------------------------------------------------- */


// xhrAs by JoeSimmons
var xhrAs = new function () {
    'use strict'; // ECMAScript-5 Strict Mode

    var queue = [], // the request queue
        blank = function () {}, // blank function to use as default callback
        xhrInProgress = false, // boolean to know if we should
                               // send another request or not

        that = { // a self-reference to these methods

            // a getter to get the queue length
            get length() {
                return queue.length;
            },

            // this will determine if a request should be sent
            // and will send it
            'xhr' : function () {
                var req;

                if (xhrInProgress === false && queue.length > 0) {
                    // make it so no other request gets run
                    // while we're running this one
                    xhrInProgress = true;

                    req = queue.shift();

                    // send the actual request
                    GM_xmlhttpRequest({
                        'url' : req.url,
                        'method' : 'GET',
                        'onload' : function (resp) {
                            // allow new request to be run
                            xhrInProgress = false;

                            // run the callback
                            req.func(resp);

                            // run the next in queue, if any
                            window.setTimeout(that.xhr, req.delay);
                        }
                    });
                }
            },

            // this takes any order of arguments and determines whether or not
            // xhr() should be run
            'run' : function () {
                var urls = [],
                    thisFunc = blank,
                    thisDelay = 0;

                // iterate through all the arguments and save them
                [].forEach.call(arguments, function (arg) {
                    if ( Array.isArray(arg) ) urls = urls.concat(arg);
                        else if (typeof arg === 'string' && arg.length > 0) urls.push(arg);
                        else if (typeof arg === 'function') thisFunc = arg;
                        else if (typeof arg === 'number' && arg > 0) thisDelay = Math.floor(arg); 
                });

                // add an object to the queue for each url
                if (urls.length > 0) {
                    urls.forEach(function (url) {
                        queue.push({
                            'url' : url,
                            'func' : thisFunc,
                            'delay' : thisDelay
                            
                        });
                    });
                }

                // run the xhr function
                // it will determine whether or not a request needs to be sent
                that.xhr();
            },

            // run this to stop all requests
            // and empty the queue
            'clear' : function () {
                queue.length = 0;
                xhrInProgress = false;
            }

        };
    
    return that;
};



/* ----------- EXAMPLE BELOW ----------------------------

function handleRes(res) {
	var rText = res.responseText,  // response text
		rStatus = res.status,      // response status
		rUrl = res.finalUrl;       // response url

	// do stuff here

	// debug snippet for showing each url as it's loaded
	alert('URL: ' + rUrl + '\n\nStatus: ' + rStatus + (xhrAs.length === 0 ? '\n\nEND OF QUEUE.' : ''));

	// debug snippet for showing when the queue is finished
	if (xhrAs.length === 0) alert(rUrl + '\n\nThe queue is finished.');
}


// this example requests an array of URLs individually, with a 250ms delay between each,
// and calls handleRes when each request is done, regardless of the status (e.g., 200, 404, etc)
xhrAs.run(250, handleRes, [
	'http://www.google.com/?1',
	'http://www.google.com/?2',
	'http://www.google.com/?3'
]);

*/