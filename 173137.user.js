// ==UserScript==
// @name     everfall_justice
// @author   xyuTa
// @version  0.102
// @date     25.12.2011
// @include  http://*everfall.com/*
// ==/UserScript==

// alert("ololo");
/*
// @include  http://tinyurl.com/api-create.php?everfall&*
// @include  http://tinyurl.com/create.php

var everfallCSS = 'div#updatestuff, div#noticetext, input#copysrc, input#copyhtml {display: none;} input#minilink {float: right; height: 18px; width: 180px; margin: 0px; font-size: 13px; font-family: "Tahoma", "Verdana", "Geneva", "Arial", "Helvetica", sans-serif;} iframe#linkframe {display: none;}';
function insertCSS(css)
{
	var head = document.getElementsByTagName("head")[0];
	if ( head !== undefined)
	{
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		head.appendChild(node);
		return true;
	}
	else
		return false;
}
*/
/*
if ( document.location.href == "http://tinyurl.com/create.php" )
{
	window.addEventListener("load",  function()
	{
		var tinyurl = document.getElementsByTagName("blockquote")[1].childNodes[0];
		var node = document.createElement("input");
		node.type = "text";
		node.id = "url";
		node.readonly = "readonly";
		node.style = "height: 22px; width: 180px; margin: 0px; font-size: 13px; font-family: tahoma;";
		node.value = tinyurl.textContent;
		tinyurl.textContent = "";
		tinyurl.appendChild( node );
		document.getElementById("url").select();
		document.getElementById("url").addEventListener("click", function () {document.getElementById("url").select();}, false);
	}, false);
}
else
*/
if ( /http:\/\/tinyurl.com\/api-create.php\?everfall&url=\S+/.test(document.location.href) )
{
	window.addEventListener("message", function (event)
	{
		if ( /^http:\/\/(?:www\.)?everfall.com/.test(event.origin) && event.data == "url" )
			event.source.postMessage( document.body.textContent, "*" );
	}, false);
}
else
if ( /^http:\/\/(?:www\.)?everfall.com\S+/.test(document.location.href) )
{
	/*
	insertCSS(everfallCSS);
	window.addEventListener("message", function (event)
	{
		if ( event.origin == "http://tinyurl.com" )
		{
			document.getElementById("minilink").value = event.data;
			document.getElementById("minilink").select();
		}
	}, false);
	*/
	window.addEventListener("load",  function()
	{
		document.getElementById("expire").innerHTML = '<option value="0">never</option>\
		<option value="24">in 1 day</option>\
		<option value="168">in 1 week</option>\
		<option value="720" selected="selected">in 1 month</option>\
		<option value="8766" >in 1 year</option>\
		<option value="-1">NOW!</option>';

		var mainbox = document.getElementById("mainbox");
		var logbox = document.getElementById("logbox");
		var source = document.getElementById("source");
		var body = document.getElementsByTagName("body")[0];
		if ( mainbox !== undefined && logbox !== undefined && source !== undefined && body !== undefined )
		{
			source.addEventListener("keypress", function (event)
			{
				if ( (event.ctrlKey) && ((event.which == 0xA) || (event.which == 0xD)) )
					document.getElementById("pasteform").submit();
			}, false);
/*
			if ( /\S+id\.php\S+/.test(document.location.href) )
			{
				var linkframe = document.createElement("iframe");
				linkframe.id = "linkframe";
				linkframe.onload = function () { this.contentWindow.postMessage( "url" , "*"); };
				linkframe.src = "http://tinyurl.com/api-create.php?everfall&url=" + encodeURIComponent(document.location.href);
				body.appendChild( linkframe );

				var minilink = document.createElement("input");
				minilink.type = "text";
				minilink.id = "minilink";
				minilink.readOnly = "readonly";
				minilink.value = "loading...";
				minilink.onclick = function () {this.select();};
				mainbox.insertBefore( minilink, logbox );
				document.getElementById("minilink").select();
*/
/*
				var logs = logbox.childNodes;
				var count = -1;
				for ( var i = 0; i < logs.length; i++ )
				{
					if ( logs[i].tagName == "DIV" && !/Paste\swill\sexpire/.test(logs[i].textContent) )
						logs[i].id = "log" + ++count;
				}
				logbox.style.display = "block";
				if ( count > 1 )
				{
					// 123!
					// for ( i = 0; i < count; i++ )
						// document.getElementById("log" + i).style.display = "none";
						// alert(document.getElementById("log" + i));
					// document.getElementById("log" + i)

					var morelog = document.createElement("a");
					morelog.id = "morelog";
					morelog.className = "versionlink";
					morelog.innerText = " more...";
					morelog.onclick = function ()
					{
						this.style.display = "none";

					};
					logbox.insertBefore( morelog, document.getElementById("log" + count) );
					document.getElementById("log" + count).appendChild( morelog );
				}
*/
/*
			}
			else
				source.focus();
*/
		}
	}, false);

}