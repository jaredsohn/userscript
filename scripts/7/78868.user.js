// ==UserScript==
// @name           GTFO Twitter "Flags"
// @namespace      GTFOTF
// @description    Removes Twitter's latest idiocy, which is akin to graphical smileys
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
/*
function gtfo()
{
  var timeline = document.getElementById('timeline');
  timeline.addEventListener('DOMSubtreeModified',{'handleEvent':function(ev) {
      var content = timeline.getElementsByClassName('entry-content');
      for (c in content) {
        var co = content[c];
        if (co.style)
          co.style.display = 'none';
      }
      // currentTarget
      // srcElement
      }},false);
}
gtfo();
*/

function gtfohf(){
  document.documentElement.addEventListener('DOMSubtreeModified',{'handleEvent':function(ev) {
      var content = ev.currentTarget.getElementsByClassName('hashflag');
      for (c in content) {
        var co = content[c];
        if (co.style)
          co.style.display = 'none';
      }
      // currentTarget
      // srcElement
      }},false);
}
gtfohf();
