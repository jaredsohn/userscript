// ==UserScript==
// @name         kwout
// @namespace    http://kwout.com/
// @description  A brilliant way to quote
// @include      http://*twitter.com/*
// @include      https://*twitter.com/*
// @include      http://*jaiku.com/*
// @include      http://*tumblr.com/*
// ==/UserScript==
// Version 1.0.2

function kwout() {
    if (window.location.href.match(/^https?:\/\/twitter\.com\/.*$/)) {
        var elements = document.getElementsByTagName('a');
        for (var index = 0; index < elements.length; index++) {
            if (hasClassAttribute(elements[index], 'tweet-timestamp') && !hasKwoutButton(elements[index].parentNode)) {
                addKwoutButton(
                    elements[index].parentNode,
                    'http://twitter.com' + elements[index].getAttribute('href'),
                    '(//div[contains(concat(" ",normalize-space(@class)," "), " permalink-tweet ")])[1]',
                    true
                );
            }
        }
    } else if (window.location.href.match(/^https?:\/\/search\.twitter\.com\/.*$/)) {
        var elements = document.getElementsByTagName('a');
        for (var index = 0; index < elements.length; index++) {
            if (hasClassAttribute(elements[index], 'lit') && !hasKwoutButton(elements[index].parentNode)) {
                addKwoutButton(
                    elements[index].parentNode,
                    elements[index].getAttribute('href'),
                    '(//div[contains(concat(" ",normalize-space(@class)," "), " permalink-tweet ")])[1]',
                    true
                );
            }
        }
    } else if (window.location.href.match(/^http:\/\/.+\.jaiku\.com\/presence\/[0-9a-z]+$/)) {
        var elements = document.getElementById('current-stream').getElementsByTagName('p');
        for (var index = 0; index < elements.length; index++) {
            if (hasClassAttribute(elements[index], 'meta') && !hasKwoutButton(elements[index])) {
                addKwoutButton(elements[index], window.location.href, '//div[@id="current-stream"]', true);
            }
        }
    } else if (window.location.href.match(/^http:\/\/.+\.jaiku\.com\/$/)) {
        var elements = document.getElementsByTagName('p');
        for (var index = 0; index < elements.length; index++) {
            if (hasClassAttribute(elements[index], 'meta') && !hasKwoutButton(elements[index])) {
                var h3 = elements[index].parentNode.getElementsByTagName('h3');
                if (h3 && h3[0]) {
                    var a = h3[0].getElementsByTagName('a');
                    if (a && a[0]) {
                        addKwoutButton(elements[index], a[0].getAttribute('href'), '//div[@id="current-stream"]', true);
                    }
                }
            }
        }
    } else if (window.location.href.match(/^http:\/\/.+\.tumblr\.com\/.*$/)) {
        var elements = document.getElementsByTagName('div');
        var link = 0;
        var quote = 0;
        var photo = 0;
        var video = 0;
        for (var index = 0; index < elements.length; index++) {
            if (hasClassAttribute(elements[index], 'link') && !hasKwoutButton(elements[index])) {
                link++;
                addKwoutButton(elements[index], window.location.href, '(//div[contains(concat(" ",normalize-space(@class)," "), " link ")])[' + link + ']', false);
            } else if (hasClassAttribute(elements[index], 'quote') && !hasKwoutButton(elements[index])) {
                quote++;
                addKwoutButton(elements[index], window.location.href, '(//div[contains(concat(" ",normalize-space(@class)," "), " quote ")])[' + quote + ']', false);
            } else if (hasClassAttribute(elements[index], 'photo') && !hasKwoutButton(elements[index])) {
                photo++;
                addKwoutButton(elements[index], window.location.href, '(//div[contains(concat(" ",normalize-space(@class)," "), " photo ")])[' + photo + ']', false);
            } else if (hasClassAttribute(elements[index], 'video') && !hasKwoutButton(elements[index])) {
                video++;
                addKwoutButton(elements[index], window.location.href, '(//div[contains(concat(" ",normalize-space(@class)," "), " video ")])[' + video + ']', false);
            }
        }
    }
};

function addKwoutButton(element, address, xpath, before) {
    var button = document.createElement('a');
    button.href = 'http://kwout.com/grab?address=' + encodeURIComponent(address) + '&xpath=' + xpath;
    button.target = '_blank';
    button.style.textDecoration = 'none';
    button.innerHTML = '<img src="http://kwout.com/images/api.gif" alt="kwout this!" title="kwout this!" height="16" width="19" style="border: none; vertical-align: middle;" />';
    if (before) {
        element.insertBefore(button, element.firstChild);
    } else {
        element.appendChild(button);
    }
};

function hasKwoutButton(element) {
    var elements = element.getElementsByTagName('img');
    if (elements && elements.length) {
        for (var index = 0; index < elements.length; index++) {
            if (elements[index].src.indexOf('http://kwout.com/') != -1) {
                return true;
            }
        }
    }
    return false;
};

function hasClassAttribute(element, className) {
    var attribute = element.getAttribute('class');
    if (!attribute) {
        attribute = element.getAttribute('className');
    }
    if (!attribute) {
        return false;
    }
    var values = attribute.split(' ');
    for (var index = 0; index < values.length; index++) {
        if (values[index] == className) {
            return true;
        }
    }
    return false;
};

var version = '1.0.2';
var option = {
    url : 'http://kwout.com/gm_version?t=' + (new Date()).getTime(),
    method : 'get',
    onload : function (response) {
        if (response.status == 200) {
            GM_setValue('kwout.checked', (new Date()).getTime().toString());
            var latest = response.responseText.replace(/[^\d\.]/, '');
            setInterval(kwout, 2000);
            if (latest != version && GM_getValue('kwout.notified', 'false') != version) {
                GM_setValue('kwout.notified', version);
                alert('Please update "kwout.user.js" because it has a new version "' + latest + '".');
            }
        } else {
            setInterval(kwout, 2000);
        }
    },
    onerror : function (response) {}
};

var checked = parseInt(GM_getValue('kwout.checked', '0'));
if (checked < (new Date()).getTime() - 3600000) {
    GM_xmlhttpRequest(option);
} else {
    setInterval(kwout, 2000);
}