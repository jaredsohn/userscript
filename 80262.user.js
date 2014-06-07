// ==UserScript==
// @name           LoadCrack.com All-around Improvement
// @namespace      http://userscripts.org/scripts/show/80262
// @version        0.2
// @description    Auto-starts, Strips garbage and No Delay
// @include        http://loadcrack.com/*
// @include        http://www.loadcrack.com/*
// @author         -brycoo
// @copyright      -brycco
// @license        none
// ==/UserScript==

// Removals
h1T=document.getElementById("h1");  // Grabs the ID 'h1', and puts into a variable
    h1T.style.display="none";       // This will hide "Scanning search engines for x", and "Found!"
tmT=document.getElementById("tmp"); // Grabs the ID 'tmp', and puts into a variable
    tmT.style.display="none";       // Hides a <span> with the ID 'tmp', which is seemingly empty anyway. 

z=document.getElementsByTagName('a');  // Grabs all the elements of the tag <a>
    for(i=1;i<z.length;i++){z[i].style.display="none";}
    // The above code hides every HTML Link, except the first encountered, which should be the download link.

b=document.getElementsByTagName('h2'); // This grabs all of the elements which are <h2> tags
    for(i=0;i<b.length;i++){b[i].style.fontSize="1em";} // Changes the font-size to 1em for h2 tags

document.body.style.fontSize="0em";      // This decreases the body's font-size to 0em, somewhat useless
document.body.style.visibility="hidden"; // Hides EVERYTHING


// Download Link Styling, and Unhiding
dl=document.getElementById("download");  // Sets the variable for ID "download" for use
    dl.style.margin="15px";              // sets margin to 15px for download
    dl.style.textAlign="center";         // centers download
    dl.style.font="28pt Georgia";        // increases download font-size
    dl.style.display="block";            // un-hides download
    dl.style.visibility="visible";       // Makes the download visible, after making everything invisible


// Auto-Start Download	
thE=dl.innerHTML; // Just for a smaller variable
    urlExt=thE.substring(thE.indexOf('/'),thE.indexOf('">'));  // Extracts the download URI
    dl.innerHTML=thE+"<div style='font-size:20px'>Download should start Automatically, if not click the above link!<div style='font-size:14px'>"+urlExt+"</div></div>"; // Shows text, and the extracted link
    window.location=urlExt; // Automatically starts the download
