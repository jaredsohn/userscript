// ==UserScript==
// @name       Hobbyking script
// @namespace  ru.alex
// @version    0.1
// @description  hk
// @match      http://hobbyking.com/*
// @copyright  2012+, You
// ==/UserScript==

$('#daily').empty();

$('<span class="btn btn-mini btn-info"><a style="color: #fff" href="http://hobbyking.com/hobbyking/store/uh_customerShowOrders.asp">Заказы</a></span>')
.insertAfter( $($('#member').children()[0]) );

console.log($('#member').children()[0]);

var span = $('#tableContent>span.bigNnice');
if (span) {
    var buttons = $('#tableContent').find('input:button');
    $.each(buttons, function(i, it) {
        
        var td = $(it).parent().next().next();
        var id = $(td.children()[0]).text();
        td.html('<a href="uh_customerShowOrderDetails2.asp?idOrder=' + id + '">'+id+'</a>');
    });
}
