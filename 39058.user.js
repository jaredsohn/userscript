// ==UserScript==

// @include     http://2ch.ru/s/*

// @name        Antipisecka for http://2ch.ru/s

// @description Deletes all post of fucking retard

// ==/UserScript==



function f_main()

{

    re=/[ч4]пи[сc][уy][eе][kк]|[сc]е[рp]г[уy]|s[eе]r[eе]zh[aа]|[сc]и[рp]й[оo]ж|пипи[сc]ю|пи[сc][eе][нh]ь[kк]|пи[сc]ю[лнh]|пи[сc][eе][ч4][kк]|[СC][eе][рp][eеё]ж[eе]нь[кk]|[СC][eе][рp]г[eе]|С[eе]р[eеё]ж|P[íiï]s[eе][čcc]ka|(хуярить\s*){4}/i;

    i=-1;

    while(tab=document.getElementsByTagName('table')[++i])

    if(tab.innerHTML.match(re))	tab.innerHTML='';

}


if (window.opera) 
{
    if (location.hostname == "2ch.ru") 
    {
        document.addEventListener('load', f_main, false);
    }

} 
else 
{

    f_main();

}
