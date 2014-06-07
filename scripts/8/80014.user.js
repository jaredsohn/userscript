// ==UserScript==
// @name           TwitterTimezone
// @description    Modifies twitter pages to display timezone-related information
// @include http://twitter.com/*
// @match http://twitter.com/*
// ==/UserScript==
var req

function FetchData(sn) {
	req = new XMLHttpRequest()
	req.open("GET", "http://twitter.com/users/show.xml?screen_name=" + sn, true)
	//req.setRequestHeader("Content-Type", "text/xml")
	req.onreadystatechange = PageUpdate
	req.send()
}

function PageUpdate() {
	if (req.readyState == 4 && req.status == 200) {
		var doc = req.responseXML.documentElement
		var offset = 86400
		if (doc.getElementsByTagName("utc_offset")[0].childNodes[0])
			offset = doc.getElementsByTagName("utc_offset")[0].childNodes[0].nodeValue
		ApplyChanges(offset)
	}
}

function FormatTime(hr) {
	var ind = "AM"
	if (hr >= 12) {
		ind = "PM"
	}
	hr = hr%12
	if (hr == 0)
		hr = 12
	if (hr < 0) {
		hr = 12 + hr
		ind = "PM"
	}
	return [hr, ind]
}

function ApplyChanges(r_offset) {
	var cust_offset = r_offset/3600
	var cust_tz
	var cust_tz_dst
	var show_remote = true
	if (cust_offset == 0) {
		cust_tz = "UTC"
		cust_tz_dst = "UDT" //?
	}
	else if (cust_offset == -10) {
		cust_tz = "HST"
		cust_tz_dst = "HDT"
	}
	else if (cust_offset == -9) {
		cust_tz = "AKST"
		cust_tz_dst = "AKDT"
	}
	else if (cust_offset == -8) {
		cust_tz = "PST"
		cust_tz_dst = "PDT"
	}
	else if (cust_offset == -7) {
		cust_tz = "MST"
		cust_tz_dst = "MDT"
	}
	else if (cust_offset == -6) {
		cust_tz = "CST"
		cust_tz_dst = "CDT"
	}
	else if (cust_offset == -5) {
		cust_tz = "EST"
		cust_tz_dst = "EDT"
	}
	else if (cust_offset == -4) {
		cust_tz = "AST"
		cust_tz_dst = "ADT"
	}
	else if (cust_offset == +3) {
		cust_tz = "MSK"
		cust_tz_dst = "MSD"
	}
	else if (cust_offset == +8) {
		cust_tz = "AWST"
		cust_tz_dst = "AWDT"
	}
	else {
		show_remote = false
	}
    var elements = document.getElementsByClassName("published timestamp")
	
	if (elements) {
		var d = new Date(); var offset = d.getTimezoneOffset();
		offset = -offset/60;
		var tz = d.toString().split("(")[1].split(")")[0]
		var mini = true
		var daylight = false
		if (tz.search("Daylight") != -1)
			daylight = true
		if (mini) {
			var temp = ""
			var ch
			for (i=0; i<tz.length; ++i) {
				ch = tz.charAt(i)
				if (ch >= 'A' && ch <= 'Z') {
					temp = temp + ch
				}
			}
			tz = temp
		}
		for (var i in elements) {
			var inner = elements[i].innerHTML
			var tinfo = elements[i].getAttribute("data")
			tinfo = tinfo.split(" ")
			var utc_time = tinfo[3]
			var utc_time = utc_time.split(":")
			var local_time
			var hr = parseInt(utc_time[0], 10) + offset
			var ret = FormatTime(hr)
			var ind
			hr = ret[0]
			ind = ret[1]
			var r_hr = parseInt(utc_time[0], 10) + cust_offset
			if (daylight) {
				r_hr = r_hr + 1
				cust_tz = cust_tz_dst
			}
			var ret2 = FormatTime(r_hr)
			r_hr = ret2[0]
			var ind2 = ret2[1]
			local_time = hr + ":" + utc_time[1] + ":" + utc_time[2] + " " + ind + " " + tz
			var remote_time
			remote_time = r_hr + ":" + utc_time[1] + ":" + utc_time[2] + " " + ind2 + " " + cust_tz
			if ((offset == cust_offset && !daylight) || (offset == (cust_offset + 1) && daylight))
				show_remote = false
			if (show_remote)
				elements[i].innerHTML = inner + " [" + remote_time + "; " + local_time + "]"
			else
				elements[i].innerHTML = inner + " [" + local_time + "]"
		}
	}
}

{
	var sn = document.getElementsByClassName("screen-name")[0].innerHTML
	FetchData(sn)
}
