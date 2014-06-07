// ==UserScript==
// @name           PlayLister
// @namespace      download
// @description    Adds download links to Project Playlist
// @include        http://playlist.com/*
// @include        http://*.playlist.com/*
// ==/UserScript==

var sbox;
function init(pwd)
{
	var a=0,b,mk=[],i;
	for(i=0;i<=255;i++)
	{
		mk[i]=pwd[i%pwd.length];
		sbox[i]=i;
	}
	for(i=0;i<=255;i++)
	{
		a=(a+sbox[i]+mk[i])%256;
		b=sbox[i];
		sbox[i]=sbox[a];
		sbox[a]=b;
	}
}
function calc(plaintxt,psw)
{
	sbox=[];
	init(psw);
	var a=0,b=0,c=[],d,e,i;
	for(i=0;i<plaintxt.length;i++)
	{
		a=(a+1)%256;
		b=(b+sbox[a])%256;
		e=sbox[a];
		sbox[a]=sbox[b];
		sbox[b]=e;
		d=sbox[(sbox[a]+sbox[b])%256];
		c.push(plaintxt[i]^d);
	}
	return c;
}
function decrypt(src,key)
{
	var plaintxt=[],psw=[],r="",i;
	for(i=0;i<src.length;i+=2) plaintxt.push(parseInt(src.substr(i,2),16));
	for(i=0;i<key.length;i++) psw.push(key.charCodeAt(i));
	var chars=calc(plaintxt,psw);
	for(i=0;i<chars.length;i++) r+=String.fromCharCode(chars[i]);
	return r;
}

addEventListener("load",function()
{
	if(/^http:\/\/[.a-zA-Z0-9_-]*\.playlist\.com\/searchbeta\/tracks/.test(location.href))
	{
		if(!unsafeWindow.PPL) return;
		var c=unsafeWindow.PPL.search.searchResultsFn.split("."); //PPL.search.processSearch at last check
		var f=unsafeWindow,p=null,n;
		for(var i=0;i<c.length;i++)
		{
			p=f;
			n=c[i];
			f=p[n];
		}
		p[n]=function()
		{
			var r=null;
			try{r=f.apply(this,arguments)}catch(e){}
			var td=unsafeWindow.PPL.search.trackdata;
			if(td)
			{
				var links=document.getElementsByClassName("visit-site-url");
				for(var i=0;i<links.length;i++)
				{
					var t=links[i];
					t.setAttribute("href",decrypt(td[i].song_url,"sdf883jsdf22"));
					while(t.childNodes.length>0) t.removeChild(t.childNodes[0]);
					t.appendChild(document.createTextNode("Download"));
				}
			}
			return r;
		}
	}
	else if(/^http:\/\/[.a-zA-Z0-9_-]*\.playlist\.com\/playlist\//.test(location.href))
	{
		if(!unsafeWindow.ppl_swfobject_flashvars) return;
		var fl=unsafeWindow.ppl_swfobject_flashvars;
		GM_xmlhttpRequest(
		{
			method:"GET",
			url:decodeURIComponent(fl.domain_pre_xspf)+fl.playlist_id,
			onload:function(r)
			{
				var p=new DOMParser();
				var tracks=p.parseFromString(r.responseText,"text/xml").getElementsByTagName("track");
				var a=document.createElement("div");
				a.style.marginBottom="20px";
				a.style.fontSize="10pt";
				a.appendChild(document.createTextNode("Download Links"));
				a.appendChild(document.createElement("br"));
				for(var i=0;i<tracks.length;i++)
				{
					var t=tracks[i];
					if(t.getAttribute("status")!="1") continue;
					var link=decrypt(t.querySelector("location").textContent,"sdf883jsdf22");
					var name=t.querySelector("artist").textContent+" - "+t.querySelector("tracktitle").textContent;
					var l=document.createElement("a");
					l.setAttribute("href",link);
					l.appendChild(document.createTextNode(name));
					a.appendChild(l);
					a.appendChild(document.createElement("br"));
				}
				var pd=document.getElementById("playlist-details");
				pd.parentNode.insertBefore(a,pd);
			},
			onerror:function(e){console.debug(e);}
		});
	}
},false);