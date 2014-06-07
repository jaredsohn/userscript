// ==UserScript==
// @name Reddit Jerks
// @description Remembers jerks you come across on Reddit and highlights their comments in the future
// @include http://www.reddit.com/r/*/comments/*
// ==/UserScript==

var taglines;

function contains(array, item)
{
    if (array == null || item == null)
    {
        return false;
    }
    
    for (var i = 0; i < array.length; i++)
    {
        if (array[i] == item)
        {
            return true;
        }
    }
    return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Storage Functions
//

function isNameInStorage(name)
{
    var names = GM_getValue("jerknames");
    
    if (names == null)
    {
        return false;
    }
    
    var a = names.split(";");
    
    return contains(a, name);
}

//
// Returns an array of the names from storage, or a new empty array if no names are stored
//
function getNameArrayFromStorage()
{
    var names = GM_getValue("jerknames");
    var a;
    if (names != null)
    {
        a = names.split(";");
    } else
    {
        a = new Array();
    }
    return a;
}

function addNameToStorage(name)
{
    var a = getNameArrayFromStorage();
    a.push(name);
    names = a.join(";");
    
    GM_setValue("jerknames", names);
}

function deleteNameFromStorage(name)
{
    var a = getNameArrayFromStorage();
    var newArray = new Array();
    
    // Copy a to newArray, omitting name - poor man's array.delete()
    for (var i = 0; i < a.length; i++)
    {
        if (a[i] !== name)
        {
            newArray.push(a[i]);
        }
    }
    
    names = newArray.join(";");
    
    GM_setValue("jerknames", names);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Helper methods
//

//
// Provide immediate feedback for the user after adding a jerk.
// This method adds the JERK warning next to all comments made by the given name.
// Does not touch storage - just a piece of UI polish
//
function addJerkLabelForName(name)
{
    taglines = toArray(document.getElementsByClassName("tagline"));

    for (var i = 0; i < taglines.length; i++)
    {
        // firstchild is null if it's a "load more comments" link
        if (taglines[i].firstChild == null)
        {
            continue;
        }
        var commenterName = taglines[i].firstChild.innerHTML;
        var isJerk = (name === commenterName);
        
        // This check prevents us parsing the post title area - we only care about the comments section
        if (taglines[i].nextSibling.nodeName === "FORM")
        {
            // Add the JERK warning
            if (isJerk)
            {
                jerkSpan = document.createElement("span");
                jerkSpan.className = "jerk";
                jerkText = document.createTextNode("JERK!");
                jerkSpan.appendChild(jerkText);
                
                taglines[i].appendChild(jerkSpan);
            
                // Change the existing "add jerk" link to be a "remove jerk" link
                if (taglines[i].nextSibling.nextSibling.nodeName === "UL")
                {
                    var ulRoot = taglines[i].nextSibling.nextSibling;
                    
                    for (var j = 0; j < ulRoot.childNodes.length; j++)
                    {
                        if (ulRoot.childNodes[j].firstChild.innerHTML === "add jerk")
                        {
                            ulRoot.childNodes[j].firstChild.innerHTML = "remove jerk";
                            ulRoot.childNodes[j].firstChild.addEventListener("click", function(e) {
                                                            var jerkElement = e.wrappedJSObject.target;
                                                            // Remove the current event listener when the event fires so we can switch
                                                            // between addJerk / removeJerk
                                                            jerkElement.removeEventListener("click", arguments.callee, false);
                                                            setTimeout(
                                                                function() {
                                                                    removeJerk(jerkElement);
                                                                },
                                                                0);
                                                         },
                                                         false);
                        }
                    }
                }
            }
        }
    }
}

//
// The opposite to addJerkLabelForName
// Combs through the comments and deletes the JERK label for given commenter name
// Called after removing name from storage to give the user immediate feedback so
// they don't need to refresh the page to see the results of their change
//
function removeJerkLabelForName(name)
{
    taglines = toArray(document.getElementsByClassName("tagline"));

    for (var i = 0; i < taglines.length; i++)
    {
        // firstchild is null if it's a "load more comments" link
        if (taglines[i].firstChild == null)
        {
            continue;
        }
        var commenterName = taglines[i].firstChild.innerHTML;
        var isJerk = (name === commenterName);
        
        // This check prevents us parsing the post title area - we only care about the comments section
        if (taglines[i].nextSibling.nodeName === "FORM")
        {
            // Remove the JERK warning by finding the span tag child with the jerk style
            if (isJerk)
            {
                currentChild = taglines[i].firstChild;
                do
                {
                    if (currentChild.className === "jerk")
                    {
                        currentChild.parentNode.removeChild(currentChild);
                    }
                } while (currentChild = currentChild.nextSibling)
                
                // Change the existing "add jerk" link to be a "remove jerk" link
                if (taglines[i].nextSibling.nextSibling.nodeName === "UL")
                {
                    var ulRoot = taglines[i].nextSibling.nextSibling;
                    
                    for (var j = 0; j < ulRoot.childNodes.length; j++)
                    {
                        if (ulRoot.childNodes[j].firstChild.innerHTML === "remove jerk")
                        {
                            ulRoot.childNodes[j].firstChild.innerHTML = "add jerk";
                            ulRoot.childNodes[j].firstChild.addEventListener("click", function(e) {
                                                            var jerkElement = e.wrappedJSObject.target;
                                                            // Remove the current event listener when the event fires so we can switch
                                                            // between addJerk / removeJerk
                                                            jerkElement.removeEventListener("click", arguments.callee, false);
                                                            setTimeout(
                                                                function() {
                                                                    addJerk(jerkElement);
                                                                },
                                                                0);
                                                         },
                                                         false);
                        }
                    }
                }
            }
        }
    }
}

function addJerk(evt)
{
    addNameToStorage(evt.getAttribute("jerkname"));
    addJerkLabelForName(evt.getAttribute("jerkname"));
}

function removeJerk(evt)
{
    deleteNameFromStorage(evt.getAttribute("jerkname"));
    removeJerkLabelForName(evt.getAttribute("jerkname"));
}

toArray = function(col){
    var a = [], i, len;
    for(i=0, len=col.length; i< len; i++){
        a[i] = col[i];
    }
    return a;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Script Entry Point
//
GM_addStyle(".jerk { color:rgb(255,0,0); font-weight:bold; }");

taglines = toArray(document.getElementsByClassName("tagline"));

if (taglines.length > 0)
{
    //d1 = new Date();
    //ms1 = d1.getTime();
    for (var i = 0; i < taglines.length; i++)
    {
        // firstchild is null if it's a "load more comments" link
        if (taglines[i].firstChild == null)
        {
            continue;
        }
        var name = taglines[i].firstChild.innerHTML;
        var isJerk = isNameInStorage(name);
        
        // This check prevents us parsing the post title area - we only care about the comments section
        if (taglines[i].nextSibling.nodeName === "FORM")
        {
            // Add the JERK warning
            if (isJerk)
            {
                jerkSpan = document.createElement("span");
                jerkSpan.className = "jerk";
                jerkText = document.createTextNode("JERK!");
                jerkSpan.appendChild(jerkText);
                
                taglines[i].appendChild(jerkSpan);
            }
            
            // Add the link to add/remove jerk from the jerknames list.
            // Put this in the flat-list buttons section
            // Make sure the tag is a UL to verify we're putting in the right place
            
            if (taglines[i].nextSibling.nextSibling.nodeName === "UL")
            {
                addRemoveJerkLI = document.createElement("LI");
                addRemoveJerkA = document.createElement("A");
                
                if (isJerk)
                {
                    addRemoveJerkA.innerHTML = "remove jerk";
                    addRemoveJerkA.href = "javascript:void(0)";
                    addRemoveJerkA.setAttribute("jerkname", name);
                    addRemoveJerkA.addEventListener("click", function(e) {
                                                                var jerkElement = e.wrappedJSObject.target;
                                                                // Remove the current event listener when the event fires so we can switch
                                                                // between addJerk / removeJerk
                                                                jerkElement.removeEventListener("click", arguments.callee, false);
                                                                setTimeout(
                                                                    function() {
                                                                        removeJerk(jerkElement);
                                                                    },
                                                                    0);
                                                             },
                                                             false);
                } else
                {
                    addRemoveJerkA.innerHTML = "add jerk";
                    addRemoveJerkA.href = "javascript:void(0)";
                    addRemoveJerkA.setAttribute("jerkname", name);
                    addRemoveJerkA.addEventListener("click", function(e) {
                                                                var jerkElement = e.wrappedJSObject.target;
                                                                // Remove the current event listener when the event fires so we can switch
                                                                // between addJerk / removeJerk
                                                                jerkElement.removeEventListener("click", arguments.callee, false);
                                                                setTimeout(
                                                                    function() {
                                                                        addJerk(jerkElement);
                                                                    },
                                                                    0);
                                                             },
                                                             false);
                }
                addRemoveJerkLI.appendChild(addRemoveJerkA);
                taglines[i].nextSibling.nextSibling.appendChild(addRemoveJerkLI);
            }
        }
    }
    //d2 = new Date();
    //ms2 = d2.getTime();
    //GM_log("Adding jerks links took " + (ms2-ms1) + "ms");
    
    //
    // Perf
    //
    // With empty jerk list:
    // 500 comments takes ~223ms
    // 500 comments is the max for a non-Reddit Gold (lolololol) member
}