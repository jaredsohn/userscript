// ==UserScript==
// @name       douban relation
// @namespace  http://ktmud.com/
// @version    0.1.5
// @description  show whether someone you follow is following you
// @include      http://www.douban.com/contacts/list*
// @include      http://www.douban.com/people/*/
// @downloadURL	   https://userscripts.org/scripts/source/171348.user.js
// @updateURL	   https://userscripts.org/scripts/source/171348.meta.js
// @copyright  2012+, Jesse Yang
// ==/UserScript==

function init() {
    var followers, followings;
    
    var ONE_HOUR = 3600000;
    
    var _perpage = 20;
    var reg_img = /<img.*?>/g;
    
    function get_people(api, thename, callback) {
        var data = localStorage.getItem(thename);
        
        try {
            data = JSON.parse(data);
            data.last_update = new Date(data.last_update);
        } catch(e) {
            data = null;
        }
        
        if (!data) {
            data = { last_update: new Date() };
        }
        if (!data.items || +data.last_update + ONE_HOUR * 120 < +new Date()) {
            var old_h1 = $('h1').html();
            $('h1').html('正在更新友邻关系缓存...  <span id="percent" style="color: #999;"></span>');
            fetch(0, function(data) {
                $('h1').html(old_h1);
                callback(data);
            });
        } else {
            callback(data);
        }
        
        var items = data.items = [];
        
        function fetch(start, callback) {
            $('#percent').html(start);
            
            $.get(api, { start: start }, function(res) {
                var nodes = $($.trim(res).replace(reg_img, '')).find('.user-list > li');
                nodes.each(function(i, item) {
                    items.push(item.id);
                });
                if (nodes.length === _perpage) {
                    fetch(start + _perpage, callback);
                } else {
                    data.last_update = new Date();
                    localStorage.setItem(thename, JSON.stringify(data));
                    callback && callback(data);
                }
            });
        }
    }
    
    function show_follow_me_tip(followers) {
        var items = followers.items;
        
        if (location.pathname.indexOf('/people/') === 0) {
            var uid = $('.user-opt > a.a-btn').attr('href');
            if (!uid) return;
            uid = uid.split('to=')[1];
            if (items.indexOf('u' + uid) !== -1) {
                $('span.user-cs').html('互相关注');
            }
            return;
        }
        if (location.pathname !== '/contacts/list') return;
        $('.user-list > li').each(function(i, item) {
            if (items.indexOf(item.id) !== -1) {
                $(this).append('<span style="position:absolute;top:34px;right:5px;color:#999;padding:0 4px;border:1px solid #ddd;border-radius:2px;">互相关注</span>');
            }
        });
    }
    
    get_people('/contacts/rlist', 'followers', show_follow_me_tip);
    
    // get_people('/contacts/list', 'followings', function(followings) {
    // });
    
}

function contentEval( source, par ) {
    par = par || 'head';
    if(!document[par]) {
        return setTimeout(function() { contentEval(source, par) }, 10);
    }
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.textContent = source;
    document[par].appendChild(script);
    document[par].removeChild(script);
}
contentEval(init);