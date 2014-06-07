// ==UserScript==
// @name            Dagens film 2
// @description     Adds movieposters, imdb ratings and scope.dk ratings on movies in dagensfilm.dk programlist.
// @source          http://userscripts.org/scripts/show/30412
// @identifier      http://userscripts.org/scripts/source/30412.user.js
// @version         1.7
// @date            2008-12-30
// @author          Bjørn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         http://www.dagensfilm.dk/
// @include         http://us.imdb.com/*
// ==/UserScript==
/*
Todays movies on the danish tv channels. Shows movieposters, imdb ratings and scope.dk ratings on movies in tv2.dk programlist (the code is fairly easy to modify, so it runs on other sites that lists movies on tv). You can optionally choose to hide certain channels (This is set up in the first line of the script). Use this url: http://tv.tv2.dk/tv/listning.php?Region=1&KanalID=0&Soegeord=&Dato=0&Kategori=13&Periode=2&Sortering=2

Ideas:
- Sort by rating, time, channel etc
- Customizable listing. In the webpage it should be possible to show, hide and reorder columns.
- Movies of the week

*/

var aRemoveTvStations = ['TV1000','Classic','CANAL+Danmark','CANAL+Film1','CANAL+Film2','CANAL+Film3'];
var minIdmbRating = 0;
var dontShowMoviesThatStartEarlierThan = "7:00";

// some useful functions
function $(id) {return document.getElementById(id)};
function get(url,cb) {GM_xmlhttpRequest({method:"GET",url:url,onload:function(xhr){cb(xhr.responseText);}})}
function post(url,data,cb) {GM_xmlhttpRequest({method:"POST",url:url,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(data),onload:function(xhr){cb(xhr.responseText);}})}

// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------

function autoupdate() {
    get('http://www.rosell.dk/gm/dagensfilm2.user.js', function(s) {
        var re = /@version\s*(\d*\.\d*)/;
        var a = re.exec(s);
        if (a == null) return
        var ver = parseFloat(a[1]);
        if (ver > 1.7) {
            var elmInsertPoint = document.body;
            var elmA = document.createElement("a");
            elmA.setAttribute("href", "http://www.rosell.dk/gm/dagensfilm2.user.js");
            elmA.appendChild(document.createTextNode('Der er en ny version af "Dagens Film 2" scriptet. Klik her for at installere'));
            elmInsertPoint.insertBefore(elmA, elmInsertPoint.firstChild);
        }
    });
}

if (self==top) autoupdate();
if (self!=top) return

// http://us.imdb.com/index.html?formsubmitter&action=Nsearch&name=Robert+Redford&occupation=Actors+only
// Actors,Acteresses
if (window.location.href.indexOf('us.imdb.com') > -1) {
    //post('http://us.imdb.com/Nsearch', 'name=Robert Redford&occupation=Actors only', function(s) {
    
    var s = window.location.href
    if (s.indexOf('formsubmitter') < 0) return
    s = s.substr(s.indexOf('&')+1);
    var a = s.split('&');
    //alert(a)
    var html = '';
    var action = ''
    for (var i=0; i<a.length; i++) {
        var a2 = a[i].split('=');
        if (a2[0] == 'action') {
            action = a2[1];
        }
        else {
            html += a2[0] + '<input name="' + a2[0] + '" value="' + decodeURI(a2[1]) + '"><br>';
        }
    }
    html = '<form method=POST action="' + action + '">' + html + '</form>';
    document.body.innerHTML = html;
    document.forms[0].submit();
}

// --------------------------------------------------------------------------
//   Reusable Facebook Movies Module v1.3
//
//   This is a reusable module for getting info on the Facebook Movies app.
//   It requires that the user has autologin on facebook.
//   It is open source. Feel free to build on it.
//
//   author: Bjørn Rosell, webpage: http://rosell.dk
// --------------------------------------------------------------------------

var RFMM = {}

// First some small useful functions
RFMM.get = function(url,cbOk,cbError){GM_xmlhttpRequest({method:"GET",url:url,onload:function(xhr){cbOk(xhr.responseText)},onerror:cbError})}
RFMM.post = function(url,data,cbOk,cbError) {GM_xmlhttpRequest({method:"POST",url:url,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(data),onload:function(xhr){cbOk(xhr.responseText)},onerror:cbError})}
RFMM.rtrim = function(s) {return s.replace(/\s+$/, "")}
RFMM.ltrim = function(s) {return s.replace(/^\s+/, "")}
RFMM.trim = function(s) {return RFMM.ltrim(RFMM.rtrim(s))}

