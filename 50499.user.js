// ==UserScript==
// @name           Gallery Forum Link
// @namespace      By Luke35120 with help from Firebird347
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
		newNode.innerHTML = '<a style="width: 222px;" href="/Forums/topics.aspx?forumID=4" class="rmLink"><span class="rmText">The Gallery</span></a>'

		//insert node after the Bungie Forums entry (insert before the next node)
		var dropDownMenu = menuItems[i].parentNode.parentNode;
		dropDownMenu.insertBefore(newNode, menuItems[i].parentNode.nextSibling);
                dropDownMenu.lastChild.previousSibling.style.width = "227px";
	}
}