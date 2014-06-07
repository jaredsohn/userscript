// ==UserScript==
// @name           Pyramids Player
// @namespace      http://userscripts.org/people/22606/pyramids.html
// @description    Auto-plays the Pyramids game
// @include        http://www.neopets.com/games/pyramids/*
// @include        http://neopets.com/games/pyramids/*
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////
// Version history
//
// V1.0  first release	09-19-2008
//	Seems to work!
// V1.1  update		09-20-2008
//	Got rid of the match[] array, kind of a waste of time to
//	construct it.
// V1.2  update		01-31-2009
//	By popular demand, add a random delay factor which makes the
//	actions more closely resemble a human player
// V1.3  update		02-16-2014
//	Neopets inserted a Referer check which broke the code.
//	I've found another way to follow links without losing the
//Referer header.
//
///////////////////////////////////////////////////////////////////////////

var  NP_LIMIT = 5000;

var  BLANK_IMAGE = "http://images.neopets.com/images/blank.gif";
var  EMPTY_IMAGE = "http://images.neopets.com/games/mcards/empty.gif";

// Define a function to return a random delay to simulate human interaction.

function random(from, to)
{
    return Math.floor(Math.random() * (to-from)) + from;
}

// Figure out what phase of the game we're in.

// ============= Before a game? =============

