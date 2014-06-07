// ==UserScript==
// @name           Print XKCD
// @namespace      rob.iverson
// @description    Adds a "Print" button to XKCD comic pages which prepares the page for printing.
// @include        http://xkcd.com/*
// @include        http://www.xkcd.com/*
// ==/UserScript==

(function() {

    function addPrintButton(ul)
    {
        // add a "Print" button
        var newLI = document.createElement("LI");
        var newA = document.createElement("A");
        //newA.href = "javascript:prepareForPrint();";
        newA.addEventListener('click', function (e) {
                        document.prepareForPrint();
        }, false);
        newA.appendChild(document.createTextNode("Print"));
        newLI.appendChild(newA);
        ul.appendChild(newLI);

        // 5/2 - no need to make the list wide enough to fit the extra button as it already centers
    }

    // The "Print" button calls this function; it:
    //  - hides or removes some un-needed elements
    //  - makes the mouse-over tooltip visible below the image
    function prepareForPrint()
    {
        GM_log("preparing for print");
        
        // hide all the top and bottom tags
        document.getElementById("topContainer").style.display = "none";
        document.getElementById("bottom").style.display = "none";

        // 5/2 - no menu divs to hide - just comicNav uls
        var uls = document.getElementsByTagName("ul");
        for (var i = 0 ; i < uls.length ; i++)
        {
            if ( uls[i].className != "comicNav" ) { 
                continue;
            }
            uls[i].style.display = "none";

            // there's too much space between the title and comic now TODO fix that?
//            divs[i].parentNode.removeChild(divs[i].nextSibling); // an empty text node
//            divs[i].parentNode.removeChild(divs[i].nextSibling); // one of the "BR" nodes
//            divs[i].parentNode.removeChild(divs[i].nextSibling); // an empty text node
//            divs[i].parentNode.removeChild(divs[i].nextSibling); // one of the "BR" nodes
        }

        // save the tooltip (title tag image mouseover)
        var tooltip = "";

        var imgs = document.getElementsByTagName("IMG");
        for (var i = 0 ; i < imgs.length ; i++)
        {
            if ( imgs[i].src.indexOf("http://imgs.xkcd.com/comics") == 0 && imgs[i].title != null ) {
                tooltip = imgs[i].title;
            }
        }

        // we'll take over the "transcript" element and its text siblings to show the mouseover tooltip
        var transcript = document.getElementById("transcript");

        // remove previous siblings up to the "UL" elements - it's some text and <br> nodes about linking
        var iter = transcript.previousSibling;
        while (iter != null && !(iter instanceof HTMLUListElement)) {
            var next = iter.previousSibling;
            GM_log("transcript sibling = " + iter);
            iter.parentNode.removeChild(iter);
            iter = next;
        }
 
        transcript.appendChild(document.createTextNode(tooltip));
        transcript.style.display = "inline";
        transcript.style.fontVariant = "normal";
    }

    // make the function visible to the print button
    document.prepareForPrint = prepareForPrint;

    // 5/2 - no more "menuCont" divs needed
    
    // find the ULs that need Print buttons added
    var uls = document.getElementsByTagName("ul");
    GM_log("found " + uls.length + " uls");

    for (var i = 0 ; i < uls.length ; i++)
    {
        if ( uls[i].className != "comicNav" ) { 
            continue;
        }

        var ul = uls[i];

        addPrintButton(ul);
    }

})();

