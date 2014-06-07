// ==UserScript==
// @name	  CCthePROBLEM script
// @include	  http://www.gamefaqs.com/boards/*
// @include	  http://www.gamefaqs.com/boards9/*
// ==/UserScript==

var allLinks, thisLink;
var allLinks2, thisLink2;
var allDivs, thisDiv;
var url = window.location.href;
var topicnum, postdetail, messagenum, topicurl;
var messages = new Array();
var username = "CCthePROBLEM";
var userid = "4973853";
var user = "user=" + userid;

messages[0] = "Whites are sub-human";
messages[1] = "The North is racist";
messages[2] = "I don't care about white people";
messages[3] = "Clearly, my cousins tell me how the real world is in the rural South";
messages[4] = "I LOVE FRIED CHICKEN";
messages[5] = "Ignore me, I look like this: <br> <br> http://i58.photobucket.com/albums/g257/taydiggy/Photow001.jpg";
messages[6] = "I LOVE ME SOME WATERMELON";
messages[7] = "Everyone is racist against me";
messages[8] = "My cousin dances to please the white man";
messages[9] = "I'm incredibly ugly and racist";
messages[10] = "I ate a baby once";
messages[11] = "I'm always wrong, and I know it"; 

if (url.match(/genmessage\.php/)) {

  allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

  for (var i = 0; i < allLinks.snapshotLength; i++) {

	thisLink = allLinks.snapshotItem(i);

	if((thisLink.href.match(/user\.php/)) && (thisLink.href.match(user)) && (thisLink.textContent == username)) {

	    rad = document.createElement("text");
	    rad.innerHTML = "CCthePROBLEM";

	    thisLink.insertBefore(rad, thisLink.firstChild);
	    thisLink.removeChild(thisLink.firstChild.nextSibling);

	    if (thisLink.parentNode.className == "author" || thisLink.parentNode.className == "author gamefox-highlight") {

		    postdetail = thisLink.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.toString();

		    if(!postdetail.match(/http/)) {
			postdetail = thisLink.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.toString();
		    }

		    topicnum = postdetail.slice(postdetail.indexOf("topic=") + 6, postdetail.indexOf("topic=") + 14);
		    messagenum = postdetail.slice(postdetail.indexOf("message=") + 8, postdetail.indexOf("message=") + 17);

		    if ((thisLink == thisLink.parentNode.parentNode.parentNode.firstChild.firstChild.nextSibling.firstChild.nextSibling) && (!(url.match(/page=/)))) {

			    message = document.createElement("td");
			    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

			    title = document.createElement("h1");
			    title.innerHTML = messages[topicnum % messages.length];

			    oldTitle = thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
			    oldTitle = oldTitle.slice(2,oldTitle.length-2);
			    document.title = document.title.replace(oldTitle,title.innerHTML);

			    thisLink.parentNode.parentNode.insertBefore(message, thisLink.parentNode.nextSibling.nextSibling);
			    thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling.nextSibling);

				    if (thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.tagName !== "H1") {

					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.insertBefore(title, thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild);
					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling);

				    } else {

					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.insertBefore(title, thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild);
					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling);

				    }

		    } else {

			    message = document.createElement("td");
			    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

			    thisLink.parentNode.parentNode.insertBefore(message, thisLink.parentNode.nextSibling.nextSibling);
			    thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling.nextSibling);
		    }

	    } else {

		    postdetail = thisLink.nextSibling.nextSibling.toString();

		    if(!postdetail.match(/http/)) {
			postdetail = thisLink.nextSibling.nextSibling.nextSibling.toString();
		    }

		    topicnum = postdetail.slice(postdetail.indexOf("topic=") + 6, postdetail.indexOf("&message="));
		    messagenum = postdetail.slice(postdetail.indexOf("message=") + 8, postdetail.length);

		    if(url.match(/boards9/)) {

			    if ((thisLink == thisLink.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling) && ( (!(url.match(/page=/))) || (url.match(/page=0/) ))) {

				    title = document.createElement("div");
				    title.className = 'boxhead';
				    title.innerHTML = messages[topicnum % messages.length];

				    message = document.createElement("div");
				    message.className = 'graybox';
				    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

				    thisLink.parentNode.parentNode.parentNode.insertBefore(title, thisLink.parentNode.parentNode.parentNode.firstChild.nextSibling);
				    thisLink.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling);

				    thisLink.parentNode.parentNode.insertBefore(message, thisLink.parentNode.nextSibling.nextSibling);
				    thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling.nextSibling);

				    } else {

				    message = document.createElement("div");
				    message.className = 'graybox';
				    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

				    thisLink.parentNode.parentNode.insertBefore(message, thisLink.parentNode.nextSibling.nextSibling);
				    thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling.nextSibling);

				    }

			    } else {

			    if ((thisLink == thisLink.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.nextSibling) && (!(url.match(/page=/)))) {

				    title = document.createElement("h1");
				    title.innerHTML = messages[topicnum % messages.length];

				    message = document.createElement("td");
				    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

				    oldTitle = thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
				    oldTitle = oldTitle.slice(2,oldTitle.length-2);
				    document.title = document.title.replace(oldTitle,title.innerHTML);

				    if (thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.tagName !== "H1") {

					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.insertBefore(title, thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild);
					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling);

				    } else {

					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.insertBefore(title, thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild);
					thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling);

				    }

				    thisLink.parentNode.parentNode.nextSibling.nextSibling.insertBefore(message, thisLink.parentNode.parentNode.nextSibling.nextSibling.firstChild);
				    thisLink.parentNode.parentNode.nextSibling.nextSibling.removeChild(thisLink.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling);

				    } else {

				    message = document.createElement("td");
				    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

				    thisLink.parentNode.parentNode.nextSibling.nextSibling.insertBefore(message, thisLink.parentNode.parentNode.nextSibling.nextSibling.firstChild);
				    thisLink.parentNode.parentNode.nextSibling.nextSibling.removeChild(thisLink.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling);

				    }
			    }
		    }
	    }
	}
}

