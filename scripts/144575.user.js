// ==UserScript==
// @name           BTarg 6.0000000001 :0)
// @namespace      btverga
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include 	   http://*btarg.com.ar/tracker/forums.php?action=viewtopic&topicid=*
// @description    
// @version        0.4
// ==/UserScript==



// coso de las imagenes
$(".comment").ready(function(){
var imgs = document.getElementsByTagName('img');
for(i=0;i<imgs.length;i++) {
if(imgs[i].width >= 650){
	imgs[i].width = 650;
	imgs[i].title = 'Esta imagen ha sido redimensionada, click para ir al link original';
	imgs[i].addEventListener("click",function(){window.open(this.getAttribute('src'),'mostramelaimagen');},false);
	imgs[i].style.cursor = "pointer";
	}
}
  return false;
       });


//carga el código javascript modificado para que funcione el botón de IMGW
var script = "http://dl.dropbox.com/u/94488968/bb.js";
 
if (typeof GM_addScript != "undefined") {
GM_addScript(script);
} else if (typeof GM_addScript != "undefined") {
GM_addScript(script);
} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("script");
node.type = "text/javascript";
node.src = script
// node.innerHTML = script;
heads[0].appendChild(node);
}
}

//cambia el botón html
$(document.getElementsByName('img')).attr({ 
  name : "imgw",
  onclick : "javascript: BBTag('[imgw]','imgw','body','reply')",
  value : " IMGW "
});
