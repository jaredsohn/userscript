// ==UserScript==
// @name        Travian4 AttackAlarm
// @namespace   http://assouan.dinari.be/userscripts
// @description Play alarm sound if you are attacked
// @icon        http://www.travian.com/favicon.ico
// @author      Assouan
// @version     1.2.2
//
// @updateURL   https://userscripts.org/scripts/source/182308.meta.js
// @downloadURL https://userscripts.org/scripts/source/182308.user.js
// 
// @include     *.travian.*/dorf1.php*
// @exclude     http://www.traviantactics.com/*
// 
// @run-at      document-end
// @grant       none
//
// @history     1.2.2 Fix exclude
// @history     1.2.1 Add exclude
// @history     1.2   Add Alert for multi village
// @history     1.1   Change the detector attack by a more efficient
// ==/UserScript==

function check_attack()
{
    if (document.documentElement.innerHTML.indexOf('"a1') !== -1 ||
        document.documentElement.innerHTML.indexOf('<li class=" attack"') !== -1)
    {
        console.log('attack_y');
        
document.getElementById('footer').innerHTML = '<audio autoplay loop controls>' +
        'Your browser does not support the audio element.' +
		'<source src="http://www.sounddogs.com/previews/25/mp3/235181_SOUNDDOGS__al.mp3" type="audio/mpeg">' +
   		'<source src="http://soundjax.com/reddo/97744%5EALARM.mp3" type="audio/mpeg">' +
   		'<source src="http://upload.wikimedia.org/wikipedia/commons/8/81/Alarm_or_siren.ogg" type="audio/ogg">' +
	'</audio>';
        
        window.clearInterval(timer1)
    }
    else
    {
        console.log('attack_n');
    }
}

var timer1 = setInterval(check_attack, 5000);
var timer2 = setInterval("document.location.reload(true)", 60000);