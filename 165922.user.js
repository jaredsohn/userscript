// ==UserScript==
// @name        1024
// @namespace   1024
// @description read douban movie id
// @include     http://movie.douban.com*
// @version     3
// ==/UserScript==


Array.prototype.delRepeat = function () {
    return this.filter(function (elem, pos, self) {
        return self.indexOf(elem) == pos;
    })
};
Array.prototype.parseInt = function () {
    for (var i = 0; i < this.length; i++) {
        this[i] = parseInt(this[i]);
    }
    return this;
};


var arrayLocalStorage = new Array();
if (localStorage.localID) {
    arrayLocalStorage = localStorage.localID.split(",").parseInt();
}
var arrayIDs = [];
var arrayA = document.getElementsByTagName("a");
for (var i = 0; i <= arrayA.length; i++) {
    if (arrayA[i] && arrayA[i].href.match(/subject\/\d*/)) {
        arrayIDs.push(arrayA[i].href.replace(/.*?subject\/(\d*)(.*)/g, "$1"));
        arrayIDs.parseInt();
    }
}

arrayIDs = arrayIDs.delRepeat();
for (var i = 0; i < arrayLocalStorage.length; i++) {
    var idx = arrayIDs.indexOf(arrayLocalStorage[i]);
    if (idx >= 0) {
        arrayIDs.splice(idx, 1);
    }
}

function jsonp(data) {
    arrayLocalStorage = arrayLocalStorage.concat(data.pass, data.fail);
    arrayLocalStorage = arrayLocalStorage.delRepeat();
    localStorage.localID = arrayLocalStorage.toString();
}
function startJsonp() {
    var script = document.createElement('script');
    script.src = "http://1024.av.cm/addmovie/addFromGet?callback=jsonp&movies="+arrayIDs.toString();
//    script.src = "http://localhost/1024/jsonp.php?callback=jsonp&movies=" + arrayIDs.toString();
    document.getElementsByTagName('head')[0].appendChild(script);
}
console.log(arrayIDs);
if (arrayIDs.length > 0) {
    startJsonp()
}