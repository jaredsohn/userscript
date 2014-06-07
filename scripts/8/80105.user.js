// ==UserScript==

// @name Topic Ignorator
// @description Removes topics from the topic list based on userID
// @author cheezit & bluekirby
// @include *endoftheinter.net*

// ==/UserScript==



var ids=new Array();
//Add the userIDs of people you want to block below the line, using the following format:
//ids.push(####);
//For example, if you wanted to ignore prcu topics, you would add the following line (without the slashes):
//ids.push("144");
//For multiple ids, use multiple lines.
//Add them below this line

ids.push("144");

///Add blocked userIDs above this line ^^

var trs=document.getElementsByTagName("tr");

for (var i=0; i<trs.length; i++)
{

var tds=trs[i].getElementsByTagName("td");
if (tds.length>0)
{
var as=tds[0].getElementsByTagName("a");
var user = as[0].parentNode.parentNode.childNodes[1].innerHTML;
for (var j=0; j<ids.length; j++)
{
if (user.search("user="+ids[j]+"\"".toLowerCase()) != -1)
{
trs[i].parentNode.removeChild(trs[i]);
i--;
break;
}
}
}
}