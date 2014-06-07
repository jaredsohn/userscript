// ==UserScript==
// @name           remove_extreme_ticker
// @namespace      Page Changer
// @include        http://www*.kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1:*/charpane.php*
// @include        http://localhost:*/charpane.php*
// ==/UserScript==
// Modified version of IWannaDifferentFamilliar
// Based loosely on OneTonTomato's "IWannaBitten" script:
// http://kol.upup.us/scripts/#IWannaBitten




var replacements = [
	

	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/extmeter1.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/level1_zpse35b9a0f.png", },
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/extmeter2.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/level2_zps003f9dca.png", },
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/extmeter3.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/level3_zps7abb595f.png", },






]

//fight!?
switch(document.location.pathname)
{
	default:
		replaceCombatPicture();
	break;
}

// I don't like iterators... don't ask me why...
function getElementsByXPath(root, path)
{
	var XPathIterator = document.evaluate(path, root, null, XPathResult.ANY_TYPE, null);
	var ret = new Array();
	var i;
	while (i = XPathIterator.iterateNext())
		ret.push(i);
	return ret;
}


function replaceCombatPicture()
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
			if(image.src == replacements[j].fam_img_from)
			{
				image.src = replacements[j].fam_img_to;
			}
		}
	}
}