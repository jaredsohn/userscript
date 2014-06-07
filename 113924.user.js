// ==UserScript==
// @name           BakaBT anonymous download
// @description    Allows you to download torrents from bakabt anonymously, thus not affecting your account's ratio (while allowing you to search)
// @version        0.1.4
// @include        http://www.bakabt.com/*
// @include        http://bakabt.com/*
// @include        http://www.bakabt.me/*
// @include        http://bakabt.me/*
// ==/UserScript==


// CONFIGURATION
var username = 'U31aH';
var password = 'L5m82W3fW1578Y8383i23PnI5uBdv3';
// END CONFIGURATION

// find the links on the page
var dlbut = document.getElementsByClassName('download_link')[0];
var dltxt = document.getElementsByClassName('sublink')[0];

if (!dlbut) return; // for pages other than the download page

// hide them
var oldstyle = dlbut.getAttribute('style');   // to restore the proper style later
dlbut.setAttribute('style', 'display: none');
dltxt.setAttribute('style', 'display: none');

// set up an AJAX request
var req = new XMLHttpRequest();
req.open('GET', document.URL, true);

// handle the result
req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {        
        // match out the download link
        var newurl = req.responseText.match(/href="(\/download[^.]+)\.[^"]+"/)[1];
        
        // update our own page
        dlbut.childNodes[1].href = newurl + ".torrent";
        dltxt.href = newurl + ".txt";
        
        // unhide them
        dlbut.setAttribute('style', oldstyle);
        dltxt.setAttribute('style', '');
        
        // log back in because bakabt are silly geese
        login.send('username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password));
    }
};

// with that out of the way, we can begin our login/logout logic.

// first we have to log out
var logout = new XMLHttpRequest();
logout.open('GET', '/logout.php', true);
logout.onreadystatechange = function() { if (logout.readyState == 4) req.send(); };

// then we have to log back in
var login = new XMLHttpRequest();
login.open('POST', '/login.php', true);
login.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

// and finally, send it
logout.send();