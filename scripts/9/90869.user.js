// ==UserScript==
// @name           Tra
// @author         HS368
// @email          H.Saleh.86@gmail.com
// @namespace      HS368.Tra
// @include        http://*.travian*.*/*.php*
// @version        1
// ==/UserScript==

var urlpath = location.href.substring(location.href.indexOf(location.pathname));
var raidopened = new Array();
var farmlinkindex = 0;
var raidopenedcount = 0;

Array.prototype.findIndex = function (value, firstindex) {
    var ctr = undefined;
    if (!firstindex || firstindex < 0 || firstindex > this.length) {
        firstindex = 0;
    }
    for (var i = firstindex; i < this.length; i++) {
        // use === to check for Matches. ie., identical (===), ;
        if (this[i] == value) {
            return i;
        }
    }
    return ctr;
};

Array.prototype.findIndexq = function (value, firstindex) {
    var ctr = undefined;
    if (!firstindex || firstindex < 0 || firstindex > this.length) {
        firstindex = 0;
    }
    for (var i = firstindex; i < this.length; i++) {
        // use === to check for Matches. ie., identical (===), ;
        if (this[i].substring(0, value.length) == value) {
            return i;
        }
    }
    return ctr;
};

function GetUserId() {
    if (side_navi) {
        s0 = side_navi.innerHTML;
        if (s0.indexOf('spieler.php?uid=') < -1) { return; }
        s0 = s0.substring(s0.indexOf('spieler.php?uid=') + 16);
        s0 = s0.substring(0, s0.indexOf('"'));
        return s0;
    }
    return;
}

function GetServerName() {
    var serverName = window.location.href;
    serverName = serverName.substring(serverName.indexOf('/') + 2);
    serverName = serverName.substring(0, serverName.indexOf('/'));
    return serverName;
}

function getElementsByClassName(className, tag, elm) {
    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (testClass.test(current.className)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}

function Set_Cookie(name, value, expires, path, domain, secure) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" + escape(value) +
((expires) ? ";expires=" + expires_date.toGMTString() : "") +
((path) ? ";path=" + path : "") +
((domain) ? ";domain=" + domain : "") +
((secure) ? ";secure" : "");
}

// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function Get_Cookie(check_name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split('=');


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == check_name) {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return null;
    }
}

