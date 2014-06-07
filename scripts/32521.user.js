// ==UserScript==
// @author         amachang
// @email          seijro@gmail.com
// @name           Chart in Hatena Bookmark Entry
// @namespace      http://pathtraq.com/
// @description    Render access chart in hatena bookmark entry.
// @include        http://b.hatena.ne.jp/entry/*
// @version        1.0.3
// ==/UserScript==

// Bookmarklet
// javascript:(function(s){s.src='http://userscripts.org/scripts/source/32521.user.js';document.body.appendChild(s)})(document.createElement('script'));

(function() {

    // Config
    var afterElementXPath = 'id("entrylist")/following-sibling::*[1]';
    var urlElementXPath = 'id("entrylink_url")//a';
    var titleText = '\u30C1\u30E3\u30FC\u30C8\uFF1A';
    var defaultChartScale = '24h';
    var chartWidth = 400;
    var chartHeight = 150;
    var chartUrlPrefix = 'http://chart.apis.google.com/chart?cht=lc';
    var chartScaleNames = [
        ['24h', '24\u6642\u9593'],
        ['1w',  '1\u9031\u9593'],
        ['1m',  '1\u30F6\u6708'],
        ['3m',  '3\u30F6\u6708']
    ];


    // for IE
    if (!document.evaluate) {
        var script = document.createElement('script');
        script.src = 'http://svn.coderepos.org/share/lang/javascript/javascript-xpath/trunk/release/javascript-xpath-0.1.11.js';
        document.body.appendChild(script);
        var callee = arguments.callee; 
        var interval = setInterval(function() {
            if (!document.evaluate) return;
            clearInterval(interval);
            interval = null;
            callee();
        }, 100);
        return;
    }

    function addEventListener(e, type, fn) {
        if (e.addEventListener) {
            e.addEventListener(type, fn, false);
        }
        else {
            e.attachEvent('on' + type, function() {
                fn(window.event);
            });
        }
    }


    // DOM
    var url =   document.evaluate(
                    urlElementXPath,
                    document,
                    null,
                    XPathResult.STRING_TYPE,
                    null
                ).stringValue;

    var afterElement =  document.evaluate(
                            afterElementXPath,
                            document,
                            null,
                            XPathResult.ANY_UNORDERED_NODE_TYPE,
                            null
                        ).singleNodeValue;

    var documentFragment = document.createDocumentFragment();

    var titleElement = document.createElement('dt');
    titleElement.innerHTML = '';
    titleElement.appendChild(document.createTextNode(titleText));
    documentFragment.appendChild(titleElement);

    var chartParentElement = document.createElement('dd');
    documentFragment.appendChild(chartParentElement);

    var chartAnchorElement = document.createElement('a');
    chartAnchorElement.href = 'http://pathtraq.com/page/' + url;
    chartParentElement.appendChild(chartAnchorElement);

    var chartElement = document.createElement('img');
    chartElement.style.width = chartWidth + 'px';
    chartElement.style.height = chartHeight + 'px';
    renderChart({start: Date(), plots: [0, 0], step: 0});
    chartAnchorElement.appendChild(chartElement);

    var selectParentElement = document.createElement('div');
    chartParentElement.appendChild(selectParentElement);

    var selectElement = document.createElement('select');
    selectElement.style.marginLeft = '1em';
    selectParentElement.appendChild(selectElement);

    for (var i = 0; i < chartScaleNames.length; i ++) {
        var info = chartScaleNames[i];
        var element = document.createElement('option');
        element.value = info[0];
        element.innerHTML = '';
        element.appendChild(document.createTextNode(info[1]));
        selectElement.appendChild(element);
        if (info[0] === defaultChartScale) {
            selectElement.selectedIndex = i;
        }
    }

    afterElement.parentNode.insertBefore(documentFragment, afterElement);


    // DOM Event
    addEventListener(selectElement, 'change', function(e) {
        var element = e.target || e.srcElement;
        requestChartAPI(element.value);
    });


    // Request Pathtraq Page Chart API
    requestChartAPI(defaultChartScale);

    function requestChartAPI(chartScale) {
        var global = function() { return this }();
        if (global.GM_xmlhttpRequest) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://api.pathtraq.com/page_chart?api=json&scale=' + chartScale +
                                                    '&url=' + encodeURIComponent(url),
                onload: function(xhr) {
                    var chartInfo = eval('(' + xhr.responseText + ')');
                    renderChart(chartInfo);
                }
            });
        }
        else {
            global.__pathtraqRenderChart__ = renderChart;
            var script = document.createElement('script');
            script.src = 'http://api.pathtraq.com/page_chart?api=json&callback=__pathtraqRenderChart__&scale=' + chartScale +
                                                    '&url=' + encodeURIComponent(url);
            document.body.appendChild(script);
        }
    }

    function renderChart(chartInfo) {
        var startDate = new Date(chartInfo.start);

        var step = chartInfo.step;
        var plots = chartInfo.plots;
        var max = Math.max.apply(null, plots);

        var labelPositions = [];
        var labels = [];

        var timeSpan = (plots.length - 1) * h(step);
        var endDate = new Date(+startDate + timeSpan);

        if (timeSpan < h(48)) {
            for (var date = just(startDate, h(4)); date <= endDate; date = new Date(+date + h(4))) {
                labels.push(date.getHours() + ':00');
                labelPositions.push(+date);
            }
        }
        else if (timeSpan < d(12)) {
            for (var date = just(startDate, d(1)); date <= endDate; date = new Date(+date + d(1))) {
                labels.push(date.getMonth() + 1 + '/' + date.getDate());
                labelPositions.push(+date);
            }
        }
        else if (timeSpan < d(48)) {
            for (var date = just(startDate, d(4)); date <= endDate; date = new Date(+date + d(4))) {
                labels.push(date.getMonth() + 1 + '/' + date.getDate());
                labelPositions.push(+date);
            }
        }
        else {
            for (var date = just(startDate, d(1)); date <= endDate; date = new Date(+date + d(1))) {
                if (date.getDate() == 1 || date.getDate() == 15) {
                    labels.push(date.getMonth() + 1 + '/' + date.getDate());
                    labelPositions.push(+date);
                }
            }
        }

        chartElement.src = chartUrlPrefix +
                                // Size
                                '&chs=' + chartWidth + 'x' + chartHeight +

                                // Data
                                '&chd=t:' + plots.join(',') + 
                                // Data Scaling
                                '&chds=0,' + max +

                                // Axis Type
                                '&chxt=x,y' + 
                                // Axis Range
                                '&chxr=' + '0,' + (+startDate) + ',' + (+endDate) + '|1,0,' + max + 
                                // Axis Range Position
                                '&chxp=' + '0,' + labelPositions.join(',') +
                                // Axis Label
                                '&chxl=' + '0:|' + labels.join('|') + '|' +

                                '';
    }

    function d(time) {
        return h(time) * 24;
    }

    function h(time) {
        return m(time) * 60;
    }

    function m(time) {
        return s(time) * 60;
    }

    function s(time) {
        return time * 1000;
    }

    function just(date, t) {
        var tzoffset = new Date().getTimezoneOffset();
        var time = +date - m(tzoffset);
        return new Date((time + t - (time % t || t)) + m(tzoffset));
    }

})();
