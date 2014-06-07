// ==UserScript==
// @name           IBSU
// @namespace      peko.idv.tw
// @description    twitter "HULAN" function
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// version: 0.0.9

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();

// update text chars count
function updateStatusTextCharCounter(value) {
    var len = value.length;
    var char_counter = $('#status-field-char-counter');
    char_counter.html('' + (140-len));
    if (len <= 0 || len > 140) {
        if(len == 0) { char_counter.css( 'color', '#cccccc'); }
        $('.status-btn .round-btn').attr('disabled', 'disabled').addClass('disabled');
    } else {
        $('.status-btn .round-btn').removeAttr('disabled').removeClass('disabled');
        if (len > 130) { char_counter.css( 'color', '#d40d12'); }
        else if (len > 120) { char_counter.css( 'color', '#5c0002'); }
        else { char_counter.css( 'color', '#cccccc'); }
    }
}

// main action
function letsJQuery() {
    var h = document.createElement('div');
    //h.setAttribute('class', 'hulan');
    h.innerHTML = '<a class="hulan">(我唬爛的)</a> <a class="tea">(茶)</a> <a class="smoke">(菸)</a> <a class="fist">(緊握)</a> <a class="kick">(飛踢)</a> <a class="punch">(毆飛)</a> <a class="fuckoff">(滾～)</a> <a class="over">(完)</a> <a class="warm">(溫馨)</a> <a class="fuckgfw">(我愛長城)</a>';
    h.style.color = '#aaa';
    //h.style.fontWeight = 'bold';
    h.style.cursor = 'pointer';
	//h.style.margin = '0px';
    //h.style.padding = '3px 8px';
  
    entry = $('.bar');
    $(entry).append(h);
    
    //我唬爛的
    $('.hulan', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (我唬爛的)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //茶
    $('.tea', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (茶)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //菸
    $('.smoke', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (菸)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });

    //緊握
    $('.fist', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (緊握)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
        
    //飛踢
    $('.kick', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (飛踢)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //毆飛
    $('.punch', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (毆飛)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //滾
    $('.fuckoff', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (滾～)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //完
    $('.over', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (完)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //溫馨
    $('.warm', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' (溫馨)';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //#FUCKGFW
    $('.fuckgfw', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #FuckGFW';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
}