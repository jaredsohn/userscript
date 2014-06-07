// ==UserScript==
// @name           BLB
// @namespace      BLB
// @description    BLB
// @include        http://*.blueletterbible.org/*
// @include        http://*.blb.org/*
// @include        http://www.complete-bible-genealogy.com/*
// ==/UserScript==

(function() {
	var replacements, regex, key, textnodes, node, s; 

	textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = 0; i < textnodes.snapshotLength; i++) { 

		node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		{

		s = node.data; 
			
		s = s.replace( /\bTHE LORD\b/g, "YAHWEH");	
		s = s.replace( /\bTHY GOD\b/g, "THY ELOHIM");	
		s = s.replace( /\bthe LORD'S\b/g, "Yahweh's");	
		s = s.replace( /\bThe LORD'S\b/g, "Yahweh's");
		s = s.replace( /\bthe LORD\b/g, "Yahweh");
		s = s.replace( /\bThe LORD\b/g, "Yahweh");
		s = s.replace( /\bLORD\b/g, "Yahweh");
		s = s.replace( /\bGOD\b/g, "Yahweh");
		s = s.replace( /\bJesus\b/g, "Yahushua");
		s = s.replace( /\bGod\b/g, "El(ohim)");
		s = s.replace( /\bgod\b/g, "el(ohim)");
		s = s.replace( /\bgods\b/g, "elohim");
		s = s.replace( /\bChrist\b/g, "Messiah");
		s = s.replace( /\blord\b/g, "~master");
		s = s.replace( /\bLord\b/g, "~Master");

		node.data = s; 
		}
		
		if(node != null && node.nodeName == 'a' && /\S/.test(node.nodeValue))
		{
			node.data = node.data + " " + "(" + node + ")"
		}

	}

})();


(function addclassnametoabible() {



	//adding style - http://diveintogreasemonkey.org/patterns/add-css.html	
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "";
	style.id = "abible";
    head.appendChild(style);
	
	
	if (document.location.href.indexOf("http://www.complete-bible-genealogy.com/bible/") != -1)
	{
		var style2;
	    style2 = document.createElement('style');
	    style2.type = 'text/css';
		style2.id = "divcolcss"
		style2.innerHTML = "#divcol { padding: 1em; background-color: #ffffff; text-align: left; -moz-column-width:25em; -moz-column-gap:1em; FONT: 11px geneva, verdana, arial, sans-serif; COLOR: #444444; FONT-SIZE: 12px;} .versehead {padding: 5px ; font-weight: bold;} ";
		head.appendChild(style2);
		
		var tablebibletbody = document.getElementsByTagName('table')[2];	
		
		var thebody, thediv;
	    thebody = document.getElementsByTagName('div')[0];
		
	    thediv = document.createElement('div');
	    thediv.type = 'text/css';
		thediv.id = "divcol"
		thediv.innerHTML = tablebibletbody.innerHTML.replace(/<td/g,"<span").replace(/<tr/g,"<p").replace(/<\/td/g,"</span").replace(/<\/tr/g,"</p") ;
		thebody.insertBefore(thediv, tablebibletbody);
	}
	
	
	
	
	var node; 
	var anodes, linkname;

	// http://diveintogreasemonkey.org/patterns/match-attribute.html
	anodes = document.evaluate( "//a[@class='bible']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = 0; i < anodes.snapshotLength; i++) { 

		node = anodes.snapshotItem(i); 

		if(node != null && node.nodeName.toLowerCase() == 'a' )// && /\S/.test(node.nodeValue))
		{
			//node.data = node.data + " " + "(" + ")"
			if (node.pathname.indexOf("/names/") != -1)
			{
				linkname = node.pathname.replace("/names/","").replace(".htm","");
				node.className = node.className + " " + linkname;
				node.name = linkname;
				
				if (linkname == "5000")
				{
					node.title = "5000";
				}
				else
				{
				//adding mouseover - http://bogojoker.com/weblog/2007/08/11/greasemonkey-clicky-mouseover-menus
				node.addEventListener( 'mouseover', function() { highlightClass(this.name, true);  }, false);
				node.addEventListener( 'focus', function() { highlightClass(this.name, true);  }, false);
				//node.addEventListener( 'mouseout', function() { highlightClass(this.name, false);  }, false);
				}

			}
		}

	} 

	
	
	//alert('here');
	
	//firstdiv.style.backgroundColor = "#ffff00";
	
})();

var abible = document.getElementById('abible');

function highlightClass(cssclass, highlight) {

	if (highlight)
	{
		abible.innerHTML = "a." + cssclass + " { background-color: #ffff00; }";
	}
	else
	{
		abible.innerHTML = ""
	}

}
