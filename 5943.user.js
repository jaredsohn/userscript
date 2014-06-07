// ==UserScript==

// @name           istheshit.net Favorites

// @namespace      foobar_imaginary

// @description    Allows you to save your istheshit.net favorites!

// @include        http://*.istheshit.net/

// ==/UserScript==



unsafeWindow.GM_parseName = function()

{

	nm = location.href;

	nm = nm.toLowerCase();

	nm = nm.substr(7,nm.indexOf("istheshit.net")-8);

	return nm;

}



unsafeWindow.GM_shitAdd= function()

{

	success=false;

	added = unsafeWindow.GM_parseName();

	old = GM_getValue('favs');

	

	if (old==undefined || old=="")

	{

		GM_setValue('favs',added);

		success=true;

	}

	else if (unsafeWindow.GM_isFav(added))

	{

		alert(added + " is already in your list.");

	}

	else

	{

		GM_setValue('favs',old + '|' + added);

		success=true;

	}

	if (success)

	{

		//alert("Fav shit added.");

		unsafeWindow.numFavs++;

		unsafeWindow.shitFav = unsafeWindow.numFavs-1;

	}

	unsafeWindow.GM_showShit();

}



unsafeWindow.GM_shitGet = function(num)

{

	val = "";

	favs = GM_getValue('favs');

	if (favs!=undefined)

	{

		favray = favs.split("|");

		if (favray.length != 0)

		{

			while (num > favray.length -1)

			{

				num -= favray.length;

			}

			while (num < 0)

			{

				num += favray.length;

			}

			val=favray[num];

			GM_setValue('lastGet',num);

		}

	}

	return val;

}



unsafeWindow.GM_favNum = function(favname)

{

	favname=favname.toLowerCase();

	favs = GM_getValue('favs');

	if (favs!=undefined)

	{

		favs=favs.toLowerCase();

		favray = favs.split("|");

		for (i=0;i<=favray.length-1;i++)

		{

			if (favname==favray[i])

			{

				return i;

			}

		}

	}

	return -1;

}



unsafeWindow.GM_isFav = function(favname)

{

	return (unsafeWindow.GM_favNum(favname) >= 0);

}



unsafeWindow.GM_showShit = function()

{

	if (unsafeWindow.numFavs>0)

	{

		while (unsafeWindow.shitFav > unsafeWindow.numFavs-1)

		{

			unsafeWindow.shitFav -= unsafeWindow.numFavs;

		}

		while (unsafeWindow.shitFav < 0)

		{

			unsafeWindow.shitFav += unsafeWindow.numFavs;

		}

	}

	else

	{

		unsafeWindow.shitFav=-1;

	}

	

	favname = unsafeWindow.GM_shitGet(unsafeWindow.shitFav);

	isFav = unsafeWindow.GM_isFav(unsafeWindow.GM_parseName());

	

	unsafeWindow.topTexts[!isFav].style.display="none";

	unsafeWindow.topTexts[isFav].style.display="inline";

	

	favlink = document.getElementById("favlink");

	favlink.href="http://" + favname + ".istheshit.net";

	

	favnum = document.getElementById("favnum");

	while (favnum.childNodes.length > 0)

	{

		favnum.removeChild(favnum.childNodes[0]);

	}

	if (isNaN(unsafeWindow.shitFav))

	{

		unsafeWindow.shitFav=-1;

	}

	favnum.appendChild(document.createTextNode((unsafeWindow.shitFav+1) + "/" + unsafeWindow.numFavs));

	

	favbox = document.getElementById("favbox");

	while (favbox.childNodes.length > 0)

	{

		favbox.removeChild(favbox.childNodes[0]);

	}

	favbox.appendChild(document.createTextNode(favname));

}



unsafeWindow.GM_showNextFav = function()

{

	unsafeWindow.shitFav++;

	unsafeWindow.GM_showShit();

}



unsafeWindow.GM_showPrevFav = function()

{

	unsafeWindow.shitFav--;

	unsafeWindow.GM_showShit();

}



unsafeWindow.GM_deleteFav = function()

