// ==UserScript==
// @name           QQMail Broadcast
// @namespace      QMBC
// @description    UI & Functional Improvement for Broadcast
// @include        http://*.mail.qq.com/cgi-bin/reader_article_list*
// ==/UserScript==

// Add jQuery
var QMBC_JQ = document.createElement('script');
QMBC_JQ.src = 'http://jquery.com/src/jquery-latest.js';
QMBC_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(QMBC_JQ);

// Check if jQuery's loaded
function QMBC_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(QMBC_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
QMBC_wait();

function letsJQuery()
{
    $(document).ready(function () {
		var _div = $("<div id='QMBC_toolbar' style='float: right;'></div>");
		
		var _readMode = $("<a>Read Mode</a>");
		_readMode.css("font-weight", "bold").bind("click", ReadMode);
		
		_div.append(_readMode);
		
		$("<span>|</span>").css("margin", "10px").appendTo(_div);
		
		var _commentMode = $("<a>Comment Mode</a>");
		_commentMode.css("font-weight", "bold").bind("click", CommentMode);
		
		_div.append(_commentMode);
		
		$("#articlecontent").prepend(_div);
		
		$("#QMBC_toolbar").animate({ fontSize : "24px" }, 400).animate({ fontSize : "12px" }, 400);
    });
}

function ReadMode()
{
	$("div.update a[id^=artTitle_]").click();
}

function CommentMode()
{
	var links = $("div.postInfo a[id^=artCommentListLink]:visible");
	links.click();
}