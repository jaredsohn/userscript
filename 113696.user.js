// ==UserScript==
// @name            FB Cleanup
// @namespace       https://gist.github.com/1235475
// @description     Removes live feed ticker from Facebook (Sep 2011 update)
// @include         *facebook.com/*
// @version         1.0.0.0
// @author          Felds Liscia (@felds)
// ==/UserScript==

!function(undefined) {
    function removeById(id)
    {
        var node = document.getElementById(id);
        if (node != null) node.parentNode.removeChild(node);
    }
    removeById('pagelet_ticker');
    removeById('pagelet_rhc_ticker');
}()