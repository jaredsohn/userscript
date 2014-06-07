// ==UserScript==
// @name           repgraph
// @namespace      stackoverflow
// @description    Reputation graph for user profiles
// @include        http://stackoverflow.com/users/*
// @include        http://serverfault.com/users/*
// @include        http://superuser.com/users/*
// @include        http://stackapps.com/users/*
// @include        http://meta.stackoverflow.com/users/*
// @include        http://meta.serverfault.com/users/*
// @include        http://meta.superuser.com/users/*
// @include        http://*.stackexchange.com/users/*
// @include        http://askubuntu.com/users/*
// @include        http://meta.askubuntu.com/users/*
// @include        http://answers.onstartups.com/users/*
// @include        http://meta.answers.onstartups.com/users/*
// @author         Benjamin Dumke
// ==/UserScript==

// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    if (!/^\s*reputation\s*/.test($("#tabs .youarehere").text()))
        return;

    var DAY = 60 * 60 * 24;
    
    var MAX_PAGE_SIZE = 30; // the maximum number of entries that will be retrieved from the server in a single call
    
    var pageCount;
    
    function tryGetPageCount () {
        if (typeof pageCount != "undefined")
            return true;
        if ($("table.rep-table").length != 1)
            return false;
            
        var pager = $(".pager");
        if (pager.length == 0) {
            pageCount = 1;
            return true;
        }
        pageCount = parseInt(pager.find(".page-numbers:not(.next):last").text());
        return true;
    }
    
    // callback will be called with a single argument; a jQuery object representing the rows of the full reputation table in no guaranteed order
    function getTable(callback) {
        if (pageCount === 1 && $("table.rep-table").length == 1) {
            callback($("table.rep-table tr.rep-table-row"));
            return;
        }
            
        var currentPage = parseInt($(".pager .page-numbers.current").text());
        var tableRows = $("table.rep-table tr.rep-table-row");
        var currentPageSize = 30;
        var totalRowCount = pageCount * currentPageSize;
        
        var retrieveSkipPage, retrievePageSize, retrievePageCount;
        if (!currentPage || Math.ceil(totalRowCount / MAX_PAGE_SIZE) < (pageCount - 1)) {
            tableRows = $([]);
            retrieveSkipPage = null;
            retrievePageSize = MAX_PAGE_SIZE;
            retrievePageCount = Math.ceil(totalRowCount / MAX_PAGE_SIZE);
        } else {
            retrieveSkipPage = currentPage;
            retrievePageSize = currentPageSize;
            retrievePageCount = pageCount;
        }
        
        var userId = document.location.href.match(/\/users\/(\d+)(?:\/|$)/)[1];
        function loadPage(n) {
            if (n === retrieveSkipPage) {
                n++;
                if (n > retrievePageCount) {
                    $("#graph-loading-info").text("");
                    callback(tableRows);
                    return;
                }
            }
                
            $("#graph-loading-info").text(" (" + Math.round(100 * (n - (retrieveSkipPage === null || retrieveSkipPage > n ? 1 : 2)) / retrievePageCount) + "%)");
        
            $.get("/ajax/users/tab/" + userId + "?tab=reputation&page=" + n, function (data) {
                tableRows = tableRows.add($(data).find("tr.rep-table-row"));

                if (n < retrievePageCount)
                    setTimeout(function() { loadPage(n + 1); }, 500);
                else {
                    $("#graph-loading-info").text("");
                    callback(tableRows);
                }
            });
        }
        
        loadPage(1);
    }
    
    var _repData;
    function afterDataReady(callback) {
        getTable(function (jRows) {
            _repData = parseTable(jRows);
            callback();
        });
    }
    
    function parseTable(jRows) {
        var result = {};
        var day, repChange;
        var lastDay = -10e6;
        var firstDay = 10e6;
        jRows.each(function() {
            day = parseInt($(".rep-day", this).attr("data-load-url").split("/").slice(-1)[0]) / DAY;
            repChange = parseInt($(".rep-cell span", this).text());
            lastDay = Math.max(lastDay, day);
            firstDay = Math.min(firstDay, day);
            result[day] = repChange;
        });
        return {
            firstDay: firstDay,
            lastDay: lastDay,
            reputation: result
        };
    }
    
    function getRepData() {
        return _repData;
    }
    
    var TODAY = Math.floor(new Date().getTime() / (DAY * 1000));

    function getDimensions(optimalWidth) {
        var width = Math.min(optimalWidth, 1000);
        var height = Math.min(360, Math.floor(300000 / width));
        return {
            width: width,
            height: height
        };
    }
    
    function buildGraph(startDay, endDay, width) {
        
        var repData = getRepData(width);
        var reputation = repData.reputation;
        var startRep = 1;
        
        for (var d = repData.firstDay; d < startDay; d++) {
            startRep += reputation[d] || 0;            
        }
        
        var pointCount, daysPerPoint;
        var days = endDay - startDay + 1;
        if (days <= 101) {
            pointCount = days;
            daysPerPoint = 1;
        } else {
            daysPerPoint = Math.ceil(days / 100);
            pointCount = Math.ceil(days / daysPerPoint)
        }
        startDay = endDay - pointCount * daysPerPoint;
        
        var totalRepValues = [];
        var dailyRepValues = [];
        
        var minDaily, maxDaily;
        var maxTotal = 0;
        
        var totalRep = startRep;
        for (var point = 0; point <= pointCount; point++) {
            var repChange = 0;
            var maxDailyInThisRange = -10e5;
            for (var dayDelta = 0; dayDelta < daysPerPoint; dayDelta++) {
                var repToday = reputation[startDay + point * daysPerPoint + dayDelta] || 0;
                repChange += repToday;
                maxDailyInThisRange = Math.max(maxDailyInThisRange, repToday);
            }
            totalRep += repChange;
            maxTotal = Math.max(maxTotal, totalRep);
            totalRepValues.push(totalRep);
            dailyRepValues.push(maxDailyInThisRange == -10e5 ? 0 : maxDailyInThisRange);
            
            if (typeof minDaily == "undefined" || minDaily > maxDailyInThisRange)   
                minDaily = maxDailyInThisRange;
            if (typeof maxDaily == "undefined" || maxDaily < maxDailyInThisRange)
                maxDaily = maxDailyInThisRange;
            
        }
        
        var xLabels = [];
        for (var x = 0; x <= pointCount; x += (pointCount / 5)) {
            var thisDate = new Date((startDay + x * daysPerPoint) * DAY * 1000);
            var label = thisDate.getUTCFullYear() + "/" + (thisDate.getUTCMonth() + 1);
            if (daysPerPoint < 2)
                label += "/" +thisDate.getUTCDate();
            xLabels.push(label);
        }
        
        var size = getDimensions(width);
        
        maxTotal = Math.round(maxTotal * 1.05); // so the graph doesn't hit the top
        
        var url = "http://chart.googleapis.com/chart?cht=lc&chs=" + size.width + "x" + size.height + "&chds=0," + maxTotal + "," + minDaily + "," + maxDaily; // scale
        url += "&chd=t:" + totalRepValues.join(",");
        url += "|" + dailyRepValues.join(",");
        url += "&chxt=y,r,x&chxr=0,0," + maxTotal + "|1," + minDaily + "," + maxDaily; // y-axis labels
        url += "&chxl=2:|" + xLabels.join("|");
        url += "&chxp=2,0,20,40,60,80,100"; // x-axis label positions
        url += "&chco=0000ff,ff8080"; // line colors
        url += "&chdl=total+reputation (left scale)|daily+reputation (right scale)";
        url += "&chma=80,80,0,0"; // margins
        url += "&chdlp=b"; // legend position
        return {
            url: url,
            actualStartDay: startDay
        };
        
    }
    
    function show(days, width) {
        return function() {
            showGraph(TODAY - days, TODAY);
            $(this).parent().find("span").css("font-weight", "normal");
            $(this).css("font-weight", "bold")
        };
    }
    
    var graphDiv, jImg;
    var availableWidth, size;
    var lastStart, lastEnd;
    function showGraph(startDay, endDay) {
        if (!graphDiv) {
            availableWidth = $("#stats").width() - 80;
            size = getDimensions(availableWidth);
        
            graphDiv = $("<div style='padding: 20px 40px 40px 40px;position:relative;text-align:center'/>").hide().prependTo("#stats").slideDown("slow");
            var selection = $("<div style='position:absolute;top:20px;height:" + size.height + "px;background-color:rgb(0,127,255)' />").appendTo(graphDiv).hide();
            jImg = $("<img width='" + size.width + "' height='" + size.height + "' style='margin-bottom:20px;'/>").appendTo(graphDiv);
            
            $("<br />").appendTo(graphDiv);
            $("<span style='cursor:pointer'>all time</span>").appendTo(graphDiv).click(show(TODAY - getRepData().firstDay));
            $("<span> &ndash; </span>").appendTo(graphDiv);
            $("<span style='cursor:pointer'>last 365 days</span>").appendTo(graphDiv).click(show(365));
            $("<span> &ndash; </span>").appendTo(graphDiv);
            $("<span style='cursor:pointer;font-weight:bold'>last 100 days</span>").appendTo(graphDiv).click(show(100));
            
            var dragStart;
            jImg.mousedown(function (evt) {
                dragStart = evt.pageX - jImg.offset().left;
                selection.css({left: 40 + dragStart, width: 1}).show();
                jImg.css("opacity", .5);
                evt.preventDefault();
            });
            jImg.mousemove(function (evt) {
                if (typeof dragStart == 'number') {
                    var pos = evt.pageX - jImg.offset().left;
                    selection.css({left: 40 + Math.min(dragStart, pos), width: Math.abs(dragStart-pos)  })
                }
            });
            jImg.mouseleave(function (evt) {
                selection.hide();
                jImg.css("opacity", 1);
                dragStart = null;
            });
            jImg.mouseup(function (evt) {
                var dragEnd = evt.pageX - jImg.offset().left;
                if (dragEnd < dragStart) {
                    var temp = dragEnd;
                    dragEnd = dragStart;
                    dragStart = temp;
                }
                selection.hide();
                var lastDuration = lastEnd - lastStart + 1;
                var newStart = Math.floor(lastStart + lastDuration * (dragStart - 80) / (size.width - 160));
                var newEnd = Math.ceil(lastStart + lastDuration * (dragEnd - 80 ) / (size.width - 160));
                evt.preventDefault();
                graphDiv.children("span").css("font-weight", "normal");
                dragStart = null;
                showGraph(newStart, newEnd);
                jImg.css("opacity", 1);

            });
            
        }
        var graph = buildGraph(startDay, endDay, size.width);
        jImg.attr("src", graph.url);
        lastStart = graph.actualStartDay;
        lastEnd = endDay;
    }
    
    var allowClick = true;
    function ensureButton() {
        if ($("#graph-loading-info").length > 0)
            return;
        if (!tryGetPageCount())
            return;
        var button = $("<a href='#'>line graph<span id='graph-loading-info'></span></a>").prependTo(".subtabs.user-tab-sorts").click(function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (!allowClick)
                return;
            if (graphDiv && graphDiv.is(":visible")) {
                graphDiv.slideUp("slow");
                $(this).removeClass("youarehere");
                return;           
            }
            if (graphDiv) {
                $(this).addClass("youarehere");
                graphDiv.slideDown("slow")
                return;
            }
            allowClick = false;
            that = $(this);
            afterDataReady(function() {
                allowClick = true;
                that.addClass("youarehere");
                showGraph(TODAY - 100, TODAY);
            });
        });
        if (graphDiv && graphDiv.is(":visible"))
            button.addClass("youarehere");
    }
    $(document).ajaxComplete(ensureButton);
    ensureButton();
});