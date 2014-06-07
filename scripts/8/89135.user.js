// ==UserScript==
//
// @name            Rate MyMap Professors
// @namespace       DrNick
// @description     Extends BYU's MyMap registration course listings with Rate My Professor information and links.
// @version         0.2.2
//
// @include         https://gamma.byu.edu/ry/ae/prod/registration/cgi/regOfferings.cgi
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
//
// @history         0.2.2 - Changed for loops from for..in to for..length
// @history         0.2.1 - Removed dependency on external (now non-existent) updater script
//                        - Tweaked click-drag to prevent text selection
//                        - Updated jQuery to 1.7
// @history         0.2.0 - Significant changes to teacher searching and error handling
//                        - Fixed broken error handling when multiple candidates returned from search
//                        - Extended searching of candidates using their rest-of-name (if exact and first-name-partial fails)
//                        - Made all name comparisons case-insensitive
//                        - Changed DOMification of returned HTML so more tags are removed (images, style, head)
//                          This makes loading requests somewhat faster (no/fewer images, etc)
//                        - Added a timeout for remote requests (10 seconds)
// @history         0.1.1 - Added support for auto-updating (with force checking)
// @history         0.1.0 - Initial (buggy) release
//
// ==/UserScript==

var g_throbber = "http://misc.www.physics.byu.edu/ratemymap/throbber.gif";
var g_remoteCSS = "http://misc.www.physics.byu.edu/ratemymap/css.css";
var g_baseSearchUrl = "http://www.ratemyprofessors.com/SearchProfs.jsp?letter=";
var g_baseTeacherUrl = "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=";

var g_lNameRegex = /^([^,]+)/;
var g_fNameRegex = /^[^,]+, ([^\s]+)/;
var g_rNameRegex = /^[^,]+, [^\s]+ ([^$]+)/;

var g_timeout = 10000;

var g_curVer = '0.2.0';
var g_scriptId = 89135;
var g_debug = false;

String.prototype.trim = function() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

function error(msg) {
	if (console && console.log)
		console.log(msg);
	
	alert("Error:\n\n" + msg);
}

function loadRemoteStyle(url) {
	var link = $("<link rel='stylesheet' href='" + url + "' />");
	$(link).appendTo("head");
}

function main() {

	var test = {
		fullName: "Bob, Billy",
		event: { pageX: 800, pageY: 300 },
		result: { quality: "5.4", clarity: "3.8", helpfulness: "2.1", easiness: "9.0", fullName: "Billy Bob", numRatings: 10, department: "Stuff and Things",
			url: "http://www.ratemyprofessors.com/SelectTeacher.jsp?sid=135" 
		},
	};
		
	// showPopup(test); return;

	var classTable = findClassTable();
	
	if (classTable == null)
		return;
		
	loadRemoteStyle(g_remoteCSS);
	
	var teachers = findInstructorsInTable(classTable);

	if (!teachers)
		return error("Unable to find teachers in table");
}

function findClassTable() {
	var tables = document.getElementsByTagName("table");
	
	for (var i = 0; i < tables.length; i++) {
	//for (var i in tables) {
		var table = tables[i];
		var trs = table.getElementsByTagName("tr");
		
		for (var j = 0; j < trs.length; j++) {
		//for (var j in trs) {
			var tr = trs[j];
			
			if (tr.innerHTML.match("Instructor"))
				return table;
		}
	}
	
	return null;
}

function findInstructorsInTable(table) {
	if (!table)
		return null;
	
	var teachers = [];
	var rows = table.getElementsByTagName("tr");
	
	if (!rows) return null;
	if (rows.length <= 1) return null;
	
	// find instructor column
	var tIndex = -1;
	var heads = rows[0].getElementsByTagName("th");
	
	for (var i = 0; i < heads.length; i++) {
	//for (var i in heads) {
		var head = heads[i];
		if (head.innerHTML.match("Instructor"))
			tIndex = i;
	}
	
	if (tIndex == -1)
		return error("could not find instructor column index");
	
	// skip first header row
	for (var i = 1; i < rows.length; i++) {
		var row = rows[i];		
		var cells = row.getElementsByTagName("td");
		
		// add teacher
		if (cells[tIndex]) {
			var teacher = cells[tIndex].textContent.trim();
			teachers.push(teacher);
			
			var link = document.createElement("a");
			link.href = "javascript:;";
			link.innerHTML = teacher;
			link.className = 'teacherLink';
			link.addEventListener("click", teacherClick, true);
			
			cells[tIndex].innerHTML = '';
			cells[tIndex].appendChild(link);
		}
	}
	
	return teachers;
}