/* 
 lookupInFacebookMovies
 
 This function does the job of getting the ratings from Facebook Movies
 @param sTitle     : Title of the movie (String)
 @param cbOk       : A function that will be called when ratings have been loaded.
 @param cbNotFound : A function that will be called when ratings was not found.
 
 cbOk will be called with the following arguments:
 @param fFlixterRating      : The flixter rating (number)
 @param sMovieUrl           : Movie url on Facebook Movies
 @param sFlixterRatingHtml  : Html that makes up the general flixter rating (or empty string, if you haven't rated it)
 @param sYourRatingHtml     : Html that makes up your rating (or empty string, if you haven't rated it)
 @param sFriendsRatingsHtml : Html that makes up your friends rating (or empty string, if no friends have rated it)
 @param sPosterImageUrl     : Url to poster image on Facebook Movies 
 
*/
RFMM.lookupInFacebookMovies = function(sTitle, cbOk, cbNotFound) {
    var fRating;
    var sMovieUrl;
    var sFlixterRatingHtml = ''
    function analyzeSearchResults(s) {
        var pos = s.indexOf('images/rating/');
        if (pos == -1) {
            cbNotFound();
            return
        }
        
        function lenientTitle(sTitle) {
            sTitle = sTitle.split('&').join('(&|and|&amp;)');
            sTitle = sTitle.split(' and ').join(' (&|and|&amp;) ');
            sTitle = sTitle.split("'").join("'?");
            sTitle = sTitle.split("es ").join("(es|s)? ");
            sTitle = sTitle.split("s ").join("s? ");
            sTitle = sTitle.split(": ").join(":? ");
            sTitle = sTitle.split("the ").join("(the)? ");
            sTitle = sTitle.split("The ").join("(the)? ");
            return sTitle;
        }
        sTitle = lenientTitle(sTitle);
        
        s = s.split("&#039;").join("'");
        s = s.split("'s ").join(" ");     // My Boss's Daughter -> My Boss Daughter
        s = s.split("'").join("");
        s = s.split(" - ").join(" ");
        s = s.split("the ").join(" ");
        s = s.split("The ").join(" ");
        
        // first try exact match! (except case)
        var re = new RegExp('<a title="(' + sTitle + ')" href="([^"]*)', 'gi');
        var a = re.exec(s)
        if (a == null)  {
            // Sometimes the title is shown in two languages ie: "Bagland (Scratch)"
            // try to match title between parentheses
            re = new RegExp('<a title="([^"]*\\(' + sTitle + '\\))" href="([^"]*)', 'gi');
            a = re.exec(s)
            if (a == null) {
                // try to match without parentheses
                re = new RegExp('<a title="(' + sTitle + '\\s*\\([^"]*\\))" href="([^"]*)', 'gi');
                a = re.exec(s)
                if (a == null) {
                    // TODO: maybe go to imdb for an alternative title?
                    // Example: "X-Men 2" is not found on facebook movies, but its found on imdb
                    //          - on imdb, the title is "X2" - which can be found on facebook movies
                    // TODO:
                    // Movies not in search results:
                    // "Cant hardly wait!" isn't found, because its called "Can't hardly wait!"
                    // "Gridlockd" - "Gridlock'd"
                    //
                    // Movies in results, but not matched:
                    // none found yet :)
                    cbNotFound();
                    return
                }
            }            
        }
        
        // get rating and link
        // -----------------------------------
        var title = a[1];
        sMovieUrl = a[a.length-1];

        var pos = s.indexOf('<a title="' + title + '"');
        var pos2 = s.indexOf('images/rating/', pos);
        var rating = s.substr(pos2 + 14, 3);
        fRating = parseFloat(rating, 10);

        // <img src="http://bk.flixster.com/static/images/rating/3.0.gif" alt="3.0 Stars" />
        var ss = s.substr(pos2-70);
        var result = /(<img [^>]*>)/.exec(ss);
        if (result) {
            sFlixterRatingHtml = result[1];
        }
        
        // Go to the movie page, so we can get friends ratings/comments
        RFMM.get(sMovieUrl, analyzeMoviePage, cbNotFound);
    }
    function analyzeMoviePage(s) {
        // Get Your rating
        var sYourRatingHtml = '';
        var pos = s.indexOf('Your Rating:');
        if (pos > 0) {
            var pos2 = s.indexOf('<img', pos);
            var pos3 = s.indexOf('>', pos2);
            var sHTML = s.substr(pos2, pos3 - pos2 + 1)
            if (sHTML.indexOf('alt="Not Rated Yet"') == -1) {
                sYourRatingHtml = sHTML;
            }
        }

        // Get ratings/comments of your friends
        var sFriendsRatingsHtml = '';
        var pos = s.indexOf('<ul class="othersRatings">')
        if (pos > 0) {
            var pos2 = s.indexOf('</ul>', pos)
            var sHTML = s.substr(pos + 26, pos2 - pos - 26)
            sFriendsRatingsHtml = RFMM.trim(sHTML.split('\n').join(''));
        }
        
        // Get poster image
        // look for something like this:
        // <img src="http://content8.flixster.com/movie/28/30/283006_pro.jpg" class="posterThumb" alt="Kiss Toledo Goodbye" />                    
        var sPosterImageUrl = '';
        var re = /<img src="([^"]*)" class="posterThumb"/
        var a = re.exec(s);
        if (a != null) {
            sPosterImageUrl = a[1];
        }

        // call back with results
        cbOk(fRating, sMovieUrl, sFlixterRatingHtml, sYourRatingHtml, sFriendsRatingsHtml, sPosterImageUrl);            
    }
    RFMM.post('http://apps.facebook.com/flixster/search', "search=" + sTitle, analyzeSearchResults, cbNotFound);
}

