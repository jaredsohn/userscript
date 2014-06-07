// ==UserScript==
// @name		PG Angriffswarner
// @namespace		http://javan.de
// @require		http://javan.de/tools/live/javanzentrale_require.js
// @description		Warnt auch akustisch vor Angriffen und kann ausweichen.
// @author		Javan
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_openInTab
// @include		*pennergame*
// @include		*bumrise*
// @version		2.2
// @updateURL		http://userscripts.org/scripts/source/160435.user.js
// @downloadURL		http://userscripts.org/scripts/source/160435.user.js
// @icon		http://javan.de/tools/live/favicon.png
// ==/UserScript==
function seconds2time(seconds){var hours=Math.floor(seconds/3600);var minutes=Math.floor((seconds-(hours*3600))/60);var seconds=seconds-(hours*3600)-(minutes*60);var time="";if(hours!=0){time=hours+":"}if(minutes!=0||time!==""){minutes=(minutes<10&&time!=="")?"0"+minutes:String(minutes);time+=minutes+":"}if(time===""){time=seconds+"s"}else{time+=(seconds<10)?"0"+seconds:String(seconds)}return time}
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (typeof haystack[i] == 'object') {
            if (arrayCompare(haystack[i], needle)) return true;
        } else {
            if (haystack[i] == needle) return true;
        }
    }
    return false;
}


//var allowed_citys = ['mu_DE'];
var city = document.getElementsByTagName('head')[0].innerHTML.split('language" content="')[1].split('"')[0];
var username = document.getElementsByClassName('user_name')[0];
var logedin = true;
if (username == null || username == '') logedin = false; // Damit das Script nur arbeitet, wenn man eingeloggt ist
var scripturl = 'http://userscripts.org/scripts/source/160435.user.js';
var identifer = city + username + "fightalarm";
var link = 'http://' + window.location.host;



if (GM_getValue(identifer + "angriffswarnerintervall") == null) {
    GM_setValue(identifer + "angriffswarnerintervall", '10000');
}
if (GM_getValue(identifer + "aktivornotangriffswarner") == null) {
    GM_setValue(identifer + "aktivornotangriffswarner", 'true');
}
if (GM_getValue(identifer + "aktivornotwarnton") == null) {
    GM_setValue(identifer + "aktivornotwarnton", 'false');
}
if (GM_getValue(identifer + "aktivornotausweichen") == null) {
    GM_setValue(identifer + "aktivornotausweichen", 'false');
}
if (GM_getValue(identifer + "aktivornotwutradar") == null) {
    GM_setValue(identifer + "aktivornotwutradar", 'true');
}

function wahleaus(input) {
    if (input == true)
        return 'checked';
}
function spielemusik(){
var mp3_datei = 'http://javan.de/tools/live/alarm.mp3';
if (GM_getValue(identifer + "aktivornotwarnton") == true){
	var soundSrc, playerSrc;
	soundSrc = mp3_datei;
	playerSrc = "http://javan.de/tools/live/mediaplayer.swf"; // Danke für den Player! @ infowars.com

    var player = document.createElement('embed');
    player.src = playerSrc;
    player.setAttribute("style", "visibility:hidden;");
    player.setAttribute('id', 'timer_sound');
    player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
    document.body.appendChild(player);
}
}
// ----------------- main ---------------------------

