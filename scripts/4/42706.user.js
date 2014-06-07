// ==UserScript==

// @name           NewPullModList

// @namespace      npml@kw.com

// @description    New way to display modlist for each forum!

// @include        http://*.roosterteeth.com/forum/*
// @include        http://roosterteeth.com/forum/*

// ==/UserScript==



(function() {

    try {

        var modName = getMods();

        var modList;

        var modLink;

        

        modList = modName[0].getElementsByTagName("img")[0].alt.split(" ")[0];

        modLink = modName[0].getElementsByTagName("a")[0].href;



        if(modName) {

            var forumMod = document.createElement("a");

            forumMod.href = modLink;

            forumMod.innerHTML = "<b>" + modList + "</b>";

            forumMod.className = "small";

            

            var forumTitle = document.getElementById("Forum").previousSibling;

            var modTitle = document.createElement("b");

            modTitle.innerHTML = "This forum's moderator is: ";

            modTitle.align = "right";

            

            forumTitle.getElementsByTagName("tbody")[1].firstChild.lastChild.appendChild(modTitle);

            forumTitle.getElementsByTagName("tbody")[1].firstChild.lastChild.appendChild(forumMod);

            forumTitle.getElementsByTagName("tbody")[1].firstChild.lastChild.align = "right";

        }

    } catch(e) {

        if(e == "TypeError: modName[0] is undefined")

            console.log("No mods for this forum");

    }

})();





function getMods() {

//get list of forum's mods

    try {

        var modslist = getElementByClass("sidebar", document)[0].childNodes[1].firstChild.childNodes[1];

        modslist = getElementByClass("web2User", modslist);

        

        return modslist;

    } catch(e) {console.log(e);}

}



function getElementByClass(theClass, element) 

{

    var allkeywordtags = new Array();

	//Create Array of All HTML Tags

	var allHTMLTags=element.getElementsByTagName("*");



	//Loop through all tags using a for loop

	for (i=0; i<allHTMLTags.length; i++) 

	{

		//Get all tags with the specified class name.

		if (allHTMLTags[i].className==theClass) 

		{

            allkeywordtags.push(allHTMLTags[i]);

		}

	}

    return allkeywordtags;

}