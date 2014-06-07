// ==UserScript==
// @name           Youtube Page Links
// @namespace      download
// @include        http://www.youtube.com*
// @include        https://www.youtube.com*
// ==/UserScript==


function anchorMatch(a)
{
	<object width="1280" height="10">
}

if(location.pathname.indexOf("/my_")==0)
{
	var l=document.querySelectorAll(".details>.video-thumb,.details>.title,.details img[onclick]"),a,i;
	for(var i=0;i<l.length;i++) l[i].removeAttribute("onclick");
	a=document.querySelectorAll(".pager>a");
	for(var i=0;i<a.length;i++)
	{
		var s=urlencode(location.search.substr(1));
		s["pi"]=a[i].getAttribute("onclick").match(/\((\d+)\)/)[1];
		a[i].setAttribute("href","?"+urldecode(s));
		a[i].removeAttribute("onclick");
	}
}

var menuItems=[{name:"Home",path:"/https://www.youtube.com/"},{name:"Videos",path:"/https://www.youtube.com/videos?feature=mh"},{name:"Channels",path:"/https://www.youtube.com/channels"},{name:"Music",path:"/https://www.youtube.com/music?feature=mh"}];
var m=document.querySelector(".yt-uix-button-menu tr").parentNode;
for(var i=0;i<menuItems.length;i+=2)
{
	var r=document.createElement("tr");
	r.appendChild(createMenuItem(menuItems[i]));
	r.appendChild(createMenuItem(menuItems[i+1]));
	m.appendChild(r);
}

function createMenuItem(item)
{
	var d=document.createElement("td");
	var a=document.createElement("a");
	a.setAttribute("class","yt-uix-button-menu-item");
	a.setAttribute("href",item.path);
	a.textContent=item.name;
	d.appendChild(a);
	return d;
}
function urlencode(s)
{
	if(!s) return {};
	var r={};
	s=s.split("&");
	for(var i in s)
	{
		var t=s[i].split("=");
		r[decodeURIComponent(t[0])]=decodeURIComponent(t[1]);
	}
	return r;
}
function urldecode(o)
{
	var r=[];
	for(var i in o)
	{
		r.push(encodeURIComponent(i)+"="+encodeURIComponent(o[i]));
	}
	return r.join("&");
}