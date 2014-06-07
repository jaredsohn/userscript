// ==UserScript==
// @name           What.CD? Important Notifications
// @namespace      google.com
// @include        http*://*what.cd/torrents.php?action=notify
// ==/UserScript==

/*******************************************************************************
        Makes torrents with "important" tags show up in torrent
        notifications with a red background, to stand out.
*******************************************************************************/

function oc(a) { /* http://snook.ca/archives/javascript/testing_for_a_v/ */
    var o = {};
    for(var i=0;i<a.length;i++) { o[a[i]]=''; }
    return o;
}
function addGlobalStyle(css) { /* http://diveintogreasemonkey.org/patterns/add-css.html */
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var importantTags = oc(GM_getValue("tags", "").split(" "));
var importantArtists = oc(GM_getValue("artists", "").split("`"));
var importantYears = oc(GM_getValue("years", "").split(" "));

var torrents = document.getElementsByTagName("table")[0].getElementsByTagName("tr");
//First index is the title, just skip over it

for (var i=1; i<torrents.length; i++) {
    var oldClass = torrents[i].className; //We might want this later
    torrents[i].className = ""; //NO MORE CLASS :O
    var tagsElems = torrents[i].getElementsByTagName("a"); //Tags starts at [3]
    //Check tags
    for (var j=3; j<tagsElems.length; j++) {
        var tag = tagsElems[j].innerHTML
        if (tag in importantTags) { //This is an important tag!
            torrents[i].className += " importantTag importantGenre";
            torrents[i].className += " tag_"+tag.replace(/[!@#$%^&*()\.,<>/?\\\|=+ ]/g, "_"); //Replaces bad characters with _s
            j = tagsElems.length; //No need to check the rest
        }
    }
    //Check artist
    var artist = tagsElems[1].innerHTML; // [1] is the artist link
    if (artist in importantArtists) {
        torrents[i].className += " importantTag importantArtist";
        torrents[i].className += " artist_"+artist.replace(/[!@#$%^&*()\.,<>/?\\\|=+ ]/g, "_"); //Replaces bad characters with _s
    }
    //Check year
    var year = /\[(\d+)\]/.exec(torrents[i].getElementsByTagName("strong")[0].innerHTML)[1];
    if (year in importantYears) {
        torrents[i].className += " importantTag importantYear";
        torrents[i].className += " year_"+year;
    }
    //Does it have any class?
    if (torrents[i].className == "") { torrents[i].className = oldClass; }
}

//Apply a style
var style = GM_getValue("style", ".importantTag { background-color: red; }");
addGlobalStyle(style);

//Add stuff to change properties
var importantTagsStr    = GM_getValue("tags",    "IMPORTANT TAGS");
var importantArtistsStr = GM_getValue("artists", "IMPORTANT ARTISTS");
var importantYearsStr   = GM_getValue("years",   "IMPORTANT YEARS");
var configElem = document.createElement("div");
configElem.innerHTML = '<h3>Configure Important Tags</h3>\
<h4>Important Style</h4>\
<p>This is the style your important tags will take. the class importantTag represents\
the <tr> that torrent is in.</p>\
<textarea id="importantTagsStyle">'+style+'</textarea>\
<input type="button" value="Set style" id="importantTagsStyleSet" />\
\
<h4>Important Tags</h4>\
<p>This is the list of tags that are important. Each is seperated by a space.</p>\
<input type="text" style="width:80%" id="importantTagsList" value="'+importantTagsStr+'" />\
<input type="button" id="importantTagsListSet" value="Set tags" />\
<p>This is the list of artists that are important. Seperated by a "`" (the character \
I decided was least likely to show up in an artist\'s name</p>\
<input type="text" style="width:80%" id="importantArtistsList" value="'+importantArtistsStr+'" />\
<input type="button" id="importantArtistsListSet" value="Set Artists" />\
<p>This is the list of important years. Seperated by a space.</p>\
<input type="text" style="width:80%" id="importantYearsList" value="'+importantYearsStr+'" />\
<input type="button" id="importantYearsListSet" value="Set Years" />';

var torrentTable = document.getElementsByTagName("table")[0];
torrentTable.parentNode.insertBefore(configElem, torrentTable.nextSibling);

//Stuff to update style
document.getElementById("importantTagsStyleSet").addEventListener('click', function(){
    var newStyle = document.getElementById("importantTagsStyle").value
    GM_setValue("style", newStyle);
    alert("New style style.\nYou will need to reload the page to see it.");
},false);
//And tags list
document.getElementById("importantTagsListSet").addEventListener('click', function(){
    var tags = document.getElementById("importantTagsList").value;
    GM_setValue("tags", tags);
    alert("Important tags set.\nYou will need to reload the page to see it.");
},false);
//..Artist list
document.getElementById("importantArtistsListSet").addEventListener('click', function(){
    var artists = document.getElementById("importantArtistsList").value;
    GM_setValue("artists", artists);
    alert("Important artists set.\nYou will need to reload the page to see it.");
},false);
//..Years list
document.getElementById("importantYearsListSet").addEventListener('click', function(){
    var years = document.getElementById("importantYearsList").value;
    GM_setValue("years", years);
    alert("Important years set.\nYou will need to reload the page to see it.");
},false);