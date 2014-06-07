// ==UserScript==
// @name			Jira Deployment Helper
// @namespace		http://www.mapyourshow.com/
// @description		Adds Jira Code Review button to Subversion Commits tab, highlights database changes in the comments or description that have "dbo." in them, highlights tasks in list view and dashboard gadgets based on original time estimate and due date.
// @include			*/secure/dashboard*
// @include			*/browse/*
// @include			*/issues/*
// @grant			GM_log
// @version			1.2.4
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL		https://userscripts.org/scripts/source/118442.user.js
// @updateURL		https://userscripts.org/scripts/source/118442.meta.js
// ==/UserScript==

var version;

// This is for the main Dashboard Gadgets
$(document).on('DOMNodeInserted', 'div.gadget', function(e) {
	var $elem = $(e.target);

	$elem.on('DOMNodeInserted', function(e) {
		initJiraPlugin($('iframe').contents().find('table'));
	});
});

// These are for the Issues page
unsafeWindow.JIRA.bind(unsafeWindow.JIRA.Events.NEW_CONTENT_ADDED, function(e, context, reason) {
	initJiraPlugin($('table#issuetable'));
});

unsafeWindow.JIRA.ViewIssueTabs.onTabReady(function() {
	initJiraPlugin($('table#issuetable'));
});

function initJiraPlugin(issueTable) {
	version = parseFloat($('meta[name=ajs-version-number]').attr('content'));

	// This colorizes the tasks in list view based on Original Estimate and Due Date
	colorTasks(issueTable, version);

	// This highlights all instances of database names with "dbo." in them
	highlightDB(version);

	// This adds the Code Review button in the Subversion tab
	addCodeReviewButton(version);
}

function Change(label, url) {
	this.label = label;
	var s = url.split(url.indexOf('#') > 0 ? '#' : '?r=');
	this.ref = s[0];
	this.revision = s[1];
	this.commits = 1;
	this.pref = new RegExp('/[a-zA-Z-_]+/', '');

	this.asA = function() {
		return this.label;
	};

	this.setMaxRevision = function(revision) {
		if (revision > this.revision)
			this.revision = revision;
		this.commits++;
	};

	this.samePrefix = function(prefix) {
		return getPrefix() == prefix;
	};

	this.getPrefix = function() {
		return this.label.match(this.pref)[0];
	};
};

function createReviewView() {
	var index = 0;
	var changes = [];
	var mapChanges = [];
	//select dev with id issueContent
	//select div with id issue_actions_container in it
	//select tables in it
	//find rows with text 'Files Changed'
	//select next sibling tr (in terminology of jquery it is 'next adjacent selector'
	//select td in it
	//select a in it
	$('div#issue_actions_container table tr:contains("Files Changed") + tr td').each(function() {
		var lines = $(this).text().split('\n');
		$.each(lines, function() {
			if (this.trim().substr(0, 7) == '/trunk/' || this.trim().substr(0, 10) == '/branches/') {
				var change = new Change(this, this);
				if (mapChanges[change.label]) {
					mapChanges[change.label].setMaxRevision(change.revision);
				} else {
					changes[index++] = change;
					mapChanges[change.label] = change;
				}
			}
		});
	});
	changes.sort(function(a, b) {
		return (b.label.toLowerCase() < a.label.toLowerCase()) - (a.label.toLowerCase() < b.label.toLowerCase());
	});
	var res = '<div class="issuePanelContainer" id="issue_actions_container"><table cellpadding="2" cellspacing="0" border="0" width="100%">';
	res += '<tbody><tr><td bgcolor="#f0f0f0"><b>Commits</b></td><td bgcolor="#f0f0f0"><b>Changed File</b></td></tr>';
	var prefix;
	var sep = false;
	for (var i = 0; i < index; i++) {
		sep = (prefix && (prefix != changes[i].getPrefix()));
		res = res + '<tr><td' + style(sep) + '>' + changes[i].commits + '</td><td' + style(sep) + '>' + changes[i].asA() + '</td></tr>';
		prefix = changes[i].getPrefix();
	}
	return res + '</tbody></table></div>';
};

