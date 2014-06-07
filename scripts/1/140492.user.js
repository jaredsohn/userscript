// ==UserScript==
// @name           Saltvattensguiden - extended features
// @version        1.0.17
// @namespace      http://www.bhelpuri.net/GreaseMonkey/SVG
// @description	   Utökade funktioner för svg.  - automatisk uppdatering av olästa poster. - små design och text förbättringar. Nyhet - Deltagit snabbknapp och Markera som SÅLD! Testat i FF och Chrome och Trixie (IE)
// @exclude        http://www.saltvattensguiden.se/forumet/newthread__not_using_exclude_now*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author         Fredrik von Werder
// @include        http://www.saltvattensguiden.se/forumet/*
// ==/UserScript==

addFunction(init, false);
addFunction(reloada, false);
addFunction(setTimer, false);
addFunction(Get_Cookie, false);
addFunction(Set_Cookie, false);
addFunction(Delete_Cookie, false);

var pagetitleDiv = document.getElementById('pagetitle');
var div = document.createElement('div');
div.setAttribute('style', 'float:left;font-size:0.85em; margin-top:3px;width:400px;');
div.innerHTML = '<input type=checkbox id="chkAutoLoad" onchange="setTimer(true)" style="vertical-align:bottom;"/> Automatisk uppdatering';
div.innerHTML += '<span id="grease" style="display:none;margin-left:50px;"></span>';
init();

// only on the list page
if (window.location.href.indexOf('search.php') > 0) {
    pagetitleDiv.appendChild(div);

    addScriptus("var timer = false;");
    addScriptus("var intervalId = 0;");
    addScriptus("var kaka = Get_Cookie('sg_refresh');");
    addScriptus("if(kaka != null && kaka == '1'  && window.location.href.indexOf('search.php')>0){setTimer(false);$('#chkAutoLoad').attr('checked','true');}");
}

// only on advertise create ad page
if ($('#prefixfield').length > 0) {
    advertising();
}

marksold();

// Generic layout styff for all pages
function init() {
    //$('.bannerBox').hide();
    //$('#header').hide();
    //$('#pagetitle h1').hide();
    //$('#pagetitle p').hide();
    //$('#topBar').css('height','31px');
    $('#pagination_top').css('top','-1.7em');

// Deltagit
    try {
        var uid = "";
        if ($('.welcomelink').length > 0) {
            var href = $('.welcomelink a').attr('href');
            var pattern = /[0-9]+/;
            var matches = href.match(pattern);
            uid = matches;
            var link = "http://www.saltvattensguiden.se/forumet/search.php?do=finduser&contenttype=vBForum_Post&showposts=1&userid=" + uid;
            $('#navtabs').append('<li><a class="navtab" href="' + link + '">Deltagit</a></li>');
        }
    }
    catch (e) {
    }
}

// Mark as Sold
function marksold() {
    try {
        var uid = "";
        var tit = $(document).attr('title');
        
        if ($('ul li a[href^="sold.php"]').length > 0 && tit.indexOf("SÅLD") == -1){
            var href = $('ul li a[href^="sold.php"]').attr('href');
            var pattern = /[0-9]+/;
            var matches = href.match(pattern);
            tid = matches;
            var link = "http://www.saltvattensguiden.se/forumet/sold.php?do=marksold&t=" + tid;
            $('#pagetitle h1').append('<span style="float:right;padding-right:10px;"><b><a href="' + link + '" style="color:red;">&raquo; Markera som SÅLD</a></b></span>');
        }
    }
    catch (e) {
    }
}

function advertising() {
    $('#subject').after('<div style="padding:5px 0 0 10px; font-style:italic;float:left;color:red;">Ange gärna geografisk ledtråd i rubriken</div>');
}

function reloada() {
    var page = 'http://www.saltvattensguiden.se/forumet/search.php?do=getnew&contenttype=vBForum_Post';

    $('#grease').html('Uppdaterar...');
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
        Set_Cookie("sg_refresh", "1");
        intervalId = setInterval("reloada()", 60000);
    }
    else {
        clearInterval(intervalId);
        Delete_Cookie('sg_refresh');
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
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ";path=/;domain=www.saltvattensguiden.se";
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