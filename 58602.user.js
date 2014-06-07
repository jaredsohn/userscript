// ==UserScript==
// @name			mixivoice2twitter
// @namespace		http://hrd.slack77.net/
// @description		mixivoice to twitter link for twitter2mixi user
// @include			http://mixi.jp/*_echo.*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
(function($){
	mixivoice2twitter();
document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
    var node = evt.target;
    var requestURL = evt.newValue;
    var parentNode = evt.relatedNode;
    mixivoice2twitter();
}, false);

function mixivoice2twitter(){
	$("td.comment").each(function(){
		var html = $(this).html().replace(/(^|\s)[\@]+([A-Za-z0-9-_]+)/gi,'<a href="http://twitter.com/$2" target="_blank">@$2</a>');
			html = html.replace(/(^|\s)[\#]+([A-Za-z0-9-_]+)/gi, '<a href="http://search.twitter.com/search?q=%23$2&lang=ja" target="_blank">#$2</a>');
		$(this).html(html);
		$('a.echo_reply_click',this).click(function(){
			$('#echo_layer_parent_nickname').html($(this).parent().find('.echo_nickname').html());
			$('#echo_layer_parent_body').html($(this).parent().find('.echo_body').html());
			$('#echo_layer_parent_member_id').val($(this).parent().find('.echo_member_id').html());
			$('#echo_layer_parent_post_time').val($(this).parent().find('.echo_post_time').html());
			$('#replyLayer').css({display:"block",top:$(this).position().top,left:"170px",position: "absolute",zIndex:"1"});
			$("#overlay").css({display:'block'})
		});
	});
}

})(jQuery);