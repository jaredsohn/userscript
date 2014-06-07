/**
 * Created by Rahul on 12/7/13.
 */

// ==UserScript==
// @name kickass+imdb linker
// @namespace http://kickass.to
// @description See imdb movie link and rating in movie results
// @include http://kickass.to/*
// @include https://kickass.to/*
// @grant GM_xmlhttpRequest
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.13.3/jquery.tablesorter.js
// ==/UserScript==


//Pick any web safe color by visiting http://www.w3schools.com/tags/ref_colorpicker.asp
//Below object has two properties to decide the color of "IMDB Rating :" and the actual rating value.
var imdbRatingColorStore =
    {
        "imdbRatingTextColor": "#996600",
        "imdbRatingValueColor":"#B94309"
    };

function SendAjax(data) {
    scriptDataStore.ongoingAjaxCount++;
    GM_xmlhttpRequest({
        method: 'GET',
        url: data.url,
        onerror: scriptDataStore.onerrorfunc,
        onabort: scriptDataStore.onabortfunc,
        onreadystatechange: data.onreadystatechange,
        onload: data.func
    });
}
function hasValue(str) {
    var returnBool = false;
    if (str != undefined && str != null && str != '') {
        returnBool = true;
    }
    return returnBool;
}

var scriptDataStore =
{
    "totalAjaxRequestTrack": 0,
    "ongoingAjaxCount": 0,
    "_maxConcurrentAjaxRequests": 2,
    "loopCounter": 0,
    "filmDivIndexLinkStore": function () {
        return {
            'index': 0,
            'movieDiv': null,
            'imdbLink': null,
            'fullLink': null,
            'imdbRating': null
        }
    },
    "torrentResultDiv": "td.torrentnameCell>div.torrentname",
    "filmTypeMatchString": "a.filmType",
    "torrentPageImdbLinkFinder": "a[href*=anonym][href*=imdb]",
    "imdbPageRatingFinder": "div.star-box-details>strong>span[itemprop='ratingValue']",
    "movieDivChildAnchor": "a.normalgrey",
    "firstTrRow": "tr.firstr",
    "idOfTbody": "movieDivTbody",
    "idOfTable": "movieDivTable",
    "spanOfImdbRating":"span.imdbRatingValue",
    "inlineTheadContent": "<thead id='movieDivThead'><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></thead>",
    "inlineContent": "&nbsp;&nbsp;&nbsp;<a class='anchorImdbRating' href='{0}'><span class='imdbRatingText' style='color:" + imdbRatingColorStore.imdbRatingTextColor + "' !important'>IMDB Rating :</span><span style='color:" + imdbRatingColorStore.imdbRatingValueColor + "' class='imdbRatingValue'>{1}</span></a>",
    "onabortfunc" : function(response){
        scriptDataStore.ongoingAjaxCount--;
    },
        "onerrorfunc":function(response){
            scriptDataStore.ongoingAjaxCount--;
        },
        "onreadystatechangefunc": function (response) {
            if (response != null && hasValue(response.readyState)
                && response.readyState === 4) {
                scriptDataStore.ongoingAjaxCount--;
            }
        },
        "getImdbRatingSuccess": function (response, eachDivAndIndex,counter) {
            if (response != null && response != undefined) {
                if (hasValue(response.responseText)) {
                    htmlText = response.responseText.trim();
                    var jqParsedNodes = $($.parseHTML(htmlText));
                    if (jqParsedNodes.length > 0) {

                        jqParsedNodes.each(function (bIndex, elem) {
                            var jqElem = $(elem);
                            var parentJqElem = jqElem.clone().wrap('<p>').parent();
                            var htmlContent = parentJqElem.html().trim();
                            var findHref = parentJqElem.find(scriptDataStore.imdbPageRatingFinder);
                            if (findHref.length > 0) {
                                var rating = findHref.text();
                                eachDivAndIndex.imdbRating = rating;

                                var inlineContent = scriptDataStore.inlineContent;

                                inlineContent = inlineContent.replace("{0}", eachDivAndIndex.fullLink).replace("{1}", rating);

                                eachDivAndIndex.movieDiv.children(scriptDataStore.movieDivChildAnchor).append(inlineContent);

                                return false;
                            }
                        });

                    }
                }
            }
            PopulateRatingsAndLinkInKickAss(filmDivsAndLinks, counter);
        },
        "getImdbLinksSuccess": function (response, eachDivAndIndex,counter) {
            var htmlText = '';
            if (response != null && response != undefined) {
                if (hasValue(response.responseText)) {
                    htmlText = response.responseText.trim();
                    var jqParsedNodes = $($.parseHTML(htmlText));
                    if (jqParsedNodes.length > 0) {

                        jqParsedNodes.each(function (bIndex, elem) {
                            var jqElem = $(elem);
                            var parentJqElem = jqElem.clone().wrap('<p>').parent();
                            var htmlContent = parentJqElem.html().trim();
                            var findHref = parentJqElem.find(scriptDataStore.torrentPageImdbLinkFinder);
                            if (findHref.length > 0) {
                                var fullLink = findHref.attr('href');
                                var imdbLink = fullLink.split('?')[1];
                                eachDivAndIndex.imdbLink = imdbLink;
                                eachDivAndIndex.fullLink = fullLink;
                                getImdbRating(eachDivAndIndex, counter);
                                return false;
                            }
                        });

                    }
                }
            }
            PopulateRatingsAndLinkInKickAss(filmDivsAndLinks, counter);
        }
}
var allFilmDivs = $(scriptDataStore.torrentResultDiv).has(scriptDataStore.filmTypeMatchString);

