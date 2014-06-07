// ==UserScript==
// @name		Android Dev Header Shrink
// @description	This script shrinks the header on the Android Developer sites down by moving the search and a link to Android's home into the tab bar.
// @namespace	http://userscripts.org/users/TheQwerty
// @include		http://d.android.com/*
// @include		http://developer.android.com/*
// @include		http://android-developers.blogspot.com/*
// ==/UserScript==

(function() {
	//Add jQuery
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}

	function main() {
		// Remape unsafeWindow for Chrome.
		if (! window.unsafeWindow) {
			window.unsafeWindow = window;
		}

		var droid32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEHREFOo4dWNsAAAJjSURBVFjD7VdNS1RhFH7Oe+981Vg4MQmajWXSwqJFi6JEJSKaRX8gapMLAyF/RBAtq8FxU7R20apVG2dklED6oE2UDIYlTUhYI+Q4H/c+LrRx8trcj5kIygMXLpfDOc89z3mfc14hib9pyrEngWIlb+u2uJyhm59yDkCA5FQPAdbBSGSytyEizsO6peBtboLP5++iUP4GTXQAhGFWsD8UQ7SlF5d7x8VNPFcAxlKd1FSwrk8FaxgZ+CgCaS4Fyamjm8mlLk86gkik2tnEHiDuT7ZRQYOmArg5MAeKNX6ZBQz3v0eRK/CrMJKprrr94hjA/NIzBrR9AADDXMOj6VMQWqvgkyAez5xGQDZ8lfKhZKw22gNEIt1Fn/g9nXG/1oIbfS+lHm3K7uxp0DyLzGr5qwOGScszk73DfOETSRMVo4SKUfT8kCZy319w9sM97pTLQsF4+ghFdECAofNv5GHmJJUoTxUosYhrZ9KYmL0EQFDiD9wa/PwLH7q16npVevNrC9x89WxzuSfVo6tLqAEp9mh2gvTHATRvGO0C+E8BNL6umTYxLABMlqobUGRPjzQK4ETH1a1dwbQOJ4sQjQwuSHbpKWMHLooSX8MVCAc65PrZ6eUvK69au6NxsQUAAMcOXpHaPa/RMuwNtEW6o3FvTdgZ6fOYlogfT9r2keOdkDQwlo5RV1t6Ptz/TgAgkTpEvxbeKKkewtC51yLibIzrjjVdNGDbKrZjEv7m+64QNQOA1DAW9EWqUlNrAb3V3bh2czEhTDyYbCegMHphUX7iN1lGInWYUILRbRtP069m/1wPrAMlChvYntBwMwAAAABJRU5ErkJggg==";

		// Make header resize to content.
		$('#header').height('auto');
		$('#headerLeft').css('padding-top', '3px');

		// Add Android.com link to tab bar.
		$('#header-tabs').prepend('<li><a style="background-image:none; width:32px;" href="http://www.android.com/"><img style="width:auto;height:auto; margin-top: 0px; margin-left: -6px;" src="' + droid32 + '" /></a></li>');

		// Move API filter into tab bar.
		if ($('#apiLevelCheckbox') && typeof unsafeWindow.toggleApiLevelSelector == 'function') {
			//Default to always filter so that checkbox & label can be removed.
			$('#apiLevelCheckbox').attr('checked', true);
			unsafeWindow.toggleApiLevelSelector($('#apiLevelCheckbox')[0]);

			//Place the select in an LI for better positioning.
			$('#header-tabs').append('<li id="apiLI" style="margin-top:8px;"></li>');
			$('#apiLI').append($('#apiLevelSelector'));
		}


		// Move Search Form
		var lastTab = $('#header-tabs > :last-child');
		if (window.innerWidth - lastTab.position().left - lastTab.width() < 200) {
			//Above tabs, when less than 200px (arbitrary) to their right.
			$('#headerLeft').prepend($('#searchForm > form'));
		} else {
			//Otherwise in tab bar.
			$('#header-tabs').append($('#searchForm > form'));
		}

		// Remove the rest of the header.
		$('#headerLeft > a').remove();
		$('#headerRight').remove();

		// Use Google's Resizer to adjust content pane's height.
		// From http://developer.android.com/assets/android-developer-docs.js
		if (typeof unsafeWindow.resizeHeight == 'function') {
			unsafeWindow.HEADER_HEIGHT = $('#header').height() + 5;
			unsafeWindow.resizeHeight();
		}
	}

	// load jQuery and execute the main function
	addJQuery(main);
})();