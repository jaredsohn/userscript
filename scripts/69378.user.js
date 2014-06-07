// ==UserScript==
// @name		  Facebook GCal Version 2.0.1
// @namespace	  http://csba-dev.berkeley.edu/~jmwong
// @description   Add Google Calendar button to Facebook event page
// @include		  http://www.facebook.com/event.php*
// ==/UserScript==

if (!jm){
var jm = {};
}

jm.parseTime = {

		time : {
			fromAMPM : function(time_ampm, date, delimiter){
				time_ampm = String(time_ampm);
				date = date || new Date();
				delimiter = delimiter || ':';
				var hmampm = time_ampm.replace(/ /,'').split(delimiter);
				var h = hmampm[0];
				var m = hmampm[1];
				var ampm = m.substr(2,2);
				m = m.substr(0,2);
				if (ampm === 'am' && h == 12){
					h = '0';
				}
				else if (ampm === 'pm' && h != 12){
					h = parseInt(h) + 12;
				}
		
				date.setHours(h);
				date.setMinutes(m);
				date.setSeconds(0);
				
				return date;			
			}
		},
		
		date : {
			fromLongDay : function(day_in_words){
				day_in_words = String(day_in_words);
				day_in_words = day_in_words.toLowerCase();
				var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
				var oneDay = 24 * 60 * 60 * 1000;
				var today = new Date();
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				
				switch (day_in_words){
					case "today":
						return today;
					case "tomorrow":
						return new Date(today.getTime() + oneDay);
					default:
						var dayOfWeek = days.indexOf(day_in_words);
						
						var todayOfWeek = today.getDay();
						var daysToAdd = dayOfWeek - todayOfWeek;
						if (daysToAdd <= 0){
							daysToAdd += 7;
						}
						return new Date(today.getTime() + (daysToAdd * oneDay));
				}
			}
		}
};



jm = function(){

	var eventName = '';
	var	eventLocation = '';
	var	eventInfo = '';
	var	eventCreator = '';
	var	eventDates = {
			start: '',
			end: ''
	};
	var gCalURL = '';
	
	//extend Array 
	Array.prototype.indexOf = function(obj){
		var x;
		for (x in this){
			if (this[x] === obj){
				break;
			}
			x = -1;
		}
		return parseInt(x);
	};
	
	//Adapted from Andrea Giammarchi - http://webreflection.blogspot.com/2009/07/ecmascript-iso-date-for-every-browser.html
	Date.prototype.toISOString  = function(){
		        function t(i){return i<10?"0"+i:i;}
		        function h(i){return i.length<2?"00"+i:i.length<3?"0"+i:3<i.length?Math.round(i/Math.pow(10,i.length-3)):i;}
	            return "".concat(
	                this.getUTCFullYear(), "",
	                t(this.getUTCMonth() + 1), "",
	                t(this.getUTCDate()), "T",
	                t(this.getUTCHours()), "",
	                t(this.getUTCMinutes()), "",
	                t(this.getUTCSeconds()), "",
	                 "Z"
	            );
	};
	
		
	var getEventDates = function(event_time_string){
		var MIDDLEDOT = "\267"; //to correctly encode the middle dot
		
		var t = event_time_string.split(' - ');
		var s = t[0];
		var e = t[1];
		
		
		var start = {};	
		var startDateTime = (s.split(MIDDLEDOT).length > 1) ? s.split(MIDDLEDOT) : s.split(' at ');
		start.date = startDateTime[0];
		start.time = startDateTime[1];
		
		var end = {};
		var endDateTime = e.split(' at ');
		if (endDateTime.length > 1){
			end.date = endDateTime[0];
			end.time = endDateTime[1];
		}
		else {
			end.date = start.date;
			end.time = endDateTime;
		}	
		
		
		var parseDate = function(date){
			var numTerms = date.split(' ').length;
			if (numTerms === 2){
				year = (new Date()).getUTCFullYear();
				date = date + ' ' + year;
			}
			var d = new Date(date);
			if (isNaN(d)){
				return jm.parseTime.date.fromLongDay(date);
			}
			return d;
		};

		
		eventDates.start = jm.parseTime.time.fromAMPM(start.time,parseDate(start.date));
		eventDates.end = jm.parseTime.time.fromAMPM(end.time,parseDate(end.date));

	};
	
	var elemParent = document.getElementsByClassName("profileInfoTable")[0];
    var arrFbEventLabels = elemParent.getElementsByClassName("label");
	var	arrFbEventDetails = elemParent.getElementsByClassName("data");
	var	strFbEventTitle = document.getElementsByClassName("fsxxl fwb")[0].innerHTML;
	var arrayLength = arrFbEventLabels.length;
	
	eventName = strFbEventTitle;
	
	var elemMoreInfo;
	
	for (var i = 0; i < arrayLength; i++){
		switch(arrFbEventLabels[i].innerHTML){
			case "Time":
			getEventDates(arrFbEventDetails[i].childNodes[0].innerHTML); 
			break;
		case "Location":
			eventLocation = arrFbEventDetails[i].innerHTML.replace(/<(?!((\/)?(a)))(.)?([a-zA-Z?])[^><]*>/g,' ');
			break;
		case "Created By":
			eventCreator = arrFbEventDetails[i].innerHTML;
			break;
		case "More Info":
			var children = arrFbEventDetails[i].childNodes;
			eventInfo = (children.length === 1) ? arrFbEventDetails[i].childNodes[0].innerHTML : arrFbEventDetails[i].innerHTML;
			elemMoreInfo = arrFbEventDetails[i].parentNode.parentNode;
			break;
		default:
			break;
		}
	}
	
	gCalURL = 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + encodeURIComponent(eventName) + '&dates=' + eventDates.start.toISOString() + '/' + eventDates.end.toISOString() + '&location=' + encodeURIComponent(eventLocation) + '&details=' + encodeURIComponent("".concat(eventInfo.substr(0,1000),'...<br />More on ',document.URL)) + '&sprop=name:';
	
	var injectGCalButton = function(){
		var elemGCalTableRow = document.createElement('tbody');
		var tr = document.createElement('tr');
		
		var th = document.createElement('th');
		th.setAttribute("class","label");
		th.innerHTML = "Add to Google Calendar";
		
		var td = document.createElement('td');
		td.setAttribute("class","data");
		td.innerHTML = '<a href="' + gCalURL + '" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button2.gif" /></a>';
		
		var tr2 = document.createElement('tr');
		tr2.setAttribute("class","spacer");
		
		var td2 = document.createElement('td');
		td2.setAttribute("colspan", "2");
		td2.innerHTML = "<hr />";
		
		tr2.appendChild(td2);
		tr.appendChild(th);
		tr.appendChild(td);
		
		elemGCalTableRow.appendChild(tr);
		elemGCalTableRow.appendChild(tr2);
		
		elemParent.appendChild(elemGCalTableRow);
		
		elemMoreInfo.appendChild(tr2.cloneNode(true));
	}();
	
	
	return {
		event : {
			name : eventName,
			dates: eventDates,
			location: eventLocation,
			info: eventInfo,
			creator: eventCreator,
			gCalURL: gCalURL
		},	
				
		debug: {
			printArray: function(arr, opt_func_filter){
				var str = '';
				var filter = opt_func_filter || function(item) {return item;};
				for (var i = 0; i < arr.length; i++){
					str = str + '\n' + filter(arr[i]);
				}
				alert(str);
			}
		}
	};
}();




