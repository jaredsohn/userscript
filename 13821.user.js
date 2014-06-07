// ==UserScript==
// @name Financial Times Cookie Fixer
// @namespace http://www.philhq.com
// @include http://*.ft.com/*
// @description Clears the cookie that tracks how many free articles you have read
// ==/UserScript==

(function()
{
        var date = new Date();
        date.setTime(date.getTime() - 2*365*24*60*60*1000);
        document.cookie = "ft_ncookie=1; expires="+date.toGMTString()+
                        "; domain=ft.com; path=/;";
        document.cookie = "ft_ccookie=1; expires="+date.toGMTString()+
                        "; domain=ft.com; path=/;";
}
)();