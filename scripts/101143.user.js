// ==UserScript==
// @name		douban_event_GoogleCalendar
// @namespace		douban
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v0.1
// @include			http://www.douban.com/event/*
// @author			leonskywalker1@gmail.com
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var console = unsafeWindow.console;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_event_GoogleCalendar", //脚本名称，请自行修改
id: "-1", //脚本在userscripts.org的id，请自行修改
version:"0.1" // 当前脚本版本号，请自行修改
}
//var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
//updater.check(24); //检查是否有更新


$(document).ready(function(){
	var htmlStr = '<a id="add_gcalendar" class="redbutt" href="#" rel="nofollow"><span>加入日历</span></a><br class="clear">'
	$('#actchoice').prepend(htmlStr);	
	
	var event_title = $('h1').text();
	var event_desc = $('.related_info .wr').text();
	var event_start_time;
	var event_end_time;
	var event_address;
	
	function leadingZeroes(n,l) {
	  n = String(n);
	  while(n.length < l)
	    n = "0"+n;
	  return n;
	}
	
	function doubanStringToTimeString(str){
		var array = str.split(' ');		
		var datestr	= array[0].substr(0,array[0].length-1).replace(/年|月/g,'/');
		var timestr = array[2]+":00";
		
		var date = new Date(datestr +' '+ timestr);
		
		return String(date.getUTCFullYear())
			  + leadingZeroes(date.getUTCMonth()+1,2) 
			  + leadingZeroes(date.getUTCDate(),2)
			  + "T"
			  + leadingZeroes(date.getUTCHours(),2)
			  + leadingZeroes(date.getUTCMinutes(),2)
			  + leadingZeroes(date.getUTCSeconds(),2)
			  + "Z";
	}
	
	$('#info .pl').each(function(i){
		if(i==0){
			event_start_time = $(this)[0].nextSibling.nodeValue;
			
			event_start_time = doubanStringToTimeString(event_start_time);
			console.log("event_start_time: "+event_start_time);
			
		}
		
		if(i==1){
			event_end_time = $(this)[0].nextSibling.nodeValue;
			event_end_time = doubanStringToTimeString(event_end_time);
		}
		
		if(i==2){
			event_address = $(this)[0].nextSibling.nodeValue;
		}
		
	});
	
	$('#add_gcalendar').click(function(event){
		event.preventDefault(); 
		//alert("地址："+event_address);
		window.open('http://www.google.com/calendar/event' +  
                     '?action=TEMPLATE&text='+event_title+
            		'&details=' + event_desc.substring(0,100) + '...'+
            		'&location=' + event_address+
            		'&dates=' + event_start_time+"%2F"+event_end_time
        				,'_blank');
		/*
		window.open('http://www.google.com/calendar/event' +  
                     '?action=TEMPLATE&text='+event_title+'&dates=' + event_start_time + '/' + event_end_time + '&details=' + event_address.substring(0,30) + '...' + 
                     '&location=' + escape(event_address),'_blank');
		*/
		//https://www.google.com/calendar/render?action=TEMPLATE&text=梦游.春光--飞翔在童话国的梦幻女声.音乐盛宴&details=梦游.春光--飞翔在童话国的梦幻女声.音乐盛宴演出时间：4月16日（周六）20:00票价：RMB+50+活动介绍：...&location=北京+朝阳区+麻雀瓦舍+广渠路36号院东院&gsessionid=OK&dates=20120212T200000Z%2F201202122300Z
		
		
		
	});

});
