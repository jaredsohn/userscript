// ==UserScript==
// @name        SCP Name Displayer
// @namespace   https://play.google.com/store/apps/details?id=air.ef.PaddleBall
// @description Displays the name of an SCP after its number
// @include     *reddit.com/r/scp*
// @include     *scp-wiki.net/*
// @exclude     *scp-wiki.net/scp-series*
// @exclude     *scp-wiki.net/archived-scps
// @exclude     *scp-wiki.net/decommissioned-scps
// @exclude     *scp-wiki.net/joke-scps
// @version     1
// ==/UserScript==



goThrough(document.body);

function goThrough(node)
{
	var child, next;

	switch ( node.nodeType )
	{
	case 1: // Element
	case 9: // Document
	case 11: // Document fragment
		child = node.firstChild;
		while ( child )
		{
			next = child.nextSibling;
			goThrough(child);
			child = next;
		}
		break;

	case 3: // Text node
		insertLinkAndName(node);
		break;
	}
}

function insertLinkAndName(textNode)
{

	var v = textNode.nodeValue;
	
	var nodeTextSplit = v.split(/SCP\s*-\s*/gi);
	
	var newText = "";
	
	var i = 0;
	for(i = 0; i < nodeTextSplit.length; i++)
	{
		var section = nodeTextSplit[i];
		
		
		if(i > 0)
		{
		
			section = "SCP-" + section;
			
			
			var id = section.substring(4, 7);
			
			if(!isNaN(id))
			{
				var numTest = new RegExp(/^\d+$/);
				
				
				
				if(numTest.test(section.substring(7, 8)))
				{
			//	alert("a" + section.substring(7, 8) + "a");
				id = id + section.substring(7, 8);
				}
				
				if(section.substring(7,10) == "-EX" || section.substring(8,11) == "-EX")
				{
					id = id + "-EX";
				}
				
				
				if(section.substring(7,9) == "-D" || section.substring(8,10) == "-D")
				{
					id = id + "-D";
				}
				
				if(section.substring(7,9) == "-J" || section.substring(8,10) == "-J")
				{
					id = id + "-J";
				}


				scpName = getSCPName(id);
				if(section.indexOf(scpName) < 0 && scpName != null)
				{
				
				var re = new RegExp("\s*SCP\s*-" + id, "gi");
				
				
				if(document.URL.toLowerCase().indexOf(id.toLowerCase()) < 0)
				{
				section = section.replace(re, "SCP-" + id + " (" + scpName + ")");
				}
				
				
				}
			}
			
			newText += section;
			
		}
		else
		{
			newText += section;
		}
	}
	
	textNode.nodeValue = newText;
}

function getSCPName(id)
{
	var page = "http://www.scp-wiki.net/scp-series";

	if(id.indexOf("-J") > -1)
	{
		page = "http://www.scp-wiki.net/joke-scps";
	}
	else if(id.indexOf("-EX") > -1)
	{
		page = "http://www.scp-wiki.net/scp-ex";
	}
	else if(id.indexOf("-D") > -1)
	{
		page = "http://www.scp-wiki.net/decommissioned-scps";
	}
	else if(id > 2999)
	{
		page = "http://www.scp-wiki.net/scp-series-4";
	}
	else if(id > 1999)
	{
		page = "http://www.scp-wiki.net/scp-series-3";
	}
	else if(id > 999)
	{
		page = "http://www.scp-wiki.net/scp-series-2";
	}
	
//	page = "http://google.com";

var r = GM_xmlhttpRequest({
  method: "GET",
  url: page,
  synchronous : true,
  headers: {
 "Content-Type": "application/x-www-form-urlencoded"
},
  onload: function(response) {
	//return "aha";//get_string_between("a", "d", "abcd");
  }


});

var t = r.responseText

t = t.replace(/&quot;/g, '"');

return removeTags(get_string_between("SCP-" + id + "</a> - ", "</li>", t));

}

function removeTags(txt){
    var rex = /(<([^>]+)>)/gi;
    return txt.replace(rex, "");

}

function get_string_between(start, end, str){
	str = " " + str;
	
	var ini = str.indexOf(start);
	if (ini == -1)
	{
	return null;
	}
	ini = ini + start.length;
	
	var len = str.indexOf(end, ini) - ini;
	return str.substr(ini,len);
}