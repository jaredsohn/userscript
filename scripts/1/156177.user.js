// ==UserScript==
// @name        VK-деперсонализация
// @namespace   weburn.ru
// @description Заменяет все имена пользователей vkontakte на Username, а аватарки - на картинку с дохлой собачкой. Делает социальную сеть чуть менее социальной для мягкого преодоления зависимости. 
// @include https://vk.com/*     
// @include http://vk.com/*
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     2
// ==/UserScript==

function depersonate() {
  var img = 'https://vk.com/images/deactivated_100.gif';
  $('a.author, a.published_by, a.mem_link, a.wall_signed_by, .name_field a, .friends_field a b, .common_info a, .results .name a, .pv_comm a.name, a.bp_author, .blst_mem, .people_name a').html('Username');
  $('a.ava img, a.post_image img, a.reply_image img, img.feedback_row_photo, img.friends_photo_img, a.published_by_photo img, a.feedback_group_photo img, img.like_tt_stats_photo, .common_friends img, .common_friends_box img, img.search_item_img, .pv_thumb img, .bp_thumb img, img.blst_img, #group_leaders .thumb img, .ts_contact_photo img').attr('src', img);  
  $('.common_friends a').attr('title', 'Username');
  $('a.reply_to').html('кому-то');
  $('img.like_tt_stats_photo').attr('src', img).attr('title', 'Username');
}

depersonate();
setInterval(depersonate, 1000);
