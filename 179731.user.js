// ==UserScript==
// @name        WhatsNext
// @author      Antti Pihlaja
// @description RaceGuide-script for iRacing membersite.
// @license     MIT License
// @namespace   http://userscripts.org/scripts/show/179731
// @updateURL   https://userscripts.org/scripts/source/179731.meta.js
// @downloadURL https://userscripts.org/scripts/source/179731.user.js
// @include     http://members.iracing.com/membersite/member/*
// @grant       none
// @version     1.1.5
// ==/UserScript==

/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Antti Pihlaja
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */

// license header.. just in case some one needs it


'use strict'; // userscript is wrapped so thats not global
/**
 * 
 * @param {String} title text
 * @param {String} link url
 * @returns {LinkInfo}
 */
/* exported LinkInfo */
var LinkInfo = function ( title, link )
{
    this.title = title;
    this.link = link;
};

/**
 * 
 * @param {String} name
 * @param {Number} id
 * @param {LinkInfo[]} links
 * @returns {CarExtraInfo}
 */
/* exported CarExtraInfo */
var CarExtraInfo = function (name, id, links) {
    this.name = name;
    this.id = id;
    this.links = links;
};

/**
 * @class CarInfoService gives access to iRacing car and class info
 * and extra links
 */
/* exported CarInfoService */
var CarInfoService = new (function() {
    
    // globals defined by iRacing:    
    /* global CarListing */
    /* global CarClassListing */
    
    var links = 
    [
        {
            "name": "Skip+Barber+Formula+2000",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/634.page"}
            ],
            "id": 1
        },
        {
            "name": "Modified+-+SK",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/632.page"}
            ],
            "id": 2
        },
        {
            "name": "Pontiac+Solstice",
            "links": [ 
                {title: "Rookie Cars Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/636.page"}
            ],
            "id": 3
        },
        {
            "name": "Star+Mazda",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/630.page"},
                {title: "Setup Guide", 
                 link: "http://members.iracing.com/jforum/posts/list/1841938.page"}
            ],
            "id": 4
        },
        {
            "name": "Legends+Ford+%2734+Coupe",
            "links": [ 
                {title: "Rookie Oval Cars Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/635.page"}
            ],
            "id": 5
        },
        {
            "name": "Chevrolet+Monte+Carlo+SS",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/631.page"}
            ],
            "id": 12
        },
        {
            "name": "Radical+SR8",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/627.page"},
                {title: "Setup Collection", 
                 link: "http://members.iracing.com/jforum/posts/list/2469478.page"}
            ],
            "id": 13
        },
        {
            "name": "Silver+Crown",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/624.page"}
            ],
            "id": 18
        },
        {
            "name": "Chevrolet+Silverado",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/629.page"}
            ],
            "id": 20
        },
        {
            "name": "Riley+MkXX+Daytona+Prototype",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/626.page"},
                {title: "Grand Am Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/2511.page"},
                {title: "Setups Shop", 
                 link: "http://members.iracing.com/jforum/posts/list/2503089.page"}
            ],
            "id": 21
        },
        {
            "name": "Chevrolet+Impala-COT",
            "links": [ 
            ],
            "id": 22
        },
        {
            "name": "SCCA+Spec+Racer+Ford",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/5311.page"}
            ],
            "id": 23
        },
        {
            "name": "Chevrolet+National+Impala",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/623.page"}
            ],
            "id": 24
        },
        {
            "name": "Lotus+79",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/625.page"},
                {title: "Setups Shop", 
                 link: ""}
            ],
            "id": 25
        },
        {
            "name": "Chevrolet+Corvette+C6R",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/641.page"},
                {title: "Proto & GT Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/7511.page"},
                {title: "Setups Shop", 
                 link: "http://members.iracing.com/jforum/posts/list/1844204.page"}
            ],
            "id": 26
        },
        {
            "name": "VW+Jetta+TDI+Cup",
            "links": [ 
                {title: "GT Cup Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/633.page"}
            ],
            "id": 27
        },
        {
            "name": "Ford+Falcon+FG01+V8",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/628.page"}
            ],
            "id": 28
        },
        {
            "name": "Dallara+IndyCar",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/622.page"}
            ],
            "id": 29
        },
        {
            "name": "Ford+Mustang+FR500S",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/678.page"},
                {title: "Setup Shop", 
                 link: "http://members.iracing.com/jforum/posts/list/3215180.page"}
            ],
            "id": 30
        },
        {
            "name": "Modified+-+Tour",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/637.page"}
            ],
            "id": 31
        },
        {
            "name": "Williams-Toyota+FW31",
            "links": [
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/638.page"},
                {title: "Setup Guide", 
                 link: "http://members.iracing.com/jforum/posts/list/2289291.page"}
            ],
            "id": 33
        },
        {
            "name": "Mazda+MX-5+Cup",
            "links": [ 
                {title: "Rookie Cars Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/636.page"}
            ],
            "id": 34
        },
        {
            "name": "Mazda+MX-5+Roadster",
            "links": [ 
                {title: "Rookie Cars Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/636.page"}
            ],
            "id": 35
        },
        {
            "name": "Street+Stock",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/5511.page"},
                {title: "Rookie Oval Cars Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/635.page"}
            ],
            "id": 36
        },
        {
            "name": "Sprint+Car",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/2911.page"}
            ],
            "id": 37
        },
        {
            "name": "Chevrolet+Impala+Class+B",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/3713.page"}
            ],
            "id": 38
        },
        {
            "name": "HPD+ARX-01c",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/3711.page"},
                {title: "Proto & GT Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/7511.page"},
                {title: "Setups Shop", 
                 link: "http://members.iracing.com/jforum/posts/list/2073355.page"}
            ],
            "id": 39
        },
        {
            "name": "Ford+GT",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/3712.page"},
                {title: "Proto & GT Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/7511.page"},
                {title: "Setups Shop", 
                 link: "http://members.iracing.com/jforum/posts/list/1844203.page"}
            ],
            "id": 40
        },
        {
            "name": "Cadillac+CTS-V+Racecar",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/5111.page"}
            ],
            "id": 41
        },
        {
            "name": "Lotus+49",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/5713.page"}
            ],
            "id": 42
        },
        {
            "name": "McLaren+MP4-12C+GT3",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/5911.page"},
                {title: "Grand Am Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/2511.page"},
                {title: "Setups Shop", 
                 link: "http://members.iracing.com/jforum/posts/list/2408920.page"}
                 
            ],
            "id": 43
        },
        {
            "name": "Kia+Optima",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/6711.page"}
            ],
            "id": 44
        },
        {
            "name": "Chevrolet+SS-Gen6",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/621.page"}
            ],
            "id": 45
        },
        {
            "name": "Ford+Fusion-Gen6",
            "links": [ 
                {title: "Car Forum", 
                 link: "http://members.iracing.com/jforum/forums/show/621.page"}
            ],
            "id": 46
        },
        {
            "name": "Ruf+RT+12R+AWD",
            "links": [ 
            ],
            "id": 48
        },
        {
            "name": "Ruf+RT+12R+RWD",
            "links": [ 
            ],
            "id": 49
        },
        {
            "name": "Ruf+RT+12R+Track",
            "links": [ 
            ],
            "id": 50
        }
    ];
    
    /**
     * Gives link collection for car or empty array
     * @param {Number} id car id
     * @returns {CarExtraInfo} or null
     */
    this.findLinksByCarId = function ( id ) {
        for ( var i = 0; i < links.length; ++i )
        {
            if ( links[i].id === id ) {
                return links[i].links;
            }
        }
        return [];
    };

    /**
     * Gives car-object from CarListing-array or null
     * @param {Number} id car id
     * @returns {CarInfo} or null
     */
    this.findCarInfoById = function(id) {
        for (var i = 0; i < CarListing.length; ++i)
        {
            if (CarListing[i].id === id) {
                return CarListing[i];
            }
        }
    };
    /** Gives carclass-object from CarClassListing-array or null
     * @param {Number} id class id
     * @returns {CarClassInfo} or null
     */
    this.findClassInfoById = function(id) {
        for (var i = 0; i < CarClassListing.length; ++i)
        {
            if (CarClassListing[i].id === id) {
                return CarClassListing[i];
            }
        }
    };
    return this;
})();


