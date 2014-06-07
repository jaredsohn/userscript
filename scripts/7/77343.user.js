// ==UserScript==
// @name           MeriFirma
// @namespace      MeriFirma
// @description    Firma automática para Meristation
// @include        http://zonaforo.meristation.com/foros/viewtopic.php*
// @include        http://zonaforo.meristation.com/foros/posting.php?mode=reply*
// @include        http://zonaforo.meristation.com/foros/posting.php?mode=quote*
// ==/UserScript==

firma = "\n\n[center][color=grey]____________________________________________________________[/color]\n[IMG]http://i56.tinypic.com/lv3f6.png[/IMG][/center]";

function eFirma(){
	document.getElementsByTagName("textarea")[0].value = document.getElementsByTagName("textarea")[0].value + firma;
}

document.getElementById("post").addEventListener("click", eFirma, false);