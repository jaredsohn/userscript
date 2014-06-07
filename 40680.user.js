/*
 *      Modifies TVGids.nl SMS program notification links to use Google Calendar Events instead.
 *	
 *      Anton Wierenga
 *	http://www.antonwierenga.com
 *   
 *      Version history
 *
 *      Anton Wieringa -- http://www.antonwierenga.com/
 *      v0.1   Initial version
 *      v0.2   Rewrite to lessen load on tvgids.nl
 *      v0.3   No longer requires serverside javascript
 *
 *      Robert van Bregt
 *      v0.4   Jan 2009  Modified to reflect tvgids.nl site updates 
 *                       Programmes can now span 2 dates
 *                       Corrected timezone shift 
 */

// ==UserScript==
// @name          TVGidsGCal
// @namespace     http://www.antonwierenga.com/
// @description	  Modifies TVGids.nl SMS program notification links to use Google Calendar Events instead.
// @include       http://www.tvgids.nl*/*
// ==/UserScript==

window.addEventListener("load", init, false);

function selectNodes(doc, context, xpath) {
    var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var result = new Array( nodes.snapshotLength );
    for (var x=0; x<result.length; x++) {
        result[x] = nodes.snapshotItem(x);
    }
    return result;
}

// backslashes in the regexp have been doubled for inclusing in the innerHTML string
// For date formatting see http://www.google.com/googlecalendar/event_publisher_guide_detail.html

function init() {
    doc = window.document;
    var script = doc.createElement("script");
    script.innerHTML = '\n//<![CDATA[';
    script.innerHTML += '\nfunction trim(str) { str = str.replace(/^\\s*/, "").replace(/\\s*$/, "").replace(/\\s{2,}/, " "); return str; }';
    script.innerHTML += '\nfunction formatNumber(number) { var result = ""; if (number < 10) { result += "0"; } result += number; return result; }';
    script.innerHTML += '\nfunction translateMonth(month) {  if (month == "januari") return 1; if (month == "februari") return 2; if (month == "maart") return 3; if (month == "april") return 4; if (month == "mei") return 5; if (month == "juni") return 6; if (month == "juli") return 7; if (month == "augustus") return 8; if (month == "september") return 9; if (month == "oktober") return 10; if (month == "november") return 11; if (month == "december") return 12; }';
    script.innerHTML += '\nfunction formatDate(date) { var formattedDate = "" + date.getFullYear(); formattedDate += formatNumber(date.getMonth()); formattedDate += formatNumber(date.getDate()); formattedDate += "T"; formattedDate += formatNumber(date.getHours()); formattedDate += formatNumber(date.getMinutes()); formattedDate += "00Z"; return formattedDate; }';
    script.innerHTML += '\nfunction addTime(d, n) { return new Date(d.getTime() + n) ; }';
    script.innerHTML += '\n' + 
'function addToCalendar(programID) {\n' +
'    var xhr;\n' +
'    try { xhr = new XMLHttpRequest(); }\n' +
'    catch(e) { xhr = new ActiveXObject(Microsoft.XMLHTTP); }\n' +
'    xhr.onreadystatechange = function() {\n' +
'        if (xhr.readyState == 4) {\n' +
'            if(xhr.status == 200) {\n' +
'                // peel off responseText bit by bit\n' +
'                var responseText  = xhr.responseText;\n' +
'                responseText      = responseText.substring(responseText.indexOf(\'<div class="detailBox">\'));\n' +
'                var programTitle  = responseText.substring(responseText.indexOf(\'<span class="title">\') + 20, responseText.indexOf("</span>"));\n' +
'                responseText      = responseText.substring(responseText.indexOf(\'<span class="channeltime">\') + 26);\n' +
'                programTitle     += " (" + trim(responseText.substring(0, responseText.indexOf("</span>"))) + ")";\n' +
'                responseText      = responseText.substring(responseText.indexOf("<strong>Datum:</strong><br />") + 29);\n' +
'                var startDate     = trim(responseText.substring(0, responseText.indexOf("</li>")));\n' +
'                var endDate       = startDate;\n' +
'                responseText      = responseText.substring(responseText.indexOf("<strong>Uitzendtijd:</strong><br />") + 35);\n' +
'                startDate        += " " + trim(responseText.substring(0, responseText.indexOf("-")));\n' + 
'                responseText      = responseText.substring(responseText.indexOf("-") + 1);\n' +
'                endDate          += " " + trim(responseText.substring(0, responseText.indexOf("uur")));\n' + 
'                startDate         = parseDate(startDate);\n' +
'                endDate           = parseDate(endDate);\n' +
'                if (endDate.getTime() < startDate.getTime()) { endDate = addTime(endDate, 24*60*60*1000); }\n' +
'                startDate         = formatDate(startDate);\n' +
'                endDate           = formatDate(endDate);\n' +
'                var calendarURL   = "http://www.google.com/calendar/event?action=TEMPLATE&text=" + programTitle + "&dates=" + startDate + "/" + endDate + "&location=nl&sprop=name:TVGids.nl&sprop=website:www.tvgids.nl";\n' + 
'                window.open(calendarURL, "home" ,"width=700,height=700,top=100,left=" + parseInt((screen.availWidth/2) - (700/2)) + ",scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no");\n' + 
'            }\n' +  
'        }\n' +  
'    }\n' +  
'    try { xhr.open("GET", "http://www.tvgids.nl/programma/" + programID + "/", true); xhr.send(null); } catch (e) { alert(e); }\n' + 
'}';
    script.innerHTML += '\n' + 
'function parseDate(inDate) { ' +
'    var outDate = new Date(); ' +
'    outDate.setDate(inDate.substring(0, inDate.indexOf(" "))); ' +
'    inDate = inDate.substring(inDate.indexOf(" ") + 1); ' +
'    outDate.setMonth(translateMonth(inDate.substring(0, inDate.indexOf(" ")))); ' +
'    inDate = inDate.substring(inDate.indexOf(" ") + 1); ' +
'    outDate.setFullYear(inDate.substring(0, inDate.indexOf(" "))); ' +
'    inDate = inDate.substring(inDate.indexOf(" ") + 1); ' +
'    outDate.setHours(inDate.substring(0, inDate.indexOf(":"))); ' +
'    inDate = inDate.substring(inDate.indexOf(":") + 1); ' +
'    outDate.setMinutes(inDate); ' +
'    outDate = addTime(outDate, outDate.getTimezoneOffset() * 60 * 1000); ' +
'    return outDate; ' +
'}';
    script.innerHTML += '\n//]]>';
    doc.getElementsByTagName('head')[0].appendChild(script);
    // Get a list of all SMS notification links 
	var smsLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/perstvgids/kijkwekker/')]");
	if (smsLinks.length > 0) {
		for (var x=0; x<smsLinks.length; x++) {
                        smsLinks[x].href = "javascript:void(addToCalendar(" + smsLinks[x].href.substr(smsLinks[x].href.indexOf("/perstvgids/kijkwekker/") + 23,7) + "))";
		}
	}
}

