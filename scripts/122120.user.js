// ==UserScript==
// @name           Verzamelplaats
// @namespace      0495834
// @description    Troepen invullen
// @include        nl.tribalwars.*
// ==/UserScript==javascript:/*@author Lekensteyn <lekensteyn@gmail.com> @version 0.4.20101215.1*/


var submit=0,units={spear:0,sword:0,axe:0,archer:0,spy:100,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0};(function(){var a=frames.main||self,d=a.document,c=a.game_data;if(typeof c=="undefined")alert("Spelinformatie is onbekend");else{a=d.forms;var e,b;b=c.link_base.replace(/&amp;/g,"&");if(c.screen=="info_village")location.href=b+"place&target="+d.URL.match(/[?&]id=(\d+)/)[1];else if(!(a=a[0])||!a.action.match("try=confirm"))if(a&&a.elements.submit)a.elements.submit.click();else{if(confirm("Deze tool werkt op de Verzamelplaats => Bevelen.\nWil je er nu naartoe?"))location.href=b+"place"}else{for(e in units)if(d= a.elements[e]){c=units[e];b=d;do b=b.nextSibling;while(b.tagName!="A");b=1*b.innerHTML.slice(1,-1);d.value=c<0?Math.max(0,b+c):Math.min(b,c)}if(a.x.value!=""&&submit!=0)a[submit!=2?"attack":"support"].click()}}})()
