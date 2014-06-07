// ==UserScript==
// @name           FA-PornOnly
// @namespace      FA-PornOnly
// @description    Hides non-erotic images on FurAffinity
// @include        http://www.furaffinity.net/*
// ==/UserScript==



function toggleoption()
{
    GM_setValue("PornOnly", !GM_getValue("PornOnly", false) );
    
    if(GM_getValue("PornOnly", false)){ 
      hide_nonporn(); 
    } 
    else
    { 
      window.location.reload(); 
    }
}


function hide_nonporn()
{
    var ul,li,td,nonporn;
    var nonporn = document.evaluate(
        "//td[@bgcolor='#000000']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    for(var i = 0; i < nonporn.snapshotLength; i++)
    {
        td = nonporn.snapshotItem(i);
        li = td.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        ul=li.parentNode;
        ul.removeChild(li);
    }
    if(nonporn.snapshotLength>0)
    {
      li=document.createElement("li");
      li.innerHTML='non-porn is hidden.';
      ul.appendChild(li);
    }
}

  GM_registerMenuCommand('Toggle "Porn Only"', toggleoption);

if(GM_getValue("PornOnly", false))
{  
  hide_nonporn(); 
}

