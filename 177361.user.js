// ==UserScript==
// @name        GCcom notify GPS tracker
// @namespace   b
// @include     http://www.geocaching.com/notify/edit.aspx
// @version     1
// ==/UserScript==


var $ = unsafeWindow.jQuery;
var gpstimer = null;
var gpsactive = true;
var interval = 3*60;

$(window).load(function () {
    $.ajaxSetup ({
        cache: false
    });

     
    
    var trackGPS = function(update_interval) {
        if (!gpsactive) return false;

        $.getJSON('http://localhost:12175/gps/getGpsInfo?jsonp=?',function (gpsinfo) {
            //console.log(gpsinfo);
            if (gpsinfo.status.valid != true) {
                return false;
            }
            
            var lat = gpsinfo.trackPoint.position.latitude;
            var lon = gpsinfo.trackPoint.position.longitude;

            $('#ctl00_ContentBody_LogNotify_LatLong__inputLatDegs').val(lat);
            $('#ctl00_ContentBody_LogNotify_LatLong__inputLongDegs').val(lon);
            
            console.log('succ');
            
        },function() {
            console.log('fail');
        });
        gpstimer = setTimeout(function () {trackGPS(update_interval);},update_interval*1000);
    }
    if (gpsactive) {
        trackGPS(interval);
    }
});
