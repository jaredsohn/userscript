// ==UserScript== 
// @name 页码直达 
// @namespace http://www.douban.com/people/3928484/ 
// @description 我的发言、我的回复、小组页面超过一页的帖子可直接进入指定页 。 
// @include www.douban.com/group/*
// @author matt
// @version --
// ==/UserScript== 

genShortLinks(); 
function genShortLinks(){ 
if (location.href.match(/http:\/\/www.douban.com\/group\//) == null) { 
return; 
} 

var param = parseInt($('.olt tr:first').find('td').length); 

if (param < 0) 
return; 

$('.olt tr:gt(0)').hover(function(){ 
var topic = $(this).find('td a:eq(0)').attr("href"); 
if (topic == null) 
return; 
var num = parseInt(((parseInt($(this).find('td:eq(' + (param - 2) + ')').html()) - 1) / 100)); 
if (isNaN(num) || num == 0) 
return; 
var lastPageLink; 
if (num >= 1) { 
lastPageLink = "<input id = \"pageturn\" type=\"text\" size = \"4\" ><a id=\"lastLink\" style = \"color:red\" href=\"" + 
topic + 
"?start=" + 
(num * 100) + 
"\">最后页</a>"; 
} 
$(this).find('a:first').after(lastPageLink); 
$(this).find('#pageturn').keydown(function(){ 
if (event.keyCode == 13) { 
window.location.href = (topic + "?start=" + Math.abs((parseInt($(this).attr('value')) - 1) * 100)); 

} 
}); 
}, function(){ 
$(this).find('#pageturn,#lastLink').remove(); 
}); 
}