// ==UserScript==
// @name           weibo
// @version        0.0.1
// @author         Howl Wong
// @namespace      weibo
// ==/UserScript==

/**** 隐藏对象 ****/
function hide(el){
  el.style.display='none';
}

/**** 找对象 ****/
function find(id){
  return document.getElementById(id);
}

/**** 找到对象，并隐藏 ****/
function hide_by(id){
  hide(find(id));
}

/**** 执行 ****/
function process(els){
  for(var i=0;i<els.length;i++){
    filter(els[i])
  }
}

/**** 过滤 ****/
function filter(el){
  if (el.getAttribute('action-type') === 'whisper' || el.getAttribute('action-type') === 'attention' || el.className == 'declist') { 
    hide(el) 
  }
}

/**** 隐藏 广告 ****/
hide_by('pl_content_pullylist');
hide_by('ads_35');
hide_by('ads_bottom_1');

/**** 隐藏 写心情 ****/
hide_by('pl_content_mood');

/**** 隐藏 消消关注、相互关注 ****/
var lis = find('pl_content_homeFeed').getElementsByTagName('li');
process(lis)

/**** 隐藏 勋章 ****/
var divs = find('pl_leftNav_common').getElementsByTagName('div');
process(divs)