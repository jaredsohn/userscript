// ==UserScript==
// @name           ElisaViihdeRemovePlayer
// @namespace      ElisaViihdeRemovePlayer
// @description    Removes the player on the Elisa Viihde site.  It's best used with my other script, which creates a Download link for the player page.
// @include        http://elisaviihde.fi/etvrecorder/program.sl*view=true
// ==/UserScript==

function removePlayerElements() {
	var playbar = document.getElementById('play_bar');
	var parent = playbar.parentNode;
	parent.removeChild(playbar);
	parent.children[0].innerHTML = '';

//	document.getElementById('info').innerHTML = '<a href="' + getURL() + '">Download</a>';

	document.getElementById('prgrminfo2').innerHTML = '<p style="padding-bottom:0;margin-bottom:0"><a style="border: 1px solid red; padding:5px;" href="' + getURL() + '">Download</a></p>' + document.getElementById('prgrminfo2').innerHTML;
	
	infoChildren = document.getElementById('prgrminfo').children;
	infoChildren[infoChildren.length-1].style.clear = 'right';
	
	var scripts = document.getElementsByTagName('script');
	for (i=0; i<scripts.length ;i=i+1) {
		script = scripts[i];
		if (script.getAttribute("src") == '/js/tvrecorder/vlcplayer.js')
		{
			//scripts[i].parentNode.removeChild(scripts[i]);
			scripts[i].parentNode.innerHTML = '';
		}
	}
}

function getURL() {
  var all = document.getElementsByTagName('script');
  for (var e = 0; e < all.length; e++) {
    var url = /doGo\(\'(.+?)\'\)/(all[e].innerHTML);
    if (url)
	  return url[1];
  }
}

removePlayerElements();