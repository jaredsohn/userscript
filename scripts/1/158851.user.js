// Simple script (most likely ugly and unprofessional, but it gets the job done and
// that's as far as I care) to remove top banner from Index Fórum as it is useless for me.
// ==UserScript==
// @name                Index top line remover
// @description	        Removes Index Fórum top line
// @author		pdw (can reach me on the website)
// @version		1.0 (and only)
// @include		http://forum.index.hu/*
// ==/UserScript==

var elmDeleted = document.getElementById('passportHeader');
elmDeleted.parentNode.removeChild(elmDeleted);
