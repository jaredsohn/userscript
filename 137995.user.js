// ==UserScript==
// @name        Only Show This User Posts Chinalist
// @namespace   qixinglu.com
// @description 内置中文网站的 Only Show This User Posts 规则
// @require     https://raw.github.com/muzuiget/greasemonkey-scripts/4531270c3f8fe04cce9981251d1f925df0f93168/only_show_this_user_posts.user.js
// @include     http://www.douban.com/group/topic/*
// @include     http://tieba.baidu.com/p/*
// ==/UserScript==

var SITES = [
{
    title: '豆瓣小组',
    url: 'http://www.douban.com/group/topic/*',
    style: 'div.reply-doc:hover div.operation_div {' +
           '    display: block;' +
           '    width: auto;' +
           '}' +
           'div.reply-doc a.ostup {' +
           '    color: #BBBBBB;' +
           '    font-size: 12px;' +
           '}' +
           '#link-report a.ostup {' +
           '    float: right;' +
           '    color: #BBBBBB;' +
           '}',
    post: 'div.topic-content.clearfix, ul.topic-reply li',
    position: '#link-report, div.operation_div',
    username: 'div.topic-doc span.from a, div.reply-doc h4 a'
},
{
    title: '百度贴吧',
    url: 'http://tieba.baidu.com/p/*',
    style: 'a.ostup {' +
           '    color: #AAAAAA;' +
           '    maring-top: 10px;' +
           '}' +
           'li.ostup {' +
           '    list-style: none outside none;' +
           '}',
    post: 'div.l_post',
    position: 'ul.p_author, div.d_author_anonym',
    username: 'a.p_author_name, div.d_author_anonym',
    container: '<li class="ostup"></li>'
},
];

var site = select_site(SITES);
if (site !== null) {
    site.showOnlyLabel = '只看这个用户';
    site.showAllLabel = '显示全部用户';
    var control = ostup(site);
    document.addEventListener('LightPagerAppended', function() {
        control.add_buttons();
        control.do_filter();
    });
}