/**
 * Wrapper for jQuery ajax-calls
 * 
 * Usage: call constructor and use load to exec query
 * 
 * @param {String} targetURL url without params (required)
 * @param {Object} params key value pairs of query params (required)
 * @param {String} method http method to use ie. GET or POST, default: POST
 * @param {String} dataType json, xml, html etc, default: json
 * @returns {DataRequest}
 */
var DataRequest = function(targetURL, params, method, dataType) {
    this.targetURL = targetURL;
    this.params = params;
    this.method = (method) ? method : "POST";
    this.dataType = (dataType) ? dataType : "json";
};

// static features to keep up if there is ajax queries going on
DataRequest.ajaxLoadingIcon = 'data:image/gif;base64,R0lGODlhEgAPAPIAAP///wAAAAAAAFxcXLS0tAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJBQAAACwAAAAAEgAPAAADHAi63P4wykmrvThXIS7n1tcBAwWSQwkQBKVqTgIAIfkECQUAAAAsAAAAABIADwAAAx4Iutz+MMpJq23iAsF11sowXKJolSNAUKZKrBcMPgkAIfkECQUAAAAsAAAAABIADwAAAxwIutz+MEogxLw4q6HB+B3XKQShlWWGmio7vlMCACH5BAkFAAAALAAAAAASAA8AAAMXCLrcvuLJ+cagOGtHtiKgB3RiaZ5oiiUAIfkECQUAAAAsAAAAABIADwAAAxQIuty+48knJCEz6827/2AojiSYAAAh+QQJBQAAACwAAAAAEgAPAAADFAi63L7kyTemvTgvobv/YCiOJJAAACH5BAkFAAAALAAAAAASAA8AAAMTCLrc/jAqIqu9duDNu4/CJ45XAgAh+QQJBQAAACwAAAAAEgAPAAADFAi63P4wykmrBeTqzTsbHiUIIZcAACH5BAkFAAAALAAAAAASAA8AAAMXCLrc/jDKSau9OOvtiBSYICrDQIFckwAAOwAAAAAAAAAAAA==';
DataRequest.activeRequests = 0;
DataRequest.incActiveRequests = function() {
    DataRequest.activeRequests++;
    DataRequest.updateActivity();
};
DataRequest.decActiveRequests = function() {
    DataRequest.activeRequests--;
    DataRequest.updateActivity();
};

DataRequest.$activityBox = $('<span id="whatsnext_ajax_activity" />')
    .css("width", "28px")
    .css("padding-right", "10px")
    .css("height", "16px")
    .css("color", "white")
    .css("background-repeat", "no-repeat")
    .css("background-position", "right top")
    .css("position", "absolute")
    .css("top", "12px")
    .css("right", "12px")
    .attr("title", "active data requests");

DataRequest.buildActivityBox = function($container) {
    $container.append(DataRequest.$activityBox);
    DataRequest.updateActivity();
    logger.debug("DataRequest.buildActivityBox: added");
};
DataRequest.updateActivity = function()
{
    DataRequest.$activityBox.text(DataRequest.activeRequests);
    if (DataRequest.activeRequests > 0) {
        logger.debug("DataRequest.updateActivity: active");
        DataRequest.$activityBox.css("background-image",
                "url(" + DataRequest.ajaxLoadingIcon + ")"
                );
    } else {
        logger.debug("DataRequest.updateActivity: all done.");
        DataRequest.$activityBox.text("");
        DataRequest.$activityBox.css("background-image",
                "none"
                );
    }
};


/**
 * Execute ajax query
 * 
 * @param {Function} callbackForData jquery ajax callback on success
 * @param {Object} thisArg this-context for callback if callback is method of object 
 * @returns {void}
 */
DataRequest.prototype.load = function(callbackForData, thisArg, async) {

    logger.debug("DataRequest.load: building query for ");
    logger.debug(this);
    if ( async === 'undefined' ) {
        async = true;
    }
    var jqAjaxParams = {
        type: this.method,
        url: this.targetURL,
        data: $.extend(true, {}, this.params), // copy
        success: callbackForData,
        dataType: this.dataType,
        async: async,
        timeout: 20000, // 20s
        global: false // better to skip handlers defined by iracing 
    };

    var retryCounter = 0;
    var MAX_RETRIES = 5; // retries on error
    jqAjaxParams.error = function(jqXHR, textStatus, errorThrown) {
        logger.warn("DataRequest.errorHandler: "
                + "\n  textStatus: " + textStatus
                + "\n  errorThrown: " + errorThrown
                + "\n  targetURL: " + jqAjaxParams.url
                );
        if (retryCounter < MAX_RETRIES) {
            ++retryCounter;
            logger.debug("DataRequest.errorHandler: retrying.. ("
                    + retryCounter + "/" + MAX_RETRIES + ")");
            DataRequest.incActiveRequests();
            $.ajax(jqAjaxParams);
        } else {
            logger.debug("DataRequest.errorHandler: max retries reached");
        }
    };
    jqAjaxParams.complete = function()
    {
        DataRequest.decActiveRequests();
    };

    if (thisArg)
        jqAjaxParams.context = thisArg;

    logger.debug("DataRequest.load: querying data from iRacing");
    DataRequest.incActiveRequests();
    $.ajax(jqAjaxParams);
};