{

	if (confirm("Delete fav '" + unsafeWindow.GM_parseName() + "'?"))

	{

		favs = GM_getValue('favs');

		favray = favs.split("|");

		num = unsafeWindow.GM_favNum(unsafeWindow.GM_parseName());

		favray.splice(num,1);

		favs = favray.join("|");

		GM_setValue('favs',favs);

	}

	unsafeWindow.numFavs=unsafeWindow.GM_getNumFavs();

	unsafeWindow.GM_showShit();

}



unsafeWindow.GM_getNumFavs = function()

{

	favs = GM_getValue('favs');

	if (favs!=undefined && favs!="")

	{

		favray = favs.split("|");

		return favray.length;

	}

	return 0;

}

unsafeWindow.workaround = function(tocall)
{
	setTimeout(tocall, 0);
}





/////////////////////////

//REAL CODE STARTS HERE//

/////////////////////////



// oh yeah, this is the fun stuff.. adding elements via the DOM functions instead of innerHTML FTW! 

// innerHTML is evil.



shitform = document.getElementById("inputform"); 	//One frickin' id in the whole document! Luckily, it's a child of the div we want...

if (typeof(shitform)!=undefined && shitform!=null)

{

	textdiv = shitform.parentNode; 				//...so we can find the div thusly...

	child=textdiv.childNodes[0];				//...and identify its first child node.



	//Create my container

	mydiv=document.createElement("div");

	//Positioning and margins

	mydiv.style.display="block";

	mydiv.style.position="relative";

	mydiv.style.top="-3px";

	mydiv.style.backgroundColor="white";

	//mydiv.style.cssFloat="left";

	mydiv.style.paddingBottom="5px";

	mydiv.style.border="3px solid black";

	mydiv.style.borderTop="0px solid black";

	mydiv.style.marginBottom="-3px";

	//Content alignment

	mydiv.style.textAlign="center";



	unsafeWindow.topTexts = new Array();

	unsafeWindow.topTexts[true] = document.createElement("span");

	unsafeWindow.topTexts[false] = document.createElement("span");



	unsafeWindow.topTexts[true].appendChild(document.createTextNode(unsafeWindow.GM_parseName() + " is your fav. "));

	//unsafeWindow.topTexts[true].appendChild(document.createElement("br"));

	a = document.createElement("a");

	a.href="javascript:workaround(GM_deleteFav);";

	a.className="tjockredlink";

	a.appendChild(document.createTextNode("Delete it."));

	unsafeWindow.topTexts[true].appendChild(a);

	mydiv.appendChild(unsafeWindow.topTexts[true]);



	//Create a link

	a = document.createElement("a");

	a.href="javascript:workaround(GM_shitAdd);";

	a.className="tjockredlink";

	a.appendChild(document.createTextNode("Add to favorites"));

	unsafeWindow.topTexts[false].appendChild(a); 

	mydiv.appendChild(unsafeWindow.topTexts[false]); //Add it to my div



	mydiv.appendChild( document.createElement("br") ); //Add a line break



	//Create another link

	a = document.createElement("a");

	a.href="javascript:workaround(GM_showPrevFav);";

	a.className="tjockredlink";

	a.appendChild(document.createTextNode("<prev"));

	mydiv.appendChild(a); //Add it to my div



	spn = document.createElement("span");

	spn.id="favnum";

	spn.style.display="inline";

	spn.style.marginRight="3px";

	spn.style.marginLeft="3px";

	spn.appendChild(document.createTextNode("-"));

	mydiv.appendChild(spn);



	//Create another link

	a = document.createElement("a");

	a.href="javascript:workaround(GM_showNextFav);";

	a.className="tjockredlink";

	a.appendChild(document.createTextNode("next>"));

	mydiv.appendChild(a); //Add it to my div



	mydiv.appendChild( document.createElement("br") ); //Add a line break



	//Create another link

	a = document.createElement("a");

	a.id = "favlink";

	a.href="javascript:return false;";

	a.className="tjockredlink";

	spn = document.createElement("span");

	spn.id="favbox";

	a.appendChild(spn);   //Add the span into the link

	mydiv.appendChild(a); //Add it to my div



	textdiv.insertBefore(mydiv,child); //add my div right before the first child

	unsafeWindow.numFavs = unsafeWindow.GM_getNumFavs();

	unsafeWindow.shitFav = GM_getValue('lastGet'); //Load the last shown fav number

	unsafeWindow.GM_showShit(); //Show stuff in the favbox





	//alert("No errors.");

}