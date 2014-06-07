// ==UserScript==
// @name           Monster Job View Fix
// @namespace      http://sites.google.com/site/starsky51/monster_job_view_fix.user.js
// @description    The job viewer page on Monster's web sites does not allow keyboard navigation without clicking on the page. This one-line script fixes this problem.
// @include        http://jobview.monster.*/*
// ==/UserScript==

document.getElementById("logo_monster_apply").focus();