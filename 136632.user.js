// ==UserScript==
// @name        sape clicker
// @namespace   gruz0.ru
// @include     *.sape.ru/*
// @require  http://dev.gruz0.ru/js/cookie.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     2
// ==/UserScript==
if (unsafeWindow.jQuery === undefined) {
  // jQuery is NOT loaded
} else {
  // jQuery is already loaded
    var row1 = 0;
    var row2 = 0;

    $('body').append('<script type="text/javascript" src="http://dev.gruz0.ru/js/cookie.js"></script>');
    $('body').append('<style>'+
        '#sapeClicker {z-index:1000;position:fixed;right:20px;top:96px;width:160px;background-color:#777;color:#eee;font-size:12px;padding:5px 3px;}'+
        '#sapeClicker #toggleSapeClicker {display:block;margin:0 0 5px 0;font-weight:bold;color:#00f;background-color:#eee;padding:3px;}'+
        '#sapeClicker ul {list-style-type:none;display:none;}'+
        '#sapeClicker li {margin:0 0 3px 0;padding:7px 10px;}'+
        '#sapeClicker span {display:block;width:50px;}'+
        '#sapeClicker .small {width:80px;}'+
    '</style>');
    $('body').append('<div id="sapeClicker"></div>');
    $('#sapeClicker').append('<a href="#" id="toggleSapeClicker">Show/hide</a>');
    $('#sapeClicker').append('<ul></ul>');
    $('#sapeClicker ul').append('<li><input type="button" id="btnSelectRows" value="Select range" /></li>');
    $('#sapeClicker ul').append('<li><input type="button" id="btnClearRows" value="Clear range" /></li>');

    $('table tbody input[type=checkbox]').live('click', function() {
        var value = $(this).closest('td').parent().prevAll().length;
        if (row1 == 0) row1 = value; else row2 = value;
    });

    $('#btnSelectRows').live('click', function() {
        if (row1 == 0 && row2 == 0) return;
        if (row1 > row2) {var tmpRow = row1;row1 = row2;row2 = tmpRow;}

        $('table tbody input[type=checkbox]').removeAttr('checked');

        $('table tbody tr').each(function() {
            if ($(this).index() >= row1 && $(this).index() <= row2) {
                $(this).find('input[type=checkbox]').attr('checked','checked');
            }
        });
    });

    $('#btnClearRows').live('click', function() {
        $('table tbody input[type=checkbox]').removeAttr('checked');
        row1 = 0; row2 = 0;
    });

    $('#toggleSapeClicker').live('click', function() {
        toggleSapeClicker();
    });

    $(document).ready(function() {
        var $cookie = gruz0_readCookie('sapeClicker');
        if ($cookie == null || $cookie == 'hide') $('#sapeClicker ul').show(); else $('#sapeClicker ul').hide();
    });
}

function toggleSapeClicker() {
    var $cookie = gruz0_readCookie('sapeClicker');
    if ($cookie == null) {
        gruz0_createCookie('sapeClicker', 'show', 7);
        $('#sapeClicker ul').show();
    } else {
        if ($cookie == 'show') {
            gruz0_createCookie('sapeClicker', 'hide', 7);
            $('#sapeClicker ul').show();
        } else {
            gruz0_createCookie('sapeClicker', 'show', 7);
            $('#sapeClicker ul').hide();
        }
    }
    return false;
}
