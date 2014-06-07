// ==UserScript==
// @name           Duck4Covers Pyramids APer
// @namespace      Duck4Cover
// @description    Auto-plays the Pyramids game for you on Neoptes.com
// @include        http://www.neopets.com/games/pyramids/*
// @include        http://neopets.com/games/pyramids/*
// ==/UserScript==


var  NP_LIMIT = 5000;

var  BLANK_IMAGE = "http://images.neopets.com/images/blank.gif";
var  EMPTY_IMAGE = "http://images.neopets.com/games/mcards/empty.gif";

function random(from, to)
{
    return Math.floor(Math.random() * (to-from)) + from;
}




var form = document.evaluate("//form[@action='pyramids.phtml']",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (form.snapshotLength > 0)
{
    form = form.snapshotItem(0);



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




var links = document.evaluate("//a[@href]", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; ++i)
{
    collect = links.snapshotItem(i);

    if (collect.href.match('pyramids.phtml.action=collect'))
    {
	GM_log("Game Over - Collect Points");

	window.setTimeout(function(){document.location=collect.href;},
							random(2000,6000));

	return;
    }
}

// ============= Middle of a game? =============

var draw = document.evaluate("//a[@href='pyramids.phtml?action=draw']",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (draw.snapshotLength == 0)
{
  

    var draw = document.evaluate("//img[@src='"+EMPTY_IMAGE+"']",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (draw.snapshotLength == 0)
    {
	GM_log("Draw pile not found?");
	return;
    }
}

draw = draw.snapshotItem(0);


var regex = new RegExp("/(\\d+)_(spade|heart|club|diamond)s\\.gif");

var matches = regex.exec(draw.nextSibling.nextSibling.src);

var face_up = parseInt(matches[1]);


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


function choose(pos)
{
    GM_log("Choose position "+pos);
    window.setTimeout(function(){document.location=loc[pos].href;},
							random(500,4000));
}


if (choices.length == 1)
{
    choose(choices[0]);
    return;
}


if (choices.length == 0)
{
    GM_log("No choices, so draw");
    window.setTimeout(function(){document.location=draw.href;},
							random(1000,6000));
    return;
}


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


    function series_length(trying)
    {
	if (values[trying] == 0)
	{
	    return 0;
	}

	--values[trying];	

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

	++values[trying];	

	return (result+1);
    }

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



	if (choices.length == 1)
	{
	    choose(choices[0]);
	    return;
	}
    }
}


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


if (choices.length == 1)
{
    choose(choices[0]);
    return;
}


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


if (choices.length == 1)
{
    choose(choices[0]);
    return;
}


GM_log("No obvious choice, just pick one.");

pos = choices.pop();
choose(pos);

