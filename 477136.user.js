// ==UserScript==
// @name       Virta Hide Units
// @namespace  http://virtonomica.ru/vera/main/user/view/1072575
// @version    1.0.1
// @description  скрывает юниты заданных типов
// @match      http://virtonomica.ru/*/main/company/view/*/unit_list
// @copyright  2014+, Антон К.
// ==/UserScript==

var ls = localStorage;
if(ls.getItem('hiddenTypes') == null) ls.setItem('hiddenTypes','');
var select = ls.getItem('hiddenTypes').split(',').filter(function(i){return i != ''});
var html = $('.u-l').html();
$('.unit-top tbody').prepend('<tr><td class="u-h u-l">'+html+'</td></tr>');
$('.u-h a').each(function(){
    $(this).removeClass('.u-s');
    if(select.indexOf($(this).attr('class').split(' ')[0]) > -1) $(this).addClass('u-s');
});
hide();
$('.u-h a').click(function(e){
    debugger;
    //todo save and load to localstorage
    e.preventDefault();
    var type = $(this).attr('class').split(' ')[0];
    if($(this).hasClass('u-s')) {
        $(this).removeClass('u-s');
        select.splice(select.indexOf(type),1);
    } else {
        $(this).addClass('u-s');
        select.push(type);
    }
    hide();
    localStorage.setItem('hiddenTypes', select.join(','));
});

function hide() {
    var coll = $('.unit-list>tbody > tr').slice(1);
    coll.each(function(i){
        i = $(this);
        if(select.indexOf($('td:eq(2)',i).attr('class').split(' ').pop()) > -1) i.hide();
        else i.show();
    });
}