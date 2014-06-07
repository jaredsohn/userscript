//The purpose of this script is to provide a simplified pisexy view, just showing the pager and torrent listing.
// ver 1.1

// ==UserScript==
// @name          pisexy simplifier
// @namespace     http://anonymouse.org
// @description	  Simplify pisexy to just show the pager and torrent listing.
// @include       http://*.pisexy.org/browseall.php*
// @include       http://pisexy.org/browseall.php*
// @include       http://*.pisexy.org/browse.php*
// @include       http://pisexy.org/browse.php*
//
// ==/UserScript==

(function() 
{

	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}

	function selectNodes(doc, context, xpath) {
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}
	
	doc = window.document;
	
	var piLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/download/')]");
	var piDLLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/torrentinfo.php?id=')]");
	var piContent = selectNodes(doc, doc.body, "//form[contains(@action,'browseall.php')]")[0];
	
	//dl links
	for (var x=0; x<piDLLinks.length; x++) 
	{
		for (var y=0; y<piLinks.length; y++) {
			var piName = piLinks[x].href.split("/")[5];
		}
		var piDown = piDLLinks[x].href.split(".php?id=")[1];
		piDLLinks[x].href = "http://www.pisexy.org/download/" + piDown + "/" + piName;
		piDLLinks[x].setAttribute("alt", "Download " + piName.split(".torrent")[0]);
		piDLLinks[x].setAttribute("title", "Download " + piName.split(".torrent")[0]);
	}
	
	//main links
	for (var x=0; x<piLinks.length; x++) 
	{
		var piStart = piLinks[x].href.indexOf("download/");
		piStart = piLinks[x].href.substr(piStart, 48);
		var piTor = piStart.split("/")[1];
		piLinks[x].href = "http://www.pisexy.org/torrentinfo.php?id=" + piTor;
		piLinks[x].setAttribute("alt", "Torrent Details");
		piLinks[x].setAttribute("title", "Torrent Details");
	}
	
	var t = doc.getElementsByTagName("table");
	var p = t[1].parentElement;
	p.removeChild(t[1]);

	t[1].deleteRow(2);
	t[1].deleteRow(0);
	
	ts = t[4].getElementsByTagName("td");
	
	ts[0].style.display = "none"
	ts[1].style.display = "none"
	ts[2].style.display = "none"
	ts[3].style.display = "none"
	
	ts[5].style.display = "none"
	ts[6].style.display = "none"

	ts[9].style.display = "none"
	ts[10].style.display = "none"
	
	ts = t[5].getElementsByTagName("td");
	
	ts[0].style.display = "none"
	ts[1].style.display = "none"
	ts[2].style.display = "none"
	ts[3].style.display = "none"
	
	ts[5].style.display = "none"
	ts[6].style.display = "none"
	
	ts = t[6].getElementsByTagName("td");
	ts[0].style.display = "none"
	ts[1].style.display = "none"
	ts[ts.length-1].style.display = "none"

	ts = t[8].getElementsByTagName("td");
	ts[0].style.display = "none"
	ts[1].style.display = "none"
	ts[ts.length-1].style.display = "none"

	var d = doc.getElementsByClassName('drawmsg')[0];
	p = d.parentElement;
	p.removeChild(d);
	
	d = doc.getElementsByClassName('gektest')[0];
	p = d.parentElement;
	p.removeChild(d);
	
	d = doc.getElementsByClassName('sig')[0];
	p = d.parentElement;
	p.removeChild(d);

	d = doc.getElementsByClassName('pager')[0];
	p = d.parentElement;
	p.removeChild(d);

	d = doc.getElementsByTagName('img')[2];
	p = d.parentElement.parentElement;
	p.removeChild(d.parentElement);

	// Remove the first 5 BR tags... leave the rest
	BR = document.getElementsByTagName("br");
	for(var i=0; i<7; i++)
	{
		BR[0].parentElement.removeChild(BR[0]);
	}
	
	// Remove unwanted fields from the cluttered table
	TRS = document.getElementsByClassName("listor")[0].getElementsByTagName("tr");
	
	for(var i=0; i<TRS.length; i++)
	{
		tr = TRS[i];
		tds = tr.getElementsByTagName("td");
		tr.removeChild(tds[8]);
		tr.removeChild(tds[6]);
		tr.removeChild(tds[4]);
		tr.removeChild(tds[2]);
		tds[1].style.paddingLeft = 6;
		
		infoIcon = tds[tds.length-1].getElementsByTagName("img")[1];
		
		if(infoIcon != undefined)
		{			
			infoIcon.setAttribute("src", "http://o.imm.io/DCB.png");
			commentlink = tds[tds.length-1].getElementsByTagName("a")[0];
			tds[tds.length-1].removeChild(commentlink);
			a = tds[tds.length-1].innerHTML.replace(/&nbsp;/g,'');
			tds[tds.length-1].innerHTML = a;
		}
	}
	
	tds = doc.body.getElementsByTagName("td");
	tds[2].setAttribute("bgcolor","#333333");
	tds[3].setAttribute("bgcolor","#444444");
	tds[3].style.paddingTop="20";
	tds[tds.length-2].setAttribute("bgcolor","#333333");

// ----------------------------------------------------
	
addGlobalStyle("@font-face { font-family: 'Droid Sans';  font-style: normal;  font-weight: normal;  src: local('Droid Sans'), url('http://themes.googleusercontent.com/font?kit=POVDFY-UUf0WFR9DIMCU8g') format('truetype');}")
addGlobalStyle("body {background-color:#333333; margin:0px;}");
addGlobalStyle("td.colhead, td.colhead1 {background-image: url('http://o.imm.io/DCP.png');}")
addGlobalStyle(".line1 {background-color:#222222;}")
addGlobalStyle("input {font-size:11pt;}")
addGlobalStyle(".line2 {background-color:#444444;}");
addGlobalStyle("table.pager td {color:999999;font-size:11pt;}")
addGlobalStyle("nobr {font-size:10px;}")
addGlobalStyle("a.pager,a.pager3,a.pager5,a.pager6,a.pager87,td.torrentstable {color: #CCCCCC; font-size:11pt; font-weight: normal;}")
addGlobalStyle("a.pager:hover,a.pager3:hover,a.pager5:hover,a.pager6:hover,a.pager87:hover {color: #FFFFFF; font-size:11pt;}")
addGlobalStyle("body,a.pager,a.pager3,a.pager5,a.pager6,a.pager8,a.pager87,div.tortitle,div.gektest,table.pager,select.browse,input.browse,input.whi,table.block,table.mvg,table.block1,table.block2,table.block3,table.block7,td.block7,table.block9,td.profiletext,div.drawmsg,td.profiletext1,td.torrentstable2,td.torrentstable3,td.torrentstable4,.line4,input,select,textarea { font-family: 'Droid Sans', Arial, sans-serif; }");

var inputs = document.getElementsByTagName("input");

inputs[2].setAttribute("type","submit");
inputs[2].setAttribute("value","Search");
inputs[3].setAttribute("type","submit");
inputs[3].setAttribute("Value","Browse");

var bf = document.getElementsByClassName("browse");
for(i=0; i<bf.length;i++) { bf[i].style.fontSize="11pt"; }

}
)();
