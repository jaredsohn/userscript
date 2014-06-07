// ==UserScript==
// @name           DLButtonForMixiMovie
// @namespace      http://mixi.jp
// @discription    Make a Download button for mixi movie.
// @include        http://video.mixi.jp/*
// ==/UserScript==
//
// !! LICENSE !!
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
// ver 0.1 @ 2010-04-20
//  Release!

(function(){

  var insertAfter = function (newNode, node) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  };

  var getURL = function()
  {
    var script;
    var scripts = document.getElementsByTagName('SCRIPT');
    for (var i = 0; i < scripts.length; i++)
    {
      if ((script = scripts[i].text.match(/player\.push[\s\S]*\}\)\;/)) != null)
      {
        return String(script).match(/http.*\.flv/);
      }
    }
  };
  
  var makeDLButton = function(url)
  {
    if (!url)
    {
      return null;
    }
    
    var a       = document.createElement("a");
    a.href      = url;
    a.innerHTML = "Download";
    
    var div = document.createElement("div");
    div.id  = "GM_download";
    
    div.appendChild(a);
    
    insertAfter(div, document.getElementById("player"));
  };
  
  makeDLButton(getURL());
  
})();