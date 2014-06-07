// ==UserScript==
// @name           Elu
// @namespace      Li0n
// @description    Näitab kaua ma olen elanud
// @include        http://[insert web page name]/
// ==/UserScript==

(function(){
	var string = 'i=[insert your string here]...'
	var e = document.getElementById('swf_create_form');
	if(e)
		e.innerHTML='<?php
$day=24;
$month=5;
$year=1994;
$hour=21;
$minute=30;
$days=(int)((time(void) - mktime (0,0,0,$month,$day,$year))/86400);
$hours=$days*24+date("H")-1;
$minutes=$hours*60+date("i");
$seconds=$minutes*60+date("s");
// algus kuupäev on: 24.24.09 21:30
echo "Ma olen elanud: $days päeva ehk $hours tundi ehk $minutes minutit ehk $seconds sekundit";
?>'

})();