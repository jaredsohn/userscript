// ==UserScript==
// @name           Extended Preview
// @namespace      Forest21
// @include        http://mbd.scout.com/mb.aspx?s=*
// ==/UserScript==

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

window.setTimeout(function(){

var posts  = getElementsByClassName("forumtitle",document);

if(posts[0].getElementsByTagName("span").length == 0)
{
for(var i=0; i<posts.length; i++)
{

		var container = document.createElement("div");
		container.style.display="inline";
		container.style.position="relative";
		container.id = i+"_container";
		container.addEventListener("mouseover",togglePreview,true);
		container.addEventListener("mouseout",togglePreview,true);
	
		var url = posts[i].getElementsByTagName("a")[0].href;
		var preview = document.createElement("a");
		preview.name = url;
		preview.id = i+"_preview";
		preview.style.cursor="pointer";
		preview.innerHTML = "<img src='http://imgur.com/ht1E2.gif'/>";
		
		var hoverBox = document.createElement("div");
		hoverBox.id = i+"_hover";
		hoverBox.style.position="absolute";
		hoverBox.style.top="17px";
		hoverBox.style.width="750px";
		hoverBox.style.maxHeight="500px";
		hoverBox.style.display="none";
		hoverBox.style.overflow="auto";
		hoverBox.style.backgroundColor="#E5E5E5";
		hoverBox.style.border="1px solid #838383";
		hoverBox.style.padding="3px";
		hoverBox.style.fontWeight = "normal";
		hoverBox.style.zIndex = "5";
		hoverBox.innerHTML = "";

		posts[i].firstChild.insertBefore(container,posts[i].firstChild.firstChild);
		container.appendChild(preview);
		container.appendChild(hoverBox);
}
}

},2000);

var currentID = "-1";

function togglePreview()
{
	var id = this.id.substring(0,this.id.indexOf("_"));
	var hoverBox = document.getElementById(id+"_hover");
	var url = document.getElementById(id+"_preview").name;
	
	if(hoverBox.style.display == "block")
	{
		hoverBox.style.display = "none";
		currentID = "-1";
	}
	else
	{
		if(currentID != "-1")
		{
			var currentBox = document.getElementById(currentID+"_hover");
			currentBox.style.display = "none";
		}
		if(hoverBox.innerHTML == "")
		{	
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET",url,false);
			xhttp.send("");
			var text = xhttp.responseText;

			var start = text.indexOf("<![CDATA[")+9;
			var end = text.indexOf("]]>",start);
			text = text.substring(start,end);
			hoverBox.innerHTML = text;
		}

		hoverBox.style.display="block";
		currentID = id;
	}
}
