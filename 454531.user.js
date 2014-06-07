// ==UserScript==
// @name        	33WebMs
// @namespace   	http://userscripts.org/users/639946
// @description 	Incrusta vídeos en formato .webm en el foro de 33bits
// @include     	http://33bits.es/foro/*
// @include     	http://www.33bits.es/foro/*
// @version     	0.3
// @require     	https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant       	GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_log
// ==/UserScript==
'use strict';

GM_addStyle("				\
	video.webm { 			\
		max-width: 100%;	\
		height: auto;		\
	}						\
");

GM_config.init(
{
  'id': 'webm_33bits',
  'title': 'Configuración',
  'fields':
  {
    'Autoplay':
    {
      'label': 'Reproducir automáticamente',
      'type': 'checkbox',
      'default': false
    },
	
    'Autoloop':
    {
      'label': 'Volver a reproducir al finalizar',
      'type': 'checkbox',
      'default': true
    },
	
    'Automute':
    {
      'label': 'Silenciar por defecto',
      'type': 'checkbox',
      'default': true
    },
	
    'Controls':
    {
      'label': 'Mostrar controles',
      'type': 'checkbox',
      'default': true
    }
  }
});

var button = document.createElement("button");
button.type = "button";
button.onclick = showOption;
button.innerHTML = "Configurar WebM";
document.body.appendChild(button);
 
function showOption()
{
    GM_config.open();
}

var videos = document.querySelectorAll('.post a'),
  link, video;

for (var i = 0; i < videos.length; i++) {
  link = videos[i].href;
  if (link.toLowerCase().indexOf('.webm') === link.length - 5) {
    video = document.createElement('video');
	video.setAttribute('class', 'webm');
    video.src = link;
    video.autoplay = GM_config.get('Autoplay');
    video.loop = GM_config.get('Autoloop');
    video.muted = GM_config.get('Automute');
    video.controls = GM_config.get('Controls');
    
    videos[i].parentNode.replaceChild(video, videos[i]);
  }
}