// ==UserScript==
// @name           Hide NotAlwaysRight Stupid Headers
// @version        0.03
// @author         Justin Wheeler
// @namespace      http://userscripts.org/users/86154
// @description    Hides the stupid editorial story titles on NotAlwaysRight.com, makes the store type and location larger.
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @include        http://*.notalwaysright.com/*
// @include        http://notalwaysright.com/*
// ==/UserScript==

var script_id      = 103163;
var script_version = 0.03;

var page_length = 0;

function clean_titles() {
    var new_page_length = document.getElementsByTagName('body')[0].innerHTML.length;

    if ( page_length == new_page_length ) {
        return;
    }

    page_length = new_page_length;

    var divs = document.getElementsByTagName('div');

    for ( var div in divs ) {
        if ( divs[div].className == 'post' ) {
            replace_header( divs[div] );
        }
    }

    return;
}

function replace_header( elem ) {
    var header = find_class( 'storytitle', elem.getElementsByTagName('h3')  );
    var title  = find_class( 'jobstyle',   elem.getElementsByTagName('div') );

    if ( header && title ) {
        var link = ( header.getElementsByTagName( 'a' ) )[0];

        var matches = title.innerHTML.match( /^([^|]+)\s*\|\s*([^|]+)/ );
        header.innerHTML = "<a href='" + link + "'>" + matches[1] + "</a>";
        title.innerHTML = matches[2];
    }

    return;
}

function find_class ( class, tags ) {
    for ( var tag in tags ) {
        // The people at notalwaysright.com aren't very good at HTML.
        if ( tags[ tag ].className == class || tags[ tag ].id == class ) {
            return tags[ tag ];
        }
    }

    return;
}

var timer;

window.addEventListener( 'load',   function () {                        timer = setTimeout( clean_titles, 1000 ) }, true );
window.addEventListener( 'scroll', function () { clearTimeout( timer ); timer = setTimeout( clean_titles,  500 ) }, true );

autoUpdate( script_id, script_version );
