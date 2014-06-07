// ==UserScript==
// @name           Admin sort tool for same CID
// @namespace      By broco
// @description    By broco
// @include        http://*.grepolis.com/admin/player_tool?action=same_cid
// @include        http://*.grepolis.com/admin/player_tool?action=same_ip
// @include        http://*.grepolis.com/admin/player_tool?action=same_password
// @include        http://*.grepolis.com/admin/player_tool?action=multi_same
// ==/UserScript==

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


var par = document.location.search;

if (par=="?action=multi_same") 	var tbl = document.getElementsByTagName('table')[42];
else 							var tbl = document.getElementsByTagName('table')[41];

if (par=="?action=same_cid")			var cb_list_checked = readCookie("checked_cid") || "";
else if (par=="?action=same_ip")		var cb_list_checked = readCookie("checked_ip") || "";
else if (par=="?action=same_password")	var cb_list_checked = readCookie("checked_password") || "";
else 									var cb_list_checked = readCookie("checked_multi") || "";

cb_list_checked=cb_list_checked.split(",");

var th = document.createElement("th");
th.appendChild(document.createTextNode("Checked"));

tbl.childNodes[1].firstChild.appendChild(th);

for ( var i=1; i<tbl.childNodes[1].childNodes.length; i++ )
{
	var tr = tbl.childNodes[1].childNodes[i];
	if (tr.tagName=="TR")
	{	
		var td = document.createElement("td");
		if (tr.className=="dark")
		{
			var cb = document.createElement("input");
			cb.type="checkbox";
			cb.className="cb_checked";
			cb.value=tr.childNodes[1].firstChild.innerHTML;
			cb.addEventListener("click", hideChecked, false);

			for ( var j=0; j<cb_list_checked.length; j++ )
			{
				if (cb.value==cb_list_checked[j]) {
					cb.checked="checked";
					break;
				}
			}
			
			td.appendChild(cb)
		}
		tr.appendChild(td);
	}
}

var tr = document.createElement("tr");
tr.className="dark";
tr.appendChild(document.createElement("td"));
tr.appendChild(document.createElement("td"));
tr.appendChild(document.createElement("td"));
if (par=="?action=multi_same") {
	tr.appendChild(document.createElement("td"));
	tr.appendChild(document.createElement("td"));
}
var td = document.createElement("td");
var show = document.createElement("input");
show.type = "button";
show.id = "button_show";
if (readCookie("checked_hidden")!=null)	show.value = "Hide checked";
else									show.value = "Show checked";
show.addEventListener("click", showChecked, false);


td.appendChild(show);
tr.appendChild(td);

tbl.childNodes[1].appendChild(tr);

hideChecked();

function hideChecked()
{
	//alert(document.cookie);
	var cb_list_checked = "";
	var cb_list = document.getElementsByClassName("cb_checked");
	if (readCookie("checked_hidden")==null) {
		for ( var i=0; i<cb_list.length; i++ )
		{
			if (cb_list[i].checked) {
				cb_list_checked+=cb_list[i].value+",";
				var tr = cb_list[i].parentNode.parentNode;
				tr.style.display="none";
				while (tr) {
					tr = tr.nextSibling;
					tr = tr.nextSibling;
					if (tr.className=="") tr.style.display="none";
					else break;
				}
			}
		}
		var par = document.location.search;
		if (par=="?action=same_cid")			createCookie("checked_cid",cb_list_checked,365)
		else if (par=="?action=same_ip")		createCookie("checked_ip",cb_list_checked,365)
		else if (par=="?action=same_password")	createCookie("checked_password",cb_list_checked,365)
		else 									createCookie("checked_multi",cb_list_checked,365)
	}
}

function showChecked()
{
	var cb_list = document.getElementsByClassName("cb_checked");
	for ( var i=0; i<cb_list.length; i++ )
	{
		var tr = cb_list[i].parentNode.parentNode;
		tr.style.display="table-row";
		while (tr) {
			tr = tr.nextSibling;
			tr = tr.nextSibling;
			if (tr.className=="") tr.style.display="table-row";
			else break;
		}
	}
	if (readCookie("checked_hidden")==null)	{ document.getElementById("button_show").value = "Hide checked"; createCookie("checked_hidden","",365); }
	else  									{ document.getElementById("button_show").value = "Show checked"; eraseCookie("checked_hidden"); }
	hideChecked();
}