/*
 Use this to convert sFriendsRatingsHtml (that you got from "lookupInFacebookMovies") to an array of friend ratings
 Each rating is an object that has the following properties:
        friendName    the name of the friend
        friendLink    the url of the friends page
        ratingHtml    html of the rating (the image)
        comment       the comment, if any
        ratingAge     age of the rating
 @param sFriendsRatingsHtml
 @return array of rating objects
 */
RFMM.createArrayOfFriendRatings = function(sFriendsRatingsHtml) {
    var aFriendsRatings = [];
    var a = sFriendsRatingsHtml.split('<li');
    for (var i=1; i<a.length; i++) {
        var oFriendRating = {};
        
        var s = a[i].split('\n').join('');
        
        // get age (<div class="age">60 days ago</div>)
        var result = /<div class="age">([^<]*)<.div/.exec(s);
        if (result) {
            oFriendRating.ratingAge = result[1];
        }

        // get friend name and link to friend
        var friendName = '';
        var friendLink = '';
        var pos1 = s.indexOf('<div class="name">');
        if (pos1 != -1) {
            var pos2 = s.indexOf('</div>', pos1);
            var ss = s.substr(pos1, pos2 - pos1);
            result = /<a href="([^"]*)"/.exec(ss);
            if (result) {
                oFriendRating.friendLink = result[1];
            }
            result = /<a[^>]*>\s*(.*)\s*<.a>/.exec(ss);
            if (result) {
                oFriendRating.friendName = RFMM.trim(result[1]);
            }
        }
        
        // get friend rating
        var friendRating = '';
        var posStars1 = s.indexOf('<div class="stars">');
        if (posStars1 != -1) {
            var pos2 = s.indexOf('</div>', posStars1);
            oFriendRating.ratingHtml = RFMM.trim(s.substr(posStars1 + 19, pos2 - posStars1 - 19));
        }
        
        // get friend comment
        var posBQ1 = s.indexOf('<blockquote class=" quote">', posStars1);
        if (posBQ1 > 0) {
            var pos1 = s.indexOf('<span ', posBQ1);
            if (pos1 > 0) {
                pos1 = s.indexOf('>', pos1);
                if (pos1 > 0) {
                    pos1 = pos1 + 1
                    pos2 = s.indexOf('</span>', pos1);
                    oFriendRating.comment = RFMM.trim(s.substr(pos1, pos2 - pos1));
                }
            }
            
        }
        
        aFriendsRatings.push(oFriendRating);
    }
    return aFriendsRatings;
}
// End of "Reusable Facebook Movies module"


