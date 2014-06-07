// ==UserScript==
// @name           Speed up typing in twitter
// @namespace      none
// @description    Speed up typing on twitter website. The JS that counts the number of characters in a tweet tends to lag typing. Credit for the script goes to http://miloping.com/content/2009/05/1/twitters-char-counter-js-obtrusively-slow
// @include        http://twitter.com*
// @include        http://www.twitter.com*
// @include        https://twitter.com*
// @include        https://www.twitter.com*
// ==/UserScript==


function addElement(content) {
    var element;    
    element = document.createElement('script');
    element.type = 'text/javascript';
    element.innerHTML = content;
    document.body.appendChild(element);
}


var unslow_twit_js = "(function() { var btn = $('input#update-submit'); var counter = $('#status-field-char-counter'); var txt = $('textarea#status'); var timeout = false; var updateFn = function(len) { counter.html('' + (140 - len)); if (len > 0 && btn.attr('disabled')) { btn.removeAttr('disabled').removeClass('disabled'); } else if (len == 0) { btn.attr('disabled', 'disabled').addClass('disabled'); } if (len <= 120) { counter.css('color', '#cccccc') } else if (len <= 130) { counter.css('color', '#5c0002'); } else { counter.css('color', '#d40d12'); } }; txt.unbind('input'); txt.unbind('keyup'); txt.bind('keyup', function(k) { if (timeout) clearTimeout(timeout); timeout = setTimeout(function() { updateFn(txt.val().length); timeout = false; }, 500); }); })();";

addElement(unslow_twit_js);
