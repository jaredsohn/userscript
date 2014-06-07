// ==UserScript==
// @name           iCheckNetflix
// @description    Checks Netflix availability for movies on icheckmovies.com
// @version        1.5.2
// @namespace      iCheckMovies
// @include        http://icheckmovies.com/*
// @include        http://www.icheckmovies.com/*
// ==/UserScript==
//

// in case urls change
var is_overview_page = /\/list\/overview/.test(location.href); 
var is_search_page = /\/search/.test(location.href);
var is_special_list_page = /\/movies\/(checked|unchecked|favorited|disliked|owned|watchlist|recommended)/.test(location.href)
var is_movie_page = ! is_search_page && !is_special_list_page && /\/movies\/([^\/]*)/.test(location.href);

// Customizable constants
var MOVIE_XPATH = "//*[contains(@class,'unchecked') and contains(@class, 'movie')]";
var MOVIE_LIMIT = 100; // maximum number of movies to check, don't abuse or they might add limits

var ERROR_STYLE = 'background-color: red; border: 3px double yellow; color: white; padding: 3px; font-size: 1.5em; position: fixed; bottom: 0; width: 100%; z-index: 1001';
var AVAIL_STYLE = is_search_page   ? 'float: right; display: inline;'
                : '' /*'position: absolute; right: 100px; ' + (is_movie_page ? 'top: 0.25em;' : 'top: 1.5em;')*/;
var INSTANT_STYLE = 'color: red !important;';
var DVD_STYLE = 'color: #567D68 !important;';
var UNKNOWN_STYLE = '';
//var N_STYLE = 'background: red !important; color: white !important; font-family: sans-serif; font-weight: bold; text-shadow: 1px 2px black; text-align: center; vertical-align: middle'
var N_STYLE = 'background: none !important; color: #cdc; font-family: sans-serif; font-weight: bold; text-align: center; line-height: 26px;';

var NETFLIX_SEARCH = 'http://movies.netflix.com/WiSearch?oq=r&v1=';














/*****************************************************************/
// Probably shouldn't mess below this line, but have at it!

// the styles I use, also modifiable without serious consequences
GM_addStyle(".gm_error { " + ERROR_STYLE + " }");
GM_addStyle(".gm_avail { " + AVAIL_STYLE + " }");
GM_addStyle(".gm_avail a { text-indent: 0 !important; }");
GM_addStyle(".gm_dvd a { " + DVD_STYLE + " }");
GM_addStyle(".gm_instant a { " + INSTANT_STYLE + " }");
GM_addStyle(".gm_unknown { " + UNKNOWN_STYLE + " }");
GM_addStyle(".gm_n { " + N_STYLE + " }");
GM_addStyle(".gm_n a { color: white !important; }");


var head = (unsafeWindow.document.getElementsByTagName("head"))[0];

if (unsafeWindow.console){
    GM_log = unsafeWindow.console.log;
}

// allow for interacting with output of another greasemonkey script
// by giving it a couple seconds to print its output
var delay = is_overview_page && GM_getValue("icm_imdb_most_toplists") !== undefined ? 2000 : 0;

setTimeout(find_netflix_movies, delay);