/** @class
 * Shows race and series info popup
 * 
 * @param {RaceGuideRaceJSON} race 
 * @param {jQuery} $element
 * @returns {RaceInfoBox}
 */
/* exported RaceInfoBox */
var RaceInfoBox = function( race, $element )
{
    /** @type jQuery */
    var $box = $('<div />');
    var visible = false;
    
    this.show = function () {
        $box = $('<div />')
            .css("min-height", "100px")
            .css("min-width", "100px")
            .css("background-color", "white")
            .css("border", "1px solid black")
            .css("margin-top", "1.3em")
            .css("padding", "1em")
            .css("position", "absolute")
            .css("top", "-15px")
            .css("right", "32px")
            .css("z-index", "1000")
            .text( "seasonID: " + race.seasonID );
        
        var $closeButton = $('<button />').text("Close [x]")
            .css("position", "absolute")
            .css("top", "0")
            .css("right", "0");
        var toggle = $.proxy(this.toggle, this);
        $closeButton.click ( function () { toggle(); } );
        $box.append($closeButton);
        
        $element.append($box);
        visible = true;
    };
    
    this.hide = function () {
        $box.remove();
        visible = false;
    };
    
    this.toggle = function () {
        if ( visible ) {
            this.hide();
        } else {
            this.show();
        }
    };
    
    return this;
};

/** @class Gives participation statistics for the week of season.
 * 
 * Use get-method to download stats
 * 
 * @param {type} seasonID season to query
 * @param {type} seriesID series to query
 * @param {Number} weekNro week number, starting from 0
 */
/* exported RaceWeekInfo */
var RaceWeekInfo = function(seasonID, seriesID, weekNro) {
    this.seasonID = seasonID;
    this.seriesID = seriesID;
    this.raceweek = weekNro;
    this.callback = null; // get-mehtod sets this
    this.metaLookUp = null; // defined after buildSeriesRaceResults

    /**
     * Participation stats of previous week of series
     * @type SeriesRaceResultsJSON
     */
    this.raceweekData = null; // ready after resultsRequestForWeek.load

    /** @class */
    this.WeekSummary = function() {
        this.officialRaces = 0;
        this.avgSplits = null;
        this.avgSof = null;
        this.maxSof = null;
        this.multiclass = false;
    };

    /** @class */
    var RaceSummary = function() {
        this.totalParticipants = 0;
        this.official = false;
        this.splits = 0;
        this.topSplitSof = 0;
        this.multiclass = false;
    };

    // ready after buildSummary
    this.weekSummary = new this.WeekSummary();

    /**
     * Finds summary stats for given race
     * @param {type} race race info on race guide format
     * @returns {undefined}
     */
    this.findStatsFor = function(race) {
        logger.debug("findStatsFor: param is ");
        logger.debug(race);
        var rd = new Date(race.startTime);
        var result = null;
        if (this.raceweekData[rd.getUTCDay()]) {
            result = this.raceweekData[rd.getUTCDay()];
            if (result[rd.getUTCHours()]) {
                result = result[rd.getUTCHours()];
                if (result[rd.getUTCMinutes()]) {
                    result = result[rd.getUTCMinutes()];
                    logger.debug("stats found for race:");
                    logger.debug(result);
                    return result;
                }
            }
        }
        logger.debug("no stats found for race");
        return null;
    };

    var resultsRequestForWeek = new DataRequest(
        "http://members.iracing.com/memberstats/member/GetSeriesRaceResults",
        {seasonid: this.seasonID, raceweek: this.raceweek},
        "POST", "json"
    );

    /** @function
     * Gives RaceWeekInfo as parameter to callback
     */
    this.get = function ( callback ) {
        if ( this.callback !== null ) {
            throw new Error("RaceWeekInfo.get should be called only once");
        }
        this.callback = callback;
        resultsRequestForWeek.load(handleWeekResultsRequest, this);
    };
        
    var handleWeekResultsRequest = function(data) {
        logger.debug("handleWeekResults:");
        logger.debug(this);
        this.raceweekData = this.buildSeriesRaceResults(data);
        this.buildSummary();
        logger.debug("handleRaceWeekRequest: stats ready");
        logger.debug(this.raceweekData);
        this.callback(this);
    };


    this.buildSummary = function() {
        logger.debug("buildSummary: starting..");
        var totalSof = 0;
        var totalSplits = 0;
        for (var day in this.raceweekData) {
            for (var hour in this.raceweekData[day]) {
                for (var minute in this.raceweekData[day][hour]) {
                    var timeslot = this.raceweekData[day][hour][minute];
                    if (timeslot.summary.official) {
                        this.weekSummary.officialRaces++;
                        totalSplits += timeslot.summary.splits;
                        totalSof += timeslot.summary.topSplitSof;
                        if (timeslot.summary.topSplitSof > this.weekSummary.maxSof)
                            this.weekSummary.maxSof = timeslot.summary.topSplitSof;
                    }
                    if (timeslot.summary.multiclass)
                        this.weekSummary.multiclass = true;
                }
            }
        }
        this.weekSummary.avgSof = 1.0 * totalSof / this.weekSummary.officialRaces;
        this.weekSummary.avgSplits = 1.0 * totalSplits / this.weekSummary.officialRaces;
        logger.debug("buildSummary: " + this.seasonID + " season ready, result: ");
        logger.debug(this.weekSummary);
    };

    /**
     * Builds summary and stats from SeriesRaceResults
     * 
     * @param {SeriesRaceResultsJSON} seriesRaceResults from iRacing
     * @returns {WeekParticipationStats} result
     */
    this.buildSeriesRaceResults = function(seriesRaceResults) {
        if (!seriesRaceResults || !seriesRaceResults.m || !seriesRaceResults.d)
            throw new Error("buildWeekStats: param data invalid");
        var results = {};
        var metaLookUp = {};
        this.metaLookUp = metaLookUp;
        // build lookUp-table to convert attribute numbers to names
        for (var key  in seriesRaceResults.m) {
            metaLookUp[seriesRaceResults.m[key]] = key;
        }
        seriesRaceResults.d.forEach(function(subSession) {
            var time = new Date(subSession[metaLookUp.start_time]);
            // js has cool syntax to init nested arrays..
            var timeslot = null; // in the end, that will be pointer to timeslot
            if (!results[time.getUTCDay()])
                results[time.getUTCDay()] = {};

            timeslot = results[time.getUTCDay()]; // day of week

            if (!timeslot[time.getUTCHours()])
                timeslot[time.getUTCHours()] = {};

            timeslot = timeslot[time.getUTCHours()]; // hour

            if (!timeslot[time.getUTCMinutes()])
                timeslot[time.getUTCMinutes()] = {};

            timeslot = timeslot[time.getUTCMinutes()]; // minute - pointer ready

            if (!timeslot.carclasses)
                timeslot.carclasses = {};

            if (!timeslot.carclasses[subSession[metaLookUp.carclassid]])
                timeslot.carclasses[subSession[metaLookUp.carclassid]] = {};

            var classRace = timeslot.carclasses[subSession[metaLookUp.carclassid]];
            classRace.summary = new RaceSummary();

            if (!timeslot.summary)
                timeslot.summary = new RaceSummary();

            if (Object.keys(timeslot.carclasses).length > 1)
                timeslot.summary.multiclass = true;

            if (!classRace[subSession[metaLookUp.subsessionid]]) {
                classRace[subSession[metaLookUp.subsessionid]] = subSession;
                classRace.summary.splits++;
                if (classRace.summary.splits > timeslot.summary.splits)
                    timeslot.summary.splits = classRace.summary.splits;
            } else {
                logger.warn("buildSeriesRaceResults: skipped subsession "
                        + subSession[metaLookUp.subsessionid]);
            }

            timeslot.summary.totalParticipants += parseInt(subSession[metaLookUp.sizeoffield], 10);
            classRace.summary.totalParticipants += parseInt(subSession[metaLookUp.sizeoffield], 10);
            if (subSession[metaLookUp.officialsession]) {
                timeslot.summary.official = true;
                classRace.summary.official = true;
            }
            if (subSession[metaLookUp.strengthoffield] > timeslot.summary.topSplitSof) {
                timeslot.summary.topSplitSof = parseInt(subSession[metaLookUp.strengthoffield], 10);
                classRace.summary.topSplitSof = parseInt(subSession[metaLookUp.strengthoffield], 10);
            }
        });

        logger.debug("week participation stats for series "
                + this.seriesID + ", season " + this.seasonID);
        logger.debug(results);
        return results;
    };

    return this;
};


