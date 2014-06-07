// ==UserScript==
// @name        whistle.im desktop beautifier
// @namespace   hbb_works
// @include     https://*whistle.im/browser*
// @version     0.1r1309201
// @grant       none
// ==/UserScript==

document.body.onload = function () {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(
        '#conversation-name { padding: 5px 10px; } ' +
        '#conversation-icon span.ui-btn-icon-notext { margin-top: -15px; } ' +
        '#conversation-vcard { display: none; } ' +
        '#conversation-messages .ui-btn { margin: 0px; } ' +
        '#conversation-messages .ui-btn-inner { padding: 2px 10px 2px 30px; } ' +
        '#conversation .divider { margin-top: 0px; } ' +
        '#conversation .message { margin: 0px; padding: 1px; border: none; border-radius: 0px; } ' +
        '#conversation-messages { padding: 0px; }' +
        '#conversation .message p { font-weight: normal; font-size: 11pt; } ' +
        '#conversation .message label.time { float: left; margin-right: 2px; margin-top: 2px; }' +
        '#conversation .message label.name { float: left; margin-right: 5px; width: 50px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-bottom: 0px; margin-top: 2px; }' + 
        '#conversation .message span.edge { width: 0px; } ' +
        '.ui-content-main { width: auto !important; margin: 0px; } ' +   
        
        '.ui-content-main { border-radius: 0px; } '  +
        
        '#online-contacts .avatar { width: 0px; } ' + 
        '#online-contacts li.contact a.ui-link-inherit { padding-left: 4px; min-height: 0px;} ' +
        '#online-contacts .ui-li-heading { font-size: 12px; } ' +
        '#online-contacts .ui-li-desc { font-size: 11px; } ' +
        '.ui-li-divider { padding: 0.1em 15px; } ' +
        '.ui-li-link-alt .ui-btn { right: 1px; } ' +
        '.ui-li-link-alt { width: 28px; } ' +
        '#online-contacts .ui-li-link-alt .ui-btn { right: 0px; } ' +
        '#online-contacts .ui-li-link-alt { width: 22px; } ' +
        '.ui-listview-filter { display: none; } ' +
        '#online-vcard.header-logo { background: none; padding: 0px 5px !important; } ' +
        '#online-vcard .ui-li-heading { margin: 5px 0px; } ' +
        '#online-vcard .ui-li-desc { margin-bottom: 2px; } ' +
        '#conversation-input-box { padding: 0px; } '
    );
    document.getElementById("sound-message").muted = true;
}