// ==UserScript==
// @name           SF Project/Homepage
// @namespace      http://parasyte.kodewerx.org/userscripts
// @description    Provides links to/from Sourceforge projects/homepages
// @include        http://*sourceforge.net/*
// @include        https://*sourceforge.net/*
// ==/UserScript==


if (/html/.test(document.contentType)) {
	var loc = document.location.href;
	var project = loc.split('/')[2].split('.')[0]; // Get subdomain
	var style = document.createElement('style');
	var head = document.getElementsByTagName('head')[0];
	var body = document.body || document.getElementsByTagName('body')[0];

	style.setAttribute('type', 'text/css');
	style.innerHTML =
		'div.__sfph__ {' +
			'position: fixed;' +
			'bottom: 0px;' +
			'left: 0px;' +
			'right: 0px;' +
			'padding-top: 4px;' +
			'padding-bottom: 4px;' +
			'border-top: 1px solid #000000;' +
			'font-size: 12px;' +
			'font-weight: bold;' +
			'text-align: center;' +
			'background-color: #FFFFCC;' +
			'z-index: 1000000;' +
		'}' +
		'a.__sfph__ {' +
			'color: #0040C0;' +
			'text-decoration: none;' +
		'}' +
		'a.__sfph__:hover {' +
			'color: #0050E0;' +
			'text-decoration: underline;' +
		'}' +
		'a.__sfph__:active {' +
			'color: #0060FF;' +
		'}' +
		'a.__sfph__:visited {' +
			'color: #0030A0;' +
		'}';

	var div_link = document.createElement('div');
	div_link.setAttribute('id', '__sflink__');
	div_link.setAttribute('class', '__sfph__');

	if (project == 'sourceforge') { // No subdomain in current location
		project = '';
		if (loc.indexOf('/projects/') != -1) {
			/*
			 * Fourth index contains the project name:
			 * 'http://<domain>/projects/<project>/...' =>
			 * 'http:', '', <domain>, 'projects', <project>, ...
			 */
			project = loc.split('/')[4];

			div_link.innerHTML = '&#183; <a href="http://' + project +
				'.sourceforge.net/" class="__sfph__">Visit the Homepage</a> &#183;';
		}
	}
	else {
		div_link.innerHTML = '&#183; <a href="http://sourceforge.net/projects/' +
			project + '/" class="__sfph__">Visit the Project Page</a> &#183;';
	}

	if ((project != '') && (!document.getElementById('__sflink__'))) {
		head.appendChild(style);
		body.appendChild(div_link);

		/*
		 * Add a spacer at the bottom of the page, to prevent the info-bar from
		 * covering up any content at the bottom.
		 *
		 * It's not enough to use body { margin-bottom } because of floating
		 * elements and other HTML silliness. So we get the maximum scroll
		 * height and create an absolute-positioned element at that location
		 * with the height of our wanted margin.
		 */
		var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		var el = document.createElement("div");
		el.id = "__spacer__";
		el.style.position = "absolute";
		el.style.top = h + "px";
		el.style.height = "30px";
		el.innerHTML = "&nbsp;";
		document.body.appendChild(el);

		// Re-position the spacer element after things change
		window.addEventListener('load', function(e) {
			var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
			var spacer = document.getElementById("__spacer__").style;
			var st = parseInt(spacer.top);
			var sh = parseInt(spacer.height);
			if (h > (st + sh))
				spacer.top = h + "px";
		}, false);
	}
}
