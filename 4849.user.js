// ==UserScript==
// @name         SquirrelMail-ShortCuts
// @description  Provides shortcuts in pair webmail.
// @include      http*://webmail*.pair.com/*
// @homepage     http://CovertInferno.Org
// ==/UserScript==

(function(){

// CONFIGURATION

  var alllinks = false;				//whether to add shotcuts to all links

//reserveKey(shortcut key,link text);
reserveKey('c',"Compose");
reserveKey('a',"Reply All");
reserveKey('c',"Camp");

// END CONFIGURATION


  var doc = document;
  var links = doc.getElementsByTagName('a');	//List all anchor elements (links)
  var n = links.length;				//Number of anchor elements (count links)
  var reserved = new Array();			//accesskeys reserved for use in user defined matches
  var used = '';				//accesskeys already in use
  var i = 0,z = 0;
  var e;
  var c;

for (i=0; i<reserved.length; i++)
{
	if(used.toUpperCase().indexOf(reserved[i][0].toUpperCase()) != -1)
	{
		continue;
	}

	re = new RegExp("^"+reserved[i][1]+"$");//Generate regular expression to match link text

	for(z=0;z<n;z++)
	{
		e = links[z];
		if(re.test(e.innerHTML))
		{
			setKey(e,reserved[i][0],reserved[i][1]);//Set accesskey and change link text to circled letter
			break;
		}
	}
}

if(alllinks)
{
	for(i=0;i<n;i++)
	{
		e = links[i];
		c = String(e.innerHTML).substr(0,1);
		if ((used.toUpperCase().indexOf(c.toUpperCase()) == -1)&&(reserveKey(c,e.innerHTML)))//Make sure its not in use or reserved (reserveKey fails if the key is already reserved)
		{
			setKey(e, String(e.innerHTML).substr(0,1),e.innerHTML);
		}
	}
}

/* @name setKey
 * @description sets accesskey attribute for anchors and changes first letter of link text to a circled letter
 */

function setKey(elm, key, txt)
{
	var c ='';
	var offset = 0;

	if(used.toUpperCase().indexOf(key.toUpperCase())!=-1)//Make sure accesskeys don't get used twice
	{
		alert("ERROR: Script misconfigured, accesskey used more than once.");
	}
	else
	{
		elm.accessKey = key;// Sets the accesskey

		used += key;//Add to list of used keywords

		if((offset = txt.toUpperCase().indexOf(key)) == -1)//Finds the accesskey
		{
			c1 = txt[0];//If the accesskey is not found use the first letter
		}
		else
		{
			c1 = txt[offset];//Pull out the accesskey
		}

//parseInt('HEX',16) converts hexidecimal to base 10

		if (c1.match(/[0-9]/))//Check to see if the first character is a number
		{
			decval = parseInt('2460', 16) + parseInt(c1) - 1;// Offsets to circled numbers
		}
		else if (c1.match(/[A-Z]/))//Check to see if the first character is a letter
		{
			decval = parseInt('24B6', 16) + c1.charCodeAt(0) - 65;// Offsets to uppercase circled letters
		}
		else if (c1.match(/[a-z]/))//Check to see if the first character is a letter
		{
			decval = parseInt('24B6', 16) + c1.charCodeAt(0) - 97 + 26;// Offsets to lowercase circled letters
		}
		c2 = '&#x' + decval.toString(16) + ';';//Convert from base 10 to hexidecimal

		if(offset == -1)
		{
			elm.innerHTML = c2 + txt.substring(1);
		}
		else
		{
			txt = txt.substr(0,offset) + txt.substr(offset,1).replace(c1,c2) + txt.substr(offset+1,txt.length);//reconstruct string
			elm.innerHTML = txt;// Set the link text to the modified text
		}
		
	}
}

/* @name reserverKey
 * @description reserves an accesskey for a specific link based on link text
 */

function reserveKey(key,txt)
{
	/*
	for(i=0;i<reserved.length;i++)//check if accesskeyhas already been reserved
	{
		if(reserved[i][1] == key.toUpperCase())
		{
			return false;
		}
	}
	*/
	reserved.push(Array(key.toUpperCase(),txt));//add key and link text to the reserved list
	return true;
}

})();
