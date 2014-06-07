// Mailinator Creator 0.4 (updated 2008)
// Copyright (c) 2008 Todd James
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
//
// ==UserScript==
// @name           Mailinator Creator 0.4 v2008 UPDATED
// @namespace      http://userscripts.org
// @description    Inserts a random Mailinator address into a form when the user presses F2. An image that links to the random addresss inbox is added next to the input box. UPDATED !!!! WORKS WITH NEW MAILINATOR CODE
// @homepage       http://userscripts.org
// @include        *//
// Based on Mailinator Creator GM extension at 
// http://userscripts.org/people/3628
// ==/UserScript==

(function() {
    var focusedElement = null;
    var randomEmail = '';

    function isMailinated(element) {
        if (element.getAttribute('mailinator') == 'true') {
            return true;
        }

        return false;
    }

    function isEmailInput(element) {
        if ((element.tagName.toLowerCase() == 'input') && (element.type.toLowerCase() == 'text')) {
            return true;
        }

        return false;
    }

    function keyHandler(e) {
        if ((e.keyCode == 113) && (isEmailInput(focusedElement) == true) && (isMailinated(focusedElement) == false)) {
            focusedElement.value = randomEmail + '@mailinator.com';
            focusedElement.setAttribute('mailinator', 'true');

            image = document.createElement('IMG');
            image.setAttribute('alt', 'Mailinator');
            image.setAttribute('src', 'http://gmail.google.com/favicon.ico');
            image.setAttribute('style', 'border: 0px; margin-left: 7px; margin-right: 7px;');

            link = document.createElement('A');
            link.setAttribute('href', 'http://'+randomEmail+'.mailinator.com/');
            link.setAttribute('target', '_blank');
            link.setAttribute('title', 'Mailinator');

            link.appendChild(image);
            focusedElement.parentNode.insertBefore(link, focusedElement.nextSibling);
        }
    }

    function gotFocus(e) {
        focusedElement = e.target;
    }


    for (var i = 1; i <= 15; i++) {
        randomEmail += String.fromCharCode(97 + Math.round(Math.random() * 25));
    }

    document.addEventListener('focus', gotFocus, true);    
document.addEventListener('keydown', keyHandler, false);
})();
