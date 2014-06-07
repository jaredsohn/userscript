// ==UserScript==
// @name       BBS bot
// @version    0.7.1
// @description  auto-replay the hidden posts ,for discuz & phpwind7/8
// @namespace   http://userscripts.org/users/tumuyan
// @include      *read*tid*
// @include      *thread*
// @include      *forum*fid*
// @include      *viewthread*tid*
// @include      http://bbs.*
// @exclude      *google*
// @exclude      *sis*/forum/thread*
// @auther       tumuyan
// @icon          http://s3.amazonaws.com/uso_ss/icon/152745/large.PNG
// @updateURL      https://userscripts.org/scripts/source/152745.meta.js
// @downloadURL    https://userscripts.org/scripts/source/152745.user.js
// ==/UserScript==

// bbsbot正在改造中...

// 这是一个测试的版本,第一次打开一个论坛的隐藏贴时，脚本会询问是否在本论坛开启自动回复功能;


quotes = new Array
quotes[1] = '很棒~~ 楼主大爱！！'        
quotes[2] = '好厉害！ 支持+10086'
quotes[3] = '泪流满面！原来这样的…'
quotes[4] = 'Mark一下，回头再学习'
quotes[5] = '楼主辛苦了 真是好人啊'
quotes[6] = '向楼主学习 我要加油了'
quotes[7] = '楼主写的真棒~~~~'
quotes[8] = '楼主真乃神人也！'
quotes[9] = '这个很不错 支持一下'
quotes[10] = "虽不明，但觉厉..."
quotes[11] = "感谢分享，貌似不错"
quotes[0] = '顶楼主,希望楼主发更多好帖...';
var rand=parseInt(Math.random()*10);
var auto_reply = quotes[rand] 

var bbsbot;
try {bbsbot = localStorage["bbsbot"]} catch (err) {}

function step1(button_submit) { 

if (bbsbot==2)
{
button_submit.click() 
}
else
{
if (bbsbot==1)
{}
else
{
  var r=confirm("此论坛要自动回复隐藏贴的功能麽？")
  if (r==true)
    {
    try {localStorage["bbsbot"] = 2;} catch (err) {}
    }
  else
    {
    try {localStorage["bbsbot"] = 1;} catch (err) {}
    }

}
}

}

var html = document.documentElement.innerHTML
var pattern =  /<script .{0,60}>replyreload.{0,30}<\/script>/
var find = html.match(pattern);
        if(find)
        {
                var input_area = document.getElementById('fastpostmessage');
                var button_submit = document.getElementById('fastpostsubmit');
                if(input_area && button_submit)
                { 
				input_area.innerHTML =auto_reply ; 
				step1(button_submit)
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
					{ input_area.innerHTML=auto_reply ; step1(button_submit);}
				}
      
        }