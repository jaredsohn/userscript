// ==UserScript==
// @name           Minhembio image resize preventer
// @description    Disables resizing of large images on the Minhembio forum. Useful if you're running high resolution.
// @namespace      adamjohansson.com
// @include        *minhembio.com/forum*
// ==/UserScript==

var imageTag = document.getElementsByTagName('img');

for(i=0;i<imageTag.length;i++)
{
    if (imageTag[i].getAttribute('class')) 
    {
        var attr = imageTag[i].getAttribute('class');
        
        if (attr == 'linked-image')
        {
            imageTag[i].removeAttribute('class');
        }
    }
}