function addThrobber(cell) {
	var throbber = document.createElement("img");
	throbber.className = "throbber";
	throbber.src = g_throbber;
	
	cell.appendChild(throbber);
	return throbber;
}

function removeThrobber(throbber) {
	// var throbs = cell.getElementsByClassName("throbber");
	
	// if (throbs)
		// for (var i in throbs)
			// cell.removeChild(throbs[i]);
			
	throbber.parentNode.removeChild(throbber);
}

function teacherClick(event) {
	//showPopup(event.pageX, event.pageY, event.target);
	//return;

	var fullName = this.textContent.trim();
	var lastName = fullName.match(g_lNameRegex)[1];
	var firstName = fullName.match(g_fNameRegex)[1];
	var restName = "";
	
	if (fullName.match(g_rNameRegex) != null)
		restName = fullName.match(g_rNameRegex)[1];		
	
	if (g_debug)
		alert("Full name: '" + fullName + "'\nLast name: '" + lastName + "'\nFirst name: '" + firstName + "'\nRest of name: '" + restName + "'");
		
	var teacherRequest = { event: event, fullName: fullName, firstName: firstName, lastName: lastName, restName: restName, results: null };
	
	var parent = this.parentNode;
	var throbber = addThrobber(parent);
	
	// timeout function
	var xmlHandle = null;
	var timeoutHandle = setTimeout(function() { 
		if (xmlHandle)
		{
			xmlHandle.abort();
			removeThrobber(throbber);
			alert("Server taking too long to respond.  Request cancelled.");
		}
	}, g_timeout);
	
	xmlHandle = GM_xmlhttpRequest( {
		method: 'GET',
		url: g_baseSearchUrl + lastName,
		onerror: searchError,
		onload: function(response) {
			searchLoad(teacherRequest, throbber, response, timeoutHandle);
		},
	} )
}

function searchError(response) {
	alert("Search failed. Server said: " + response.statusText + " (" + response.status + ")");
}

function parseHtml(html)
{
	var dom = document.createElement("div");
	
	//html = /<body[^>]*?>([\s\S]+?)<\/body>/gi.exec(html)[1];
	html = html.replace(/<head(.|\s)*?\/head>/gi, '');
	html = html.replace(/<script(.|\s)*?\/script>/gi, '');
	html = html.replace(/<style(.|\s)*?\/style>/gi, '');
	html = html.replace(/<img[^>]+?>/gi, '');
	
	dom.innerHTML = html;
	return dom;
}

function searchLoad(teacherRequest, throbber, response, timeoutHandle) {
	
	clearInterval(timeoutHandle);
	
	var dom = parseHtml(response.responseText);
	
	var tables = dom.getElementsByTagName('table');
	var results_table = null;
	
	for (var i = 0; i < tables.length; i++) {
	//for (var i in tables) {
		var table = tables[i];
		if (table.id == "rmp_table")
			results_table = table;
	}

	if (results_table == null) {
		removeThrobber(throbber);
		return error("Results table not found");
	}
	
	var teachers = findTeacherInResponse(teacherRequest, results_table);
	
	if (teachers == null) {
		removeThrobber(throbber);
		return error("Unable to find any matching teachers");
	}
		
	if (teachers.length > 1) {
		if (g_debug)
			for (var i = 0; i < teachers.length; i++)
				alert(teachers[i].fullName);
			
		removeThrobber(throbber);
		return error("Found multiple candidates");
	}
	
	teacherRequest.result = teachers[0];
	
	// timeout function
	var xmlHandle = null;
	var timeoutHandle = setTimeout(function() { 
		if (xmlHandle)
		{
			xmlHandle.abort();
			removeThrobber(throbber);
			alert("Server taking too long to respond.  Request cancelled.");
		}
	}, g_timeout);
	
	xmlHandle = GM_xmlhttpRequest( {
		method: 'GET',
		url: teacherRequest.result.url,
		onerror: teacherPageError,
		onload: function(response) {
			teacherPageLoad(teacherRequest, response, timeoutHandle);
			removeThrobber(throbber);
		},
	} )
	
	//openWindow(teacherRequest.result.url);
	//GM_openInTab(teacherRequest.result.url);
}

function teacherPageError(response) {
	alert("Failed to load teacher page. Server said: " + response.statusText + " (" + response.status + ")");
}

