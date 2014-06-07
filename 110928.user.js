// ==UserScript==
// @name           add short cuts to google translate page
// @namespace      jaunty.translate
// @description    给 Google 翻译加入快捷键 alt+j/alt+x: 左边发音;alt+k/alt+v: 右边发音；alt+c//ESC 清屏
// @include        http://translate.google.cn/*
// @include        http://translate.google.com/*
// @include        http://translate.google.com.hk/*
// ==/UserScript==


document.body.onkeydown=function(e){

    e = e || window.event;
    
    if (e.altKey && e.keyCode == 67 || e.keyCode == 27) {
        // alt+c//ESc clear the textarea
        document.getElementById('source').value = "";
        document.getElementById('source').focus();
    } else if (e.altKey && e.keyCode == 74 || e.altKey && e.keyCode == 88) {
        // alt+j/x
        listen('gt-src-listen');
    } else if (e.altKey && e.keyCode == 75 || e.altKey && e.keyCode == 86) {
        // alt+k/v
        listen('gt-res-listen');
    }

    /**
     * this function comes from http://stackoverflow.com/questions/7136834/how-to-trigger-the-listen-button-on-the-google-translate-page-using-javascript
     */
    function listen(id) {
        
        var srcListenButton  = document.getElementById(id);

        var clickEvent = document.createEvent('MouseEvents'); 
        clickEvent.initEvent ( 'mouseover', true, true ); 
        srcListenButton.dispatchEvent (clickEvent);

        clickEvent = document.createEvent('MouseEvents'); 
        clickEvent.initEvent ( 'mousedown', true, true ); 
        srcListenButton.dispatchEvent (clickEvent);

        clickEvent = document.createEvent('MouseEvents'); 
        clickEvent.initEvent ( 'mouseup', true, true ); 
        srcListenButton.dispatchEvent (clickEvent);
    }
};
