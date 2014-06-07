// ==UserScript==
// @name           Gmail2 Label Hider
// @namespace      http://userscripts.org/scripts/show/22635
// @description    Allows for Labels to be hidden in the label bar
// @version        1.2
//
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// ==/UserScript==

if(document.location != top.location) return;

(function ()
{
    var interval = window.setInterval(tryToHideLabels, 300);

    function tryToHideLabels()
    {
        if (document.getElementById("canvas_frame") && frames[3].document && hideLabels(frames[3].document))
        {
            window.clearInterval(interval);
        }
    }

    function hideLabels(parentItem)
    {
        var labelsTableXpath = "//table[@class = 'H7Bo8e']";
        var labels = document.evaluate(labelsTableXpath, parentItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (labels && labels.rows.length == 0)
        {
            labels = null;
        }

        if (labels)
        {
            for(var i = 0; i < labels.rows.length; i++)
            {
                var labelRow = labels.rows[i];
                var div = labelRow.cells[0].firstChild.firstChild;
                    // fix for folders4gmail
                if (div.nextSibling) div = div.nextSibling;
                var labelText = div.firstChild.title;

                if (labelText.match(/^x_/))
                {
                    labelRow.style.display = "none";
                }
            }
        }

        return labels != null;
    }
})();