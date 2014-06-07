// ==UserScript==
// @author         GreatNikita
// @name           eRepublik BattleMod
// @namespace      eBattleMod
// @description    Enchances the erepublik battle module
// @version        1.0.1
// @include        http://*.erepublik.com/*/military/battlefield/*
// @require        http://sizzlemctwizzle.com/updater.php?id=80226&days=1&show
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var currURL = document.location.href;
var arrURL = currURL.split('/');
var BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';
var API_URL = 'http://api.erepublik.com/v2/feeds/';
var LANG = 'en';
var $j = jQuery.noConflict();
var $ = jQuery.noConflict();

var getJSON = function(jsonstr,key) {
    var index = jsonstr.indexOf(key);
    if(index == -1) {
        return '';
    }
    var startIndex = index + key.length + 3;
    var endIndex = jsonstr.indexOf('\"' , startIndex);
    if(endIndex == -1) {
        return '';
    }
    return jsonstr.substring(startIndex,endIndex);
};




function Main() {
    //alert("2");
    if (unsafeWindow.SERVER_DATA == undefined) {
    //alert("4");
    }
    else {
        //alert("5");
        var subURL = currURL.substr(BASE_URL.length);
        LOCALE = subURL.substring(0, 2) + '/';
        BASE_URL += LOCALE;
        subURL = currURL.substr(BASE_URL.length);
        window.setInterval(function() {
            if (unsafeWindow.SERVER_DATA == undefined) {
            //alert("4");
            } else {
                //window = unsafeWindow;
                //alert("r: " + unsafeWindow.citizen_regionList_select);
                //alert("s: " + unsafeWindow.SERVER_DATA);
                var get_fighters_url = "/en/military/battle-log/"+ unsafeWindow.SERVER_DATA.battleId;
                $j.getJSON(get_fighters_url, function(data) {
                    var progress = data["domination"];
                    //var updateIt;

                    if(unsafeWindow.SERVER_DATA.mustInvert){
                        progress = 100 - progress;
                    }
                    var adjprogress = Math.round(progress*10000)/10000;
                    //if(progress == 100 || progress == 0){
                     //   $j('#domination_bar img').addClass('hide');
                   // } else {
                    //    $j('#domination_bar img').removeClass('hide');
                    //}
                    //$j('#domination_bar').gx({            'width': progress + '%'        }, 1000, 'Sine',

                    //{
                    //  start: function() {
                    //     updateIt = setInterval("battleFX.setDominationPercents()", 100);
                    // },
                    // complete: function(){
                    //     clearInterval(updateIt)

                    // }
                    // });
                    $j('#blue_domination').text(adjprogress + "%");
                    $j('#red_domination').text((100 - adjprogress) + "%");
                    //alert("aaaaa");
                    return false;
                });
            }
        }, 3000);
    }

};
window.addEventListener('load', function() {
    //alert("1");
    Main();
}, false);

