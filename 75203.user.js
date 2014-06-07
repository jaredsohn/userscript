// ==UserScript==
// @name           SLA Tool
// @namespace      http://www.liferay.com/web/bijan.vakili/profile
// @description    Compatible with JIRA 3.13.5. Service Level Agreement (SLA) tool.
// @include        http*/secure/Dashboard.jspa*
// @include        http*/secure/IssueNavigator.jspa*
// @include        http*/secure/QuickSearch.jspa*
// ==/UserScript==
var cnt = 0;

// Is the page focused?
var windowHasFocus = false;
var originalDocumentTitle = document.title;
var newDocumentTitle = false;
var newDocumentCount = 0;
unsafeWindow.onblur = function () {
	windowHasFocus = false;
	unsafeWindow.onblur = '';
}

unsafeWindow.onfocus = function () {
	windowHasFocus = true;
	if (newDocumentTitle) {
		document.title = originalDocumentTitle;
	}
}

runSLATool();

function runSLATool() {
	var username;
	var fullname;
	var processedIssueNodes = [];

	function processAllIssueNodes() {
		var issues;
		var node;

		issues = xP_evaluate(xP_issues, document);

		for (var i = 0; i < issues.snapshotLength; i++) {
			node = issues.snapshotItem(i);

			if (node.innerHTML.match(/.*issuekey.*/g)) {
				processNodes(node);
			}
		}

		issues = xP_evaluate(xP_issuesTable, document);

		for (var i = 0; i < issues.snapshotLength; i++) {
			node = issues.snapshotItem(i);

			if (node.parentNode.parentNode.innerHTML.match(/.*issuekey.*/g)) {
				processNodes(node);
			}
		}

		if (/.*secure.QuickSearch.jspa.*/.test(location.href) == false)
			setTimeout("location.reload(true);", refreshTimeout * 1000);
	}

	function getUserName() {
		var un = xP_evaluate(xP_un, document);

		if (!un) {
			return;
		}

		if (!un.snapshotLength) {
			return;
		}

		if (un.snapshotLength == 0) {
			return;
		}

		return un.snapshotItem(0).href.replace(/.*=(.*)/, '$1');;
	}

	function getFullName() {
		var un = xP_evaluate(xP_un, document);

		if (!un) {
			return;
		}

		if (!un.snapshotLength) {
			return;
		}

		if (un.snapshotLength == 0) {
			return;
		}

		return un.snapshotItem(0).innerHTML;
	}

	function processNodes(node) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: node.href+'?' + jiraCommentsTabParameter,
			headers: {
				'User-agent': useragent,
				'Accept': texthtml,
			},
			onload: function (responseDetails) {
				var issuePage = document.createElement('div');

				issuePage.innerHTML = responseDetails.responseText;

				(issuePage.innerHTML);
				if (isIssueOpen(issuePage)) {

					var issue = [];

					issue.assignee = [];
					issue.assignee.username = DEFAULT_VALUE;
					issue.assignee.fullname = DEFAULT_VALUE;
					issue.comments = [];
					issue.comments.last = [];
					issue.comments.last.user = [];
					issue.comments.last.user.username = DEFAULT_VALUE;
					issue.comments.last.user.fullname = DEFAULT_VALUE;
					issue.comments.last.date = DEFAULT_VALUE;	  
					issue.customer = [];
					issue.customer.firstResponse = [];
					issue.customer.firstResponse.date = DEFAULT_VALUE;
					issue.customer.firstResponse.username = DEFAULT_VALUE;
					issue.customer.firstResponse.fullname = DEFAULT_VALUE;
					issue.firstResponse = [];
					issue.firstResponse.user = [];
					issue.firstResponse.user.username = DEFAULT_VALUE;
					issue.firstResponse.user.fullname = DEFAULT_VALUE;
					issue.firstResponse.date = DEFAULT_VALUE;
					issue.id = node.innerHTML;
					issue.priority = 1;
					issue.reporter = [];
					issue.reporter.username = DEFAULT_VALUE;
					issue.reporter.fullname = DEFAULT_VALUE;
					issue.reporter.responseDate = DEFAULT_VALUE;
					issue.reporter.xP_firstComment = DEFAULT_VALUE;
					issue.startDate = DEFAULT_VALUE;

					var imgNodeList = null;
					var imgNode = DEFAULT_VALUE;
					var allCommentsNodeList = null;
					var allCommentsNode = DEFAULT_VALUE;
					var postDateNode = DEFAULT_VALUE;
					var postDateNodeList = null;
					var reporterNodeList = null;
					var reporterNode = DEFAULT_VALUE;
					var assigneeNodeList = null;
					var assigneeNode = DEFAULT_VALUE;
					var commentNodeList = null;
					var commentNode = DEFAULT_VALUE;
					var reporterFirstCommentList = null;
					var reporterFirstCommentNode = DEFAULT_VALUE;
					var xP_reporterFirstComment = '';

					allCommentsNodeList = xP_evaluate(xP_allComments, issuePage);

					var match = false;
					var matchCustomerFirstResponse = false;

					for (var i = 0; i < allCommentsNodeList.snapshotLength ; i++) {

						if (match == true && matchCustomerFirstResponse == true) {
						  break;
						}

						allCommentsNode = allCommentsNodeList.snapshotItem(i);

						var k = getProjectUser(allCommentsNode.href.replace(/.*=(.*)/,'$1'));

						if (k != -1 && !match) {

							var userCommentNodeList = xP_evaluate(xP_visibility, allCommentsNode.parentNode);

							if (userCommentNodeList.snapshotLength > 0) {
								continue;
							}

							issue.firstResponse.user.username = allUsersAndUsernames[k];
							issue.firstResponse.user.fullname = allUsersAndUsernames[k-1];

							userCommentNodeList = xP_evaluate(xP_commentDate, allCommentsNode.parentNode);

							if (userCommentNodeList.snapshotLength > 0) {
								issue.firstResponse.date = userCommentNodeList.snapshotItem(0);
							}

							if (issue.firstResponse.date != DEFAULT_VALUE) {
								issue.firstResponse.date = issue.firstResponse.date.innerHTML;
							}

							match = true;

						  }
						  else if (issue.customer.firstResponse.username == DEFAULT_VALUE && match == true) {
							issue.customer.firstResponse.username = allCommentsNode.href.replace(/.*=(.*)/,'$1');
							issue.customer.firstResponse.fullname = allCommentsNode;

							userCommentNodeList = xP_evaluate(xP_commentDate, allCommentsNode.parentNode);

							if (userCommentNodeList.snapshotLength > 0) {
								issue.customer.firstResponse.date = userCommentNodeList.snapshotItem(0);
							}

							if (issue.customer.firstResponse.date != DEFAULT_VALUE) {
								issue.customer.firstResponse.date = issue.customer.firstResponse.date.innerHTML;
							}

							matchCustomerFirstResponse = true;

						  }

					}

					imgNodeList = xP_evaluate(xP_priority, issuePage);
					imgNode = DEFAULT_VALUE;

					for (var i = 0; i < imgNodeList.snapshotLength; i++) {
						imgNode = imgNodeList.snapshotItem(i);
					}

					if (imgNode != DEFAULT_VALUE) {
						for (var i=0; i < priorityRegexpList.length; i++) {
							if (priorityRegexpList[i].test(imgNode.src)) {
								issue.priority = i;
								break;
							}
						}
					}

					postDateNodeList = xP_evaluate(xP_postDate, issuePage);

					for (var i = 0; i < postDateNodeList.snapshotLength; i++) {
						postDateNode = postDateNodeList.snapshotItem(i);
					}

					if (postDateNode != DEFAULT_VALUE) {
						issue.startDate = postDateNode.innerHTML;
					}

					reporterNodeList = xP_evaluate(xP_reporter, issuePage);

					for (var i = 0; i < reporterNodeList.snapshotLength; i++) {
						reporterNode = reporterNodeList.snapshotItem(i);
					}

					if (reporterNode != DEFAULT_VALUE) {
						issue.reporter.username = reporterNode.id.replace(/.*issue_summary_reporter_(.*)/,'$1');
						issue.reporter.fullname = reporterNode.innerHTML;
					}

					xP_reporterFirstComment = xP_firstCommentByUsername.replace(PLACEHOLDER_USERNAME, issue.reporter.username);
					reporterFirstCommentList = xP_evaluate(xP_reporterFirstComment, issuePage);

					for (var i = 0; i < Math.min(reporterFirstCommentList.snapshotLength,1); i++) {
						reporterFirstCommentNode = reporterFirstCommentList.snapshotItem(i);
					}

					if (reporterFirstCommentNode != DEFAULT_VALUE) {  
						issue.reporter.responseDate = reporterFirstCommentNode.innerHTML;
					}

					assigneeNodeList = xP_evaluate(xP_assignee, issuePage);

					for (var i = 0; i < assigneeNodeList.snapshotLength; i++) { 
						assigneeNode = assigneeNodeList.snapshotItem(i);
					}

					if (assigneeNode != DEFAULT_VALUE) {

						issue.assignee.fullname = assigneeNode.innerHTML;
						issue.assignee.username = assigneeNode.href.replace(/.*=(.*)/,'$1');
					}

					commentNodeList = xP_evaluate(xP_lastComment, issuePage);

					for (var i = Math.max(0, commentNodeList.snapshotLength - 1); i < commentNodeList.snapshotLength; i++) {
						commentNode = commentNodeList.snapshotItem(i);
					}

					if (commentNode != DEFAULT_VALUE) {
						var lastCommentNodeList = xP_evaluate(xP_commentDate, commentNode.parentNode);

						for (var i = 0; i < lastCommentNodeList.snapshotLength; i++) {
							issue.comments.last.date = lastCommentNodeList.snapshotItem(i);
						}

						if (issue.comments.last.date != DEFAULT_VALUE) {
							issue.comments.last.date = issue.comments.last.date.innerHTML;
						}

						issue.comments.last.user.username = commentNode.href.replace(/.*=(.*)/, '$1');
						issue.comments.last.user.fullname = commentNode.innerHTML;
					}

					updateOpenNode(node, issue);
				}
				else {
					node.style.textDecoration=closedStyle;
					node.setAttribute('onmouseover',"this.style.textDecoration='';this.style.display='';");
					node.setAttribute('onmouseout',"this.style.textDecoration='"+closedStyle+"';this.style.display='';");
				}
			}
		});
	}

	function updateOpenNode(node, issue) {

		if (issue.startDate == DEFAULT_VALUE) {
			return;
		}

		issue.startDate = convertStringToDate(issue.startDate);
		issue.effectiveStartDate = new Date();
		issue.effectiveStartDate.setTime(issue.startDate.valueOf());

		if (issue.effectiveStartDate.getDay() == 6) {
			issue.effectiveStartDate.setDate(issue.effectiveStartDate.getDate() + 2);
			issue.effectiveStartDate.setHours(23);
			issue.effectiveStartDate.setMinutes(59);
		}
		else if(issue.effectiveStartDate.getDay() == 0) {
			issue.effectiveStartDate.setDate(issue.effectiveStartDate.getDate() + 1);
			issue.effectiveStartDate.setHours(23);
			issue.effectiveStartDate.setMinutes(59);
		}

		issue.firstResponse.dueDate = new Date();
		issue.firstResponse.dueDate.setTime(issue.effectiveStartDate.valueOf() + 86400000);
		
		if (issue.firstResponse.dueDate.getDay() == 0) {
			issue.firstResponse.dueDate.setTime(issue.firstResponse.dueDate.valueOf() + 86400000 );
		}
		else if (issue.firstResponse.dueDate.getDay() == 6) {
			issue.firstResponse.dueDate.setTime(issue.firstResponse.dueDate.valueOf() + (86400000 * 2) );
		}

		if (dateRegexp.test(issue.comments.last.date)) {
			issue.comments.last.date = convertStringToDate(issue.comments.last.date);
		}

		issue.resolutionDate = DEFAULT_VALUE;
		issue.firstResponse.delay = DEFAULT_VALUE;
		var firstProjectUserResponseDate = '';
		var firstProjectUserResponseDelay = '';
		var resolutionDate = '';
		var now = new Date();
		var timeLeft = timeDifference(issue.firstResponse.dueDate, now);
		var fRDString = '';
		var responseDate = '';
		var isWas = 'is';
		var lastCommentDate = '';
		var tooltip = '';
		var r = 0;
		var g = 0;
		var b = 0;

		if (fullname == issue.comments.last.user.fullname) {
			issue.comments.last.user.displayName = "You";
		}
		else {
			issue.comments.last.user.displayName = checkUser(issue.comments.last.user.fullname);
		}

		if(fullname == issue.firstResponse.user.fullname) {
			issue.firstResponse.user.displayName = "You";
		}
		else {
			issue.firstResponse.user.displayName = checkUser(issue.firstResponse.user.fullname);
		}

		if (fullname == issue.reporter.fullname) {
			issue.reporter.displayName = "You";
		}
		else {
			issue.reporter.displayName = checkUser(issue.reporter.fullname);
		}

		// Have we responded?
		if (issue.firstResponse.user.fullname == DEFAULT_VALUE) {
			// No we have not responded, so colorize
			r = DEFAULT_RGB[0];
			g = DEFAULT_RGB[1];
			b = DEFAULT_RGB[2];

			if (timeWithinTimeframe(timeLeft, WARNING_TIME)) {
				r = WARNING_RGB[0];
				g = WARNING_RGB[1];
				b = WARNING_RGB[2];
			}

			if (timeWithinTimeframe(timeLeft, PROBLEM_TIME)) {
				r = PROBLEM_RGB[0];
				g = PROBLEM_RGB[1];
				b = PROBLEM_RGB[2];
			}

			fRDString += '';

		}
		else {
			// We have responded
			issue.firstResponse.date =  convertStringToDate(issue.firstResponse.date);

			if (issue.firstResponse.date < issue.effectiveStartDate) {
				issue.effectiveStartDate = issue.firstResponse.date;
				issue.firstResponse.delay = [0, 0, 0]
			}
			else {
				if (issue.firstResponse.date < issue.firstResponse.dueDate) {
					issue.firstResponse.dueDate = issue.firstResponse.date;
					issue.firstResponse.delay = [0, 0, 0]
				}
				else {
					issue.firstResponse.delay = timeDifference(issue.firstResponse.date, issue.firstResponse.dueDate);	
				}
			}

			//Did we respond on time?
			if (issue.firstResponse.delay[0] == 0) {
				// Yes we did

				// Did reporter respond?
				if (issue.reporter.responseDate != DEFAULT_VALUE || issue.customer.firstResponse.date != DEFAULT_VALUE) {
					
					var responseDate = issue.reporter.responseDate;

					if (issue.reporter.responseDate == DEFAULT_VALUE) {
						responseDate = issue.customer.firstResponse.date;
					}

					// Yes the reporter responded
					var timeLeftToFRD = '';

					responseDate = convertStringToDate(responseDate);
					issue.resolutionDate = calcResolutionDueDate(responseDate, issue.priority);
					timeLeftToFRD = timeDifference(issue.resolutionDate, now);

					if (timeLeftToFRD[0] != 0) {
						fRDString += timeLeftToFRD[0] + 'd ';
					}

					fRDString += timeLeftToFRD[1] + 'h ';
					fRDString += timeLeftToFRD[2] + 'm';

					if (timeLeftToFRD[0] < 0) {
						isWas = 'was';
					}

					fRDString = 'Final Resolution Date ' + isWas + ' in ' + fRDString + ' (' + prettyPrintDate(issue.resolutionDate) + ').';

					var remainingTime = (issue.resolutionDate - now);
					var totalResolutionTime = (issue.resolutionDate - issue.effectiveStartDate);
					var percentTimeLeft = remainingTime / totalResolutionTime;

					if (issue.comments.last.user.displayName != "You") {					
						// Logarithmically increase the redness in proportion to value of diff
						r = 255 - Math.floor((Math.exp((Math.max(Math.min(percentTimeLeft,1),0)) * 4.60517019) / 100) * 255);
						g = 0;
						b = 0;
					}

					if (percentTimeLeft > -2) {
						node.innerHTML += ' (' + (100 * percentTimeLeft).toFixed(2) + '%)';
					}
					else {
						node.innerHTML += ' (long ago)';
					}
				}
				else {
					// No reporter did not respond
					var inactiveTime = timeDifference(now, issue.effectiveStartDate);
					fRDString = 'Customer has yet to respond so inactive for ' + inactiveTime[0] + 'd ' + inactiveTime[1] + 'h ' + inactiveTime[2] + 'm.';
				}
			}
			else {
				// No we did not respond on time
				r = 255;
				g = 0;
				b = 0;

				var delayTimeframe = issue.firstResponse.delay[0] + 'd ' + issue.firstResponse.delay[1] +'h ' + issue.firstResponse.delay[2] + 'm';

				fRDString = issue.firstResponse.user.displayName + ' responded after ' + delayTimeframe + ' (' + prettyPrintDate(issue.firstResponse.date) +').';
			}
		}

		if (r != 0 && !windowHasFocus) {
				document.title = "* " + ++newDocumentCount + " *";
				newDocumentTitle = true;
		}

		tooltip += fRDString;

		if (issue.comments.last.date != DEFAULT_VALUE) {
			tooltip += ' Last comment by ' + issue.comments.last.user.displayName + ' on '  + prettyPrintDate(issue.comments.last.date) + '.';
		}
		if (/.*Dashboard.*/.test(document.location)) {
			tooltip += ' Reported by ' + issue.reporter.displayName + ' on ' + prettyPrintDate(issue.startDate) + '.';
		}

		if (issue.id.indexOf(PATCH_TICKET) === 0) {

			issue.resolutionDate = calcResolutionDueDate(issue.startDate, issue.priority);
			timeLeftToFRD = timeDifference(issue.resolutionDate, now);

			if (timeLeftToFRD[0] != 0) {
				fRDString += timeLeftToFRD[0] + 'd ';
			}

			fRDString += timeLeftToFRD[1] + 'h ';
			fRDString += timeLeftToFRD[2] + 'm';

			if (timeLeftToFRD[0] < 0) {
				isWas = 'was';
			}

			fRDString = 'Final Resolution Date ' + isWas + ' in ' + fRDString + ' (' + prettyPrintDate(issue.resolutionDate) + ').';
			tooltip = fRDString + tooltip;
		 }

		node.title=tooltip;

		node.style.color='rgb(' + r + ',' + g + ',' + b + ')';

	}

	function getProjectUser(username) {
		var retVal = -1;
		for (var j = 0; j < allUsersAndUsernames.length; j++) {

			if (allUsersAndUsernames[j] == username) {
				retVal = j;
				break;
			}
		}

		return retVal;
	}

	function timeWithinTimeframe(time, timeframe) {
		var retVal = (time[0] < timeframe[0]);
		var daysEqual = (time[0] == WARNING_TIME[0]);
		var hoursGreater = daysEqual &&  (time[1] < timeframe[1]);
		var hoursEqual = daysEqual && (time[1] == timeframe[1]);
		var minsGreater = daysEqual && hoursEqual && (time[2] < timeframe[2]);
		retVal = retVal | hoursGreater | minsGreater;
		return retVal;
	}

	function checkUser(string) {
		var isProjectUser = -1;
		isProjectUser = getProjectUser(string);
		if (isProjectUser != -1) {
			isProjectUser = '(*)';
		}
		else {
			isProjectUser = '';
		}
		return string + isProjectUser;
	}
	
	function convertStringToDate(string) {
		var date = DEFAULT_VALUE;
		if (string.match(dateRegexp)) {
			date = new Date(string.replace(dateRegexp,"$2 $1, 20$3 $4:$5 $6"));
		}
		else if (string.match(dateSimpleRegexp)) {
			var day = string.replace(dateSimpleRegexp,"$1");
			var hours = string.replace(dateSimpleRegexp,"$2");
			var minutes = string.replace(dateSimpleRegexp,"$3");
			var amPm = string.replace(dateSimpleRegexp,"$4");

			date = new Date();
			if ( amPm == "PM" ) {
				hours = parseInt(hours);
				hours += 12;
			}
			var daysAgo = 0;
			if (day == "Yesterday") {
				date.setDate(date.getDate() - 1);
			}
			else {
				for (var i = 0; i<day_names.length; i++) {
					if (day.match("^"+day_names[i])) { 
						daysAgo = date.getDay() - i;
						if ( date.getDay() < i ) {
							daysAgo += 7;
						}
						date.setDate(date.getDate() - daysAgo);
						break;
					}
				}
			}
			date.setHours(hours);
			date.setMinutes(minutes);
			date = convertServerTimezoneToCurrentTimezone(date);
		}
		return date;
	}

	function convertServerTimezoneToCurrentTimezone(date) {
		var serverTime = date.getTime();
		var serverTimezoneOffset = parseInt(sTZ)*60000*60;
		var utc = serverTime + serverTimezoneOffset;
		var localTime = utc + 60000*(new Date().getTimezoneOffset()); 
		date = new Date(localTime);
		return date;
	}

	function xP_evaluate(path, mynode) {
		return document.evaluate(
				  path, mynode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function calcResolutionDueDate(creationDate, priority) {
		var resolutionDate = new Date()
		resolutionDate.setTime(creationDate.valueOf());
		// Time in days
		var priorityTime = 7;
		switch (priority) {
			case CRITICAL_PRIORITY:
				priorityTime = 7;
				break;
			case MAJOR_PRIORITY:
				priorityTime = 14;
				break;
			case MINOR_PRIORITY:
				priorityTime = 21;
				break;
			case TRIVIAL_PRIORITY:
				priorityTime = 21;
				break;
		}
		resolutionDate.setDate(resolutionDate.getDate()+priorityTime);
		if (resolutionDate.getDay() == 6) {
			resolutionDate.setDate(resolutionDate.getDate()+2);
		}
		if (resolutionDate.getDay() == 0) {
			resolutionDate.setDate(resolutionDate.getDate()+1);
		}		
		return resolutionDate;
	}

	// Returns the date in the given date in the following format:
	// Weekday, Month Day, Year Hour:Minute
	function prettyPrintDate(current_date) {
		var dateString = '';
		dateString += day_names[current_date.getDay()];
		dateString += " " + current_date.getDate();
		dateString += " " + month_names[current_date.getMonth()];
		var fullYear = current_date.getFullYear() + '';
		dateString += " " + fullYear.substring(2,4)+"'";
		dateString += " " + current_date.getHours();
		dateString += ":" + current_date.getMinutes();
		return dateString;
	}

	// Determines the difference between the two dates and returns it in the following format:
	// (X days) Y hours Z minutes
	function timeDifference(laterdate, earlierdate) {
		var difference = laterdate.getTime() - earlierdate.getTime();
		var daysDifference = Math.floor(difference/1000/60/60/24);
		difference -= daysDifference*1000*60*60*24
		var hoursDifference = Math.floor(difference/1000/60/60);
		difference -= hoursDifference*1000*60*60
		var minutesDifference = Math.floor(difference/1000/60);
		difference -= minutesDifference*1000*60
		var secondsDifference = Math.floor(difference/1000);
		return [daysDifference, hoursDifference, minutesDifference];
	}

	function getAllProjectUsersAndUsernames() {
		var botaString = GM_getValue("assigneesRetrievalDate", "");
		var lastChecked = atob(botaString);
		var lastCheckedDate = new Date();
		var delay = '';
		var now = new Date();
		var updateAssigneeList = true;

		lastCheckedDate.setTime(lastChecked);
		delay = timeDifference(now, lastCheckedDate);

		if (delay[0] == 0) {
			allUsersAndUsernames = GM_getValue("assignees", "").split(',');
		}

		if (delay[0] != 0  || allUsersAndUsernames.length == 0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: urlUsernameList,
				headers: {
					'User-agent': useragent,
					'Accept': texthtml,
				},
				onload: function (responseDetails) {
					var content = responseDetails.responseText;
					var issuePage = document.createElement('div');
					var assigneeFullname = DEFAULT_VALUE;
					var assigneeUsername = DEFAULT_VALUE;
					var assigneeNodeList = null;
					var assigneeNode = DEFAULT_VALUE;
					var assignees = [];

					issuePage.innerHTML = content;

					assigneeNodeList = xP_evaluate(xP_assigneeList, issuePage);

					for (var i = 0; i < assigneeNodeList.snapshotLength; i++) {
						assigneeNode = assigneeNodeList.snapshotItem(i);

						if (assigneeNode != DEFAULT_VALUE ) {
							assignees[assignees.length] = assigneeNode.innerHTML;
							assignees[assignees.length] = assigneeNode.value;
						}
					}
					allUsersAndUsernames = assignees;
					var val = assignees.join(',');
					GM_setValue("assignees",val);
					var dateRetrieved = new Date();
					var dateval = btoa(dateRetrieved.valueOf());
					GM_setValue("assigneesRetrievalDate", dateval);
				}
			});	
		}
	}

	function isIssueOpen(issuePage) {
		var statusImgNodeList = null;
		var statusImgNode = DEFAULT_VALUE;
		var isOpen = true;

		statusImgNodeList = xP_evaluate(xP_status, issuePage);

		for (var i = 0; i < statusImgNodeList.snapshotLength; i++) {
			statusImgNode = statusImgNodeList.snapshotItem(i);
		}

		if (statusImgNode != DEFAULT_VALUE ) {
			if (/.*closed.*/.test(statusImgNode.src)) {
				isOpen = false;
			}
		}

		return isOpen;
	}

	/** Constants */
	// How often to refresh the page? In seconds
	var refreshTimeout = 120;
	// Server TimeZone. in hours from GMT
	var sTZ = '-7';
	// JIRA issue account settings URI
	var siteRegexp=/.*[=](.*)/gi; 
	// Date format on JIRA issue comments
	var dateRegexp = /(\d\d)\/(\w\w\w)\/(\d\d) (\d\d):(\d\d) ([AP]M)/gi;
	// Date format on JIRA issue creation date (simple format)
	var dateSimpleRegexp = /([a-zA-Z]*) (\d\d):(\d\d) ([AP]M)/gi;
	// Style for issues awaiting assignee's response
	var emphaticStyle = 'bolder';
	// Style for issues that are awaiting response
	var nonEmphaticStyle = '';
	// Style for issues that are closed
	var closedStyle = 'line-through';
	// What is the JIRA portlet id for "My Assigned Issues" portlet?
	var portlet_id = "searchresults_portlet_";
	// Regular Expression for patches
	var patchIssueRegexpList = new Array(/.*LPS-.*/g, /.*LPP-.*/g);
	// Priority levels
	var priorityRegexpList = new Array(/.*critical.*/g,/.*major.*/g,/.*minor.*/g,/.*trivial.*/g);
	// Parameter corresponding to the comments panel
	var jiraCommentsTabParameter='page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel';
	// The display name for your organization
	var projectDisplayName = 'Liferay';
	// What is the JIRA project ID where we can find a list of assignees' names? 
	var PROJECT_ID = 10953;
	// What is the issue type id corrpesponding to the above JIRA project id? 
	var PROJECT_ISSUE_TYPE_ID = 1;
	// URL where list of users exists
	var urlUsernameList = 'http://issues.liferay.com/secure/CreateIssue.jspa?pid=' + PROJECT_ID +'&issuetype=' + PROJECT_ISSUE_TYPE_ID;
	// Useragent for accessing URIs
	var useragent = 'Mozilla/4.0 (compatible) Greasemonkey';
	// MIME Types
	var texthtml = 'text/html';
	// XPath to retrieve the issue's status
	var xP_status = "//table[@id='issuedetails']//img[contains(@src,'status_')]";
	// XPath expression to retrieve all your assigned issues from the Dashboard page
	var xP_issues = "//table[contains(@id,'" + portlet_id + "')]//a[contains(@href,'/browse/')]";
	// XPath expression to retrieve all you assigned issues from the Issue Navigator page
	var xP_issuesTable = "//table[contains(@id,'issuetable')]//td[contains(@class,'issuekey')]//a[contains(@href,'/browse/')]";
	// XPath to retrieve currently signed-in user
	var xP_un = "//ul[@id='account-options']/li[1]/a";
	// XPath to retrieve the issue's priority
	var xP_priority = "//img[contains(@src,'priority_')]";
	// XPath to retrieve the issue's creation date
	var xP_postDate = "//table[@id='issue_header']//span[@class='date'][1]";
	// XPath to retrieve the issue's reporter
	var xP_reporter = "//table[@id='issuedetails']//a[contains(@id,'issue_summary_reporter_')]";
	// XPath to retrieve the issue's assignee
	var xP_assignee = "//table[@id='issuedetails']//a[contains(@id,'issue_summary_assignee_')]";
	// XPath to retrieve the last comment
	var xP_lastComment = "//div[@class='action-details']/a[@href][contains(@id,'comment')]";
	var PLACEHOLDER_USERNAME = 'PLACEHOLDER';
	// XPath to retrieve the first comment by a username
	var xP_firstCommentByUsername = "//a[contains(@id,'" + PLACEHOLDER_USERNAME + "')]/..//span[@class='date']";
	// XPath to retrieve all comments
	var xP_allComments = "//div[contains(@id,'comment-')]//a[contains(@id,'_header_')]";
	// XPath to retrieve the comment Date
	var xP_commentDate = ".//span[@class='date']";
	// XPath to retrieve the comment visibliity
	var xP_visibility = ".//span[@class='redText']";
	// XPath to retriev list of users
	var xP_assigneeList = "//select[@id='assignee']//option[@value][not(@selected)]";
	// Array of month names
	var month_names = new Array ( );
	month_names[month_names.length] = "Jan";
	month_names[month_names.length] = "Feb";
	month_names[month_names.length] = "Mar";
	month_names[month_names.length] = "Apr";
	month_names[month_names.length] = "May";
	month_names[month_names.length] = "Jun";
	month_names[month_names.length] = "Jul";
	month_names[month_names.length] = "Aug";
	month_names[month_names.length] = "Sep";
	month_names[month_names.length] = "Oct";
	month_names[month_names.length] = "Nev";
	month_names[month_names.length] = "Dec";
	// Array of day names
	var day_names = new Array ( );
	day_names[day_names.length] = "Sun";
	day_names[day_names.length] = "Mon";
	day_names[day_names.length] = "Tue";
	day_names[day_names.length] = "Wed";
	day_names[day_names.length] = "Thu";
	day_names[day_names.length] = "Fri";
	day_names[day_names.length] = "Sat";
	// Priority levels id
	var CRITICAL_PRIORITY = 0;
	var MAJOR_PRIORITY = 1;
	var MINOR_PRIORITY = 2;
	var TRIVIAL_PRIORITY = 3;
	// Default value
	var DEFAULT_VALUE = DEFAULT_VALUE;
	var DEFAULT_RGB = [0,255,0];
	var WARNING_RGB = [255,150,0];
	var PROBLEM_RGB = [255,0,0];
	var WARNING_TIME = [0,5,0];
	var PROBLEM_TIME = [0,0,15];
	var PATCH_TICKET = "LPP-";
	var allUsersAndUsernames = [];

	getAllProjectUsersAndUsernames();	

	username = getUserName();

	fullname = getFullName();

	processAllIssueNodes();

}
