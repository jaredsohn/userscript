// ==UserScript==
// @name           Jeuxvideo.com : Télécharger n'importe quelle vidéo
// @namespace      http://
// @version        2.21
// @description    Affiche un lien pour télécharger n'importe quelle vidéo sur Jeuxvideo.com
// @include        http://www.jeuxvideo.com/*
// @updateURL      http://userscripts.org/scripts/source/42061.user.js
// @author	       bosam
// ==/UserScript==

/*

Ce script vous permet d'afficher un lien de téléchargement juste en dessous de la vidéo.
Au cas où votre connexion lâche et que la vidéo se coupe en plein milieu.

En espérant que ça vous serve !

Mise à jour du 21.04.2014: Maintenant vous pouvez télécharger tous les formats de vidéos directement sur leurs listes respectives - ajout d'un bloc info + ajout du format 1080p
Mise à jour du 7.07.2013: Possibilité de télécharger tous les formats des GL (240p, 480p et 720p s'il existe)
Mise à jour du 5.07.2013: Affiche les vidéos issues des news, ajout d'un icône de téléchargement et activation des mises à jour automatique du script.
Mise à jour du 27.08.2011: Changement de méthode pour sélectionner la source.
Mise à jour du 1.12.2010: Suppression du SD to HD redirection car maintenant les vidéos HD et SD ont la même page. Téléchargement des fichiers vidéos en high par défaut.
Mise à jour du 26.10.2010: Changement de configuration du site, maintenant ça remarche.
Mise à jour du 8.05.2010: Rajout des vidéos générales du site (bande-annonces, reportage, extraits, et le Cliq)
Mise à jour du 23.09.2009: Lecture du fichier xml du player (compatible Greasemonkey seulement)

*/

var location = new String(document.location);