function find_netflix_movies() {
try {
    var movies = xpath(MOVIE_XPATH);
//    console.debug(movies);
    for (var i = 0; i < movies.snapshotLength; i++) {
        if (i >= MOVIE_LIMIT) return;
        var movie = movies.snapshotItem(i);
//        console.debug(movie);

	var link, title, year = '';
        if (is_overview_page && movie.tagName == 'TD') {
            // handle entries added by "Unchecked films on Most IMDB Lists" extension
	    link = xpath("a", movie).snapshotItem(0);
            var matches = movie.textContent.match(/(.*), (\d+)/);
            title = matches[1];
            year = matches[2];
        } else if (is_movie_page && ! is_search_page) {
            // handle single movie page
            var header = xpath("h1", movie).snapshotItem(0);
            link = location;
            title = header.textContent;
        } else {
            // handle list and search page
	    var node = xpath("h2//a", movie);
            link = node.snapshotItem(0);
            title = link.textContent;
            var year_node = xpath("span[@class='info']", movie).snapshotItem(0);
            if (year_node) {
	        var matches = year_node.textContent.match(/(\d+)/);
                if (matches) year = matches[1];
            }             
        }
        
        // skip this "movie" if we couldn't find a link or the link was not to a movie
        // (typical for the 'bulleted' items since that is used for user lists as well
        if (! link || ! link.href || ! /\/movies\//.test(link.href)) continue;


        title = title.replace(/ä/, 'a')
        var titles = [title];

        // check for anglicized version of title (netflix titles tend to match these)
        var title_en = link && link.href ? link.href.match(/\/movies\/([^\/]*)/)[1] : null;
        if (title_en && title_en != title.toLowerCase()) {
            title_en = title_en.replace(/\+/g, ' ');
            titles.push(title_en);
        }

        // find alternate title in snap.akaTitle
        var aka_title = '';
        var aka_tag = is_search_page ? xpath("strong", movie) : xpath("span[@class='akaTitle']/em", movie);
        if (aka_tag.snapshotLength) aka_title = aka_tag.snapshotItem(0).textContent;

        // some lists (like the unchecked list) only put the aka title link tooltip
        if (! aka_title) {
            var akas = link.title ? link.title.match(/\(a\.k\.a\. ([^,]+)/) : null;
            if (akas) aka_title = akas[1];
        }

        if (aka_title) titles.push(aka_title);

        // pull the year from the span.year tag

        if (! year) {
            var year_tag = xpath("span[@class='year'] | ..//dl/dd", movie);
            if (year_tag.snapshotLength && ! year_tag.snapshotItem(0).textContent.search(/ago/) > 0) year = parseInt(year_tag.snapshotItem(0).textContent);
        }

        // again, some lists only have the year in the link tooltip
        if (! year) {
            var matches = link.title ? link.title.match(/(\d+)\)$/) : null;
            if (matches && matches.length) year = parseInt(matches[1]);
        }

        // for the single movie page, aka titles and year are displayed below the title in dt/dd pairs
        if (! year && is_movie_page) {
            var dts = xpath("..//dl/dt", movie);
            for (var i = 0; i < dts.snapshotLength; i++) {
                var dt = dts.snapshotItem(i);
                var dd = dt.nextElementSibling;
                if (dt.textContent.match(/A\.k\.a\./)) {
                    titles.push(dd.textContent);
                } else if (dt.textContent == 'Year') {
                    year = parseInt(dd.textContent);
                    break;
                }
            }
        }

        // if all else fails, have to have a year
        if (! year) year = 0;

        // some translated titles only differ in the initial "The"
        titles = titles.map(function(t) { return t.replace(/^the\s+/i, '').replace(/ä/, 'a') });

        //GM_log(titles, year);

        // need to use a closure since the callback runs in the unsafeWindow
        var niceDate = function (date_string) {
            if (! date_string) return '';
            var nums = date_string.match(/\d+/);
            if (! nums.length) return '';
            var num = parseInt(nums[0]);
            return (new Date(num)).toLocaleDateString();
        };

        // callback for jsonp request, adds a netflix 'icon' and availability indicator
        var callback = function (response, movie, titles, year, try_again) {
            if (response.readyState != 4) return;

            //console.debug(response.responseText);
            var json;
            try { json = JSON.parse(response.responseText); } catch (e) { } // should we throw an error? its probably XML if it fails
            if (! json) return;

            var res = json.d.results || json.d;
            var title = 'Not Found';
            var cls = 'gm_unknown';
            var url = NETFLIX_SEARCH + titles[0];
            if (res && res.length) {
                // GM_log("Trying to find: ", titles, year);
                var m = best_movie(res, titles, year);
                if (m) {
                    // if (! try_again) GM_log("     Chose: ", m.Name, m.ReleaseYear);
                    var can_instant = m.Instant.Available;
                    var can_hd = m.Instant.HighDefinitionAvailable;
                    var can_dvd = m.Dvd.Available;
                    var can_blu = m.BluRay.Available;

                    title = can_hd ? 'HD Instant'
                          : can_instant ? 'Instant'
                          : can_blu && can_dvd ? 'BluRay & DVD'
                          : can_blu ? 'BluRay only'
                          : can_dvd ? 'DVD only'
                          : 'Unavailable';
                    
                    url = m.Url;
                    cls = can_hd || can_instant ? 'gm_instant'
                        : can_blu || can_dvd    ? 'gm_dvd'
                        :                         'gm_unknown'

                    var from = res.length && ! can_instant ? niceDate(res[0].Instant.AvailableFrom) : '';
                    var till = res.length && can_instant ? niceDate(res[0].Instant.AvailableTo) : '';
                    if (from || till) {
                        title += ' (from ' + (from || '?') + ' - ' + (till || '?') + ')';
                    }
                } else {
                    // GM_log("     No reasonable match found");
                }
            } else if (try_again) {
                // failed to find movie with exact title
                // so try partial matches without a year
                // and we'll try to choose the best one later
                var query = "http://odata.netflix.com/Catalog" // netflix base url
                    + "/Titles" // top-level resource
                    + "?$filter="
                    + "Type eq 'Movie' and "
                    // loose query based on titles
                    + "(" + titles.map(function(t) { return "substringof('" + esc(t) + "', Name)" }).join(' or ') + ")"
                    + "&$top=6"
                    + "&$format=json"; // json request

                var cb = (function (m, t, y) { return function(response) { callback(response, m, t, y, false) }; })(movie, titles, year); // silly js closure kludge
                // GM_log("Second try: ", query);
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: query,
                    onload: cb,
                });
                return;
            }
            var link = '<a class="gm_n" title="' + title + '" href="' + url + '">N</a>';
            var info = document.createElement("li");
            info.style.textIndent = '0 !important';
            info.className = 'gm_avail ' + cls;
            info.innerHTML = link;
            xpath("ul[contains(@class,'optionIconMenu')]", movie).snapshotItem(0).appendChild(info);
        };

        var query = "http://odata.netflix.com/Catalog" // netflix base url
            + "/Titles" // top-level resource
            + "?$filter=Name eq '" + esc(title) + "'" // exact title match
            + " and ReleaseYear eq " + year           // and exact year match
            + "&$format=json"; // json request

        var cb = (function (m, t, y) { return function(response) { callback(response, m, t, y, true) }; })(movie, titles, year); // silly js closure kludge
        GM_xmlhttpRequest({
            method: 'GET',
            url: query,
            onload: cb,
        });
    }
} catch (e) {
    showError(e);
}
}