// ------------------------------------------------------------------------------------
//                              Part 1: IMDB Class
// ------------------------------------------------------------------------------------
function IMDB() {};
// cb is called with arguments: success (boolean), link (string), rating (string)
IMDB.lookupRating = function(title, year, featuring, cb) {
    function extractInfo(s) {
        var re = /"(\/title\/.{9}\/)\".*?(\d\.\d)\/10/i;
        var a = re.exec(s);
        if (!a || (a.length == 0)) {
            re = /"(\/title\/.{9}\/)"/i;
            a = re.exec(s);
            if (!a || (a.length == 0)) {
                cb(false)
            }
            else {
                cb(true, url + a[1], "N/A");
            }
        }
        else {
            cb(true, url + a[1], a[2]);
        }
    }
    var url = 'http://us.imdb.com'
    post(url + '/List', 'words='+title+'&year=' + year + '&tv=off&ep=off&vid=off', function(s) {
        if (s.indexOf('Here are the 1 matching') > 0) {
            extractInfo(s);
            return
        }
        if (s.indexOf('Search aborted') > 0) {
            cb(false);
            return
        }
        
        // there are more than one match. narrow down search
        post(url + '/List', 'words='+title+'&year=' + year + '&featuring=' + featuring + '&tv=off&ep=off&vid=off', function(s) {
            extractInfo(s);
        });
    })
}

/*
function lur(title, year) {
    IMDB.lookupRating(title, year, '', function(success, link, rating) {
        if (success) {
            GM_log(title + ": " + rating);
        }
        else {
            GM_log(title + " failed!");
        }
    })
}
lur("Showtime", '2002');
lur("Breakfast of Champions", '1999');
lur("Only You", '1994');
lur("Dot the I", '2003');
lur("Hidalgo", '2004');
lur("Courage Under Fire", '1996')
*/

// ------------------------------------------------------------------------------------
//                              Part 2: The engine
// ------------------------------------------------------------------------------------

/**
 * @param elmInsertionPoint The movielist html will be inserted before this element
 */
function MovieList(elmInsertionPoint) {
    this.createBasicStructure(elmInsertionPoint);
    this.aMovies = [];
}

MovieList.prototype.createBasicStructure = function(elmInsertionPoint) {
    this.elmTable = document.createElement("table");
    this.elmTable.setAttribute("cellspacing", "0");
    this.elmTable.setAttribute("cellpadding", "5");
    this.elmTable.setAttribute("border", "0");
    elmInsertionPoint.parentNode.insertBefore(this.elmTable, elmInsertionPoint);
}

MovieList.prototype.setBannedStations = function(aBannedChannels) {
    this.aBannedChannels = aBannedChannels;
}

MovieList.prototype.addMovie = function(sDisplayTime, sTitle, elmDescription, sYear, sChannel, aActors, sOrigTitle) {
    // First check that the station isnt banned
    for (var i=0; i<this.aBannedChannels.length; i++) {
        if (sChannel == this.aBannedChannels[i]) return
    }
    var iDisplayTime = parseInt(sDisplayTime.split(':').join(''), 10) 
    if (iDisplayTime < parseInt(dontShowMoviesThatStartEarlierThan.split(':').join(''), 10)) {
        return
    }

    var tr = document.createElement("tr");
    tr.setAttribute('valign', 'top');
    
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(sDisplayTime));
    tr.appendChild(td1);
    
    var td2 = document.createElement("td");
    td2.setAttribute("colspan", "2");
    td2.appendChild(elmDescription);
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    for (var i=0; i<aActors.length; i++) {
        var sActor = aActors[i];
        var nobr = document.createElement("nobr");
        var sRole = '';
        if (sActor.indexOf(':') != -1) {
            var sRole = sActor.substr(0, sActor.indexOf(':'));
            sActor = sActor.substr(sActor.indexOf(':') + 2);
        }
        var elmA = document.createElement("a");
        elmA.setAttribute("href", "http://us.imdb.com/index.html?formsubmitter&action=Nsearch&name=" + escape(sActor) + "&occupation=Actors&occupation=Actresses");
        elmA.setAttribute("target", "imdb");
        elmA.appendChild(document.createTextNode(sActor));
        nobr.appendChild(elmA);
        if (sRole != '') {
            nobr.appendChild(document.createTextNode(' (' + sRole + ')'));
        }
        td3.appendChild(nobr);
        td3.appendChild(document.createElement("br"));
    }
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    tr.appendChild(td5);

    var td6 = document.createElement("td");
    tr.appendChild(td6);


    this.elmTable.appendChild(tr);
    this.aMovies.push({title:sTitle, year:sYear, elm:tr, actors:aActors, origTitle:sOrigTitle});
}

MovieList.prototype.addMovie2 = function(sDisplayTime, sTitle, sDescription, sYear, sChannel, aActors, sOrigTitle) {
    this.addMovie(sDisplayTime, sTitle, document.createTextNode(sDescription), sYear, sChannel, aActors, sOrigTitle);
}

