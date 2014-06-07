// ==UserScript==
// @name           SO Spoilers
// @namespace      stackoverflow
// @author         Michael Mrozek (http://stackoverflow.com/users/309308)
// @description    Unhide spoilers
// @include        http://meta.stackoverflow.com/*
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://mathoverflow.net/*
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	$('.spoiler').removeClass('spoiler').css('background-color', '#fbb');
});
