// ==UserScript==
// @name			Smilie text2img
// @author			Sebo
// @namespace		http://userscripts.org/users/61293/scripts
// @description		This script replaces all textual smilies like ":)" into smiley images in predefinded sections of svz.
// @include			http://www.studivz.net/*

// ==/UserScript==


addEventListener("load", addSmileys, false);

function addSmileys(){

	var divTag = document.getElementsByTagName("div");
	var tmpDiv = Array(divTag.length);
	var tmpDivIndex = Array(divTag.length);
	var su = Array(39);
	var st = Array(39);
	var k = 0;

	

	su[0]="mVZ_Emoticon_15.gif";
	for(i=1; i<=38; i++)
	{
		su[i]="sVZ_Emoticon_"+i+".gif ";
	}


	st[0] = Array("(meinvz)","(meinVz)");
	st[1] = Array(":-)", ":)");
	st[2] = Array(":-D", ":D", "xD", "=D", ":d", ":-d");
	st[3] = Array(";-)", ";)");
	st[4] = Array(":-(", ":(");
	st[5] = Array(":-P", ":-p", ":p", ":P");
	st[6] = Array(":'(", ":'-(", ":,(");
	st[7] = Array("(blush)",":-*)");
	st[8] = Array("(inlove)");
	st[9] = Array(":-O", ":-o", ":O", ":o");
	st[10] = Array(":-s", ":s", ":-S", ":-s");
	st[11] = Array("(S)", "(s)", "(sleep)");
	st[12] = Array(":-X");
	st[13] = Array(":@", ":-@");
	st[14] = Array(":?", ":-?");
	st[15] = Array("(studiVz)","(studivz)");
	st[16] = Array("(skull)");
	st[17] = Array(":-/");
	st[18] = Array(":*",":-*");
	st[19] = Array("(!)");
	st[20] = Array("(?)");
	st[21] = Array("(sun)");
	st[22] = Array("(rain)");
	st[23] = Array(":-|", ":|");
	st[24] = Array("]:-)", ">:-)", ">:)", "}:->", "(6)","(devil)");
	st[25] = Array("0:-)", "0:)","(angel)");
	st[26] = Array("(H)", "(h)");
	st[27] = Array("(BH)", "(bh)", "Bh");
	st[28] = Array("(hot)");
	st[29] = Array("(hug)");
	st[30] = Array("(g)", "(G)");
	st[31] = Array("(peace)","(p)");
	st[32] = Array("(berlin)","(b)");
	st[33] = Array("(cake)");
	st[34] = Array("B)", "B-)", "8)", "8-)");
	st[35] = Array("(coffee)");
	st[36] = Array("<:o)", "<:O)","(party)");
	st[37] = Array("(xmas)");
	st[38] = Array("(y)", "(Y)");

	for (var i=0; i<divTag.length; i++)
	{
		tmpDiv[i] = "";
		tmpDivIndex[i] = -1;
		//works on "Gruppenforum" and "Pinnwand"
		if((divTag[i].className == "threadContent") || (divTag[i].className == "pinboard_Content wordwrap") || (divTag[i].className == "pinboard_Content"))
		{
			tmpDivIndex[k] = i;
			tmpDiv[k] = divTag[i].innerHTML;
			for(var j=0; j<=38; j++){
				for(var l=0; l<st[j].length;l++)
				{
					tmpDiv[k] = tmpDiv[k].split(st[j][l]).join("<img src=\"http://static.pe.studivz.net/Img/Smiley/" + su[j] + "\" style=\"border:0; width:18px\">");
				}
			}
			k++;
		}
	}
	for (var i=0; tmpDivIndex[i] != -1 ; i++)
	{
		divTag[tmpDivIndex[i]].innerHTML = tmpDiv[i];
	}

}