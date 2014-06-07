// ==UserScript==
// @name            wordnik.com Phonetic Notation
// @namespace       http://userscripts.org/users/598226
// @version         0.0.3
// @description     Adds phonetic transcriptions for wordnik.com
// @match           *://*.wordnik.com/words/*
// @require         http://code.jquery.com/jquery-2.0.3.min.js
// @require         http://routines.hostei.com/assets/jquery.mustache.js
// @resource        view http://routines.hostei.com/assets/p.mustache
// @grant           GM_getResourceText
// ==/UserScript==

var word = location.pathname.split('/').pop(),
    url = 'http://routines.hostei.com/wpn.php',
    $container = jQuery('#define').parent();

jQuery.get(url, {word: word}).done(function (data) {
    $container.append(Mustache.render(GM_getResourceText('view'), data));
});
