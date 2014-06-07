// ==UserScript==
// @name           Stanford class: due date colorer
// @description    Colors quizzes and assignments depending on the due date: gray -- past due date, red -- less than a day, yellow -- up to a week, green -- more than week.
// @namespace      http://sepczuk.com
// @include        http://www.ml-class.org/course/quiz/*
// @include        http://www.ml-class.org/course/homework/*
// @include        http://www.db-class.org/course/homework/*
// @include        http://www.db-class.org/course/quiz/*
// @downloadURL     https://userscripts.org/scripts/source/118663.user.js
// @updateURL       https://userscripts.org/scripts/source/118663.meta.js
// ==/UserScript==
(function(){
try{
	// support Opera & Firefox
	var $ = (typeof unsafeWindow !== "undefined")?unsafeWindow.jQuery:jQuery;
	
	// -----------
	var regexp1 = /Due: [A-Z][a-z]+, ([A-Z][a-z]+) (\d{1,2}) (\d{1,2}:\d{1,2}) ([A-Z]+)/;
	var nowDate = new Date();
	var oneDayFromNow =  new Date(nowDate.valueOf()+3600*1000*24);
	var oneWeekFromNow = new Date(nowDate.valueOf()+3600*1000*24*7);
	
	var isMaxScoreRegexp = /(\d+\.\d{2})\/\1/;
	$('.dashboard_text_details>span>div').each(function() {
		var m = this.textContent.match(regexp1);
		var dateString = '2011 ' + m[1] + ' ' + m[2] + ' ' + m[3] + (m[4]!=='LCL'?(' ' + m[4]):'');
		var dueDate = new Date(dateString);
		var el = $(this).parents().eq(3);
		if (isMaxScoreRegexp.test(el.text())) {
			el.find('.dashboard_icon').html('<img src="/course/assets/berry/img/qna_featured_large.png">');
		}
		
		if (dueDate > oneWeekFromNow) {
			el.css('background-color', '#eeffee');
		} else if (dueDate > oneDayFromNow) {
			el.css('background-color', '#ffffee');
		} else if (dueDate > nowDate) {
			el.css('background-color', '#ffeeee');
		} else {
			el.css('background-color', '#eeeeee');
		}
	});

}catch(e){}
})();