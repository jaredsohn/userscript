// ==UserScript==
//
// @name           Smarter KM
//
// @description    Make your KM work smarter
//
// @namespace      http://km.oa.com/user/aloongdeng
//
// @author         aloong (http://km.oa.com/user/aloongdeng) 
//
// @homepage       http://km.oa.com/user/aloongdeng
//
// @version        1.8
//
// @icon           http://km.oa.com/files/groups/icons/12003.jpg
//
// @include        http://km.oa.com/*
// @match          http://km.oa.com/*
// @include        http://bbs.oa.com/*
// @match          http://bbs.oa.com/*
//
// @history        1.8 adjust for new KM styles
// @history        1.7 bbs user name to link
// @history        1.6 add oa user profile link
// @history        1.5 bbs double click next page
// @history        1.4 better original image
// @history        1.3 add bbs avatar support
// @history        1.2 fix resizing bug
// @history        1.1 remove jquery
// @history        1.0 first version
//
// @encoding       UTF-8
//
// ==/UserScript==

$("body").append("<img src=\"\" id=\"img_prev_box\" style=\"position: fixed;top: 0px;left: 100%;height: auto;width: auto;margin-left: 0px;z-index:10001;\">");
var mouse_x = 0;
var mouse_y = 0;
var page_width = $(window).width(); 
var page_height = $(window).height(); 
var img_prev_height = 0;
var img_prev_width = 0;
var img_prev_box = $("#img_prev_box");
var img_prve_last_url = '';

$(window).resize(function() {
  page_width = $(window).width(); 
  page_height = $(window).height(); 
});
$(document).mousemove(function(e) {  
  mouse_x=e.pageX;
  mouse_y=e.pageY;
  if (mouse_x >= (page_width-img_prev_width))  {
    img_prev_box.css("left", "0");
    img_prev_box.css("margin-left", "0px");
  } else {
    img_prev_box.css("left", "100%");
    img_prev_box.css("margin-left", '-' + img_prev_width + "px");
  }
}); 

img_prev_box.error(function(){
  if (img_prev_box.attr("src").indexOf("/l_") > -1) {
	img_prev_box.attr("src", img_prev_box.attr("src").replace("/l_","/"));
	img_prve_last_url = img_prev_box.attr("src");
  }
})

img_prev_box.load(function() {
  if (img_prev_box.height() < 60 && img_prev_box.width() < 60) {
    img_prev_box.hide();
	return;
  }

  img_prev_box.css("max-height", page_height + "px");
  img_prev_box.css("max-width", page_width/2 + "px");
  img_prev_width = img_prev_box.width()
  img_prev_box.css("margin-left", '-' + img_prev_width + "px");
});

$("img[src*='photo'],img[src*='avatar.jpg']").live("mouseenter", function(){
  if ($(this).attr("src").replace("/s_","/") == img_prve_last_url) {
	img_prev_box.attr("src", img_prve_last_url);
  } else {
	img_prev_box.attr("src", $(this).attr("src").replace("/s_","/l_").replace("avatar.jpg","preview.jpg"));
  }
  img_prev_box.show();
});
$("img[src*='photo'],img[src*='avatar.jpg']").live("mouseleave", function(){
  img_prev_box.hide();
  img_prev_box.css("height", "auto");
  img_prev_box.css("width", "auto");
});

if(window.location.href.indexOf("km.oa.com/user")>-1){
  $("img[src*='profile.jpg']").mouseenter(function(){
    img_prev_box.attr("src", $(this).attr("src").replace("profile", "preview"));
    img_prev_box.show();
  });
  $("img[src*='profile.jpg']").mouseleave(function(){
    img_prev_box.hide();
    img_prev_box.css("height", "auto");
    img_prev_box.css("width", "auto");
  });
  if(window.location.href.indexOf("person_info")<0){
    $(".person_info_link").prepend('<a target="_blank" href="http://hr.oa.com/hrportal/SearchResult.aspx?key='+$(".user_level_badge").attr("nick")+'&sort=2">OA资料</a>');
  }
}

if(window.location.href.indexOf("http://bbs.oa.com") > -1){
  var nextUrl = $("a:contains('下一'):last").attr("href");
  if(nextUrl)
  {
    $("body").dblclick(function (){   
      window.location.href = nextUrl;
      return false;
    }); 
  } 
  $("td:nth-child(3)").each(function() {
    $(this).html("<a href='http://km.oa.com/user/" + $(this).text() + "'>" + $(this).text() + "</a>");
  });
}

if(window.location.href.indexOf("person_info")>-1){
  $(".person_info_link > a").text("返回首页");
  $(".person_info_link > a").attr("href", window.location.href.replace("/person_info", ""));
}