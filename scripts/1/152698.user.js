// ==UserScript==
// @name        OGame: AH
// @namespace   AH
// @include     http://*.ogame.*/game/index.php?page=traderOverview*
// ==/UserScript==

var strFunc = (function()
{
	// ==================== Page Check & Info Box Detect
	var auctionDetectionIntervalKey;

	var checkAuctionPage = function(hash)
	{
		if (hash.indexOf("page=traderAuctioneer") != -1)
		{
			auctionDetectionIntervalKey = setInterval(detectAuctionInfoBox, 1000);
		}
		else
		{
			clearInterval(auctionDetectionIntervalKey);
		}
	};
	
	var lastInfo;
	
	var detectAuctionInfoBox = function()
	{
		var infoElement = $(".auction_info");
		if (infoElement.length == 1)
		{
			var infoText = $(".auction_info").text();
			if (infoText != lastInfo)
			{
				lastInfo = infoText;
				analysisInfo(infoText);
			}
			enhanceMaxButton();
		}
		else
		{
			clearInterval(countDownKey);
		}
	};
	
	// ==================== Info Parsing & Showing
	var timeoutKey;
	
	var analysisInfo = function(info)
	{
		if (info.indexOf("approx.") != -1)
		{
			startCountDown(parseInt(info.substring(8, info.indexOf("m"))));
		}
	};
	
	var countDownEndTime;
	var countDownKey;
	
	var startCountDown = function(minutes)
	{
		countDownEndTime = new Date().getTime() / 1000 + minutes * 60;
		clearInterval(countDownKey);
		countDownKey = setInterval(updateCountDown, 500);
		
		var itemInfo = getAuctionItem();
		notify(itemInfo.icon, minutes + " Minutes Left", itemInfo.name);
		lastMinuteNotified = false;
	};
	
	var lastMinuteNotified = false;
	
	var updateCountDown = function()
	{
		var now = new Date().getTime() / 1000;
		var delta = countDownEndTime - now;
		if (delta < 60 // 1min
			&& !lastMinuteNotified)
		{
			var itemInfo = getAuctionItem();
			notify(itemInfo.icon, "=== Last Minute ===", itemInfo.name);
			lastMinuteNotified = true;
		}
		var sign = (delta > 0 ? "-" : "+");
		delta = Math.abs(delta);
		var min = Math.floor(delta / 60);
		var sec = Math.floor(delta % 60);
		setTimeBox(sign + ("00" + min).slice(-2) + ":" + ("00" + sec).slice(-2));
	};
	
	var setTimeBox = function(timeStr)
	{
		var timeBox = $("#ah_time_box");
		var stimulusBox = $(".stimulus");
		if (stimulusBox.length == 1)
		{
			if (timeBox.length == 0)
			{
				timeBox = $('<div id="ah_time_box">' + timeStr + '</div>');
				timeBox.css("color", "#FF0000");
				timeBox.css("font-size", "300%");
				timeBox.css("font-weight", "bold");
				timeBox.appendTo(stimulusBox);
			}
			
			timeBox.text(timeStr);
		}
	};
	
	var getAuctionItem = function()
	{
		var result = {};
		result.icon = $(".image_140px img").prop("src");
		result.name = $(".image_140px img").prop("alt");
		return result;
	};
	
	var getAuctionStatus = function()
	{
		var result = {};
		
		return result;
	};
	
	// ==================== Desktop Notification
	var notificationEnabled = false;
	
	var setupNotification = function()
	{
		if (window.webkitNotifications)
		{
			if (window.webkitNotifications.checkPermission() != 0)
			{
				window.webkitNotifications.requestPermission(
					function()
					{
						notificationEnabled = true;
					});
			}
			else
			{
				notificationEnabled = true;
			}
		}
		else
		{
			notificationEnabled = false;
		}
	}
	
	var notify = function(icon, title, content)
	{
		if (notificationEnabled)
		{
			var notification = window.webkitNotifications.createNotification(icon, title, content);
			notification.show();
			setTimeout(function()
			{
				notification.cancel();
			}, 20000);
		}
	}
	
	// ==================== Button Enhancement
	var buttonEnhanced = false;
	
	var enhanceMaxButton = function()
	{
		if (!buttonEnhanced)
		{
			$(".js_sliderMetalMax")
			.unbind("click", maxButtonClickHandler)
			.bind("click", maxButtonClickHandler);
			buttonEnhanced = true;
		}
	}
	
	var maxButtonClickHandler = function(event)
	{
		if (event.altKey)
		{
			$(".pay:contains('Submit bid')").delay(300).click();
		}
	}
	
	// ==================== Setup
	$(window).bind("hashchange", function()
	{
		checkAuctionPage(window.location.hash);
	});
	
	setupNotification();
	checkAuctionPage(window.location.hash);
}).toString();

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);