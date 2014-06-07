// ==UserScript==
// @name           Axabank prihlasovaci formular
// @namespace      axabank.local
// @description    Predvyplni obtezujici formular na webu axabank.cz
// @include        https://secure.axabank.cz/*
// @version       0.0.2
// ==/UserScript==

(
function() {

    // vlastni nastaveni promennych
    var uzivatelskeCislo    = '12345678';
    var datumNarozeniDen    = '01';
    var datumNarozeniMesic  = '01';
    var datumNarozeniRok    = '1970';


    // vyplneni formulare
    document.getElementById('userIFD').value  = uzivatelskeCislo;

    var form = document.forms.namedItem("frmLogon");
    form.elements.namedItem("flddate").value  = datumNarozeniDen;
    form.elements.namedItem("fldmonth").value = datumNarozeniMesic;
    form.elements.namedItem("fldyear").value  = datumNarozeniRok;

    var passwordElem = document.getElementById('userIFD2');

    // set keyboard focus to the password field.
    window.addEventListener('load',
        function() {
            passwordElem.focus();
            passwordElem.select();
        }, true);
    }()
);
