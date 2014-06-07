// ==UserScript==
// @name       Spectrum -> Death UBimage.
// @namespace  Spectrum -> Death UBimage.
// @version    0.3
// @description  enter something useful
// @include      http://*.leakforums.*/*
// @copyright  2012+, You
// ==/UserScript==

var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++)
{ 
    if (tags[i].src.indexOf("Spectrum") !== -1)
    { 
        if (tags[i].parentNode.parentNode.getElementsByTagName('a')[0].href.replace("http://www.leakforums.org/member.php?action=profile&uid=", "") == "5581")
        {
            tags[i].src = 'http://i.imgur.com/C18in.png'; 
            tags[i].parentNode.parentNode.getElementsByTagName('a')[0].style.color = "#AFAFAF";
            tags[i].parentNode.parentNode.getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.color = "#AFAFAF";
        }
        
    }
    
}