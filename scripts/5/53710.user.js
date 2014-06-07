// ==UserScript==
// @name		paypal change payment reminder
// @namespace		http://userscripts.org/users/dchoe
// @description		to remind you to change your funding source to credit card.  the background will turn red if your funding source is still set to instant transfer
// @source		http://userscripts.org/scripts/show/53710
// @version		0.1
// @include		https://www.paypal.com/*
// @include		https://payments.ebay.com/*
// ==/UserScript==

function changeStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if (document.location.href.match(/paypal\./i)) {
    if (document.body.innerHTML.match(/instant transfer/i)) {
        if (document.body.innerHTML.match(/instantAch/)) { return; }
        else {
            changeStyle('Body {background-color: #CC0000}');
            alert('Change Payment Type');
        }
    }
}

if (document.location.href.match(/ebay\./i)) {
    if (document.body.innerHTML.match(/from  bank account/i)) {
        changeStyle('Body {background-color: #CC0000}');
        alert('Change Payment Type');
    }
}