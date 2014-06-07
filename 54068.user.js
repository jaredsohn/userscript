// ==UserScript==
// @name           Enable auto login
// @description    Enable auto login
// @include        http://board.mozest.com/*
// @include        http://*.tianya.cn/*
// @include        http://bbs.pcbeta.com/*
// @include        http://www.tomatoll.com/*
// @include        http://bbs.ioage.com/*
// @include        http://*.chinaren.com/*
// @include        http://bbs.saraba1st.com/*
// ==/UserScript==

var i, items, item, flag, sRef;

items = document.getElementsByTagName('a');
for(flag=0,i=0; i<items.length; i++) {
    item = items.item(i);
    if (item.hasAttribute('onclick') && item.hasAttribute(
        'href')) {
        if (item.getAttribute('onclick').substr(0,9) ==
            'floatwin(') {
            sRef = item.getAttribute('href');
            if ('logging.php?action=login' == sRef.substr(
                0,24)) {
                item.setAttribute('onclick', ''); flag |= 2;
            }
            else if('register.php' == sRef.substr(0,12)) {
                item.setAttribute('onclick', ''); flag |= 1;
            }
            if (flag==3) break;
        }
    }
}

items = document.getElementsByTagName('input');
for(flag=0,i=0; i<items.length; i++) {
    item = items.item(i);
    if (item.hasAttribute('autocomplete'))
        item.setAttribute('autocomplete', "on");
    if (item.hasAttribute('name') && item.getAttribute(
        'name')=='password') {
        flag = 1; item.focus();
    }
}
if (flag == 1) {
    items = document.getElementsByName('username');
    if (items.length != 0) items[0].focus();
}