// ==UserScript==
// @name			 Hides the site name in the item listing when only one site exists
// @namespace	harry
// @version		0.1
// @include		https://www.google.com/reader/*
// @include		http://www.google.com/reader/*

// ==/UserScript==



// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.4.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	$(document).ready(function() {
		$('#sub-tree').find('a.link').each(function() {
			var me = $(this);
			if (me.children('.folder-icon').length > 0) {
				me.bind('click', function() {
					if (me.next().children().length == 1) {
						$('.entry-source-title').hide();
						$('.entry-secondary').css('margin-left', '2em');
					}
				});
			}
		});
		$('#viewer-container').bindWithDelay('DOMNodeInserted', function() {
			var me = $(this),
				link = $('.tree-link-selected');
			if (link.length == 1 && link.children('.folder-icon').length > 0 && link.next().children().length == 1) {
				me.find('.entry-source-title').hide();
				me.find('.entry-secondary').css('margin-left', '2em');
			}
		}, 200);
	});

	// bindWithDelay (https://github.com/bgrins/bindWithDelay)
	(function(c){c.fn.bindWithDelay=function(d,a,e,f,g){var b=null,h=this;c.isFunction(a)&&(g=f,f=e,e=a,a=void 0);return this.bind(d,a,function(a){var d=c.extend(!0,{},a),a=function(){b=null;e.apply(h,[d])};g||clearTimeout(b);if(!g||!b)b=setTimeout(a,f)})}})(jQuery);

}

// load jQuery and execute the main function
addJQuery(main);
