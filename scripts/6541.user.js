// ==UserScript==
// @name          AntiTroll for SadlyNo
// @namespace     http://hedonistlab.com/download/
// @description   Stop the trolls - written by ImJohnGalt
// @include		  http://www.sadlyno.com/*
// @include		  http://sadlyno.com/*
// ==/UserScript==

var p	= document.getElementsByTagName('p');

// set the trolls you want deleted here, separated by a comma.  Note that case does matter.
// This could be fixed later where I do my match
// NB: If you make the troll name too short, it could give false positives (i.e. 'Shoelimpy'
// will mean that a poster called 'Shoelimpy is a dick' will also be erased.

GM_setValue('trolls', 'missannieangel.blogspot.com,Shoelimpy');

var trolllist = GM_getValue('trolls').split(",");

for (var i=0; i < p.length; ++i) {
    if (p[i].className == 'commentauthor')
    {
		for(var k=0; k < trolllist.length; ++k)
		{
			if (p[i].innerHTML.match(trolllist[k]))  // this is a trolly post
			{
				// find the first <p> tag of the comment
				var nextSib = p[i].nextSibling;
				var pctr = 0;
				while (nextSib || pctr < 2 )
				{
					if (nextSib.nodeName == 'P')
					{
						if (pctr == 1) // this is the first <p> tag of the comment
						{
							nextSib.innerHTML = 'I like pie!';
							restofMessage = nextSib.nextSibling;
							while (restofMessage) //  - need to delete the rest of the comment
							{
								restofMessage.innerHTML = '';
								restofMessage = restofMessage.nextSibling
							}
						}
						pctr++;
					}
					nextSib = nextSib.nextSibling;
				}
			}
		}
	}
}

