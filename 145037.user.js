// ==UserScript==
// @name       xssearcher
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include      http://*
// @copyright  2012+, You
// ==/UserScript==
var lolzer = 'test';

function urlize() {
    var params = location.search.substring(1, location.search.length);
    var splitted = params.split('&');
    for (var i = 0; splitted[i]; i++) {
        splitted[i] += '"></textarea><xss>XSSpoted</xss>';
        var xhr = null;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {
                if (/<xss>XSSpoted<\/xss>/i.test(xhr.responseText)) {
                    alert('XSSpoted (reflected) \n URL: http://' + location.hostname + location.pathname + '?' + splitted.join('&'));
                }

            }
        }
        xhr.open('GET', '?' + splitted.join('&'), false);
        xhr.send();
        splitted = params.split('&');
    }
}

function XSSpage() {
    if (/<xss>XSSpoted<\/xss>/i.test(document.body.innerHTML)) {
        alert('XSSpoted (permanent) \n URL: ' + location.href);
        document.body.innerHTML = document.body.innerHTML.replace('<xss>XSSpoted</xss>', '<xss>XSSpoted</xss>'.big().bold().fontcolor('red'));
    }
}

function getSelectedOptions(el) {
    var rv = [];
    for (var i = 0; i < el.options.length; i++) {
        if (el.options[i].selected) {
            rv.push(el.options[i]);
        }
    }
    return rv;
};

function serialize(form) {
    var results = {};
    var rv = '';
    var inputs = form.elements;

    for (var k = 0; k < inputs.length; k++) {
        var el = inputs[k];

        if (el == null || el.nodeName == undefined) continue;

        var tagName = el.nodeName.toLowerCase();
        if (!(tagName == "input" || tagName == "select" || tagName == "textarea")) continue;

        var type = el.type,
            names = [],
            name = el.name,
            current;
        if (!el.name || el.disabled || type == 'submit' || type == 'reset' || type == 'file' || type == 'image') continue;

        var value = (tagName == 'select') ? getSelectedOptions(el).map(function (opt) {
            return opt.value;
        }) : ((type == 'radio' || type == 'checkbox') && !el.checked) ? null : el.value;

        if (value != null) rv = rv + "&" + el.name + "=" + value;
    }

    return (rv.length > 0) ? rv.substring(1) : rv;
};

function XSSearch() {
    var inputs = document.getElementsByTagName('input');
    var textareas = document.getElementsByTagName('textarea');
    var forms = document.getElementsByTagName('form');
    for (var i = 0; inputs[i]; i++) {
        if ((inputs[i].getAttribute('type') == 'text') || (inputs[i].getAttribute('type') == 'hidden') || (inputs[i].getAttribute('type') == 'password')) {
            inputs[i].value += '"><xss>XSSpoted</xss>';
        }
    }
    for (var i = 0; textareas[i]; i++) {
        textareas[i].value += '</textarea><xss>XSSpoted</xss>';
    }

    for (var i = 0; forms[i]; i++) {
        if (forms[i].getAttribute('action') == null) {
            var action = '';
        } else {
            var action = forms[i].getAttribute('action');
        }
        if (/\//i.test(location.search)) {
            var path = location.pathname.substring(0, location.pathname.lastIndexOf('/')) + action;
        } else {
            var path = '/';
        }
        var xhr = null;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {
                if (/<xss>XSSpoted<\/xss>/i.test(xhr.responseText)) {
                    if ((forms[i].getAttribute('method') == 'POST') || (forms[i].getAttribute('method') == 'post') || (forms[i].getAttribute('method') == 'Post')) {
                        alert('XSSpoted (reflected) \n URL: http://' + location.hostname + path + action + '\n POST :' + serialize(forms[i]));
                    } else {
                        alert('XSSpoted (reflected) \n URL: http://' + location.hostname + path + '?' + serialize(forms[i]));
                    }
                }
            }
        }
        if ((forms[i].getAttribute('method') == 'POST') || (forms[i].getAttribute('method') == 'post') || (forms[i].getAttribute('method') == 'Post')) {
            xhr.open(forms[i].getAttribute('method'), action, false);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(serialize(forms[i]));
        } else {
            xhr.open(forms[i].getAttribute('method'), action + '?' + serialize(forms[i]), false);
            xhr.send();
        }
    }
}
if (/XSSearch/i.test(location.search)) {
    urlize();
    XSSearch();
}
var XSSh = document.createElement('span');
XSSh.setAttribute('style', 'float:right;');
var XSShild = document.createElement('input');
XSShild.type = 'button';
XSShild.value = 'XSSheck';
XSShild.setAttribute('onclick', 'XSSheck();');
XSSh.appendChild(XSShild);
document.body.insertBefore(XSSh, document.body.firstChild);
unsafeWindow.XSSheck = function () {
    urlize();
    XSSearch();
};
XSSpage();