function style(sep) {
	return sep ? ' style="border-top: solid #BBB 1px;"' : '';
};

function highlightDB(version) {
	if ($('#description-val').length) {
		var $descriptionDiv = $('#description-val');
	} else if ($('#issue-description').length) {
		var $descriptionDiv = $('#issue-description');
	}
	if ($descriptionDiv) {
		var result = $descriptionDiv.html();
		var regex = new RegExp('[\\w.*_]*dbo\\.[\\w]*','ig');
		$descriptionDiv.html(result.replace(regex, '<span style="background-color:yellow;">$&</span>'));
	}

	$('.action-body').each(function() {
		result = $(this).html();
		regex = new RegExp('[\\w.*_]*dbo\\.[\\w]*','ig');
		$(this).html(result.replace(regex, '<span style="background-color:yellow;">$&</span>'));
	});
}

function addCodeReviewButton(version) {
	if (!$('#review_button_div').length) {
		if (version >= 6) {
			if ($('li#subversion-commits-tabpanel').hasClass('active') == 1) { //where the Subversion Commits is but not inside a tag
				$('div#issue_actions_container:first').prepend('<div id="review_button_div" style="width: 100%;margin-bottom:10px;"><button id="review_button">Code Review</button></div>');
				var view = createReviewView();
				var revView = false;
				$('#review_button').click(function() {
					var oldView = $('table', 'div#issue_actions_container').detach();
					$('div#review_button_div').after(view);
					$('#review_button').text(revView ? 'Code Review' : 'All Commits');
					view = oldView;
					revView = !revView;
				});
			}
		} else {
			if ($('li#subversion-commits-tabpanel').hasClass('active') == 1) { //where the Subversion Commits is but not inside a tag
				$('ul#issue-tabs').closest('div').after('<div id="review_button_div" style="width: 100%;margin-bottom:10px;"><button id="review_button">Code Review</button></div>');
				var view = createReviewView();
				var revView = false;
				$('#review_button').click(function() {
					var oldView = $('div#issue_actions_container').detach();
					$('div#review_button_div').after(view);
					$('#review_button').text(revView ? 'Code Review' : 'All Commits');
					view = oldView;
					revView = !revView;
				});
			}
		}
	}
}

