// ==UserScript==
// @name       Keep Current and Future Sprints from being greyed out
// @namespace  http://blog.digitaltinder.com/
// @version    0.2
// @description  When loading Jira Agile's 'Plan' mode, current and future sprints are greyed out by the 'uibonfire-state-disabled' class which makes it a pain in the ass to use. This script removes that class.
// @match      http://jira.chasesoftware.co.za/secure/RapidBoard.jspa*
// @copyright  2014+, Paul Sainsbury
// ==/UserScript==

function removeScript() {
	$('div.ghx-sprint-group .uibonfire-state-disabled').removeClass('uibonfire-state-disabled')
}

window.setInterval(removeScript, 2500);