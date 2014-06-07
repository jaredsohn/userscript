// ==UserScript==
// @name       HRZ Autologin
// @namespace  http://lauinger-it.de
// @version    0.1
// @description  Fügt der TU Darmstadt HRZ Seite eine AutoLogin Funktion hinzu
// @match      https://sso.hrz.tu-darmstadt.de/login*
// @require	   http://code.jquery.com/jquery-2.0.3.min.js
// @copyright  2012+, You
// ==/UserScript==

(function(window){
    // Konfiguration, nicht wirklich sicher ;)
    var user = 'ab12cdef';
    var username = 'Max Mustermann';
    var password = atob('Passwort in Base64-Encoding');
    
    $(function(){
        // AutoLogin Form hinzufügen
        $('#content').append('<div id="hrz-autologin"><h1>HRZ AutoLogin</h1><hr /><p>Folgende TU-ID automatisch anmelden:<br /><br /><big><strong>' + 
                             user + '</strong> (' + username + ')</big><br /><br />Jetzt [RETURN] drücken oder auf den Button klicken.</p>' +
                             '<button id="hrz-autologin-login">Anmelden<br />(oder [RETURN])</button><button id="hrz-autologin-cancel">Abbrechen<br />(oder [ESC])</button></div>');
        $('#hrz-autologin').css({
            'width': '550px',
            'height': '300px',
            'position': 'absolute',
            'top': '100px',
            'left': '150px',
            'z-index': '9999',
            'border': '5px solid #0a0',
            'background-color': '#dfd',
            'box-shadow': '-8px 8px 3px #888',
            'padding': '20px'
        });
        $('#hrz-autologin h1').css({
            'color': '#000',
            'font-size': '35px'
        });
        $('#hrz-autologin hr').css({
            'border-color': '#0a0',
            'margin-bottom': '20px'
        });
        $('#hrz-autologin p').css({
            'color': '#000',
            'font-size': '14px'
        });
        $('#hrz-autologin button').css({
            'color': '#000',
            'font-size': '14px',
            'padding': '10px',
            'margin-right': '25px',
            'width': '250px'
        });
        // Button-Funktionalität registrieren
        $('#hrz-autologin-login').css({
            'border': '2px solid #0a0',
            'background-color': '#0a0',
            'color': '#fff',
            'font-weight': 'bold'
        }).click(function(){
            $('#username').val(user);
            $('#password').val(password);
            $('input[name=submit]').click();
        });
        $('#hrz-autologin-cancel').css({
            'border': '2px solid #f00',
            'background-color': '#f00',
            'color': '#fff',
            'font-weight': 'bold'
        }).click(function(){
            $('#hrz-autologin').hide();
        });
        // Tastendruck-Funktionalität registrieren
        $(document).keydown(function(e){
            // enter?
            if (e.keyCode === 13) {
                $('#hrz-autologin-login').click();
            }
            // escape?
            else if (e.keyCode === 27) {
                $('#hrz-autologin-cancel').click();
            }
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        });
    });
})(window);
