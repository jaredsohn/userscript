// ==UserScript==
// @name           Tom's FlashControl
// @namespace      http://tomboshoven.nl/
// @description    Adds a control panel to every flash you see!
// @include        *
// ==/UserScript==

/*
 This script adds a menu to every Flash you see. This menu includes these buttons:

  - Play
  - Stop
  - Rewind
  - Next frame
  - Previous frame
  - Go to a frame
  - Link to the flash
  - Hide Flash
  - Show Flash
  - Zoom in
  - Zoom out


 Credits for the script:

    - http://userscripts.org/scripts/show/2004
       Jasper de Vries for the idea and some positioning trick
       Plus of course his handy script ^_^
    - Various resources for basic JavaScript and Flash API functions. (this is my first script after all)
    - Me for the script ._.
    - And of course GreaseMonkey for being such a great tool :D
*/

var embeds=document.getElementsByTagName("embed");

function findPos(obj)
{
 var curleft = curtop = 0;
 if (obj.offsetParent) {
  curleft = obj.offsetLeft
  curtop = obj.offsetTop
  while (obj = obj.offsetParent) {
   curleft += obj.offsetLeft
   curtop += obj.offsetTop
  }
 }
 return [curleft,curtop];
}

for(var i=0;i<embeds.length;i++)
{
 if(embeds[i].type=="application/x-shockwave-flash"){

  var par=embeds[i].parentNode;
  if(par.tagName=="OBJECT")
   embeds[i].parentNode.parentNode.replaceChild(embeds[i], embeds[i].parentNode);

  if(embeds[i].id){
   embeds[i].id="video"+i;
   var id="video"+id;
  }
  else{
   var id=embeds[i].id;
  }

  //Following line may help if it doesnt work, no effect seen so not included
  //embeds[i].setAttribute("swLiveConnect", "true");
  //Have to find a workaround for this: flash not responding to keyboard input
  //embeds[i].setAttribute("wmode", "opaque");
  
  //Menu
  var menu=document.createElement('div');
  menu.style.backgroundColor="#f00";
  menu.style.border="2px solid #fff";

  width=embeds[i].width;
  if (width<290) width=290;

  menu.style.width=width+"px";
  menu.style.height="20px";
  menu.style.textAlign="center";
  menu.style.position="absolute";
  menu.style.zIndex="1000";

  var pos = findPos(embeds[i]);

  menu.style.left=pos[0]+'px';
  if(pos[1]-24<0)
   pos[1]=24;
  menu.style.top=pos[1]-24+'px';
  menu.id="menu"+i
  menu.style.display="none";
  menu.style.opacity="0.8";

  //Exclamation mark div
  var div = document.createElement('div');
  var displaylink=document.createElement('a');
  displaylink.href="javascript: if(document.getElementById('menu"+i+"').style.display=='block') void(document.getElementById('menu"+i+"').style.display='none'); else void(document.getElementById('menu"+i+"').style.display='block')";

  displaylink.style.textDecoration="none";
  displaylink.style.color="#fff";
  displaylink.style.fontWeight="bold";

  // Close menu link
  var closelink=document.createElement('a');
  closelink.href="javascript: void(document.getElementById('menu"+i+"').style.display='none');";

  closelink.style.textDecoration="none";
  closelink.style.color="#fff";
  closelink.style.fontWeight="bold";
  closelink.appendChild(document.createTextNode(" X "));

  //Hide Flash link
  var hidelink=document.createElement('a');
  hidelink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].style.display='none');";

  hidelink.style.textDecoration="none";
  hidelink.style.color="#fff";
  hidelink.style.fontWeight="bold";
  hidelink.appendChild(document.createTextNode(" Hide "));

  //Show Flash link
  var showlink=document.createElement('a');
  showlink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].style.display='block');";

  showlink.style.textDecoration="none";
  showlink.style.color="#fff";
  showlink.style.fontWeight="bold";
  showlink.appendChild(document.createTextNode(" Show "));

  //Play link
  var playlink=document.createElement('a');
  playlink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].Play())";

  playlink.style.textDecoration="none";
  playlink.style.color="#fff";
  playlink.style.fontWeight="bold";
  playlink.appendChild(document.createTextNode(" Play "));

  //Stop link
  var stoplink=document.createElement('a');
  stoplink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].StopPlay())";

  stoplink.style.textDecoration="none";
  stoplink.style.color="#fff";
  stoplink.style.fontWeight="bold";
  stoplink.appendChild(document.createTextNode(" Stop "));

  //Rewind link
  var rewlink=document.createElement('a');
  rewlink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].Rewind())";

  rewlink.style.textDecoration="none";
  rewlink.style.color="#fff";
  rewlink.style.fontWeight="bold";
  rewlink.appendChild(document.createTextNode(" << "));

  //Go To link
  var gtlink=document.createElement('a');
  gtlink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].GotoFrame(parseInt(prompt('Go to what frame? (0 to '+document.getElementsByTagName('embed')["+i+"].TotalFrames()+')','0'))))";

  gtlink.style.textDecoration="none";
  gtlink.style.color="#fff";
  gtlink.style.fontWeight="bold";
  gtlink.appendChild(document.createTextNode(" GoTo "));

  //Next frame link
  var nflink=document.createElement('a');
  nflink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].GotoFrame(parseInt(document.getElementsByTagName('embed')["+i+"].TGetProperty('/', 4))))";

  nflink.style.textDecoration="none";
  nflink.style.color="#fff";
  nflink.style.fontWeight="bold";
  nflink.appendChild(document.createTextNode(" > "));

  //Previous frame link
  var pflink=document.createElement('a');
  pflink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].GotoFrame(parseInt(document.getElementsByTagName('embed')["+i+"].TGetProperty('/', 4))-2))";

  pflink.style.textDecoration="none";
  pflink.style.color="#fff";
  pflink.style.fontWeight="bold";
  pflink.appendChild(document.createTextNode(" < "));

  //Zoom in link
  var zilink=document.createElement('a');
  zilink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].Zoom(90))";

  zilink.style.textDecoration="none";
  zilink.style.color="#fff";
  zilink.style.fontWeight="bold";
  zilink.appendChild(document.createTextNode(" + "));

  //Zoom out link
  var zolink=document.createElement('a');
  zolink.href="javascript: void(document.getElementsByTagName('embed')["+i+"].Zoom(110))";

  zolink.style.textDecoration="none";
  zolink.style.color="#fff";
  zolink.style.fontWeight="bold";
  zolink.appendChild(document.createTextNode(" - "));

  //Get the link to the movie link
  var linklink=document.createElement('a');
  linklink.href=embeds[i].src;

  linklink.style.textDecoration="none";
  linklink.style.color="#fff";
  linklink.style.fontWeight="bold";
  linklink.appendChild(document.createTextNode(" Link "));

  //Append all the links to the menu
  menu.appendChild(closelink);
  menu.appendChild(hidelink);
  menu.appendChild(showlink);
  menu.appendChild(playlink);
  menu.appendChild(stoplink);
  menu.appendChild(rewlink);
  menu.appendChild(gtlink);
  menu.appendChild(pflink);
  menu.appendChild(nflink);
  menu.appendChild(zilink);
  menu.appendChild(zolink);
  menu.appendChild(linklink);

  div.appendChild(displaylink);
  displaylink.appendChild(document.createTextNode("!"));

  var PosX=pos[0]-24;
  if (PosX<0) PosX=0;

  //Exclamation mark again
  div.style.backgroundColor="#f00";
  div.style.border="2px solid #fff";
  div.style.width="20px";
  div.style.height="20px";
  div.style.textAlign="center";
  div.style.position="absolute";
  div.style.left=PosX+'px';
  div.style.top=pos[1]+'px';
  div.style.color='#fff';
  div.style.fontWeight="bold";
  div.style.textDecoration="none";
  div.style.zIndex="1000";
  div.style.opacity="0.3";
  
  //Put them in the document
  document.body.appendChild(div);
  document.body.appendChild(menu);
 }
}