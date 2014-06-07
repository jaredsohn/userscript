// ==UserScript==
// @name           Cfake.com direct image viewer
// @namespace      http://cfake.com
// @include        http://cfake.com/*
// ==/UserScript==
window.setTimeout(
    function() 
    {
        var tag = document.getElementsByTagName('body')[0];
		tag.innerHTML = tag.innerHTML.replace(/"javascript:showimage\('\/big.php\?show=(.+?).jpg&amp;id_picture=(.+?)&amp;id_name=\d+&amp;p_name=.+?','\d+','\d+'\)"/gi,"http://cfake.com/photos/$1.jpg");
		tag.innerHTML = tag.innerHTML.replace(/"javascript:showimage\('\/big.php\?show=(.+?).jpeg&amp;id_picture=(.+?)&amp;id_name=\d+&amp;p_name=.+?','\d+','\d+'\)"/gi,"http://cfake.com/photos/$1.jpeg");
	}, 
    100);