// ==UserScript==
// @name          XSS
// @namespace     eXcessS
// @description   Tool for finding Cross Site Scripting (XSS) vulnerabilities.
// @include       *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//
// Set your test string here
var xssTestString = "';!--\"<XSS>=";


function xssDict(linkList) {
    // Create list of page links with GET paremeters
    this.dirtyLinks = linkList.filter("[href*='?']");
    // Split links for main dictionary
    this.linkDict = splitLinks;
    // Create list of hidden form elements
    this.hiddenForms = hiddenInput;
    // Find hidden elements pulling from current url
    //this.matchWithHidden = matchParams;
    // Get size of array

    // Split links into attribute lists
    function splitLinks (linkList) {
        splitDict = {};
        // List size sanity check
        if (linkList.length > 0) {
            // Split links, iterate over each parsing GET attributes
            linkList.each(function(){
                // Add check for same or short path URLs to exclude foreign domains
                urlSlice1 = this.href.split('?');
                // Only save links containing current document host
                if (urlSlice1[0].indexOf(document.location.host) > 1) {
                    // Split attributes for slicing
                    urlSlice2 = urlSlice1[1].split('&');
                    cutAttribs = splitAttribs(urlSlice2);
                    if (objectSize(cutAttribs)) {
                        splitDict[urlSlice1[0]] = splitAttribs(urlSlice2);
                    }
                }
            });
        }
        return splitDict;
    }
    // Parse GET attributes
    function splitAttribs (attribList) {
        newDict = new Object();
        for (subCount in attribList) {
            // Split on "="
            splitAttrib = attribList[subCount].split('=');
            // Add param/value to dict if key/value
            if (splitAttrib[1]) {
                newDict[splitAttrib[0]] = splitAttrib[1];
            }
        }
        return newDict;
    }
    // Parse hidden form elements into dict
    function hiddenInput () {
        tempDict = {}
        // Get hidden elements
        hiddenInput = $('input:hidden');
        // Input list size sanity check
        if (hiddenInput.length > 0) {
            // Create array using name or id attribute of hidden form elements
            $('input:hidden').each(function () {
                testName = $(this).attr("name");
                // Handle blank empty form elements
                thisValue = $(this).attr("value") ? $(this).attr("value") : "blank";
                // Set key name by 'name' or 'id'
                if ($(this).attr("name")) {
                    tempDict[$(this).attr("name")] = thisValue;
                } else if ($(this).attr("id")) {
                    tempDict[$(this).attr("id")] = thisValue;
                }
            });
        }
        return tempDict;
    }

}
function displayObj () {
    // Create new xssDict
    var myXss = new xssDict($("a"));
    // Set private variables
    var linkList = myXss.linkDict(myXss.dirtyLinks);
    var hiddenIn = myXss.hiddenForms();
    var easyXss = matchParams(hiddenIn);
    // expose Start function
    this.startDisplay = showButtons;
    // Generic button element
    var defaultButton = $("<div>").css({
        "height":"10px",
        "width":"10px",
        "position":"absolute",
        "background":"white",
        "z-index":"999",
        "border":"1px solid black"
    });
    // Generic CSS Attributes
    // Some sites still manage to disturb the display
    function labelCss (thisTag) {
        return $(thisTag).css({
            "cursor":"default",
            "color":"black",
            "font-size":"12px",
            "margin":"0px",
            "line-heigh":"14px",
            "padding":"2px 10px",
            "background":"white",
            "text-align":"center",
            "border-bottom":"1px solid black",
            "text-decoration":"none"
        });
    }
    // Starter function, draw buttons if appropriate lists exist.
    function showButtons () {
        // Start of boxes
        topPaint = 150;
        // Check if the link list exists
        if (objectSize(linkList)) {
            $(uiButton(topPaint,"xssButton1","red"))
            .bind("click",showLinks)
            .appendTo("html");
            // Keep track of draw position
            topPaint+=11;
        }
        // check if hidden list exists
        if (objectSize(hiddenIn)) {
            $(uiButton(topPaint,"xssButton2","yellow"))
            .bind("click",showForms)
            .appendTo("html");
            // Keep track of draw position
            topPaint+=11;
        }
        // Check for a form element pulled from URL
        if (easyXss) {
            $(uiButton(topPaint,"xssButton3","green"))
            .appendTo("html")
            .bind("click",function (){
                window.location = easyXss;
            });
        }
        // Add button hide function to <body> click handler
        $("body").click(function () {
            $("div[id*='xssM']").hide();
        });

    }
    // Draw UI button
    function uiButton (buttonTop, buttonId, bgColor) {
        return $(defaultButton).clone().attr("id",buttonId).css({
            "top":buttonTop+"px",
            "background-color":bgColor
        });
    }
    // -Button onclick functions
    // Hide any showing list, show link list
    function showLinks() {
        $("div[id*='xssM']").hide();
        urlBox(linkList, "#xssMain", 11, $(this).offset().top);
    }
    // Hide any showing list, show form list
    function showForms() {
        $("div[id*='xssM']").hide();
        urlBox(hiddenIn, "#xssMainF", 11, $(this).offset().top);
    }
    // Add container div for lists
    function urlBox (nameList, idName, startLeft, startTop) {
        // Show container if it exists already
        if ($(idName).length > 0) {
            $(idName).show();
        // Otherwise create it
        } else {
            // Subdiv css
            $("<div>").css({
                "width":"auto",
                "background":"black",
                "position":"absolute",
                "top":startTop+"px",
                "left":startLeft+"px",
                "z-index":"999",
                "border":"1px solid black",
                "border-bottom":"none"
            })
            // strip "#"
            .attr("id",idName.substr(1))
            // Add to page
            .appendTo("html");
            // Draw urls for associated list
            drawUrls($(idName),nameList, idName);
        }
    }
    // Create new Id by:
    function createLinkId(idName, idCount) {
        // -Prepending "a"
        // -Stripping "#"
        // -Appending "-" and the iteration count
        return "a"+idName.substr(1)+"-"+idCount;
    }
    // Submenu creation function
    function drawUrls(elementBox, artArray, idName) {
        var idCount = 0;
        // Create another supermenu if array is object
        if (typeof artArray == "object") {
            // Iterate over array elements
            for (thisRoot in artArray) {
                if (artArray[thisRoot]) {
                    idCount++;
                    // Create id name
                    newId = createLinkId(idName, idCount);
                    // If element already exists, display it instead
                    if ($(newId).length > 0) {
                        $(newId).show();
                    } else {
                        // Create generic paragraph
                        labelCss($("<p>")).clone()
                        .attr("id",newId)
                        .attr("title",thisRoot)
                        .bind("click", function () {
                            thisId = "#"+($(this).attr("id").substr(1));
                            // Get any sub menus that might be open
                            hideMe = thisId.slice(1,thisId.lastIndexOf("-")+1);
                            // Hide them
                            $("div[id*="+hideMe+"]").hide();
                            thisArray = artArray[$(this).attr("title")];
                            // Create sub menu on click
                            urlBox(thisArray, thisId, $(this).offset().left+$(this).outerWidth(), $(this).offset().top-1);
                        })
                        .text(thisRoot)
                        // Insert into parent box
                        .appendTo(elementBox);
                    }
                } else {
                    artArray = thisRoot;
                }
            }
        }
        // Create link if we're at the end of the line
        if (typeof artArray == "string") {
            // Create new id
            newId = createLinkId(idName, idCount);
            // Create link container
            linkContainer = labelCss($("<p />"))
            .attr("id",newId);
            // Create link
            newLink = $("<a />").clone()
            .attr("href",artArray)
            // Generic link text
            .text("Attack!")
            // Add to link container
            .appendTo(linkContainer);
            // Clicked element id
            thisId = $(idName).attr("id");
            // Get element root
            rootId = getRoot(newId);
            // Get root text
            urlRoot = $("#"+rootId).text();
            // Get attack vector clicked
            xssVector = $("#"+getPrev(newId)).text();
            // Set link URL to attack URL
            newLink.attr("href",createLink(urlRoot, xssVector, linkList));
            // Add link to container
            linkContainer.appendTo(elementBox);
        }
    }
    // Create href based on parameters
    function createLink(urlRoot, xssVector, rootList) {
        var bestForLast, returnUrl;
        attribList = rootList[urlRoot];
        // Check if root is part of forms or links
        if (attribList) {
            // Construct URL for Link attacks
            returnUrl = urlRoot + "?";
            for (attribute in attribList) {
                if (attribute == xssVector) {
                    // Save attack vector for last to preserve other attributes
                    bestForLast = attribute;
                } else {
                    // Add preserved paramater
                    returnUrl += attribute + "=" + attribList[attribute] + "&";
                }
            }
            // Add attack vector at end of string
            returnUrl += bestForLast + "=" + xssTestString;
        } else {
            // Check if URL already has GET params
            if (window.location.href.indexOf("?") > 0) {
                // Add to them if so
                returnUrl = window.location.href + "&" + xssVector + "=" + xssTestString;
            } else {
                // Create our own if not
                returnUrl = window.location.href + "?" + xssVector + "=" + xssTestString;
            }
        }
        return returnUrl;
    }
    // Get previous menu id
    function getPrev (thisId) {
        prevId = thisId.slice(0,thisId.lastIndexOf("-"));
        var retId;
        if ($("#"+prevId).length > 0){
            retId = prevId;
        }
        return retId;
    }
    // Get clicked root url
    function getRoot (thisId) {
        prevId = getPrev(thisId);
        retId = thisId;
        if (prevId) {
            retId = getRoot(prevId);
        }
        return retId;
    }
    // Find parameters in URL matching hidden form fields
    function matchParams(hiddenIn) {
        var urlList, easyUrl;
        // Don't do anything if URL doesn't have GET params
        if ((window.location.href.indexOf("?") > 0) && (window.location.href.indexOf("=") > 0)) {
            // Create link to pass to linkDict
            newLink = $("<a>").attr("href",window.location.href);
            urlList = myXss.linkDict(newLink);
            // Get current page attribs
            for (thisUrl in urlList) {
                theseAttribs = urlList[thisUrl];
            }
            // Loop through both objects checking values
            for (urlAttrib in theseAttribs) {
                for (hiddenAttrib in hiddenIn) {
                    // Found a match, create easyUrl
                    if ((hiddenIn[hiddenAttrib] == theseAttribs[urlAttrib])) {
                        // Base href
                        moneyUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                        easyUrl = createLink(moneyUrl, urlAttrib, urlList);
                    }
                }
            }
        }
        return easyUrl;
    }
}
// Get size of object
function objectSize (myArray) {
    var attribCount = 0;
    for (attrib in myArray) {
        attribCount++;
    }
    return attribCount;
}
// Start script when loaded
(function() {
    myDisplay = new displayObj();
    myDisplay.startDisplay();
}());
