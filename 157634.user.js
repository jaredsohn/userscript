// ==UserScript==
// @name        Ford Focus Club Service Pack 2
// @author      joedm
// @namespace   http://ffclub.ru/
// @description Ford Focus Club Service Pack 2
// @include     http://ffclub.ru/*
// @version     2.0
// @run-at      document-end
// ==/UserScript==

(function () { 
    getElementsBy = function(testFn, node) {           
        var node = node || document,
        list = node.getElementsByTagName('*'),
        length = list.length, 
        result = [], i
        for(i = 0; i < length; i++) {
            if(testFn(list[i])) {
                result.push(list[i])
            }
        }
        return result
    }

    // change background color of posts
    var postContainers = getElementsBy(function(item) {
        return item.id.indexOf('thepost_') != -1;
    });

    for (var i = 0; i < postContainers.length; i++) {
        var postContainer = postContainers[i];
        postContainer.style.backgroundColor = '#EFEFE3';
    }

})();