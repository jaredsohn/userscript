// ==UserScript==
// @name			坟贴提醒
// @version			0.3
// @namespace		NoticeOfOutdate
// @include			http://tieba.baidu.com/*
// @include			http://tieba.baidu.com.cn/*
// @author			MicroAleX
// @date			2012/10/17
// ==/UserScript==
/*
  更新历史：
  Ver 0.1
    * 第一个版本
  Ver 0.2
    * 由弹窗式提醒改为在帖子醒目位置显示提示，减少打扰
  Ver 0.3
    * 针对百度贴吧最新改动进行调整
*/
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }
 
  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
 
  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

var $NOO_EXP_DAY = 90;

contentEval('if(typeof(commonPageData) != "undefined"){var $NOO_data;eval("$NOO_data="+$("div.l_post").attr("data-field"));if($NOO_data.content.floor==1 && parseInt((new Date().getTime()-new Date($NOO_data.content.date.replace(/-/g,"/")).getTime())/(1000*60*60*24))>'+$NOO_EXP_DAY+')$("div.l_thread_info").append("<b><font size=+3 color=red><br/><br/>这可能是一个坟贴，请自行鉴别！</font></b>");}');
