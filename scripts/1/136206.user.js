// ==UserScript==
// @name         RunKeeperMaxSpeed
// @description  Add max speed value in activity stats
// @id           me.4ndrew.RunKeeperMaxSpeed
// @version      1.3
// @author       nopox
// @homepageURL  http://userscripts.org/scripts/show/136206
// @supportURL   http://userscripts.org/scripts/discuss/136206
// @updateURL    http://userscripts.org/scripts/source/136206.meta.js
// @include      http://runkeeper.com/user/*/activity/*
// @match        http://runkeeper.com/user/*/activity/*
// ==/UserScript==

(function(){
    var execute = function() {
        var chartData;

        activityInfoCallbacks.push(function(activityInfo) {
            if (activityInfo == null) return;

            if (activityInfo.chartData) {
                chartData = activityInfo.chartData;
                if (typeof chartData.series !== "undefined") {
                    var maxSpeed = 0;
                    var speedData = chartData.series["SPEED"].data;

                    for (i = 0; i < speedData.length; i++) {
                        if (speedData[i][1] > maxSpeed) {
                            maxSpeed = speedData[i][1];
                        }
                    }
                    
                    if ($('#maxSpeedBump').length == 0) {
                        $('#chartSection').append('<div class="row-fluid chartLabel">'
                                + '    <div class="span3 statsItem" id="averageSpeed">'
                                + '      <h5>Max Speed</h5>'
                                + '      <h1><span class="value">' + Math.floor(maxSpeed*100)/100 + '</span>'
                                + '      </h1>'
                                + '    </div>'
                                + '    <div class="span9">'
                                + '      <div>'
                                + '        <div class="highcharts-container"></div>'
                                + '      </div>'
                                + '    </div>'
                                + '</div>');        
                    }
                }
            }
        });
        
        /*
        var counter = 0;
        var timer = setInterval( function() {
            if (chartData && typeof chartData.series !== "undefined") {
                clearInterval(timer);

                var maxSpeed = 0;
                var speedData = chartData.series["SPEED"].data;

                for (i = 0; i < speedData.length; i++) {
                    if (speedData[i][1] > maxSpeed) {
                        maxSpeed = speedData[i][1];
                    }
                }

                $('.averageSpeed').parent().after('<div class="activityStatsDivider"></div>' +
                    '<div id="statsMaxSpeed" class="activityStatsItem">'+
                    '    <div class="labelText">Max. Speed</div>'+
                    '    <div class="mainText">' + Math.floor(maxSpeed*100)/100 + '</div>'+
                    '    <div class="unitText">km/h</div>'+
                    '</div>');

                $('.activityStatsItem').css('width', 'auto');


                // workaround: dynamic elements width (fill all space) inside div with static width
                // I know it looks terrible but I don't know how to improve that
                var totalWidth = 0;
                var totalElements = 0;
                $('.activityStatsItem:visible').each(function(i, v) {
                    totalWidth += $(this).outerWidth();
                    totalElements++;
                });

                var proportionalDelta = ($('#activityStats').width() - totalWidth) / totalElements - 2;
                if (proportionalDelta > 1) {
                    $('.activityStatsItem:visible').width(function(i, elWidth) {
                        $(this).width(elWidth + proportionalDelta);
                    });
                }
            } else if (counter++ > 10) {
                clearInterval(timer);
            }
        }, 1000);
        */

    };
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.innerHTML = '(' + execute.toString() + ')();';
    document.head.appendChild(script);
})();