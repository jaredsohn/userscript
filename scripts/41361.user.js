// ==UserScript==

// @name           Hide Homepage Elements

// @namespace      CHP@kwierso.com

// @include        http://*.roosterteeth.com/members/

// @include        http://*.roosterteeth.com/members/index.php
// @include        http://roosterteeth.com/members/

// @include        http://roosterteeth.com/members/index.php

// ==/UserScript==



//register a couple GM commands. ("Make all elements visible", for one)



(function() {

    //list of collapsable elements:

    //(ID)

    //    (OTHER IDENTIFIER)

    //myAlertHolder

    //Make a Journal Entry

    //Watching

    //My Friends

    //Groups

    //Mod Summary

    //Recent Topics

    //    TagName(p) = Recent Topics.nextSibling

    //Awards

    //    TagName(table) class(hlines)

    

    //basic idea: put above elements into array, run through loop calling "addToggle()" for each item

    //in the array. Also have a Fx preference for each item, so changes are persistant.

    

    var allHPprefs = getHPprefs();

    setHPprefs(allHPprefs);

    try {

        addToggle(returnElement("id", "myAlertHolder"), allHPprefs[0], "alerts");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "Make a Journal Entry"), allHPprefs[1], "journal");

    } catch(e) {

        addToggle(returnElement("id", "Latest Journal"), allHPprefs[1], "journal");

    }

    try {

        addToggle(returnElement("id", "Watching"), allHPprefs[2], "watchlist");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "My Friends"), allHPprefs[3], "friends");

    } catch(e) {

        addToggle(returnElement("id", " Friends"), allHPprefs[3], "friends");

    }

    try {

        addToggle(returnElement("id", "Groups"), allHPprefs[4], "groups");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "Mod Summary"), allHPprefs[5], "summary");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "Recent Topics"), allHPprefs[6], "topics");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "Awards"), allHPprefs[7], "awards");

    } catch(e) {}
    try {

        addToggle(returnElement("id", "Tournaments"), allHPprefs[7], "awards");

    } catch(e) {}

    try {

        addToggle(returnElement("sibling", "Recent Topics"), allHPprefs[8], "xbl");

    } catch(e) {}

    try {

        addToggle(returnElement("class", "hlines"), allHPprefs[9], "breakdown");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "Games I"), allHPprefs[10], "games");

    } catch(e) {}

    try {

        addToggle(returnElement("id", "The Goods"), allHPprefs[11], "goods");

    } catch(e) {}

    

})();



function addToggle(element, initial, val) {

    //basic idea: for the given element, add a button which allows the user to hide the element

    //button has onclick event to "toggleItem", which actually controls the element's visibility.

    

    var toggleLink = document.createElement("a");



    if(!initial) {

        toggleLink.innerHTML = "Hide";

        if(val == "alerts")

            toggleLink.innerHTML = "Hide Alerts";

        if(val == "breakdown")

            toggleLink.innerHTML = "Hide Breakdown";

        if(element.id == "GamerTag")

            toggleLink.innerHTML = "Hide GamerCard";

    }

    else {

        toggleLink.innerHTML = "Show";

        if(val == "alerts")

            toggleLink.innerHTML = "Show Alerts";

        if(val == "breakdown")

            toggleLink.innerHTML = "Show Breakdown";

        if(element.className != "hlines") {

            if(element.id != "GamerTag") {

                if(element.id != "myAlertHolder") {

                    element.style.display = "none";

                } else {

                    element.getElementsByTagName("td")[0].style.display = "none";

                }

            }

            else {

                element.getElementsByTagName("p")[0].style.display = "none";

                toggleLink.innerHTML = "Show GamerCard";

            }

        }

        else {

            element.parentNode.getElementsByTagName("table")[0].style.display = "none";

        }

    }



    toggleLink.className = "small";

    toggleLink.addEventListener("click", function() { toggleItem(this, val); }, false);



    if(element.className != "hlines") {

        if(element.id == "myAlertHolder"){

            var div = document.createElement("div");

            div.style.background = "#FFFFFF";

            div.style.padding = "5px";

            div.appendChild(document.createTextNode(" [ "));

            div.appendChild(toggleLink);

            div.appendChild(document.createTextNode(" ] "));

            element.insertBefore(div, element.firstChild);

        }

        else {

            if(element.id == "Make a Journal Entry" || element.id == "Latest Journal" || element.id == "Watching" || 

                    element.id == "My Friends" || element.id == " Friends" || element.id == "Groups" || 

                    element.id == "Mod Summary" || element.id == "Recent Topics" || element.id == "Awards" || 
                    element.id == "Tournaments" || element.id == "Games I" || element.id == "The Goods"){

                var td = document.createElement("td");

                td.style.width = "45px";

                td.style.padding = "5px";

                td.appendChild(document.createTextNode(" [ "));

                td.appendChild(toggleLink);

                td.appendChild(document.createTextNode(" ] "));

                element.previousSibling.getElementsByTagName("tr")[1].insertBefore(td, element.previousSibling.getElementsByTagName("tr")[1].childNodes[1]);

            } else {

                element.insertBefore(document.createTextNode(" ] "), element.firstChild);

                element.insertBefore(toggleLink, element.firstChild);

                element.insertBefore(document.createTextNode(" [ "), element.firstChild);

                if(element.id == "GamerTag") {

                    element.insertBefore(document.createElement("br"), element.firstChild);

                }

            }

        }

    }

    else {

        element.parentNode.id = "breakdown";

        element.parentNode.insertBefore(document.createTextNode(" [ "), element);

        element.parentNode.insertBefore(toggleLink, element);

        element.parentNode.insertBefore(document.createTextNode(" ] "), element);

    }

}



