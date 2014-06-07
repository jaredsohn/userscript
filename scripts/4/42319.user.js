// ==UserScript==
// @name          Show X Days Vonage Call Activity
// @namespace     http://spig.net/userscripts/
// @description   Shows the most recent X days of call activity on vonage instead of the standard seven.
// @date          2009-02-12
// @include       https://secure.vonage.com/vonage-web/activity/index.htm
// @version       0.1.0
// ==/UserScript==

var body, script;
body = document.getElementsByTagName('body')[0];
if (!body) { return; }
script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = "var de = new Date();"+
"var ds = new Date();" +
"var days = parseInt(prompt(\"How many days of activity would you like?\"));" +
"if (isNaN(days)) {" +
" alert(\"Please enter a valid number\");" +
"}" +
"else if (days > 0) {" +
" ds.setDate(de.getDate() - days);" +
" var url = \"activityDetail.htm?\" +" +
" \"accountNumber=" + "1003975186\" +" +
" \"&dateEnd=\" + de.getTime() + \"&dateStart=\" + ds.getTime() +" +
" \"&bcType=O&style=ActivityPlaced&type=html\" + \"&timeZone=\" +" +
" \"6\" +" +
" \"&locale=\" +" +
" \"en_US\" +" +
" \"&sort=desc&didNumberId=\" + 3634023;" +
// fight IE caching
" var d = new Date();" +
" var time = \"&time=\" + d.getTime();" +
" url=url +time;" +
" var localRequest;" +
" localRequest = getHTTPRequest();" +
" if(localRequest) {" +
"   RequestDataWithMutex(url, localRequest, handleResponseActivityOutbound);" +
" } else {" +
"   document.getElementById(\"activityOutboundRecordsArea\").innerHTML=\"<b>Call Activity information is temporarily unavailable. This information should be available shortly. We apologize for any inconvenience and thank you for your patience.</b>\"" +
" }" +
" var url = \"activityDetail.htm?\" +" +
" \"accountNumber=\" + \"1003975186\" +" +
" \"&dateEnd=\" + de.getTime() + \"&dateStart=\" + ds.getTime() +" +
" \"&bcType=I&style=ActivityReceived&type=html\" + \"&timeZone=\" +" +
" \"6\" +" +
" \"&locale=\" +" +
" \"en_US\" +" +
" \"&sort=desc&didNumberId=\" + 3634023;" +
// fight IE caching
" var d = new Date();" +
" var time = \"&time=\" + d.getTime();" +
" url=url +time;" +
" var localRequest;" +
" localRequest = getHTTPRequest();" +
" if(localRequest) {" +
"  RequestDataWithMutex(url, localRequest, handleResponseActivityReceived);" +
" } else {" +
"  document.getElementById(\"activityReceivedRecordsArea\").innerHTML=\"<b>Call Activity information is temporarily unavailable. This information should be available shortly. We apologize for any inconvenience and thank you for your patience.</b>\"" +
"  }" +
"}";

body.appendChild(script);
