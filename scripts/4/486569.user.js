// ==UserScript==
// @name        Pokaż wszystkie komentarze Wykop.pl
// @namespace   http://userscripts.org/scripts/show/486569
// @include     http://*.wykop.pl/*
// @version     1.2
// @grant       none
// @run-at      document-end
// ==/UserScript==
var timeout;
$('a.showAllComments').hover(function () {
    timeout = setTimeout($.proxy(function () {
        $(this).html('Ładuję komentarze...');
        if ($(this).hasClass('aCCreload')) {
            getCommentsForEntry($(this).closest('.aC').data().id, $(this).closest('.aC').find('div.replyForm'));
        } else {
            $(this).closest('.aC').find('.aCC li.dnone').removeClass('dnone');
        }
    }, this), 150);
}, function () {
    clearTimeout(timeout);
});
var backgroundColor = $('.bgf3f3f3').css('backgroundColor');
$('.tcenter.brtopededed').css({
    background: 'none repeat scroll 0% 0% ' + backgroundColor
});
$('.showAllComments.aCCreload.block.bgf3f3f3.c777').css({
    width: '200px',
    margin: '0 auto'
});