function colorTasks(issueTable, version) {
	if (issueTable.length && (issueTable.find('td.timeoriginalestimate').length || issueTable.find('td.aggregatetimeoriginalestimate').length) && issueTable.find('td.duedate').length) {
		var $issueTable = issueTable,
			$issueTableRows = issueTable.find('tr:gt(0)');	// skip the header row

		$issueTableRows.each(function(index) {
			var $originalEstimate = ($.trim($('td.timeoriginalestimate', this).html()) == '' ? $.trim($('td.aggregatetimeoriginalestimate', this).html()) : $.trim($('td.timeoriginalestimate', this).html())),
				$dueDate = (typeof($('td.duedate', this).html()) == 'string' ? $('td.duedate', this).html() : ''),
				$originalEstimateDays,
				$originalEstimateMinutes,
				$numberDays,
				thisdate,
				today;

			// Get total estimated minutes
			$originalEstimateMinutes = ($originalEstimate.match(/\d+(?= week)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= week)/ig)) * 2400)
										+ ($originalEstimate.match(/\d+(?= day)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= day)/ig)) * 480)
										+ ($originalEstimate.match(/\d+(?= hour)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= hour)/ig)) * 60)
										+ ($originalEstimate.match(/\d+(?= minute)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= minute)/ig)));

			// Now let's account for weekends
			$numberDays = Math.ceil($originalEstimateMinutes / 480);

			thisdate = new Date();
			today = thisdate.getDay();

			switch (true) {
				case ($numberDays == 0):
					if (today == 6) {
						$originalEstimateMinutes += 480;
					} else if (today == 5) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays == 1):
					if (today == 6) {
						$originalEstimateMinutes += 480;
					} else if (today == 5) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays == 2):
					if (today == 6) {
						$originalEstimateMinutes += 480;
					} else if (today >= 4) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays == 3):
					if (today == 6) {
						$originalEstimateMinutes += 480;
					} else if (today >= 3) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays == 4):
					if (today == 6) {
						$originalEstimateMinutes += 480;
					} else if (today >= 2) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays == 5):
					if (today == 6) {
						$originalEstimateMinutes += 480;
					} else if (today >= 1) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays >= 6 && $numberDays < 11):
					if (today == 6) {
						$originalEstimateMinutes += 1440;
					} else if (today >= 5) {
						$originalEstimateMinutes += 1920;
					} else if (today == 0) {
						$originalEstimateMinutes += 960;
					}
					break;
				case ($numberDays >= 11 && $numberDays < 16):
					if (today == 6) {
						$originalEstimateMinutes += 2400;
					} else if (today >= 5) {
						$originalEstimateMinutes += 2880;
					} else if (today == 0) {
						$originalEstimateMinutes += 1920;
					}
					break;
				case ($numberDays >= 16 && $numberDays < 21):
					if (today == 6) {
						$originalEstimateMinutes += 3360;
					} else if (today >= 5) {
						$originalEstimateMinutes += 3840;
					} else if (today == 0) {
						$originalEstimateMinutes += 2880;
					}
					break;
				case ($numberDays >= 21 && $numberDays < 26):
					if (today == 6) {
						$originalEstimateMinutes += 4350;
					} else if (today >= 5) {
						$originalEstimateMinutes += 4800;
					} else if (today == 0) {
						$originalEstimateMinutes += 3840;
					}
					break;
				default:
					break;
			}

			// The number of total days estimated, including weekends
			$originalEstimateDays = Math.ceil($originalEstimateMinutes / 480);
			$daysTilDueDate = Math.ceil(dateDiff($dueDate));

			if ($originalEstimate.trim() != '') {	// If an Original Estimate was given
				if (($daysTilDueDate - $originalEstimateDays) < 1) {
					$(this).css('background-color','#ff9999');	// Red
				} else if (($daysTilDueDate - $originalEstimateDays) <= 2) {
					$(this).css('background-color','#fed080');	// Orange
				} else if (($daysTilDueDate - $originalEstimateDays) <= 4) {
					$(this).css('background-color','#fffeab');	// Yellow
				}
			} else {
				if (($daysTilDueDate - $originalEstimateDays) < 1) {
					$(this).css('background-color','#ff9999');	// Red
				} else if (($daysTilDueDate - $originalEstimateDays) == 1) {
					$(this).css('background-color','#fed080');	// Orange
				} else if (($daysTilDueDate - $originalEstimateDays) == 2) {
					$(this).css('background-color','#fffeab');	// Yellow
				}
			}
		});
	} else if ($('.issue-list').length) {
		// Do nothing for now
	}
}

function dateDiff(dueDate) {
	var dueDate = dueDate.replace('Jan', '0')
							.replace('Feb', '1')
							.replace('Mar', '2')
							.replace('Apr', '3')
							.replace('May', '4')
							.replace('Jun', '5')
							.replace('Jul', '6')
							.replace('Aug', '7')
							.replace('Sep', '8')
							.replace('Oct', '9')
							.replace('Nov', '10')
							.replace('Dec', '11');
	var arrDueDate = dueDate.split('/');
	var dt1 = new Date();
	var dt2 = new Date('20' + arrDueDate[2], arrDueDate[1], arrDueDate[0]);
	var one_day = 1000 * 60 * 60 * 24;

	return (parseInt(dt2.getTime() - dt1.getTime()) / (one_day));
}