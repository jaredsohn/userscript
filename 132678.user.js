// ==UserScript==
// @name            Of Fun
// @namespace      http://markm.cd/
// @description    Adds ALOTs to pages that cannot spell
// @include        http://*
// @include        https://*
// @exclude        http://hyperboleandahalf.blogspot.com.au/2010/04/-is-better-than-you-at-everything.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

// unfortunately 'contains' is case sensitive. this guys fixes that:
// http://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
jQuery.expr[':'].containsCI = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

window.addEventListener('load', function(e) {
    var searchTerm = 'alot',
        replaceWith = '<img src="http://markm.cd/alot.png" alt="alot" title="alot"/>';
    $("body :containsCI('" + searchTerm + "')").contents().each(function() {
        if(this.nodeType == 3) {
            $(this).replaceWith(this.textContent.replace(new
                    RegExp(searchTerm, 'i'),
                    replaceWith));
        }
    });

}, false);
