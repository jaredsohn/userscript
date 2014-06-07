// ==UserScript==
// @name          Download Panoramic Image from Java VR Viewer at panogames.com
// @description   Adds a top link to download panoramic image to the JAVA VR viewer at panogames.com
// @include       *panogames.com/*/java/*
// ==/UserScript==

var link = null;
var params = document.getElementsByTagName('param');
for (var i = 0; i < params.length; i++) 
{
    var param = params[i];
    if (param.name == "file")
    {
        link = param.value;
        break;
    }
}

if (link != null)
{
    var newDiv = document.createElement("div");
    newDiv.innerHTML = '<div><h2><center><a href="' + link + '" style="color:red;text-      decoration:underline">Download Panoramic Image</a></center></h2></div>';
    document.body.insertBefore(newDiv, document.body.firstChild);
}

//
// ChangeLog
// 20061026 - 0.1 - initial revision
//            0.2 - don't add link if none was found
//
