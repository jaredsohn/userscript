// ==UserScript==
// @name           Greeter + Turn Taker Notifier
// @namespace      http://www.userscripts.org/angelans
// @include        http://www.conquerclub.com/game.php*
// ==/UserScript==

var username = /logout.php\">logout\s<b>([^"\r\n]*)<\/b>/(document.getElementById("leftColumn").innerHTML)[1];

function turntaker(player) {
    var whisperText = player + ' for ' + username;
    whisper(whisperText);
}

function greeting() {
    var whisperText = 'I am the amazing foxglove! Hear me ROAAAAARRRR!';
    whisper(whisperText);
}

function whisper(whisperText) {
    var oldTeamCheckboxSetting = document.getElementById('team').checked;
    document.getElementById('message').value = whisperText;
    document.getElementById('team').checked = false;
    document.getElementById('submit2').click();
    document.getElementById('team').checked = oldTeamCheckboxSetting;
}

var playersHeader = document.getElementById('players');
var parent = playersHeader.parentNode;
var newdiv = document.createElement("div");
newdiv.innerHTML = "<br>Greeting: <a id='tt-generic'>Generic</a>&nbsp;&nbsp;Turn Taker Notice: <a id='tt-josko'>josko.ri</a> | <a id='tt-sjnap'>sjnap</a>";
parent.insertBefore(newdiv, playersHeader.previousSibling.previousSibling);

document.getElementById('tt-generic').addEventListener('click', function() { greeting(); }, false);
document.getElementById('tt-josko').addEventListener('click', function() { turntaker('josko.ri'); }, false);
document.getElementById('tt-sjnap').addEventListener('click', function() { turntaker('sjnap'); }, false);


