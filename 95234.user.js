// ==UserScript==
// @name           Vkontakte message delete
// @description    Добавляет кнопку "удалить все сообщения" в личной почте.
// @namespace      ynblpb
// @include        http://vkontakte.ru/mail.php*
// @require        http://i.ynblpb.com/js/jquery.js
// ==/UserScript==


jQuery.noConflict();

if (document.location.search == ""){
	var mail_url = document.location.pathname + "?1=1";
}else{
	var mail_url = document.location.pathname + document.location.search;
}

var out = document.location.search;
out = out.replace("?out=", "");
if (out == "") out = 0;

var mail_total = parseInt(jQuery("span#pagesTop ul.pageList li:last a").attr("href").replace("mail.php?", "").replace("st=", ""));
var percent = 0;

var i;

var str = '"filter":"all", "mark":"del_out", "out":"' + out + '", "st": "0"';


function vk_delete_getmsglist (i){
	jQuery.getJSON(mail_url + "&st=" + i, {}, function(data){
		jQuery(data.content).find("tr[id^=mess]").each(function(){
			mid = jQuery(this).attr("id").replace("mess", "");
			str += ', "post\[' + mid + '\]": "1"';
		});
		percent = 100-(i*100/mail_total);
		jQuery("#mail_pb_cur").width(percent + "%");
	});
}
function vk_delete_cont (){
	obj = jQuery.parseJSON("{"+str+"}");
	jQuery.post('/mail.php?act=mark_msg', obj, function(){
		jQuery("#mail_pb, #actForm").remove();
		alert('Успешно удалено');
	});
	
}

jQuery(function() {
	jQuery("div.writeTab").prepend("<a href='#' id='vk_delete_msg'>Удалить все сообщения</a>&nbsp;&nbsp;");
	jQuery("#vk_delete_msg").live('click', function(){
		var s = 2000;
		var tm = (s/1000*mail_total/20).toString();
		if (confirm('Удаление займёт около '+tm+' секунд. Не обновляйте эту страницу и не жмите ни на какие ссылки. Когда все закончится - компьютер вам любезно сообзит об этом. Удаляем сообщения?')){
			jQuery("#wrapH").after("<div id='mail_pb' style='width: 100%; margin-left: 1px; background: red;'><div id='mail_pb_cur' style='width: 0%; background: black;'>&nbsp;</div></div>");
			var c = 1;
			for (i = mail_total; i >-1; i = i-20){
				setTimeout(vk_delete_getmsglist, (c*s), i);
				c++;
			}
			setTimeout(vk_delete_cont, (c*s)+1000);
		}
		return false;
	});
});
