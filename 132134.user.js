// ==UserScript==
// @name         TencentWeiboFetchPosts
// @namespace    tag:przhu@gmx.com,2012-04-30:TencentWeiboFetchPosts
// @include      http://search.t.qq.com/index.php*
// @include      http://search.t.qq.com/message.php*
// @include      http://*t.qq.com/k/*
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// @require      http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.19/jquery-ui.min.js
// @resource     jq_ui_css http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.19/themes/ui-lightness/jquery-ui.css 
// ==/UserScript==

/*
 * User Variable.
 * Delay between two requests(in milliseconds).
 * Set it to prevent potential being blocked by the website.
 */
var as_human_delay = 150;

$('body').bind('fetch_finished', function(){
    var download_archor = $('#fetch_posts_download');
    var next_to_download_archor = $('#fetch_posts_next');
    var download_url = download_archor.attr('href');
    var next_to_download_url = next_to_download_archor.attr('href');
/*
 * Add Code Here To Meet Your NEEDS.
 * If you like to open the downloaded automatically, just write:
 *    window.open(download_url, '_blank');
 * Similiarly, if you want to redirect the page to next not downloaded
 * page, write:
 *    if (!(typeof (next_to_download_url) === 'undefined'))
 *        window.location = next_to_download_url;
 *
 */
});

function _addStyleURL(cssurl)
{
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type='text/css';
    style.href = cssurl;
    document.getElementsByTagName('head')[0].appendChild(style);
}
_addStyleURL(GM_getResourceURL('jq_ui_css'));

$('body').append("<div id='fetch_posts_dialog' title='Fetch Posts'>"+
"<label for='fetch_page_count' style='margin-right: 5px'>Count</label>"+
"<input id='fetch_page_count' title="+
"'specify pages of posts to be downloaded(from this page)'>"+
"</div>"
);

function bind_progress_bar(fpd) {
    fpd.append('<div id="fetch_progress_bar"></div>');
    $('#fetch_progress_bar').progressbar({
	value: 0
    });
    $('body').bind('fetch_progress', function(e, redir_count, redir_limit) {
	$('#fetch_progress_bar').progressbar({
	    value: redir_count / redir_limit * 100
	});
    });
}

var startDownload = function(){};
var redir_limit;

$(window).load (

    function(){
	$('#fetch_posts_dialog').dialog({
	    // autoOpen: false,
	    position: 'right',
	    buttons: {
		'ok': function() {
		    redir_limit = parseInt($('#fetch_page_count').
					   attr('value'));
		    if (redir_limit == NaN) {
			alert('please input a valid number');
		    } else {
			var fpd = $('#fetch_posts_dialog');
			fpd.dialog(
			    'option', 'buttons', {}
			);
			$('#fetch_page_count').attr('disabled', 'disabled');
			if (0 < redir_limit) 
			    bind_progress_bar(fpd);
			startDownload();
		    }
		}, 
		'cancel': function() {
		    $(this).dialog('close');
		}
	    }
	});
    }

);

$.ajaxSetup({
// url: "http://localhost:4567/",
 global: false,
 type: "GET",
 async: false
});

function getPosts(doc, posts) {
    var msgs = $("#talkList > li", doc);
    if (msgs != null) {
	var post;
	var msgid, msgtime, msgtext, replyto;
	for(var i = 0; i < msgs.length; ++i) {
	    post = $('<post></post>');
	    msgid = $(msgs[i]).attr('id');
	    msgtime = $(msgs[i]).attr('rel');
	    msgtext = $("> .msgBox > .msgCnt", msgs[i]).text();
	    // alert(msgtext);
	    replyto = $(".replyBox .pubInfo a.time", msgs[i]).attr('href');
	    post.append('<id>'+msgid+'</id>');
	    post.append('<time>'+msgtime+'</time>');
	    post.append('<text>'+msgtext+'</text>');
	    if (!(typeof (replyto) === 'undefined')) {
		post.append('<replyto>'+replyto+'</replyto>');
	    }
	    $(posts).append(post);
	}
    }
    return posts;
}

var redir_count = 0;
var cur_doc = document;
var nextpage;
var results = $('<posts></posts>');

startDownload = function () {
    if (redir_count != 0) {
	$.ajax({
	    url: nextpage,
	    success: function (data) { cur_doc = data; }
	});
    }
    getPosts(cur_doc, results);
    redir_count = redir_count + 1;
    $('body').trigger('fetch_progress', [redir_count, redir_limit]);
    nextpage = $('.blueFoot a:last-child', cur_doc).
	filter('.pageBtn').attr('href');
    if (redir_count >= redir_limit || typeof (nextpage) === 'undefined') {
	var fpd = $('#fetch_posts_dialog');
	var fpdl_link = 'data:text/plain;charset=utf-8,'+
	     encodeURIComponent('<?xml version="1.0" encoding="utf-8"?>'+
				'<posts>'+results.html()+'</posts>');
	fpd.append('<p><a id="fetch_posts_download" href="'+
		   fpdl_link+'" target="_blank">Download It!</a></p>'
		   );
	if (!(typeof(nextpage)==='undefined')) {
	    fpd.append('<p><a id="fetch_posts_next" href="' + nextpage + 
			'" target="_blank">Next Page To Fetch</a></p>');
	}
	$('body').trigger('fetch_finished');
    } else {
	window.setTimeout(startDownload, as_human_delay);
    }
};
