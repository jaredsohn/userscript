// ==UserScript==
// @name            Backpack: Header Padding Adjustment
// @namespace       http://www.mitcs.com
// @description     2006-08-28: Adds some additional header padding in individual header items.
// @include         http://*.backpackit.com/*
// @include         https://*.backpackit.com/*
// ==/UserScript==

/*
    (c) Tyler Smith, tsmith@mitcs.com
    http://www.mitcs.com/

    Copy, use, modify, distribute as needed.
*/

(function() {

    var BackpackHeaderAdjust =
    {
        go: function()
        {
            headerList = document.getElementsByTagName('h3');

            for (a = 0; a < headerList.length; a++)
            {
                header = headerList[a];
                try
                {
                    header.setAttribute('style', 'padding-top:25px;');
                }
                catch(e) {}
            }
        }
    }

    BackpackHeaderAdjust.go();

})();