/**
 * Stats service responsible to provide general info of
 * series and seasons. Used by calling async get-method
 */
/* exported SeriesInfoService */
var SeriesInfoService = new (function()
{
    var loading = false;
    var data = null; // that will be series_arr provided by iRacing
    var activeSeries = []; // findActiveSeries stores filtering result
    var seriesInfoCallbacks = []; // called when data ready
    var query = new DataRequest(
            "http://members.iracing.com/membersite/member/SeriesStandings.do",
            {}, "GET", "html"
            );
    var handleSeriesStandings = function(html) {
        var matcher = /var([\s]+)series_arr([\s]*)=([\s]*)(\[)(.*)(\]")/m;
        var result = matcher.exec(html);
        logger.debug(result);
        if (!result) {
            logger.warn("failed to find series_arr");
            return;
        }
        /* jshint evil: true */
        // its not valid json :-(
        data = eval("[" + result[5].replace(/\+/g, " ") + "]"); 
        loading = false;
        logger.debug("series_arr found:");
        logger.debug(data);
        giveSeriesInfo();
    };
    /**
     * @param {Number} id series id
     * @returns {Object|null} Series-object from series_arr
     */
    var findSeries = function(id)
    {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].id === id)
                return data[i];
        }
        // TODO: unofficial series like carb cup & 24h fun should be find elsewhere
        logger.warn("SeriesInfoService: seriesId " + id + " not found");
        return null;
    };

    this.findById = function(id)
    {
        return findSeries(id);
    };

    this.findBySeasonId = function(id)
    {
        for (var i = 0; i < data.length; ++i)
        {
            for (var ii = 0; ii < data[i].seasons.length; ++ii)
            {
                if (data[i].seasons[ii].id === id)
                {
                    return data[i];
                }
            }
        }
        return null;
    };

    var findActiveSeries = function()
    {
        if (activeSeries.length > 0)
            return activeSeries;
        else
            activeSeries = [];
        for (var i = 0; i < data.length; ++i)
        {
            for (var ii = 0; ii < data[i].seasons.length; ++ii)
            {
                if (data[i].seasons[ii].active)
                {
                    activeSeries.push(data[i]);
                }
            }
        }
        logger.debug("list of active series:");
        logger.debug(activeSeries);
        return activeSeries;
    };
    var giveSeriesInfo = function() // calls every callback
    {
        while (seriesInfoCallbacks.length > 0)
        {
            var item = seriesInfoCallbacks.shift(); // pop the first item of array
            if (item.seriesId === "all")
                item.callback(data);
            else if (item.seriesId === "active")
                item.callback(findActiveSeries());
            else
                item.callback(findSeries(item.seriesId));
        }
    };

    this.getSeriesInfo = function(seriesId, callback) {
        seriesInfoCallbacks.push({seriesId: seriesId, callback: callback});
        if (!data) {
            if (!loading) {
                loading = true;
                query.params.season = 1; // query needs some random season
                query.load(handleSeriesStandings, this);
            }
        } else {
            giveSeriesInfo();
        }
    };
    /**
     * gives whole series_arr
     * 
     * @param {type} callback
     */
    this.getAllSeries = function(callback) {
        this.getSeriesInfo("all", callback);
    };

    /**
     * gives all active series from series_arr
     * @param {type} callback
     * @returns {undefined}
     */
    this.getActiveSeries = function(callback) {
        this.getSeriesInfo("active", callback);
    };

    var participationStats = {}; // ParticipationStats-objects by seasonId
    var participationStatsCallbacks = {};

    this.getParticipationStats = function(seasonId, seriesId, weekNro, callback)
    {
        if (participationStats[seasonId] && participationStats[seasonId][weekNro] ) {
            // stats ready
            callback(participationStats[seasonId][weekNro]);
        } else {
            if (!participationStatsCallbacks[seasonId]) {
                participationStatsCallbacks[seasonId] = {};
            }
            if (!participationStatsCallbacks[seasonId][weekNro]) {
                participationStatsCallbacks[seasonId][weekNro] = [];
                participationStatsCallbacks[seasonId][weekNro].push(callback);
                // its first request for weekNro:
                var weekstats = new RaceWeekInfo(seasonId, seriesId, weekNro );
                weekstats.get($.proxy(this.handleParticipationStats, this));
            } else {
                participationStatsCallbacks[seasonId][weekNro].push(callback);
            }
                
            // old code reference:
//            var pstats = new RaceWeekInfo(seasonId, seriesId,
//                            $.proxy(this.handleParticipationStats, this));
//            SeriesInfoService.getSeriesInfo(pstats.seriesID, $.proxy( pstats.handleSeriesInfo, pstats ));
        }
    };

    /**
     * 
     * @param {RaceWeekInfo} stats
     * @returns {undefined}
     */
    this.handleParticipationStats = function(stats)
    {
        logger.debug("SeriesInfoSeries - got participation stats..");
        if ( !participationStats[stats.seasonID] ) {
            participationStats[stats.seasonID] = {};
        }
        participationStats[stats.seasonID][stats.raceweek] = stats;

        while (participationStatsCallbacks[stats.seasonID][stats.raceweek].length > 0)
        {
            var callback = participationStatsCallbacks[stats.seasonID][stats.raceweek].shift();
            callback(stats);
        }
    };
    
    /** @function Finds last race week and its seasonid for given series 
     *
     * @param {Object} series series obj from series_arr
     * @returns {Object} null or object with seasonid and raceweek properties
     */
    this.findPreviousWeek = function(series) {
        logger.debug("handleSeriesInfo: got info for season: ");
        logger.debug(series);
        
        if (series.seasons.length < 1) {
            return null;
        }
        
        var week = {seasonid: null, raceweek: null};
        
        if (series.seasons[0].raceweek < 2) {
            // week 1, check last season if exist
            logger.debug("the first week of season, checking last season");
            if (series.seasons.length > 1) // check last season
            {
                // last week of last season
                week.raceweek = // -1 is to make indexing to start from 0
                    series.seasons[1].raceweek - 1; 
                // look for last season instead of current
                week.seasonid = series.seasons[1].id;
                return week;
            } else {
                return null; // no stats
            }
        } else {
            // last week of this season
            week.seasonid = series.seasons[0].id;
            week.raceweek = series.seasons[0].raceweek - 1 - 1;
            return week;
        }
        
    };

    return this;
})();
/**
 * White list or black list of series
 * 
 */
