// ==UserScript==
// @name        HowrseSireDamLinks
// @namespace   myHowrse
// @description Adds links to the sire and dam of the horse you are looking at that go to the page you can see, if you own that horse.  Howrse will redirect it to the public page if you don't.
// @include     http://*.howrse.com/elevage/fiche/?id=*
// @include     http://*.howrse.com/elevage/chevaux/cheval?id=*
// @author      daexion
// @version     8
// ==/UserScript==

if(document.body.textContent.indexOf("is now in Heaven") < 0 && document.body.textContent.indexOf("moved to the Safe Haven") < 0)
{
	parents = document.getElementsByClassName('horsename');

	container = document.getElementById("affix-body-content");
	familyDiv = document.createElement("div");
	indCC = document.URL.indexOf(".");

	if(parents.length > 1)
	{
		sireDiv = document.createElement("div");
		sire = document.createElement("a");
		damDiv = document.createElement("div");
		dam = document.createElement("a");
		staticLinkHalf =document.URL.substring(0,indCC)+".howrse.com/elevage/chevaux/cheval?id";

		sire.setAttribute("href",staticLinkHalf+parents[0].href.substring(parents[0].href.indexOf("="),parents[0].href.length));
		dam.setAttribute("href",staticLinkHalf+parents[1].href.substring(parents[0].href.indexOf("="),parents[1].href.length));
		
		sire.appendChild(document.createTextNode("(S) " + parents[0].text));
		sireDiv.appendChild(sire);
		dam.appendChild(document.createTextNode("(M) " + parents[1].text));
		damDiv.appendChild(dam);
		
		familyDiv.appendChild(sireDiv);
		familyDiv.appendChild(damDiv);
	}
	else if(parents.length == 1)
	{
		unknDiv = document.createElement("div");
		unkn = document.createElement("a");
		staticLinkHalf =document.URL.substring(0,indCC)+".howrse.com/elevage/chevaux/cheval?id";

		unkn.setAttribute("href",staticLinkHalf+parents[0].href.substring(parents[0].href.indexOf("="),parents[0].href.length));
		if(document.body.textContent.indexOf("Sire: Disappeared horse") > 0)
		{
			unkn.appendChild(document.createTextNode("(M) " +parents[0].text));
		}
		else unkn.appendChild(document.createTextNode("(S) " +parents[0].text));
		unknDiv.appendChild(unkn);
		familyDiv.appendChild(unknDiv);
	}
	else if(document.body.textContent.indexOf("Ouranos") > 0 && document.body.textContent.indexOf("Breed: Divine") < 0)
	{
		familyDiv.appendChild(document.createTextNode("Foundie"));
	}

	if(document.URL.indexOf("chevaux/cheval") > 0)
	{
		scipts = document.getElementsByTagName("script");
		i=0;
		while(scipts[i].text.indexOf("chevalId") < 0 && i < scipts.length) ++i;
		horseVars = scipts[i].text;
		firstEqual = horseVars.indexOf("=");
		firstSemi = horseVars.indexOf(";");
		chevalId = horseVars.substring(firstEqual+2,firstSemi);
		linkDiv = document.createElement("div");
		horseLink = document.createElement("a");
		horseLink.setAttribute("href",document.URL.substring(0,indCC)+".howrse.com/elevage/fiche/?id="+chevalId);
		horseLink.appendChild(document.createTextNode("Public URL"));
		linkDiv.appendChild(horseLink);
		familyDiv.appendChild(linkDiv);
	}
	else
	{
		//determines if you own the horse
		lastMenu = document.getElementsByClassName("menu-sub-item last last-profil");
		menuList = lastMenu[0].getElementsByTagName("a");
		myPageLink = menuList[3].getAttribute("href");
		usergroup2 = document.getElementsByClassName("usergroup_2");
		horseOwner = usergroup2[0].getAttribute("href").substring(usergroup2[0].getAttribute("href").length-myPageLink.length,usergroup2[0].getAttribute("href").length);
		if(horseOwner == myPageLink)
		{
			chevalId = document.URL.substring(document.URL.indexOf("=")+1,document.URL.length);
			linkDiv = document.createElement("div");
			horseLink = document.createElement("a");
			horseLink.setAttribute("href",document.URL.substring(0,indCC)+".howrse.com/elevage/chevaux/cheval?id="+chevalId);
			horseLink.appendChild(document.createTextNode("Private URL"));
			linkDiv.appendChild(horseLink);
			familyDiv.appendChild(linkDiv);
		}
	}
	container.appendChild(familyDiv);
}

