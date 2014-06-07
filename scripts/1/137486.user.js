// ==UserScript==
// @name       Gaia Online PM improvements
// @namespace  http://mathemaniac.org
// @version    1.1
// @description  Improves PMs on Gaia in a few different ways.
// @match      http://www.gaiaonline.com/profile/privmsg.php*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @copyright  2012, Sebastian Paaske Tørholm
// ==/UserScript==

// Downloaded from http://userscripts.org/scripts/show/137486

$('#erroroutput.msgbad').each( function (i, e) {
    //$('#entry_form').attr('action', $('#entry_form').attr('action') + '?auto=1');
    var cnt = 50;
    var username = $('#username').attr('value');
    var i = setInterval(function () {
        if (cnt > 0) {
            $(e).text("Autosending in " + cnt + " seconds.");
            $('title').text(username + ': ' + cnt + " seconds.");
            cnt--;
        } else {
            $(e).text("Autosending now...");
            clearInterval(i);
            $('title').text(username + ': Sending...');
            $('#selected_options').attr('value', 'post');
            $('#entry_form').submit();
        }
    }, 1000);
} );

$('button#btn_delete').each( function (i, e) {
    $(e).after('<a href="#" id="select_read" style="padding-left: 1em; padding-right: 1em;">Select replied</a>');
    $('#select_read').click( function (ev) {
        $('tr').each( function (i, e) {
            $('input[type="checkbox"]', e).attr('checked', $('img[alt="Replied Message"]', e).length > 0);
        });
        ev.preventDefault();
    } );
} );

$('div.mainError div.errorHead').each( function (i, e) {
    if ($.trim($(e).text()) != "Information") { return; }
    
    if (("" + document.location).match(/folder=inbox/)) {
        document.location = "http://www.gaiaonline.com/profile/privmsg.php?folder=inbox";
    } else {
        // TODO: Make it close window on sent message.
        // window.close();
    }
});

(function () {
    // Hide quotes more than 10 levels deep.
    var levels = 10;
    var selector = "";
    for (var i = 0; i < levels; i++) {
        selector += 'td.quote ';
    }
    var first = $(selector + 'table').first();
    
    first.css({'display': 'none'});
    first.before('<a id="mathemaniac_show_deeply_nested" href="#">Show hidden quotes.</a>');
    var nestlink = $('#mathemaniac_show_deeply_nested');
    nestlink.css({
        'display': 'block',
        'border': '1px solid red',
        'padding': '0.25em',
        'margin': '0.25em',
        'text-align': 'center'
    });
    nestlink.click( function (ev) {
        nestlink.remove();
        first.css({'display': 'inherit'});
        ev.preventDefault();
    });
})();