/* exported Settings */
var Settings = new (function()
{
    /**
     * Returns stored value
     * @param {type} id
     * @returns {Boolean}
     */
    var loadFromStorage = function(id)
    {
        var value = localStorage.getItem(id);
        if (value === null)
            return null;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value === 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    };
    var saveToStorage = function(id, value)
    {
        value = (typeof value)[0] + value;
        localStorage.setItem(id, value);
    };

    var cfg = {};

    if (loadFromStorage("whatsnext_cfg") !== null)
        cfg = JSON.parse(loadFromStorage("whatsnext_cfg"));
    else
        saveToStorage("whatsnext_cfg", JSON.stringify(cfg));

    this.getCfgVal = function(key) {
        if (cfg[key] !== undefined)
            return cfg[key];
        else
            return null;
    };

    this.setCfgVal = function(key, val) {
        cfg[key] = val;
        saveToStorage("whatsnext_cfg", JSON.stringify(cfg));
    };


    var activeSeries = null;
    var filtercfg = {
        whitelistMode: false, // ie. blacklist
        series: [] // list of seriesIds
    };
    if (loadFromStorage("whatsnext_cfg_filtering") !== null)
        filtercfg = JSON.parse(loadFromStorage("whatsnext_cfg_filtering"));
    else
        saveToStorage("whatsnext_cfg_filtering", JSON.stringify(filtercfg));

    this.handler = function(data) // series_arr data
    {
        activeSeries = data;
//        activeSeries.sort(function(a,b)
//        {
//            return a.name.localeCompare(b.name);
//        });
        this.buildUI();
    };

    this.isWhiteList = function()
    {
        return filtercfg.whitelistMode;
    };

    /**
     * Toggle filtering mode to whitelist or blacklist
     * @param {bool} whitelist value
     */
    this.setWhiteList = function(whitelist) {
        if (whitelist === true) {
            filtercfg.whitelistMode = true;
        } else {
            filtercfg.whitelistMode = false;
        }
        saveToStorage("whatsnext_cfg_filtering", JSON.stringify(filtercfg));
    };

    this.isFilterEnabled = function()
    {
        return this.getCfgVal("filter_enabled");
    };

    this.isFiltered = function(seriesId)
    {
        for (var i = 0; i < filtercfg.series.length; ++i)
        {
            if (filtercfg.series[i] === seriesId)
                return true;
        }
        return false;
    };

    this.buildSeriesCheckbox = function(series)
    {
        var id = series.id;
        var state = this.isFiltered(id);
        /** @type jQuery */
        var $checkboxRow = $('<div />');
        var $img = $('<img />')
                .attr("src", series.img)
                .css("max-height", "30px");
        $checkboxRow.append($img);
        var $checkboxDiv = $('<span />');
        var $checkbox = $('<input type="checkbox" />');
        var $label = $('<label />');
        $label.append($checkbox);
        $label.append(dataUtils.decodeString(series.name));
        $checkboxDiv.append($label);
        $checkboxRow.css("display", "block");
        $checkboxRow.append($checkboxDiv);
        /** @type jQuery */
        $checkbox.attr('checked', state);

        $checkboxRow.click(function()
        {
            if (state)
            {
                state = false;
                for (var i = 0; i < filtercfg.series.length; ++i)
                {
                    if (filtercfg.series[i] === id)
                        filtercfg.series.splice(i, 1);
                }
            } else {
                state = true;
                filtercfg.series.push(id);
            }
            saveToStorage("whatsnext_cfg_filtering", JSON.stringify(filtercfg));
            $checkbox.attr('checked', state);
        });
        return $checkboxRow;
    };

    this.toggleUI = function()
    {
        if ($("#whatsnext_adv_settings")[0]) { // configs open already, close it
            $("#whatsnext_adv_settings").remove();
            return;
        }
        SeriesInfoService.getActiveSeries($.proxy(this.handler, this));
    };

    // show UI inside of #whatsnext_settings div
    this.buildUI = function()
    {
        var $filterDiv = $('<div id="whatsnext_adv_settings" />')
                .css("background-color", "white")
                .css("border", "1px solid black")
                .css("margin-top", "1.3em")
                .css("padding", "1em")
                .css("position", "relative");
        var $modeDiv = $(
                '<div><span>Filtering mode:</span> '
                + '<input type="radio" name="whatsnext_cfg_filter_mode" value="white" '
                + ((this.isWhiteList()) ? 'checked="checked"' : '') + ' />white list'
                + '<input type="radio" name="whatsnext_cfg_filter_mode" value="black" '
                + ((!this.isWhiteList()) ? 'checked="checked"' : '') + ' />black list'
                + '</div>'
                ).css("margin-bottom", "1em")
                .css("font-size", "13px");
        $modeDiv.find("span").first()
                .css("font-weight", "bold")
                .css("font-size", "13px");
        $modeDiv.find("input").click($.proxy(function()
        {
            if ($modeDiv.find("input:checked").val() === "white")
                this.setWhiteList(true);
            else
                this.setWhiteList(false);
        }, this));

        $filterDiv.append($modeDiv);
        var $container = $("#whatsnext_settings");
        var $closeButton = $('<button />').text("Close [x]")
                .css("position", "absolute")
                .css("top", "0")
                .css("right", "0");
        $closeButton.click(function() {
            $filterDiv.remove(); // $filterDiv
        });
        $container.append($filterDiv);
        for (var i = 0; i < activeSeries.length; ++i)
        {
            $filterDiv.append(this.buildSeriesCheckbox(activeSeries[i]));
        }
        $filterDiv.find("div:gt(0)").css("border-top", "1px dotted black");
        $filterDiv.append($closeButton);
    };
    return this;
})();


