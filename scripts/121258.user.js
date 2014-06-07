// ==UserScript==
// @name           TOPIT
// @namespace      http://www.douban.com/people/angelscat/
// @description    下载TOPIT大图
// @include        http://www.topit.me/album/*
// @author         angelscat
// @version        2.0
// ==/UserScript==

var $;
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else {$ = unsafeWindow.jQuery; begin(); }
}
GM_wait();

function begin(){
	if(!$('#content div.catalog')[0]) return;

	var l = $('<li><a href="javascript:;">Large</a></li>'),
		o = $('<li><a href="javascript:;">Origin</a></li>')
	$('#content ul.tabs').append(l).append(o);
	l.click(function(){
		getUrls('l');
	});
	o.click(function(){
		getUrls('o');
	})
}

function getUrls(type){
	if (!$('#tmp')[0]) {
        $('body').prepend('<textarea id="tmp" style="height:300px; width:800px;"></textarea>');
    }
    var tmp = $('#tmp').val('');
    var len = $('#page-next').prev().text() * 1 || 1;
    var href = location.href.split('?')[0];
    function g(n) {
        if (n <= 0) return;
        $.get(href + '?p=' + n,function(data) {
            var str = '';
            $(data).find('#content img.img').each(function(i, v) {
                var src = $(this).attr('src').indexOf('blank.gif') >= 0 ? $(this).attr('data-original') : $(this).attr('src');
                if(type === 'l'){
                    src = src.replace('/s', '/l').replace('s.', 'l.').replace('/t', '/l').replace('t.jpg', 'l.jpg').replace('/m', '/l').replace('m.', 'l.');
                }else if(type === 'o'){
                	src = src.replace('/s','/o').replace('s.','o.').replace('/t','/o').replace('t.jpg','o.jpg').replace('/m','/o').replace('m.','o.').replace('/l','/o').replace('l.','o.');
                }
                str += src + '\n';
            });
            tmp.val(tmp.val() + str);
            g(--n);
        })
    }
    g(len);
}