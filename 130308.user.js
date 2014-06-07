// ==UserScript==
// @name           Telegraph.co.uk remove login-bar but leave it on the front page.
// @namespace      http://userscripts.org/users/lorriman
// @description    Removes the login bar for news pages but leaves it on the front page so you can still login.
// @include        http://www.telegraph.co.uk*
// @match http://www.telegraph.co.uk/*
// @version .1

// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


if(document.location!='http://www.telegraph.co.uk/'){
	addGlobalStyle("#tmgMenu-z1 {display:none}");
}
