// ==UserScript==
// @name			ModTheater.com New Files Rep Button Fix
// @description		Repairs the non functioning reputation button on the first post of each thread in the New Files section. Also adds a report post button which was missing.
// @namespace		http://www.modtheater.com/forum/member.php?u=5281
// @include			http://www.modtheater.com/forum/*
// ==/UserScript==

	//Broken rep buttons are identified by their onclick string, which is "reputation(*post id number*); return false;"
	//We can use the post ID number to re write the link to reputation.php?p=*post id number*
	//which will fix the button

	//Initialise a couple of vars
	var brokenrepbuttons;
	var thisrepbutton;
	var onclickstring;
	var postid;
	var reportbutton;
	
	//Find any <a> elements w/ an onclick attribute
	brokenrepbuttons = document.evaluate("//a[@onclick]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	{
		//loop through any found instances
		for (var i = 0; i < brokenrepbuttons.snapshotLength; i++) 
		{
			thisrepbutton = brokenrepbuttons.snapshotItem(i);
			
			//grab the elements onclick value
			onclickstring = thisrepbutton.getAttribute("onclick");

			//check if this is a broken rep button. Typical string for a broken rep button is: "reputation(285033); return false;"
			if(onclickstring.substring(0,11) == "reputation(")
			{
				postid = onclickstring.substring(11,(onclickstring.indexOf(")")));
				
				//Get rid off the useless onclick attribute
				thisrepbutton.removeAttribute("onclick");

				//rewrite href to the right link
				thisrepbutton.setAttribute("href", ("reputation.php?p=" + postid));
				
				//That is the rep button fixed, might as well add a report post button, as it is missing.
				
				//Create a new <a></a> element
				reportbutton = document.createElement('a');
				
				//Stick it in after the rep button
				thisrepbutton.parentNode.insertBefore(reportbutton, thisrepbutton.nextSibling);
				
				//Add the report button's attributes
				reportbutton.setAttribute("href", ("report.php?p=" + postid));
				
				//Simple way to set the image code for the report link.
				reportbutton.innerHTML = ' <img border="0" alt="Report Bad Post" src="http://www.modtheater.com/forum/images/orange/buttons/report.gif" class="inlineimg" title="Report Bad Post"/> ';
				//Done
			}
		}
	}