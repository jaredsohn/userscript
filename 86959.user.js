// ==UserScript==
// @name           Turn Taker Notifier
// @namespace      http://www.userscripts.org/angelans
// @include        http://www.conquerclub.com/game.php*
// ==/UserScript==

var username = encodeURI(/logout.php\">logout\s<b>([^"\r\n]*)<\/b>/(document.getElementById("leftColumn").innerHTML)[1]);

function whisper(player) {
    var whisperText = player + ' for ' + username;
    var oldTeamCheckboxSetting = document.getElementById('team').checked;
    document.getElementById('message').value = whisperText;
    document.getElementById('team').checked = false;
    document.getElementById('submit2').click();
    document.getElementById('team').checked = oldTeamCheckboxSetting;
}

var playersHeader = document.getElementById('players');
var parent = playersHeader.parentNode;
var newdiv = document.createElement("div");
newdiv.innerHTML = "<br>Turn Taker Notice: <a id='tt-josko'>josko.ri</a> | <a id='tt-sjnap'>sjnap</a>";
parent.insertBefore(newdiv, playersHeader.previousSibling.previousSibling);

document.getElementById('tt-josko').addEventListener('click', function() { whisper('josko.ri'); }, false);
document.getElementById('tt-sjnap').addEventListener('click', function() { whisper('sjnap'); }, false);

