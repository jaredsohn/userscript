// ==UserScript==
// @name           IMDB Ratings in Sky Anytime
// @namespace      lars-oppermann.com
// @version        1.1
// @description    Adds ratings and links to IMDB to films in Sky Anytime
// @include        http://www.sky.de/web/cms/de/skyplus-anytime.jsp
//
// Based on http://userscripts.org/scripts/show/166576
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function () {
	// add ratings when page first loads
    addImdbRatings();
}, false);

document.addEventListener("click", function (event) {
    // apply ratings when a control is used that changes the content table
    if (event.target.hasAttribute("aria-controls")) {
	    addImdbRatings();
	}
}, false);

function addImdbRatings() {
    // loop through titles and fetch rating for those that do not yet have a rating
    rows = document.querySelectorAll("table.dataTable tr > td:first-child + td");
    for (i = 0; i < rows.length; i++) {
        // console.log("found row:" + rows[i].textContent);
        if (! rows[i].imdb_rating) {
	        rows[i].imdb_rating = true;
    	    addImdbRating(rows[i]);
        }
    }
}

function addImdbRating(elem) {
    currentTitle = elem.textContent;
    currentYear = ""; // sky anytime has no year information (yet)
    
    // for Episodes, this really doesn't work that well (yet)
    if (currentTitle.indexOf("Eps.") != -1) {
        reurn;
    }
    
    /* imdb link */
    var imdb_link = document.createElement("a");
    imdb_link.target = "_blank";
    elem.textContent = currentTitle + " ";
    elem.appendChild(imdb_link);
    
    /* imdb rating display */
    var imdb_rating = document.createTextNode("(?)")
    imdb_link.appendChild(imdb_rating)
    
	// Sky Anytime "UT" prefix confuses search
    currentTitle = currentTitle.replace(/UT (.*)/, "$1");
    
    currentTitle = currentTitle.replace(/(.*?) - Teil/, "$1");
    

    /* request and apply data */
    search_imdb(currentTitle, currentYear, function(data) {
        var imdb_id = data.imdbID;
        imdb_link.href = data.imdbUrl;
        get_imdb_info(data.imdbID, function (info) {
            imdb_rating.nodeValue = " (" + info.imdbRating + ")";
        });
    });
}

function search_imdb (title, year, callback) {
    var url = "http://akas.imdb.com/find?q=" + encodeURIComponent(title) + "&s=tt";
 	GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(details) {
            var res = {};
            var doc = document.implementation.createHTMLDocument('');
            doc.body.innerHTML = details.responseText;
            hits = doc.querySelectorAll("td.result_text");
            hit = hits[0].innerHTML;
            res.imdbID = hit.replace(/.*?\/title\/(tt\d*)\/.*/, "$1");             
            res.imdbUrl = "http://www.imdb.com/title/" + res.imdbID;
            console.log("imdb: " + title + " -> " + hit);
            callback(res);
        }
    });
}

function get_imdb_info (movieID, callback) {
    var api_url = "http://www.omdbapi.com/?i=" + movieID
    GM_xmlhttpRequest({
        method: "GET",
        url: api_url,
        onload: function(details) {
            var res;
            res = eval('(' + details.responseText + ')');
            callback(res)
        }
    });	
}