function teacherPageLoad(teacherRequest, response, timeoutHandle) { 
	
	clearInterval(timeoutHandle);
	
	var dom = parseHtml(response.responseText);
	
	var scoreCard = $("#scoreCard", dom);
	
	if (scoreCard.length == 0)
		return error("No ratings available for teacher.");
	
	var quality = $("#quality strong", scoreCard).text();
	var helpfulness = $("#helpfulness strong", scoreCard).text();
	var clarity = $("#clarity strong", scoreCard).text();
	var easiness = $("#easiness strong", scoreCard).text();
	
	teacherRequest.result.quality = quality;
	teacherRequest.result.helpfulness = helpfulness;
	teacherRequest.result.clarity = clarity;
	teacherRequest.result.easiness = easiness;
	
	var profInfo = $("#profInfo li strong", dom);
	
	teacherRequest.result.fullName = profInfo.eq(0).text();
	teacherRequest.result.department = profInfo.eq(3).text();
	
	teacherRequest.result.numRatings = $("#rateNumber strong", dom).text();
	
/*
	teacherRequest.result.comments = [];
	$("#ratingTable .entry", dom).each( function() {
		var comment = {
			date: $(this).find(".date").text(),
			course: $(this).find(".class").text(),
			rating: $(this).find(".rating p").eq(0).text(),
			text: $(this).find(".commentText").text(),
		}
		
		teacherRequest.result.comments.push(comment);
	} );
*/	
	
	showPopup(teacherRequest);
}

function showPopup(teacherRequest) {

	var x = teacherRequest.event.pageX;
	var y = teacherRequest.event.pageY;

	var popContainer = document.createElement("div");
	popContainer.className = 'ratingsContainer';
	
	var popTitleBar = document.createElement("div");
	popTitleBar.className = 'ratingsTitleBar';
	
	var popContent = document.createElement("div");
	popContent.className = 'ratingsContent';
	
	var popComments = document.createElement("div");
	popComments.className = 'commentsBox';
	
	popContainer.style.left = (x + 5) + "px";
	popContainer.style.top = (y + 5) + "px";
		
	popContainer.addEventListener("mousedown", 
		function(event) {
			$(this).attr("dragging", "true");
			$(this).attr("startX", event.pageX);
			$(this).attr("startY", event.pageY);
			$(this).attr("offsetX", parseInt(this.style.left));
			$(this).attr("offsetY", parseInt(this.style.top));
			this.style.zIndex = "1000";
			document.body.focus();
			event.preventDefault();
		}, true);
		
	popContainer.addEventListener("mouseup", 
		function(event) {
			$(this).attr("dragging", "false");
			this.style.zIndex = "2";
		}, true);
		
	popContainer.addEventListener("mousemove", 
		function(event) { 
			if ($(this).attr("dragging") == "true") {
				this.style.left = ($(this).attr("offsetX") * 1 + event.pageX - $(this).attr("startX") * 1) + "px";
				this.style.top = ($(this).attr("offsetY") * 1 + event.pageY - $(this).attr("startY") * 1) + "px";
				document.body.focus();
			}
			return false;
		}, true);
	
	var closeButton = $("<div class='ratingsCloseButton'>x</div>")[0];
	closeButton.addEventListener("click", function() { $(popContainer).fadeOut("fast"); }, true);
	popTitleBar.innerHTML = "&nbsp;Teacher Rating based on <b>" + teacherRequest.result.numRatings + "</b> ratings";
	popTitleBar.appendChild(closeButton);
	
	popContent.innerHTML = "<a target='_blank' href='" + teacherRequest.result.url + "'>" + teacherRequest.result.fullName + "</a>" +
		"<span class='department'>&ndash; " + teacherRequest.result.department + "</span>" + 
		"<ul>" +
		"<li class='quality'><span class='score'>" + teacherRequest.result.quality + "</span><span class='label'>Overall Quality</span></li>" +
		"<li class='helpfulness'><span class='score'>" + teacherRequest.result.helpfulness + "</span><span class='label'>Helpfulness</span></li>" +
		"<li class='clarity'><span class='score'>" + teacherRequest.result.clarity + "</span><span class='label'>Clarity</span></li>" +
		"<li class='easiness'><span class='score'>" + teacherRequest.result.easiness + "</span><span class='label'>Easiness</span></li>" +
		"</ul>";
	
/*
	if (teacherRequest.result.comments.length > 0) {
		var comment = $("<div class='comment'></div>")[0];
		comment.innerHTML = formatComment(teacherRequest.result.comments[1]);
		popComments.appendChild(comment);
	}
	else {
		popComments.innerHTML = "No comments for this teacher.";
	}
	
	var showCommentsButton = $("<a class='commentButton' href='javascript:;'>Show comments</a>")[0];
	showCommentsButton.addEventListener("click", function() { $(popComments).slideDown('fast'); }, true);
*/

	popContainer.appendChild(popTitleBar);
	popContainer.appendChild(popContent);
	//popContainer.appendChild(showCommentsButton);
	//popContainer.appendChild(popComments);
	
	$(popContainer).appendTo("body").fadeIn("fast");
	
	if (popContainer.offsetLeft + popContainer.offsetWidth > window.innerWidth)
		popContainer.style.left = window.innerWidth - popContainer.offsetWidth - 10 + "px";
}

