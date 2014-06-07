// ==UserScript==
// @name           Vkontakte audio: Stop after Current Song
// @namespace      vk_stop_after-vavooon@gmail.com
// @description    This script allows to stop playback after the current song.
// @description    Этот скрипт позволяет остановить воспроизведение аудиозаписей Вконтакте в конце трека и не переходить на следующий. Для его включения нужно нажать на кнопку >|  в окне плеера.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @include        https://vk.com/*
// @updateURL      https://userscripts.org/scripts/source/105626.meta.js
// @downloadURL    https://userscripts.org/scripts/source/105626.user.js
// @version        1.3
// ==/UserScript==
window.oncontextmenuSA=function(e)
{
		var _a=audioPlayer;
    if (!_a) return;
		_a.stopSw=!_a.stopSw;
		
		ge('gp_play') && ge('gp_play').classList.toggle('stopafter');
		ge('ac_play') && ge('ac_play').classList.toggle('stopafter');
		ge('head_play_btn') && ge('head_play_btn').classList.toggle('stopafter');
		if (!_a.onPlayFinishOriginal)
    {
      _a.onPlayFinishOriginal = _a.onPlayFinish;
	  	_a.onPlayFinish = function()
	  	{
		  	if (_a.stopSw)
		  	{
			  	_a.stop();	
		  		_a.stopSw=false;
          ge('gp_play') && ge('gp_play').classList.remove('stopafter');
          ge('ac_play') && ge('ac_play').classList.remove('stopafter');
          ge('head_play_btn') && ge('head_play_btn').classList.remove('stopafter');
		  	};
		  	_a.onPlayFinishOriginal();
		  };

      _a.loadGlobalOriginal = _a.loadGlobal;
      _a.loadGlobal=function()
      {
        _a.loadGlobalOriginal();
        if (_a.stopSw)
				{
					ge('gp_play') && ge('gp_play').classList.add('stopafter');
          ge('ac_play') && ge('ac_play').classList.add('stopafter');
          ge('head_play_btn') && ge('head_play_btn').classList.add('stopafter');
				}
      }
    }
		return false;
};

window.oncontextmenu=function(e)
{
	if (e.target.classList.contains("play_new") && e.button==2 && window.oncontextmenuDL)
	{
		var dlLink=e.target.parentNode.nextElementSibling.value.match(/http.*mp3/)[0];
	  return window.oncontextmenuDL(dlLink);
	}
	if ((["head_play_btn", "ac_play", "gp_play"].indexOf(e.target.id)!=-1) && e.button==2 && window.oncontextmenuSA) return window.oncontextmenuSA(e);
}


function addGlobalStyle(css) 
{
    var head,style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
addGlobalStyle('#ac_play.stopafter, #gp_play.stopafter {z-index: 9999; position: relative;} #head_play_btn.stopafter:after, #ac_play.stopafter:after, #gp_play.stopafter:after {z-index: 9998; background-color: red; content: ""; display: block; height: 6px; right: -2px; position: absolute; bottom: -2px; width: 6px;}');