var filmDivsAndLinks = [];

allFilmDivs.each(function (index, element) {
    var jqueryDivs = $(element);
    var kickAssTorrentPageLink = jqueryDivs.children(scriptDataStore.filmTypeMatchString).attr('href');
    var tempDivAndLinkStore = new scriptDataStore.filmDivIndexLinkStore();
    tempDivAndLinkStore.index = index;
    tempDivAndLinkStore.movieDiv = jqueryDivs;
    tempDivAndLinkStore.movieTorrentPageLink = kickAssTorrentPageLink;
    filmDivsAndLinks.push(tempDivAndLinkStore);
});

//Set Table Id for the filmDivs containing Table and the TBody id
filmDivsAndLinks[0].movieDiv.parent().parent().parent().attr('id', scriptDataStore.idOfTbody).parent().attr('id', scriptDataStore.idOfTable);

var rowToBePutInThead = $(scriptDataStore.firstTrRow).clone();

$('#' + scriptDataStore.idOfTbody).before(scriptDataStore.inlineTheadContent);

function getImdbRating(eachDivAndIndex, counter) {
    SendAjax({
        'url': eachDivAndIndex.imdbLink,
        'onreadystatechange': scriptDataStore.onreadystatechangefunc,
        'func': function(response){
            scriptDataStore.getImdbRatingSuccess(response, eachDivAndIndex,counter);
        }});
}

function getImdbLinks(eachDivAndIndex, counter) {
    if (eachDivAndIndex === undefined) {
        console.trace();
    } else {
        SendAjax({
            'url': eachDivAndIndex.movieTorrentPageLink,
            'onreadystatechange': scriptDataStore.onreadystatechangefunc,
            'func': function (response) {
                scriptDataStore.getImdbLinksSuccess(response, eachDivAndIndex, counter);
            }
        });
    }
}

function PopulateRatingsAndLinkInKickAss(data, localCounter) {
    if (localCounter % scriptDataStore._maxConcurrentAjaxRequests === 0) {
        localCounter = 1;
        while (localCounter <= scriptDataStore._maxConcurrentAjaxRequests && scriptDataStore.loopCounter < filmDivsAndLinks.length) {
            var currentData = data[scriptDataStore.loopCounter];
            localCounter++;
            getImdbLinks(currentData, localCounter);
            scriptDataStore.loopCounter++;
        }
    }
    //When All Ajax calls are done, sort the table
    if (scriptDataStore.ongoingAjaxCount === 0) {
        AllNodesProcessed();
    }
}

PopulateRatingsAndLinkInKickAss(filmDivsAndLinks, 0);
function AllNodesProcessed() {
    console.log($('#' + scriptDataStore.idOfTable));
    $.tablesorter.addParser({
        // set a unique id
        id: 'rating',
        is: function (s) {
            // return false so this parser is not auto detected
            return false;
        },
        format: function (s, table, cell, cellIndex) {
            var $cell = $(cell);
            var a = null;
            var span = $cell.find(scriptDataStore.spanOfImdbRating);
            if (span.length > 0) {
                a = span.text();
            }
            // return cell text, just in case
            var returnValue = hasValue(a) ? parseFloat(a) : 0;
            return returnValue;
        },
        // set type, either numeric or text
        type: 'numeric'
    });


    $('#' + scriptDataStore.idOfTable).tablesorter({
        headers: {
            0: {
                sorter: 'rating'
            },
            1: {
                sorter: 'false'
            },
            2: {
                sorter: 'false'
            },
            3: {
                sorter: 'false'
            },
            4: {
                sorter: 'false'
            },
            5: {
                sorter: 'false'
            }
        }
    });
    $('#' + scriptDataStore.idOfTable).trigger("sorton", [[[0, 1]]]);
}