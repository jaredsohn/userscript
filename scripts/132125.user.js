// ==UserScript==
// @author         mslliviu 
// @name           Mercenary
// @namespace      Mercenary
// @description    Linkuri pt erep
// @version        1.1
// @include        http://www.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


addJQuery(Main);


function Main() {
    var location = document.location.href;
    if (location.indexOf("citizen/profile/4697560") > 0) {
        StoreMercenaryStatus();
    }
    if (location == "http://www.erepublik.com/en") {
        var objStatus = GetMercenaryStatus();
        DisplayStatusHomePage(objStatus);
    }

    if (location == "http://www.erepublik.com/en/military/campaigns") {
        var objStatus = GetMercenaryStatus();
        DisplayStatusCampaigns(objStatus);
    }

    if (location == "http://www.erepublik.com/en/citizen/change-residence") {
        AfiseazaDistantaLaRegiuni();
    }

    function StoreMercenaryStatus() {
        //var x = $(".country_list").children().length;
        var tari = {};
        $(".country_list").children().each(function () {
            //tari[$(this).attr("title")] = $(this).children("em").html();
            tari[$(this).attr("title")] = $(this).children("em").html().toString().split("/")[0]; // pt x/25 ma intereseaza doar x-ul
        });
        localStorage.setItem('objMercenaryStatus', JSON.stringify(tari));
    }

    function GetMercenaryStatus() {
        var o = localStorage.getItem('objMercenaryStatus');
        return JSON.parse(o);
    }

    function DisplayStatusHomePage(status) {
        $("<style type='text/css'>.redbold{ color:#B40027; font-weight:bold;} </style>").appendTo("head");

        $(".country_battles,.allies_battles,.all_battles,.bod_listing").children("li").each(function () {

            var left = $(this).children("img").first()[0].title;
            var right = $(this).children("img").last()[0].title;

            //$(this).children("small").attr("innerHTML","-") 
            // $(this).children("small").prepend('<span>(' +status[left] + ')</span>');
            // $(this).children("small").append('<span>(' +status[right] + ')</span>');
            var sLeft, sRight;
            if (status[left] == "25") sLeft = '<span>(' + status[left] + ')</span>'; else sLeft = '<span class="redbold">(' + status[left] + ')</span>';
            if (status[right] == "25") sRight = '<span>(' + status[right] + ')</span>'; else sRight = '<span class="redbold">(' + status[right] + ')</span>';
            $(this).children("strong").prepend(sLeft + '-' + sRight);
        });
    }

    function DisplayStatusCampaigns(status) {
        $("<style type='text/css'>.redbold{ color:#B40027; font-weight:bold;} </style>").appendTo("head");

        $(".country_battles,.allies_battles,.all_battles,.bod_listing").children("li").each(function () {

            var left = $(this).children("img").first()[0].title;
            var right = $(this).children(".opponent_holder").children("img").first()[0].title;

            if (status[left] == "25")
                $(this).children("strong").append('<span> (' + status[left] + ')</span>');
            else
                $(this).children("strong").append('<span class="redbold"> (' + status[left] + ')</span>');

            if (status[right] == "25")
                $(this).children(".opponent_holder").children("strong").append('<span> (' + status[right] + ')</span>');
            else
                $(this).children(".opponent_holder").children("strong").append('<span class="redbold"> (' + status[right] + ')</span>');
        });
    }

    function AfiseazaDistantaLaRegiuni() {  
        var regionSelect = $('#region_list');
        regionSelect.click(function () {
            $('#region_list').children().each(function () {
                    if ($(this).attr("value") != 0 && $(this).attr("calculat") != "1") {
                       $(this).html($(this).html() + " (" + regionDetails[$(this).attr("value").toString()]["distance"] *20 + "cc)");
					   $(this).attr("calculat","1");
                }
            });
        });
    }
}


