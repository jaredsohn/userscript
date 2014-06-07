// ==UserScript==
// @name           Dave's ESL Cafe - Avatarizer-Imagizer
// @namespace      http://www.dmitryvolokhov.com
// @description    Adds your avatar to any forum and shows images linked in posts below the post.  Also fixes the profile link on the avatars.
// @include        http://forums.eslcafe.com/*/viewtopic.php*
// @exclude        http://forums.eslcafe.com/*/viewforum*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) 
{
	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
  		}
	}
	return classElements;
}

function extractUserNameFromBox(baseCell)
{
//alert("Begin extract...");
	var startStringSearch = baseCell.innerHTML.indexOf("genmed") + 8;
	var endStringSearch = baseCell.innerHTML.lastIndexOf("</a>");
	var uName = baseCell.innerHTML.substring(startStringSearch,endStringSearch);
	return uName;
}

function extractUserIDNumberFromBox(baseCell)
{
//alert("Begin extract 2...");
	var startStringSearch = baseCell.innerHTML.indexOf("href=") +6;
	var endStringSearch = baseCell.innerHTML.indexOf("class") - 2;
	var uID = baseCell.innerHTML.substring(startStringSearch,endStringSearch);
	return uID;
}


function extractUserIMGStringFromBox(baseCell)
{
//alert("Begin extract 3...");
	if (baseCell.parentNode.innerHTML.indexOf("src=") <0) return null;
	var startStringSearch = baseCell.parentNode.innerHTML.indexOf("src=") + 5;
	var endStringSearch = baseCell.parentNode.innerHTML.indexOf("border") - 9;
	var imgStr = baseCell.parentNode.innerHTML.substring(startStringSearch,endStringSearch);
	return imgStr;
}

function extractUserRegDateFromBox(baseCell)
{
//alert("Begin extract 4...");
	baseCell = baseCell.parentNode;
	var startStringSearch = baseCell.innerHTML.indexOf("Joined");
	
	if (startStringSearch == -1) return "";
		
	var endStringSearch = baseCell.innerHTML.indexOf("<br>", startStringSearch);
	var joinDate = baseCell.innerHTML.substring(startStringSearch, endStringSearch);
	return joinDate;
}

function extractUserLocationFromBox(baseCell)
{
//alert("Begin extract 5...");
	baseCell = baseCell.parentNode;
	var startStringSearch = baseCell.innerHTML.indexOf("Location");
	
	if (startStringSearch == -1) {return ""};
	
	var endStringSearch = baseCell.innerHTML.indexOf("</span>", startStringSearch);
	var userLocation = baseCell.innerHTML.substring(startStringSearch, endStringSearch);
	return userLocation;
}

function addAvatarToUserPosts(userName, avatarURL)
{
	var allUserNames = new Array();
	allUserNames = getElementsByClass("name");
	for (var a=0;a<allUserNames.length;a++)
	{
		var cellUserName = extractUserNameFromBox(allUserNames[a]);
		var profileURL = "http://forums.eslcafe.com/korea/profile.php?mode=viewprofile&u=" + extractUserIDNumberFromBox(allUserNames[a]);
		var imgString = extractUserIMGStringFromBox(allUserNames[a]);
		var userRegDate = extractUserRegDateFromBox(allUserNames[a]);
		var userLocation = extractUserLocationFromBox(allUserNames[a]);
			
		var iHTML = new String();

		if (cellUserName.toLowerCase() == userName.toLowerCase())
		{ //This cell has my username in it - I should update it with my Avatar
			iHTML = "<a href='" + profileURL + "' style='{font-size : 16px;text-decoration: none}'><b>" + userName + "</b><br><br><img src='" + avatarURL + "' border=0></a>" + "<br>" + userLocation;
			//alert(iHTML);
			allUserNames[a].parentNode.innerHTML = surroundWithThisFontStyle(iHTML,"{font-size : 10px;font-family : arial;font-weight : regular;text-decoration: none}")
			
		}
		else
		{
			if (imgString != null)
			{ //This cell doesn't have my username in it, but that person has an avatar.
				iHTML = "<a href='" + profileURL + "' style='{font-size : 12px;text-decoration: none}'><b>" + cellUserName + "</b><br><br><img src='" + imgString + "' border=0></a>" + "<br><br>" + userRegDate + "<br>" + userLocation;
			}
			else
			{ //This cell doesn't have my username in it, and that person DOESN'T HAVE an avatar.
				iHTML = "<a href='" + profileURL + "' style='{font-size : 12px;text-decoration: none}'><b>" + cellUserName + "</b></a><br><br>" + userRegDate + "<br>" + userLocation;
				//alert(iHTML);
			}
			
			//allUserNames[a].parentNode.innerHTML = "<br>";
			allUserNames[a].parentNode.innerHTML = surroundWithThisFontStyle(iHTML,"{font-size : 10px;font-family : arial;font-weight : regular}");
		}
		
	}
}

