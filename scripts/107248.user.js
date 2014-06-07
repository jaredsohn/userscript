// ==UserScript==
// @name           Better V2EX
// @namespace      mybeky
// @include        http://www.v2ex.com/
// @include        http://www.v2ex.com/recent
// @include        http://www.v2ex.com/changes*
// @include        http://www.v2ex.com/go/*
// @version        0.1
// ==/UserScript==

$ = unsafeWindow.$;

var html_str = '<div style="margin: 0pt auto; width: 960px; height: 600px; z-index: 2; position: absolute; top: 30px;"> \
    <div style="position: fixed; width: 500px; margin-left: 160px; border-top: 0 none; border-right: 0 none; display: none;" id="detail" class="box">\
        <div class="cell" style="padding: 0; border-radius: 5px; border-top:2px solid #EEE; background-color: #EEE;">\
            <a id="closeButton" href="#">x</a><div class="c"></div></div><div id="contentList" class="cell"></div></div>\
                <div id="loading" style="display: none; position: fixed; top: 300px; width: 20px; margin-left: 790px;">\
                    <img src="http://mybeky.tk/assets/images/loader.gif"> </div> </div>';
var last_focused_cell;
var is_detail_pane_shown = false;

$('#Content').css({
    position: 'relative',
    zIndex: 3
});

$('#Main').css({
    position: 'relative'
});

$(html_str).appendTo($('#Main'));

var show_detail = function (cell) {
    if (!is_detail_pane_shown) {
        $('#detail').show();
        $('#detail').animate({
            marginLeft: '+=400'
        }, 300, function() {
            $('#loading').show();
        });
        $('#Content').animate({
            left: '-100'
        }, 300);
        is_detail_pane_shown = true;
    } else {
        $('#loading').show();
    }
    var title = cell.find('span.bigger').text();
    var topic_url = cell.find('span.bigger a').attr('href');
    $('#Rightbar').css('z-index', 2);
    $('#contentList').html('');
    var topic_id = topic_url.match(/t\/(\d+)/)[1];
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://mybeky.tk/app/v2ex/topic/" + topic_id,
            onload: function(response) {
                $('#loading').hide();
                var contentList = $('#contentList');
                contentList.html('');
                var cells = response.responseText;
                $(cells).find('.cell').appendTo(contentList);
            }
        });
    }, 0);

}

$('#Content .cell[class*="from"]').live('click', function() {
    if (last_focused_cell) {
        if (last_focused_cell[0] == $(this)[0]) {
            return;
        }
        last_focused_cell.removeClass('focused-cell');
    }
    $(this).addClass('focused-cell')
    last_focused_cell = $(this);
    show_detail($(this));
});

$('#closeButton').click(function() {
    $('#detail').animate({
        marginLeft: '-=400'
    }, 300, "linear", function() { 
        $('#detail').hide();
        $('#contentList').html('');
        $('#Rightbar').css('z-index', 3);
    });
    $('#Content').animate({
        left: '0'
    }, 300);
    is_detail_pane_shown = false;
    $('#loading').hide();
    return false;
});

var resize_pane = function() {
    $('#contentList').css('height', $(this).height() - 150);
}

$(window).resize(resize_pane);

resize_pane();

GM_addStyle('   #Content .cell[class*="from"]:hover { background-color: #E5E5FF; }\
                #Rightbar { position: relative; z-index: 3;}\
                .focused-cell { background-color: #EBEBEB;}\
                #detail h1 {font-size: 18px; line-height: 120%; padding: 0;}\
                #contentList {overflow-y: auto; overflow-x: hidden;}\
                #contentList .cell:nth-child(1) {font-size: 14px;}\
                #contentList .cell:nth-last-child(1) {display: none;}\
                #contentList .cell {line-height: 18px;}\
                #closeButton {text-decoration: none; margin: 5px 8px; float: right; color: #888888; font: bold 14px Tahoma,Arial,sans-serif;}\
                .ago {font-size: 10px; font-weight: bold; color:#ccc; line-height: 10px;}');
