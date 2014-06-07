// ==UserScript==
// @name		        douban_event_GoogleCalendar
// @namespace		        www.douban.com/people/qazqaz/
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @require                     http://code.jquery.com/jquery-1.7.1.min.js
// @version			1.0.2
// @include			http://www.douban.com/event/*
// @exclude			http://www.douban.com/event/album/*
// @exclude			http://www.douban.com/event/*/discussion/*
// @author			Æ
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var console = unsafeWindow.console;
  var $ = jQuery; 
}


$(document).ready(function(){	
	var event_title = $('h1').text().replace(/\s+$/,"").replace(/\s{3,}/g," ☞");//replace处理“即将开始”
	var event_desc = $('#edesc_s.wr').text();
	var event_time;
	var event_address;
    
    	var buttStr = '<a id="add_gcalendar" class="start" href="#" rel="nofollow"><span>加入日历</span></a>'
	//$('.interest-attend.pl').append(htmlStr);
        $('h1').append(buttStr);
    
 /*调整格式的函数*/ 
                                  
function urlFormat(str) {
var newstr = str.replace(/^\s+/g, "");
return encodeURIComponent(newstr.replace(/\s+$/g, ""));
}
// Add a leading '0' if string is only 1 char
function stringPad(str) {
var newStr = "" + str;
if (newStr.length == 1) {
newStr = "0" + newStr;
}
    return newStr;
}
    
function getUTCDateString(y,m,d,h,min) {
var timeObj = new Date(y,m-1,d,h,min);
var dateStr = "" + timeObj.getUTCFullYear();
dateStr += stringPad(timeObj.getUTCMonth()+1);
dateStr += stringPad(timeObj.getUTCDate());
dateStr += "T" + stringPad(timeObj.getUTCHours());
dateStr += stringPad(timeObj.getUTCMinutes()) + "00Z";
return dateStr;
}
    
           function doubanStringToTimeString(str){
                   var today = new Date()
                   var year=String(today.getFullYear());
            var array = str.replace(/\D+/g,' ')
                console.log("zve "+array);
            
            var array = str.replace(/\D+/g,' ').replace(/\s+$/,'').split(' ');
		var mon = array[0].replace(/\D/,'');
                var day = array[1].replace(/\D/,'');
                var hour = array[2].replace(/\D/,'');
                var min = array[3].replace(/\D/,'');
            var start = getUTCDateString(year,mon,day,hour,min);
            console.log("zvze "+start);
               
               var l =array.length;
               console.log("ze "+l);
               if(l>6){
            	 mon = array[4].replace(/\D/,'');
                 day = array[5].replace(/\D/,'');
               }
               hour=array[l-2].replace(/\D/,'');
               min=array[l-1].replace(/\D/,'');
              console.log("ze "+mon); console.log("ze "+day);
            var end = getUTCDateString(year,mon,day,hour,min);
            console.log("zvze "+end);
            return String(start+"/"+end);
	}
    
    
/************************/    
        //提取时间地点    
	$('.event-detail').each(function(i){
		if(i==0){
			event_time = $(this).text().replace(/.*\n.*?:\s*/m, "");
                              console.log("_event_time: "+event_time);
			event_time = doubanStringToTimeString(event_time);
			      console.log("event_time: "+event_time);
                 }   
                if(i==1){
			event_address = $(this).text().replace(/.*\n.*:\s*/mg, "");
                    console.log("address: "+event_address);
		}
			
		
	});    

	$('#add_gcalendar').click(function(event){
		event.preventDefault(); 
		window.open('https://www.google.com/calendar/event' +  
                     '?action=TEMPLATE&text='+event_title+
            		'&details=' + location.href+"+%0A" +urlFormat(event_desc.substring(0,180)) + '...'+
            		'&location=' + event_address+
            		'&dates=' + event_time
        				,'_blank');
		
	});
                                  
});