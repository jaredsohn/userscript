//Written By WickedFish
// ==UserScript==
// @name           Ultimate lyrics
// @namespace      Ultimate lyrics
// @description    link to lyrics
// @include        http://www.ultimate-guitar.com/search.php*
// ==/UserScript==


var banlist = new Array("ver","intro","solo","(",")");//unwanted words                  


var style = "'font-size:x-small;color:red;font-variant:small-caps;text-decoration:none;'"  




var list = document.getElementsByTagName("table")[11].childNodes[1];  
var i=2;//counter
var url, link, split;  
for(i=2; i<list.childNodes.length-7; i+=2)
{
	var q=1;//counter
	
	if (list.childNodes[i].childNodes[1].childNodes[1])
	{
		

bandname=list.childNodes[i].childNodes[1].childNodes[1].innerHTML;}

	songname=list.childNodes[i].childNodes[3].childNodes[0].innerHTML;
	
	split = songname.split(" ");
	songname=split[0];
	for (q=1; q<split.length; q++)
	{
		if(!checkBan(split[q]))
		{
			songname+=" "+split[q];
		}
	}		
	

	url = 

"'http://www.google.com/search?q=lyrics+"+songname+"+"+bandname+"'";
	link ="<a style="+style+"href="+url+">lyrics</a>";
	
	list.childNodes[i].childNodes[3].innerHTML+="->"+link;
}


function checkBan (word)
{
	var x=0;
	word = word.toLowerCase();
	for (x=0; x<banlist.length; x++)
	{
		if (word==" "){return true};
		if(!(word.indexOf(banlist[x])==-1))
		{
			return true;
		}
			
	}
	return false;
}