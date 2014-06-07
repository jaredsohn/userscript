// ==UserScript==
// @name           DPRStyle
// @namespace      com.ap
// @description    Dpreview Looks
// @include        http://www.dpreview.com/forums/forum.asp?forum=1031
// ==/UserScript==
// document.bgColor = '#FFFFFF';
document.body.style.background="white none repeat scroll 0% 0%";
// document.fgColor = '#000000';
// document.bgColor = '#FFFFFF';

document.title = "DPR";

function setOfType(tName) {
    var rows = document.getElementsByTagName(tName);
    for(i = 0; i < rows.length; i++){  
	rows[i].style.background="#FFFFFF";
	if( isMyNode(rows[i]) ) {
		rows[i].style.color="#008800";
	}
	else if( isRecent(rows[i]) ) {
		rows[i].style.color="#880000";
	}
	else {
		rows[i].style.color="#000000";
	}
    }
}
function setInverseOfType(tName) {
    var rows = document.getElementsByTagName(tName);
    for(i = 0; i < rows.length; i++){  
	rows[i].style.background="#FFFFFF";
	rows[i].style.color="#FFFFFF";
    }
}

function isMyNode( nodeObj) {
	if( nodeObj.className == "forumscellleftselg" ||
	    (nodeObj.parentNode != null && nodeObj.parentNode.className == "forumscellleftselg") ) {
	    return true;
	}
	    
	if( nodeObj.className == "forumscellselg" ||
	    (nodeObj.parentNode != null && nodeObj.parentNode.className == "forumscellselg") ) {
	    return true;
	}
	
	if( nodeObj.className == "forumscellrightselg" ||
	    (nodeObj.parentNode != null && nodeObj.parentNode.className == "forumscellrightselg") ) {
	    return true;
	}	
	    
	return false;
}

function isRecent( nodeObj) {
	if( nodeObj.tagName == 'TD' && nodeObj.className == "forumscellright" ) {
	    if( nodeObj.innerHTML ) {
	      var txt = nodeObj.innerHTML;
	      if( txt != null) {
	    	if( txt.indexOf('hours') > 0 || txt.indexOf('minutes') > 0) {
	    		return true;
	    	}
	      }
	    }
	}	
	    
	return false;
}

setOfType('TD');
setOfType('A');
setOfType('DIV');
setOfType('SPAN');
setInverseOfType('H3');

function getStyleClass (className) {
	for (var s = 0; s < document.styleSheets.length; s++)
	{
		if(document.styleSheets[s].cssRules)
		{
			for (var r = 0; r < document.styleSheets[s].cssRules.length; r++)
			{
				if (document.styleSheets[s].cssRules[r].selectorText == '.' + className)
					return document.styleSheets[s].cssRules[r];
			}
		}
	}
	
	return null;
}

var ftick = getStyleClass('a.forumsticker');
if( ftick != null) {
	ftick.style.color="#000000";
}

var sel = getStyleClass('forumscellleftsel');
if( sel != null) {
	sel.style.color="#00FFFF";
	sel.style.bgcolor="#FFFFFF";
}
