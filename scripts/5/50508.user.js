// ==UserScript==
// @name           SIP Forum Link
// @namespace      By Eliper with halps from Firebird347 and Luke35120
// @include        http://*bungie.net/*
// ==/UserScript==


var menuItems = document.getElementsByClassName('rmText');

for(var i=0; i<menuItems.length; i++ )
{
	//compare menuItem.innerText
	if(menuItems[i].textContent == "Game Forums")
	{
		//make new node for new item
		var newNode = document.createElement("LI");
		newNode.className = 'rmItem';
		newNode.innerHTML = '<a style="width: 222px;" href="/fanclub/191711/Forums/topics.aspx?forumID=197898" class="rmLink"><span class="rmText">SIP Forum</span></a>'

		//insert node after the "Game Forums" entry (insert before the next node)
		var dropDownMenu = menuItems[i].parentNode.parentNode;
		dropDownMenu.insertBefore(newNode, menuItems[i].parentNode.nextSibling);
                dropDownMenu.lastChild.previousSibling.style.width = "227px";
	}
}