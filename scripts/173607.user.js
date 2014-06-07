// ==UserScript==
// @name    Fanfou Self-Forwardable
// @version    1.0.6
// @author    HackMyBrain
// @description    在 fanfou.com 和 m.fanfou.com 添加转发自己消息的按钮, 除了支持 timeline 和「我的空间」的页面, 也支持自己相册中的图片页面, 自己或别人的收藏页面. 其中转发自己相册图片的功能不支持 m.fanfou.com.
// @include    http://fanfou.com/*
// @include    http://m.fanfou.com/*
// @exclude    http://fanfou.com/privatemsg
// @exclude    http://fanfou.com/privatemsg/*
// @exclude    http://m.fanfou.com/privatemsg
// @exclude    http://m.fanfou.com/privatemsg/*
// @homepage    http://userscripts.org/scripts/show/173607
// @downloadURL    https://userscripts.org/scripts/source/173607.user.js
// @updateURL   https://userscripts.org/scripts/source/173607.meta.js
// ==/UserScript==


(function (){
	
    var addFWAnchorsMobile = function () {
        var del_span, fav_span, fw_span, fw_link;
        var del_anchors = document.querySelectorAll("a[href*='/msg.del/']");
        for(var i = 0; i < del_anchors.length; i++){
            del_span = del_anchors[i].parentElement;
            fav_span = del_span.previousSibling.previousSibling;
            fw_link = del_anchors[i].href.replace(/\.del/i,'.forward');
            fw_span = del_span.cloneNode(true);
            fw_span.childNodes[0].href = fw_link;
            fw_span.childNodes[0].innerHTML = '转发';
            var space = document.createTextNode(' ');
            del_span.parentElement.insertBefore(space, fav_span);
            del_span.parentElement.insertBefore(fw_span, space);
        }
    };


    var addFWAnchorsDesktop = function () {
    
        var my_nickname = document.querySelector('#avatar img') || document.querySelector('.avatar > img');
        if (!!my_nickname) my_nickname = my_nickname.alt;        
        var del_anchors = document.querySelectorAll("[class='op'] > a:last-child[href*='.del/']");
        var my_post, my_post_nickname, my_post_op, my_post_content, my_post_text, my_post_id;
        
        for (var i = 0, i_max = del_anchors.length; i < i_max; i++) {
            my_post_op = del_anchors[i].parentElement;
            my_post = my_post_op.parentElement;
            my_post_nickname = (!!my_post.querySelector('.author'))? my_post.querySelector('.author').innerHTML : my_nickname;
            my_post_id = my_post_op.querySelector("a[href*='/favorite.']").href.replace(/.+\//g, '');
            my_post_content = my_post.querySelector('.content');
            my_post_text = '';
            for (var j = 0, j_max = my_post_content.childNodes.length; j < j_max; j++) {
                my_post_text = my_post_text + ( my_post_content.childNodes[j].title || my_post_content.childNodes[j].textContent );
            }
            var fw_anchor = document.createElement('a');
            fw_anchor.href = '/home?status=' + encodeURIComponent( '转@' + my_post_nickname  + '+' + my_post_text ) + '&repost_status_id=' + my_post_id;
            fw_anchor.setAttribute('ffid', my_post_id);
            fw_anchor.setAttribute('text', '转@' + my_post_nickname + ' ' + my_post_text);
            fw_anchor.className = 'repost';
            fw_anchor.title  = '转发';
            fw_anchor.innerHTML  = '转发';
            my_post_op.appendChild(fw_anchor);
        }
        
    };
    

    var addFWAnchorsSearchresultsDesktop = function() {
        var checksearch = setInterval(function(){
            if (location.hash.indexOf('#search?q=') === 0) {
                if ( !!document.getElementById('save-search-link') ) {
                    addFWAnchorsDesktop();
                    clearInterval(checksearch);
                }
            }
        }, 300)
    };
    

    var pagi_href;
    function delayAddFWAnchorsDesktop () {
        if (location.hostname == 'fanfou.com') {
            if (pagi_href != pagi.href) {
                pagi_href = pagi.href;
                addFWAnchorsDesktop();
                return pagi_href;
            } else {
                setTimeout(delayAddFWAnchorsDesktop, 700);
            }
        }
    };    
    

	if (location.hostname == 'fanfou.com') {
        addFWAnchorsDesktop();
        addFWAnchorsSearchresultsDesktop();
        window.addEventListener('hashchange', addFWAnchorsSearchresultsDesktop, false);
        
        var pagi = document.getElementById('pagination-more');
        if (!pagi) return false;
        
        pagi.addEventListener('click', function() {
            pagi_href = pagi.href;
            setTimeout(delayAddFWAnchorsDesktop, 700);
        }, false);
        
        var noti = document.getElementById('timeline-notification');
        noti.addEventListener('mouseup', function() {
            addFWAnchorsDesktop();
        }, false);

    } else {
        addFWAnchorsMobile();
    };
    
})();