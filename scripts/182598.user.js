// ==UserScript==
// @name        eRepublik AutoEat By MC46
// @include     http://www.erepublik.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @version     1.3
// ==/UserScript==


// ------------------Configurable Variables------------------
var refreshTime = 30 //check timer, in seconds
// ------------------Configurable Variables------------------


var Last_Check_Time = GM_getValue("Last_Check_Time", false);
var curtime;
if (!Last_Check_Time) {
	curtime = new Date().getTime();
	curtime = String(curtime);
	GM_setValue("Last_Check_Time", curtime);
	Last_Check_Time = GM_getValue("Last_Check_Time", false);
}

var strtoken = $('.user_health').find('input').eq(0).attr('value');
var strurl = "http://www.erepublik.com/en/main/eat?format=json&_token="+strtoken+"&jsoncallback=?";
var id,id2;
var intWelness,intMaxHealth,intsmallestFood;

id = window.setInterval(checkTimeToken,refreshTime*1000);
id2 = window.setInterval(appendTimer,1000);
var checkTimer = refreshTime;

$('.user_health').after('<div id="auto_recover" style="font-style: normal;color: rgb(102, 102, 102);text-align: center;background-position: 0px -51px;position: relative;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;float: left;width: 153px;margin-bottom: 7px;background-image: url(\'/images/modules/sidebar/boxes.png?1333974834\');padding: 0px;font-family: Arial,Helvetica,sans-serif;font-size: 10px;font-weight: bold;"><em id="checkResetHours"></em><br><em id="FailReason"></em><br><div>');

function appendTimer() {
	checkTimer--;
	$('#checkResetHours').text('Check in '+checkTimer+' seconds.');
}

function checkTimeToken() {
	Last_Check_Time = GM_getValue("Last_Check_Time", new Date().getTime());
	if ((new Date().getTime() - Last_Check_Time)>refreshTime*1000) {
		curtime = new Date().getTime();
		curtime = String(curtime);
		GM_setValue("Last_Check_Time", curtime);
		updateHealth();
	}
}

function updateHealth() {
	clearInterval(id);
	clearInterval(id2);
	checkTimer = refreshTime;
	$('#checkResetHours').text('Updating Health');
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.erepublik.com/en',
		onload: function(r) {
			var startpos = r.responseText.indexOf('smallestFood = ');
			var startpos = r.responseText.indexOf('"use":',startpos);
			var endpos = r.responseText.indexOf(';',startpos);
			var strsmallestFood = r.responseText.substr(startpos,endpos-startpos);
			intsmallestFood = strsmallestFood.match(/[0-9]{1,}/);
			
			$('.health_bar').html($(r.responseText).find('.health_bar').eq(0).html());
			$('#DailyConsumtionTrigger').html($(r.responseText).find('#DailyConsumtionTrigger').eq(0).html());
			window.setTimeout(checkHealth,1000);
		}
	});
}

function checkHealth() {
	$('#FailReason').text('');
	var intCurrentHealth = parseInt($('#current_health').text().split('/')[0]);
	var intMaxHealth = parseInt($('#current_health').text().split('/')[1]);
	
	var strButtonText = $('#foodText').text();
	//Recover Energy
	//Energy Bar
	
	
	if (intCurrentHealth < intMaxHealth) {
		if (strButtonText=='Recover Energy' || strButtonText=='Възстанови енергия' ) {
			if ($('#DailyConsumtionTrigger').hasClass('energy')) {
				$('#DailyConsumtionTrigger').removeClass('energy');
			}
			if ((intMaxHealth-intCurrentHealth)>intsmallestFood) {
				GM_xmlhttpRequest({
					method: "GET",
					url: strurl,
					onload: function(r) {
						id = window.setInterval(checkTimeToken,refreshTime*1000);
						id2 = window.setInterval(appendTimer,1000);
					}
				});
			} else {
				$('#FailReason').text('Health To Recover < Smallest Food');
				id = window.setInterval(checkTimeToken,refreshTime*1000);
				id2 = window.setInterval(appendTimer,1000);
			}
		} else {
			if (!$('#DailyConsumtionTrigger').hasClass('energy')) {
				$('#DailyConsumtionTrigger').addClass('energy');
			}
			$('#FailReason').text('Button Text <> Recover Energy');
			id = window.setInterval(checkTimeToken,refreshTime*1000);
			id2 = window.setInterval(appendTimer,1000);
		}
	} else {
		$('#FailReason').text('');
		id = window.setInterval(checkTimeToken,refreshTime*1000);
		id2 = window.setInterval(appendTimer,1000);
	}
}
