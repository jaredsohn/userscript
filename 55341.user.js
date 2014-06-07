// ==UserScript==
// @name           Morakot
// @namespace      peko.idv.tw
// @description    Add hash tags for Morakot typhoon information in Taiwan
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// version: 0.0.5

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
    h.innerHTML = '<a class="rescue">(待救援)</a> <a class="water">(需飲水)</a> <a class="medical">(需醫療)</a> <a class="food">(需糧食)</a> <a class="tainan">(台南)</a> <a class="kaohsiung">(高雄)</a> <a class="pingtung">(屏東)</a> <a class="chiayi">(嘉義)</a> <a class="taitung">(台東)</a> <a class="taiwanfloods">(taiwanfloods)</a>';
    h.style.color = '#aaa';
    //h.style.fontWeight = 'bold';
    h.style.cursor = 'pointer';
	//h.style.margin = '0px';
    //h.style.padding = '3px 8px';
  
    entry = $('.bar');
    $(entry).append(h);
    
    //救援
    $('.rescue', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #rescue';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //水
    $('.water', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #water';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //醫療
    $('.medical', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #medical';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });

    //食物
    $('.food', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #food';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
        
    //台南
    $('.tainan', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #tainan';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //高雄
    $('.kaohsiung', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #kaohsiung';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //屏東
    $('.pingtung', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #pingtung';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //嘉義
    $('.chiayi', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #chiayi';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //台東
    $('.taitung', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #taitung';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //#taiwanfloods
    $('.taiwanfloods', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #taiwanfloods #Morakot';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
}