// ==UserScript==
// @name        CloudFlare cookie remover.
// @description Remove cloud flare tracking cookie from websites.
// @include     http://*
// @include     https://*
// @version     0.2
// @grant       none
// ==/UserScript==
var cookies = ["__cfduid", "_ga", "__utma", "__utmb", "__utmc", "__utmz"];

function del_cookie(name)
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
(function ()
{
    window.setTimeout(function ()
    {
        for (i = 0; i < cookies.length; i++)
        {
            del_cookie(cookies[i]);
        }
    }, 1000);
}).call(this);