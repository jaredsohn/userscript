// ==UserScript==
// @name           phpMyAdmin Populate ID automatically
// @namespace      http://alexandersitedesign.com
// @include        *mysqladmin*
// @include        *phpmyadmin*
// @include        *MySQL*
// ==/UserScript==

if (document.getElementById('field_0_1').value == '' && document.getElementById('field_1_1') && !document.getElementsByName('after_field')) {
	document.getElementById('field_0_1').value = 'id';
	document.getElementById('field_0_2').value = 'INT';
	document.getElementById('field_0_6').value = 'UNSIGNED';
	document.getElementById('field_0_8').value = 'primary_0';
	document.getElementById('field_0_9').checked = 'checked';
}
