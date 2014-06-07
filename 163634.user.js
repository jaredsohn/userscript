// ==UserScript==
// @name       自用版(更多回复项)
// @version    0.5
// @description  auto-replay the hidden posts ,for discuz & phpwind7/8
// @namespace   http://userscripts.org/users/tumuyan
// @include      *read*tid*
// @include      *thread*
// @include      *forum*fid*
// @exclude      *google*
// @exclude      *sis*/forum/thread*
// @auther     tumuyan
// ==/UserScript==

//修改自 http://userscripts.org/scripts/show/152745

// bbsbot正在改造中...

// 这是一个回滚的版本,取消了回复所有贴的设置,消除了对验证码的尝试;


quotes = new Array
quotes[1] = '感谢楼主分享，顶贴支持～'        
quotes[2] = '好东西啊，谢谢楼主分享'
quotes[3] = '收藏了。谢谢楼主分享'
quotes[4] = '嗯，看起来还不错，谢谢楼主。'
quotes[5] = '楼主辛苦了 真是好人啊'
quotes[6] = '谢谢楼主分享好东西！！！'
quotes[7] = '嗯，这个帖子要回复看看……'
quotes[8] = '呵呵，太感谢了，真的很不错~~'
quotes[9] = '这个很不错，支持一下'
quotes[10] = '呵呵，这个可以有！谢谢楼主提供。'
quotes[11] = '嗯，正是我想要的……'
quotes[12] = '谢谢楼主提供，支持了。'
quotes[13] = '呵呵，不错，纯支持了^-^'
quotes[14] = '回复看看是神马东东。'
quotes[15] = '嗯，不知有木有用，试试看了……'
quotes[16] = '哦，貌似很给力的样子……'
quotes[17] = '嗯，先回复试试看@~@.'
quotes[18] = '多谢楼主提供这个，顶一下！'
quotes[19] = '虽然不用，但还是支持了！！！'
quotes[20] = '非常喜欢，回复了再说，谢谢楼主！'
quotes[21] = '看来不顶都不行了，谢谢楼主！'
quotes[22] = '有这个啊，那先回复看看吧！'
quotes[0] = '顶楼主,希望楼主发更多好帖...';
var rand=parseInt(Math.random()*10);
var auto_reply = quotes[rand] 

var html = document.documentElement.innerHTML
var pattern =  /<script .{0,60}>replyreload.{0,30}<\/script>/
var find = html.match(pattern);

        if(find)
        {
                var input_area = document.getElementById('fastpostmessage');
                var button_submit = document.getElementById('fastpostsubmit');				
		var reply_message=prompt('发现隐藏贴，是否要自动回复？', auto_reply);		
				if(input_area && button_submit && reply_message!=null && reply_message!="")
                { input_area.innerHTML =auto_reply ; button_submit.click()
				}
        }
        else
        {
            var pattern =  /<blockquote .{0,120}>.{0,60}隐藏.{0,20}回复.{0,40}<\/blockquote>/;
            
			if (html.match(pattern))
				var  pw =1
			else 
                var pw = document.getElementById('hidden_1_tpc') + document.getElementById('hidden_2_tpc') + document.getElementById('hidden_3_tpc') + document.getElementById('hidden_4_tpc') 
			if(pw)
				{
			
				var input_area = document.getElementById('textarea');
				var button_submit = document.getElementsByName('Submit')[0];
                                var reply_message=prompt('发现隐藏贴，是否要自动回复？', auto_reply);
				if(input_area && button_submit && reply_message!=null && reply_message!="")
					{ input_area.innerHTML=auto_reply ; button_submit.click();}
				}
      
        }