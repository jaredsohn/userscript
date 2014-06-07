// ==UserScript==
// @name           GayRomeo_VisitorCheck [fork]
// @namespace      http://userscripts.org/scripts/versions/30322
// @description    Periodically checks for new visitors on your profile
//
// @match        *://*.gayromeo.com/*main/shortcuts.php
// @match        *://*.planetromeo.com/*main/shortcuts.php
// @match        *://83.98.143.20/*main/shortcuts.php
//
// @version        0.3.2
//
// ==/UserScript==
//
// History
//
// 3.2      ( 2013-Aug-11 ) -Djamana-
//
// [*] Update @match'es
// [*] StatusReset on Mouseover
// [*] Code design changes



var checkInterval                   = 30 * 1000; // msec
var visitorLinkDivHighlightStyle    = "background:#800000";
var MY_VISITORS                     = "Meine Besucher"
var link_SearchMyVisitors           = "/search/index.php?action=execute&searchType=myVisitors";

var visitorLinkDiv  = null;
var visitorPageLink = location.protocol + "//" + location.host + link_SearchMyVisitors;
var lastVisitor     = null;
var lastTaps        = null;
var lastTapsDiv     = null;

/////////////////////////////////////////////////////////////////////
//
//              F u n c t i o n s
//

function resetVisitorColor() {
    visitorLinkDiv.setAttribute("style", "");
}

function setVisitorColor() {
    visitorLinkDiv.setAttribute("style", visitorLinkDivHighlightStyle);
}

function checkLastVisitor() {

    var req = new XMLHttpRequest();

    req.open('GET', link_SearchMyVisitors, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4 && req.status == 200) {


            var doc = evaluateResponse( req.responseText );

            updateVistitorNTaps( doc );

        }
    };
    req.send(null);
}

function evaluateResponse(docText) {


    function getBody(content)
    {
        var x = content.indexOf("<body");
            x = content.indexOf(">", x);

        var y = content.lastIndexOf("</body>");

        return content.slice( x + 1, y );
    }


    var doc = document.createElement("body")
        doc.innerHTML = getBody(docText)
    return doc

}

function updateVistitorNTaps( doc) {

    checkVisitor(doc);
    checkTaps(doc);
}


function xEval( doc, xpath ) {

    var tmp = document.evaluate(
            xpath,
            doc,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null )

    return  tmp.singleNodeValue
}


function checkVisitor(doc) {

    var list = xEval( doc,
        "//td[@class='resHeadline']/a"
    );

    if (list) {

        // Any new visitors ?
        var currentLastVisitor = list.firstChild.nodeValue;
        var IsNewVistors =  ( lastVisitor != currentLastVisitor)
        var IsInitialCall =  !lastVisitor

        if (  IsNewVistors && !(IsInitialCall)  ) {
            // Yes - so set status
            setVisitorColor();
        }

        // Show/Update Taps data for new visitor
        if (  IsNewVistors  ||  (IsInitialCall)  ) {

            if (visitorName.hasChildNodes()) {
                visitorName.removeChild( visitorName.firstChild);
            }

            visitorName.appendChild( list);
        }

        // Update Done - so set last visitor <= current visitor;
        lastVisitor = currentLastVisitor;


    }
}



function checkTaps(doc) {

    var tapsImg = xEval( doc,
        "//td[@colspan='5']"  );

     tapsImg = xEval( tapsImg,
        "img[contains(@src,'/footprints/')]"    );

    var oldTaps = lastTapsDiv.firstChild;

    var hasTaps =  !!oldTaps

    if (tapsImg) {

        var isSameTaps = (tapsImg.src == lastTaps)//.title.split(" ")[0] == lastVisitor)
        if (!isSameTaps) {

            if (hasTaps)
                lastTapsDiv.removeChild(oldTaps);

            lastTapsDiv.appendChild(tapsImg);
            tapsImg.removeAttribute("align");

        }

        lastTaps = tapsImg.src

    } else

        lastTaps = null


    if ( ( hasTaps ) && !isSameTaps) {
        lastTapsDiv.removeChild(oldTaps);
    }


}



/////////////////////////////////////////////////////////////////////
//
//                          M a i n
//

// Normally all short elements have the class 'rowLine'
// Expect the last the last that has 'row'...


var lastRowDiv = xEval( document,
            "\
            //div[@class='list_back'][last()] \
             /div[@class='content'] \
             /div[@class='row'] \
            ");

// ... so overwrite the class of last element to 'rowLine' ...
    lastRowDiv.setAttribute("class", "rowLine");

// select last .shortcuts div.content
var contentDiv = lastRowDiv.parentNode


    // ------ div Visitors-------
// ... and add a new div with class 'row'.
        visitorLinkDiv = document.createElement( "div" );
        visitorLinkDiv.setAttribute("class", "row"              );
        visitorLinkDiv.setAttribute("title", MY_VISITORS    );
    contentDiv.appendChild(visitorLinkDiv);

    // ------ div Visitors   -------
    // ------ a 'myVisitors' -------

    var myVisitorLink = document.createElement( "a" );
        myVisitorLink.setAttribute( "style",    "color: rgb(255, 153, 0);"  );
        myVisitorLink.setAttribute( "accesskey", "b"                        );
        myVisitorLink.setAttribute( "target",   "mitte"                     );
        myVisitorLink.setAttribute( "title",   "shortcut: Alt + Shift + b"    );
        myVisitorLink.setAttribute("href", link_SearchMyVisitors);
        myVisitorLink.appendChild( document.createTextNode( MY_VISITORS ) );


    visitorLinkDiv.appendChild( myVisitorLink);
    visitorLinkDiv.addEventListener("click", resetVisitorColor, false);
    visitorLinkDiv.addEventListener("mouseover", resetVisitorColor, false);

    // ------ div Taps   -------
    // ------ >> ----------------

    var lastVisitorDiv = document.createElement("div");
        visitorLinkDiv.appendChild(lastVisitorDiv);

    // >>
    lastVisitorDiv.appendChild(document.createTextNode("\u00A0\u00bb "));


        visitorName = document.createElement("span");
        lastVisitorDiv.appendChild(visitorName);
        visitorName.appendChild(document.createTextNode("..."));

        lastTapsDiv = document.createElement("div");
        lastTapsDiv.setAttribute("style", "width:100%;text-align:center")
        lastTapsDiv.appendChild(document.createTextNode(""));

    lastVisitorDiv.appendChild(lastTapsDiv);


    // Install timer
    setInterval( checkLastVisitor, checkInterval);

    // initial Call to Update LastVisitor (So we don't need to wait for timer)
    checkLastVisitor();