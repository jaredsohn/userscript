// ==UserScript==
// @name          YouTube main page changer
// @namespace     devulpes
// @description   Organise new videos by uploader
// @include       http://www.youtube.com/
// @version       0.5
// ==/UserScript==


function getUserName()
{
	return (document.getElementsByClassName("masthead-user-username")[0].innerHTML);
}

function getFeedContainer()
{
	if (document.getElementsByClassName("feed-container")[0].getAttribute("data-filter-type") == "u")
	{
		return document.getElementsByClassName("feed-container")[0];
	}
	else
	{
		document.getElementById("feed-system-all").innerHTML += '<div class="feed-container hid" data-paging="30" data-filter-type="u" style="display: none">';
		return document.getElementsByClassName("feed-container")[1];
	}
}

function getUserSubscriptions(userName)
{
	var feedContainer = getFeedContainer();
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState < 4)
			//document.getElementById("baseDiv").innerHTML = "<h1>Working...</h1>";
			feedContainer.innerHTML = "<h1>Working...</h1>";
		else if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			obj = JSON.parse(xmlhttp.responseText);
			//document.getElementById("baseDiv").innerHTML = "";
			feedContainer.innerHTML = "";
			try{
			for (x in obj.data.items)
			{
				//alert(obj.data.items[x].uploader);
				if (!(document.getElementById("video_"+obj.data.items[x].uploader)))
				{
					//document.getElementById("baseDiv").innerHTML += '<div style="" id="video_'+obj.data.items[x].uploader+'"><h1>'+obj.data.items[x].uploader+'</h1></div>';
					feedContainer.innerHTML += '<div class="feed-item" id="video_'+obj.data.items[x].uploader+'"><h3 class="feed-item-title"><span class="feed-item-owner"><a href="/user/'+obj.data.items[x].uploader+'" class="yt-user-name">'+obj.data.items[x].uploader+'</a></span></h3></div>';
				}
				document.getElementById("video_"+obj.data.items[x].uploader).innerHTML += '<div style="display: inline-block; vertical-align: top; width:120px"><a href="'+obj.data.items[x].player.default+'"><img src="'+obj.data.items[x].thumbnail.sqDefault+'"/><span style="width:120px">'+obj.data.items[x].title+'</span></a></div>';
				//document.getElementById("video_"+obj.data.items[x].uploader).innerHTML += '<h2><a href="'+obj.data.items[x].player.default+'">'+obj.data.items[x].title+'</a></h2>';
			}
			}
			catch(e)
			{alert(e);}
			//document.body.innerHTML = xmlhttp.responseText;
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200)
		{
			//document.getElementById("baseDiv").innerHTML = "<h1>Returned error"+xml.status+"</h1>";
			feedContainer.innerHTML = "<h1>Returned error"+xml.status+"</h1>";
		}
	}
	xmlhttp.open("GET","http://gdata.youtube.com/feeds/api/users/"+userName+"/newsubscriptionvideos?v=2&alt=jsonc&max-results=50",true);
	xmlhttp.send();
}

try
{
	var userName = getUserName();
	getUserSubscriptions(userName);
}
catch(e)
{
	alert(e);
}