// ==UserScript==
// @name       rym Total Track Times
// @version    2.71
// @description  Calculates total track time for releases on rateyourmusic.com
// @match      http://rateyourmusic.com/release/*
// @match      https://rateyourmusic.com/release/*
// ==/UserScript==

// var tracknums = getTrackNum();
var durations = document.getElementsByClassName("tracklist_duration");

var tracksecs = 0;
var trackmins = 0;
var trackhours = 0;
var trackmins = 0;
var timeString = ":";

for (i=0;i<durations.length; i++) {
// note, this just parses the entire track list rather than relying on the track numbers
    tracksecs += parseInt(durations[i].getAttribute("data-inseconds"));
}

if(tracksecs != 0) {
    trackmins += Math.floor((tracksecs / 60));
    tracksecs = (tracksecs % 60);
    trackhours = Math.floor((trackmins / 60));
    trackmins -= (trackhours * 60);
    
    if (tracksecs < 10) { tracksecs = "0" + tracksecs; }
    if (trackmins < 10 && trackhours > 0) { trackmins = "0" + trackmins; }

    if(trackhours == 0) {
        timeString = trackmins + ":" + tracksecs;
    } else {
        timeString = trackhours + ":" + trackmins + ":" + tracksecs;
    }
    
    
    var tracks = document.getElementById('tracks');
    
    var row = document.createElement("li");
    row.className = "track";
    
    var rowdiv = document.createElement("div");
    rowdiv.className = "tracklist_line";
    row.appendChild(rowdiv);
    
    var spacer = document.createElement("span");
    spacer.className = "tracklist_num";
    rowdiv.appendChild(spacer);
    
    var header = document.createElement("span");
    header.className = "tracklist_title";
    
    var innerText = document.createTextNode("Total Time:");
    header.appendChild(innerText);
    
    var times = document.createElement("span");
    times.className = "tracklist_duration";
    innerText = document.createTextNode(timeString);
    times.appendChild(innerText);
    header.appendChild(times);
    rowdiv.appendChild(header);
    
    tracks.appendChild(row);
    
}

//function getTrackNum() {
// pulls the number of tracks from the metadata, but unfortunately it is less obvious as to
// which items are the tracklist are "tracks" and which are track headers.  So in addition to
// getting this number you'd also have to manually parse the data some to figure out which
// items in the tracklisting are actually tracks.
//    
//    var metas = document.getElementsByTagName('meta');
//    
//    for(i=0; i<metas.length; i++) {
//        if(metas[i].getAttribute("itemprop") == "numTracks") {
//            return metas[i].getAttribute("content");
//        }
//        
//    }
//    return "";
//}