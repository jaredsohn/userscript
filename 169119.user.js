// ==UserScript==
// @name            Apple Trailer Download HD+
// @namespace       http://www.digitaledgestudios.nl/
// @author          mhu
// @description     Download movie trailers from Apple. Based on the script by JC2k8
// @include         http://trailers.apple.com/trailers/*/*
// @exclude         http://trailers.apple.com/trailers/*/*/gallery/*
// @version         2.0.14
// @require         http://userscripts.org/scripts/source/87345.user.js
// @require         http://userscripts.org/scripts/source/98574.user.js
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_registerMenuCommand
// @grant           GM_setClipboard
// @noframes
// ==/UserScript==


(function() {

    /**
    * This is where we start. Inject styles and start getting the links.
    * Will run automatically after the load event has fired.
    */
    function runScript() {
        var css = '#atdContainer {background-color: rgba(0,0,0, 0.9); background-image:-moz-linear-gradient(right, #B5B5B5, #7D7D7D); background-image:-webkit-linear-gradient(right, #B5B5B5, #7D7D7D); background-image:linear-gradient(right, #B5B5B5, #7D7D7D); border:2px solid white; border-radius:5px; bottom:10px; box-shadow:0 -1px 5px rgba(0, 0, 0, 0.75); color:#333; display:table; font-family:Arial,sans-serif; height:35px; max-width:200px; min-width:120px; opacity:.9; padding:0 5px; position:fixed; right:10px; text-align:left; z-index:900;} ' +
            '#atdHeader { background-color: rgba(0,0,0, 1); background-image: -moz-linear-gradient(right, rgba(120, 120, 120, 0.55), rgba(75, 75, 75, 0.75)); background-image: -webkit-linear-gradient(right, rgba(120, 120, 120, 0.55), rgba(75, 75, 75, 0.75)); background-image: linear-gradient(right, rgba(120, 120, 120, 0.55), rgba(75, 75, 75, 0.75)); border-top-left-radius: 5px; border-top-right-radius: 5px; box-shadow:-1px -1px 2px black inset; margin: 0 -5px; padding: 2px 3px 5px; text-align: center; } ' +
            '#atdHeaderLink { color: #FFFFFF; font: small-caps bold 0.9em/1.1em helvetica,arial,sans-serif; text-shadow: 1px 0 rgba(0, 0, 0, 0.9); } ' +
            '#atdContainer li {display: list-item; font-size:1em; line-height:1.4em; padding-left:17px; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAAGgSURBVDhPhZM7SwNBEMddc/EJooVgJzYWEcFKRFCwEJtgIX6Ha+y0tbaSkMs7IYQQkiYISaGSQjvFBzZ+ABFBfFRpBOWQ+JuQC3e58/Jrlpnd+c/s7Kwa6CGTyShd11uWG3vWNM1JpVRT07QQe+e2vfHeeIedTqeHU6nUxiWcQiKRmEdQk0OsAUnmCBCH5ZQDBITuoQXXEIvFJsTfEZjuCtiVksmkMgxjPRKJLBaLxf1feAUqWUZASVWemUWVjKpSqeg3Hc7gER7gDhqNxgnBq4is2bOPYAQluFarHX6BlCzQPNNui+8WOLvgqAJFuXvgDaxgr1XEqtXqLteRpEPdBuJQpVJpSjL6CUhD6U/76Vx9KJfLoX4CVxCNRtvP5xCQCuh4+Bv8KviAbDa75Tk89OHgBfwEZO8ZEJlzicTj8fAF9BN4B2sauyI4BqlghvVIhuY/ERmqer1+zDO6+yBqTGGQQTI+4QeeQAapCWLLOBM8Zb2C6yU6ImO5XG67UCjs0Fydq+3l8/kV7CXsTZkZm0BA3nNUJtH3W3p8eetH/gFubA10E1qWsgAAAABJRU5ErkJggg==") no-repeat scroll -2px 1px transparent;} ' +
            '#atdContainer li > a {color:#0F0F1F; font-weight:normal; font-size:0.9em; text-decoration:none;vertical-align: middle;cursor:pointer; } ' +
            '#atdContainer li.error {color:#D90000; font-weight:normal; font-size:0.9em; text-decoration:none;} ' +
            '#atd480p, #atd720p, #atd1080p, #atdLoader {box-shadow:-1px -1px 3px #000000 inset;} ' +
            '#atd1080p {padding-bottom:4px; } ' +
            '#atdContainer > div:not(.toggle) {margin:0 -5px; padding:3px 5px;} ' +
            '#atdContainer .toggle {cursor:pointer;border: thin solid black; box-shadow: 0px -1px 3px rgba(255, 255, 255, 0.25) inset; color: white; font-size: 1em; font-weight: bold; margin: 0 -5px; padding: 0 5px 0 0; text-align: right;} ' +
            '#atdContainer .toggle:hover {margin: 0 -6px; box-shadow:0 2px 5px rgba(0, 0, 0, 0.75);} ' +
            '#atdContainer .toggle:last-of-type {margin-bottom:1px;} ' +
            '#atdLoader {background:url("data:image/gif;base64,R0lGODlhKwALAPEAAP///wAAAIKCggAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=") center 15px no-repeat;} ' +
            '#atdLoaderText {font-size:0.9em; margin:0; padding:30px 0 5px; text-align:center;} ' +
            '#atdError {background-image:-moz-linear-gradient(top, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.6));-webkit-linear-gradient(top, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.6));linear-gradient(top, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.6));color:black;} ' +
            '.atdListing {margin-bottom:0}' +
            '.errorMsg {font-weight:bold; font-size:0.8em;}' +
            '.roundBottomCorners {border-bottom-left-radius:5px; border-bottom-right-radius:5px;} ' +
            '.hidden {display:none;}';

        addNewStyle(css);
        // add header
        atdcontainer.appendChild(createAtdHeader());

        // Show loading animation until fetching necessary data has finished.
        atdcontainer.appendChild(createLoader());
        document.body.insertBefore(atdcontainer, document.body.firstChild);

        // let's scan for links (async)
        intervID = setTimeout(function() {
            GM_xmlhttpRequest({
                "method" : "GET",
                "synchronous" : false,
                "url" : baseUrl + "includes/large.html",
                "onload" : function(xhr)
                {
                    // analyse the contents
                    if (!xhr.responseText || xhr.responseText.indexOf(APPLEERRORINDICATOR) >= 0) {
                        parseOldTrailerPage(); // try old page type
                    }
                    else {
                        getTrailerPages(xhr.responseText);
                    }
                },
                "onerror":function() {
                    showError("Could not download includes/large.html");
                }
            });
        }, 250);
    }

    /**
    * Loads the trailer subpage containing the download links (async)
    */
    function getDownloadlinks(order, url, title, cb) {
        GM_xmlhttpRequest({
            "url" : url,
            "method" : "GET",
            "synchronous" : false,
            "url" : baseUrl + url,
            "onload" : function(xhr)
            {
                // analyse the contents
                if (!xhr.responseText || xhr.responseText.indexOf(APPLEERRORINDICATOR) >= 0) {
                    showError("Could not download includes/large.html");
                }
                else {
                    insertDownloadLink(xhr.responseText, order, title);
                }
                if (cb) cb();
            },
            "onerror" : function() {
                showError("Could not download trailer subpage");
                if (cb) cb();
            }
        });
    }

    /**
    * Adds the trailer links to the respective arrays
    */
    function insertDownloadLink(page, order, title) {
        var reLink = new RegExp('<a class="movieLink" href="([^\\?"]+).mov', 'img'),
            duplicate, res, url;

        // get all the HD links from the trailer page
        reLink.lastIndex = 0;
        if ((result = reLink.exec(page))) {
            if (result.length >= 2) {
                writeLog("- Trailer link found: " + result[1] + ".mov");
                url = result[1].replace(/_h?([0-9]+p?)$/, '').replace("http://movietrailers.apple.com", "http://trailers.apple.com");

                // avoid duplicates
                duplicate = false;
                for (var k=0; k<arr480.length; k++)
                {
                    if (arr480[k] && arr480[k].href == url + "_h480p.mov") {
                        duplicate = true;
                        break;
                    }
                }

                if (!duplicate) {
                    arr480[order] = createElem('a', {'textContent':title, 'href':url + "_h480p.mov", 'title':'Download 480p'});
                    arr720[order] = createElem('a', {'textContent':title, 'href':url + "_h720p.mov", 'title':'Download 720p'});
                    arr1080[order] = createElem('a', {'textContent':title, 'href':url + "_h1080p.mov", 'title':'Download 1080p'});
                } else {
                    arr480[order] = null;
                    arr720[order] = null;
                    arr1080[order] = null;
                }
            }
        }
    }

    /**
    * Scan the page for HD quicktime movies. Get all <a> tags with specific href's
    */
    function getTrailerPages(page) {
        var src_url, src_title,
        reLink = new RegExp('<a href="includes/([^#"]+)#?.[^"]*"', 'img'),
        reTitle_old = new RegExp('<h4>([^<]+)</h4>', 'img'),
        reTitle_new = new RegExp('<h3 title="[^"]+">([^<]+)</h3>', 'img'),
        result = null,
        links = [],
        titles = [],
        retryCount, si;

        // get all the HD links from the trailer page
        reLink.lastIndex = 0;
        while ((result = reLink.exec(page))) {
            if (result.length >= 2 && links.indexOfCI(result[1]) < 0) {
                writeLog("Trailer page found: " + result[1]);
                links.push(result[1]);
            }
        }

        // get all the titles from the trailer page
        reTitle_old.lastIndex = 0;
        while ((result = reTitle_old.exec(page))) {
            if (result.length >= 2) {
                writeLog("Trailer title found: " + result[1]);
                titles.push(result[1]);
            }
        }

        if (titles.length == 0) {
            reTitle_new.lastIndex = 0;
            while ((result = reTitle_new.exec(page))) {
                if (result.length >= 2) {
                    writeLog("Trailer title found: " + result[1]);
                    titles.push(result[1]);
                }
            }
        }

        if (links.length > 0) {
            getTrailerListingColor(addNewStyle);

            requests = links.length;
            for (var j=0; j < links.length; j++) {
                src_url = "includes/"+links[j];
                src_title = (links.length == titles.length ? titles[j] : ("Trailer "+(j+1)));

                arr480.push(src_title + " (unavailable)");
                arr720.push(src_title + " (unavailable)");
                arr1080.push(src_title + " (unavailable)");

                getDownloadlinks(j, src_url, src_title, function() {requests--;});
            }

            retryCount = 0;
            si = setInterval(function() {
                if (requests === 0) {
                    clearInterval(si);
                    fillAdtContainer();
                    return;
                }

                retryCount++;
                if (retryCount > 10) {
                    clearInterval(si);
                    showError("Timeout occurred");
                }
            }, 500);
        } else {
            showError('');
        }
    }

    /**
    * Scan the old style page for HD quicktime movies. Get all <a> tags with specific href's
    * (eg: http://trailers.apple.com/trailers/disney/ponyo/)
    */
    function parseOldTrailerPage() {
        var src_url, src_title, duplicate, links, titles;

        try {
            links = Array.filter($('#content').getElementsByClassName('hd'), function(elem) {
                // we're only interested in links with a href pointing to a .mov
                if (elem.nodeName !== 'A' || !elem.hasAttribute('href')) {
                    return false;
                }
                return (elem.getAttribute('href').endsWith('1080p.mov'));
            });

            titles = Array.filter($('.trailer-nav').getElementsByClassName('text'), function(elem) {
                // we're only interested in spans with class text
                return (elem.nodeName === 'SPAN');
            });
        }
        catch(err) {
            links = [];
        }

        if (links.length > 0) {
            getTrailerListingColor(addNewStyle);

            for (var j=0; j < links.length; j++) {
                src_url = links[j].getAttribute('href').replace(".mov", "");
                src_title = (links.length == titles.length ? titles[j].textContent || titles[j].innerText : ("Trailer "+(j+1)));

                writeLog("- Trailer link found: " + src_url + ".mov");
                src_url = src_url.replace(/_h?([0-9]+p?)$/, '').toLowerCase();

                // avoid duplicates
                duplicate = false;
                for (var k=0; k<arr480.length; k++)
                {
                    if (arr480[k] && arr480[k].href == src_url + "_h480p.mov") {
                        duplicate = true;
                        break;
                    }
                }

                if (!duplicate) {
                    arr480.push(createElem('a', {'textContent':src_title, 'href':src_url + "_h480p.mov", 'title':'Download 480p'}));
                    arr720.push(createElem('a', {'textContent':src_title, 'href':src_url + "_h720p.mov", 'title':'Download 720p'}));
                    arr1080.push(createElem('a', {'textContent':src_title, 'href':src_url + "_h1080p.mov", 'title':'Download 1080p'}));
                }
            }

            fillAdtContainer();
        } else {
            showError('');
        }
    }

    /**
    * Fill the already prepared container with all the trailer listings and
    * the respective toggles.
    */
    function fillAdtContainer() {
        var cont = null,
        ul = null;
        for (var j = 0, arr = null, caption = ''; j < 3; j++) {
            if (j == 0) {
                arr = arr480;
                caption = '480p';
            } else if (j == 1) {
                arr = arr720;
                caption = '720p';
            } else {
                arr = arr1080;
                caption = '1080p';
            }

            cont = prepContainer('atd' + caption),
            ul = createElem('ul', {'className':'atdListing'});
            atdcontainer.appendChild(createToggle(caption))
            for (var i = 0, len = arr.length, li = null; i < len; i++) {
                if (!arr[i]) {
                    continue;
                }

                if (typeof(arr[i]) == "string") {
                    li = createElem('li', {'textContent':arr[i], 'className':'error'});
                }
                else {
                    li = createElem('li');
                    li.appendChild(arr[i]);
                }
                ul.appendChild(li);
            }
            cont.appendChild(ul);
            atdcontainer.appendChild(cont);
            if (atdcontainer.style.display != 'table') { atdcontainer.style.display = 'table'; }
        }
        removeNode($('#atdLoader'));
    }

    function copyToClipboard(e) {
        if (typeof GM_setClipboard === 'undefined') {
            return;
        }

        var s = "",
            count = 0,
            elem = e.target,
            caption = elem.id;

        if (caption.endsWith('480p')) {
            arr = arr480;
        } else if (caption.endsWith('720p')) {
            arr = arr720;
        } else {
            arr = arr1080;
        }

        for (var i = 0, len = arr.length; i < len; i++) {
            if (typeof(arr[i]) != "string" && arr[i].href) {
                s += arr[i].href + "\n";
                count++;
            }
        }

        if (s !== "") {
            GM_setClipboard(s);
            writeLog(count + " movie link(s) copied to clipboard");
        }

        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }

    function showError(msg) {
        var omg = createElem('div', {'id':'atdError', 'textContent':ERROR_MSG, 'className':'roundBottomCorners'});
        if (msg !== '') {
            omg.appendChild(createElem('br'));
            omg.appendChild(createElem('span', {'textContent':msg, 'className':'errorMsg'}));
        }
        atdcontainer.appendChild(omg);
        removeNode($('#atdLoader'));
    }

    // Prototypes ---------------------------------
    /**
    * Determine whether a string starts with a certain string.
    */
    String.prototype.startsWith = function(str) { return (this.indexOf(str) === 0); }

    /**
    * Determine whether a string ends with a certain string.
    */
    String.prototype.endsWith = function(str) { return this.indexOf(str, this.length - str.length) !== -1; }

    // case-insensitive indexOf function for arrays
    if(typeof Array.prototype.indexOfCI == 'undefined')
    {
        Array.prototype.indexOfCI = function(s) {
            if (s === null || (typeof s == "undefined"))
            {
                return -1;
            }
            for (var i=0; i < this.length; i++)
            {
                if (this[i].toLowerCase() == s.toLowerCase())
                {
                    return i;
                }
            }
            return -1;
        };
    }

    // Helper functions ---------------------------
    /**
    * Creates a new element.
    * @param {String} elem The element to create
    * @param {Object} attrs The new element's attributes
    * @returns {HtmlElement} The created element
    */
    function createElem (elem, attrs) {
        var newElem = document.createElement(elem);
        for (var a in attrs) {
            if (a === 'textContent') {
                newElem.appendChild(document.createTextNode(attrs[a]));
            } else {
                newElem[a] = attrs[a];
            }
        }
        return newElem;
    }

    /**
    * Create the side panel header. Create a P element and add an A element to
    * quickly access this script's preferences.
    * @returns {HtmlElement}
    */
    function createAtdHeader() {
        var atdHeader = createElem('p', {'id':'atdHeader'});
        var atdHeaderLink = createElem('a', {'id':'atdHeaderLink', 'textContent':'Apple Trailers'});
        var canvas = createElem('canvas', {'id':'tempCanvas', 'width':'10', height:'10', 'className':'hidden'});
        atdHeaderLink.addEventListener('click', function() { devtools.config.open(); }, false);
        atdHeader.appendChild(atdHeaderLink);
        atdHeader.appendChild(canvas)
        return atdHeader;
    }

    /**
    * Create and return the busy animation container. Processing all the
    * links can take a while if there are a lot of trailers.
    * @returns {HtmlElement}
    */
    function createLoader() {
        var ldr = createElem('div', {'id':'atdLoader', 'className':'roundBottomCorners'});
        ldr.appendChild(createElem('p', {'id':'atdLoaderText', 'textContent':'Gathering ...'}));
        return ldr;
    }

    /**
    * Create a DIV element which will serve as a toggle as well as
    * an indicator for the three sections (480p, 720p, 1080p).
    * Also adds an event listener (click) to the DIV element to control
    * the toggling.
    */
    function createToggle(caption) {
        var div = createElem('div', {'id':'atdTgl' + caption, 'textContent':caption, 'className':'toggle', 'title':caption + ' trailers'});
        if (caption == '1080p' && devtools.config.get('defaultSize') != '1080p') { addClass(div, 'roundBottomCorners'); }
        div.addEventListener('click', toggleVisibility, false);
        div.addEventListener('contextmenu', copyToClipboard, false);
        return div;
    }

    /**
    * Prepare a container (DIV element) for the trailer listings (UL).
    * @param {String} newId The id of the container element
    * @returns {HtmlElement} The created DIV element
    */
    function prepContainer(newId) {
        var elem = createElem('div', {'id':newId});
        if (!newId.endsWith(devtools.config.get('defaultSize'))) { elem.className = 'hidden'; }
        if (newId.endsWith('1080p')) { addClass(elem, 'roundBottomCorners'); }
        return elem;
    }

    /**
    * Return the final computed value of an element's CSS property.
    * @param {HtmlElement} elem The element
    * @param {String} prop The property
    * @returns {String} The final computed value
    */
    function getCssProp(elem, prop) {
        var cssProp;

        try {
            cssProp = window.getComputedStyle(elem, null).getPropertyValue(prop);
            if (cssProp) {
                cssProp.replace(/\\s+!important/gi, '');
            }
        } catch(err) {
            cssProp = null;
        }

        return cssProp;
    }

    /**
    * Return an element matching the specified selector.
    * @param {String} selector The selector
    * @param {Node} root Start looking here
    * @returns {HtmlElement|null} Search result
    */
    function $(selector, root) {
        var e = null;
        root = root || document;
        if (/^#(?!(?:[\w]+)?[ \.,\+\[~>#])/.test(selector)) {
            e = root.getElementById(selector.substring(1));
        } else {
            e = root.querySelector(selector);
        }
        return e;
    }

    /**
    * Removes a node from the DOM.
    * @param {HTMLElement} nod The node to remove
    */
    function removeNode(nod) { if (nod) { nod.parentNode.removeChild(nod); } }

    /**
    * Add a class to the className attribute.
    * @param {HtmlElement} elem The element to check
    * @param {String} cls The class to add
    */
    function addClass(elem, cls) {
        if (elem.nodeType === 1) {
            if (!elem.className) {
                elem.className = cls;
            } else {
                if (!hasClass(elem, cls)) { elem.className += " " + cls; }
            }
        }
    }

    /**
    * Remove a class from the className attribute. If it is the last attribute or
    * if cls isn't specified, the class attribute will be removed.
    * @param {HtmlElement} elem The element to change
    * @param {String} cls The class to remove
    */
    function remClass(elem, cls) {
        if (elem.nodeType === 1) {
            if (cls) {
                if (elem.className === cls) {
                    elem.removeAttribute('class');
                } else {
                    if (hasClass(elem, cls)) {
                        var cn = ' ' + elem.className + ' ';
                        cn = cn.replace(' ' + cls + ' ','');
                        elem.className = cn.trim();
                    }
                }
            } else {
                elem.removeAttribute('class');
            }
        }
    }

    /**
    * Determine whether a className attribute has a specific class attached.
    * @param {HtmlElement} elem The element to check
    * @param {String} cls The class to look for
    * @returns {Boolean} Does the element have the class?
    */
    function hasClass(elem, cls) {
        if (!elem.className) return false;
        var cn = ' ' + elem.className + ' ';
        return cn.indexOf(' ' + cls + ' ') > -1;
    }

    /**
    * Event listener for showing/hiding the respective trailer listings.
    * In case of the 1080p section, create rounded bottom borders if closed.
    * @param {Event} e The event
    */
    function toggleVisibility(e) {
        var elem = e.target,
        toggleElem = $('#' + elem.id + ' + div');

        if (!hasClass(toggleElem, 'hidden')) {
            addClass(toggleElem, 'hidden');
            if (elem.id.endsWith('1080p')) { addClass(elem, 'roundBottomCorners'); }
        } else {
            remClass(toggleElem, 'hidden');
            if (elem.id.endsWith('1080p')) { remClass(elem, 'roundBottomCorners'); }
        }
    }

    /**
    * Adds a new CSS ruleset to the page. Uses GM_addStyle API; fallback in place.
    * @param {String} style Contains the CSS rules to add to the page
    */
    function addNewStyle(newStyle) {
        if (typeof GM_addStyle !== 'undefined') {
            GM_addStyle(newStyle);
        } else {
            var heads = document.getElementsByTagName('head');
            if (heads.length > 0) {
                var node = document.createElement('style');
                node.type = 'text/css';
                node.appendChild(document.createTextNode(newStyle));
                heads[0].appendChild(node);
            }
        }
    }

    /**
    * Travel up the DOM until the parent has the specified class and return the node.
    * @param {HtmlElement} elm The starting element
    * @param {String} cls The targeted parent has this class
    * @returns {HtmlElement} The targeted parent element
    */
    function parentUntilClassIs(elm, cls) {
        var p = elm;
        while (p.parentNode) {
            p = p.parentNode;
            if (hasClass(p, cls)) {
                break;
            }
        }
        return p;
    }

    /**
    * Determine whether n is a number or not.
    * @param {String|Number} n The string/number to check
    * @returns {Boolean} n can be interpreted as number
    */
    function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

    function writeLog(s) {
        if (window.console) {
            console.log(s);
        }
    }

    /**
    * Return the color used in Apple's trailer listing. If that's not
    * possible, assume Apple's default blue color scheme.
    * @returns {String} A CSS rule containing the trailer listing color
    */
    function getTrailerListingColor(cb) {
        var heading = $('#trailers > h2'), cssProp, css,
            validColor = function(css) {
                var valid = false, r, g, b;
                if (css && css.indexOf("rgb(") === 0) {
                    css = css.substr(4, css.length-2);
                    css = css.split(",");
                    if (css.length == 3) {
                        r = parseInt(css[0], 10);
                        g = parseInt(css[1], 10);
                        b = parseInt(css[2], 10);
                        return !((r<30 && g<30 && b<30) || (r>230 && g>230 && b>230));
                    }
                }
                return false;
            }

        if (!cb) { return; }

        if (heading) {
            cssProp = getCssProp(heading, 'background-color');
        }
        if (!validColor(cssProp)) {
            heading = $('.top-wrapper');
            cssProp = getCssProp(heading, 'background-color');
        }
        if (!validColor(cssProp)) {
            heading = $('.top-wrapper');
            if (heading) {
                try
                {
                    var m = getCssProp(heading, 'background-image').match(/url\(([^)]+)\)/i);
                    var url = m[1].replace(/"/g, "");
                    var img = new Image();
                    img.onload = function(e) {
                        var rgb = new ColorFinder(function favorHue(r,g,b) {
                            return ((r<30 && g<30 && b<30) || (r>230 && g>230 && b>230)) ? 0 : ((Math.abs(r-g)*Math.abs(r-g) + Math.abs(r-b)*Math.abs(r-b) + Math.abs(g-b)*Math.abs(g-b))/65535*50+1);
                        }).getMostProminentColor(img);
                        cssProp = 'rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')';
                        css = '#atdContainer > div.toggle {background:-moz-linear-gradient(left, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;background:-webkit-linear-gradient(left, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;background:linear-gradient(left, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;';
                        cb(css);
                    };
                    img.crossOrigin = '';
                    img.src = url;

                    return;
                }
                catch(err)
                {
                    cssProp = getCssProp(heading, 'background-color');
                }
            }
        }
        if (!cssProp) {
            cssProp = 'rgb(2, 131, 224)';
        }

        css = '#atdContainer > div.toggle {background:-moz-linear-gradient(left, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;background:-webkit-linear-gradient(left, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;background:linear-gradient(left, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;';
        cb(css);
    }

    function getAverageRGB(imgEl) {
        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = 'rgb(2, 131, 224)', // for non-supporting envs
            canvas = document.getElementById("tempCanvas"),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        }
        catch(e) {
            return defaultRGB;
        }

        length = data.data.length;
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        return 'rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')';
    }

    function removeHash(s) {
        if (!s) return s;
        var i = s.lastIndexOf("#");
        return (i >= 0 ? s.substr(0,i) : s);
    }

    // Scriptish users don't need this line because of @noframes
    if (unsafeWindow && unsafeWindow.top !== unsafeWindow.self) { return; }

    // CONSTANTS ----------------------------------
    var ERROR_MSG  = 'No downloadable trailers found',
    APPLEERRORINDICATOR = 's.pageType="errorPage"';

    // VARIABLES ----------------------------------
    var arr480 = [],
    arr720 = [],
    arr1080 = [],
    sources = [],
    atdcontainer = createElem('div', {'id':'atdContainer'}),
    intervID = 0;
    tryCount = 0;
    baseUrl = removeHash(window.location.href);

    // Config ---------------------------------------------------------
    var sizes = { 'Small (480p)':'480p', 'Normal (720p)':'720p', 'Large (1080p)':'1080p' };
    devtools.config.init({
        title: 'Apple Trailer Download HD+',
        settings: {
            'defaultSize': { type: 'select', label: 'Default trailer size (open panel)', defaultValue: sizes['Large (1080p)'], options: sizes },
        },
        // style the preferences menu
        css: '#devtools-wrapper .dialog { border:thin solid black; border-radius: 5px !important; box-shadow:5px 5px 15px #000000 !important; width: 280px !important; padding:0 !important;} ' +
        '#devtools-wrapper .dialog input[type="checkbox"]{margin-bottom:10px !important;} ' +
        '#devtools-wrapper .dialog .dialog-title { border-radius:5px 5px 0 0 !important;} ' +
        '#devtools-wrapper .dialog .dialog-close {border:0 none !important; border-radius:0 5px 0 0 !important;} ' +
        '#devtools-wrapper .dialog .dialog-footer button {border-radius: 0 0 5px 5px !important;} ' +
        '#devtools-wrapper .dialog input[type="checkbox"] {margin-bottom:5px !important; margin-right:5px !important;} ' +
        '#devtools-wrapper .dialog .dialog-content {border-top: thin solid black !important; padding:15px 10px !important; margin:0 !important;} ' +
        '#devtools-wrapper .dialog .dialog-title span {font-family:Verdana,Arial,sans-serif !important; font-size:13px !important;} ' +
        '#devtools-wrapper .dialog .dialog-footer {padding:5px 0 !important;} ' +
        '#devtools-wrapper .dialog .dialog-footer button {border-radius:5px !important;} ' +
        '#devtools-wrapper.mask {background-color:rgba(0, 0, 0, 0.6) !important;}'
    });
    // register menu command to access preferences
    GM_registerMenuCommand('Apple Trailer Download HD+ Preferences...', function() { devtools.config.open(); });

    // wait for the document to be fully loaded
    window.addEventListener("load", function() { runScript(); }, false);
})();


// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/color-finder/index.html
//
// Detection of the most prominent color in an image
// version 1.1.1

function ColorFinder(colorFactorCallback) {
  this.callback = colorFactorCallback;
  this.getMostProminentColor = function(imgEl) {
    var rgb = null;
    if (!this.callback) this.callback = function() { return 1; };
    var data = this.getImageData(imgEl);
    rgb = this.getMostProminentRGBImpl(data, 6, rgb, this.callback);
    rgb = this.getMostProminentRGBImpl(data, 4, rgb, this.callback);
    rgb = this.getMostProminentRGBImpl(data, 2, rgb, this.callback);
    rgb = this.getMostProminentRGBImpl(data, 0, rgb, this.callback);
    return rgb;
  };

  this.getImageData = function(imgEl, degrade, rgbMatch, colorFactorCallback) {

    var rgb,
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height, key,
        i = -4,
        db={},
        length,r,g,b,
        count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch(e) {
      /* security error, img on diff domain */
      return null;
    }

    length = data.data.length;

    var factor = Math.max(1,Math.round(length/5000));
    var result = {};

    while ( (i += 4*factor) < length ) {
      if (data.data[i+3]>32) {
        key = (data.data[i]>>degrade) + "," + (data.data[i+1]>>degrade) + "," + (data.data[i+2]>>degrade);
        if (!result.hasOwnProperty(key)) {
          rgb = {r:data.data[i], g:data.data[i+1], b:data.data[i+2],count:1};
          rgb.weight = this.callback(rgb.r, rgb.g, rgb.b);
          if (rgb.weight<=0) rgb.weight = 1e-10;
          result[key]=rgb;
        } else {
          rgb=result[key];
          rgb.count++;
        }
      }
    }

    return result;

  };

  this.getMostProminentRGBImpl = function(pixels, degrade, rgbMatch, colorFactorCallback) {

    var rgb = {r:0,g:0,b:0,count:0,d:degrade},
        db={},
        pixel,pixelKey,pixelGroupKey,
        length,r,g,b,
        count = 0;


    for (pixelKey in pixels) {
      pixel = pixels[pixelKey];
      totalWeight = pixel.weight * pixel.count;
      ++count;
      if (this.doesRgbMatch(rgbMatch, pixel.r, pixel.g, pixel.b)) {
        pixelGroupKey = (pixel.r>>degrade) + "," + (pixel.g>>degrade) + "," + (pixel.b>>degrade);
        if (db.hasOwnProperty(pixelGroupKey))
          db[pixelGroupKey]+=totalWeight;
        else
          db[pixelGroupKey]=totalWeight;
      }
    }

    for (i in db) {
      data = i.split(",");
      r = data[0];
      g = data[1];
      b = data[2];
      count = db[i];

      if (count>rgb.count) {
        rgb.count = count;
        data = i.split(",");
        rgb.r = r;
        rgb.g = g;
        rgb.b = b;
      }
    }

    return rgb;

  };

  this.doesRgbMatch = function(rgb,r,g,b) {
    if (rgb==null) return true;
    r = r >> rgb.d;
    g = g >> rgb.d;
    b = b >> rgb.d;
    return rgb.r == r && rgb.g == g && rgb.b == b;
  }
}
