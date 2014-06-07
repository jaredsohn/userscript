// ==UserScript==
// @name        Rllmuk Tidy
// @namespace   http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description Attempts to tidy up posts.
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// @include     http://www.rpsoft.co.uk/*
// @include     http://rpsoft.co.uk/*
// @include     http://www.extranoise.co.uk/*
// @include     http://extranoise.co.uk/*
// ==/UserScript==

// Select all post text
var textnodes = document.evaluate(
    "//div[@class='postcolor']//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// If post text was found, attempt to tidy it up
if (textnodes.snapshotLength > 0)
{
    var ciReplacements, csReplacements, nonWordReplacements, regex, key, node, s;

    regex = {};

    // Case insensitive replacements
    ciReplacements =
    {
        // Mis-spellings
        "teh":"the",
        "sentance":"sentence",
        "sequal":"sequel",
        "definately":"definitely",
        "arguements":"arguments",
        "rediculous":"ridiculous",
        "grammer":"grammar",

        // Grammar and punctuation
        "would of":"would have",
        "could of":"could have",
        "should of":"should have",
        "must of":"must have",
        "alot":"a lot",
        "infact":"in fact"
    };
    for (key in ciReplacements)
    {
        regex[key] = new RegExp("\\b" + key + "\\b", "i");
    }

    // Case sensitive replacements
    csReplacements =
    {
        // Grammar and punctuation
        "im":"I'm",
        "i'":"I'",
        "^i\\s":"I ",
        "\\si\\s":" I ",
        "\\si$":" I"
    };
    for (key in csReplacements)
    {
        regex[key] = new RegExp("\\b" + key + "\\b");
    }

    // Non-word replacements
    nonWordReplacements =
    {
        "!(?:[!1]|one)+":"!" // Replaces !!11one style exclamations with a single !
    };
    for (key in nonWordReplacements)
    {
        regex[key] = new RegExp(key, "i");
    }

    for (var i = 0; i < textnodes.snapshotLength; i++)
    {
        node = textnodes.snapshotItem(i);
        s = node.data;
        for (key in ciReplacements)
        {
            s = s.replace(regex[key], ciReplacements[key]);
        }
        for (key in csReplacements)
        {
            s = s.replace(regex[key], csReplacements[key]);
        }
        for (key in nonWordReplacements)
        {
            s = s.replace(regex[key], nonWordReplacements[key]);
        }
        node.data = s;
    }
}