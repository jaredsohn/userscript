// ==UserScript==
// @name                    [TS] deviantArt Download Link
// @namespace               TimidScript
// @description             Adds the Download Link on illustration page if missing and also removes open in new tab
// @include                 *//*.deviantart.com/*
// @version                 1.0.3
// @versioninfo             Supports SWF Illustration links and bug fixes
// @require                 http://userscripts.org/scripts/source/159301.user.js
// @resource  meta          http://userscripts.org/scripts/source/179414.meta.js
// @icon                    data:image/png;base64,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
// ==/UserScript==


/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/179414

----------------------------------------------
    Version History
----------------------------------------------
1.0.3 (2013/12/07)
 - Need MutationObserver on all the site. (*//*.deviantart.com/*)
1.0.2 (2013/12/07)
 - Support of flash download added
 - BugFix: the illustration page contains hidden elements that we need to check for, as we
 are trying to only change the visible one.
 - Not using TimidScript Library so remove requirement
1.0.1 (2013/10/07)
 - Initial Release 
 - Add Missing download link
 - Stopped download from opening in new tab
**********************************************************************************************/

/*
    Some elements are hidden for history so need to check   
--------------------------------------------------------------*/
function IsItVisible(node)
{
    var parent = node;
    while (parent)
    {
        if (parent.style.display == "none") return false;
        parent = parent.parentElement;

    }
    return true;
}

function HolderButton()
{
    //Can contain history holders and btns so I have to get the correct one  
    //var holder = document.evaluate("//div[@class='dev-view-meta']/div[@class='dev-view-meta-content']/div[@class='dev-meta-actions']", document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var holders = document.getElementsByClassName("dev-meta-actions");

    
    var holder;
    for (var i = 0; i < holders.length; i++)
    {
        if (IsItVisible(holders[i])) holder = holders[i];        
    }
           
    //console.log(holder);
    var btn = document.evaluate(".//a[@class='dev-page-button dev-page-button-with-text dev-page-download']", holder, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //holder.style.border = "2px red solid";
    return {"holder":holder, "button":btn};
}

function CreateDownloadButton(src, imgWidth, imgHeight)
{
    var hb = HolderButton();
    //console.log(hb);

    if (!hb.holder) return;

    if (hb.button)
    {
        hb.button.removeAttribute("onclick");
        clearInterval(Observe.intervalID);
        return;
    }    
  
    console.warn("Adding missing Download Link");
    clearInterval(Observe.intervalID);

    var a = document.createElement("a");
    a.className = "dev-page-button dev-page-button-with-text dev-page-download";
    a.id = "dDLButton";

    if (imgWidth != undefined) a.innerHTML = '<i></i><span class="label" >Download</span><span class="text" style="color:red;">' + imgWidth + " x " + imgHeight + '</span>';
    else a.innerHTML = '<i></i><span class="label" >Download</span><span class="text" style="color:red;">Flash</span>';

    a.href = src;
    hb.holder.appendChild(a);
}


var Observe =
{
    intervalID: 0,

    bodyChanges: function ()
    {
        Observe.callback(); //Just in case it gets missed. Happens occasionally

        var mo = window.MutationObserver || window.MozMutationObserver || window.WebKitMutationObserver;
        if (mo)
        {
            Observe.observer = new mo(Observe.callback);
            Observe.observer.observe(document.body, { characterData:true, attributes: true, childList: true, subtree: true });
        }
    },

    callback: function (mutations)
    {
        if (!document.URL.match(/\.deviantart\.com\/(#\/)?art/i)) return;

        console.info("Callback");        
        //Element history is stored so use this method and then check visibility
        var iframe = document.evaluate("//div[@class='dev-view-deviation']//div[@id='flashed-in']/iframe[@class='flashtime']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var img = document.getElementsByClassName("dev-content-full")[0];

        if (iframe && IsItVisible(iframe)) //Illustration contains a frame with flash content
        {
            console.log("Illustration: flash");
            window.addEventListener('message', function (event)
            {
                //console.log(event.data);
                if (event.data.match(/^dDL_SWFurl:/i))
                        CreateDownloadButton(event.data.replace(/^dDL_SWFurl:/i, ""));

                    
            }, false);
        }
        else if (img)
        {
            console.log("Illustration: Image");               
            CreateDownloadButton(img.src, img.naturalWidth, img.naturalHeight);        
        }
    }
}


if (window !== window.top && document.URL.match(/sandbox\.deviantart\.com\/\?fileheight/i))
{
    //Pass flash src information that is stored in the iframe
    var flash = document.getElementsByTagName("embed")[0];
    if (flash) window.top.postMessage('dDL_SWFurl:' + flash.src, '*');
}
else if (window === window.top)
{
    console.warn("deviantArt Download Link Script Running");
    Observe.bodyChanges();
}
