// ==UserScript==
// @name           Geocaching.com - UserName Menu v1.0
// @namespace      raverdave.usernamemenu
// @include        http://www.geocaching.com/*
// @version				 1.0
// ==/UserScript==

//A few user editable variable.

var Menu_BGColor='#555555'			// Set background color of the new menu
var Menu_BorderWidth="1"				// Thickness of the border, 0 to disable
var Menu_BorderColor="#000000"	// Set the menu border color

CreateMenu()

/* The following lines add items to the menu and are in the following format
addMenuItem("Text to display,"Tool Tip Text","url")
to add a seperating line use addSeperator()
*/

addMenuItem("Quick View","Quick View","/my/")
addMenuItem("Public Profile","Public Profile","/profile/")
addSeperator()
addMenuItem("Account Details","Account Details","http://www.geocaching.com/account/default.aspx")





/* No need to go beyond this point*/

function CreateMenu()
{
	var x = document.getElementsByClassName('SignedInProfileLink')
	if (x.item(0)==null) {
  	var x = document.getElementsByClassName('CommonUsername')
	}

	y = x.item(0)
	var UserName = y.innerHTML;
	var newAttr = document.createAttribute("style");
	//newAttr.nodeValue = "width:250px;";
	y.setAttribute("class", "none");
	y.title="";
	var newHTML = '<ul class="Menu" style="float:none;"><li id="ctl00_liUserMenu" style="background:transparent;"><u>' + UserName + '</u>' +
		'<ul class="SubMenu" id="ctl00_hlUserMenu" style="border: ' + Menu_BorderWidth+'px solid ' + Menu_BorderColor +'; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color:' + Menu_BGColor +';">' +
		'</ul></li></ul>'
	y.innerHTML = newHTML;
	//return(SubMenu)
}

function addMenuItem(newlink_text,newlink_title,newlink_href)
{
	
	var ul = document.getElementById("ctl00_hlUserMenu");
	var new_li = document.createElement('li');
	var newAttr = document.createAttribute("style");
	newAttr.nodeValue = "min-width:175px; max-width:220px;";
	new_li.setAttributeNode(newAttr); 
	var new_Link = document.createElement('a');
	new_Link.innerHTML=newlink_text
	new_Link.title=newlink_title
	new_Link.href=newlink_href
	//new_Link.rel =getRel(href)
	
	ul.appendChild(new_li)
	new_li.appendChild(new_Link)
	
}

function addSeperator(newlink_text,newlink_title,newlink_href)
{
	
	var ul = document.getElementById("ctl00_hlUserMenu");
	var new_li = document.createElement('li');
	var newAttr = document.createAttribute("style");
	newAttr.nodeValue = "min-width:175px; max-width:220px;";
	new_li.setAttributeNode(newAttr); 
	var new_Link = document.createElement('a');
	new_Link.innerHTML="----------";
	new_Link.title="";
	new_Link.href="#";
	//new_Link.rel =getRel(href)
	
	ul.appendChild(new_li)
	new_li.appendChild(new_Link)
	
}
