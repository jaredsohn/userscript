// ==UserScript==
// @name           Apiit Timetable to Google Calendar
// @description    This script takes creates links next to all classes in the time table in the webspace time table page. once clicked it adds a event to google calendar. If you have done mobile setup with google calendar it also sends you an sms one hour before every class.
// @namespace      jinahadam.com/timetable
// @include        http://webspace.apiit.edu.my/schedule/intakeview_intake.jsp*
// ==/UserScript==

var monthNumMappings = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08', 
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12'
};
var yearNumMappings = {
  '09': 2009,
  '10': 2010,
  '11': 2011,
  '12': 2012,
  '13': 2013,
  '14': 2014,
  '15': 2015,
  '16': 2016, 
  '17': 2017,
  '18': 2018,
  '19': 2019,
  '20': 2020
};

function xPath(query) {
  return document.evaluate(
      query, 
      document, 
      null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
      null);
}


function insertAddLink() {

	var monthDayLinks = xPath('//font[contains(@size, "2")]');
	
       if (monthDayLinks.snapshotLength > 0) { //take the first
		
       var total = (monthDayLinks.snapshotLength);
	//alert(total);
		var tdate = new Array(total);
		
		for(var i = 0;i<=total;i=i+6)
		{
			tdate[i] = monthDayLinks.snapshotItem(i).innerHTML;
			//alert(tdate[0]);
			//alert(tdate[0].substring(7,10));
			
			var monthText = tdate[i].substring(7,10);
			var month = monthNumMappings[monthText];
			var yearText = tdate[i].substring(11,13);
			var year = yearNumMappings[yearText];
			var date = tdate[i].substring(4,6);
			var startDate = year + "-" + month + "-" + date;
			
			tdate[i+1] = monthDayLinks.snapshotItem(i+1).innerHTML;
			var startTime = tdate[i+1].substring(0,5);
			var endTime =  tdate[i+1].substring(8,13);
			
			var desc = "loc: " + monthDayLinks.snapshotItem(i+2).innerHTML + " sub: " + monthDayLinks.snapshotItem(i+4).innerHTML.substring(10,25);
			desc = escape(desc);
			var urlString = 'startDate='+startDate+'&endDate='+startDate+'&startTime='+startTime+'&endTime='+endTime+'&desc='+desc;
			
			monthDayLinks.snapshotItem(i+5).innerHTML = monthDayLinks.snapshotItem(i+5).innerHTML + '( <a target=\"_new\" href="http://jinahadam.com/timetable/gdata1.php?'+urlString+'>Add Reminder to GCalendar </a> )' ;  
		}	
		
  } else {
    alert("no match");
  }

 
 
}

insertAddLink();
