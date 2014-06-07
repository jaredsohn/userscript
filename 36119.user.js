// ==UserScript==
// @name          USI Moodle Refresh
// @author        Cesare Pautasso
// @namespace     http://corsi.elearninglab.org/course/
// @description   Script to automatically refresh the main moodle course page
// @include       http://corsi.elearninglab.org/course/view.php*
// ==/UserScript==

window.setTimeout("window.location.reload( false )",5*60*1000);

