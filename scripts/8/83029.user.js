// ==UserScript==
// @name	无聊的自动翻页- =
// @include http://www.douban.com/group/topic/*
// ==/UserScript==
(function(){
	var reply= document.getElementsByClassName('topic-reply'),text=document.getElementById('last'),form=document.forms['comment_form'];
	if(reply[0].getElementsByTagName('li').length===99 && text && form){
	   text.innerHTML='翻页....';
	   form.submit();
	}
})();