/*
function formatComment(comment) {
	var c = "<div class='commentHead'>" + 
		"<span class='date'>" + comment.date + "</span>" + 
		"<span class='course'>" + comment.course + "</span>" + 
		"<span class='rating'>" + comment.rating + "</span>" + 
		"</div><div class='commentBody'>" + comment.text + "</div>";
		
	return c;
}
*/

function openWindow(url) {
	var win = window.open(url);
	
	if (win == null)
		alert("Unable to open teacher details window.\n\n" +
			"Click the Options button in the yellow bar at the top of this window and select 'Allow pop-ups for gamma.byu.edu'");
}

function findTeacherInResponse(teacherRequest, table) {
	var rows = table.getElementsByTagName("tr");
	
	var candidates = [];
	
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var cells = row.getElementsByTagName("td");
		
		if (cells.length != 4)
			continue;
		
		var nameCell = cells[1];
		var schoolCell = cells[2];
		var regionCell = cells[3];
		
		var nameAnchor = nameCell.firstChild;
		var schoolAnchor = schoolCell.firstChild;
		var regionAnchor = regionCell.firstChild;
		
		var teacherName = nameAnchor.textContent;
		var schoolName = schoolAnchor.textContent;
		var regionName = regionAnchor.textContent;

		// extract last name
		var lastName = teacherName.match(g_lNameRegex);
		if (lastName) 
			lastName = lastName[1]; 
		else 
			lastName = '';
		
		// extract first name
		var firstName = teacherName.match(g_fNameRegex);
		if (firstName)
			firstName = firstName[1];
		else
			firstName = '';
			
		// extract rest of name
		var restName = teacherName.match(g_rNameRegex);
		if (restName)
			restName = restName[1];
		else
			restName = '';
		
		if (lastName.toLowerCase() == teacherRequest.lastName.toLowerCase()) {
			if (schoolName.indexOf("Brigham Young") != -1 && regionName.indexOf("UT") != -1) {
				var tid = nameAnchor.href.match(/tid=(\d+)/)[1];
				
				candidates.push( {
					tid: tid,
					url: g_baseTeacherUrl + tid,
					fullName: teacherName,
					firstName: firstName,
					lastName: lastName,
					restName: restName,
					school: schoolName,
				} );
			}
		}
	}
	
	if (g_debug) {
		alert("Found " + candidates.length + " candidates");
		for (var i = 0; i < candidates.length; i++)
			alert(candidates[i].tid + " : " + candidates[i].fullName);
	}
			
	if (candidates.length == 0)
		return null;
	
	if (candidates.length == 1)
		return candidates;
	
	// Look for exact matches (first name)
	var exactMatches = [];
	
	for (var i = 0; i < candidates.length; i++) {
		var candidate = candidates[i];
		if (candidate.firstName.toLowerCase() == teacherRequest.firstName.toLowerCase()) {
			exactMatches.push(candidate);
		}
	}
	
	if (g_debug) {
		alert("Found " + exactMatches.length + " exact matches");
		for (var i = 0; i < exactMatches.length; i++)
			alert(exactMatches[i].fullName);
	}	
		
	if (exactMatches.length >= 1)
		return exactMatches;
	
	// Now try looking for partial matches (first name as substring)
	var partialMatches = [];
	
	for (var i = 0; i < candidates.length; i++) {
		var candidate = candidates[i];
		if (teacherRequest.fullName.toLowerCase().indexOf(candidate.firstName.toLowerCase()) != -1)
			partialMatches.push(candidate);
	}
	
	if (g_debug) {
		alert("Found " + partialMatches.length + " partial (first name) matches");
		for (var i = 0; i < partialMatches.length; i++)
			alert(partialMatches[i].fullName);
	}
	
	if (partialMatches.length >= 1)
		return partialMatches;
		
	// Last try looking for partial matches based on rest of name (rest-of-name as substring)
	partialMatches = [];
	
	for (var i = 0; i < candidates.length; i++) {
		var candidate = candidates[i];
		if (candidate.restName.length > 0)
			if (teacherRequest.fullName.toLowerCase().indexOf(candidate.restName.toLowerCase()) != -1)
				partialMatches.push(candidate);
	}
	
	if (g_debug) {
		alert("Found " + partialMatches.length + " partial (rest of name) matches");
		for (var i = 0; i < partialMatches.length; i++)
			alert(partialMatches[i].fullName);
	}
	
	if (partialMatches.length > 0)
		return partialMatches;
	
	// Failed to find anything	
	return null;
}


main();