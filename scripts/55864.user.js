// ==UserScript==
// @name            Show icon before PDF link
// @namespace       http://penguinlab.jp/
// @include         http://*
// ==/UserScript==
(function () {
    var i, img, as, href;
    img = '<img alt="[PDF]" style="border:none;line-height:16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD3SURBVHjaxFM7DsIwDLVTq7+JlaFS78GCxNT7VmxILNygY4e2JwA6sNAGXqWECNIyMGDJiv9+cRzWWtMvpOhHkrIsz3EcX10jM1s5iqKs7/tLURQrb4W2bfU36roOB/lYhmGYCt03m1mYa/iJPoYlpxMLBDNIfTy8rrHdWR2yz2+H6L6EcfgKGd2NUUgex9Ea3GAfwe/G2CvwDAIEu7Z3v5hp8gz8JX0qAPjg235PSim7B5CTJJnkpmkoz3P2LhK64yndOSDJzCYIguVNDMOQ0jQlEbEIcBoUoKUiUlXVpa7rK7qZBIMC/GwwrXKWZd4C/Pff+BBgAL+KqOGKi3VNAAAAAElFTkSuQmCC" />';
    as = document.getElementsByTagName('a');
    for (i = 0; i < as.length; i += 1) {
        href = as[i].getAttribute('href');
        if (href && href.match(/\.pdf$/i)) {
            as[i].innerHTML = img + as[i].innerHTML;
        }
    }
}());
