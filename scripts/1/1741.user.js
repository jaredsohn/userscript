// ==UserScript==
// @name          LF Linkify Chatter Usernames
// @namespace     http://users.linkfilter.net/~deathburger/
// @description	  Add links to users in the chatter
// @include       http://linkfilter.net/?s=chatter*
// @include       http://*.linkfilter.net/?s=chatter*
// @exclude       http://users.linkfilter.net/*
// ==/UserScript==

(function() {
  window.addEventListener("load", function(e) {

// UNCOMMENT BELOW TO DEBUG
//try{

var chatter, user, chatteruser, link, i;

// This makes sure we don't waste time and make JS errors
// on chatter parts like the input form frame
chatter = document.getElementById("div_chat");
if(!chatter)
    return;

for(i=0;user=chatter.childNodes[i];++i)
{
    // Filter out all except logins, link posts, poll posts, and /me
    if(user.nodeName != "FONT" || !user.firstChild)
	continue;

    // Handle /me lines
    if(user.firstChild.nodeValue == "*")
    {
	//alert("Emote");
    }

    // Handle logins, and poll & journal & link posts
    if(user.firstChild.nodeValue == "!!")
    {
	var type;
	var username = "";
	var j, word;
	user = user.nextSibling;
	// Filter out any other possible !! lines, hopefully
	if(!user.nodeValue || (user.nodeValue.indexOf(" is around.") == -1
				 && user.nodeValue.indexOf(" just posted ") == -1
				 && (user.nextSibling && user.nextSibling.nodeName == "a" 
				     && user.nextSibling.getAttribute("href").indexOf("/s=j;user=") != -1)
				 && user.nodeValue.indexOf(" posted a poll '") == -1))
	    continue;
	chatteruser = user.nodeValue.split(" ");
	// Handle multi-word usernames
	for(j=1; word=chatteruser[j]; ++j)
	{
	    if(!word)
		break;
	    if(word == "is")
		if(chatteruser[j+1] == "around.")
		{
		    type = 1;
		    break;
		}
	    if(word == "just")
		if(chatteruser[j+1] == "posted")
		{
		    type = 2;
		    break;
		}
	    if(word == "posted")
		if(chatteruser[j+1] == "a")
		{
		    type = 3;
		    break;
		}
	    username += word + " ";
	    if(word.indexOf("'s") != -1)
		break;
	}
	if(username.indexOf("'s ") != -1)
	{
	    username = username.substring(0, username.length - 3);
	    type = 4;
	}
	else
	{
	    username = username.substring(0, username.length - 1);
	}

	var login = document.createTextNode(
		(type == 1 ? " is around." : 
		(type == 2 ? " just posted " : 
		(type == 3 ? " posted a poll '" : "'s "))));        

	var span = document.createElement("span")
	span.appendChild(document.createTextNode(" "));
	link = document.createElement("a");
	link.setAttribute("href","/?s=u;user="+encodeURIComponent(username));
	link.setAttribute("target","_blank");
	link.appendChild(document.createTextNode(username));
	span.appendChild(link);
	span.appendChild(login);
	chatter.replaceChild(span,user);
    }
    if(i == chatter.childNodes.length)
    break;

}

// UNCOMMENT BELOW TO DEBUG
//}catch(e){alert(e)}

// End of the script.
  }, false);
})();
