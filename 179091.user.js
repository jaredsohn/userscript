// ==UserScript==
// @name        Habrahabr: Progress Indicator
// @version     1.0.1
// @description Adds simple progress meter to the left (e.g. 45%). Augments window title with the post's length.
// @include     http://habrahabr.ru/post/*/
// @include     http://habrahabr.ru/company/*/blog/*/
// ==/UserScript==

!function() {
    var header = document.getElementById('header');
    var computeLength = new function() {
        var originalTitle = document.title;
        var infopanel = document.getElementsByClassName('infopanel_wrapper')[0];
        return function() {
            var length = infopanel.offsetTop - header.offsetHeight;
            // Augment page title
            document.title = '[' + length + '] ' + originalTitle;
            return length;
        };
    }();
    computeLength();
    // Create indicator element
    var indicator = (function() {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.left = 0;
        div.style.bottom = '50%';
        div.style.paddingLeft = '2px';
        return div;
    }());
    var updateIndicator = new function() {
        var documentElement = document.documentElement;
        return function() {
            var position = window.pageYOffset + documentElement.clientHeight / 2 - header.offsetHeight;
            var progress = Math.floor(position / computeLength() * 100);
            indicator.innerText = progress <= 100 ? progress + '%' : '';
        };
    }();
    // Set the indicator up
    updateIndicator();
    document.body.appendChild(indicator);
    document.addEventListener('scroll', updateIndicator);
}();
