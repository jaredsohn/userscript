// ==UserScript==
// @name               What.CD - Blog link in Main Menu
// @namespace      https://what.cd
// @description      Insert a link to Blog in the main menu.
// @include            https://what.cd/*
// @version            1.0.2
// @date                 2013-02-25
// ==/UserScript==

(function() {
    var target = document.getElementById('menu').getElementsByTagName('ul')[0];
    var bl_item = document.createElement('li');
    bl_item.id = 'nav_blog';
    var activePage = document.getElementById("blog");
        if(activePage != null) {
            bl_item.className = 'active';
        }
    bl_item.innerHTML = '<a href="blog.php">Blog</a>';
    target.appendChild(bl_item);
})();

// Some code borrowed lovingly from jonis.