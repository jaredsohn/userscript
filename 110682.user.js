// ==UserScript==

// @name           Chumtool Helper

// @namespace      http://userscripts.org

// @description    Generates a new email address and inserts a chumtool link when F8 is pressed.

// @include        *

// ==/UserScript==

(function() {
    var focusedElement = null;
    var randomEmail = '';

    function isMailinated(element) {
        if (element.getAttribute('mail') == 'true') {
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
        if ((e.keyCode == 119) && (isEmailInput(focusedElement) == true) && (isMailinated(focusedElement) == false)) {
        
            GM_xmlhttpRequest({
              method: "POST",
              url: "http://webmail.narayan.dd.dev/addyou.php",
              data: "userName="+randomEmail+"&passWord=password&submit=Add+user+to+mail+domain",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
            });

            focusedElement.value = randomEmail+"@narayan.bfgqa.com";
            focusedElement.setAttribute('mail', 'true');

            image = document.createElement('IMG');
            image.setAttribute('alt', 'Mail');
            image.setAttribute('src', 'http://gmail.google.com/favicon.ico');
            image.setAttribute('style', 'border: 0px; margin-left: 7px; margin-right: 7px;');

            link = document.createElement('A');
            username = randomEmail;
            url = 'http://webmail.narayan.dd.dev/src/redirect.php?method=post&login_username='+username+'%40narayan.bfgqa.com&secretkey=password&js_autodetect_results=1&just_logged_in=1';
            //GM_openInTab(url, true, true);
            link.setAttribute('href', url);
            link.setAttribute('target', '_blank');
            link.setAttribute('title', 'Mail');

            link.appendChild(image);
            focusedElement.parentNode.insertBefore(link, focusedElement.nextSibling);
        }
    }

    function gotFocus(e) {
        focusedElement = e.target;
    }


    for (var i = 1; i <= 8; i++) {
        randomEmail += String.fromCharCode(97 + Math.round(Math.random() * 25));
    }

    document.addEventListener('focus', gotFocus, true);

    document.addEventListener('keydown', keyHandler, false);
})();
