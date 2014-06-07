// Last Updated: 15th Dec 2009
// Lead Programmer: Laser Wave
// Secondary Programmer: jcrboy
//
// ==UserScript==
// @name          Guard Checker General
// @namespace     http://www.neocodex.us/*
// @description   Checks to see if the guard is asleep
// @include       http://www.neopets.com/magma/pool.phtml
// ==/UserScript==

var guard = false;

function refresh()
{
        if(document.body.innerHTML.indexOf("Learn more and try again later.") < 0)
        {
                guard = true;
                alert("Check!");          
        }else{
                if(guard == false)
                {
                        location.reload();
                }
        }
}       

function setup()
{
        setTimeout(refresh, 2000+Math.floor(Math.random()*5000));
}

window.addEventListener('load', setup, false);