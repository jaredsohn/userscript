// ==UserScript==
// @name           Add Gtalk inside your Orkut page
// @namespace      http://www.orkutsharing.blogspot.com
// @description    Adds Google Talk gadget within Orkut page Sidebar
// @include        http://www.orkut.com/*
// @include        http://orkut.com/*
// ==/UserScript==


// Script Begins here
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
 (function() {
     try {
		var rightbox = document.getElementById("rbox");
		if(!rightbox)
			return;
 
		var scriptcontainer = document.createElement("script");
		scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Show Gtalk\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/googletalk.xml&synd=open&w=270&h=451&title=Google+Talk&border=%23ffffff%7C3px%2C1px+solid+%23999999\' width=\'100%\' 	height=\'451px\' frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Gtalk\';}}';
rightbox.appendChild(scriptcontainer);
rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Show GTalk</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
     } catch (e) {
         GM_log( 'Google talk inside Orkut page exception: ' + e );
		 alert(e);
		}
 
})();