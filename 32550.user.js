// ==UserScript==
// @name        Collapsible Plurk Dashboard
// @namespace   http://kathar.in
// @description This makes Plurk's dashboard collapsible. No animations, unfortunately. Fixed after new CSS.
// @include     http://www.plurk.com/*
// @author      Katharine Berry
// ==/UserScript==

(function () {
	if(!document.getElementById('plurk-dashboard')) return; // Check we're on the right page.

	document.getElementById('footer').style.display = 'none'; // Remove the footer.
	
	// This script does funny things to IDs. This is in order to make Plurk's CSS apply to the
	// collapsed one too. This is the easiest way to do it, given that users can change the CSS,
	// and it's applied by ID. (specifically, to #plurk-dashboard).
	var hidden = true;
	var real_dash = document.getElementById('plurk-dashboard');
	var collapsed_dash = false;
	
	var expanddash = function()
	{
		collapsed_dash.style.display = 'none';
		collapsed_dash.setAttribute('id', 'plurk-dashboard-placeholder');
		real_dash.setAttribute('id', 'plurk-dashboard');
		real_dash.style.display = 'block';
	}
	
	var collapsedash = function()
	{
		real_dash.style.display = 'none';
		real_dash.setAttribute('id','plurk-dashboard-hidden');
		collapsed_dash.setAttribute('id','plurk-dashboard');
		collapsed_dash.style.display = 'block';
	}
	
	// Remove real display
	real_dash.style.display = 'none';
	real_dash.setAttribute('id','plurk-dashboard-hidden');
	
	// Make new one
	collapsed_dash = document.createElement('div');
	collapsed_dash.setAttribute('id','plurk-dashboard');	 
	collapsed_dash.appendChild(document.createTextNode('⟫ Expand dashboard'));
	collapsed_dash.style.cursor = 'pointer';
	collapsed_dash.addEventListener('click', expanddash, true);
	
	// Add collapse button to real display
	var collapsebutton = document.createElement('div');
	collapsebutton.appendChild(document.createTextNode('⟪ Collapse dashboard'));
	collapsebutton.style.paddingBottom = '5px';
	collapsebutton.style.cursor = 'pointer';
	collapsebutton.addEventListener('click', collapsedash, true);
	real_dash.insertBefore(collapsebutton, real_dash.firstChild);
	
	document.getElementById('dashboard_holder').insertBefore(collapsed_dash, real_dash); // Insert the collapsed dash next to the real one.
})();