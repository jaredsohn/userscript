//
// ==UserScript==
// @name            Remove Junk NNRU
// @namespace       devzorg_NNRU
// @description     Script removes junk design on nnru
// @include         http*://*.nn.ru*
// @include         http*://*.www.nn.ru*
// @version         0.1.0
// @author          devzorg
// @date            2012-07-19
// @source          http://userjs.devzorg.ru
// @creator         devzorg
// ==/UserScript==

(function(){
    function hasClass(ele,cls) {
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }
    function addClass(ele,cls) {
        if (!this.hasClass(ele,cls)) ele.className += " "+cls;
    }
    function removeClass(ele,cls) {
        if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }

    if(hasClass(document.body,'pr0m0')) {
        removeClass(document.body,'pr0m0');
        document.body.removeChild(document.body.children[0]);
        var table = document.body.children[0];
        var mainContent = table.children[0].children[0].children[1].children[0];
        removeClass(mainContent,'pr0m0');
        document.body.removeChild(document.body.children[0]);
        document.body.appendChild(mainContent);
    }
})(window);
