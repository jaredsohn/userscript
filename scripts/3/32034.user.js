// ==UserScript==
// @name           quick_delete
// @namespace      http://npchen.blogspot.com
// @description    小组管理员反爆组和广告使用(v1.8)
// @include        http://www.douban.com/group/*/
// @include        http://www.douban.com/group/*/discussion?start=*
// @exclude        http://www.douban.com/group/topic/*
// @author         NullPointer
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// @require  http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version  1.8
/* @reason
   v1.8 修复在豆瓣页面改版后失效的现象。
        脚本重新正常工作
@end*/
// ==/UserScript==

var thisScript = {
   name: "快捷删除和封禁",
   id: "32034",
   version:"1.8"
}

var updater = new Updater(thisScript);
updater.check();   

var $ = jQuery 

function del(item){ 
   var itemurl = item.find("a").attr("href");
   var delurl = itemurl+"admin_remove";
   $.get(delurl+"?ck="+ck);
   $.post(delurl, {reason: "1", other: "" , ck: ck},
            function(data){process(data);}, "xml");
   item.parent('tr').hide();
}

function block(people){
  var uurl= people.find('a').attr("href");
  var uid = uurl.substring(8, uurl.length-1);
  var blockurl = groupurl+"/members?ban="+uid+"&ck="+ck;
  $.get(blockurl); 
  alert("User "+uid+" blocked !");
}

function get_id(u){
  var re = u.match(/com\/group\/.+(?=\/)/);
  return re[0].substring(10);
}

var url = window.location.href;
var groupurl = "http://www.douban.com/group/"+get_id(url);
var fun_state = false;
var ck = "";

$(document).ready(function(){
    var post1 = $('div table.olt tbody tr:eq(1) td:first a').attr('href');
    
    $("<div id='tempck'/>").load(post1+' #content', function(){
      
      var cmds = $('#tempck table.wr tbody tr td:eq(1) div.pl span.gtleft');
      
      if (cmds.length > 1) {
  
          $.each(cmds, function(){
             var t = $(this).find('a').text();
             if (t.match('> 删除')) {
                var link = $(this).find('a').attr('href');
                var index = link.search(/ck=.+$/);
                ck = link.substring(index+3);
             };
          });

          var markon = $("<div id='on'></div>").html("快捷删除和封禁 ON: 点击作者栏空白处封禁；点击标题栏空白处删除")
          .hide().click(function(){
             fun_state=false; markon.hide(); markoff.show();
          });
        
          var markoff = $("<div id='off'></div>").html("快捷删除和封禁 OFF")
           .show().click(function(){
             if (confirm("要打开危险的快捷删除和快捷封禁功能吗？")) {
              fun_state=true; markon.show(); markoff.hide();
             }
           });

          var title = $("#content").find("h2:first"); 
          if (title.html()==null) title = $('h1');
          title.append(markon).append(markoff); 
       
          $("div table.olt tbody tr:not(:first)").find("td:first").click(function(){
              if (fun_state) del($(this));
          });
       
          $("div table.olt tbody tr:not(:first)").find("td:eq(1)").click(function(){
              if (fun_state) block($(this));
          });
            
      }
      $("div#tempck").empty();
    }).appendTo("body").hide();
  
});
 
 
