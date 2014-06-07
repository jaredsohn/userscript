// ==UserScript==
// @name           Fixed-width Wikipedia
// @description    Makes Wikipedia easier to read by switching to a fixed-width layout
// @author         rummik
// @include        http://*.wikipedia.org/
// @version        1.0
// ==/UserScript==

(function() {
	if (!document.body || !document.getElementById('footer'))
		return setTimeout(arguments.callee, 0);

	var width     = 1050,
	    unwrapper = document.createElement('div'),
	    style     = document.styleSheets[document.styleSheets.length - 1],
	    css       = {
		'.wide-unwrapper': {
			width: width + 'px',
			'margin-left': -(width / 2) + 'px',
			position: 'absolute',
			top: 0,
			left: '50%'
		},

		'div#content': {
			width: (width - 192) + 'px',
			'background-position': 'top left, top right',
			'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeF4FwTEBAAAAgjD7FzESWfjYdgwEoAJ4lTsaxgAAAABJRU5ErkJggg==),\
			                     url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeF4FwTEBAAAAgjD7FzESWfjYdgwEoAJ4lTsaxgAAAABJRU5ErkJggg==)'
		},

		'div#mw-head-base': {
			width: (width - 160) + 'px',
			height: '80px !important',
			'margin-top': '0 !important'
		},

		'div#mw-head': {
			width: width + 'px',
			right: 'auto'
		},

		'div#footer': { width: (width - 184) + 'px' }
	    };

	Object.keys(css).forEach(function(selector) {
		style.insertRule(selector.concat('{' + Object.keys(css[selector]).map(function(property) {
			return property + ':' + css[selector][property];
		}).join(';') + '}'));
	});

	while (document.body.children.length)
		unwrapper.appendChild(document.body.children[0]);

	unwrapper.className = 'wide-unwrapper';
	document.body.appendChild(unwrapper.firstChild);
	document.body.appendChild(unwrapper);
})();