// ==UserScript==
// @name            Facebook Auto-Login
// @namespace       Facebook
// @description     Auto-login to Facebook using last submitted username/password when "Keep me logged in" is checked.
// @version         1.1.0
// @include         http://www.facebook.com/index.php*
// @include         http://www.facebook.com/login.php*
// @include         http://www.facebook.com/r.php?*
// @include         https://login.facebook.com/login.php*
// @include         https://www.facebook.com/login.php*
// @author          Kevin L. Sitze
// ==/UserScript==

//////////////////////////////////////////////////////////////////////
//
// This script will log you into Facebook automatically as
// long as you have checked "remember me" in the past.
//
// To disable the auto-login function simply uncheck the
// "Keep me logged in" checkbox before the counter drops to zero.
//
//////////////////////////////////////////////////////////////////////

var autologin = GM_getValue( "do_login" );

var lastTime = parseInt( GM_getValue( "lastTime", 0 ) );
var now = new Date();

if ( lastTime + 5000 > now.getTime() ) {
    GM_log( 'login failed: ' + ( lastTime + 5000 ) + " " + now.getTime() );
}

function get_login_button()
{
    var node_login_button = document.getElementById( 'login' );
    if ( node_login_button == undefined ) {
        node_login_button = document.getElementsByClassName( 'UIButton_Text' );
        if ( node_login_button.length != 0 ) {
            node_login_button = node_login_button[0];
        } else {
            node_login_button = undefined;
        }
    }
    if ( node_login_button != undefined && node_login_button.nodeName != 'INPUT' ) {
        node_login_button = undefined;
    }
    if ( node_login_button == undefined ) {
        GM_log( 'Warning: could not locate "Login" button' );
    } else {
        GM_log( 'successfully located "Login" button' );
        // node_login_button.style.color = 'red';
    }
    return node_login_button;
}

function get_remember_checkbox()
{
    var node_remember_checkbox = document.getElementById( "persistent" );
    if ( node_remember_checkbox == undefined ) {
        node_remember_checkbox = document.getElementById( "persistent_inputcheckbox" );
    }
    if ( node_remember_checkbox != undefined && node_remember_checkbox.nodeName != 'INPUT' ) {
        node_remember_checkbox = undefined;
    }
    if ( node_remember_checkbox == undefined ) {
        GM_log( 'Warning: could not locate "Keep me logged in" checkbox' );
    } else {
        GM_log( 'successfully located "Keep me logged in" checkbox' );
        // node_remember_checkbox.style.color = 'red';
    }
    return node_remember_checkbox;
}

function enter_field( id, gm_name )
{
    GM_log( 'enter_field("' + id + '", "' + gm_name + '") called' );
    var node = document.getElementById( id );
    if ( node != undefined ) {
        node.value = GM_getValue( gm_name, '' );
    } else {
        GM_log( 'Error: failed to locate "' + id + '" input field' );
    }
}

function enter_login_fields()
{
    GM_log( 'enter_login_fields event listener called' );

    var node_remember_checkbox = get_remember_checkbox();
    if ( node_remember_checkbox != undefined ) {
        node_remember_checkbox.checked = autologin;
    }

    if ( autologin ) {
        enter_field( "email", "username" );
        enter_field( "pass",  "password" );
    }

    return true;
}

function fetch_login_fields()
{
    GM_log( 'fetch_login_fields event listener called' );

    var node_remember_checkbox = get_remember_checkbox();
    if ( node_remember_checkbox != undefined ) {
        autologin = node_remember_checkbox.checked;
        GM_setValue( "do_login", autologin );
    }

    if ( autologin ) {
        var node_username = document.getElementById( "email" );
        if ( node_username != undefined ) {
            GM_setValue( "username", node_username.value );
        }

        var node_password = document.getElementById( "pass" );
        if ( node_password != undefined ) {
            GM_setValue( "password", node_password.value );
        }
    } else {
        GM_deleteValue( "username" );
        GM_deleteValue( "password" );
    }

    return true;
}

function do_autologin()
{
    GM_log( 'do_autologin: entry' );

    if ( autologin ) {
        GM_log( 'do_autologin: autologin is a go!' );
        var node_login_button = get_login_button();
        if ( node_login_button != undefined ) {
            var now = new Date();
            GM_setValue( "lastTime", now.getTime().toString() );
            GM_log( 'do_autologin: click!' );
            node_login_button.click();
        } else {
            GM_log( 'do_autologin: login button is missing?!?' );
        }
    }
}

var countdown = 5;
var loginText = undefined;
function display_countdown()
{
    GM_log( 'display_countdown: entry' );
    var node_login_button = get_login_button();
    if ( node_login_button != undefined ) {
        if ( loginText == undefined ) {
            loginText = node_login_button.value;
        }

        if ( autologin ) {
            node_login_button.value = loginText + ' ' + countdown.toString();
            if ( countdown != 0 ) {
                setTimeout( function () { display_countdown(); }, 1000 );
            } else {
                do_autologin();
            }
            countdown -= 1;
        } else {
            node_login_button.value = loginText;
        }
    }
}

window.addEventListener( "load", function() {

    setTimeout( function () { enter_login_fields(); }, 250 );

    var node_login_button = get_login_button();
    if ( node_login_button != undefined ) {
        node_login_button.addEventListener( "click", function () { fetch_login_fields(); }, true );
    }

    var node_remember_checkbox = get_remember_checkbox();
    if ( node_remember_checkbox != undefined ) {
        node_remember_checkbox.addEventListener( "click", function () {
            GM_deleteValue( "password" );
            autologin = false;
        }, true );
    }

    display_countdown();
}, true)
