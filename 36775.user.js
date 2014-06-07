// ==UserScript==
// @name           Horndog
// @namespace      vw_jason
// @description    Allows the user to choose whether to display official contri comments at voyeurweb.com
// @include        http://*voyeurweb.com/*
// @include        http://*redclouds.com/*
// @version        1.0.9
// ==/UserScript==

var oToggleLink;        // this will be our "toggle link" to push, to make comments appear or disappear
var oCommentedBy;       // reference to the html <TD> element containing commenter's name
var sCommenter;         // string containing the name appearing in oCommentedBy
var oCommentedByInsert; // reference to a place to put the "Comments by:" line if it's not there
var officialcomments = new Array();  // these are the <DT> comment nodes themselves, both contributor and VW, in order
var officialcomments2 = new Array(); // these are the <DD> comment nodes themselves, both contributor and VW, in order
var o_c;                // HTMLCollection version of officialcomments array
var o_c2;               // HTMLCollection version of officialcomments array
var hideThese = new Array();         // array of indices representing the nodes to hide
var bPageIsVideo;       // boolean, result of test to see if the page has just the one comment
var bCommentsAreHidden = false;      // boolean, reference to the hide/show state of the page
var bCommentsByFound = false;        // boolean, true if the contri header block lists the commenter
var dl_list;            // we have to get this collection if it's a video page, to find where to put the comment we hid    

// *** Begin helper functions ***

// Extends the String object with a trim funcion if it's not implemented natively in String.prototype (Javascript 1.8.1 addition)
if (typeof String.prototype.trim !== "function") 
{
    String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g, ""); };
}

// utility function to return the data of obj if it's a text node (replaces textContent property)
function getText(obj) 
{ 
    if (obj.nodeType == 3) return obj.nodeValue;
    var txt = new Array(),i=0;
    // loop over the children of obj and recursively pass them back to this function
    while(obj.childNodes[i]) 
    {
        txt[txt.length] = getText(obj.childNodes[i]);
        i++;
    }
    // return the array as a string
    return txt.join("");
}

// *** End helper functions ***

function hide() 
{
    if (bPageIsVideo)
    {   // we only have to remove one comment
        officialcomments[0].parentNode.removeChild(officialcomments[0]);
        officialcomments2[0].parentNode.removeChild(officialcomments2[0]);
    }
    else
    {
        for (i in hideThese)
        {   // We use a custom element type to leave "bookmarks" in place of removed comments;
            // written to each "bookmark" is an indication of which comment to put back later
            var oBookmark = document.createElement("vw_jason");
            oBookmark.id = hideThese[i] + "_horndog";
            officialcomments[hideThese[i]].parentNode.insertBefore(oBookmark, officialcomments[hideThese[i]]);
            officialcomments[hideThese[i]].parentNode.removeChild(officialcomments[hideThese[i]]);
            officialcomments2[hideThese[i]].parentNode.removeChild(officialcomments2[hideThese[i]]);
        }
    }
    oToggleLink.removeChild(oToggleLink.firstChild);
    oToggleLink.appendChild(document.createTextNode("show"));    
    bCommentsAreHidden = true;
}

function show()
{
    if (bPageIsVideo)
    {   // we only have to replace one comment
        dl_list[0].appendChild(officialcomments[0]);
        dl_list[0].appendChild(officialcomments2[0]);
    }
    else
    {
        var oMarks = document.getElementsByTagName("vw_jason");
        while (oMarks.length>0)
        {   // We retrieve the index written to each bookmark, replace the corresponding comment,
            // and discard the bookmark
            var index = oMarks[0].id.match(/^\d+(?=_horndog)/);
            oMarks[0].parentNode.insertBefore(officialcomments[index], oMarks[0]);
            oMarks[0].parentNode.insertBefore(officialcomments2[index], oMarks[0]);    
            oMarks[0].parentNode.removeChild(oMarks[0]);
        }
    }
    oToggleLink.removeChild(oToggleLink.firstChild);
    oToggleLink.appendChild(document.createTextNode("hide"));
    bCommentsAreHidden = false;
}

function prepare() // searches through comments, discovering the commenter's name 
{                  // and which comment nodes to hide
    for (i=0; i<o_c.length; i++)
    {   // this is necessary because HTMLCollections get updated in real time
        officialcomments[i] = o_c[i];            
        officialcomments2[i] = o_c2[i];
    } 
    if (/video clip/i.test(document.title))
    { // simple case: one comment
        bPageIsVideo = true;
        dl_list = document.getElementsByTagName("dl");
        sCommenter = getText(officialcomments[0]).trim().replace(/:$/, "");
    }
    else
    { // leave only the comments prefaced by "contributor," remembering the non-"contributor" string
        for (x in officialcomments)
        {
            var sPreface = getText(officialcomments[x]);
            if (!(/contributor/i.test(sPreface)))
            {
                hideThese[hideThese.length] = x;
                if (sCommenter === undefined) sCommenter = sPreface.trim().replace(/:$/, "");
            }
        }
    }
    if (   sCommenter === undefined 
        || sCommenter === ""
        || /not? comment/i.test(sCommenter) 
        || /express contri/i.test(getText(officialcomments2[officialcomments.length-1])) )
    {
        sCommenter = "None";
    }
}

