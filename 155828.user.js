// ==UserScript==
// @name       TimeOffManager Home
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  [For TimeOffManager web application] Opens a new tab passing the date selected
// @match      http*://www.timeoffmanager.com/cpanel/home/default.aspx*
// @copyright  2013, António Ribeiro
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
//var $ = unsafeWindow.jQuery;
var months = new Array();
months["January"] = 1;
months["February"] = 2;
months["March"] = 3;
months["April"] = 4;
months["May"] = 5;
months["June"] = 6;
months["July"] = 7;
months["August"] = 8;
months["September"] = 9;
months["October"] = 10;
months["November"] = 11;
months["December"] = 12;
function dateClicked(obj) {
    
    var cssBackground = $(obj).css("background");
    
    if (cssBackground.toLowerCase().indexOf("holiday") != -1) {
        console.log("selected holiday");
        alert("Holiday!");
        return;
    }
    
    if ($(obj).hasClass("fc-sat") || $(obj).hasClass("fc-sun")) {
        console.log("selected weekend");
        alert("Weekend!");
        return;
    }
    
    var day = $("div[class='fc-day-number']", obj).text();
    var dayNumber = day;
    
    var monthYear = $("#divCalendar > table > tbody > tr > td:first > span[class='fc-header-title'] > h2").text().split(" ");
    var month = monthYear[0];
    var year = monthYear[1];
    
    var monthNumber = months[month];
    
    if ($(obj).hasClass("fc-other-month")) {
        console.log("selected day of other month");
    	
        if (day >=20) {
            console.log("one month behing");
        	//one month behind
            monthNumber = monthNumber - 1;
            if (monthNumber < 1 || monthNumber > 12) {
            	monthNumber += 12;
            }
            
            if (monthNumber == 12) {
            	//one year behind
                console.log("one year behind");
                year = parseInt(year) - 1;
                console.log("new year " + year);
            }
           
        } else if (day < 20) {
        	//one month ahead
            monthNumber = monthNumber + 1;
            if (monthNumber < 1 || monthNumber > 12) {
            	monthNumber -= 12;
            }
            
            if (monthNumber == 1) {
            	//one year ahead
                console.log("one year ahead");
                year = parseInt(year) + 1;
                console.log("new year " + year);
            }
        }
    }
    
    
    if (day >= 1 && day <=9) {
        dayNumber = "0"+day;
    }
    
    if (monthNumber >= 1 && monthNumber <= 9) {
    	monthStr = "0"+monthNumber;
    } else {
    	monthStr = monthNumber;
    }
    
    var fulldate = dayNumber + "/" + monthStr + "/" + year;
    console.log("selected date ["+fulldate+"]");
    window.open("https://www.timeoffmanager.com/cpanel/users/newrequest.aspx?ddate=" + fulldate, fulldate);
}        
$("#divCalendar > div:first > div > table > tbody > tr > td").click(function() {
    dateClicked($(this));
});