MovieList.prototype.setMovieImage = function(id, sImageUrl) {
    var m = this.aMovies[id];
    var imgElm = document.createElement("img");
    imgElm.setAttribute("src", sImageUrl);

    var td = m.elm.childNodes[1];
    if (td.getAttribute("colspan") == "2") {
        m.hasImage = true;
        td.setAttribute("colspan", "1");
        var newTd = document.createElement("td");
        newTd.appendChild(imgElm);
        td.parentNode.insertBefore(newTd, td);
    }
}

MovieList.prototype.setRatingOnMovie = function(ratingId, movieId, iRating, elmRating) {
    var m = this.aMovies[movieId];
    iCol = 3 + ratingId + (m.hasImage ? 1 : 0);
    m["iRating" + ratingId] = iRating;
    m.elm.childNodes[iCol].appendChild(elmRating);
}

MovieList.prototype.addDescriptionOnMovie = function(movieId, sHtml) {
    var m = this.aMovies[movieId];
    iCol = (m.hasImage ? 2 : 1);
    var elm = m.elm.childNodes[iCol];
    elm.innerHTML = elm.innerHTML + sHtml;
}

MovieList.prototype.orderByRating = function(ratingId) {
    //this.elmTable
    alert("e");
}

MovieList.prototype.hideMovie = function(movieId) {
    var m = this.aMovies[movieId];
    m.elm.style.display = 'none';
}

// ----------------- Imdb --------------

MovieList.prototype.imdbLoaded = function(id) {
    // update loading message
    this.iImdbRatingsLoaded++;
    this.elmLoadingIdmb.firstChild.textContent = "Loading imdb ratings: " + this.iImdbRatingsLoaded + "/" + this.aMovies.length;
    if (this.iImdbRatingsLoaded == this.aMovies.length) {
        var elmA = document.createElement("a");
        window.__ml = this;
        elmA.setAttribute("href", "javascript: alert(MovieList) //orderByRating(0)");
        elmA.setAttribute("id", "order_imdb");
        elmA.appendChild(document.createTextNode("Order by imdb rating"));
        //this.elmLoadingIdmb.parentNode.insertBefore(elmA, this.elmLoadingIdmb.nextSibling);
        this.elmLoadingIdmb.style.display = 'none';
    }
}


MovieList.prototype.imdbLookupMovie = function(id) {
    var m = this.aMovies[id];
    var ml = this;
    IMDB.lookupRating(escape(m.origTitle), m.year, m.actors[0], function(success, link, rating) {
        if (success) {
            var fRating = parseFloat(rating, 10);
            if (!isNaN(fRating)) {
                if (fRating<minIdmbRating) {
                    ml.hideMovie(id);
                }
            }
            var newLink = document.createElement("a");
            newLink.setAttribute("href", link);
            newLink.setAttribute("target", "imdb");
            //newLink.setAttribute("title", tagLine);
            newLink.appendChild(document.createTextNode(rating));
            ml.setRatingOnMovie(0, id, fRating, newLink);
        }
        else {
        }
        ml.imdbLoaded(id);
    });    
}

// lookup all movies, in imdb
MovieList.prototype.imdbLookup = function() {
    this.elmLoadingIdmb = document.createElement("div");
    this.elmLoadingIdmb.setAttribute("id", "imdbratings");
    this.elmLoadingIdmb.appendChild(document.createTextNode("Loading imdb ratings: 0/" + this.aMovies.length));
    this.iImdbRatingsLoaded = 0;
    this.elmTable.parentNode.insertBefore(this.elmLoadingIdmb, this.elmTable);
    
    for (var i=0; i<this.aMovies.length; i++) {
        this.imdbLookupMovie(i);
    }
}

// ----------------- scope.dk --------------

