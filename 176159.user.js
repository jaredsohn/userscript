// ==UserScript==
// @name        Habrahabr: Lift Author's Name
// @version     0.3
// @description Inserts author's name in the date panel at the top of every post.
// @include     http://habrahabr.ru/*
// ==/UserScript==

!function() {
    var wrapWithLink = function(author) {
        var a = document.createElement('a');
        a.href = 'http://habrahabr.ru/users/' + author;
        a.textContent = author;
        a.style.textDecoration = 'none';
        return a;
    };
    [].slice.call(document.getElementsByClassName('post')).forEach(function(post) {
        var author = post.getElementsByClassName('author')[0];
        // Some "special posts" do not have infopanel_wrapper element
        if (author) {
            author = author.firstElementChild.textContent;
            post.firstElementChild.insertAdjacentHTML('afterBegin', wrapWithLink(author).outerHTML + ', ');
        }
    });
}();
