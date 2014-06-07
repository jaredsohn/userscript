// ==UserScript==
// @name           Goodbye SnapShot!
// @namespace      http://www.cyberdespacio.org
// @description    Say goodbye to annoying snap.com service
// @include        *
// ==/UserScript==
(function(){ 
    function eliminarSnapShot(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    var cssStyle = 'html body #snap_com_shot_main, html body #snap_com_shot_main * {display:none !important; visibility:hidden !important;}';
    
    eliminarSnapShot(cssStyle);

})();