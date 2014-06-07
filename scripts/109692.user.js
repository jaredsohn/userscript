// ==UserScript==
// @name           Basecamp Project Searching
// @author		   Ryan Holden
// @namespace      RH-BPS
// @description    adds a search field to the list of projects in basecamp, updates tab index so you don't even use your mouse!
// @include        https://*.basecamphq.com/*
// ==/UserScript==


(function()
{
	// yes, yes I am cheating here
	var myDiv = document.createElement('script');

	serachJS = "function searchSetup() { if($$('.SectionHeader').length > 0) { searchInput = $$('.SectionHeader')[0].down('h1').insert('<input type=\"text\" placehoder=\"Search... \" value=\"\" class=\"modSearch\" tabindex=\"1\"/>').down('input'); searchInput.focus(); clientsHold = $$('.ActiveClients')[0]; inactivesHold = $$('.InactiveClients')[0]; searchInput.observe('keyup', function() { performSearch(this.value, clientsHold); performSearch(this.value, inactivesHold); }); searchInput.observe('focus', function() { if( this.value == this.defaultValue) this.value = ''; }); } } searchSetup(); function performSearch(value, hold) { tabIndex = 2; value = value.toUpperCase(); hold.select('.Client').each(function(client) { var hideClient = true; if( client.down('h1').innerHTML.toUpperCase().include(value) ) { hideClient = false; } else { client.select('a').each(function(anchor) { if( anchor.innerHTML.toUpperCase().include(value) || anchor.readAttribute('href').toUpperCase().include(value)) hideClient = false; }) } if( hideClient ) { client.style.height = '0px';client.style.overflow = 'hidden'; client.select('a').each(function(anchor) { anchor.setAttribute('tabindex', -1); }) } else { client.style.height = 'auto'; client.select('a').each(function(anchor) { anchor.setAttribute('tabindex', tabIndex++); }) } }); }"
	
	searchJS = " function searchSetup() { if($$('.SectionHeader').length > 0) { searchInput = $$('.SectionHeader')[0].down('h1').insert('<input type=\"text\" value=\"\" class=\"modSearch\" tabindex=\"1\"/>').down('input'); searchInput.focus(); clientsHold = $$('.ActiveClients')[0]; inactivesHold = $$('.InactiveClients')[0]; searchInput.observe('keyup', function() { performSearch(this.value, clientsHold); performSearch(this.value, inactivesHold); }); function focusSearch() { if( this.value == this.defaultValue) this.value = ''; } searchInput.observe('focus', focusSearch); searchInput.observe('click', focusSearch); } } searchSetup(); function performSearch(value, hold) { tabIndex = 2; value = value.toUpperCase(); hold.select('.Client').each(function(client) { var hideClient = true; if( client.down('h1').innerHTML.toUpperCase().include(value) ) { hideClient = false; } else { client.select('a').each(function(anchor) { if( anchor.innerHTML.toUpperCase().include(value) || anchor.readAttribute('href').toUpperCase().include(value)) hideClient = false; }) } if( hideClient ) { client.style.height = '0px'; client.style.overflow = 'hidden'; client.select('a').each(function(anchor) { anchor.setAttribute('tabindex', -1); }) } else { client.style.height = 'auto'; client.select('a').each(function(anchor) { anchor.setAttribute('tabindex', tabIndex++); }) } }); }";
	
	myDiv.innerHTML = searchJS;
	
	document.body.appendChild(myDiv);
 
})();