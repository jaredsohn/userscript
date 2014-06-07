// ==UserScript==
// @name            xsidebar.cz - auto HASH updater
// @version         2.2
// @description     Po přihlášení na xchat.cz automaticky pošle hash xSidebaru
// @namespace       xsidebar.cz
// @homepage        http://Kub4jz.cz

// @include         http://xchat.centrum.cz/~$*/index.php
// @match           http://xchat.centrum.cz/~$*/index.php
// @include         http://xchat.centrum.cz/~$*/
// @match           http://xchat.centrum.cz/~$*/*
// ==/UserScript==

(function() {

    var url = location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);

    if (filename != 'index.php' && filename != '') {
        return false;
    }



    /************ Pouze pokud jsme na homepage ***************/

    GM_getValue = function(name, defaultValue) {
        var value = localStorage[name];
        return value == null ? defaultValue : JSON.parse(value);
    }



    GM_setValue = function(name, value) {
        localStorage[name] = JSON.stringify(value);
    }



    var userID = GM_getValue('userID');

    if (!userID || (url.indexOf(userID) > 0)) {
        var link = 'http://xsidebar.cz/hash/?' + location.href;

        var img = new Image(1,1);
        img.src = link;

        console.info('Sending hash to xsidebar.cz');
    }



    /************ Omezení na jednoho uživatele (FF only) ***************/

    addUserID = function() {
        var userID = prompt('Vložte vaše ID (číslo)');

        if (userID) {
            userID = parseInt(userID);

            if (userID >= 0) {
                GM_setValue('userID', userID);
                alert('Script byl nastaven pouze na jedno ID: ' + userID);
            } else {
                alert('Chyba: ID musí být číslo!');
            }
        }
    }


    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('Zadat user ID', addUserID);
    }

})();
