// ==UserScript==
// @name           PissMollyOff
// @namespace      Molly
// @include        http://*
// ==/UserScript==

var insults=new Array();
var mo = 'Molly you ';
insults[0] = mo + "shovel faced blonde prick";
insults[1] = mo + "carrot eating wanker";
insults[2] = mo + "baby snatcher";
insults[3] = mo + "ugly headed stick figurine";
insults[4] = mo + "filthy stash hound";
insults[5] = mo + "mudblood";
insults[6] = mo + "ugly cunt";
insults[7] = mo + "are blind";
insults[8] = mo + "stole a childs virginity";
insults[9] = mo + "let your bird get fingered";
insults[10] = mo + "don't do a real degree";
insults[11] = mo + "look like your from twilight, but the ugly version";
var ran=Math.floor(Math.random()*12)
alert(insults[ran]);