if (location.match(/gaming_live.htm/) || 
    location.match(/chroniques-video.htm/) ||
    location.match(/reportages-videos-jeux.htm/) ){
  GM_addStyle('.dl_panel { float: right } .dl_panel span { display: inline; padding: 5px; }');
  GM_addStyle('.dl_panel span a { color: white; padding:2px }');
  GM_addStyle('.dl_panel span a:visited { color: black; padding:2px }');
  GM_addStyle('.dl_panel span a[class="240p"] { background-color: #5910AB; }');
  GM_addStyle('.dl_panel span a[class="480p"] { background-color: #FF6600; }');
  GM_addStyle('.dl_panel span a[class="720p"] { background-color: #000099; }');
  GM_addStyle('.dl_panel span a[class="1080p"] { background-color: #0066FF; }');
  GM_addStyle('.div_info { position: absolute; background-color: white; border: 1px black solid; border-radius: 5px; padding: 3px; }')

  var list_format = { "240p": "low",
                      "480p": "high",
                      "720p": "720p",
                      "1080p" : "1080p"};
  list_li = document.getElementsByClassName('bloc1')[0].getElementsByClassName('liste_liens')[0].getElementsByTagName('li');
  for (var i = 0; i < list_li.length; i++)
  {
    var li_item = list_li[i];
    var a = li_item.getElementsByTagName('a')[0];

    // Create the div for afterwards
    // Generate panels of videos
    var div = document.createElement('div');
    div.setAttribute('class', 'dl_panel');
    div.setAttribute('id', 'dl_'+i);

    li_item.appendChild(div);

    // Parse url page to get datas
    var closureMaker = function (il){
      return function (event){
        GM_xmlhttpRequest({
          method: "GET",
          url: a.href,
          data: null,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          onload: function (response) {
            if (response.responseText == "") return;

            var html = response.responseText;

            var description = new RegExp('<span itemprop="description" content="(.*)" >').exec(html)[1];
            description = description.replace('" >', '');

            var span_info = document.createElement('span');
            span_info.appendChild(document.createTextNode('Info'));
            span_info.setAttribute('style', 'cursor: pointer; color: #014F95');
            span_info.addEventListener('click', function(){
              document.getElementById('info_'+il).style.display = (document.getElementById('info_'+il).style.display == 'none') ? 'block' : 'none';
            }, false);

            var div_info = document.createElement('div');
            div_info.innerHTML = description;
            div_info.setAttribute('id', 'info_'+il);
            div_info.setAttribute('class', 'div_info');
            div_info.style.display = 'none';

            document.getElementById('dl_'+il).appendChild(span_info);
            document.getElementById('dl_'+il).appendChild(div_info);

            var urls = new RegExp('<meta itemprop="contentUrl" content="(.*)" />').exec(html)[1];

            // Clean out video1080 from url
            urls = urls.replace('1080', '');

            for (var f in list_format)
            {
              var key = list_format[f];

              var span = document.createElement('span');
              var a2 = document.createElement('a');
              a2.setAttribute('class', f);
              a2.href = urls.replace('-1080p', '-'+key);
              a2.appendChild(document.createTextNode(f));
              span.appendChild(a2);
              document.getElementById('dl_'+il).appendChild(span);
            }
          }
        });
      };
    };
    var closure = closureMaker(i);
    closure();
  }
}else{
  var img = document.createElement('img');
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAABV0RVh0Q3JlYXRpb24gVGltZQAyLzE3LzA4IJyqWAAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6MTE6NDEgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wMi0xN1QwMjozNjo0NVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wMy0yNFQxOTowMDo0Mlo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNR1SZAAAAJZQTFRFAAAA////AAAA7OzsGLMBvr6+uLi4oKCfGLMBIb8BMMcBMtcAQM4BSNwAU9YAX+EAZ9wAduYAfuQAjusAluoAoKCfpfAAr/EAtbW0uLi3u7u6u/QAvb28wsLC2tTJ3dfM4dzQ5OTk5ubm5+HX5+LX6Ojo6enp6urq8PDw8vLy9PT09fX19vb29/f3+Pj4+fn5+vr6////vNaIZgAAAAh0Uk5TAAACU7O/ws+2TnQFAAAAlElEQVQYGQXBQU4CQRAAwOrZBnE1XoCjR5P1/78y8eAGlA3MtFURigO4ERI4PuQ3SOA+FJBk0ks5eHQRnp5RAn+bKfbndaqqUnW705xPyzbGGGNs5ylM8TY7fUWVx+fcrqOBpVf1d05HDViqPqbLz29IwKJ2LSMkLhSC1yZtYzYGWjM2Sb+WQogXkr7njh2dtALA6h//M0JWJA8aPAAAAABJRU5ErkJggg==";
  img.setAttribute('style', 'margin-right: 2px;');

// Videos dans la news ou dans la page ?
var list = document.getElementsByClassName('container_player_video');
if (list.length > 0){
  for (var i = 0; i < list.length; i++)
  {
    var item = list[i];
    
    var listmetas = item.getElementsByTagName('meta');
    if (listmetas.length > 0){
      for (var i2 = 0; i2 < listmetas.length; i2++)
      {
        if (listmetas[i2].getAttribute('itemprop') != 'contentUrl') continue;
        
        contentUrl = listmetas[i2].getAttribute('content');
        
        // Je ne trouve pas encore les url des videos qui relance sur un script cgi
        if (contentUrl.indexOf("cgi-bin") !== -1) continue;
        
        var a = document.createElement('a');
        a.href = contentUrl;
        a.setAttribute('style', 'display: block; padding-top: 5px;');
        a.appendChild(img);
        a.appendChild(document.createTextNode('Télécharger la vidéo'));
        
        item.appendChild(a);
      }
    }
  }
}

// Videos GL & Cie
var link_video = document.getElementById('mp4').getElementsByTagName('a')[0].getAttribute('href');
link_video = link_video.replace('http://download.jeuxvideo.com/cgi-bin/gl_dl.cgi?file=', 'http://video.jeuxvideo.com/');

// DL Center
var p = document.createElement('p');
p.setAttribute('id', 'dl_center');
p.setAttribute('style', 'text-align: center; margin-top: 5px');
p.appendChild(img);
p.appendChild(document.createTextNode('Télécharger la vidéo : '));

var a = document.createElement('a');
a.setAttribute('style', 'margin-left: 5px; margin-right: 5px');
// 240p
a.href = link_video;
a.appendChild(document.createTextNode("240p"));
p.appendChild(a);

var a = document.createElement('a');
a.setAttribute('style', 'margin-left: 5px; margin-right: 5px');
// 480p
a.href = link_video.replace('low', 'high');
a.appendChild(document.createTextNode("480p"));
p.appendChild(a);

// Test pour le 720p
var url720p = link_video.replace('low', '720p');
var a = document.createElement('a');
a.setAttribute('style', 'margin-left: 5px; margin-right: 5px');
a.href = url720p;
a.appendChild(document.createTextNode("720p"));

GM_xmlhttpRequest({
  method: "HEAD",
  url: url720p,
  onload: function(response) {
    if(response.status == 200){
     p.appendChild(a);
   }
 },
 onerror: function(response) {
  console.log("Connection to "+url720p+" failed.");
}
});

// Test pour le 1080p
var url1080p = link_video.replace('low', '1080p');
var a2 = document.createElement('a');
a2.setAttribute('style', 'margin-left: 5px; margin-right: 5px');
a2.href = url1080p;
a2.appendChild(document.createTextNode("1080p"));

GM_xmlhttpRequest({
  method: "HEAD",
  url: url1080p,
  onload: function(response) {
    if(response.status == 200){
     p.appendChild(a2);
   }
 },
 onerror: function(response) {
  console.log("Connection to "+url1080p+" failed.");
}
});


document.getElementById('zone_player').appendChild(p);
}