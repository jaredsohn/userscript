// ==UserScript==
// @name        Battlefield Heroes Daily Claw
// @namespace   	http://javan.de
// @require			http://javan.de/tools/live/javanzentrale_require.js
// @description 	Battlefield Heroes Daily Claw
// @author		Javan
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_openInTab
// @include		*
// @version		1
// @updateURL		http://userscripts.org/scripts/source/162511.user.js
// @downloadURL		http://userscripts.org/scripts/source/162511.user.js
// @icon		http://javan.de/tools/live/favicon.png
// ==/UserScript==
function setCookie(name, value, days, domain) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function eraseCookieFromAllPaths(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;' + pathCurrent + ';';
    }
}



// You have to change a setting before use this script.
//    1. Open about:config page.
//    2. check a value of dom.allow_scripts_to_close_windows .
//    3. Set it's value as true.

var url = window.location;
var ln = 'en';
var aim = 'http://www.battlefieldheroes.com/' + ln + '/script';

email = new Array();
password = new Array();
heroid = new Array();


email[0] = 'acc1@javan.de';
email[1] = 'acc2@javan.de';
password[0] = 'asd123456';
password[1] = 'asd123456';
heroid[0] = '770343847';
heroid[1] = '333996743';



function openheroes() { //86400000
var d = new Date();
	var month=new Array();
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	var n = month[d.getMonth()];
	var clawtime = '10:01';
	var ts = new Date("" + n + " " + d.getDate() + ", " + d.getFullYear() + " " + clawtime).getTime();
	if (parseInt(GM_getValue('lastclaw', '0')) <= (new Date().getTime()) && parseInt(ts) <= (new Date().getTime()) && parseInt(ts) >= parseInt(GM_getValue('lastclaw', '0'))) // Checks after 10 o'clock
    //if (parseInt(GM_getValue('lastclaw', '0')) + 86400000 <= (new Date().getTime())) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
        try {
            GM_setValue('lastclaw', new Date().getTime() + '');
            GM_openInTab(aim);

        } catch (err) {}
    }
}

openheroes();


function holeclaw(AcNr) {
    if (parseInt(GM_getValue('lastclaw', '0')) - 20000 <= (new Date().getTime())) 
    {


        try {
            //alert('entscheidet ob einloggen oder nicht');
            var login = document.getElementsByName('mail')[0];

            if (login != null) {
                //alert('sollte einloggen');
                document.getElementsByName('mail')[0].value = email[AcNr];
                document.getElementsByName('password')[0].value = password[AcNr];
                document.forms[1].submit();


            } else {

			//	GM_openInTab('http://www.battlefieldheroes.com/' + ln + '/dailyspinner/initializeSpinData?rand=201894');
				GM_openInTab('http://www.battlefieldheroes.com/' + ln + '/dailyspinner/getSpinBundleByHeroId?heroId=' + heroid[AcNr] + '&rand=431414');
                GM_openInTab('http://www.battlefieldheroes.com/' + ln + '/dailyspinner/getSpinPrizeItem?heroId=' + heroid[AcNr] + '&rand=880978');


            }

            window.setTimeout(function () {
                window.close();
            }, 5000);

        } catch (err) {}







    }
}
if (parseInt(GM_getValue('lastclaw', '0')) - 20000 <= (new Date().getTime()))
{
if (window.location.href.indexOf('battlefieldheroes.com/' + ln + '/script') > -1) {



    window.setTimeout(function () {
        holeclaw(0);
    }, 500);


}
if (window.location.href.indexOf('battlefieldheroes.com/' + ln + '/dailyspinner') > -1) {

	window.setTimeout(function () {
	eraseCookieFromAllPaths("magma"); // Logout
	}, 1000);
    window.setTimeout(function () {
        window.close();
    }, 2000);

}
}
// Copyright (c) by Javan_xD
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.