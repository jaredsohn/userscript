// ==UserScript==
// @name Twitter Lists Removal
// @include http://twitter.com/*
// @include https://twitter.com/*
// @description Opera で Twitter の「リスト」およびリストのメンバーを削除できるようにする
// ==/UserScript==

XMLHttpRequest.prototype.twdel = "";
XMLHttpRequest.prototype.OPEN = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.SEND = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open =
function() {
    if (arguments[0].toUpperCase() === "DELETE") {
        arguments[0] = "POST";
        this.twdel = "_method=DELETE&";
    }
    return this.OPEN.apply(this, arguments);
};
XMLHttpRequest.prototype.send = function(data) {
    return this.SEND(this.twdel + data);
};
