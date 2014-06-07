// ==UserScript==
// @name           Pivotal Sizes
// @namespace      http://www.monkeyville.org
// @description    Replaces the icons for Pivotal Trackers' story sizes with T-shirt sizes, as commonly used for estimation in Scrum teams
// @include        https://www.pivotaltracker.com/*
// @include        http://www.pivotaltracker.com/*
// ==/UserScript==
// 
// If you use linear sizing, you need comment out the fibonacci mapping below and comment in the linear mapping
// 

setInterval(loadShirtSizes, 5000)

function loadShirtSizes()
{
//  var key  = [ 0 ,  1 , 2 , 3 , 4 , 5 , 6 , 7 ,  8 ]	// Just to visually see the index for the arrays below
    var size = ["0","XS","S","M","?","L","?","?","XL"]	// fibonacci mapping
//  var size = ["0","XS","S","M","L","XL"]		// linear mapping


    var pvtl_images = document.getElementsByClassName("estimateButton");
    var pvtl_images2 = document.getElementsByClassName("estimateIcon");

    for (var i = 0; i < pvtl_images.length; i++)
    {   
        for (var n = 0; n < 9; n++)
        {
            if (pvtl_images[i].getAttribute("alt").slice(0, 17) == "Estimate: " + n + " point")
            {
                pvtl_images[i].setAttribute("src", "")
                pvtl_images[i].setAttribute("alt", size[n])
                pvtl_images[i].setAttribute("style", "padding-left:4px;padding-right:4px;padding-top:1px;padding-bottom:0px;font-weight:bold;color:white;background-color:black;font-size:0.8em;font-style:normal;-moz-border-radius: 5px;")
            }
        }
    }

    //Left hand side icons
    for (var i = 0; i < pvtl_images2.length; i++)
    {
        if (pvtl_images2[i].getAttribute("alt") == "Unestimated")
        {
            pvtl_images2[i].setAttribute("src", "")
            pvtl_images2[i].setAttribute("alt", "?")
            pvtl_images2[i].setAttribute("style", "font-weight:bold;color:red")
        }
        for (var n = 0; n < 9; n++)
        {
            if (pvtl_images2[i].hasAttribute("alt"))
            {
                if (pvtl_images2[i].getAttribute("alt").slice(0, 17) == "Estimate: " + n + " point")
                {
                    pvtl_images2[i].setAttribute("src", "")
                    pvtl_images2[i].setAttribute("alt", size[n])
                    pvtl_images2[i].setAttribute("style", "font-weight:bold;font-size:0.8em")
                }
            }
        }
    }
}
