// ==UserScript==
// @name           BvS Filler Themes Notifier
// @namespace      Thewho
// @description    Notifies you when you need to set filler themes for Hidden Hoclaus and Candyween
// @include        http://*animecubed.com/billy/bvs/pages/main.html
// @version        1.0
// @history        1.0 Initial Release
// ==/UserScript==


var currentDate = new Date().getTime().toString();

if (currentDate - GM_getValue("lastDate", "") > 86400000)
{
var d = new Date();
if (d.getDate() == 23) 
{
alert("You need to activate your filler themes today \n for access to Hidden Hoclaus Tomorrow!");
var dt = new Date().getTime();
GM_setValue("lastDate", dt.toString());
}


//Notification for Candyween

//This bellow calculates how many days the current month has
function getLastDayOfMonth()
{
var day;
var month;
var year;

var tmpdate = new Date();
month = tmpdate.getMonth() +1;
year = tmpdate.getFullYear();


switch(month)
{
case 1 :
case 3 :
case 5 :
case 7 :
case 8 :
case 10:
case 12:
day = 31;
break;
case 4 :
case 6 :
case 9 :
case 11:
day = 30;
break;

case 2 :
if( ( (year % 4 == 0) && ( year % 100 != 0) ) || (year % 400 == 0) )
day = 29;
else
day = 28;
break;
}

return day;

}

if (d.getDate() == getLastDayOfMonth() -1) 
{
alert("You need to activate your filler themes today \n for access to Candyween Tomorrow!");
var dt = new Date().getTime();
GM_setValue("lastDate", dt.toString());
}
}

