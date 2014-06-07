// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Douban Topic Floors
// @namespace       http://cuimingda.com
// @description     [douban.com] Keyboard navigation among replies for group topic
// @include         http://www.douban.com/group/topic/*
// @exclude         http://www.douban.com/group/topic/*/edit
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==
//
// 0.1 @ 2009/01/14 # Initial Release
// 0.11 @ 2009/01/14 2:00 # Add key G to goto floor directly
// 0.12 @ 2009/01/14 20:32 # Fix bug with cross page link, every floor has a absolute address now.
// --------------------------------------------------------------------------------

;(function() {
    $("html").keydown(function(event) {
        if(event.eventPhase !== 2) return true;
        
        if(event.keyCode === 38) {
            turnPrev();
            return false;
        }
        else if(event.keyCode === 40) {
            turnNext();
            return false;
        }
        else if(event.keyCode === 37) {
            turnFirst();
            return false;
        }
        else if(event.keyCode === 39) {
            turnLast();
            return false;
        }
        else if(event.keyCode === 71) {
            var input = prompt($("h4").length === 0 ? "目前还没有回复，哪也去不了！" : "请输入你要去的楼层(1 - " + $("h4").length + ")：");
            if(floor = parseInt(input)) {
                if(floor > $("h4").length || floor < 1) {
                    alert("输入的楼层不是太大就是太小，反正是不存在啦！");
                }
                else {
                    location.hash = "#" + floor;
                }
            }
            return false;
        }
        else { 
            return true;
        }
    });
    
    $("h4").each(function(index) {
        if(!/^\d+\u697C/.test($(this).text())) {
            var floor = new Number(index + 1 + floorBase());
            $(this).prepend(floor.toString() + "\u697C\u3000");
        }
        
        $(document.createElement("a"))
            .attr("id", index + 1 + floorBase())
            .addClass("floor")
            .prependTo($(this));
    });
    
    if(location.hash !== "") {
        location.hash = location.hash;
    }
    
    $(".wrc").each(function() {
        $(this).html($(this).html().replace(/(\d+)\u697C/g, "<a class=\"gotoFloor\" href=\"\">$1\u697C</a>"));
    });
    
    $("h4").each(function() {
        $(this).html($(this).html().replace(/(\d+)\u697C/g, "<a class=\"gotoFloor\" href=\"\">$1\u697C</a>"));
    });
    
    $(".gotoFloor").each(function() {
        var floor = parseInt($(this).text().match(/(\d+)\u697C/)[1])
        var start = floorBase();
        
        if(floor > start && floor <= start + 100) {
            $(this).attr("href", "#" + floor);
        }
        else {
            var base = Math.floor(floor/100) * 100;
            $(this).attr("href", location.pathname + "?start=" + base + "#" + floor);
        }
    });
    
    function floorBase(floor) {
        floor = location.search.match(/start=(\d+)/)
        return floor !== null ? parseInt(floor[1]) : 0;
    }
    
    function turnPrev() {
        var prevItems = $("h4").filter(function() {
            return $(this).offset().top + 1 < $(document).scrollTop();
        });
        
        if(prevItems.length === 0) {
            location.hash = "#";
        }
        else {
            location.hash = "#" + prevItems.filter(":last").children(".floor:first").attr("id");
        }
    }
    
    function turnNext() {
        var nextItems = $("h4").filter(function() {
            return $(this).offset().top > $(document).scrollTop();
        });
        
        if(nextItems.length === 0) {
            $(document).scrollTop($(document).scrollTop() + 1000);
        }
        else {
            location.hash = "#" + nextItems.filter(":first").children(".floor:first").attr("id");
        }
    }
    
    function turnFirst() {
        location.hash = "#";
    }
    
    function turnLast() {
        $(document).scrollTop(9999999);
    }
})();