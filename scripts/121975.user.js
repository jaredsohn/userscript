// ==UserScript==
// @name           Fredrik von Werder's vBulletin Auto refresh unread list 
// @version        1.0.4
// @description	   Puts a checkbox for automatic refresh of unread posts in vBulletin forums. Works in FireFox and Chrome.
// @include        */forumet/search.php*
// @include        */forum/search.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author         Fredrik von Werder
// ==/UserScript==
addFunction(reloada, false);
addFunction(setTimer, false);
addFunction(Get_Cookie, false);
addFunction(Set_Cookie, false);
addFunction(Delete_Cookie, false);
var pagetitleDiv = document.getElementById('pagetitle');
var div = document.createElement('div');
div.setAttribute('style', 'float:left;font-size:0.85em; margin-top:3px;width:400px;');
div.innerHTML = '<input type=checkbox id="chkAutoLoad" onchange="setTimer(true)" style="vertical-align:bottom;"/> Auto refresh';
div.innerHTML += '<span id="grease" style="display:none;margin-left:50px;"></span>';
// only on the list page
if (window.location.href.indexOf('search.php') > 0) {
    pagetitleDiv.appendChild(div);

    addScriptus("var timer = false;");
    addScriptus("var intervalId = 0;");
    addScriptus("var kaka = Get_Cookie('vb_refresh');");
    addScriptus("if(kaka != null && kaka == '1'  && window.location.href.indexOf('search.php')>0){setTimer(false);$('#chkAutoLoad').attr('checked','true');}");
}


function reloada() {
    var page = 'search.php?do=getnew&contenttype=vBForum_Post';

    $('#grease').html('Updating...');
    $('#grease').show();

    $('.blockbody').load(page + ' #searchbits', function () {
        $('#grease').hide();
    });
}
function setTimer(reloadDirectly) {
    if (!timer)
        timer = true;
    else
        timer = false;

    if (timer) {
        if(reloadDirectly)reloada();
        Set_Cookie("vb_refresh", "1");
        intervalId = setInterval("reloada()", 30000);
    }
    else {
        clearInterval(intervalId);
        Delete_Cookie('vb_refresh');
    }


}

function Set_Cookie(name, value) {
    var today = new Date();
    today.setTime(today.getTime());

    var expires = 30; //dagar;
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" + escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ";path=;domain=";
}

function Delete_Cookie(name) {
    if (Get_Cookie(name)) document.cookie = name + "= ;expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

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


function addScriptus(sc) {
    var script = document.createElement("script");
    script.textContent = sc;
    document.body.appendChild(script);
}

function addFunction(func, exec) {
    var script = document.createElement("script");
    script.textContent = (exec ? "(" : "") + func.toString() + (exec ? ")();" : "");
    document.body.appendChild(script);
}
