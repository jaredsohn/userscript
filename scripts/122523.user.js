// ==UserScript==
// @name           NASA Spacefight Forum Enhancements
// @namespace      v1
// @include        *forum.nasaspaceflight.com*
// ==/UserScript==


var ignorelist = [];

function loadIgnoreList()
{
	var strignorelist = GM_getValue("ignorelist");
	if (strignorelist)
		ignorelist = strignorelist.split(",");
	else
		ignorelist = [];
}

function saveIgnoreList()
{
	GM_setValue("ignorelist", ignorelist.join(","));
}

function ignoring(username)
{
	for (var i = 0; i < ignorelist.length; i++)
		if (ignorelist[i] == username)
			return true;
	return false;
}

function addIgnoreButtons(username, msgid)
{
	var footer = document.getElementById(msgid + "_footer");
	if (footer == null)
		return;
	var as = footer.getElementsByTagName("a");
	var a = null;
	for (var j = 0; j < as.length; j++)
		if (as[j].innerHTML == "Ignore this user" ||
		    as[j].innerHTML == "Stop ignoring this user")
		{
			a = as[j];			
			break;
		}

	if (a == null)
	{
		var ir = 0;
		for (var j = 0; j < as.length; j++)
			if (as[j].innerHTML == "Report to moderator")
			{
				ir = j;
				break;
			}

		a = document.createElement("a");
		a.href = "#";
		var t = document.createTextNode(" - ");
		as[ir].parentNode.insertBefore(t,as[ir]);	
		as[ir].parentNode.insertBefore(a,t);

		var obj = [];
		obj.handleEvent = function(e) 
		{
			e.preventDefault(); 
			ignorer(username);
		}
		a.addEventListener("click", obj, true);
	}

	if (ignoring(username))
		a.innerHTML = "Stop ignoring this user";
	else
		a.innerHTML = "Ignore this user";

	var expand = document.getElementById(msgid + "_expand");
	if (expand == null)
	{
		expand = document.createElement("div");
		expand.id = msgid + "_expand";
		var quickmod = document.getElementById(msgid + "_quick_mod");
		quickmod.parentNode.appendChild(expand);
		var ea = document.createElement("a");
		ea.href="#";
		ea.innerHTML = "Expand this comment";
		expand.appendChild(ea);
		var obj = [];
		obj.handleEvent = function(e) 
		{
			e.preventDefault(); 
			expander(msgid);
		}
		ea.addEventListener("click", obj, true);
		expand.style.display = "none";
	}

	var collapse = document.getElementById(msgid + "_collapse");
	if (collapse == null)
	{
		collapse = document.createElement("div");
		collapse.id = msgid + "_collapse";
		var quickmod = document.getElementById(msgid + "_quick_mod");
		quickmod.parentNode.appendChild(collapse);
		var ea = document.createElement("a");
		ea.href="#";
		ea.innerHTML = "Collapse this comment";
		collapse.appendChild(ea);
		var obj = [];
		obj.handleEvent = function(e) 
		{
			e.preventDefault(); 
			collapser(msgid);
		}
		ea.addEventListener("click", obj, true);	
	}
}

function ignorer(username)
{
	for (var i = 0; i < ignorelist.length; i++)
		if (ignorelist[i] == username)
		{
			ignorelist.splice(i, 1);
			saveIgnoreList();
			applyIgnoreList(username);	
			return;
		}
	ignorelist.push(username);
	saveIgnoreList();
	applyIgnoreList();
}

function expander(msgid)
{
	var div_msg = document.getElementById(msgid);
	var div_extra_info = document.getElementById(msgid + "_extra_info");
	var quickmod = document.getElementById(msgid + "_quick_mod");
	var footer = document.getElementById(msgid + "_footer");
	if (div_msg == null || div_extra_info == null || quickmod == null || footer == null)
		return;

	var expand = document.getElementById(msgid + "_expand");
	expand.style.display = "none";
	var collapse = document.getElementById(msgid + "_collapse");
	collapse.style.display = "block";

	quickmod.style.display = "block";
	div_extra_info.style.display = "block";
	div_msg.style.display = "block";
	footer.style.display = "block";
	var hrs = div_msg.parentNode.getElementsByTagName("hr");
	for (var j = 0; j < hrs.length; j++)
		hrs[j].style.display = "block";
	
}

function collapser(msgid)
{
	var div_msg = document.getElementById(msgid);
	var div_extra_info = document.getElementById(msgid + "_extra_info");
	var quickmod = document.getElementById(msgid + "_quick_mod");
	if (div_msg == null || div_extra_info == null || quickmod == null)
		return;

	var expand = document.getElementById(msgid + "_expand");
	expand.style.display = "block";
	var collapse = document.getElementById(msgid + "_collapse");
	collapse.style.display = "none";

	quickmod.style.display = "none";
	div_extra_info.style.display = "none";
	div_msg.style.display = "none";
	var footer = document.getElementById(msgid + "_footer");
	if (footer)
		footer.style.display = "none";
	var hrs = div_msg.parentNode.getElementsByTagName("hr");
	for (var j = 0; j < hrs.length; j++)
		hrs[j].style.display = "none";
}

function applyIgnoreList(unignore)
{
	var rows = document.getElementsByTagName("tr");

	for (var i = 0; i < rows.length; i++)
	{
		var row = rows[i];
		if (row.cells.length < 2)
			continue;
		var anchors = row.cells[0].getElementsByTagName("a");
		if (anchors.length < 1)
			continue;
		var first_anchor = anchors[0];
		if (first_anchor.title.substr(0, 5) != "View ")
			continue;
		var username = first_anchor.innerHTML;

		var divs2 = row.cells[1].getElementsByTagName("div");
		if (divs2.length < 1)
			continue;
		var div_msg = null;
		for (var j = 0; j < divs2.length; j++)
			if (divs2[j].id.substr(0, 4) == "msg_")
				div_msg = divs2[j];
		if (div_msg == null)
			continue;

		addIgnoreButtons(username, div_msg.id);
		if (ignoring(username))
			collapser(div_msg.id);
		if (username == unignore)
			expander(div_msg.id);
	}
}

function autoHideNewButton()
{
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++)
	{
		var myimg = imgs[i];
		if (myimg.alt != "New")
			continue;

		var obj = [];
		obj.handleEvent = function(e) 
		{
			e.target.style.display = "none";			
		}
		myimg.parentNode.addEventListener("click", obj, true);
	}
}

loadIgnoreList();
applyIgnoreList();
autoHideNewButton();

