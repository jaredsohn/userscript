// ==UserScript==
// @name           KillUsers
// @namespace      userkiller@kwierso.com
// @description    erases Users' posts
// @include        http://*.roosterteeth.com/forum/viewTopic.php*
// @include        http://*.roosterteeth.com/members/profile.php?*
// @include        http://*.roosterteeth.com/members/comments/*
// @include        http://*.roosterteeth.com/members/journal/entry.php?*
// @include        http://*.roosterteeth.com/members/images/image.php?*
// @include        http://*.roosterteeth.com/media/viewItem.php?*
// @include        http://*.roosterteeth.com/archive/episode.php?*
// @include        http://*.roosterteeth.com/groups/news/entry.php*
// @include        http://*.roosterteeth.com/groups/forum/viewTopic.php*
// ==/UserScript==

(function()
{
	//set method to 0 to replace message contents, anything else to completely delete the message.
	var method = 0;
	//set method2 to 0 to block BobLablaw no matter who is listed in the username variable
	var method2 = 584;
	//this is the username list that you want to have hidden. Change it to whomever you want.
	//Separate usernames with commas. Spaces are automatically removed.
	var username = "user1, user2";
	//this is the comment you want to replace all of that user's posts with
	var reason = "I AM AN UNIMPORTANT PERSON.";
//------------------------------------------------------------------------------------------------------------------------

	var isthereuser = true;
	if(username == "")
		isthereuser = false;

	username = username.replace(/ /g,"");
	if(method2 != 584)
	username += ",BobLablaw";
	if(username.search(",") != -1)
	{
		var usernames = username.split(",");
	}
	else
	{
		var usernames =[];
		usernames[0] = username;
	}

	var theClass = "comment";
	var allHTMLTags=[];
	var commentTags=[];
	var tableTags=[];
	var userTags=[];
	var aTags=[];
	var allcommentparents=[];
	var commentpostTags=[];
	var erasedcomments=[];
	var allDividerTags=[];

	//Create Array of All HTML Tags
	allHTMLTags=document.getElementsByTagName('*');
	if(isthereuser)
	for(p=0;p<usernames.length;p++)
	{
		erasedcomments[p] = "";
			//Loop through all tags using a for loop
		for (i=0; i<allHTMLTags.length; i++) 
		{
			//Get all tags with the specified class name.
			if (allHTMLTags[i].className=="comment" || allHTMLTags[i].className=="comment altComment") 
			{
				commentTags.push(allHTMLTags[i]);
			}
			if(allHTMLTags[i].className=="divider")
			{
				allDividerTags.push(allHTMLTags[i]);
			}
		}
		for(i=0; i< commentTags.length; i++)
		{
			tableTags = commentTags[i].getElementsByTagName('table');
			for(j = 0; j < tableTags.length; j++)
			{
				if(tableTags[j].className == "web2User")
				{
					userTags = tableTags[j].getElementsByTagName('tr');
					aTags = userTags[1].getElementsByTagName('a');

					if(aTags[0].innerHTML.match(usernames[p]) == usernames[p] && usernames[p] != "KWierso")
					{	
						allcommentparents = commentTags[i].getElementsByTagName('*');

						for(r = 0; r < allcommentparents.length; r++)
						{
							if(allcommentparents[r].className == "commentPost")
							{
								if(method == 0)
								{
									erasedcomments[r] = allcommentparents[r].innerHTML;
	//								postdiv = document.createElement("a");
	//								postdiv.addEventListener("click", click, false);
	//								postdiv.innerHTML = "<b>" +reason+"</b>";
	//								postdiv.title = "Click Here to Show Message!";
	//								allcommentparents[r].innerHTML += postdiv.innerHTML;
	//								document.body.insertBefore(postdiv, allcommentparents[r]);

	//								document.body.insertBefore(postdiv, commentTags[i].nextSibling);

									erasedcomments[r] = erasedcomments[r].replace(/<br>/g, "     ");
									erasedcomments[r] = erasedcomments[r].replace(/<\/span>/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<span style="background-color: (.*?);">/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<span class="small" style="color: rgb(.*?);">/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<a href=(.*?)>/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<\/a>/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<i>/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<\/i>/g, "");
									erasedcomments[r] = erasedcomments[r].replace(/<img (.*?)>/g, "<IMAGE>");
//		allcommentparents[r].innerHTML = "<a onClick=\"alert\(\'Function not yet implemented!\'\);\" title=\"Click to show hidden message! (Not implemented)\"><b>" +reason+"</b></a>" ;
		allcommentparents[r].innerHTML = "<b>" +reason+"</b>" ;
									allcommentparents[r].title = erasedcomments[r];
								}
								else
								{
//									commentTags[i].innerHTML = "";
									commentTags[i].style.backgroundColor = "red";
//									commentTags[i].title = "DELETED BY KILLUSER SCRIPT";
									commentTags[i].style.display = "none";
									
									allDividerTags[i].style.display = "none";
									allDividerTags[i].style.backgroundColor = "red";
						//			commentTags[i-1].style.display = "none";
						//			commentTags[i+1].style.display = "none";
								}
							}
						}
					}
				}
			}
		}
// FAILED ATTEMPT AT IMPLEMENTING SHOW/HIDE FEATURE:
//	var click = new function()
//	{
//		alert("CLICK");
//	}
////////
}})();
