// ==UserScript==
// @name           yopmail.com creator
// ==/UserScript==

(function() {
    var focusedElement = null;
    var randomEmail = '';

    function isMailinated(element) {
        if (element.getAttribute('yopmail.com') == 'true') {
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
            focusedElement.value = randomEmail + '@yopmail.com';
            focusedElement.setAttribute('yopmail.com', 'true');

            image = document.createElement('IMG');
            image.setAttribute('alt', 'yopmail.com');
            image.setAttribute('src', 'http://gmail.google.com/favicon.ico');
            image.setAttribute('style', 'border: 0px; margin-left: 7px; margin-right: 7px;');

            link = document.createElement('A');
            link.setAttribute('href', 'http://'+randomEmail+'.yopmail.com/');
            link.setAttribute('target', '_blank');
            link.setAttribute('title', 'yopmail.com');

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