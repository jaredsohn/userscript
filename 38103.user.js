// ==UserScript==
// @name           DreamF Village Notes
// @namespace      DreamFVillNotes
// @include        http://*.travian.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @exclude http://*.travian*.*/activate.php*
// @exclude http://*.travian*.*/support.php*
// @exclude http://help.travian*.*/*
// @exclude *.css
// @exclude *.js	
// @description   Add a short note or reminder next to each of your villages.
// ==/UserScript==

window.addEventListener(
    'load', 
    function() { addVillageNotes(); },
    true);


function addVillageNotes()
{
	addGlobalStyle(".inputStyle {font-size:0.75em; width:" + GM_getValue("notewidth", "100") + "px;border:1px solid rgb(113, 208, 0);}");

	var villagesTables;
	var villagesTable;
	var tblRows;
	var curRow;
	var curCol;
	var curText;
	var curRowId;
	
	villagesTables = document.evaluate(
	    "//div[@id='lright1']//table[@class='f10']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	 
	if(villagesTables.snapshotLength > 0)
	{
		villagesTable = villagesTables.snapshotItem(0);
		tblRows = villagesTable.childNodes;
		if(tblRows[0].tagName.toUpperCase()!="TR")
			tblRows = villagesTable.firstChild.childNodes;
		for(var i=0;i<tblRows.length;++i)
		{
		
			curRow = tblRows[i];

			var vilLinks = curRow.getElementsByTagName("A");

			for(var j=0;j<vilLinks.length;++j)
			{
				if(vilLinks[j].getAttribute("href").indexOf("?newdid=")==0)
				{			
					var vilLinkHref = vilLinks[j].getAttribute("href");
					vilLinkHref = vilLinkHref.substr(vilLinkHref.indexOf("=")+1);
					if(vilLinkHref.indexOf("&")>=0)
						vilLinkHref = vilLinkHref.substr(0,vilLinkHref.indexOf("&"));
					curRowId = vilLinkHref;
					break;
				}
			}

			curCol = document.createElement("td");
			curText = GM_getValue("villageid" + curRowId, "");
			//alert(curText);
			curCol.innerHTML = "<input villId='" + curRowId + "' value='" + curText + "' type=text style='' class=inputStyle />";
			curRow.appendChild(curCol);
			
			var inp = curCol.getElementsByTagName("INPUT")[0];
			
			inp.addEventListener('keyup', function(e) {
					saveVillageNote(e.target, curRowId);
					}, false);

		}

	}
	
	
	//add preference box
	
	var hid = document.evaluate(
	    "//div[@id='lmid2']//input[@name='e']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	 
	if(hid.snapshotLength>0 && hid.snapshotItem(0).value=="2")
	{
		var frm = hid.snapshotItem(0).parentNode;
		var newDiv = document.createElement("div");
		
		var savedVals = GetSavedVals(tblRows);
		
		newDiv.innerHTML = "Village Notes: <input id='villageNotesUpdateValue' type='text' style='width:100%;' value='" + savedVals + "'/>" + 
				"<a id='villagenotesupdate' href='#'>save</a><br><br>";
		
		frm.insertBefore(newDiv,frm.getElementsByTagName("TABLE")[0]);
		
		document.getElementById("villagenotesupdate").addEventListener('click', function(e) {
				villageNotesUpdate(); }, false);
		
	}
		

}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function saveVillageNote(inp)
{
	GM_setValue("villageid" + inp.getAttribute("villId"), escapeHTML(inp.value));
	
	
}


function escapeHTML (str)
{
	var div = document.createElement('div');
	var text = document.createTextNode(str);
	div.appendChild(text);
	return div.innerHTML.replace("|", "?");
}

function GetSavedVals(tblRows)
{
	var curRow;
	var savedVals = "";
	
	for(var i=0;i<tblRows.length;++i)
	{

		curRow = tblRows[i];

		var vilLinks = curRow.getElementsByTagName("A");

		for(var j=0;j<vilLinks.length;++j)
		{
			if(vilLinks[j].getAttribute("href").indexOf("?newdid=")==0)
			{			
				var vilLinkHref = vilLinks[j].getAttribute("href");
				vilLinkHref = vilLinkHref.substr(vilLinkHref.indexOf("=")+1);
				if(vilLinkHref.indexOf("&")>=0)
					vilLinkHref = vilLinkHref.substr(0,vilLinkHref.indexOf("&"));
				curRowId = vilLinkHref;
				break;
			}
		}

		savedVals += curRowId + "," + GM_getValue("villageid" + curRowId, "") + "|";

	}
	if(savedVals.length>0)
		savedVals=savedVals.substr(0,savedVals.length-1);
		
	return savedVals;
}

function villageNotesUpdate()
{
	
	var updateVal = document.getElementById("villageNotesUpdateValue").value;
	var updateVals = updateVal.split("|");
	
	for(var i = 0;i<updateVals.length;++i)
	{
		var villid = updateVals[i].substr(0,updateVals[i].indexOf(","));
		var villnote = updateVals[i].substr(updateVals[i].indexOf(",") + 1);
		GM_setValue("villageid" + villid, escapeHTML(villnote));
	
	}
	location.reload(true);
}