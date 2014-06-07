// ==UserScript==
// @name	Search Link Panel
// @version	0.5
// @updateURL   http://userscripts.org/scripts/source/115991.meta.js
// @namespace	schreque-uso
// @author	schreque
// @description	Creates and adds search links on your favorite pages
// ==/UserScript==

/**
 * This function creates a panel of search links following to another sites. 
 * The panel is constructed from the data provided to the function. 
 * It is returned as a string and can be inserted automatically 
 * if a container is provided. 
 *
 * Options is unsorted list of parameters that defines what and how should be shown.
 * The structire of the list is as follows:
 *
 * {
 * 	tmplItem:	String, contains the template per each item of the list
 * 			valid patterns are {HREF}, {TEXT}, {ICON}
 * 
 * 	tmplList:	String, contains the template of the list
 * 			Valid pattern is {LIST}
 * 
 * 	container:	DOM element, contains a reference to the html-element 
 * 			where the list sould be inserted
 * 
 * 	links:	[	Array, contains the list of links and their attributes to show
 * 		{
 * 			text:		String, a text that will be shown
 * 
 * 			addr:		String or function returning a string, 
 * 					an URL following to another site
 * 					Valid pattern is {SEEK}
 * 
 * 			template:	String, contains the template for this link
 * 
 * 			icon:		String, an URL to the image favicon.ico
 * 
 * 			transform:	Function, a functin that transforms a seach text
 * 					It can be useful if some sites requires text in UTF
 * 		}, 
 * 	]
 * }, 
 *
 * @param	String	text
 * @param	Object	options
 * @return	String
 */
window.GMX = window.GMX || {};

GMX.SearchLinkPanel = function(text, options)
{
	options = options || {};

	var vi = options.tmplItem || '<a href="{HREF}" title="{TEXT}">{TEXT}</a>';
	var vg = options.tmplList || '{LIST}';

	var links = options.links || [];
	var len = links.length;

	var result = [];
	for (var i = 0; i < len; i++) {
		var L = links[i];

		if ( ! L || ! L.addr ) {
			continue;
		}

		var s = typeof L.transform == 'function' ? L.transform(text) : text;

		var h = (typeof L.addr == 'function' ? L.addr() : L.addr).replace(/\{SEEK\}/g, s);
		var t = L.text || h.replace(/^\w+:\/\/(?:www\.)?([^\/]+).*?$/, '$1');
		var c = L.icon || h.replace(/^(\w+:\/\/[^\/]+)(.*?)$/, '$1/favicon.ico')

		var r = (L.template || vi)
			.replace(/\{HREF\}/g, h)
			.replace(/\{TEXT\}/g, t)
			.replace(/\{ICON\}/g, c);
		result.push(r);
	}

	var html = vg.replace(/\{LIST\}/, result.join(''));

	if ( options.container ) {
		options.container.innerHTML = html;
	}

	return html;
};