function toggle(e) // "click" event handler for the toggle link
{
    e.preventDefault();
    oToggleLink.blur();
    if (bCommentsAreHidden) show();
    else hide();
}

/*
As of 12 Feb 2010, the format for a contri's <title> element is

    <contri title> - (Private Shots|Free Style|etc) #\d{8}-\d{6}:

Previously, the format was

    (Private Shots|Free Style|etc) #\d{8}-\d{6}: <contri title>

The first IF statement below checks the document's <title> element text to see whether 
it's worth executing the script; that is, whether the page is actually a contri. The
statement should allow execution for as many formats as possible.
*/

if (/\s+#\d+(-\d+)+:?($|\s+)/g.test(document.title)) // don't run the script if this isn't a contri page
{
    if (!(/comments/.test(document.URL)))                                                        // don't run
    {                                                                                            // the script
        o_c = document.getElementsByTagName("dt");                                               // if this is
        o_c2 = document.getElementsByTagName("dd");                                              // is a viewer
        if (!(/flag this post as inappropriate|alert +.*(comment|post)/i.test(getText(o_c[0])))) // comment page
        {
            prepare(); // search through all comments
            
            // here is where we find the place to put the toggle link
            var tabledata = document.getElementsByTagName("td");
            for (i=0;i<tabledata.length;i++) 
            {
                if (/^\s*contri\s+.*#/i.test(getText(tabledata[i])) )
                { // we have found the point after which we may need to add the "No Commenter" line, just in case
                    oCommentedByInsert = tabledata[i];
                }

                // if one of the <TD> elements is "Comments by:"
                if (/^\s*comment(s|ed)\s+by:?\s*$/i.test(getText(tabledata[i])) )
                {
                    // COMMENTER FOUND (maybe)
                    bCommentsByFound = true;
                    var next;
                    var bCommenterNotDeclared = false;
                    // get the commenter's name
                    if (tabledata[i].nextSibling) 
                    { // initialize the "next" variable
                        next = tabledata[i].nextSibling;
                    } 
                    else 
                    {
                        bCommenterNotDeclared = true;
                        break;
                    }
                    while (next.nodeType != 1)
                    {   // next sibling isn't html yet
                        if (next.nextSibling) 
                        {
                            next = next.nextSibling;
                        } 
                        else 
                        {
                            bCommenterNotDeclared = true;
                            break;
                        }
                    }
                    if (bCommenterNotDeclared) break;
                    oCommentedBy = next;
                    break;
                }
            }

            if (!bCommentsByFound) 
            {   // if we can't find the "Comments By" line, then insert a table row 
                // after the "Contri #####:" line, which gives us a place for the "toggle link"
                oCommentedByInsert = oCommentedByInsert.parentNode.parentNode.insertRow(oCommentedByInsert.parentNode.rowIndex+1);
                oCommentedByInsert = oCommentedByInsert.insertCell(0);
                oCommentedByInsert.appendChild(document.createTextNode("Comments\u00a0by:")); // \u00a0 is Unicode's &nbsp;
                oCommentedByInsert = oCommentedByInsert.parentNode.insertCell(1);
                oCommentedBy = oCommentedByInsert;
                oCommentedBy.appendChild(document.createTextNode("")); // just so oCommentedBy.firstChild isn't null, 
            }                                                          // since we access a property of it later

            // now we create the "toggle link" and place it where it should go
            oToggleLink = document.createElement("a");
            oToggleLink.appendChild(document.createTextNode("hide"));
            oToggleLink.setAttribute("href", "#");
            oCommentedBy.removeChild(oCommentedBy.firstChild); // just nuke it; we've found the commenter's name in prepare()
            oCommentedBy.appendChild(document.createTextNode(sCommenter));
            oCommentedBy.appendChild(document.createTextNode(" ("));
            oCommentedBy.appendChild(oToggleLink);
            oCommentedBy.appendChild(document.createTextNode(")"));

            oToggleLink.addEventListener("click", toggle, true);

            // now we recall whether the user hid this commenter's comments last time and remember it for next time
            if ((typeof GM_getValue === "function") && 
               !(/not commented|no comments|none/i.test(sCommenter) || sCommenter === undefined || sCommenter === ""))
            {
                var bHiddenLastTime = GM_getValue(sCommenter);
                if (bHiddenLastTime === true || bHiddenLastTime === undefined) 
                {            // if the user hid this commenter's comments before,
                     hide(); // or if the user has never encountered this commenter, 
                }            // then we hide 
                window.addEventListener("unload", function(){GM_setValue(sCommenter, bCommentsAreHidden);}, true);
            }
            else hide(); // when the contri isn't commented, and for someone without Greasemonkey functions, 
        }                // don't bother remembering the hidden/shown state
    }
}
