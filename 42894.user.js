// ==UserScript==
// @name           Tweet Timeline
// @namespace      abhinavsarkar.net
// @include        http://twitter.com/home*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js
// ==/UserScript==

jQuery(document).ready(function() {
    var TimelineScript = document.createElement('script');
    with(TimelineScript) {
        src = 'http://static.simile.mit.edu/timeline/api-2.2.0/timeline-api.js';
        type = 'text/javascript';
    }
    jQuery("head")[0].appendChild(TimelineScript);

    function embedFunctions(funcs) {
        var scriptNode = document.createElement('script');
        scriptNode.type = 'text/javascript';
        funcs.forEach(function(func){
            jQuery(scriptNode).append(func.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2') + "\n");
        });
        document.body.appendChild(scriptNode);
    }

    function loadEventData(eventSource, page, pageChanger) {
        page = Math.max(page, 1);
        console.log("page = " + page);
        var eventData = {
            'dateTimeFormat': 'iso8601',
            'events' : []
        };

        loadData = function (data) {
            jQuery('.hentry', jQuery(data)).each(function (index, elem) {
                var $elem = jQuery(elem);
                var id = $elem.attr('id');
                if (eventSource.getEvent(id) == undefined) {
                    var description = $elem.find('.entry-content').html()
                        + " [&lt;a tagert='_blank' href='" + $elem.find('.entry-date')[0].href + "'&gt;&sect;&lt;/a&gt;]";
                    eventData.events.push({
                        id:             id,
                        start:          $elem.find('.published')[0].getAttribute('title'),
                        title:          $elem.find('.status-body a:first').text(),
                        description:    description,
                        instant:        true,
                        image:          $elem.find('.photo')[0].src,
                        link:           $elem.find('.status-body a:first').attr('href'),
                        caption:        $elem.find('.status-body a:first').attr('title')
                    });
                }
            });
            eventSource.loadJSON(eventData, "");
            pageChanger(page);
        };

        /*if (page == getCurrentPage())
            loadData(document.documentElement);
        else*/
        jQuery.get("http://twitter.com/home?page="+page, loadData);
    }

    function getCurrentPage() {
        var s = location.search;
        if (s) {
            s = s.replace("?","");
            s = s.split("&");
            var d = {};
            for (var i=0; i<s.length; i++) {
                var u = s[i].split("=");
                d[u[0]] = u[1];
            }
            if ("page" in d)
                return parseInt(d["page"]);
        }
        return 1;
    }

    function getTweetRate(eventSource) {
        var esMinDate = eventSource.getEarliestDate();
        var esMaxDate = eventSource.getLatestDate();
        var count = eventSource.getCount();
        return count/(esMaxDate - esMinDate)*1000;
    }

    function createTimeline() {
        modifyInfoBubbleTime();
        var eventSource = new Timeline.DefaultEventSource(0);

        var theme = Timeline.ClassicTheme.create();
        theme.event.overviewTrack.offset = 10;
        var bandInfos = [
            Timeline.createBandInfo({
                width:          "70%",
                intervalUnit:   Timeline.DateTime.MINUTE,
                intervalPixels: 80,
                eventSource:    eventSource,
                timeZone:       - new Date().getTimezoneOffset()/60
            }),
            Timeline.createBandInfo({
                overview:       true,
                eventSource:    eventSource,
                showEventText:  false,
                width:          "15%",
                intervalUnit:   Timeline.DateTime.HOUR,
                intervalPixels: 160,
                timeZone:       - new Date().getTimezoneOffset()/60,
                theme:          theme
            }),
            Timeline.createBandInfo({
                overview:       true,
                eventSource:    eventSource,
                showEventText:  false,
                width:          "15%",
                intervalUnit:   Timeline.DateTime.DAY,
                intervalPixels: 160,
                timeZone:       - new Date().getTimezoneOffset()/60,
                theme:          theme
            })
        ];
        bandInfos[1].syncWith = 0;
        bandInfos[1].highlight = true;
        bandInfos[2].syncWith = 0;
        bandInfos[2].highlight = true;

        var timelineDiv = document.createElement("div");
        timelineDiv.id = "timelineContainer";
        timelineDiv.style.height = "150px";
        timelineDiv.style.fontSize = "xx-small";
        timelineDiv.style.border = "1px solid #aaa";
        jQuery('#header').after(timelineDiv);

        var page = 1;
        var fetchingPage = null;
        var tl = Timeline.create(timelineDiv, bandInfos);

        var autoScrollTimeline= function () {
            if (typeof timelineAutoScroller != undefined)
                clearTimeout(timelineAutoScroller);
            return setInterval(function() {
                tl.getBand(0).setCenterVisibleDate(new Date());
            }, 1000*30)
        };

        var timelineAutoScroller = autoScrollTimeline();

        var pageChanger = function (newPage){
            setTimeout(function () {timelineAutoScroller = autoScrollTimeline();},60*1000);
            page = newPage;
            fetchingPage = null;
        };

        tl.getBand(0).addOnScrollListener(function(band) {
            var bandMinDate = band.getMinVisibleDate();
            var bandMaxDate = band.getMaxVisibleDate();
            var esMinDate = eventSource.getEarliestDate();
            var esMaxDate = eventSource.getLatestDate();
            var tweetRate = getTweetRate(eventSource);

            if (bandMinDate < esMinDate) {
                var diff = (esMinDate - bandMinDate)/1000;
                var dp = Math.ceil(diff/(20/tweetRate));
                if (fetchingPage != page + dp) {
                    for (var i=1; i<=dp; i++) {
                        clearInterval(timelineAutoScroller);
                        fetchingPage = page + i;
                        loadEventData(eventSource, fetchingPage, pageChanger);
                    }
                }
            } else if (bandMaxDate > esMaxDate) {
                var diff = (bandMaxDate - esMaxDate)/1000;
                var dp = Math.ceil(diff/(20/tweetRate));
                if (fetchingPage != page - dp) {
                    for (var i=1; i<=dp; i++) {
                        clearInterval(timelineAutoScroller);
                        fetchingPage = page - i;
                        loadEventData(eventSource, fetchingPage, pageChanger);
                    }
                }
            }
        });

        if (!fetchingPage) {
            fetchingPage = page;
            loadEventData(eventSource, fetchingPage, pageChanger);
        }
    }

    function modifyInfoBubbleTime() {
        var oldFillInfoBubble =
            Timeline.DefaultEventSource.Event.prototype.fillInfoBubble;

        Timeline.DefaultEventSource.Event.prototype.fillInfoBubble =
            function(elmt, theme, labeller) {
                oldFillInfoBubble.call(this, elmt, theme, labeller);
                var timeDiv = jQuery(elmt).find('.timeline-event-bubble-time');
                timeDiv.text(timeDiv.text().replace(" GMT", ""));
            }
    }

    embedFunctions([
        modifyInfoBubbleTime,
        loadEventData,
        getTweetRate,
        getCurrentPage,
        createTimeline
    ]);

    var checker = setInterval(function(){
        if(typeof unsafeWindow.Timeline != "undefined" &&
           typeof unsafeWindow.Timeline.DefaultEventSource != "undefined" &&
           typeof unsafeWindow.Timeline.OverviewEventPainter != "undefined" &&
           typeof unsafeWindow.Timeline.GregorianDateLabeller.monthNames != "undefined") {
            clearInterval(checker);
            unsafeWindow.createTimeline();
        }
    },500);
});
