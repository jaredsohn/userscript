// Greasemonkey script: Timezone.com and Watchnet.com
// Copyright (c) 2007, Steve McCarthy sjm@mccrew.com

// This script is distributed without warranties of any kind whatsoever, to the
// extend allowed by applicable law. The author is not responsible for damages
// resulting from its use.

// This script reskins timezone.com and watchnet.com.
// Dynamically creates a frameset to browse lists and open them in a right frame.

// ==UserScript==
// @name                Steve McCarthy's Timezone/Watchnet Improver
// @author              Steve McCarthy
// @namespace           http://www.mccrew.com/tz
// @date                2007-12-21
// @description         Change look & feel of timezone/watchnet list pages
// @include             http://forums.timezone.com/index.php?*frm_id=*
// @include             http://forums.timezone.com/index.php?t=msg&goto=*
// @include             http://forums.watchnet.com/index.php?*frm_id=*
// @include             http://forums.watchnet.com/index.php?t=msg&goto=*
// @include             http://*.timezone.com/index.php?t=thread*
// @exclude             http://*.timezone.com/index.php?t=post*
// ==/UserScript==

//alert("2 TOP " + document);

//=====================
// Helper function to find an element by class name
//=====================
function getElementsByClass(searchClass, node, tag)
{
    var classElements = new Array();
    if (null == node)
        node = document;
    if (null == tag)
        tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    //var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++)
    {
        //if (pattern.test(els[i].className))
        if (els[i].className == searchClass)
        {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function unhookMe(node)
{
    if (node && node.parentNode)
        node.parentNode.removeChild(node);
}

function unhookImgBySrc(src)
{
    var images = document.getElementsByTagName("img");
    if (images.length > 0)
    {
        for (var ii = 0; ii < images.length; ii++)
        {
            if (images[ii].src.match(src))
            {
                unhookMe(images[ii]);
                break;
            }
        }
    }
}


var rxTs = /(\w{3}\s+\d{1,2},\s+\d{4}\s+-\s+\d{2}:\d{2}\s+.M)/i;
var queryStringParam = "XXlastNewTs=";
var rxSearchId = "rxSearchId";
var rxSearchExpressions = "rxSearchExpressions";
var rxColors = ["yellow", "cyan", "#ccff46", "#FEEECD", "#98F5FF"];
var TS_IN_URL = null;

//==========================
// extracts the TZ timestamp from the child of the node passed in, or null if
// timestamp could not be determined
//==========================
function extractTimestamp(parent)
{
    var timestamp = null;

    if (parent && parent.lastChild)
    {
        if (3 == parent.lastChild.nodeType)
        {
           var arr = rxTs.exec(parent.lastChild.textContent);
           if (null != arr)
           {
               var dateObj = new Date(arr[1]);
               timestamp = dateObj.getTime();
               //GM_log ("extractTimestamp: timestamp is" + timestamp + ", input was: " + arr[1]);
           }
           else
                GM_log ("extractTimestamp: didn't match rxTs " + parent.lastChild.textContent);
        }
        else
            GM_log ("extractTimestamp: not a text node " + parent.lastChild.nodeType);
    }
    else
        GM_log ("extractTimestamp: parent or last child null, " + parent);

    return timestamp;
}

function getTimestampLastNewPost(node)
{
    var newPosts = getElementsByClass("newMsg", node, "span");
    GM_log(newPosts.length + " new posts discovered");

    var lowestTs = (new Date()).getTime();  // i.e. now
    if (newPosts.length)
    {
        for (var id = 0; id < newPosts.length; id++)
        {
            var thisTs = extractTimestamp(newPosts[id].parentNode);
            if (thisTs && thisTs < lowestTs)
                lowestTs = thisTs;
        }
    }

    return lowestTs;
}

function trim(str)
{
    return str.replace(/^\s*|\s*$/g, "");
}

function trimArr(arr)
{
    for (var i = 0; i < arr.length; i++)
        arr[i] = trim(arr[i]);
    return arr;
}

function clearPrevSearch()
{
    // walk and clear old search...
    var oldHighlights = getElementsByClass("mccrewHighlight", document, "span");
    for (var ih = 0; ih < oldHighlights.length; ih++)
    {
        // get at underlying HTMLSpan instance, instead wrappen within an
        // XPCNativeWrapper, as Greasemonkey serves it up to us
        var oh = oldHighlights[ih].wrappedJSObject || oldHighlights[ih]; // take temp for easier reading
        while (oh.hasChildNodes())  // move them north...
            oh.parentNode.insertBefore(oh.removeChild(oh.firstChild), oh.nextSibling);

//GM_log ("oh=" + oh + ", oh.parentNode=" +oh.parentNode);
        oh.parentNode.normalize(); // collapse #text nodes
        unhookMe(oh);
    }
}

function getSearchRegexes()
{
    var rxArr = new Array();
    var textInputControl = document.getElementById(rxSearchId);
    if (textInputControl)
    {
        // first thing, clean up user input and save it
        var userEnteredStrs = textInputControl.value;
        if (null != userEnteredStrs)
        {
            var rawRxArr = null;
            var trimmedUserInput = trim(userEnteredStrs);
            if (0 == trimmedUserInput.length)
            {
                rawRxArr = new Array(); // empty
            }
            else
            {
                rawRxArr = trimArr(trimmedUserInput.split(","));
                //GM_log ("rawRxArr=>" + rawRxArr + "<");
            }
            var countRx = 0;
            var tmpArr = new Array();
            for (var i = 0; i < rawRxArr.length; i++)
            {
                if (rawRxArr[i].length)
                {
                    tmpArr[countRx] = rawRxArr[i]; // as plain text
                    rxArr[countRx] = new RegExp(rawRxArr[i], "i"); // as RegExp instances
                    countRx++;
                }
            }
            //GM_log ("final regexes:\n\t" + rxArr.join("\n\t"));

            if (countRx != rawRxArr.length)
                GM_log ("countRx=" + countRx + ", rawRxArr.length=" + rawRxArr.length);

            var sanitizedInput = tmpArr.join(", ");
            GM_setValue(rxSearchExpressions, sanitizedInput);

            // backfill UI input field if sanitized version differs from actual input
            if (userEnteredStrs != sanitizedInput)
                textInputControl.value = sanitizedInput;
        }
    }
    else
        GM_log ("Couldn't grab textInputControl for id " + rxSearchId);

    return rxArr;
}

function PerformSearch()
{
    // Unhighlight old search
    clearPrevSearch();

    var rxArr = getSearchRegexes();
    // optimization - if rxArr is empty, no need to walk the DOM...
    if (0 == rxArr.length)
    {
        //GM_log ("No regexes to search, bailing early");
        return;
    }

    // walk and apply new search...
// TODO - much simpler if we just walked ALL text nodes in document instead of
// doing such a specific search, ahh well, will simplify later
    var divs = getElementsByClass("MsgIndex", null, "div");
    if (divs.length > 0)
    {
//GM_log ("1");
        // should only be 1, hard code index 0
        var li = divs[0].getElementsByTagName('li');
        if (li.length > 0)
        {
//GM_log ("2, li.length=" + li.length);
            for (var i = 0; i < li.length; i++) 
            {
//GM_log ("3");
                // look at text child of first <a>
                var a = li[i].getElementsByTagName('a');
                if (a.length > 0 && a[0].hasChildNodes)
                {
                    // Apply search - highlight matches
                    var colorIndex = 0;
                    for each (var searchRx in rxArr) 
                    {
                //GM_log ("rx " + searchRx);
                        for (var node = a[0].firstChild; null != node; node = node.nextSibling)
                        {
                            // had to hard-code 3, using Node.TEXT_NODE did not work
                            if (3 == node.nodeType && searchRx.test(node.textContent))
                            {
                                //highlight (node.parentNode, node.textContent, searchRx, rxColors[colorIndex]);
                                highlight (node.parentNode, node.textContent, node, searchRx, rxColors[colorIndex]);
                                unhookMe(node);
                            }
                        }
                        colorIndex++;
                        if (colorIndex >= rxColors.length)
                            colorIndex = 0;
                    }
                }
            }
        }
    }
}

function getCustomSearchForm()
{
    var form = document.createElement("form");
    form.setAttribute("method", "get");
    form.setAttribute("action", "javascript:(void)0;");
    form.setAttribute("id", 'searchForm');
    form.setAttribute("style", "padding: 0; margin: 0;");
    form.addEventListener('submit', PerformSearch, false);

    var field = document.createElement("input");
    field.setAttribute("name", "searchRxs");
    field.setAttribute("id", rxSearchId);
    field.setAttribute("size", 60);
    field.setAttribute("value", GM_getValue(rxSearchExpressions));
    form.appendChild(field);

    var anch = document.createElement("a");
    anch.setAttribute("name", "searchRxs_a");
    anch.addEventListener('click', PerformSearch, true);
    anch.appendChild(document.createTextNode("DuraSearch"));
    form.appendChild(anch);

/*
    anchTxt = ["fs", "FS", "fsot", "FSOT", "wtb", "WTB"];
    for (var i = 0; i < anchTxt.length; i+=2)
    {
        form.appendChild(document.createTextNode("  "));
        var a1 = document.createElement("a");
        a1.setAttribute("href", "#" + anchTxt[i]);
        a1.addEventListener('click', function() {document.getElementById(anchTxt[i]).scrollIntoView(true);}, false);
        a1.appendChild(document.createTextNode(anchTxt[i+1]));
        form.appendChild(a1);
    }
*/

    return form;
}

function highlight(parentNode, text, textNode, searchRx, color)
{
    var matchResult = searchRx.exec(text); // returns null on failure, array on success
    if (matchResult)
    {
        // prematch...
        if (matchResult.index > 0)
        {
            var prematch = text.substr(0, matchResult.index);
            var prematchNode = document.createTextNode(prematch);
            parentNode.insertBefore(prematchNode, textNode);
//GM_log ("in highlight prematch=" + prematch);
        }

//GM_log ("in highlight    match=" + matchResult[0]);

        // the match itself
        var markedUp = document.createElement('span');
        markedUp.setAttribute("style", "background:" + color);
        markedUp.setAttribute("class", "mccrewHighlight");
        markedUp.appendChild(document.createTextNode(matchResult[0]));
        parentNode.insertBefore(markedUp, textNode);

//GM_log ("in highlight searchRx.lastIndex=" + searchRx.lastIndex);
        // postmatch
        // Javascript bug?  I think I should be able just to use
        // searchRx.lastIndex, but it returns zero, resulting in infinite
        // recursion below.
        //var postmatch = text.substr(searchRx.lastIndex);
        var postmatch = text.substr(matchResult.index + matchResult[0].length);
//GM_log ("in highlight postmatch=" + postmatch);
        if (searchRx.test(postmatch))
        {
            // recurse and return
            // TODO - avoid recursion by setting "global" flag on regexes?
            highlight(parentNode, postmatch, textNode, searchRx, color);
            return;
        }
        else
            parentNode.insertBefore(document.createTextNode(postmatch), textNode);
    }
    else // just append
    {
        parentNode.insertBefore(document.createTextNode(text), textNode);
    }
}

// Add styles
function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Detects if this anchor is one that should be re-marked as New
function fixPostIfNew(anchor)
{
    if (null == anchor || 'A' != anchor.tagName.toUpperCase())
    {
        GM_log("fixPostIfNew: not an anchor " + anchor);
        return;
    }

    if (TS_IN_URL)
    {
        var thisTs = extractTimestamp(anchor.parentNode);
        if (thisTs && (thisTs >= TS_IN_URL))
        {
            // todo - turn this into singleton img, but watch closure issues
            var g_imgStar = document.createElement('img');
            g_imgStar.alt = "New!";
            g_imgStar.src = 'data:image/png;base64,' +
                    'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
                    'AAsTAAALEwEAmpwYAAAAB3RJTUUH1wwQBhcn8gJx5gAAALpJREFUeNqNkj0OwjAMhV/aDlSMiAswMiGl' +
                    'TCAmFkY2Du2chSN8DE3atEklLD0p1vPPsx0BquBmEsCzxtcSnElgijRuHdOotLskyUth9E9FRFbJARfL' +
                    'm5swjQDewB5oBHxIRIJFxOScMwlN+imDF77NnRsPrzDoP/McPPSp7HU9S1Ue9IBTtoTzdIGazDGpKe60' +
                    'mG+VHDdY3KlNj+AkiWMYpOq8WaeOWfsDaKPsnUnfLXm9bXybuIAu+T9N8HAe7nvWggAAAABJRU5ErkJg' +
                    'gg==';
            anchor.parentNode.insertBefore(g_imgStar, anchor);
GM_log ("marking as new " + anchor);
        }
    }
}

// This function is buggy, see note below.
function reorderList()
{
    var rxWTB  = /wtb/i;
    var rxFSOT = /fsot|wtt|to trade/i;
    var aFS = document.createElement("a");
    aFS.setAttribute("name", "fs");
    aFS.setAttribute("id", "fs");
    var aFSOT = document.createElement("a");
    aFSOT.setAttribute("name", "fsot");
    aFSOT.setAttribute("id", "fsot");
    var aWTB = document.createElement("a");
    aWTB.setAttribute("name", "wtb");
    aWTB.setAttribute("id", "wtb");
    var hr = document.createElement("hr");
    var arrFS = [hr, document.createTextNode("FOR SALE!"), aFS, hr];
    var arrFSOT = [hr, document.createTextNode("TRADES!"), aFSOT, hr];
    var arrWTB = [hr, document.createTextNode("WANTED TO BUY!"), aWTB, hr];
    var aSubj = getElementsByClass("mA", null, "a");
    var ulNode = null;
    for (var i = 0; i < aSubj.length; i++) 
    {
        var liNode = aSubj[i].parentNode;
        if (null == ulNode)
            ulNode = liNode.parentNode;

// BUG - Note this does not handle threaded conversations properly- replies are
// not child nodes, so they do not get removed and replaced when the original
// <li> node is moved.  Replies are <ul>s that are sibling to the higher-level
// <li>s.
        if (ulNode != liNode.parentNode)
        {
            GM_log(aSubj[i] + " appears to be more deeply buried, skipping");
            continue;
        }

        var fc = aSubj[i].firstChild.wrappedJSObject || aSubj[i].firstChild;
        if (fc)
        {
            if (rxWTB.test(fc.textContent))
                arrWTB[arrWTB.length] = liNode;
            else if (rxFSOT.test(fc.textContent))
                arrFSOT[arrFSOT.length] = liNode;
            else
                arrFS[arrFS.length] = liNode;

            unhookMe(liNode);
        }
        else
            GM_log(" no first child or value aSubj[i]=" + aSubj[i] + " fc=" + fc);
    }

    // reorder, FS first, FSOT next, WTB last
    if (ulNode)
    {
        for (var i = 0; i < arrFS.length; i++)
            ulNode.appendChild(arrFS[i]);

        for (var i = 0; i < arrFSOT.length; i++)
            ulNode.appendChild(arrFSOT[i]);

        for (var i = 0; i < arrWTB.length; i++)
            ulNode.appendChild(arrWTB[i]);
    }
    else
        GM_log(" no ulNode!");
}

addGlobalStyle(
    'body { font-family: Verdana,Arial,sans-serif;line-height:14px; ! important; background:#FFFFFF;'+ 
    'font-size: 9pt !important;}'+
    'a{text-decoration:none; color:#003DB8 ;}a:hover{text-decoration:underline;background-color:#eaeaea;}a:visited{color:#660066;}'+
    'td{font-family: Verdana,Arial,sans-serif;line-height:14px; ! important;font-size: 9pt !important; }'
    );

//=====================
// Create Frameset
//=====================
//if there is no frame, create it
if (top.frames.length == 0 && -1 < window.location.href.indexOf("?t=thread"))
{
    //alert("1 In the no frames section");
    var newPostTs = getTimestampLastNewPost(getElementsByClass("MsgIndex", null, "div")[0]);

    var defRframe = "http://www.mccrew.com/tz/";
    var src = window.location.href;
    var leftSrc = src;
        src = defRframe;

    document.body = document.createElement('frameset');
    document.body.setAttribute('rows','*');
    document.body.setAttribute('cols','35%,*');

    leftFrame = document.createElement('frame')
        leftFrame.setAttribute('name', "left")
        leftFrame.setAttribute('src',  leftSrc);

    rightFrame = document.createElement('frame')
        rightFrame.setAttribute('name', "right")
        rightFrame.setAttribute('src', src);

    document.body.appendChild(leftFrame);
    document.body.appendChild(rightFrame);

    var leftHref = window.location.href;
    if (newPostTs)
        leftHref = leftHref + "&" + queryStringParam + escape(newPostTs);
    GM_log("Left frame getting: " + leftHref);

    leftFrame.contentDocument.location = leftHref;
    //leftFrame.contentDocument.body.innerHTML = "";
    rightFrame.contentDocument.location = defRframe;
}
else
{
    //GM_log("looking for " + queryStringParam + " in " + window.location.href);
    var gg = window.location.href.indexOf(queryStringParam);
    if (-1 < gg)
    {
        TS_IN_URL = unescape(window.location.href.substr(gg + queryStringParam.length));
        GM_log("Extracted from URL: " + TS_IN_URL);
    }
    //else
        //GM_log("couldn't find " + queryStringParam + " in " + window.location.href);

    //=====================
    // Remove sections of the page to make it more readable
    //=====================

    // If in frames, and on an individual posting page...
    // if (top.frames.length && window.location.href.match(/t=msg&goto=/i))
    if (window.location.href.match(/t=msg&goto=/i))
    {
        if (window.location.href.match(/timezone\.com/i))
        {
            var ht = getElementsByClass("GenText", null, "table");
            if (ht.length)
                unhookMe(ht[0]);

            var divIM20 = getElementsByClass("navbar", null, "div");
            if (divIM20.length)
                unhookMe(divIM20[0]);

            unhookImgBySrc("logo_header.gif");
        }
        else // watchnet
        {
            var tabl = getElementsByClass("GenText", null, "table");
            if (tabl.length)
                unhookMe(tabl[0]);

            unhookImgBySrc("wnet_logo.gif");
        }

        // TODO - swap author and content columns
    }

    // Timezone blurb...
    if (window.location.href.match(/timezone\.com/i))
    {
        // Nuke a redundant image
        unhookImgBySrc("logo180.gif");

        // 
        var lcol = document.getElementById("imcontainer10");
        if (lcol)
            lcol.width = ""; // was 100%, boo

        // Nuke the big text blurb that takes up a full screen...
        var tdIntroCol = getElementsByClass("IntroCol", null, "td");
        if (1 == tdIntroCol.length)
        {
            tdIntroCol[0].innerHTML = "";//"<font color='redwindow.location.href'> DELETED!!</font>";
            //while (tdIntroCol[0].hasChildNodes)
                //tdIntroCol[0].removeChild(tdIntroCol[0].firstChild);

            // move <div class=paneltitle> and <div class=bigsearchbox> 
            // here into our happy <td class=IntroCol>
            var div1 = getElementsByClass("paneltitle", null, "div");
            var div2 = getElementsByClass("bigsearchbox", null, "div");
            if (div1.length > 0)
            {
                unhookMe(div1[0]);
                tdIntroCol[0].appendChild(div1[0]);
            }
            if (div2.length)
            {
                // change <table class=searchTableB> to align=left
                var table = getElementsByClass("searchTableB", div2[0], "table");
                if (1 == table.length)
                    table[0].align = "left";
                var TDs = table[0].getElementsByTagName('td');
                for (itd = 0; itd < TDs.length; itd++)
                    if (TDs[itd].align && TDs[itd].align != "left")
                        TDs[itd].align = "left";

                unhookMe(div2[0]);
                tdIntroCol[0].appendChild(div2[0]);
            }

            /*
            if (div1.length > 1)
            {
                unhookMe(div1[1]);
                tdIntroCol[0].appendChild(div1[1]);
            }
            */
            var div4 = getElementsByClass("bigsearchbox", null, "div");
            if (div4.length)
            {
                unhookMe(div4[1]);
                tdIntroCol[0].appendChild(div4[0]);
            }
        }

        // insert custom persistent search form
        var strTab = getElementsByClass("structureTable", null, "table");
        if (1 == strTab.length)
        {
            var tabul = strTab[0];
            tabul.parentNode.insertBefore(getCustomSearchForm(), tabul.nextSibling);
        }


        // move login form to left side
        var tdSidebar = document.getElementById("imcontainer10");
        if (tdSidebar && tdSidebar.parentNode)
        {
            var papa = tdSidebar.parentNode;
//GM_log ("papa=" + papa);
            papa.removeChild(tdSidebar);
            papa.appendChild(tdSidebar);
        }

        // TODO - Nuke the elements that contain ads
    }
    else // watchnet.com
    {
        // nuke Watchnet blurb...
        cells = getElementsByClass("GenText", null, "td");
        if (cells.length > 0)
        {
            cells[0].innerHTML = "";//"<font color='red'> DELETED 2!!</font>";
        }

        // insert custom persistent search form
        var divMsgIndex = getElementsByClass("MsgIndex", null, "div");
        if (1 == divMsgIndex.length)
            divMsgIndex[0].parentNode.insertBefore(getCustomSearchForm(), divMsgIndex[0]);
    }

    //=====================
    // Adjust links to open in _top target, except for links with class=mA,
    // which we target to the right frame
    //=====================
    {
        for each (var anchor in document.getElementsByTagName('a'))
        {
            anchor.target = "mA" == anchor.className ? "right"
                                                     : "_top";
        }
    }

    // Forms target to _top too.
    for each (var form in document.getElementsByTagName('form'))
        form.target="_top";

    // change the order of posts...
if (false)    // comment out for now
    reorderList();

    //=====================
    // make the links look all nice and pretty
    //=====================
    var li = getElementsByClass("mli", null, "li");
    var WTB = 0, FSOT = 0, FS = 0, tot = 0;

    for (var i = 0; i < li.length; i++) 
    {
        // look at text child of first <a>
        // WTB?
        var a = li[i].getElementsByTagName('a');
        if (a.length > 0 && a[0].hasChildNodes)
        {
            tot++;
            fixPostIfNew(a[0]);

            // advance to first child node which is #text
            var txtNode = a[0].firstChild;
            for (; null != txtNode; txtNode = txtNode.nextSibling)
            {
                // had to hard-code 3, using Node.TEXT_NODE did not work
                if (3 /*text*/ == txtNode.nodeType)
                    break;
            }
            if (null == txtNode)
            {
                GM_log("No text node following anchor, moving along...");
                continue;
            }
        }
    }

    // finally, add the alternating background color
    for (var i = 0; i < li.length; i++) 
    {
        li[i].setAttribute("style",
                (0 == (i % 2)) ? "background:#EFF2F7;border:1px dashed #a5b2bd; padding:3pt" 
                               : "border:1px dashed #a5b2bd; padding:3pt");
    }

    // Applying search/highlight should be last transformation, as it breaks up
    // #text elements and therefore hinders ability to do text searches.
    PerformSearch();
}

//    alert("3 BOTTOM " + document);

// vim:ts=4:et:sw=4:ai



