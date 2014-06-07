// ==UserScript==
// @id             point-blacklist
// @name           Point blacklist
// @version        1.1
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        http://point.im/all
// @include        http://point.im/all/*
// @include        https://point.im/all
// @include        https://point.im/all/*
// @run-at         document-end
// @homepage http://userscripts.org/scripts/show/477141
// ==/UserScript==
(function(){
/*
notification_block_id:
	id элемента, в который будет выводиться информация о том,
	что сообщения были удалены (может быть null, если эта информация не нужна)
	на текущий момент это, например: content (блок с сообщениями), left-menu (сайдбар)
notification_is_at_top:
	Добавить текст уведомления до уже имеющегося текста в блоке (true) или после (false)
notification_wrapper_style
	CSS стиль для блока с текстом нотификации
tag_black_list:
	массив запрещённых тегов (строки должны быть в нижнем регистре)
user_black_list:
	массив запрещённых пользователей (строки должны быть в нижнем регистре)
*/
var CONFIG = {
	notification_block_id: "left-menu",
	notification_is_at_top: true,
	notification_wrapper_style: "margin-bottom: 1em",
	tag_black_list: [
	],
	user_black_list: [
	]
}
function remove_el(el)
{
	el.parentNode.removeChild(el);
}
function remove_blocked()
{
	var messages_removed = 0;
	var messages = document.querySelectorAll("#content .post");
	for (var i = messages.length; i > 0; i--) {
		var current = messages[i - 1];
		// tags
		var x = current.querySelectorAll(".post-content > .tags > .tag");
		var found = false;
		for (var j = 0, len2 = x.length; j < len2; j++) {
			if (CONFIG.tag_black_list.indexOf(x[j].textContent.trim().toLowerCase()) != -1) {
				remove_el(current);
				messages_removed++;
				found = true;
				break;
			}
		}
		// users
		if (!found) {
			x = current.querySelectorAll(".post-content > .user.author");
			for (var j = 0, len2 = x.length; j < len2; j++) {
				if (CONFIG.user_black_list.indexOf(x[j].textContent.trim().toLowerCase()) != -1) {
					remove_el(current);
					messages_removed++;
					break;
				}
			}
		}
	}
	return messages_removed;
}
function notify_user(messages_removed)
{
	var output_owner = document.getElementById(CONFIG.notification_block_id);
	if (output_owner) {
		// prepare text
		var notification_text = "";
		if (messages_removed) {
			notification_text = "Скрыто: " + messages_removed + ".";
		}
		// insert text
		if (notification_text.length != 0) {
			var output_el = document.createElement("div");
			output_el.textContent = notification_text;
			output_el.setAttribute("style", CONFIG.notification_wrapper_style);
			if (CONFIG.notification_is_at_top) {
				output_owner.insertBefore(output_el, output_owner.firstChild);
			}else{
				output_owner.appendChild(output_el);
			}
		}
	}
}
var messages_removed = remove_blocked();
notify_user(messages_removed);
})();
