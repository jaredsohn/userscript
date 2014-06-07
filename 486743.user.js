// ==UserScript==
// @name XMLHttpRequest-jdsl79
// @decription Test
// ==/UserScript==

(function(open) {

    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

        this.addEventListener("readystatechange", function() {
            console.log(this.readyState);
        }, false);

        open.call(this, method, url, async, user, pass);
    };

})(XMLHttpRequest.prototype.open);