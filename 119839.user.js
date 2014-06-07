// ==UserScript==
// @name           500px_infscroll
// @namespace      com.freeatnet.500px
// @include        http://500px.com/*
// ==/UserScript==

var scrollerTask = function () {
	var INFISCROLL_VERSION = 105;
	
	var hasPx = function () {
		return (jQuery("#px").size() > 0);
	};
	
	var hasPhotoGrid = function () {
		return (hasPx() && jQuery(".col.d4").has(".photo.medium").size() > 0);
	};
	
	var hasFlow = function () {
		return (hasPx() && jQuery("#flow").size() > 0)
	};
	
	var scrollPhotoGrid = function () {
		var nextPage = jQuery(".pager.box .next_page").attr("href");
		if (nextPage == null || nextPage == undefined) { return; }
		jQuery(".pager.box .next_page").attr("href", null);
		
		jQuery.get(nextPage, function (data) {
			_window.history.replaceState(nextPage, document.title, nextPage);
			var jData = jQuery(data);
			jData.find(".container > .col.d4:has(>.photo)").hide().insertAfter(jQuery(".container > .col.d4:has(>.photo)").filter(":last")).slideDown();
			jQuery(".pager.box").replaceWith(jData.find(".pager.box"));
		});
	};
	
	var scrollFlow = function () {
		var nextPage = jQuery("#flow #more").attr("href");
		if (nextPage == null || nextPage == undefined) { return; }
		
		jQuery("#flow #more").attr("href", null);
		jQuery("#flow #more").html('<img src="/unity/img/spinners/loader-small.gif"/> ');
	  jQuery("#flow #more").addClass('disabled');
	
		jQuery.get(nextPage, function (data) {
			nextPage = nextPage.replace("nolayout=true&", '');
			_window.history.replaceState(nextPage, document.title, nextPage);
			
			var jData = jQuery(data);
			jData.find(".row").hide().insertAfter(jQuery("#flow > .row").filter(":last")).slideDown('slow');
			jQuery("#flow #more").replaceWith(jData.find("#more"));
			px.flow.fixDisoriented();
		});
	};
	
	if (typeof unsafeWindow != 'undefined') {
		_window = unsafeWindow;
		jQuery = unsafeWindow.jQuery;
	} else {
		_window = window;
		$.noConflict();
	}
	if (!hasPhotoGrid() && !hasFlow()) { return; }
	
	_window.INFISCROLL_VERSION = INFISCROLL_VERSION;
	var updater = _window.document.createElement("script");
	updater.setAttribute("src", "http://svn.freeatnet.com/gmscripts/500px_infscroll/updater.js");
	_window.document.body.appendChild(updater);
	console.log(updater);
	
	jQuery(document).scroll(function () { 
		scrollMaxY = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
		// Start loading approx 200px from the end of the page.
		if (window.scrollY > (scrollMaxY - (hasFlow() ? 500 : 200))) {
			if (hasPhotoGrid()) { scrollPhotoGrid(); }
			else if (hasFlow()) { scrollFlow(); }
			else { return; }
		}
	});
};

if (navigator.userAgent.match(/Firefox/)) {
	unsafeWindow.onload = scrollerTask;
} else if (navigator.userAgent.match(/Chrome/)) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + scrollerTask.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
} else {
	alert("I do not know what to do :(");
}
