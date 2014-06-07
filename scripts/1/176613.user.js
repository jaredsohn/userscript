// ==UserScript==
// @name       Mine Things - Maximize usable screen space
// @description  Maximizes the usable screen space by reducing wasted space at the top, left and bottom of every Mine Things page.
// @version    0.2
// @copyright  2013+, iMachine
// @match      http://*.minethings.com/*
// @exclude    http://*.minethings.com/miners/login
// ==/UserScript==

// change these vars as you like
var DoWeWantToSaveSpaceAtTheTop = true;
var DoWeWantToSaveSpaceAtTheBottom = true;
var DoWeWantToSaveSpaceOnTheLeft = true;
var DoWeWantToChangeHeaderColor = true;
var NewHeaderColor = '#400';

if (DoWeWantToSaveSpaceAtTheTop)
{
    // Hide the Mine Things logo
    document.getElementById('logo').style.display = 'none';
    
    // Change vertical dimension values
    document.getElementById('wrapper').style.marginTop = "-35px";
    document.getElementById('header').style.height = "60px";
    document.getElementById('login').style.height = "0px";
    document.getElementById('login').style.paddingTop = "0px";


/*
 * attempting to put the logo on the leftmost part of the header
 * 
  	var img = document.createElement("IMG");
	img.src = "http://dempo.minethings.com/img/header_logo.jpg";
    img.style.height = "100%";
    img.align = "left";
	document.getElementById('header').appendChild(img);
    */
}

if (DoWeWantToSaveSpaceAtTheBottom)
{
    // Hide the footer
    document.getElementById('footer').style.display = 'none';
}

if (DoWeWantToSaveSpaceOnTheLeft)
{
    // Shift everything over to the left, with empty space to the extreme-left slightly off-screen now
    document.getElementById('wrapper').style.marginLeft = "-100px";
}

if (DoWeWantToChangeHeaderColor)
{
    // Set the new header color
    document.getElementById('header').style.background = NewHeaderColor;
}
