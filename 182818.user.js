// ==UserScript==
// @name        Mixcloud tag setter
// @description Allows to set any tag to cloudstream
// @include http://www.mixcloud.com/*/edit/
// ==/UserScript==


$('#audioedithider').after('<input type="text" id="hack_save" value="" /><button id="hack_save_button">Set tag</button>');
$('#hack_save_button').click(function() {
	$.post('',{	'csrfmiddlewaretoken' : document.getElementById('upload_traktornml').csrfmiddlewaretoken.value,
		'edit_tag-0-tag' : $('#hack_save').val(),
		'edit_section-TOTAL_FORMS' : 1,
		'edit_section-INITIAL_FORMS' : 0,
		'edit_section-0-position' : 0,
		'edit_tag-TOTAL_FORMS' : 5,
		'edit_tag-INITIAL_FORMS' : 1,
	});
	location.reload();
});