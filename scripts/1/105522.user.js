// ==UserScript==
// @name           SoundCloud Download
// @namespace      chilln
// @include        http://soundcloud.com/*
// ==/UserScript==

var playerArray = document.getElementsByClassName("player");

for each(var player in playerArray) {
	if(player.className.indexOf('small') == -1)
		{
			AddDownloadLink(player);
		}
}


function AddDownloadLink(playerElement) {


	var scriptTags = playerElement.getElementsByTagName("script");
	if(scriptTags.length <= 0)
		return;
	var jsonPlayerData = eval(scriptTags[0].innerHTML.replace('window.SC.bufferTracks.push',''));
	
	var dlButton = playerElement.getElementsByClassName("download");
		
	if(dlButton.length > 0)
	{	
		if(dlButton[0].className.indexOf('disabled') == -1)
			return 0;
		dlButton[0].parentNode.removeChild(dlButton[0]);	
		
	}
	var toolBar = playerElement.getElementsByClassName('primary');
	var dlbtn = document.createElement('a');
	dlbtn.className = 'download pl-button';
	dlbtn.href = jsonPlayerData.streamUrl;
	dlbtn.title = 'Right click this link and choose \'Save target as...\'';
	dlbtn.appendChild(document.createTextNode('Download'));
	toolBar[0].insertBefore(dlbtn, toolBar[0].getElementsByClassName('favorite')[0].nextSibling);
}