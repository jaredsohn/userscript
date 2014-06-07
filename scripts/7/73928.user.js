// ==UserScript==
// @name           bandenshoutbox Spam Attacke by Boggler
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    Shoutbox Zuspammer
// @include        http://*pennergame.de/gang/
// ==/UserScript==
var div_settingpoint = document.getElementsByTagName('body');
var div_tieritemA = document.getElementsByClassName('tieritemA');

div_tieritemA[0].innerHTML += '<tr><td height="15" colspan="3" align="left" valign="top"><span><b>Bandenshoutbox Spammer by Boggler</b></span><hr size="1"></td></tr><tr><div id="spammer"></div></tr>';
document.getElementById('spammer').innerHTML = 'Anzahl der Shoutboxeintr&auml;ge: <input type="text" size="2" value="' + GM_getValue('anzahl') + '" id="anzahl"><br>Spamtext:<br><textarea id="spamtext"cols="86" rows="5">' + GM_getValue('text') + '</textarea><br>' + 'Wartezeit(in sec):<input type="text" size="2" id="pause" value="' + GM_getValue('pause') + '"><br><input type="button" id="senden" value="Spam!">';
if (GM_getValue('anzahl') == null) {
    document.getElementById('anzahl').value = '8';
}
if (GM_getValue('pause') == null) {
    document.getElementById('pause').value = '1';
}
if (GM_getValue('text') == null) {
    document.getElementById('spamtext').value = 'Bandenshoutbox Spamscript by Boggler Danke dass du mein Script benutzt mfg Boggler';
}
document.getElementById('senden').addEventListener('click', function spammen() {
    GM_setValue('anzahl', document.getElementById('anzahl').value);
    GM_setValue('pause', document.getElementById('pause').value);
    GM_setValue('text', document.getElementById('spamtext').value);
    i = 0;
    senden(i);
    function senden(i) {
        if (i < GM_getValue('anzahl')) {

            GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://' + document.location.hostname + '/gang/chat/add/',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: encodeURI('f_text=' + GM_getValue('text') + '&Submit=Abschicken'),
                onload: function(responseDetails) {
                    i++;
                    var timeout = document.getElementById('pause').value * 1000;
                    setTimeout(function() {
                        senden(i);
                    }, timeout);

                }
            })
            } else {
            alert('Fertig! Habe ' + GM_getValue('anzahl') + ' Shoutboxeintr?¤ge geschickt');
            location.reload()
            }
    }

}, false);