// this deletes the cookie when called
function Delete_Cookie(name, path, domain) {
    if (Get_Cookie(name)) document.cookie = name + "=" +
((path) ? ";path=" + path : "") +
((domain) ? ";domain=" + domain : "") +
";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

var scriptcookiename = GetServerName() + GetUserId() + 'AutoRaid';

function enabelautoraid(e) {
    if (e == true) {
        Set_Cookie(scriptcookiename, '1');
    } else if (e == false) {
        Set_Cookie(scriptcookiename, '0');
    } else if (Get_Cookie(scriptcookiename) == 1) {
        return true;
    } else {
        return false;
    }
}

function timeoutref(sec) {
    if (!enabelautoraid()) {
        var toh = document.getElementById('timeoutref');
        if (toh) {
            toh.textContent = "";
        }
        return;
    }
    if (sec >= 0) {
        try {
            var toh = document.getElementById('timeoutref');
            if (!toh) {
                toh = document.createElement('div');
                toh.setAttribute('id', 'timeoutref');
                toh.setAttribute('style', 'font-size:8pt; font-weight: bold; color: green');
                document.getElementById('side_navi').appendChild(toh);
            }
            toh.textContent = "Refresh: " + sec + " sec";
            sec--;
            setTimeout("timeoutref(" + sec + ");", 1000);
        } catch (e) {
            location.reload();
        }
    } else {
        location.reload();
    }
}

function timeouttoback(sec, rep) {
    if (!enabelautoraid()) {
        var toh = document.getElementById('timeoutref');
        if (toh) {
            toh.textContent = "";
        }
        return;
    }
    if (sec >= 0) {
        try {
            var toh = document.getElementById('timeoutref');
            if (!toh) {
                toh = document.createElement('div');
                toh.setAttribute('id', 'timeoutref');
                toh.setAttribute('style', 'font-size:8pt; font-weight: bold; color: green');
                document.getElementById('side_navi').appendChild(toh);
            }
            toh.textContent = "go back: " + sec + " sec";
            sec--;
            setTimeout("timeoutref(" + sec + "," + rep + ");", 1000);
        } catch (e) {
            location.replace(rep);
        }
    } else {
        location.replace(rep);
    }
}

function autoraidmethod() {
    if ((urlpath.indexOf('/a2b.php?z=') > -1) && (urlpath.indexOf('&c=') > -1) && (urlpath.indexOf('&t') > -1)) {
        if (!window.opener) {
            return;
        }
        try {
            var vars = urlpath.split('&');
            for (i = 2; i < vars.length; i++) {
                as = vars[i].split('=');
                if (document.getElementsByName(as[0])[0].value != as[1]) {
                    document.title = 'No Troop';
                    timeoutref(180);
                    return;
                }
            }
            document.getElementsByName("c")[parseInt(vars[1].split('=')[1]) - 2].checked = true;
            raidinfo = urlpath.split('?')[1];
            raidindex = window.opener.raidopened.findIndex(raidinfo);
            if (raidindex == undefined) {
                window.opener.raidopened.push(raidinfo);
            }
            document.getElementById('btn_ok').click();
            timeoutref(30);
            return;
        } catch (err) {
            location.reload();
        }
    } else if (urlpath == '/a2b.php') {
        if (!window.opener) {
            return;
        }
        try {
            if ((getElementsByClassName('error', 'p').length == 1) || (!document.getElementById('btn_ok'))) {
                window.opener.raidopenedcount = Math.max(window.opener.raidopenedcount - 1, 0);
                window.close();
                return;
            }
            a2bform = document.forms[0];
            raidinfo = 'z=' + a2bform.kid.value + '&c=' + a2bform.c.value;
            for (i = 1; i <= 11; i++) {
                tn = eval('a2bform.t' + i + '.value');
                if (tn && tn > 0) {
                    raidinfo += '&t' + i + '=' + tn;
                }
            }
            if (window.opener.raidopened.findIndexq('z=' + a2bform.kid.value) != undefined) {
                raidindex = window.opener.raidopened.findIndex(raidinfo);
                if (raidindex == undefined) {
                    timeouttoback(120, '/a2b.php?' + raidinfo);
                    return;
                }
                window.opener.raidopened.splice(raidindex, 1);
                document.getElementById('btn_ok').click();
                timeoutref(30);
            }
            return;
        } catch (err) {
            location.reload();
        }
    } else if (urlpath == '/karte.php') {
        var ars = document.getElementById('ars');
        if (!ars) {
            ars = document.createElement('div');
            ars.setAttribute('id', 'ars');
            ars.setAttribute('dir', 'ltr');
            document.getElementById('side_navi').appendChild(ars);
        }
        ars.innerHTML = '<table cellpadding="3" cellspacing="0">' +
                        '<tr>First Link: <input id="ftraid" type="text" value="0" style="width:25%"></tr>' +
                        '<tr>Tab Count: <input id="traid" type="text" value="20" style="width:25%"></tr>' +
                        '<tr><input id="tyraid" type="checkbox">Yellow Report</tr>' +
                        '<tr><input id="trraid" type="checkbox">Repeat</tr>' +
                        '<tr><button id="itraidbutton" onclick="farmlinkindex = parseInt(ftraid.value); onclickstartraid();">Start Raid</button></tr>' +
                        '</table>';
    } else if (urlpath == '/build.php?id=39&tt=100') {
        var ars = document.getElementById('ars');
        if (!ars) {
            ars = document.createElement('div');
            ars.setAttribute('id', 'ars');
            ars.setAttribute('dir', 'ltr');
            document.getElementById('side_navi').appendChild(ars);
        }
        ars.innerHTML = '<table cellpadding="3" cellspacing="0">'+
                        '<tr>First Link: <input id="ftraid" type="text" value="0" style="width:25%"></tr>' +
                        '<tr>Tab Count: <input id="traid" type="text" value="20" style="width:25%"></tr>' +
                        '<tr><input id="tyraid" type="checkbox">Yellow Report</tr>' +
                        '<tr><input id="trraid" type="checkbox">Repeat</tr>' +
                        '<tr><button id="itraidbutton" onclick="farmlinkindex = parseInt(ftraid.value); onclickstartraid2();">Start Raid</button></tr>' +
                        '</table>';
    }
}

function onclickstartraid2() {
    itraidbutton.disabled = true;
    if (raidopenedcount > 0) {
        setTimeout('onclickstartraid2();', 1000);
        return;
    }
    for (i = 0; i < parseInt(traid.value); i++) {
        if (farmlinkindex >= raidList.tBodies[0].rows.length) {
            farmlinkindex = 0;
            if (!trraid.checked) {
                return;
            }
        }
        try {
            var orow = raidList.tBodies[0].rows[farmlinkindex];
            reportclassinfo = orow.cells[5].childNodes[1].getAttribute('class');
            if ((reportclassinfo == 'iReport iReport1') || ((tyraid.checked) && (reportclassinfo == 'iReport iReport2'))) {
                open(orow.cells[1].getElementsByTagName('a')[0].href);
                raidopenedcount++;
            }
        } catch (e) {

        }
        farmlinkindex++;
    }
    ftraid.value = farmlinkindex;
    setTimeout('onclickstartraid2();', 1000);
}

function onclickstartraid() {
    itraidbutton.disabled = true;
    if (raidopenedcount > 0) {
        setTimeout('onclickstartraid();', 1000);
        return;
    }
    for (i = 0; i < parseInt(traid.value); i++) {
        if (farmlinkindex >= raidFavs.tBodies[0].rows.length) {
            farmlinkindex = 0;
            if (!trraid.checked) {
                return;
            }
        }
        try {
            var orow = raidFavs.tBodies[0].rows[farmlinkindex];
            reportclassinfo = orow.cells[3].childNodes[1].getAttribute('class');
            if ((reportclassinfo == 'iReport iReport1') || ((tyraid.checked) && (reportclassinfo == 'iReport iReport2'))) {
                open(orow.cells[1].getElementsByTagName('a')[0].href);
                raidopenedcount++;
            }
        } catch (e) {

        }
        farmlinkindex++;
    }
    ftraid.value = farmlinkindex;
    setTimeout('onclickstartraid();', 1000);
}

function checktimer() {
    if (enabelautoraid()) {
        setTimeout("autoraidmethod();", 100);
        autoraiditem.textContent = "حمله اتوماتیک: فعال";
    } else {
        setTimeout("checktimer();", 3000);
        autoraiditem.textContent = "حمله اتوماتیک: غیر فعال";
    }
}

function onclickitem() {
    enabelautoraid(!enabelautoraid());
    if (enabelautoraid()) {
        autoraiditem.textContent = "حمله اتوماتیک: فعال";
        setTimeout("autoraidmethod();", 100);
    } else {
        autoraiditem.textContent = "حمله اتوماتیک: غیر فعال";
        checktimer();
    }
}

function onloadpage() {
    sta = document.createElement('p');
    var s0 = "<a id='autoraiditem' onclick='onclickitem();'>";
    if (enabelautoraid()) {
        s0 += "حمله اتوماتیک: فعال";
    } else {
        s0 += "حمله اتوماتیک: غیر فعال";
    }
    s0 += "</a>";
    sta.innerHTML = s0;
    sndiv = document.getElementById('side_navi');
    if (!sndiv) {
        setTimeout("location.reload();", 3000);
        return;
    }
    sndiv.appendChild(sta);
    if (enabelautoraid()) {
        setTimeout("autoraidmethod();", 100);
    } else {
        setTimeout("checktimer();", 100);
    }
}

window.addEventListener('load', onloadpage(), false);
