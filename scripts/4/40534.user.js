// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Douban Group Frequency
// @namespace       http://cuimingda.com
// @description     [douban.com] view groups sort by your frequency.
// @include         http://www.douban.com/group/*
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// @require         http://json.org/json2.js
// ==/UserScript==
//
// 0.1 @ 2009/01/16 # Initial Release
// 0.11 @ 2009/01/16 # fix bug - mixed groups joined and groups owned
// --------------------------------------------------------------------------------

;(function() {

    (function($) {
        $.fn.sort = function() {
          return this.pushStack( [].sort.apply( this, arguments ), []);
        };
    })(jQuery);
    
    (function() {
        var groupId = location.href.match(/^http:\/\/www\.douban\.com\/group\/([^\/]+)\/$/);
        if(groupId) {
            diggGroup(groupId[1]);
        }
    })();
    
    (function() {
        var re = /^http:\/\/www\.douban\.com\/group\/topic\/\d+\/$/;
        if(re.test(location.href)) {
            var groupId = $("#tablerm .pl2 a[href*=group]:first").attr("href").match(/\/group\/([^\/]+)\//);
            if(groupId) {
                diggGroup(groupId[1]);
            }
        }
    })();
    
    (function() {
        if(location.href !== "http://www.douban.com/group/mine") return;
        
        $(".pl2:last").after("<p class=\"pl2\">&gt;&nbsp;<a id=\"clearGroups\" href=\"\">清空我的小组访问记录</a></p>");
        $("#clearGroups").click(function(event) {
            event.preventDefault();
            initGroups();
            location.reload();
        });
    })();
    
    (function() {
        if(location.href !== "http://www.douban.com/group/mine" && location.href !== "http://www.douban.com/group/") return;
        
        $(".ob dd a").each(function() {
            var group = getGroup($(this).attr("href").match(/\/group\/([^\/]+)\//)[1]);
            $(this).parent().parent().attr("frequency", group.frequency);
        });
        
        $(".ob").sort(function(a, b) {
            return parseInt($(a).attr("frequency")) > parseInt($(b).attr("frequency"))
        }).each(function() {
            $(this).prependTo($(this).parent());
        });
    })();
    
    function getGroups() {
        return GM_getValue("groups") === undefined ? initGroups() : JSON.parse(GM_getValue("groups"));
    }
    
    function getGroup(groupId) {
        var groups = getGroups();
        
        for(i in groups) {
            if(groups[i].groupId === groupId) {
                return groups[i];
            }
        }
        return null;
    }
    
    function initGroups() {
        var groups = [];
        
        $(".ob dd a").each(function() {
            var groupId = $(this).attr("href").match(/\/group\/([^\/]+)\//)[1];
            groups.push({
                "groupId" : groupId,
                "frequency" : 0
            });
        });
        GM_setValue("groups", JSON.stringify(groups));
        GM_setValue("startDate", (new Date()).toString());
        
        return groups;
    }

    function diggGroup(groupId) {
        var groups = getGroups();
        
        var found = false;
        $(groups).each(function() {
            if(this.groupId === groupId) {  
                this.frequency = parseInt(this.frequency) + 1;
                found = true;
            }
        });
        
        if(!found) {
            groups.push({
                "groupId" : groupId,
                "frequency" : 1
            });
        }
        
        GM_setValue("groups", JSON.stringify(groups));    
    }
    
    function debug() {
        if(location.href !== "http://www.douban.com/group/mine" && location.href !== "http://www.douban.com/group/") return;
        
        var groups = getGroups();
        
        $(".ob dd a").each(function() {
            var group = getGroup($(this).attr("href").match(/\/group\/([^\/]+)\//)[1]);
            $(this).next().after("<span>[" + (group !== null ? group.frequency : 0) + "]</span>");
        });
        
        var html = "<li>自从" + GM_getValue("startDate") + "</li>";
        html += "<li>共有" + $(groups).length + "条记录</li>";
        $(groups).sort(function(a, b) {
            return a.frequency < b.frequency;
        }).each(function() {
            html += "<li><a href=\"/group/" + this.groupId + "/\">"+ this.groupId +"</a>(" + this.frequency + ")</li>";
        });
        $("#tablerm").append("<ul>" + html + "</ul>");
    }
    
    debug();
    
})();