MovieList.prototype.scopeLookupMovie = function(id) {
    var m = this.aMovies[id];
    var sTitle = m.origTitle;
    
    // lowercase the title
    sTitle = sTitle.toLowerCase();

    // Trim leading and trailing spaces, is there no better way in JS?
    sTitle = sTitle.replace(/^\s+/g, '').replace(/\s+$/g, '');                

    // Strip or replace cahracters/phrases that cause problems when looking up ratings
    // & -> and
    sTitle = sTitle.replace(/&amp;/,'and');

    // escape it
    sTitle = escape(sTitle);
    
    var url = 'http://www.scope.dk/sogning_film.php?id=&filmtitel=' + sTitle + '&genre=&produktionsaar=' + m.year + '&premiereaar=&land=&submit=S%F8g';

    var ml = this;
    
    get(url, function(s) {
        var pos = s.indexOf('cellpadding="2"');
        if (pos > 0) {
            pos = s.indexOf('film.php', pos);
            
            var sLink = 'http://www.scope.dk/' + s.substr(pos, s.indexOf('"', pos) - pos);
            get(sLink, function(s) {
                // find scope score
                var sScopeScore = '';
                var pos = s.indexOf('Scope-score</td>');
                if (pos > 0) {
                     pos = s.indexOf('%</td>', pos)
                     if (pos > 0) {
                         sScopeScore = s.substr(pos - 2, 3);
                     }
                }
                // find user score
                var sUserScore = '';
                var pos = s.indexOf('Brugere</td>');
                if (pos > 0) {
                     pos = s.indexOf('%</td>', pos)
                     if (pos > 0) {
                         sUserScore = s.substr(pos - 2, 3);
                     }
                }
                // insert link
                var newLink = document.createElement("a");
                newLink.setAttribute("href", sLink);
                newLink.setAttribute("target", "scope");
                newLink.setAttribute("title", 'Scope: ' + sScopeScore + '\nBrugere: ' + sUserScore);
                newLink.appendChild(document.createTextNode(sScopeScore));
                
                //ml.setScopeRating(id, sScopeScore, newLink);
                ml.setRatingOnMovie(1, id, 10, newLink);

                // insert image
                var sUserScore = '';
                var pos = s.indexOf("http://www.scope.dk/images/movie/");
                if (pos > 0) {
                     var sImageUrl = s.substr(pos, s.indexOf('"', pos) - pos);
                     ml.setMovieImage(id, sImageUrl);
                }
                else {
                    pos = s.indexOf('<img src="http://www.scope.dk/images/film/');
                    if (pos > 0) {
                        pos+=10
                        var sImageUrl = s.substr(pos, s.indexOf('"', pos) - pos);
                        ml.setMovieImage(id, sImageUrl);
                    }
                }
                

                // update loading message
                ml.scopeRatingLoaded();
            })
        }
        else { 
            // no movies matched...
            //m.elm.lastChild.previousSibling.appendChild(document.createTextNode("n/a"));
            ml.scopeRatingLoaded();
        }
    });
}
MovieList.prototype.scopeRatingLoaded = function() {
    this.iScopeRatingsLoaded++;
    this.elmLoadingScope.firstChild.textContent = "Loading scope.dk ratings: " + this.iScopeRatingsLoaded + "/" + this.aMovies.length;
    if (this.iScopeRatingsLoaded == this.aMovies.length) {
        this.elmLoadingScope.style.display = 'none';
    }
}

// lookup all movies, in scope.dk
MovieList.prototype.scopeLookup = function() {
    this.elmLoadingScope = document.createElement("div");
    this.elmLoadingScope.setAttribute("id", "imdbratings");
    this.elmLoadingScope.appendChild(document.createTextNode("Loading scope.dk ratings: 0/" + this.aMovies.length));
    this.iScopeRatingsLoaded = 0;
    this.elmTable.parentNode.insertBefore(this.elmLoadingScope, this.elmTable);
    for (var i=0; i<this.aMovies.length; i++) {
        this.scopeLookupMovie(i);
    }
    //this.scopeLookupMovie(0);
}

// ----------------- Facebook movies --------------

