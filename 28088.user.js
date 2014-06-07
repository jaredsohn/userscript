// ==UserScript==
// @name           SDB Duplicate Withdrawal
// @namespace      http://userscripts.org/people/22606/deposit.html
// @description    Removes duplicate items from SDB
// @include        http://www.neopets.com/safetydeposit.phtml*
// ==/UserScript==

// Here is a list of items that you want to keep in your SDB no matter
// how many you have.  Maybe you are a collector?  These are mine...
// Yes, I like sand, and toys, and Petpets..  Shut up!
//
// You must use the EXACT name of the item with same capitalization!

var skip = new Array("Bottle of Red Sand",
		     "Bottle of Green Sand",
		     "Bottle of Blue Sand",
		     "Bottle of Black Sand",
		     "Bottle Of Orange Sand",
		     "Glowing Sand",
		     "Invisible Sand",
		     "Two Dubloon Coin",
		     "Ten Dubloon Coin",
		     "Cobrall Dagger",
		     "Alkenore",
		     "Yullie",
		     "Soreen",
		     "Crocalu",
		     "Antwerph",
		     "Juma",
		     "Sandan",
		     "Dandan",
		     "Biyako",
		     "Tencals",
		     "Quintilc",
		     "Garfir",
		     "Mibblie",
		     "Cyodrakes Gaze Snowglobe",
		     "Screaming Sophie Toy",
		     "Wind Up Faellie",
		     "Lilian Fairweather Action Figure",
		     "Kougra Defender Action Figure",
		     "Snot Holiday Tree",
		     "Hot Fly Cocoa",
		     "Borovan Badge",
		     "Christmas Parade Poster",
		     "Grarrl Nutcracker",
		     "Altador Cup");

// Get a list of all tables (we have to search the hard way to find the
// one we want.

var table_list = document.evaluate("//table/tbody/tr/td/b", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (table_list.snapshotLength < 1)
{
    GM_log("No tables found??");
    return;
}

var i, table, url;

for (i = 0; i < table_list.snapshotLength; ++i)
{
    var b = table_list.snapshotItem(i);

    if (b.textContent == "Items:")
    {
	table = b.parentNode.parentNode.parentNode.parentNode;

	if (table.previousSibling.previousSibling.previousSibling
		 .previousSibling.previousSibling.nodeName == "HR")
	{
	    var a = b.parentNode.nextSibling.nextSibling.firstChild;

	    if (a && a.nodeName == "A")
	    {
		url = a.href;
	    }

	    break;
	}
    }
}

if (table == null)
{
    GM_log("No matching table was found.");
    return;
}

// Okay, now find the table which holds all the items, and locate the
// first row.

table = table.nextSibling.nextSibling.firstChild
	     .nextSibling.nextSibling.nextSibling.nextSibling;

GM_log(table.nodeName);

var tr = table.firstChild.nextSibling.firstChild.nextSibling.nextSibling
	      .nextSibling.nextSibling.nextSibling.nextSibling;

// Go through each row and figure out what the object name is, and how
// many we have.

var changed = false;

while (tr)
{
    var td = tr.firstChild.nextSibling.nextSibling.nextSibling;

    var name = td.firstChild.firstChild.data;

// Go through the list of skipped items to see if we should skip this one.

    var found = false;

    for (i = 0; i < skip.length; ++i)
    {
	if (skip[i] == name)
	{
	    found = true;
	    break;
	}
    }

    if (!found)
    {
	td = td.nextSibling.nextSibling.nextSibling
	       .nextSibling.nextSibling.nextSibling;

	var count = td.firstChild.firstChild.data;

	if (count > 1)
	{
	    td = td.nextSibling.nextSibling;

	    var input = td.firstChild.nextSibling;

	    input.value = count - 1;

	    changed = true;
	}
    }

    tr = tr.nextSibling.nextSibling;

    if (tr.firstChild.nextSibling.firstChild.nodeName != "IMG")
    {
	break;
    }
}

// If we changed something, submit the changes.

if (changed)
{
    var td = tr.firstChild.nextSibling;

    var input = td.firstChild.nextSibling;

    input.form.submit();

    return;
}

// Otherwise go to the next SDB page.

if (url)
{
    document.location = url;
}
