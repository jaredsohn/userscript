// ==UserScript==
// @name        TV Today Enhancer
// @namespace   http://userscripts.org/users/Ede123
// @description Buttons for a quick Google / Wikipedia / IMDb and Rotten Tomatoes search. IMDb and Rotten Tomatoes ratings.
// @version     0.95
// @icon        http://s3.amazonaws.com/uso_ss/icon/424576/large.png
// @updateURL   https://userscripts.org/scripts/source/424576.meta.js
// @downloadURL https://userscripts.org/scripts/source/424576.user.js
// @include     http://www.tvtoday.de/programm/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function () {
"use strict";

// link to program detail pages by default
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    links[i].href = links[i].href.replace("format=sendung","format=detail");
}
// only continue on program detail pages
if(!window.location.href.match("format=detail")) { return; }

// get German title and original title  (might be identical)
var title,otitle;
getMovieTitle();

// add links to movie
addLinks();

// get movie data asynchronously
GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.omdbapi.com/?tomatoes=true&t=" + otitle,
    onload: function(response) {
        // Response to JSON
        var omdbData = response.responseText;
        var omdbJSON = JSON.parse(omdbData);
        
        //alert("Titel: " + omdbJSON.Title + " (" + omdbJSON.Year + ")\n" +
        //      "IMDb: " + omdbJSON.imdbRating + "\n" +
        //      "Rotten Tomatoes: " + omdbJSON.tomatoUserRating + " (" + omdbJSON.tomatoUserMeter + "%)");
        
        addRatings(omdbJSON);
    }
});



// get movie title
function getMovieTitle() {
    var mainInfos = document.getElementsByClassName('mainInfos')[0];
    title = mainInfos.childNodes[1].innerHTML.trim();
    
    var cast = document.getElementsByClassName('cast')[0];
    if (cast.childNodes[1] && cast.childNodes[1].innerHTML === "O:") {
        otitle = cast.childNodes[2].data;
        var otitle_RegExp = /(.+), .+?;/;
        otitle = otitle_RegExp.exec(otitle)[1].trim();
    }
    
    otitle = otitle || title;
    
    title = title.replace(/'/g, "\'");
    otitle = otitle.replace(/'/g, "\'");
    
    //alert("Titel: " + title + "\n" + "Originaltitel: " + otitle)
}



// add movie links to page
function addLinks() {
    // create movie links
    var google = createLink("google",
                            "https://www.google.de/search?q=" + title,
                            "https://www.google.de/favicon.ico");
    var wiki   = createLink("wiki",
                            "https://de.wikipedia.org/w/index.php?search=" + title,
                            "https://de.wikipedia.org/favicon.ico");
    var imdb   = createLink("imdb",
                            "http://www.imdb.com/find?s=tt&q=" + otitle.replace(/'/g, "&#39;"),
                            "http://www.imdb.com/favicon.ico");
    var rotten = createLink("rotten",
                            "http://www.rottentomatoes.com/search/?search=" + escape(otitle),
                            "http://www.rottentomatoes.com/favicon.ico");
    
    // create container for customizations
    var div = document.createElement('div');
    div.id = "myRatings";
    div.style.padding = ".5em";
    div.style.marginBottom = "1em";
    div.style.background = "url('/_imgToday/program/popup/hg-tagestippbewertung.gif') repeat scroll 0% 0% transparent";
    div.style.borderTop = "2px solid red";

    var spacer = document.createElement('span');
    spacer.style.padding = ".5em";
    spacer.innerHTML = "|";
    
    div.appendChild(google); div.appendChild(spacer.cloneNode(true));
    div.appendChild(wiki);   div.appendChild(spacer.cloneNode(true));
    div.appendChild(imdb);   div.appendChild(spacer.cloneNode(true));
    div.appendChild(rotten);
    
    // remove unneccessary "tweet" div
    document.getElementsByClassName('tweet')[0].remove();
    // add custom ratings
    var detail = document.getElementsByClassName('detail')[0];
    detail.insertBefore(div, detail.firstChild);
}



// create a new movie link with icon
function createLink(id,link,icon) {
    var newLink = document.createElement('span');
    newLink.id = id;
    newLink.innerHTML = "<a target='_blank' href='" + link + "'>" +
                        "<img src='" + icon + "' width='16' height='16' style='vertical-align:bottom'/>" +
                        "</a>";
    return newLink;
}



// add movie ratings and title received from OMDb API to page
function addRatings(omdbJSON) {
    if(omdbJSON && omdbJSON.Title) {
        var omdbtitle = [];
        var ratingIMDB = [];
        var ratingRotten = [];
        
        // parse title and ratings from omdb data
        omdbtitle    = omdbJSON.Title + " (" + omdbJSON.Year + ")";
        ratingIMDB   = omdbJSON.imdbRating.replace("N/A","&ndash;") + "/10";
        ratingRotten = omdbJSON.tomatoUserRating.replace("N/A","&ndash;") + "/5&nbsp;(" + omdbJSON.tomatoUserMeter.replace("N/A","&ndash;") + "%)";
        ratingIMDB   = '<a href="http://www.imdb.com/title/' + omdbJSON.imdbID + '">' + ratingIMDB + '</a>';
        ratingRotten = '<a href="http://www.rottentomatoes.com/alias?type=imdbid&s=' + omdbJSON.imdbID.substr(2) + '">' + ratingRotten + '</a>';
        
        // add title
        var title_div = document.createElement('div');
        title_div.innerHTML = omdbtitle;
        title_div.style.marginBottom = "0.3em";
        var myRatings = document.getElementById('myRatings');
        myRatings.insertBefore(title_div, myRatings.firstChild);
        // add ratings
        document.getElementById("imdb").innerHTML   += "&nbsp;" + ratingIMDB;
        document.getElementById("rotten").innerHTML += "&nbsp;" + ratingRotten;
    }
}

}());