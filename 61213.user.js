// ==UserScript==
// @name           Bungie Store Link
// @namespace      By Duardo with help from Luke35120 & Firebird347
// @include        http://*bungie.net/*
// ==/UserScript==


var menuItems = document.getElementsByClassName('rmText');

for(var i=0; i<menuItems.length; i++ )
{
	//compare menuItem.innerText
	if(menuItems[i].textContent == "Community Tools")
	{
		//make new node for new item
		var newNode = document.createElement("LI");
		newNode.className = 'rmItem';
		newNode.innerHTML = '<a style="width: 222px;" href="http://www.bungiestore.com" class="rmLink"><span class="rmText">Bungie Store</span></a>'

		//insert node after the Community Tools entry (insert before the next node)
		var dropDownMenu = menuItems[i].parentNode.parentNode;
		dropDownMenu.insertBefore(newNode, menuItems[i].parentNode.nextSibling);
                dropDownMenu.lastChild.previousSibling.style.width = "227px";
	}
}