// ==UserScript==
// @name           CFix (CFake Pop Up Fix)
// @namespace      http://cfake.com
// @include        http://cfake.com/*
// ==/UserScript==
window.setTimeout(
    function() 
    {
        var tag = document.getElementsByTagName('body')[0];
        tag.innerHTML = tag.innerHTML.replace(/"javascript:showimage\('big.php\?show=(.+?)_cfake\.jpg&amp;id_picture=\d+','\d+','\d+'\)"/gi,"http://cfake.com/photos/$1_cfake.jpg");
    }, 
    100);