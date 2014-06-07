// ==UserScript==
// @name hf
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
var message = new Array();
message[0]='支持楼主,感谢分享.回复查看！！...'
message[1]='嘿嘿,不知有木有用，试试先！！...'
message[2]='嘿嘿,太感谢了,真的很不错！！...'
message[3]='嘿嘿,这个帖子要回复看看！！...'
message[4]='纳尼？貌似很给力的样子！！...'
message[5]='虽然不用,但还是支持了！！...'
message[6]='这个可以有,回复看看先！！...'
message[7]='回复看看是神马东东！！...'
message[8]='嘿嘿,不错,鼎力支持！！...'
message[9]='嘿嘿,感谢楼主分享！！...'
message[10]='感谢楼主提供这个！！...'
message[11]='嘿嘿,这个可以有！！...'
message[12]='嘿嘿,正是我想要的！！...'
message[13]='感谢提供,鼎力支持！！...'
message[14]='噢耶,先回复试试看！！...'
message[15]='嘿嘿,看起来还不错！！...'
message[16]='非常喜欢,回复了再说！！...'
var messages = message[parseInt(Math.random()*15)];
var auto_reply_default_message = messages;
function auto_reply_chinaunix(reply_message){var pattern =/<script\s+[^>]*>replyreload.*<\/script>/;var html = document.documentElement.innerHTML;var find = html.match(pattern);
	if(find){
		var input_area = document.getElementById('fastpostmessage');
		var button_submit = document.getElementById('fastpostsubmit');
		var fastpostrefresh = document.getElementById('fastpostrefresh');
		if(input_area && button_submit){var new_message = prompt('发现隐藏贴，是否要自动回复？', reply_message);
			if(new_message == null)return;new_message = new_message.replace(/(^\s*|\s*$)/g, "");
			if(new_message == "")new_message = auto_reply_default_message;
			try{localStorage['auto_reply_message'] = new_message;}catch(err){}
			if(fastpostrefresh)fastpostrefresh.checked = false;input_area.innerText = new_message;button_submit.click();
		}
	}
}
try{var reply_message = '';
	try{reply_message = localStorage['auto_reply_message'];}catch(err){}
	if(!reply_message)reply_message = auto_reply_default_message;reply_message = reply_message.replace(/(^\s*|\s*$)/g, "");
	if(reply_message == "")reply_message = auto_reply_default_message;auto_reply_chinaunix(reply_message);
}
catch(err){}