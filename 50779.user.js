// ==UserScript==
// @name           Search By ID
// @namespace      wowhead
// @description    Support for search by ID
// @include        http://www.wowhead.com/
// ==/UserScript==

//Get the search form and remove the onsubmit handler
searchBox = document.forms[0];
searchBox.removeAttribute("onsubmit");


//Detect keypresses on the input box
searchBox.elements[0].setAttribute("onkeypress", "if(event.which == 13) return false;");
searchBox.elements[0].addEventListener("keydown", function(event) { if(event.which == 13) SubmitFunc(); } , false);

//If it's the main search
if(searchBox.elements[1])
{
	//turn Submit to a button and add an onclick event
	searchBox.elements[1].setAttribute("type", "button");
	searchBox.elements[1].addEventListener("click", SubmitFunc, false);
}
else
{
	//Find the "looking glass" link, disable it and add an onclick event
	link = searchBox.getElementsByTagName("a")[0];
	link.setAttribute("href", "#");
	link.addEventListener("click", SubmitFunc, false);
}

//Handle search submit
function SubmitFunc()
{
	query = searchBox.elements[0].value;
	
	if(query == "")
		return;
	
	//Look for the colon, used as search by ID command
	var i = query.indexOf(":");
	
	
	//If not, standart search
	if(i == -1)
	{
		window.location = "?search=" + query;
		return;
	}
		
	cmd = query.substring(0, i);
	id = query.substring(i+1);
	
	byid =  0;
	
	//Determine if we should display bt ID
	switch(cmd)
	{
		case "quest":
		case "item":
		case "npc":
		case "zone":
		case "faction":
		case "spell":
                        //If so, redirect straight to that page
			window.location = "?" + cmd + "=" + id;
			break;
                default:
                        //Otherwise, normal search
                        window.location = "?search=" + query;
                        break;
	}
}