// ==UserScript==
// @name           Tasty-Teens Image Hack
// @namespace      TTeens
// @description    Changes link to go to full size images
// @include        http://www.tasty-teens.com/forums/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (x = 0; x < links.length; x++)
{
    a = links[x];
    if (a.className == "resized_img")
    {
        var images = a.getElementsByTagName("img");
        for (y = 0; y < images.length; y++)
        {
            img = images[y];
            if (img.className == "attach")
            {
                a.href = img.src.replace("_gthumb","");
                a.removeAttribute("onclick");
                // img.src = img.src.replace("_gthumb","");
                
                a.onClick = function(){return true;};
            }
        }
    }
}
