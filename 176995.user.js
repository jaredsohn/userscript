// ==UserScript==
// @name        magnet_play
// @namespace   magnet_play
// @include     http://*/*
// @version     1
// @grant       none
// ==/UserScript==


function create_div(link,el)
{
   var mydiv = document.createElement("div");
   mydiv.id = "testdiv";
   mydiv.style.position = "absolute";
   
   mydiv.style.width = "40px";
   mydiv.style.height = "30px";
   //mydiv.style.zIndex = "1";
   //mydiv.style.padding = "1px";
   mydiv.style.backgroundColor = "#E1E8FB";
   mydiv.style.border = "1px";
   mydiv.style.visibility = "visible";
   //mydiv.style.overflowY = "auto"
   //mydiv.setAttribute('onMouseOver', 'javascript: mouseoverDiv();');
   //mydiv.setAttribute('onMouseOut', 'javascript: mouseoutDiv();');
   var mylink = document.createElement("a");
   mylink.id = "mylink";
   mylink.href = link;
   mylink.innerHTML = "去看吧";
   mydiv.appendChild(mylink);
   el.appendChild(mydiv);
   // alert(el.offsetLeft);
   //el.insertBefore(mylink);
   //document.body.appendChild(mydiv)

}
function get_magnet()
{
    
   var returnValue = "";
   var links = document.getElementsByTagName('a');

   for(var i = 0; i < links.length; i ++ )
   {
      if(links[i].href.match(/^ed2k.*/))
      {
         
         create_div("http://vod.xunlei.com/share.html?from=kuaichuan_web&url="+links[i],links[i]);
      }
      if(links[i].href.match(/^magnet.*/))
      {
         
         create_div("http://vod.xunlei.com/share.html?from=kuaichuan_web&url="+links[i],links[i]);
      }
   }
}
get_magnet();


