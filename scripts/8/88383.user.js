// ==UserScript==
// @name Last.fm - Opera: Display personal count on Artist's Top Tracks - Aug 2012
// @namespace
// @description Displays user's overall track count on Artist's Top Tracks ("Last Week" Top Tracks only). Not limited to user's top tracks. 
// @include http://www.last.fm/music/*
// @include http://www.last.fm/music/*/+charts?*
// @exclude http://www.last.fm/music/*/*
// ==/UserScript==
(function() {
    username = getLastfmUsername();
    if(username == "") {
        return;
    }//not logged in
    var links = document.evaluate('//td[@class="subjectCell"]/div/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(links.snapshotLength < 1) {
        return;
    }
    if(getArtistTrackCount() > 0) {
        gatherTracksData();
    }
})();

function getLastfmUsername() {
    var usernameLink = document.evaluate('//a[@id="idBadgerUser"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(usernameLink.snapshotLength > 0) {
        var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
        userNameLoc = userNameLoc.replace(/<[^<>]*>/g, '');
        return(userNameLoc);
    } else {
        return('');
    }
}

function gatherTracksData() {
    thisTrackCount = new Object();
    trackLinks = document.evaluate('//td[@class=\"subjectCell\"]/div/a/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//	trackLovedCell = document.evaluate('//td[@class=\"lovedCell\"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    trackLovedCell = document.evaluate('//td[@class=\"chartbarCell\"]/div/span', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    /* for (var i = 0; i < trackLinks.snapshotLength; i++) {
     var cur = trackLovedCell.snapshotItem(i);
     var url = trackLinks.snapshotItem(i).text;
     updateTrackData(cur, url);
     }*/
    var i = 0, limit = trackLinks.snapshotLength, busy = false;
    var processor = setInterval(function() {//setInterval is used to avoid irresponsive page while the script is running
        if(!busy) {
            busy = true;
            var cur = trackLovedCell.snapshotItem(i);
            var url = trackLinks.snapshotItem(i).text;
            updateTrackData(cur, url);
            if(++i == limit) {
                clearInterval(processor);
            }

            busy = false;
        }
    }, 10);
}

function updateTrackData(track, url) {
    var trackCount = getTrackCount(url);
    if(trackCount == 0) {
        updateUserTrackCount(0, track, "white");          //not scrobbled, but in library
    }
    else if(trackCount > 0) {
        updateUserTrackCount(trackCount, track, "yellow");
    }
    else {
        updateUserTrackCount("n/a", track, "red");
    }
}

function updateUserTrackCount(trackCount, track, color) {
    track.innerHTML = '<font color="' + color + '">(' + trackCount + ') </font>' + track.innerHTML;
}


function getTrackCount(url){
try{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, false);
    xmlhttp.send(null);
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200) {
            var regEx = /class="user-scrobbles">/;
            xmlText = xmlhttp.responseText;
            if(xmlText.match(regEx)){
                xmlText = xmlText.split(regEx)[1];
                xmlText = xmlText.split(/<\/b>/)[0];

                var count;
                if(xmlText){
                    count = xmlText.split('<b>')[1];
                    return count;
                }
            }
       }
    }
    return -1;
}
catch(e){
   // alert(e);
}
}


function getArtistTrackCount() {
    try {
        //var artistCount = document.evaluate('//a[@id="inLibraryIndicatorForArtist"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var artistCount = document.evaluate('//li[@class="user-scrobbles"]//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(artistCount) {
            return artistCount.snapshotItem(0).text;
        }
        return 0;
    }
    catch(e) {
        //alert(e);
    }
}

