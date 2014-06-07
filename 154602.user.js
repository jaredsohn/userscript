// ==UserScript==
// @name		ignore browsercheck (TUM Studienplanung)
// @version		1.0.1
// @author		unrealmirakulix
// @description	direkte Weiterleitung zur Studienplanung
// @icon 		http://portal.mytum.de/tum/honoratioren/ehrendoktoren/logos/ei
// @include 	http://studienplan.ei.tum.de/plan/?
// @include 	http://studienplan.ei.tum.de/plan/
// @copyright   none
// @updateURL 	http://userscripts.org/scripts/source/154602.meta.js
// @downloadURL http://userscripts.org/scripts/source/154602.user.js
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Handler for .ready() called
$(document).ready(function() {

// Weiterleitung auf die Ignore-Seite
window.location.href = "http://studienplan.ei.tum.de/plan/?action=ignorebrowsercheck";

});