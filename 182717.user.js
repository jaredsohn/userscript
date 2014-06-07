// ==UserScript==
// @name       NiconamaCalendar
// @namespace  www.twitter.com/imux16
// @version    1.2
// @description  Adds niconama streams to your Google Calendar.
// @match      http://live.nicovideo.jp/watch/*
// @match      http://live.nicovideo.jp/gate/*
// @copyright  2013+, imux16
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    if (jQ("div.denan_02").length > 0) 
    {
        if (jQ( "#Error_Box" ).text().indexOf("地域") >= 0)
        {
            var newpath = window.location.pathname.replace('watch', 'gate')
            window.open(newpath, '_self');
        }
    }
    var origDTime = (jQ("div.kaijo > meta").attr("content"));
    var _date = origDTime.replace(/\-/g, '').split('T');
    var _year = origDTime.split('-')[0];
    var _month = origDTime.split('-')[1];
    var _day = origDTime.split('-')[2].split('T')[0];
    
    var _fromHour = origDTime.split('T')[1].split(':')[0];
    var _toHour = parseInt(_fromHour) + 2;
    var _min  = origDTime.split('T')[1].split(':')[1].split('+')[0];
    var nicoTitle = jQ("div.infobox > h2 > span:nth-child(1)").text();
    if (_toHour > 23) {
        _toHour = "0" + (parseInt(_toHour) - 24);
        _day = parseInt(_day) + 1;
    };
    if (_fromHour < 10) {
        _toHour = "0" + _toHour;
    };
    
    if (_day < 10) {
        _day = "0" + parseInt(_day);
    };
    var nicoUrl = "http://live.nicovideo.jp/watch/" + jQ("div.infobox > h2 > span:nth-child(2)").text().split(':')[1].replace(')' , '');
    CalendarLink = "https://www.google.com/calendar/render?action=template&dates=" + _date[0] + "T" + _fromHour + _min + "00/" + _year + _month + _day + "T" + _toHour + "0000&text=" + encodeURIComponent(nicoTitle) + "&location=" + nicoUrl + "&ctz=Asia%2FTokyo";
    jQ("div.kaijo > strong:nth-child(4) ").after( "  <a id='calendar' href=" + nicoUrl + " style='text-align:right;'>Add to Calendar</a>" ); 
    jQ("#calendar").click(function(){
        window.open(CalendarLink, '_blank');
    });
};


addJQuery(main);