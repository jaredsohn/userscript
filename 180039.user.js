// ==UserScript==
// @name         DM Doulist
// @namespace    http://www.douban.com/
// @version      0.8
// @match        http://movie.douban.com/doulist/*
// @description  for douban.com movie doulist
// @grant        GM_addStyle
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.min.js
// @require      http://code.jquery.com/ui/1.10.3/jquery-ui.js
// ==/UserScript== 
$('.article>.paginator').css('display', 'none')
// handle this page
$('.filters').after('<ul class="doulist_items"></ul>')
$('.article>p, .article>table').appendTo('.doulist_items')
// load all items
var prev = $('.thispage').prevAll('a')
var next = $('.thispage').nextAll('a')
var pages = prev.add(next)
if (pages.length) {
    var i = 0
    load_items()
} else {
    do_doulist()
}

function load_items() {
    $.get(pages[i].href, function (data) {
        i = i + 1
        if (i <= prev.length) {
            $('.doulist_items').prepend($('.article>p, .article>table', data))
            load_items()
        } else if (i <= pages.length) {
            $('.doulist_items').append($('.article>p, .article>table', data))
        }
        if (i < pages.length) {
            load_items()
        } else {
            do_doulist()
        }
    })
}

function do_doulist() {
    $('.doulist_item img').each(function () {
        this.src = this.src.replace(/spic/, 'lpic').replace(/ipst/, 'lpst').replace(/icon/, 'photo')
    })
    $('.doulist_items>table').after('<li></li>')
    $('.doulist_items>table').each(function () {
        $(this).appendTo($(this).next())
    })
    $('.doulist_items>p').each(function () {
        $(this).prependTo($(this).next())
    })
    var hash = location.hash
    location.hash = ''
    location.hash = hash
    sort_items()
    title_mode()
}

function sort_items() {
    var isMine = $('.doulist-admin').length
    var sort = {
        cursor: "move",
        delay: 200,
        handle: '.pl2',
        update: function (evt, ui) {
            var data = {}
            data.ck = get_cookie('ck')
            data.dl_index = $('.doulist_items>li').index(ui.item) + 1
            data.dl_subject = ui.item.find('.ul').attr('id').slice(2)
            data.dl_submit = '更新评语和位置'
            var this_comment = ui.item.find('.doulist-item-comment')
            data.dl_comment = this_comment.length ? this_comment.contents()[2].data.slice(2).trim() : ''
            $.post(location.origin + location.pathname, data, function () {
                $('.doulist_item .pl2').each(function (d) {
                    this.childNodes[2].data = (d + 1) + '.'
                })
            })
        }
    }
    if (isMine) {
        GM_addStyle('.doulist_item .pl2:hover { width:100%; cursor: move; background-color: #F2FBF2 }')
        $('.doulist_items').sortable(sort)
    }
}

function title_mode() {
    $('.filters').append(
        '<div class="rr" style="margin:0 10px 0 0;"><label><input type="checkbox" id="title-mode">只看标题</label></div>'
    )
    $('#title-mode').click(function () {
        $('.doulist_item .pl2').siblings().add('.doulist_item td:nth-child(1)').toggle()
    })
}