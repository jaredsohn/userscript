// ==UserScript==
// @name           Printable AOPS stuff v2
// @namespace      http://xbean.gotdns.com/
// @description    A script which reformats the artofproblemsolving.com contests to be easily printable
// @include        http://www.artofproblemsolving.com/Forum/resources.php?c=*&cid=*&year=*
// ==/UserScript==


var i, j = 0;

var newspans = Array(0);
var spans = document.getElementsByTagName("span");
for(i = 0; i < spans.length; i++) // select all the actual problems
{
	x = spans[i];
	if (x.className == "res_gen") // only problem spans will be res_gen
		newspans.push(x);
}

var ths = document.getElementsByTagName("th");
var titlediv = document.createElement("div");
for(i = 0; i < ths.length; i++)
{
	if(ths[i].className == "cathead")
	{
		titlediv.innerHTML = ths[i].innerHTML.replace("b","h2");
		break;
	}
}

var links = document.getElementsByTagName("a");
for(i = 0; i < links.length; i++)
{
	if((links[i].className == "cell_link") && (links[i].innerHTML != "\nS"))
	{
		newspans[j].innerHTML = "<a href=\"" + links[i].href + "\" style=\"text-decoration: none; color: black;\">" + String(j + 1) + ". " + newspans[j].innerHTML + "</a>";
		j++;
	}
}

titlediv.style.textAlign = "center";

var newstyle = document.createElement("style");
newstyle.innerHTML="a img {border-style: none;}";

var newhead = document.createElement("head");
newhead.appendChild(newstyle); // Fix the image border issue

var newbody = document.createElement("body");
newbody.appendChild(titlediv);
for(i = 0; i < newspans.length; i++) // append the problems to the new body
{
	newbody.appendChild(newspans[i]);
	newbody.appendChild(document.createElement("br"));
	newbody.appendChild(document.createElement("br"));
}
document.childNodes[1].replaceChild(newbody, document.body); // replace old body with new
document.childNodes[1].replaceChild(newhead, document.childNodes[1].firstChild); // replace old head with new