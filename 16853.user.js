// ==UserScript==
// @name           redtube video
// @namespace      
// @description    Make the video larger, and remove everything else in page
// @author         nobody
// @version        0.0.1
// @include        http://www.redtube.com/1*
// @include        http://www.redtube.com/2*
// @include        http://www.redtube.com/3*
// @include        http://www.redtube.com/4*
// @include        http://www.redtube.com/5*
// @include        http://www.redtube.com/6*
// @include        http://www.redtube.com/7*
// @include        http://www.redtube.com/8*
// @include        http://www.redtube.com/9*
// @include        http://www.redtube.com/0*

// ==/UserScript==

(function()
{  


  var player = document.getElementById("redtube_flv_player");

  var newBody =
    '<html>' +
    '<head>' +
    '<title>' + document.title + '</title>' +
    '</head>' +
    '<body><center>' + player.innerHTML +
    '</body></center>' +
    '</html>';


  document.body.innerHTML = newBody;

  player = document.getElementsByTagName("embed")[0];

  var h = player.height;
  var w = player.width;

  var r = Math.min(window.innerHeight/h, window.innerWidth/w);

  player.height = h * r;
  player.width  = w * r;



})();
