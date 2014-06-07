// ==UserScript==
// @name           Morakot_en
// @namespace      peko.idv.tw
// @description    Add hash tags for Morakot typhoon information in Taiwan.(English version)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// version: 0.0.6

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
    h.innerHTML = '<a class="rescue">(rescue)</a> <a class="water">(water)</a> <a class="medical">(medical)</a> <a class="food">(food)</a> <a class="tainan">(Tainan)</a> <a class="kaohsiung">(Kaohsiung)</a> <a class="pingtung">(Pingtung)</a> <a class="chiayi">(Chiayi)</a> <a class="taitung">(Taitung)</a> <a class="taiwanfloods">(taiwanfloods)</a>';
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
        msg = content + ' #Tainan';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //高雄
    $('.kaohsiung', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #Kaohsiung';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //屏東
    $('.pingtung', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #Pingtung';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //嘉義
    $('.chiayi', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #Chiayi';
        $('#status').val(msg).focus();
        updateStatusTextCharCounter(msg);
        window.scroll(0,0);
    });
    
    //台東
    $('.taitung', entry).click(function(){
        // grab the status field content
        content = $('#status').val();
        msg = content + ' #Taitung';
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