// ==UserScript==
// @name		  Tooltips Without Titles
// @namespace	  http://greasemonkey.sudleyplace.com/
// @description   For anchors or images with no title, copy appropriate text to title, splitting as necessary
//
//				  In all cases, if the text for the title is too long to fit into the
//					tooltip (roughly 70 chars with the default tooltip typeface and size),
//					split the text into multiple sections, displaying successive sections
//					on successive mouseovers.
// @include 	  *
// ==/UserScript==

/* Originally written by Anthony Lieuallen of http://www.arantius.com/, and
	 subsequently taken over by Bob Smith of http://www.sudleyplace.com/
	 who added the anchor href-to-title code, and the code to split the
	 tooltip into separate sections

   This code is licensed for unlimited modification and redistribution
	 as long as this notice is kept intact.

   If possible, please contact me (Bob Smith) regarding new features,
	 bugfixes or changes that I could integrate into the existing code
	 instead of creating a different script.  Thank you

   Changelog:

   Version 1.10
	 * Recode for compatibility with Firefox 1.5 and GM 0.6.4.
	 * Remove requirement that the element not have an existing
	   onmouseover handler.

   Version 1.00
	 * Initial release
 */

(function ()
{
	// Define the name of the attribute which will be added to
	//	 each element for which a title is to be defined.
var mouseOverCount = 'mouseovercount';

	// Define a common Javascript function which can be called by
	//	 all elements subject to this technique
	function TwtAlt (ev)
	{
		TooltipsWithoutTitles (this, this.alt);
	}

	function TwtHref (ev)
	{
		TooltipsWithoutTitles (this, this.href);
	}

	function TooltipsWithoutTitles (el, elText)
	{
		/* Tooltips are truncated after a certain length, so this
			 function displays the tooltip in multiple sections,
			 one section at a time.
		   The point at which a tooltip is truncated is determined
			 based upon (essentially) pixel count (a value we can't
			 calculate), so we use character count as a rough measure
			 to determine when to break the text into multiple sections.
		   Note that in order to provide more context, the last section
			 is displayed as the last lenSect characters of the title.
		 */
		/* There are many choices to use for symbols
			 to indicate left and right truncation.

			 Here are but a few of the possibilities
			 (xNN is hex code and uNNNN is Unicode):

		   xAB	 = left angle quote
		   xBB	 = right ...
		   u2190 = left single arrow
		   u2192 = right ...
		   u21D0 = left double arrow
		   u21D2 = right ...
		   u2026 = ellipses (for both left and right)
		 */
	var symLeft  = '\u21D0';    // Symbol to indicate left truncation
	var symRight = '\u21D2';    // ...                right ...

	var lenSect  = 69;			// Length of a section

		// Calculate # sections.
	var numSects = Math.ceil (elText.length / lenSect);

		// Check for zero length text
		if (numSects == 0)
			el.title = '';
		else
		{
			// Get current value of the mouseOverCount attribute.
		var tCount = parseInt (el.getAttribute (mouseOverCount));

			// Increment it and store back.
			el.setAttribute (mouseOverCount, (tCount + 1).toString ());

			// Calculate this section #.
			tCount = tCount % numSects;

			// Calculate section offset.
		var offSect = tCount * lenSect;

			// Specify the title with left and/or right
			//	 truncation symbols as appropiate.
			el.title = ((tCount != 0) ? symLeft : '') +
					   ((tCount != (numSects - 1))
						// First or middle section
						? elText.slice (offSect, offSect + lenSect) + symRight
						// Last section
						: elText.slice (-lenSect));
		} // End IF/ELSE
	} // End TooltipsWithoutTitles ()

var res = document.evaluate ("//area[@alt and not (@title)]"
						   + "|//img[@alt and not (@title)]"
						   + "|//a[@href and not (@title)]", 
							  document,
							  null,
							  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
							  null); 
var i, el;

	for (i = 0; el = res.snapshotItem (i); i++)
	{
	var elFunc;

		switch (el.nodeName.toUpperCase ())
		{
			case 'A':
				elFunc = TwtHref;

				break;

////////////case 'AREA':
////////////case 'IMG':
			default:
				elFunc = TwtAlt;

				break;
		} // End SWITCH

		// Define a new Attribute (called 'mouseovercount') used to save
		//	 the # times the user moused over the image/link.
		el.setAttributeNode (document.createAttribute (mouseOverCount));
		el.setAttribute (mouseOverCount, '0');

		// Do the actual work inside the Javascript function defined above.
		el.addEventListener ('mouseover', elFunc, true);
	} // End FOR
}) ();