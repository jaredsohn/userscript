// ==UserScript==
// @name           Megavideo - Huge Player
// @author         Xavi Esteve
// @version        1.0
// @description    Put video in full screen but keeping it inside the browser
// @namespace      http://www.xaviesteve.com
// @include        http://www.megavideo.com/?*v=*
// ==/UserScript==

GM_registerMenuCommand("Megavideo - Huge Player",
  function()
    {
    
      // Insert DIV style
      var styleCode = new Array();
      styleCode.push('body,div,td,input {background:#000;color:#000;border-color:#000}img{display:none}');

      var style = document.createElement('style');
      style.innerHTML = styleCode.join('\n');
      
      try { document.getElementsByTagName('head')[0].appendChild(style); }
      catch(e) {}
      
      // Resize video
	    document.getElementById('mvplayer').width = '1608';
	    document.getElementById('mvplayer').height = '904';
	    document.getElementById('playerdiv').style.width = '1608';
	    document.getElementById('playerdiv').style.height = '904';

	    document.getElementById('playertd').height = '1051';
		  
      document.largeplayer=true;
	    
      document.getElementById('playerbg').style.backgroundImage='url("mvgui/big_vid_bg2.gif")';
	    document.getElementById('smallmenu').style.display = 'none';
	    document.getElementById('bigmenu').style.display = '';
	}
);