// ==UserScript==
// @name       Marketplace Tidy
// @namespace  http://www.caspertech.co.uk/
// @version    0.4
// @description  This script fixes the layout on the marketplace website.
// @match https://marketplace.secondlife.com/*
// @match http://marketplace.secondlife.com/*
// @match http://www.secondlife.com/*
// @match https://www.secondlife.com/*
// @match http://secondlife.com/*
// @match https://secondlife.com/*
// @include http://marketplace.secondlife.com/*
// @include https://marketplace.secondlife.com/*
// @copyright  2013, CasperTech Ltd
// @run-at document-start
// @grant none
// ==/UserScript==

function hideGap()
{
    var topAd = document.getElementById('google-dfp-placement-top');
    var sideAd = document.getElementById('google-dfp-placement-sidebar');
    if (topAd && topAd!==undefined)
    {
        topAd.parentNode.removeChild(topAd);
    }
    if (sideAd && sideAd!==undefined)
    {
        sideAd.parentNode.removeChild(sideAd);
    }
    document.getElementsByTagName("body")[0].style.paddingTop = '0px';
    
    //The main second life website is a little more tricky.
    var slContainer = document.getElementById('container-shadow-top');
    if (slContainer && slContainer !== undefined)
    {
        slContainer.style.marginTop = '0px';   
        var all = slContainer.getElementsByTagName('*');
        for (var i = -1, l = all.length; ++i < l;) 
        {
            if (all[i].name !== undefined && all[i].name!='')
            {
                if (all[i].name.indexOf('google_ads_')!=-1)
                {
            		all[i].parentNode.removeChild(all[i]);
                }
            }
        }
    }
}

if(document.body)
	hideGap();
else
	window.addEventListener("DOMContentLoaded", hideGap, false);

window.addEventListener("load", hideGap, false);
