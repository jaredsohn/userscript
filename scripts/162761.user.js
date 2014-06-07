// ==UserScript==
// @name        新浪微博自动评论
// @author      o丨Reborn <sbwtws@gmail.com>
// @namespace   http://blog.石博文.com/
// @description 新浪微博自动评论
// @require     http://code.jquery.com/jquery-1.9.0.min.js
// @include     http://weibo.cn/comment/*
// @updateURL   https://userscripts.org/scripts/source/162761.meta.js
// @downloadURL https://userscripts.org/scripts/source/162761.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/d92f6fd8ad5265626f726ee90f
// ==/UserScript==

// 生效页面:
//		http://weibo.cn/comment/*	即评论页面

// 这儿可以添加评论内容,注意最后一行末尾没有','
var contentPL=new Array(
"关我毛事",
"我来抢个楼",
"奖品是我的!!!",
"看看多少楼了",
"刷楼刷楼刷楼!!",
"哈哈哈哈哈哈哈哈",
"你们抢吧,我就是路个过.",
"我都快累死了!!",
"顺便求个粉!!",
"天啊!网速不给力!",
"我是奔奖品来的..",
"主页君保佑!!!",
"人好多..",
"再抢一楼",
"没有奖品我就哭!!",
"怎么删楼了呀....",
"[发红包][发红包]",
"[鼓掌][鼓掌][鼓掌]",
"加油!!!!!!",
"[酷][酷][酷][酷]",
"一个人的幸福建立在很多人的痛苦上!!!",
"赶快啊.....",
"哈哈,人好多哈"
);

$('input[value="评论"]').after('<input type="button" class="superRe" value="刷评论" />');
$('.superRe').click(function(){
	setInterval(send,1000);
});

var url='http://weibo.cn'+$('form[method="post"]').attr('action');
var srcuid=$('input[name="srcuid"]').attr('value');
var id=$('input[name="id"]').attr('value');
var afr=$('input[name="afr"]').attr('value');
var rl=$('input[name="rl"]').attr('value');

var counts=0;

function send(){
	$.ajax({
		url:url,
		type:'post',
		headers:{
			"Referer":location.href,
			"Content-type":"application/x-www-form-urlencoded; charset=UTF-8",
			"X-Requested-With":"XMLHttpRequest"
		},
		data:{
			'srcuid':srcuid,
			'id':id,
			'afr':afr,
			'rl':rl,
			'content':contentPL[Math.round(Math.random()*(contentPL.length-1))]
		},
		success:function(res){
//			alert(res);
			$('textarea[name="content"]').append('成功'+(++counts)+'\t');
		}
	});
}
