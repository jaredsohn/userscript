// ==UserScript==
// @name           Link to What.CD albums and artists from Last.fm
// @description    Adds clickable icons to Last.fm artists, albums, tracks and recommendations, linking to the corresponding What.cd search page.
// @namespace      https://userscripts.org/scripts/show/40915
// @updateURL      https://userscripts.org/scripts/source/40915.user.js
// @downloadURL    https://userscripts.org/scripts/source/40915.user.js
// @version        2015.01.05
// @include        *last.fm/music*
// @include        *last.fm/home/recs*
// @grant          none
// ==/UserScript==


var favicon, className, headerTitle, headerTitleLength, whatCdLink, headerTitleArr, listElement, listElementLength, whatCdLinkContainer;

favicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEWHYoqsrKzZ2dns7O3x8fHp6eny8vKxsbHn5+fW1tawsLDa2tu/v7/r6uvBwsHo6ejs7Ozu7u7i4uPt7u7k5OTl5eTe3t3e3d7f39/f4N/V1NXCwsLm5ubb2tvW1tXu7u23t7fQ0NDV1dTU1dXi4uLS0tK4uLg0R+PxAAAAAXRSTlMAQObYZgAAAGNJREFUeF6tzkcKxTAMRVG5p/fef93/EpMnCJmH3IHBBwlEzxSIIyK8Af+TWGuAtdkIEZNSClCueSoAnneuGMPwLSLioqpmaNpzousZBiklIJzDBeC21/sD8P3f3xHkusPRnXalRQOHVpLEhwAAAABJRU5ErkJggg==';
className = document.body.className;
w = 'https://ssl.what.cd'; // or change it to http://what.cd


// Artist, Album, Track overview pages
if (className.match('a-overview')) {
    headerTitleArr = document.title.split(/ [\u2013\u2014] /gi);
    headerTitle = document.getElementsByTagName('article')[0].getElementsByTagName('h1')[0];
    headerTitleArr[0] = encodeURIComponent(headerTitleArr[0]);
    headerTitleArr[1] = encodeURIComponent(headerTitleArr[1]);
    
    // link to artist
    if (className.match('artist')) {
        whatCdLink = w + '/artist.php?artistname=' + headerTitleArr[0];
    }

    // link to track
    else if (className.match('track')) {
        whatCdLink = w + '/torrents.php?artistname=' + headerTitleArr[0] + '&filelist=' + headerTitleArr[1] + '&order_way=desc&order_by=seeders';
    }

    // link to album
    else if (className.match('album')) {
        whatCdLink = w + '/torrents.php?groupname=' + headerTitle.innerHTML.trim() + '&artistname=' + headerTitleArr[1] + '&order_way=desc&order_by=seeders';
    }
    
    if (whatCdLink) {
        headerTitle.innerHTML += ' <a href="' + whatCdLink + '" style="position:relative;top:2px"><img src="' + favicon +'" /></a>';
    }
}

// Recommendations
else if (className.match('a-recs')) {
    headerTitle = document.getElementById('artistRecs').getElementsByTagName('a');
    headerTitleLength = headerTitle.length;

    while (headerTitleLength--) {
        if (headerTitle[headerTitleLength].className == 'name') {
            headerTitleArr = encodeURIComponent(headerTitle[headerTitleLength].innerHTML);
            whatCdLink = w + '/torrents.php?artistname=' + headerTitleArr + '&order_way=desc&order_by=seeders';
            headerTitle[headerTitleLength].parentNode.innerHTML += ' <a href="' + whatCdLink + '"><img src="' + favicon + '" /></a>';
        }
    }
}

// Popular/Hyped/Tag etc
listElement = document.getElementsByTagName('ul');
listElementLength = listElement.length;

while (listElementLength--) {
    if (listElement[listElementLength].className == 'artistList') {
        headerTitle = listElement[listElementLength].getElementsByTagName('a');
        headerTitleLength = headerTitle.length;
        while (headerTitleLength--) {
            if (headerTitle[headerTitleLength].className == 'name') {
                headerTitleArr = encodeURIComponent(headerTitle[headerTitleLength].getElementsByTagName('strong').innerHTML);
                whatCdLink = w + '/artist.php?artistname=' + headerTitleArr;
                whatCdLinkContainer = document.createElement('span');
                whatCdLinkContainer.innerHTML = ' <a href="' + whatCdLink + '"><img src="' + w + '/favicon.ico" style="position:relative;top:3px;margin-top:-3px" /></a>';
                headerTitle[headerTitleLength].parentNode.insertBefore(whatCdLinkContainer, headerTitle[headerTitleLength].nextSibling);
            }
        }
    }
}