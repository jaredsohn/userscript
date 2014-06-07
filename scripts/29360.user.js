// ==UserScript==
// @name           TIO shoutbox for Orkut
// @namespace      This Is Orkut
// @description    Adds the TIO shoutbox in orkut pages
// @include        http://*.orkut.com/*
// @include        http://*.orkut.co.in/*
// ==/UserScript==


(function() {
     try {
		var rightbox = document.getElementById("rbox");
		if(!rightbox)
			return;
		var scriptcontainer = document.createElement("script");
		scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'This is Orkut shoutbox - Faerie\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://hosting.gmodules.com/ig/gadgets/file/110758807111290314539/tio_shoutbox.xml\' width=\'100%\'  height=\'453px\'   frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide TIO shoutbox - Faerie\';}}';
rightbox.appendChild(scriptcontainer);
rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>This is Orkut Shoutbox - Faerie</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
     } catch (e) {
         GM_log( 'Gtalk inside Orkut exception: ' + e );
		 alert(e);
		}
    
})();