MovieList.prototype.flixterLookupMovie = function(id) {
    var m = this.aMovies[id];
    
    var sTitle = m.origTitle;
    
    // lowercase the title
    sTitle = sTitle.toLowerCase();

    // Trim leading and trailing spaces, is there no better way in JS?
    sTitle = sTitle.replace(/^\s+/g, '').replace(/\s+$/g, '');                

    // Strip or replace cahracters/phrases that cause problems when looking up ratings
    // & -> and
    sTitle = sTitle.replace(/&amp;/,'and');

    var ml = this;

    function setFlixterRatings(fFlixterRating, sMovieUrl, sFlixterRatingHtml, sYourRatingHtml, sFriendsRatingsHtml, sPosterImageUrl) {
        var newLink = document.createElement("a");
        newLink.setAttribute("href", sMovieUrl);
        newLink.setAttribute("target", "facebook");
        
        var result = /<img src="([^"]*)"/.exec(sFlixterRatingHtml);
        if (result) {
            newLink.innerHTML = '<img src="' + result[1] + '" border="0">';
            ml.setRatingOnMovie(2, id, fFlixterRating, newLink);
        }
        //newLink.setAttribute("style", "border:0px!important");
        //newLink.setAttribute("title", tagLine);
        //newLink.appendChild(document.createTextNode(fFlixterRating));

        

        if ((sYourRatingHtml != '') || (sFriendsRatingsHtml != '')) {
            var sHTML = '<b>Facebook Movies:</b><br>';
            sHTML += '<table cellspacing="0" cellpadding="0" id="facebookMoviesDiv">'
            //sHTML += '<tr><td>Overall rating</td>'
            //sHTML += '<td><a href="' + sMovieUrl + '">' + fFlixterRating + '/5</a></td></tr>';
            //sHTML += '<td><a href="' + sMovieUrl + '">' + sFlixterRatingHtml + '</a></td></tr>';
            
            if (sYourRatingHtml != '') {
                sHTML += '<tr><td>Din rating&nbsp;</td><td>' + sYourRatingHtml + '</td></tr>';
            }
            
            var aFriendsRatings = RFMM.createArrayOfFriendRatings(sFriendsRatingsHtml);
            var friendComments = [];
            for (var i=0; i<aFriendsRatings.length; i++) {
                var o = aFriendsRatings[i];
                if (o.comment) {
                    friendComments.push([o.friendName, o.comment])
                }
                sHTML += '<tr><td><a href="' + o.friendLink + '">' + o.friendName + '</a>&nbsp;</td><td>' + o.ratingHtml + '</td></tr>';
            }
            sHTML += '</table>'
            if (friendComments.length > 0) {
                //sHTML += '<br>Comments:<br>'
                sHTML += '<br>'
                for (var i=0; i<friendComments.length; i++) {
                    var friendName = friendComments[i][0];
                    var friendComment = friendComments[i][1];
                    sHTML += '<i>' + friendName + ':</i><br>' + friendComment + '<br><br>';
                }
            }
            
            ml.addDescriptionOnMovie(id, '<br>' + sHTML + '<br>');
        }

        ml.setMovieImage(id, sPosterImageUrl);
        ml.flixterRatingLoaded();
    }
    
    function notFound() {
        ml.flixterRatingLoaded();
    }
    RFMM.lookupInFacebookMovies(sTitle, setFlixterRatings, notFound)
}

MovieList.prototype.flixterRatingLoaded = function() {
    this.iFlixterRatingsLoaded++;
    this.elmLoadingFlixter.firstChild.textContent = "Loading facebook movies ratings: " + this.iFlixterRatingsLoaded + "/" + this.aMovies.length;
    if (this.iFlixterRatingsLoaded == this.aMovies.length) {
        this.elmLoadingFlixter.style.display = 'none';
    }
}


// lookup all movies, in flixter on facebook
MovieList.prototype.flixterLookup = function() {
    this.elmLoadingFlixter = document.createElement("div");
    this.elmLoadingFlixter.setAttribute("id", "flixterratings");
    this.elmLoadingFlixter.appendChild(document.createTextNode("Loading facebook movies ratings: 0/" + this.aMovies.length));
    this.iFlixterRatingsLoaded = 0;
    this.elmTable.parentNode.insertBefore(this.elmLoadingFlixter, this.elmTable);
    for (var i=0; i<this.aMovies.length; i++) {
        this.flixterLookupMovie(i);
    }
    
    //this.flixterLookupMovie(0);
}






// ------------------------------------------------------------------------------------
//                             Part 2: Adding movies
//
// This part is specific to the site (dagensfilm.dk)
// Its all about fetcing movietitle etc from the html, and passing it to the engine, 
// using the addMovie method.
//
// Simple example of how the engine is used:
//
// var ml = new MovieList(document.body.firstChild);
// var elmDescription = document.createTextNode('Before Sam was murdered he told Molly he'd love and protect her forever');
// ml.addMovie('10:10', 'Ghost', elmDescription, '1990', 'MTV', ['Tom Hanks', 'Meg Rian']);
// ------------------------------------------------------------------------------------

function rtrim(s) {
    return s.replace(/\s+$/, "");
}
function ltrim(s) {
    return s.replace(/^\s+/, "");
}
function trim(s) {
    return ltrim(rtrim(s));
}

var d = new Date();
// set back 30 minutes
d.setTime(d.getTime() - (30 * 60 * 1000))
function twoDig(i) {
    return (i<=9 ? '0' : '') + i.toString();
}
dontShowMoviesThatStartEarlierThan = twoDig(d.getHours()) + ':' + twoDig(d.getMinutes());

var ml = new MovieList(document.body.firstChild);
ml.setBannedStations(aRemoveTvStations);

document.title = 'Dagens film';

