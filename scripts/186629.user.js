// ==UserScript==
// @name     shoes(!!!) script
// @include  http://store.nike.com/*
// @include  https://store.nike.com/*
// @require  http://code.jquery.com/jquery-2.0.2.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/
	

    $(".selectBox.exp-pdp-size-dropdown.exp-pdp-dropdown.selectBox-dropdown").focus().mousedown().mouseup();
           
    var size_i_want = "12";
     
        function fRun()
        {
            // Select size option.
            var sizesList=document.getElementsByName("skuAndSize")[0];
            for(var i=0; i<sizesList.length; i++)
            {
                if(sizesList.options[i].text.trim() == size_i_want)
                {
                    sizesList.selectedIndex = i;
                }
            }
     
            var aButtons = document.getElementsByTagName("button");
            for(var i = 0; i < aButtons.length; ++i)
            {
                if(aButtons[i].className.indexOf("add-to-cart") > -1)
                {
                    aButtons[i].click();
                }
            }
        }
     
        function fTick()
        {
            if(document.getElementsByName("skuAndSize")[0] != undefined)
            {
                setTimeout("fRun()", 600);
                //fRun();
            }else{
                setTimeout("fTick()", 300);
            }
        }
        setTimeout("fTick()", 300);
           
    {
        "update_url": "http://clients2.google.com/service/update2/crx",
        "name": "PreOrderHeat Bot Size 12",
        "version": "1.0",
        "manifest_version": 2,
        "description": "PreOrderHeat.Com",
        "icons": {
            "128": "Nike.png"
        },
        "browser_action": {
            "default_icon": "icon.png",
            "default_title": "Nike bot"
        },
        "content_scripts": [
            {
                "matches": [
                    "http://*.nike.com/*"
                ],
                "js": [
                    "autobuy.js, jquery.js"
                ]
            }
        ],
        "web_accessible_resources": [
            "script.js"
        ]
    }

