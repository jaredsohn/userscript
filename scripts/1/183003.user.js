// ==UserScript==
// @name render_nuts
// @description render guokr.nuts page and make it easier to use
// ==/UserScript==

function render_nuts() {
    $('#followNuts li').each(function(ind, el) {
        var ukey = $('.follow-btn[data-ukey]', el).attr('data-ukey');
        render_user(ukey, el);
    });
    function render_user(ukey, el) {
        render_articles(ukey, el);
        render_posts(ukey, el);
        render_answers(ukey, el);
    }
    function render_articles(ukey, el) {
        var uid = ukey2uid(ukey);
        $.get('/apis/minisite/article.json',
              {'retrieve_type': 'by_ukey',
               'ukey': ukey,
               'limit' : 1},
               render_span);
        function render_span(data) {
            var articles_count = data.total;
            $('.join-list-desc', el).append('&nbsp;&nbsp;<a target="_blank" href="/i/'+ uid + '/articles/' +'">文章'+ articles_count +'篇</a>');
        }
    }
    function render_posts(ukey, el) {
        var uid = ukey2uid(ukey);
        $.get('/apis/group/post.json',
              {'retrieve_type': 'by_user',
               'ukey': ukey,
               'limit': 1},
               render_span);
        function render_span(data) {
            var posts_count = data.total;
            $('.join-list-desc', el).append('&nbsp;&nbsp;<a target="_blank" href="/i/'+ uid + '/posts/' +'">帖子'+ posts_count +'篇</a>');
        }
    }
    function render_answers(ukey, el) {
        var uid = ukey2uid(ukey);
        $.get('/apis/ask/answer.json',
              {'retrieve_type': 'by_user',
               'ukey': ukey,
               'limit': 1},
               render_span);
        function render_span(data) {
            var answers_count = data.total;
            $('.join-list-desc', el).append('&nbsp;&nbsp;<a target="_blank" href="/i/'+ uid + '/answers/' +'">答案'+ answers_count +'个</a>');
        }
    }
    function ukey2uid(ukey) {
        var uid = '' + parseInt(ukey, 36);
        while(uid.length < 10) uid = '0' + uid;
        return uid;
    }
    $(window).one('scroll', load_next_page_handler);
    function load_next_page_handler() {
        var w_top = $(window).scrollTop();
        var w_height = $(window).height();
        var d_height = $(document).height();
        if(w_top + w_height > d_height - 100) {
            load_next_page();
        } else {
            $(window).one('scroll', load_next_page_handler);
        }
    }
    function load_next_page() {
        var spans = $('ul.gpages li span');
        var cur_page = NaN;
        var cur_page_el;
        for(var i=0;i<spans.length;i++) {
            var p = parseInt($(spans[i]).html());
            if(!isNaN(p)) {
                cur_page = p;
                cur_page_el = $(spans[i]);
            }
        }
        if(!cur_page_el.parent().next().length) {
            return;
        }
        var next_page = cur_page + 1;
        $.get('',
              {'page': next_page},
              render_next_page,
              'html');
        function render_next_page(data) {
            var html = $(data);
            $('ul.join-list li', html).each(function (ind, el) {
                $('ul.join-list').append(el);
                var ukey = $('.follow-btn[data-ukey]', el).attr('data-ukey');
                render_user(ukey, el);
            });
            $('ul.gpages').html($('ul.gpages', html).html());
            $(window).one('scroll', load_next_page_handler);
        }
    }
};
render_nuts();
