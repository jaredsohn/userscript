// ==UserScript==
// @name           TF2Maps Gameday Timezone Conversion
// @namespace      http://pseudochron.com
// @description    Converts the time listings in map tesing threads to your local time
// @include        http://forums.tf2maps.net/showthread.php*
// ==/UserScript==

function h12(h24) {
	if (typeof(h24) == "number") {
		var h24_str = h24.zfill(4);
	} else {
		var h24_str = h24;
	}
	var hour = parseInt(h24_str[0] + h24_str[1]);
	var m_str = h24_str[2] + h24_str[3];
	var suffix = " AM";
	if (hour > 23) {
		hour = hour - 24;
	}
	if (hour > 12) {
		hour = hour - 12;
		suffix = " PM";
	} else if (hour == 12) {
		suffix = " PM";
	} else if (hour == 0) {
		hour = "12";
	}
	return hour.toString() + ":" + m_str + suffix;
}

function h24(h12_str) {
	var t = h12_str.split(/:| /);
	var hour = parseInt(t[0]);
	var minute = parseInt(t[1]);
	if (t[2] == "PM" && hour != 12) {
		hour += 12;
	}
	return hour*100 + minute;
}

Number.prototype.zfill=function(x) {
   var n=this.toString();
   while(n.length<x)n="0"+n;
   return n;
}

function convertTimezone(h24,offset) {
	if (typeof(h24) == "number") {
		var t = h24;
	} else {
		var t = parseInt( h24.replace(/^00*/, '') );
	}
	
	var h_offset = parseInt(offset);
	var m_offset = 0;
	if (offset != h_offset) {
		m_offset = parseInt(offset.toString().split(".")[1])/10;
		m_offset *= 60;
		
		var h24_str = t.zfill(4);
		var m_str = h24_str[2] + h24_str[3];
		var m = parseInt(m_str);
		
		if (m + m_offset >= 60) {
			m_offset = m_offset - 60;
			h_offset += 1;
		}
	}
	var c = t + (h_offset*100 + m_offset);
	if (c < 0) {
		c = 2400 + c;	
	}
	return c;
}


// only run script if "Map Testing" is in the thread title
if (document.title.match("Map Testing")) {
	
	// determine user's timezone setting
	var regexp = /All times are GMT ([-+]\d+[/.\d]*). The time now is <span class="time">/;
	var user_offset = 0.0;
	if ( regexp.test(document.body.innerHTML) ) {
		user_offset = parseFloat(regexp.exec(document.body.innerHTML)[1]);
	}

	// find a starting time listing that specifies its GMT offset
	regexp = /<font color="(#?\w+)">\D*(\d+:\d+\s*[AP]M)\s*\(GMT\s*([-+]\d+)/;
	var start_time = regexp.exec(document.body.innerHTML); // [1]=color, [2]=time, [3]=offset
	
	// calculate localtime gameday start
	var offset = user_offset-parseFloat(start_time[3]);
	var local_start = h12(convertTimezone(h24(start_time[2]),offset));
	var color = start_time[1];
	
	// add local start time to top of time list
	var snapResults = document.evaluate("//td[starts-with(@id,'td_post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var first_post = snapResults.snapshotItem(0);
	var sign = "";
	if (user_offset >= 0) {
		sign = "+";	}
	var local_start_msg = "<font color='#f9612c'><b>Local time: "+local_start+" (GMT"+sign+user_offset+")</b></font>";
	var post_edit = first_post.innerHTML.replace("Event will begin at:","Event will begin at:<br />"+local_start_msg);
	first_post.innerHTML = post_edit;
	
	// add local time listings to table
	snapResults = document.evaluate("//table[starts-with(@id,'sorttable')]//td/font[@color='"+color+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
		var node = snapResults.snapshotItem(i);
		var t = node.textContent;
		var local = document.createElement('b');
		local.innerHTML = "<font color='#f9612c'> " + h12(convertTimezone(t,offset)) + "</font> ";
// 		node.parentNode.insertBefore(local,node.parentNode.firstChild);
		node.parentNode.appendChild(local);
	}
	
	
	// add timer to downloads
	var timerRunning = false;
	var secs;
	function linkClick(event) {
		event.target.setAttribute("style", "text-decoration: none !important; font-style: italic !important;");
		if (String(event.target.getAttribute("href")).match("http://forums.tf2maps.net/downloads.php?")) {
			var time_span = document.getElementById("time_span");
			var snapResults = document.evaluate("//table[starts-with(@id,'sorttable')]//td/a[starts-with(@href,'http://forums.tf2maps.net/downloads.php?')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
				snapResults.snapshotItem(i).setAttribute("class","timewait");
			}
// 			event.target.removeAttribute("class");
			if (!timerRunning) {
				secs = 30;
				timerRunning = true;
				var countdownID = setInterval ( ( function() {
					time_span.textContent = "(" + secs + ")";
					if (secs == 0) {
						clearInterval ( countdownID );
						for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
							snapResults.snapshotItem(i).removeAttribute("class");
						}
						timerRunning = false;
						time_span.textContent = "";
					}
					secs--;
				} ), 1000 );
			}
		}
	}	
	snapResults = document.evaluate("//table[starts-with(@id,'sorttable')]//td/a[@target='_blank']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (snapResults.snapshotLength) {
		var cindex = snapResults.snapshotItem(0).parentNode.cellIndex;
		var head = snapResults.snapshotItem(0).parentNode.parentNode.parentNode.previousSibling.firstChild.cells[cindex];
		var time_span = document.createElement("span");
		time_span.id = "time_span";
		time_span.setAttribute("style","position: absolute; margin-left: 30px;");
		head.appendChild(time_span);
		
		for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
			var node = snapResults.snapshotItem(i);
			node.addEventListener("click", linkClick, false);
		}
		GM_addStyle('.timewait { color: #aaa ! important; cursor: progress; }');
	}

}