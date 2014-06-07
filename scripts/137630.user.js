// ==UserScript==
// @name           8tracks to Spotify
// @namespace      Pook
// @description    Convert 8tracks playlist to Spotify playlist
// @include        http://8tracks.com/*/*
// @version        0.1
// ==/UserScript==

/*
 * NOTE:
 * For this script to work to its full potential, you need to install Yamamaya's script which enable
 * unlimited skipping of tracks and fetching of download links in 8tracks.
 * Yamamaya's script can be found here: http://userscripts.org/scripts/show/83206
 *
 * This script gets the song info from 8tracks playlist by scraping the page, so make sure all the songs
 * in the 8tracks playlist are displayed (You can achieve that by clicking the skip button multiple times.)
 */


/*
 * helper function to trim whitespace
 * useful in matching of artist names
 */
function trim(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

/*
 * parse data from the page
 * getting title and artist for a particular song
 */
function parseData(index, songNode) {
    try {
        var result = {
            "title":songNode[index].getElementsByClassName("t")[0].firstChild.nodeValue,
            "artist":songNode[index].getElementsByClassName("a")[0].firstChild.nodeValue
        };
        return result;
    }
    catch (err) {
        alert("error");
        return false;
    }
}


/*
 *search for spotify link, download link and record onto google doc via iframe
 */
function getLink(title, artist, index, songNode) {
    var url = "http://ws.spotify.com/search/1/track.json?q=";
    var http = new XMLHttpRequest();
    http.open("GET", url + encodeURIComponent(title), true);

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var response = http.responseText;
            var response = eval("(" + response + ")");

            //search for song with the exact same artist as in json response from Spotify
            var found = 0;
            for (var i = 0; i < response.tracks.length && found == 0; i++) {
                if (trim(response.tracks[i].artists[0].name.toLowerCase()) == artist.toLowerCase()) {
                    found = 1;
/*                    alert("found");
                    alert(artist + title);*/

                    i--; //because after for loop, there's the i++ so it won't give us the position of the song anymore!
                }
            }

            var downloadLink = getDownloadLink(index, songNode);

            //creating an iframe to send data to google doc
            var formkey = "dGppV2VWdndBMUczMHhBb2V6d1R2SlE6M";
            var targetFrame = document.createElement("iframe");
            if (found == 1)
                targetFrame.src = "https://spreadsheets.google.com/formResponse?formkey=" + formkey +
                    "Q&ifq&entry.0.single=" + encodeURIComponent(title) +
                    "&entry.1.single=" + encodeURIComponent(artist) +
                    "&entry.2.single=" + encodeURIComponent(response.tracks[i].name) +
                    "&entry.3.single=" + encodeURIComponent(response.tracks[i].artists[0].name) +
                    "&entry.4.single=" + encodeURIComponent(response.tracks[i].href) +
                    "&entry.5.single=" + encodeURIComponent(downloadLink) +
                    "&submit=Submit";
            else
                targetFrame.src = "https://spreadsheets.google.com/formResponse?formkey=" + formkey +
                    "Q&ifq&entry.0.single=" + encodeURIComponent(title) +
                    "&entry.1.single=" + encodeURIComponent(artist) +
                    "&entry.4.single=" + "not found" +
                    "&entry.5.single=" + encodeURIComponent(downloadLink) +
                    "&submit=Submit";

            document.body.appendChild(targetFrame);

        }
    }

    http.send();
}

/*
 *return m4a download link if available
 */
function getDownloadLink(index, songNode) {

    //check if that dom element exist.
    if (typeof songNode[index].getElementsByTagName("a")[1] === "undefined")
    return false;

    var dlink = songNode[index].getElementsByTagName("a")[1].href;
    if (dlink.indexOf("amazonaws.com") != -1) {
        return dlink;
    }
    else return false;
}

/*
 * This function get called when the spotify icon is clicked.
 * Act like main function in C programs.
 */
function start() {

    //parent node of the lists of song
    var songNode = document.getElementById("tracks_played").getElementsByTagName("li");

    //number of songs already played
    var noOfSongs = songNode.length;

    //looping through each song, passing to parseData() to get title and artist for each
    //after which getLink(title, artist) is called to get spotity and download links and also
    //record data onto googleDoc
    for (var i = 0; i < noOfSongs; i++) {
        var data = parseData(i, songNode);
        if (data) {
            getLink(trim(data.title), trim(data.artist), i, songNode);
        }
    }

    //add hyperlink to googleDoc after <h2> playlist title node
    //<p><a href="url">Go to googleDoc</a></p>
    var link = document.createElement("p");
    var a = document.createElement("a");
    a.href = "https://docs.google.com/spreadsheet/ccc?key=0Aqq9TWrU9_tWdGppV2VWdndBMUczMHhBb2V6d1R2SlE";
    var text = document.createTextNode("View spotify links in googleDoc");
    a.appendChild(text);
    link.appendChild(a);
    var parent = document.getElementsByClassName("mix_details")[0];
    var ref = parent.childNodes[2];
    parent.insertBefore(link, ref);

}

//adding spotify icon next to the playlist title
var icon = document.createElement("img");
icon.src = "http://randomwebapp.info/other/spotifylogo.png";
icon.width = "36";
icon.height = "36";
icon = document.getElementsByClassName("mix_details")[0].getElementsByTagName("h2")[0].appendChild(icon);

//use this instead of icon.onclick = start; so that it would work with both firefox and chrome
icon.addEventListener('click', start, false);
