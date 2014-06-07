// ==UserScript==
// @name           pixiv_comment_button_for_autopagerize
// @version        1.0
// @namespace      http://userscripts.org/users/438377
// @author         henge
// @description    Autopagerizeで読み込んだ作品ページの「コメントを見る」ボタンを有効にする
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @run-at         document-end
// ==/UserScript==


// 参考
// http://javascripter.hatenablog.com/entry/20090324/1237903880
// http://efcl.info/2009/1122/res1483/
function evalInPage(fun) {
	location.href = "javascript:void (" + fun + ")()";
}
// 既存の関数を上書き
evalInPage(function () {
	pixiv.comments = {
		setup: function(node) {
			$(node).find('.comment-show-button').on('click', function() {
				var area = $(this).closest('.comment-area');
				var illustId = parseInt($(this).closest('.work-detail-unit').find('.bookmark-container a').attr("href").match(/\d+/));
				pixiv.api.post('rpc_comment_history.php', {
				i_id: illustId,
				u_id: pixiv.context.userId,
				}, {
				ajaxSettings: {dataType: 'json'}
				}).done(function(data, status, xhr) {
				if (data.error) {
				return;
				}
				area.addClass('comment-open');
				if (data.data.html_array) {
				if (data.data.html_array.length) {
				area.find('.comment-list').append(data.data.html_array.join(''));
				} else {
				area.addClass('comment-none');
				}
				}
				if (data.data.more) {
				area.addClass('comment-more')
				} else {
				area.removeClass('comment-more')
				}
				});
			});
			var page = 1;
			$(node).find('.comment-more-button').on('click', function() {
				var area = $(this).closest('.comment-area');
				var illustId = parseInt($(this).closest('.work-detail-unit').find('.bookmark-container a').attr("href").match(/\d+/));
				pixiv.api.post('rpc_comment_history.php', {
				i_id: illustId,
				u_id: pixiv.context.userId,
				p: ++page
				}, {
				ajaxSettings: {dataType: 'json'}
				}).done(function(data, status, xhr) {
				if (data.error) {
				return;
				}
				if (data.data.html_array) {
				if (data.data.html_array.length) {
				area.find('.comment-list').append(data.data.html_array.join(''));
				}
				}
				if (data.data.more) {
				area.addClass('comment-more')
				} else {
				area.removeClass('comment-more')
				}
				});
			});
			$(node).find('.comment-area').on('click', '.comment-delete-icon', function() {
				if (!confirm('コメントを削除しますか？')) {
				return;
				}
				var item = $(this).closest('.comment-item');
				var illustId = parseInt($(this).closest('.work-detail-unit').find('.bookmark-container a').attr("href").match(/\d+/));
				pixiv.api.post('rpc_delete_comment.php', {
				i_id: illustId,
				del_id: item.dataset('commentId')
				}, {
				ajaxSettings: {dataType: 'json'}
				}).done(function(data, status, xhr) {
				if (data.error) {
				return;
				}
				item.remove();
				});
			});
		}
	};
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){
		pixiv.comments.setup(e.target);
	}, false);
	document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function(e){
		pixiv.comments.setup(e.target);
	}, false);
	document.body.addEventListener('AutoPagerAfterInsert', function(e){
		pixiv.comments.setup(e.target);
	}, false);
});
