// ==UserScript==
// @name          OIFY Chemo
// @description	  http://www.youtube.com/watch?v=ocW3fBqPQkU
// @version       0.7.420
// @include       http://facepunch.com/*
// @include       https://facepunch.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function OIFYChemo()
{
    var OIFY = ($("span.navbit:contains('OIFY')")[0] !== undefined || $("div[id='lastelement']:contains('OIFY')")[0] !== undefined)
    
    // gdi is dead (good riddance)
    //var gdi = ($("span.navbit:contains('Disruption')")[0] !== undefined || $("div[id='lastelement']:contains('Disruption')")[0] !== undefined)
    
    if (OIFY || gdi)
    {
        var cancer = GM_getValue("oifycancer", ["DSG", "Rangergxi", "DDmaster"]);
        
        // Threads
        if (document.getElementsByClassName("threads")[0] !== undefined)
        {
            for (var i = 0; i < cancer.length; i++)
            {
                c = cancer[i];
            	$("div.author:contains('" + c + "')").closest($("tr.threadbit")).remove();
            }
        }
        
        // Posts
        if (document.getElementsByClassName("posts")[0] !== undefined)
        {
			for (var i = 0; i < cancer.length; i++)
            {
                c = cancer[i];
            	$("a.username:contains('" + c + "')").closest($("li.postbitim")).remove();
            }
        }
    }
}

unsafeWindow.addFaggot = 	function(fag)
                            {
                                var fags = GM_getValue("oifycancer", ["DSG", "Rangergxi", "DDmaster"]);
                                fags.push(fag);
                                
                                GM_setValue("oifycancer", fags);
                            };

unsafeWindow.removeFaggot = 	function(fag)
                                {
                                    var fags = GM_getValue("oifycancer", ["DSG", "Rangergxi", "DDmaster"]);
                                    for (var i=0; i < fags.length; i++)
                                    {
                                        if (fags[i] === fag)
                                        {
                                            fags = fags.splice(i, 1);
                                        }
                                    }
                                    
                                    GM_setValue("oifycancer", fags);
                                };

unsafeWindow.resetFaggots = 	function()
                                {
                                    GM_deleteValue("oifycancer");
                                };

window.addEventListener ("load", OIFYChemo, false);