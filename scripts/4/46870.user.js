// ==UserScript==

// @name           Watch from List

// @namespace      wfl@kwierso.com

// @description    Watch threads from the forum thread list pages

// @include        http://*.roosterteeth.com/forum/forum.php?fid=*

// @include        http://*.roosterteeth.com/groups/forum/?id=*

// @include        http://*.roosterteeth.com/groups/forum/index.php?id=*

// @include        https://*.roosterteeth.com/forum/forum.php?fid=*

// @include        https://*.roosterteeth.com/groups/forum/?id=*

// @include        https://*.roosterteeth.com/groups/forum/index.php?id=*
// @include        http://roosterteeth.com/forum/forum.php?fid=*

// @include        http://roosterteeth.com/groups/forum/?id=*

// @include        http://roosterteeth.com/groups/forum/index.php?id=*

// @include        https://roosterteeth.com/forum/forum.php?fid=*

// @include        https://roosterteeth.com/groups/forum/?id=*

// @include        https://roosterteeth.com/groups/forum/index.php?id=*

// ==/UserScript==



(function() {

    // Get the table cells that contain threads

    var allTableClass = getElementsByClass(document, "table", "hlines")[0];

    var allTdClass = getElementsByClass(allTableClass, "td", "small");



    // Build a new link element

    var newLink = document.createElement("a");

    newLink.innerHTML = "Watch";

    newLink.className = "small";

    newLink.setAttribute("align", "end");



    // Build new table cell and append link

    var newTd = document.createElement("td");

    newTd.appendChild(newLink.cloneNode(true));

    newTd.width = "35px";

    

    var emptyHolder;

    

    // For each thread title, insert the new table cell with an event listener

    for(i=5;i<allTdClass.length;i=i+5) {

        emptyHolder = newTd.cloneNode(true);

        emptyHolder.addEventListener("mouseover", getLink, false);

        allTdClass[i].parentNode.insertBefore(emptyHolder, allTdClass[i+1]);

    }

})();



function getElementsByClass(elem, type, cls) {

    // Within 'elem', get all elements of type 'type' that are of className 'cls'

    var allType = elem.getElementsByTagName(type);

    var allClass = [];

    

    for(i in allType) {

        if(allType[i].className == cls) {

            allClass.push(allType[i]);

        }

    }

    

    return allClass;

}



function getLink(aEvent) {

    // Get the non-domain portion of currentURL

    var returnURL = aEvent.target.ownerDocument;

    returnURL = returnURL.URL.replace("http://" + returnURL.domain, "");



    // Build the 'watch' URL

    var newURL = this.parentNode.getElementsByTagName("td")[0].getElementsByTagName("a")[0].href;

    newURL = newURL.replace("viewTopic", "watch");



    // Set the watch link's href to the new URL, returning the user to the current page

    this.firstChild.href = newURL + "&return=" + returnURL;



    // Only need to run this function once per thread. Remove this event listener when done.

    this.removeEventListener("mouseover", getLink, false);

}