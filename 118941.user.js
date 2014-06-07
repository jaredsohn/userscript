// ==UserScript==
// @name           v2ex-expand
// @namespace      me.tuoxie.v2ex-expand
// @description    expand v2ex articles
// @include        http://www.v2ex.com/*
// @exclude        http://www.v2ex.com/t/*
// ==/UserScript==

// Author: Xu Ke <http://tuoxie.me>
// Created: 2011-11-24
// Version: 3.0
// Updated: 2011-12-08

var w = unsafeWindow;

function exec() {
String.prototype.format = function() {
    var newstr = this;
    for (i in arguments) {
        newstr = newstr.replace('('+i+')', arguments[i]);
    }
    return newstr;
}

var $ = w.$;
$(function() {
    var _self = {};
    var lines = 0;
    $('.cell').each(function(){
        if ($(this).attr('class').indexOf('from') >= 0) {
            $(this).addClass('line-' + lines);
            lines ++;
        }
        if ($(this).attr('class').indexOf('from') >= 0) {
            var article_box = this;
            var title = $(this).find('span.bigger a');
            var turl = title.attr('href');
            var tid = /\d+/.exec(turl)[0];
            title.attr('id', 't-'+tid);
            var bline = $(this).find('span.created');
            var expend = $(this).find('span.created .expend');
            if (expend.length == 0) {
                expend = $('<strong class="expend"><a id="e-'+tid+'" href="javascript:;">展开</a></strong>');
                expend.appendTo(bline);
            }
            expend.children('a').toggle(function(e){
                var expended = $(this).closest('.cell').find('.expended-content');
                if (expended.length > 0) {
                    expended.slideDown('fast', function() {
                        $('#e-'+tid).text('收起');
                    });
                } else {
                    var dots = 0;
                    if (_self.loading_text_change)
                        clearInterval(_self.loading_text_change);
                    _self.loading_text_change = setInterval(function(){
                        dots = dots % 3 + 1;
                        var text = '展开',
                            i = 0;
                        while (dots - i++) {
                            text += '.';
                        }
                        expend.children('a').text(text);
                    }, 300);
                    var table = $(this).closest('table');
                    // var loading = $('<div class="loading" id="loading-'+tid+'">正在加载...</div>')
                    //     .css({'left': e.pageX,'top': e.pageY}).appendTo($(document.body));
                    var expended = $('<div id="expended-'+tid+'"></div>')
                        .insertAfter(table).addClass('expended-content');
                    $.ajax({
                        url: turl,
                        dataType: 'html',
                        success: function(html) {
                            clearInterval(_self.loading_text_change);
                            var m = /<div class="content topic_content">[\s\S]*?<\/div>/.exec(html);
                            var rm = /<div id="replies">[\s\S]*?<\/div>[\s]*?<\/div>/.exec(html);
                            w.is_admin = /is_admin[\S]*?=[\S]*?true;/.test(html);
                            w.replies_keys = w.replies_ids = w.replies_parents = new Array();
                            if (!m && !rm) {
                                $('#e-'+tid).text('没内容, 也没回帖').unbind('click').removeAttr('href');
                            } else {
                                var c = m ? m[0] : '';
                                var r = rm ? rm[0] : '';
                                var f = '<form target="_blank" method="post" action="/t/'+tid+'">'
                                           +'<div class="cell">'
                                               +'<textarea name="content" class="mll"></textarea>'
                                               +'<input type="submit" value="发送" class="super normal button">'
                                           +'</div>'
                                           +'<div class="tools">'
                                               +'<a class="article-expend" href="javascript:;">收起全部</a>'
                                               +(rm ? '<a class="comments-expend" href="javascript:;">展开评论</a>' : '<a class="comments-expend">没有评论</a>')
                                               +'<div class="tools-clear"></div>'
                                           +'</div>'
                                       +'</form>';

                                expended.html(c+r+f);
                                expended.find('#replies').addClass('box').hide();
                                expended.slideDown('fast', function() {
                                    regulate_scroll($(this).closest('.cell'));
                                });
                                expended.find('form').bind('submit', function() {
                                    return this.content.value.length > 0;
                                });
                                expended.find('textarea');
                                expended.find('div.topic_content').addClass('box');
                                expended.find('>form>div.cell');
                                expended.find('.tools').find('a');
                                expended.find('.tools-clear');
                                expended.find('.reply');
                                expended.find('.article-expend').click(function() {
                                    $('#e-'+tid).click();
                                    w.location.href = w.location.href.split('#')[0]+'#t-'+tid;
                                });
                                expended.find('.comments-expend').toggle(function() {
                                    if ( ! rm) return;
                                    var link = this;
                                    expended.find('#replies').slideDown('fast', function() {
                                        expended.find('.comments-expend').text('收起评论');
                                        expended.find('.ve-page').css('display', 'inline');
                                    })
                                }, function() {
                                    if ( ! rm) return;
                                    var link = this;
                                    expended.find('#replies').slideUp('fast', function() {
                                        expended.find('.comments-expend').text('展开评论');
                                        expended.find('.ve-page').hide();
                                    });
                                    w.location.href = w.location.href.split('#')[0]+'#t-'+tid;
                                });
                                expended.find('table tr').each(function(){
                                    $(this).children('td:first').css({'padding': '5px 0 0 5px'})
                                });
                                function replace_quote_img() {
                                    if ($(this).hasClass('changed')) return;
                                    $(this).addClass('changed');
                                    var onclick = $(this).attr('onclick');
                                    var uname = onclick.substr(10, onclick.length-12);
                                    $(this).attr('onclick', '');
                                    $(this).click(function() {
                                        (function() {
                                            var oldContent = this.val();
                                            var prefix = "@" + uname + " ";
                                            var newContent = "";
                                            if (oldContent.length > 0) {
                                                if (oldContent != prefix) {
                                                    newContent = prefix + oldContent;
                                                }
                                            } else {
                                                newContent = prefix;
                                            }
                                            this.focus();
                                            this.val(newContent);
                                        }).call(expended.find('textarea'));
                                    });
                                }
                                expended.find('img.clickable').each(function() {
                                    replace_quote_img.call(this);
                                });
                                var current = $('.current-box.cell');
                                if (current.length && current.get(0) != article_box) {
                                    current.find('.expended-content').slideUp('fast', function() {
                                        current.find('.expend a').text('展开');
                                    });
                                    current.removeClass('current-box');
                                }
                                $(article_box).addClass('current-box');

                                // Load more replies
                                var pn = expended.parent().find('>table .fr a').text();
                                if (pn > 100) {
                                    var pages = {};
                                    var rps = {};

                                    var page_span = $('<span></span>')
                                                        .addClass('ve-page')
                                                        .attr('id', 've-page-'+tid)
                                                        .hide();
                                    var pg = parseInt(pn/100)+1;
                                    function create_page_link(pg) {
                                        pages[pg] = $('<a></a>')
                                                        .attr('href', 'javascript:;')
                                                        .text(pg)
                                                        .attr('id', 've-page-'+tid+'-'+pg)
                                                        .click(function() {
                                                            if ($(this).hasClass('selected')) return;
                                                            expended.find('#replies').hide('fast').html(rps[pg]).show('fast');
                                                            expended.find('.selected').removeClass('selected');
                                                            $(this).addClass('selected');
                                                            expended.find('img.clickable').each(function() {
                                                                replace_quote_img.call(this);
                                                            });
                                                        });
                                        if (page_span.children('a').length) {
                                            return pages[pg].insertBefore(page_span.children('a:first'));
                                        } else {
                                            return pages[pg].appendTo(page_span);
                                        }
                                    }
                                    create_page_link(pg).addClass('selected');
                                    page_span.insertBefore(expended.find('.tools .article-expend'));
                                    rps[pg] = expended.find('#replies').html();
                                    var p = pn/100;
                                    while (p > 1) {
                                        pg = parseInt(p);
                                        $.ajax({
                                            url: '/t/' + tid + '?p=' + pg,
                                            dataType: 'html',
                                            success: function(html) {
                                                var rm = /<div id="replies">[\s\S]*?<\/div>[\s]*?<\/div>/.exec(html);
                                                if (rm) {
                                                    rps[pg] = rm[0].substr(18, rm[0].length-18-6);
                                                    create_page_link(pg);
                                                }
                                            }
                                        });
                                        p --;
                                    }
                                }
                            }
                            // loading ? loading.remove() : '';
                            $('#e-'+tid).text('收起');
                        },
                        error: function(ret) {
                            clearInterval(_self.loading_text_change);
                            $('#e-'+tid).text('网络异常，请重试');
                        }
                    });
                }
            },
            function(e) {
                var link = this;
                $(this).closest('.cell').find('.expended-content').slideUp('fast', function() {
                    $(link).text('展开');
                    if (_self.current_box) {
                        regulate_scroll(_self.current_box);
                        _self.current_box = null;
                    }
                });
            });
        }
    });

    function regulate_scroll($ele) {
        if ($ele.length) {
            ele = $ele.get(0);
            var scrollTop = ele.offsetTop+ele.offsetHeight-window.pageYOffset-window.innerHeight;
            if (scrollTop > 0)
                w.scrollBy(0, scrollTop+30);
            scrollTop = ele.offsetTop-window.pageYOffset;
            if (scrollTop < 0)
                w.scrollBy(0, scrollTop-20);
        }
     }

    var current = -1,
        ctrl_down = false,
        current_comment = -1,
        last_box = null;
    $(window).bind('keydown', function(e) {
        if ($('.current-box.cell textarea:focus').length) return;
        if ($('textarea.mlt:focus').length) return;
        if (ctrl_down) return;
        function elevator(down) {
            if ($('.current-box .reply:visible').length) {
                if ((function() {
                    if (down)
                        current_comment ++;
                    else
                        current_comment --;
                    var current_box = $('.current-box').get(0);
                    if (last_box != current_box) {
                        current_comment = 0;
                    }
                    last_box = current_box;
                    var len = $('.current-box .reply').length;
                    if (down && current_comment >= len) {
                        return false;
                    } else if (!down && current_comment < 0) {
                        return false;
                    }
                    $('.current-comment').removeClass('current-comment');
                    var $cmtbox = $('.current-box .reply:eq('+current_comment+')').addClass('current-comment');
                    regulate_scroll($cmtbox);
                    return true;
                })()) return;
            }

            if (down) {
                current ++;
                if (current >= lines) {
                    current = lines - 1;
                }
            } else {
                current --;
                if (current < 0) {
                    current = 0;
                }
            }
            var $ele = $('.line-' + current);
            var ele = $ele.length ? $ele.get(0) : null;

            (function() {
                var current = this;
                if (current.length && current.get(0) != ele) {
                    if (current.find('.expend a').text() == '收起') {
                        _self.current_box = $ele;
                        current.find('.expend a').click();
                    }
                    current.removeClass('current-box');
                }
            }).call($('.current-box.cell'));

            $ele.addClass('current-box');
            regulate_scroll($ele);
        }
        if (e.keyCode == 74) { // j
            elevator(true);
        } else if (e.keyCode == 75) { // k
            elevator(false);
        } else if (e.keyCode == 79) { // o
            _self.current_box = $('.line-(0)'.format(current));
            $('.line-(0) strong.expend a'.format(current)).click();
            current_comment = -1;
        } else if (e.keyCode == 82) { // r
            $('.current-box .reply.current-comment:visible .changed').click();
            $('.current-box.cell textarea').focus();
            return false;
        } else if (e.keyCode == 77) { // m
            $('.line-' + current + ' div.tools a.comments-expend').click();
        } else if (e.keyCode == 76) {
            if ($('#Rightbar:visible').length) {
                $('#Rightbar').hide();
                $('#Content').css('margin', '0');
            } else {
                $('#Rightbar').removeAttr('style');
                $('#Content').removeAttr('style');
            }
        } else if (e.keyCode == 84) { // t
            $('textarea.mlt').focus();
            return false;
        } else if (e.keyCode == 224 || e.keyCode == 17) {
            ctrl_down = true;
        }
    });

    $(window).bind('keyup', function(e) {
        if (e.keyCode == 224 || e.keyCode == 17) {
            ctrl_down = false;
        }
    });
});

$('<style>\
.tools{padding-left:250px;}\
.ve-page a{font-weight:bold;color:#778087;font-size:14px;padding:2px 5px;text-decoration:none;border-radius:3px;margin:0 2px;}\
.ve-page a:hover{color:#fff;background:#f93;}\
.ve-page .selected{color:black;background:#f0f0f0;cursor:text;}\
.ve-page .selected:hover{color:black;background:#f0f0f0;cursor:text;}\
.loading{position:absolute;background:rgba(0, 153, 0, 0.7);border:1px solid #999;border-radius:3px;line-height:23px;text-align:center;font-size:12px;width:80px;height:23px}\
.expended-content{background:#f0f0f0;padding:5px 25px 5px 50px;font-size:12px;display:none;border:0px solid #999}\
.expended-content textarea{width:85%;height:3em;display:inline;margin-bottom:-6px;margin-right:5px;resize:vertical}\
.expended-content .topic_content{padding-left:15px;margin-bottom:30px}\
.expended-content>form>div.cell{padding:10px 0}\
.expended-content .tools{padding-right:75px;height:15px}\
.expended-content .tools>a{float:right;margin-left:10px;color:#778087}\
.expended-content .tools-clear{clear:both;width:100px}\
.expended-content .reply{padding:0}\
.expend{float:right}\
.expend a{color:#778087}\
.current-box{background:#eee}\
.current-comment{background:#eee}\
.created{padding-right:70px}\
</style>').appendTo($('body'));

}


function load_jQuery() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            w.eval(xmlhttp.responseText);
            exec();
        }
    }
    xmlhttp.open('GET', '/static/js/jquery.js', true);
    xmlhttp.send();
}

if (w['$']) {
    exec();
} else {
    load_jQuery();
}
