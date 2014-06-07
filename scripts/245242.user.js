// ==UserScript==
// @id             www.giantbomb.com-542d04d0-e2c9-4864-87c3-88ae7f608e21@scriptish
// @name           Giantbomb auto-follow staff/mods
// @version        0.1
// @namespace      
// @author         Greg Baguley
// @description    
// @include        http://www.giantbomb.com/chat/
// @run-at         document-end
// @require        http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

var loadAttempts = 0;
var staffLoader, followInput, followButton;

$(document).ready(function() {
	var followForm = $('.follow-form');
	followInput = followForm.find('input');
	followButton = followForm.find('button');
	staffLoader = setInterval(function() {addStaffMembers('#staff-duders');}, 2000);
});

var addStaffMembers = function(selector) {
	// Load the staff duders list
	var staffDuderList = $('#duders').find('a');
	if (staffDuderList.length == 0) {
		loadAttempts++;
		if (loadAttempts > 10) {
			console.log('Too many attempts loading the staff list, failing out.');
			clearInterval(staffLoader);
		}
	} else {
		clearInterval(staffLoader);
		staffDuderList.each(function(index) {
			var staffName = $(this).text();
			followInput.val(staffName);
			followButton.trigger('click');
		});
	}
};