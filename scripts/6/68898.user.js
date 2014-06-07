// ==UserScript==
// @name           FR simple
// @namespace      http://userscripts.org/users/65879
// @description    FR simple
// @include        http://www.fallenrace.com/*
// @include        http://fallenrace.com/*
// ==/UserScript==

var $rvs_hide_logo = 1;

// rvs_hide_logo
if ($rvs_hide_logo) {
	var $doc_tables = document.getElementsByTagName('table');
	// exeption for login page
	if($doc_tables[1].className == "main") {
		$parent = $doc_tables[0].parentNode;
		$parent.removeChild($doc_tables[0]);
		$newBr = document.createElement("br");
		$parent.insertBefore($newBr, $doc_tables[0]); 
	}
}
