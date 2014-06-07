// ==UserScript==
// @name        eRep Division Domination
// @namespace   DivisionDomination
// @include     http://www.erepublik.com/*/military/battlefield/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.5
// ==/UserScript==

// refresh timer (second)
var nextmission=1000 * 3;

// main
$(document).ready(function () {
	$('#qonsole.console_holder .campaign_details .info p a').before('Update freq. '+parseInt(nextmission/1000)+' sec. ');
	for (j=0; j<4; j++) {
		$('#qonsole.console_holder .campaign_details .entry').eq(j).find('.cz3').before('<div class="DivisionDomin" style="position:absolute; left:311px; display:block; font-weight:bold; color:#B0AB9F; clear:both;"><span class="left" style="margin-top:0px; float:left;"></span><span class="leftDiff" style="margin-top:0px; padding-left:5px; float:right;"></span></div>');
		$('#qonsole.console_holder .campaign_details .entry').eq(j).find('.cz3').after('<div class="DivisionDomin" style="position:absolute; right:284px; display:block; font-weight:bold; color:#B0AB9F; clear:both;"><span class="rightDiff" style="margin-top:0px; padding-right:5px; float:left;"></span><span class="right" style="margin-top:0px; float:right;"></span></div>');
		3==j&&updateDivDomination();
	}	

	// remake another timmer inside the division div
	$('#qonsole.console_holder h3:first').text(unsafeWindow.SERVER_DATA.zoneElapsedTime);
	unsafeWindow.ERPK.countUp({
		display: $('#qonsole.console_holder h3:first'),
		startTime: unsafeWindow.SERVER_DATA.zoneElapsedTime,
		stopTime: '2:0:0'
	});
	// stop pop the msg 'are you still there'
	unsafeWindow.globalTick=function() { return; }	
})
function updateDivDomination() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.erepublik.com/en/military/battle-log/'+unsafeWindow.SERVER_DATA.battleId,
		onload: function(data) {
			if (getJSON(data.responseText)) {
				var json=JSON.parse(data.responseText);
				for (i=0; i<4; i++) {
					var domination=json['division']["domination"][i+1], dominationR, dominationL;
					var domLeftCache=$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .left').text();
					var domRigtCache=$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .right').text();
					if(unsafeWindow.SERVER_DATA.mustInvert) {
						dominationL=parseFloat(100-domination).toFixed(2);
						dominationR=parseFloat(domination).toFixed(2);
					} else {
						dominationL=parseFloat(domination).toFixed(2);
						dominationR=parseFloat(100-domination).toFixed(2);
					}
					''==domLeftCache?$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .left').text(dominationL):domLeftCache<dominationL?($('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .left').text(dominationL).css('color','#6E9C08'),$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .leftDiff').text('+').css('color','#6E9C08')):domLeftCache>dominationL?($('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .left').text(dominationL).css('color','#F95555'),$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .leftDiff').text('-').css('color','#F95555')):$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .leftDiff').text('');
					''==domRigtCache?$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .right').text(dominationR):domRigtCache<dominationR?($('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .right').text(dominationR).css('color','#6E9C08'),$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .rightDiff').text('+').css('color','#6E9C08')):domRigtCache>dominationR?($('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .right').text(dominationR).css('color','#F95555'),$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .rightDiff').text('-').css('color','#F95555')):$('#qonsole.console_holder .campaign_details .entry').eq(i).find('.DivisionDomin .rightDiff').text('');
				}
			}
			setTimeout(function(){ updateDivDomination(); }, nextmission);
		},
		onerror: function(data) {
			$('#qonsole.console_holder .campaign_details .entry .DivisionDomin .leftDiff').text('?').css('color','#B0AB9F');
			$('#qonsole.console_holder .campaign_details .entry .DivisionDomin .rightDiff').text('?').css('color','#B0AB9F');
			setTimeout(function(){ updateDivDomination(); }, nextmission);
		}
	})
}
function getJSON(json) {
	json = json.replace(/\\["\\\/bfnrtu]/g, '@');
	json = json.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
	json = json.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
	return (/^[\],:{}\s]*$/.test(json))
}