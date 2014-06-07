// ==UserScript==
// @name	EnsimagTrombinoscope
// @namespace	http://intranet.ensimag.fr
// @description	Ajoute le trombinoscope aux pages de zenith à l'ensimag
// @include	*intranet.ensimag.fr/Zenith2/*
// @include	*intranet.ensimag.fr/ZENITH/*
// ==/UserScript==

//--------------------------
//
//	Auteur : Arthur Sonzogni
//	Version 1.0
//
//	Génère des liens vers l'ancien Zenith. Sur ce Zenith, les photos de chaques
//	personnes sont rappatrié pour former un Trombinoscope.
//--------------------------

function zenith2GenerateLinks()
{
	var hh=document.getElementsByTagName("tbody");
	if (hh.length==0) return;
	hh=hh[0];
	hh=hh.getElementsByTagName("tr");
	var firstRow=true;
	for(var i=0;i<hh.length;i++)
	{
		if (!firstRow)
		{
			var row=hh[i].getElementsByTagName("td");
			if (row.length>=1)
			{
				var cell=row[1];
				var textElement=cell.firstChild;
				while(textElement)
				{
					if (!(textElement.nodeType === 1))
					{
						var text=textElement.textContent;
						var newLink=document.createElement("a");
						newLink.href="http://intranet.ensimag.fr/ZENITH/affiche-groupe.php?GROUPE=";
						newLink.href += text;
						newLink.href += "&ANNEE="
						var newLinkText=document.createTextNode(text);
						newLink.appendChild(newLinkText);
						cell.replaceChild(newLink,textElement);
						textElement=newLink;
					}
					textElement=textElement.nextSibling;
				}
			}
		}
		else
		{
			firstRow=false;
		}
	}
}

function zenith1GeneratePhoto()
{
	var header4Icon=document.getElementById("tpdfcsv");
	var link=header4Icon.getElementsByTagName("a");
	var trombinoLink=link[0];
	trombinoLink.href="#";
	trombinoLink.onclick=expandPhoto;
	trombinoLink.target="_self";
}

function expandPhoto()
{
	var liste=document.getElementById("liste");
	
	var link=liste.getElementsByTagName("a");
	for(var i=0;i<link.length;i++)
	{
		if (link[i].href.indexOf("affiche-groupe.php") != -1)
		{
			var login=link[i].firstChild;
			var loginText=login.textContent;
			loginText=loginText.replace(/ /g,'');
			var p=login.parentNode;
			var img=document.createElement("img");
			img.src="https://intranet.ensimag.fr/zenith/photos/"+loginText+".jpg";
			p.appendChild(img);
		}
	}
}

function main()
{
	if (document.URL.indexOf("Zenith2") != -1)
	{
		zenith2GenerateLinks();
	}
	else if (document.URL.indexOf("ZENITH") != -1)
	{
		expandPhoto();
	}
}

setTimeout(main,1000);