if (url.match(/detail\.php/)) {

  if (url.match(/boards9/)) {

	allDivs = document.evaluate("//div[@class='whitebox']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < allDivs.snapshotLength; i++) {

	    thisDiv = allDivs.snapshotItem(i);

	    if(thisDiv.firstChild.nextSibling.textContent.match(username)) {

		    rad = document.createElement("text");
		    rad.innerHTML = "CCthePROBLEM";

		    thisDiv.firstChild.nextSibling.insertBefore(rad, thisDiv.firstChild.nextSibling.firstChild);
		    thisDiv.firstChild.nextSibling.removeChild(thisDiv.firstChild.nextSibling.firstChild.nextSibling);

		    topicnum = url.slice(url.indexOf("topic=") + 6, url.indexOf("&message="));

		    if (url.match(/page=/)) {
			messagenum = url.slice(url.indexOf("message=") + 8, url.indexOf("&page="));
		    } else {
			messagenum = url.slice(url.indexOf("message=") + 8, url.length);
		    }

		    message = document.createElement("div");
		    message.className = 'graybox';
		    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

		    thisDiv.parentNode.insertBefore(message, thisDiv.nextSibling.nextSibling);
		    thisDiv.parentNode.removeChild(thisDiv.nextSibling.nextSibling.nextSibling);
	    }
	}

  } else {

	allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {

		thisLink = allLinks.snapshotItem(i);

		if((thisLink.href.match(/user\.php/)) && (thisLink.href.match(user)) && (thisLink.textContent == username)) {

		    topicnum = url.slice(url.indexOf("topic=") + 6, url.indexOf("&message="));

		    if (url.match(/page=/)) {
			messagenum = url.slice(url.indexOf("message=") + 8, url.indexOf("&page="));
		    } else {
			messagenum = url.slice(url.indexOf("message=") + 8, url.length);
		    }

		    rad = document.createElement("text");
		    rad.innerHTML = "CCthePROBLEM";

		    message = document.createElement("td");
		    message.innerHTML = "<b>" + messages[topicnum * messagenum % messages.length] + "</b><br>---<br>I hate white people";

		    thisLink.insertBefore(rad, thisLink.firstChild);
		    thisLink.removeChild(thisLink.firstChild.nextSibling);

		    thisLink.parentNode.parentNode.insertBefore(message, thisLink.parentNode.nextSibling.nextSibling);
		    thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling.nextSibling);
		}
	}
  }
}

