// ==UserScript==
// @name           Shoutbox text replacer
// @description    Replacing specified strings in shoutbox on NexusPHP
// @include        http://u2.dmhy.org/*
// @include        https://u2.dmhy.org/*
// @include        http://g.camoe.org/*
// @include        https://g.camoe.org/*
// ==/UserScript==
if (GM_getValue("wordlist") == undefined)
{
	GM_setValue("wordlist", "\"\":\"\"");
}
var words = eval("new Object({" + GM_getValue("wordlist") + "})");

for(var word in words) {
	var els = document.getElementsByTagName("span");
	for(var i = 0, l = els.length; i < l; i++) {
		var el = els[i];
		el.innerHTML = el.innerHTML.replace(word,words[word]);
	}
}

function addwords()
{
	function more()
	{
		var a = document.getElementById("wordtoreplace").value;
		var u = document.getElementById("replacement").value;
			if (a == "" && u == "")
			{
				alert("No input");
			}
			else
			{
				newReplacement = document.createElement('tr');
				var d = document.getElementById("added");
				d.parentNode.insertBefore(newReplacement, d.nextSibling);
				newReplacement.className='replace';
				newReplacement.textContent = a+" ==> "+u;
				newReplacement.id="\""+a+"\":\""+u+"\"";
			}
		}

	function done()
	{
		var wordlist = document.getElementsByTagName('tr').id;
		var allDivs = document.evaluate("//tr[@class='replace']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allDivs.snapshotLength; i++)
			{
   				var thisDiv = allDivs.snapshotItem(i);
				GM_setValue("wordlist", GM_getValue("wordlist") + "," + thisDiv.id)
			}
		var addwords = document.getElementById("addwords");
		addwords.parentNode.removeChild(addwords);
		window.location.reload();
	}

	var divTag = document.createElement("div");
	divTag.innerHTML = '<div align="center" id="addwords"><form name="addwords"><table cellspacing="0" border="2" style="height: 6em; left: 50%; margin-top: -12em; position: fixed; top: 50%; width: 30%; margin-left: -13em; z-index: 9999;"><tbody bgcolor="#2B547E" style="color:white; text-align:center;"><tr valign="top" height="10" align="center"><font size="2"><input type="text" id="wordtoreplace" name="wordtoreplace" cellspacing="0" style="margin: 5px;">==&gt;<input type="text" id="replacement" name="replacement" cellspacing="0" style="margin: 5px;"><input type="reset" id="more" value="+" title="Add"></font></tr><tr id="added" height="10">Word replacements to be added:<br></tr><tr valign="bottom" align="center"><font xmlns="http://www.w3.org/1999/xhtml"><input type="button" id="done" value="Done" title="Press to finish"></font></tr></tbody></table></form></div>';
	document.body.insertBefore(divTag, document.body.firstChild);
	var m = document.getElementById("more");
	m.addEventListener("click", more, false);
	var o = document.getElementById("done");
	o.addEventListener("click", done, false);
}

function dump()
{
		GM_setValue("wordlist", "\"\":\"\"");
		window.location.reload();
}

GM_registerMenuCommand("加入替换关键字", addwords);
GM_registerMenuCommand("取消全部关键字", dump);
