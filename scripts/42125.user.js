// ==UserScript==
// @name           Download Escapist Videos
// @namespace      download
// @include        http://www.escapistmagazine.com/videos/*
// ==/UserScript==

function downloadThis(e)
{
	e.preventDefault();
	var t=document.querySelector("#video_player_object>a");
	if(t)
	{
		//console.debug("link");
		t=t.getAttribute("href").match(/\((\d+),\'([a-z0-9]+)\'/);
		getById(t[1],t[2]);
	}
	else
	{
		//console.debug("embed");
		t=document.querySelector("#video_player_object>embed");
		if(t) getPlaylist(t.getAttribute("flashvars").substr(7));
		else
		{
			//console.debug("object");
			t=document.querySelector("#video_player_object param[name=flashvars]");
			if(t) getPlaylist(t.getAttribute("value").substr(7));
			else
			{
				//console.debug("param");
				t=document.querySelector("param[name=flashvars]");
				t&&(t=t.getAttribute("value"));
				if(t&&t.indexOf("config=")==0) getPlaylist(t.getAttribute("value").substr(7));
				else
				{
					//console.debug("manual");
					GM_xmlhttpRequest(
					{
						method:"GET",
						url:location.href,
						onload:function(r)
						{
							r=r.responseText;
							var a=r.match(/"flashvars" value="(.+?)"/);
							if(a) getPlaylist(a[1].substr(7));
							else
							{
								//console.debug("manual link");
								r=r.match(/video_player_object'><a href="(.+?)"/)[1];
								r=r.match(/\((\d+),\'([a-z0-9]+)\'/);
								getById(r[1],r[2]);
							}
							
						},
						onerror:function(e)
						{
							alert("Try again. If you keep getting this error go to the forum and ask for help.\n"+e.statusText);
						}
					});
				}
			}
		}
	}
	return false;
}
function getPlaylist(u)
{
	GM_xmlhttpRequest(
	{
		method:"POST",
		url:u,
		onload:function(r)
		{
			var t=JSON.parse(r.responseText.replace("'",'"',"g")).playlist[1].url;
			if(t.indexOf("rtmp")!=-1) alert(t+"\ndownload with rtmpdump (http://rtmpdump.mplayerhq.hu/)");
			else window.location.assign(t);
		},
		onerror:function(e)
		{
			alert("Error while requesting video.\n"+e.statusText);
		}
	});
}
function getById(num,id)
{
	GM_xmlhttpRequest(
	{
		method:"POST",
		url:"http://www.escapistmagazine.com/videos/ajax/embed_code.php/"+num,
		data:"hash="+id,
		headers:{"Content-Type":"application/x-www-form-urlencoded"},
		onload:function(r)
		{
			r=r.responseText;
			console.debug(r);
			getPlaylist(r.match(/flashvars="(.+?)"/)[1].substr(7));
		},
		onerror:function(e)
		{
			alert("Error while requesting video.\n"+e.statusText);
		}
	});
}

addEventListener("load",function(e)
{
	var a=document.createElement("a");
	a.appendChild(document.createTextNode("Download"));
	a.setAttribute("class","video_menu_link");
	a.setAttribute("href","#");
	a.addEventListener("click",downloadThis,false);
	document.getElementById("video_player_menu").appendChild(a);
	//I'm big on standards compliance in case you couldn't tell
},false);