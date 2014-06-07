scr_meta=<><![CDATA[
// ==UserScript==
// @name          Fark Block with TF support
// @namespace     Smiths
// @description   Hide posts from obnoxious Farkers
// @include       http://*.fark.com/*
// @include       https://*.fark.com/*
// @include       https://*.totalfark.com/*
// @include       http://*.totalfark.com/*
// @version		   1.2.4
// @attribution	changes [d:3.31.11][u:Fix for controls not appearing after you submit a post in a thread.]
// ==/UserScript==
]]></>.toString();
var v = /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1];

var scriptNum = "23463";
var scriptName = "Fark Block with TF support";

//<--Updater Stuff

GM_addStyle("#smgm_bgdiv{ text-align: center;position:fixed;top:0px;left:0px;z-index:9991;width:100%;height:100%;background-color:black;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle("#smgm_dialogbox { vertical-align:middle;left:40px;top:15px;border:3px solid #000;text-align:center;background-color:#fff;color:#000;font-family:arial,verdana;z-Index:9999;position:fixed;width:18%;height:50%;margin-left:auto;margin-right:auto;display:block;visibility:visible;}");
GM_addStyle(".smgm_buttons { color:#000;font: 90% 'arial','trebuchet ms',helvetica,sans-serif;background-color:#B2CCFF;border:2px solid;border-color: #E0EBFF #000 #000 #E0EBFF;vertical-align: top;}");
GM_addStyle(".smgm_table { margin-bottom:10px;border:0px;border-collapse:collapse;margin-left:auto;margin-right:auto; }");
var remindLaterV = GM_getValue('remindLaterV', remindLaterV);
if (!remindLaterV) { remindLaterV = 0; GM_setValue('remindLaterV',remindLaterV); }

var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum ;
var metaURL = "http://userscripts.org/scripts/source/" + scriptNum + ".meta.js";
var scriptJSURL = "http://userscripts.org/scripts/source/" + scriptNum + ".user.js";

function doremindLater(clicked,span)
{
	if (clicked) 
		remindLaterV = span;
	else
		remindLaterV--;
	GM_setValue('remindLaterV',remindLaterV);
}

function hideUpdate()
{
	document.getElementById('smgm_bgdiv').style.display='none';
	document.getElementById('smgm_dialogbox').style.display='none';
}

function checkNew(version)
{
	var upgrade = 0;
	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaURL,
		onload:function(content){
			var USversion = content.responseText.match(/@version.*?(\d[^<]+?)\n/);
			content.responseText = content.responseText.replace(/ \/>/g,'>');
			content.responseText = content.responseText.replace(/\n/g,'');
			var changeDate = content.responseText.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
			var theChanges = content.responseText.match(/\[u:([^<]+)\]/i)[1];
			vSplit = version.split(".");
				vmain = Number(vSplit[0]);
				vvsub = Number(vSplit[1]);
				vrsub = Number(vSplit[2]);
			USsplit = USversion[1].split(".");
				USvmain = Number(USsplit[0]);
				USvsub = Number(USsplit[1]);
				USrsub = Number(USsplit[2]);
			verstring = "<div style='padding:5px;border-bottom:1px dotted #000;'>Latest Version on Userscripts: <a href='" + homepageURL + "' target='_new' title='Click to visit script's page'><b>" + USvmain + "." + USvsub + "." + USrsub + "</b></a><br>Your Installed Version: <b>" + vmain + "." + vvsub + "." + vrsub + "</b></div>";
			if (USvmain > vmain) upgrade = 1;
			if ( (USvsub > vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if ( (USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if (upgrade == 1) //upgrade available, pop a box
			{
				theHTML += "<div style='padding:5px;border-bottom:1px dotted #000;'>New version of " + scriptName + " available.</div>";
				theHTML += verstring + "<p>";
				theHTML += "<table class='smgm_table'><tr><td><input type='button' class='smgm_buttons' id='smgm_installButton' onMouseUp=\"document.location.href=\'" + scriptJSURL + "\';\" value='Install'></td>";
				theHTML += "<td style='width:25px;'>&nbsp;</td><td><input style='' class='smgm_buttons' type='button' id='smgm_remindButton' value='Remind Me Later'></td>";
				theHTML += "</tr></table><div style='text-align:left;border-top:1px dotted #000;padding:7px;' colspan='5'>Changes (" + changeDate.replace(/\./g,"/") + "):<br><span style='font-style:italic;'>" + theChanges + "</span></div>";
				div1 = document.createElement('div');
				div1.id = 'smgm_dialogbox';
				div1.style.display = "none";
				div1.innerHTML = theHTML;
				document.body.appendChild(div1);
				div2 = document.createElement('div');
				div2.id = 'smgm_bgdiv';
				div2.style.display = "none";
				div2.addEventListener("click",function(){doremindLater(true,15);hideUpdate();},false);
				document.body.appendChild(div2);
				document.getElementById('smgm_bgdiv').style.display='block';
				document.getElementById('smgm_dialogbox').style.display='block';
				document.getElementById('smgm_remindButton').addEventListener("click", function(){doremindLater(true,60);hideUpdate();},false);
				document.getElementById('smgm_installButton').addEventListener("click", function(){hideUpdate();},false);
			}
		}
	})
}

doremindLater(false);
if (remindLaterV < 1)
	checkNew(v);

//end updater stuff-->

if (document.location.href.match(/http:\/\/www\.fark\.com\/comments/) != null || document.location.href.match(/http:\/\/www\.fark\.com\/cgi\/comments/) != null) {

	var ignored = GM_getValue('ignored');
	if (!ignored) { ignored = ""; }
	var farkers = ignored.split(",");
	var totalposts = 0; 
	var whowas = new Array();
	var ignoredimg = "data:image/gif,GIF89a%13%00%13%00%F7%00%00%00%00%00%FF%FF%FF%CE%01%02%99%01%02%95%02%03%B7%03%04%BB%04%06%A1%08%0A%AA%0A%0DD%05%07c%08%0B%9E%0D%12j%0C%10%3D%07%09'%06%078%08%0Bi%10%15g%10%15%7C%15%1C%40%0B%0E%7C%16%1Dr%14%1Bg%12%18%3D%0B%0Fs%16%1D!%0A%0Cq%17%201%0D%11(%09%0D*%0A%0Ec%1A%23%2F%0D%11%2B%0C%10%13%06%08W%1C%25T%1D'f%251b%23%2F4%14%1B%13%09%0C%17%0B%0F.%18%20%0E%09%0B%2C%20%2B%09%06%09%13%0F%14(%23%2F%1A%18%20%1C%1A%23%2F.%3D%00%00%01%7B%7B%A4pp%95%40%40Ucc%83MMf%3E%3EROOh%3C%3CO99K!!%2B%15%15%1B009%1E%1E%1Ffg%88v%7C%A6.0%40%5Ee%86%14%16%1EMUq%3FE%5CV%5E%7DT_%7FHQlITqCMgAKd%1B%1F)%3EH_%3EMgAPjFVr%3CKc6Ga.%3CQ%3CNh%0D%12%194G_-%3ER%10%19%22%236J%1F%2F%3F%0F%22-%06%15%1D%09%16%1D%0C%24%2F%01%0E%13%0E%16%0F%1D%24%19%16%1B%137%3A)-.%1F%10%10%0D%3B9'%9A%8EbMG1~oJ%17%14%0Dn%60B%FF%DD%98-%25%16%A2%89%5E%85pM%AA%8Fc%FE%D4%93%E1%B6%7D%D8%B0x%EC%C0%84%B8%96g%E0%B1y%CC%A1n%FA%C6%88%F4%C1%85%D7%ABuI%3A(7)%1C%5BD%2F%2C%20%16%3E-%20M-%1Ef%3C)d%3C)V3%230%15%0F8%11%0B%5C%1D%14W%1C%13W%14%0EN%06%04%7C%0F%0A%FF%00%00%FE%00%00%FC%00%00%FB%00%00%F8%00%00%F7%00%00%F4%00%00%F3%00%00%F1%00%00%EF%00%00%EC%00%00%EA%00%00%E9%00%00%E6%00%00%E4%00%00%E3%00%00%E1%00%00%DF%00%00%DD%00%00%DC%00%00%DB%00%00%D9%00%00%D7%00%00%D4%00%00%D3%00%00%CF%00%00%CD%00%00%CB%00%00%C7%00%00%C5%00%00%C2%00%00%C1%00%00%BE%00%00%BC%00%00%BB%00%00%B7%00%00%B4%00%00%B3%00%00%A6%00%00%A4%00%00%A0%00%00%9E%00%00%9A%00%00%94%00%00%92%00%00%8F%00%00%8C%00%00%8A%00%00%89%00%00%87%00%00%84%00%00%83%00%00~%00%00%7B%00%00m%00%00d%00%00c%00%00a%00%00Q%00%00E%00%00A%00%00%3C%00%000%00%00%2B%00%00%25%00%00%1F%00%00%1C%00%00%18%00%00%17%00%00%12%00%00%07%00%00%03%00%00%C7%02%02%AF%02%02f%01%01%A4%04%034%01%01q%03%03%97%08%05T%04%03%BC%0B%08f%04%04V%05%04C%03%03%15%01%01%11%11%11%0F%0F%0F%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%E3%00%2C%00%00%00%00%13%00%13%00%00%08%FF%00%C7%09%14h%A3%078e%C9%9A%B5%002%B0%A1%40)M%24%18%20%C5i%93%A8%02%14%9A%2Cq8%EEJ%87%5C%A1%18ej%E5J%13%23N%B7%400i%F8%84C-F%8Dn%19c%F6%0C%D9%AEN%8Cf%81%882%90H%2FF%93*%0D%03%10%E6%8C%18%00%0AL1%02%E6B%E0%0C%0F%A4F%E1%D2%04%C9%98%9F%3Ax%D6dI%F0%C9S%04(%E3j%2Cp%A4kZ%B1H%98%B0%A5%D1%B3GF%97%03%8Cr%81%A9%A1%82%DA%25%0C_%A2%F9z%E4%0A%11%9A%3B%00%A8T%C8%14%0B%85%0Eh%A1J%91%D0%02%60%107G%D7%04%A9%01PDD%A9T%1Bp8%03e%AA%C4%14%1Ec%96%ADz%A4%ED%8F%95%23%23N%A5%FA%80%23%84%80K%10%B6%C4%E0SFQ(J%C4%5E%60%B1%90%E9%D5%89%1DB%100%E2%25%CDM%9B9d%BCY%BAt%8C%05%01F%03%BC%DC%A0%A1%C1%13%AADp%F2%C8%B1%03%C8Z%A3O%C4DejbPE%20%0C%5B%8C%AA%15b%13%87%CE%1BB%C1%1CYb%B4kE%10%81L%1E%C0b%E4j%D1%A1%40%7D%18%F2%0B%23%8C%C4r%81%12%0D%19%D1%80%2C%8C%60%A2%CA%2C%B4%B0%82%09%25%B7L%90%03GN%98%C0%CB*%9CHR%C9'%AF%08%93B%12%1C%09%84%C4%16%0El%93M7%DFd%C0%C5%10%256%F4C8%E2%84c%86%0F%25%06%04%00%3B"
	var watchimg = "data:image/gif,GIF89ax%00%16%00%D5%00%00%00%00%00%FF%FF%FFhgjljqsq%7Fonxvu%86%84%83%A1%81%80%9C%80%7F%9A%7D%7C%95%7D%7C%94yx%8Dzy%8E%95%94%C4%8E%8D%B6%8B%8A%B0%88%87%AA%87%86%A8%84%83%A3%98%98%CB%95%95%C5%92%92%BE%91%91%BD%8E%8E%B7%8A%8A%AFecczxxomm%A3%A1%A1%84%82%82%D6%D5%D5%CC%CB%CB%B7%B6%B6%AD%AC%AC%98%97%97%8E%8D%8D%F5%F5%F5%EA%EA%EA%E0%E0%E0%C1%C1%C1%B5%B5%B5%26%26%26%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2B%00%2C%00%00%00%00x%00%16%00%00%06%FF%C0%94pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJ%AD%22UB%8Av%CB%EDz%BF%E0%B0xL.%9B%C7*l%EA%5C%CE8%C2%97G%D8%91%D1%3E.%DCJB%22vS%E2lft%5EiY%5Dz%03%08%14%08%89%14%18%0C%04%11%60%0D%24%1Co%5E%17%1B%1E%92%5E%0E%1C%24%0D%11%1E%1BxZ%0D%22%23%7C_%94%1C%99%9B%81c%9E%A0%5D%85k%5D%09%22%26%03%14%03%26%A4%0C(%1F%04%60%1A%01%24u%5E%B8%C2_%19%24%01%1A%04%1F%22%09%5B%C5%CB_%C5%24%CA%C3%B0a%CD%CF%B4j%5E%DF%AD%1B%01%D3%05'%D3v~Z%D9%C8%14%19~%DB%19%A5%5B%DF%D0%D2%09~%A7%A9t%F6%EE%8C%D1%03%F8%40%CE%9Fz%5D%E4a%92%E7LC8C%5C%3C%09%14%11%00%84%81b%A9%1Ey%A8T%80%40%83l%0D((%10%40%A2%92%02e%9F6%84%DCB%E9Y4%11%1BLF%20%90%60B%CA%95%14%3E%1A%3B%F5%E1%E6L%FF%01%1E%3C%20%60%10s%03%03%0C%14%26%14(9%60%40%82%0A%16%1A%14m%F8%D0V%97%5E%22%A2%99x%E6%EC%17%8A%00%01J%9C%F8P%0C%2C%09%05%23J%80-%D1%E1%94%09%B5%01Ri%F9%06V%C3%87%13k7%BCL%07V.%85%B2%C6r%C1%1D%11M%AD%AE%AF%60Q%1C%E5%807%80%09%13%D3%1A%84%00%1B%E0%038.%B5%BE%18%00%01%82%C3%B9%B8%22J%088%D0%E1%1C%87%AF%C2%9C%89%E0%B0%A1%04%88%0D%1B%40%04%D8%40%11%C5%86%0F%D7%3CQ%24%11%ED%5C%EB%AC%D2%9Cy%08%B1.%A7j%0E%B5o%0B%B3Lb%40i%11%1A(v%00V%82%C4%06%BC%D3%9EG%AF%5B%F5%0B%AE%13%23%020F%11%8C%40%3A%C5%18z%09%CB%86%CB%04%07%08%10%0C%888%25%5EBx%87s%1BF%3BQ%60A%88%E5%22%08%B7%C0S%D5LT%DF%7D%B8%99w%02%0A%044%F8%9Fg%1D(0%819%22%9C%C7%40%05%C0%5C%B6Ef%E38S%FF%5E%08%26%E8%83%11%1F%FE%ADgL4!%2C%A0%85%1E%F4P%95%9FK%FAl%23M%3A%25%8C%80%D3_%13%09%83%8F%88%8E%E1v%971%E2%BD%91%0Etq%F1a%9F%86Zp%D8%85D%E7%24%E0A_%12%BCC%C16%D9%BCD%8D%1D-j%88%8F%952N%C3%81l~%E1%A8%8D%08%3A6%C4%23%0A%22%A4%99%A6%8B%2FI%89Ow_%08%A0%96%07%0F%C89%DB%05%BD%A4HA%3A%26%92%00%0C%7F%15T%D0%80%07%3C%11%F0%E6%8B%F9L%D3e%02%09lv%8D%98Y%DA5%0DV')P%929%23L%80%81g%22%E4%A9%A2%7FHR%A0d%17Z%EDB%9D%00S%86%E6A%01%A5%F5%F9M%A7%03PD%5B%99Z%EA%17%23%99%2Fy%D0iy%05%8EI%AB%A4%8C%AAJ%80%07%250x%17%07%03%7C5%8D%B0%C4%86%3A*%17%B8%E8I%DA2%9E%E0%85W%09%AEJ%E6%D8V%8A%E1zh%3C%B6*%8A%AB4%E1m%D5%C1%01%BDF%AA%B5O%B5%95%05p%02%07%A2%94P%C2V%25x%89%97ej%E1%B7%A18_dB%0A%05%9El%C0%89Mkj%12%01%2B%0EDE%C2%9AG%19%2C%0BN%0F%8BB%8A%2B%12S%22B%5B%5C%B0B%F1%C3%A3%E0Ap%9A%1CL%20%12m0u%ACT%07%17%7Fr%A3%A8%FC%F6k%8F%03%009%C0h%3D%06%B5%13%CF%CCZ%00%020%3CZ%0CB%C1%1D9%CB%01t%06%09%A0%9B%D0%1B%3A%0F%02t%CF%8C%26p%C9%1F%8C%C6a%CF%01E%FB%8CY%CB%DDd%AD%F5%D6%5C%83%F1l%D7%60%87-v%18%85%A4a%F6%D9h%A7%AD%F6%DAl%B7%ED%F6%DBp%C7-%F7%DCt%D7m%F7%DDx%B3%1D%04%00%3B"
	function xpath(query, context)
	{
		var cx = (arguments.length < 2) ? document : context;
		return document.evaluate(query, cx, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function inArray(needle, haystack)
	{
		for (var i = 0; i < haystack.length; i++)
		{
			if (needle == haystack[i]) return true;
			if (needle < haystack[i]) return false;
		}
		return false;
	}

	function promptForUser(uid)
	{
		var already = 0;
		var currentlyignored = GM_getValue('ignored');
		if (!currentlyignored) { currentlyignored = ""; }
		var farkarray = currentlyignored.split(",");
		for (var i = 0; i < farkarray.length; i++)
		{
			if (uid == farkarray[i]) 
			{ 
				already = 1;
			}
		}
		
		if (already == 1) 
		{
			alert("You're already ignoring that douchebag!");
		}
		else
		{
			var val = prompt('Who are we blocking now?',uid);
			if (val)
			{
				if (ignored == "") { ignored = val; }
				else { ignored += "," + val; }
				GM_setValue('ignored', ignored);
				rebuildthread(val);
			}
		}
	}

	function addignorebutton(node, user)
	{
		var btn = document.createElement('a');
		btn.innerHTML = '<img hspace="5" title="Add ' + user + ' to ignore list" src="' + ignoredimg + '"width="15" height="15" border="0">';
		btn.addEventListener('click', function(){promptForUser(user);}, true);
		
		node.parentNode.insertBefore(btn, node.nextSibling);
	}

function rebuildthread(addeduser)
{
	var liters=document.getElementsByTagName("table");
	for (var i = 0; i < liters.length; i++)
	{
		if ((liters[i].className=="ctable") && (liters[i].getElementsByTagName('a').item(0).innerHTML == addeduser)) 
		{
			var br1 = liters[i].nextSibling.nextSibling;
			var body = br1.nextSibling;
			var br2 = body.nextSibling;
			var p = liters[i].parentNode;
			p.removeChild(liters[i]);
			p.removeChild(br1);
			p.removeChild(body);
			p.removeChild(br2);
			totalposts++;
		}
	}
	var tfers=document.getElementsByTagName("table");
	for (var i = 0; i < tfers.length; i++)
	{
		if ((tfers[i].className=="ctableTF") && (tfers[i].getElementsByTagName('a').item(0).innerHTML == addeduser)) 
		{
			var br1 = liters[i].nextSibling.nextSibling;
			var body = br1.nextSibling;
			var br2 = body.nextSibling;
			var p = liters[i].parentNode;
			p.removeChild(liters[i]);
			p.removeChild(br1);
			p.removeChild(body);
			p.removeChild(br2);
			totalposts++;
		}
	}
}

	farkers.sort();
	var posts = xpath('//table[@class="ctable"]');
	for (var i = 0; i < posts.snapshotLength; i++)
	{
		var header = posts.snapshotItem(i);
		var uid = header.getElementsByTagName('a').item(0).innerHTML;
		j=0;
		if (header.getElementsByTagName('a').item(1))
		{
			if (header.getElementsByTagName('a').item(1).innerHTML.indexOf('recently expired') > -1) j++;
			var uid2 = header.getElementsByTagName('a').item(j);
			var uid3 = header.getElementsByTagName('a').item(j+1);
			if (inArray(uid, farkers))
			{
				var j = whowas.length;
				if (!inArray(uid, whowas)) { whowas[j+1] = uid; }
				var br1 = header.nextSibling.nextSibling;
				var body = br1.nextSibling;
				var br2 = body.nextSibling;
				var p = header.parentNode;
				p.removeChild(header);
				p.removeChild(br1);
				p.removeChild(body);
				p.removeChild(br2);
				totalposts++;
				whowas.sort();
			}
			else
			{
				if (uid2 && uid3) addignorebutton(uid3, uid);
				else addignorebutton(uid2, uid);
			}
		}
	}
	var posts = xpath('//table[@class="ctableTF"]');
	for (var i = 0; i < posts.snapshotLength; i++)
	{
		var header = posts.snapshotItem(i);
		var uid = header.getElementsByTagName('a').item(0).innerHTML;
		var uid2 = header.getElementsByTagName('a').item(1);
		var uid3 = header.getElementsByTagName('a').item(2); //javascript quote if HTML help enabled
		
		if (inArray(uid, farkers))
		{
			var j = whowas.length;
			if (!inArray(uid, whowas)) { whowas[j+1] = uid; }
			var br1 = header.nextSibling.nextSibling;
			var body = br1.nextSibling;
			var br2 = body.nextSibling;
			var p = header.parentNode;
			p.removeChild(header);
			p.removeChild(br1);
			p.removeChild(body);
			p.removeChild(br2);
			totalposts++;
			whowas.sort();
		}
		else
		{
			if (uid2 && uid3) addignorebutton(uid3, uid);
			else addignorebutton(uid2, uid);
		}

	}

	var end = document.getElementById("commentsArea");

	whowas = whowas.join(); whowas = whowas.replace(/,,/g,"");
	whowas = "Jerkoffs in thread: " + whowas;
	if (whowas.length > 21) { 
		var total = document.createElement('div');
		total.title = whowas;
		total.innerHTML = "Fark Block removed <b>" + totalposts + " </b>posts from this thread.";
		end.parentNode.insertBefore(total, end.nextSibling);
	}
}

if ((document.location.href.match(/cgi\/users\.pl\?self=1/) != null) || (document.location.href.match(/fark\.com\/users/) != null)) {

	var ignored = GM_getValue('ignored');
	if (!ignored) { ignored = ""; }
	var farkers = ignored.split(",");

	function unignoreUser2(user, previousform, var1, var2)
	{
		var users = GM_getValue('ignored');
		if (!users) { users = ""; }
		var thefark = users.split(",");
		users = users.replace(/,/g,"\n");
		for (var i = 0; i < thefark.length; i++)
		{
			if (user == thefark[i]) 
			{ 
				thefark.splice(i,1);
			}
		}
		users = thefark.join();
		GM_setValue('ignored', users);
		span = document.getElementById(previousform);
		span.parentNode.removeChild(span);
		var2.innerHTML = var2.innerHTML.substr(0,var2.innerHTML.length - 29);
		makeignorelist(var1, var2);		
	}

	function promptForUser2(uid, previousform, var1, var2)
	{
		var already = 0;
		var currentlyignored = GM_getValue('ignored');
		if (!currentlyignored) { currentlyignored = ""; }
		var farkarray = currentlyignored.split(",");
		for (var i = 0; i < farkarray.length; i++)
		{
			if (uid == farkarray[i]) 
				already = 1;
		}
		if (already == 1) 
			alert("You're already ignoring that douchebag!");
		else
		{
			if (currentlyignored == "") { currentlyignored = uid; }
			else { currentlyignored += "," + uid; }
			GM_setValue('ignored', currentlyignored);
		}
		span = document.getElementById(previousform);
		span.parentNode.removeChild(span);
		var2.innerHTML = var2.innerHTML.substr(0,var2.innerHTML.length - 29);
		makeignorelist(var1, var2);

	}
	
	function makeignorelist(location, redtext)
	{
		redtext.innerHTML += "<p><br>(Or Manually Ignore with Fark Block using form on the right)";
		replaceTD = document.createElement("td");
		replaceTD.id = "Ignorebox";
		replaceTD.setAttribute("valign","top");
		myform = document.createElement("form");
		myselect = document.createElement("select");
		myselect.style.height=24+ "px";
		myselect.style.width=150 + "px";
		mybreak = document.createElement("p");
		mybutton = document.createElement("button");
		mybutton.type = "BUTTON";
		mybutton.style.height=24 + "px";
		mybutton.style.width=150 + "px";
		mybutton.style.marginLeft=15 + "px";
		theText=document.createTextNode("Unignore Selected");
		mybutton.appendChild(theText);
		myinput = document.createElement("input");
		myinput.style.height=16 + "px";
		myinput.style.width=100 + "px";
		mybutton2 = document.createElement("button");
		mybutton2.type = "BUTTON";
		mybutton2.style.height=24 + "px";
		mybutton2.style.width=100 + "px";
		mybutton2.style.marginLeft=15 + "px";
		theText=document.createTextNode("Ignore");
		mybutton2.appendChild(theText);

		var users = GM_getValue('ignored');
		if (!users) { users = ""; }
		var users = users.split(",");
		for (var i = 0; i < users.length; i++)
		{
			theOption=document.createElement("OPTION");
			theText=document.createTextNode(users[i]);
			theOption.appendChild(theText);
			theOption.setAttribute("value",users[i]);
			myselect.appendChild(theOption);
		}
		myform.appendChild(myselect); 
		myform.appendChild(mybutton);
		myform.appendChild(mybreak);
		myform.appendChild(myinput);
		myform.appendChild(mybutton2);
		replaceTD.appendChild(myform);
		location.parentNode.appendChild(replaceTD, location);
		mybutton.addEventListener('click', function(){
		unignoreUser2(myselect.options[myselect.selectedIndex].value, replaceTD.id, location, redtext);}, true);
		mybutton2.addEventListener('click', function(){promptForUser2(myinput.value, replaceTD.id, location, redtext);}, true);
	}

	var tds = document.getElementsByTagName('td');
	for (var i = 0; i < tds.length; i++) {
		if (tds[i].innerHTML.search("you're ignoring:") > -1 )
		{
			makeignorelist(tds[i+1], tds[i]);
			tds[i+1].innerHTML = "<b>Official FARK Ignore Controls:</b><p>" + tds[i+1].innerHTML;
			tds[i+1].setAttribute("width","50%");
 		}
	}
}
