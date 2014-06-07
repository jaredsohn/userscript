// ==UserScript==
// @name           Forumwarz Show Damage
// @namespace      http://userscripts.org/users/84052
// @description    Show the actual damage range for attacks
// @include        http://www.forumwarz.com/forums/battle/*
// @include        http://forumwarz.com/forums/battle/*
// ==/UserScript==

// TODO: Figure out where to get offense, level, and forum difficulty from.
// TODO: Add in emo kid damage
// TODO: Forum difficulty penalty
var offense = 133;

function getMinDamage(text)
{
    return parseInt(text.split("(")[1]);
}

function getMaxDamage(text)
{
    return parseInt(text.split("- ")[1]);
}

function getDamage(text)
{
    return parseInt(text.split(" ")[1]);
}

function calculateDamage(damage)
{
    return Math.round(damage * (1 + (offense - 1) / 13));
}

function appendDamage(i)
{
    var info = document.getElementById('info_' + i);

    if (info.className == 'action info')
    {
        var list = info.getElementsByTagName('DIV')[0].getElementsByTagName('UL')[0];
        var attack = list.getElementsByTagName('LI')[0];
        if (attack.className == 'pwnage')
        {
            var text = attack.innerHTML;
        
            var newElement = document.createElement('LI');
            if (text.indexOf('(') != -1)
            {
                newElement.innerHTML = "Damage (" + calculateDamage(getMinDamage(text)) + " - " + calculateDamage(getMaxDamage(text)) + ")";
            }
            else
            {
                newElement.innerHTML = "Damage " + calculateDamage(getDamage(text));
            }
            
            list.insertBefore(newElement, list.getElementsByTagName('LI')[1]);
        }
    }
}

function main()
{
    for (i=0; i<10; i++)
    {
        appendDamage(i);
    }
}

main();
