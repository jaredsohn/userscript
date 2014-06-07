// ==UserScript==
// @name           Pixiv Filter
// @namespace      Pixiv Filter
// @description    Filters out images with few than the designated bookmarks (users)
// @downloadURL    https://userscripts.org/scripts/source/83212.user.js
// @include        http://www.pixiv.net/search.php*
// @include        http://www.pixiv.net/tags.php*
// @updateURL      https://userscripts.org/scripts/source/83212.user.js
// @version        3.4
// ==/UserScript==

var minusers,bookmarks,users,nextpagetop,nextpagebot,nextpagelink,currentpagenum,loadingtop,loadingbot,nextbuttop,nextbutbot,promptbutton;
var maxelements = 20;
var currentelements = 0;

document.body.innerHTML = document.body.innerHTML.replace(/\<div class\=\"user\-ad\-container\"([^]+?)\<\/section\>/, '<div>');
document.body.innerHTML = document.body.innerHTML.replace(/\<section class\=\"popular\-introduction\"\>([^]+?)\<\/section\>/, ''); 

minusers = GM_getValue('minimumusers', 10);

var books = document.getElementsByClassName('image-item');
var table = books[0].parentNode;
		
RemovePageNumbers();

ImageSortInitial();

if (nextpagelink == null)
{
	if (currentpagenum > 1)
	{
		loadingtop.innerHTML = "Showing Page " + currentpagenum;
		loadingbot.innerHTML = "Showing Page " + currentpagenum;
	}
}
else
{
	LoadNextPage(nextpagelink.href);
}


function ImageSortInitial()	
{	
	var imageitems = document.getElementsByClassName('image-item');
	for (var i = imageitems.length - 1; i >= 0; --i)
	{ 
		if (imageitems[i].innerHTML != null) 
		{
			var count = imageitems[i].getElementsByClassName('bookmark-count _ui-tooltip');
			if (count[0] != null && minusers > 0)
			{
				var users = count[0].innerHTML.match(/\d+/);
				if (users < minusers) 
				{
					imageitems[i].parentNode.removeChild(imageitems[i]);
				}
				else
				{		
					currentelements++;
					if (maxelements <= currentelements) 
					{
						i=-1;
					}
				}
			}
			else if (count[0] == null && minusers > 0)
			{
				imageitems[i].parentNode.removeChild(imageitems[i]);
			}
			else
			{			
				currentelements++;
				if (maxelements <= currentelements) 
				{
					i=-1;
				}
			}
			
		}
	}
}

function ImageSort(currentdoc)	
{
	
	var imageitems = currentdoc.getElementsByClassName('image-item');
	for (var i = 0; i < imageitems.length; i++) 
	{
		if (imageitems[i].innerHTML != null) 
		{
			var count = imageitems[i].getElementsByClassName('bookmark-count _ui-tooltip');
			if (count[0] != null && minusers > 0)
			{
				var users = count[0].innerHTML.match(/\d+/);
				if (users >= minusers) 
				{
					table.appendChild(imageitems[i]);
					currentelements++;
					if (currentelements >=  maxelements) 
					{
						i = imageitems.length;
					}
				}
			}
			else if (minusers < 1)
			{
				table.appendChild(imageitems[i]);
				currentelements++;
				if (currentelements >=  maxelements) 
				{
					i = imageitems.length;
				}
			}
		}
	}
}

function RemovePageNumbers()	
{
	var pagers = document.getElementsByClassName('pager-container');
	var pagenodes;
	var nextnodes;
	currentpagenum = /\d+/.exec(/p\=\d+/.exec(window.location));
	pagenodes = pagers[0].getElementsByTagName("li");
	nextnodes = pagers[0].getElementsByTagName("span");
	for (var d = pagenodes.length - 1; d >= 0; --d)
	{
		if (pagenodes[d].className == "current") 
		{
			loadingtop = pagenodes[d];
			pagenodes[d].innerHTML = "Loading...";
		}
		
		else 
		{
			pagenodes[d].parentNode.removeChild(pagenodes[d]);
		}
	}

	for (var d = nextnodes.length - 1; d >= 0; --d)
	{
		if (nextnodes[d].className == "next")
		{
			nextpagetop = nextnodes[d].firstChild;
			nextpagelink = nextnodes[d].firstChild;
			nextbuttop = nextnodes[d];
			nextbuttop.style.visibility = 'hidden';
		}
		else if (nextnodes[d].className == "prev")
		{
			nextnodes[d].style.visibility = 'hidden';
		}
	}

	pagenodes = pagers[1].getElementsByTagName("li");
	nextnodes = pagers[1].getElementsByTagName("span");
	for (var d = pagenodes.length - 1; d >= 0; --d)
	{
		if (pagenodes[d].className == "current") 
		{
			loadingbot = pagenodes[d];
			pagenodes[d].innerHTML = "Loading...";
		}
		else 
		{
			pagenodes[d].parentNode.removeChild(pagenodes[d]);
		}
		
				
	}
	
	for (var d = nextnodes.length - 1; d >= 0; --d)
	{
		if (nextnodes[d].className == "next")
		{
			nextpagebot = nextnodes[d].firstChild;
			nextpagelink = nextnodes[d].firstChild;
			nextbutbot = nextnodes[d];
			nextbutbot.style.visibility = 'hidden';
			if (nextpagelink)
			{
				currentpagenum = /\d+/.exec(/p\=\d+/.exec(nextpagelink.href)) - 1;
			}
			promptbutton = document.createElement("div");
			
			//promptbutton.innerHTML = "<input class='btn_type09' name='btns[submit_index]' value='Minimum Users' type='submit' />";
			promptbutton.innerHTML = '<ul><li><input type="submit" name="minurs" value="Minimum Users"  class="btn_type09" /></ul></li>';
			nextnodes[d].parentNode.appendChild(promptbutton);

			promptbutton.addEventListener("click",  function() {
				var input = prompt("Minimum number of users(bookmarks):", 10);
				var request = /\d+/.exec(input);
				if (request != null)
				{
					minusers = parseInt(request[0]);
					window.setTimeout(function() {								
					GM_setValue('minimumusers', minusers);
					}, 0);
				}
				window.location.reload();
			}, false); 
		}
		else if (nextnodes[d].className == "prev")
		{
			nextnodes[d].style.visibility = 'hidden';
		}
	}
	
}

function LoadNextPage(nextpageurl)
{
	
	var loadpagenum = /\d+/.exec(/p\=\d+/.exec(nextpageurl));
	loadingtop.innerHTML = "Loading Page " + loadpagenum + "...";
	loadingbot.innerHTML = "Loading Page " + loadpagenum + "...";
	
	GM_xmlhttpRequest({
	method: "GET",
	url: nextpageurl,

	onload: function(response)
	{	
		var clutterfree = response.responseText.replace(/\<section class\=\"showcase\"([^]+?)\<\/section\>/, '');
		var preextraction = /\<section class\=\"column\-search\-result\"([^]+?)\<\/section\>/.exec(clutterfree);
		var classreg = "img style\=\"opacity\: 1\;\" class"
        var extraction = preextraction[0].replace(/img class/g, classreg);   
		var tempnode = document.createElement('div');
		tempnode.innerHTML = '<section class="column-search-result"' + extraction + '</section>';
		ImageSort(tempnode);
		
		if (maxelements > currentelements) 
		{
			var pagercontent = /\<div class\=\"pager([^]+?)\<\/div\>/.exec(clutterfree);
			var pagerul = /\<span class\=\"next\"([^]+?)\<\/span\>/.exec(pagercontent);
			var tempulnode = document.createElement('div');
			tempulnode.innerHTML = pagerul[0];
			if (tempulnode.innerHTML != null) 
			{
				var nextpagenodes = tempulnode.getElementsByTagName("span");
				if (nextpagenodes[0] == null)
				{
					loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
					loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
				}
				for (var d = nextpagenodes.length - 1; d >= 0; --d)
				{
					if (nextpagenodes[d].className == "next")
					{
						if (nextpagenodes[d].firstChild != null)
						{
							nextpagelink = nextpagenodes[d].firstChild;
							LoadNextPage(nextpagelink.href);
							d = -1;
						}
						else
						{
							loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
							loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
						}
						
					}
					else if (d <= 0)
					{
						loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
						loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
					}
				}
			}
			else
			{
				loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
				loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
			}		
		}
		else
		{
			loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
			loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
			nextpagetop.href = nextpagelink.href;
			nextpagebot.href = nextpagelink.href;
			nextbuttop.style.visibility = 'visible';
			nextbutbot.style.visibility = 'visible';
            //var extraction2 = /\<section id\=\"search\-result\"([^]+?)\<\/section\>/.exec(document.documentElement.innerHTML);
		} 	
	} 
});

}