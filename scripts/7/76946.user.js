// ==UserScript==
// @name           Megavideo Cinema Size Enlarger
// @description    Adjust the video player to your screen in a cinema-like aspect. 
// @namespace      http://www.xaviesteve.com
// @include        http://www.megavideo.com/?*v=*
// ==/UserScript==

GM_registerMenuCommand("Megavideo Cinema Size",
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
	    document.getElementById('mvplayer').width = (window.innerWidth-30) + "px";
	    document.getElementById('mvplayer').height = (window.innerHeight-50) + "px";
	    document.getElementById('playerdiv').style.width = (window.innerWidth-30) + "px";
	    document.getElementById('playerdiv').style.height = (window.innerHeight-50) + "px";

	    document.getElementById('playertd').height = (window.innerHeight-40) + "px";;
		  
      document.largeplayer=true;
	    
      document.getElementById('playerbg').style.backgroundImage='url("mvgui/big_vid_bg2.gif")';
	    document.getElementById('smallmenu').style.display = 'none';
	    document.getElementById('bigmenu').style.display = '';
	}
);