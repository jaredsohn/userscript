// ==UserScript==
// @name           Quick Quote
// @namespace      Scout.com
// @include        http://mbd.scout.com/* 
// ==/UserScript==

window.setTimeout(function() {

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

var textbox = document.getElementById("quickreplytext");

if(textbox)
{
	var qqAnchor = document.createElement("a");
	qqAnchor.name="QQ";
	textbox.parentNode.appendChild(qqAnchor);

	var names = getElementsByClassName("username",document);
	var messages = getElementsByClassName("messagebody",document);
	var actionLinks = getElementsByClassName("actionlinks",document);
	var place = 1;
	var link;

	for(var i=0; i<names.length; i++)
	{
		link = document.createElement("a");
		link.href="#QQ";
		link.id = i+"QQ";
		link.innerHTML="Quick Quote";

		actionLinks[place].innerHTML+=" | ";
		actionLinks[place].appendChild(link);
		place+=2;

		link = document.getElementById(i+"QQ");
		link.addEventListener("click",qq,true);
	}
}

function qq()
{
	var box = document.getElementById("quickreply");
	if(box)
		box.style.display="block";
	
	var id = parseInt(this.id);
	var message ="";
	message = "<blockquote dir=\"ltr\"><strong>"+names[id].firstChild.firstChild.innerHTML+" wrote:</strong> "+messages[id].innerHTML+"</blockquote>\n";
	
	var re = /(<img([^>]+)>)/gi;
	var images = message.match(re);
	if(images)
	{
		for(var i=0; i<images.length; i++)
		{
			images[i]=images[i].substring(0,images[i].length-1)+"/>";
			message = message.replace(/(<img([^>]+)>)/i,images[i]);
		}
	}

	textbox.focus();
	textbox.value += message;
};


},2000);