// ==UserScript==
// @name           Music Reaper
// @namespace      download
// @description    Downloads songs from Google music
// @include        http://music.google.com/music/listen*
// ==/UserScript==

function downloadSong()
{
  //I noticed something in the page code that may make this much easier, someday.
  var songid=document.getElementsByClassName("selectedSong")[0].id.substr(6);
  var url="http://music.google.com/music/play?songid="+songid; //pt=e is another argument, not sure what it does
  var x=new XMLHttpRequest();
  x.open("GET",url,false);
  x.send();
  var u=JSON.parse(x.responseText).url;
  window.open(u,"_blank");
}


addEventListener("load",function()
{
  var menuItem=null;
  var c=document.getElementsByClassName("goog-menuitem-content");
  for(var i=0;i<c.length;i++)
  {
    if(c[i].textContent.indexOf("Play song")!=-1)
    {
      menuItem=c[i].parentNode.nextSibling;
    }
  }
  if(!menuItem)
  {
    //The menu hasn't been built yet. Let's try again
    setTimeout(init,100);
  }
  var a=document.createElement("div");
  a.className="goog-menuitem goog-submenu";
  a.setAttribute("role","menuitem");
  a.setAttribute("aria-haspopup","true");
  var c=document.createElement("div");
  c.className="goog-menuitem-content";
  c.textContent="Download song";
  a.appendChild(c);
  menuItem.parentNode.insertBefore(a,menuItem);
  a.addEventListener("click",downloadSong,false);
  a.addEventListener("mouseover",function()
  {
    this.classList.add("goog-menuitem-highlight");
  },false);
  a.addEventListener("mouseout",function()
  {
    this.classList.remove("goog-menuitem-highlight");
  },false);
  setTimeout(toggleDisplay,1000);
},false);