// ==UserScript==
// @name           GitHub Ignore Whitespace
// @description    Ignore whitespace in github diffs
// @version        1.0
// @author         Adam
// @include        http://*.github.*
// @include        https://*.github.*
// @exclude        about:blank
// ==/UserScript==

jQuery.expr[':'].hasX = function(obj) {
    // cache
    var $this = $(obj);
    // whether this and next line do have '.x' element as child
    return $this.find('.x').length && $this.next().find('.x').length;
}

// select all rows and hide (ones containing "-")
jQuery('.data tbody tr:hasX').toggle()
// hide the ones after selected (ones containing "+")
    .next().toggle();