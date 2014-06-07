// ==UserScript==
// @name           Vkontakte music download
// @namespace      vk_music_dl-vavooon@gmail.com
// @description    Just right click on audio 'play' button and download will start. Для загрузки просто кликните правой кнопкой по иконке воспроизведения.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @include        https://vk.com/*
// @version        2.0.4
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/98949.meta.js
// @downloadURL    https://userscripts.org/scripts/source/98949.user.js
// ==/UserScript==

var script = document.createElement('script'); 
script.type = "text/javascript";
function startDl(link)
	{
			var dlEl=document.createElement('a');
			dlEl.href=link;
			dlEl.style.display='none';
			document.body.appendChild(dlEl);
			dlEl.click();
			document.body.removeChild(dlEl);
	};
window.oncontextmenuDL=function(dlLink)
{
		if (dlLink.match('/.mp3'))
		{
			var ids = e.target.id.replace(/[a-zA-Z]/g,'').split('_');
			ajax.post('audio', {act: 'reload_audio', owner_id: ids[0], audio_id: ids[1]}, 
			{
				onDone: function(res) 
				{
					if (res) 
					{
						startDl(res[0]);
					}
				}
			}
			);
		}
		else
		{
			startDl(dlLink);
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