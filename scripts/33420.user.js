// ==UserScript==
// @name           douban_group_compare
// @namespace      http://npchen.blogspot.com
// @description    在用户的小组页面高亮共同参加的兴趣小组(v1.3.1)
// @include        http://www.douban.com/people/*/groups
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer (http://www.douban.com/people/NullPointer)
// @version        1.3.1
/* @reason 
   1.3.1 修正可能会导致sliding navbar频繁更新的bug.
   @end*/
// ==/UserScript==

var thisScript = {
   name: "共同兴趣小组",
   id: "33420",
   version: "1.3.1"
};
var updater = new Updater(thisScript); 
updater.check();

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

var hisgroups;

$(document).ready(function(){
    hisgroups = $("div#in_tablem dl.ob dt a");
  
    var markon = get_actionlink('on','>','高亮我也参加的小组', highlight);
    var markoff = get_actionlink('off','>', 'Loading中，请稍候· · · ', unhighlight);
    
    var hider = get_actionlink('hide','>','隐藏未高亮的小组', hideUNHL);
    var shower = get_actionlink('show','>', '显示全部小组', showall);
    
    markon.show(); markoff.hide(); hider.hide(); shower.hide();
    
    $("div#tablerm").append($('<p/>')).append(markon).append(markoff)
     .append(hider).append(shower);
}); 

function iswhite(a){
  return a.parent().css("background-color")=="rgb(255, 255, 255)";
}

function hideUNHL(){
  hisgroups.filter(function(){
        return iswhite($(this))
  }).parent().parent().hide();
  $("p#hide").hide(); $("p#show").show();
}

function showall(){
   hisgroups.parent().parent().show(); 
   $("p#show").hide(); $("p#hide").show();
}

function unhighlight(){
    $("#on").toggle(); $("#off").toggle();
    $.each(hisgroups, function(){
        $(this).parent().css("background","white");
    });
}

function highlight(){ 
    $("#on").toggle(); $("#off").toggle();
    var mgurl = "http://www.douban.com/group/mine #in_tablem";
    $("<div id='mygroups'/>").load(mgurl,function(){
      var mygroups = $("#mygroups dl.ob dd a");
      var myurls = new Array(mygroups.length);
      var i=0;          
      var j=0;
      $.each(mygroups, function(){myurls[i++]=$(this).attr("href");});
      
      $.each(hisgroups, function(){
         var u = $(this).attr("href");
         if ($.inArray(u, myurls)!=-1) {
           $(this).parent().css("background","DarkSeaGreen");  
           j++;
         }
         else {
           $(this).parent().css("background","white");
         }
        });           
      var hstr = "有"+j+"个共同兴趣小组（点击取消高亮）" ;   
      var hh = get_actionlink('off', '>', hstr, unhighlight);      
      $("#off").html(hh.html()); $("#off").click(unhighlight);
      
      if (j>0) $('#hide').show();
      
      $("body").remove("#mygroups");
    }).appendTo("body").hide(); 
    
}





    