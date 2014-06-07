// ==UserScript==
// @name           Scout.com Youtube Auto-Embed
// @namespace      Forest21
// @include        http://mbd.scout.com/mb.aspx?s=*
// @include	   http://forums.scout.com/mb.aspx?s=*
// ==/UserScript==

window.setTimeout(function(){

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

	var messages = getElementsByClassName("messagebody",document);
var movieBox;
var id;
var movieCounter = 1;

for(var i=0; i<messages.length; i++)
{
	var links = messages[i].getElementsByTagName("a");
	
	for(var j=0; j<links.length; j++)
	{
		var link = links[j].href;
		if(link.indexOf("youtube.com/watch")!=-1)
		{
			var parent = links[j].parentNode;
			
			var idPos = link.indexOf("v=")+2;
			id = link.substring(idPos);
			movieBox = document.createElement("div");
			movieBox.id="Movie"+movieCounter;
			
			movieBox.style.display = "block";
			movieBox.innerHTML = "<object width=\"425\" height=\"344\"><param name=\"movie\" value=\"http://www.youtube.com/v/"+id+"&hl=en&fs=1&rel=0\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/"+id+"&hl=en&fs=1&rel=0\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed></object>";
			
			hdMovieBox = document.createElement("div");
			hdMovieBox.style.display="none";
			hdMovieBox.id = "HDMovie"+movieCounter;
			hdMovieBox.innerHTML = "<object width=\"425\" height=\"344\"><param name=\"movie\" value=\"http://www.youtube.com/v/"+id+"&hl=en&fs=1&rel=0&ap=%2526fmt%3D18\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/"+id+"&hl=en&fs=1&rel=0&ap=%2526fmt%3D18\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed></object>";
			
			parent.insertBefore(movieBox,links[j].nextSibling);
			parent.insertBefore(hdMovieBox,links[j].nextSibling);
			
			var hdLink = document.createElement("a");
			hdLink.innerHTML = "(View HQ)";
			hdLink.id = movieCounter+"HDLink";
			hdLink.href="#Link"+movieCounter;
			hdLink.name="off";
			hdLink.style.color="gray";
			parent.insertBefore(hdLink,links[j].nextSibling);
			
			hdLink = document.getElementById(movieCounter+"HDLink");
			hdLink.addEventListener("click",hd,true);

			var space = document.createElement("span");
			space.innerHTML= " ";
			parent.insertBefore(space,links[j].nextSibling);

	
		}
	}

}


function hd()
{
var id = parseInt(this.id);
var box;
if(this.name == "off")
{
box = document.getElementById("HDMovie"+id);
box.style.display="block";
box = document.getElementById("Movie"+id);
box.style.display="none";
this.name = "on";
this.innerHTML = "(View Normal)";
}
else
{
box = document.getElementById("HDMovie"+id);
box.style.display="none";
box = document.getElementById("Movie"+id);
box.style.display="block";
this.name = "off";
this.innerHTML = "(View HQ)";
}
}

},2000);