var Widget = function() {
    /** @type RaceGuideJSON */
    this.data = {}; // iracing raceguidedata
    this.seriesLookUp = {}; // series by id
    this.seasonsLookUp = {}; // season by id
    
    this.raceGuideDataRequest = new DataRequest(
    "http://members.iracing.com/membersite/member/GetRaceGuide",
    {
        at: Date.now(),
        showRookie: 1,
        showClassD: 1, showClassC: 1, showClassB: 1, showClassA: 1,
        showPro: 1, showProWC: 1,
        showOval: 1, showRoad: 1,
        hideNotFixedSetup: 0, hideNotMultiClass: 0,
        meetsMPR: 0,
        hideUnpopulated: 0,
        hideIneligible: 0
    }, "POST", "json");
    
};

Widget.prototype.findRaces = function(beginDate, minutes) {
    logger.debug("finding next races");
    var results = [];

    logger.debug("looping through seasons");
    for (var seasonID in this.seasonsLookUp) {
        var season = this.seasonsLookUp[seasonID];
        logger.debug("looping races of season " + seasonID);
        
        for ( var raceNum in season.races )
        {
            var race = season.races[raceNum];
            var minutesToStart = (race.startTime - beginDate.getTime()) / 1000 / 60;
            if (minutesToStart < minutes && minutesToStart > 0) { // in time frame
                if (Settings.isFilterEnabled())
                {
                    if (Settings.isFiltered(race.seriesID))
                    {
                        if (Settings.isWhiteList()) {
                            // white list mode
                            results[results.length] = race;
                        }
                    } else if (!Settings.isWhiteList()) {
                        // not black listed
                        results[results.length] = race;
                    }
                } else {
                    results[results.length] = race;
                }
            }
        }
    }
    return results.sort(function(a, b) {
        return a.startTime - b.startTime;
    });
};
/**
 * 
 * @param {RaceGuideJSON} data
 * @returns {undefined}
 */
Widget.prototype.updateHandler = function(data) {
    logger.debug("Widget.updateHandler: race guide received");
    this.data = data;
    this.seriesLookUp = {};
    this.seasonsLookUp = {};

    logger.debug("Widget.updateHandler: preparing data...");
    // build lookUp tables for series and seasons and add backward references
    // from season to series and from race to season and series
    data.series.forEach(function(series) {
        this.seriesLookUp[series.seriesID] = series;
        series.seasonSchedules.forEach(function(season) {
            if (season.seriesID === undefined)
                season.seriesID = series.seriesID;
            this.seasonsLookUp[season.seasonID] = season;
            season.races.forEach(function(race) {
                if (race.seasonID === undefined)
                    race.seasonID = season.seasonID;
                if (race.seriesID === undefined) {
                    race.seriesID = series.seriesID;
                }
            }, this);
        }, this);
    }, this);
    logger.debug("Widget.updateHandler: ready.");
    this.showNextRaces();
};
Widget.prototype.init = function() {
    this.initUI();
};

Widget.prototype.showNextRaces = function() {
    var races = this.findRaces(new Date(), 300);
    if (races[0]) {
        var prevRaceTime = dataUtils.buildTimeString(races[0].startTime);
        var $tbody = this.buildRaceTable(new Date(races[0].startTime));
        races.forEach(function(race) {
            var startTime = dataUtils.buildTimeString(race.startTime);
            if (startTime !== prevRaceTime) {
                $tbody = this.buildRaceTable(race.startTime);
                prevRaceTime = startTime;
            }
            var row = this.buildRaceRow(race);
            $tbody.append(row);
        }, this);
    }
};


/**
 * Countdown to refTime, shown in jqElement
 * 
 * @param {Date|Number} refTime date or js-timestamp integer
 * @param {jQuery} jqElement
 * @param {Function} countdownReadyCallback function to call in the end
 * @returns {Widget.RaceCountdownHandler} return value is useless..
 */
Widget.RaceCountdownHandler = function(refTime, jqElement, countdownReadyCallback) {
    /** @type Number */
    var raceStart = (refTime instanceof Date) ? refTime.getTime() : refTime;
    /** @type jQuery */
    var $element = jqElement;
    if (!$element)
        throw new Error("jqElement param invalid");
    
    var updateCountdown = function() {
        if (!$.contains(document.documentElement, $element[0]) ) // removed from dom
        {
            logger.debug("removing hidden countdown " + dataUtils.buildTimeString(raceStart));
            countdownReadyCallback();
            clearInterval(refreshIntervalId);
            return;
        }
        
        var minutesToStart = Math.floor((raceStart - Date.now()) / 1000 / 60);
        
        if (minutesToStart >= 0) {
            // logger.debug("updating countdown " + dataUtils.buildTimeString(raceStart));
            $element.text(minutesToStart + " min");
        }else {
            logger.debug("removing races & countdown " + dataUtils.buildTimeString(raceStart));
            countdownReadyCallback();
            clearInterval(refreshIntervalId);
        }
    };
    var refreshIntervalId = null;
    
    /**
     * @function Starts countdown
     */
    this.activate = function () {  
        refreshIntervalId = setInterval($.proxy(updateCountdown,this), 5000); 
    };
    
    return this;
};

Widget.prototype.buildRaceTable = function(titleDate) {

    var $table = $('<table><thead /><tbody /></table>');
    var $titleRow = $("<tr><th colspan='4'><span>" + dataUtils.buildTimeString(titleDate) + "</span><span /></th></tr>")
            .css("background-color", "rgb(238, 238, 238)")
            .css("text-align", "center");
    $titleRow.find("th")
            .css("padding", "3px")
            .css("padding-top", "9px");
    var countdown = new Widget.RaceCountdownHandler(
            titleDate, $titleRow.find("span").first().next(), 
            function () { $table.remove(); }
    );
    countdown.activate();
    $titleRow.find("span")
            .css("float", "left")
            .css("margin-left", "110px")
            .css("font-size", "16px");
    $table.find("thead").append($titleRow);
    $table.css("border-collapse", "collapse")
            .css("background-color", "white")
            .css("width", "100%");
    this.$contentDiv.append($table);
    return $table.find("tbody").first();
};


