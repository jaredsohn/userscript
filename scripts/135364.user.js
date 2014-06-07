// ==UserScript==
// @name		weibo minimalism
// @description	make your weibo page unbelievable clean
// @include		http://weibo.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author		Van De Ripper
// ==/UserScript==

$(document).ready(function(){$('body,.W_miniblog,.W_main_narrow_bg,.custom_content_bg,.perAll_info').css('background','none');$('.W_main_r,.tips_player,.global_footer,.nfTagB_group,#base_scrollToTop,.wbim_min_box_col2').remove();$('.global_header').css('visibility','hidden').find('.right').css('visibility','visible').css('background-color','#EFEFFF');$('.search').css({'visibility':'visible','opacity':'0.3','left':'250px','top':'50px'});$('#pl_content_publisherTop').css('visibility','hidden').find('.input,.btn').css('visibility','visible');$('.content>.comment').css('border','none').css('background','none');$('.feed_list').css('border-bottom','none');});
