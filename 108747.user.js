// ==UserScript==
// @name           "Talk about it" for all questions
// @namespace      http://userscripts.org/users/1083
// @description    Restores "Talk about it" for all public questions, not just the ones you agree on
// @include        *//www.okcupid.com/profile/*/questions*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$( 'div.question.public' ).addClass( 'talk' );