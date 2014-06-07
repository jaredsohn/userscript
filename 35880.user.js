// ==UserScript==
// @name           douban_board_reply
// @namespace      http://npchen.blogspot.com
// @description    豆瓣留言板功能增强，(v2.5.1)
// @include        http://www.douban.com/mine/board*
// @include        http://www.douban.com/people/*/board*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        2.5.1
/* @reason
   v2.5.1  自带jquery，解决豆瓣页面jquery定义失踪带来的问题。           
   @end*/
// ==/UserScript==

var thisScript = {
   name: "留言板增强",
   id: "35880",
   version:"2.5.1"
}

var updater = new Updater(thisScript);
updater.check();   

var $ = jQuery 

var url = window.location.href;
var diff = url.substring(22,26);
var ismine = (diff == 'mine');
var sav_bp;

function get_bp(){
   var p = $("div#user a:first").attr("href"); 
   var form = $('<form method="post" name="bpform"/>').attr("action",p);
   var div = $('<div align="center"/>');
   var ta = $('<textarea style="width: 260px;" rows="5" name="bp_text"/>');
   var input = $('<input type="submit" value=" 留言 " class="butt" name="bp_submit"/>');
   div.append(ta).append($("<br/>")).append(input).append($("<br/>"));
   form.append(div);
   return form;
}

function check_empty(){
   var t = $("#tablerm").html().replace(/(\s)+/,"");
   return t=="";
}

function change_bp(peo) {
    var form = $("div#tablerm form")
    //alert(peo.url);
    form.attr("action",peo.url+'board');
    form.find("input:visible").val("回复到"+peo.name+"的留言板");
    window.scrollTo(0, 0); 
    form.find("textarea").select();
    form.find("p").html("点击回复原状").click(function(){restore_bp();});
 }
 
 function restore_bp(){
    $("div#tablerm").html(sav_bp);
    var form = $("div#tablerm form");
    form.find("input:visible").val("回复到自己的留言板");
 }

 function get_people(item){
    var n = item.find("a:first").html();
    var p = item.find("a:first").attr("href");
    return {name: n, url: p};
 }
 
 
$(document).ready(function(){
   sav_bp = $("div#tablerm").html();
   
   //现在可以借用好友的留言板回应第三个好友....   
   var items = $("div#in_tablem div.indent li.mbtrdot");
   $.each(items, function(){
         var link = $("<a href='javascript:{}'>直接回应到对方留言板</a>");
         var people = get_people($(this));
         link.click(function(){change_bp(people);});
         
         var gact = $(this).find("span.gact");
         if (gact.find("a").length==0){
            gact = $('<span class="gact"/>');
            gact.append(link);
            $(this).append($('<br/>')).append($('<br/>')).append(gact);
         }
         else if (gact.find("a").length==2){  
           gact.html(gact.html()+"&nbsp; &nbsp;");
           gact.append(link);
         }
   })
   
   
   var heads = $("div#in_tablem div.indent li.mbtl");
   $.each(heads, function(){
      var aa = $(this).find("a");
      aa.attr("href", aa.attr("href")+"board");
   });
  
})
