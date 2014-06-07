// ==UserScript==
// @name        HabrahabrNewCommentExtend
// @version     1.0
// @namespace  habrahabr.ru
// @date        27.09.2008
// @author      GMM
// @include     http://*.habrahabr.ru/blogs/*
// @include     http://habrahabr.ru/blogs/*
// @require  http://habrahabr.ru/js/mootools-1.2-core-yc.js
// ==/UserScript==
function checkButtons()
{
	if(!commentForm.my_reply || commentForm.my_reply.length==0)
		$$('li.cb_my').setStyle('visibility','hidden');
	else
		$$('li.cb_my').setStyle('visibility','visible');



	if(!commentForm.new_replies || commentForm.new_replies.length==0)
	{
		$$('li.cb_prev').setStyle('visibility','hidden');
		$$('li.cb_next').setStyle('visibility','hidden');
	}
	else
	{
		$$('li.cb_prev').setStyle('visibility','visible');
		$$('li.cb_next').setStyle('visibility','visible');
	}


}
function patchFunctions()
{
         commentForm.goMyComment=(function(ev) {		
	if(!ev) {
			ev=window.event;
		}
		if (!document.all) ev.preventDefault(); else ev.returnValue = false;
	
		
		if(!commentForm.my_reply || commentForm.my_reply.length==0)
		{
		       futu_alert('Переход','Топик не содержит ваших комментариев.' , false, 'message');
		}
		else
		{

		 if(commentForm.my_reply_i >= commentForm.my_reply.length)
		 {
		        futu_alert('Переход','Больше ваших комментариев не найдено' , false, 'message');
			commentForm.my_reply_i=0;
		 }
		else
		{
			commentForm.goToComment(commentForm.my_reply[commentForm.my_reply_i]);
		}
  		    commentForm.my_reply_i++;
		}
		}
		).bind(commentForm);


	commentForm.goNextNewComment = (function (old) {
	 return  function (ev) {	
	  var oldf=old.bind(commentForm);

	    oldf(ev);
	if(!commentForm.new_replies || commentForm.new_replies.length==0)
	{
		futu_alert('Переход','Нет новых комментариев.' , false, 'message');
	}
	else
	{
	   if(commentForm.new_replies_i == commentForm.new_replies.length-1)
	   {
		futu_alert('Переход','Последний новый комментарий.' , false, 'message');
	   }

	}

	};

	})(commentForm.goNextNewComment).bind(commentForm);
        
	commentForm.goPrevNewComment = (function (old) {
	 return  function (ev) {
	var oldf=old.bind(commentForm);
          oldf(ev);
	
	if(!commentForm.new_replies || commentForm.new_replies.length==0)
	{
		futu_alert('Переход','Нет новых комментариев.' , false, 'message');
	}
	else
	{
	   if(commentForm.new_replies_i ==0)
	   {
		futu_alert('Переход','Первый новый комментарий.' , false, 'message');
	   }

	}
  	 

	};

	})(commentForm.goPrevNewComment).bind(commentForm);


	commentForm.reloadComments = (function (old) {
	 return  function (target_id, type) {	
	var oldf=old.bind(commentForm);

	futu_alert('', 'Обновление комментариев.', false, 'message');
        oldf(target_id, type);
	return false;
	};
	})(commentForm.reloadComments).bind(commentForm);
	

	commentForm.reloadCommentsOnload = (function (old) {
	 return  function (ajaxObj, _this) {
	var oldf=old.bind(commentForm);
	var commentsCount = $$('.js-comments-count').get('html');	
        oldf(ajaxObj, _this);
	var newComments = $$('.js-comments-count').get('html'); 

	var diffComments = newComments - commentsCount;
	
	if(diffComments > 0)
	{
	         futu_alert('Обновление',"Новых коментариев: " + diffComments , false, 'message');
		checkButtons();
         }
	else
	{
       		futu_alert('Обновление','Нет новых коментариев. ' , false, 'message');
	}
	 	commentForm.my_reply = getElementsByClassName($('comments'), '*', 'my-reply');
	 	commentForm.my_reply_i=0;
	};
	})(commentForm.reloadCommentsOnload).bind(commentForm);
	
}

function _init()
{
	var ul = new Element('ul');
	ul.setProperty('class','comments_bar');
	ul.inject($('wrapper'),'before');  
            
	var timeField= document.forms['comment_form'].elements['timefield'].value;
	var topicNumber= document.forms['comment_form'].elements['comment[target_id]'].value;
ul.set('html','<li class="cb_reload"><span class="corner"></span><a href="#" onclick="return commentForm.reloadComments(\''+ topicNumber  + '\', \'post\');" title="Обновить комментарии без перезагрузки страницы"></a></li>	<li class="cb_prev"><a href="#" onclick="return commentForm.goPrevNewComment(event);" title="Следующий новый"></a></li>	<li class="cb_next"><a href="#" onclick="return commentForm.goNextNewComment(event);" title="Предыдущий новый"></a></li>	<li class="cb_my"><span class="corner"></span><a href="#" onclick="return commentForm.goMyComment(event);" title="Перейти к своему комментарию"></a>');
	commentForm.initNewCommentsArray();
	patchFunctions();
	$$('div.my-reply').each(function(p){
	  p.addClass('js-my-reply');
	});
	commentForm.my_reply = getElementsByClassName($('comments'), '*', 'my-reply');
	commentForm.my_reply_i=0;
	checkButtons();

}
document.addEventListener('DOMContentLoaded', _init,false);



