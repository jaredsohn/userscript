// ==UserScript==
// @name           UMCD Single Post
// @namespace      http://forum.usemycomputer.com/
// @description    Single post view for UseMyComputer Discussions
// @include        http://forum.usemycomputer.com/*msg*
// @version        0.3
// ==/UserScript==

var umcdUrl = document.URL;
var umcdRef = umcdUrl.indexOf("msg") ;
if (umcdUrl.indexOf("#") > 0)
	{
	var umcdEnd = umcdUrl.indexOf("#")
	var msgId = umcdUrl.substring(umcdRef+3,umcdEnd);
	}
else
	{
	var msgId = umcdUrl.substring(umcdRef+3)
	}
var subjIds = [];
var msgNum = 0;
var umcdTags = document.body.getElementsByTagName('*');
//get all message IDs into subjIds
for (var tg = 0; tg < umcdTags.length; tg++)
	{
	var tag = umcdTags[tg];
	if (tag.id.indexOf("subject_")!=-1)
		{
		subjIds[msgNum] = tag.id;
		msgNum=msgNum+1;
		}
	}
// if the link was from the Index, kill all posts up to new post
if (umcdUrl.indexOf("#new")!=-1)
	{
	for (var tg = 0; tg < subjIds.length-1; tg++)
	    {
		if (subjIds[tg].substring(8) < msgId)	// detect new post
			{
			var msgHead = document.getElementById(subjIds[tg]);
			var imgPost = msgHead.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[5]
			var imgThumbs = imgPost.getElementsByClassName("bbc_img")
			for (var tg2 = 0; tg2<imgThumbs.length; tg2++)
				{
				imgThumbs[tg2].src = "";
				}
			msgHead.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(msgHead.parentNode.parentNode.parentNode.parentNode.parentNode);
			}
		}
	}
else
	{
	// kill all posts not matching msgId
	for (var tg = 0; tg < subjIds.length; tg++)
		{
		var msgHead = document.getElementById(subjIds[tg]);
		if (subjIds[tg].substring(8) != msgId)
			{
			var imgPost = msgHead.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[5]
			var imgThumbs = imgPost.getElementsByClassName("bbc_img")
			for (var tg2 = 0; tg2<imgThumbs.length; tg2++)
				{
				imgThumbs[tg2].src = "";
				}
			msgHead.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(msgHead.parentNode.parentNode.parentNode.parentNode.parentNode);			
			}
		}
	}