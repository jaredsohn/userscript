// ==UserScript==
// @name           changeLinks and targets
// @namespace      tag:
// @description    Allows you to modify Links, Targets and Buttons, originally from http://userscripts.org/scripts/show/27909
// @include        http://*.dyndns.org*
// ==/UserScript==

/* Do not modify this unless you know what you're doing */
var link=document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var button=document.evaluate("//input[@value]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  

/* UnComment and change this to whatever you want the page to be called.
   This shows up at the top of the browser and on the tab.
   Leave it commented to use the page default titles.
*/

//document.title = "";

/* ---Instructions for Beginners---
   1. Find a link or button on Google (or another site you included) that you wish to change.
   2. If it is a button, go to the button section.  If it is a link, go to the link section.
   3. Copy the template function call, and paste it on the line below.
   4. Modify the first String (inside the "" marks) to the name of the link or button on the webpage.  It is case sensitive.
   5. Alternatively modify this string to be the link's href property, regex's are recommended when doing this.
   6. Modify the second String to what you want the link to say.
   7. Modify the third String to the location you want the link to point, make sure to include http://
   8. Leave the field blank ("") if you wish it to remain unchanged.
   9. The last parameter is optional, if you want to use regular expressions to search for a match instead of plain text, set this to 1.	
   10. Here is an example which will change the 'About Google' link to say 'Facebook!!!', and when clicked will bring you to facebook:
   modifyLink ("About Google", "Facebook!!!", "http://www.facebook.com", 0)
*/


////// This is how to use new option 

// modifyLink_Target ("","http://192.28.134.150/","","http://192.28.2.123/",1);
// modifyLink_Target ("","http://onehost.com/","","http://otherhost.com/",1);

//// added by ramaDan


/* ---Link Section--- */
modifyLink ("Actual Link Text (or link href)", "Desired Link Text", "Desired Link Path", 0);
modifyLink_Target ("","http://economy.erepublik.com/en/citizen/donate/","","http://erepublik.com/en/economy/donate-items/",1);

/* ---Button Section--- */   	
modifyButton ("Actual Button Text", "Desired Button Text", 1);


/* Do not modify the section below unless you know what you're doing */

function modifyLink_Target (ExpectedName, ExpectedTarget, DesiredName, DesiredTarget, RegexEnabled){
	if (RegexEnabled != 1){
		toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
		ExpectedName = ExpectedName.replace(toReplace, "\\$1");
		ExpectedName = "^" + ExpectedName + "$";
	}
	re = new RegExp(ExpectedName)
	for(i = 0; i < link.snapshotLength; i++) {
		tmp = link.snapshotItem(i);
		if(re.test(tmp.href)){
		DesiredTargetNew = tmp.href.replace(ExpectedTarget, DesiredTarget);
			if (DesiredName != ""){
				tmp.innerHTML = DesiredName;
			}
			if (DesiredTarget != ""){
				tmp.href = DesiredTargetNew;
			}
		}
                else if(re.test(tmp.href)){
			if (DesiredName != ""){
				tmp.innerHTML = DesiredName;
			}
			if (DesiredTarget != ""){
				tmp.href = DesiredTarget;
			}
		}
	}				
}



function modifyLink (ExpectedName, DesiredName, DesiredTarget, RegexEnabled){
	if (RegexEnabled != 1){
		toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
		ExpectedName = ExpectedName.replace(toReplace, "\\$1");
		ExpectedName = "^" + ExpectedName + "$";
	}
	re = new RegExp(ExpectedName)
	for(i = 0; i < link.snapshotLength; i++) {
		tmp = link.snapshotItem(i);
		if(re.test(tmp.innerHTML)){
			if (DesiredName != ""){
				tmp.innerHTML = DesiredName;
			}
			if (DesiredTarget != ""){
				tmp.href = DesiredTarget;
			}
		}
                else if(re.test(tmp.href)){
			if (DesiredName != ""){
				tmp.innerHTML = DesiredName;
			}
			if (DesiredTarget != ""){
				tmp.href = DesiredTarget;
			}
		}
	}				
}


function modifyButton (ExpectedName, DesiredName, RegexEnabled){
	if (RegexEnabled != 1){
	        toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
		ExpectedName = ExpectedName.replace(toReplace, "\\$1");
		ExpectedName = "^" + ExpectedName + "$";
	}
	re = new RegExp(ExpectedName)
	for(i = 0; i < button.snapshotLength; i++) {
		tmp = button.snapshotItem(i)
		if(re.test(tmp.value)){
			if (DesiredName != ""){
				tmp.value = DesiredName;
			}
		}
	}				
}

// ==/UserScript==