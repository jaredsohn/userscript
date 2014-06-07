// ==UserScript==
// @name           blitzforum
// @namespace      http://www.blitzforum.de/forum/viewtopic.php?t=*
// @description    bla
// @include        http://www.blitzforum.de/forum/viewtopic.php?t=*
// ==/UserScript==

//<a href="javascript:var range = document.createRange(); range.selectNode(document.getElementById('codebox0')); window.getSelection().addRange(range);">Markieren</a>

function blub()
{
        i=0;
        while(1)
        {
            obj=document.getElementById("codebox"+i);
            if(obj==0) return;
            neu=document.createElement("span");
            neu.setAttribute("style","font-size: 0.8em;");
            neu.innerHTML=" <a href=\"javascript:var range = document.createRange(); range.selectNode(document.getElementById('codebox"+i+"')); window.getSelection().addRange(range);\">[MARKIEREN]</a>";
            //alert("bla"+i);
            obj.parentNode.insertBefore(neu,obj);
            i++;
        }
}
//alert("hier ist ein script eingebaut");
//document.addEventListener("DOMNodeInserted", blub, true);
blub();