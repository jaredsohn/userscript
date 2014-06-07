// ==UserScript==
// @name           1Password Anywhere Enhanced
// @namespace      http://gewooniets.nl/
// @description    1Password Anywhere is enhanced with keyboard shortcuts
// @include        https://dl-web.dropbox.com/get/1Password.agilekeychain/1Password.html*
// ==/UserScript==

(function () {
    var currentlyLoggedin = false;
    document.querySelector("#mainBody").addEventListener("DOMSubtreeModified", function (event) {
        if (document.elementFromPoint(0,0) === document.querySelectorAll("#headerBar")[0]) {
            if (!currentlyLoggedin) {
                currentlyLoggedin = true;
                doLogin();
            }
        } else {
            if (currentlyLoggedin) {
                currentlyLoggedin = false;
                doLogout();
            }
        }
    });

    var extractText = function (elem) {
        var contents = [];
        var child = elem.firstChild;
        while (child) {
            if (child.nodeType === 3) {
                contents.push(child.nodeValue);
            }
            child = child.nextSibling;
        }
        return contents.join("");
    };


    var copyAction = function (event) {
        var searchBox = this;
        if (event.keyCode === 67 && event.ctrlKey) {
            var pwdReveal = document.querySelectorAll(".revealButton")[0];
            pwdReveal.onclick();
            var password = extractText(document.querySelectorAll(".hideRevealButton td div.copy")[0]);
            pwdReveal.onclick();

            var pwField = document.createElement("textarea");
            pwField.style.opacity = 0;
            pwField.style.width = 1;
            pwField.style.height = 1;
            pwField.style.position = "absolute";

            var textVal = document.createTextNode(password);
            pwField.appendChild(textVal);

            document.querySelector("#mainBody").appendChild(
                pwField,
                document.querySelector("#mainBody").firstChild
            );
            pwField.focus();
            pwField.select();
            pwField.addEventListener('keyup', function (event) {
                pwField.parentNode.removeChild(pwField);
                pwField = null;
                searchBox.focus();
            });
        }
    };

    var moveAction = function (event) {
        var current = document.querySelector("#listPane li.selected");
        if (event.keyCode === 38) {
            if (current.previousSibling) {
                current.previousSibling.onclick();
            }
        }

        if (event.keyCode === 40) {
            if (current.nextSibling) {
                current.nextSibling.onclick();
            }
        }
    };

    var searchBox = null;
    var doLogin = function () {
        searchBox = document.querySelector("#search");

        searchBox.focus();
        searchBox.addEventListener('keydown', copyAction);
        document.addEventListener('keydown', moveAction);
    };

    var doLogout = function () {
        searchBox.removeEventListener('keydown', copyAction);
        document.removeEventListener('keydown', moveAction);
    };

}());

