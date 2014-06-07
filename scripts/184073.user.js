// ==UserScript==
// @name Instadownloader
// @namespace userscripts.org
// @author Juninho CHR <walter.jrp@live.com>
// @description	Download photos and videos from Instagram
// @include	http://instagram.com/*
// @include http://instagram.com/p/*
// @version 1.0
// ==/UserScript==

function getMediaUrl(media_type){media_url="";switch(media_type){case"image":media_url=$(".LikeableFrame").find(".Image").attr("src");break;case"video":media_url=$(".LikeableFrame").find(".Video").attr("src");break}return media_url}jQuery(document).ready(function(){var length=0;get_frame=setInterval(function(){if($(".LikeableFrame").length>length){button_exists=$(".instadown-button").length;if(button_exists==0){is_image=$(".LikeableFrame").find(".Image").length;media_type=(is_image==1?"image":"video");media_url=getMediaUrl(media_type);switch(media_type){case"image":button_download_html='<a class="Button instadown-button" href="'+media_url+'" style="margin: 5px;" download="instadown.jpg"><span><span>Download</span></span></a>';$(".LikeableFrame").find(".Image").html(button_download_html);break;case"video":button_download_html='<a href="'+media_url+'" class="Button" style="position: absolute; z-index: 1000; margin: 5px;" download="instadown-video.mp4">Download</a>';$(".LikeableFrame").find(".Video").prepend(button_download_html);break}}}},100)});