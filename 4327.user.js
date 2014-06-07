// ==UserScript==
// @name          Digg 3.0 Ad Remover
// @description   Removes the ads on Digg 3.0 and uses space better
// @include       http://*digg.com/*
// ==/UserScript==
	
(function() {
    head = document.getElementsByTagName('head')[0];

    if (head)
    {
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.banner_ad_unit { display: none; }\n' +
                          '.top_ad_image { display: none; }\n' + 
                          '.news-full { margin-right: 0px; }\n' +
                          '.single_ad_unit { display: none; }\n' +
                          '.comment { width: 700px; }\n' + 
                          '.comments_ad_image { display: none; }\n';
    
        head.appendChild(style);
    }
})();


