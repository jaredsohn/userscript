// ==UserScript==
// @name            Basecamp Projects: Todo Hidden Anchors
// @namespace       http://www.mitcs.com
// @description     2006-07-20: Removes the extraneous spacing in individual to-do items that causes the second line not to line up with the first (when wrapped).
// @include         http://*.updatelog.com/*
// @include         https://*.updatelog.com/*
// @include         http://*.clientsection.com/*
// @include         https://*.clientsection.com/*
// @include         http://*.seework.com/*
// @include         https://*.seework.com/*
// @include         http://*.grouphub.com/*
// @include         https://*.grouphub.com/*
// @include         http://*.projectpath.com/*
// @include         https://*.projectpath.com/*
// ==/UserScript==

/*
    (c) Tyler Smith, tsmith@mitcs.com
    http://www.mitcs.com/

    Copy, use, modify, distribute as needed.
*/

(function() {

    var BaseCampTodoAnchor =
    {
        go: function()
        {
            anchorList = document.getElementsByTagName('a');

            for (a = 0; a < anchorList.length; a++)
            {
                anchor = anchorList[a];
                try
                {
                    if (anchor.innerHTML == "")
                    {
                        anchor.setAttribute('style', 'display:none;');
                    }
                }
                catch(e) {}
            }
        }
    }

    BaseCampTodoAnchor.go();

})();