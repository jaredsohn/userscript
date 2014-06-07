// ==UserScript==
// @name           gmail-basic-select-all
// @namespace      scgtrp
// @description    Add a select all button to Gmail's basic HTML interface.
// @include        https://mail.google.com/*
// ==/UserScript==

(function() {
	var button = document.createElement('input');
	button.type = 'button';
	button.value = 'Toggle All';
	button.style.marginRight = '6px';
	button.addEventListener('click', function() {
		var e = document.getElementsByName("t");
		if (e.length == 0)
			e = document.getElementsByName("c");
		
		var newState = false;
		for (var i = 0; i < e.length; i++) {
			if (!e[i].checked) {
				newState = true;
				break;
			}
		}
		
		for (var i = 0; i < e.length; i++)
			e[i].checked = newState;
		
		return false;
	});
	
	// note: order is important here, as some of these buttons appear in more than one place.
	var insertBeforeThis = document.getElementsByName('nvp_a_arch')[0]; // archive (inbox)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('nvp_bu_rs')[0]; // remove star (starred)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('nvp_a_dd')[0]; // discard drafts (drafts)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('nvp_a_dl')[0]; // delete forever (spam, trash)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('nvp_a_ib')[0]; // move to inbox (all mail)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('nvp_bu_comp')[0]; // compose (contacts)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('nvp_bu_rl')[0]; // remove label (label views)
	if (insertBeforeThis == null)
		insertBeforeThis = document.getElementsByName('tact')[0]; // the 'more actions' drop down (all others)

	if (insertBeforeThis != null)
		insertBeforeThis.parentNode.insertBefore(button, insertBeforeThis);
})();