// ==UserScript==
// @name       Wikispaces Paste Modifier
// @namespace  http://www.google.com/
// @version    0.1
// @description  Disable the scroll in Wikispaces after paste
// @match      http://*.wikispaces.com/*
// @copyright  2013, robort
// ==/UserScript==

(function() {
    var EDITOR_ID = 'tinymce', EDITOR_IFRAME = 'wsMainEditor_ifr', BUTTON_CLASS = 'Button ButtonLeft editButton';
    var editor_iframe, editor, button;
    var isPaste = false, scrollTop; 
    
    // callback for editor paste
    function onPaste(event) {
        isPaste = true;
        scrollTop = document.body.scrollTop;
    }
    
    function onScroll(event) {
        if (isPaste) {
            document.body.scrollTop = scrollTop;
            isPaste = false;
        }
    }
    
    function registerPasteListener() {
        editor_iframe = document.getElementById(EDITOR_IFRAME);
        if (editor_iframe) {
            // console.log('listening...');
            editor_iframe.contentWindow.addEventListener('paste', onPaste, true);
            document.addEventListener('scroll', onScroll, true);
        }
        return editor_iframe;
    }
    
    function waitForRegisteringPasteListener() {
        if (!registerPasteListener()) {
            setTimeout(registerPasteListener, 100);
        }
    }
    
    window.addEventListener('load', function(){
        if (!registerPasteListener()) {
            button = document.getElementsByClassName(BUTTON_CLASS)[0];
            button.addEventListener('click', function() {
                waitForRegisteringPasteListener();
            }, true);
        }
    }, false);
})();
