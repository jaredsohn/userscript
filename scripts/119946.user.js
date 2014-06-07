// ==UserScript==
// @name           phpmyadmin link
// @author         kstenschke
// @namespace      http://userscripts.org/scripts/show/119946
// @description    Adds a link to phpmyadmin on the current url into the page
// @include        *.srv*.*
// ==/UserScript==

	// Do not insert when already in phpMyAdmin or inside iframe
if( document.location.href.indexOf('phpmyadmin/index.php') === -1 && window == window.top ) {
		// Create div
	var div		= document.createElement('div');
	div.id						= 'phpmyadminlink';
	div.style.padding			= '10px;'
	div.style.backgroundColor	= '#FF9900';
	div.style.fontWeight		= 'bold';

		// Setup phpMyAdmin URL
	var baseUrl	= document.location.href.split('?')[0];
	baseUrl		= baseUrl.replace('index.php', '');
	baseUrl		= baseUrl.replace('index.html', '');
	hrefUrl	= baseUrl + '/phpmyadmin/index.php';

		// Add anchor into div
	var anchor		= document.createElement('a');
	anchor.href		= hrefUrl
	var linkText	= document.createTextNode('Open phpMyAdmin');
	anchor.appendChild(linkText);
	div.appendChild(anchor);

		// Add div into body
	var body = document.querySelectorAll('body')[0];
	body.appendChild(div);
}