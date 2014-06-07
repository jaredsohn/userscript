// ==UserScript==
// @name           MLB.tv Time Zones
// @namespace      mtvz
// @description    Modifies the times listed on the MLB.tv media center to have times in Pacific Time, instead of Eastern Time
// @include        http://mlb.mlb.com/mediacenter/*
// ==/UserScript==

var time_differential = -3;
var time_header = 'Time PT';

var mgTimes = document.evaluate("//*[@class='mmg_time']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = mgTimes.snapshotLength - 1; i >= 0; i--) {
	var elem = mgTimes.snapshotItem(i);
	
	// Check to make sure if this is a time cell
	if(elem.innerHTML.indexOf(':') == -1) {
		// If not, is this the header?
		if(elem.innerHTML.indexOf('ET') != -1) {
			elem.innerHTML = time_header;
		}
		continue;
	}
	
	// Break up the time cell into its component parts
	var time_parts = new Array();
	time_parts =  elem.innerHTML.split(':');
	
	hour = time_parts[0] * 1;
	
	m_ampm = time_parts[1].split(' ');
	minutes = m_ampm[0];
	ampm = m_ampm[1];

	hour +=  time_differential;
	
	// If we've wrapped around in time (from, e.g., 1pm to 11 am) rebase the time
	if(hour < 1)
		hour += 12;
	
	// If we *did* wrap around time, change the ampm (but not if the new time is 
	// twelve, but definitely if the old time was twelve)
	if(hour < 12 && hour >= 12 + time_differential)
		ampm = ampm == 'AM' ? 'PM' : 'AM';
	
	elem.innerHTML = hour.toString() + ':' + minutes + ' ' + ampm;
}