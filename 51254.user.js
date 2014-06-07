// ==UserScript==
// @name	phpBB Real Name Display
// @namespace	happinessiseasy
// @include	http://www.phpbb.com/community/*
// @description	Shows users' real names (if you know them) on phpBB3 forums
// @version	1.2
// ==/UserScript==

//Don't forget to include the URLs of the forums you want to use it on!

//Add your friends' names below (You can add as many as you want)

var handles = new Array();
handles['ExampleUserName1']	= 'Real Name 1';
handles['ExampleUserName2']	= 'Real Name 2';
handles['ExampleUserName3']	= 'Real Name 3';

var dlNodes = document.getElementsByTagName('dl');
for (var i = 0 ; i < dlNodes.length ; i++)
{
 if(dlNodes[i].className == "postprofile")				//This is the profile node
 {
  var dtNode = dlNodes[i].getElementsByTagName("dt")[0];		//The parent node that contains the image and handle nodes
  var anchorNodes = dtNode.getElementsByTagName("a");			//This contains all of the anchor nodes (if they exist)
  var strongNodes = dtNode.getElementsByTagName("strong");		//This contains all of the strong nodes (if they exist)
  var handleNodeText = "";						//Declare it out here so it won't leave scope

  if(anchorNodes.length!=0)						//If there is at least one anchor node
  {
   handleNodeText = anchorNodes[anchorNodes.length-1].firstChild;	//The text node of the last anchor node (handle)
  }
  else									//This handles deleted accounts
  {
   handleNodeText = strongNodes[0].firstChild;				//The text node of the only strong node (handle)
  }

  if (handleNodeText.nodeType == 3)					//Make sure it's a text node
  {
   var realName = handles[handleNodeText.nodeValue];			//Get the real name from the array
   if (realName!=null)							//If we have a value for it,
   {
    dtNode.appendChild(document.createElement('br'));			//Append a new line.
    var strongTag = document.createElement('strong');			//Make a strong tag.
    strongTag.appendChild(document.createTextNode(realName));		//Add the real name as a child of the <strong> tag.
    dtNode.appendChild(strongTag);					//Append the strong tag.
   }
  }
 }
}