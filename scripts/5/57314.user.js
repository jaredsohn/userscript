// ==UserScript==
// @name           Danbooru: Improved Sidebar
// @include        http://danbooru.donmai.us/post*
// @include        http://safebooru.donmai.us/post*
// ==/UserScript==

/*
 * TODO: Handle blacklists better.
 * 	   Sort buttons should be hidden when tag list is collapsed.
 */

function inject_script(code) {
	var script  = document.createElement('script');
	script.type = 'text/javascript';

	if (typeof code == 'string') {
		script.src = code;
	} else {
		script.innerHTML = '(' + code + ')();';
	}

	document.getElementsByTagName('head')[0].appendChild(script);
}

inject_script('http://script.aculo.us/effects.js');
inject_script('http://script.aculo.us/dragdrop.js');

inject_script(function() {
	/* Add a collapse/expand toggle button to each sidebar panel */
	$$('.sidebar h5').each(function(element) {
		element.style.cursor = 'move';

		var button = document.createElement('a');
		button.style.cursor   = 'pointer';
		button.style.cssFloat = 'left';
		button.innerHTML = '▼';

		// Stick all the tags after the header into a div so we can collapse it (this is for the wiki sidepanel.)
		var content = document.createElement('div');
		element.nextSiblings().each(function(e) {
			content.appendChild(e);
		});
		element.up().appendChild(content);

		element.wrap('span');
		element.up().insertBefore(button, element);

		button.observe('click', function(event) {
			Effect.toggle(content, 'blind', { duration: 0.4 } );

			if (button.innerHTML == '▼') {
				button.innerHTML = '▶';
			} else {
				button.innerHTML = '▼';
			}
		});
	});

	// The sidebar needs an id for Sortable.create to work.
	$$('.sidebar').first().id = 'sidebar';

	Sortable.create($('sidebar'), { tag: 'div', handles: $$('.sidebar > div').invoke('firstDescendant') });

	function sortify_tag_list(tag_sidebar) {
		var tags = tag_sidebar.select('li');

		function register_sort(element, comparator) {
			var top = { ascending: [], descending: [] };
			var sequence = tags.sortBy(comparator);

			sequence.inject(0, function(y, e, i) {
				top.ascending[i] = 'top: ' + y + 'px';
				return y + e.getHeight();
			});

			sequence.clone().reverse().inject(0, function(y, e, i) {
				top.descending[i] = 'top: ' + y + 'px';
				return y + e.getHeight();
			});

			var ascending = true;
			$(element).observe('click', function(event) {
				if (ascending) {
					ascending = false;
					sequence.each(function(e, i) { e.morph(top.ascending[i], { duration: 0.4 }); });
				} else {
					ascending = true;
					sequence.clone().reverse().each(function(e, i) { e.morph(top.descending[i], { duration: 0.4 }); });
				}

				return false;
			});
		}

		tags.invoke('absolutize');

		var top = tags.inject(0, function(top, e) {
			e.style.top = top + 'px';
			return top + e.getHeight();
		});

		tag_sidebar.style.height   = top + 'px';
		tag_sidebar.style.position = 'relative';


		var sort_links = [ 'name', 'type', 'count' ].map(function(type) {
			var id = tag_sidebar.id + '-' + type;
			return '<a id="' + id + '" href="#' + id + '">' + type + '</a>';
		});

		var sort_bar = document.createElement('h6');
		sort_bar.innerHTML = 'Sort by: [' + sort_links.join('|') + ']';
		tag_sidebar.up().previous().appendChild(sort_bar);


		register_sort($(tag_sidebar.id + '-' + 'name'), function(element) {
			return element.select('a').last().innerHTML;
		});
		register_sort($(tag_sidebar.id + '-' + 'type'), function(element) {
			return element.className;
		});
		register_sort($(tag_sidebar.id + '-' + 'count'), function(element) {
			return Number(element.childElements().last().innerHTML);
		});
	}

	if ($('tag-sidebar')) {
		sortify_tag_list($('tag-sidebar'));
	}

	if ($('tag-subs-sidebar')) {
		sortify_tag_list($('tag-subs-sidebar'));
	}
});