// ==UserScript==
// @name links for sc2 eu en/ru forums
// @match http://eu.battle.net/sc2/ru/forum/*
// @match http://eu.battle.net/sc2/en/forum/*
// @match http://us.battle.net/sc2/en/forum/*
// ==/UserScript==

var posts = document.getElementsByClassName("post-detail");
var regex = new RegExp("(href=\")?(http://[^<]*?)([ \\t\\n<]|$)", "gim");
var regexXmlns = new RegExp("xmlns=\"[^\"]*?\"", "gim");
function replacer(match, group1, group2, group3)
{
    if (typeof(group1) != "undefined")
    {
        return match;
    }
    var str = "<a href=\"" + group2 + "\" target=\"_blank\">" + group2 + "</a>" + group3;
    return str;
}
for (var i = 0; i < posts.length; i++)
{
    posts[i].innerHTML = posts[i].innerHTML.toString().replace(regexXmlns, "").replace(regex, replacer);
}