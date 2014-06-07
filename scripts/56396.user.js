// ==UserScript==
// @name Vkontakte Messages Deleter
// @description Generates button for delete all messages
// @author Khritoshin Daniil (id6048)
// @include http://vkontakte.ru/mail.php*
// ==/UserScript==


var deleteAllCKInboxMessaged;
var deleteAllVKMessagedLog = new Array();
function deleteAllVKMessagedLogShow(){
	alert(deleteAllVKMessagedLog.join('\n'));
}

(function($){
var log = deleteAllVKMessagedLog;
var deletedPagesNumber = 0;
$(document).ready(function(){	
	// тут мы создаём кнопки, которые будут дёргать одну нашу внешнюю функцию.
	// out = 0 - inbox	
	// out = 1 - outcox
	var code='<li><a href="javascript:deleteAllCKInboxMessaged(0);">Delete All Inbox</a></li><li><a href="javascript:deleteAllCKInboxMessaged(1);">Delete Outbox</a></li>';
	$('#msgs ul.tabs').append(code);
	$('#msgs ul.tabs').css('width','80%');
});

function executeFunction(number,ss,out){
		ss.addFunction(function(){			
			$.get('http://vkontakte.ru/mail.php',{'out':out,'st':number},function(data){
				var $data = $(data);									
				deleteMessagesOnCurrentPage($data,out);
				deletedPagesNumber--;
				if(deletedPagesNumber==0){
					window.location = "http://vkontakte.ru/mail.php?out="+out;
				}
				ss.removeFunction();
			});
	});
}		

function deleteMessagesOnCurrentPage($data,out){
	$('td.messageSnippet', $data).each(function(){
		try {
			var msg_id = parseInt(this.id.replace('mb', ''));
			if (isNaN(msg_id)) {
				log.push('Unable to parse message. id:' + this.id);
			}
			//alert(msg_id);  //Uncomment for debug			
			$.post('http://vkontakte.ru/mail.php', {'out': out,	'act': 'a_delete',	'id': msg_id}, function(answer){},'String');
		} 
		catch (ex) {
			log.push(ex);
		}
	});
}
		
deleteAllCKInboxMessaged = function(out){
	if(!confirm("Are you sure?"))
		return;				
	jQuery('#content').fadeTo(400,0.3);
	$.get('http://vkontakte.ru/mail.php',{'out':out},function(data){
			var $data = $(data);
			var a = $('ul.pageList li:last a',$data)[0];	
			if(typeof a == 'undefined'){
				// У нас только одна страница сообщений. Будем удалять то, что есть.
				deleteMessagesOnCurrentPage($data,out);
				setTimeout(function(){window.location = "http://vkontakte.ru/mail.php?out="+out;},1000);	
				return;	
			}				
			var messagesNumber = parseInt(a.href.substring(a.href.lastIndexOf('=')+1));	
			if(isNaN(messagesNumber))
				alert('Невозможно получить число сообщений.');
			setTimeout(function(){afterGetMessageNumber(messagesNumber,out);},2000);
		});
}

function afterGetMessageNumber(messagesNumber,out){
	var ss = new SyncSequence();
	while(messagesNumber>=0)
	{				
		executeFunction(messagesNumber,ss,out);
		messagesNumber = messagesNumber - 20;		
		deletedPagesNumber++;
	}
	ss.runSequence();
}

function SyncSequence(){
	this.__functions__ = new Array();
}
SyncSequence.prototype={	
	addFunction:function(func){
		this.__functions__.push(func);		
	},
	removeFunction:function(){		
		this.__functions__.splice(0,1);		
		this.runSequence();
	},
	runSequence:function(){
		var context = this.__functions__[0];	
		if(this.__functions__.length > 0)
			setTimeout(function(){context();},2000);
	}
}
})(jQuery);
