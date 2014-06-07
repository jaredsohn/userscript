// ==UserScript==
// @name           YouTube Subscription Center Delete
// @namespace      youtube_subcenter_delete
// @description    Allows removel of videos from subscription center...
// @include        http://www.youtube.com/my_subscriptions*
// ==/UserScript==
var console = unsafeWindow.console;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle([
  '.removeVideo {',
  'position:absolute;',
  'top:-3px;',
  'right:-3px;',
  'cursor:pointer;',
  'border:1px solid transparent;',
  'padding:0 2px;',
  ' }',
  '.removeVideo:hover {',
  'border-color:#ccc;',
  '}',
  '.video{',
  'position:relative;',
  '}',
  '.hiddenIframe{',
  'position:absolute;',
  'left:-9999px;',
  '}'
].join(''));

var videoContainers = document.getElementsByClassName('video');
if(!videoContainers)return false;
var deleteVid = function(video){
  video.parentNode.removeChild(video);
  var img = video.getElementsByTagName('img');
  var url;
  if(img){
    img = img[0];
    var src = img.src;
    var match = src.match(/.*vi\/([^/]*)/);
    if(match){
      url = match[1];
    }
  }
  if(url){
    hiddenWatch(url);
  }
};
var hiddenWatch = function(url){
  // This removes the video from your subscription center list
  var iframe = document.body.appendChild(document.createElement('iframe'));
  iframe.addEventListener('load',
    function(){
      setTimeout(function(){
          iframe.parentNode.removeChild(iframe);
      }, 2000);
  }, false);
  iframe.className = 'hiddenIframe';
  //iframe.src = '/watch?v='+url+"&fmt=22#t=1000m";
  iframe.src = '/watch?v='+url+"&fmt=22";
  return true;
};
for(var v in videoContainers){
  v = videoContainers[v];
  var x = v.appendChild(document.createElement('span'));
  x.className = 'removeVideo';
  x.addEventListener('click',
    (function(video){
      return function(){
        deleteVid(video);
      }
  })(v), false);
  x.innerHTML = 'X';
}
