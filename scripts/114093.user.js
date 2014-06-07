// ==UserScript==
// @id             vk.com-0510c6f2-4ec3-4007-836e-0646f960cef7@script
// @name           VK - home page
// @version        1.1
// @history        1.1 Добавлена поддержка vkontakte.ru, вроде бы.
// @history        1.0 Релиз.
// @namespace      script
// @author         Black_Sun
// @description    Заменяет кнопку VK с перехода новости, переходом на свою страницу.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @run-at         document-end
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js?ver=1.6.1
// ==/UserScript==
var a=setInterval(function(){
$('.top_home_link:eq(0)','#top_links').attr('onclick',$('.hasedit.fl_l:eq(0)','#side_bar').attr('onclick'));
$('.top_home_link:eq(0)','#top_links').attr('href',$('.hasedit.fl_l:eq(0)','#side_bar').attr('href'));
},500);
if($('.top_home_link:eq(0)','#top_links').attr('onclick')='return nav.go(this, event, {noback: true})')clearInterval(a);