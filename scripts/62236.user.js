// ==UserScript==
// @name Taobao Dandan
// @description 淘宝蛋蛋是一个专用于淘宝的用来改善体验的一个脚本；暂时只实现一个功能：修复淘宝中的外链。
// @include http://*.taobao.com/*

// ==/UserScript==

/*
* 淘宝蛋蛋
* 顾名思义就是修正淘宝里面那些不合理的“蛋蛋”。
* 实现功能：将淘宝里所有以网址为内容的链接的目标替换成其内容。
* 如：淘宝某商品描述里面的链接 http://www.arduino.cc 初
* 始其目标是当前页面，则替换成:
*    <a href="http://www.arduino.cc">http://www.arduino.cc</a>
* 使其跳转至正确目标。
*
*/
var outer_link_pattern=/^(http:\/\/)?(\w+(-\w+)*)+(\.(\w+(-\w+)*))+/;
var inner_link_pattern=/^http:\/\/item\.taobao.com/;
var html_pattern=/<\/?([\w\s\"#=])+>/g;

function taobao_dandan(){
    fix_outer_link_times_max--;
    if(fix_outer_link_times_max<1){
          window.clearInterval(FLI_ID);
          return;
    }
    var all_links=document.getElementsByTagName("a");
    var temp_str;
    if(all_links){
       for(var i=0;i<all_links.length;i++){
          temp_str=all_links[i].innerHTML.replace(html_pattern,'');
          if(inner_link_pattern.test(temp_str))
             continue;
          if(outer_link_pattern.test(temp_str)){
             if(!/^http/.test(temp_str))
               all_links[i].href="http://"+temp_str;
             else
               all_links[i].href=temp_str;
          }
    }
   }
}
taobao_dandan();
var fix_outer_link_times_max=7;
var FLI_ID=window.setInterval(taobao_dandan,1500);
