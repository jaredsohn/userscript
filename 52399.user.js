// ==UserScript==
// @name           Twitter Real Time
// @namespace      http://pto2k.blogspot.com
// @description    for the people care for the time (powered by jQuery/timeago)
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://timeago.yarp.com/jquery.timeago.js
// ==/UserScript==

//http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}

function convertTime(){
	logToConsole('converting...')
	var ct = 0
	$('.published:not(.converted)').each(function(){
		ct++;
		var timeInit = new Date();
		var timeTwit = $(this).text();
		var timeDiff = 0;
		if (/\d minutes ago/.test(timeTwit)){//
			timeDiff = $(this).text().match(/\d+/)[0]*60*1000
		}else if (/half a minute ago/.test(timeTwit)){//
			timeDiff = 30*1000
		}else if (/[1a] minute ago/.test(timeTwit)){//
			timeDiff = 60*1000
		}else if (/\d seconds ago/.test(timeTwit)){//
			timeDiff = $(this).text().match(/\d+/)[0]*1000
		}else if (/\d hours ago/.test(timeTwit)){//
			timeDiff = $(this).text().match(/\d+/)[0]*3600*1000
		}else if (/[1a] hour ago/.test(timeTwit)){//
			timeDiff = 3600*1000
		}else{
			logToConsole($(this).text())
			//break;
		}
		timeInit.setTime(timeInit.getTime() - timeDiff)
		var yea = timeInit.getFullYear()
		var mon = (timeInit.getMonth()<10?'0':'')+(timeInit.getMonth()+1)
		var dat = (timeInit.getDate()<10?'0':'')+timeInit.getDate()
		var hor = (timeInit.getHours()<10?'0':'')+timeInit.getHours()
		var min = (timeInit.getMinutes()<10?'0':'')+timeInit.getMinutes()
		var sec = (timeInit.getSeconds()<10?'0':'')+timeInit.getSeconds()
		timeInit.setTime(timeInit.getTime() + timeInit.getTimezoneOffset()*60*1000)
		var yeaISO = timeInit.getFullYear()
		var monISO = (timeInit.getMonth()<10?'0':'')+(timeInit.getMonth()+1)
		var datISO = (timeInit.getDate()<10?'0':'')+timeInit.getDate()
		var horISO = (timeInit.getHours()<10?'0':'')+timeInit.getHours()
		var minISO = (timeInit.getMinutes()<10?'0':'')+timeInit.getMinutes()
		var secISO = (timeInit.getSeconds()<10?'0':'')+timeInit.getSeconds()
		$(this).html('<abbr class="timeago" title="'+
		yeaISO+'-'+monISO+'-'+datISO+'T'+horISO+':'+minISO+':'+secISO+'Z">...</abbr>'+ ' | '+ yea+'-'+mon+'-'+dat+' '+hor+':'+min+' | ')
		$(this).addClass('converted')
	})
	logToConsole(ct+' hits.')
}
convertTime();
jQuery(document).ready(function($) {
	$('.timeago').timeago();
	$('.timeago').addClass('done');
});

setInterval(function(){
	convertTime();
	$('.timeago:not(.done)').timeago();
	$('.timeago:not(.done)').addClass('done');
}, 23456)