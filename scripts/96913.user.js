// ==UserScript==
// @name          U.S. Address Detection
// @description   Detects US addresses in a web page and wraps them in a link to Google Maps.
// @include       http://*
// ==/UserScript==



 
function findAddrInSiblings(node)
{
	var streetPattern = /\d{1,6} ((W|E|S|N).)? ?([A-Z][a-z]+) ((STREET|ST|DRIVE|DR|AVENUE|AVE|ROAD|RD|LOOP|COURT|CT|CIRCLE|LANE|LN|BOULEVARD|BLVD|WAY)\.?)?/gi;	
	var streetReg = new RegExp(streetPattern);
	
	var siblingToCheck = node.previousSibling;

	while (siblingToCheck)
	{
		if (siblingToCheck.nodeType === 3 && streetReg.test(siblingToCheck.data))
			return siblingToCheck;
		else
			siblingToCheck = siblingToCheck.previousSibling;
	}

}
 

/*
* Add a link to google maps to any address text node we find.
*/
function detectAddresses(node) {
	if (node.nodeType === 3) // TEXT node
	{
		var str = replaceNbsps(node.data);
		if(reg.test(str))
		{
			node.data = str;
			var span = document.createElement("span");
			
			var siblingsWithRestOfAddress = findAddrInSiblings(node);
			
			if(siblingsWithRestOfAddress && siblingsWithRestOfAddress != node)
			{
				var replace = siblingsWithRestOfAddress;
				var bigAnchor = document.createElement("a");
                
				var s = 0;
				var addrText = "";
				while(siblingsWithRestOfAddress && siblingsWithRestOfAddress != node)
				{
					var temp = siblingsWithRestOfAddress.cloneNode(true);
					bigAnchor.appendChild(temp);
					if (temp.nodeType === 3)
						addrText += " "+temp.data;
					siblingsWithRestOfAddress = siblingsWithRestOfAddress.nextSibling;
					
					// Remove nodes that contain address except 1st one
					// which will be swapped with span
					if(s != 0)
						siblingsWithRestOfAddress.parentNode.removeChild(siblingsWithRestOfAddress.previousSibling);
					else
						s++;
				}
				addrText += " "+node.data;
				span.appendChild(bigAnchor);
				node.parentNode.replaceChild(span, replace);	
				bigAnchor.appendChild(node);
				addrText = trim(addrText);
                bigAnchor.setAttribute("href", "http://maps.google.com/maps?q="+escape(addrText));
				return;
			}

            var source = node.data;            
            node.parentNode.replaceChild(span, node);

            reg.lastIndex = 0;

            for (var match = null, lastLastIndex = 0; (match = reg.exec(source)); )
			{
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", "http://maps.google.com/maps?q="+escape(match[0]));
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = reg.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
		    return;
		}

    }
	else
	{
		var kids = node.childNodes;
		for(var i=0; i<kids.length; i++) 
		{
			if(!dontCheckTags[kids[i].tagName])
				detectAddresses(kids[i]);
		}
	}

}

function replaceNbsps(str) {
  var re = new RegExp(String.fromCharCode(160), "g");
  return str.replace(re, " ");
}

function trim(str) {
  var newstr;
  newstr = str.replace(/^\s*/, "").replace(/\s*$/, ""); 
  newstr = newstr.replace(/\s{2,}/, " "); 
  return newstr;
} 

var pattern = /((\x20?[a-zA-Z]+)){0,2},? (A[LKSZRAP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]) (?!0{5})(\d{5})(-\d{4})?/gi;
var reg = new RegExp(pattern);

var dontCheckTags = [];
dontCheckTags["A"] = true;
dontCheckTags["BR"] = true;
dontCheckTags["HR"] = true;
dontCheckTags["IMG"] = true;
dontCheckTags["INPUT"] = true;
dontCheckTags["LINK"] = true;
dontCheckTags["OBJECT"] = true;
dontCheckTags["OPTION"] = true;
dontCheckTags["SELECT"] = true;
dontCheckTags["SCRIPT"] = true;
dontCheckTags["STYLE"] = true;
dontCheckTags["TEXTAREA"] = true;

var body = document.getElementsByTagName('body')[0];
detectAddresses(body);

//Because the detectAddresses call will happen in the other context and it runs
//back here we must link it up.
unsafeWindow.detectAddresses = detectAddresses;