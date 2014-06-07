// ==UserScript==
// @name       RYM Custom Chart Filters
// @version     3.0
// @match      http://rateyourmusic.com/customchart*
// @copyright  2012+, quiapz
// ==/UserScript==
// Place new elements in the custom charts to let the user filter results in various ways
var contentTable = document.getElementById("content");
var targetBar = contentTable.getElementsByTagName("div")[4];
var newTargetBar = targetBar.cloneNode(true);
var newClearBar = document.createElement('div');
var minRatings = document.createElement('input');
var maxRatings = document.createElement('input');
var startYear = document.createElement('input');
var endYear = document.createElement('input');
var genreCb = document.createElement('input');
var excludeCb = document.createElement('input');

newTargetBar.innerHTML = '&nbsp';
newTargetBar.style.textAlign = 'left';
newClearBar.setAttribute('class', 'clear');
(targetBar.parentNode).insertBefore(newTargetBar, targetBar);
(targetBar.parentNode).insertBefore(newClearBar, targetBar);

// get albums that are ignored
var albumsRemove = GM_getValue('albumsRemoveCharts');
if (albumsRemove == undefined) {
    albumsRemove = '';
}

var label4 = document.createElement('span');
label4.innerHTML = '&nbsp&nbsp';
label4.style.float = 'none';
newTargetBar.appendChild(label4);

var label5 = document.createElement('span');
label5.id = 'toggle_exfilter_lbl';
label5.innerHTML = 'Show excluded releases:&nbsp';
label5.style.float = 'none';
newTargetBar.appendChild(label5);

excludeCb.type = 'checkbox';
excludeCb.id = 'excludeCbInput';
excludeCb.style.float = 'none';
excludeCb.style.verticalAlign = '-3px';
excludeCb.addEventListener('click', filterChart, false);
newTargetBar.appendChild(excludeCb);

var label3 = document.createElement('span');
label3.innerHTML = '&nbsp|&nbsp';
label3.style.float = 'none';
newTargetBar.appendChild(label3);

var label = document.createElement('span');
label.id = 'toggle_gfilter_lbl';
label.innerHTML = 'Display releases with ALL genres specified:&nbsp';
label.style.float = 'none';
newTargetBar.appendChild(label);

genreCb.type = 'checkbox';
genreCb.id = 'genreCbInput';
genreCb.style.float = 'none';
genreCb.style.verticalAlign = '-3px';
genreCb.addEventListener('click', filterChart, false);
newTargetBar.appendChild(genreCb);

var label1 = document.createElement('span');
label1.innerHTML = '&nbsp|&nbsp';
label1.style.float = 'none';
newTargetBar.appendChild(label1);

var label2 = document.createElement('span');
label2.id = 'minRatings';
label2.innerHTML = 'Min # of ratings:&nbsp';
label2.style.float = 'none';
newTargetBar.appendChild(label2);

minRatings.type = 'text';
minRatings.id = 'minRatingsInput';
minRatings.size = 7;
minRatings.maxLength = 7;
minRatings.style.float = 'none';
minRatings.style.height = '10px';
minRatings.style.fontSize = '10px';
minRatings.addEventListener('change', filterChart, false);
newTargetBar.appendChild(minRatings);

var label3 = document.createElement('span');
label3.innerHTML = '&nbsp|&nbsp';
label3.style.float = 'none';
newTargetBar.appendChild(label3);

var label4 = document.createElement('span');
label4.id = 'maxRatings';
label4.innerHTML = 'Max # of ratings:&nbsp';
label4.style.float = 'none';
newTargetBar.appendChild(label4);

maxRatings.type = 'text';
maxRatings.id = 'maxRatingsInput';
maxRatings.size = 7;
maxRatings.maxLength = 7;
maxRatings.style.float = 'none';
maxRatings.style.height = '10px';
maxRatings.style.fontSize = '10px';
maxRatings.addEventListener('change', filterChart, false);
newTargetBar.appendChild(maxRatings);

/////start
var label8 = document.createElement('span');
label8.innerHTML = '&nbsp|&nbsp';
label8.style.float = 'none';
newTargetBar.appendChild(label8);

var label5 = document.createElement('span');
label5.id = 'startYear';
label5.innerHTML = 'From (year):&nbsp';
label5.style.float = 'none';
newTargetBar.appendChild(label5);

startYear.type = 'text';
startYear.id = 'startYearInput';
startYear.size = 4;
startYear.maxLength = 4;
startYear.style.float = 'none';
startYear.style.height = '10px';
startYear.style.fontSize = '10px';
startYear.addEventListener('change', filterChart, false);
newTargetBar.appendChild(startYear);

var label6 = document.createElement('span');
label6.innerHTML = '&nbsp|&nbsp';
label6.style.float = 'none';
newTargetBar.appendChild(label6);

var label7 = document.createElement('span');
label7.id = 'endYear';
label7.innerHTML = 'To (year):&nbsp';
label7.style.float = 'none';
newTargetBar.appendChild(label7);

endYear.type = 'text';
endYear.id = 'endYearInput';
endYear.size = 4;
endYear.maxLength = 4;
endYear.style.float = 'none';
endYear.style.height = '10px';
endYear.style.fontSize = '10px';
endYear.addEventListener('change', filterChart, false);
newTargetBar.appendChild(endYear);
/////end

