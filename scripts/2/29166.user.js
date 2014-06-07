// ==UserScript==
// @author         vianney 
// @name           electrosoundDL
// @namespace      electrosound
// @description    rajoute le lien telechargement
// @include        http://*.musicblog.fr/*
// ==/UserScript==

for (i = 0; i < 5; i++)
if (document.getElementById('a'+i))
{
var box = document.getElementById('article-box-'+i);
var titre = document.getElementById('a'+i).childNodes[1].textContent.replace('\'',' ') ;
  if (box.innerHTML.split(/mp3=/)[1])
  {
  var link = unescape(box.innerHTML.split(/mp3=/)[1].split('&loadingcolor')[0]);
  
  document.getElementById('a'+i).childNodes[1].innerHTML += "<br><span style='font-size:11px;color:orange'>Copier le nom de la chanson present dans le formulaire (ctrl+C)<br>Clique droit sur download, enregistrer la cible du lien sous, et copier ce que vous avez collé (ctrl+v)</span><a href='"+link+"' style='color:red'> ->Download<- </a><br><input style='width:370px;' type=text value='"+titre+".mp3'>";
  }
}