// ==UserScript==
// @name           MAL: Anime List Update Timeline
// @namespace      abhin4v.myinfo.ws
// @include        http://myanimelist.net/users.php
// ==/UserScript==
(function() {
    var TimelineScript = document.createElement('script');
    with(TimelineScript) {
        src = 'http://static.simile.mit.edu/timeline/api-2.2.0/timeline-api.js';
        type = 'text/javascript';
    }
    document.getElementsByTagName("head")[0].appendChild(TimelineScript);

    function $x(p, context) {
      if (!context) context = document;
      //alert(context);
      var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
      return arr;
    }

    function get(url, cb) {
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { location.href = "javascript:(" + cb + "(" + xhr.responseText + "));"; }
      });
    }

    function padZero(n) {
        if (n.length == 1) {return('0'+n);} else {return(n);}
    }

    function getEventData(str) {
        var data = eval(str).value.items;
        var eventData = {
            'dateTimeFormat': 'iso8601',
            'events' : []
        };
        for (var i=0; i<data.length; i++) {
            for (var j=0; j<data[i].updates.length; j++) {
                if (data[i].updates[j].description.indexOf("Watching") != -1) {
                    eventData.events.push({
                        /*"user": data[i].user,
                        "series": data[i].updates[j].title,
                        "timezone":"UTC",
                        "hour": data[i].updates[j]['y:published'].hour,
                        "minute": data[i].updates[j]['y:published'].minute,
                        "second": data[i].updates[j]['y:published'].second,
                        "year": data[i].updates[j]['y:published'].year,
                        "month": data[i].updates[j]['y:published'].month,
                        "day": data[i].updates[j]['y:published'].day,
                        "day_of_week": data[i].updates[j]['y:published'].day_of_week,
                        "utime": data[i].updates[j]['y:published'].utime,*/

                        start: data[i].updates[j]['y:published'].year + '-' +
                            padZero(data[i].updates[j]['y:published'].month) + '-' +
                            padZero(data[i].updates[j]['y:published'].day) + 'T' +
                            padZero(data[i].updates[j]['y:published'].hour) + ':' +
                            padZero(data[i].updates[j]['y:published'].minute) + ':' +
                            padZero(data[i].updates[j]['y:published'].second) + 'Z',
                        title: data[i].user + ' | ' + data[i].updates[j].title,
                        description: data[i].updates[j].description,
                        link: data[i].updates[j].link
                    });
                }
            }
        }
        /*cleanedData.sort(function(a,b) {
                return b.utime - a.utime;
            });*/
        return eventData;
    }

    function showTimeline(str) {
        //var Timeline = unsafeWindow.Timeline;
        //var SimileAjax = unsafeWindow.SimileAjax;

        var containerDiv = $x('//*[@id="rightcontent"]')[0];

        var timelineDiv = document.createElement("div");
        timelineDiv.id = "timelineContainer";
        timelineDiv.style.height = "350px";
        timelineDiv.style.fontSize = "xx-small";
        timelineDiv.style.border = "1px solid #aaa";

        var headerDiv = document.createElement("div");
        headerDiv.setAttribute('class', 'normal_header');
        headerDiv.innerHTML = 'Anime List Update Timeline';

        timelineDiv = containerDiv.insertBefore(timelineDiv, containerDiv.firstChild);
        headerDiv = containerDiv.insertBefore(headerDiv, timelineDiv);
        var x = new Date();

        var eventSource = new Timeline.DefaultEventSource(0);
        console.log(eventSource);
        var bandInfos = [
            Timeline.createBandInfo({
                eventSource:    eventSource,
                width:          "90%",
                intervalUnit:   SimileAjax.DateTime.HOUR,
                intervalPixels: 100,
                timeZone:       - x.getTimezoneOffset()/60
            }),
            Timeline.createBandInfo({
                eventSource:    eventSource,
                showEventText:  false,
                trackHeight:    0.5,
                trackGap:       0.2,
                width:          "10%",
                intervalUnit:   SimileAjax.DateTime.DAY,
                intervalPixels: 100,
                timeZone:       - x.getTimezoneOffset()/60
            })
        ];

        bandInfos[1].syncWith = 0;
        bandInfos[1].highlight = true;

        var eventData = getEventData(str);
        var tl = Timeline.create(timelineDiv, bandInfos);
        eventSource.loadJSON(eventData, "");
    }

    function embedFunction(s) {
        document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
    }

    function init() {
        embedFunction(showTimeline);
        embedFunction($x);
        embedFunction(padZero);
        embedFunction(getEventData);
        links = $x("/html/body/div/div[3]/div/table/tbody/tr/td/table/tbody/tr/td/div/a[contains(@href, '/profile/')]");
        users = new Array();
        for (i=0; i<links.length; i+=2) {
            var urlParts = links[i].href.split("/");
            users[i]= urlParts[urlParts.length-1];
        }
        if (users.length != 0)
            get("http://pipes.yahoo.com/pipes/pipe.run?_id=iOkMhRKJ3BGucTT_CB2yXQ&_render=json&users="
                + encodeURIComponent(users.join(',')), "showTimeline");
        //GM_log("http://pipes.yahoo.com/pipes/pipe.run?_id=iOkMhRKJ3BGucTT_CB2yXQ&_render=json&users=" + encodeURIComponent(users.join(',')));

        //showTimeline("");
    }

    window.addEventListener('load', init, false);
}())
