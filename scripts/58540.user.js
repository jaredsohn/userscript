// ==UserScript==
// @name           Render links to images inline in Trac (no duplicated images)
// @description    Display images (including attachments) as images directly in a Trac page. Based on work of Britt Selvitelle, fixed duplicated images [http://userscripts.org/scripts/show/20411]
// @namespace      trac
// @author		   Damien Hou
// @include        http*://trac*/ticket*
// @include        http*://trac*/wiki*
// ==/UserScript==
addEventListener("load", renderImages, false);
function renderImages()
 {
    collections = new Array();
    if (content_links = document.getElementById('content'))
    {
        content_links = content_links.getElementsByTagName("a");
    }
    if (content_links.length)
    {
        for (var j = 0;
        j < content_links.length;
        j++)
        {
            link = content_links[j];
            src = link.href;
            if (src.lastIndexOf('.png') != -1 ||
            src.lastIndexOf('.gif') != -1 ||
            src.lastIndexOf('.jpg') != -1)
            {
                var image = document.createElement("div");
                image.innerHTML = '<img style="max-width:620px;" src="' + src + '?format=raw" /><br />';
                link.parentNode.insertBefore(image, link);
            }
        }
    }
}