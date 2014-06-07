// ==UserScript==
// @name           Redirector
// @version        1.0
// @description    Custom url redirects.
// @match          https://www.gmail.com/intl/en/mail/help/*
// @match          https://signout.live.com/*
// @run-at         document-start
// ==/UserScript==

redirectToPage("https://www.gmail.com/intl/en/mail/help/", "https://accounts.google.com/ServiceLogin?service=mail&continue=https://mail.google.com/mail/&hl=en");
redirectToPage("https://signout.live.com/", "https://mail.live.com/");

function redirectToPage(page1, page2){
if(window.location.href.indexOf(page1) != -1){
    window.location.href = page2;
}
}