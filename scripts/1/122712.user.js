// ==UserScript==
// @id             ingatlant-a-tulajtol-expressz_hu
// @name           Ingatlant a tulajtól (expressz.hu)
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://www.expressz.hu/index.do*
// @include        http://www.expressz.hu/ingatlan/*
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery

$('body.ingatlan .header > .centerLeft > a').each(function(idx) {
    var url = $(this).attr('href');
    var that = this;
    $.get(url, function(data) {
        if($('#PartnerOtherAds', data).length) {
            $($(that).closest('div.advertRev')).remove()
        }
    })
})

