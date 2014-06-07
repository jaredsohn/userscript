// ==UserScript==
// @name       豆瓣广播清理
// @namespace  http://ktmud.com/
// @version    0.2.1-1
// @description  屏蔽豆瓣阅读、豆瓣东西、豆瓣旅行的广播
// @match      http://*.douban.com/update*
// @copyright  2012+, Jesse Yang
// ==/UserScript==

function init() {
    var s = document.createElement('style');
    var storage = window.localStorage;
    
    var t = [];
    var reg_splitter = /\s*[,，]\s*/;
    var types = storage.getItem('blocked_types') || 'ark,ilmen,travel';
    if (types) {
        types.split(reg_splitter).forEach(function(item) {
            t.push('.status-item[data-target-type="' + item + '"]');
        });
    }
    if (!storage.getItem('show_recommend_users')) {
      t.push('.recommend-users');
    }
    var uids = storage.getItem('blocked_users');
    if (uids) {
        uids = uids.split(reg_splitter);
        
        uids.forEach(function(item) {
            t.push('.status-item[data-user-id="' + item + '"]');
        });
        
        var reg_blocked = new RegExp('/people/(' + uids.join('|') + ')/');
        
        function clean(item) {
            if (!item || !item.getElementsByTagName) return;
            var links = item.getElementsByTagName('a');
            
            for (var i in links) {
                if (reg_blocked.test(links[i].href)) {
                    return item.style.display = 'none';
                }
            }
        }
        [].slice.call(document.querySelectorAll('div.status-item')).forEach(clean);
        
        document.getElementsByClassName('stream-items', 'div')[0].addEventListener('DOMNodeInserted', function(e) {
            clean(e.target);
        });
        
    }
    s.textContent = t.join(',') + '{display:none;}';
    document.head.appendChild(s);
}


function contentEval( source ) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval( init );