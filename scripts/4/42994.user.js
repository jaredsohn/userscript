// ==UserScript==
// @name AutoLinks2Images
// @description Automatically turns all links to images into inlined images.
// @include				 http://boards.endoftheinter.net/showmessages*
// @include				 http://links.endoftheinter.net/linkme*
// @include				 https://boards.endoftheinter.net/showmessages*
// @include				 https://links.endoftheinter.net/linkme*
// @include				 http://archives.endoftheinter.net/showmessages*
// @include				 https://archives.endoftheinter.net/showmessages*
// ==/UserScript==

//based on citizenray's Links2Images

function ifsecure(url)
{
	if (url.indexOf("https://")==0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

var	htt="";
if (ifsecure(document.location.href))
{
	htt="https://";
}
else
{
	htt="http://";
}

var eyed=0;
var a=document.getElementsByTagName("a");
function change_images(as)
{
	var dots=as.href.split('.');
	switch (dots[dots.length-1].toLowerCase())
	{
		case 'jpg': case 'gif': case 'png': case 'bmp': case 'jpeg': 
		var sorce=as.href;
		eyed++;
		console.log(as.href);
		if (as.href.match("://images.endoftheinter.net")&&as.pathname.indexOf("/img/")==0)
		{
			console.log("hello");
			as.innerHTML="<img class='auto-loaded-image' id='loader_"+eyed+"' src='"+htt+"i1.endoftheinter.net/i/n/"+sorce.substring(sorce.indexOf("/img/")+5)+"' alt='["+sorce+"]' border=0>";
		}
		else
		{
			as.innerHTML="<img class='auto-loaded-image' id='loader_"+eyed+"' src='"+sorce+"' alt='["+sorce+"]' border=0>";
		}
		break;
		default: break;
	}
}

function nosig(post)
{
	var look=document.createElement('lol');
	look.innerHTML=post;
	look.innerHTML=look.innerHTML.substring(0,look.innerHTML.lastIndexOf("---<br>"));
	var a2=look.getElementsByTagName('a');
	return a2.length;
}

var post=document.getElementsByClassName('message');
for (var j=0; j<post.length; j++)
{
	var long=nosig(post[j].innerHTML);
	var as=post[j].getElementsByTagName('a');
	for (var i=0; i<long; i++)
	{
		if (as[i].className=='l')
		{
			change_images(as[i]);
		}
	}
}
if (window.location.pathname=="/linkme.php")
{
	for (var l=0;l<a.length;l++)
	{
		if (a[l].parentNode.className=="body")
		{
			change_images(a[l]);
		}
	}
}