// ==UserScript==
// @name           MangaMarker
// @description    Colors Manga differently, so you what's good and what's shit
// @include        http://unixmanga.com/*
// ==/UserScript==

// TODO: 
// cache the list
// find a better way to store an array using the GM_store
// make the code more efficient

var list = {};

var styleList = ["color: #dd6666", "color:#00aa00; font-weight: bold" ];

function mark(name, v)
{
	list[name] = v;
	saveList();
	colorManga();
}

function unMark(name)
{
	list[name] = null;
	saveList();
	colorManga();
}

function loadList()
{
	var listStr = GM_getValue("List", null);
	
	if(listStr != null)
		list = eval(listStr);
}

function saveList()
{
	GM_setValue("List", uneval(list));
}

function colorManga()
{
	var links = document.getElementsByTagName("a");
	
	for(var manga in list)
		for(var i = 0; i<links.length; i++)
			if(links[i].title == manga)
				links[i].innerHTML="<span style=\""+styleList[list[manga]]+"\">" + manga + "</span>";
}

function addLinks()
{
	var imgs = document.getElementsByTagName("img");
	
	for(var i = imgs.length-1; i>=0; i--)
	{
		if(imgs[i].src.match(/.*dir.png/))
		{
			var img = imgs[i];
			var td = img.parentNode;
			var td2 = td.nextSibling.nextSibling;
			
			var name = td2.childNodes[1].title;
			
			td.innerHTML = "";
			
			var a = document.createElement("a");
			a.innerHTML = "<span style=\"color: black\"> - </span>";
			a.href = "";
			a.name = name;
			a.addEventListener("click", function handler() { unMark(this.name); }, false);
			td.appendChild(a);
			
			for(var j=0; j<styleList.length; j++)
			{
				a = document.createElement("a");
				a.innerHTML = "<span style=\"" + styleList[j] + "\"> " + j +" </span>";
				
				a.href = "";
				a.name = name;
				a.alt = j;
				a.addEventListener("click", function handler() { mark(this.name, this.alt); }, false);
				td.appendChild(a);
			}
		}
	}
}



function main()
{
	addLinks();
	loadList();
	colorManga();
}

main();