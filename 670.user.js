// ==UserScript==
// @name            Basecamp Projects: Todo Items
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-03-16: Removes those ugly yellow backgrounds for own todo items. I don't like 'em, really.
// @include         http://*.updatelog.com/*
// @include         http://*.clientsection.com/*
// @include         http://*.seework.com/*
// @include         http://*.grouphub.com/*
// @include         http://*.projectpath.com/*
// ==/UserScript==

/*
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

(function() {

    var BaseCampTodoSpan =
    {
        go: function()
        {
            spanList = document.getElementsByTagName('span');

            for (a = 0; a < spanList.length; a++)
            {
                span = spanList[a];
                try
                {
                    if (span.getAttribute('style').match(/^background:/i))
                    {
                        span.setAttribute('style', span.getAttribute('style').replace(/^background[^;]*;/i, 'border-left: 12px solid yellow; padding-left: 5px;'));
                    }
                }
                catch(e) {}
            }
        }
    }

    BaseCampTodoSpan.go();

})();
