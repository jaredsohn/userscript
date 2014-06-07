// ==UserScript==
// @author          blackca
// @name            eRepublik Health Limit Tooltips
// @namespace       eRepublik HLT
// @version         1.2
// @match           http://*.erepublik.com/*
// @include         http://*.erepublik.com/*
// ==/UserScript==
var HLTooptipInsert = function($, window, undefined) {
	$(document).ready(function () {
		var now=new Date();
		var foodNow=parseInt($('#eatFoodTooltip p[style="margin:0"] big.tooltip_health_limit').text().split(' / ')[0],10);
		var foodMax=parseInt($('#eatFoodTooltip p[style="margin:0"] big.tooltip_health_limit').text().split(' / ')[1],10);
		var timeMin=parseInt($('#eatFoodTooltip small#foodResetHoursContainer em#foodResetHours').text().split(':')[1],10);
		var timeSec=parseInt($('#eatFoodTooltip small#foodResetHoursContainer em#foodResetHours').text().split(':')[2],10);
		if (foodNow!=foodMax&&0==$('p#foodLimitInfo').length) {
			var nextFood=(foodNow+100*Math.ceil((foodMax-foodNow)/100))-foodMax;
			var nextHour=now.getHours()+Math.ceil((foodMax-foodNow)/100)-1;
			var nextMin=now.getMinutes()+timeMin, nextSec=now.getSeconds()+timeSec, daylight='am';
			59<nextSec&&(nextSec-=60,nextMin+=1); 59<nextMin&&(nextMin-=60,nextHour+=1);
			23<nextHour?(nextHour-=24,daylight="am"):24>nextHour&&12<nextHour&&(nextHour-=12,daylight="pm");
			10>nextSec&&(nextSec='0'+nextSec); 10>nextMin&&(nextMin='0'+nextMin); 10>nextHour&&(nextHour='0'+nextHour);
			$('#eatFoodTooltip p[style="margin:0"]').append('<p id="foodLimitInfo">Reach health limit at: <big>'+nextHour+':'+nextMin+':'+nextSec+' '+daylight+'</big> (+'+nextFood+')</p>')
		}
	})
}
// Script Insert
var script = document.createElement('script');
script.textContent = '('+HLTooptipInsert+')(jQuery, window);';
document.body.appendChild(script);