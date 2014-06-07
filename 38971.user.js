// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Kaixin Godfather Assistant
// @namespace       http://cuimingda.com
// @description     Enhance the "Godfather Game" at kaixin.com
// @include         http://gf.kaixin.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// 0.1 @ 2008/12/20 # Initial Release
// 0.2a @ 增加家族创业模式、招兵买马模式，火拼列表自动排序，黑市和地产显示成本价（不完善）
// --------------------------------------------------------------------------------

;(function() {
    $(function() {
        if(currentPage.isAll)   quicklyAddFriends();
        if(currentPage.isAll)   quicklyAddAll();
        if(currentPage.isStore) computeCost();
        if(currentPage.isCity)  computeBuildingCost();
        if(currentPage.isFight) sortFighters();
    });
    
    var currentPage = {
        isStore : location.href.match(/(?:store|buyEquip|soldEquip)\.do$/),
        isCity  : location.href.match(/(?:city|buyCity|soldCity)\.do$/),
        isFight : location.href.match(/fight\.do$/),
        isAll   : true
    };
    
    var settings = {
        reUser : /\/status\.do\?userId=(\d+)/
    };
    
    var Fighter = function(id, count) {
        this.id = id;
        this.count = count;
    };
    
    Fighter.prototype.toString = function() {
        return this.id + "(" + this.count + ")";
    };

    // 开启招兵买马模式以后，只要点击用户名，就直接发出好友申请
    var quicklyAddFriends = function() {
        $("#s_links").prepend("<span>|</span>");
        
        $("<a href=''>招兵买马</a>").prependTo($("#s_links")).click(function(event) {
            event.preventDefault();
            
            $("a[href*=status.do?userId]").click(function(event) {
                var id = $(this).attr("href").match(settings.reUser)[1];
                var link = $(this);

                $.post("newSingleInvite.do", { friendIDS:id }, function(data, textStatus) {
                     link.text("#" + textStatus + "#");
                });
                event.preventDefault();
            });
            
            alert("已启动招兵买马模式，点击用户名直接发出好友邀请。");
        });
    };
    
    // 向当前页面出现的所有玩家发出好友邀请
    var quicklyAddAll = function() {
        $("#s_links").prepend("<span>|</span>");
        
        $("<a href=''>家族创业</a>").prependTo($("#s_links")).click(function(event) {
            event.preventDefault();
            
            var friends = [];
            $("a[href*=status.do?userId]:not(:has(img))").each(function() {
                friends.push($(this).attr("href").match(settings.reUser)[1]);
            });
            
            if(friends.length !== 0) {
                $.post("invite.do", { friendIDS:friends.join(",") }, function() {
                     alert("已向" + friends.length + "位玩家发出了家族申请！");
                });
            }
            else {
                alert("没有在当前页面找到任何玩家信息！");
            }
        });
    };
    
    // 计算黑市商品成本价。
    var computeCost = function() {
        $(".price").each(function() {
            var price = parseInt($(this).text().match(/\d+/));
            var attack = parseInt($(this).parent().next().text().match(/\d+/));
            var defend = parseInt($(this).parent().next().next().text().match(/\d+/));
            
            var cost = Math.round(price / (attack + defend));
            
            $(this).parent().parent().append("<p>成本：$" + cost + "/点</p>");
        });
    };
    
    // 计算房产成本价。
    var computeBuildingCost = function() {
        $(".price").each(function() {
            var price = parseInt($(this).text().match(/\d+/));
            var income = parseInt($(this).parent().next().text().match(/\d+/));
            var buildingType = $(this).parent().next().next().find("em:first").text();
            
            var groundPrice = 0;
            
            if(buildingType === "空地") {
                groundPrice = 5000;
            }
            else if(buildingType === "城市地段") {
                groundPrice = 50000;
            }
            else if(buildingType === "中心广场") {
                groundPrice = 1000000;
            }
            else if(buildingType === "海滨空地") {
                groundPrice = 4000000;
            }
            else if(buildingType === "集装箱码头") {
                groundPrice = 6000000;
            }
            else {
                groundPrice = 0;
            }
            
            var cost = Math.round((price + groundPrice) / income);
            
            GM_log(price + " - " + groundPrice + " - " + income + " - " + cost);
            
            $(this).parent().parent().append("<p>成本：$" + cost + "</p>");
        });
    };
    
    // 对火拼列表进行排序，把家族人数上的放前面。
    var sortFighters = function() {
        var fighters = [];
        
        $(".item_table td>a[href*=status.do?userId]").each(function() {
            var id = $(this).attr("href").match(settings.reUser)[1];
            var count = parseInt($(this).parent().next().next().text().match(/\d+/));
            
            fighters.push(new Fighter(id, count));
        });
        
        fighters.sort(function(a, b) {
            return b.count - a.count;
        });
        
        for(var i=0; i<fighters.length; i++) {
            $(".item_table td>a[href*=" + fighters[i].id + "]").parent().parent().insertAfter($(".item_table tr:first"));
        }
    };
})();