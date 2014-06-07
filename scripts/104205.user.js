// ==UserScript==
// @name          teleman2google
// @description   Add a button to import a tv listing entries to Google Calendar
// @include       http://beta.teleman.pl/tv/*
// ==/UserScript==

function getMonth(a) {
   //var today = new Date();
   var month;
   switch(a) {
      case "January"   : 
         month = "01";
         break;
      case "February"  : 
         month = "02";
         break;
      case "March"     : 
         month = "03";
         break;
      case "April"     : 
         month = "04";
         break;
      case "May"       : 
         month = "05";
         break;
      case "June"      : 
         month = "06";
         break;
      case "July"      : 
         month = "07";
         break;
      case "August"    : 
         month = "08";
         break;
      case "September" : 
         month = "09";
         break;
      case "October"   : 
         month = "10";
         break;
      case "November"  : 
         month = "11";
         break;
      case "December"  : 
         month = "12";
         break;
   }
   
      return month;
}


// Let's find the various cells with the info we need
var Title, UnparsedDate, StartDate, EndDate, Location, Details;
var allTDs, ourTD;

var DateRegEx  = /^When\:$/;
var LocRegEx   = /Location\:/;
var pmRegEx    = /pm|PM/;
var amRegEx    = /am|AM/;

allTDs = document.getElementsByTagName('td');

var TitleH1 = document.getElementsByTagName('h1');
Title = TitleH1[0].innerHTML;
Title = escape(Title);

for (var j = 0; j < allTDs.length; j++) {
  

//   if (allTDs[j].className == 'details') {
//      Title = allTDs[j].innerHTML;
//      Title = escape(Title);
//   }
   
   var text = allTDs[j].innerHTML;
   
   if (text.match(DateRegEx)) {
      UnparsedDate = allTDs[j+1].innerHTML;
      var tempDate = UnparsedDate.split(",");
      var monthday = tempDate[1];
      
      if (tempDate[2].indexOf("to") != -1) {
         var times    = tempDate[2].split(" to ");
      } else {
         var times = new Array();
	 var cleanTime = tempDate[2].split(" ");
         times[0] = cleanTime[1];
         times[1] = cleanTime[1];
      }
               
      var today = new Date();
      var yr = today.getFullYear();
      
      var temp = monthday.split(" ");
      var monthText = temp[1];
      var day = temp[2];
      
      if (day.length == 1) {
          day = "0" + day;				
      }
      
      var month = getMonth(monthText);
      
      var tempStart = times[0].replace(" ","");
      var tempEnd   = times[1].replace(" ","");
      
      var StartHour, StartMin, EndHour, EndMin;
      
      startArray    = tempStart.split(":");
      endArray      = tempEnd.split(":");
      
      StartHour = startArray[0];
      StartMin  = startArray[1];
      EndHour   = endArray[0];
      EndMin    = endArray[1];
      
      StartHour = StartHour - 0;
      EndHour   = EndHour   - 0;
      
 
      if (StartMin.match(pmRegEx) && parseInt(StartHour) < 12) {
         StartHour = StartHour + 12;
         StartMin  = StartMin.replace("pm","", "gi");
      } else if (StartMin.match(amRegEx) && parseInt(StartHour) == 12) {
         StartHour = StartHour - 12;
         StartMin  = StartMin.replace("am","", "gi");
      } else {
         StartMin  = StartMin.replace("am","", "gi");
         StartMin  = StartMin.replace("pm","", "gi");
      }
      
      if (EndMin.match(pmRegEx) && parseInt(EndHour) < 12) {
         EndHour   = EndHour + 12;
         EndMin    = EndMin.replace("pm","", "gi");
      } else if (EndMin.match(amRegEx) && parseInt(EndHour) == 12) {
         EndHour = EndHour - 12;
         EndMin  = EndMin.replace("am","", "gi");
      } else {
         EndMin    = EndMin.replace("am","", "gi");
         EndMin    = EndMin.replace("pm","", "gi");
      }
      
      var d        = new Date();
      var offset   = d.getTimezoneOffset() / 60; 
      
      StartHour   -= 0;
      EndHour     -= 0;
      StartHour   += offset; //adjust for timezone
      EndHour     += offset; //adjust for timezone
      
      StartTime = StartHour + StartMin;
      EndTime   = EndHour   + EndMin;
      
      StartDate = yr + month + day + "T" + StartTime + "00Z";
      EndDate   = yr + month + day + "T" + EndTime + "00Z";
      
      Details = escape(allTDs[j+3].innerHTML);
   }
   
   if (text.match(LocRegEx)) {
      var tempLocation = allTDs[j+1].innerHTML;
      if ( tempLocation.match("<br>") ) {
	var locDivs = allTDs[j+1].getElementsByTagName('div');
	for (var i = 0; i < locDivs.length; i++ ) {
		var tempLocText = locDivs[i].innerHTML;
		if ( tempLocText.match("<br>") ) {
			Location = tempLocText.replace("\<br\>", ",", "gi");
			Location = Location.replace("\n", "", "gi");
			Location = Location.split("<", 1);
		}
	}
      }
   }
   
}



// Let's create the Google Calendar Link
var gCalLink = document.createElement("span");
gCalLink.innerHTML = '&nbsp;&nbsp;<a href="http://www.google.com/calendar/event' +  
                     '?action=TEMPLATE&text=' + Title + '&dates=' + StartDate + '/' + EndDate + '&details=' + Details + 
                     '&location=' + escape(Location) +  '&trp=true&' + 'sprop=www.evite.com&sprop=name:" class="tools" target="_blank">Add to Google Calendar</a>';



// Let's find the LI element with the Outlook Calendar link and add our link after it
var allHREFss, printHREF;
allHREFs = document.getElementsByTagName('a');

for (var i = 0; i < allHREFs.length; i++) {
   
   var text  = allHREFs[i].innerHTML;
   var regEx = /Print/;
   if (text.match(regEx)) {
  	printHREF = allHREFs[i];
  }
}

printHREF.parentNode.insertBefore(gCalLink, printHREF.nextSibling);