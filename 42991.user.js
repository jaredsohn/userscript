// ==UserScript==
// @name           Inline  Search
// @namespace      pendevin
// @description    Replaces the search link in the topic list with an inlined search box
// @include        http://boards.endoftheinter.net/showtopics.php*
// @include        https://boards.endoftheinter.net/showtopics.php*
// @include        http://boards.endoftheinter.net/search.php*
// @include        https://boards.endoftheinter.net/search.php*
// ==/UserScript==

function insertAfter(newNode, target) 
{
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
}


function getUrlVars(urlz)
{
	//thanks for the function citizenray
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	return vars;
}

function clicked(e)
{
	e.preventDefault();
	var searchBar=document.getElementById("search_bar")
	searchBar.style.display=(searchBar.style.display=="none")?"block":"none";
	document.getElementById("search_box").focus();
}

var searchLink
function searched()
{
	searchLink=document.createElement("span");
	searchLink.id="searchLink";
	searchLink.innerHTML="<a href='/search.php'>Search</a> | ";
	insertAfter(searchLink,document.getElementById("userbar_pms"));
}

var get=getUrlVars(window.location.href);
var always=(get["s_aw"])?get["s_aw"]:"";

var search=document.createElement("div");
search.id="search_bar";
search.className="userbar";
search.style.display="none";
search.innerHTML="<form method='get' action='search.php' style='display:inline;'><input id='search_box' type='text' name='s_aw' value='"+always+"'/><input type='hidden' value='"+get['board']+"' name='board'/><input type='submit' name='submit' value='Search'/> <a style='text-decoration:none;' href='search.php?board="+get['board']+"&as'><small>Advanced</small></a>";
insertAfter(search, document.getElementsByClassName("userbar")[0]);

var as=document.getElementsByTagName("a");
for (i=0;i<as.length;i++)
{
	if (as[i].href.indexOf("/search.php")!=-1)
	{
		searchLink=as[i];
		break;
	}
}

if (location.pathname=="/search.php"&&get["s_aw"]||location.pathname=="/search.php"&&get["s_ep"]||location.pathname=="/search.php"&&get["s_ao"]||location.pathname=="/search.php"&&get["s_wo"])
{
	searched();
}
searchLink.addEventListener("click",clicked,false);