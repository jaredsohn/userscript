// ==UserScript==
// @name           Bigpond Usage
// @namespace      http://nmgod.com
// @description    Additional information for bigpond daily usage page
// @include        https://my.bigpond.com/mybigpond/myaccount/myusage/daily/*
// @require        http://code.jquery.com/jquery-1.8.1.min.js
// @copyright      NMGod
// ==/UserScript==

//###Edit These two Lines###\\
var Bandwidth = 50000; //Usage per month (in Megabytes)
var StartDate = 2;     //Day of month your bandwidth renews, ie. 2 = 2nd day of the month
//###End of Editing###\\



//var TotalDownload = $(".usage-table tr:contains('Total'):last strong:eq(1)").html();
//var TotalUplaod = $(".usage-table tr:contains('Total'):last strong:eq(2)").html();

var UnmeteredUsage = $(".usage-table tr:contains('Total'):last strong:eq(4)").html();
var TotalUsage = $(".usage-table tr:contains('Total'):last strong:eq(3)").html();
var Now = new Date();
var DaysInUsageMonth;
var DaysUsed;

if(Now.getDate() < StartDate) {
	//In the month after usage started 
	DaysInUsageMonth = new Date(Now.getFullYear(), Now.getMonth(), 0).getDate();
	DaysUsed = (DaysInUsageMonth - StartDate) + Now.getDate() + 1;
} else {
	DaysInUsageMonth = new Date(Now.getFullYear(), Now.getMonth() + 1, 0).getDate();
	DaysUsed = Now.getDate() - StartDate + 1;
}

var DailyAllowance = parseInt(Bandwidth / DaysInUsageMonth);
var RemainingUsage = Bandwidth - TotalUsage;
var ExpectedToDate = DailyAllowance * DaysUsed;
var FreeUsageToDate = ExpectedToDate - TotalUsage;

var InfoTableString = [];
var RowStartStr = "<tr><td style='border-left: 1px solid #0075B0' class='light'>"
var RowMiddleStr = "</td><td class='dark'>"

InfoTableString.push("<style type='text/css'>\n");
InfoTableString.push("#infotable td{text-align: right; padding:0px 2px 1px 2px; border-bottom: 1px solid #0075B0; border-right: 1px solid #0075B0}\n");
InfoTableString.push("#infotable table{border-collapse: collapse; float: right}\n");
InfoTableString.push(".light{background-color: #E8F1F8}\n");
InfoTableString.push(".dark{background-color: #CDE1F1}\n");
InfoTableString.push("</style>\n");
InfoTableString.push("<div id='infotable'><table>\n");
InfoTableString.push(RowStartStr + "Usage Per Day" + RowMiddleStr + "<strong>" + DailyAllowance + "</strong></td></tr>\n");
InfoTableString.push(RowStartStr + "Expected Usage" + RowMiddleStr + ExpectedToDate + "</td></tr>\n");
InfoTableString.push(RowStartStr + "Actual Usage" + RowMiddleStr + "<strong>" + TotalUsage + "</strong></td></tr>\n");
InfoTableString.push(RowStartStr + "Free Usage" + RowMiddleStr + FreeUsageToDate + "</td></tr>\n");
InfoTableString.push(RowStartStr + "Remaining Usage" + RowMiddleStr + "<strong>" + RemainingUsage + "</strong></td></tr>\n");
InfoTableString.push(RowStartStr + "Unmetered Usage" + RowMiddleStr + UnmeteredUsage + "</td></tr>\n");
InfoTableString.push("</table></div>");

$(InfoTableString.join("")).insertBefore(".usageScale");
