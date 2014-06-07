// ==UserScript==
// @name           Cutlists bewerten
// @namespace      http://userscripts.org/users/99643
// @description    fügt auf cutlist.at einen Button bei den Cutlists hinzu, um diese zu bewerten
// @include        http://www.cutlist.at/*
// @include        http://cutlist.at/*
// @version        0.1.1
// ==/UserScript==

var cutlistDefaultURL = "http://www.cutlist.at/";


var cutlists = document.evaluate('id("clErg")/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < cutlists.snapshotLength; i++) {
	var currentCutlist = cutlists.snapshotItem(i)
	var cutlistLink = document.evaluate('./div[1]/a[1]', currentCutlist, null, 9, null).singleNodeValue
	
	var id = cutlistLink.href.substring(cutlistLink.href.indexOf("id=")+3);
	var ratingLink = document.createElement("a");
	ratingLink.innerHTML = "<img alt=\"Rating\" title=\"bewerte diese Cutlist\" style=\"border: 0px none;\" src=\"/res/star.png\" /><!-- das Stern-Icon ist aus dem Silk-Icon-Set vom FamFamFam: http://www.famfamfam.com/lab/icons/silk/ -->";
	ratingLink.href = "javascript:showRatingDialog("+id+");"
	ratingLink.style.marginLeft = "3px";
	ratingLink.style.borderWidth = "0px";
	ratingLink.id = "ratingLink-"+id;
	cutlistLink.parentNode.insertBefore(ratingLink,cutlistLink.nextSibling)
	createRatingDialog(id);
}


var script = 'function showRatingDialog(id){\n'+
	     '	var div = document.getElementById("rating-"+id);\n'+
	     '	var link = document.getElementById("ratingLink-"+id);\n'+
	     '	var boxes = document.getElementsByClassName("ratingBox");\n'+
	     '	for(var i = 0; i<boxes.length;i++){\n'+
	     '	 boxes[i].style.visibility = "hidden";\n'+
	     '	}\n'+
	     '	if(div){\n'+
	     '		div.style.visibility="visible";\n'+
	     '	}\n'+
	     '}\n'+
	     'function hideRatingDialog(id){\n'+
	     '	var div = document.getElementById("rating-"+id);\n'+
	     '	if(div){\n'+
	     '		div.style.visibility="hidden";\n'+
	     '	}\n'+
	     '}\n';

//add functions to header
var header = document.getElementsByTagName('head')[0];
var scriptelement = document.createElement('script');
scriptelement.type = 'text/javascript';
scriptelement.innerHTML = script;
header.appendChild(scriptelement);


function createRatingDialog(id){
	var link = document.getElementById("ratingLink-"+id);
	var div = document.createElement("div");
	div.className = "box ratingBox";
	div.id = "rating-"+id;
	div.style.width = "300px";
	div.style.visibility = "hidden";
	div.style.position = "absolute";
	div.style.left = (getX(link)-200)+"px";
	div.style.top = (getY(link)+20)+"px";
	div.style.paddingBottom = "5px";
	var cutlistURL = GM_getValue("cutlistURL",cutlistDefaultURL);
	div.innerHTML = "<div style=\" margin-bottom:-5px;\"><b class=\"h\">Cutlist bewerten</b> <b><a style=\"float:right; margin-right:3px;\" href=\"javascript:hideRatingDialog("+id+");\">X</a></b></div><br /><a style=\" margin-left:10px;\" href=\""+cutlistURL+"rate.php?rate="+id+"&rating=5\"><img style=\"border:0px; margin-right:3px;\" src=\"/res/r5.jpg\" alt=\"Icon Rating 5\" />Perfekt!</a><br /><a style=\" margin-left:10px;margin-top:5px;\" href=\""+cutlistURL+"rate.php?rate="+id+"&rating=4\"><img style=\"border:0px; margin-right:3px;\" src=\"/res/r4.jpg\" alt=\"Icon Rating 4\" />Framegenau, Werbung entfernt</a><br /><a style=\" margin-left:10px;margin-top:5px;\" href=\""+cutlistURL+"rate.php?rate="+id+"&rating=3\"><img style=\"border:0px; margin-right:3px;\" src=\"/res/r3.jpg\" alt=\"Icon Rating 3\" />Schnitt ist annehmbar, Werbung entfernt</a><br /><a style=\" margin-left:10px;margin-top:5px;\" href=\""+cutlistURL+"rate.php?rate="+id+"&rating=2\"><img style=\"border:0px; margin-right:3px;\" src=\"/res/r2.jpg\" alt=\"Icon Rating 2\" />Anfang und Ende halbwegs genau geschnitten</a><br /><a style=\" margin-left:10px;margin-top:5px;\" href=\""+cutlistURL+"rate.php?rate="+id+"&rating=1\"><img style=\"border:0px; margin-right:3px;\" src=\"/res/r1.jpg\" alt=\"Icon Rating 1\" />Anfang und Ende grob geschnitten</a><br /><a style=\" margin-left:10px;margin-top:5px;\" href=\""+cutlistURL+"rate.php?rate="+id+"&rating=0\"><img style=\"border:0px; margin-right:3px;\" src=\"/res/r0.jpg\" alt=\"Icon Rating 0\" />Dummy, keine Cutlist</a><br />";
	document.getElementsByTagName('body')[0].appendChild(div);
}
function getY( oElement ){
	//code from http://bytes.com/topic/javascript/answers/90547-how-get-absolute-position-element
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
};
function getX( oElement ){
	//code based on version from http://bytes.com/topic/javascript/answers/90547-how-get-absolute-position-element
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
};

//possibility to change default stations
function setURL() {
	var currentURL= GM_getValue("cutlistURL",cutlistDefaultURL);
	newURL = prompt("Bitte gib deine persönliche Cutlist-URL ein. \n (um eine zu bekommen, musst du bei cutlist.at registriert sein)", currentURL);
	GM_setValue("cutlistURL",newURL);
//	window.location.reload();
}

GM_registerMenuCommand("persönliche Cutlist-URL eingeben", setURL);