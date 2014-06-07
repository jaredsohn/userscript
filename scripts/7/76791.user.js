// ==UserScript==
// @name           add a link when talkbacks are related each other
// @namespace      shmulik.zekar.co.cc/vgames
// @include        http://www.vgames.co.il/article/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs [ask by email for change it]
// ==/UserScript==


var list = unsafeWindow.document.getElementById("comments").childNodes[1].childNodes;
var from = Array(/ל\-?(\d+)/gm,/אל (\d+)/gm,/^(\d+)/,/@(\d+)/gm);
for (var i=1;i<list.length;i+=2)
{
  var curP = list[i].childNodes[5];
  for (var j=0;j<from.length;j++)
    curP.innerHTML = curP.innerHTML.replace(from[j],getId);
}

function getId(a,n)
{
  if (n>list.length)return a;
  //return "<a href=#"+list[parseInt(n)*2-1].id+" title='"+list[parseInt(n)*2-1].childNodes[5].innerHTML.replace(/<br>/gm,"\n").replace(/<(.*?)\/>/gm,'')+"'>"+a+"</a>";
  return "<a href=#"+list[parseInt(n)*2-1].id+" title='קפוץ לתגובה מספר "+n+"'>"+a+"</a>";
}