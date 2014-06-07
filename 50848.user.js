// ==UserScript==
// @name           SSO on the menu
// @description    Adds SSO to the forum drop down menu
// @namespace      By Wolverfrog
// @include        http://*bungie.net/*
// ==/UserScript==


var menuItems = document.getElementsByClassName('rmText');

for(var i=0; i<menuItems.length; i++ )
{
	//compare menuItem.innerText
	if(menuItems[i].textContent == "Bungie Forums")
	{
		//make new node for new item
		var newNode = document.createElement("LI");
		newNode.className = 'rmItem';
		newNode.innerHTML = '<a style="width: 222px;" href="http://www.bungie.net/fanclub/256116/Group/GroupHome.aspx" class="rmLink"><span class="rmText">The SSO</span></a>'

		//insert node after the Bungie Forums entry (insert before the next node)
		var dropDownMenu = menuItems[i].parentNode.parentNode;
		dropDownMenu.insertBefore(newNode, menuItems[i].parentNode.nextSibling);
                dropDownMenu.lastChild.previousSibling.style.width = "227px";
	}
}