// ==UserScript==
// @name           AjaxVB
// @namespace      activevb
// @include        http://foren.activevb.de/cgi-bin/foren/list.pl?*
// @author         Eric Wolf
// @version        1.1.2
// @description    Peppt ActiveVB mit AJAX auf!
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	//Resources
	var css = '.viewed { border:solid 1px #0033FF; border-left:none; border-right:none; background:#C0CCFF; width:100%; }' +
						'#viewed-post .Norm { width:470px; display:block; }' +
						'#viewed-post .actions { margin-top:20px; }' +
						'#viewed-post .actions input {  display:block; }' +
						'#viewed-post .actions [type=text] { width:400px; }' +
						'#viewed-post .actions textarea { width:400px; height:200px; }' +
						'#viewed-post form.reply { display:none; margin-top:10px; }';
	var expandThreadLinkHTML = ' - <a href="#" class="expand">Ausklappen</a>';
	var loadingPostHTML = '<tr id="viewed-post"><td></td><td><div class="content">Lädt..</div><div class="actions"><form class="reply"></form></div></td></tr>';
	var replyFormHTML =  '<input type="button" id="ajaxvb-quote" value="Markierten Text zitieren" />' + 
											 '<input type="text" name="thema" value="" />' +
											 '<textarea name="beitrag"></textarea>' +
											 '<input type="submit" name="direct" value="Abschicken" />';
	var replyLinkHTML = '<a href="#" class="reply">Antworten</a>';
	var loaderHTML = '<div id="ajaxvb-loader" style="display:none"></div>';
	var expandCodeHTML = ' <a href="#" class="expand-code">Code anzeigen</a>';

	$(function() {
			//CSS for box containing post
			GM_addStyle(css);
			
			//Find collapsed threads by number of posts displayed at the right side
			var collapsed = $('.a').filter(function() {
				return $(this).text() != '0 Antworten';
			});

			//Show expand links
			collapsed.each(function() {
					var link = $(this).closest('table').find('td:eq(1) a:eq(0)');
					link.after(expandThreadLinkHTML);
			});
			
			//Bind expand links
			$('.expand').click(expandThread);
			
			//Bind post links
			$('a[href^=view.pl]').click(loadPost);
	});

	function expandThread() {
			hidePost();
			
			var expandLink = $(this);
			
			expandLink.text('Lädt...');
			
			//Find containing table and thread url
			var table = expandLink.closest('table');
			var postLink = table.find('td:eq(1) a:eq(0)');
			var url = postLink.attr('href');
			
			//Determine if root post is read
			var visited = postLink.hasClass('visited');
			
			//Load post list
			table.load(url + ' form[name="FormPosten"] table:eq(4)', function() {
					//Find post highlighted in red
					var red = table.find('.Norm');
					
					var row = red.closest('tr');
					var title = red.find('b').html();
					
					//Replace red link with normal link
					red.replaceWith('<a href="' + url + '>' + title + '</a>');
					
					if (visited) { //Mark red post as read if it was before
						row.find('td:eq(0) img').attr('src', '/images/IconRead.gif');
						row.find('td:eq(1) a:eq(0)').addClass('visited');
					}
					
					//Bind post links
					table.find('a[href^=view.pl]').click(loadPost);
			});
			
			return false;
	}

	function loadPost() {
			var table = $(this).closest('table');
			var alreadyViewed = table.hasClass('viewed');
			
			hidePost();
			
			if (!alreadyViewed) { //Only show post if it has not been shown yet
				//Set row style to "read"
				table.find('td:eq(0) img').attr('src', '/images/IconRead.gif');
				table.find('td:eq(1) a:eq(0)').addClass('visited');
				table.addClass('viewed');
				
				//Find hidden element
				var loadTarget = $('#ajaxvb-loader');
				if (loadTarget.length == 0) {
					$('body').append(loaderHTML);
					loadTarget = $('#ajaxvb-loader');
				}
				
				table.append(loadingPostHTML);
				loadTarget.load($(this).attr('href') + ' form[name="FormPosten"]', showPost);
			}

			return false;
	}

	function showPost() {
		//Move post from hidden element to final position
		$('#viewed-post .content').html($('#ajaxvb-loader .Norm:eq(3)').html());

		//Replace code with expand-links
		$('#viewed-post .content pre').before(expandCodeHTML).hide();
		$('.expand-code').click(expandCode);
		
		//Show link to answer
		$('#viewed-post .actions').prepend(replyLinkHTML);
		$('#viewed-post a.reply').click(showAnswerForm);
		
		//Get hidden fields from reply-form
		var hiddenInputs = [ 'forum', 'hash', 'localtime', 'id', 'antworten' ];
		for (var key in hiddenInputs)
			$('#viewed-post form.reply').append('<input type="hidden" name="' + hiddenInputs[key] + 
				'"value="' + $('#ajaxvb-loader [name="' + hiddenInputs[key] + '"]').attr('value') + '" />');
				
		//Create fields for reply-form
		$('#viewed-post form.reply').append(replyFormHTML);
		$('#ajaxvb-quote').click(quoteSelection);
		$('#viewed-post form.reply :submit').click(sendAnswer);
		
		//Load default values
		$('#viewed-post form.reply [name="thema"]').attr('value', $('#ajaxvb-loader [name="thema"]').attr('value'));
		$('#viewed-post form.reply [name="beitrag"]').attr('value', $('#ajaxvb-loader [name="beitrag"]').attr('value'));
		
		//Determine if post is out of the visible area and scroll to post if necessary
		var winTop = window.pageYOffset;
		var postTop = $('#viewed-post').offset().top;
		var winBottom = winTop + document.body.clientHeight;
		var postBottom = postTop + $('#viewed-post').height();

		if ((postTop < winTop && postBottom < winTop) ||
				(postTop > winBottom && postBottom > winBottom))
			window.scrollTo(0, postTop - 100);
	}

	function expandCode() {
		$(this).next().toggle();
		return false;
	}

	function showAnswerForm() {
		$('#viewed-post form.reply').toggle();
		return false;
	}

	function quoteSelection()  {
		var textarea = $('#viewed-post textarea');
		textarea.val('[quote]' + document.getSelection() + '[/quote]' + textarea.val());
	}

	function sendAnswer() {
		var data = { };
		
		//Gather form data
		$('#viewed-post form.reply input, #viewed-post form.reply textarea').each(function() {
			var name = $(this).attr('name');
			
			//Escape data because AJAX always uses UTF-8, but ActiveVB uses ISO-8859-1
			var value = escape($(this).val()); 
			
			data[name] = value;
		});
		
		var dataStr = '';
		
		for (var field in data)
			dataStr += field + '=' + data[field] + '&';

		$('#viewed-post form.reply').html('Antwort wird gesendet...');

		//Send request
		$.ajax({
			'contentType': 'application/x-www-form-urlencoded; charset=utf-8',
			'url': 'post.pl',
			'data': dataStr,
			'success': function() {
				$('#viewed-post form.reply').html('Antwort gesendet!');
			}
		});
		
		return false;
	}

	function hidePost() {
		$('#viewed-post').closest('table').removeClass('viewed');
		$('#viewed-post').remove();
	}
}