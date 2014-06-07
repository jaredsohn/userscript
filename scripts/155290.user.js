// ==UserScript==
// @name           Bierbuden Friends-Script
// @description    script for compact view of your active firends on the Bierbuden-Websites. [created by EifelDriver]
// @include        http://www.altbierbude.de/*
// @include        http://www.pilsbierbude.de/*
// @include        http://www.bockbierbude.de/*
// @include        http://www.weissbierbude.de/*
// @version        1.0
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jq=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    // Note, jQ replaces $ to avoid conflicts. 
    
    // edit this list zu manage your friends
    var myFriends = new Array( 'aaa', 'bbb', 'ccc',
                               'ddd', 'eee', 'fff', '... );

    function addMyFriendsON() {
        var userName  = jq(this).text();
        if (jq.inArray(userName, myFriends) > -1 ) {
            jq('#myfriendson').append('<span style="color:#000000">'+userName+'</span> &nbsp; ');
        }
    }

    function addMyFriendsTS() {
        var userName  = jq(this).text();
        if (jq.inArray(userName, myFriends) > -1 ) {
            jq('#myfriendsts').append('<span style="color:#000000">'+userName+'</span> &nbsp; ');
        }
    }

    function addMyFriendsSrv() {
        var userName  = jq(this).text();
        if (jq.inArray(userName, myFriends) > -1 ) {
            jq('#myfriendssrv').append('<span style="color:#000000">'+userName+'</span> &nbsp; ');
        }
    }

    
    // ------    
    jq('#rightcol-broad').prepend('Freunde online: &nbsp;<div id="myfriendson"></div><br />' +
                                  'Freunde im TS: &nbsp;<div id="myfriendsts"></div><br />' +
                                  'Freunde auf Server: &nbsp;<div id="myfriendssrv"></div><br />');
    // check friends online
    jq('#lvu_userlist a').each( addMyFriendsON );
    // check friends in TS
    jq('#ts3modul li ul li').each( addMyFriendsTS );
    // check friends on servers
    jq('#rightcol-broad #v1 a,#rightcol-broad #v2 a,#rightcol-broad #v3 a,' +
       '#rightcol-broad #v4 a,#rightcol-broad #v5 a,#rightcol-broad #v6 a,' +
       '#rightcol-broad #v7 a,#rightcol-broad #v8 a,#rightcol-broad #v9 a').each( addMyFriendsSrv );
}


// load jQuery and execute the main function
addJQuery(main);