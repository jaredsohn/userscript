// ==UserScript==
// @name           Dommel
// @namespace      http://userscripts.org/scripts/show/71139
// @description    A few improvements to Dommel customer website
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include        https://crm.schedom-europe.net/*
// ==/UserScript==

// Syntactic sugar declaration
function do_doc(url, func) { wget(url, func, false, false); }

// Disable context menu blocking and annoying alert.
var doc = document.wrappedJSObject || document;
doc.oncontextmenu   = null;
doc.onmousedown     = null;
doc.onmouseup       = null;

var i;
var anchor;
var anchors;

// Go directly to the packages page
if(document.referrer == "https://crm.schedom-europe.net/")
{
    anchors = document.getElementsByTagName("a");
    var packagelink;
    for(i = 0; i < anchors.length; i++)
    {
        anchor = anchors[i];

        if(anchor.innerHTML.indexOf("my packages") >= 0)
        {
            packagelink=anchor.href;
            break;
        }
    }

    document.location.href = packagelink;
}

// Get link of dsl info manager page.
var linkDslinfo;
var onclickTokens;

anchors = document.getElementsByTagName("a");
for(i = 0; i < anchors.length; i++)
{
    if(anchors[i].getAttribute('onclick') != null && anchors[i].getAttribute('onclick').indexOf("dslinfo") >= 0)
    {
        onclickTokens = anchors[i].getAttribute('onclick').split("'");
        linkDslinfo = onclickTokens[1];
        break;
    }
}

// Retrieves the relevant data (in a table) in the dsl info page
var tableContent;
function findTable(n, getTableContent)
{
    // Check if n is an Element
    if(n.nodeType == 1 /*Node.ELEMENT_NODE*/)
    {
        // Check if the element is a B-node.
        if(n.localName == "b" && n.textContent.toLowerCase().indexOf("dsl traffic counter") >= 0)
        {
            return 1;
        }

        if(getTableContent && n.localName == "table")
        {
            tableContent = n.innerHTML;
            return 2;
        }
    }

    // Now get all children of n
    var children = n.childNodes;
    var result;
    // Loop through the children
    for(var i=0; i < children.length; i++)
    {
        // If we find the b-node, the table we want is near...
        result = findTable(children[i], getTableContent);
        if(result == 1)
        {
            getTableContent = true;
        }
        else if(result == 2)
        {
            return 2;
        }
    }

    return 0;
}

function insert_info()
{
    var trList = document.evaluate('//tr[@height="240"]', document, null, XPathResult.ANY_TYPE, null);
    var trElt = trList.iterateNext();

    // Set smaller height
    trElt.setAttribute('height', 50);

    // Get child table for properties
    var menuTable = trElt.childNodes[0].childNodes[1];

    // Insert empty row for layout.
    var newRow = trElt.parentNode.insertRow(2);
    var newCell = newRow.insertCell(0);
    var newText = document.createTextNode('\u00A0');
    newCell.appendChild(newText);

    // Insert new row for info table
    newRow = trElt.parentNode.insertRow(3);
    newCell = newRow.insertCell(0);
    var infoTable = document.createElement('table');

    // Correct URL to graph image.
    var index1 = linkDslinfo.indexOf("dslinfo.php");
    var rootDslinfo = linkDslinfo.substring(0, index1);
    tableContent = tableContent.replace("graph.php", rootDslinfo + "graph.php");
    tableContent = tableContent.replace(/&amp;/g, "&");


    infoTable.id="InfoTable";
    infoTable.innerHTML = tableContent;
    infoTable.width = menuTable.width;
    infoTable.cellSpacing = 1;
    infoTable.cellPadding = 1;
    infoTable.setAttribute('border', 0);
    infoTable.align = 'center';
    infoTable.bgColor = '#cccccc';
    infoTable.border = "1 solid #555555";

    newCell.appendChild(infoTable);

    return;
}

// Extract data from dsl info manager page and insert in page.
if (linkDslinfo != null)
{
    do_doc(linkDslinfo, // The popup page with info
           function(doc)
           {
               findTable(doc, false);
           });

    window.setTimeout(insert_info, 1500);
}