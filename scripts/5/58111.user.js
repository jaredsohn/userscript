// ==UserScript==
// @name           Gamer.Ru BlackList
// @namespace      http://www.gamer.ru/
// @description    Добавляет на Gamer.Ru черный список блогов, для которых посты будут скрыватся!
// @author         Tarahonich Yuriy aka Sofcase
// @include        http://*.gamer.ru/*
// ==/UserScript==

var hide_blogs = new Array("Blog1", "Blog2");

unsafeWindow.$('.post h3').each(function(){var findPost=false;var i=0;for(i=0;i<hide_blogs.length;i++){if(hide_blogs[i]==unsafeWindow.$(this).children('a:first').text()){findPost=true;break}}if(findPost){var postId=new RegExp('post_([0-9]+)_marks').exec(unsafeWindow.$(this).children('span:last').attr('class'))[1];unsafeWindow.$(this).parent().css('opacity',.5);if(unsafeWindow.$(this).next('div.pics')!=null){unsafeWindow.$(this).next('div.pics').css("display","none")}if(unsafeWindow.$(this).nextAll('div.body')!=null){unsafeWindow.$(this).nextAll('div.body').css("display","none")}if(unsafeWindow.$(this).nextAll('div[class!=user]')!=null){unsafeWindow.$(this).nextAll('div[class!=user]').css("display","none")}if(unsafeWindow.$(this).nextAll('div.user')!=null){unsafeWindow.$(this).nextAll('div.user').css("display","none")}var element=document.createElement('a');element.style.cursor='pointer';element.style.textDecoration='underline';element.appendChild(document.createTextNode('Раскрыть пост'));element.addEventListener("click",function(event){event.target.style.display='none';unsafeWindow.$('.for_item_post_'+postId+' div.body').css("display","block");unsafeWindow.$('.for_item_post_'+postId+' div.user').css("display","block");unsafeWindow.$('.for_item_post_'+postId+' div.pics').css("display","block");unsafeWindow.$('.for_item_post_'+postId).css("opacity",1)},false);unsafeWindow.$(this).after(element)}});