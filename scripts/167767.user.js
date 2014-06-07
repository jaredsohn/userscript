// ==UserScript==
// @name        Hide_locked_posts
// @namespace   Hide_locked_posts
// @description Hide locked posts in forum based on Discuz
// @include     *.kafan.cn/forum-*
// @include     *.sanfans.com/forum-*
// @version     1.2
// @grant       none
// @icon http://a.ikafan.com/5/000/53/99/15_avatar_small.jpg
// @author      loms126
// ==/UserScript==

// JavaScript Document
function filterLockedPost()
{
	var enable=localStorage["filter_checkbox_enabled"]
	images=document.images;
    for (i in images)
    {
         if(images[i].src && images[i].src.match("static/image/common/folder_lock.gif"))
              images[i].parentNode.parentNode.parentNode.parentNode.style.display=(enable=="1")?"none":""
    }
}


var filter_Node=document.getElementById("filter_dateline").parentNode

var pipe=document.createElement("span");
pipe.innerHTML="<span class=\"pipe\">|  |</span>"
filter_Node.insertBefore(pipe,null)

var filter_checkbox=document.createElement('label');
filter_checkbox.innerHTML="<input type=\"checkbox\" id=\"filter_checkbox\" class=\"pc\" value=\"1\">过滤锁定帖"
filter_Node.insertBefore(filter_checkbox,null)

document.getElementById("filter_checkbox").onclick = function(){
       if (this.checked ) {
          localStorage["filter_checkbox_enabled"] = "1"
		  filterLockedPost()
       } else {
           localStorage["filter_checkbox_enabled"] = "0"
		   filterLockedPost()
       }
	   }
if (localStorage["filter_checkbox_enabled"] == true)
{	
	filterLockedPost()
	document.getElementById("filter_checkbox").checked=true
}
else
	document.getElementById("filter_checkbox").checked=false
	   

	