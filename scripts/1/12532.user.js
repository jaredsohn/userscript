// ==UserScript==
// @name           Use Google Talk inside Orkut from Slim at Stuff4world
// @namespace      http://blog.stuff4world.com
// @description    Install this script to use gtalk right inside your orkut profile. This will add gtalk in your profile and let you use it from right there. This is Flash version of Gtalk. Enjoy...
// @include        http://www.orkut.com/*
// @include        http://orkut.com/*
// ==/UserScript==
 (function() {
     try {
		var rightbox = document.getElementById("rbox");
		if(!rightbox)
			return;
		var scriptcontainer = document.createElement("script");
		scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Show Gtalk\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/googletalk.xml&synd=open&w=270&h=451&title=Google+Talk&border=%23ffffff%7C3px%2C1px+solid+%23999999\' width=\'100%\' 	height=\'451px\' frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Gtalk\';}}';
rightbox.appendChild(scriptcontainer);
rightbox.innerHTML = '<div class="module"><p class="topl_g"><strong>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Show GTalk</a></strong></p><p class="topr"></p><div class="boxmid" style="text-align:center"><span id="talkspan"></span></div><p class="boxmidr"></p><p class="botl"></p><p class="botr"></p></div>' + rightbox.innerHTML;
     } catch (e) {
         GM_log( 'Gtalk inside Orkut exception: ' + e );
		 alert(e);
		}
    
})();