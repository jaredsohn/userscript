// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  enter something useful
// @match      https://www.iptorrents.com/t*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright  2012+, You
// ==/UserScript==

//console.log($("img", $("#torrents tr")[1]).attr('alt'))

var useLocalStorage = true;
var $torrentTable = $("#torrents");
var $tableHeader = $("tr:nth-child(1)", $torrentTable);
var $torrentRows = $tableHeader.nextAll("tr");

var isMovieLookup = {
    'Movie/DVD-R': 1,
    'Movie/HD/Bluray': 1,
    'Movie/Kids': 1,
    'Movie/MP4': 1,
    'Movie/Non-English': 1,
    'Movie/XviD': 1,
    'Movies/480p': 1,
    'HD-XviD': 1,
    'Movie480p' : 1,
    'appzmacx' : 1,
    'appzmisc' : 1
};

// style
$torrentTable.append(
    ["<style>",
        ".loading-rating { ",
                "background-image: url('http://xeosoft.com/ajaxloader/gif?name=Loader%2001&size=16%C3%9716&speed=10&fColor=6C6C6C&bColor=1D1D1E&transparent=true'); ",
                "background-repeat: no-repeat; ",
                        "background-position: center; ",
        "} ",
     "table.torrents tr {",
       "-webkit-transition:background-color 250ms ease-in;",
                "-moz-transition:background-color 250ms ease-in;",
                        "-o-transition:background-color 250ms ease-in;",
                        "transition:background-color 250ms ease-in;",
        "}",
        ".imdb-rating {",
                "-webkit-transition:color 250ms ease-in;",
                "-moz-transition:color 250ms ease-in;",
                        "-o-transition:color 250ms ease-in;",
                        "transition:color 250ms ease-in;",
        "}",
             "a.imdb-rating-great {",
                     "color: yellow;",
         "}",
         "a.imdb-rating-bad {",
                     "color: red;",
         "}",
         ".imdb-tooltip {",
                     "border: solid 4px gray;",
     "padding: 10px;",
                "background-color: black;",
     "height: auto;", "top: 10%;",
                "display:none; width: 50%; left: 0; right: 0; margin-left: auto; margin-right: auto; position: fixed;",
"-moz-box-shadow: 0px 5px 15px 5px #000;",
"-webkit-box-shadow: 0px 5px 15px 5px #000;",
"box-shadow: 0px 5px 15px 5px #000;",

         "}",
     ".imdb-tooltip-image-container {",
"width: 25%;",
"float: left;",
"margin-right: 10px;",
     "}",
     ".imdb-tooltip-image-container img { width: 100%; }",
    "</style>"].join('\n'));

// extendTableWithColumn
$tableHeader.append("<th>Rating</th>");

// processTorrents
$torrentRows.each(function() {
    var $tr = $(this);

    // Prepare element to inject
    var $cellData = $('<td class="ac imdb-rating"></td>');

    //// Grab the alt attribute value of the category image.
    // var altImg = $("td:nth-child(1) img", $(this)).attr('alt');
    var altImg = $("td:nth-child(1) img", $(this)).attr('class');

    // Check if the torrent is a movie torrent
    if(isMovieLookup[altImg]) {
        $cellData.addClass('loading-rating');

        var torrentUrl = $("td:nth-child(2) a", $(this)).attr('href');
        var torrentId = getParameterByName('id', torrentUrl);

        getImdbData(torrentId, function(imdbData) {
                        $cellData.removeClass('loading-rating');

            if(imdbData) {
                var $anchor = $('<a href="' + imdbData.link + '"></a>');

                if(!isNaN(imdbData.rating)) {
                    $anchor.text(imdbData.rating);

                    if(imdbData.rating >= 7.0) {
                        $anchor.addClass('imdb-rating-great');
                    } else if(imdbData.rating <= 5.0) {
                        $anchor.addClass('imdb-rating-bad');
                    }
                        
                    var $tooltip = $([
                        "<div style='' class='imdb-tooltip'>",
                        "<div class='imdb-tooltip-image-container'><img src=" + imdbData.poster + "/></div>",
                            "<table><tbody>",
                                    "<tr><th>Rating</th><td>" + imdbData.rating + "</td></tr>",
                                                            "<tr><th>Voters</th><td>" + imdbData.voters + "</td></tr>",
                                                            "<tr><th>Released</th><td>" + imdbData.released + "</td></tr>",
                                                            "<tr><th>Genre</th><td>" + imdbData.genre + "</td></tr>",
                                                            "<tr><th>Actors</th><td>" + imdbData.actors + "</td></tr>",
                                                            "<tr><th>Plot</th><td>" + imdbData.plot + "</td></tr>",
                            "</tbody></table>",
                        "</div>"
                    ].join('\n'));
    
                    $cellData.append($tooltip);
    
                    $cellData.hover(function() {
                        $tooltip.fadeIn(250);
                        $tr.css({backgroundColor: 'black'});
                    }, function() {
                        $tooltip.fadeOut(250);
                        $tr.css({backgroundColor: 'inherit'});
                    });
                    
                } else {
                    $anchor.text('NYR');
                }

                $cellData.append($anchor);

                

            } else {
                $cellData.text("???");
            }
        });
    }

    $tr.append($cellData);
});

function ImdbData(rating, voters, released, genre, actors, plot, link, poster) {
    this.rating = rating;
    this.voters = voters;
    this.released = released;
    this.genre = genre;
    this.actors = actors;
    this.plot = plot;
    this.link = link;
    this.poster = poster;
}

function getParameterByName(key, url) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = (url || location.search).match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function getImdbData(torrentId, getImdbDataCallback) {
    if(torrentId) {
     //   console.log(torrentId);

        var imdbData = useLocalStorage ? localStorage.getItem('getImdbData' + torrentId) : false;

      //  console.log('imdbData', imdbData);

        if(!imdbData) {
            // Open the torrent details page and search for the imdb link
            $.get("/details.php?id=" + torrentId, function(data) {
                var $imdbTable = $('.imdb-table', $(data));

//                console.log('$imdbTable.length', $imdbTable.length);

                if($imdbTable.length) {
                                        var rating, voters, released, genre, actors, plot, link, poster;

                    link = $('tr.imdb-name:contains("IMDB link") td.imdb-value a', $imdbTable).attr('href');

                   // console.log('link', link);

                    rating = $('.imdb-score', $imdbTable).text().split('/');

                    if(rating.length === 2) {
                        rating = parseFloat(rating[0]);

                        voters = parseInt($('.imdb-voters', $imdbTable).text().split(' ')[0].replace(',', ''));
                        released = parseInt($('tr.imdb-name:contains("Released") td.imdb-value', $imdbTable).text());
                        actors = $('tr.imdb-name:contains("Actors") td.imdb-value', $imdbTable).text();
                        genre = $('tr.imdb-name:contains("Genre") td.imdb-value', $imdbTable).text();
                        plot = $('tr.imdb-name:contains("Plot") td.imdb-value', $imdbTable).text();
                        poster = $('img.imdb-photo', $imdbTable).attr('src');

                    } else {
                        rating = undefined;
                    }

                    imdbData = new ImdbData(rating, voters, released, genre, actors, plot, link, poster);
                                        localStorage.setItem('getImdbData' + torrentId, JSON.stringify(imdbData));

                    getImdbDataCallback(imdbData);
                } else {
                    getImdbDataCallback(null);
                }
            })
        } else {
            getImdbDataCallback(JSON.parse(imdbData));
        }
        }
}