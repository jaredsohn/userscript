// ==UserScript==
// @name           DZ BBS auto reply hidden stick revision
// @description    DZ论坛自动回复隐藏贴修改版
// @auther		http://896221565.qzone.qq.com
// @version	 0.0.2
// @description   s896221565
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        *
// ==/UserScript==


var message = new Array();
    message[0]='嗯.看起来还不错..'
    message[1]='支持楼主!!谢谢分享'
    message[2]='嗯，这个帖子要回复看看..'
    message[3]='呵呵,太感谢了,真的很不错~~'
    message[4]='呵呵,这个可以有!'
    message[5]='虽然不用,但还是支持了!!非常喜欢,回复了再说.'
    message[6]='谢谢提供，支持了.'
    message[7]='先回复试试看@~@.貌似很给力的样子..^..^'
    message[8]='回复看看是神马东东'
var messages = message[parseInt(Math.random()*15)];
var auto_reply_default_message = messages;

function auto_reply_chinaunix(reply_message)
{
	var pattern =
		/<script\s+[^>]*>replyreload.*<\/script>/;

	var html = document.documentElement.innerHTML;

	var find = html.match(pattern);
	if(find)
	{
		//alert(find[0]);
		var input_area = document.getElementById('fastpostmessage');
		var button_submit = document.getElementById('fastpostsubmit');
		var fastpostrefresh = document.getElementById('fastpostrefresh');
		if(input_area && button_submit)
		{
			var new_message = prompt('发现隐藏贴，是否要自动回复？', reply_message);
			if(new_message == null)
				return;

			new_message = new_message.replace(/(^\s*|\s*$)/g, "");
			if(new_message == "")
				new_message = auto_reply_default_message;

			try
			{
				localStorage['auto_reply_message'] = new_message;
			}
			catch(err)
			{
			}
			if(fastpostrefresh)
				fastpostrefresh.checked = false;
			input_area.innerText = new_message;
			button_submit.click();
		}
	}
}

try
{
	var reply_message = '';

	try
	{
		reply_message = localStorage['auto_reply_message'];
	}
	catch(err)
	{
	}

	if(!reply_message)
		reply_message = auto_reply_default_message;

	reply_message = reply_message.replace(/(^\s*|\s*$)/g, "");
	if(reply_message == "")
		reply_message = auto_reply_default_message;

	auto_reply_chinaunix(reply_message);
}
catch(err)
{
}