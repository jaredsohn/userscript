// ==UserScript==
// @id             juick-blacklist
// @name           juick-blacklist
// @version        1.9
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        http://juick.com/*
// @include        https://juick.com/*
// @run-at         document-start
// @homepage http://userscripts.org/scripts/show/477122
// ==/UserScript==

(function(){
/*
notification_block_id:
	id элемента, в который будет выводиться информация о том,
	что сообщения были удалены (может быть null, если эта информация не нужна)
	на текущий момент это, например: content (блок с сообщениями), column (сайдбар)
notification_is_at_top:
	Добавить текст уведомления до уже имеющегося текста в блоке (true) или после (false)
notification_wrapper_style
	CSS стиль для блока с текстом нотификации
tag_black_list:
	массив запрещённых тегов (строки должны быть в нижнем регистре)
*/
var CONFIG = {
	notification_block_id: "content",
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
function remove_ads()
{
	var ads_removed = 0;
	var ad = document.querySelector("#content > article > .msg-cont > .msg-ts > a[href='/help/ru/adv']");
	if (ad) {
		remove_el(ad.parentNode.parentNode.parentNode);
		ads_removed++;
	}
	return ads_removed;
}
function remove_blocked()
{
	var messages_removed = 0;
	var messages = document.querySelectorAll("#content > article, #content .msgthread");
	for (var i = messages.length; i > 0; i--) {
		var current = messages[i - 1];
		var tags = current.querySelectorAll("header.u a, .msg-cont > .msg-header a");
		for (var j = 0, len2 = tags.length; j < len2; j++) {
			var current_tag = tags[j];
			if (j === 0) {
				// username, not tag
				if (CONFIG.user_black_list.indexOf(current_tag.textContent.trim().toLowerCase()) != -1) {
					remove_el(current);
					messages_removed++;
					break;
				}
			} else {
				// real tag
				if (CONFIG.tag_black_list.indexOf(current_tag.textContent.trim().toLowerCase()) != -1) {
					remove_el(current);
					messages_removed++;
					break;
				}
			}
		}
	}
	return messages_removed;
}
function hide_blocked_comments()
{
	var comments = document.querySelectorAll("#replies .msg");
	for (var i = 0, len = comments.length; i < len; i++) {
		var current_comment = comments[i];
		var author_el = current_comment.querySelector(".msg-cont > .msg-header > a");
		if (author_el) {
			var author_name = author_el.textContent.trim().toLowerCase().substring(1);
			if (CONFIG.user_black_list.indexOf(author_name) != -1) {
				author_el.style.color = "#FF1C15";
				var button = document.createElement("button");
				button.textContent = "Показать";
				button.setAttribute("style", "float: right;margin-right: 1ex;");
				button.addEventListener("click", show_comment_handler, false);
				author_el.parentNode.insertBefore(button, author_el);
				var text_el = current_comment.querySelector(".msg-txt");
				if (text_el) {
					text_el.style.display = "none";
				}
			}
		}
	}
}
function show_comment_handler(ev)
{
	var target = ev.target;
	var comment = target.parentNode.parentNode.parentNode;
	var comment_text = comment.querySelector(".msg-txt");
	if (comment_text) {
		comment_text.style.display = "block";
	}
	remove_el(target);
}
function notify_user(ads_removed, messages_removed)
{
	var output_owner = document.getElementById(CONFIG.notification_block_id);
	if (output_owner) {
		// prepare text
		var notification_text = "";
		if (messages_removed) {
			notification_text = "Скрыто постов: " + messages_removed + ".";
		}
		if (ads_removed) {
			if (notification_text.length != 0) notification_text += " ";
			notification_text = notification_text + "Скрыто рекламы: " + ads_removed + ".";
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
function on_load()
{
	var ads_removed = remove_ads();
	var messages_removed = remove_blocked();
	hide_blocked_comments();
	notify_user(ads_removed, messages_removed);
}

document.addEventListener("DOMContentLoaded", on_load, false)

})();
