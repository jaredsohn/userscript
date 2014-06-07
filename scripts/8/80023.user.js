// ==UserScript==
// @name           Monitor de comentarios
// @namespace      taringa
// @description    monitor de commentarios de taringa
// @include        *taringa.net/comentarios/*
// ==/UserScript==

//Parrsear texto(0=no, 1=si)
var parse=0;

url = document.location.href ;
partes = url.split('/');
var cont=document.getElementById("cuerpocontainer");
cont.innerHTML='<br clear=" left"  /><div class="container940" ><div class="box_title" ><div class="box_txt favoritos" >Comentarios de '+partes[partes.length-1]+'</div><div class="box_rrs" ><div class="box_rss" ></div></div></div><div class="box_cuerpo" ><div id="resultados" >'+'<img src="http://lea87crzz.unlugar.com/cargando.gif">'+ '</div></div></div><div style="clear:both" ></div>';
var url1="http://"+partes[2]+"/api/809721c9a576be73fd682e9280a322c6/xml/Users-GetPostsComments/"+partes[partes.length-1];
var conexion1;
conexion1=new XMLHttpRequest();
conexion1.onreadystatechange = procesarEventos;
conexion1.open("GET", url1, true);
conexion1.send(null);

function procesarEventos()
{
  if(conexion1.readyState == 4)
  {
    var xml = conexion1.responseXML;
    var pid=xml.getElementsByTagName('post-id');
    var fecha=xml.getElementsByTagName('date');
    var texto=xml.getElementsByTagName('comment');
    var url=xml.getElementsByTagName('url');
    var str = '<br clear=" left"  /><div class="container940" ><div class="box_title" ><div class="box_txt favoritos" >Comentarios de '+partes[partes.length-1]+'</div><div class="box_rrs" ><div class="box_rss" ></div></div></div><div class="box_cuerpo" ><div id="resultados" >';
    var x=0;
    var titulo=url[x].firstChild.nodeValue.split("/");
    titulo=titulo[6].split(".html");
    titulo=titulo[0].replace(/-/g," ");
    titulo=titulo.replace(/_/g,".");
    var urlf=url[x].firstChild.nodeValue.split("#");
    str+='<hr><strong><a href="'+urlf[0]+'">'+titulo+'</a></strong><br><strong>'+fecha[x].firstChild.nodeValue+'</strong>:<a href="'+url[x].firstChild.nodeValue+'">'+texto[x].firstChild.nodeValue+'</a><br>';
   for(x=1;x<pid.length;x++)
   {
    if(pid[x].firstChild.nodeValue==pid[x-1].firstChild.nodeValue)
    {
      str+='<strong>'+fecha[x].firstChild.nodeValue+'</strong>:<a href="'+url[x].firstChild.nodeValue+'">'+parsestr(texto[x].firstChild.nodeValue)+'</a><br>';
    }
    else
    {
      var titulo=url[x].firstChild.nodeValue.split("/");
      titulo=titulo[6].split(".html");
      titulo=titulo[0].replace(/-/g," ");
      titulo=titulo.replace(/_Equot;/g,'"');
      titulo=titulo.replace(/_/g,".");
      var urlf=url[x].firstChild.nodeValue.split("#");
      str+='<hr><strong><a href="'+urlf[0]+'">'+titulo+'</a></strong><br><strong>'+fecha[x].firstChild.nodeValue+'</strong>:<a href="'+url[x].firstChild.nodeValue+'">'+parsestr(texto[x].firstChild.nodeValue)+'</a><br>';
    }
   }
   str+='</div></div></div><div style="clear:both" ></div>';
  cont.innerHTML=str;
  } 
  else 
  {
    cont.innerHTML = '<br clear=" left"  /><div class="container940" ><div class="box_title" ><div class="box_txt favoritos" >Comentarios de '+partes[partes.length-1]+'</div><div class="box_rrs" ><div class="box_rss" ></div></div></div><div class="box_cuerpo" ><div id="resultados" >'+'<img src="http://lea87crzz.unlugar.com/cargando.gif">'+ '</div></div></div><div style="clear:both" ></div>';
  }
}

function parsestr(text)
{
if(parse==1)
{
search = new Array(
          /\[img\](.*?)\[\/img\]/,
          /\[IMG\](.*?)\[\/IMG\]/,
          /\[img=(.*?)\]/,
          /\[url=(.*?)\](.*?)\[\/url\]/,
          /\[url\](.*?)\[\/url\]/,
          /\[url=((www|ftp|)\.[^ \\"\n\r\t<]*?)\](.*?)\[\/url\]/,
          /\[b\](.*?)\[\/b\]/,
          /\[url\](http:\/\/[^ \\"\n\r\t<]*?)\[\/url\]/,
          /\[quote=(.*?)\](.*?)\[\/quote\]/g,
          /\[br\]/g,
          /\[i\](.*?)\[\/i\]/g,
          /\[size=(.*?)\](.*?)\[\/size]/g);

replace = new Array(
          "<img src=\"$1\" alt=\"An image\">",
          "<img src=\"$1\" alt=\"An image\">",
          "<img src=\"$1\" alt=\"An image\">",
          "<a href=\"$1\" target=\"blank\">$2</a>",
          "<a href=\"http://$1\" target=\"blank\">$1</a>",
          "<a href=\"$1\" target=\"blank\">$1</a>",
          "<b>$1</b>",
          "<a href=\"$1\" target=\"blank\">$1</a>",
          "<br><blockquote><div class=\"cita\">Cita $1:</div><div class=\"citacuerpo\">$2</div></blockquote><br>",
          "<br>",
          "<i>$1</i>",
          "<span style=\"font-size: $1pt;\">$2</span>");
for(i = 0; i < search.length; i++) {
     text = text.replace(search[i],replace[i]);
}
while(text.indexOf("[quote")>=0)
{text = text.replace(/\[quote=(.*?)\](.*?)\[\/quote\]/,"<br><blockquote><div class=\"cita\">Cita $1:</div><div class=\"citacuerpo\">$2</div></blockquote><br>");
}
}
return text;
}