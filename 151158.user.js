// ==UserScript== 
// @name       RYM Artist Rating 
// @version    0.2 
// @description  Compiles all RYM Artist Page data and displays the Artist rating beside the artist name 
// @match      http://rateyourmusic.com/artist/* 
// @copyright  2012+, quiapz, AnniesBoobs 
// ==/UserScript== 
function parseAlbum(albumType) {
    var albums = (document.getElementById(albumType));
    if (albums != null) {
        albums = albums.getElementsByTagName('tr');
        var artistRating = albums.length;
        for (var j = 2; j < artistRating; j++) {
            albumRow = albums[j];
            if ((!albumRow.hasAttribute("class")) && (albumRow.cells[4].textContent != '') && (albumRow.cells[6].textContent != '')) {
                ratings = parseInt((albumRow.cells[4].textContent).replace(/\,/g, ''));
                score = parseFloat(albumRow.cells[6].textContent);
                ratingCtr = ratingCtr + ratings;
                scoreCtr = scoreCtr + score;
                totCtr = totCtr + (ratings * score);
                if (albumType != 'album_disc_c') {
                    if (1919 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1930) {
                        decadeStats[0][1] = decadeStats[0][1] + (ratings * score);
                        decadeStats[0][2] = decadeStats[0][2] + ratings;
                    } else if (1929 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1940) {
                        decadeStats[1][1] = decadeStats[1][1] + (ratings * score);
                        decadeStats[1][2] = decadeStats[1][2] + ratings;
                    } else if (1939 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1950) {
                        decadeStats[2][1] = decadeStats[2][1] + (ratings * score);
                        decadeStats[2][2] = decadeStats[2][2] + ratings;
                    } else if (1949 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1960) {
                        decadeStats[3][1] = decadeStats[3][1] + (ratings * score);
                        decadeStats[3][2] = decadeStats[3][2] + ratings;
                    } else if (1959 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1970) {
                        decadeStats[4][1] = decadeStats[4][1] + (ratings * score);
                        decadeStats[4][2] = decadeStats[4][2] + ratings;
                    } else if (1969 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1980) {
                        decadeStats[5][1] = decadeStats[5][1] + (ratings * score);
                        decadeStats[5][2] = decadeStats[5][2] + ratings;
                    } else if (1979 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 1990) {
                        decadeStats[6][1] = decadeStats[6][1] + (ratings * score);
                        decadeStats[6][2] = decadeStats[6][2] + ratings;
                    } else if (1989 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 2000) {
                        decadeStats[7][1] = decadeStats[7][1] + (ratings * score);
                        decadeStats[7][2] = decadeStats[7][2] + ratings;
                    } else if (1999 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 2010) {
                        decadeStats[8][1] = decadeStats[8][1] + (ratings * score);
                        decadeStats[8][2] = decadeStats[8][2] + ratings;
                    } else if (2009 < albumRow.cells[0].textContent && albumRow.cells[0].textContent < 2020) {
                        decadeStats[9][1] = decadeStats[9][1] + (ratings * score);
                        decadeStats[9][2] = decadeStats[9][2] + ratings;
                    }
                }
                if (!isNaN(parseInt(albumRow.cells[7].textContent))) {
                    youRating = youRating + parseFloat(albumRow.cells[7].textContent.substring(0, 4));
                    youRated++;
                }
            }
        }
    }
}

function addCommas(nStr) {
    nStr += '';
    y = nStr.split('.');
    y1 = y[0];
    y2 = y.length > 1 ? '.' + y[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y1)) {
        y1 = y1.replace(rgx, '$1' + ',' + '$2');
    }
    return y1 + y2;
}
// Go through the Album discography and compute Artist Rating using Ratings and Overall Score of each album 
var ratingCell, scoreCell, albumRow;
var scoreCtr = 0;
var ratingCtr = 0;
var totCtr = 0;
var youRating = 0;
var youRated = 0;
var decadeStats = [
    ['1920s: ', 0, 0],
    ['1930s: ', 0, 0],
    ['1940s: ', 0, 0],
    ['1950s: ', 0, 0],
    ['1960s: ', 0, 0],
    ['1970s: ', 0, 0],
    ['1980s: ', 0, 0],
    ['1990s: ', 0, 0],
    ['2000s: ', 0, 0],
    ['2010s: ', 0, 0]
];
parseAlbum('album_disc_s');
parseAlbum('album_disc_i');
parseAlbum('album_disc_e');
parseAlbum('album_disc_c');
// Display the data under the artist name as the first row of the profile table 
if (ratingCtr > 0) {
    var mbgens = document.getElementsByClassName('mbgen');
    var bio = mbgens[0];
    var row = bio.insertRow(0);
    var newCell;

    if (youRated > 0) {
        x = (-((totCtr / ratingCtr).toFixed(2) - (youRating / youRated).toFixed(2)).toFixed(2));
        if (x >= 0) {
            x = '+' + x.toFixed(2);
        }
        var rowValues = ['Artist Rating', (totCtr / ratingCtr).toFixed(2) + ' from ' + addCommas(ratingCtr) + ' ratings, Your rating: ' + (youRating / youRated).toFixed(2) + ' from ' + addCommas(youRated) + ' ratings (RYM ' + x + ')'];
    } else {
        var rowValues = ['Artist Rating', (totCtr / ratingCtr).toFixed(2) + ' from ' + addCommas(ratingCtr) + ' ratings'];
    }
    for (var i = 0, ii = rowValues.length; i < ii; i++) {
        newCell = row.insertCell(i);
        newCell.appendChild(document.createTextNode(rowValues[i]));
    }

    var row = bio.insertRow(bio.getElementsByTagName("TR").length);
    var newCell;
    newCell1 = row.insertCell(0);
    newCell1.appendChild(document.createTextNode('Music stats'));
    newCell = row.insertCell(1);
    x = document.createElement('b');
    newCell.appendChild(x);
    x.appendChild(document.createTextNode('Average by Decade:'));
    for (d = 0; d < decadeStats.length; d++) {
        if (decadeStats[d][2] > 0) {
            newCell.appendChild(document.createElement('br'));
            newCell.appendChild(document.createTextNode(decadeStats[d][0] + (decadeStats[d][1] / decadeStats[d][2]).toFixed(2) + ', from ' + addCommas(decadeStats[d][2]) + ' ratings'));
        }
    }
}