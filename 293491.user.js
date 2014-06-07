// ==UserScript==
// @name        iRacing road only
// @namespace   drinkto.me
// @description Userscript for iRacing that hides content unrelated to road racing.  This is opinionated, so YMMV.
// @include     http://members.iracing.com/jforum/forums/list.page
// @include     http://members.iracing.com/membersite/member/*
// @version     5
// @grant       none
// ==/UserScript==
var load,execute,loadAndExecute,executeJQuery;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})}
    ,executeJQuery=function(a){if(typeof jQuery=='undefined'){var jqUrl='//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';loadAndExecute(jqUrl,a);}else{execute(a);}};

executeJQuery(function () {

    // On membersite, make 'series' link always go to the road filter
    $("td.simpleNav ul li a[href='/membersite/member/Series.do']").attr("href", "/membersite/member/Series.do?cat=2")

    // Give some indication that this is not the full list on forum home.
    $(".homeLink").text("Forum List (road only)")


    //-----------------------------------------------------
    //
    //  Show countdown timer and number registered drivers in title (contributed by @kutu)
    //
    if ("racingpaneldata" in this && racingpaneldata.session) {
        var originalTitle = document.title;
        setInterval(function () {
            var numRegistered = $("#racingpanel_session_numregistered");
            var countdownTimer = $("#racingpanel_countdown_timer");
            if (numRegistered.length && countdownTimer.length) {
                document.title = numRegistered.text() + " " + countdownTimer.text() + " " + originalTitle;
            } else {
                document.title = originalTitle;
            }
        }, 1000);
    }


    //-----------------------------------------------------
    //
    //  Remove ovals and ineligible series from dropdown menu (contributed by @kutu)
    //
    var seriesDrop = $("#datSeriesSelectorDropdown optgroup");
    if (seriesDrop.length) {
        // remove ovals
        var eligibles = seriesDrop[0].children;
        eligibles[0].remove();
        while (!eligibles[0].disabled)
            eligibles[0].remove();

        // remove "No matching series"
        var noMatchingSeries = eligibles[eligibles.length - 1];
        if (noMatchingSeries.value == 0)
            noMatchingSeries.remove()

        // remove ineligible
        seriesDrop[1].remove();
    }


    //-----------------------------------------------------
    //
    //  Filter the hosted sessions by road tracks.
    //      See the filter_tracks.js to generate the array.
    //
    if (window.location.pathname.indexOf("/HostedSessions.do") > 0) {

        setInterval(function () {

            while($('.hosted_sessions_table_info').length <= 0){

                sleep(500)
                console.log('Waiting for table to show up...')
            }

            // Change something to indicate this is filtered.
            $("tr th a[name='Track']").text("Track (road only)");

            // Generated output
            var ovalTracks = [
                52, // Oval - Atlanta Motor Speedway - Legends Oval
                53, // Oval - Atlanta Motor Speedway - Oval
                225, // Oval - Auto Club Speedway - Oval
                101, // Oval - Bristol Motor Speedway -
                143, // Oval - Centripetal Circuit -
                39, // Oval - Charlotte Motor Speedway - Legends Oval
                40, // Oval - Charlotte Motor Speedway - Oval
                123, // Oval - Chicagoland Speedway -
                15, // Oval - Concord Speedway -
                115, // Oval - Darlington Raceway -
                191, // Oval - Daytona International Speedway - Oval
                27, // Oval - Daytona circa 2007 - Oval
                162, // Oval - Dover International Speedway -
                20, // Oval - Homestead Miami Speedway - Miami Speedway
                133, // Oval - Indianapolis Motor Speedway - Oval
                178, // Oval - Indianapolis Motor Speedway - IndyCar Oval
                169, // Oval - Iowa Speedway - Oval
                171, // Oval - Iowa Speedway - Legends
                172, // Oval - Iowa Speedway - Infield Legends
                19, // Oval - Irwindale Speedway - Inner
                23, // Oval - Irwindale Speedway - Outer
                30, // Oval - Irwindale Speedway - Outer - Inner
                214, // Oval - Kansas Speedway - Oval
                189, // Oval - Kentucky Speedway - Legends
                188, // Oval - Kentucky Speedway - Oval
                201, // Oval - Langley Speedway -
                17, // Oval - Lanier National Speedway -
                113, // Oval - Las Vegas Motor Speedway - Infield Legends Oval
                103, // Oval - Las Vegas Motor Speedway - Oval
                110, // Oval - Las Vegas Motor Speedway - Legends Oval
                33, // Oval - Martinsville Speedway -
                124, // Oval - Michigan International Speedway -
                156, // Oval - Mid-Ohio Sports Car Course - Oval
                157, // Oval - Mid-Ohio Sports Car Course - Alt Oval
                131, // Oval - New Hampshire Motor Speedway - Oval
                222, // Oval - New Hampshire Motor Speedway - Legends
                190, // Oval - New Smyrna Speedway -
                12, // Oval - Oxford Plains Speedway -
                104, // Oval - Phoenix International Raceway - Oval
                136, // Oval - Pocono Raceway - Oval
                31, // Oval - Richmond International Raceway -
                203, // Oval - Rockingham Speedway - Oval
                14, // Oval - South Boston Speedway -
                11, // Oval - Stafford Motor Speedway - Full Course
                116, // Oval - Talladega Superspeedway -
                120, // Oval - Texas Motor Speedway - Legends Oval
                121, // Oval - Texas Motor Speedway - Oval
                94, // Oval - The Milwaukee Mile -
                161, // Oval - Thompson International Speedway -
                198, // Oval - Twin Ring Motegi - Oval
                16 // Oval - USA International Speedway -
            ];

            function getURLParameter(url, name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
            }

            // Iterate over each td that contains a link to a track, compare to known roadTracks and remove if not listed above.
            // /membersite/member/TrackDetail.do?trkid=107
            $("table tr td div div a[href*='/membersite/member/TrackDetail.do?trkid']").each(function (index) {
                var href = $(this).attr('href');
                var trackID = parseInt(getURLParameter(href, 'trkid'));
                var text = $(this).text();
                var isOval = (-1 != $.inArray(trackID, ovalTracks));
                var isUnwantedRow = (text == 'Track Info' || text == '')
                //console.log("track["+ trackID + "]: " + isOval + " - " + $(this).text())

                if (isOval && !isUnwantedRow) {
                    tr = $(this).parent().parent().parent().parent();
                    //console.log(tr);
                    console.log("Removing track[" + trackID + "]: " + isOval + " - " + text)
                    tr.remove();
                }
            });
        }, 1000);
    }


    //-----------------------------------------------------
    //
    //  Only execute the following if we are on the forum list page
    //
    if (window.location.pathname.indexOf("/list.page") <= 0)
        return;
    else
        console.log("Skipping forum list pruning.");

    function toggleForumRowByText(forums) {

        $.each(forums, function (index, value) {
            e = $("td:contains('" + value + "')");
            e.parent().toggle();
            console.log("Removed: " + value);
        });
    }

    function toggleForumRowByPage(forums) {

        $.each(forums, function (index, value) {
            e = $("td a[href*='/" + value + ".page']");
            text = e.text();
            e.parent().parent().toggle();
            console.log("Removed: " + value + ".page - " + text);
        });
    }

    /**
     * Remove oval
     */
    var ovalPages = [
        "619",
        "620",
        "635",
        "621",
        "3713",
        "624",
        "2911",
        "629",
        "637",
        "623",
        "631",
        "632",
        "5511",
        "6312",
        "8711"
    ];

    var ovalHeaders = ["Oval Racing"];

    toggleForumRowByPage(ovalPages);
    toggleForumRowByText(ovalHeaders);


    /******************************************************
     * OPINIONATED removal below here, just oval is above
     */

    /**
     * Remove club
     */
        // club general discussion
    $("td:contains('Club Discussion Area')").parent().next().remove()
    var clubHeaders = [
        "Club Discussion Area",
        "Club News",
        "Club Stats",
        "Setup Garage"
    ];
    toggleForumRowByText(clubHeaders);

    /**
     * Racing and championships (selected ones only)
     */
    var racingAndChampionshipsPages = [
        "644", // world champ
        "645", // pro
        "647", // licenses, ratings and scoring
        "648", // racing your latest race
        "649", // video and screenshot showcase
        "643" // world cup of iracing
    ];
    toggleForumRowByPage(racingAndChampionshipsPages);

    /**
     * Club and Regional
     */
    var regionalHeaders = ["Regional Competitions Discussion"];
    var regionalPages = ["4111"];

    toggleForumRowByText(regionalHeaders);
    toggleForumRowByPage(regionalPages);

    /**
     * Paint
     */
    var paintHeaders = ["The Paint Booth"];
    var paintPages = ["639", "640"];
    toggleForumRowByText(paintHeaders);
    toggleForumRowByPage(paintPages);

    /**
     * Technical and Help
     */
    var techPages = [
        "618", // tech - other
        "617" // camera files
    ];
    toggleForumRowByPage(techPages);
});