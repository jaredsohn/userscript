// ==UserScript==
// @name           iloveclassics ShoutBox Mod
// @namespace      http://userscripts.org/users/266001
// @include        http://www.iloveclassics.com/sb.php*
// @version        1.0
// ==/UserScript==

// GM emulation for Google Chrome
if (typeof GM_deleteValue == "undefined") {
	GM_log = function(message) {
		console.log(message); };
	
	// Uses http://ericflin.com/scripts/restproxy.php as a proxy for cross-site xhr
	GM_xmlhttpRequest = function(args) {
		var xhr = new XMLHttpRequest();
		if (xhr) {
			var data = "u=" + encodeURIComponent(args.url);
			if (args.method == "POST") {
				data += "&data=" + encodeURIComponent(args.data); }
			xhr.open("POST", "http://ericflin.com/scripts/restproxy.php?m=" + args.method, true);
			
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Content-Length", data.length);
			xhr.setRequestHeader("Connection", "close");
			
			xhr.send(data);
			
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					args.onload(xhr); } }; } };
	
	GM_getValue = function(key) {
		var value = localStorage.getItem(key);
		return JSON.parse(value); };

	GM_setValue = function(key, value) {
		localStorage.setItem(key, JSON.stringify(value)); }; }

function SBMod() {
	var userzone = new Object(); // Associative array of users and their timezones
	var localtime = GM_getValue("localzone") ? GM_getValue("localzone") : 0; // Local timezone
	var uzstore = GM_getValue("uzstore"); // Load userzone from browser storage
	if (uzstore != null && uzstore != false && typeof uzstore != "undefined") {
		userzone = JSON.parse(uzstore); }
	
	// Given a b tag with an a tag, gets the username from the onclick tag in the a for the user
	this.getUserFromB = function(bTag) {
		// Checks that the <b> tag has children
		if (bTag.childNodes && bTag.childNodes[0]) {
			// Get its first child
			var nameTag = bTag.childNodes[0];
			
			// An <a> tag has a user in its onclick attribute if it's actually an <a> tag and links to userdetails.
			if (nameTag.nodeName == "A" && nameTag.href.indexOf("userdetails.php") != -1 &&
				nameTag.attributes.getNamedItem("onclick")) {
				// Get the onclick attribute and extract the username
				var clickActionText = nameTag.attributes.getNamedItem("onclick").value;
				return clickActionText.substring(clickActionText.indexOf("\'") + 1, clickActionText.indexOf(":\'")); }
				
			// With system messages, the first child is "System," so just return that.
			else if (nameTag.nodeName == "#text" && nameTag.nodeValue == "System") {
				return nameTag.nodeValue; } }
		// No children? No user.
		else {
			return false; } };
	
	// Takes a time string (e.g. [08:57 PM]) and returns in minutes since midnight.
	this.parseTime = function(sTime) {
		// Remove the brackets
		var time = sTime.replace(/[\[\]]/g, "");
		
		// Convert it to minutes
		var aHHMM = time.split(":", 2);
		var add = sTime.indexOf("PM") == -1 ? 0 : 12;
		var hh = parseInt(aHHMM[0], 10); // Don't add any hours if it's AM. Add 12 if it's PM.
		
		// Treat noon and midnight differently.
		if (hh == 12) {
			// If it's 12 PM, we'll get 0 + 12 = 0. If it's 12 AM, we'll get 0 + 0 = 0.
			hh = 0; }
		
		var minutes = (hh + add) * 60 + parseInt(aHHMM[1], 10);

		return minutes; };
	
	// Takes a time in minutes since midnight and applies a timezone to it
	this.convertTime = function(iTime, zone) {
		// Adds a timezone to the minutes since midnight
		var t = iTime + (zone * 60);
		
		// Add a day if their minutes since midnight is negative
		if (t < 0) {
			t += 1440; }
		
		// Converts the time back to HH:MM
		var hourDecimal = t / 60;
		var hh = Math.floor(hourDecimal);
		var mm = Math.round((hourDecimal - hh) * 60);
		
		// Finds out if it's AM or PM
		var meridiem = "";
		if (hh > 12) {
			hh -= 12;
			if (hh > 12) {
				hh -= 12;
				meridiem = " AM"; }
			else if (hh == 12) {
				meridiem = " AM"; }
			else {
				meridiem = " PM"; } }
		else if (hh == 12) {
			meridiem = " PM"; }
		else if (hh == 0) {
			hh = 12;
			meridiem = " AM"; }
		else {
			meridiem = " AM"; }
		
		// Add a zero in front of hour and minute if it's only one digit.
		if (mm < 10) {
			mm = "0" + mm; }
		if (hh < 10) {
			hh = "0" + hh; }
	
		return hh + ":" + mm + meridiem; };
	
	// Given a <b> tag containing a username, gets the corresponding shout time from the <font> tag
	this.getShoutTime = function(bTag) {
		// Check to see if user is system first (easiest case - just pass the entire span tag's contents to parseTime)
		if (bTag.childNodes && bTag.childNodes[0] && bTag.childNodes[0].nodeValue == "System") {
			return this.parseTime(bTag.parentNode.innerHTML); }
		else {
			var curTag = bTag; // Current tag being tested for a timestamp.
			var count = 0; // Prevent infinite loops. Maximum of 5 previous sibling distance allowed.
			
			// Find the tag with a timestamp
			while (curTag.nodeName != "FONT" && count < 5) {
				curTag = curTag.previousElementSibling;
				count++; }
			
			// Return the shout time in minutes
			return this.parseTime(curTag.innerHTML); } };
	
	// Adds title to users with timezones stored. Also saves the
	// last message so the user can be notified of new ones.
	this.addHoverTime = function() {
		// Get all the usernames. They all reside within <b>old tags and onclick attributes 
		// for <a> tags within the bold tags have the usernames
		var bolds = document.getElementsByTagName("b");
		
		for each (var aBold in bolds) {
			// Make sure this <b> tag hasn't been checked yet.
			if (aBold.attributes && !aBold.attributes.getNamedItem("set")) {
				
				// Get the username, if any
				var username = this.getUserFromB(aBold);
			
				// Only modify if there's a username and if a timezone's stored for the user.
				if (username) {
					var timezone = userzone[username];
					
					// Get the user's shout's time (in GMT)
					var shoutTime = this.getShoutTime(aBold);
					
					if (timezone) {
						// Convert to the user's timezone and make it show when mouse hovers over it (title)
						var UTCstring = "UTC";
						if (timezone > 0) {
							UTCstring += "+"; }
						aBold.title = this.convertTime(shoutTime, timezone) + " (" + UTCstring + timezone + ")"; }
					else {
						// Show the time in UTC when mouse hovers over
						aBold.title = this.convertTime(shoutTime, 0) + " (UTC)"; } } 
			
				aBold.setAttribute("set", "true"); } } };
				
	// Gets the last (newest) message
	this.getLastMessage = function() {
		// There's a message after every bold tag that has a user, so get those.
		var bolds = document.getElementsByTagName("b");
		
		// The third bold tag of the page (index 2) seems to be next to the latest message, so get that
		var msg = bolds[2].nextSibling.nodeValue;
		
		// This function should only be called once for every time the messages are loaded via AJAX.
		bolds[2].setAttribute("last", "true");
		
		return msg; };

	// Puts the time displayed in your local timezone
	this.setToLocal = function() {
		var times = document.getElementsByTagName("font");
		
		for each (var time in times) {
			if (time.parentNode && time.parentNode.id != "LiveClockIE" && !time.attributes.getNamedItem("set")) {
				time.setAttribute("set", "true");
				var shoutT = this.parseTime(time.innerHTML);
				
				// Only convert to local time if the font tag has a time.
				if (!isNaN(shoutT)) {
					time.innerHTML = "[" + this.convertTime(shoutT, localtime) + "]"; }
					
				// The font tag might be inside a system message, so check to see if it is and set the time if appropriate.
				else if(isNaN(shoutT)) {
					// Check to see that it has grandparents (system message font tags have <span> as their grandparents)
					if (time.parentNode.parentNode) {
						// Get the time from the hypothetical span tag, if available.
						shoutT = this.parseTime(time.parentNode.parentNode.innerHTML);
						if (!isNaN(shoutT)) {
							var find = "[" + this.convertTime(shoutT, 0) + "]"; // Get the time in UTC
							var replace = "[" + this.convertTime(shoutT, localtime) + "]"; // Get the time in local
							
							// Replace UTC with localtime
							time.parentNode.parentNode.innerHTML = time.parentNode.parentNode.innerHTML.replace(find, replace); } } } } } };
	
	// Sets the local timezone
	this.setLocaltime = function(timezone) {
		localtime = timezone;
		GM_setValue("localzone", timezone); };
		
	// Injects a script that notifies the user when there's new messages
	this.enableNotifyUser = function() {
		// Checks whether there's a new message and sets the document title to notify that there's a new message
		var usernotify = function() {
			var oldtitle = document.title;
			var timeout; // for clearing the interval when the window is refocused.
			var last = ""; // Last new message
			var numNew = 0; // Number of new messages. Start at negative 1 because the first message checked won't be blank.
			
			// When the window's focused (i.e. clicked on), no new messages.
			window.addEventListener("focus", function() {
				clearInterval(timeout);
				numNew = 0;
				document.title = oldtitle; }, false);
			
			// Check for new messages every 500 milliseconds while the window's in the background (i.e. blurred)
			window.addEventListener("blur", function() {
				last = getLastMessage();
				timeout = setInterval(function() {
					if (last != getLastMessage()) {
						last = getLastMessage();
						numNew++; }
					if(numNew > 0) {
						document.title = numNew + " New Message(s) at " + oldtitle; } }, 500); }, false); };
		
		// Inject the user notification function (with focus and blur event listeners)
		var inject = document.createElement("script");
		inject.type = "text/javascript";
		inject.textContent = "var getLastMessage = " + this.getLastMessage + ";\n" + 
			"(" + usernotify + "());";
		document.body.appendChild(inject); };
	
	// Makes an html manager for user timezones.
	var addMan = function() {
		var manager = document.createElement("div");
		manager.style.display = "none";
		manager.id = "tzman";
		
		for (var i in userzone) {
			var userinfo = document.createElement("p");
			var ut = ": UTC";
			if (userzone[i] > 0) {
				ut += "+"; }
			var uinfoText = document.createTextNode(i + ut + userzone[i] + " ");
			
			var del = document.createElement("a");
			var delText = document.createTextNode("(Delete)");
			del.href = "#";
			(function(del, userinfo, i) {del.addEventListener("click", function(e) {
				delete userzone[i];
				GM_setValue("uzstore", JSON.stringify(userzone));
				del.parentNode.removeChild(del);
				userinfo.parentNode.removeChild(userinfo);
				e.preventDefault(); }, false); }(del, userinfo, i));
			del.appendChild(delText);
			
			userinfo.appendChild(uinfoText);
			userinfo.appendChild(del);
			manager.appendChild(userinfo); }
		var hintP = document.createElement("p");
		var hint = document.createTextNode("Please enter a positive or negative number for the timezone (e.g. 5, -6.5, -3, 8)");
		hintP.appendChild(hint);
		manager.appendChild(hintP);
		
		var newinfoWrapper = document.createElement("span");
		var newinfoText = document.createTextNode("Add User: ");
		newinfoWrapper.appendChild(newinfoText);
		manager.appendChild(newinfoWrapper);
		
		var newu = document.createElement("input");
		newu.type = "text";
		newu.value = "Username";
		newu.id = "newu";
		manager.appendChild(newu);
		
		var newtz = document.createElement("input");
		newtz.type = "text";
		newtz.value = "Timezone";
		newtz.id = "newtz";
		manager.appendChild(newtz);
		
		var act = document.createElement("a");
		var actText = document.createTextNode("(Add)");
		act.href = "#";
		act.addEventListener("click", function(e) {
			userzone[document.getElementById("newu").value] = document.getElementById("newtz").value; 
			document.getElementById("newu").value = "";
			document.getElementById("newtz").value = "";
			
			GM_setValue("uzstore", JSON.stringify(userzone));
			
			var newman = addMan();
			manager.parentNode.replaceChild(newman, manager);
			newman.style.display = "block";
			e.preventDefault(); }, false);
		act.appendChild(actText);
		manager.appendChild(act);
		return manager; }
	
	// Loads a user interface (links next to Shoutbox) for the user to set timezone for other users and local timezone.
	this.loadUI = function() {
		var sbox = document.getElementsByTagName("center")[0];

		var tman = addMan();
		var setOthers = document.createElement("a");
		var setOthersText = document.createTextNode(" (Set Users' Timezones)");
		setOthers.addEventListener("click", function(evt) { var man = document.getElementById("tzman"); if (man.style.display == "none") { man.style.display = "block"; } else { man.style.display = "none"; } evt.preventDefault(); }, false);
		setOthers.href = "#";
		setOthers.appendChild(setOthersText);
		sbox.appendChild(setOthers);
	
		var setSelf = document.createElement("a");
		var setSelfText = document.createTextNode(" (Set Display Timezone)");
		setSelf.addEventListener("click", function(evt) {
			var lt = prompt("Please enter the timezone in which you want shouts displayed (e.g. 6, -5, -3.5):", localtime);
			if (lt) {
				localtime = lt;
				GM_setValue("localzone", lt); }
			evt.preventDefault(); }, false);
		setSelf.href = "#";
		setSelf.appendChild(setSelfText);
		sbox.appendChild(setSelf);
		
		sbox.appendChild(tman); }; }

var mod = new SBMod();
mod.loadUI();
mod.enableNotifyUser();
setInterval(function() {
	mod.addHoverTime();
	mod.setToLocal(); }, 500);