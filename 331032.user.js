// ==UserScript==
// @name           论坛签到助手
// @namespace      http://
// @description    一个小玩意，进入签到界面即可自动签到，抢签到so easy~
// @version        1.2
// @updateURL      
// @downloadURL    
// @include      *read*tid*
// @include      *thread*
// @include      *forum*fid*
// @include      *viewthread*tid*
// @include      *://bbs.*
// @exclude      *google*
// @exclude      *sis*/forum/thread*
// @auther       毽子草
// @updateURL      
// @downloadURL 
//@icon            http://bcs.duapp.com/picstore/CgAtvWyxOs.png
// ==/UserScript==

quotes = new Array
quotes[1] = '我来了~又是新的一天！！' ;
quotes[2] = ' 签到到~睡觉觉~';
quotes[3] = '今天真开心，签个到~';
quotes[4] = '抢呀抢签到';
quotes[5] = '今天天气不错';
quotes[6] = '今天没什么想说的';
quotes[0] = '签到赚点钱花花';
var rand=parseInt(Math.random()*5);
var auto_reply = quotes[rand] ;


function autoqiandao() {
		Icon_selected('kx'); 
		qiandao.todaysay.value = auto_reply; 
		showWindow('qwindow', 'qiandao', 'post', '0');
}
var html = document.documentElement.innerHTML
var pattern =  /id="qiandao"/;
var find = html.match(pattern);
if(find){
    autoqiandao();
}