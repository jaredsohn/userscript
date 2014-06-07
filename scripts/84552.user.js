// ==UserScript==
// @name      nicovideo down
// @namespace http://looxu.blogspot.com/
// @include   http://flapi.nicovideo.jp/*
// @include   http://www.nicovideo.jp/watch/*
// @author    ArcCosine
// @version   1.3
// ==/UserScript==

(function(){

  if( location.href.indexOf('www.nicovideo') > 0 ){
    var video_id = '';
    if(/watch\/([^/]+)$/.test(location.href)){
      video_id = RegExp.$1;
    }
    var obj = document.createElement('object');
    obj.data = 'http://flapi.nicovideo.jp/api/getflv?v='+video_id;
    obj.style.visibility = 'hidden';
    obj.style.width = '1px';
    obj.style.height= '1px';
    obj.addEventListener('load',function(){ obj.contentWindow.postMessage('dummy','*');  }, false ); //post to client
    //拡張子がuser.jsでも.jsでも動くように
    if( !document.body ){
      document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(obj); }, false );
    }else{
      document.body.appendChild(obj);
    }

    window.addEventListener('message',function(e){
      if(e.origin !== 'http://flapi.nicovideo.jp' ) return;
      var text = e.data;
      if( /url=(.+?)&/.test(text) ){
        var video_title = document.getElementsByClassName('video_title')[0];  //詳細表示時

        var aTag= document.createElement('a');
        aTag.href = decodeURIComponent(RegExp.$1);
        aTag.target = '_blank';
        aTag.style.marginLeft = '5px';
        aTag.appendChild(document.createTextNode('[download]'));

        video_title.parentNode.insertBefore(aTag,video_title.nextSibling);
      }
    },false );

  }else if( location.href.indexOf('flapi') > 0 ){
    window.addEventListener('message', function(e){
      if(e.origin !== 'http://www.nicovideo.jp' ) return;
      var video_id = '';
      if(/v=(.*)/.test(location.search)){
        video_id = RegExp.$1;
      }
      var text = document.body.textContent;
      e.source.postMessage(text,'*'); //post to parent window
    }, false );
  }
})();