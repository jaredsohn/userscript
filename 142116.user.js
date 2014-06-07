// ==UserScript==
// @name        Select extender
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @namespace   http://userscripts.org/users/311633
// @include     http://www.solonotebooks.net/admin/*
// @include     http://www.solohardware.net/admin/*
// @include     http://www.soloelectro.net/admin/*
// @version     1.1
// @grant       none
// ==/UserScript==

$('select[multiple=multiple]').attr('size', 10);

function update_selected_choices(select) {
	var selected_options = $(select).find('option:selected');
	
	var selected_texts = new Array();
	selected_options.each(function() {
		selected_texts.push($(this).text());
	})
	
	var final_text = selected_texts.join(', ');
	
	$(select).parent().find('.selected_choices').html(final_text);
}

$('select[multiple=multiple]').change(function() {
	update_selected_choices(this);
});

$('select[multiple=multiple]').each(function() {
	$('<span style="margin-left: 10px;" class="selected_choices"></span>').insertAfter($(this).parent().find('a'));
	update_selected_choices(this);
});
