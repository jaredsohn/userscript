// ==UserScript==
// @name        Userscripts.org - Mark As Read
// @namespace   http://userscripts.org/users/23652
// @description Adds a "Mark As Read" button to the forums
// @include     http://userscripts.org/forums
// @include     http://userscripts.org/forums/*
// @include     https://userscripts.org/forums
// @include     https://userscripts.org/forums/*
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @copyright   JoeSimmons
// @version     1.0.4
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL http://userscripts.org/scripts/source/176185.user.js
// @updateURL   http://userscripts.org/scripts/source/176185.meta.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==


/* CHANGLEOG

1.0.4 (9/27/2013)
    - cleaned up code a bit
    - switched to updated JSL. also added some helper functions
        code is much cleaner now
    - changed the waiting cursor display. smoother now
    - used my new 'xhrAs' code (xhr asynchronous sequential method)

1.0.3 (9/4/2013)
    - added a waiting cursor while the unread topics load in the background
    - slightly tidied up the handleClick function

1.0.2
    - fixed some more bugs while marking from the main forum page

1.0.1
    - fixed some bugs causing some topics not to be marked read

1.0.0
    - created

*/

(function (undefined) {
    'use strict'; // ECMAScript-5 Strict Mode

    // xhrAs by JoeSimmons
    var xhrAs = new function () {
        var queue = [], // the request queue
            blank = function () {}, // blank function to use as default callback
            xhrInProgress = false, // boolean to know if we should
                                   // send another request or not

            that = { // a reference to this instance to be used with the methods

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

    // Make sure the page is not in a frame
    // and that JSL exists
    if (window.self !== window.top || typeof JSL === 'undefined') { return; }

    JSL.runAt('interactive', function () {

        var url = location.href,
            subforumRegex = /\/forums\/(\d+)/,
            topicRegex = /\/topics\/(\d+)/,
            intv;

        // helper function, for readability
        // takes each link and pushes its href onto 'this'
        function pushHref(link) {
            this.push(link.href);
        }

        // makes an element's class changed from 'green' to 'grey'
        function makeGrey(element) {
            element.className = element.className.replace('green', 'grey');
        }

        function handleClick(event) {
            var urls = [],
                unreadForums = JSL('//img[contains(@class, "green")]/ancestor::tr//a[@class="title" and contains(@href, "/forums/")]'),
                unreadTopics = JSL('//img[contains(@class, "green")]/ancestor::tr//a[@class="entry-title" and contains(@href, "/topics/")]');

            // don't let the browser take us to the link's href
            event.preventDefault();

            if ( subforumRegex.test(url) ) { // we're on a sub-forum page
                // push the unread topics into a local array
                unreadTopics.each(pushHref, urls);
            } else { // we're on the main forum page
                // push the unread sub-forums into a local array
                unreadForums.each(pushHref, urls);
            }

            if (urls.length > 0) { // we have unread topics/sub-forums, load them
                changeText('wait');
                xhrAs.run(urls, handleRes);
            } else { // there is no unread content
                changeText('No posts to mark.');
            }
        }

        // this makes an html document from a string (responseText) and returns it
        function makeDoc(html) {
            var doc = document.implementation.createHTMLDocument('html');
            doc.documentElement.innerHTML = html;
            return doc;
        }

        // this will handle all of the loaded urls, topics and sub-forums alike
        function handleRes(res) {
            var rText = res.responseText,
                rStatus = res.status,
                rUrl = res.finalUrl,
                doc = makeDoc(rText),
                unreadTopics = JSL('//img[contains(@class, "green")]/ancestor::tr//a[@class="entry-title" and contains(@href, "/topics/")]', doc),
                unreadSubForums = JSL('//a[@class="title"]/ancestor::tr//img[contains(@class, "green")]'),
                reqForumUrl = JSL('//div[@id="section"]//p[@class="subtitle"]//a[contains(@href, "/forums/")]', doc),
                topicID = (rUrl.match(topicRegex) || ['', 'xxx'])[1],
                forumID =  ( (reqForumUrl.exists() ? reqForumUrl.attribute('href') : rUrl).match(subforumRegex) || ['', 'xxx'] )[1],
                thisTopic = JSL('//a[@class="entry-title" and contains(@href, "/topics/' + topicID + '")]/ancestor::tr//img[contains(@class, "green")]'),
                thisForum = JSL('//a[@class="title" and contains(@href, "/forums/' + forumID + '")]/ancestor::tr//img[contains(@class, "green")]'),
                urls = [];

            // there was some sort of error, queue that url up again
            if (rStatus !== 200) {
                return xhrAs.run(rUrl, handleRes);
            }

            if ( subforumRegex.test(rUrl) ) {
                // request was a sub-forum page

                if ( !unreadTopics.exists() && thisForum.exists() ) {
                    // there aren't any unread topics
                    // mark the current forum as read
                    thisForum.each(makeGrey);
                } else {
                    // there are unread topics
                    // add the unread topics to a local array to pass to xhrAs.run()
                    unreadTopics.each(pushHref, urls);

                    // load the unread topics
                    xhrAs.run(urls, handleRes);
                }
            } else if ( thisTopic.exists() ) {
                // request was a topic page

                // mark the topic as read
                thisTopic.each(makeGrey);
            }

            if (xhrAs.length === 0) {
                // the request queue is empty
                // change the link text to Finished,
                // and make all unread sub-forums grey
                changeText('Finished.');
                unreadSubForums.each(makeGrey);
            }
        }

        // this will animate the color of the 'Please Wait...' link
        function animateWait() {
            var link = JSL('#markasread')[0],
                color = link.style.color;

            if (color === '#FF0000' || color === 'rgb(255, 0, 0)') { // it's pure red
                link.style.color = '#770000'; // make it dark red
            } else { // it's dark red
                link.style.color = '#FF0000'; // make it pure red
            }
        }

        // this changes the text of the 'Mark As Read' link to reflect changes
        function changeText(t) {
            var link = JSL('#markasread');

            if (t === 'wait' && typeof intv === 'undefined') {
                link.text('Please wait...');
                intv = JSL.setInterval(animateWait, 500);
                JSL('#waiting_cursor').show(); // show the waiting cursor
                return;
            } else if (typeof intv !== 'undefined') {
                JSL.clearInterval(intv);
                intv = undefined;
                JSL('#waiting_cursor').hide(); // hide the waiting cursor
            }

            if ( link.exists() ) {
                link.text(t);
            }
        }

        // add the "Mark As Read" link
        JSL('#content').first(
            JSL.create('a', {textContent : 'Mark As Read', href : '#', id : 'markasread', style : 'font-size: 12pt; color: #FF0000; float: right; padding: 4px;', onclick : handleClick})
        );

        // add the waiting cursor div
        JSL('html > body').append('<div id="waiting_cursor" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999999; background-color: transparent; cursor: wait;"></div>');

    });

}());