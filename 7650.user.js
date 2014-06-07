// ==UserScript==
// @name           Neggsweeper Helper
// @namespace      http://userscripts.org/people/22606
// @description    Looks for patterns while playing Neggsweeper
// @include        http://neopets.com/games/neggsweeper/*
// @include        http://www.neopets.com/games/neggsweeper/*
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////
// Version history
//
// V1.0  first release	02-16-2007
//	My little masterpiece.
//
// V1.1  update		03-04-2007
//	This version no longer wastes clicks by marking neggs as
//	'flagged'.  Instead it substitutes the 'unknown' negg image with
//	the 'flagged' image directly on the page.  This is much faster,
//	and also allows the player to follow the logic the script is using.
//
// V1.2  update		03-13-2007
//	Added 'differential analysis' which compares nearby sets of
//	squares to combine information and ferret out less-obvious
//	knowns and unknowns.
//	Added AUTO_PILOT mode (disabled by default).  When this mode is
//	enabled, if the script runs out of ideas, it will calculate the
//	squares least likely to contain a negg, and then choose randomly
//	from among them.
//
// V1.3  update		05-10-2007
//	A tweak to the guessing algorithm:  Neggs are often laid out in
//	diagonal patterns by the pseudo-randomizer.  The guesser should
//	notice these patterns and increment the probability for squares
//	that fall on these diagonals.
//
// V1.4  update		03-25-2008
//	Above tweak is commented out...  the randomizer at Neopets has
//	been improved, so it no longer works.  Neggs are scattered
//	rather randomly, so a plain old guess is as good as any.  Also,
//	Neopets changed the page layout and broke the grid-finder, that
//	is now fixed.
//	Finally, since everyone hacks this script to repeatedly play
//	forever, might as well do it right.  The script now detects how
//	many NP have been won today, and stops playing if we go over the
//	limit.
///////////////////////////////////////////////////////////////////////////

var  AUTO_PILOT = true;

var  NP_LIMIT = 3000;

var  BAD_NEGG = "http://images.neopets.com/games/neggsweeper/flagnegg.gif";

// If we are at end (or start) of game, find the Game Level selector and
// pre-select the hardest (most interesting) setting.

