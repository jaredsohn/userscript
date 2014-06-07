// ==UserScript==
// @name			Hacker News collapsible comments
// @description		        Reddit style collapsible comments for Hacker News
// @version			1.0
// @author			kaixi
// @homepage		        http://userscripts.org/scripts/show/138037
// @include			https://news.ycombinator.com/item?id=*
// @include			https://news.ycombinator.com/threads?*
// @include			https://news.ycombinator.com/x?fnid=*
// @match			https://news.ycombinator.com/item?id=*
// @match			https://news.ycombinator.com/threads?*
// @match			https://news.ycombinator.com/x?fnid=*
// @grant           none
// ==/UserScript==

var init = function() {
	// CSS styles for the toggle button
	var style = document.createElement('style');
	style.innerHTML = '.toggle_button { cursor: pointer; font-size: 10px; margin-right: 5px; padding: 0 1px 1px; }'
						+ ' .hover { background: #828282; color: #f6f6ef; }';
	document.head.appendChild(style);

	// Find all the comments
	var comments = [];
		i = 0;
	$('td.default').each(function() {
		var comment = $($(this).parents('tr')[1]).addClass('collapsible').attr('id', i + '_comment');
		comments.push({
			container: comment,
			indentation: comment.find('img').first()[0].width
		});
		++i;
	});

	$('<span></span>', {
		text: '[–]',
		class: 'toggle_button'
	})
		.insertBefore('div > .comhead')
		.on('mouseenter', function() {
			$(this).addClass('hover');
		})
		.on('mouseleave', function() {
			$(this).removeClass('hover');
		})
		.on('click', function() {
			var $this = $(this),
				current_id = parseInt($this.closest('tr.collapsible').attr('id')),
				i = current_id + 1,
				children_count = 0;
			// Toggle child comments
			while(i < comments.length && comments[i].indentation > comments[current_id].indentation) {
				comments[i].container.toggle();
				// Skip comments that shouldn't be toggled
				if (/[+]/i.test(comments[i].container.find('span.toggle_button').text())) {
					var j = i + 1;
					while(j < comments.length && comments[j].indentation > comments[i].indentation) {
						j++;
					}
					i = j;
				} else {
					i++;
				}
			}
			// Toggle current comment 	
			var content = comments[current_id].container.find('span.comment').toggle().next().toggle().end();
			if (content.is(':visible')) {
				$this.text('[–]');
			} else {
				$this.text('[+]');                   
			}
		});
};

// Credit: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
(function(fn) {
	var script = document.createElement('script');
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js';
	script.addEventListener('load', function() {
		var script = document.createElement('script');
		script.textContent = 'jQuery.noConflict();(function($){(' + fn.toString() + ')();})(jQuery);';
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
})(init);