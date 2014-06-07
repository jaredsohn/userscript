// ==UserScript==
// @name        habr-best-comments
// @namespace   http://habrahabr.ru
// @include     http://habrahabr.ru/post/*
// @include     http://habrahabr.ru/company/*
// @grant       none
// @version     0.1
// ==/UserScript==


$(function($){
	// options
	var _fgAuthor = '#F76D59';
	var _bgAuthor = '#FFAA9D';
	var _fgPositiveMark = '#339900';
	var _fgNegativeMark = '#CC0000';
	var _bgColor = '#F8F8F8';
	var _bgColorNew = '#E8E8FF';
	var _bgColorSelected = '#3D438D';


	var authorName = $.trim($('.author a:first').text());
	
	
	var allComments = GetAllComments();
	ShowComments(allComments);
	

	
	function GetAllComments()
	{
		var allComments = [];
		$('.comment_item').each(function(index, item){
			var id = $(item).attr('id');
			var markItem = $('> .comment_body > .info > .voting > .mark', item);
			var isNew = $('> .comment_body > .info', item).hasClass('is_new');
			var userName = $.trim($('> .comment_body > .info .username', item).text());
			var mark = parseInt(markItem.text().match(/\d+/));
			if (markItem.hasClass('negative'))
				mark = -mark;
			var hasImg = $('> .comment_body > .message', item).find('img').length > 0;
			
			allComments.push(
			{
				id: id,
				mark: mark,
				isNew: isNew,
				isAuthor: userName == authorName,
				hasImg: hasImg
			});
		});
		
		// best desc, time asc
		allComments.sort(function(a, b) {
			return a.mark == b.mark
				? (a.id < b.id ? 1 : -1)
				: ((isNaN(a.mark) ? 0 : a.mark) > (isNaN(b.mark) ? 0 : b.mark) ? 1 : -1)
		});
		allComments.reverse();
		
		return allComments;
	}
	
	
	function ShowComments(comments)
	{
		var wnd = $('<div class="hbc" style="width: 70px; top: 55px; bottom: 10px; right: 32px; overflow: auto; position: fixed;"></div>');
		$(wnd).css('background-color', _bgColor);
		$('body').append(wnd);
		$.each(comments, function(index, comment) {
			// create item
			var item = $('<div class="hbc__item" style="text-align: right;"><a href="#">0</a></div>');
			$('a', item).attr('href', '#' + comment.id);
			$('a', item).text(comment.mark >= 0 ? '+'+comment.mark : comment.mark);
			
			// mark color
			if (comment.mark >= 0)
				$('a', item).css('color', _fgPositiveMark);
			else
				$('a', item).css('color', _fgNegativeMark);
			
			if (comment.isAuthor)
			{
				$('a', item).before('<span style="color: ' + _fgAuthor + '; font-weight: bold;">A </span>');
			}
			if (comment.hasImg)
			{
				$('a', item).before('<span style="color: blue; font-weight: bold;">i </span>');
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
		$('a.username:contains("' + authorName + '")').css('background-color', _bgAuthor);
	}
	
	function Comment_OnClick()
	{
		$('.hbc__item').css('background-color', _bgColor);
		$('.hbc__item-when-new').css('background-color', _bgColorNew);
		$(this).css('background-color', _bgColorSelected);
	}
});