Widget.prototype.buildRaceRow = function(race) {
    var series = this.seriesLookUp[race.seriesID];
    /** @type jQuery */
    var $row = $('<tr />');
    /** @type jQuery */
    var $seriesImgCell = $('<td />');
    /** @type jQuery */
    var $seriesLink = $('<a />').attr({
        href: "http://members.iracing.com/membersite/member/SeriesSessions.do?season=" + race.seasonID,
        title: "Next sessions of " + dataUtils.decodeString(series.seriesName)
    });
    /** @type jQuery */
    var $seriesImg = $('<img />')
            .attr({
        src: "http://members.iracing.com/" + dataUtils.decodeString(series.image),
        alt: dataUtils.decodeString(series.seriesName)
    })
            .css("max-height", "30px");

    $seriesLink.append($seriesImg);
    $seriesImgCell.append($seriesLink);
    $row.append($('<td />').html($seriesImgCell)
            .css("width", "78px")
            .css("border", "1px solid black")
            .css("padding", "0")
            );
    /** @type jQuery */
    var $hotButton = $("<div />").attr("title", "no stats")
            .css("height", "24px")
            .css("width", "24px")
            .css("border-radius", "18px")
            .css("border", "3px outset rgb(184, 184, 184)") // light gray
            .css("opacity", "0.9")
            .css("background-color", "rgb(65, 65, 65)"); // dark gray
    /** @type jQuery */
    var $buttonCell = $('<td />')
            .css("width", "3px")
            .css("position","relative") // for popup position
            .css("border", "1px solid black");
    $buttonCell.append($hotButton);
    $row.append($buttonCell);

    $row.append(
            $('<td />').text(
            dataUtils.cleanTrackName(race.trackName)
            + ((race.trackConfigName) ?
            " - " + dataUtils.decodeString(race.trackConfigName) : ""))
            .css("vertical-align", "middle")
            .css("text-align", "center")
            .css("border", "1px solid black")
            );
    $row.append(
            $('<td />').text(
            (race.raceLapLimit > 0) ? race.raceLapLimit + "L" : race.raceTimeLimitMinutes + "m")
            .attr("title", "end time: " + dataUtils.buildTimeString(new Date(race.endTime)))
            .css("width", "40px")
            .css("vertical-align", "middle")
            .css("text-align", "center")
            .css("border", "1px solid black")
            );

    /**
     * Handler to update hotButton when participation stats are ready
     * @param {RaceWeekInfo} stats stats for race
     */
    var handleParticipationStatsCallback = function(stats) {
        logger.debug("handleHotStatusCallback: starting for series "
                + SeriesInfoService.findById(race.seriesID).name
                );
        var timeSlotStats = stats.findStatsFor(race);
        logger.debug("handleHotStatusCallback: timeslot stats:");
        logger.debug(timeSlotStats);

        
        // TODO: infobox content
//        var infoBox = new RaceInfoBox(race, $hotButton.parent());
//        $hotButton.click( function () {
//            infoBox.toggle();
//        });
//        $hotButton.css("cursor", "pointer");

        if (timeSlotStats === null) {
            $hotButton.attr("title", "No race.");
            $hotButton.css("background-color", "#2297C2"); // blue
            return;
        }
        /** @type RaceWeekInfo.RaceSummary */
        var raceSummary = timeSlotStats.summary;
        var weekSummary = stats.weekSummary;
        if (!raceSummary.official) {
            logger.debug("handleHotStatusCallback: unofficial..");
            $hotButton.attr("title", "It was unofficial, "
                    + raceSummary.totalParticipants + " drivers.");
            $hotButton.css("background-color", "#2297C2"); // blue
            return;
        }
        if (weekSummary.officialRaces < 10) {
            // not too many officials, mark as hot
            logger.debug("handleHotStatusCallback: its rare official.");
            $hotButton.css("background-color", "#D92E1D"); // red
            $hotButton.attr("title", "Its official, "
                    + raceSummary.totalParticipants + " drivers. \nOnly "
                    + weekSummary.officialRaces
                    + " races last week");
            return;
        }
        if (raceSummary.splits >= Math.floor(weekSummary.avgSplits + 0.5) + 1) {
            // splits over average
            logger.debug("handleHotStatusCallback: its hot!");
            $hotButton.css("background-color", "#D92E1D"); // red
            $hotButton.attr("title", "There was "
                    + raceSummary.splits + " splits, "
                    + raceSummary.totalParticipants + " drivers.");
            return;
        }
        // sof spotting, disabled for multiclassa and small fields
        if (!weekSummary.multiclass && raceSummary.totalParticipants > 16 &&
                (raceSummary.topSplitSof > weekSummary.maxSof * 0.85
                        || raceSummary.topSplitSof > weekSummary.avgSof * 1.5))
        {
            // spot good sof even if no splits..
            logger.debug("handleHotStatusCallback: its hot!");
            $hotButton.css("background-color", "#D92E1D"); // red
            $hotButton.attr("title", "SOF was " + raceSummary.topSplitSof
                    + ", " + raceSummary.totalParticipants + " drivers.");
            return;
        }
        if (raceSummary.splits > 1)
        {
            logger.debug("handleHotStatusCallback: its hot!");
            $hotButton.css("background-color", "#FD8D2B"); // orange
            $hotButton.attr("title", raceSummary.splits + " splits, "
                    + ", " + raceSummary.totalParticipants + " drivers.");
            return;
        }
        logger.debug("handleHotStatusCallback: its official");
        $hotButton.css("background-color", "#FD8D2B"); // orange
        $hotButton.attr("title", "It was official , "
                + raceSummary.totalParticipants + " drivers.");
    };
    
    
    var handleSeriesInfo = function ( series ) {
        if ( !series ) {
            logger.debug("no series info for " + race.seriesID + " seriesId");
            return;
        }
        var week = SeriesInfoService.findPreviousWeek( series );
        if ( !week ) {
            logger.debug("no week info found for " + race.seriesID + " seriesId");
            return;
        }
        SeriesInfoService.getParticipationStats(
            week.seasonid, race.seriesID, week.raceweek,
            $.proxy(handleParticipationStatsCallback, this));
    };
    
    SeriesInfoService.getSeriesInfo( race.seriesID, $.proxy( handleSeriesInfo, this ) );

    return $row;
};


