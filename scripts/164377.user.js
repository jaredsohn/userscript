// ==UserScript==
// @id             www.php.net-258ca7e3-a7d0-485d-8beb-f079cee3e08a@scriptish
// @name           php.net ru-redirection
// @version        1.0
// @namespace      
// @author         rebelion76@gmail.com
// @description    
// @include        http://*php.net/*
// ==/UserScript==


(function ()
{
    if (/http:\/\/.*php\.net\/.*?\/en\/.*/.test(window.location.href)) { 
        location.href = location.href.replace("/en/","/ru/");    
    }
    
})();
