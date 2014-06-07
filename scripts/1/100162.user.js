// ==UserScript==
// @name           pornbb.org // indicate id
// @namespace      ktz
// @description    katzjonak
// @include        http://www.pornbb.org/*
// @version     1.4
// ==/UserScript==

(function(){

    /* this is a base64 encoded sprite image with icons indicating various
     * hosters */
    var HOSTER_SPRITE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN\
AAAAAQCAMAAABQkgHyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRF/\
c4K5FAHOx0O/v7+KovSIkJsu7vA01BtfIaL8rlq6og3i7/n+sm67ODl6JCi/t/r0KYuZgAAABB0Uk5T\
////////////////////AOAjXRkAAAQSSURBVHjanJeJkqwgDEUFlU2C//+3794E0LadelOT6qJxYTn\
kJuBywiSElEKQs5vUnHO1y+VhuBXSeZkPH+bXh50P27btGIb6dp6fb7uHlYe99S+1tTbmi0tJMcYE60\
i1gKbmUt+BZPdyTTB89h++BpTRUjqQzGckAo+kHUP31/8AVAEjgLL5wj3RrBNJzuicP1TegMLu01+Aq\
gEduCmXh5SHFnTQ9R3IFSzwO5C0ZovBCoHIgxc70XmSp9JI9AIkHPxXQEnfrMtSMK9lyRfQdhmaQPAk\
gugHUEallgvItTX/5KHWwEJb19YwXwEOA0aqEkktqJqJQHVKUXyZQAFj/yw5o9rN0J/PbO1n+/xQnAL\
dnESg0l/JAwg81f0AVOEfMYOPMN9AHp2gAGgLuMA8kBRIBxfpNNwFpA4aQBJeeTxRUqIMvLbWRSnax6\
bqUJtA0ok6UFUWlMWAwCMzluCACIwY4ZgWIxikpYblR4k4Opc0eBBcAEqlViyoyw5lrcWAvJpOCKufO\
BWGET0xIJK9A/Uk35fcy7qn3rqMHrbhmktyKQx9KlDpvhH9M6+0C0ifRJQKH2IVdIwshxIqO5d4AYkC\
5cyhrcgTyBUQsoqBQ+BMwilaN46Zrz1kBh95Kg5XQsU587EKt4fQTN3wVEh0keYkEQUaclIg89XMcqR\
YDdiA6ABvhQLlHL6AuNzpAipk0XktCyPI1lbUWX7IzOmiAQFa8zu0DU2ArQcglkObd6BjxhG1pyTd7k\
BiQAipgERhUHROI6mWUQgEUSDz7gbU8pImEEZyBMrmo5zdOXNCjyMF2hVoYxIzD4F/Sm8HXYu6hHDSa\
KgvMYZsMabuGMzhRnRJbqRtemgNMUB3fIgysncXWVvVQ9V8pEABQIclhQCgUAqfAEH/zEMqflMcJSea\
xQLKTc5nQqB3uFamP1mtIRNCsRjqkWN7kQJRdOkC6ukgW94uujLdY6045BmIwcfoXUTsrLEhTdXmW8X\
EGoBqXsJ2jKSDxOZqzePncgdaJpBi4NVgDvoGogz7eYhus4ZMCOXmoWPM0YBuRLe0XQeQa+MOgFb1de\
uxi3yHbUZbooyVGysyNEawgRDpcPEwdP21sZIDNGBSB31vrMK03fch3Oh7GEfXILoluOMCIlJYO5Btr\
GK6K116kJzmiA4UxBkQ0viUK6o8+lQlounRBxidGGhvJwWQIIZ24/nv0efZ3lAswWHWE2jFnjaB7kef\
UWkGuK5Qmo+yMk9D0icx7KhGHj2cBt1F5+EUIEh1TCr1/XC69fWX35zl8mfzPH3TzwrnleAERF+H0yc\
Z80OMHIZ/ACKRbqzKQyD7XAjX54Nk3aJte3r5fJBwbPNo/ofPhw8770Ty8vnwuHzpXwgT+/fDPwEGAP\
aCUPKzbR7XAAAAAElFTkSuQmCC';

    /* boolean value indicating a time out has occured or operation has
     * finished */
    var timeOut = true;

    /* regex to extract only the actual posts from a forum page,
     * subsequent regex searches applied only to the extracted text should
     * be faster */
    var rgx_posts = /<span[^>]*class="postbody"[^>]*>([\s\S]*?)<span[^>]*class="gensmall"[^>]*>/gm;
    
    /* table containing the nodes, the url of the testes page, a boolean to
     * indicate a received response, and a list of hoster ids per topic */
    var lTable = null;
    
    /* used for progress bar, counterdown indicating remaining topics
     * to process */
    var lTableRemaining = 0;
    
    /* reference to progressBar */
    var progressBar = null;
    
    /* reference to forum content */
    var forumContent = null;
    /* cloned forum content to apply changes without triggerng reflow */
    var forumContentClone = null;
    
    /* hoster list, corresponds to hoster sprite image */
    var hList = [ {
            id : 'or',
            regex : /oron\.com\//
            }, {
                id : 'me',
                regex : /megaupload\.com\//
            }, {
                id : 'hf',
                regex : /hotfile\.com\//
            }, {
                id : 'ul',
                regex : /ul\.to\//
            }, {
                id : 'df', regex : /depositfiles\.com\//
            }, {
                id : 'ff', regex : /filefactory\.com\//
            }, {
                id : 'fsv', regex : /fileserve\.com\//
            }, {
                id : 'fs',
                regex : /filesonic\.com\/file\/|sharingmatrix\.com\//
            }, {
                id : 'rs',
                regex : /rapidshare\.com\//
            }, {
                id : 'es',
                regex : /easy-share\.com\//
            }, {
                id : 'nl',
                regex : /netload\.in\//
            }, {
                id : 'wu',
                regex : /wupload\.com\//
            } ];

    /* helper function to create elements and attributes recusively.
     * function inspired by article on userscripts
     * http://userscripts.org/guides/46 */
    function create() {
        if (arguments.length >= 2 && typeof arguments[0] == 'string' &&
                typeof arguments[1] == 'object') {
            var elem = document.createElement(arguments[0]);
            for (k in arguments[1]) {
                if (k.substr(0,2) == 'on') {
                    elem.addEventListener(k.substring(2), arguments[1][k], false);
                } else if (',style,accesskey,id,name,src,href,which'.indexOf(',' + k.toLowerCase()) != -1 || k.substr(0,5) == 'data-'){
                    elem.setAttribute(k, arguments[1][k]);
                } else {
                    elem[k] = arguments[1][k];
                }
            }
            for (var i = 2; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    var ret_elem = create(arguments[i]);
                    if (ret_elem) {
                        elem.appendChild(ret_elem);
                    }
                } else if (typeof arguments[i] == 'object' && arguments[i].length != undefined) {
                    var ret_elem = create.apply(null, arguments[i]);
                    if (ret_elem) {
                        elem.appendChild(ret_elem);
                    }
                }
            }
            return elem;
        } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
            return document.createTextNode(arguments[0]);
        } else {
            return null;
        }
    }    

    /* extract topic information, fill lTable, returns true if successful */
    function extract() {
        /* [ node, href, response, [ids] ] */
        var topics = [];
        
        /* xpath expressions to find various portions of the data*/
        var xpath_forumContent = '/descendant::table[contains(@class, "forumline")][1]';
        var xpath_topicCells = './descendant::tr/td/span[contains(@class, "topictitle")]/..';
        var xpath_topicGenSmallLastLink = './span[contains(@class, "gensmall")]/a[last()]/attribute::href';
        var xpath_topicTitleLink = './span[contains(@class, "topictitle")]/a[last()]/attribute::href';
        
        /* get node containing actual forum contents */
        var xpathResult_forumContent = document.evaluate(xpath_forumContent, document,
                null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );

        if (xpathResult_forumContent.singleNodeValue != null) {
            /* clone the forum contents, we will work on a copy */
            forumContent = xpathResult_forumContent.singleNodeValue;
            forumContentClone = forumContent.cloneNode(true);
        } else {
            /* not successfull, then return false */
            return false;
        }
        
        /* get the topic table cells from the cloned forum content */
        var xpathResult_topicCells = document.evaluate(xpath_topicCells, forumContentClone,
                null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

        /* iterate of topic table cells and determine if there are multiple pages or a single page */
        while (topicCell = xpathResult_topicCells.iterateNext()) {
            /* if there are multiple pages a certain element exists within the table cell */
            var xpathResult_href = document.evaluate(xpath_topicGenSmallLastLink, topicCell,
                null, XPathResult.STRING_TYPE, null );
            /* does our previous search yielded a result? */
            if (!xpathResult_href.stringValue) {
                /* if not search for the url of a single page topic */
                    xpathResult_href = document.evaluate(xpath_topicTitleLink, topicCell,
                null, XPathResult.STRING_TYPE, null );
            }
            /* if either xpath query yielded a result push the topic to the result array */
            if (xpathResult_href.stringValue) {
                topics.push([ topicCell, xpathResult_href.stringValue, false, [] ]);
            }
        }
        
        /* if we have collected any topic information make our topic array the global topic array */
        if (topics.length > 0) {
            lTable = topics;
            lTableRemaining = lTable.length;
            return true;
        } else {
            /* return false if unsuccessful */
            return false;
        }
    }

    /* get a page and process it*/
    function get(href, index) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', href, true);
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if (timeOut == false){
                    record(analyze(xmlHttp), index);
                }
            }
        };
        xmlHttp.send();
    } /* get */

    /* analyze the response, search for hosters' regex */
    function analyze(response) {
        var rArray = new Array();
        if (response.status == 200) {
            /* we extract the posts texts and concatenate them,
             * this way we have less text to search for subsequent searches. */
            var posts = '';
            var match = rgx_posts.exec(response.responseText);
            while (match != null) {
                posts += match[1];
                match = rgx_posts.exec(response.responseText);
            }
            /* search the posts for various hoster url patterns */
            for (var i = 0; i < hList.length; i++) {
                var regexResult = posts.search(hList[i].regex)
                if (regexResult > -1) {
                    rArray.push(i);
                }
            }
        } else {
            console.log('HTTP status codes was not OK, maybe request intervall is too short.');
        }
        /* return array with ids or null if none were found*/
        if (rArray.length > 0) {
            return rArray;
        } else {
            return null;
        }
    } // analyze

    // enter the result from analysis into the link table
    function record(hIdList, index) {
            if (hIdList != null) {
                lTable[index][3] = hIdList;
                lTable[index][2] = true;
                lTableRemaining--;
                updateProgressBar(lTableRemaining, lTable.length);
            } else { /* in case there was nothing (null) returned */
                lTableRemaining--;
                updateProgressBar(lTableRemaining, lTable.length);
            }
            if (lTableRemaining == 0) {
                implementResults();
            }
    } // recordResult

    /* function processes every link in the link table */
    function process() {
        if (lTable != null) {
            /* indicate running process */
            timeOut = false;
            var i = lTable.length - 1;
            /* get the urls of topics, activate callback functions */
    
            (function getLoop (i) {
                setTimeout(function () {
                    get(lTable[i][1], i);
                    if (i--) getLoop(i);
                }, 300)
            })(i); 

            return true;
        } else {
            return false;
        }
    } // processTopics

    /* creates the progress bar */
    function createProgressBar() {

        if (document.getElementById("overlay") === null) {
            document.getElementsByTagName("body")[0].appendChild(create('div', { id : 'overlay' } ));
        }

        if (progressBar == null) {
            var div_progressbar = create('div', { id : 'progressbar' },
                    'topics processed ',
                    [ 'progress', { value : '0', max : '1000' },
                            [ 'span', {}, '0%']
                    ]
            );
            document.body.appendChild(div_progressbar);
            progressBar = div_progressbar;
        }
    } // createProgressBar

    /* updates the progress bar, cloning it first*/
    function updateProgressBar(x, y) {
        if (progressBar != null) {
            var progressBarClone = progressBar.cloneNode(true);
            var progress = progressBarClone.childNodes[1];
            progress.setAttribute('value', Math.round((y - x) * 1000 / y));
            progress.setAttribute('max', Math.round(y * 1000 / y))
            progress.firstChild.nodeValue = Math.round((y - x) * 100 / y);

            progressBar.parentNode.replaceChild(progressBarClone, progressBar);
            progressBar = progressBarClone;
        }
    }

    /* destroys the progressbar */
    function destroyProgressBar() {
        if (progressBar != null) {
            progressBar.parentNode.removeChild(progressBar);
            progressBar = null;
            
            if (document.getElementById("overlay") != null) {
                document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
            }
    }
    }

    /* appends the necessary styles */
    function appendStyles() {
        var cssData = '#progressbar { z-index:200; text-align: center; padding: 5px; background-color: #fedfeb; color: #fe6da4; border: 1px solid #fe6da4; font-family: Sans-serif; font-size: 11pt; position: fixed; top:50%; left:50%; margin-left: -180px; margin-top: -11pt; width: 360px; -moz-border-radius: 1em; border-radius: 1em; -webkit-border-radius: 1em; } #overlay { position: fixed; z-index:199; top: 0px; left: 0px; height:100%; width:100%; background-color:#000; -moz-opacity: 0.75; opacity: 0.75; } .hsymbol { background-image: url(';
        cssData += HOSTER_SPRITE_IMAGE;
        cssData += '); width: 16px; height: 16px; margin-left: 5px; display: inline-block; position: relative; top : 3px; }';
        
        for (var k = 0; k < hList.length; k++) {
            cssData += ' .';
            cssData += hList[k].id;
            cssData += ' { background-position: ';
            cssData += (k * -16);
            cssData += 'px 0px; }';
        }

        document.getElementsByTagName('head')[0].appendChild(create('style', { type : 'text/css' }, cssData));
    } // appendStyle

    /* make the results visible */
    function implementResults() {
        /* return without action is not running, else set timeOut to true as
         * implementation is the last step of this script. */
        if (timeOut == false) {
            timeOut = true;
            destroyProgressBar();
        } else {
            return;
        }

        /* process the table */
        for (var i = 0; i < lTable.length; i++) {
            if (lTable[i][2] == true) {
                if (lTable[i][3] != null) {
                    if (lTable[i][3].length > 0) {
                        for (var j = 0; j < lTable[i][3].length; j++){
                            lTable[i][0].appendChild(create('div', { className : 'hsymbol ' + hList[lTable[i][3][j]].id }));
                        };
                    } // if
                } // if
            } // if
        }
        forumContent.parentNode.replaceChild(forumContentClone, forumContent);

        /* clear references */
        lTable = null;
        forumContentClone = null;
        forumContent = null;
    } // implementResults

    if (extract()) {
        if (process()) {
            appendStyles();
            createProgressBar();
            updateProgressBar(lTable.length, lTable.length);
            /* ready or not, here I come: after 15 seconds a timeout is triggered */
            window.setTimeout(implementResults, 15000);
        }
    }
})();