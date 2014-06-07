// ==UserScript==
// @name		Hacker News Enhancement Suite
// @namespace	de.un17y.hnes
// @description	Enhances Hacker News (news.ycombinator.com).
// @copyright	2010-2012, Dennis Esser
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html/
// @author		D3NM0N
// @include		http://news.ycombinator.com/*
// @include		https://news.ycombinator.com/*
// @version		1.1
// @grant		none
// ==/UserScript==

/*
 *	This Self-Executing Anonymous Function encapsulates the user script code.
 */
(function(){

	/*
	 *	create the hnes object.
	 */
	var hnes = {
	
		linkAction : 'new',
		// linkAction : 'iframe',
		
		/*
		 *	Loads the Hacker News Enhancement Suite user script.
		 *	This is the first called function in the user script.
		 *	The call happens at the end of this document.
		 */
		load : function() {
			var head = document.getElementsByTagName('head')[0];
			var jQueryLib = document.createElement('script');
			jQueryLib.src = '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
			jQueryLib.type = 'text/javascript';
			head.appendChild(jQueryLib);
			hnes.onJQueryAvailable();
		},
		
		/*	
		 *	Polls for jQuery to be loaded.
		 *	Loads jQuery Plugins and other stuff, that is dependent on jQuery.
		 *	Calls the onJQueryPluginsAvailable function when jQuery is loaded.
		 */
		onJQueryAvailable : function() {
			if(!window.jQuery) {
				setTimeout(function() {
					hnes.onJQueryAvailable();
				}, 100);
				return;
			}
			var head = document.getElementsByTagName('head')[0];
			var jQueryWaypointsLib = document.createElement('script');
			jQueryWaypointsLib.src = '//raw.github.com/imakewebthings/jquery-waypoints/master/waypoints.min.js';
			jQueryWaypointsLib.type = 'text/javascript';
			head.appendChild(jQueryWaypointsLib);
			hnes.onJQueryPluginsAvailable()
		},
		
		/*	
		 *	Polls for jQuery plugins to be loaded.
		 *	Calls the ready function when jQuery is loaded.
		 */
		onJQueryPluginsAvailable : function() {
			if(!window.jQuery.fn.waypoint) {
				setTimeout(function() {
					hnes.onJQueryPluginsAvailable();
				}, 100);
				return;
			}
			var $ = window.jQuery
			$(function(){
				hnes.ready($);
			});
		},
		
		/*
		 *	Called in the $.documentReady() function.
		 *	Setups the behavior for clicking the "More" links and
		 *	scrolling to the "More" links.
		 */
		ready : function($) {
			hnes.setupTable($);
			hnes.setupClickLink($);
			hnes.setupClickMore($);
			hnes.setupScrollMore($);
		},
		 
		/*
		 *	Setups the behavior for the content links:
		 *	when a link is clicked, it will not load the content.
		 *	Instead the a iframe is created below the link.
		 *	the iframe shows the content.
		 */
		setupTable : function($) {
			$table = $('table>tbody>tr+tr+tr>td>table');
			$table.css('width', '100%');
		},
		 
		/*
		 *	Setups the behavior for the content links:
		 *	when a link is clicked, it will not load the content.
		 *	Instead the a iframe is created below the link.
		 *	the iframe shows the content.
		 */
		setupClickLink : function($) {
			var $document = $(document);
			if(hnes.linkAction === 'iframe'){
				$document.on('click', 'td.title a', function(event){
					event.preventDefault();
					hnes.showLinkContent(this);
				});
			}else if(hnes.linkAction === 'new'){
				$document.on('click', 'td.title a', function(event){
					$(this).attr('target', '_blank')
					// event.preventDefault();
				});
			}
		},
		 
		/*
		 *	Setups the behavior for the More links:
		 *	when a link is clicked, it will load the next page.
		 *	Instead the link is removed.
		 *	Then the articles of the next page are loaded
		 *	at the end of the article list of current site.
		 */
		setupClickMore : function($) {
			$document = $(document);
			$document.on('click', 'a:contains("More")', function(event){
				event.preventDefault();
				hnes.loadPage(this);
			});
		},
		 
		/*
		 *	Setups the behavior for scrolling near the More links:
		 *	when you scroll near a link, the link is removed.
		 *	Then the articles of the next page are loaded
		 *	at the end of the article list of current site.
		 */
		setupScrollMore : function($) {
			$('a:contains("More")').waypoint(function() {
				hnes.loadPage(this);
			}, { offset: '120%' });
		},
		 
		/*
		 *	creates a iframe below the link.
		 *	the iframe shows the content of the link target.
		 */
		showLinkContent : function(link) {
			var $link = $(link);
			alreadyshown = $link.data('alreadyshown');
			if(alreadyshown){
				return;
			}
			$link.data('alreadyshown', true);
			var src = $link.attr('href');
			$target = $link.parent().parent().next().next();
			$target.append(
				$('<td />').attr('colspan', 3).append(
					hnes.preview(src)
				)
			);
		},
	
		/*
		 *	creates a iframe object with the given src, configures it as a preview and returns it.
		 */
		preview : function(src) {
			var $preview = $('<div />')
				.append(
					$('<iframe>')
						.css('display', 'block')
						.css('width', '100%')
						.css('height', window.innerHeight-220) // 220px = aprox. height of 4 posts
						.attr('src', src)
				)
				.css('margin', '10px 25px 25px')
			;
			return $preview;
		},
		
		/*
		 *	Removes the given link. 
		 *	Then the articles of the next page are loaded
		 *	at the end of the article list of current site.
		 */
		loadPage : function(link) {
			var $link = $(link);
			var href = $link.attr('href');
			$link.attr('href', '').text('loading');
			$.ajax({
				'url'		: href,
				'dataType'	: 'html',
				'success'	: function(data){
					$link.parent().parent().prev().remove();
					$tbody = $link.parent().parent().parent();
					$link.remove();
					$data = $(data);
					$articles = $data.find('table>tbody>tr+tr+tr>td>table>tbody>tr');
					$tbody.append($articles);
					hnes.setupScrollMore($);
				}
			});
		}
	};
	
	/*
	 *	Execute this user script.
	 */
	hnes.load();
	
})();