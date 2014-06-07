// ==UserScript==
// @name           Travian Select All in ACP
// @version        0.0.69
// @description    Adauga buton Select all pentru "Conturi suspecte"
// @homepage       http://travian.ro

// @include        *travian.*admin.php*
// @grant		   none



// ==/UserScript==

jQuery.noConflict();
var selectAllChecked = false;

// Add the checkbox
function addCheckbox() {
	selectAllChecked = false;
	jQuery('#liste_verdaechtige_accounts > form > p > table > tbody > tr.cbg1 > td').each(function(key, object) {
		if(key == 0)
			jQuery(this).html("<input type='checkbox' id='select-all' name='select-all' value='selected' />");
	});
	
	// Add event handlers to the checkbox
	jQuery("#select-all").click(function() {
		if(!selectAllChecked)
		{
			selectAllChecked = true;
			jQuery('input[name="uids\[\]"]').each(function() {
				jQuery(this).prop('checked', true);
			});
		} else {
			selectAllChecked = false;
			jQuery('input[name="uids\[\]"]').each(function() {
				jQuery(this).prop('checked', false);
			});
		}
	});
}

jQuery('#liste_verdaechtige_accounts').before('<a id="recreateSelectAll"> Select All (©Pazadox) </a>');
jQuery('#recreateSelectAll').click(function() {
	addCheckbox();
});

addCheckbox();