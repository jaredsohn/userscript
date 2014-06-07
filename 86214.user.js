// ==UserScript==
// @name                AIB notifier
// @description         Notifies about new posts by changing browser tab title. 
// @include             http://2-ch.ru/*
// @include             http://dobrochan.ru/*
// ==/UserScript==


function getLastPostNumber(){
    var css_class = {
        '2-ch.ru': 'reply',
        'dobrochan.ru': 'replypost post'
    }[window.location.hostname];
    var replies = document.getElementsByClassName(css_class);
    if( replies.length == 0){
        return 0;
    }
    return replies[replies.length -1].id;

}

function createNotifierButton(html, callback){
    var text_area = document.getElementsByTagName('textarea');
    if(text_area.length == 0){
        return;
    }
    text_area = text_area[0];
    var notifier_btn = document.createElement('button');
    notifier_btn.innerHTML = html;
    notifier_btn.type = 'button';
    notifier_btn.id = 'notifier_button';
    notifier_btn.style.display = 'block';
    notifier_btn.addEventListener('click', callback, false);
    text_area.parentNode.insertBefore(notifier_btn, text_area);
}

function startNotifier(){
    var seconds = 5 * 60;
    var button = document.getElementById('notifier_button');
    button.removeEventListener('click', startNotifier, false);
    button.innerHTML = 'stop notifier';
    button.addEventListener('click', stopNotifier, false);
    var pt = /#\d+$/;
    var last_post = getLastPostNumber();
    GM_setValue(window.location.href.replace(pt, ''), last_post);
    window.notifierTimer = window.setTimeout('window.location.reload(true)', seconds * 1000);
}

function stopNotifier(){
    var pt = /#\d+$/;
    window.clearTimeout(window.notifierTimer);
    GM_setValue(window.location.href.replace(pt, ''), 'stopped');
    var button = document.getElementById('notifier_button');
    button.removeEventListener('click', stopNotifier, false);
    button.addEventListener('click', startNotifier, false);
    button.innerHTML = 'start notifier';
}

function init(){
    var pt = /#\d+$/;
    var last_post_b4_refresh = GM_getValue(window.location.href.replace(pt, ''), 'stopped');
    if(last_post_b4_refresh == 'stopped'){
        createNotifierButton('start notifier', startNotifier);
    }
    else{
        var last_post = getLastPostNumber();
        if(last_post != last_post_b4_refresh){
            document.title = '*New posts';
            GM_setValue(window.location.href.replace(pt, ''), 'stopped');
            createNotifierButton('start notifier', startNotifier);
            if(last_post_b4_refresh != 0){
                document.getElementById(last_post_b4_refresh).scrollIntoView();
            }
        }
        else{
            createNotifierButton('stop notifier', stopNotifier);
            startNotifier();
        }
    }
}

init();
