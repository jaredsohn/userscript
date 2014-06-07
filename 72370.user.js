// ==UserScript==
// @name Topic Ignorator
// @description Lets you make topics GTFO your endoftheinter.net
// @author cheezit
// @include http://endoftheinter.net/showtopics.php*
// @include http://*.endoftheinter.net/showtopics.php*
// @include https://endoftheinter.net/showtopics.php*
// @include https://*.endoftheinter.net/showtopics.php*
// @include http://endoftheinter.net/links.php*
// @include http://*.endoftheinter.net/links.php*
// @include https://endoftheinter.net/links.php*
// @include https://*.endoftheinter.net/links.php*
// ==/UserScript==

var words=new Array();
//Add things to block below the line, using the following format:
//words.push(block);
//For example, if you wanted to ignore SSBB topics, you would add the following line (without the slashes):
//words.push("SSBB");
//For multiple words, use multiple lines.
//The blocked words are not case sensitive.
//Add them below this line
words.push("l0st");
words.push("lostlinks");
words.push("lost");
words.push("island");
words.push("hatch");
words.push("incident");
words.push("jack");
words.push("kate");
words.push("hurley");
words.push("sawyer");
words.push("juliet");
words.push("ben");
words.push("miles");
words.push("john");
words.push("locke");
words.push("sayid");
words.push("jin");
words.push("sun");
words.push("daniel");
words.push("faraday");
words.push("desmond");
words.push("charlotte");
words.push("ana");
words.push("analucia");
words.push("ana-lucia");
words.push("richard");
words.push("alpert");
words.push("pierre");
words.push("chang");
words.push("aaron");
words.push("widmore");
words.push("penny");
words.push("penelope");
words.push("horace");
words.push("goodspeed");
words.push("eloise");
words.push("hawking");
words.push("christian");
words.push("shephard");
words.push("claire");
words.push("caesar");
words.push("bernard");
words.push("rose");
words.push("jacob");
words.push("walt");
words.push("ethan");
words.push("libby");
words.push("boone");
words.push("shannon");
words.push("eko");
words.push("dead");
words.push("dies");
words.push("charlie");
words.push("oceanic");
words.push("dharma");
words.push("michael");
words.push("linus");
words.push("benjamin");
words.push("aldo");
words.push("truce");
words.push("statue");
words.push("zoe");
words.push("submarine");
words.push("815");
words.push("dharmaville");
words.push("dies");
words.push("la x");
words.push("the end");
words.push("across the sea");
words.push("the candidate");
//Add blocked words above this line ^^

var trs=document.getElementsByTagName("tr");
	
	for (var i=0; i<trs.length; i++)
	{

	var tds=trs[i].getElementsByTagName("td");
	if (tds.length>0)
	{
			
		var as=tds[0].getElementsByTagName("a");
		var n;
		if(as.length == 1)
		{
			n = 0;
		}
		else
		{
			n = 2
		}
		var topic = as[n].innerHTML.toLowerCase();
		for (var j=0; j<words.length; j++)
		{
			if (topic.search(words[j].toLowerCase()) != -1 && topic.search("board list") == -1)
			{
				trs[i].parentNode.removeChild(trs[i]);
				i--;
				break;
			}
		}
	}
}
