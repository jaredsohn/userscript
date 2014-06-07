// ==UserScript==
// @name       OKDYYT
// @namespace  http://jingyan.baidu.com/user/npublic?un=%E5%88%98%E7%84%95%E5%BA%AD1989
// @version    0.1
// @description  OneKeyDownYinYueTai
// @match      http://v.yinyuetai.com/*
// @copyright  2014-2-3 Jasper
// ==/UserScript==
$("<script type='text/javascript'>function down_1(){ var loc=window.location.href.toLowerCase();window.location.href=loc.replace('yinyuetai','yinyuetaixia');  }function down_newpage(){ var loc=window.location.href.toLowerCase();loc=loc.replace('yinyuetai','yinyuetaixia');window.open(loc,'parent')}</script>").appendTo("head");
$("<input type='button'   style='height:40px;width:100px;background-color:red' onclick='down_1()'  value='下载' id='down_200'/><br/><br/><br/>").appendTo(".topbar");
$("<input type='button'   style='height:40px;width:100px;background-color:red' onclick='down_newpage()' value='下载（新开页面）' id='down_201'/><br/> <span style='background-color:Yellow;'>voilent.22@163.com</spa>").appendTo(".topbar");