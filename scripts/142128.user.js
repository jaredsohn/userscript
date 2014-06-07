// ==UserScript==
// @id             tieba
// @name           Quote
// @version        1.0
// @namespace      
// @author       mYmYm 、congxz6688
// @description    
// @include			http://tieba.baidu.com/*
// @include			http://tieba.baidu.com.cn/*
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @date			2012/09/08/
// ==/UserScript==
/*根据校长之怒提取、整合，向其作者致敬*/
var split = '<br />———————————————————————————<br />';
function displayUser(){
var $users=$("a.p_author_name");
var $tbodys=$users.parent().parent().parent().parent().parent();
for(var i=0;i<$users.length;i++){
info(i,$users,$tbodys);
}
$('div.p_postlist').find('.lzl_cnt').each(function(i) {
			displayUserLzl($(this));
		});
document.addEventListener('DOMNodeInserted', function(event) {
			var $users = $(event.target).find('a.p_author_name');
			var $tbodys = $users.parent().parent().parent().parent().parent();
			var $reply = $(event.target).find('a.lzl_link_unfold');
			$(event.target).find('div.l_post').each(function(i) {
				info(i, $users, $tbodys);
			});
			
			$(event.target).find('.lzl_cnt').each(function(i) {
				displayUserLzl($(this));
			});
		}, true);
}
function displayUserLzl($this) {
		var username = $this.find('.at').attr('username');
		var content = $this.find('.lzl_content_main').text();
		var louceng = $this.parent().parent().parent().parent().parent().parent().find('.p_tail').find('span').eq(0).text();
		content = content.replace(/(<br>)+/gi, '<br>');
		Reply(username, louceng, content, $this.find('.lzl_s_r'));
	}
function info(i, $users, $tbodys){
        var $user = $users.eq(i);
		var $tbody = $tbodys.eq(i);
		var $target = $tbody.find('ul.p_tail').find('li').eq(1).find('span');
		var username = $user.text();
		var louceng = $tbody.find('.p_tail').find('span').eq(0).text();
		var content = $tbody.find('.d_post_content').html();
Reply(username,louceng,content,$target);
}
function Reply(un,ul,uc,$ths){
var ca = document.createElement('a');
		ca.href = '#sub';
		ca.innerHTML = '引用';
ca.addEventListener('click', function() {
if (( i = uc.indexOf(split)) != -1) {
				uc = uc.substr(i, uc.length - 1);
			}
if (uc.length >= 100){
				uc += '……';
				}
uc = uc.replace(/^引用[^——————————————————————]*/gi, '').replace(split, '').replace(/\s*/gi, '').replace(/<br>/gi, "〓").replace(/<img[^>]*>/gi, '㊣').replace(/<[^>]*>/gi, '').substr(0, 100).replace(/㊣/gi, '[图片]').replace(/〓+/gi, "<br>").replace(/<br>$/gi, '');
var temp='引用 @'+un+' ('+ul+')<br />'+uc+split+'<br />';
	$("div.tb-editor-editarea").html(temp + $("div.tb-editor-editarea").html());
		}, false);	
	    $ths.prepend('|');
		$ths.prepend(ca);
		}
displayUser();