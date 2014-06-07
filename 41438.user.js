// ==UserScript==
// created by Miguel (centrcom.biz)
// @name           r2p_ranks_v_0.2
// @namespace      
// @description    Adds ranks tab on pre-race page
// @include        http://*race2play.com/*
// @include        http://*nasasimracing.com/*
// Released under the GPL license
// ==/UserScript==
var entrants = document.getElementById('tab_entrants')
if (entrants) {
	var navbar, newElement, panel, newElement2, href, re, number;
	navbar = document.getElementById('tabnav').getElementsByTagName('LI')[0];
    newElement = document.createElement('li');
    newElement.innerHTML = '<a href="#ranks" id="tab_ranks" class="tab">Ranks</a>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
	href = window.location.href;
	re = /\d\d+/;
	number = re.exec(href);
	panel = document.getElementById('panel_entrants');
	newElement2 = document.createElement('div');
	newElement2.innerHTML = '<div id="panel_ranks" class="panel" style="display:none;"> ' +
	'<div style="width:550px;"> ' +
	'<a href="/homepage/show_blog_posts/1724"><img src="http://www.peroogle.com/R2PRank/show_ranks.php?event=' + number + '" /></a> ' +
	'</div> ' +
	'</div>';
	panel.parentNode.insertBefore(newElement2, panel.nextSibling);
}