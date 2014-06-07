// ==UserScript==
// @name            Mn3njalnik - Warning Button
// @description     Adds an aditional warning button to some Mn3njalnik pages
//
// @include http://www.joker.si/mn3njalnik/*
// @match   http://www.joker.si/mn3njalnik/*
// ==/UserScript==

pattern = /\?(\w+)=/;
windowType = pattern.exec(window.location)[1];

switch(windowType.toLowerCase())
{
    case "showuser":
        ShowUserButton();
        break;
        
    case "showtopic":
        ShowTopicButtons();
        break;
        
    default:
        break;
}

function ShowTopicButtons()
{
    idPattern = /hovercard-id=\"(\d+)\"/;
    items = document.getElementById("ips_Posts").childNodes;
    for(i=0; i<items.length; i++)
    {
        if(items[i].nodeName == "DIV")
        {
            id = idPattern.exec(items[i].innerHTML)[1];
            items[i].childNodes[3].childNodes[1].innerHTML += "\t" + GenerateButton(id);
        }
    }
}

function ShowUserButton()
{
    pattern = /showuser=(\d+)/;
    id = pattern.exec(window.location)[1];
    element = document.getElementById("user_utility_links");
    element.innerHTML += GenerateButton(id);
}

function GenerateButton(id)
{
    return "<a href=\"http://www.joker.si/mn3njalnik/index.php?app=core&amp;module=modcp&amp;section=editmember&amp;mid="+id+"&amp;_tab=warn\" style=\"padding-left: 50px; font-size: 8pt;\">"
                +"<img src=\"http://www.joker.si/mn3njalnik/public/style_images/joker_new/moderation_cog.png\" style=\"height: 12px;\"> &nbsp;Moderiraj uporabnika"
            +"</a>";
}