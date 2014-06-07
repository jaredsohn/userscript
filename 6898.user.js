// ==UserScript==
// @name            Dagens film
// @description     Adds movieposters, imdb ratings and scope.dk ratings on movies in tv.tv2.dk programlist.
// @source          http://userscripts.org/scripts/show/6898
// @identifier      http://userscripts.org/scripts/source/6898.user.js
// @version         2.2
// @date            2007-01-04
// @author          Bjørn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         http://tv.tv2.dk/tv/*
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
var minIdmbRating = 5.0;
var dontShowMoviesThatStartEarlierThan = "7:00";

// some useful functions
function $(id) {return document.getElementById(id)};
function get(url,cb) {GM_xmlhttpRequest({method:"GET",url:url,onload:function(xhr){cb(xhr.responseText);}})}
function post(url,data,cb) {GM_xmlhttpRequest({method:"POST",url:url,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(data),onload:function(xhr){cb(xhr.responseText);}})}

// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------

function autoupdate() {
    get('http://www.rosell.dk/gm/dagensfilm.user.js', function(s) {
        if (s.indexOf('@version         2.1') == -1) {
            var elmInsertPoint = document.body;
            var elmA = document.createElement("a");
            elmA.setAttribute("href", "http://www.rosell.dk/gm/dagensfilm.user.js");
            elmA.appendChild(document.createTextNode('Der er en ny version af "Dagens Film" scriptet. Klik her for at installere'));
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

MovieList.prototype.addMovie = function(sDisplayTime, sTitle, elmDescription, sYear, sChannel, aActors) {
    // First check that the station isnt banned
    for (var i=0; i<this.aBannedChannels.length; i++) {
        if (sChannel == this.aBannedChannels[i]) return
    }
    var iDisplayTime = parseInt(sDisplayTime.split(':').join(''), 10) 
    if (iDisplayTime < parseInt(dontShowMoviesThatStartEarlierThan.split(':').join(''), 10)) {
        return
    }

    var tr = document.createElement("tr");
    
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(sDisplayTime));
    tr.appendChild(td1);
    
    var td2 = document.createElement("td");
    td2.setAttribute("colspan", "2");
    td2.appendChild(elmDescription);
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    for (var i=0; i<aActors.length; i++) {
        var nobr = document.createElement("nobr");
        var elmA = document.createElement("a");
        elmA.setAttribute("href", "http://us.imdb.com/index.html?formsubmitter&action=Nsearch&name=" + escape(aActors[i]) + "&occupation=Actors&occupation=Actresses");
        elmA.setAttribute("target", "imdb");
        elmA.appendChild(document.createTextNode(aActors[i]));
        elmA.appendChild(document.createElement("br"));
        nobr.appendChild(elmA);
        td3.appendChild(nobr);
    }
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    tr.appendChild(td5);


    this.elmTable.appendChild(tr);
    this.aMovies.push({title:sTitle, year:sYear, elm:tr, actors:aActors});
}

MovieList.prototype.addMovie2 = function(sDisplayTime, sTitle, sDescription, sYear, sChannel, aActors) {
    this.addMovie(sDisplayTime, sTitle, document.createTextNode(sDescription), sYear, sChannel, aActors);
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

MovieList.prototype.orderByRating = function(ratingId) {
    //this.elmTable
    alert("e");
}

MovieList.prototype.hideMovie = function(movieId) {
    var m = this.aMovies[movieId];
    m.elm.style.display = 'none';
}

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
    IMDB.lookupRating(escape(m.title), m.year, m.actors[0], function(success, link, rating) {
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

MovieList.prototype.scopeLookupMovie = function(id) {
    var m = this.aMovies[id];
    var sTitle = m.title;
    
    // lowercase the title
    sTitle = sTitle.toLowerCase();

    // Trim leading and trailing spaces, is there no better way in JS?
    sTitle = sTitle.replace(/^\s+/g, '').replace(/\s+$/g, '');                

    // Strip or replace cahracters/phrases that cause problems when looking up ratings
    // & -> and
    sTitle = sTitle.replace(/&amp;/,'and');

    // escape it
    sTitle = escape(sTitle);

    var ml = this;
    
    get('http://www.scope.dk/sogning_film.php?id=&filmtitel=' + sTitle + '&genre=&produktionsaar=' + m.year + '&premiereaar=&land=&submit=S%F8g', function(s) {
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
}


// ------------------------------------------------------------------------------------
//                             Part 2: Adding movies
//
// This part is specific to the site (tv.tv2.dk)
// Its all about fetcing movietitle etc from the html, and passing it to the engine, 
// using the addMovie method.
//
// Simple example of how the engine is used:
//
// var ml = new MovieList(document.body.firstChild);
// var elmDescription = document.createTextNode('Before Sam was murdered he told Molly he'd love and protect her forever');
// ml.addMovie('10:10', 'Ghost', elmDescription, '1990', 'MTV', ['Tom Hanks', 'Meg Rian']);
// ------------------------------------------------------------------------------------

// this script should only take effect on the tv2 movielist.
if (window.location.href.indexOf('Kategori=13') == -1) return

var ml = new MovieList(document.body.firstChild);
ml.setBannedStations(aRemoveTvStations);

document.title = 'Dagens film';

// Copy div collection to array
// Collections in the HTML DOM are live meaning that they are automatically 
// updated when the underlying document is changed
// ----------------------------------------------------
var collectionDivs = document.getElementsByTagName('DIV');
var aDivs = [];
for (var i=0; i<collectionDivs.length; i++) {
    aDivs.push(collectionDivs[i]);
}

var s = "";
for (var i=0;i<aDivs.length;i++) {
    var elm = aDivs[i];
    if ((elm.className == 'udsendelse') || (elm.className == 'udsendelse-vises-nu')) {

        // Find title. If there is an original title, use that.
        // ----------------------------------------------------
        var sTitle;
        var sTitleOriginal = null;
        var sTitleDK;
        var aElmOrgTitle = elm.getElementsByTagName('I');
        if ((aElmOrgTitle.length > 0) && (aElmOrgTitle[0].nodeType == 1)) {
            var sText = aElmOrgTitle[0].firstChild.textContent;
            if (sText.indexOf('(') == 0) {
                sTitleOriginal = sText.substr(1, sText.length - 2);
            }
        }
        var aSpans = elm.getElementsByTagName('SPAN');
        for (var m=0;m<aSpans.length; m++) {
            var elmSpan = aSpans[m];
            if (elmSpan.className == 'udsendelse-titel') {
                sTitleDK = elmSpan.firstChild.textContent;
            }
        }
        sTitle = (sTitleOriginal ? sTitleOriginal : sTitleDK);

        // Find year
        // -------------------------
        var sShortDescription = elm.getElementsByTagName('DIV')[1].firstChild.textContent;
        sYear = sShortDescription.substr(sShortDescription.length - 5, 4);
        
        // Find time
        // -------------------------
        var sTime = elm.getElementsByTagName('DIV')[0].firstChild.firstChild.textContent;
        
        // Create description element
        // ---------------------------
        var elmDescription = elm.getElementsByTagName('DIV')[2].cloneNode(true);
        elmDescription.style.display = 'block';
        elmDescription.style.marginLeft = '0px';
        // remove "påmindelser"
        elmDescription.removeChild(elmDescription.lastChild);
        elmDescription.removeChild(elmDescription.lastChild);
        // add title
        var elmTitle = elm.getElementsByTagName('DIV')[0].cloneNode(true);
        // remove time
        elmTitle.removeChild(elmTitle.firstChild);
        // remove nbsp
        elmTitle.removeChild(elmTitle.firstChild);
        // add title to description
        elmDescription.insertBefore(elmTitle, elmDescription.firstChild);

        // Find channel
        // -------------------------
        if (elmTitle && elmTitle.childNodes && elmTitle.childNodes[1] && elmTitle.childNodes[1].textContent) {
            var sChannel = elmTitle.childNodes[1].textContent;
            var pos = sChannel.indexOf('(');
            if (pos >= 0) sChannel = sChannel.substr(pos + 1, sChannel.indexOf(')', pos) - pos - 1);
        }

        // Find actors
        // -------------------------
        // Medvirkende: Gordie Lachance: Wil Wheaton, Chris Chambers: River Phoenix
        var aActors = [];
        
        for (var j=0; j<elmDescription.childNodes.length; j++) {
            var n = elmDescription.childNodes[j];
            if (n.nodeType != 3) continue;
            var s2 = n.nodeValue;
            if (s2.indexOf('Medvirkende:') >= 0) {
                s2 = s2.substr(13, s2.length - 14);
                var a = s2.split(/, | og /);
                for (var k=0; k<a.length; k++) {
                    var pos = a[k].indexOf(':');
                    if (pos == -1) {
                        aActors.push(a[k])
                    }
                    else {
                        aActors.push(a[k].substr(pos+2));
                    }
                }
            }
        }
        
        
        // Add movie
        // -------------------------
        ml.addMovie(sTime, sTitle, elmDescription, sYear, sChannel, aActors);

        // Remove original html
        // -------------------------
        elm.parentNode.removeChild(elm);
    }
    else {
        // remove all other divs
        elm.parentNode.removeChild(elm);
    }
}
// remove the table containing "Forrige dag"
var tableElm = $('tblProgrammer');
if (tableElm) {
    tableElm.parentNode.removeChild(tableElm);
}


ml.imdbLookup();
ml.scopeLookup();
//ml.orderByRating(0);
