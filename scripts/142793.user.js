// ==UserScript==
// @name        fragbite.se/annoy
// @namespace   http://www.fragbite.se/
// @version     0.1
// @description Annoys the shit out of you
// @match       http://www.fragbite.se/*
// @copyright   lol
// ==/UserScript==

var alerts = ['Haha, Fragbite har blitt hackat loool',
              'Shit, den här sidan e gaaaaaaaaaaaaaaaaaay',
              'CS GO är så jäla dålitt spela inte de',
              'Heaton är så sämst',
              'Jag tappade ett revben idag',
              'SD 2015',
              'loooooooooooooooooooooooooooooooooool',
              'käften',
              'saaaaaadaaaaaan i gaaaaaadaaaaaaaaan!!!!',
              'GRÄV BORT SKÅNE!'];
alert(alerts[Math.floor(Math.random()*alerts.length)]);