// ==UserScript==
// @name Drug-Free LL 1.0
// @description No more loser druggie topics on LL!
// @author cheezit/Anonymous LLer
// @include http://endoftheinter.net/showtopics.php*
// @include http://*.endoftheinter.net/showtopics.php*
// @include https://endoftheinter.net/showtopics.php*
// @include https://*.endoftheinter.net/showtopics.php*
// ==/UserScript==

var words=new Array();
//Add things to block below the line, using the following format:
//words.push(block);
//For example, if you wanted to ignore SSBB topics, you would add the following line (without the slashes):
//words.push("SSBB");
//For multiple words, use multiple lines.
//Add them below this line
//The blocked words are not case sensitive.
words.push("weed");
words.push("weedlinks");
words.push("salvia");
words.push("hookah");
words.push("bong");
words.push("packing a bowl");
words.push("drug");
words.push("drugs");
words.push("smoking a bowl");
words.push("smoke a bowl");
words.push("stoned");
words.push("hooka");
words.push("blunt");
words.push("baked");
words.push("smoking");
words.push("marijuana");
words.push("shrooms");
words.push("shroomin");
words.push("shrooming");
words.push("shroomin'");
words.push("ganja");
words.push("smoked a bowl");
words.push("smoked 2 bowl");
words.push("smoked 2 bowls");
words.push("heroin");
words.push("stoner");
words.push("high as fuck");
words.push("get high");
words.push("get baked");
words.push("get stoned");
words.push("getting high");
words.push("getting baked");
words.push("getting stoned");
words.push("high as shit");
words.push("pill popper");
words.push("acid");
words.push("cocaine");
words.push("420links");
words.push("wake and bake");
words.push("potsmoker");
words.push("datura");
words.push("LSD");
words.push("batch of bud");
words.push("smoked pot");
words.push("ecstacy");
words.push("ecstasy");
words.push("cannabis");
words.push("hash brownie");
words.push("pot leaves");
words.push("smokin a joint");
words.push("E pills");
words.push("I am high");
words.push("how high should I get");
words.push("I'm high");

///Add blocked words above this line ^^

var trs=document.getElementsByTagName("tr");
	
	for (var i=0; i<trs.length; i++)
	{

	var tds=trs[i].getElementsByTagName("td");
	if (tds.length>0)
	{
		var as=tds[0].getElementsByTagName("a");
		var topic = as[0].innerHTML.toLowerCase();
		for (var j=0; j<words.length; j++)
		{
			if (topic.search(words[j].toLowerCase()) != -1)
			{
				trs[i].parentNode.removeChild(trs[i]);
				i--;
				break;
			}
		}
	}
}
