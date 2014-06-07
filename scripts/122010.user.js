// ==UserScript==
// @id             ingatlant-a-tulajtol-ingatlan_com
// @name           Ingatlant a tulajtól (ingatlan.com)
// @version        1.01
// @author         pihentagy
// @description    Eltünteti a listanézetbol az összes ügynökség által hirdetett ingatlant.
// @include        http://ingatlan.com/lista/*
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery

$('td.address > a.rowclick').each(function(idx) {
    var url = 'http://ingatlan.com' + $(this).attr('href');
    var that = this;
    $.get(url, function(data) {
        if($('.more-ads', data).length) {
            var $row = $($(that).closest('tr'))
            $row.next().remove()
            $row.remove()
        }
    })
})

