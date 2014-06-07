// ==UserScript==
// @name VK Download
// @description Downloads music from VK
// @namespace http://vk.com/
// @include http://*.vk.com/*
// ==/UserScript==


var app_id = 3294373;

function auth() {
    document.location = 
        'https://oauth.vk.com/authorize?' +
            'client_id=' + app_id + '&' +
            'display=page&' +
            'response_type=code&' +
            'redirect_url=' + escape(document.location.href);
}

auth();