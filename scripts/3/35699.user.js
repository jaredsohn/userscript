// ==UserScript==
// @name           group browsing enhanced
// @namespace      http://npchen.blogspot.com
// @description    在小组话题页面右侧添加“浏览所有小组话题的上一篇话题和下一篇话题”的链接
// @include        http://www.douban.com/group/topic/*
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery 
}

function get_actionlink(id, prefix, title, func){
  var pp = $("<p></p>").attr("id",id).attr("class", "pl2");
  var alink = $("<a href=javascript:{}>"+title+"</a>").click(func);
  pp.append(prefix).append(alink);
  return pp;  
}

var purl = window.location.href;
var pid = get_pid(purl);

function get_pid(url){
   ta = url.match(/\d+/);
   return parseInt(ta[0]);
}

function get_goto(id){
   return function(){
     window.location.href="http://www.douban.com/group/topic/"+id+"/";
   }
}

function is_deadpage(){
   return $("h3").length==1
}

$(document).ready(function(){
 var prelink = get_actionlink("prelink","> ","所有小组话题中的上一篇",get_goto(pid-1));
 var nextlink= get_actionlink("nextlink","> ","所有小组话题中的下一篇",get_goto(pid+1));
   
 if (is_deadpage())
   $("div.indent").append(prelink).append(nextlink);
 else 
  $("div#tablerm").prepend(nextlink).prepend(prelink);

})