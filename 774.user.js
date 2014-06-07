// ==UserScript==
// @name          music.download.com ad remover
// @description	  Removes ads at the top of music.download.com
// @include       http://*music.download.com/*
// @exclude       
// ==/UserScript==
	
(function() {
	// class adCall
   tmp = document.getElementsByTagName('div');
    for (i=0;i<tmp.length;i++)
    {
        if (tmp[i].className == 'adCall') tmp[i].style.display = 'none';
    }
})();
