// ==UserScript==
// @name          YouTubeUseMplayer
// @description   Make YouTube use mplayer-plugin to play FLV (not for MS Windows)
// @include       http://youtube.com/watch?*
// @include       http://www.youtube.com/watch?*
// ==/UserScript==


  var d = document.getElementById('interactDiv');
  var code = d.innerHTML.toString();
  var index1 = code.indexOf("video_id=")+9;
  var index2 = code.indexOf("movie_player")-3;
  video_id = code.substring(index1,index2);
  flVideo = "http://youtube.com/get_video?video_id="+video_id;

  var embedCode =  '<OBJECT classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width="425" height="350" codebase="http://www.apple.com/qtactivex/qtplugin.cab" type="video/quicktime"><param name="src" value="' + flVideo +'"><param name="autoplay" value="true"><param name="controller" value="true"><param name="loop" value="true"><EMBED src="' + flVideo + '" width="425" height="350" autoplay="true" controller="true" loop="true" pluginspage="http://www.apple.com/quicktime/download/" type="video/quicktime"></EMBED></OBJECT> ';

  var olddiv = document.getElementById('playerDiv');
  var newdiv = document.createElement('div');
  var divIdName = 'mplayerdiv';
  newdiv.setAttribute('id',divIdName);
  newdiv.innerHTML = embedCode;
  d.insertBefore(newdiv,olddiv);

  d.removeChild(olddiv);
