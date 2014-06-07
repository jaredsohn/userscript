// ==UserScript==
// @name           online-go.com autotools
// @namespace      http://userscripts.org/users/orivej
// @description    1. Login at online-go.com if not yet logged in.  2. Jump to mygames after login.  3. Sort active games by custom order.
// @include        http://www.online-go.com/*
// @include        http://online-go.com/*
// @include        http://www.online-go.org/*
// @include        http://online-go.org/*
// @icon           http://www.online-go.com/images/misc/online-go_icon.ico
// @author         Orivej Desh <orivej@gmx.fr>
// @version        2.0
// @released       2011-07-27
// @updated        2011-08-20
// @compatible     Greasemonkey
// ==/UserScript==

// Active games sort order.
// One of: you, opp, mix
var sort_order = "mix";

// That is, when the login form after logout is blank
var login = "";
var password = "";

// This option allows to stay logged in with multiple sessions
// It works only if all sessions were initiated with this option set
// Otherwise, only the latest session is kept logged in
// Mostly useful for notification and other bots which should not disturb main account
var multisession = true;

function login_and_redirect()
{
    var form = document.forms.namedItem("menuLogin");
    if (form && !document.getElementsByClassName("error")[0]) {
        if (login !== "") {
            form.elements.namedItem("email").value = login;
            form.elements.namedItem("password").value = password;
        }
        var redirect = document.createElement("input");
        redirect.type = "hidder";
        redirect.name = "redirect";
        redirect.value = "/games/mygames.php";
        form.appendChild(redirect);
        if (multisession) {
            form.action += "?robot=1";
        }
        form.submit();
    }
}

function on_load_login_and_redirect() {
    window.addEventListener("load", function () {
        // "load" listener is needed to let autofiller fill the form
        // not sure if setTimeout is needed inside "load" listener
        setTimeout(login_and_redirect, 0);
    }, false);
}

function customize_active_games_sort_order() {
    var query = document.location.search;
    if (query.indexOf("sort=") === -1) {
        if (query === "") {
            query += "?";
        }
        query += "sort=" + sort_order;
        document.location.search = query;
    }
}

function dispatch_location()
{
    switch (document.location.pathname) {
    case "/":
    case "/index.php":
    case "/login.php":
        on_load_login_and_redirect();
        break;
    case "/games/mygames.php":
        customize_active_games_sort_order();
        break;
    }
}

dispatch_location();

// ChangeLog
//
// 1.0  <2011-07-27>  Initial release
// 1.1  <2011-07-27>  Quadrupled @includes
// 1.2  <2011-07-27>  Added the @icon link
// 1.3  <2011-07-27>  Now rely on the built-in autofill by default
// 1.4  <2011-07-27>  Added a multisession option (useful e.g. for notification and other bots), disabled by default
// 1.5  <2011-08-03>  Simplified redirector, enabled multisession by default.  Redirection now works only after login, not after the first launch of the browser.
// 1.6  <2011-08-03>  Added RegExp @include for GreaseMonkey 0.9.8, restored protection from incerrect login
// 2.0  <2011-08-20>  Added the possibility to change default sort order of active games.  Defaults to mix.
