// ==UserScript==
// @name           Add Watch Comments Button to Every Journal
// @namespace      watchcomments@roosterteeth.com
// @include        http://roosterteeth.com/members/journal/entry.php?id=*
// @include        http://*.roosterteeth.com/members/journal/entry.php?id=*
// @include        http://roosterteethcomics.com/members/journal/entry.php?id=*
// @include        http://redvsblue.com/members/journal/entry.php?id=*
// @include        http://strangerhood.com/members/journal/entry.php?id=*
// @include        http://captaindynamic.com/members/journal/entry.php?id=*
// @include        http://achievementhunter.com/members/journal/entry.php?id=*
// ==/UserScript==

(function() {
    try {
    // If this doesn't throw an error, the current page already has a Watch link
        var watchPresent = document.getElementById("comments").
                            parentNode.getElementsByTagName("tr")[1].
                            getElementsByTagName("a")[1].innerHTML.
                            match("Watch Comments") == "Watch Comments";
    } catch(e) {
    //TODO: Having caught the error, determine if this is your own page.
        var breadCrumbs = document.getElementById("pageContent").getElementsByTagName("table")[2].getElementsByTagName("tbody")[0].getElementsByTagName("a")[0].firstElementChild.innerHTML == "My Homepage";
        if(!breadCrumbs) {
        
            // Find the empty position where we can place the watch link
            var placement = document.getElementById("pageContent").
                                    getElementsByTagName("td")[0].
                                    firstElementChild.firstElementChild.childNodes[6].firstElementChild;

            // Figure out what the watch link's URL will be
            var thisPage = document.location.href.split(document.domain)[1];
            if(thisPage.match("journal") == "journal") {
                var watchURL =   "http://" + document.domain + "/" + "watchComments.php?a=journalComments&id=" + 
                        thisPage.split("id=")[1].split("&")[0] + "&return=" + thisPage;
            } else {
                //TODO: Images?
            }

            // Create the watch link
            var watchLink = document.createElement("a");
            watchLink.setAttribute("class", "small");
            watchLink.innerHTML = "Watch Comments";
            watchLink.href = watchURL;

            // Append the watch link, along with some padding
            placement.style.textAlign = "right";
            placement.style.paddingRight = "15px";
            placement.appendChild(document.createTextNode("[ "));
            placement.appendChild(watchLink);
            placement.appendChild(document.createTextNode(" ]"));
        }
    }
})();