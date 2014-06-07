// ==UserScript==
// @name          豆瓣快看
// @description   快速查看豆瓣小组帖子的内容
// @include       http://www.douban.com/group/*
// @require       http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// ==/UserScript==

$(function(){
    var trs = $('#group-topics table tr').slice(2);
    trs.each(function() {
        $(this).find('td.title a').before('<span class="quick-view-button" style="cursor: pointer">∨</span>');
    });

    $('.quick-view-button').click(function(){
        var tr = $(this).parents('tr'),
            topic_url = $(this).next().attr('href'),
            topic_id = topic_url.match(/topic\/(\d+)/)[1],
            container_id = 'topic-preview-container-' + topic_id;
        if ($(this).hasClass('open')) {
            $('#' + container_id).remove();
            $(this).html('∨');
            $(this).removeClass('open');
        } else {
            var div = $('<div id="' + container_id + '" class="quick-view-container" style="border-bottom: 1px dashed #ddd">...</div>'),
                that = this;
            get_topic_content(topic_id, function(content_html) {
                div.html(content_html);
                tr.after(div);
                $(that).html('∧');
                $(that).addClass('open');
            });
        }
    });

    var get_topic_content = function(topic_id, callback) {
        $.get('http://www.douban.com/group/topic/' + topic_id, function(html) {
            var dom = $(html);
            var content_html = dom.find('.topic-doc .topic-content').html();
            callback && callback(content_html);
        });
    };
});
