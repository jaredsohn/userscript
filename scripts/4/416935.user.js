// ==UserScript==
// @name			DogeMiner
// // @namespace		Curcle
// Script for http://dogeminer.se/
var wowscript = $.cookie('dogeminer');
wowscript.coins = 10000000000000000; // Number of coins that you want
 // ==/UserScript==

/*
If you want to change another parameter (e.g. clicks), you can use the parameters below and change them to the object value that you want; like in this example:
 
wowscript.clicks = 999999;
 
*/
 
$.cookie('dogeminer', wowscript, {
    expires: 7300
});
 
 
//////////////////////////////////////////
/*
Other parameters that you can change:
 
animate: false
basecost: 1109873118760728300
bases: 291
basestrength: 225000
baseupslevel: 4
ceffects: true
clicks: 18716
clickstrength: 50123792573927.5
clickupslevel: 6
coins: 81747337998282380
extrastrength: 2.5
extraupslevel: 6
kennelcost: 32791854789861730
kennels: 336
kennelstrength: 98085045040
kennelsupslevel: 6
kittencost: 904727891158334300000
kittens: 415
kittenstrength: 55045045040
kittensupslevel: 6
rigcost: 63604937004306690000
rigs: 261
rigstrength: 4204204204
rigupslevel: 4
rocketcost: 1384315042915517
rockets: 245
rocketstrength: 95045045040
rocketupslevel: 5
shibecost: 28933930239708942000
shibes: 442
shibestrength: 1100
shibeupslevel: 4
version: 1
*/