// ==UserScript==
// @name reddit-login
// @namespace http://wainstead.info/
// @description Login to reddit.com
// @include http://*reddit.com/*
// ==/UserScript==


//GM_log(window.location.href);
href = new String(window.location.href);
if ( ! href.match(/error/) ) {
    //GM_log('logging you in');
    var form = document.forms[1];
    if (form) {
        var username = form.elements.namedItem('user');
        var password = form.elements.namedItem('passwd');
        if ( username && password ) {
            username.value = 'your username';
            password.value = 'your password';
            form.submit();
        } else {
            //GM_log('gm: you are probably logged in already');
        }
    }
} else {
    alert('redditlogin.user.js: fix your username/password');
}