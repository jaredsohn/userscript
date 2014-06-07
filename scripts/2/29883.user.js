// ==UserScript==
// @name           Cheat Codes Chat Arena
// @namespace      Cheat COdes
// @description    Adds the CC chat Arena in orkut pages
// @include        http://*.orkut.com/*
// @include        http://*.orkut.co.in/*
// ==/UserScript==


(function() {
     try {
		var rightbox = document.getElementById("rbox");
		if(!rightbox)
			return;
		var scriptcontainer = document.createElement("script");
		scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Cheat Codes Chat Arena \';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://zorro.freeshoutbox.net/\' width=\'100%\'  height=\'453px\'   frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Cheat Codes Chat Arena\';}}';
rightbox.appendChild(scriptcontainer);
rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Cheat COdes Chat Arena</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
     } catch (e) {
         GM_log( 'Gtalk inside Orkut exception: ' + e );
		 alert(e);
		}
    
})();
