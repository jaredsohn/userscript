// ==UserScript==
// @name           RTM Add Calendar
// @namespace      http://superrush.blog65.fc2.com/
// @licence        MIT (YUI: http://developer.yahoo.com/yui/license.html)
// @version        1.0
// @description    Remember The Milk + Yahoo! UI Library: Calendar
// @include        http://www.rememberthemilk.com/home/*
// ==/UserScript==
(function(d, h, dv1, dv2, ss, s1, s2, s3) {

    dv1 = d.createElement('div');
    dv1.id = 'ycalContainer';

    dv2 = d.createElement('div');
    dv2.className = 'yui-skin-sam';
    dv2.appendChild(dv1);

    d.getElementById('detailsbox').insertBefore(dv2, d.getElementById('taskcloud_copy'));

    s1 = d.createElement('script');
    s1.type = 'text/javascript';
    s1.src = 'http://yui.yahooapis.com/2.6.0/build/yahoo-dom-event/yahoo-dom-event.js';

    s2 = d.createElement('script');
    s2.type = 'text/javascript';
    s2.src = 'http://yui.yahooapis.com/2.6.0/build/calendar/calendar-min.js';

    s3 = d.createElement('script');
    s3.type = 'text/javascript';
    s3.innerHTML = '\
(function() {\
    YAHOO.util.Event.onDOMReady(function (calendar) {\
        calendar = new YAHOO.widget.Calendar("ycal", "ycalContainer", {START_WEEKDAY:1, LOCALE_MONTHS:"short", HIDE_BLANK_WEEKS:true});\
        calendar.selectEvent.subscribe(function(event, ymd) {\
            var u = "http://m.rememberthemilk.com/add?due="+ymd[0][0][0]+"/"+ymd[0][0][1]+"/"+ymd[0][0][2];\
            var w = window.open(u, "_blank", "status=no,toolbar=no,width=200,height=560,resizable=yes");\
            setTimeout(function(){w.focus();},500);\
        }, calendar, true);\
        calendar.render();}\
    );\
})();\
';

    ss = d.createElement('style');
    ss.type = 'text/css';
    ss.innerHTML = '\
@namespace url(http://www.w3.org/1999/xhtml);\
@-moz-document domain(rememberthemilk.com) {\
    #ycal {\
        width: 100% !important;\
        margin-top: 15px !important;\
        border: 1px solid #ccc !important;\
        padding: 10px !important;\
        text-align: center !important;\
    }\
    #ycal td{\
        padding: 1px 8px !important;\
    }\
    #ycal .today{\
        border: 1px solid #ccc !important;\
        background: #eee !important;\
    }\
    .calheader{\
        margin-bottom: 10px !important;\
        padding: 3px !important;\
        border: 1px solid #ccc !important;\
    }\
    .calnavleft {\
        display: block;\
        background: #eee;\
        text-align: left;\
        font-size: 9px;\
        margin-bottom: 3px !important;\
    }\
    .calnavleft:before {\
        content:"<< " !important;\
    }\
    .calnavright {\
        display: block;\
        background: #eee;\
        text-align: right;\
        font-size: 9px;\
        margin-top: 3px !important;\
    }\
    .calnavright:after {\
        content:" >>" !important;\
    }\
}\
';

    h.appendChild(ss);
    h.appendChild(s1);
    h.appendChild(s2);
    h.appendChild(s3);

})(document, document.getElementsByTagName('head')[0]);
