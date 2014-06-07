// ==UserScript==
// @name           DS-Forumshelfer
// @namespace      none
// @author         fabi545
// @description    Fügt im Internen Stammesforum hinter einen Thread einen Link 'Bearbeiten' hinzu.
// @include        http://*.die-staemme.de/forum.php*
// ==/UserScript==

function is_admin()
{
    links=document.body.getElementsByTagName('a');
    lastlink=links[links.length-1];
    if(lastlink.href.match(/screen=admin/))
    {
        return true;
    }
    else
    {
        return false;
    }
};


if(document.location.href.match(/screen=view_forum/) && is_admin()==true)
{
    links = document.body.getElementsByTagName('a');
    
    for(i=0; i<links.length; i++)
    {
        if(links[i].href.match(/screen=view_thread/) && !links[i].href.match(/page/) && !links[i].href.match(/mode=edit/))
        {
            thread_id=/thread_id=(d+)/.exec(links[i].href)[1];
            
            var img = new Array();
            img[0] = document.createElement('img');

            var a = new Array();
            a[0] = document.createElement('a');

            img[0].setAttribute('src', '/graphic/rename.png');
            img[0].setAttribute('alt', 'Bearbeiten');
            a[0].setAttribute('href', "/forum.php?screen=view_thread&mode=edit&thread_id="+thread_id);

            a[0].appendChild(img[0]);
            links[i].parentNode.appendChild(a[0]);
            
            i++;
        }
    }
}  