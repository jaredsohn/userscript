// ==UserScript==
// @name           Pennerzone - Automatisch Spenden
// @namespace      BeAtMaStRs Grease-Penner-Tool v1.0
// @include        http://hamburg.pennerzone.de/spenden/stats.html
// ==/UserScript==

var max = 60; // So viel Spenden werden maximal getätigt.
var smax = 100; // Warten mehr Links auf Deine Spende als hier angegeben und die maximale Spendenzahl ist erreicht wird trotzdem weitegespendet.
var id = new Array(1234567,2345678,3456789); Hier ID des Spendenlinks angeben

var pid = GM_getValue("pid");
if (isNaN(pid)) pid = 0;
// Anzahl der schon gespendeten Spenden ermitteln
var spenden = document.getElementsByTagName("td")[0].innerHTML;
var spenden1 = spenden.split("<b>")[1];
var spenden = Math.floor(spenden1.split("</b>")[0]);
// Anzahl der wartenden Links ermitteln
var warten = document.getElementsByTagName("small")[0].innerHTML;
var warten1 = warten.split("<b>")[1];
var warten = Math.floor(warten1.split("</b>")[0]);

if (warten > smax) spenden = max - 1;

var x = pid + 1;
document.getElementsByTagName("div")[0].innerHTML += '<small><br /><br /><hr>Aktueller Spendenlink <a href="http://change.pennergame.de/change_please/'+id[pid]+'/">http://change.pennergame.de/change_please/'+id[pid]+'/</a> ['+x+'/'+id.length+']</small><br /><div></div>';

if (spenden < max) {
        if (warten > 0 ) {
                document.getElementsByTagName("div")[1].innerHTML = '<small><br /><b>Versuche zu Spenden</b></small>';
                GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://hamburg.pennerzone.de/spenden/spenden/',
                        onload: function(responseDetails) {
                                document.getElementsByTagName("div")[1].innerHTML = '<small><br /><b>Habe gespendet</b></small>';
                                }
                });
                }
        }
if (spenden >= max || warten == 0) {
        pid = pid + 1;
        if (pid > id.length - 1) pid = 0;
        GM_setValue("pid", pid);
        GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://hamburg.pennerzone.de/spenden/',
                headers: { "Content-type" : "application/x-www-form-urlencoded" },
                data: encodeURI("del=1&submit=ändern"),
                onload: function(e) {
                        if (warten == 0) document.getElementsByTagName("div")[1].innerHTML = '<small><br /><b>Kein Link frei:</b></small>';
                        else document.getElementsByTagName("div")[1].innerHTML = '<small><br /><b>Maximale Anzahl Spenden erreicht:</b></small>';
                        GM_xmlhttpRequest({
                                method: 'POST',
                                url: 'http://hamburg.pennerzone.de/spenden/',
                                headers: { "Content-type" : "application/x-www-form-urlencoded" },
                                data: encodeURI("link=http://change.pennergame.de/change_please/"+id[pid]+"/&submit=Eintragen"),
                                onload: function(e) {document.getElementsByTagName("div")[1].innerHTML += '<small><b> Spendenlink geändert!</b></small>';},
                        });
                        }

        });
        }

setTimeout("self.location.href='http://hamburg.pennerzone.de/spenden/stats.html'",10000);