if (url.match(/gentopic\.php/) || url.match(/search\.php/)) {

  if (url.match(/boards9/)) {

	allLinks = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {

		thisLink = allLinks.snapshotItem(i);

		if (thisLink.textContent == username) {

		    if (thisLink.previousSibling.previousSibling.firstChild.tagName == "A") {

			topicurl = thisLink.previousSibling.previousSibling.firstChild.href;

		    } else {

			topicurl = thisLink.previousSibling.previousSibling.firstChild.nextSibling.href;

		    }

		    topicnum = topicurl.slice(topicurl.indexOf("topic=") + 6, topicurl.length);

		    topic = document.createElement("text");
		    topic.innerHTML =  messages[topicnum % messages.length] ;

		    rad = document.createElement("text");
		    rad.innerHTML = "CCthePROBLEM";

		    thisLink.insertBefore(rad, thisLink.firstChild);
		    thisLink.removeChild(thisLink.firstChild.nextSibling);

		    if (thisLink.previousSibling.previousSibling.firstChild.tagName == "A") {

			thisLink.previousSibling.previousSibling.firstChild.insertBefore(topic, thisLink.previousSibling.previousSibling.firstChild.firstChild);
			thisLink.previousSibling.previousSibling.firstChild.removeChild(thisLink.previousSibling.previousSibling.firstChild.firstChild.nextSibling);

		    } else {

			thisLink.previousSibling.previousSibling.firstChild.nextSibling.insertBefore(topic, thisLink.previousSibling.previousSibling.firstChild.nextSibling.firstChild);
			thisLink.previousSibling.previousSibling.firstChild.nextSibling.removeChild(thisLink.previousSibling.previousSibling.firstChild.nextSibling.firstChild.nextSibling);

		    }
		}
	}

  } else {

	allLinks = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {

		thisLink = allLinks.snapshotItem(i);

		if (thisLink.textContent == username) {

		    topicurl = thisLink.previousSibling.previousSibling.firstChild.href;

		    topicnum = topicurl.slice(topicurl.indexOf("topic=") + 6, topicurl.length);

		    topic = document.createElement("text");
		    topic.innerHTML =  messages[topicnum % messages.length] ;

		    rad = document.createElement("text");
		    rad.innerHTML = "CCthePROBLEM";

		    thisLink.insertBefore(rad, thisLink.firstChild);
		    thisLink.removeChild(thisLink.firstChild.nextSibling);

		    thisLink.previousSibling.previousSibling.firstChild.insertBefore(topic, thisLink.previousSibling.previousSibling.firstChild.firstChild);
		    thisLink.previousSibling.previousSibling.firstChild.removeChild(thisLink.previousSibling.previousSibling.firstChild.firstChild.nextSibling);
		}
	}
  }
}

if ((url.match(/user\.php/)) && (url.match(user))) {

	if  (url.match(/boards9/)) {

		allLinks = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		for (var i = 0; i < allLinks.snapshotLength; i++) {

		    thisLink = allLinks.snapshotItem(i);

		    if (thisLink.textContent == userid) {

			radh = document.createElement("text");
			radh.innerHTML = "Current Information for CCthePROBLEM";

			thisLink.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.insertBefore(chuckyh, thisLink.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.firstChild);
			thisLink.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.removeChild(thisLink.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling);

			allLinks2 = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			for (var i = 0; i < allLinks2.snapshotLength; i++) {

			    thisLink2 = allLinks.snapshotItem(i);

			    if (thisLink2.textContent == username) {

				rad = document.createElement("text");
				rad.innerHTML = "CCthePROBLEM";

				thisLink2.insertBefore(rad, thisLink2.firstChild);
				thisLink2.removeChild(thisLink2.firstChild.nextSibling);
			    }


			    if (thisLink2.textContent == "Signature") {

				radsig = document.createElement("td");
				radsig.innerHTML = "I hate white people";

				thisLink2.parentNode.insertBefore(radsig, thisLink2.nextSibling.nextSibling);
				thisLink2.parentNode.removeChild(thisLink2.nextSibling.nextSibling.nextSibling);
			    }

			    if (thisLink2.textContent == "Quote") {

				radq = document.createElement("td");

				thisLink2.parentNode.insertBefore(radq, thisLink2.nextSibling.nextSibling);
				thisLink2.parentNode.removeChild(thisLink2.nextSibling.nextSibling.nextSibling);
			    }
			}
		    }
		}

	} else {

		allLinks = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		for (var i = 0; i < allLinks.snapshotLength; i++) {

		    thisLink = allLinks.snapshotItem(i);

		    if (thisLink.textContent == userid) {

			radh = document.createElement("h1");
			radh.innerHTML = "	Current Information for CCthePROBLEM";

			thisLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.insertBefore(radh, thisLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild);
			thisLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling);

			allLinks2 = document.evaluate("//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			for (var i = 0; i < allLinks2.snapshotLength; i++) {

			    thisLink2 = allLinks.snapshotItem(i);

			    if (thisLink2.textContent == username) {

				rad = document.createElement("text");
				rad.innerHTML = "CCthePROBLEM";

				thisLink2.insertBefore(rad, thisLink2.firstChild);
				thisLink2.removeChild(thisLink2.firstChild.nextSibling);
			    }

			    if (thisLink2.textContent == "Signature") {

				radsig = document.createElement("td");
				radsig.innerHTML = "I hate white people";

				thisLink2.parentNode.insertBefore(radsig, thisLink2.nextSibling.nextSibling);
				thisLink2.parentNode.removeChild(thisLink2.nextSibling.nextSibling.nextSibling);
			    }
			}
		    }
		}
	}
}
