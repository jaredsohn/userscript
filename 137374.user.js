// ==UserScript==
// @name           orange
// @version         1.00
// @namespace      orange
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        http://www.orange.pl/portal/map/map/message_box*mbox_view=newsms*
// ==/UserScript==
var console = unsafeWindow.console;
GM_addStyle(".autoCompleteList li {text-align: left; } .autoCompleteList li a {cursor: pointer; padding: 5px; display: block;} .autoCompleteList li a:hover { background: #eee; text-decoration: none;} .autoCompleteList li a.marked {background: #ff9751;} .autoCompleteList li a.group {background: #eee;}");
var contacts = {};
$.ajax({
    url: "/gear/mapmessagebox/ajax",
    type: "POST",
    data: {
        c:"AddressBookFormHandler",
        m:"getContacts",
        p:'{"AsortField": "nickname", "BsortOrder": "true"}'
    },
    dataType: "json"
}).done(function(msg){
    for(i in msg){
        contacts[msg[i].telefon]= msg[i].pseudonim;
    }
})
$('form[name="sendSMS"]').attr('autocomplete', 'off');
function getMarkedAId(def)
{
    var id = def;
    $('.autoCompleteList li a').each(function(i,e)
    {
        if($(e).hasClass('marked'))
            id = i;
    });
    return id;
}
$('.autoCompleteList li a').live('click', function(){
    var markedItem = $(this);
    var numbers = $('input#smsTo').val().split(', ');
    numbers[numbers.length-1] = markedItem.attr('id');
    $('input#smsTo').val(numbers.join(', ')+', ');
    listHide();
})
$('input#smsTo').on("keypress", function(event) {
    return event.keyCode != 13;
}).on('blur', function(){
    listHide();
}).on('keyup', function(event){
    switch(event.which)
    {
        case 38:
            event.preventDefault();
            var markedId = getMarkedAId($('.autoCompleteList li a').length);
            $($('.autoCompleteList li a')[markedId]).removeClass('marked');
            if(markedId-1 < 0)
                markedId = $('.autoCompleteList li a').length;
            $($('.autoCompleteList li a')[markedId-1]).addClass('marked');
            break;
        case 40:
            event.preventDefault();
            var markedId = getMarkedAId(-1);
            $($('.autoCompleteList li a')[markedId]).removeClass('marked');
            if(markedId+1 == $('.autoCompleteList li a').length)
                markedId = -1;
            $($('.autoCompleteList li a')[markedId+1]).addClass('marked');
            break;
        case 13:
            event.preventDefault();
            event.stopPropagation();
            var markedItem = $('.autoCompleteList li a.marked');
            if(markedItem.length){
                var numbers = $('input#smsTo').val().split(', ');
                numbers[numbers.length-1] = markedItem.attr('id');
                $('input#smsTo').val(numbers.join(', ')+', ');
                listHide();
            } else {
                var numbers = $('input#smsTo').val().split(',');
                var submit = true;
                for(i in numbers)
                {
                    number = $.trim(numbers[i]);
                    if($.trim(number).length && !isNumber($.trim(number))){}
                    else
                    {
                        submit = false;       
                    }
                }
                if(!submit)
                {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            $('input#smsTo').focus();
            break;
        case 27:
            listHide();
            break;
        default:
            var numbers = $(this).val().split(',');
            if(numbers[numbers.length-1].length){
                var match = {};
                var ilosc = 0;
                for(i in contacts)
                {
                    var patt1= new RegExp($.trim(numbers[numbers.length-1]),'i');
                    if(patt1.test(contacts[i]))
                    {
                        ilosc++;
                        match[i] = contacts[i];
                    }
                }
                if(ilosc)
                    listDraw(match);
                else
                    listHide();
            } else{
                listHide();
            }
            break;
    }
})
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function listHide()
{
    $('.autoCompleteList').css('display', 'none');
    var markedId = getMarkedAId(-1);
    if(markedId > -1)
        $($('.autoCompleteList li a')[markedId]).removeClass('marked');
}
function listDraw(contactsList)
{
    var position = $('#smsTo');
    var eTop = position.offset().top;
    topPosition = eTop - $(window).scrollTop();
    listTop = eTop+$('#smsTo').height();
    listLeft = position.offset().left;
    if($('.autoCompleteList').length == 0){
        var lista = $('<div />').attr('class', 'autoCompleteList').css({
            'position' : 'absolute',
            'top' : listTop+3,
            'left' : listLeft,
            'padding' : 0,
            'border' : '1px solid #aaa',
            'z-index' : '9999',
            'color' : '#000',
            'background' : '#fff',
            'display': 'block'
        });
    }else
        var lista = $('div.autoCompleteList').css('display', 'block');
    var listaBody = '<ul>';
    var first = true;
    for( i in contactsList)
        if(first)
        {
            listaBody += '<li><a class="marked" id="'+i+'">'+contactsList[i]+'</a></li>';    
            first = false;
        }
        else
            listaBody += '<li ><a id="'+i+'">'+contactsList[i]+'</a></li>';    
    listaBody +='</ul>';
    lista.html(listaBody);
    $('body').prepend(lista);
}