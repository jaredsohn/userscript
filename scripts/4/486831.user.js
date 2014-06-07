// ==UserScript==
// @name        Howrse Reserve EC Boxes Simplified
// @namespace   myHowrse
// @description Simplifies reserving EC boxes on Howrse to yourself or unreserving them.
// @include     http://*.howrse.com/centre/box/*
// @version     2
// ==/UserScript==
//	finds the URL to your presentation page
lastMenu = document.getElementsByClassName("menu-sub-item last last-profil");
menuList = lastMenu[0].getElementsByTagName("a");
myPageLink = document.URL.substring(0,document.URL.indexOf("/centre")) + menuList[3].getAttribute("href");
usergroup2List = document.getElementsByClassName("usergroup_2");
//	finds your username if you already have at least one reserved box
i=0;
reserveName = "";
while(i < usergroup2List.length)
{
	if(usergroup2List[i].getAttribute("href") == myPageLink)
	{
		reserveName = usergroup2List[i].textContent;
		i = usergroup2List.length;
	}
	else ++i;
}
//	sets all of the initial input values for the boxes to either your username or ""
boxList = document.getElementsByName("boxFormReserverLogin");
for(i=0;i < boxList.length; ++i)
{
	if(boxList[i].getAttribute("value") == reserveName) boxList[i].setAttribute("value","");
	else boxList[i].setAttribute("value",reserveName);
}