// convenience method for xpath
function xpath(query, node) {
    if (! node) node = document;
    return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function esc(title) {
    // escape quotes in movie title
    title = title.replace(/'/g, "''");
    title = title.replace(/"/g, '""');
    title = title.replace(/&/g, '%26');
    return title;
}

// given a list of movies chosen loosely based on title and year
// chooses the movie that most closely matches the criteria
function best_movie(movies, titles, year) {
    if (! movies.length) return null;
    if (movies.length == 1) return movies[0];

    for (var i = 0; i < movies.length; i++) {
        // GM_log("    ", movies[i].Name, movies[i].ReleaseYear);
    }

    // try exact match on title and year
    for (var i = 0; i < movies.length; i++) {
        for (var j = 0; j < titles.length; j++) {
            if (movies[i].Name.toLowerCase() == titles[j].toLowerCase() && movies[i].ReleaseYear == year) return movies[i];
        }
    }

    // next try a partial match but still same year
    for (var i = 0; i < movies.length; i++) {
        for (var j = 0; j < titles.length; j++) {
            if (movies[i].Name.toLowerCase().indexOf(titles[j].toLowerCase()) > -1 && movies[i].ReleaseYear == year) return movies[i];
        }
    }

    // finally, try a partial match on title and nearby year
    for (var i = 0; i < movies.length; i++) {
        for (var j = 0; j < titles.length; j++) {
            if (movies[i].Name.toLowerCase().indexOf(titles[j].toLowerCase()) > -1 && Math.abs(movies[i].ReleaseYear - year) <= 1) return movies[i];
        }
    }

    // if all else fails, give up
    return null;
}

// Something bad happened, make that obvious on the page (hopefully there's no errors here too...)
function showError (e) {
    var warning = document.createElement('DIV');
    warning.setAttribute('class', 'gm_error');
    warning.innerHTML = [
        'Greasemonkey script "iNetflixMovies" encountered a fatal error<br> - <b>',
        typeof e === 'object' && e.name && e.name == 'TypeError' && e.lineNumber
        ? [e.name, ': ', e.message, ' crashed in ', e.fileName, ' at line ', e.lineNumber].join('')
        : e.toString(),
        '</b>',
        '<br>If this continues, you may need to disable the script and contact the author',
        '</div>'
    ].join('');
    document.body.insertBefore(warning, document.body.firstElementChild);
}