function $xp(xpath, contextNode) {
    xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
    var got=document.evaluate(xpath,contextNode,null,0,null), result=[];
    while(next=got.iterateNext()) result.push(next);
    return result;
}

var movies = [];
var rows = $xp("//*[@width='43']/parent::tr", document);
for (var i=0; i<rows.length; i++) {
    var tr = rows[i];
    var sTime = tr.firstChild.textContent.split('.').join(':');
    
    
    //var sTitle = $xp("td[3]//a/b", tr)[0].textContent.split('\n').join('');
    var sTitle = tr.getElementsByTagName('td')[2].getElementsByTagName('a')[0].getElementsByTagName('b')[0].textContent.split('\n').join('');

    function getStuffBetween(s, s1, s2) {
        var pos1 = s.indexOf(s1);
        if (pos1 == -1) return '';
        pos1 += s1.length;
        var pos2 = s.indexOf(s2, pos1 + 1);
        if (pos2 == -1) return '';
        return s.substr(pos1, pos2 - pos1);
    }
    var s = tr.getElementsByTagName('td')[2].innerHTML;


    // Find actors
    // -------------------------
    var aActors = [];
    function cleanName(s2) {
        s2 = trim(s2);
        s2 = s2.replace(/\.$/, "");   // trim trailing "."
        return s2;
    }
    var sActors = getStuffBetween(s, '<b>Medvirkende: </b>', '<br>');
    if (sActors != '') {
        sActors = sActors.split(' og ').join(',');
        var a = sActors.split(',');
        for (var j=0; j<a.length; j++) {
            var b = a[j].split(':');
            if (b && b.length == 2) {
                aActors.push(cleanName(b[1]));
            }
        }
    }

    // Find instruktør
    // -------------------------
    var sInstr = getStuffBetween(s, '<b>Instruktør: </b>  ', '<br>');
    
    if (sInstr != '') {
        sInstr = 'Instruktør: ' + sInstr;
        // string is like this: "Instruktør: Ole Christian Madsen og Peter Langpik.  Foto: Jørgen Johansson, dff.  Scenografi: Jette Lehmann."
        var a = sInstr.split('.  ');
        for (var j=0; j<a.length; j++) {
            var s2 = a[j];
            var role = s2.substr(0, s2.indexOf(':'));
            s2 = s2.split(' og ').join(',');
            var a2 = s2.split(',');
            for (var k=0; k<a2.length; k++) {
                var s3 = a2[k];
                if (s3.indexOf(':') != -1) {
                    s3 = s3.substr(s3.indexOf(':') + 1)
                }
                aActors.push(cleanName(role + ': ' + s3));
            }
        }
    }
        


    // Find channel
    // -------------------------
    var sChannel = '';
    var elm = tr.parentNode.parentNode;
    //document.body.innerHTML = elm.previousSibling.nodeName;
    while (elm && (elm.nodeName.toLowerCase() != 'img')) {
        //alert(elm.nodeName.toLowerCase())
        elm = elm.previousSibling;
    }
    if (elm) {
        //document.body.innerHTML = 'n:'+elm.nodeName;
    }
    if (elm && (elm.nodeName.toLowerCase() == 'img')) {
        sChannel = elm.getAttribute('alt');
    }
    
    // Find original titel
    var sOrigTitle = trim(getStuffBetween(s, '<b>Orginal titel: </b>', '::'));
    
    
    // Create description element
    // ---------------------------
    //var sDescription = $xp("td[3]/*[5]/text()", tr)[2].textContent;
    var sDescription = getStuffBetween(s, '<b>Beskrivelse: </b>', '<br>');
    
    var sYear = getStuffBetween(s, '<br>', '.').split(' ').pop();

    var elmDescription = document.createElement('div');
    var sHTML = '<b>' + sOrigTitle +'</b>' + ' (' + sYear + ') - ' + sChannel + '<br>'
    if (sTitle != sOrigTitle) {
        sHTML += 'Dansk titel: '+ sTitle + '<br>';
    }
    sHTML += sDescription
    
    elmDescription.innerHTML = sHTML;


    movies.push([sTime, sTitle, elmDescription, sYear, sChannel, aActors, sOrigTitle]);    
}

while (document.body.childNodes.length > 1) {
    document.body.removeChild(document.body.lastChild);
}

movies.sort(function(a,b){
    if (a<b) return -1;
    return 1;
});

for (var i=0; i<movies.length; i++) {
    var a = movies[i];
    ml.addMovie(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
}

ml.imdbLookup();
ml.flixterLookup();
ml.scopeLookup();
