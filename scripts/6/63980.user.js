// ==UserScript==
// @name            MetaFilter unicorn submit button
// @description     Makes the submit button be a unicorn
// @include         http://metafilter.com/*
// @include         http://*.metafilter.com/*
// @include         https://metafilter.com/*
// @include         https://*.metafilter.com/*
// @grant           GM_addStyle
// @version         2.0
// ==/UserScript==

GM_addStyle('input#postButton {' +
            '  height: 75px !important;' +
            '  color: #000 !important;' +
            '  font-weight: bold !important;' +
            '  background: #fff url(' + unicorn() + ') no-repeat center !important;' +
            '}');

function unicorn() {
    return 'data:image/jpg;base64,' +
    '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' +
    'hGDBgwIX/9k=';
}
