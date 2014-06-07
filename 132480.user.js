// ==UserScript==

// @name           This Kills the Tripfag

// @namespace      http://nvidia.com

// @include        http://*.4chan.org/*
// @include        https://*.4chan.org/*

// ==/UserScript==

//    This Kills the Tripfag
//    Copyright (C) 2012  Anonymous
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.


var whitelist=new Array();
//whitelist=
//[
//    "!sTallMAnU.",
//    "!c7xvgibBGw" //#botnet just for testing
//];

function safeChecker(posterTripVal)
{
    for(var j=0; j<whitelist.length; ++j)
    {
        if(posterTripVal==whitelist[j])
        {
            return 1;
        }
    }
    return 0;
}

function populateWhitelist()
{

    var inputDiv=document.createElement("div");
    inputDiv.innerHTML="<h3>This Kills the Tripfag whitelist</h3><textarea id=\"inputBox\"></textarea><br /><button id=\"inputSubmit\">save</button>";
    document.body.appendChild(inputDiv);
    var inputBox=document.getElementById("inputBox");

    if(localStorage["userWhitelist"])
    {
        inputBox.value=JSON.parse(localStorage["userWhitelist"]);
        var tokUserWhitelist=new String(JSON.parse(localStorage["userWhitelist"])).split(",");
        for(var k=0; k<tokUserWhitelist.length; ++k)
        {
            whitelist.push(tokUserWhitelist[k]);
            console.log(tokUserWhitelist[k]);
        }
    }

    document.getElementById("inputSubmit").onclick=function()
    {
        localStorage["userWhitelist"]=JSON.stringify(inputBox.value);
        document.getElementById("inputSubmit").disabled=true;
        document.getElementById("inputSubmit").innerHTML="saved";
    };
    document.getElementById("inputBox").onkeyup=function()
    {
        document.getElementById("inputSubmit").disabled=false;
        document.getElementById("inputSubmit").innerHTML="save";
    };
}
    

    

function main()
{
    populateWhitelist();

    var safe=0;
    var postertrip=document.getElementsByClassName("postertrip");
    for(var i=0; i<postertrip.length; ++i)
    {
        //whitelist subroutine
        safe=safeChecker(postertrip[i].innerHTML);

        //trip-assassin subroutine
        if(!safe)
        {
                postertrip[i].parentNode.getElementsByClassName("commentpostername")[0].innerHTML="Nigger";
                tripcode=postertrip[i].innerHTML="!sUcksdICksLoL";
        }
        safe=0;
    }
}

window.onload=main();
