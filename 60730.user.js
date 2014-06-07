// ==UserScript==
// @name           Video post enhancer
// @namespace      http://dirty.ru/
// @include        http://dirty.ru/comments/*
// @include        http://dirty.ru/votes/*
// @include        http://wwww.dirty.ru/comments/*
// @include        http://wwww.dirty.ru/votes/*
// ==/UserScript==

function set_video_size(width, height)
{
  var embed = document.getElementsByTagName("embed")[0];
  embed.width = width;
  embed.height = height;
}

var embedObjects = document.getElementsByTagName("embed");
if ( embedObjects.length > 0 && embedObjects[0].id == 't' ) 
  return;//Ахтунг, аудио-пост!

if ( embedObjects.length > 0 ) 
{
  var links = '<sup>Размер&nbsp;видео: <a href="#" onclick="set_video_size(425, 350)"">обычный</a>, <a href="#" onclick="set_video_size(640, 480)">побольше</a>, <a href="#" onclick="set_video_size(800, 600)">большой</a>.</sup>'
  
  var linkAndScriptContainer = embedObjects.length > 0 ? embedObjects[0].parentNode.parentNode : null;
  
  var video_links_container = document.createElement('div');
  linkAndScriptContainer.appendChild(video_links_container);
  video_links_container.id = 'video_links_container';
  video_links_container.innerHTML = links;
 
  var script = document.createElement('script');
  video_links_container.appendChild(script);
  script.innerHTML = set_video_size.toString();
}
