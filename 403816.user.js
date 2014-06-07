// ==UserScript==
// @name       贴吧 — 只显示楼主 精简界面
// @namespace  http://userscripts.org/users/499502
// @version    0.2
// @description  用于贴吧 【只看楼主】 页面，清理无用部分。
// @match      http://tieba.baidu.com/p/*?see_lz=1
// @copyright  2014+, G yc
// ==/UserScript==


function clearpage() {

    
    //删除分享
    $(".share_btn_wrapper").remove();
    //回复
    $(".core_reply_tail").remove();
    $(".j_lzl_container").remove();
    
    //作者
    $(".d_author").remove();
    
    //右侧
    $(".right_section").remove();
    
}		


$(document).ready(function(){
       
    clearpage();
    
  $(document).scroll(function() {
     clearpage();
  });
});