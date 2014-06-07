// ==UserScript==
// @name           tumblrShare
// @namespace      //
// @include        http://*.deviantart.com/art/*
// ==/UserScript==

function tumblButton()
{
var button = document.createElement("div");
button.innerHTML = '<a href="http://www.tumblr.com/share" title="Share on Tumblr" style=\'display:inline-block; text-indent:36px; overflow:visible; width:20px; height:20px; background:url("http://platform.tumblr.com/v1/share_4.png") top left no-repeat transparent;\'>Tumblr</a>';

var allDivs = document.getElementsByTagName("div");

for(var i = 0; i < allDivs.length; i++)
{
  if(allDivs[i].className == "social ll")
    {
      var parent = allDivs[i];
      parent.appendChild(button);
      i = allDivs.length;
    }
}
}

tumblButton();