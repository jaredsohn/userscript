// ==UserScript==
// @name           sus-links-js2normal
// @description    fix the JavaScript links in StartUpSeeds to normal links, so you can use open them easily in new tab.
// @author         Shmulik - sking.me@gmail.com
// @namespace      http://shmulik.zekar.co.cc
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @include        http://www.startupseeds.com/Forums/*
// ==/UserScript==




links = unsafeWindow.document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++)
{
      thislink = links[i];
      if (thislink.onclick != undefined)
      {
        var s = String(thislink.onclick);
        if (s.indexOf("OpenWindowOnNew")!=-1)
        {
          var from = s.indexOf("\"")+1;
          var to = s.indexOf("\"",from);
          thislink.href = decode(s.substr(from,to-from));
          thislink.onclick = undefined;
        }
      }
}

function decode(str)
{
  return eval('"'+str+'"');
}