// ==UserScript==
// @name           Ogame usuwanie reklamy konta komandor
// @description    Usuwa reklame konta komandor ze strony podgladu.
// @version        1.0
// @include        http://ogame*.de/game/overview.php?*
// ==/UserScript==

(function()
{
        var ttags = document.getElementsByTagName('div');

        for (var i=0;i < ttags.length;i++)
                if (ttags[i].id = "combox_container")
                {
                        ttags[i].parentNode.removeChild(ttags[i]);
                        ttags[i].parentNode.insertBefore("<br /><br />",ttags[i]);
                }
})();
