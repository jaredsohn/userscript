   1. Source for "Google Talk inside Orkut!"
   2.
   3.    1. // ==UserScript==
   4.    2. // @name           GTalk
   5.    3. // @description    Use Gtalk in Orkut!!!
   6.    4. // @include        http://www.orkut.com/*
   7.    5. // @include        http://orkut.com/*
   8.    6. // ==/UserScript==
   9.    7. (function() {
  10.    8.      try {
  11.    9.         var rightbox = document.getElementById("rbox");
  12.   10.         if(!rightbox)
  13.   11.             return;
  14.   12.         var scriptcontainer = document.createElement("script");
  15.   13.         scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Show Gtalk\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/googletalk.xml&amp;amp;synd=open&w=270&h=451&title=Google+Talk&border=%23ffffff%7C3px%2C1px+solid+%23999999\' width=\'100%\'     height=\'451px\' frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Gtalk\';}}';
  16.   14. rightbox.appendChild(scriptcontainer);
  17.   15. rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Show GTalk</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
  18.   16.      } catch (e) {
  19.   17.          GM_log( 'Gtalk inside Orkut exception: ' + e );
  20.   18.          alert(e);
  21.   19.         }
  22.   20.   
  23.   21. })();