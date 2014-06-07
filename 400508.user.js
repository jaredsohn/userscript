// ==UserScript== 
// @name GoogleDirectLinks
// @namespace http://userscripts.org/
// @description Get direct links to websites in google search results instead of being redirected via Google
// @include https://www.google.*/search?q=*
// @include https://encrypted.google.*/#q=*
// ==/UserScript==

function suppressOnMouseDown() {
    // Get the list of all link carrying result heading elements.
    var elements = document.getElementsByTagName("h3");
    //Ensure the list was retrieved before proceeding
    if (elements == null || elements.length == 0) {
        // Need to check that elements are found. If not then log error and exit
        console.log("No elements found. This could be due to an results page. If not then" +
            "Either this is not the google search results page or its structure has changed. " +
            "Get an updated copy of the script if available or request an update");
        return;
    }
    //Cycle through all of the elements
    for (var i = 0 ; i < elements.length; i++) {
        var heading_children = elements[i].childNodes;

        //Script could work if there were multiple children under a single heading. 
        //It will update those of type "A" and move ahead
        for (var j = 0; j < heading_children.length; j++) {
            var link = heading_children[j]
            if (link.nodeName != "A") 
                //Ensure that the child retrieved is an anchor tag
                continue;
            // Now remove the attribute and verify its done
            link.removeAttribute("onmousedown");
            if (link.getAttribute("onmousedown") != null)
                console.log("Redirect Could not be suppressed");
        }
    }
}

suppressOnMouseDown();

