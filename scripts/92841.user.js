(function() {

// ==UserScript==
// @name          GitHub - sane colors
// @include  http://github.com/*
// @include  https://github.com/*
// @include  http://wiki.github.com/*
// @include  http://help.github.com/*
// @include  http://support.github.com/*
//
// @require  http://usocheckup.redirectme.net/59744.js?method=install&open=window&maxage=3&id=usoCheckup&custom=yes&topicid=37240
// @require  http://userscripts.org/scripts/source/61794.user.js
// ==/UserScript==

  GM_addStyle("" + <><![CDATA[

    /* Overall site */
    html, body, p, td, span, #browser td {
      color: black;
    }

  ]]></>);


})();
