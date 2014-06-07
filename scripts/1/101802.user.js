// ==UserScript==
// @author         azproduction
// @name           Habrahabr Submit button blocker
// @namespace      Habrahabr
// @include        http://habrahabr.ru/*
// ==/UserScript==
(function r(f){/m/(document.readyState)?f():setTimeout(r,0,f)})
(function(){
    var $publish = document.getElementById('publish');
    if (!$publish) {
        return;
    }
    var oldText = $publish.value,
        timerId = 0,
        isNotActivated = true;

    $publish.value = 'Ctrl+Alt+Shift';
    $publish.setAttribute('disabled', 'disabled');
    window.addEventListener('keydown', function (event) {
        if (event.shiftKey && event.ctrlKey && (event.altKey || event.metaKey) && isNotActivated) {
            timerId = window.setTimeout(function () {
                $publish.removeAttribute('disabled');
                $publish.value = oldText ;
                isNotActivated = false;
            }, 2000);
        } else {
            window.clearTimeout(timerId);
        }
    }, false);

    window.addEventListener('keyup', function (event) {
        window.clearTimeout(timerId);    
    });
});