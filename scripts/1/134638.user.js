// ==UserScript==
// @name           tv.com // episode list
// @namespace      katzjonak
// @include        http://www.tv.com/shows/*/episodes/*
// @run-at document-end
// @version 1.3
// ==/UserScript==

(function() {

    /* function to pad string with zeroes */
    function pad(str, length) {
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
    

    /* need this for chrome, opera, firefox compatibility
     * see http://mths.be/unsafewindow */
    var gm_uwin = (function(){
        var a;
        try {
            a = unsafeWindow == window ? false : unsafeWindow; // Chrome: window == unsafeWindow
        } catch(e) { }
        return a || (function(){
            var el = document.createElement('p');
            el.setAttribute('onclick', 'return window;');
            return el.onclick();
        }());
    }());


    /* tv.com uses ajax to load episode data, thankfully they call an
     * ajax_done()-function after each ajax-call, we hi-jack this one */
    var _ajax_done = gm_uwin.ajax_done;
    gm_uwin.ajax_done = (function(args) {
        _ajax_done.apply(this, args);
        do_listings();
    });

    /* appends the necessary styles */
    function appendStyles() {
        var cssData = '.listing { border : 1px #cccccc dotted; background-color: #f5f5f5; -moz-border-radius: 1em; border-radius: 1em; -webkit-border-radius: 1em; padding : 1em; margin-bottom: 1em; }';
        document.getElementsByTagName('head')[0].appendChild(create('style', { type : 'text/css' }, cssData));
    } // appendStyle

    /* helper function to create elements and attributes recusively.
     * function inspired by article on userscripts
     * http://userscripts.org/guides/46 */
    function create() {
        if (arguments.length >= 2 && typeof arguments[0] == 'string' &&
                typeof arguments[1] == 'object') {
            var elem = document.createElement(arguments[0]);
            for (k in arguments[1]) {
                if (k.substr(0,2) == 'on') {
                    elem.addEventListener(k.substring(2), arguments[1][k],
                            false);
                } else if (
                        ',style,accesskey,id,name,src,href,which'.indexOf(
                        ',' + k.toLowerCase()) != -1 || k.substr(
                        0,5) == 'data-') {
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
                } else if (typeof arguments[i] == 'object' &&
                        arguments[i].length != undefined) {
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

    function do_listings() {

        /* to find the name of the series */
        var xpath_series_name = '/descendant::div[contains(@class, "show_head")]/descendant::h1/text()';
        /* to get ul-element above each episode list */
        var xpath_seasons = '/descendant::ul[contains(@class, "episodes") and not(@data-listed) and @id]';
        /* get episode titles' parents relative to episode listing element (ul) */
        var xpath_episodes = 'self::ul/descendant::a[@class="title"]/parent::*';
        /* get titles relative to parent */
        var xpath_episode_title = 'self::*/a[@class="title"]/text()';
        /* get raw episode number data relative to parent (needs to be refined by regex) */
        var xpath_episode_number = 'self::*/div[contains(@class, "ep_info")]';

        /* regex for episode number from heading */
        var rgx_e = /\s*Episode\s+(\d+)/;
        /* regex for season number from id of season-ul-elements*/
        var rgx_s = /\s*season\-(\d+)\-eps\s*/;

        /* get series name */
        var series_name = document.evaluate(xpath_series_name, document, null,
                XPathResult.STRING_TYPE, null).stringValue;

        /* only if series name was found proceed*/
        if (series_name) {
            /* */
            var seasons = document.evaluate(xpath_seasons, document, null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < seasons.snapshotLength; i++) {
                var season = seasons.snapshotItem(i);
                var season_number = pad(rgx_s.exec(
                        season.getAttribute('id'))[1], 2);
                var episode_iterator = document.evaluate(xpath_episodes,
                        season, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                        null);
                var episode_titles = [];
                while (episode = episode_iterator.iterateNext()) {
                    /* find the episode title */
                    var episode_title = document.evaluate(xpath_episode_title,
                            episode, null, XPathResult.STRING_TYPE,
                            null).stringValue;
                    /* find the episode number*/
                    var episode_numberNode  = document.evaluate(
                            xpath_episode_number, episode, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE,
                            null).singleNodeValue;
                    if (episode_title) {
                        /* extract episode number from string with regular
                         * expression */
                        var episode_number = null; 
                        if (episode_numberNode) {
                            episode_number = rgx_e.exec(
                                episode_numberNode.textContent);
                        }
                        var s = series_name;
                        s += '_-_';
                        s += 's';
                        s += season_number;
                        
                        if (episode_number) {
                            s += 'e';
                            s += pad(episode_number[1],2);
                        }
                        
                        s += '_-_';
                        s += episode_title;
                        
                            /* push file name to array after pre-processing */
                        episode_titles.push(
                                s.toLowerCase().replace(/[\s\'_]+/g,
                                '_').replace(/[,\.\:\?\!]/g, ''));
                    }
                }
                if (episode_titles.length > 0) {
                    /* creating the listing is easy with our
                     * super-helper function */
                    var listing = create('li', { className : 'listing', 'data-listing' : 'yes' },
                            [ 'div', { className : 'title' }, 'File names generated by user script:' ],
                            [ 'br', {} ],
                            [ 'pre', {}, episode_titles.join('\n') ]
                    );
                    /* insert the listing as child of season-ul-element */
                    if (season.firstChild) {
                        season.insertBefore(listing, season.firstChild);
                    } else {
                        season.appendChild(listing, season.firstChild);
                    }
                    /* we do not want to process data twice after ajax-call,
                     * so we mark it with our special data-attribute */
                    season.setAttribute('data-listed', 'true');
                }
            } // season
        }
    }

    /* main */
    appendStyles();
    do_listings();


})();