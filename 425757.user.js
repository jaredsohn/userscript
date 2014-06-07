// ==UserScript==
// @name       Wijnvoordeel
// @namespace  http://wol.ph/
// @version    1.0
// @description  
// @match      https://www.wijnvoordeel.nl/*
// @copyright  2014, Wolph
// ==/UserScript==

function addLinks(selector, position){
    selector.each(function(){
        var $this = $(this);
        try{
            var text = $this.text();
            var q = encodeURIComponent(text);
            var a = $('<a>');
            var img = $('<img>');

            img.attr('title', 'Find "' + text + '" at Vivino');
            img.attr('alt', 'Find "' + text + '" at Vivino');
            img.attr('src', 'https://www.vivino.com/favicon.ico');
            img.attr('height', '16');
            img.attr('width', '16');

            a.css('margin', '0 2px');
            a.attr('href', 'https://www.vivino.com/search.php?search_for=wines&q=' + q);
            a.attr('target', '_blank');
            a.append(img);

            switch (position){
                case 'after':
                    $this.append(a);
                    break;
                default:
                    $this.prepend(a);
            }
        }catch(e){
            console.log('Got error: ', e);
        }
    });
}

addLinks($('td.liste_name'));
addLinks($('td.special_name div'));
addLinks($('div.produkt_name h1'));