//if (inArray(city, allowed_citys) && logedin != false) {
    var wutradarMenu = document.createElement("div");
    var ausgabebereich = document.getElementsByTagName('body')[0];

    wutradarMenu.style.position = "fixed";
    wutradarMenu.style.borderRadius = "2px";
    wutradarMenu.style.zIndex = 99;
    wutradarMenu.style.display = "block";
    wutradarMenu.style.width = "150px";
    wutradarMenu.style.opacity = 0.90;
    wutradarMenu.style.bottom = "+10px";
    wutradarMenu.style.left = "+10px";
    wutradarMenu.style.backgroundColor = "#E7EBF2";
    wutradarMenu.style.border = "1px solid #6B84B4";
    wutradarMenu.style.padding = "3px";
    wutradarMenu.style.fontSize = "12px";
    wutradarMenu.style.textAlign = "left";

    ausgabebereich.appendChild(wutradarMenu);

    wutradarMenu.innerHTML = '<span onclick="javascript:document.getElementById(\'ifangriffswarner\').style.display = \'inline\';" style="cursor:pointer;"><input type="checkbox"  name="aktivornotangriffswarner" ' + wahleaus(GM_getValue(identifer + "aktivornotangriffswarner")) + ' /> <img src="http://static.pennergame.de/img/pv4/icons/att.gif" /> Angriffswarner</span> <span id="angriffswarner_countdown"></span>' +
        '<div style="display:none;" id="ifangriffswarner">' +
        '<div style="padding-left:20px;"><select name="angriffswarnerintervall"><option value="10000" disabled>Nachschau Intervall</option><option value="5000">5 Sekunden</option><option value="10000">10 Sekunden</option><option value="20000">20 Sekunden</option><option value="30000">30 Sekunden</option><option value="50000">50 Sekunden</option><option value="90000">1min 30s</option><option value="180000">3 min</option><option value="300000">5 min</option></select>' +
        '</div><div style="padding-left:20px;"><input type="checkbox"  name="aktivornotwarnton" ' + wahleaus(GM_getValue(identifer + "aktivornotwarnton")) + ' /> Warnton aktivieren' +
        '</div><div style="padding-left:20px;"><input type="checkbox"  name="aktivornotausweichen" ' + wahleaus(GM_getValue(identifer + "aktivornotausweichen")) + ' /> Auto. Ausweichen' +
       // '</div><div style="padding-left:20px;"><input type="checkbox"  name="aktivornotwutradar"' + wahleaus(GM_getValue(identifer + "aktivornotwutradar")) + ' /> Wutradar absenden' +
        '</div></div><div id="angriffswarnerlog" style="padding-top:15px;text-align:left;font-size:10px;color:#313131;"></div>';

	var log = document.getElementById('angriffswarnerlog');

    document.getElementsByName("aktivornotangriffswarner")[0].value = GM_getValue(identifer + "aktivornotangriffswarner");
    document.getElementsByName("aktivornotwarnton")[0].value = GM_getValue(identifer + "aktivornotwarnton");
    document.getElementsByName("aktivornotausweichen")[0].value = GM_getValue(identifer + "aktivornotausweichen");
   // document.getElementsByName("aktivornotwutradar")[0].value = GM_getValue(identifer + "aktivornotwutradar");
    document.getElementsByName("angriffswarnerintervall")[0].value = GM_getValue(identifer + "angriffswarnerintervall");

    wutradarMenu.addEventListener('mouseover', function speichern() {
        GM_setValue(identifer + "aktivornotangriffswarner", document.getElementsByName("aktivornotangriffswarner")[0].checked);
        GM_setValue(identifer + "aktivornotwarnton", document.getElementsByName("aktivornotwarnton")[0].checked);
        GM_setValue(identifer + "aktivornotausweichen", document.getElementsByName("aktivornotausweichen")[0].checked);
       // GM_setValue(identifer + "aktivornotwutradar", document.getElementsByName("aktivornotwutradar")[0].checked);
        GM_setValue(identifer + "angriffswarnerintervall", document.getElementsByName("angriffswarnerintervall")[0].value);
    }, false);

    
	if(GM_getValue(identifer + "aktivornotangriffswarner") == true)
		checkIncomingFights();
//}
// ---------------------------------------------------

function checkIncomingFights() { // überprüft ob eingehende Kämpfe vorhanden sind
	// ----------------- main ---------------------------
	
	GM_xmlhttpRequest({
            method: 'GET',
            url: link + '/fight/?microtime=' + microtime(),
            onload: function (responseDetails) {

                var seiteninhalt = responseDetails.responseText;
				var anzahlEingehende = seiteninhalt.split('warning.gif').length-1;

				//alert(anzahlEingehende);
                if (anzahlEingehende > 0)
					log.innerHTML += gebezeit() + ' ACHTUNG ' + anzahlEingehende + ' eingehender Kampf!<br />';
					
				if(anzahlEingehende != parseInt(GM_getValue(identifer + "anzahlEingehende", 0))) {
                    
                        spielemusik();
						GM_setValue(identifer + "anzahlEingehende", anzahlEingehende);
                    
					// ----------------- hat wut ? ---------------------------
					
					/*if (GM_getValue(identifer + "aktivornotwutradar") == true) { // Die Funktion ist eine extra Anfertigung für jemanden
						habenEingehendeWut(seiteninhalt);
					}
					*/
					// ---------------------------------------------------
                }
                if (GM_getValue(identifer + "aktivornotausweichen") == true) {
                    if (seiteninhalt.search(/">Ausweichen<\/a>/) != -1) {

                        var name = seiteninhalt.split("doEvade('")[1].split("', ")[0];
                        var content2 = seiteninhalt.split("doEvade('")[1].split("');")[0];
                        var evadeid = content2.split("', '")[2].split("');")[0];

                        log.innerHTML += gebezeit() + ' weicht ' + name + ' aus<br />';
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: link + '/fight/evade/' + evadeid + '/',
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            data: encodeURI(),
                            onload: function () {
                                log.innerHTML += gebezeit() + ' hat ausgewichen ID: ' + evadeid + '<br />';
                            }
                        });
                    }
                }
            }
        });
	
	
	
	
	// ---------------------------------------------------
	var beobachten_maximal = parseInt(GM_getValue(identifer + "angriffswarnerintervall"))+4000;
	var beobachten_mindestens = parseInt(GM_getValue(identifer + "angriffswarnerintervall"));
	var countdown_sekunden = parseInt(beobachten_mindestens.toString().substring(0, beobachten_mindestens.toString().length - 3));
    log.innerHTML = gebezeit() + ' schaut nach eingehenden K&auml;mpfen<br />';
    setTimeout(function () {
        window.clearInterval(cnt);checkIncomingFights();
    }, Math.floor(Math.random() * (Number(beobachten_maximal) - Number(beobachten_mindestens))) + Number(beobachten_mindestens));
	
	cnt = window.setInterval(function(){
	if(countdown_sekunden == 0)
		window.clearInterval(cnt);
	
	document.getElementById('angriffswarner_countdown').innerHTML = ' - ' + seconds2time(countdown_sekunden);
	countdown_sekunden--;
	}, 1000);
}


	
	

// Copyright (c) by Javan_xD
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.