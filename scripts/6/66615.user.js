// ==UserScript==
// @name	Espn Video (No Autoplay)
// @namespace	http://localhost
// @description	No more autoplaying videos on news pages.
// @include	*espn.go.com/*
// @exclude	*espn.go.com/*video*
// ==/UserScript==

  document.cookie = "VAS=2";
  player = document.getElementById("videoPlayer");
  if(player){
	player.parentNode.innerHTML = player.parentNode.innerHTML.replace(/autostart=true/gi,"autostart=false");
  }
  for (var propertyName in unsafeWindow.ESPN_GLOBALS.videoPlayers) {
    unsafeWindow.ESPN_GLOBALS.videoPlayers[propertyName].autostart = false;
  }