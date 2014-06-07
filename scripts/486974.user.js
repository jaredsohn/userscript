// ==UserScript==
// @name        weibo-comment-batch-delete
// @namespace   weibo
// @include     http://weibo.com/comment/outbox*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
$(function(){
	
	console.log('blah');
	
	$('body').append('<div id="batchdelete" style="position: fixed;top: 50px;right: 300px;width: 100px;height: 50px;text-align: center;line-height: 50px;border: 2px solid gray;background-color:#EFEFEF;cursor:pointer;float: right;">delete</div>');
	
	$('#batchdelete').click(doDelete);
	
	$(document).bind('DOMNodeInserted', function(){
		$('a[action-type=delComment]:not([skip])').each(function(){
			if($(this).attr('skip')){
				return false;
			}
			$(this).attr('skip','skip');
			$(this).parents('dd.comment').css('width','435px').after('<dd style="float:left:width:20px;"><input type="checkbox"/>skip</dd>');
		});
	});

	function doDelete(){
		$('a[action-type=delComment]').each(function () {
			var cid = $(this).attr('action-data').split('=')[1];
			if($(this).closest('dl.list').find(':checkbox:checked').size() > 0){
				console.log('skip');
				return false;
			}
			$.ajax({
				url: 'http://weibo.com/aj/comment/del?_wv=5&__rnd=' + new Date().getTime(),
				type: 'POST',
				data: {
					cid: cid,
					_t: 0
				},
				success: function (d) {
					console.log(d);
				}
			});
		});
	}
});
