// ==UserScript==
// @id             exhentai.org-cd0977bf-121a-455f-8c5e-be693c2a4600@sanitysama
// @name           E-Hentai Show Flagged Tags
// @version        1.3
// @namespace      sanitysama
// @author         sanitysama
// @description    Shows the flagged tags' text under the gallery thumbnail
// @include        /^https?://(g\.e-|ex)hentai\.org/$/
// @include        /^https?://(g\.e-|ex)hentai\.org/\?.*/
// @include        /^https?://(g\.e-|ex)hentai\.org/tag*/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

$(document).ready(function() {
    
    $('.id4').each(function() {
        var tags = $(this).find('.tft').map(function() {
            return this.title.replace(/(female:|male:)/g,"");
        }).get();
    
        $('<div>', {
            'class': 'tags',
            'text': tags.join(', ')
        }).insertAfter(this);
    
    });
    $(".tags").css({'padding':'2px 4px','text-align':'center','min-height':'3em'});
    $(".id1").attr("style","height:370px");
});