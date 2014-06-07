// ==UserScript==
// @name           Google News Filter
// @namespace      person.barnes.david
// @include        http://news.google.com/*
// ==/UserScript==

var bannedWords = ['obama', 'economic', 'bailout', 'pelosi', 'treasury', 'senate'];
var lhNodes = document.getElementsByClassName('lh');
for (var i = 0; i < lhNodes.length; i++)
{
    if (lhNodes.item(i).firstChild.nodeName == 'FONT')
    {
        for (var j = 0; j < lhNodes.item(i).firstChild.childNodes.length; j++)
        {
            if (lhNodes.item(i).firstChild.childNodes[j].nodeName == 'B')
            {
                for (var word in bannedWords)
                {
                    if (lhNodes.item(i).firstChild.childNodes[j].textContent.toLowerCase().indexOf(bannedWords[word]) != -1)
                    {
                        lhNodes.item(i).firstChild.childNodes[j].style.display = 'none';
                        lhNodes.item(i).firstChild.childNodes[j+1].style.display = 'none';
                        lhNodes.item(i).firstChild.childNodes[j+2].style.display = 'none';
                        lhNodes.item(i).firstChild.childNodes[j+3].style.display = 'none';
                    }
                }
            }
        }
    }
    else
    {
        for (var word in bannedWords)
        {
            if (lhNodes.item(i).textContent.toLowerCase().indexOf(bannedWords[word]) != -1)
            {
                lhNodes.item(i).style.display = 'none';
            }
        }
    }
}