var form = document.evaluate("//form[@action='pyramids.phtml']",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (form.snapshotLength > 0)
{
    form = form.snapshotItem(0);

// Try to find how much we won, in a language-independent manner.

    var np = form.parentNode.previousSibling.previousSibling
		.previousSibling.previousSibling.firstChild
		.nextSibling.nextSibling.nextSibling.nextSibling
		.nextSibling.nextSibling.innerHTML;

    GM_log("We won "+np+" NP today.");

    if (np < NP_LIMIT)
    {
	window.setTimeout(function(){form.submit();}, random(2000,6000));
    }

    return;
}

// ============= End of the game? =============

// The collection link is now random, so we have to search for it.

var links = document.evaluate("//a[@href]", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; ++i)
{
    collect = links.snapshotItem(i);

    if (collect.href.match('pyramids.phtml.action=collect'))
    {
	GM_log("Game Over - Collect Points");

	window.setTimeout(function(){collect.click();}, random(2000,6000));

	return;
    }
}

// ============= Middle of a game? =============

var draw = document.evaluate("//a[@href='pyramids.phtml?action=draw']",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (draw.snapshotLength == 0)
{
    // This can happen if we have run out of cards, but there are still
    // legal moves to be made.  Find the empty draw pile instead.

    var draw = document.evaluate("//img[@src='"+EMPTY_IMAGE+"']",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (draw.snapshotLength == 0)
    {
	GM_log("Draw pile not found?");
	return;
    }
}

draw = draw.snapshotItem(0);

// Find the draw-pile value.

var regex = new RegExp("/(\\d+)_(spade|heart|club|diamond)s\\.gif");

var matches = regex.exec(draw.nextSibling.nextSibling.src);

var face_up = parseInt(matches[1]);

// Find the table of cards in the pyramid, and look for exposed cards.

var card = new Array(28);
var loc  = new Array(28);

var pos = 0;

var row = draw.parentNode.parentNode.nextSibling.nextSibling
		.firstChild.nextSibling
		.firstChild.firstChild.firstChild.firstChild;

while (row)
{
    var col = row.firstChild.nextSibling.firstChild;

    while (col)
    {
	if (col.nodeName == "IMG")
	{
	    if (col.src == BLANK_IMAGE)
	    {
		card[pos] = 0;		// Missing card
	    }
	    else
	    {
		card[pos] = -1;		// Face-down card
	    }
	}
	else				// Face-up card
	{
	    var img = col.firstChild;

	    matches = regex.exec(img.src);

	    card[pos] = parseInt(matches[1]);
	    loc[pos] = col;
	}

	++pos;

	col = col.nextSibling.nextSibling;
    }

    row = row.nextSibling.nextSibling;
}

// Now decide which moves are possible.

var left = 14;
var right = 2;

if (face_up > 2)
{
    left = face_up-1;
}

if (face_up < 14)
{
    right = face_up+1;
}

var choices = new Array;

for (pos = 0; pos < 28; ++pos)
{
    if ((card[pos] == left) || (card[pos] == right))
    {
	choices.push(pos);
    }
}

// A function that chooses a card.

function choose(pos)
{
    GM_log("Choose position "+pos);
    window.setTimeout(function(){loc[pos].click();},
							random(500,4000));
}

// If there is only one choice, make it.

if (choices.length == 1)
{
    choose(choices[0]);
    return;
}

// If there are no choices, then draw a card.

if (choices.length == 0)
{
    GM_log("No choices, so draw");
    window.setTimeout(function(){draw.click();}, random(1000,6000));
    return;
}

// More than one choice?  Now we have to do some thinking.  Hmmmmm...

// Are all the choices the same value?  If so, it doesn't matter which
// one we pick, but if they are different...

var same = true;
var first = card[choices[0]];

for (var i = 1; i < choices.length; ++i)
{
    if (card[choices[i]] != first)
    {
	same = false;
	break;
    }
}

// If the cards are different, we should look for "series" of cards that
// can be chosen in a row.  We should always select the card that leads
// to the longer series.
//
// For instance, if we have a 4, and cards available are A, 2, 3, 5, 6,
// we should choose the 3, because it will remove three cards, whereas
// with the 5, only two would be removed.

// Make a list of the set of cards and then play what-if with each card,
// recursively.

if (! same)
{
    var values = new Array(15);

    for (pos = 0; pos < 15; ++pos)
    {
	values[pos] = 0;
    }

    for (pos = 0; pos < 28; ++pos)
    {
	if (card[pos] > 0)
	{
	    ++values[card[pos]];
	}
    }

// Make a recursive function that figures out the longest series that
// can be found from this point.

    function series_length(trying)
    {
	if (values[trying] == 0)
	{
	    return 0;
	}

	--values[trying];	// Remove this card;

	var left = 14;
	var right = 2;

	if (trying > 2)
	{
	    left = trying-1;
	}

	if (trying < 14)
	{
	    right = trying+1;
	}

	var left_result  = series_length(left);
	var right_result = series_length(right);

	var result = left_result;

	if (right_result > left_result)
	{
	    result = right_result;
	}

	++values[trying];	// Put the card back;

	return (result+1);
    }

// Now figure out which series is longer.

    left = 14;
    right = 2;

    if (face_up > 2)
    {
	left = face_up-1;
    }

    if (face_up < 14)
    {
	right = face_up+1;
    }

    var len_left  = series_length(left);
    var len_right = series_length(right);

    GM_log("\nIf we choose the "+left+", sequence is "+len_left+
	   "\nIf we choose the "+right+", sequence is "+len_right);

// Remove the choices from the list, that we've decided not to do.  If
// they are equal, then remove neither choice, and we'll use different
// criteria.

    if (len_left == len_right)
    {
	GM_log("No obvious choice there.");
    }
    else
    {
	var remove;

	if (len_left < len_right)
	{
	    GM_log("We should choose the "+right);
	    remove = left;
	}
	else
	{
	    GM_log("We should choose the "+left);
	    remove = right;
	}

	var new_choices = new Array;

	for (var i = 0; i < choices.length; ++i)
	{
	    if (card[choices[i]] != remove)
	    {
		new_choices.push(choices[i]);
	    }
	}

	choices = new_choices;

// If there is only one choice left, make it.

	if (choices.length == 1)
	{
	    choose(choices[0]);
	    return;
	}
    }
}

// Still out of ideas...  Try to pick a card which will open up the most
// cards above it.

// Go through each possible choice and determine how many cards would be
// freed.  Make a new list that contains only the max cards freed up.

var most = 0;

var new_choices = new Array;

for (var i = 0; i < choices.length; ++i)
{
    pos = choices[i];

    var freeup = 0;

    if ((pos != 0)  && (pos != 1)  && (pos != 3)  && (pos != 6) &&
	(pos != 10) && (pos != 15) && (pos != 21))
    {
	if (card[pos-1] == 0)
	{
	    ++freeup;
	}
    }

    if ((pos != 0)  && (pos != 2)  && (pos != 5)  && (pos != 9) &&
	(pos != 14) && (pos != 20) && (pos != 27))
    {
	if (card[pos+1] == 0)
	{
	    ++freeup;
	}
    }

    if (freeup > most)
    {
	most = freeup;

	new_choices = new Array;
    }

    if (freeup == most)
    {
	new_choices.push(pos);
    }
}

choices = new_choices;

// If there is only one choice left, make it.

if (choices.length == 1)
{
    choose(choices[0]);
    return;
}

// We are still out of ideas?  Everything seems to be about the same? 
// Well, how about choosing cards which have more cards above them, so
// that potentially we can free up more cards later?  I dunno!

var most = 0;

var new_choices = new Array;

for (var i = 0; i < choices.length; ++i)
{
    pos = choices[i];

    var above = 0;

    if ((pos != 0)  && (pos != 1)  && (pos != 3)  && (pos != 6) &&
	(pos != 10) && (pos != 15) && (pos != 21))
    {
	++above;
    }

    if ((pos != 0)  && (pos != 2)  && (pos != 5)  && (pos != 9) &&
	(pos != 14) && (pos != 20) && (pos != 27))
    {
	++above;
    }

    if (above > most)
    {
	most = above;

	new_choices = new Array;
    }

    if (above == most)
    {
	new_choices.push(pos);
    }
}

choices = new_choices;

// If there is only one choice left, make it.

if (choices.length == 1)
{
    choose(choices[0]);
    return;
}

// Fine, I didn't think that would work anyway.  No idea what to do? 
// Just pick the lowest card, which is the last entry on the list.

GM_log("No obvious choice, just pick one.");

pos = choices.pop();
choose(pos);

