// ==UserScript==
// @name		Automatically Disable Email Notifications For New Milestones In Basecamp
// @author		Erik Vold
// @datecreated	2009-08-01
// @lastupdated	2009-08-01
// @namespace	basecampAddNewMilestoneAutoEmailOff
// @include		http*.updatelog.com/projects/*/milestones
// @version		0.1
// @description	Automatically unchecks the 'Email 48-hours before it's due' checkbox on Basecamp.
// ==/UserScript==

document.evaluate("//span[@id='reminder']/input[@id='milestone_notify']",document,null,9,null).singleNodeValue.checked = false;