// ==UserScript==
// @name           I wanna custom avatar
// @namespace      Page Changer
// @include        http://www*.kingdomofloathing.com/charsheet.php
// @include        http://www*.kingdomofloathing.com/showplayer.php?who=514208
// @include        http://127.0.0.1:*/showplayer.php?who=514208
// ==/UserScript==
// Modified version of IWannaDifferentFamilliar
// Based loosely on OneTonTomato's "IWannaBitten" script:
// http://kol.upup.us/scripts/#IWannaBitten




var replacements = [
	

	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/sealclubber.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/accordionthief.gif",	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/accordionthief_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },  
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/armorcostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/armorcostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/blackoutfit.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/blackoutfit_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/bountyoutfit.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/bountyoutfit_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/bowcostume.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },              //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/bowcostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/braincostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/braincostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/bugbearcostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/bugbearcostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },  //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/clockworkcostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },  //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/clockworkcostume_f",	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },//
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/clowncostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/clowncostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/coldcostume.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/coldcostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/discobandit.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/discobandit_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/fratboycostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/fratboycostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },  //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/furrycostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/grasstume.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },                //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/grasstume_f.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },              //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/haremcostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/haremcostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/hippycostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/hippycostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/lumbercostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/minercostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/minercostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/ninjacostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/palmoutfit.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },              //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/palmoutfit_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/pastamancer.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/pastamancer_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/piratecostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/piratecostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },    //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/pixelcostume.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/pixelcostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/sauceror.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },                  //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/sauceror.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },                  //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/sauceror_f.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },              //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/sealclubber.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/sealclubber_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/timecostume.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/timecostume_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },          //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/turtletamer.gif", 		fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },            //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/turtletamer_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/warfratoutfit.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },        //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/warfratoutfit_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },    //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/warhippyoutfit.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },      //
	{		fam_img_from:   "http://images.kingdomofloathing.com/otherimages/warhippyoutfit_f.gif", 	fam_img_to:     "http://i7.photobucket.com/albums/y291/pazsox/KOL/idle-rage.gif", },  //






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
