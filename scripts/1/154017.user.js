// ==UserScript==
// @name       moegirlwiki.ui.uploadfix
// @namespace  http://wiki.moegirl.org/
// @version    0.31
// @description  enter something useful
// @match      http://wiki.moegirl.org/Special:%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6
// @copyright  2012, XpAhH
// ==/UserScript==
///*Fix Tampermonkey
if(typeof $!="function")$=parent.$;//*/
//脚本正式开始
//$("head").append($("<style id=myStyle>").html(""));
Array.prototype.intersects=function(){if(!arguments.length)return false;var array2=arguments[0];var len1=this.length;var len2=array2.length;if(len2==0)return false;for(var i=0;i<len1;i++){for(var j=0;j<len2;j++){if(this[i]===array2[j])return true}};return false};
$("#mw-upload-form").submit(function(){
  if(wgUserGroups.intersects(["sysop","patroller"])||window.disableUpCheck==1)return!0;
  var o=$($("input[name=wpSourceType]:checked").val()=="url"?"#wpUploadFileURL":"#wpUploadFile"),t="";
  o.each(function(i,a){t+=$(a).val()});
  if(!t){
    o.eq(0).focus();
    //彩蛋
    $.extend($.easing,{easeOutCirc: function (x, t, b, c, d) {return c * Math.sqrt(1 - (t=t/d-1)*t) + b;}})
    var c=$("body");
    for(var i=0;i<20;i++)
      c.append($("<div>").text("萌").css({color:"#3FFC2E","font-size":54+30*Math.random(),position:"fixed",left:screen.availWidth*Math.random(),top:screen.availHeight*Math.random()})
        .animate({opacity: 0.2,"font-size":54+80*Math.random(),left:screen.availWidth*Math.random(),top:-100-Math.random()*300},2000,"easeOutCirc",function(){this.remove()}))
     return!1;
  }
  //三选一&符号
  t="";
  (o=$("#wpNickName,#wpAuthor,#wpSrcUrl")).each(function(i,a){t+=$(a).val()});
  o.each(function(i,a){t+=$(a).val()});
  if(!t){
    o.eq(0).focus();
    o.css({"box-shadow":"0 0 8px red",border:"red solid 1px",padding:"2px 1px"});
    $("#errmsg")[0] || $("#mw-htmlform-description>tbody").prepend($('<tr id=errtr><td></td><td class="mw-input"><div class="mw-editTools"><div id=errmsg class="anonnotice common-box"></div><p><br></p></div></td></tr>'));
    $("#errmsg")
      .html($("<font color=red>")
        .text(t?"＞_＜ 【人物名，作者名，来源】不能包含特殊符号~!请不要写多余的内容 [·~。（）()!@#$%^&*]":"＞_＜ 【人物名，作者名，来源地址】不能全部为空~!"));
    o.one("focus",function(){
      o.attr("style","");
      $("#errmsg").hide(300,function(){$("#errtr").remove()});
    });
    return!1;
  }
});