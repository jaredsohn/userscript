// ==UserScript==
// @name           YouTube video Downloader
// @description    Adds a little button to download the video.
// @namespace      http://www.sirviejo.com/youtube-downloader
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        1.3.1
// ==/UserScript==

(function () {

	var $ = function(id) {
    return document.getElementById(id);
  };
  var video_id = null;
  var security_hash = null;
  var video_player = $('movie_player');
  
  if (video_player) {
	flashvars = video_player.attributes.getNamedItem('flashvars').value;
	var parametros = flashvars.split('&');
	var campo ='';
	var valor = '';
	var partes = '';



	for (i=0; i<parametros.length; i++){
		partes = parametros[i].split('=');
		campo = partes[0];
		valor = partes[1];

		switch (campo){
			case 'video_id':
				video_id = valor;
			break;

			case 't':
				security_hash = valor;
			break
	}
    

  }
  
  
	var icon = document.createElement('img');
	var link = document.createElement('a');
	icon.src = 'http://tecpic.com/images/dloadphpup.png';
	link.href = 'http://www.youtube.com/get_video?fmt=18&amp;video_id='+video_id+'&amp;t='+security_hash;
	link.appendChild(icon);
	
	$('watch-vid-title').getElementsByTagName('h1')[0].appendChild(link);


 } 
})();