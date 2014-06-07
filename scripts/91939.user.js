// ==UserScript==
// @name           Autologin Script
// @include        *ptzplace.lockerz.com*
// @include        *tutudragon3.info*
// @include        *ptzplace.eu*
// @include        *lockerz.com*
// @author         Cracker744 from lockerztalk.ru
// ==/UserScript==
Email = "EMAIL";
Combination = "PASSWORD";

    window.setTimeout(function () {
        if (document.getElementsByTagName('input')[0]) {
            document.forms[0].elements[0].focus();
            document.forms[0].elements[0].value = Email;
            document.forms[0].elements[1].focus();
            document.forms[0].elements[1].value = Password;
        }
        if (document.getElementById('recaptcha_response_field')) {
            document.getElementById('recaptcha_response_field').focus();
            }
        }
    }, 100)