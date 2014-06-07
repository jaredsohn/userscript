// ==UserScript==
// @name           Parking all cars by one-click
// @description    Parking all cars by one-click on www.kaixin001.com
// @include        http://*.kaixin001.com/!parking/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

// Written by Qinull, you can contact me by qinull@gmail.com.
// Welcome to my blog: http://qinull.cnblogs.com/

// Disable the GM_log function.
//GM_log = function(){};

document.title = "Parking...";

var positionElement = $("#returnmystreet_show");

if (positionElement[0])
{
    var parkedCarNumber = 0;
    var nextFriendIndex = 0;
    var nextCarIndexToPark = 0;
    
    var cars = unsafeWindow.v_userdata["car"];
    var friends = unsafeWindow.v_frienddata;
    
    // Add our own button.
    positionElement.parent().after("<a id='startParkInGM' class='sl2'href=''>一键停车</a>");
    
    $("#startParkInGM").click(function(event) {
    event.preventDefault();
    
    GM_log("--------Start[" + (new Date()).toString() + "]");
    
    var sWidth,sHeight;
    sWidth = document.body.offsetWidth;
    sHeight = document.body.offsetHeight;    
    var bgDiv = "<div id='bgDivAddedInGM' style='position:absolute; top:0; background-color:#777; filter:progid:DXImagesTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75); opacity:0.6; left:0; width:" + sWidth + "px; height:" + sHeight + "px; z-index:10000;'></div>";
    $("body").append(bgDiv);
    
    var statusDiv = "<div id='statusDivInGM' align='center' style='background-color:white; border:1px solid #336699; position:absolute; left:50%; top:50%; margin-left:-225px; margin-top:npx; width:400px; height:100px; text-align:center; line-height:25px; z-index:100001;overflow:auto'>正在处理中，请稍候。。。。。。<br>如想退出，请按F5键刷新！</div>";
    $("body").append(statusDiv);
//    $("#statusDivInGM").append("<br>aaaaaaaaaa");
//    $("#statusDivInGM").append("<br>aaaaaaaaaa");
//    return;    
        
    parkedCarNumber = 0;   
    findCarToPark();        
    });
    
    var findCarToPark = function()
    {
        nextFriendIndex = 0;

        for (var i = 0; i < cars.length; i++)
        {
            var parkUid = parseInt(cars[i]['park_uid']);
            var parkProfit = parseInt(cars[i]['park_profit']);
                        
            // Only move car has parked over 15 minutes.
            if (parkProfit > 200
            // Consider the car don't park anywhere.
            || (parkUid == 0 && parkProfit == 0))
            {
                nextCarIndexToPark = i;
                
                GM_log("----Park car " + cars[i]['car_name'] + "[" + parkProfit + "]");
                if (parkUid > 0)
                {
                    for (var j = 0; j < friends.length; j++)
                    {
                        if (parkUid == parseInt(friends[j]['uid']))
                        {
                            GM_log("Has been parked in user " + friends[j]['real_name']);
                            break;
                        }
                    }
                }
                
                findFriendToPark();
                
                return;
            }
        }
        
        $("#bgDivAddedInGM").remove();
        $("#statusDivInGM").remove();
        
        if (parkedCarNumber == 0)
        {
            alert("郁闷，一辆车都没搞定！或者，你的车暂时都不用重新找车位？");
        }
        else
        {
            alert("哇咔咔，搞定了" + parkedCarNumber + "辆车!");
            document.location.reload();
        }
        GM_log("----Totally parked " + parkedCarNumber + " cars.");        
        GM_log("--------Over[" + (new Date()).toString() + "]");        
    }
    
    var findFriendToPark = function()
    {
        while (nextFriendIndex < friends.length)
        {
// GM_log("***************go to user: " + friends[nextFriendIndex]['real_name']);           
            // can't park twice in same user.
            if (cars[nextCarIndexToPark]['park_uid'] != friends[nextFriendIndex]['uid'])
            {            
                GM_log("Try to park to friend " + friends[nextFriendIndex]['real_name']);
                
                $.post("/parking/user.php", { puid:friends[nextFriendIndex]['uid'], verify:unsafeWindow.g_verify }, function(req){processUserData(req);});
                
                return;                   
            }
            
            nextFriendIndex++;
        }
        
        if (nextFriendIndex >= friends.length)
        {
            GM_log("----No available parking position.");
        }
        
        findCarToPark();        
    }
    
    var processUserData = function(req)
    {
        eval("userData="+req);
// GM_log("***************arrive user: " + friends[nextFriendIndex]['real_name']);                   
        
        var parking = userData["parking"];
        var validParkingId = 0;
        for(var i = 0; i < parking.length; i++)
        {            
            if(parking[i]['carid'] == 0)
            {
                var tmpParkId= parking[i]['parkid'];
                if((parseInt(tmpParkId) >> 16) & 0xff)
                {
                    // free parking
                    continue;
                }
                validParkingId = tmpParkId;
                break;
            }
        }

        if(validParkingId != 0)
        {
            var paras = {
                              acc : unsafeWindow.acc(),
                            carid : cars[nextCarIndexToPark]['carid'],
                first_fee_parking : '0',
                         neighbor : '0',
                         park_uid : userData['user']['uid'],
                           parkid : validParkingId,
                           verify : unsafeWindow.g_verify
            };
// GM_log("***************Park paras: " + unsafeWindow.acc() + "," + cars[nextCarIndexToPark]['carid'] + "," + userData['user']['uid'] + "," + validParkingId + "," + unsafeWindow.g_verify);                   
            $.post("/parking/park.php", paras, function(req){processParkingResult(req);});
        }
        else
        {
            nextFriendIndex++;
//            findFriendToPark();
            setTimeout(function(){findFriendToPark();}, 500);
        }       
    }
    
    var processParkingResult = function(req)
    {
// GM_log("***************Parking Result: " + req.toString());           
        eval("data=" + req);
        var errno = parseInt(data["errno"]);
        if (errno)
        {
            GM_log("Park the car named " + cars[nextCarIndexToPark]['car_name'] + " to user " + friends[nextFriendIndex]['real_name'] + " failed: " + data["error"]);
        }
        else if (!data["ctime"])
        {
            GM_log("Park the car named " + cars[nextCarIndexToPark]['car_name'] + " to user " + friends[nextFriendIndex]['real_name'] + " failed: ctime[" + data["ctime"] + "]");
        }
        else
        {
            GM_log("Park the car named " + cars[nextCarIndexToPark]['car_name'] + " to user " + friends[nextFriendIndex]['real_name'] + " successful!");
            parkedCarNumber++;
            
            prioritizeParkingToThisFriend(cars[nextCarIndexToPark]["park_uid"]);
            
            cars[nextCarIndexToPark]["neighbor"] = data["neighbor"];
            cars[nextCarIndexToPark]["park_uid"] = data["park_uid"];
            cars[nextCarIndexToPark]["parkid"] = data["parkid"];
            cars[nextCarIndexToPark]["ctime"] = data["ctime"];
            cars[nextCarIndexToPark]["park_real_name"] = unsafeWindow.g_curreal_name;
            cars[nextCarIndexToPark]["park_logo20"] = unsafeWindow.g_curlogo20;
            cars[nextCarIndexToPark]["park_profit"] = 0;
            cars[nextCarIndexToPark]["park_moneyminute"] = data["moneyminute"];          
        }
        
//        findCarToPark();
        setTimeout(function(){findCarToPark();}, 5000);    
    }

    var prioritizeParkingToThisFriend = function(uid)
    {
        var friendCount = friends.length;
        var index = -1;
        var friend;
        for (var j = 0; j < friendCount; j++)
        {
            if (uid == parseInt(friends[j]['uid']))
            {
                index = j;
                friend = friends[j];
                break;
            }
        }
        
        if (index != -1)
        {
            for (var j = friendCount - 1; j >= 0; j--)
            {
                if (j < index)
                {
                    friends[j + 1] = friends[j];
                }
            }
            friends[0] = friend;
        }
    }
}
