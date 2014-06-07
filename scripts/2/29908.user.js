// ==UserScript==
// @name           Metacritic - Google Movies
// @description    Add Metacritic ratings to Google Movie search
// @author         Brice McIver
// @include        http://*.google.com/*
// @include        https://*.google.com/*
// @exclude        http://*.google.com/*mid=*
// @exclude        https://*.google.com/*mid=*
// ==/UserScript==

/* To do list:
1. Cache results to reduce load on metacritic servers.
2. Show better indicator that movie was not found on metacritic.
3. Show indicator when all results have been fetched and displayed.
*/

(function () {

    var MCGoogleMovies =
    {
        mc_req: function (movietitle)
        {
            if (! movietitle) {
                return;
            }

            var shortmovietitle = movietitle.text;
            // Remove "The" if it is the first word in movie title
            if (shortmovietitle.search(/the/i) === 0) {
                shortmovietitle = shortmovietitle.substring(4);
            }
            
            // Remove IMAX from title
            shortmovietitle = shortmovietitle.replace(/the imax experience/gi, '');
            
            // Remove alternative titles
            shortmovietitle = shortmovietitle.replace(/\(.*\)/gi, '');

            // Remove most non alphanumeric characters from title
            shortmovietitle = shortmovietitle.replace(/[^A-Za-z0-9 (\-,@,\')]+/g,'');
            
            // Returns first result from search for movie by title.
            var src = 'http://www.metacritic.com/search/process?ty=1&tfs=movie_title&sb=0&ts=' +
                      encodeURIComponent(shortmovietitle);
            if (typeof(GM_xmlhttpRequest) === 'function') {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: src,
                    headers: {
                        'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
                    },
                    onload: function (response) {
                        var theRating = response.responseText.match(/ <span class="(green|yellow|red|noscore)">[x 0-9]{1,3}<\/span>/i);
                        if (theRating !== null)
                        {
                            var newElement = document.createElement("span");
                            newElement.innerHTML = theRating[0];
                            movietitle.parentNode.insertBefore(newElement, movietitle.nextSibling);
                        }
                    }
                });
            }
        },

        mc_discover: function ()
        {
            var movieLinks  = document.evaluate("//a[contains(@href,'mid=')]",
                                                document,
                                                null,
                                                XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                                                null);
            try {
                var linkText = movieLinks.iterateNext();

                while (linkText) {
                    MCGoogleMovies.mc_req(linkText);
                    linkText = movieLinks.iterateNext();
                }
            }
            catch (e) {
                dump('Error: Document tree modified during iteration ' + e);
            }
        },

        addGlobalStyle: function (css)
        {
            var head = document.getElementsByTagName('head')[0];
            if (!head) {
                return;
            }
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }
    };

    // Styles from http://www.metacritic.com/general.css on 7/10/2008
    MCGoogleMovies.addGlobalStyle('.green { font-weight: bold; color: #000000; background-color: #33CC00; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; } ');
    MCGoogleMovies.addGlobalStyle('.yellow { font-weight: bold; color: #000000; background-color: #FFFF00; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; } ');
    MCGoogleMovies.addGlobalStyle('.red { font-weight: bold; color: #FFFFFF; background-color: #FF0000; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; } ');
    MCGoogleMovies.addGlobalStyle('.noscore { font-weight: bold; color: #000000; background-color: #808E9B; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; } ');
    MCGoogleMovies.mc_discover();

})();
