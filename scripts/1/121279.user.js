// ==UserScript==
// @name           [743049] Torn City Item Send Auto Fill
// @namespace      http://torn.com/743049
// @description    V1.2 Auto Fill Item and Cash Send Page on Torn City
// @include        http://www.torn.com/itemsend.php?XID=*
// @include        http://www.torn.com/itemsend.php?step=send1&back=
// @exclude        http://www.torn.com/itemsend.php?step=send&back=
// @include        http://www.torn.com/sendcash.php?XID=*
// @include        http://www.torn.com/sendcash.php?step=cash1&rfc=*
// @include        http://localhost/*
// @version        1.2
// ==/UserScript==

// This script simply pre-fills the text box of the send item/cash page.
// I made it for mass give aways to pre-fill (EG: xmas)
// Script made for #playground.

// Previous:
// v1.2 - Added update notifer, Previous messages sent.
// v1.1 - Fixed a bug where it would send message when not wanted.
// v1.0 - Added option to easily change message (Via local storage), added auto-fill to cash send, removed cash send message limit.
// v0.1 - Basic code created to fill item send message box with static message.

version='1.2';

// Identify storage paramaters
if(!window.chrome)
{
	var storage = unsafeWindow.localStorage;
}
else
{
	var storage = localStorage;
}

function createLink ()
{
	// Create the text link to update the text
	var updateLink = document.createElement("span");
	updateLink.style.cursor = "pointer";
	updateLink.appendChild(document.createTextNode("[Update] "));
	updateLink.addEventListener("click", function() { updateFunction(); }, false);
	
	table=findTable();
	document.getElementsByTagName("td")[table].appendChild(document.createElement("br"));
	document.getElementsByTagName("td")[table].appendChild(updateLink);
	loadPrevious(table);
	
}
// Find the table to add the link to.
function findTable ()
{
	var tds=document.getElementsByTagName("td");
	for (i=tds.length-1; i>=0; i--)
	{
		if (tds[i].innerHTML == "<b>Message:</b>")
		{
			return i;
			i=-1; // Fail safe, to stop it running longer than needed.
		}
	}
}
function readMessage()
{
	if (storage["Message"])
		var Message = storage["Message"];
	else
		var Message="";
	return Message;
}
function storeMessage(Message)
{
	storage["Message"] = Message;
}
function readPrevious()
{
	if (storage["Previous"] && storage["Previous"] != null)
		return storage["Previous"];
	else
		return "";
}
function storePrevious(Previous)
{
	storage["Previous"] = Previous;
}
function updateFunction ()
{
	var Message = prompt("Please enter new default message:", readMessage());
	if (Message != null)
		storeMessage(Message);
	loadMessage();
}

function loadMessage()
{
	var Message = readMessage();
	
	// Put the message into the text box.
	document.getElementsByName("tag")[0].removeAttribute('maxLength');
	
	document.getElementsByName("tag")[0].value=Message;
	document.getElementsByName("ID")[0].focus();
}
function updateMessage()
{
	pos=document.getElementById("Previous").value;
	if (pos != -1)
	{
		Previous=readPrevious().split("<");
		msg=decodeHTML(Previous[pos]);
		document.getElementsByName("tag")[0].value=msg;
		document.getElementsByName("ID")[0].focus();
	}
	else
	{
		loadMessage();
	}
}
function checkUpdates(ver)
{
GM_xmlhttpRequest({
        method:"GET",
        url:'http://userscripts.org/scripts/review/121279?format=txt',
        onload:function(result) {
            if (result.responseText.indexOf('@version        '+ver) == -1) {
                var div = document.createElement("div");
				div.setAttribute("style", "background-color: #00FF00;");

                var a = document.createElement("a");
                a.setAttribute("href", "http://userscripts.org/scripts/source/121279.user.js");
                a.appendChild(document.createTextNode('[743049] TC Item Auto-Fill Update Available. Click here to install!'));
                div.appendChild(a);
				a.setAttribute("style", "font-size:18pt; padding-left:15px;");

                document.body.insertBefore(div, document.body.firstChild);
		GM_setValue('version',version + 1);
            }
        }
    });
}
function loadPrevious(table)
{
	Previous=readPrevious().split("<");
	if (Previous.length < 10)
		runs=1;
	else
		runs = Previous.length-10;

	var select = document.createElement("select");
	select.id="Previous";
	select.style.width="150px";
	select.addEventListener("change", function() { updateMessage(); }, false);
	
	var option = document.createElement("option");
		option.style.cursor = "pointer";
		option.value=-1;
		option.appendChild(document.createTextNode("[AUTO-FILL]"));
		select.appendChild(option);
	for (i=(Previous.length-1); i>=runs; i--)
	{
		// Put drop down form for Previous
		var option = document.createElement("option");
		option.style.cursor = "pointer";
		option.value=i;
		option.appendChild(document.createTextNode(decodeHTML(Previous[i])));
		select.appendChild(option);
	}
	document.getElementsByTagName("td")[table].appendChild(select);
}

function decodeHTML(str)
{
	str=str.replace(/\&amp;/g,'&');
	str=str.replace(/\&lt;/g,'<');
	str=str.replace(/\&gt;/g,'>');
	return str;
}
// Load the message to pre-fill the box... as the script is designed to do :P
checkUpdates(version);

if (window.location == "http://www.torn.com/itemsend.php?step=send1&back=" || window.location.toString().substr(0, window.location.toString().length-3) == "http://www.torn.com/sendcash.php?step=cash1&rfc=")
{
	var start = document.body.innerHTML.indexOf("message:");
	if (start != -1)
	{
		var length = document.body.innerHTML.indexOf("<br>", start+9) - (start+9);
		msg = document.body.innerHTML.substr(start+9, length);
		Previous = readPrevious();
		storePrevious(Previous+"<"+msg);
		//alert(readPrevious());
	}
}
else
{
loadMessage();
createLink();
}
