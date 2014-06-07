// ==UserScript==
// @name            LJ Show comments inline
// @namespace       http://userscripts.org/scripts/show/8565
// @description     Show LJ comments inline
// @version         0.2

// @include         http://*.livejournal.com/*
// ==/UserScript==

(function() {

    var LJShowComments= {
        modifyLinks: function() {
            // enumarate links code from "LJ New Comments script" (http://www.noctua.org.uk/paul/)
            //todo: works only with comment links like ?nc=5
            var links = document.evaluate(
                    '//a[contains(@href,"?nc=") or contains(@href,"&nc=")]',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
            for (var i = 0; i < links.snapshotLength; i++)
            {
                var commentsLink = links.snapshotItem(i);

                if (commentsLink.href.indexOf("&page=") == -1) // skip page switcher in comments view
                {
                    var viewInlineCommentsLink = document.createElement("a");
                    viewInlineCommentsLink.innerHTML = "view";
                    viewInlineCommentsLink.href = "javascript:void(0)";
                    viewInlineCommentsLink.setAttribute("link", commentsLink.href);
                    viewInlineCommentsLink.addEventListener("click", LJShowComments.viewCommentsLink, false)

                    var divider = document.createTextNode(" - ");

                    commentsLink.parentNode.insertBefore(viewInlineCommentsLink, commentsLink.nextSibling);
                    commentsLink.parentNode.insertBefore(divider, viewInlineCommentsLink);
                }
            }
        },

        viewCommentsLink: function() {
            var targetDiv = LJShowComments.getTargetDiv(this);

            // throbber image
            targetDiv.innerHTML = loaderImg;

            var url = this.getAttribute("link") + "&format=light";
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(responseDetails) { parseResult(responseDetails.responseText) }
            })

            function parseResult(result){
                var dummy = document.createElement('div');
                dummy.style.display = 'none';
                document.body.appendChild(dummy);
                dummy.innerHTML = result;

                //todo: load deleted comments
                var comments= document.evaluate(
                        "//table[@class='talk-comment']",
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);

                targetDiv.innerHTML = "";

                for(var i = 0; i < comments.snapshotLength; i++) {
                    var comment = comments.snapshotItem(i).innerHTML;
                    // remove "light format" attribute from links
                    comment = comment.replace(/\&amp;format=light/g, "");
                    comment = "<table>" + comment + "</table>";

                    targetDiv.innerHTML += comment;

                    //trick for fyre-like design (with center or right align)
                    targetDiv.lastChild.style.textAlign = "left";
                }

                targetDiv.innerHTML += "<p align='center'><a href='javascript:void(0)'>close</a></p>";
                var closeLink = targetDiv.lastChild.firstChild;
                closeLink.addEventListener("click", LJShowComments.hideComments, false);

                document.body.removeChild(dummy);
            }
        },

        hideComments: function() {
            var targetDiv = this.parentNode.parentNode; // inside paragraph
            var commentsContainer = targetDiv.parentNode;
            commentsContainer.removeChild(targetDiv);

            var divider = commentsContainer.lastChild;
            if (divider && divider.nodeName == "HR")
            {
                commentsContainer.removeChild(divider);
            }

            if(commentsContainer.nodeName == "TD") // table design
            {
                var table = commentsContainer.parentNode.parentNode.parentNode;
                table.deleteRow(table.rows.length - 1);
            }
        },

        getTargetDiv: function(link) {
            var commentsContainer;
            var createDivider = true;

            // todo: use better code to find parent element
            // b-w-b design
            if (link.parentNode.nodeName == "B" && link.parentNode.parentNode.nodeName == "TD" && link.parentNode.parentNode.className == "comments") {
                    var table = link.parentNode.parentNode.parentNode.parentNode.parentNode;
                    var lastRow = table.rows[table.rows.length - 1];
                    if(lastRow.className == "view-comments-inline") {
                        return lastRow.cells[0].firstChild;
                    }
                    else {
                        var row = table.insertRow(table.rows.length);
                        row.className = "view-comments-inline";
                        row.style.backgroundColor = "white";
                        commentsContainer = row.insertCell(0);
                        commentsContainer.colSpan = "2";
                        createDivider = false;
                    }
            }
            // fyre and alekseyl designs
            else if (link.parentNode.className == "entrylinks"          // fyre design
                    || link.parentNode.className == "comment_links"     // fyre friends page design
                    || link.parentNode.className == "entryComments"     // alekseyl design
                    || link.parentNode.className == "comments"          // ctor design
                    ) {
                var parentDiv = link.parentNode.parentNode;

                // use created div
                if (parentDiv.lastChild.className == "view-comments-inline") {
                    return parentDiv.lastChild;
                // create new div
                } else {
                    commentsContainer = parentDiv;
                }
            }
            //my design
            else {
                var parentDiv = link.parentNode.parentNode.parentNode;
                // use created div
                if (parentDiv.lastChild.className == "view-comments-inline") {
                    return parentDiv.lastChild;
                // create new div
                } else {
                    commentsContainer = parentDiv;
                }
            }

            var targetDiv = document.createElement("div");
            targetDiv.className = "view-comments-inline";
            targetDiv.style.width = "100%";
            // comment next 3 lines to remove scrolling from comments div
            targetDiv.style.maxHeight= "400px";
            targetDiv.style.overflowY = "auto";
            targetDiv.style.overflowX = "hidden";

            if (createDivider) {
                var divider = document.createElement("hr");
                commentsContainer.appendChild(divider);
            }
            commentsContainer.appendChild(targetDiv);

            return targetDiv;
        }
    }

    LJShowComments.modifyLinks();

})();