Widget.prototype.initUI = function() {
    if ($("#whatsnext").length) {
        logger.warn("Widget.initUI: #whatsnext already in use");
        return;
    }
    $("#column2").prepend(
            '<div id="whatsnext">\n'
          + '  <div id="whatsnext_header">\n'
          + '    <a target="_blank" title="forum thread" '
          +          '  href="http://members.iracing.com/jforum/posts/list/3217103.page"><h3>What´s next?</h3></a>\n'
          + '</div></div>');

    this.$displayDiv = $("#whatsnext")
            .css("border-radius", "2px")
            .css("border", "1px solid gray")
            .css("background-color", "rgb(238, 238, 238)")
            .css("margin-bottom", "15px");
    this.$displayDiv.find("a").css("color", "white");
    this.$header = $("#whatsnext_header")
            .css("position", "relative")
            .css("margin", "0px")
            .css("padding", "5px")
            .css("background-color", "rgb(63, 63, 63)")
            .css("border", "1px outset gray");
    DataRequest.buildActivityBox(this.$header);
    this.$displayDiv.find("h3")
            .css("color", "white")
            .css("text-shadow", "2px 2px black")
            .css("text-align", "center")
            .css("font-weight", "bold")
            .css("display", "block")
            .css("height", "20px")
            .css("margin", "0px")
            .css("padding", "0px")
            .css("padding-top", "8px")
            .css("background-color", "rgb(194, 128, 45)")
            .css("border", "1px outset black")
            .css("border-radius", "3px");
    this.$displayDiv.append('<div id="whatsnext_settings" />');
    this.$settingsDiv = $("#whatsnext_settings").css("margin", "2px 0.8em");
    this.$displayDiv.append('<div id="whatsnext_content" />');
    this.$contentDiv = $("#whatsnext_content");
    this.$contentDiv.css("margin", "0px")
            .css("min-height", "20px")
            .css("padding", "5px")
            .css("margin-top", "0");

    var buildConfigCheckbox = function(configId, text, defaultState)
    {
        var state = Settings.getCfgVal(configId);
        state = (state === null) ? defaultState : state;
        Settings.setCfgVal(configId, state);
        var $checkbox =
                $('<span>' + text + '</span>');
        $checkbox.css("background-image",
                "url(http://members.iracing.com/membersite/js/img/checkbox_x.gif)")
                .css("background-repeat", "no-repeat")
                .css("padding-left", "14px")
                .css("height", "12px")
                .css("cursor", "pointer")
                .css("font-family", "Verdana, sans-serif")
                .css("font-size", "9px")
                .css("margin", "2px");
        var toggleImg = function()
        {
            if (state)
                $checkbox.css("background-position", "0px -12px");
            else
                $checkbox.css("background-position", "0px 0px");
        };
        toggleImg();
        $checkbox.click(function()
        {
            state = (state) ? false : true;
            Settings.setCfgVal(configId, state);
            toggleImg();
        });
        return $checkbox;
    };
    this.$settingsDiv.append(
            buildConfigCheckbox("road_enabled", "Road", true));
    this.$settingsDiv.append(
            buildConfigCheckbox("oval_enabled", "Oval", true));
    this.$settingsDiv.append(
            buildConfigCheckbox("hide_ineligible",
            "Hide Ineligible", true));
    this.$settingsDiv.append(
            buildConfigCheckbox("filter_enabled",
            "Filter", false));
    var $filterButton = $("<button />").text("Settings")
            .css("height", "100%")
            .css("widht", "100%")
            .css("text-align", "center")
            .css("margin-left", "0.7em")
            .css("padding", "2px");
    $filterButton.click($.proxy(Settings.toggleUI, Settings));
    this.$settingsDiv.append($filterButton);
    var $loadButton = $("<button />").text("Load Races")
            .css("height", "100%")
            .css("widht", "100%")
            .css("text-align", "center")
            .css("padding", "2px")
            .css("float", "right");
    
    this.handleLoadClick = function() {
        
        if ( $loadButton.text() === "Load Races" )
        {
            this.raceGuideDataRequest.params.at = Date.now();
            this.raceGuideDataRequest.params.showOval =
                    Settings.getCfgVal("oval_enabled") ? 1 : 0;
            this.raceGuideDataRequest.params.showRoad =
                    Settings.getCfgVal("road_enabled") ? 1 : 0;
            this.raceGuideDataRequest.params.hideIneligible =
                    Settings.getCfgVal("hide_ineligible") ? 1 : 0;
            this.raceGuideDataRequest.load(this.updateHandler, this);
            $loadButton.text("Hide Races");
        } else {
            this.$contentDiv.empty();
            $loadButton.text("Load Races");
        }
    };
    
    
    $loadButton.click($.proxy(this.handleLoadClick, this));
    this.$settingsDiv.append($loadButton);
};

var dataUtils = {
    decodeString: function(str) {
        return decodeURIComponent(str).replace(/\+/g, " ");
    },
    cleanTrackName: function(trackName) {
        // cleaning up some messy official track names
        trackName = dataUtils.decodeString(trackName);
        trackName = trackName
                .replace("Lucas Oil Raceway at Indianapolis", "IRP")
                .replace("Circuit of the Americas", "COTA")
                .replace("National", "")
                .replace("International", "")
                .replace("Sports Car Course", "")
                .replace("Racing Course", "")
                .replace("Mazda", "")
                .trim();
        if (trackName.length > 6)
            trackName = trackName
                    .replace("Circuit", "")
                    .replace("Speedway", "")
                    .replace("Raceway", "")
                    .trim();
        return trackName;
    },
    /**
     * Builds time-string for date, ie. 10:31 etc
     * 
     * @param {Date|Number} date date or js-timestamp
     * @returns {String}
     */
    buildTimeString: function(date) {
        var d = new Date(date);
        var hours = d.getHours().toString();
        if (hours.length < 2)
            hours = "0" + hours;
        var minutes = d.getMinutes().toString();
        if (minutes.length < 2)
            minutes = "0" + minutes;

        return hours + ":" + minutes;
    }
};


/* exported logger */
var logger = new (function() {

    this.debugEnabled = true;
    if (!console) {
        this.debugEnabled = false;
    }
    /* global myCustId */ // iracing var
    if (typeof myCustId !== 'undefined' && myCustId !== 93910) 
    {
        this.debugEnabled = false;
    }

    this.debug = function(obj) {
        if (this.debugEnabled)
        {
            if ( typeof obj === "string" ) {
                console.log("WhatsNext - DEBUG: " + obj);
            } else {
                console.log("WhatsNext - DEBUG: ", obj);
            }
        }
    };
    this.warn = function(obj) {
        if (!console) {
            return;
        }
        if ( typeof obj === "string" ) {
            console.warn("WhatsNext - WARN: " + obj);
        } else {
            console.warn("WhatsNext - WARN: ", obj);
        }
    };
    return this;
})();

if (!window.localStorage) {
    logger.warn("localStorage unavailable");
    // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#Compatibility
} else {
    if ($) {
        if ($("#home-segments")[0] && $("#column2")[0])
        {
            // should be dashboard or press room
            logger.debug("starting");
            var widget = new Widget();
            widget.init();
        } else {
            logger.debug("skipping, its not dashboard page: " + window.location);
        }
    } else {
        logger.debug("no jQuery found at " + window.location);
    }
}

