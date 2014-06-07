// ==UserScript==
// @name           SpamTracker Email Address
// @namespace      http://wealthcoaches.com/myscripts
// @description    A script to insert an email address like 'www.cnn.com@mydomain.com' so that you can track who's sending you spam.  You must have a catchall address
//                 setup to use this.  Modified from the Mailinator script by Todd James.  Thanks Todd!
//                 Remember - once installed, you have to edit this script to change your domain name below.
// @include        *
// ==/UserScript==

// edit this value to match your domain
var myDomain = 'mydomain.com';
var websiteEmail = document.location.hostname + '@' + myDomain;

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
        if ((e.keyCode == 120) && (isEmailInput(focusedElement) == true) && (isMailinated(focusedElement) == false)) {
            focusedElement.value = websiteEmail;
        }
    }

    function gotFocus(e) {
        focusedElement = e.target;
    }

    document.addEventListener('focus', gotFocus, true);

    document.addEventListener('keydown', keyHandler, false);
})();

