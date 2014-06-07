// ==UserScript==
// @name	musicmp3.spb.ru direct
// @version	0.7
// @updateURL   http://userscripts.org/scripts/source/116446.meta.js
// @namespace	schreque-uso
// @author	schreque
// @description	Simplify download of albums from the site
// @include	http://musicmp3.spb.ru/album/*.html
// @include	http://musicmp3spb.org/album/*.html
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function()
{
	var retryCount = 5;
	var timeout = 50;
	var autoLoad = false;
	var autoReplace = false;
	var debug = false;

	var anchors = [];
	var again = document.querySelectorAll('a.Name');
	var directLinks = [];

	var found = again.length;
	var count = 0;
	var fail = 0;

	var baseUrl = location.protocol + '//' + location.hostname;

	var len;
	var cur;

	var callCount = [0, 0];

	if ( autoLoad ) {
		loadLinks();
	} else if ( found ) {
		var header = document.querySelector('div#cntCenter h1');
		var button = document.createElement('input');
		button.style.margin = '0 10px';
		button.type = 'button';
		button.value = 'Load (' + found + ')';
		button.addEventListener('click', function()
		{
			loadLinks();
			header.removeChild(button);
		}, false);
		header.insertBefore(button, header.firstChild);
	}

	function loadLinks()
	{
		prepareDirectLinks();

		var banner = document.createElement('div');
		var s = banner.style;
		s.padding = '10px';
		s.position = 'fixed';
		s.left = 0;
		s.bottom = 0;
		s.backgroundColor = '#fff';
		s.border = '1px solid #000';
//		s.borderRadius = '10px';
//		s.boxShadow = 'inset 0 0 5px';
		s.fontSize = '30pt';
		s.zIndex = '10000';
		banner.innerHTML = '<img src="data:image/gif;base64,' + loadingImageGif() + '" /> Loading... [<span>0/0</span>]';
		document.body.appendChild(banner);

		(function()
		{
			callCount[0]++;

			banner.querySelector('span').innerHTML = count + '(' + fail + ')/' + found + ( debug ? ' ' + callCount : '' );

			if ( count == found ) {
				finalizeDirectLinks();
				if ( ! debug ) {
					document.body.removeChild(banner);
				}
				return;
			}

			if ( fail && fail == found - count ) {
				finalizeDirectLinks();
				if ( ! debug ) {
					banner.innerHTML = 'Total: ' + found + '<br />Loaded: ' + count + '<br />Failed: ' + fail;
				}
				return;
			}

			setTimeout(arguments.callee, timeout);

			if ( cur < len ) {
				return;
			}

			if ( again.length ) {
				anchors = again;
				again = [];
				followAllLinks();
			}
		})();
	};

	function prepareDirectLinks()
	{
		for (var i = 0; i < found; i++) {
			again[i].i = i;
			directLinks[i] = again[i].innerHTML;
		}
	};

	function collectDirectLinks(anchor, url)
	{
		if ( ! url ) {
			return;
		}
		var i = anchor.i;
		directLinks[i] = '<a href="' + url + '">' + directLinks[i] + '</a>';
	};

	function finalizeDirectLinks()
	{
		var header = document.querySelector('div#cntCenter h1');

		var list = document.createElement('div');
		list.style.position = 'relative';
		list.style.display = 'none';
		list.style.zIndex = 10000;
		list.innerHTML = '<div style="background-color: #fff; border: 1px solid #000; height: 200px; padding: 10px; overflow: scroll; position: absolute; top: 30px; left: 0;">' + directLinks.join('<br />\n') + '</div>';
		list.addEventListener('click', function()
		{
			window.getSelection().selectAllChildren(list);
		}, false);

		var button = document.createElement('input');
		button.style.margin = '0 10px';
		button.type = 'button';
		button.value = 'Show/Hide';
		button.addEventListener('click', function()
		{
			var d = list.style.display == 'none' ? 'block' : 'none';
			list.style.display = d;
		}, false);
		header.insertBefore(button, header.firstChild);
		header.parentNode.insertBefore(list, header.parentNode.firstChild);
	};

	function followAllLinks()
	{
		callCount[1]++;

		len = anchors.length;
		for (cur = 0; cur < len; cur++) {
			followLink(anchors[cur]);
		}
	};

	function followLink(anchor)
	{
		anchor.retryCount = (anchor.retryCount || 0) + 1;
		if ( anchor.retryCount > retryCount ) {
			fail++;

			denoteUncomplete(anchor, ' - ');
			return;
		}

		var url = anchor.href;
		if ( url.indexOf(baseUrl) == -1 ) {
			url = baseUrl + url;
		}

		// Perform the first query to the musicmp3 site
		// It will redirect us to the tempfile site
		GM_xmlhttpRequest({
			url: url, 

			method: 'GET', 
			synchronous: false, 
			onload: function(xmlhttp)
			{
				var html = xmlhttp.responseText;
				var robot_code = (html.match(/<input.+name=(['"])?robot_code\1?.+value=\1?(\w+)\1?/i) || [])[2];
				if ( ! robot_code ) {
					again.push(anchor);

					denoteUncomplete(anchor, 1);
					return;
				}

				// Perform the second query to the tempfile site
				// There is POST request to the same page
				GM_xmlhttpRequest({
					url: xmlhttp.finalUrl, 

					method: 'POST', 
					synchronous: false, 
					data: 'robot_code=' + robot_code, 
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, 
					onload: function(xmlhttp)
					{
						var html = xmlhttp.responseText;
						var url = (html.match(/<a.+href=(['"])?(.+?)(['"])?[^>]*>\2<\/a>/i) || [])[2];
						if ( ! url ) {
							again.push(anchor);

							denoteUncomplete(anchor, 2);
							return;
						}

						if ( autoReplace ) {
							anchor.href = url;
						}

						count++;

						denoteUncomplete(anchor);

						collectDirectLinks(anchor, url);
					}
				});
			}
		});
	};

	function denoteUncomplete(anchor, s)
	{
		if ( ! s ) {
			if ( debug ) {
				return;
			}
			var marks = anchor.querySelectorAll('.uncomplete');
			for (var i = 0; i < marks.length; i++) {
				anchor.removeChild(marks[i]);
			}
			return;
		}

		var mark = '<span style="color: #f00; padding: 0 5px 0 0;" class="uncomplete">[' + s + ']</span>';
		anchor.innerHTML = mark + anchor.innerHTML;
	};

	// http://www.odessaaccommodations.com/pictures/spec/loading.gif
	function loadingImageGif()
	{
		return [
			'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', 
			'iwsINUQAADsAAAAAAAAAAAA='
		].join('');
	};
}, false);
