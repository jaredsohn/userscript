// ==UserScript==
// @name           eBay Zoomed Images Appended
// @namespace      alutian
// @description    Appends zoomed product images to end of page
// @include        *ebay*
// ==/UserScript==
if (!alutian){ var alutian = {}; }
alutian.docBodies = document.getElementsByTagName('body');
alutian.iruls = document.getElementsByName('iurls');
if (alutian.iruls.length > 0)
{
    alutian.bigUrls = alutian.iruls[0].value.split('|');
    for (alutian.bigIndex = 0; alutian.bigIndex < alutian.bigUrls.length; alutian.bigIndex++)
    {
        alutian.imageUrls = alutian.bigUrls[alutian.bigIndex].split('#');
        alutian.bigHTML = '<div align="center"><img src="' + alutian.imageUrls[1] + '/' + alutian.imageUrls.pop() + '"></div><br><br>';
        alutian.docBodies[alutian.docBodies.length-1].insertAdjacentHTML('beforeend', alutian.bigHTML);
    }
}