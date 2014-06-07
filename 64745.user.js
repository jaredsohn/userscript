// ==UserScript==
// @name           Journal auto-login
// @description    Logs into various journals automatically
// @include http://www.jstor.org/*
// @include https://www.jstor.org/*
// @include http://www.sciencedirect.com/*
// @include http://www.springerlink.com/*
// ==/UserScript==

institution = 'University of Cambridge';

function $$(path) {
    return document.evaluate(path, document, null, 0, null).iterateNext();
}

function follow_link(text) {
    link = $$('//a[contains(., "' + text + '")]');
    if (link)
	window.location.href = link.href;
}

function select_option(text) {
    $$('//option[contains(., "' + text + '")]').selected = true;
}

function submit_form(text) {
    $$('//input[@type="submit" and @value*="' + text + '"]').click();
}

action = Object();

action['http://www.jstor.org/'] = function() {
    if (!$$('//*[@id="supportNav" and contains(.,"Logout")]'))
	follow_link('Login');
};

action['https://www.jstor.org/'] = function() {
    select_option(institution);
    $$('//*[@id="accessLogin"]//input[@type="submit"]').click();
};

action['http://www.sciencedirect.com/'] = function() {
    follow_link(institution + ' Login');
};

action['http://www.springerlink.com/'] = function() {
    if (!$$('/*[contains(.,"Recognized as:")]')) {
	follow_link('Institutional Login');
	select_option(institution);
	submit_form('Log In');
    }
};

for (url in action)
    if (window.location.href.match('^' + url))
	action[url]();