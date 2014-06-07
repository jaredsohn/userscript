// ==UserScript==
// @author	Lucas Showerman
// @name        Search Drop Down
// @namespace   search
// @description This searches through a list of items in a drop down and allows you to select one. The keyboard shortcut is ctrl+shift+f
// @include     *
// @version     1
// @grant       GM_registerMenuCommand
// ==/UserScript==
GM_registerMenuCommand("Find Option",getItem,"f");
function getItem()
{
	if(document.activeElement.tagName == "SELECT")
	{
		var selElem = document.activeElement;
		var search = prompt("Enter search string?","");
		var list = selElem.options;
		var options = new Array();
		var optString = "";
		var itemChosen = true;
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].text.toLowerCase().indexOf(search.toLowerCase()) > -1)
			{
				optString += options.length + ". " + list[i].text + "\n";
				options[options.length] = i;
			}
		}
		if(options.length == 1)
		{
            selElem.selectedIndex = Number(options[0]);
		} else if(optString != "")
		{
			var option = prompt("Please choose the number for the item you want:\n" + optString,0);
			selElem.selectedIndex = Number(options[option]);
		} else if (optString == ""){
			alert("No results found");
		}
	} else
	{
		alert('No drop down selected');
	}
}

//Register the keyboard shortcut
window.onkeydown = function(event){
    var evt = event || window.event;
    if(evt.which == 70 && evt.ctrlKey && evt.shiftKey)
    {
        getItem();
    }
;};