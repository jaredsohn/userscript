// ==UserScript==
// @name       Ogame: Repair standard fleets
// @namespace  userscripts.org
// @version    0.1
// @description  Fixes buggy implementation of standard fleets that doesn't work in Chrome
// @include    http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

(function()
{
    function change()
    {
        var option;
        if (this.selectedIndex)
        {
            option = this.children[this.selectedIndex];
        }
        if (option && typeof option.onclick == 'function')
        {
            option.onclick();
        }
    }
    
    var list = document.querySelector('.combatunits');
    if (list)
    {
        list.addEventListener('change', change, false);
    }
})()