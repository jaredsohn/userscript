// ==UserScript==
// @name           Youtube Pro Enhancement Suite Platinum
// @namespace      http://youtube.com/*
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @include        https://youtube.com/*
// @include        https://www.youtube.com/*

// ==/UserScript==



unsafeWindow.generateCopyBox = function(currentTime = true){
  var oldbox = document.getElementById('copybox');
  if(oldbox != null){
    oldbox.parentNode.removeChild(oldbox);
  }
  var url = 'http://youtu.be/' + /(\?|&)v=([a-z0-9-_]+)/i.exec(location.href)[2];
  if(currentTime){
    var ytplayer = unsafeWindow.document.getElementById("movie_player");  
    var currentTime2 = Math.floor(ytplayer.getCurrentTime());
    url = url + '?t=' + currentTime2;
  }
  var author = document.getElementById('watch7-user-header').getElementsByClassName('yt-user-name')[0].innerHTML;
  var title = document.getElementsByTagName('title')[0].innerHTML;
  var title = title.replace(/ - YouTube$/g,'');
  var title = title.replace(/▶ /g,''); //play icon
  var length = unsafeWindow.ytplayer.config.args.length_seconds;
  var min = Math.floor(length/60);
  var sec = length - min*60;
  if(sec<10) sec = '0'+sec;
  var length = min+':'+sec;
  var result = url + ' ' + title + ' @'+author+' '+length+'&#13;&#10;';
  document.getElementById("watch-uploader-info").innerHTML = 
              '<div id="copybox" style="width:100%; position: relative">'
            + '<textarea onclick="this.select()" style="width:100%;float:left" type="text">'
            + result  
            + "</textarea>"
            + '<div style="position: absolute; right: -165px;">'
            + '<input type="button" value="Current time" onclick="generateCopyBox(true);">'
            + '<input type="button" value="Default" onclick="generateCopyBox(false);">'
            + '<br><input type="button" value="Fix shitty url" onclick="fixShittyUrl();">'
            + '</div></div>'
            + document.getElementById("watch-uploader-info").innerHTML;
};


unsafeWindow.fixShittyUrl = function(){
  var url = location.href;
  url = url.replace(/#t=/g,'&t=');
  location.href = url;
};

unsafeWindow.generateCopyBox(false);