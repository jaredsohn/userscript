// ==UserScript==
// @name           Oli's USE Favourite script
// @namespace      http://userscripts.org/users/217436
// @description    Adds a favourite link to the question listings
// @include        http://ubuntu.stackexchange.com/questions*
// ==/UserScript==

var $    = unsafeWindow['$'],
    fkey = unsafeWindow['preffkey'];

$('#questions .question-summary').each(function(el){
    link = $($(this).find('h3')).append('<a href="#" class="favlink" style="float:right">Favourite</a>').find('.favlink');
    
    $(link).click(function(ev) {
        id = $(this).parents('.question-summary')[0].id.split('-')[2];
        $.post('http://ubuntu.stackexchange.com/posts/'+id+'/vote/5', {'fkey':fkey});
        return false;
    });
});
