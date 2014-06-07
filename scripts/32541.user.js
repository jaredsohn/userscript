// ==UserScript==
// @name           MeriFirma Automática
// @namespace      http://userscripts.org/scripts/show/32541
// @description    La solución definitiva para poner firmas automáticas en el foro de meristation.
// @include        http://zonaforo.meristation.com/*
// @exclude        http://zonaforo.meristation.com/foros/posting.php
// @exclude        http://zonaforo.meristation.com/foros/posting.php?mode=editpost&p=*
// @exclude        http://zonaforo.meristation.com/foros/posting.php?mode=quote&p=*
// @exclude        http://zonaforo.meristation.com/foros/profile.php?mode=editprofile
// @exclude        http://zonaforo.meristation.com/foros/report.php?mode=report&p=*
// @exclude        http://zonaforo.meristation.com/foros/privmsg.php?mode=quote&p=*
// @exclude        http://zonaforo.meristation.com/foros/privmsg.php

// @author         Scovery
// @version        1 Sep 2008
// ==/UserScript==

var signature = "[img]http://i38.tinypic.com/8vrfrn.png[/img]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,100)
