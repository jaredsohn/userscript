// ==UserScript==
// @name            Backpack: Show emails in popups
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-05-23: Shows emails in an Iframe just below the email title
// @include         http://*.backpackit.com/*
// @include         https://*.backpackit.com/*
// ==/UserScript==

/*
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

(function() {

    var BackpackEmailEmbed =
    {
        go: function()
        {

            var listA = document.getElementsByTagName("a");

            for (var a = 0; a < listA.length; a++)
            {
                var thisNode = listA[a];
                var emailMatch = thisNode.href.match(/\/emails\/show\/([0-9]+)$/i);

                if (emailMatch)
                {
                    var ifrID = "emailIframe_" + emailMatch[1];
                    var targetNode = thisNode.parentNode;
                    var br = document.createElement("br");
                    var ifr = document.createElement("iframe");
                    ifr.id = ifrID;
                    ifr.src = thisNode.href;
                    ifr.style.marginTop = "5px";
                    ifr.style.width = "100%";
                    ifr.style.display = "none";

                    targetNode.appendChild(br);
                    targetNode.appendChild(ifr);

                    thisNode.setAttribute("onClick", "document.getElementById('" + ifrID + "').style.display = (document.getElementById('" + ifrID + "').style.display == 'none') ? 'block' : 'none';");
                    thisNode.href = "#";
                    thisNode.target = "";
                }
            }

        }
    }

    BackpackEmailEmbed.go();

})();
