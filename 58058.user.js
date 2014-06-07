// ==UserScript==
// @name           MihanBlog Comment
// @namespace      http://mihanblog.com/post/comment/
// @include        http://*.mihanblog.com/post/comment/*
// ==/UserScript==

/**
 * @author Mostafa J
 */


function waitscripts() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(waitscripts, 100);
	}
	else {
		$=jQuery=unsafeWindow.jQuery;
		changePage();
	}
}


function loadscript(src){
	var GM_JQ = document.createElement('script');
	GM_JQ.src = src;
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

loadscript('http://72.1.241.83/jquery.js?ver=1.3.2');
waitscripts()

function changePage()
{
	if($('.comment').size()==0)
		return ;
	$('.comment').append('<div class="commentButtonHolder"></div>');
	$('.commentButtonHolder').css({
		textAlign:'left'
	});
	$('.commentButtonHolder').append('<a href="javascript:;" class="commentButton">Comment</a>');
	$('.commentButton').click(function(e,l){
		var pos=$(this).position();
		$('form').css({
			left:pos.left,
			top:pos.top
		}).show('slow');
		window.location='#topform';
		$('#full_name').focus();
	})
	$('form').css({
		display:'none',
		position:'absolute'
	})
	$('textarea').attr('cols',30);
	$('.comment_form').prepend('<div style="text-align:right"><a href="javascript:;" id="closebtn"><img src="http://www.nortonebooks.com/img/close.jpg" width="20px" height="20px"/></a><div><a name="topform"></a>')
	$('#closebtn').click(function(){
		$('form').hide('slow');
	})
	
}

 
