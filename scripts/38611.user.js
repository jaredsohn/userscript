// ==UserScript==
// @name           Follow Member
// @namespace      Forest21
// @include        http://mbd.scout.com/mb.aspx?s=*
// @include        http://forums.scout.com/mb.aspx?s=*
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
var setup = GM_getValue("followInfo");
if(setup == null)
GM_setValue("followInfo","");
var members = getElementsByClassName("topicmemberinfo",document);
for(var i=0; i< members.length; i++)
{
var container = document.createElement("div");
container.style.padding = "1px";
container.style.marginTop = "3px";
container.name = i+"FollowContainer";
var followLink = document.createElement("a");
followLink.innerHTML = "Follow Member";
followLink.id=i+"Follow";
followLink.href = "#"+i+"FollowContainer";
var name = getElementsByClassName("profilelink",members[i])[0].firstChild.innerHTML;
followLink.name = name;
container.appendChild(followLink);
members[i].appendChild(container);
followLink = document.getElementById(i+"Follow");
followLink.addEventListener("click",toggleOptions,true);
var optionDiv = document.createElement("div");
optionDiv.id=i+"Options";
optionDiv.innerHTML = "Thread Color:<br>";
var colorSelect = document.createElement("select");
colorSelect.id=i+"ColorSelect";
colorSelect.style.marginBottom = "3px";
var colors = new Array("red","orange","yellow","green","blue","purple","grey","pink","brown");
var index = 0;
for(var j=0; j<colors.length; j++)
{
var toAdd = "";
if(colors[j] == getUsernameColor(name))
	index = j;
else if (getColorUsername(colors[j])!="")
	toAdd = " ("+getColorUsername(colors[j])+")";
colorSelect.innerHTML+="<option style='background:"+getRealColor(colors[j])+";' value='"+colors[j]+"'>"+colors[j]+toAdd+"</option>";
}

colorSelect.name = name;
optionDiv.appendChild(colorSelect);
optionDiv.style.display="none";
optionDiv.innerHTML +="<br>";

var saveMember = document.createElement("input");
saveMember.type="button";
saveMember.value = "Save";
saveMember.name = name;
saveMember.id=i+"Save";
optionDiv.appendChild(saveMember);


var cancelMember = document.createElement("input");
cancelMember.type="button";
cancelMember.value="Delete";
cancelMember.id=i+"Cancel";
cancelMember.name = name;
cancelMember.style.display="none";
optionDiv.appendChild(cancelMember);
if(checkStatus(name)=="true")
{
followLink.innerHTML="Follow Member Options";
container.style.background = getRealColor(getUsernameColor(name));
cancelMember.style.display="inline";
container.style.border = "1px solid black";
}


container.appendChild(optionDiv);
saveMember = document.getElementById(i+"Save");
saveMember.addEventListener("click",save,true);

cancelMember = document.getElementById(i+"Cancel");
cancelMember.addEventListener("click",cancel,true); 

colorSelect = document.getElementById(i+"ColorSelect");
colorSelect.selectedIndex=index;
}

var starters = document.getElementsByClassName("startedby",document);
for(var i=1; i<starters.length; i++)
{
var username = starters[i].firstChild.firstChild.innerHTML;

var color = getUsernameColor(username);
if(color != null)
{
	color = getRealColor(color);
	var thread = getElementsByClassName("forumtitle",starters[i].parentNode)[0];
	thread.parentNode.style.background = color;
}
}

function getColorUsername(col)
{
	var info = GM_getValue("followInfo").split(",");
	var infoName = "";
	for(var i=0; i<info.length-1; i++)
	{
		var infoColor = info[i].split("-")[0];
		if(col == infoColor)
			infoName = info[i].split("-")[1];
	
	}
	return infoName;
}

function checkStatus(user)
{
var status = "false";
var info = GM_getValue("followInfo").split(",");
for(var i=0; i<info.length-1; i++)
{
	var infoName = info[i].split("-")[1];
	if(user == infoName)
		status = "true";
	
}
return status;
}

function getUsernameColor(user)
{
var info = GM_getValue("followInfo").split(",");
var infoColor = "";
for(var i=0; i<info.length-1; i++)
{
	var infoName = info[i].split("-")[1];
	if(user == infoName)
		infoColor = info[i].split("-")[0];
	
}
return infoColor;
}

function cancel()
{
var id = this.id;
var user = this.name;
var infoString = GM_getValue("followInfo");
var infoArray = infoString.split(",");
for(var i=0; i<infoArray.length-1; i++)
{
	if(infoArray[i].split("-")[1] == user)
		infoString = infoString.replace(infoArray[i]+",","");
}
if(confirm("Do you want to stop following "+user+"?")){
GM_setValue("followInfo",infoString);
alert("You have stopped following "+user);
window.location.reload();
}
}

function getRealColor(original)
{
var newColor = original;
	if(original == "green")
		newColor = "limegreen";
	else if (original == "blue")
		newColor = "lightblue";
	else if (original == "purple")
		newColor = "orchid";
	else if (original == "grey")
		newColor = "lightgrey";
	else if (original == "pink")
		newColor = "HotPink";
	else if (original == "brown")
		newColor = "Khaki";

return newColor;
}

function save()
{
var id = parseInt(this.id);
var member = this.name;
var colorlist = document.getElementById(id+"ColorSelect");
var color = colorlist.options[colorlist.selectedIndex].value;

var repeated = "false";
var colorString = GM_getValue("followInfo");
colorArray = colorString.split(",");
for(var i=0; i<colorArray.length-1; i++)
{
if(colorArray[i].split("-")[0] == color)
	repeated = "true";
if(colorArray[i].split("-")[1] == member&&repeated!="true")
	colorString = colorString.replace(colorArray[i]+",","");
}


if (repeated=="false")
{
colorString+=color+"-"+member+",";
GM_setValue("followInfo",colorString);
alert("This member's theads will now appear "+color);
window.location.reload();
}
else
	alert("This color is already in use");

}

function toggleOptions()
{
var id = parseInt(this.id);
var options = document.getElementById(id+"Options");
if(options.style.display=="none")
	options.style.display="block";
else if(options.style.display=="block")
	options.style.display="none";
}

},2000);