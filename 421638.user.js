// ==UserScript==
// @name          TopCoder Reviewer Applying Probabilities
// @namespace     http://www.userscripts.com
// @description   .
// @include       *
// @version 2.0
// ==/UserScript==

var c = 1.35;

var handles = new Array();
var handleRoles = new Array();
var handleRatings = new Array();

var outcomes = new Array();

var currentAssignment = new Array();

var openRoles = new Array();
openRoles['Primary Reviewer'] = 1;
openRoles['Secondary Reviewer'] = 2;

var resultProbabilities = new Array();

var totalWeight = 0;

function getWeight(set) {
	var weight = 1;	
	for (var handle in set) {
		if (handle != null && set[handle] != null) {
			weight *= Math.pow(c, handleRatings[handle]);
		}
	}
	return weight;
}

// Adds valid set and update its' weight
function addAssignment() {	
	totalWeight += getWeight(currentAssignment);

	var outcome = new Array();
	for (var handle in currentAssignment) {
		if (handle != null && currentAssignment[handle] != null) {
			outcome[handle] = currentAssignment[handle];
		}
	}

	outcomes.push(outcome);
}

// Checks whether current assignment set is valid based on open roles
function checkAssignment() {
	var rolesCount = new Array();

	rolesCount['Primary Reviewer'] = 0;
	rolesCount['Secondary Reviewer'] = 0;
	rolesCount['Specification Reviewer'] = 0;

	for (var handle in currentAssignment) {
		if (handle != null && currentAssignment[handle] != null) {
			rolesCount[currentAssignment[handle]]++;
		}
        }

	var rolesCountMatch = true;
	for (var role in openRoles) {
		if (openRoles[role] != rolesCount[role]) {
			rolesCountMatch = false;
			break;
		}
	}

        return rolesCountMatch;
}

// Generates possible assignment set for positions
function generateAssignment(i) {
	if (i == handles.length) {
		if (checkAssignment()) {
			addAssignment();
		}
		return;
	}
	
	// Skip this handle and assign others
	generateAssignment(i+1);

	var currentHandle = handles[i];
	var roles = handleRoles[currentHandle];

	for (var j = 0; j < roles.length; j++) {
		currentAssignment[currentHandle] = roles[j];

		generateAssignment(i+1);

		currentAssignment[currentHandle] = null;
	}
}

function generateAssignmentProbabilities() {
	var total = 0;
	for (var i = 0; i < outcomes.length; i++) {
		var outcome = outcomes[i];

		var probability = getWeight(outcome) / totalWeight;
		for (var handle in outcome) {
			var role = outcome[handle];
			if (resultProbabilities[handle] == null) resultProbabilities[handle] = new Array();
			if (resultProbabilities[handle][role] == null) resultProbabilities[handle][role] = 0;						
			resultProbabilities[handle][role] += probability;
		}
	}
}

function addProbabilitiesToFront() {
	handles = new Array();
	handleRoles = new Array();
	handleRatings = new Array();

	currentAssignment = new Array();

	var rowNumber = 0;
	$('table[class="formFrame"]:eq(2) tr:not(:first)').each(function() {
		if (rowNumber == 0) {
			$(this).append("<td>Probability</td>");
		} else {
			var handle = $(this).find("td").eq(0).text().trim();
			var role = $(this).find("td").eq(1).text().trim();
			var rating = parseFloat($(this).find("td").eq(2).text().trim());

			if (handles.indexOf(handle) == -1) handles.push(handle);

			if (handleRoles[handle] == null) handleRoles[handle] = new Array();
			handleRoles[handle].push(role);

			handleRatings[handle] = rating;
		}
		rowNumber++;
	});	
	generateAssignment(0);
	generateAssignmentProbabilities();

	rowNumber = 0;
	$('table[class="formFrame"]:eq(2) tr:not(:first)').each(function() {
		if (rowNumber > 0) {			
			var handle = $(this).find("td").eq(0).text().trim();
			var role = $(this).find("td").eq(1).text().trim();

			$(this).append('<td class="projectCells" align="center">' + Math.round(resultProbabilities[handle][role] * 10000) / 100 + '</td>');
		}
		rowNumber++;
	});
});

if (window.location.toString().indexOf('http://community.topcoder.com/tc?module=ReviewAuctionDetails') != -1) {
        alert('yes');
	addProbabilitiesToFront();
}