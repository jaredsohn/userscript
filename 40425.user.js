// ==UserScript==
// @name           Yahoo Hockey Calendar
// @namespace      Personal
// @description    Turn hocky practice/game date/time into an Add to Yahoo Calendar link
// @include http://www.usarinks.com/connect3/SilverStream/Pages/pgAPPRPT_LeagueSched.html?sched_id=57&fac=wilcoxon&facility_id=1
// @include http://www.usarinks.com/connect3/SilverStream/Pages/pgAPPRPT_LeagueSched.html?sched_id=58&fac=wilcoxon&facility_id=1
// ==/UserScript==
//

// You need to adjust the sched_id, fac, and facility_id params in the above to get this link to work for your rink,
// your league, etc....  read that out of the address bar.

var a = document.evaluate("//table[@bordercolor='#5f5f5f']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var b = document.evaluate("(//td[@width='12%']|//td[@width='20%']|//td[@width='22%'])/p/font/span", a.snapshotItem(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

var dateregex = new RegExp("^.* (\\d+)/(\\d+)/(\\d+)", "g")
var timeregex = new RegExp('^(\\d+):(\\d+) +([AP]M)')


var TIMEZONE = "0600" // Set this to YOUR timezone

function stripnl(x) {
	var y="";
	for(var i =0; i < x.length; ++i) {
		if(x.charAt(i) != "\n")
			y += x[i];
		}
	return y;
}

for(var i=0; i < b.snapshotLength; i += 6) {

	var date = b.snapshotItem(i).innerHTML;
	//GM_log(date)
	date = date.replace(dateregex, "20$3$1$2");
	//GM_log(date)

	//GM_log("'".concat(time).concat("'"))
	var m = timeregex.exec(b.snapshotItem(i+1).innerHTML);
	if(m[3] == 'PM') {
		hour = (m[1]|0) + 12
	} else {
		hour = m[1]
	}
	var time = "T".concat(hour).concat(m[2]).concat("00%2D").concat(TIMEZONE)
	var title = stripnl('Hockey:'.concat(b.snapshotItem(i+2).innerHTML).concat(" ").concat(b.snapshotItem(i+4).innerHTML))
	var in_loc= b.snapshotItem(i+5).innerHTML
	var DUR="0100"

	var uri="?v=60".concat("&ST=").concat(date).concat(time)
		.concat("&TITLE=").concat(encodeURIComponent(title))
		.concat("&DUR=").concat(DUR)
		.concat("&in_loc=").concat(encodeURIComponent(in_loc).concat("&TYPE=34"));
		//.concat("&HAS_REM=1&rem_1=3600&rem_2=1800&REM_CHK_AP=on&REM_DST_AP=").concat(encodeURIComponent("2565209746@mobile.mycingular.com"));

	//GM_log(uri)

	var newElement = document.createElement('a');
	newElement.href = "http://calendar.yahoo.com".concat(uri);
	newElement.innerHTML='Yahoo';
	newElement.target='_blank';
	b.snapshotItem(i).parentNode.insertBefore(newElement, b.snapshotItem(i).nextSibling);
}
