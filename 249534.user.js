// ==UserScript==
// @name        codeforces-best-comments
// @namespace   http://codeforces.ru
// @include     http://codeforces.ru/blog/entry/*
// @include     http://codeforces.com/blog/entry/*
// @grant       none
// @version     0.1.1
// ==/UserScript==

(function () {  
    if (window.self != window.top) {
        return;
    }
    
    if (/http:\/\/codeforces\.(ru|com)\/blog\/entry\//.test(window.location.href) && jQuery) {
		jQuery(function($){
			// options
			var _fgAuthor = '#F76D59';
			var _bgAuthor = '#FFAA9D';
			var _fgPositiveMark = '#339900';
			var _fgNegativeMark = '#CC0000';
			var _bgColor = '#F8F8F8';
			var _bgColorNew = '#E8E8FF';
			var _bgColorSelected = '#3D438D';


			var authorName = $.trim($('.info .rated-user').text());
			ShowCommentsPanel();
			
			function ShowCommentsPanel()
			{
				var allComments = GetAllComments();
				ShowComments(allComments);
			}
			
			function GetAllComments()
			{
				var allComments = [];
				$('table.comment-table[commentid]').each(function(index, item){
					var id = $(item).attr('commentid');
					var markItem = $('.info .commentRating', item);
					var isNew = $(this).hasClass('highlight-blue');
					var userName = $.trim($('.avatar .rated-user', item).text());
					var mark = parseInt(markItem.children().first().text(), 10);
					var hasImg = $('.comment-content', item).find('img').length > 0;
					
					allComments.push(
					{
						id: "comment-" + id,
						mark: mark,
						isNew: isNew,
						isAuthor: userName == authorName,
						hasImg: hasImg
					});
				});
				
				allComments.sort(function(a, b) {
					return (b.mark - a.mark) || (a.id - b.id);
				});
				
				return allComments;
			}
			
			
			function ShowComments(comments)
			{
				var wnd = $('<div class="hbc" style="top: 55px; bottom: 10px;  left: 3px; overflow-y: auto;padding-right:25px; position: fixed;"></div>');
				$(wnd).css('background-color', _bgColor);
				$('body').append(wnd);
				$.each(comments, function(index, comment) {
					// create item
					var item = $('<div class="hbc__item" style="display: table;"><a href="#">0</a></div>');
					$('a', item).attr('href', '#' + comment.id);
					$('a', item).text(isNaN(comment.mark) ? '?' : (comment.mark >= 0 ? '+'+comment.mark : comment.mark));
					
					// mark color
					if (comment.mark >= 0)
						$('a', item).css('color', _fgPositiveMark);
					else
						$('a', item).css('color', _fgNegativeMark);
					
					if (comment.hasImg)
					{
						$('a', item).after('<span style="color: blue; font-weight: bold;">i </span>');
					}
					if (comment.isAuthor)
					{
						$('a', item).after('<span style="color: ' + _fgAuthor + '; font-weight: bold;">A </span>');
					}
					
						
						
					// bg color
					if (comment.isNew)
					{
						$(item).addClass('hbc__item-when-new');
						$(item).css('background-color', _bgColorNew);
					}
					
					// onclick event
					$(item).bind('click', Comment_OnClick);
					
					// add item
					$(wnd).append(item);
				});
				
				// highlight author name
				$('.comment-table .rated-user[href="/profile/'+authorName+'"]').css('background-color', _bgAuthor);
			}
			
			function Comment_OnClick()
			{
				$('.hbc__item').css('background-color', _bgColor);
				$('.hbc__item-when-new').css('background-color', _bgColorNew);
				$(this).css('background-color', _bgColorSelected);
			}
		});
    }
})();
