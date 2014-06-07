// ==UserScript==
// @name           phpMyAdmin focus on the DB list
// @description    focus on the DB <select> in the left pane (navigation)
// @namespace      -
// @include        http://myadmin*/navigation.php?*
// @include        http://*/tools/mysql/navigation.php?*
// ==/UserScript==

var oSelect = document.getElementById('lightm_db');
if (oSelect) {
	oSelect.focus();
}
