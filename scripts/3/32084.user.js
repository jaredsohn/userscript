// ==UserScript==
// @name           kick it out
// @namespace      com.ro4tub
// @description    parking your cars automatically on www.kaixin001.com
// ==/UserScript==


GM_log("== created by Oscar Huang ==");
var friends = 0;
var totalFriends = 0;
var cars = 0;
var totalCars = 0;
var nextFriendIndex = 5;
var nextCarIndex = 0;

function onTimer()
{
	GM_log('gotouser: name=' + friends[nextFriendIndex]['real_name'] + ', uid=' + friends[nextFriendIndex]['uid']);
	unsafeWindow.gotouser(friends[nextFriendIndex]['uid']);
	nextFriendIndex = (nextFriendIndex + 1)%totalFriends;
}

var oldgotouserAjaxShow = unsafeWindow.gotouserAjaxShow;
unsafeWindow.gotouserAjaxShow = function(req)
{
	GM_log('begin gotouserAjaxShow');
	eval("mydata="+req.responseText);

	oldgotouserAjaxShow(req);
	var first_free_parking = mydata["user"]["first_free_parking"];
	GM_log('first_free_parking=' + first_free_parking);
	
	var parking = mydata["parking"];
	var validParkingId = 0;
	for(var i = 0; i < parking.length; i++)
	{
		// if(i == first_free_parking)
			// continue;
		
		if(parking[i]['carid'] == 0)
		{
			var tmpParkId= parking[i]['parkid'];
			if((parseInt(tmpParkId) >> 16) & 0xff)
			{
				GM_log('free parking');
				continue;
			}
			validParkingId = tmpParkId;
			break;
		}
	}
	
	if(validParkingId != 0)
	{
		GM_log("validParkingId = " + validParkingId);
		unsafeWindow.g_curparkid = validParkingId;
		GM_log('parking_park_ex: carid=' + cars[nextCarIndex]['carid']);
		unsafeWindow.parking_park_ex(cars[nextCarIndex]['carid']);
		nextCarIndex = (nextCarIndex + 1)%totalCars;
	}else
    {
        //Can't find valid parkingId, then cotinue to try to find valid one
        onTimer();
    }
	GM_log('end gotouserAjaxShow');
}

unsafeWindow.onload = function()
{
	friends = unsafeWindow.v_frienddata;
	totalFriends = friends.length;
	cars = unsafeWindow.v_userdata["car"];
	totalCars = cars.length;
}

window.setInterval(onTimer, 600000);