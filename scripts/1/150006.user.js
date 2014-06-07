// ==UserScript==
// @name RomHustler	No download accelerator
// @description		Clears Download Accelerator checkbox
// @version 		1.1
// @date			2014-05-13
// @author			Morath86
// @namespace		http://userscripts.org:8080/users/488431
// @source			http://userscripts.org:8080/scripts/show/150006
// @updateURL		http://userscripts.org:8080/scripts/source/150006.meta.js
// @downloadURL		http://userscripts.org:8080/scripts/source/150006.user.js
// @include			/http://romhustler.net/rom/*/
// ==/UserScript==

$( "#use_accelerator" ).attr( "checked", false );
$( "p.accelerator" ).css({ opacity: 0.5 });