// ==UserScript==
// @name           Szerlok is back in town!
// @description    Przywraca starego dobrego Szerloka na stronę główną korzystając z reklamy BZWBK
// @author         DFENS
// @include        http://wykop.pl/*
// @include        https://wykop.pl/*
// @include        http://*.wykop.pl/*
// @include        https://*.wykop.pl/*
// ==/UserScript==


function SzerlokuWracaj()
{
    document.getElementById('wbk-comments-box').style.background = "url('http://imgur.com/TLLFX.png')";
}

document.addEventListener('load', SzerlokuWracaj(), false);

