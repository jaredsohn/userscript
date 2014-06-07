// ==UserScript==
// @name       BBS bot
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

// bbsbot正在改造中...

// 这是一个回滚的版本,取消了回复所有贴的设置,消除了对验证码的尝试;


quotes = new Array
quotes[1] = '很棒 楼主大爱'        
quotes[2] = '好厉害！ 支持+10086'
quotes[3] = '泪流满面！原来这样的…'
quotes[4] = '随手回帖是个好习惯!'
quotes[5] = '楼主辛苦了 真是好人啊'
quotes[6] = '向楼主学习'
quotes[7] = '楼主写的真棒'
quotes[8] = '楼主真乃神人也！'
quotes[9] = '这个很不错 支持一下'
quotes[10] = "看贴回帖是对作者的尊重!"
quotes[0] = '顶楼主,希望楼主再接再厉再发精品好帖...';
var rand=parseInt(Math.random()*10);
var auto_reply = quotes[rand] 

var html = document.documentElement.innerHTML
var pattern =  /<script .{0,60}>replyreload.{0,30}<\/script>/
var find = html.match(pattern);
        if(find)
        {
                var input_area = document.getElementById('fastpostmessage');
                var button_submit = document.getElementById('fastpostsubmit');
                if(input_area && button_submit)
                { input_area.innerHTML =auto_reply ; 
						button_submit.click()
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
				if(input_area && button_submit)
					{ input_area.innerHTML=auto_reply ; button_submit.click();}
				}
      
        }
