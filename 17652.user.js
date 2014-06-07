Source for "Google Talk inside Orkut!"

   1. // ==UserScript==
   2. // @name           Gtalk inside Orkut!
   3. // @description    Adds GTalk gadget inside Orkut for one place messaging
   4. // @include        http://www.orkut.com/*
   5. // @include        http://orkut.com/*
   6. // ==/UserScript==
   7. (function() {
   8.      try {
   9.         var rightbox = document.getElementById("rbox");
  10.         if(!rightbox)
  11.             return;
  12.         var scriptcontainer = document.createElement("script");
  13.         scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Show Gtalk\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/googletalk.xml&amp;synd=open&w=270&h=451&title=Google+Talk&border=%23ffffff%7C3px%2C1px+solid+%23999999\' width=\'100%\'     height=\'451px\' frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Gtalk\';}}';
  14. rightbox.appendChild(scriptcontainer);
  15. rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Show GTalk</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
  16.      } catch (e) {
  17.          GM_log( 'Gtalk inside Orkut exception: ' + e );
  18.          alert(e);
  19.         }
  20.    
  21. })();