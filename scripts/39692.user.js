// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Kaixin001 Valet Parking
// @namespace       http://cuimingda.com
// @description     In the "Parking Game", park your cars as soon as possiable.
// @include         http://www.kaixin001.com/app/app.php?aid=1040
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require         http://www.json.org/json2.js
// ==/UserScript==
//
// 0.1 @ 2009/01/02 # Initial Release
// 0.2 @ 2009/01/03 # Support free park
// --------------------------------------------------------------------------------

;(function() {
    $('#r2_2').empty();
    
    $(document).ready(function() {
        clearInterval(unsafeWindow.g_checkswf);
    });
    
    var insertNavigation = function() {
        var arr = []
        
        arr.push("<a href='/app/app.php?aid=1040&url=index.php'>原版首页</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=market.php'>车市</a>");
        arr.push("<a id='mypark' href=''>我的停车位</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=mycard.php'>我的道具</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=card.php'>道具商店</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=rank.php'>现金排行</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=rank.php&order=price'>车价排行</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=myteam.php'>拉力赛</a>");
        arr.push("<a href='/app/app.php?aid=1040&url=help.php'>帮助</a>");
        
        $("#r2_2").append("<div>" + arr.join("&nbsp;&nbsp;&nbsp;&nbsp;") + "</div>");
        
        $("#mypark").click(function(event) {
            event.preventDefault();
            refreshPark(unsafeWindow.v_userdata.user.uid);
        });
    };
    
    var insertPark = function() {
        var html = "<p style='margin-top:20px;'><strong>停车场<span id='parkinfo'></span></strong></p><p id='park'>";
        
        for(var i=0; i<4; i++) {
            html += "<span id='park_" + i + "'>闲置</span>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        
        $("#r2_2").append(html + "</p>");
        
        refreshPark(unsafeWindow.v_userdata.user.uid);
    };
    
    var isFreePark = function(parkId) {
        return ((parseInt(parkId) >> 16) & 0xff) === 1;
    };
    
    var refreshPark = function(friendId) {
        $.post("/parking/user.php", { puid:friendId, verify:unsafeWindow.g_verify, anticache:Math.floor(Math.random()*1000) }, function(data) {
            var userdata = JSON.parse(data);
            var parking = userdata.parking;
            
            for(var i=0; i<4; i++) {
                
                if(userdata.user.uid == unsafeWindow.v_userdata.user.uid) {
                    if(parking[i].car_real_name === "") {
                        $("#park_" + i).text(isFreePark(parking[i].parkid) ? "免费" : "闲置");
                    }
                    else {
                        $("#park_" + i).html("<a class='post' parkid='" + parking[i].parkid + "' href=''>" + parking[i].car_real_name + "(" + parking[i].car_profit +")</a>");
                    }
                }
                else if(parking[i].car_real_name === "") {
                    if(isFreePark(parking[i].parkid)) {
                        $("#park_" + i).text("免费");
                    }
                    else {
                        $("#park_" + i).html("<a class='emptypark' friendid='" + userdata.user.uid + "' parkid='" + parking[i].parkid + "' href=''>停车</a>");
                    }
                }
                else {
                    $("#park_" + i).text(parking[i].car_real_name + "(" + parking[i].car_profit +")");
                }
            }
            $("#parkinfo").text(" - " + userdata.user.real_name);
            $("#park a.emptypark").click(parkingClickHandler);
            $("#park a.post").click(postClickHandler);
        });
    };
    
    var parkingClickHandler = function(event) {
       event.preventDefault();
        
        var parms = {
                          acc : unsafeWindow.acc(),
                        carid : $("#carlist td:first").attr("carid"),
            first_fee_parking : '0',
                     neighbor : '0',
                     park_uid : $(this).attr("friendid"),
                       parkid : $(this).attr("parkid"),
                       verify : unsafeWindow.g_verify,
                    anticache : Math.floor(Math.random()*1000)
        };
        
        $.post("/parking/park.php", parms, function(data) {
            var result = JSON.parse(data);
            
            if(result.errno === 0) {
                if(result.ctime) {
                    refreshList(parms.park_uid, true, true, true);
                }
                else {
                    alert("点的太快了！");
                }
            }
            else {
                alert(result.error);
            }
        });
    };

    var postClickHandler = function(event) {
       event.preventDefault();
        
        var parms = {
                  acc : unsafeWindow.acc(),
               parkid : $(this).attr("parkid"),
               verify : unsafeWindow.g_verify,
            anticache : Math.floor(Math.random()*1000)
        };
        
        $.post("/parking/post.php", parms, function(data) {
            var result = JSON.parse(data);
            
            if(result.errno === 0) {
                refreshList(unsafeWindow.v_userdata.user.uid, true, true, true);
            }
            else {
                alert(result.error);
            }
        });
    };
    
    var refreshList = function(friendId, isPark, isFriend, isCar) {
        if(!friendId) friendId = "0";
        
        $.get("/app/app.php?aid=1040&anticache=" + Math.floor(Math.random()*1000), function(data){
            var userdata = JSON.parse(data.match(/var\sv_userdata\s=\s([^;]+)/)[1]);
            var frienddata = JSON.parse(data.match(/var\sv_frienddata\s=\s([^;]+)/)[1]);
            
            if(isPark) refreshPark(friendId);
            if(isFriend) refreshFriendList(frienddata);
            if(isCar) refreshCarList(userdata, friendId);
        });
    };

    var refreshFriendList = function(frienddata) {
        if($("#friendlist").length === 0) {
            $("#r2_2").append("<p style='margin-top:20px;'><strong>好友列表</strong></p>" + getFriendListBody(frienddata));
        }
        else {
            $("#friendlist").replaceWith(getFriendListBody(frienddata));
        }
        
        $(".friend").click(function(event) {
            event.preventDefault();
            refreshList($(this).attr("friendid"), true, true, true);
        });
    };
        
    var getFriendListBody = function(frienddata) {
        var html = "";
        
        frienddata.sort(function(a, b) {
            return b.scenemoney - a.scenemoney;
        });
        
        $(frienddata).each(function() {
            if(this.full === "0") {
                html += "<a href='' class='friend' friendid='" + this.uid + "'>" + this.real_name + "</a>(" + this.scenemoney +")&nbsp;&nbsp;"
            }
        });
        
        return "<p id='friendlist'>" + html + "</p>";
    };  

    var refreshCarList = function(userdata, friendId) {
        if(!friendId) friendId = "0";
              
        
        if($("#carlist").length === 0) {
            $("#r2_2").append("<p style='margin-top:20px;'><strong>我的汽车</strong></p><table id='carlist' style='width:300px;'>" + getCarListBody(userdata) + "</table>");
        }
        else {
            $("#carlist tbody").replaceWith(getCarListBody(userdata, friendId));
        }
    };
    
    var getCarListBody = function(userdata, friendId) {
        var html = "<tbody>";
        
        if(!friendId) {
            $(userdata.car).each(function() {
                this.sortId = this.park_profit;
            });
        }
        else {
            $(userdata.car).each(function() {
                var sameCount = 0;
                var  parkingFriendId = this.park_uid;
                
                $(userdata.car).each(function() {
                    if(this.park_uid == parkingFriendId && parseInt(this.park_profit) >= 150) {
                        sameCount++;
                    }
                });
                this.sameCount = sameCount === 0 ? -1 : sameCount;
                
                this.sortId = this.sameCount * 100 + parseInt(this.park_moneyminute);
                
                if(parseInt(this.park_profit) < 150) {
                    this.sortId = 2;
                }
                
                if(this.park_uid === friendId) {
                    this.sortId = 1;
                }
                
                if(this.park_real_name === "") {
                    this.sortId = 3;
                }
                
            });
        }
        
        userdata.car.sort(function(a, b) {
            return b.sortId - a.sortId;
        });
        
        $(userdata.car).each(function() {
            html += "<tr>";
            html += "<td carid='" + this.carid  + "' park_uid='"+ this.park_uid +"'>" + this.car_name + "</td>";
            html += "<td>" + this.park_profit + "</td>";
            html += "<td>" + this.park_real_name === "" ? "漂泊" : this.park_real_name + "</td>";
            html += "<td>" + this.park_moneyminute + "元/分钟</td>";
            html += "</tr>";
        });
        html += "</tbody>";
        
        return html;
    };
    
  
             insertNavigation();   
    insertPark();
    refreshFriendList(unsafeWindow.v_frienddata);
    refreshCarList(unsafeWindow.v_userdata);


})();