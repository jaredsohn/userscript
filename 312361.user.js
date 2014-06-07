// ==UserScript==
// @name       Duolingo Incubator Stats
// @namespace  http://code-poet.net
// @version    0.1
// @description  Shows percentages for Phase 1 languages on Duolingo's incubator
// @match      http://incubator.duolingo.com/*
// @match      https://incubator.duolingo.com/*
// @copyright  2014, Vaughan Chandler, Creative Commons Attribution-ShareAlike 4.0 International License
// ==/UserScript==

(function(){
    
    function process() {
        // Incubator home page.
        var elms=document.querySelectorAll('canvas[data-progress]:not(.dis-handled)');
        for (var i=0; i<elms.length; i++) { show(elms[i], elms[i].getAttribute('data-progress'), elms[i].parentNode); }
        // Incubator course page.
        var elms=document.querySelectorAll('.course-progress div.course-progress-bar[aria-valuenow]:not(.dis-handled)');
        for (var i=0; i<elms.length; i++) { show(elms[i], elms[i].getAttribute('aria-valuenow'), document.getElementsByClassName('progress-stats')[0]); }
    }
    
    function show(elm, progress, where) {
        if (!elm || !progress || progress<0 || progress>100 || !where) { return; }
        var span=document.createElement('span');
        span.innerHTML = ' ' + (Math.round(progress*10)/10) + '%';
        where.appendChild(span);
        elm.className = elm.className + ' dis-handled';
    }
    
    var disInterval = window.setInterval(process, 1000);
    process();

})();
