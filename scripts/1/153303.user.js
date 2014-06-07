// ==UserScript==
// @name           WF rep turtles
// @description    Turns reputation pips into turtles!
// @namespace      test
// @include        http://wordforge.net/*
// ==/UserScript==
//Being a shameless rip-off of the KoL IWannaColorfamiliar script

var replacements = [

	{
		//The bassoon will represent red rep
		old_rep:    "http://www.wordforge.net/images/reputation/reputation_neg.gif",
		new_rep:    "http://wordforge.net/picture.php?albumid=57&pictureid=1991",
	},

	{
		//Green rep will be played by the flute
		old_rep:    "http://www.wordforge.net/images/reputation/reputation_pos.gif",
		new_rep:    "http://wordforge.net/picture.php?albumid=57&pictureid=1987",
	},

	{
		//The gray, by the clarinet
		old_rep:    "http://www.wordforge.net/images/reputation/reputation_off.gif",
		new_rep:    "http://wordforge.net/picture.php?albumid=57&pictureid=1988",
	},

	{
		//Bright red, by the French horns
		old_rep:    "http://www.wordforge.net/images/reputation/reputation_highneg.gif",
		 new_rep:    "http://wordforge.net/picture.php?albumid=57&pictureid=1989",
	},

	{
		//And the bright green, by the strings
		old_rep:    "http://www.wordforge.net/images/reputation/reputation_highpos.gif",
		new_rep:    "http://wordforge.net/picture.php?albumid=57&pictureid=1990",
	}
]

//Down with quadrilaterals, up with turtles
switch(document.location.pathname)
{
	default:
		replaceRep();
	break;
}

//This does fancy Java-esque stuff. Please don't sneeze on it or we'll never get the arguments straight again
function getElementsByXPath(root, path)
{
	var XPathIterator = document.evaluate(path, root, null, XPathResult.ANY_TYPE, null);
	var ret = new Array();
	var i;
	while (i = XPathIterator.iterateNext())
		ret.push(i);
	return ret;
}

//Replace ALL the rep!!
function replaceRep()
{

	var rows = getElementsByXPath(document, '//img');
	var image;
	for (var i=rows.length-1;i>=0;i--)
	{
		image = rows[i];
		if (!image )
			continue;
		for (var j=replacements.length-1;j>=0;j--)
		{
			if(image.src == replacements[j].old_rep)
			{
				image.src = replacements[j].new_rep;
			}
		}
	}
}