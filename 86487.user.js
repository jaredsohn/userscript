// ==UserScript==
// @name           CrimsonWoW.org Auto vote
// @namespace      dav
// @match          http://crimsonwow.org/vote/?act=vote
// @match          http://crimsonwow.org/vote/?act=vote
// @include        http://crimsonwow.org/vote/?act=vote
// @include        http://crimsonwow.org/vote/?act=vote
// ==/UserScript==

var accountName = 'mihailoilic';

var splash = document.createElement('div');
document.body.appendChild(splash);
var splashContent = document.createElement('div');
splash.appendChild(splashContent);

splashContent.innerHTML = 'Please wait';

splash.setAttribute('style', '\
    background-color: #000; \
    color: #fff; \
    opacity: 0.5; \
    z-index: 1000; \
    width: 100%; \
    height: 100%; \
    display: block; \
    overflow: hidden; \
    position: absolute; \
    top: 0; \
');
splashContent.setAttribute('style', '\
    position: absolute; \
    top: 25%; \
    left: 25%; \
    width: 50%; \
    height: 50%; \
    z-index: 1001; \
    font-size: 30pt; \
    text-align: center; \
');

function postForm(id) {
    if (id == document.forms.length) {
        splashContent.innerHTML = 'Redirecting...';
        setTimeout(
            function() {
                window.location = 'http://69.162.87.218/vote/?';
            }, 800
        );
        return;
    }
    var http = new XMLHttpRequest();
    var form = document.forms[id];

    splashContent.innerHTML = 'Voting: ' + form.target;

    var module = form.elements[0].value;
    var to = form.elements[1].value;
    var data = 'module='+module+'&to='+to+'&account='+accountName;
    var xhrTimeout = setTimeout(function() {
        http.abort();
        splashContent.innerHTML = 'Timeout: ' + form.target;
    }, 5000);
    http.open('POST', form.action, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Content-length', data.length);
    http.setRequestHeader('Connection', 'close');
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            clearTimeout(xhrTimeout);
            setTimeout(function() { postForm(id + 1); }, 500);
            // postForm(id + 1);
        }
    }
    http.send(data);
}

postForm(0);