var loaderImg = '<img src="data:image/gif;base64,' +
        'R0lGODlhFAAUAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv//////////////////////////////' +
        '/yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAFAAUAAAEUxDJSau9CADMteZTEEjehhzHJYqk' +
        'iaLWOlZvGs8WDO6UIPAGw8TnAwWDEuKPcxQml0YnjzcYYAqFS7VqwWItWyuCQJB4s2AxmWxGg9bl6YQt' +
        'l0cAACH5BAEKAA8ALAAAAAAUABQAAART8MlJq70vBMy15pMgSN72AMAliqSJotY6Vm8azxYM7tQw8IfD' +
        'xOcDBYMS4o9zFCaXRiePRyBgDIZLtWrBYi1b66NQkHizYDGZbEaD1uXphC2XRwAAIfkEAQoADwAsAAAA' +
        'ABQAFAAABFPwyUmrvU8IzLXm0zBI3vYEwSWKpImi1jpWbxrPFgzuFEHwAMDE5wMFgxLij3MUJpdGJ49X' +
        'KGAOh0u1asFiLVvrw2CQeLNgMZlsRoPW5emELZdHAAAh+QQBCgAPACwAAAAAFAAUAAAEU/DJSau9bwzM' +
        'teYTQUje9gjCJYqkiaLWOlZvGs8WDO5UUfCBwMTnAwWDEuKPcxQml0Ynj2cwYACAS7VqwWItW+vjcJB4' +
        's2AxmWxGg9bl6YQtl0cAACH5BAEKAA8ALAAAAAAUABQAAART8MlJq72PEMy15lNRSN72DMMliqSJotY6' +
        'Vm8azxYM7pRh8ALBxOcDBYMS4o9zFCaXRiePdzhgAoFLtWrBYi1b6wMAkHizYDGZbEaD1uXphC2XRwAA' +
        'IfkEAQoADwAsAAAAABQAFAAABFPwyUmrva8UzLXmk2FI3vYQxCWKpImi1jpWbxrPFgzu1HHwg8HE5wMF' +
        'gxLij3MUJpdGJ48HAGAEgku1asFiLVvrIxCQeLNgMZlsRoPW5emELZdHAAAh+QQBCgAPACwAAAAAFAAU' +
        'AAAEU/DJSau9zxjMtebTcUje9hTFJYqkiaLWOlZvGs8WDO4UAPAEwsTnAwWDEuKPcxQml0YnjxcIYAaD' +
        'S7VqwWItW+tDIJB4s2AxmWxGg9bl6YQtl0cAACH5BAEKAA8ALAAAAAAUABQAAART8MlJq73vHMy15hMA' +
        'SN72GMYliqSJotY6Vm8azxYM7lQQ8IXCxOcDBYMS4o9zFCaXRiePJxBgCIRLtWrBYi1b62MwkHizYDGZ' +
        'bEaD1uXphC2XRwAAOw==" alt="Loading...">';