// ==UserScript==
// @name           yuvuFullscreen
// @namespace      #yuvuFullscreen
// @description    Fullscreen hack and icon removal on Yuvutu.com *NSFW*
// @include        http://www.yuvutu.com/modules.php?name=Video&op=view&video_id=*
// ==/UserScript==

(function(){
	
	var flashparams = document.body.innerHTML.match(/allowfullscreen" value="false"/ig);
	var FSmsgs = new RegExp("fullscreenplugin.message=.*?fullscreenplugin.link=.*?Subscribe", "gi");
	if (flashparams  != null)
	{
	if (flashparams.length > 0)
		{

			document.body.innerHTML = document.body.innerHTML.replace(/allowfullscreen" value="false"/ig,'allowfullscreen" value="true"');
			document.body.innerHTML = document.body.innerHTML.replace(/smoothing=false/ig,'smoothing=false&icons=false');
			document.body.innerHTML = document.body.innerHTML.replace(FSmsgs,'');	
	
		}	
	}
	
})();
