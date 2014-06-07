// ==UserScript==
// @name        Disable Google Translate
// @version     0.3
// @description Removes that fucking annoying Google Translate bar!
// @include     *
// @grant       none
// ==/UserScript==

{
    var tryCount = 0;
    
    var elements = new Array();
    var results = new Array();
    
    elements[0] = ':1.container';
    elements[1] = ':2.container';
    elements[2] = 'google_translate_element';
    
    for (i in elements)
    {
        results[i] = false;
    }
    
    function removeElement(name) 
    {
        var gtelement = document.getElementById(name);
            
        if (gtelement != null) 
        {
            
            console.log("Found '" + name + "' =>" + 
                " d='" + gtelement.display + "'," + 
                " v='" + gtelement.style.visibility + "'");
                
            if ((gtelement.display == 'none') && (gtelement.style.visibility == 'hidden'))
            {
                console.log("Already checked this");
                return true;
            }
            
            gtelement.display = 'none';
            gtelement.style.visibility = 'hidden';
            
            if (~name.indexOf('.container')) 
            {
                document.body.removeAttribute('style');
            }
            
            console.log("Removed!");

            return true;
        }
        else
        {
            return false;
        }       
    }
    
    function checkTranslate() 
    {
        setTimeout(function() 
        {
            
            tryCount++;
            
            var noTranslate = true;
            var debug = "[" + tryCount + "]";

            for (i in elements)
            {
                if (results[i] != true)
                {
                    results[i] = removeElement(elements[i]);
                    
                    if (results[i] == true)
                    {
                        noTranslate = false;
                    }
                }
                else
                {
                    noTranslate = false;
                }

                var e = debug;
                debug = e.concat(" " + i + "=" + results[i] + ",");
            }

            console.log(debug.concat(" noTranslate=" + noTranslate));
                
            if (noTranslate)
            {
                console.log("No translate detected, stopping script!");
                stop();
            }
            else if (tryCount < 10)
            {
                checkTranslate();
            }
            else
            {
                console.log("Timed out!");
            }
        }, 100);
    }
    
    function start()
    {
        if (window.top != window.self)
        {
            return;
        }
    
        console.log('Removing Google Translate');
        checkTranslate();
    }
    
        
    function stop() 
    {
        console.log("All done!");
    }
    
    window.addEventListener("load", start, false);
}