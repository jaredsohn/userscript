// ==UserScript==
// @name           Albert Heijn Recept Boodschappenlijstonator
// @namespace      http://userscripts.org/users/108530
// @description    Maakt een scanbare boodscappenlijst van een Albert Heijn-recept
// @include        http://www.ah.nl/recepten/*
// ==/UserScript==

(function() {
    var special = ['À','à','Á','á','Â','â','Ã','ã','Ä','ä','Å','å','Ă','ă','Ą','ą','Ć','ć','Č','č','Ç','ç', 'Ď','ď','Đ','đ', 'È','è','É','é','Ê','ê','Ë','ë','Ě','ě','Ę','ę', 'Ğ','ğ','Ì','ì','Í','í','Î','î','Ï','ï', 'Ĺ','ĺ','Ľ','ľ','Ł','ł',
    var standard = ['A','a','A','a','A','a','A','a','Ae','ae','A','a','A','a','A','a','C','c','C','c','C','c','D','d','D','d', 'E','e','E','e','E','e','E','e','E','e','E','e','G','g','I','i','I','i','I','i','I','i','L','l','L','l','L','l',
    String.prototype.standardize = function() {
        var text = this;
        special.each(function(ch, i) {
            text = text.replace(new RegExp(ch, 'g'), standard[i]);
        });
        return text;
    };

    with (unsafeWindow) {
        var ingredients = $('ingredients');
        var list = ingredients.getElementsBySelector('span');
        for (var i = 0; i < list.length; i++) {
            list[i] = list[i].textContent;
        }
        var src = 'http://chart.apis.google.com/chart?chs=300x300&cht=qr&chl=' + escape(list.join('\n').standardize()) + '&choe=UTF-8';
        var header = ingredients.firstDescendant()
        header.setStyle({cursor: 'pointer'}).observe('click', function() {
            ingredients.insert({
                bottom: new window.Element('img', {src: src})
            });
            header.stopObserving('click');
        });
    }
})();