// ==UserScript==
// @name           IMDb with facebook ratings
// @namespace      http://www.rosell.dk/gm/
// @description    Adds ratings/comments from facebook friends on movie pages on IMDb
// @version        1.3
// @include        http://us.imdb.com/title/*
// @include        http://www.imdb.com/title/*
// update-message  There is a new version of the "IMDb with facebook ratings" userscript.<br>Click <a href="http://www.rosell.dk/gm/imdb_with_facebook_ratings.user.js">here</a> to install it
// ==/UserScript==



// -----------------------------
//   Auto-update
// -----------------------------
var version = "1.3";

function get(url,cb) {GM_xmlhttpRequest({method:"GET",url:url,onload:function(xhr){cb(xhr.responseText);}})}
function autoupdate() {
    if (self != top) return
    //if (window.location.protocol == 'https:') return
    var countdown = GM_getValue('countdown');
    GM_setValue('countdown', countdown - 1);
    if (countdown>0) return
    var daysSinceLastInstall = (Math.floor(new Date().getTime() / 60000) - GM_getValue('install-time')) / 60 / 24;
    GM_setValue('countdown', daysSinceLastInstall<7 ? 5:20);
    
    // check for update
    get('http://www.rosell.dk/gm/imdb_with_facebook_ratings.user.js', function (s) {
        var re = /@version\s*(\d*\.\d*)/;
        var a = re.exec(s);
        if (a == null) return
        var ver = parseFloat(a[1]);
        if (ver > parseFloat(version)) {
            var div = document.createElement("div");
            document.body.insertBefore(div, document.body.firstChild);
            div.innerHTML = s.match(/update-message\s*(.*)/)[1];            
            GM_setValue('countdown', 5);
        }
    });

}
if (GM_getValue('version') != version) {
    GM_setValue('version', version);
    GM_setValue('install-time', Math.floor(new Date().getTime() / 60000));
    GM_setValue('countdown', 5);
}

autoupdate();


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
            return sTitle;
        }
        sTitle = lenientTitle(sTitle);
        
        s = s.split("&#039;").join("'");
        s = s.split("'s ").join(" ");     // My Boss's Daughter -> My Boss Daughter
        s = s.split("'").join("");
        s = s.split(" - ").join(" ");
        
        
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
//                          Showing the ratings on IMDb
// ------------------------------------------------------------------------------------

// first a useful xpath function
function $x(xpath, friendlySyntax) {
    if (friendlySyntax) {
        xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3')
            .replace(/([^.])\.(\w*)/g,'$1[@class="$2"]')
            .replace(/#(\w*)/g,'[@id="$1"]')
            .replace(/\/\[/g,'/*[');
    }
    var result = [];
    try {
        var got=document.evaluate(xpath,document,null,0,null);
        while(next=got.iterateNext()) result.push(next);
    }
    catch (ex) {
        alert('XPath error\n' + xpath + '\n\n' + ex)
    }
    return result;
}

// This is the function that will be called when ratings has been loaded
// It will only be called when the movie was found on Facebook Movies
function setFacebookMoviesRatings(fFlixterRating, sMovieUrl, sFlixterRatingHtml, sYourRatingHtml, sFriendsRatingsHtml, sPosterImageUrl) {

    // find <h3>User Rating:</h3> node, so we can insert before that
    var elmUserRating = null;    
    var h3nodes = $x("//h5", false)
    for (var i=0; i<h3nodes.length; i++) {
        if (h3nodes[i].textContent == 'User Rating:') {
            elmUserRating = h3nodes[i];
        }
    }    
    if (!elmUserRating) return
    
    // create containing div
    var p = elmUserRating.parentNode;
    var pp = p.parentNode;
    var div = document.createElement("div");
    pp.insertBefore(div, p);

    // add some style
    GM_addStyle("table#facebookMoviesDiv td{padding-right:8px}");
    
    // write content to div
    var sHTML = '<b>Ratings on Facebook Movies:</b><br><br>';
    sHTML += '<table cellspacing="0" cellpadding="0" id="facebookMoviesDiv">'
    sHTML += '<tr><td>Overall rating</td>'
    //sHTML += '<td><a href="' + sMovieUrl + '">' + fFlixterRating + '/5</a></td></tr>';
    sHTML += '<td><a href="' + sMovieUrl + '">' + sFlixterRatingHtml + '</a></td></tr>';
    
    if (sYourRatingHtml != '') {
        sHTML += '<tr><td>Your rating</td><td>' + sYourRatingHtml + '</td></tr>';
    }
    
    var aFriendsRatings = RFMM.createArrayOfFriendRatings(sFriendsRatingsHtml);
    var friendComments = [];
    for (var i=0; i<aFriendsRatings.length; i++) {
        var o = aFriendsRatings[i];
        if (o.comment) {
            friendComments.push([o.friendName, o.comment])
        }
        sHTML += '<tr><td><a href="' + o.friendLink + '">' + o.friendName + '</a></td><td>' + o.ratingHtml + '</td></tr>';
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
    
    div.innerHTML = '<div style="background-color:#eec;padding:4px">' + sHTML + '</div>';
}

function notFound() {
    //alert('Movie was not found in Facebook Movies')
}

// Get the title
var re = /<h1>([^<]*)</
var a = re.exec(document.body.innerHTML);
if (a != null) {
    sTitle = a[1];    
    sTitle = sTitle.replace(/^\s+/g, '').replace(/\s+$/g, ''); // trim
    //alert(sTitle);
    
    //sTitle = 'Sugar and Spice'
    //sTitle = 'Bagland'
    RFMM.lookupInFacebookMovies(sTitle, setFacebookMoviesRatings, notFound);
    
}



