// ==UserScript==
// @name		TF2 Outpost Bazaar Additions
// @version		1.6.0
// @description		Enrich your experience on bazaar and tf2outpost
// @author		Yannick
// @include		http://www.tf2outpost.com*
// @include		http://bazaar.tf*
// @icon                http://zebry.nl:8020?get=icon
// @namespace           userscripts_tf2outpostbazaaradditions
// @run-at document-end
// ==/UserScript==
location.href = 'javascript:$.getScript(\'http://zebry.nl:8020?script=socketIO\', function(data, textStatus, jqxhr){ if (window.location.hostname.indexOf(\'bazaar.tf\')> -1) { $.getScript(\'http://zebry.nl:8020?script=bazaar\',function() { console.debugtf2(\'loaded\'); }); }else{ $.getScript(\'http://zebry.nl:8020?script=outpost\', function(){ console.debugtf2(\'loaded\'); }); } });'; 
