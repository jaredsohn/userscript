// ==UserScript==
// @name           SuperGruse
// @namespace      //
// @include        *.deviantart.com/
// @include	   *.deviantArt.com/#
// @exclude        http://chat.deviantart.com
// @exclude        http://browse.deviantart.com
// @version        0.1.4
// ==/UserScript==

var updateGruse = function(elem, dragTo)
{
	var cookie = unsafeWindow.document.cookie;
	var postDat = "ui="+cookie.split("userinfo=")[1].split(";")[0] + "&c%5B%5D=%22GrusersModules%22%2C%22positionModule%22%2C%5B%22"+elem.gruseID+"%22%2C%22"+elem.pageID+"%22%2C%22"+elem.gmiID+"%22%2C%22"+dragTo.col+"%22%2C"+dragTo.position+"%2C"+elem.position+"%5D&t=json";
	console.log(postDat);


	GM_xmlhttpRequest({
		method:"POST",
		url: window.location.toString().split("#")[0]+"/global/difi/?",
		data: postDat,	
		headers: {
			"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
			"Cookie" : cookie
		},
	
		onload: function(res)
		{
			console.log(res.responseText);
			window.location = window.location.toString().split("#")[0];
		}
	});
}

var nodeUp = function(node, toID)
{
	while(node.getAttribute("id") != toID)
	{
		node = node.parentNode;
	}
	return node;
}

var fromElem;
var toElem

var setElem = function(node)
{
	fromElem = {
		gruseID : node.getAttribute("gmi-gruser_id"),
		pageID : document.getElementById("gmi-GPage").getAttribute("gmi-id"),
		gmiID : node.getAttribute("gmi-id"),
		position : node.getAttribute("gmi-position")
	}
}
var setToElem = function(node)
{
	toElem = {
		col : node.parentNode.getAttribute("gmi-name"),
		position : node.getAttribute("gmi-position")
	}
}

var clickUp = function(eventHandle)
{
if(GM_getValue("allowEdit") == "true")
{

	var x = eventHandle.clientX - 21;
	var y = eventHandle.clientY - 21;
	var node = document.elementFromPoint(x, y);
	node = nodeUp(node, "gmi-GMFrame_Gruser");
	setToElem(node);
	console.log(fromElem.gruseID +", "+fromElem.pageID+"," + toElem.col);
	window.onmousemove = function(){};
	updateGruse(fromElem, toElem);
	
}
}

var clickDown = function(eventHandle)
{
if(GM_getValue("allowEdit") == "true")
{

	var x = eventHandle.clientX;
	var y = eventHandle.clientY;
	var node = document.elementFromPoint(x, y);
	console.log(eventHandle.offsetX);
	var offset = {x : eventHandle.offsetX, y : eventHandle.offsetY};
	node = nodeUp(node, "gmi-GMFrame_Gruser");
	setElem(node);
	node.setAttribute("class",  node.getAttribute("class") + " drag");
	node.style.zIndex = 999;
	node.style.width = ((window.innerWidth/2) - 32) + "px";
	//node.style.top = y + "px";
	//node.style.left = x + "px";
	node.style.opacity = 0.8;
	node.addEventListener("mouseup", function(){node.setAttribute("class", node.getAttribute("class").split(" drag")[0]);}, true);
	window.onmousemove = function(eventHandle){mouseMover(eventHandle, offset, node)};

}
}

var mouseMover = function(eventHandle, offset, node)
{
	console.log(eventHandle.clientX + ", " + offset.x);
	node.style.position = "absolute";
	node.style.top = ((eventHandle.clientY + window.scrollY) - 20) + "px";
	node.style.left = (eventHandle.clientX - 20) + "px";

}

var styler = function()
{
	//var container = document.getElementById("aboutme-bio");
	var spans = document.getElementsByTagName("span");
	console.log(spans.length);
	var sheet = document.createElement("link");
	sheet.setAttribute("id", "userstyle");
	sheet.setAttribute("rel", "stylesheet");

	for(var i = 0; i < spans.length; i++)
	{
		console.log(spans[i].className);
		if(spans[i].className == "abbr" && spans[i].getAttribute("title").indexOf("stylesheet") > -1)
		{
			sheet.setAttribute("href", spans[i].getAttribute("title").split("stylesheet:")[1]);
		}
	}
	document.getElementsByTagName("body")[0].appendChild(sheet);
	
	var clearStyle = null;
	var elem  =  document.getElementById("remStyle");
	if(!elem)
	{
		clearStyle = document.createElement("a");
		clearStyle.className = "gmhyper gmbutton2 gmbutton2qn2r";
		clearStyle.setAttribute("id", "remStyle");
		clearStyle.setAttribute("href", "#");
		var buttonTown = (window.location.toString().indexOf(unsafeWindow.deviantART.deviant.username) > -1) ? document.getElementById("master-editbutton").parentNode : document.getElementById("send-a-note").parentNode;
		buttonTown.appendChild(clearStyle);
	}
	else
	{
		clearStyle = elem;
		clearStyle.removeEventListener("click", styler);
	}
	clearStyle.innerHTML="<i class=\"icon i44\"></i>Toggle Style<b></b>"
	clearStyle.addEventListener("click", stopStyle);
	

}


var stopStyle = function()
{
	var style = document.getElementById("userstyle");
	document.getElementsByTagName("body")[0].removeChild(style);
	var button = document.getElementById("remStyle");
	button.innerHTML="<i class=\"icon i43\"></i>Toggle Style<b></b>";
	button.href="#";
	button.removeEventListener("click", stopStyle);
	button.addEventListener("click", styler);

}


var editButton = function()
{
	var button = document.createElement("a")
	if(GM_getValue("allowEdit") == "false")
	{
		button.className = "gmHyper gmbutton2 gmbutton2qn2r";
		button.innerHTML = "<i class=\"icon i15\"></i>Edit Page<b></b>";
	}
	else
	{
		button.className = "gmHyper gmbutton2qn2r gmbutton2";
		button.innerHTML = "<i class=\"icon i0\"></i>Save<b></b>";
	}
	button.href="#";
	var oldButton = document.getElementById("master-editbutton");
	if(oldButton != null)
	{
	oldButton.innerHTML = "<i class=\"icon i15\"></i>Add box<b></b>";
	
	var buttonTown = oldButton.parentNode;

	buttonTown.appendChild(button);
	button.addEventListener("mousedown", function(){toggleEdit()}, true);
	}
}
var toggleEdit = function()
{
	if(GM_getValue("allowEdit") == "true")
	{
		GM_setValue("allowEdit", "false");
	}
	else
	{
		GM_setValue("allowEdit", "true");
	}
	window.location = window.location.toString().split("#")[0];
}

var helpBox = function()
{
	if(GM_getValue("allowEdit") == "true")
	{
	GM_addStyle("#helpBox{background: rgba(0,0,0,0.5); color: #999; text-align: center; width: 100%; height: 32px; position:fixed; top:100%; margin-top:-32px; padding-top:10px;}");
	var box = document.createElement("div");
	box.setAttribute("id", "helpBox");
	box.innerHTML = "Drag a box over another box to swap them!";
	document.getElementsByTagName("body")[0].appendChild(box);
	}
}

if(GM_getValue("allowEdit") == null || GM_getValue("allowEdit").length < 1)
{
	GM_setValue("allowEdit", "false");
}


editButton(); styler(); helpBox();
window.onmousedown = clickDown;
window.onmouseup = clickUp;

