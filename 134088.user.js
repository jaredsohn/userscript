// ==UserScript==
// @name                        douban_procrastination_helper_book_only
// @namespace              		douban_procrastination_helper_book_only
// @version                     1.1.1
// @author                      Mescoda on http://mescoda.com/
// @description              	http://userscripts.org/scripts/show/133988 的读书版
// @reason						bug fix
// @include                     http://*.douban.com/*
// @exclude                     http://img3.douban.com/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require						http://autoupdate.sinaapp.com/autoupdatehelper.js
// ==/UserScript==

typeof(Updater)!='undefined' && new Updater({name: "douban_procrastination_helper_book_only",id: "134088",version: "1.1.1"}).check();

function getCookie(c_name){
	if (document.cookie.length > 0){
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start!=-1){ 
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(';',c_start);
			if (c_end == -1){ c_end = document.cookie.length;}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return '';
};

function getUserName(){
	var ck = getCookie('ck'), mixName = GM_getValue('mixName', false);
	if(ck){
		if(mixName && mixName.indexOf('@'+ck) > 0){
			return mixName.replace('@'+ck, '');
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.douban.com/mine/',
			onload: function(resp){
				if(resp.status < 200 || resp.status > 300) {return;};
				var name = String(resp.responseText).match(/douban\.com\/people\/([^\/]+)\//i)[1];
				GM_setValue('mixName', name + '@' + getCookie('ck'));
				return name;
			}
		});
	}
	return false;
};

function getUpdatedMax(start,during) {
	var earlierMS = new Date(start-during);
	var earlierYear = earlierMS.getFullYear();
	var earlierMonth = earlierMS.getMonth()+1;
	var earlierFullMonth = (earlierMonth<10) ? '0' + earlierMonth : earlierMonth;
	var earlierDate = earlierMS.getDate();
	var earlierFullDate = (earlierDate<10) ? '0' + earlierDate : earlierDate;
	var updatedMax = earlierYear+'-'+earlierFullMonth+'-'+earlierFullDate+'T00:00:00+08:00';
	return updatedMax;
}

function getRandomSeq(n,min,max) {
	var nums = [];
	var a;
	do {
		a = Math.floor(min+Math.random()*max);
		if (!contains(nums,a)) {
			nums.push(a);
		}
	} while(nums.length < n)
	return nums;
}

function contains(array,n) {
	for (var i = 0; i < array.length; i++) {
		if(array[i] == n) {
			return true;
		}
	}
	return false;
}

function insertPage(jsonString,cat,status,words,go,measure) {
	var json = eval('('+jsonString+')');
	var itemsPerPage = json['opensearch:itemsPerPage'].$t;
	var totalResultsNum = json['opensearch:totalResults'].$t;
	var resultsNum = json.entry.length;
	if(+resultsNum > 0) {
		var showNum = (+resultsNum > 5) ? 5 : resultsNum;
		var moreNum = totalResultsNum - showNum;
		if(resultsNum < 5) {
			var showNumSeq = getRandomSeq(resultsNum,0,resultsNum);
		} else if(resultsNum > 50) {
			var showNumSeq = getRandomSeq(5,0,50);
		} else {
			var showNumSeq = getRandomSeq(5,0,resultsNum);
		}
		if( location.hostname == 'www.douban.com' && location.pathname == '/' ) {
			width = 160;
		} else {
			width = 220;
		}
		var html = '<div class="db-procrastination-'+cat+'-'+status+'" style="margin: 0 0 20px;"><h2>'+words+'  ·  ·  · <span style="color: #666666;vertical-align:1px;">(<a href="'+go+'" title="去干正事" style="font: 12px/150% Arial,Helvetica,sans-serif;">  '+totalResultsNum+measure+' </a>)</span></h2>';
		html += '<div class="indent">';
		html += '<ul class="bs">';
		for (var j in showNumSeq) {
			i = showNumSeq[j];
			var title = json.entry[i]['db:subject'].title.$t;
			var titleLink = json.entry[i]['db:subject'].link[1]['@href'];
			var setTime = json.entry[i].updated.$t;
			var setTimeYear = setTime.slice(0,4);
			var setTimeMonth = setTime.slice(5,7)-1;
			var setTimeDate = setTime.slice(8,10);
			var fromTime = new Date(setTimeYear,setTimeMonth,setTimeDate);
			var today = new Date();
			var nowMS = today.getTime();
			var wasteDay = ( nowMS-fromTime.getTime() ) / ( 1000*60*60*24 );
			var wasteDay = Math.floor(wasteDay);
			html += '<li style="border-bottom: 1px dashed #DDDDDD;margin: 0 0 0 4px;overflow: hidden;padding: 4px 0;"><span style="float:left;width:'+width+'px;overflow:hidden;text-overflow:ellipsis;word-break:break-all;white-space: nowrap;"><a href="'+titleLink+'" title="'+title+'">'+title+'</a></span><span style="float:right;color:#D94F03;">已拖延'+wasteDay+'天</span></li>';
		}
		if(resultsNum > 5) {
			html += '<li style="border-bottom: 1px dashed #DDDDDD;margin: 0 0 0 4px;overflow: hidden;padding: 4px 0;"><a href="'+go+'" title="去干正事" style="color:#D94F03;font-weight:700;">还有'+moreNum+measure+'，快去干正事</a></li>';
		}
		html += '</ul>';
		html += '</div>';
		html += '</div>';
		$(".aside").prepend(html);
		$(".side").prepend(html);
	}
}

function judge(cat,status) {
	if(cat == 'book') {
		switch (status) {
			case 'reading':
				var words = '你在读这些书已经三个月了';
				var go = 'http://book.douban.com/mine?status=do';
				break;
			case 'wish':
				var words = '你想读这些书已经半年了';
				var go = 'http://book.douban.com/mine?status=wish';
				break;
		}
		var measure = '本';
	}
	if(cat == 'movie') {
		switch (status) {
			case 'watching':
				var words = '你在看这些电影已经三个月了';
				var go = 'http://movie.douban.com/mine?status=do';
				break;
			case 'wish':
				var words = '你想看这些电影已经半年了';
				var go = 'http://movie.douban.com/mine?status=wish';
				break;
		}
		var measure = '部';
	}
	if(cat == 'music') {
		switch (status) {
			case 'listening':
				var words = '你在听这些专辑已经三个月了';
				var go = 'http://music.douban.com/mine?status=do';
				break;
			case 'wish':
				var words = '你想听这些专辑已经半年了';
				var go = 'http://music.douban.com/mine?status=wish';
				break;
		}
		var measure = '张';
	}
	var judgeResult = [words,go,measure];
	return judgeResult;
}

function getList(name,time,cat,status,nowMS) {
	var judgeResult = judge(cat,status);
	var words = judgeResult[0];
	var go = judgeResult[1];
	var measure = judgeResult[2];
	var link = 'http://api.douban.com/people/'+name+'/collection?cat='+cat+'&status='+status+'&alt=json&max-results=50&updated-max='+time;
	GM_xmlhttpRequest({
		method: 'GET',
		url: link,
		onload: function(res){
			localStorage['jsonString-'+cat+'-'+status] = res.responseText;
			insertPage(res.responseText,cat,status,words,go,measure);
		}
	});
}

function getListLocal(cat,status) {
	var judgeResult = judge(cat,status);
	var words = judgeResult[0];
	var go = judgeResult[1];
	var measure = judgeResult[2];
	insertPage(localStorage['jsonString-'+cat+'-'+status],cat,status,words,go,measure);
}

$(document).ready(function() {
	var today = new Date();
	var nowMS = today.getTime();
	var halfYearDuring = 1000*60*60*24*183;
	var fullYearDuring = 1000*60*60*24*365;
	var threeMonthsDuring = 1000*60*60*24*90;
	var halfYearUpdatedMax = getUpdatedMax(nowMS,halfYearDuring);
	var fullYearUpdatedMax = getUpdatedMax(nowMS,fullYearDuring);
	var threeMonthsUpdatedMax = getUpdatedMax(nowMS,threeMonthsDuring);
	if( typeof(localStorage.checkMS) == 'undefined') {
		localStorage.checkMS = 0;
	}
	if( nowMS - localStorage.checkMS > (1000*900) ) {
		var name = getUserName();
		localStorage.checkMS = nowMS;
		getList(name,halfYearUpdatedMax,'book','wish',nowMS);
		getList(name,threeMonthsUpdatedMax,'book','reading',nowMS);
		// getList(name,halfYearUpdatedMax,'movie','wish',nowMS);
		// getList(name,threeMonthsUpdatedMax,'movie','watching',nowMS);
		// getList(name,halfYearUpdatedMax,'music','wish',nowMS);
		// getList(name,threeMonthsUpdatedMax,'music','listening',nowMS);
	} else {
		getListLocal('book','wish');
		getListLocal('book','reading');
		// getListLocal('movie','wish');
		// getListLocal('movie','watching');
		// getListLocal('music','wish');
		// getListLocal('music','listening');
	}
	$('.back-old').css('margin-top','0');
	$('#sp-user').css('margin-top','0');
})