// ==UserScript==
// @name           Pokec.sk - skrytie správ od užívateľa z vybraného mesta
// @namespace      http://
// @description    Skrytie správ na skle od užívateľov z vybraného mesta
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        https://pokec-sklo.azet.sk/miestnost/*
// @date           2013-08-14
// @author         weroro [www.weroro.sk]
// @version        1.0
// ==/UserScript==


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


var w_mesta = new Array('Nitra', 'Bratislava', 'Zvolen');


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */

var w_sklo = document.getElementById('sklo');

function changeAction (el)
{
    var link, text;
    var array = el.getElementsByClassName('dt');
            
    for(var i = 0; i < array.length; i++)
    {
        link = array[i];
        text = link.getElementsByClassName('lokalita')[0].innerHTML;
        for(var j = 0; j < array.length; j++)
        {
            if(text == w_mesta[j]) link.parentNode.setAttribute('style','display:none !important;');
        }
    }
}

w_sklo.addEventListener('DOMNodeInserted', function(event)
{
    changeAction (this);
}, true);
changeAction (w_sklo);