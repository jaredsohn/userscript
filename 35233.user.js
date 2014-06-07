// ==UserScript==
// @name           Dave's ESL Cafe - Nix Specific User Posts on Forums
// @namespace      http://www.eslcafe.com
// @description    Removes Posts on Forums from Specified Users
// @include        http://forums.eslcafe.com/*
// @exclude        http://forums.eslcafe.com/viewtopic.php*
// ==/UserScript==

var cafeUserName = "";

if (!GM_getValue('cafeUserName'))
{
	cafeUserName = prompt("Which user's posts would you like to block forever on ESL Cafe Forums?  Please enter the User Names separated by commas, for example 'user1,user2,user3'", "userIHate1,userIhate2,userIhate3");
	GM_setValue('cafeUserName', cafeUserName);
}
else {cafeUserName = GM_getValue('cafeUserName');}
cafeUserName = cafeUserName.replace(", ",",");


var cafeUsers = new Array();
cafeUsers = cafeUserName.split(",");


var numPostsHidden = 0;

allRows = document.getElementsByTagName("tr");
allRows = allRows[13].parentNode.rows; //for some reason, we first have to zoom in on the sub-table in the previous row 13.  After this, we will have an array of rows for all of the posts

for (var a=0;a<allRows.length;a++)
{
	for (var j=0;j< cafeUsers.length;j++)

	{

		var cafeUserName = cafeUsers[j];
		//cells[3] is the "author" cell
		if (allRows[a].cells[3].textContent.toLowerCase().indexOf(cafeUserName) >= 0)
		{
			allRows[a].style.display = "none";
			numPostsHidden++;
			break;
		}

	}		
}
document.title += " - " + numPostsHidden + " Postings Hidden";