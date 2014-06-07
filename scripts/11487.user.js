// ==UserScript==
// @name           ZoneEdit No-Confirmation
// @namespace      http://greasemonkey.kramers.ws/
// @description    Adds checkboxes on each form, permitting you to blow past the time-consuming "are you sure you want to" confirmations on ZoneEdit.com. We know what we're doing.
// @include        http://www.zoneedit.com/auth/edit.html*
// @include        https://www.zoneedit.com/auth/edit.html*
// ==/UserScript==

// Do you like this script? Encourage me to add to it. I have a few other ideas for improvements
// to ZoneEdit's interface, but I need to know that it's going to be useful to other people
// in order to justify putting my time into it.

var frm, inps, inp, lab, inpID, forms;

var autoChecked = {
	// Form Index   Checked by default?
	   0:           true,
	   1:           true
	// (Add more of these lines as you wish)
};

forms = document.getElementsByTagName('form');
for (var formNo=0; formNo<forms.length; formNo++) {
	frm = forms[formNo];
	inpID = 'skipConfirmCheckbox'+formNo;

	// Create the checkbox
	inp = document.createElement('input');
	inp.type = 'checkbox';
	inp.name = 'Confirm';
	inp.value = 'Yes';
	inp.checked = (autoChecked[formNo]);
	inp.id = inpID;

	// Create a label to accompany it
	lab = document.createElement('label');
	lab.innerHTML = 'Don\'t confirm these actions';
	lab.setAttribute('for', inpID);

	// Insert the new form elements
	frm.appendChild(inp);
	frm.appendChild(lab);
}