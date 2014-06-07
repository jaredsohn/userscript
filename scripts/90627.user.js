// ==UserScript==
// @name           Tra
// @author         HS368
// @email          H.Saleh.86@gmail.com
// @namespace      HS368.Tra
// @include        http://*.travian*.*/*.php*
// @version        1
// ==/UserScript==

var urlpath = location.href.substring(location.href.indexOf(location.pathname));

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

function autoraidmethod() {
    if ((urlpath.indexOf('/a2b.php?z=') > -1) && (urlpath.indexOf('&c=') > -1) && (urlpath.indexOf('&t') > -1)) {
        try {
            var vars = urlpath.split('&');
            for (i = 2; i < vars.length; i++) {
                as = vars[i].split('=');
                if (document.getElementsByName(as[0])[0].value != as[1]) {
                    document.title = 'No Troop';
                    timeoutref(60);
                    return;
                }
            }
            document.getElementById('btn_ok').click();
            timeoutref(30);
            return;
        } catch (err) {
            location.reload();
        }
    } else if (urlpath == '/a2b.php') {
        try {
            if ((getElementsByClassName('error', 'p').length == 1) || (!document.getElementById('btn_ok'))) {
                window.close();
                return;
            }
            document.getElementById('btn_ok').click();
            timeoutref(30);
            return;
        } catch (err) {
            location.reload();
        }
    }

}

function checktimer() {
    if (enabelautoraid()) {
        setTimeout("autoraidmethod();", 100);
        autoraiditem.textContent = "حمله اتوماتیک: فعال";
    } else {
        setTimeout("checktimer();", 5000);
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
        autoraidmethod();
    } else {
        checktimer();
    }
}

window.addEventListener('load', onloadpage(), false);