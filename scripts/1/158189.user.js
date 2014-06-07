// ==UserScript==
// @name            Post Saver
// @namespace       Prash.me
// @description     Will auto-save your posts for any given thread.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0.3
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require         https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==

$(document).ready(function()
{
	var pages = ['/showthread.php', '/newreply.php'];

	if ($.inArray($(location).attr('pathname'), pages) != -1) {

		var $_GET = getQueryParams(document.location.search);
		var message;
		var originalMessage;
		var edit = false;
	    var stop = false;

	    if ($_GET['fid'] != undefined && $_GET['fid'] != null) {
	    	var cookieName = 'PS_' + $_GET['fid'];
	    }
	    else {
	    	var cookieName = 'PS_' + $_GET['tid'];
	    }

	    var currentCookie = $.cookie(cookieName); 

		if ($(location).attr('pathname') == '/editpost.php') {
			edit = true;
		}

		if ($('#message').length > 0) {
			box = $('#message');
			message = $('span:contains("Type your reply to this message here.")');
		}
		else if($('#message_new').length > 0) {
			box = $('#message_new');
			message = $('strong:contains("Your Message:")');
		}

		originalMessage = message.html();

		if (currentCookie != null && currentCookie != 'null' && currentCookie != '') {
			if (box.val() == '' || $_GET['processed'] == 1 || $_GET['pid'] != undefined) {
				box.val(currentCookie);
			}
		}

		box.focus(function()
		{
			changeMessage('<br/><span style="color: green;"><strong>This post is being auto-saved as you type!</strong></span><br/><br/>');
			savePost();
		});

		box.blur(function()
		{
			changeMessage('<br/><span style="color: green;"><strong>This post has been saved</strong></span><br/><br/>');
			clearInterval(start);
		});

		$('input[value="Post Reply"], input[value="Update Post"], input[value="Post Thread"]').click(function()
		{
	        stop = true;
			return clearCookie();
		});

		function savePost()
		{
			var start = setInterval(function()
			{
				if (!stop)
	                $.cookie(cookieName, box.val(), {expires: 30});
			}, 500);
		}

		/*
		* Old function I had for get params. 
		* I would credit, but I don't know the original source
		 */
		    
		function getQueryParams(qs) {
		    qs = qs.split("+").join(" ");
		    var params = {},
		        tokens,
		        re = /[?&]?([^=]+)=([^&]*)/g;

		    while (tokens = re.exec(qs)) {
		        params[decodeURIComponent(tokens[1])]
		            = decodeURIComponent(tokens[2]);
		    }

		    return params;
		}

		function clearCookie()
		{
			$.cookie(cookieName, null);
	  	}

		function changeMessage(msg)
		{
			if (edit) {
				message.html('<br/><span style="color: red">Messages are not auto-saved when in edit mode</span><br/><br/>' + originalMessage);
			}
			else {
				message.html(msg + originalMessage);
			}
		}
    }
});