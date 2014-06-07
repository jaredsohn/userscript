// ==UserScript==
// @name       DZ论坛自动回复隐藏贴修改版
// @namespace  http://userscripts.org/users/421590
// @version    1.0
// @description  适用于一些经常使用回复可见的资源贴
// @include      http*
// @copyright  2012+, somepeople
// ==/UserScript==


var message = new Array();
    message[0]='嗯，看起来还不错，谢谢楼主。'
    message[1]='谢谢楼主分享好东西！！！'
    message[2]='嗯，这个帖子要回复看看……'
    message[3]='呵呵，太感谢了，真的很不错~~'    
    message[4]='呵呵，这个可以有！谢谢楼主提供。'    
    message[5]='嗯，正是我想要的……'    
    message[6]='谢谢楼主提供，支持了。'    
    message[7]='呵呵，不错，纯支持了^-^'    
    message[8]='回复看看是神马东东。'    
    message[9]='嗯，不知有木有用，试试看了……'    
    message[10]='哦，貌似很给力的样子……' 
    message[11]='嗯，先回复试试看@~@.' 
    message[12]='多谢楼主提供这个，顶一下！' 
    message[13]='虽然不用，但还是支持了！！！' 
    message[14]='非常喜欢，回复了再说，谢谢楼主！' 
    message[15]='看来不顶都不行了，谢谢楼主！' 
    message[16]='有这个啊，那先回复看看吧！'      
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