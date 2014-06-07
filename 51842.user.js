// ==UserScript==
// @name           Sage -> Submit / Bump buttons
// @namespace      http://userscripts.org/users/77660
// @include        http://*.4chan.org/*
// @description    Removes email field and uses two submit buttons for functionality of "noko" and "sage"
// ==/UserScript==

// Create submit buttons
function makeButton(label, value, key) {
    var b = document.createElement('button');
    b.appendChild(document.createTextNode(label));
    b.setAttribute('type', 'submit');
    b.setAttribute('accesskey', key);
    b.setAttribute('name', 'email');
    b.setAttribute('value', value);
    return b;
}

var pf = document.getElementsByName('post');
if (pf.length != 0) {

    // Remove email field
    var em = document.getElementsByName('email')[0];
    while (em.tagName != 'TR') {
        em = em.parentNode;
    }
    em.parentNode.removeChild(em);

    // Locate and remove submit button
    var par, ns;
    var els = pf[0].getElementsByTagName('input');
    for (var i = 0; i < els.length; i++) {
        if (els[i].getAttribute('type').toLowerCase() == 'submit') {
            par = els[i].parentNode;
            ns = els[i].nextSibling;
            par.removeChild(els[i]);
            break;
        }
    }

    // Insert new buttons
    if (document.getElementsByName('resto').length == 0) {
        par.insertBefore(makeButton('Submit', 'noko', 's'), ns);
    } else {
        par.insertBefore(makeButton('Submit', 'nokosage', 's'), ns);
        par.insertBefore(makeButton('Bump', 'noko', 'b'), ns);
        par.insertBefore(makeButton('Sage', 'sage', 'g'), ns);
    }
}
