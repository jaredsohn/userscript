// ==UserScript==
// @name           Xanga Ad Remover
// @description    Kill Xanga ads
// @include        http://www.xanga.com/*
// ==/UserScript==

//Remove ads from left sidebar
var side1=document.getElementById("side1");
if(side1!=null)
	side1.parentNode.childNodes[1].removeChild(side1.parentNode.childNodes[1].childNodes[5]);


//Remove ads from right sidebar
var side1=document.getElementById("side1");
if(side1!=null)
	side1.parentNode.childNodes[5].removeChild(side1.parentNode.childNodes[5].childNodes[3]);


//Remove Google Adsense Ads	
	var RemoveGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { display: none; }");
                }
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead))
                {
                    currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead).style.display='none'
                    // this.injectCSS("script[src='http://pagead2.googlesyndication.com/pagead/show_ads.js'] { display: none; }");
                }
            }
            catch(e) {}
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    RemoveGoogleAds.checkPage();
