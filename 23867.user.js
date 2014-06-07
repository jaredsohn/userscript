// ==UserScript==
// @name           Vkontakte external links
// @namespace      http://userscripts.org/scripts/show/23867
// @description    Fixes external links for Vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

(function() {
	var vkontakte_external_link_prefix = "/away.php?to=";
	var path = "//a[starts-with(@href, '" + vkontakte_external_link_prefix + "')]";

        var query = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, length = query.snapshotLength; i < length; i++)
        {
            var link = query.snapshotItem(i);
	    link.href = link.innerHTML;
	    link.target = "";
        }
})();