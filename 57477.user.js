// ==UserScript==
// @name          Metacritic remembers sorting
// @namespace     http://www.bricemciver.com/
// @description   Remembers the last sort setting you used and defaults to that next time you visit
// @include       http://*.metacritic.com/*
// ==/UserScript==

(function ()
{
    var namelist, scorelist, namelist1, scorelist1, namelist2, scorelist2;

    function sorting(sortItem1, sortItem2, sortType)
    {
        if (sortType === "score")
        {
            sortItem1.style.display = "none";
            sortItem2.style.display = "block";
        }
        // Default to name since site defaults to name
        else
        {
            sortItem1.style.display = "block";
            sortItem2.style.display = "none";
        }
    }
    
    function sortList(sortType)
    {
        if (namelist !== null && scorelist !== null)
        {
            sorting(namelist, scorelist, sortType);
        }
        if (namelist1 !== null && scorelist1 !== null)
        {
            sorting(namelist1, scorelist1, sortType);
        }
        if (namelist2 !== null && scorelist2 !== null)
        {
            sorting(namelist2, scorelist2, sortType);
        }
    }

    function replaceSortAction()
    {
        var allLinks, thisLink, i;
        allLinks = document.evaluate(
            "//a[@href='javascript:;']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
        for (i = 0; i < allLinks.snapshotLength; i++)
        {
            thisLink = allLinks.snapshotItem(i);
            if (thisLink.textContent === "sort by name")
            {
                thisLink.addEventListener("click", function (event) { GM_setValue("sorting", "name"); sortList("name"); }, true);
            }
            else if (thisLink.textContent === "sort by score")
            {
                thisLink.addEventListener("click", function (event) { GM_setValue("sorting", "score"); sortList("score"); }, true);
            }
        }
    }

    if (!GM_getValue || !GM_setValue)
    {
        return;
    }

    namelist   = document.getElementById("sortbyname");
    scorelist  = document.getElementById("sortbyscore");
    namelist1  = document.getElementById("sortbyname1");
    scorelist1 = document.getElementById("sortbyscore1");
    namelist2  = document.getElementById("sortbyname2");
    scorelist2 = document.getElementById("sortbyscore2");

    replaceSortAction();
    sortList(GM_getValue("sorting", "name"));
}());