function surroundWithThisFontStyle(surroundMe, fontStyle)
{
	var fontStart = "<span style='" + fontStyle + "'>";
	var fontEnd = "</span>";
	return fontStart + surroundMe + fontEnd;
}


//function Left(str, n) {if (n <= 0) return ""; else if (n > String(str).length) return str; else return String(str).substring(0,n);}
function Right(str, n) {if (n <= 0) return ""; else if (n > String(str).length) return str; else {var iLen = String(str).length; return String(str).substring(iLen, iLen - n);}}



/*********** Determine the user name we wish to modify ***********/

var myUserName = "";

if (!GM_getValue('myUserName'))
{
	myUserName = prompt("It looks like you haven't entered your ESL Cafe username yet.  Please type it in the box below.", "AwesomeUser");
	GM_setValue('myUserName', myUserName);
}
else {myUserName = GM_getValue('myUserName');}

/*********** End Determine the user name we wish to modify ***********/

/*********** Determine the avatar we wish to create ***********/
var myAvatar = "";

if (!GM_getValue('myAvatar'))
{
	myAvatar = prompt("It looks like you haven't entered the location of your ESL Cafe avatar yet.  Please paste in its location to the box below.", "http://tinypic.com/my_picture");
	GM_setValue('myAvatar', myAvatar);
}
else {myAvatar = GM_getValue('myAvatar');}
/*********** End Determine the avatar we wish to create ***********/


function changeAllImageLinksToImages()
{
	var allImageLinks = document.getElementsByTagName('a');
	
	var linksToModifyLater = new Array();
	
	for (var i = 0; i < allImageLinks.length; i++)
	{
	var curLink = "" + allImageLinks[i];
	//alert(curLink.toLowerCase());
	
		var fileExtension = Right(allImageLinks[i],3).toLowerCase();
		if (fileExtension == "jpg" || fileExtension == "gif" || fileExtension == "png" || fileExtension == "bmp")
		{
			var addThisString = "<br><br><hr><a href='" + curLink + "'><img src='" + curLink + "' style='max-width: 300px' border=0></a><br>";
			linksToModifyLater[i] = addThisString;
		}
		/* YouTube/Google Video Embedding is experimental, do not use yet
		else if (curLink.toLowerCase().indexOf("youtube") >=0 || curLink.toLowerCase().indexOf("video.google") >=0)
		{
			//alert("Youtube link detected at: " + allImageLinks[i]);
			var addThisString = "<br><br><hr><object type='application/x-shockwave-flash' data='"+ curLink + "' width='400' height='326'><param name='movie' value='" + curLink +"' /><param name='FlashVars' value='playerMode=embedded' /></object><br>";
			linksToModifyLater[i] = addThisString;
		}
		*/
	}
	
	//This extra loop is necessary because if you try to do this in the previous loop, you are modifying the 'a' tag that it's testing for, resulting in an endless loop for some reason
	for (var j=0; j < linksToModifyLater.length; j++)
	{
		if (linksToModifyLater[j]) {allImageLinks[j].parentNode.innerHTML += linksToModifyLater[j];}
	}
}

function embedYoutube()
{
	var id = location.href.match(/[\?&]v=(.*?)(?:&|$)/)[1];
	var embedCode = '<object width="425" height="350" data="http://www.youtube.com/v/' + id + '" type="application/x-shockwave-flash"><a href="http://www.youtube.com/watch?v=' + id + '">' + document.title + '</a></object>';
	Array.forEach(document.getElementsByName('embed_code'), function(el){el.value = embedCode;});
}

addAvatarToUserPosts(myUserName, myAvatar);
changeAllImageLinksToImages();
embedYoutube();