var select = document.evaluate("//form/select[@name='game_level']", document,
		null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (select.snapshotLength > 0)
{
    select = select.snapshotItem(0);
    select.selectedIndex = select.length - 1;	// Choose last item (Hard)

    if (AUTO_PILOT)	// Determine if we will keep playing
    {
	var NP = select.parentNode;

	while (NP)	// Find the NP we've won today.
	{
	    if (NP.nodeName == "B")
	    {
		break;
	    }

	    NP = NP.previousSibling;

	    if (!NP)
	    {
		GM_log("Could not find NP designator.");
		return;
	    }
	}

	if (NP.innerHTML != "You Lose!!!")
	{
	    NP = parseInt(NP.innerHTML);

	    GM_log("We made "+NP+" NP today.");

	    if (NP >= NP_LIMIT)
	    {
		return;
	    }
	}

	window.setTimeout(function(){select.parentNode.submit();}, 1000);
    }

    return;
}

// Otherwise we are trying to do some solving.

// Find the FORM that overlies the grid.

var form = document.evaluate("//form[@name='grid']", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (form.snapshotLength < 1)	// Maybe something went wrong with the page?
{
    var URL = "http://www.neopets.com/games/neggsweeper/neggsweeper.phtml";
    GM_log("Refreshing...?");
    window.setTimeout("window.location.replace('"+URL+"');", 1000);
    return;
}

form = form.snapshotItem(0);

// Find the underlying input controls.

var position;
var flag_negg;

var input = form.firstChild;

while (input)
{
    if (input.nodeName == "INPUT")
    {
	if (input.name == "position")
	{
	    position = input;
	}
	else if (input.name == "flag_negg")
	{
	    flag_negg = input;
	}

	if (flag_negg && position)  break;
    }

    input = input.nextSibling;

    if (!input)
    {
	GM_log("No inputs found");
	return;
    }
}

// Find a DIV with a Paragraph as its first child (we use that paragraph
// for our "Working" text).

var div = form.firstChild;
var paragraph;

while (div)
{
    if (div.nodeName == "DIV" && div.firstChild.nodeName == "P")
    {
	paragraph = div.firstChild;

	if (paragraph.nodeName == "P")
	{
	    break;
	}
    }

    div = div.nextSibling;

    if (!div)
    {
	GM_log("No matching DIV found");
    }
}

// Find the table structure that follows the paragraph.

var table = paragraph.nextSibling;

while (table)
{
    if (table.nodeName == "TABLE")  break;

    table = table.nextSibling;

    if (!table)
    {
	GM_log("No table found");
	return;
    }
}

// Find the underlying tbody structure.

table = table.firstChild;

while (table)
{
    if (table.nodeName == "TBODY")  break;

    table = table.nextSibling;

    if (!table)
    {
	GM_log("No tbody found");
	return;
    }
}

// Find the grid size in the first row's colspan element.

var child = table.childNodes;

var row = table.firstChild;

while (row)
{
    if (row.nodeName == "TR")  break;

    row = row.nextSibling;

    if (!row)
    {
	GM_log("Ran out of rows?");
	return;
    }
}

var size = row.firstChild.colSpan;

if (!size)
{
    GM_log("Grid size not found");
    return;
}

// Find the number of empty squares remaining.

var empty = row.firstChild.firstChild.firstChild.lastChild.firstChild.firstChild.innerHTML;

if (!empty)
{
    GM_log("Empty count not found");
}

// Allocate some arrays for us to track data.

var img     = new Array(size);
var grid    = new Array(size);
var known   = new Array(size);
var unknown = new Array(size);

var i, j;

for (i = 0; i < size; ++i)
{
    img[i]     = new Array(size);
    grid[i]    = new Array(size);
    known[i]   = new Array(size);
    unknown[i] = new Array(size);
}

var count = 0;	// Count how many unknowns we find.

// Follow the rows and columns to build the current grid status.

i = 0;

while (i < size)
{
    while (row = row.nextSibling)
    {
	if (row.nodeName == "TR")  break;
    }

    if (!row)
    {
	GM_log("Ran out of rows?");
	return;
    }

    var col;

    j = 0;

    while (j < size)
    {
	if (j == 0)
	{
	    col = row.firstChild;
	}
	else
	{
	    col = col.nextSibling;
	}

	while (col)
	{
	    if (col.nodeName == "TD")  break;
	    col = col.nextSibling;
	}

	if (!col)
	{
	    GM_log("Ran out of columns?");
	    return;
	}

	var item = col.firstChild;

	if (item)
	{
	    if (item.nodeName == "IMG")
	    {
		var image = item.src;

		if (image.match(/gn.gif/))
		{
		    grid[i][j] = -1;	// Unknown
		    img[i][j] = item;
		    ++count;
		}
		else if (image.match(/flagnegg.gif/))
		{
		    grid[i][j] = -2;	// Known
		}
		else
		{
		    GM_log("Unrecognized image type: " + image);
		    return;
		}
	    }
	    else if (item.nodeName == "FONT")
	    {
		var text = item.firstChild.firstChild.nodeValue;

		grid[i][j] = parseInt(text);
	    }
	    else if (item.nodeName == "#text")
	    {
		grid[i][j] = 0;
	    }
	    else
	    {
		GM_log("Unrecognized column type: " + item.nodeName);
		return;
	    }
	}

	++j;
    }

    ++i;
}

// Now we are ready to do some solving.  Let's declare some useful
// functions for reporting our results.

function clear(row, col)
{
    GM_log("Click on row " + row + ", column " + col);

    if (paragraph)
    {
	paragraph.innerHTML =
	'<FONT color="blue" size="4"><B><BLINK>Working...</BLINK></B></FONT>';
    }

    position.value = col + "-" + row;
    window.setTimeout("document.grid.submit();", 200);
}

function guess(row, col)
{
    GM_log("Guessing at row " + row + ", column " + col);

    if (paragraph)
    {
	paragraph.innerHTML =
	'<FONT color="red" size="4"><B><BLINK>Guessing...</BLINK></B></FONT>';
    }

    position.value = col + "-" + row;
    window.setTimeout("document.grid.submit();", 200);
}

// Now look for patterns.

var more = true;

while (more)
{
    more = false;

// Add up all the known and unknown positions on the grid

    for (i = 0; i < size; ++i)
    {
	var minrow = (i == 0) ? 0 : i-1;
	var maxrow = (i == size-1) ? size-1 : i+1;

	for (j = 0; j < size; ++j)
	{
	    var mincol = (j == 0) ? 0 : j-1;
	    var maxcol = (j == size-1) ? size-1 : j+1;

	    var kn = 0;
	    var unk = 0;

	    for (var ii = minrow; ii <= maxrow; ++ii)
	    {
		for (var jj = mincol; jj <= maxcol; ++jj)
		{
		    if (grid[ii][jj] == -1)
		    {
			++unk;
		    }
		    else if (grid[ii][jj] <= -2)
		    {
			++kn;
		    }
		}
	    }

	    known[i][j] = kn;
	    unknown[i][j] = unk;
	}
    }

// If the number of 'knowns' is equal to the grid count, it means we can
// clear out all the 'unknowns' nearby.

    for (i = 0; i < size; ++i)
    {
	var minrow = (i == 0) ? 0 : i-1;
	var maxrow = (i == size-1) ? size-1 : i+1;

	for (j = 0; j < size; ++j)
	{
	    if (grid[i][j] > 0 &&
		    unknown[i][j] > 0 &&
			grid[i][j] == known[i][j])
	    {
		var mincol = (j == 0) ? 0 : j-1;
		var maxcol = (j == size-1) ? size-1 : j+1;

		for (var ii = minrow; ii <= maxrow; ++ii)
		{
		    for (var jj = mincol; jj <= maxcol; ++jj)
		    {
			if (grid[ii][jj] == -1)
			{
			    clear(ii,jj);
			    return;
			}
		    }
		}
	    }
	}
    }

// Let's see if we can deduce where some 'unknown' positions could be
// marked as 'known', and this would allow us to clear some spaces
// without having to mark the knowns.  Might save us a click or two.

// If we mark some, then we will go back, recalculate the grid, and
// clear the spaces that can be cleared.

    for (i = 0; i < size; ++i)
    {
	var minrow = (i == 0) ? 0 : i-1;
	var maxrow = (i == size-1) ? size-1 : i+1;

	for (j = 0; j < size; ++j)
	{
	    if (grid[i][j] > 0 &&
		unknown[i][j] > 0 &&
		    (grid[i][j] == known[i][j] + unknown[i][j]))
	    {
		var mincol = (j == 0) ? 0 : j-1;
		var maxcol = (j == size-1) ? size-1 : j+1;

		for (var ii = minrow; ii <= maxrow; ++ii)
		{
		    for (var jj = mincol; jj <= maxcol; ++jj)
		    {
			if (grid[ii][jj] == -1)
			{
			    grid[ii][jj] = -3;
			    img[ii][jj].src = BAD_NEGG;
			    --count;
			    more = true;
			}
		    }
		}
	    }
	}
    }

// Following methods are compute-intensive, so skip them unless we've
// run out of ideas.

    if (more)
    {
	continue;
    }

// Perform 'differential analysis' to find subsets of areas with the
// same count as larger sets, allowing inferences to be drawn.

// Define some useful subroutines to help us perform operations on sets.

// Is 'subset' a subset of 'set'?

    function is_subset(set, subset)
    {
	var i, j;
	var found;

	for (i = 0; i < subset.length; ++i)
	{
	    found = false;

	    for (j = 0; j < set.length; ++j)
	    {
		if (subset[i][0] == set[j][0] &&
		    subset[i][1] == set[j][1])
		{
		    found = true;
		    break;
		}
	    }

	    if (!found)
	    {
		return false;
	    }
	}

	return (set.length != subset.length);	// Don't match identical sets.
    }

// Return the intersection of two sets.

    function intersect(a, b)
    {
	var i, j;
	var inter = [];

	for (i = 0; i < a.length; ++i)
	{
	    found = false;

	    for (j = 0; j < b.length; ++j)
	    {
		if (a[i][0] == b[j][0] &&
		    a[i][1] == b[j][1])
		{
		    inter.push([a[i][0], a[i][1]]);
		    break;
		}
	    }
	}

	return inter;
    }



// Return elements of 'set' not in 'subset'

    function excluded(set, subset)
    {
	var i, j;
	var found;

	var diff = [];

	for (i = 0; i < set.length; ++i)
	{
	    found = false;

	    for (j = 0; j < subset.length; ++j)
	    {
		if (set[i][0] == subset[j][0] &&
		    set[i][1] == subset[j][1])
		{
		    found = true;
		    break;
		}
	    }

	    if (!found)
	    {
		diff.push([set[i][0], set[i][1]]);
	    }
	}

	return diff;
    }

// Gather up the sets of unknowns surrounding a grid count.

    var set = new Array(size);

    for (i = 0; i < size; ++i)
    {
	set[i] = new Array(size);
    }

    for (i = 0; i < size; ++i)
    {
	var minrow = (i == 0) ? 0 : i-1;
	var maxrow = (i == size-1) ? size-1 : i+1;

	for (j = 0; j < size; ++j)
	{
	    if (grid[i][j] > 0 && unknown[i][j] > 0)
	    {
		var mincol = (j == 0) ? 0 : j-1;
		var maxcol = (j == size-1) ? size-1 : j+1;

		for (var ii = minrow; ii <= maxrow; ++ii)
		{
		    for (var jj = mincol; jj <= maxcol; ++jj)
		    {
			if (grid[ii][jj] == -1)
			{
			    if (set[i][j])
			    {
				set[i][j].push([ii,jj]);
			    }
			    else
			    {
				set[i][j] = [ [ii,jj] ];
			    }
			}
		    }
		}
	    }
	}
    }

// Now for every set, find nearby sets to compare.

    for (i = 0; i < size; ++i)
    {
	var minrow = (i < 2) ? 0 : i-2;
	var maxrow = (i > size-3) ? size-1 : i+2;

	for (j = 0; j < size; ++j)
	{
	    if (grid[i][j] > 0 && unknown[i][j] > 0)
	    {
		var mincol = (j < 2) ? 0 : j-2;
		var maxcol = (j > size-3) ? size-1 : j+2;

		for (var ii = minrow; ii <= maxrow; ++ii)
		{
		    for (var jj = mincol; jj <= maxcol; ++jj)
		    {
			if (i == ii && j == jj)  // Duh!
			{
			    continue;
			}

// If a larger set encompasses a smaller set with the same count for
// both, that means all squares in the larger set can be cleared. 

			if (grid[ii][jj] > 0 && unknown[ii][jj] > 0 &&
			    is_subset(set[i][j], set[ii][jj]))
			{
			    if ((grid[i][j] - known[i][j]) ==
				(grid[ii][jj] - known[ii][jj]))
			    {
				var diff = excluded(set[i][j], set[ii][jj]);

				if (diff.length > 0)
				{
				    clear(diff[0][0], diff[0][1]);
				    return;
				}
			    }

// Similarly, if the difference between a larger set's count and a
// subset's count is equal to the difference of the two counts, then all
// the larger set's squares can be marked as known.

			    if ((unknown[i][j] - unknown[ii][jj]) ==
				    ((grid[i][j] - known[i][j]) -
				     (grid[ii][jj] - known[ii][jj])))
			    {
				var diff = excluded(set[i][j], set[ii][jj]);

				for (var k = 0; k < diff.length; ++k)
				{
				    var x = diff[k][0];
				    var y = diff[k][1];

				    if (grid[x][y] == -1)
				    {
					grid[x][y] = -3;
					img[x][y].src = BAD_NEGG;
					--count;
					more = true;
				    }
				}
			    }
			}

// Search for sets that intersect each other, where the extra,
// non-intersecting elements happen to equal the difference in grid
// count.  This indicates a known, and can be marked as such.

			if (set[i][j] && set[ii][jj])
			{
			    var inter = intersect(set[i][j], set[ii][jj]);

			    if (inter.length > 0 &&
			        ((grid[i][j] - known[i][j]) -
			         (grid[ii][jj] - known[ii][jj]) ==
				  (set[i][j].length - inter.length)))
			    {
				var diff = excluded(set[i][j], inter);

				for (var k = 0; k < diff.length; ++k)
				{
				    var x = diff[k][0];
				    var y = diff[k][1];

				    if (grid[x][y] == -1)
				    {
					grid[x][y] = -3;
					img[x][y].src = BAD_NEGG;
					--count;
					more = true;
				    }
				}
			    }
			}
		    }
		}
	    }
	}
    }
}

// Since we have run out of ideas, let's come up with some decent
// guesses for the next move.

if (AUTO_PILOT)
{
    var default_prob = (count - empty) / count;

// known[i][j]   == we know what the probability of this square is
// unknown[i][j] == calculated probability

    for (i = 0; i < size; ++i)
    {
	for (j = 0; j < size; ++j)
	{
	    known[i][j] = (grid[i][j] != -1);
	    unknown[i][j] = 0.0;
	}
    }

// Now refine the probability of squares based on the nearby indicators.

    for (i = 0; i < size; ++i)
    {
	var minrow = (i == 0) ? 0 : i-1;
	var maxrow = (i == size-1) ? size-1 : i+1;

	for (j = 0; j < size; ++j)
	{
	    if (grid[i][j] > 0)
	    {
		var mincol = (j == 0) ? 0 : j-1;
		var maxcol = (j == size-1) ? size-1 : j+1;

		var kn = 0;
		var unk = 0;

		for (var ii = minrow; ii <= maxrow; ++ii)
		{
		    for (var jj = mincol; jj <= maxcol; ++jj)
		    {
			if (grid[ii][jj] == -1)
			{
			    ++unk;
			}
			else if (grid[ii][jj] < -1)
			{
			    ++kn;
			}
		    }
		}

		if (unk)
		{
		    var p = (grid[i][j] - kn) / unk;

		    for (var ii = minrow; ii <= maxrow; ++ii)
		    {
			for (var jj = mincol; jj <= maxcol; ++jj)
			{
			    if (grid[ii][jj] == -1)
			    {
				known[ii][jj] = true;

				if (unknown[ii][jj] < p)
				{
				    unknown[ii][jj] = p;
				}
			    }
			}
		    }
		}
	    }
	}
    }

// Now for all squares where we did not set a probability, choose the
// default. 

    for (i = 0; i < size; ++i)
    {
	for (j = 0; j < size; ++j)
	{
	    if (!known[i][j])
	    {
		unknown[i][j] = default_prob;
	    }
	}
    }

// Tweak:  Look for apparent diagonal patterns of neggs, and bump up the
// probability slightly for those empty squares that happen to fall on
// the diagonals.

// Commented out:  This assumption appears to no longer be true.

//  for (var diag = 0; diag < size-1; ++diag)
//  {
//	var length = size - diag;
//	var count1 = 0;
//	var count2 = 0;
//
//	for (i = 0; i < length; ++i)
//	{
//	    if (grid[i][i+diag] <= -2)
//	    {
//		++count1;
//	    }
//
//	    if (diag > 0)
//	    {
//		if (grid[i+diag][i] <= -2)
//		{
//		    ++count2;
//		}
//	    }
//	}
//
//	if (count1 > 0)
//	{
//	    var bump = count1 / length / 100;
//
//	    for (i = 0; i < length; ++i)
//	    {
//		if (grid[i][i+diag] == -1)
//		{
//		    unknown[i][i+diag] += bump;
//		}
//	    }
//	}
//
//	if (count2 > 0)
//	{
//	    var bump = count2 / length / 100;
//
//	    for (i = 0; i < length; ++i)
//	    {
//		if (grid[i+diag][i] == -1)
//		{
//		    unknown[i+diag][i] += bump;
//		}
//	    }
//	}
//  }

// Find the lowest probability, and construct a list of those locations.

    var list = [];
    var lowest = 1.0;

    for (i = 0; i < size; ++i)
    {
	for (j = 0; j < size; ++j)
	{
	    if (grid[i][j] == -1)
	    {
		if (unknown[i][j] == lowest)
		{
		    list.push([i,j]);
		}
		else if (unknown[i][j] < lowest)
		{
		    lowest = unknown[i][j];
		    list = [ [i,j] ];
		}
	    }
	}
    }

// Choose a random square.

    var choose = Math.floor(Math.random() * list.length);

    i = list[choose][0];
    j = list[choose][1];

    guess(i,j);

    return;
}

GM_log("No advice to give.");

return;

