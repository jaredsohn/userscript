// ==UserScript==
// @name        Akteninfo°
// @namespace   PaveLow/Happy
// @include     *cp.rpg-city.de*
// @include     *rpg-city.de/*
// @version     1
// ==/UserScript==
var name = "";

if(document.URL.search(/.*rpg-city.de.*page=Thread.*/) != -1)
{
 var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[2].innerHTML;
 if(forum == "Bewerbungen für das Team")
 {
   id = unsafeWindow.threadID;
   var post = document.getElementsByClassName("messageBody")[0];
   var li = document.createElement("li");
   li.innerHTML = "<a><img src='http://www.rpg-city.de/wcf/icon/nextS.png'> <span>Bewerbungsinfo</span></a>";
   li.addEventListener("click", bewerbungsInfo);
   var li2 = document.createElement("li");
   li2.innerHTML = "<a><img src='http://cp.rpg-city.de/img/Akte.png'> <span>Userakte</span></a>";
   li2.addEventListener("click", userAkte);
   post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
   document.getElementById("postButtons"+RegExp.$1).appendChild(li2);
   document.getElementById("postButtons"+RegExp.$1).appendChild(li);
   name = document.getElementsByClassName("userName")[0].getElementsByTagName("span")[0].innerHTML;
 }
}
else if(document.URL.search(/.*rpg-city.de.*page=User.*/) != -1)
{	
   var ul = document.createElement("li");
   var ul2 = document.createElement("li");
   ul2.innerHTML = "<a><img src='http://www10.pic-upload.de/19.02.13/rmcq3zqc2iv3.gif'> <span>Userakte aufrufen</span></a>";
   ul.innerHTML = "<a><img src='http://www.rpg-city.de/wcf/icon/nextM.png'> <span>Userakte einsehen</span></a>";
   ul.addEventListener("click", bewerbungsInfo);
   ul2.addEventListener("click", userAkte);
   document.getElementsByClassName("smallButtons userCardOptions")[0].appendChild(ul);
   document.getElementsByClassName("smallButtons userCardOptions")[0].appendChild(ul2);
   name = document.getElementsByClassName("userName")[0].getElementsByTagName("span")[0].innerHTML;
}
else if(document.URL.search(/name=(.*)&binfo$/) != -1)
{
  var name = RegExp.$1;
  document.getElementsByTagName("a")[2].href.search(/ticket=(.*)$/);
  var ticket = RegExp.$1;
  location.href = "http://cp.rpg-city.de/?funktion=_user_akte&user="+name+"&ticket="+ticket+"&binfo";
}
else if(document.URL.search(/name=(.*)&userakte$/) != -1)
{
  var name = RegExp.$1;
  document.getElementsByTagName("a")[2].href.search(/ticket=(.*)$/);
  var ticket = RegExp.$1;
  location.href = "http://cp.rpg-city.de/?funktion=_user_akte&user="+name+"&ticket="+ticket+"";
}
else if(document.URL.search(/user_akte.*&binfo$/) != -1)
{
  var entry;
  var entries = {};
  var noob = 0;
  
  for(var i=0;i<document.getElementsByTagName("p").length;i++)
  {
    entry = document.getElementsByTagName("p")[i].innerHTML.split("\n")[2];
    entry.search(/\[([^\]]*)\]/);
    if(typeof entries[RegExp.$1] == "undefined")
    {
      entries[RegExp.$1] = 0;
    }
    entries[RegExp.$1]++;
	noob++;
  }
  
  for(e in entries)
  {
    if(e == "UnPrison")
    {
      entries["Prison"] -= entries[e];
      delete entries[e];
    }
    if(e == "UnSupban")
    {
      entries["Supban"] -= entries[e];
      delete entries[e];
    }
    if(e == "UnMute")
    {
      entries["Mute"] -= entries[e];
      delete entries[e];
    }
  }
  
  var result = "Einträge: "+noob+"\n";
  for(e in entries)
  {
    result += "\n"+e+": "+entries[e];
  }
  alert(result);
}

function bewerbungsInfo()
{
  var iframe = document.createElement("iframe");
  iframe.src = "http://cp.rpg-city.de/?name="+name+"&binfo";
  iframe.setAttribute("style", "display:none;");
  document.body.appendChild(iframe);
}

function userAkte()
{
	var link = "http://cp.rpg-city.de/?name="+name+"&userakte"
	window.open(link,'_newtab');
}