function filterChart() {
    var minRatingsNum = (document.getElementById("minRatingsInput")).value;
    var maxRatingsNum = (document.getElementById("maxRatingsInput")).value;
    var genreCbVal = (document.getElementById("genreCbInput")).checked;
    var excludeCbVal = (document.getElementById("excludeCbInput")).checked;
    var startYearNum = (document.getElementById("startYearInput")).value;
    var endYearNum = (document.getElementById("endYearInput")).value;

    // year filter
    if (!(startYearNum == "") || !(endYearNum == "")) {
        startYearNum = parseInt(startYearNum);
        endYearNum = parseInt(endYearNum);
        if (isNaN(startYearNum)) {
            startYearNum = 0;
        }
        if (isNaN(endYearNum)) {
            endYearNum = Number.MAX_VALUE;
        }

        var albumList = document.getElementsByClassName("mbgen");
        var album = albumList[0].getElementsByTagName("tr");
        var yearArray = [];

        for (i = 0; i < album.length; i++) {
            var albumYear = parseInt((((album[i].getElementsByClassName("mediumg")[0]).innerHTML).replace(/[()]/g, '')));

            if ((albumYear < startYearNum) || (albumYear > endYearNum)) {
                yearArray[i] = 0;
            } else {
                yearArray[i] = 1;
            }
        }
    }

    // ratings filter
    if (!(minRatingsNum == "") || !(maxRatingsNum == "")) {
        minRatingsNum = parseInt(minRatingsNum);
        maxRatingsNum = parseInt(maxRatingsNum);
        if (isNaN(minRatingsNum)) {
            minRatingsNum = 0;
        }
        if (isNaN(maxRatingsNum)) {
            maxRatingsNum = Number.MAX_VALUE;
        }

        var albumList = document.getElementsByClassName("mbgen");
        var album = albumList[0].getElementsByTagName("tr");
        var ratingsArray = [];

        for (i = 0; i < album.length; i++) {
            var albumRatings = parseInt(((album[i].getElementsByTagName("td")[2]).getElementsByTagName("div")[1]).getElementsByTagName("a")[0].getElementsByTagName("b")[1].textContent.replace(/,/g, ""));

            if ((albumRatings < minRatingsNum) || (albumRatings > maxRatingsNum)) {
                ratingsArray[i] = 0;
            } else {
                ratingsArray[i] = 1;
            }
        }
    }

    // genre filter
    var genres = (document.getElementById("genres")).value;
    var genre = genres.split(",");
    for (i = 0; i < genre.length; i++) {
        genre[i] = genre[i].trim();
    }
    var albumList = document.getElementsByClassName("mbgen");
    var album = albumList[0].getElementsByTagName("tr");
    var genreMatchArray = [];
    for (i = 0; i < album.length; i++) {
        var albumGenre = ((album[i].getElementsByTagName("td")[2]).getElementsByTagName("div")[0]).getElementsByClassName("genre");
        var matches = 0;
        for (j = 0; j < albumGenre.length; j++) {
            for (k = 0; k < genre.length; k++) {
                if (genre[k].toUpperCase() == albumGenre[j].textContent.toUpperCase()) {
                    matches++;
                }
            }
        }
        if (matches != genre.length) {
            genreMatchArray[i] = 0;
        } else {
            genreMatchArray[i] = 1;
        }
    }

    // determine whether to display albums based on filters
    for (i = 0; i < album.length; i++) {
        var albumId = album[i].getElementsByClassName("album")[0].getAttribute('title');
        if (((genreCbVal && genreMatchArray[i] == 0) || ((!(minRatingsNum == "") || !(maxRatingsNum == "")) && (ratingsArray[i] == 0)) || ((!(startYearNum == "") || !(endYearNum == "")) && (yearArray[i] == 0)) || ((albumsRemove.indexOf(albumId) >= 0) && (!excludeCbVal)))) {
            album[i].style.display = "none";
        } else {
            album[i].style.display = "";
        }
    }
}

function addAlbum(album) {
    if (albumsRemove.indexOf(album.getAttribute('title')) >= 0) {
        albumsRemove = albumsRemove.replace(album.getAttribute('title', ','), '');
        album.nextSibling.nextSibling.innerHTML = 'x';
        alert(album.innerHTML + ' has been removed from your ignore list.');
    } else {
        albumsRemove = album.getAttribute('title') + ',' + albumsRemove;
        var excludeCbVal = (document.getElementById("excludeCbInput")).checked;

        if (!excludeCbVal) {
            album.parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        album.nextSibling.nextSibling.innerHTML = '+';
    }
    GM_setValue('albumsRemoveCharts', albumsRemove);
}
var albumsRemove = GM_getValue('albumsRemoveCharts');
if (albumsRemove == undefined) {
    albumsRemove = '';
}
var albums = document.getElementsByClassName('album');
if (albums != undefined) {
    for (u = 0; u < albums.length; u++) {

        y = document.createElement('a');
        y.innerHTML = '  ';
        removeButton = document.createElement('a');
        removeButton.setAttribute('href', 'javascript:void(0);');
        albums[u].parentNode.insertBefore(removeButton, albums[u].nextSibling);
        albums[u].parentNode.insertBefore(y, albums[u].nextSibling);
        removeButton.addEventListener('click', (function (n) {
            return function (e) {
                e.preventDefault();
                addAlbum(n);
            };
        })(albums[u]), false);
        if (albumsRemove.indexOf(albums[u].getAttribute('title')) >= 0) {
            albums[u].parentNode.parentNode.parentNode.parentNode.style.display = "none";
            removeButton.innerHTML = '+';
        } else {
            removeButton.innerHTML = 'x';
        }
    }
}