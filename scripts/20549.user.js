   1. // ==UserScript==
   2. // @name           Gtalk inside Orkut
   3. // @namespace      http://www.orkut.com/
   4. // @description    Adds GTalk gadget inside Orkut for one place messaging
   5. // @include        http://www.orkut.com/*
   6. // @include        http://orkut.com/*
   7. // ==/UserScript==
   8. (function() {
   9.      try {
  10.         var rightbox = document.getElementById("rbox");
  11.         if(!rightbox)
  12.             return;
  13.         var scriptcontainer = document.createElement("script");
  14.         scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Show Gtalk\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/googletalk.xml&amp;synd=open&w=270&h=451&title=Google+Talk&border=%23ffffff%7C3px%2C1px+solid+%23999999\' width=\'100%\'     height=\'451px\' frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Gtalk\';}}';
  15. rightbox.appendChild(scriptcontainer);
  16. rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Show GTalk</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
  17.      } catch (e) {
  18.          GM_log( 'Gtalk inside Orkut exception: ' + e );
  19.          alert(e);
  20.         }
  21.    
  22. })();