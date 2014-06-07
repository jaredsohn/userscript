// ==UserScript==
// @name          Greasefilter
// @namespace     http://users.linkfilter.net/~deathburger/
// @description	  A collection of enhancements for linkfilter.net
// @include       http://linkfilter.net/*
// @include       http://*.linkfilter.net/*
// @exclude       http://beta.linkfilter.net/*
// ==/UserScript==

/*
   Created by: deathburger
   Initial creation: 05/31/2005
   Last modification: 06/08/2005

   This is every tested and functional Greasemonkey script for linkfilter.net
   rolled into one. Buggy scripts and those that require further testing are NOT
   included.

   All comments save this one have been removed from the script, to cut down on size.
*/
(function() {
  window.addEventListener("load", function(e) {

var gfversion = 0.6
if(location.href.indexOf("http://users.linkfilter.net/") != -1)
{
    document.getElementById("gfuserver").firstChild.nodeValue = gfversion;
    return;
}
if(readCookie("greasefilter"))
{
    var module = "";
    var gfcookie = readCookie("greasefilter").split(",");
    for(var gfi=0;gfi < gfcookie.length;++gfi)
    {
	module = gfcookie[gfi].split(":");
	switch (module[0])
	{
	  case "rdrobot": rdrobot(); break;
	  case "rdlogo": rdlogo(); break;
	  case "fixwwwlinks": fixwwwlinks(); break;
	  case "expandlfinputboxes": expandlfinputboxes(); break;
	  case "categoryimages": categoryimages(); break;
	  case "background": lfbackground(module[1]); break;
	  case "imagewidth": imagewidth(); break;
	  case "userhighlight": userhighlight(); break;
	  case "roundedinputs": roundedinputs(); break;
	  case "enforcelimits": enforcelimits(); break;
	  case "inputmatch": inputmatch(); break;
	  default: break;
	}
    }
}
function rdrobot()
{
    var imgs = document.getElementsByTagName('img');
    var i,x;
    for(i=0;x=imgs[i];++i)
    {
	if(x.getAttribute('src') == 'http://www.linkfilter.net/skin/robotdreams/robot222.jpg')
	{
	    x.setAttribute('src','http://users.linkfilter.net/~deathburger/images/robot.png');
	    x.setAttribute("alt","A robot working."); x.setAttribute("title","A robot working.");
	    return;
	}
	if(i == imgs.length)
	    break;
    }
}
function rdlogo()
{
    var imgs = document.getElementsByTagName('img');
    var i,x;
    for(i=0;x=imgs[i];++i)
    {
	if(x.getAttribute('src') == 'http://www.linkfilter.net/skin/robotdreams/logoNEW.gif')
	{
	    x.setAttribute('src','http://users.linkfilter.net/~deathburger/images/logoDB3.png');
	    return;
	}
	if(i == imgs.length)
	    break;
    }
}
function fixwwwlinks()
{
    var links = document.getElementsByTagName("a");
    var i,a;
    for(i=0;a=links[i];++i)
    {
	if(document.location.href.indexOf("http://linkfilter.net") > -1)
	{
	    if(a.href.indexOf("http://www.linkfilter.net") > -1)
		a.href = replace(a.href,"www.linkfilter.net","linkfilter.net");
	}
	else
	{
	    if(a.href.indexOf("http://linkfilter.net") > -1)
		a.href = replace(a.href,"linkfilter.net","www.linkfilter.net");
	}
	if(i == links.length)
	    break;
    }
}
function expandlfinputboxes()
{
    var i,x;
    if(x=document.getElementsByTagName("textarea")[0])
    {
	x.rows=20;
	x.cols=80;
    }
    var inputs = document.getElementsByTagName("input");
    for(i=0;x=inputs[i];++i)
    {
	if((x.name.indexOf("subject") > -1)
	 ||(x.name.indexOf("title") > -1)
	 ||(x.name.indexOf("url") > -1))
	{
	    x.size=80;
	}
	if(x.getAttribute("name") == "search"
	   || x.getAttribute("name") == "q"
	   || x.getAttribute("name") == "edate"
	   || x.getAttribute("name") == "user")
	{
	    x.setAttribute("style","width:85%;");
	}
	if(i == inputs.length)
	    break;
    }
}
function categoryimages()
{
    var cats = document.getElementsByTagName('a')
    var i,link;
    for(i=0;link=cats[i];++i)
    {
	if(link && link.getAttribute("href"))
	{
	    if(link.getAttribute("href").indexOf("/?category=") == -1)
		continue;
	    var cat = new Array();
	    cat = link.getAttribute("href").split("=");
	    var image = document.createElement("img");
	    image.setAttribute("border","0");
	    image.setAttribute("title",link.firstChild.nodeValue);
	    image.setAttribute("alt",link.firstChild.nodeValue);
	    image.setAttribute("src","http://users.linkfilter.net/~deathburger/greasy/images/"+cat[1]+".png");
	    link.replaceChild(image,link.firstChild);
	}
	if(i == cats.length)
	    break;
    }
}
function lfbackground(num)
{
    var image = "http://users.linkfilter.net/~deathburger/greasefilter/bg/"+parseInt(num)+".jpg";
    document.body.style.background="url('"+image+"') "+document.body.getAttribute("bgcolor")+" center no-repeat fixed";
}
function imagewidth()
{
    var imgs = document.getElementsByTagName("img");
    var img,i;
    for(i=0; img=imgs[i]; ++i)
    {
	if(img.width <= 640 || img.getAttribute("class") == "noresize")
	    continue;
	img.setAttribute("onclick","if(width == 640){removeAttribute('width')}else{width=640}");
	img.setAttribute("alt","Image resized, click to toggle sizes");
	if(img.getAttribute("height"))
	    img.removeAttribute("height");
	img.onclick();
	if(img.parentNode.nodeName == "A")
	{
	    var linkurl = img.parentNode.getAttribute("href");
	    var imgfn = linkurl.split("/");
	    img.parentNode.removeAttribute("href");
	    var a = document.createElement("a");
	    a.setAttribute("title","Image link added by Greasefilter");
	    a.setAttribute("target","_blank");
	    a.setAttribute("href",linkurl);
	    if(imgfn[imgfn.length-1].indexOf(".jpg") == -1
	      && imgfn[imgfn.length-1].indexOf(".gif") == -1
	      && imgfn[imgfn.length-1].indexOf(".bmp") == -1
	      && imgfn[imgfn.length-1].indexOf(".png") == -1)
	    {
		a.appendChild(document.createTextNode("-=[ image link to webpage ]=-"));
	    }
	    else
	    {
		a.appendChild(document.createTextNode("-=[ image link: "+ imgfn[imgfn.length-1] +" ]=-"));
	    }
	    img.parentNode.insertBefore(document.createElement("br"),img.nextSibling);
	    img.parentNode.insertBefore(a,img.nextSibling.nextSibling);
	}
	if(i == imgs.length)
	    break;
    }
}
function userhighlight()
{
    var tds = document.getElementsByTagName("td");
    var td, tbody, i, x;
    var found = false;
    for(i=0; td = tds[i]; ++i)
    {
	if(td.getAttribute("class") == "title-small" && td.firstChild.getAttribute("href") == "/?s=u;sort=login")
	{
	    found = true;
	    tbody = td.parentNode.parentNode;
	    break;
	}
	if(i == tds.length)
	    break;
    }
    if(!found)
	return;
    for(i=0; x=tbody.childNodes[i]; ++i)
    {
	if(x.nodeName != "TR" || x.getAttribute("align") == "left")
	    continue;
	x.setAttribute("class","highlight");
	if(i == tbody.childNodes.length)
	    break;
    }
    document.injectCSS("tr.highlight:hover{background-color: #eef;}");
}
function roundedinputs()
{
    document.injectCSS("\
	textarea{\
		margin:4px;\
		border: 1px solid black;\
		-moz-border-radius: 12px;\
		padding-left: 4px;\
		padding-right: 4px;\
		padding-top: 2px;\
		padding-bottom: 2px;\
	}\
	input.rounded{\
		margin:4px;\
		border: 1px solid black;\
		-moz-border-radius: 8px;\
		padding-left: 4px;\
		padding-right: 4px;\
		padding-top: 2px;\
		padding-bottom: 2px;\
	}\
    ");
    var input,i;
    var inputs = document.getElementsByTagName("input");
    for(i=0;input = inputs[i];++i)
    {
	if(input.getAttribute("type") != "radio")
	    input.setAttribute("class","rounded");
	if(i == inputs.length)
	    break;
    }
}
function enforcelimits()
{
    var i, posttype;
    var c=false;
    var j=false;
    var p=false;
    var link=false;
    var inputs = document.getElementsByTagName("input");
    for(i=0; posttype=inputs[i]; ++i)
    {
	if(posttype.getAttribute("type") == "hidden")
	{
	    var postv = posttype.getAttribute("value");
	    if(postv == "post"){link = true;}
	    if(postv == "c"){c=true;break;}
	    else if(postv == "j"){j=true;break;}
	    else if(postv == "p"){p=true;break;}
	}
	if(i == inputs.length)
	    break;
    }

    if(c)
    {
	var input;
	for(i=0; input = inputs[i]; ++i)
	{
	    if(input.getAttribute("name") == "subject")
	    {
		input.setAttribute("maxlength","100");
		if(input.value.length > 100)
		{
		    alert("Subject too long, the limit is 100 characters.\n\""
			+input.value.substring(101, input.value.length)
			+"\" has been removed.");
		    input.value = input.value.substring(0, 100);
		}
	    }
	    if(i == inputs.length)
		break;
	}
    }
    else if(p){return;}
    else if(j || link)
    {
	var input;
 	for(i=0; input = inputs[i]; ++i)
	{
	    if(input.getAttribute("name") == "title")
	    {
		var maxlength = j ? 255 : 60;
		input.setAttribute("maxlength", maxlength);
		if(input.value.length > maxlength)
		{
		    alert("Title too long, the limit is "
			+(j ? 255 : 60)+" characters.\n\""
			+input.value.substring(j ? 256 : 61, input.value.length)
			+"\" has been removed.");
		    input.value = input.value.substring(0, maxlength);
		}
	    }
	    if(i == inputs.length)
		break;
	}
    }
    else{return;}
}

function inputmatch()
{
    switch (readCookie("lfskin"))
    {
	case "robotdreams" : color = "#996633"; break;
	case "robot" : color = "#996633"; break;
	case "lcd" : color = "#445566"; break;
	case "tangerine" : color = "#660000"; break;
	case "classic" : color = "#537b87"; break;
	case "digital" : color = "#cccccc"; break;
	case "digitalsnow" : color = "#000088"; break;
	case "lain" : color = "#7388C8"; break;
	case "stripped" : color = "green"; break;
/*	case "" : color = "#"; break;*/
	default: color = "grey"; break;
    }
    document.injectCSS("\
	input,input.rounded{\
		border:2px inset "+color+";\
		border-top:4px groove "+color+";\
		border-left:4px groove "+color+";\
	}\
	input[type=\"button\"]{\
		border:1px solid black\
	}\
	input[type=\"submit\"]{\
		border:1px solid black\
	}\
	textarea{\
		border:2px inset "+color+";\
		border-top:4px groove "+color+";\
		border-left:4px groove "+color+";\
	}\
    ");
}
  }, false);
})();

// Utility functions
function replace(string,text,by)
{
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0))
	return string;
    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength)))
	return string;
    if (i == -1)
	return string;
    var newstr = string.substring(0,i) + by;
    if (i+txtLength < strLength)
	newstr += replace(string.substring(i+txtLength,strLength),text,by);
    return newstr;
}
function preloadImages()
{
    for (i=0; i<preloadImages.arguments.length; i++)
	(new Image()).src = preloadImages.arguments[i];
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
document.injectCSS = function(css)
{
    head = document.getElementsByTagName("head")[0];
    script = document.createElement("style");
    script.setAttribute("type", 'text/css');
    script.innerHTML = css;
    head.appendChild(script);
}
