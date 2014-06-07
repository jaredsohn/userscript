// ==UserScript==
// @name           WS
// @namespace      WS
// @include        http://fb.warstorm.com/battle/automatch_results
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.10
// ==/UserScript==
// start at: http://fb.warstorm.com/battle/automatch_results

var times=1000;
var ShowResult=1; // 1:show result url, 0:don't show
var DELAY=90;  // auto match every 60 secs
var SLEEP=300;  // sleep 300 secs when match limit exceeded
var my_id = '4b2222fa-062c-4a51-8561-6bbfac10xxxx';
var wsURL = 'http://fb.warstorm.com/battle/automatch?squad1=4b4c01ef-4aec-6a7c-a540-1330ac101a39&squad2=4b31ece8-ea98-7c6b-8d5a-11a0dd101a28';
var wins = 0, matches = 0, silver = 0, exp = 0;

function ws() {
	$.get(wsURL, function(data) {
            	receive(data);
        });

}

function receive(data) {
	var URL = $('url',data).text();
	var reason = $('reason',data).text();
	if(reason == 'Match limit exceeded') {
		GM_log('Match limit exceeded! we will back after '+(SLEEP/60).toFixed(0)+' mins');
		return setTimeout(ws, SLEEP*1000);
		//exit();
	}
	if(URL=='') {
		var message = $('challengegames',data).find('message');
		var winner = message.find('battle').find('winner').text();
		var earn_silver = message.find('winnings').find('currencies').find('currency').find('value').text();
		var earn_exp = message.find('winnings').find('experience').text();
		var xml = message.find('battle').find('s3_battle_url').text();
		var result;
		if( xml == '') {
			GM_log("something wrong! we'll try later");
			return setTimeout(ws, DELAY*1000);
		}
		if(earn_silver!="") silver += parseInt(earn_silver);
		if(earn_exp!="") exp += parseInt(earn_exp);
		if(winner == my_id) {
			wins++;
			result = "We WIN!";
		} else result = "We Loss!";
		matches++;
		times--;
		win_percent = (wins/matches*100).toFixed(1);
		GM_log("done, times="+times+", matches="+matches+", "+result+", wins="+wins+" ("+win_percent+"%), silver="+silver+", exp="+exp);
		if(ShowResult) GM_log("http://apps.facebook.com/warstorm/play/view/?loadBattle="+xml);
		if(times>0) return setTimeout(ws, DELAY*1000);
		else exit();
	}

	//GM_log("url= "+URL);	
	$.get(URL, function(data) {
		receive(data);
	});

}

GM_registerMenuCommand("fight", ws );

