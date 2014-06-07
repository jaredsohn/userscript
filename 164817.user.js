// ==UserScript==
// @name        dradismerge
// @author      Barna Szeghy
// @description Javascript copy and paste functionality for Dradis Pro note imports. 
// @namespace   http://userscripts.org/users/513125/dradishelper
// @include     *
// @version     1.0
// @grant       GM_registerMenuCommand
// ==/UserScript==


var dradisStorage=new Array();

function dradisCopy()
{
    var headers = document.getElementsByTagName('h1');
    for (i=0; i<headers.length; i++)
    {
        n=headers[i]
        x=n.nextSibling;
        if (x) {
            while (x.nodeType!=1)
            {
                x=x.nextSibling;
            }
            if (x.tagName=='P') {
                c=dradisStorage.length
                dradisStorage[c]=new Array();
                dradisStorage[c][0]=n.textContent;  
                dradisStorage[c][1]=x.textContent;  
            }
        }
    }
}

function dradisMerge()
{
    t=document.getElementById('editor')
    for (i=0; i<dradisStorage.length; i++)
    {
        d=dradisStorage[i]
        t.value=t.value.replace(new RegExp("###{"+d[0]+"}###","gmi"), d[1])
    }
}

GM_registerMenuCommand('dradis Copy', dradisCopy)
GM_registerMenuCommand('dradis Merge', dradisMerge)