function toggleItem(that, val) {

    //basic idea:  for "this" given element, determine its state of visibility.

    //if visible, set display to 'none'. If not visible, set display to ''.

    //Set or unset Fx preferences in here as well.



    var gt = false;

    if(that.parentNode.id != "GamerTag") {

        if(that.parentNode.parentNode.id != "myAlertHolder") {

            if(that.parentNode.id != "breakdown") {

                var element = that.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;

            }

            else {

                var element = that.parentNode.getElementsByTagName("table")[0];

            }

        } else {

                var element = that.parentNode.parentNode.childNodes[2].getElementsByTagName("td")[0];

            }

    }

    else {

        var element = that.parentNode.getElementsByTagName("p")[0];

        gt = true;

    }

    if(element.style.display == "none") {

        element.style.display = "";

        that.innerHTML = that.innerHTML.replace(/Show/, "Hide");

    }

    else {

        element.style.display = "none";

        that.innerHTML = that.innerHTML.replace(/Hide/, "Show");

    }

    GM_setValue("roosterteeth.HHE." + val, !GM_getValue("roosterteeth.HHE."+val));

}



function returnElement(type, identifyer) {

    if(type == "id") {

        var element = document.getElementById(identifyer);

    }

    if(type == "class") {

        var element = getElementsByClass(document, identifyer)[0];

    }

    if(type == "sibling") {

        var newdiv = document.createElement("div");

        newdiv.id = "GamerTag";

        newdiv.appendChild(document.getElementById(identifyer).nextSibling);

        document.getElementById(identifyer).insertBefore(newdiv, document.getElementById(identifyer).nextSibling);

        var element = newdiv;

    }

    return element;

}



function getElementsByClass(element, theClass) {

// EFFECT: Returns all of 'element's children that match theClass. 

    //Create Array of All HTML Tags

	var allHTMLTags=element.getElementsByTagName('*');

    var classTags = new Array();

    //Loop through all tags using a for loop

    for (i=0; i<allHTMLTags.length; i++) 

    {

        //Get all tags with the specified class name.

        if (allHTMLTags[i].className==theClass) 

        {

            classTags.push(allHTMLTags[i]);

        }

    }

    return classTags;

}



function getHPprefs() {

    var allHPprefs = [];

    

    allHPprefs.push(GM_getValue("roosterteeth.HHE.alerts", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.journal", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.watchlist", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.friends", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.groups", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.summary", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.topics", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.awards", false));
    allHPprefs.push(GM_getValue("roosterteeth.HHE.tournaments", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.xbl", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.breakdown", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.games", false));

    allHPprefs.push(GM_getValue("roosterteeth.HHE.goods", false));

    return allHPprefs;

}



function setHPprefs(allHPprefs) {

    GM_setValue("roosterteeth.HHE.alerts", allHPprefs[0]);

    GM_setValue("roosterteeth.HHE.journal", allHPprefs[1]);

    GM_setValue("roosterteeth.HHE.watchlist", allHPprefs[2]);

    GM_setValue("roosterteeth.HHE.friends", allHPprefs[3]);

    GM_setValue("roosterteeth.HHE.groups", allHPprefs[4]);

    GM_setValue("roosterteeth.HHE.summary", allHPprefs[5]);

    GM_setValue("roosterteeth.HHE.topics", allHPprefs[6]);

    GM_setValue("roosterteeth.HHE.awards", allHPprefs[7]);
    GM_setValue("roosterteeth.HHE.tournaments", allHPprefs[7]);

    GM_setValue("roosterteeth.HHE.xbl", allHPprefs[8]);

    GM_setValue("roosterteeth.HHE.breakdown", allHPprefs[9]);

    GM_setValue("roosterteeth.HHE.games", allHPprefs[10]);

    GM_setValue("roosterteeth.HHE.goods", allHPprefs[11]);

    return true;

}